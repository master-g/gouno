import { Card, UNO } from "../uno/Uno";
import L from "../base/log/Log";
import UnoCard from "./UnoCard";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Circle extends cc.Component {
    @property(cc.Sprite)
    private circleSprite: cc.Sprite = null;

    public get clockwise():boolean {
        if (this.circleSprite) {
            return this.circleSprite.node.scaleX == 1;
        }
        return false;
    }

    public onLoad() {
        this.setClockwise(true);
    }

    public setColor(color: number): void {
        if (!this.circleSprite) {
            return;
        }

        let frameIndex = "circleWild";
        switch (color) {
            case Card.COLOR_RED:
                frameIndex = "circleRed";
                break;
            case Card.COLOR_BLUE:
                frameIndex = "circleBlue";
                break;
            case Card.COLOR_YELLOW:
                frameIndex = "circleYellow";
                break;
            case Card.COLOR_GREEN:
                frameIndex = "circleGreen";
                break;
        }
        cc.loader.loadRes("atlas/circle", cc.SpriteAtlas, (err, atlas) => {
            if (err) {
                L.e(err);
            }
            const frame = atlas.getSpriteFrame(frameIndex);
            this.circleSprite.spriteFrame = frame;
        });
    }

    public setClockwise(clockwise: boolean): void {
        if (!this.circleSprite) {
            return;
        }

        this.circleSprite.node.stopAllActions();

        let scale = 1;
        let rotation = 360;
        if (!clockwise) {
            scale = -1;
            rotation *= -1;
        }

        this.circleSprite.node.scaleX = scale;
        this.circleSprite.node.runAction(cc.repeatForever(cc.rotateBy(180, rotation)));
    }
}
