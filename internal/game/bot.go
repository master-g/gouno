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
	"math/rand"
	"runtime"

	"github.com/master-g/gouno/pkg/signal"
	"go.uber.org/zap"
)

// AddBot to table
func AddBot(t *Table) {
	retChan := make(chan *Client)
	req := RegisterRequest{
		UID:         genBotUID(t),
		ClientEntry: retChan,
	}
	t.Register <- &req
	bot := <-retChan

	// simulate client
	go func() {
		for {
			select {
			case frame := <-bot.Out:
				log.Info("frame", zap.String("frame", frame.String()))
			case <-signal.InterruptChan:
				log.Debug("bot receive signal.Interrupt")
				return
			default:
				runtime.Gosched()
			}
		}
	}()
}

func genBotUID(t *Table) (uid uint64) {
	for {
		uid = uint64(rand.Intn(99) + 1)
		for _, v := range t.Clients {
			if v.UID == uid {
				uid = 0
				break
			}
		}
		if uid != 0 {
			return
		}
	}
}
