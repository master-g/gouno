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
	"fmt"

	"github.com/master-g/gouno/api/pb"
	"go.uber.org/zap"
)

type handlerFunc func(c *Client, t *Table, frame pb.Frame) (resp pb.Frame, err error)

// FrameHandler process client frames
type FrameHandler struct {
	ReqCmd  pb.GameCmd
	RespCmd pb.GameCmd
	Handler handlerFunc
}

func (h *FrameHandler) String() string {
	return fmt.Sprintf("req:%v resp:%v", h.ReqCmd.String(), h.RespCmd.String())
}

var (
	handlers   []*FrameHandler
	handlerMap map[int32]*FrameHandler
)

func addHandler(handler *FrameHandler) {
	handlers = append(handlers, handler)
}

func registerAllHandlers() {
	handlerMap = make(map[int32]*FrameHandler, len(handlers))
	for _, h := range handlers {
		log.Info("register game handler", zap.String("handler", h.String()))
		handlerMap[int32(h.ReqCmd)] = h
	}
}

func route(c *Client, t *Table, frame pb.Frame) {
	if h, ok := handlerMap[frame.Cmd]; ok {
		resp, err := h.Handler(c, t, frame)
		if err != nil {
			log.Error("error while handling game cmd", zap.String("handler", h.String()), zap.String("req", frame.String()))
		}

		select {
		case c.Out <- resp:
		default:
			// TODO: is this default necessary ?
		}

	} else {
		log.Warn("no handler for cmd", zap.Int32("cmd", frame.Cmd))
		resp := pb.Frame{
			Type:    pb.FrameType_Kick,
			Status:  int32(pb.StatusCode_STATUS_UNKNOWN_CMD),
			Message: "unknown cmd",
		}
		c.Out <- resp
	}
}
