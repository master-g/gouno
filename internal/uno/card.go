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

package uno

import (
	"errors"
	"math/bits"
	"math/rand"
	"sort"
	"strings"
)

// Uno card types
const (
	CardSetSize int = 108
	CardCount2  int = 2
	CardCount4  int = 4
	CardCount6  int = 6
	CardCount7  int = 7
)

// Uno card colors
const (
	ColorWild   uint8 = 0x00
	ColorRed    uint8 = 0x10
	ColorYellow uint8 = 0x20
	ColorBlue   uint8 = 0x30
	ColorGreen  uint8 = 0x40
)

// uno card values
const (
	Value0         uint8 = 0x01
	Value1         uint8 = 0x02
	Value2         uint8 = 0x03
	Value3         uint8 = 0x04
	Value4         uint8 = 0x05
	Value5         uint8 = 0x06
	Value6         uint8 = 0x07
	Value7         uint8 = 0x08
	Value8         uint8 = 0x09
	Value9         uint8 = 0x0A
	ValueSkip      uint8 = 0x0B
	ValueReverse   uint8 = 0x0C
	ValueDraw2     uint8 = 0x0D
	ValueWild      uint8 = 0x0E
	ValueWildDraw4 uint8 = 0x0F
)

// CardMake make a uno card with given card color and value
func CardMake(color, value uint8) uint8 {
	var card uint8
	card |= uint8(color)
	card |= uint8(value)
	return card
}

// CardColor returns the color of the card c
func CardColor(c uint8) uint8 {
	return c & 0xF0
}

// CardValue returns the value of the card c
func CardValue(c uint8) uint8 {
	return c & 0x0F
}

// CardScore returns the score of the card c
func CardScore(c uint8) int32 {
	value := CardValue(c)
	if value < ValueSkip {
		return int32(c - 1)
	}
	if value == ValueSkip || value == ValueReverse || value == ValueDraw2 {
		return 20
	} else if value == ValueWild {
		return 40
	} else {
		return 50
	}
}

var (
	cardPreset = []uint8{
		0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, // red, 0~9, skip, reverse, draw 2
		0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, // yellow
		0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, // blue
		0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, // green
		0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, // red, 1~9, skip, reverse, draw 2
		0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, // yellow
		0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, // blue
		0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, // green
		0x0E, 0x0E, 0x0E, 0x0E, // wild
		0x0F, 0x0F, 0x0F, 0x0F, // wild draw 4
	}

	value2str = map[uint8]string{
		Value0:         "0",
		Value1:         "1",
		Value2:         "2",
		Value3:         "3",
		Value4:         "4",
		Value5:         "5",
		Value6:         "6",
		Value7:         "7",
		Value8:         "8",
		Value9:         "9",
		ValueSkip:      "s",
		ValueReverse:   "r",
		ValueDraw2:     "d",
		ValueWild:      "w",
		ValueWildDraw4: "d",
	}

	color2str = map[uint8]string{
		ColorWild:   "w",
		ColorRed:    "r",
		ColorYellow: "y",
		ColorBlue:   "b",
		ColorGreen:  "g",
	}
)

// CardToString convert card to string
func CardToString(c uint8) string {
	return color2str[CardColor(c)] + value2str[CardValue(c)]
}

// convert color to string
func KolorToString(c uint8) string {
	return color2str[c]
}

// SortCards sorts uno cards by type and value
func SortCards(cards []uint8) {
	sort.Slice(cards, func(i, j int) bool {
		return bits.RotateLeft8(cards[i], 4) < bits.RotateLeft8(cards[j], 4)
	})
}

var (
	// ErrorNoEnoughCards indicates there are no enough cards left
	ErrorNoEnoughCards = errors.New("no enough cards")
)

// Deck holds a full set of uno cards
type Deck struct {
	cards []uint8
}

// NewDeck creates and returns pointer to a new Deck object
func NewDeck() *Deck {
	deck := &Deck{
		cards: make([]uint8, len(cardPreset)),
	}
	copy(deck.cards, cardPreset)
	return deck
}

// Reset deck to initial state
func (d *Deck) Reset() {
	d.cards = make([]uint8, len(cardPreset))
	copy(d.cards, cardPreset)
}

// Deal a single card from deck, if the deck is empty, a 0 will be returned
func (d *Deck) Deal() (c uint8, err error) {
	if len(d.cards) <= 0 {
		err = ErrorNoEnoughCards
		return
	}
	c = d.cards[0]
	d.cards = d.cards[1:]
	return
}

// DealFirstCard deals a random card except wild draw 4 card from deck
func (d *Deck) DealFirstCard() (c uint8) {
	// reset cards first
	d.Reset()
	// no wild draw 4 cards
	index := rand.Intn(CardSetSize - 4)
	c = d.cards[index]
	d.cards = append(d.cards[:index], d.cards[index+1:]...)
	// shuffle the rest of cards
	d.Shuffle(0)
	return
}

// Deals deal num of card from deck, if there are not enough card in deck, error will be returned
func (d *Deck) Deals(num int) (c []uint8, err error) {
	if len(d.cards) < num {
		err = ErrorNoEnoughCards
		return
	}
	c = d.cards[0:num]
	d.cards = d.cards[num:]
	return
}

// Shuffle cards in deck
func (d *Deck) Shuffle(since int) {
	for i := len(d.cards) - 1; i > since; i-- {
		j := rand.Intn(i + 1)
		d.cards[i], d.cards[j] = d.cards[j], d.cards[i]
	}
}

// CardsRemaining returns the number of available cards in deck
func (d *Deck) CardsRemaining() int {
	return len(d.cards)
}

// Recycle cards back to deck
func (d *Deck) Recycle(discard []uint8) {
	d.cards = append(d.cards, discard...)
}

func (d *Deck) String() string {
	if d == nil || len(d.cards) == 0 {
		return ""
	}
	b := &strings.Builder{}
	for _, c := range d.cards {
		b.WriteString(CardToString(c))
		b.WriteString(",")
	}
	return b.String()
}
