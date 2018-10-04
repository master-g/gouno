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
	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/uno"
)

var actionReqHandler = &FrameHandler{
	ReqCmd:  pb.GameCmd_ACTION_REQ,
	RespCmd: pb.GameCmd_ACTION_RESP,
	Handler: func(c *Client, t *Table, frame pb.Frame) (result HandleResult) {
		result.Status = int32(pb.StatusCode_STATUS_OK)
		body := &pb.S2CActionResp{
			Result: int32(pb.ActionResult_ACTION_RESULT_OK),
		}
		if t.Stage != StagePlaying {
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_GAME_NOT_START)
			result.Msg = "game not started"
			return
		}
		if t.CurrentPlayer != c.UID {
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_NOT_TURN)
			result.Msg = "not your turn"
			return
		}
		state, ok := t.stateMap[c.UID]
		if !ok {
			result.Status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			result.Msg = "player state not exists"
			return
		}

		req := pb.C2SActionReq{}
		result.Err = proto.Unmarshal(frame.Body, &req)
		if result.Err != nil {
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			result.Msg = result.Err.Error()
			return
		}

		switch req.Action {
		case int32(pb.Action_ACTION_PLAY):
			fallthrough
		case int32(pb.Action_ACTION_UNO_PLAY):
			handlePlay(c, t, req, state, body, &result)
		case int32(pb.Action_ACTION_DRAW):
			handleDraw(c, t, req)
		case int32(pb.Action_ACTION_KEEP):
		case int32(pb.Action_ACTION_CHALLENGE):
			handleChallenge(c, t, req)
		case int32(pb.Action_ACTION_ACCEPT):
		default:
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			result.Msg = "invalid action"
		}

		result.Body, result.Err = proto.Marshal(body)
		if result.Err != nil {
			result.Msg = result.Err.Error()
			result.Status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
		}

		return
	},
}

func init() {
	addHandler(actionReqHandler)
}

func handlePlay(c *Client, t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Status = int32(pb.StatusCode_STATUS_OK)
	// if CHALLENGE flag is set, play can only choose to accept or challenge
	if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_CHALLENGE)) {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "you can only challenge or accept wild draw 4"
		return
	}
	// must play one card
	if len(action.Card) != 1 {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}
	// must play his/her own card
	cardIndex := 0
	if cardIndex = state.CardIndex(action.Card[0]); cardIndex != -1 {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_CARD_NOT_EXIST)
		return
	}

	if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_DRAW)) {
		// player draw card from deck
		if cardIndex != len(state.Cards)-1 {
			// player must play or keep its last draw card after draw
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_NOT_DRAW_CARD)
			return
		}
	}
	// else process as normal play

	//
	actionCard := action.Card[0]
	actionColor := uno.CardColor(actionCard)
	actionValue := uno.CardValue(actionCard)
	discardTop := t.Discard[len(t.Discard)-1]
	discardTopValue := uno.CardValue(discardTop)
	discardTopColor := uno.CardColor(discardTop)
	if !t.DeckRecycled && len(t.Discard) == 1 && discardTopValue == uno.ValueWild {
		// the first card of the table is wild, player can play any card
	} else if actionValue == uno.ValueWild || actionValue == uno.ValueWildDraw4 {
		// player play wild or wild+4
	} else if discardTopValue == uno.ValueWild || discardTopValue == uno.ValueWildDraw4 {
		// last card in discard pile is wild/wild+4
		if actionColor != discardTopColor {
			// must match wild color
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			return
		}
	} else if actionValue != discardTopValue && actionColor != discardTopColor {
		// one of the value/color must match the top of the discard pile
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}

	notify := &pb.S2CEventNty{}

	// card played
	body.Card = append(body.Card, actionCard)
	state.Cards = append(state.Cards[:cardIndex], state.Cards[cardIndex+1:]...)

	// clear player flag
	state.ClearFlag(int32(pb.PlayerStatus_STATUS_DRAW))

	// events
	playEvent := &pb.SingleEvent{
		Uid:   c.UID,
		Event: int32(pb.Event_EVENT_PLAY),
		Card:  make([]byte, 1),
	}
	playEvent.Card[0] = actionCard
	notify.Events = append(notify.Events, playEvent)

	var err error

	switch actionValue {
	case uno.ValueReverse:
		t.Clockwise = !t.Clockwise
		notify.Events = append(notify.Events, &pb.SingleEvent{
			Event: int32(pb.Event_EVENT_REVERSE),
		})
	case uno.ValueDraw2, uno.ValueWildDraw4:
		drawCount := uno.CardCount4
		if actionValue == uno.ValueDraw2 {
			drawCount = uno.CardCount2
		}
		nextPlayerUID := t.nextPlayer()
		// draw cards
		drawEvent := &pb.SingleEvent{
			Uid:   nextPlayerUID,
			Event: int32(pb.Event_EVENT_DRAW),
		}
		drawEvent.Card, err = t.Deck.Deals(drawCount)
		if err != nil {
			// re-shuffle if needed
			notify.Events = append(notify.Events, t.recycleDiscardPile())
			drawEvent.Card, _ = t.Deck.Deals(drawCount)
		}

		notify.Events = append(notify.Events, drawEvent)
		// skip
		fallthrough
	case uno.ValueSkip:
		// skip
		t.CurrentPlayer = t.nextPlayer()
		notify.Events = append(notify.Events, &pb.SingleEvent{
			Uid:   t.CurrentPlayer,
			Event: int32(pb.Event_EVENT_SKIP),
		})
	}

	// check for uno

	// check for game over

	return
}

func handleDraw(c *Client, t *Table, action pb.C2SActionReq) {

}

func handleChallenge(c *Client, t *Table, action pb.C2SActionReq) {

}
