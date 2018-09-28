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

package router

import (
	"errors"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/internal/sessions"
	"github.com/master-g/gouno/proto/pb"
	"go.uber.org/zap"
)

var (
	handlerMap = make(map[pb.Cmd]*Handler)

	// ErrorHandlerNotFound indicates there is no such handler for request cmd
	ErrorHandlerNotFound = errors.New("no corresponding handler")
	// ErrorUnauthed indicates session is not authed yet
	ErrorUnauthed = errors.New("session unauthenticated")
	// ErrorStreamNotOpen indicates error while opening gRPC stream
	ErrorStreamNotOpen = errors.New("stream not opened yet")
)

// Register add request handler to router map
func Register(handlers []*Handler) {
	for _, h := range handlers {
		log.Info("register handler", zap.String("handler", h.String()))
		handlerMap[h.ReqCmd] = h
	}
}

// Route routes the incoming packet
func Route(s *sessions.Session, pkg []byte) (resp []byte) {
	// mark start time
	start := time.Now()

	// decrypt if needed
	if s.IsFlagEncryptedSet() {
		s.Decoder.XORKeyStream(pkg, pkg)
	}

	// unmarshal header
	header := &pb.C2SHeader{}
	err := proto.Unmarshal(pkg, header)
	if err != nil {
		log.Error("invalid header", zap.Error(err))
		s.SetFlagKicked()
		return nil
	}

	// ensure legal sequence number
	if header.Seq != s.ClientSeq {
		log.Info("illegal sequence number", zap.String("sess", s.String()))
		s.SetFlagKicked()
		return nil
	}

	s.ClientSeq++

	// read CMD
	cmdValue := header.Cmd
	cmd := pb.Cmd(cmdValue)

	// route message to different service by command code
	var result []byte
	var status int32
	var h *Handler
	var ok bool
	if cmd > pb.Cmd_CMD_COMMON_END {
		// forward message
		if err = forward(s, cmdValue, header.Body); err != nil {
			// error while forwarding
			log.Error("error while forwarding cmd", zap.String("cmd", cmd.String()), zap.Error(err))
			s.SetFlagKicked()
			return nil
		}
	} else {
		// route
		if h, ok = handlerMap[cmd]; ok {
			// check for authentication
			if !h.AuthFree && !s.IsFlagAuthSet() {
				// need authenticate first
				status = int32(pb.StatusCode_STATUS_UNAUTH)
				err = ErrorUnauthed
			} else {
				result, status, err = h.Handler(s, header)
			}
		} else {
			status = int32(pb.StatusCode_STATUS_UNKNOWN_CMD)
			err = ErrorHandlerNotFound
		}
	}

	// make response and check for errors
	if status != int32(pb.StatusCode_STATUS_OK) && h != nil {
		if status == int32(pb.StatusCode_STATUS_INTERNAL_ERROR) {
			log.Warn("error while handling cmd", zap.String("cmd", h.ReqCmd.String()), zap.Error(err))
		} else {
			log.Info("unable to handle cmd", zap.String("cmd", h.ReqCmd.String()), zap.Error(err))
		}
		msg := ""
		if err != nil {
			msg = err.Error()
		}
		resp = s.ErrorResponse(int32(h.RespCmd), status, msg)
	} else if status != int32(pb.StatusCode_STATUS_OK) && h == nil {
		msg := ""
		if err != nil {
			msg = err.Error()
		}
		resp = s.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), status, msg)
	} else {
		resp = s.Response(int32(h.RespCmd), result)
	}

	// profiling
	elapsed := time.Now().Sub(start)
	log.Info("REQ processed", zap.String("cmd", cmd.String()), zap.Duration("cost", elapsed))

	return resp
}
