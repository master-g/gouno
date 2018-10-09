import daTweenBase from "./daTweenBase";
import daTweenScale from "./daTweenScale";

const { ccclass, property } = cc._decorator;

@ccclass
export default class daTweenPosition extends daTweenBase {
    @property
    public t_From: cc.Vec2 = cc.Vec2.ZERO;
    @property
    public t_To: cc.Vec2 = cc.Vec2.ZERO;

    protected tweenUpdate(_deltaTime: number) {
        super.tweenUpdate(_deltaTime);

        if (this.isFinish) return;
        if (!this.isTarget) return;

        if (this.isPlaying && this.t_From && this.t_To) {
            this.Target.x = this.t_From.x + (this.t_To.x - this.t_From.x) * this.TweenValue;
            this.Target.y = this.t_From.y + (this.t_To.y - this.t_From.y) * this.TweenValue;
        }

    }

    protected TweenFinish() {
        if (this.isTarget) {
            this.Target.x = this.t_From.x + (this.t_To.x - this.t_From.x) * this.TweenValue;
            this.Target.y = this.t_From.y + (this.t_To.y - this.t_From.y) * this.TweenValue;
        }

        super.TweenFinish();
    }

    public ResetToBegin() {
        if (this.isTarget && this.t_From) {
            this.Target.x = this.t_From.x;
            this.Target.y = this.t_From.y;
        }

        return super.ResetToBegin();
    }

    public InitTween(_target: cc.Node = null) {
        super.InitTween(_target);
        this.t_From = null;
        this.t_To = null;
    }

    public From(_from: cc.Vec2) {
        this.t_From = _from;
        if (this.isTarget) {
            this.Target.x = _from.x;
            this.Target.y = _from.y;
        }
        return this;
    }

    public To(_to: cc.Vec2) {
        this.t_To = _to;
        if ((this.t_From == null || this.t_From == cc.Vec2.ZERO) && this.isTarget) {
            this.t_From = this.Target.position;
        }
        return this;
    }

    public destroy() {
        this.Target = null;

        return super.destroy();
    }

    public static Tween(target?: cc.Node): daTweenPosition {
        let _node = new cc.Node("daTweenPosition");
        _node.parent = cc.director.getScene();
        let _tween = _node.addComponent(daTweenPosition);
        _tween.InitTween(target);

        return _tween;
    }


}
