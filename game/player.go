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

import "github.com/master-g/gouno/proto/pb"

// Player status
const (
	PlayerStatusUno       = 0x01
	PlayerStatusSkip      = 0x02
	PlayerStatusChallenge = 0x04
)

// PlayerState holds player status, for it is more related to table not client
type PlayerState struct {
	UID   uint64  // uid
	Flag  int32   // flags
	Cards []uint8 // cards
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

// NewPlayerState creates and returns pointer to a new PlayerState instance
func NewPlayerState(uid uint64) *PlayerState {
	return &PlayerState{
		UID: uid,
	}
}

// Dump convert PlayerState to pb.UnoPlayer
func (p PlayerState) Dump(showCards bool) *pb.UnoPlayer {
	state := &pb.UnoPlayer{
		Uid:    p.UID,
		Status: p.Flag,
		Cards:  make([]uint8, len(p.Cards)),
	}
	if showCards {
		copy(state.Cards, p.Cards)
	}
	return state
}
