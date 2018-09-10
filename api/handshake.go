// Copyright © 2018 Project Lop Nur <project.lopnur@gmail.com>
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
	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/router"
	"github.com/master-g/gouno/sessions"
)

// handle client handshake request
// 1. verify token via database service
// 2. kick previous client if exists
// 3. exchange crypto seed
// 4. connect to game server with gRPC stream
var handshakeHandler = &router.Handler{
	ReqCmd:   pb.Cmd_HANDSHAKE_REQ,
	RespCmd:  pb.Cmd_HANDSHAKE_RSP,
	AuthFree: true,
	Handler: func(s *sessions.Session, header *pb.C2SHeader) (resp []byte, status int32, err error) {
		return nil, int32(pb.StatusCode_STATUS_OK), nil
	},
}

func init() {
	addHandler(handshakeHandler)
}
