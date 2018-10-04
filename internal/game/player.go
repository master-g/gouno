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
	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/uno"
)

// PlayerState holds player status, for it is more related to table not client
type PlayerState struct {
	UID     uint64  // uid
	Flag    int32   // flags
	Cards   []uint8 // cards
	Timeout bool    // timeout
	Score   int32   // player score
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

// CardIndex return index of the card, if not exist, -1 will be returned
func (p PlayerState) CardIndex(card uint8) int {
	index := -1
	for i, v := range p.Cards {
		if v == card {
			index = i
			break
		}
	}
	return index
}

// HideCardsForUID will hide other player's cards for player with given uid
func HideCardsForUID(state *pb.TableState, uid uint64) *pb.TableState {
	newState := proto.Clone(state).(*pb.TableState)
	for _, player := range newState.Players {
		if player.Uid != uid {
			player.Cards = make([]uint8, len(player.Cards))
		}
	}

	return newState
}

// Dump convert PlayerState to pb.UnoPlayer
func (p PlayerState) Dump() *pb.UnoPlayer {
	state := &pb.UnoPlayer{
		Uid:    p.UID,
		Status: p.Flag,
		Cards:  make([]uint8, len(p.Cards)),
		Score:  p.Score,
	}
	copy(state.Cards, p.Cards)
	return state
}

// Score convert cards to score after game over
func (p PlayerState) CalculateScore() int32 {
	var score int32
	for _, c := range p.Cards {
		score += uno.CardScore(c)
	}
	return score
}

func (p *PlayerState) ResetForNewGame() {
	p.Flag = 0
	p.Score = 0
}
