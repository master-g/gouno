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
)

// Uno card types
const (
	TypeStandard uint8 = 0x00 // 0rccvvvvb
	TypeWild     uint8 = 0x80 // 1rccvvvvb
)

// Uno card colors
const (
	ColorRed    uint8 = 0x00 // cr00vvvvb
	ColorYellow uint8 = 0x10 // cr01vvvvb
	ColorBlue   uint8 = 0x20 // cr10vvvvb
	ColorGreen  uint8 = 0x30 // cr11vvvvb
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

// CardMake make a uno card with given card type, color and value
func CardMake(t, color, value uint8) uint8 {
	var card uint8
	card |= uint8(t)
	card |= uint8(color)
	card |= uint8(value)
	return card
}

// CardType returns the type of the card c
func CardType(c uint8) uint8 {
	return c & 0x80
}

// CardColor returns the color of the card c
func CardColor(c uint8) uint8 {
	return c & 0x70
}

// CardValue returns the value of the card c
func CardValue(c uint8) uint8 {
	return c & 0x0F
}

var (
	cardPreset = []uint8{
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
		ValueDraw2:     "d2",
		ValueWild:      "w",
		ValueWildDraw4: "d4",
	}

	color2str = map[uint8]string{
		ColorRed:    "r",
		ColorYellow: "y",
		ColorBlue:   "b",
		ColorGreen:  "g",
	}
)

func CardToString(c uint8) string {
	if CardType(c) == TypeWild {
		return "w" + value2str[CardValue(c)]
	}
	return color2str[CardColor(c)] + value2str[CardValue(c)]
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
	index int
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

// Deal a single card from deck, if the deck is empty, a 0 will be returned
func (d *Deck) Deal() (c uint8, err error) {
	if d.index >= len(d.cards) {
		err = ErrorNoEnoughCards
		return
	}
	c = d.cards[d.index]
	d.index++
	return
}

func (d *Deck) deals(num int) (c []uint8, err error) {
	if d.index+num >= len(d.cards) {
		err = ErrorNoEnoughCards
		return
	}
	c = d.cards[d.index : d.index+num]
	d.index += num
	return
}

// Deal2 deals 2 cards from deck
func (d *Deck) Deal2() (c []uint8, err error) {
	return d.deals(2)
}

// Deal4 deals 4 cards from deck
func (d *Deck) Deal4() (c []uint8, err error) {
	return d.deals(4)
}

// Shuffle caards in deck
func (d *Deck) Shuffle() {
	for i := len(d.cards) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		d.cards[i], d.cards[j] = d.cards[j], d.cards[i]
	}
}

// CardsRemaining returns the number of available cards in deck
func (d *Deck) CardsRemaining() int {
	return len(d.cards) - d.index
}
