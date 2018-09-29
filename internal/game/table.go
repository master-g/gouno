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
	"math/rand"
	"sync"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/uno"
	"github.com/master-g/gouno/pkg/signal"
	"go.uber.org/zap"
)

// TableConfig holds table timeout configs
type TableConfig struct {
	TurnTimeout           int // timeout of a turn
	GameOverTimeout       int // timeout of game over
	IdleTimeout           int // timeout before adding bots
	WaitTimeout           int // timeout before starting a game
	PrepareTimeout        int // timeout before playing
	AIAssistantMinTimeout int // minimum timeout for AI to kick in
	AIAssistantMaxTimeout int // maximum timeout for AI to kick in
	MinPlayers            int // minimum players to start the game
	MaxPlayers            int // maximum players a game can play with
	FrameQueueSize        int // input frame queue size
}

// InFrame pair of client and incoming frame
type InFrame struct {
	C *Client
	F *pb.Frame
}

// Stages
const (
	StageIdle     = 0 // wait for enough players to start the game
	StageWait     = 1 // the game is about to start in few seconds
	StagePlaying  = 2 // the game is running
	StageGameOver = 3 // the game is just finished yet, will change to wait in few seconds
	StagePrepare  = 4 // hidden stage for client to show the game start animations, will change to StagePlaying in a few seconds
)

// Table holds state of an uno game
type Table struct {
	// TID table ID
	TID uint64
	// Stage see stage constants
	Stage int
	// Clockwise indicates the current order is clockwise, otherwise CCW
	Clockwise bool
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

	// StartPlayer UID of starting player
	startPlayer uint64
	stateMap    map[uint64]*PlayerState
	clientMap   map[uint64]*Client

	gameOverTimeout int
}

var (
	tidCounter         uint64 // no need for atomic, since we only access it in game's goroutine
	tableMap           sync.Map
	tableConfig        *TableConfig
	defaultTableConfig = &TableConfig{
		TurnTimeout:           10,
		GameOverTimeout:       5,
		IdleTimeout:           30,
		WaitTimeout:           3,
		PrepareTimeout:        3,
		AIAssistantMinTimeout: 1,
		AIAssistantMaxTimeout: 6,
		MinPlayers:            2,
		MaxPlayers:            4,
		FrameQueueSize:        32,
	}
)

func init() {
	tableConfig = defaultTableConfig
	tidCounter = uint64(rand.Uint32())
}

// SetTableConfig from outside
func SetTableConfig(config *TableConfig) {
	if config == nil {
		tableConfig = defaultTableConfig
	} else {
		tableConfig = config
	}
}

// NewTable creates and returns pointer to a new table instance
func NewTable() *Table {
	tidCounter++
	table := &Table{
		TID:       tidCounter,
		Stage:     StageIdle,
		Clockwise: true,
		Deck:      uno.NewDeck(),
		Timeout:   tableConfig.IdleTimeout,
		TimeLeft:  tableConfig.IdleTimeout,
		Discard:   make([]uint8, 0, uno.CardSetSize),
		stateMap:  make(map[uint64]*PlayerState),
		clientMap: make(map[uint64]*Client),
	}
	tableMap.Store(table.TID, table)
	return table
}

func (t *Table) String() string {
	return fmt.Sprintf("tid:%v stage:%v", t.TID, t.Stage)
}

// DumpState dumps table status and returns in TableState
func (t Table) DumpState() *pb.TableState {
	state := &pb.TableState{
		Tid:           t.TID,
		Status:        pb.TableStatus(t.Stage),
		Timeout:       int32(t.Timeout),
		TimeLeft:      int32(t.TimeLeft),
		Clockwise:     t.Clockwise,
		LastPlayer:    t.LastPlayer,
		CurrentPlayer: t.CurrentPlayer,
		CardsLeft:     int32(t.Deck.CardsRemaining()),
		DiscardPile:   t.Discard,
		Players:       make([]*pb.UnoPlayer, len(t.States)),
	}
	for i, playerState := range t.States {
		state.Players[i] = playerState.Dump()
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
	t.stateMap[req.UID] = state
	t.clientMap[req.UID] = client

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
			delete(t.stateMap, v.UID)
			delete(t.clientMap, v.UID)
			break
		}
	}
}

func (t *Table) broadcast(cmd pb.GameCmd, msg proto.Message) {
	log.Debug("broadcasting")
	data, err := proto.Marshal(msg)
	if err != nil {
		log.Error("unable to marshal proto msg", zap.Error(err))
		return
	}

	frame := &pb.Frame{
		Cmd:    int32(cmd),
		Status: int32(pb.StatusCode_STATUS_OK),
		Type:   pb.FrameType_Message,
		Body:   data,
	}

	for _, c := range t.Clients {
		// TODO: is this offline flag really necessary in here ?
		if !c.IsFlagOfflineSet() {
			select {
			case c.Out <- *frame:
			default:
				// TODO: is this default necessary ?
				// same reason as router
			}
		}
	}
	log.Debug("broadcast")
}

// this is a bit different from broadcast, since one player cannot see other player's cards
func (t *Table) notifyGameStart() {
	state := t.DumpState()
	// manually set the status to playing, since the actual table status is prepare
	state.Status = pb.TableStatus_STATUS_PLAYING
	for _, c := range t.Clients {
		newState := HideCardsForUID(state, c.UID)
		data, err := proto.Marshal(newState)
		if err != nil {
			log.Error("unable to marshal proto msg", zap.Error(err))
			return
		}

		frame := &pb.Frame{
			Cmd:    int32(pb.GameCmd_GAME_START_NTY),
			Status: int32(pb.StatusCode_STATUS_OK),
			Type:   pb.FrameType_Message,
			Body:   data,
		}

		if !c.IsFlagOfflineSet() {
			select {
			case c.Out <- *frame:
			default:
			}
		}
	}
}

func (t *Table) changeStage(toStage int) {
	if t.Stage == toStage {
		log.Error("change to same stage")
		return
	}
	log.Info("table stage change to", zap.Int("toStage", toStage))

	switch toStage {
	case StageIdle:
		t.Timeout = tableConfig.IdleTimeout
	case StageWait:
		t.Timeout = tableConfig.WaitTimeout
	case StagePrepare:
		t.Timeout = tableConfig.PrepareTimeout
	case StagePlaying:
		t.Timeout = tableConfig.TurnTimeout
	case StageGameOver:
		t.Timeout = tableConfig.GameOverTimeout
	default:
		log.Error("no such stage", zap.Int("toStage", toStage))
	}
	t.TimeLeft = t.Timeout
	t.Stage = toStage
}

// updateStageForPlayerJoinOrLeave update stage if there is a player join or leave the game
// 1. player join might trigger game to start
// 2. player leave might trigger game to idle
func (t *Table) updateStageForPlayerJoinOrLeave() {
	if len(t.Clients) >= tableConfig.MinPlayers && t.Stage == StageIdle {
		t.changeStage(StageWait)
	} else if len(t.Clients) < tableConfig.MinPlayers && t.Stage != StageIdle {
		t.changeStage(StageIdle)
	}
}

// dealInitialCards deals first card and 7 cards for each player
func (t *Table) dealInitialCards() {
	var err error
	defer func() {
		if err != nil {
			log.Error("no enough cards to start a new game")
		}
	}()

	// deal first card, must be non wild draw 4
	t.Discard = t.Discard[:1]
	t.Discard[0] = t.Deck.DealFirstCard()

	// deal 7 cards to each player
	for _, playerState := range t.States {
		playerState.Cards, err = t.Deck.Deal7()
		if err != nil {
			return
		}
	}
}

func (t *Table) nextStartPlayer() uint64 {
	if t.startPlayer == 0 {
		// new game
		return t.Clients[rand.Intn(len(t.Clients))].UID
	} else {
		for i, c := range t.Clients {
			if c.UID == t.startPlayer {
				return t.Clients[(i+1)%len(t.Clients)].UID
			}
		}
	}
	return 0
}

func (t *Table) nextPlayer() uint64 {
	if t.CurrentPlayer == 0 && t.startPlayer == 0 {
		log.Error("need to select start player first")
		return 0
	}

	for i, c := range t.Clients {
		if c.UID == t.CurrentPlayer {
			if t.Clockwise {
				i = (i + 1) % len(t.Clients)
			} else {
				i--
				if i < 0 {
					i = len(t.Clients) - 1
				}
			}
			return t.Clients[i].UID
		}
	}

	return 0
}

func (t *Table) newGame() {
	// select next start player
	t.startPlayer = t.nextStartPlayer()
	t.CurrentPlayer = t.startPlayer
	t.LastPlayer = 0
	// deal cards to each player, and deal first card
	t.dealInitialCards()
	// if first card is skip or reverse
	value := uno.CardValue(t.Discard[0])
	if value == uno.ValueSkip {
		// skip
		t.CurrentPlayer = t.nextPlayer()
	} else if value == uno.ValueReverse {
		// reverse
		t.Clockwise = !t.Clockwise
	}
}

func (t *Table) tick() {
	t.TimeLeft--
	switch t.Stage {
	case StageIdle:
		if t.TimeLeft <= 0 {
			if len(t.Clients) < tableConfig.MinPlayers {
				// add bot, will register a bot client to the table
				// and the table stage will be changed in updateStageForPlayerJoinOrLeave()
				log.Debug("add bot")
				go AddBot(t)
			}
		}
	case StageGameOver:
		if t.TimeLeft <= 0 {
			t.changeStage(StageWait)
		}
	case StageWait:
		if t.TimeLeft <= 0 {
			t.newGame()
			t.changeStage(StagePrepare)
			t.notifyGameStart()
		}
	case StagePrepare:
		if t.TimeLeft <= 0 {
			t.changeStage(StagePlaying)
			t.broadcast(pb.GameCmd_EVENT_NTY, &pb.S2CEventNty{
				Uid:   t.CurrentPlayer,
				Event: int32(pb.Event_EVENT_TURN),
			})
		}
	case StagePlaying:
		if t.TimeLeft <= 0 {
			playerState, ok := t.stateMap[t.CurrentPlayer]
			if !ok {
				log.Error("unable to find player state for", zap.Uint64("uid", t.CurrentPlayer))
				return
			}
			if playerState.Timeout {
				// TODO: AI kicks in
				log.Info("AI kicks in for", zap.Uint64("uid", t.CurrentPlayer))
				ai(t, t.clientMap[t.CurrentPlayer])
			} else {
				log.Info("player timeout, prepare AI assistants", zap.Uint64("uid", t.CurrentPlayer))
				// player timeout, set random interval before AI kicks in
				playerState.Timeout = true
				t.TimeLeft = tableConfig.AIAssistantMinTimeout + rand.Intn(tableConfig.AIAssistantMaxTimeout-tableConfig.AIAssistantMinTimeout)
			}
		}
	}
}

// table logic loop
func (t *Table) start(wg *sync.WaitGroup) {
	// tick every second
	ticker := time.NewTicker(time.Second)

	defer func() {
		ticker.Stop()
		close(t.Register)
		close(t.InFrames)
		wg.Done()
		log.Debug("table quit")
	}()

	for {
		select {
		case req := <-t.Register:
			log.Debug("received client register request from game server")
			t.registerClient(req)
			log.Debug("client registered, broadcasting...")
			// broadcast new player join
			t.broadcast(pb.GameCmd_PLAYER_JOIN_NTY, &pb.S2CPlayerJoinNty{
				Uid: req.UID,
			})
			// change stage if there are enough players to start a new game
			t.updateStageForPlayerJoinOrLeave()
		case inFrame := <-t.InFrames:
			log.Debug("table got in frame")
			route(inFrame.C, t, *inFrame.F)
		case <-ticker.C:
			// state machine here
			log.Debug("table tick")
			t.tick()
		case <-signal.InterruptChan:
			log.Debug("system terminal signal received in table")
			return
		}

		// if game is over, remove offline clients
		if t.Stage == StageGameOver {
			for _, c := range t.Clients {
				if c.IsFlagOfflineSet() {
					t.unregisterClient(c)
					t.broadcast(pb.GameCmd_PLAYER_LEFT_NTY, &pb.S2CPlayerLeftNty{
						Uid: c.UID,
					})
				}
			}
			// change stage to idle if there are no enough player
			t.updateStageForPlayerJoinOrLeave()
		}
	}
}
