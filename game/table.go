package game

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

	// Players array of client ID
	Players []uint64
}
