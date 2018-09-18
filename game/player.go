package game

import "github.com/master-g/gouno/proto/pb"

// Player status
const (
	PlayerStatusUno       = 0x01
	PlayerStatusSkip      = 0x02
	PlayerStatusChallenge = 0x04
)

// PlayerState holds player status, for it is more related to table not client
type PlayerState struct {
	UID     uint64  // uid
	Timeout int     // seconds to timeout
	Flag    int32   // flags
	Cards   []uint8 // cards
}

// IsFlagSet returns true if flag is set
func (p PlayerState) IsFlagSet(flag int32) bool {
	return p.Flag&flag != 0
}

// ClearFlag clear flag bit
func (p *PlayerState) ClearFlag(flag int32) {
	p.Flag &^= flag
}

// SetFlag set flag bit
func (p *PlayerState) SetFlag(flag int32) {
	p.Flag |= flag
}

// Dump convert PlayerState to pb.UnoPlayer
func (p PlayerState) Dump(hideCards bool) *pb.UnoPlayer {
	state := &pb.UnoPlayer{
		Uid:     p.UID,
		Timeout: int32(p.Timeout),
		Status:  p.Flag,
		Cards:   make([]uint8, len(p.Cards)),
	}
	if !hideCards {
		copy(state.Cards, p.Cards)
	}
	return state
}
