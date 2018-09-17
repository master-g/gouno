package game

import "github.com/master-g/gouno/proto/pb"

var enterGameHandler = &FrameHandler{
	ReqCmd:  pb.GameCmd_ENTER_GAME_REQ,
	RespCmd: pb.GameCmd_ENTER_GAME_RSP,
	Handler: func(c *Client, frame pb.Frame) (resp pb.Frame, err error) {
		// valid command, clear offline flag
		c.ClearFlagOffline()

		if c.TID != 0 {
			// find unfinished game
		} else {
			// new game
		}
		return pb.Frame{}, nil
	},
}

func init() {
	addHandler(enterGameHandler)
}
