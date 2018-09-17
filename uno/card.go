package uno

import (
	"math/bits"
	"sort"
)

// Card uint8 representation of a uno card
type Card uint8

// Type of uno cards
type Type uint8

// Uno card types
const (
	TypeStandard Type = 0x00 // 0rccvvvvb
	TypeWild     Type = 0x80 // 1rccvvvvb
)

// Color of uno card
type Color uint8

// Uno card colors
const (
	ColorRed    Color = 0x00 // cr00vvvvb
	ColorYellow Color = 0x10 // cr01vvvvb
	ColorBlue   Color = 0x20 // cr10vvvvb
	ColorGreen  Color = 0x30 // cr11vvvvb
)

// Value of uno card
type Value uint8

// uno card values
const (
	Value0         Value = 0x01
	Value1         Value = 0x02
	Value2         Value = 0x03
	Value3         Value = 0x04
	Value4         Value = 0x05
	Value5         Value = 0x06
	Value6         Value = 0x07
	Value7         Value = 0x08
	Value8         Value = 0x09
	Value9         Value = 0x0A
	ValueSkip      Value = 0x0B
	ValueReverse   Value = 0x0C
	ValueDraw2     Value = 0x0D
	ValueWild      Value = 0x0E
	ValueWildDraw4 Value = 0x0F
)

// CardMake make a uno card with given card type, color and value
func CardMake(t Type, color Color, value Value) Card {
	var card uint8
	card |= uint8(t)
	card |= uint8(color)
	card |= uint8(value)
	return Card(card)
}

// Type returns the Type of the card c
func (c Card) Type() Type {
	return Type(c & 0x80)
}

// Color returns the color of the card c
func (c Card) Color() Color {
	return Color(c & 0x70)
}

// Value returns the value of the card c
func (c Card) Value() Value {
	return Value(c & 0x0F)
}

var (
	cardPreset = []Card{
		0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, // red, 0~9, skip, reverse, draw 2
		0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, // yellow
		0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, // blue
		0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, // green
		0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, // red, 1~9, skip, reverse, draw 2
		0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, // yellow
		0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, // blue
		0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, // green
		0x4D, 0x4D, 0x4D, 0x4D, // wild
		0x4E, 0x4E, 0x4E, 0x4E, // wild draw 4
	}
)

func (c Card) String() string {
	return ""
}

// SortCards sorts uno cards by type and value
func SortCards(cards []Card) {
	sort.Slice(cards, func(i, j int) bool {
		return bits.RotateLeft8(uint8(cards[i]), 4) < bits.RotateLeft8(uint8(cards[j]), 4)
	})
}

// Deck holds a full set of uno cards
type Deck struct {
	cards []Card
}

// NewDeck creates and returns pointer to a new Deck object
func NewDeck() *Deck {
	deck := &Deck{
		cards: make([]Card, len(cardPreset)),
	}
	copy(deck.cards, cardPreset)
	return deck
}
