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

package api

import (
	"github.com/master-g/gouno/internal/router"
	"github.com/master-g/gouno/internal/sessions"
	"github.com/master-g/gouno/proto/pb"
)

// heartbeatHandler common.Cmd_HEART_BEAT_REQ
var heartbeatHandler = &router.Handler{
	ReqCmd:  pb.Cmd_HEART_BEAT_REQ,
	RespCmd: pb.Cmd_HEART_BEAT_RSP,
	Handler: func(s *sessions.Session, header *pb.C2SHeader) (resp []byte, status int32, err error) {
		status = int32(pb.StatusCode_STATUS_OK)
		return
	},
}

func init() {
	addHandler(heartbeatHandler)
}
