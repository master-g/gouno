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

	"github.com/gogo/protobuf/proto"
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
	FrameQueueSize   int
}

// InFrame pair of client and incoming frame
type InFrame struct {
	C *Client
	F *pb.Frame
}

// Stages
const (
	StageIdle     = iota // wait for enough players to start the game
	StageWait            // the game is about to start in few seconds
	StagePlaying         // the game is running
	StageGameOver        // the game is just finished yet, will change to wait in few seconds
)

// Table holds state of an uno game
type Table struct {
	// TID table ID
	TID uint64
	// Stage see stage constants
	Stage int
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
	// Timeout for the stage, in seconds
	Timeout int
	// TimeLeft for seconds left
	TimeLeft int
	// States array of player state
	States []*PlayerState
	// Clients array of clients
	Clients []*Client
	// Register channel for client
	Register chan *RegisterRequest
	// InFrames from clients
	InFrames chan *InFrame

	gameOverTimeout int
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
		FrameQueueSize:   32,
	}

	tidCounter = uint64(rand.Uint32())
}

// NewTable creates and returns pointer to a new table instance
func NewTable() *Table {
	tidCounter++
	table := &Table{
		TID:       tidCounter,
		Stage:     StageIdle,
		Clockwise: true,
		Deck:      uno.NewDeck(),
	}
	tableMap.Store(table.TID, table)
	return table
}

func (t *Table) String() string {
	return ""
}

// DumpState dumps table status and returns in TableState
func (t Table) DumpState(c *Client) *pb.TableState {
	state := &pb.TableState{
		Tid:           t.TID,
		Playing:       t.Stage != StageIdle,
		Timeout:       int32(t.Timeout),
		TimeLeft:      int32(t.TimeLeft),
		Clockwise:     t.Clockwise,
		DealerUid:     t.Dealer,
		LastPlayer:    t.LastPlayer,
		CurrentPlayer: t.CurrentPlayer,
		CardsLeft:     int32(t.Deck.CardsRemaining()),
		DiscardPile:   t.Discard,
		Players:       make([]*pb.UnoPlayer, len(t.States)),
	}
	for i, v := range t.States {
		state.Players[i] = v.Dump(c.UID == v.UID)
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

	// start read pump
	go func() {
		for {
			select {
			case frame, ok := <-client.In:
				if !ok {
					log.Info("client input channel closed")
					return
				}
				t.InFrames <- &InFrame{
					C: client,
					F: &frame,
				}
			case <-client.Die:
				log.Info("client die")
				return
			}
		}
	}()

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

func (t *Table) broadcast(f *pb.Frame) {
	for _, c := range t.Clients {
		if !c.IsFlagOfflineSet() {
			select {
			case c.Out <- *f:
			default:
				// TODO: is this default necessary ?
				// same reason as router
			}
		}
	}
}

func (t *Table) newPlayerJoin(uid uint64) {
	body := &pb.S2CPlayerJoinNty{
		Uid: uid,
	}
	data, err := proto.Marshal(body)
	if err != nil {
		log.Error("unable to marshal proto", zap.Error(err))
		return
	}
	frame := &pb.Frame{
		Type: pb.FrameType_Message,
		Body: data,
	}
	t.broadcast(frame)
}

func (t *Table) playerLeftTable(uid uint64) {
	body := &pb.S2CPlayerLeftNty{
		Uid: uid,
	}
	data, err := proto.Marshal(body)
	if err != nil {
		log.Error("unable to marshal proto", zap.Error(err))
		return
	}
	frame := &pb.Frame{
		Type: pb.FrameType_Message,
		Body: data,
	}
	t.broadcast(frame)
}

func (t *Table) tick() {

}

// table logic loop
func (t *Table) start(wg *sync.WaitGroup) {
	t.Register = make(chan *RegisterRequest)
	t.InFrames = make(chan *InFrame, tableConfig.FrameQueueSize)

	defer func() {
		close(t.Register)
		wg.Done()
	}()

	// tick every second
	ticker := time.NewTicker(time.Second)

	for {
		select {
		case req := <-t.Register:
			t.registerClient(req)
			// broadcast new player join
			t.newPlayerJoin(req.UID)
		case inFrame := <-t.InFrames:
			route(inFrame.C, t, *inFrame.F)
		case <-ticker.C:
			// state machine here
			t.tick()
		}

		// if game is over, remove offline clients
		if t.Stage != StagePlaying {
			for _, c := range t.Clients {
				if c.IsFlagOfflineSet() {
					t.unregisterClient(c)
				}
			}
		}
	}
}
