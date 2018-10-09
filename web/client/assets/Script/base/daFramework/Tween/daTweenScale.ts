import daTweenBase from "./daTweenBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class daTweenScale extends daTweenBase {

    @property
    public t_From: cc.Vec2 = cc.Vec2.ZERO;
    @property
    public t_To: cc.Vec2 = cc.Vec2.ZERO;

    protected tweenUpdate(_deltaTime: number) {
        super.tweenUpdate(_deltaTime);

        if (this.isFinish) return;
        if (!this.isTarget) return;

        if (this.isPlaying && this.t_From != null && this.t_To != null) {
            this.Target.scaleX = this.t_From.x + (this.t_To.x - this.t_From.x) * this.TweenValue;
            this.Target.scaleY = this.t_From.y + (this.t_To.y - this.t_From.y) * this.TweenValue;
        }

    }

    protected TweenFinish() {
        if (this.isTarget && this.t_From != null && this.t_To != null) {
            this.Target.scaleX = this.t_From.x + (this.t_To.x - this.t_From.x) * this.TweenValue;
            this.Target.scaleY = this.t_From.y + (this.t_To.y - this.t_From.y) * this.TweenValue;
        }

        super.TweenFinish();
    }

    public ResetToBegin() {
        if (this.isTarget && this.t_From) {
            this.Target.scaleX = this.t_From.x;
            this.Target.scaleY = this.t_From.y;
        }

        return super.ResetToBegin();
    }

    public InitTween(_target: cc.Node = null) {
        super.InitTween(_target);
    }

    public From(_from: cc.Vec2) {
        this.t_From = _from;
        if (this.isTarget) {
            this.Target.scaleX = _from.x;
            this.Target.scaleY = _from.y;
        }
        return this;
    }
    public From_1(_x: number, _y: number) { return this.From(new cc.Vec2(_x, _y)); }
    public From_2(_scale: number) { return this.From_1(_scale, _scale); }

    public To(_to: cc.Vec2) {
        this.t_To = _to;
        if ((this.t_From == null || this.t_From == cc.Vec2.ZERO )&& this.isTarget) {
            this.t_From = new cc.Vec2(this.Target.scaleX, this.Target.scaleY);
        }
        return this;
    }
    public To_1(_x: number, _y: number) { return this.To(new cc.Vec2(_x, _y)); }
    public To_2(_scale: number) { return this.To_1(_scale, _scale); }

    public destroy() {
        this.Target = null;

        return super.destroy();
    }

    public static Tween(target?: cc.Node): daTweenScale {
        let _node = new cc.Node("daTweenScale");
        _node.parent = cc.director.getScene();
        let _tween = _node.addComponent(daTweenScale);
        _tween.InitTween(target);

        return _tween;
    }

}
