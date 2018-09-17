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

package game

import (
	"sync"

	"go.uber.org/zap"

	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/signal"
)

var (
	// Register channel for register client to game server
	Register chan *RegisterRequest
	// Unregister channel for unregister client from game server
	Unregister chan uint64

	clients sync.Map
	wg      sync.WaitGroup
)

// RegisterRequest ...
type RegisterRequest struct {
	// UID user unique ID
	UID uint64
	// ClientEntry to receive client instance
	ClientEntry chan *Client
}

// Start game server
func Start() {
	Register = make(chan *RegisterRequest)
	Unregister = make(chan uint64)

	defer func() {
		close(Register)
		close(Unregister)
	}()

	// register game CMD handler
	registerAllHandlers()

	for {
		select {
		case req := <-Register:
			if prev, ok := clients.Load(req.UID); ok {
				prevClient, ok := prev.(*Client)
				if ok {
					log.Info("prev client found", zap.String("client", prevClient.String()))
					req.ClientEntry <- prevClient
				} else {
					log.Error("unable to convert *client")
				}
			} else {
				// no previous client, start new goroutine
				wg.Add(1)
				go clientLoop(req)
			}
		case uid := <-Unregister:
			if v, ok := clients.Load(uid); ok {
				// set offline flag, the real removal will be done in another goroutine
				client, ok := v.(*Client)
				if !ok {
					log.Error("unable to convert *client")
				} else {
					client.SetFlagOffline()
				}
			}
		case <-signal.InterruptChan:
			log.Info("shutting down game server")
			return
		}
	}
}

// WaitGameServerShutdown waits for game server to shutdown
func WaitGameServerShutdown() {
	wg.Wait()
}

func clientLoop(req *RegisterRequest) {
	client := &Client{
		UID: req.UID,
		In:  make(chan pb.Frame),
		Out: make(chan pb.Frame),
		Die: make(chan struct{}),
	}

	log.Info("client created for new connection", zap.Uint64("uid", req.UID))

	defer func() {
		clients.Delete(req.UID)
		close(client.Die)
		close(client.In)
		close(client.Out)
		wg.Done()
	}()

	req.ClientEntry <- client

	for {
		select {
		case frame := <-client.In:
			route(client, frame)
			// TODO: add this to EnterGame CMD Handler
			// clear offline flag to disable AI .,etc
			// prevClient.ClearFlagOffline()
		case <-signal.InterruptChan:
			// server shutting down, force quit
			client.SetFlagKicked()
		}
		if client.IsFlagOfflineSet() && client.TID == 0 {
			// client is offline, and no table related, remove
			client.SetFlagKicked()
		}

		if client.IsFlagKickedSet() {
			return
		}
	}
}
