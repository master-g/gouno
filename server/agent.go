// Copyright © 2018 MG <mailtomasterg@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

package server

import (
	"sync"
	"time"

	"github.com/master-g/gouno/game"
	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/registry"
	"github.com/master-g/gouno/router"
	"github.com/master-g/gouno/sessions"
	"github.com/master-g/gouno/signal"
	"go.uber.org/zap"
)

const (
	defaultMQSize        = 512
	defaultPushQueueSize = 128
)

// all packets from handleTCPConnection() will be handle here
func agent(wg *sync.WaitGroup, s *sessions.Session, in chan []byte, out *Sender) {
	defer wg.Done()

	// init session
	s.Push = make(chan []byte, defaultPushQueueSize)
	s.MQ = make(chan pb.Frame, defaultMQSize)
	s.ConnectTime = time.Now()
	s.LastPacketTime = time.Now()
	// auth timeout
	authTimer := time.NewTimer(config.AuthTimeout)
	defer authTimer.Stop()
	// RPM limit
	minuteTicker := time.NewTicker(time.Minute)
	defer minuteTicker.Stop()

	// cleanup
	defer func() {
		// notify handleTCPConnection()
		close(s.MQ)
		close(s.Die)
		close(s.Push)
	}()

	// **** MAIN MESSAGE LOOP ****
	// handles 4 types of message:
	//  1. from client
	//  2. from game service
	//  3. timer
	//  4. server shutdown signal
	for {
		select {
		case msg, ok := <-in:
			// process packet from network
			if !ok {
				log.Info("incoming packet channel full/or closed", zap.String("sess", s.String()))
				s.SetFlagKicked()
				break
			} else {
				// update session status
				s.PacketCount++
				s.PacketCountPerMin++
				s.LastPacketTime = time.Now()

				// check for RPM violation
				if s.CheckRPMLimitViolation() {
					s.SetFlagKicked()
					sendPacket(s, out, s.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), int32(pb.StatusCode_STATUS_TOO_MANY_REQ), "RPM limit violate"))
				} else if result := router.Route(s, msg); result != nil {
					// route
					sendPacket(s, out, result)
				}
			}
		case msg := <-s.Push:
			// internal push
			sendPacket(s, out, msg)
		case frame := <-s.MQ:
			// packets from game service frame
			switch frame.Type {
			case pb.FrameType_Message:
				var data []byte
				if frame.Status != int32(pb.StatusCode_STATUS_OK) {
					data = s.ErrorResponse(frame.Cmd, frame.Status, frame.Message)
				} else {
					data = s.Response(frame.Cmd, frame.Body)
				}
				sendPacket(s, out, data)
			case pb.FrameType_Kick:
				sendPacket(s, out, s.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), frame.Status, frame.Message))
				s.SetFlagKicked()
			}
		case <-authTimer.C:
			authTimer.Stop()
			// auth timeout
			if !s.IsFlagAuthSet() {
				log.Info("auth timeout", zap.String("sess", s.String()))
				sendPacket(s, out, s.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), int32(pb.StatusCode_STATUS_TIMEOUT), "auth timeout"))
				s.SetFlagKicked()
			}
		case <-minuteTicker.C:
			// reset RPMLimit counter
			s.PacketCountPerMin = 0
		case <-signal.InterruptChan:
			// server is manually shutting down
			sendPacket(s, out, s.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), int32(pb.StatusCode_STATUS_UNAVAILABLE), "server shutting down"))
			s.SetFlagKicked()
			log.Info("session kick flag set")
		}

		// check if should close session
		if s.IsFlagKickedSet() {
			log.Info("session kicked", zap.String("sess", s.String()))
			if s.UID != 0 {
				// REMOVE SESSION HERE ONLY
				registry.Registry.Delete(s.UID)
				game.Unregister <- s.UID
			}
			return
		}
	}
}

func sendPacket(s *sessions.Session, buf *Sender, pkg []byte) {
	// NOT_ENCRYPTED -> KEY_XCHG -> ENCRYPTED
	if s.IsFlagEncryptedSet() {
		s.Encoder.XORKeyStream(pkg, pkg)
	} else if s.IsFlagKeyExchangedSet() {
		s.ClearFlagKeyExchanged()
		s.SetFlagEncrypted()
	}

	err := buf.EnqueueOutgoing(pkg)
	if err != nil {
		log.Error("error while sending", zap.String("sess", s.String()), zap.Error(err))
	}
}
