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

	"github.com/master-g/gouno/signal"
	"go.uber.org/zap"
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

	// register all game CMD handlers
	registerAllHandlers()

	for {
		select {
		case req := <-Register:
			var table *Table
			if prev, ok := clients.Load(req.UID); ok {
				prevClient, ok := prev.(*Client)
				if ok {
					// previous client found, try to find the related table
					log.Info("prev client found", zap.String("client", prevClient.String()))
					table = findTable(prevClient.TID)
					if table != nil {
						// previous table found
						req.ClientEntry <- prevClient
					} else {
						// previous table not found, error, need fix if this happens
						log.Error("client with dangling table", zap.String("client", prevClient.String()))
					}
				} else {
					log.Error("unable to convert *client")
				}
			} else {
				// no previous client, start new goroutine
				table = findAvailableTable()
				if table == nil {
					// no available table, create new one
					table = NewTable()
					log.Info("new table created", zap.String("table", table.String()))
					wg.Add(1)
					go table.start(&wg)
				}
				// create new client in table loop
				table.Register <- req
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
			} else {
				log.Warn("try to unregister non exists client", zap.Uint64("uid", uid))
			}
		case <-signal.InterruptChan:
			log.Info("shutting down game server")
			return
		}
	}
}

// WaitGameServerShutdown waits for game server to shutdown
func WaitGameServerShutdown() {
	// wait for all tables to tear down
	wg.Wait()
}

func findAvailableTable() *Table {
	var result *Table
	tableMap.Range(func(key, value interface{}) bool {
		if t, ok := value.(*Table); ok {
			if !t.Playing && len(t.Clients) < tableConfig.MaxPlayers {
				result = t
				return false
			}
		}
		return true
	})

	return result
}

func findTable(tid uint64) *Table {
	if t, ok := tableMap.Load(tid); ok {
		table, ok := t.(*Table)
		if ok {
			return table
		}
	}
	return nil
}
