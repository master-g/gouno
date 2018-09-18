package game

import (
	"sync"
	"time"

	"github.com/master-g/gouno/proto/pb"
	"github.com/master-g/gouno/uno"
)

// TableConfig holds table timeout configs
type TableConfig struct {
	TurnTimeout      time.Duration
	GameOverDuration time.Duration
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
	// Players array of player state
	Players []PlayerState
}

var (
	tableMap    sync.Map
	tableConfig TableConfig
)

func init() {
	tableConfig = TableConfig{
		TurnTimeout:      time.Second * 10,
		GameOverDuration: time.Second * 5,
	}
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
		Players: make([]*pb.UnoPlayer, len(t.Players)),
	}
	for i, v := range t.Players {
		state.Players[i] = v.Dump(hideCards)
	}
	return state
}
