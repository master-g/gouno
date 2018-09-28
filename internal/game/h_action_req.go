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

import "github.com/master-g/gouno/api/pb"

var actionReqHandler = &FrameHandler{
	ReqCmd:  pb.GameCmd_ACTION_REQ,
	RespCmd: pb.GameCmd_ACTION_RSP,
	Handler: func(c *Client, t *Table, frame pb.Frame) (resp pb.Frame, err error) {
		c.ClearFlagOffline()

		resp = pb.Frame{
			Type: pb.FrameType_Message,
			Cmd:  int32(pb.GameCmd_ACTION_RSP),
		}
		if t.Stage != StagePlaying {
			resp.Status = int32(pb.StatusCode_STATUS_INVALID)
			resp.Message = "game not started"
			return
		}
		if t.CurrentPlayer != c.UID {
			resp.Status = int32(pb.StatusCode_STATUS_INVALID)
			resp.Message = "not your turn"
			return
		}
		// TODO
		// EVENT_RESERVED          = 0; // noop, this event is send by server
		// EVENT_TURN              = 1; // noop, this event is send by server
		// EVENT_PLAY              = 2; // player play card
		// EVENT_UNO_PLAY          = 3; // player play card and say uno
		// EVENT_DRAW              = 4; // player draw cards from deck
		// EVENT_SKIP              = 5; // noop, this event is send by server
		// EVENT_CHALLENGE         = 6; // player challenge last player's wild+4 card
		// EVENT_CHALLENGE_PENALTY = 7; // noop, this event is send by server
		// EVENT_TIMEOUT           = 8; // noop, this event is send by server
		// EVENT_DECK_SHUFFLE      = 9; // noop, this event is send by server

		return
	},
}

func init() {
	addHandler(actionReqHandler)
}
