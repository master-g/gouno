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

	"github.com/master-g/gouno/pkg/lntime"

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/game"
	"github.com/master-g/gouno/internal/registry"
	"github.com/master-g/gouno/internal/router"
	"github.com/master-g/gouno/internal/sessions"
	"github.com/master-g/gouno/pkg/crypto"
	"go.uber.org/zap"
)

// handle client handshake request
// 1. verify token via database service
// 2. kick previous client if exists
// 3. exchange crypto seed
// 4. connect to game server with gRPC stream
var handshakeHandler = &router.Handler{
	ReqCmd:   pb.Cmd_HANDSHAKE_REQ,
	RespCmd:  pb.Cmd_HANDSHAKE_RESP,
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

		newToken := crypto.GenToken(req.Udid)
		// kick previous session
		if prev, ok := registry.Registry.Load(header.Uid); ok {
			if prevSession, ok := prev.(*sessions.Session); ok {
				if newToken != prevSession.Token {
					log.Debug("token not match", zap.String("prev", prevSession.Token), zap.String("new", newToken))
					status = int32(pb.StatusCode_STATUS_INVALID)
					err = errors.New("invalid token")
					return
				}
				// kick prev session
				prevSession.Push <- prevSession.ErrorResponse(int32(pb.Cmd_KICK_NOTIFY), int32(pb.KickReason_KICK_LOGIN_ELSEWHERE), "")
				prevSession.SetFlagKicked()
			} else {
				status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
				err = errors.New("unable to convert session from registry")
				return
			}
		}

		// register client to game server
		registerReq := &game.RegisterRequest{
			UID:         header.Uid,
			ClientEntry: make(chan *game.Client),
		}

		// send register request to game server
		game.Register <- registerReq

		// wait for game client
		// TODO: this might block if client.tid is not set by table.registerClient
		s.Client = <-registerReq.ClientEntry

		if s.Client == nil {
			s.SetFlagKicked()
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			err = errors.New("nil client returned from game server")
			return
		}

		// update session
		s.UID = header.Uid
		s.Token = newToken
		s.LastLogin = lntime.Timestamp()
		registry.Registry.Store(s.UID, s)
		s.SetFlagAuth()

		body := &pb.S2CHandshakeResp{
			Token: s.Token,
		}

		resp, err = proto.Marshal(body)
		if err != nil {
			status = int32(pb.StatusCode_STATUS_INTERNAL_ERROR)
			return
		}
		status = int32(pb.StatusCode_STATUS_OK)

		log.Debug("start fetch loop for session", zap.String("sess", s.String()))

		go s.FetchLoop()

		return
	},
}

func init() {
	addHandler(handshakeHandler)
}
