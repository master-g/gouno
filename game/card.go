package game

// Card uint32 representation of a uno card
type Card uint32

// Category of uno cards
type Category uint8

// Uno card categories
const (
	CategoryStandard Category = 0x01
	CategoryFunction Category = 0x02
	CategoryWild     Category = 0x04
)

// Color of uno card
type Color uint8

// Uno card colors
const (
	ColorBlack  Color = 0x00
	ColorRed    Color = 0x01
	ColorYellow Color = 0x02
	ColorBlue   Color = 0x04
	ColorGreen  Color = 0x08
)

// Value of uno card
type Value uint8

// uno card values
const (
	Value0         Value = 0x00
	Value1         Value = 0x01
	Value2         Value = 0x02
	Value3         Value = 0x03
	Value4         Value = 0x04
	Value5         Value = 0x05
	Value6         Value = 0x06
	Value7         Value = 0x07
	Value8         Value = 0x08
	Value9         Value = 0x09
	ValueSkip      Value = 0x01
	ValueReverse   Value = 0x02
	ValueDraw2     Value = 0x04
	ValueWild      Value = 0x00
	ValueWildDraw4 Value = 0x01
)

// CardMake make a uno card with given category, color and value
func CardMake(category Category, color Color, value Value) Card {
	var card uint32
	card |= uint32(category)
	card <<= 4
	card |= uint32(color)
	card <<= 4
	card |= uint32(value)
	return Card(card)
}
