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
	"math/rand"
	"sync"
	"time"

	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/uno"
	"go.uber.org/zap"
)

// TableConfig holds table timeout configs
type TableConfig struct {
	TurnTimeout      time.Duration
	GameOverDuration time.Duration
	MinPlayers       int
	MaxPlayers       int
}

// Table holds state of an uno game
type Table struct {
	// TID table ID
	TID uint64
	// Playing indicates the game is running
	Playing bool
	// Clockwise indicates the current order is clockwise, otherwise CCW
	Clockwise bool
	// Dealer UID of the dealer
	Dealer uint64
	// LastPlayer UID of last player
	LastPlayer uint64
	// CurrentPlayer UID of current player
	CurrentPlayer uint64
	// Deck on this table
	Deck *uno.Deck
	// Discard holds uno cards that has been discard
	Discard []uint8
	// States array of player state
	States []*PlayerState
	// Clients array of clients
	Clients []*Client
	// Register channel for client
	Register chan *RegisterRequest
}

var (
	tidCounter  uint64 // no need for atomic, since we only access it in game's goroutine
	tableMap    sync.Map
	tableConfig TableConfig
)

func init() {
	tableConfig = TableConfig{
		TurnTimeout:      time.Second * 10,
		GameOverDuration: time.Second * 5,
		MinPlayers:       2,
		MaxPlayers:       4,
	}

	tidCounter = uint64(rand.Uint32())
}

func findAvailableTable() *Table {
	var result *Table
	tableMap.Range(func(key, value interface{}) bool {
		if t, ok := value.(*Table); ok {
			if !t.Playing && len(t.Clients) < tableConfig.MaxPlayers {
				result = t
				return false
			}
		}
		return true
	})

	return result
}

func findTable(tid uint64) *Table {
	if t, ok := tableMap.Load(tid); ok {
		table, ok := t.(*Table)
		if ok {
			return table
		}
	}
	return nil
}

// NewTable creates and returns pointer to a new table instance
func NewTable() *Table {
	tidCounter++
	table := &Table{
		TID:       tidCounter,
		Playing:   false,
		Clockwise: true,
		Deck:      uno.NewDeck(),
	}
	tableMap.Store(table.TID, table)
	return table
}

func (t *Table) String() string {
	return ""
}

// DumpState dumps table status and returns in S2CTableState
func (t Table) DumpState(hideCards bool) *pb.S2CTableState {
	state := &pb.S2CTableState{
		Tid:           t.TID,
		Playing:       t.Playing,
		Clockwise:     t.Clockwise,
		DealerUid:     t.Dealer,
		LastPlayer:    t.LastPlayer,
		CurrentPlayer: t.CurrentPlayer,
		CardsLeft:     int32(t.Deck.CardsRemaining()),
		CardsPlayed:   t.Discard,
		TableConfig: &pb.TableConfig{
			TurnTimeout:      int32(tableConfig.TurnTimeout.Seconds()),
			GameOverDuration: int32(tableConfig.GameOverDuration.Seconds()),
		},
		Players: make([]*pb.UnoPlayer, len(t.States)),
	}
	for i, v := range t.States {
		state.Players[i] = v.Dump(hideCards)
	}
	return state
}

func (t *Table) registerClient(req *RegisterRequest) {
	// add client
	client := &Client{
		UID: req.UID,
		In:  make(chan pb.Frame),
		Out: make(chan pb.Frame),
		Die: make(chan struct{}),
	}
	t.Clients = append(t.Clients, client)

	// add state
	state := NewPlayerState(req.UID)
	t.States = append(t.States, state)

	// pass client back to agent
	req.ClientEntry <- client

	log.Info("client created for new connection", zap.Uint64("uid", req.UID))
}

func (t *Table) unregisterClient(c *Client) {
	clients.Delete(c.UID)
	close(c.Die)
	close(c.In)
	close(c.Out)

	for i, v := range t.Clients {
		if v.UID == c.UID {
			// remove client and player state
			t.Clients = append(t.Clients[:i], t.Clients[i+1:]...)
			t.States = append(t.States[:i], t.States[i+1:]...)
			break
		}
	}
}

// table logic loop
func (t *Table) start(wg *sync.WaitGroup) {
	t.Register = make(chan *RegisterRequest)

	defer func() {
		close(t.Register)
		wg.Done()
	}()

	for {
		select {
		case req := <-t.Register:
			t.registerClient(req)
			// TODO: table timer logic here
		}

		// client request read pump
		for _, c := range t.Clients {
			select {
			case frame := <-c.In:
				route(c, t, frame)
			}
		}

		// if game is over, remove offline clients
		if !t.Playing {
			for _, c := range t.Clients {
				if c.IsFlagOfflineSet() {
					// TODO: will there be any bug?
					t.unregisterClient(c)
				}
			}
		}
	}
}
