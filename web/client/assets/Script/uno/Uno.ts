export const enum Card {
    COLOR_RED = 0x00,
    COLOR_YELLOW = 0x10,
    COLOR_BLUE = 0x20,
    COLOR_GREEN = 0x30,
    COLOR_WILD = 0x40,
    VALUE_0 = 0x01,
    VALUE_1 = 0x02,
    VALUE_2 = 0x03,
    VALUE_3 = 0x04,
    VALUE_4 = 0x05,
    VALUE_5 = 0x06,
    VALUE_6 = 0x07,
    VALUE_7 = 0x08,
    VALUE_8 = 0x09,
    VALUE_9 = 0x0a,
    VALUE_SKIP = 0x0b,
    VALUE_REVERSE = 0x0c,
    VALUE_DRAW_2 = 0x0d,
    VALUE_WILD = 0x0e,
    VALUE_WILD_DRAW_4 = 0x0f
}

export const CardSet:number[] = [
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, // red, 0~9, skip, reverse, draw 2
		0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, // yellow
		0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, // blue
		0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, // green
		0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, // red, 1~9, skip, reverse, draw 2
		0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, // yellow
		0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, // blue
		0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, // green
		0x4E, 0x4E, 0x4E, 0x4E, // wild
		0x4F, 0x4F, 0x4F, 0x4F, // wild draw 4
];

class Uno {
    private static _instance:Uno = null;
    public static get Instance() {
        return this._instance || (this._instance = new Uno());
    }

    private constructor() {
    }

    public getColor(card:number):number {
        return card & 0xF0;
    }
    public getValue(card:number):number {
        return card & 0x0F;
    }
}

export const UNO = Uno.Instance;