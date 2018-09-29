package uno

import (
	"fmt"
	"reflect"
	"testing"
)

func TestCardMake(t *testing.T) {
	type args struct {
		t     uint8
		color uint8
		value uint8
	}
	tests := []struct {
		name string
		args args
		want uint8
	}{
		{name: "r0", args: args{t: 0, color: 0, value: 1}, want: 1},
		{name: "rs", args: args{t: 0, color: 0, value: 11}, want: 11},
		{name: "yr", args: args{t: 0, color: 16, value: 28}, want: 28},
		{name: "bd2", args: args{t: 0, color: 32, value: 45}, want: 45},
		{name: "w", args: args{t: 0, color: 64, value: 78}, want: 78},
		{name: "d4", args: args{t: 0, color: 64, value: 79}, want: 79},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CardMake(tt.args.t, tt.args.color, tt.args.value); got != tt.want {
				t.Errorf("CardMake() = %v, want %v", got, tt.want)
			}
		})
	}

	// for _, c := range cardPreset {
	// 	s := fmt.Sprintf("{name:\"%v\", args:args{t:%v, color:%v, value:%v}, want:%v},", CardToString(c), CardType(c), CardColor(c), c, c)
	// 	fmt.Println(s)
	// }
}

func TestCardType(t *testing.T) {
	type args struct {
		c uint8
	}
	tests := []struct {
		name string
		args args
		want uint8
	}{
		{name: "standard", args: args{c: 0x33}, want: TypeStandard},
		{name: "wild", args: args{c: 0x4E}, want: TypeWild},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CardType(tt.args.c); got != tt.want {
				t.Errorf("CardType() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCardColor(t *testing.T) {
	type args struct {
		c uint8
	}
	tests := []struct {
		name string
		args args
		want uint8
	}{
		{name: "red", args: args{c: 0x01}, want: ColorRed},
		{name: "yellow", args: args{c: 0x12}, want: ColorYellow},
		{name: "blue", args: args{c: 0x23}, want: ColorBlue},
		{name: "green", args: args{c: 0x34}, want: ColorGreen},
		{name: "wild", args: args{c: 0x4E}, want: ColorRed},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CardColor(tt.args.c); got != tt.want {
				t.Errorf("CardColor() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCardValue(t *testing.T) {
	type args struct {
		c uint8
	}
	tests := []struct {
		name string
		args args
		want uint8
	}{
		{name: "r0", args: args{c: 0x01}, want: Value0},
		{name: "rs", args: args{c: 0x0B}, want: ValueSkip},
		{name: "yr", args: args{c: 0x1C}, want: ValueReverse},
		{name: "bd2", args: args{c: 0x2D}, want: ValueDraw2},
		{name: "w", args: args{c: 0x4E}, want: ValueWild},
		{name: "d4", args: args{c: 0x4F}, want: ValueWildDraw4},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CardValue(tt.args.c); got != tt.want {
				t.Errorf("CardValue() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCardToString(t *testing.T) {
	type args struct {
		c uint8
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{name: "r0", args: args{c: 0x01}, want: "r0"},
		{name: "y1", args: args{c: 0x12}, want: "y1"},
		{name: "b2", args: args{c: 0x23}, want: "b2"},
		{name: "g3", args: args{c: 0x34}, want: "g3"},
		{name: "w", args: args{c: 0x4E}, want: "w"},
		{name: "d4", args: args{c: 0x4F}, want: "d4"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CardToString(tt.args.c); got != tt.want {
				t.Errorf("CardToString() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSortCards(t *testing.T) {
	type args struct {
		cards []uint8
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			SortCards(tt.args.cards)
		})
	}
}

func TestNewDeck(t *testing.T) {
	tests := []struct {
		name string
		want *Deck
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewDeck(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewDeck() = %v, want %v", got, tt.want)
			}
		})
	}
	d := NewDeck()
	fmt.Println(d.String())
}

func TestDeck_Reset(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name   string
		fields fields
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			d.Reset()
		})
	}
	d := NewDeck()
	d.Shuffle(0)
	fmt.Println(d.String())
	d.Reset()
	fmt.Println(d.String())
}

func TestDeck_Deal(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name    string
		fields  fields
		wantC   uint8
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			gotC, err := d.Deal()
			if (err != nil) != tt.wantErr {
				t.Errorf("Deck.Deal() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if gotC != tt.wantC {
				t.Errorf("Deck.Deal() = %v, want %v", gotC, tt.wantC)
			}
		})
	}
	d := NewDeck()
	c, err := d.Deal()
	fmt.Println(CardToString(c), err)
	fmt.Println(d.String())
}

func TestDeck_DealFirstCard(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name   string
		fields fields
		wantC  uint8
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			if gotC := d.DealFirstCard(); gotC != tt.wantC {
				t.Errorf("Deck.DealFirstCard() = %v, want %v", gotC, tt.wantC)
			}
		})
	}

	d := NewDeck()
	c := d.DealFirstCard()
	fmt.Println(CardToString(c))
	fmt.Println(d.String())
}

func TestDeck_deals(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	type args struct {
		num int
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantC   []uint8
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			gotC, err := d.deals(tt.args.num)
			if (err != nil) != tt.wantErr {
				t.Errorf("Deck.deals() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(gotC, tt.wantC) {
				t.Errorf("Deck.deals() = %v, want %v", gotC, tt.wantC)
			}
		})
	}

	d := NewDeck()
	c, err := d.deals(200)
	fmt.Println(c, err)
	fmt.Println(d.String())
}

func TestDeck_Deal2(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name    string
		fields  fields
		wantC   []uint8
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			gotC, err := d.Deal2()
			if (err != nil) != tt.wantErr {
				t.Errorf("Deck.Deal2() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(gotC, tt.wantC) {
				t.Errorf("Deck.Deal2() = %v, want %v", gotC, tt.wantC)
			}
		})
	}
}

func TestDeck_Deal4(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name    string
		fields  fields
		wantC   []uint8
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			gotC, err := d.Deal4()
			if (err != nil) != tt.wantErr {
				t.Errorf("Deck.Deal4() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(gotC, tt.wantC) {
				t.Errorf("Deck.Deal4() = %v, want %v", gotC, tt.wantC)
			}
		})
	}
}

func TestDeck_Deal7(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name    string
		fields  fields
		wantC   []uint8
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			gotC, err := d.Deal7()
			if (err != nil) != tt.wantErr {
				t.Errorf("Deck.Deal7() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(gotC, tt.wantC) {
				t.Errorf("Deck.Deal7() = %v, want %v", gotC, tt.wantC)
			}
		})
	}
}

func TestDeck_Shuffle(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	type args struct {
		since int
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			d.Shuffle(tt.args.since)
		})
	}
}

func TestDeck_CardsRemaining(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	tests := []struct {
		name   string
		fields fields
		want   int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			if got := d.CardsRemaining(); got != tt.want {
				t.Errorf("Deck.CardsRemaining() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestDeck_Recycle(t *testing.T) {
	type fields struct {
		shuffled bool
		cards    []uint8
	}
	type args struct {
		discard []uint8
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := &Deck{
				cards: tt.fields.cards,
			}
			d.Recycle(tt.args.discard)
		})
	}
	d := NewDeck()
	c, err := d.deals(30)
	fmt.Println(c, err)
	fmt.Println(d)
	d.Recycle(c)
	fmt.Println(d)
}
