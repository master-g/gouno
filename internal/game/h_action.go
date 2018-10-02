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
	Handler: func(c *Client, t *Table, frame pb.Frame) (resp []byte, status int32, msg string, err error) {
		status = int32(pb.StatusCode_STATUS_OK)
		body := &pb.S2CActionResp{
			Result: int32(pb.ActionResult_ACTION_RESULT_OK),
		}
		if t.Stage != StagePlaying {
			body.Result = int32(pb.ActionResult_ACTION_RESULT_GAME_NOT_START)
			msg = "game not started"
			return
		}
		if t.CurrentPlayer != c.UID {
			body.Result = int32(pb.ActionResult_ACTION_RESULT_NOT_TURN)
			msg = "not your turn"
			return
		}
		state, ok := t.stateMap[c.UID]
		if !ok {
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			msg = "player state not exists"
			return
		}

		req := pb.C2SActionReq{}
		err = proto.Unmarshal(frame.Body, &req)
		if err != nil {
			status = int32(pb.StatusCode_STATUS_INVALID)
			body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
			msg = err.Error()
			return
		}

		switch req.Action {
		case int32(pb.Action_ACTION_PLAY):
			fallthrough
		case int32(pb.Action_ACTION_UNO_PLAY):
			handlePlay(c, t, req, state, body)
		case int32(pb.Action_ACTION_DRAW):
			handleDraw(c, t, req)
		case int32(pb.Action_ACTION_CHALLENGE):
			handleChallenge(c, t, req)
		default:
			status = int32(pb.StatusCode_STATUS_INVALID)
			msg = "invalid action"
		}

		resp, err = proto.Marshal(body)
		if err != nil {
			msg = err.Error()
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
		}

		return
	},
}

func init() {
	addHandler(actionReqHandler)
}

func handlePlay(c *Client, t *Table, action pb.C2SActionReq, state *PlayerState, body *pb.S2CActionResp) {
	// must play one card
	if len(action.Card) != 1 {
		body.Result = int32(pb.ActionResult_ACTION_RESULT_INVALID)
		return
	}
	// must play his/her own card
	if !state.HasCard(action.Card[0]) {
		body.Result = int32(pb.ActionResult_ACTION_RESULT_CARD_NOT_EXIST)
		return
	}
	// has player draw card from deck
	if state.IsFlagSet(PlayerStatusDraw) {
		if state.Cards[len(state.Cards)-1] != action.Card[0] {
			// player must play or keep its last draw card after draw
			body.Result = int32(pb.ActionResult_ACTION_RESULT_NOT_DRAW_CARD)
			return
		}
	}

	//

	// the first card of the table is wild
	if len(t.Discard) == 1 && uno.CardValue(t.Discard[0]) == uno.ValueWild {
		body.Card = append(body.Card, action.Card[0])
		state.Cards = append(state.Cards[:len(state.Cards)-1])
		// broadcast
	}

	// check for uno

	// check for game over
}

func handleDraw(c *Client, t *Table, action pb.C2SActionReq) {

}

func handleChallenge(c *Client, t *Table, action pb.C2SActionReq) {

}
