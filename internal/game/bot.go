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

	"github.com/master-g/gouno/internal/uno"

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
	log.Debug("bot try to handle frame", zap.String("cmd", cmd.String()), zap.String("msg", frame.Message))
	switch cmd {
	case pb.GameCmd_EVENT_NTY:
		handleEventNty(t, bot, frame.Body)
	case pb.GameCmd_ACTION_RESP:
		handleActionResp(t, bot, frame.Body)
	default:
		log.Info("bot ignore frame for no handler", zap.String("cmd", cmd.String()))
	}
}

func handleEventNty(t *Table, bot *Client, body []byte) {
	event := pb.S2CEventNty{}
	err := parse(body, &event)
	if err != nil {
		return
	}
	for _, e := range event.Events {
		what := pb.Event(e.Event)
		log.Debug("bot got game event", zap.String("event", what.String()))
	}
}

func handleActionResp(t *Table, bot *Client, body []byte) {
	resp := pb.S2CActionResp{}
	err := parse(body, &resp)
	if err != nil {
		return
	}
	log.Debug("bot got action resp", zap.String("resp", resp.String()))
}

func parse(body []byte, msg proto.Message) error {
	err := proto.Unmarshal(body, msg)
	if err != nil {
		log.Fatal("game logic can't even unmarshal its own proto message", zap.Error(err))
	}
	return err
}

func solve(cards []uint8, match uint8) (index int, color uint8) {
	index = -1
	color = uno.ColorRed

	matchValue := uno.CardValue(match)
	matchColor := uno.CardColor(match)

	colorCount := make(map[uint8]int)
	colorMaxCount := 0

	var wilds []int
	var wilddraw4s []int

	var colorMatched []int
	var valueMatched []int

	for i, c := range cards {
		r := uno.CardColor(c)
		v := uno.CardValue(c)
		if v != uno.ValueWild && v != uno.ValueWildDraw4 {
			colorCount[r]++
			if colorCount[r] > colorMaxCount {
				colorMaxCount = colorCount[r]
				color = r
			}

			if r == matchColor {
				colorMatched = append(colorMatched, i)
			} else if v == matchValue {
				valueMatched = append(valueMatched, i)
			}
		} else if v == uno.ValueWild {
			wilds = append(wilds, i)
		} else {
			wilddraw4s = append(wilddraw4s, i)
		}
	}

	findMinValue := func(cs []uint8, ids []int) int {
		if len(cs) == 0 || len(ids) == 0 {
			return -1
		}

		min := uno.CardValue(cs[ids[0]])
		result := ids[0]
		for _, i := range ids {
			v := uno.CardValue(cs[i])
			if v < min {
				min = v
				result = i
			}
		}
		return result
	}

	if matchValue == uno.ValueWildDraw4 || matchValue == uno.ValueWild {
		// find color
		if len(colorMatched) > 0 {
			index = findMinValue(cards, colorMatched)
		}
	} else {
		// find value
		if len(valueMatched) > 0 {
			index = findMinValue(cards, valueMatched)
		}
	}

	if index < 0 && len(wilds) > 0 {
		// not found, find wild
		index = wilds[0]
	}
	if index < 0 && len(wilddraw4s) > 0 {
		// not found, find wild draw 4
		index = wilddraw4s[0]
	}

	return
}

func ai(t *Table, bot *Client) {
	state, ok := t.stateMap[bot.UID]
	if !ok {
		log.Error("unable to find state of uid", zap.Uint64("uid", bot.UID))
		return
	}

	action := &pb.C2SActionReq{}

	// what is last card
	lastCard := t.Discard[len(t.Discard)-1]

	log.Debug("🤖 last card is", zap.String("card", uno.CardToString(lastCard)))

	var cardToPlay uint8

	if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_CHALLENGE)) {
		// wild draw 4 and offered chance to challenge
		log.Debug("🤖 this player was offer an opportunity to challenge, but I always accept")
		action.Action = int32(pb.Action_ACTION_ACCEPT)
	} else if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_DRAW)) {
		// just draw from deck
		drawCard := state.Cards[len(state.Cards)-1]
		log.Debug("🤖 this player seems to have a card drawn from deck", zap.String("drawn", uno.CardToString(drawCard)))
		drawCardValue := uno.CardValue(drawCard)
		if drawCardValue == uno.ValueWildDraw4 {
			// try to find solution in old cards
			idx, maxColor := solve(state.Cards[:len(state.Cards)-1], lastCard)
			if idx >= 0 {
				// keep it to prevent challenge
				log.Debug("🤖 wow, I don't want to bluff a wild draw 4, I will keep")
				action.Action = int32(pb.Action_ACTION_KEEP)
			} else {
				log.Debug("🤖 legal wild draw 4, have at you!")
				cardToPlay = uno.CardMake(maxColor, uno.ValueWildDraw4)
			}
		} else {
			idx, maxColor := solve([]uint8{drawCard}, lastCard)
			if idx >= 0 {
				if drawCardValue == uno.ValueWild {
					cardToPlay = uno.CardMake(maxColor, uno.ValueWild)
				} else {
					cardToPlay = drawCard
				}
				log.Debug("🤖 the drawn card is good to play")
			} else {
				action.Action = int32(pb.Action_ACTION_KEEP)
				log.Debug("🤖 cannot play the drawn card, keep it")
			}
		}
	} else {
		idx, maxColor := solve(state.Cards, lastCard)
		if idx >= 0 {
			cardToPlay = state.Cards[idx]
			if uno.CardValue(cardToPlay) == uno.ValueWild || uno.CardValue(cardToPlay) == uno.ValueWildDraw4 {
				cardToPlay = uno.CardMake(maxColor, uno.CardValue(cardToPlay))
			}
		} else {
			action.Action = int32(pb.Action_ACTION_DRAW)
		}
	}

	if cardToPlay != 0 {
		log.Debug("🤖 finish AI with solution", zap.String("card", uno.CardToString(cardToPlay)))
		if len(state.Cards) == 2 {
			action.Action = int32(pb.Action_ACTION_UNO_PLAY)
		} else {
			action.Action = int32(pb.Action_ACTION_PLAY)
		}
		action.Card = append(action.Card, cardToPlay)
	} else {
		log.Debug("🤖 finish AI with no card", zap.String("action", action.String()))
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

	select {
	case bot.In <- *event:
	default:
	}
}
