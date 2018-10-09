import { Card } from "../uno/Uno";
import L from "../base/log/Log";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnoCard extends cc.Component {
    public card: number;
    public value: number;
    public color: number;

    @property(cc.Sprite)
    private highlight: cc.Sprite = null;

    @property(cc.Sprite)
    private cardSprite: cc.Sprite = null;

    public SetCard(u:number):void {
        this.card = u;
        this.value = u & 0x0F;
        this.color = u & 0xF0;

        if (this.cardSprite == null) {
            return;
        }

        let frameIndex = "back";
        if (this.value == Card.VALUE_WILD) {
            frameIndex = "w";
        } else if (this.value == Card.VALUE_WILD_DRAW_4) {
            frameIndex = "wd4";
        } else {
            const colorMap = [];
            colorMap[Card.COLOR_RED] = "r";
            colorMap[Card.COLOR_YELLOW] = "y";
            colorMap[Card.COLOR_BLUE] = "b";
            colorMap[Card.COLOR_GREEN] = "g";
            frameIndex = colorMap[this.color];

            const valueMap = [];
            valueMap[Card.VALUE_0] = "0";
            valueMap[Card.VALUE_1] = "1";
            valueMap[Card.VALUE_2] = "2";
            valueMap[Card.VALUE_3] = "3";
            valueMap[Card.VALUE_4] = "4";
            valueMap[Card.VALUE_5] = "5";
            valueMap[Card.VALUE_6] = "6";
            valueMap[Card.VALUE_7] = "7";
            valueMap[Card.VALUE_8] = "8";
            valueMap[Card.VALUE_9] = "9";
            valueMap[Card.VALUE_SKIP] = "s";
            valueMap[Card.VALUE_REVERSE] = "r";
            valueMap[Card.VALUE_DRAW_2] = "d2";
            frameIndex += valueMap[this.value];
        }
        cc.loader.loadRes("atlas/unoCards", cc.SpriteAtlas, (err, atlas) => {
            if (err) {
                L.e(err);
            }
            const frame = atlas.getSpriteFrame(frameIndex);
            this.cardSprite.spriteFrame = frame;
        });
    }

    public SetHighlight(active: boolean):void {
        if (this.highlight != null) {
            this.highlight.node.active = active;
        }
    }
}
