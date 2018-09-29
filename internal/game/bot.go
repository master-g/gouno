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

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
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
				dispatchFrame(t, bot, frame)
			case <-signal.InterruptChan:
				log.Debug("bot receive signal.Interrupt")
				return
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

func dispatchFrame(t *Table, bot *Client, frame pb.Frame) {
	cmd := pb.GameCmd(frame.Cmd)
	log.Debug("bot try to handle frame", zap.String("cmd", cmd.String()))
	switch cmd {
	case pb.GameCmd_GAME_START_NTY:
		handleGameStartNty(t, bot, frame.Body)
	case pb.GameCmd_EVENT_NTY:
		handleEventNty(t, bot, frame.Body)
	default:
		log.Info("bot ignore frame for no handler for it")
	}
}

func handleGameStartNty(t *Table, bot *Client, body []byte) {
	log.Debug("bot ignore GameStartNty")
	// tableState := pb.TableState{}
	// err := proto.Unmarshal(body, &tableState)
	// if err != nil {
	// 	log.Error("unable to unmarshal frame body", zap.Error(err))
	// 	return
	// }
}

func handleEventNty(t *Table, bot *Client, body []byte) {
	event := pb.S2CEventNty{}
	err := proto.Unmarshal(body, &event)
	if err != nil {
		log.Fatal("game logic can't event unmarshal its own proto message", zap.Error(err))
	}
	log.Info("bot got game event", zap.String("event", event.String()))
}

func ai(t *Table, bot *Client) {
	action := &pb.C2SAction{
		Action: int32(pb.Action_ACTION_PLAY),
		Card:   []uint8{t.stateMap[bot.UID].Cards[0]},
	}
	body, err := proto.Marshal(action)
	if err != nil {
		log.Fatal("error while marshal proto", zap.Error(err))
	}
	event := &pb.Frame{
		Type: pb.FrameType_Message,
		Cmd:  int32(pb.GameCmd_ACTION_REQ),
		Body: body,
	}

	bot.In <- *event
}
