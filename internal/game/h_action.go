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
			handlePlay(t, req, state, body, &result)
		case int32(pb.Action_ACTION_DRAW):
			handleDraw(t, req, state, body, &result)
		case int32(pb.Action_ACTION_KEEP):
			handleKeep(t, req, state, body, &result)
		case int32(pb.Action_ACTION_CHALLENGE):
			handleChallenge(t, req, state, body, &result)
		case int32(pb.Action_ACTION_ACCEPT):
			handleAccept(t, req, state, body, &result)
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

func handlePlay(t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Status = int32(pb.StatusCode_STATUS_OK)
	// if CHALLENGE flag is set, play can only choose to accept or challenge
	if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_CHALLENGE)) {
		result.Msg = "you can only challenge or accept wild draw 4"
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}
	// must play one card
	if len(action.Card) != 1 {
		result.Msg = "only one card are allowed"
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}
	// must play his/her own card
	cardIndex := 0
	if cardIndex = state.CardIndex(action.Card[0]); cardIndex == -1 {
		result.Msg = "card does not exists"
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_CARD_NOT_EXIST)
		return
	}

	if state.IsFlagSet(int32(pb.PlayerStatus_STATUS_DRAW)) {
		// player draw card from deck
		if cardIndex != len(state.Cards)-1 {
			// player must play or keep its last draw card after draw
			result.Msg = "you can only keep or play the card from your last draw"
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
			result.Msg = "color mismatched"
			result.Status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			return
		}
	} else if actionValue != discardTopValue && actionColor != discardTopColor {
		// one of the value/color must match the top of the discard pile
		result.Msg = "color or value must match with the last card played"
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}

	result.Events = make([]*pb.SingleEvent, 0)

	// card played
	body.Card = append(body.Card, actionCard)
	state.Cards = append(state.Cards[:cardIndex], state.Cards[cardIndex+1:]...)

	// clear player flag
	state.ClearFlag(int32(pb.PlayerStatus_STATUS_DRAW))

	t.LastPlayer = state.UID

	// events
	playEvent := &pb.SingleEvent{
		Uid:   state.UID,
		Event: int32(pb.Event_EVENT_PLAY),
		Card:  make([]byte, 1),
	}
	if action.Action == int32(pb.Action_ACTION_UNO_PLAY) {
		playEvent.Event = int32(pb.Event_EVENT_UNO_PLAY)
	}
	playEvent.Card[0] = actionCard
	result.Events = append(result.Events, playEvent)

	// action card effects
	var drawCount int
	skip := false

	switch actionValue {
	case uno.ValueReverse:
		t.Clockwise = !t.Clockwise
		result.Events = append(result.Events, &pb.SingleEvent{
			Event: int32(pb.Event_EVENT_REVERSE),
		})
	case uno.ValueDraw2:
		drawCount = uno.CardCount2
		skip = true
	case uno.ValueSkip:
		skip = true
		// case uno.ValueWildDraw4: if wild+4 is the last card of the player, should next player draw 4 cards before game over ?
	}

	// next player's turn
	nextPlayerUID := t.nextPlayer()

	if actionValue == uno.ValueWildDraw4 {
		// wild draw 4
		nextState := t.stateMap[nextPlayerUID]
		nextState.SetFlag(int32(pb.PlayerStatus_STATUS_CHALLENGE))
	}

	if drawCount > 0 {
		// draw cards
		drawCards(t, nextPlayerUID, drawCount, result)
	}

	if skip {
		// skip
		result.Events = append(result.Events, &pb.SingleEvent{
			Uid:   nextPlayerUID,
			Event: int32(pb.Event_EVENT_SKIP),
		})
		// to get next player's uid, need to set CurrentPlayer first
		t.CurrentPlayer = nextPlayerUID
		nextPlayerUID = t.nextPlayer()
	}

	// set next player
	t.CurrentPlayer = nextPlayerUID

	// check for uno
	if (len(state.Cards) == 1 && action.Action != int32(pb.Action_ACTION_UNO_PLAY)) || (len(state.Cards) > 1 && action.Action == int32(pb.Action_ACTION_UNO_PLAY)) {
		// penalty
		drawCards(t, state.UID, uno.CardCount2, result)
	}

	// there might be re-shuffle before, so put card in discard pile here
	t.Discard = append(t.Discard, actionCard)

	// check for game over
	if len(state.Cards) == 0 {
		result.GameOver = true
	} else {
		result.Events = append(result.Events, &pb.SingleEvent{
			Uid:   nextPlayerUID,
			Event: int32(pb.Event_EVENT_TURN),
		})
	}

	// reset timeout
	state.Timeout = false
	t.TimeLeft = t.Timeout
}

func handleDraw(t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Events = make([]*pb.SingleEvent, 0)
	state.SetFlag(int32(pb.PlayerStatus_STATUS_DRAW))
	card := drawCards(t, state.UID, 1, result)
	body.Card = make([]uint8, 1)
	body.Card[0] = card[0]

	state.Cards = append(state.Cards, card[0])

	// reset timeout
	state.Timeout = false
	t.TimeLeft = t.Timeout
}

func handleKeep(t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Status = int32(pb.StatusCode_STATUS_OK)
	if !state.IsFlagSet(int32(pb.PlayerStatus_STATUS_DRAW)) {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "you can only keep after drawing"
		return
	}

	result.Events = make([]*pb.SingleEvent, 0)
	state.ClearFlag(int32(pb.PlayerStatus_STATUS_DRAW))
	result.Events = append(result.Events, &pb.SingleEvent{
		Event: int32(pb.Event_EVENT_KEEP),
	})

	t.CurrentPlayer = t.nextPlayer()

	result.Events = append(result.Events, &pb.SingleEvent{
		Uid:   t.CurrentPlayer,
		Event: int32(pb.Event_EVENT_TURN),
	})

	state.Timeout = false
	t.TimeLeft = t.Timeout
}

func handleChallenge(t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Status = int32(pb.StatusCode_STATUS_OK)
	if !state.IsFlagSet(int32(pb.PlayerStatus_STATUS_CHALLENGE)) {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "you can only challenge after a wild draw 4"
		return
	}
	// double check
	if len(t.Discard) < 2 || uno.CardValue(t.Discard[len(t.Discard)-1]) != uno.ValueWildDraw4 {
		result.Status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "oops, something went wrong"
		return
	}

	// wild+4 will not trigger re-shuffle immediately
	prevCard := t.Discard[len(t.Discard)-2]
	// find if there are any available card
	lastPlayer, ok := t.stateMap[t.LastPlayer]
	if !ok {
		result.Status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "oops, something went wrong, check LastPlayer logic"
		return
	}
	penalty := false
	for _, c := range lastPlayer.Cards {
		cardValue := uno.CardValue(c)
		cardColor := uno.CardColor(c)
		if cardValue == uno.ValueWild || cardColor == uno.CardColor(prevCard) || cardValue == uno.CardValue(prevCard) {
			penalty = true
			break
		}
	}

	result.Events = make([]*pb.SingleEvent, 0)
	state.ClearFlag(int32(pb.PlayerStatus_STATUS_CHALLENGE))

	if penalty {
		// challenge success
		// last player draw 4 cards, and wild + 4 remains in discard pile
		drawCards(t, lastPlayer.UID, uno.CardCount4, result)
	} else {
		// challenge failed
		// this player draw 6 cards, and miss his turn
		drawCards(t, state.UID, uno.CardCount6, result)
		t.CurrentPlayer = t.nextPlayer()
	}

	result.Events = append(result.Events, &pb.SingleEvent{
		Uid:   t.CurrentPlayer,
		Event: int32(pb.Event_EVENT_TURN),
	})

	// reset timeout
	state.Timeout = false
	t.TimeLeft = t.Timeout
}

func handleAccept(t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp, result *HandleResult) {
	result.Status = int32(pb.StatusCode_STATUS_OK)
	if !state.IsFlagSet(int32(pb.PlayerStatus_STATUS_CHALLENGE)) {
		result.Status = int32(pb.StatusCode_STATUS_INVALID)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "you can only challenge after a wild draw 4"
		return
	}
	// double check
	if len(t.Discard) < 2 || uno.CardValue(t.Discard[len(t.Discard)-1]) != uno.ValueWildDraw4 {
		result.Status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		result.Msg = "oops, something went wrong"
		return
	}

	drawCards(t, state.UID, uno.CardCount4, result)
	t.CurrentPlayer = t.nextPlayer()

	state.ClearFlag(int32(pb.PlayerStatus_STATUS_CHALLENGE))

	// reset timeout
	result.Events = append(result.Events, &pb.SingleEvent{
		Uid:   t.CurrentPlayer,
		Event: int32(pb.Event_EVENT_TURN),
	})

	state.Timeout = false
	t.TimeLeft = t.Timeout
}

// helper function
func drawCards(t *Table, uid uint64, num int, result *HandleResult) []uint8 {
	card, err := t.Deck.Deals(num)
	if err != nil {
		// re-shuffle if needed
		result.Events = append(result.Events, t.recycleDiscardPile())
		card, _ = t.Deck.Deals(num)
	}
	drawEvent := &pb.SingleEvent{
		Uid:   uid,
		Event: int32(pb.Event_EVENT_DRAW),
		Card:  make([]uint8, num),
	}
	copy(drawEvent.Card, card)

	result.Events = append(result.Events, drawEvent)

	return card
}
