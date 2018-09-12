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
	"errors"

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/crypto"
	"github.com/master-g/gouno/lntime"
	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/registry"
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
		// parse request body
		req := &pb.C2SHandshakeReq{}
		err = proto.Unmarshal(header.Body, req)
		if err != nil {
			status = int32(pb.StatusCode_STATUS_INVALID)
			s.SetFlagKicked()
			return
		}
		// kick previous session
		if prev, ok := registry.Registry.Load(header.Uid); ok {
			if prevSession, ok := prev.(*sessions.Session); ok {
				newToken := crypto.GenToken(req.Udid)
				if newToken != s.Token {
					status = int32(pb.StatusCode_STATUS_INVALID)
					err = errors.New("invalid token")
					return
				}
				// kick prev session
				prevSession.Push <- prevSession.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), int32(pb.KickReason_KICK_LOGIN_ELSEWHERE), "")
				prevSession.SetFlagKicked()
				// update session
				s.Token = newToken
				s.LastLogin = lntime.Timestamp()
				registry.Registry.Store(s.UID, s)
			} else {
				status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
				err = errors.New("unable to convert session from registry")
				return
			}
		}

		registry.Registry.Store(header.Uid, s)
		s.SetFlagAuth()

		body := &pb.S2CHandshakeRsp{
			Token: s.Token,
		}

		resp, err = proto.Marshal(body)
		if err != nil {
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			return
		}
		status = int32(pb.StatusCode_STATUS_OK)

		// TODO: add session to game

		return
	},
}

func init() {
	addHandler(handshakeHandler)
}
