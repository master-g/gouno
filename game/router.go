package game

import (
	"fmt"

	"go.uber.org/zap"

	"github.com/master-g/gouno/proto/pb"
)

type handlerFunc func(c *Client, frame pb.Frame) (resp pb.Frame, err error)

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

func route(client *Client, frame pb.Frame) {
	if h, ok := handlerMap[frame.Cmd]; ok {
		resp, err := h.Handler(client, frame)
		if err != nil {
			log.Info("error while handling cmd", zap.String("client", client.String()), zap.Int32("cmd", frame.Cmd))
		} else {
			client.Out <- resp
		}
	} else {
		log.Warn("no handler for cmd", zap.Int32("cmd", frame.Cmd))
	}
}
