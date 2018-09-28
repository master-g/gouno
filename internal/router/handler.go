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

package router

import (
	"fmt"

	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/sessions"
)

// HandlerFunc defines request handler function type
type HandlerFunc func(s *sessions.Session, header *pb.C2SHeader) (resp []byte, status int32, err error)

// Handler process client packets
type Handler struct {
	ReqCmd   pb.Cmd
	RespCmd  pb.Cmd
	AuthFree bool
	Handler  HandlerFunc
}

func (h *Handler) String() string {
	return fmt.Sprintf("req:%v resp:%v", h.ReqCmd.String(), h.RespCmd.String())
}
