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

import "github.com/master-g/gouno/signal"

var (
	// Register channel for register client to game server
	Register chan *Client
	// Unregister channel for unregister client from game server
	Unregister chan uint64

	clients map[uint64]*Client
)

func init() {
	clients = make(map[uint64]*Client)
}

// Start game server
func Start() {
	Register = make(chan *Client)
	Unregister = make(chan uint64)

	defer func() {
		close(Register)
		close(Unregister)
	}()

	for {
		select {
		case client := <-Register:
			// TODO: check if client already exists, if so, update in,out channel, remove AI .,etc
			clients[client.UID] = client
			// TODO: go clientLogic(client)
		case uid := <-Unregister:
			if _, ok := clients[uid]; ok {
				// TODO: set offline flag here, remove client when game is not start yet or is already over
			}
		case <-signal.InterruptChan:
			return
		}
	}
}
