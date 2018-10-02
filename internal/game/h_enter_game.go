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
	"go.uber.org/zap"
)

var enterGameHandler = &FrameHandler{
	ReqCmd:  pb.GameCmd_ENTER_GAME_REQ,
	RespCmd: pb.GameCmd_ENTER_GAME_RESP,
	Handler: func(c *Client, t *Table, frame pb.Frame) (resp []byte, status int32, msg string, err error) {
		// prepare response
		state := HideCardsForUID(t.DumpState(), c.UID)
		resp, err = proto.Marshal(state)
		if err != nil {
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			msg = err.Error()
			log.Error("error while marshaling proto", zap.Error(err))
			return
		}

		return
	},
}

func init() {
	addHandler(enterGameHandler)
}
