import daTweenBase from "./daTweenBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class daTweenColor extends daTweenBase {

    @property(cc.Color)
    public t_From: cc.Color = cc.Color.WHITE;
    @property(cc.Color)
    public t_To: cc.Color = cc.Color.WHITE;

    protected tweenUpdate(_deltaTime: number) {
        super.tweenUpdate(_deltaTime);

        if (this.isFinish) return;
        if (!this.isTarget) return;

        if (this.isPlaying && this.t_From != null && this.t_To != null) {
            let _color = new cc.Color(
                this.t_From.getR() + (this.t_To.getR() - this.t_From.getR()) * this.TweenValue,
                this.t_From.getG() + (this.t_To.getG() - this.t_From.getG()) * this.TweenValue,
                this.t_From.getB() + (this.t_To.getB() - this.t_From.getB()) * this.TweenValue,
                this.t_From.getA() + (this.t_To.getA() - this.t_From.getA()) * this.TweenValue
            );
            if (this.Target){
                this.Target.color = _color;
            }
        }

    }

    protected TweenFinish() {
        if (this.isTarget && this.t_From != null && this.t_To != null) {
            let _color = new cc.Color(
                this.t_From.getR() + (this.t_To.getR() - this.t_From.getR()) * this.TweenValue,
                this.t_From.getG() + (this.t_To.getG() - this.t_From.getG()) * this.TweenValue,
                this.t_From.getB() + (this.t_To.getB() - this.t_From.getB()) * this.TweenValue,
                this.t_From.getA() + (this.t_To.getA() - this.t_From.getA()) * this.TweenValue
            );
            if (this.Target)
                this.Target.color = _color;

        }

        super.TweenFinish();
    }

    public ResetToBegin() {
        if (this.isTarget && this.t_From) {
            this.Target.color = this.t_From;
        }

        return super.ResetToBegin();
    }

    public InitTween(_target: cc.Node = null) {
        super.InitTween(_target);
        this.t_From = null;
        this.t_To = null;
    }

    public From(_from: cc.Color) {
        this.t_From = _from;

        if (this.isTarget) {
            this.Target.color = _from;
        }
        return this;
    }

    public To(_to: cc.Color) {
        this.t_To = _to;
        if ((this.t_From == null) && this.isTarget) {
            this.t_From = this.Target.color;
        }
        return this;
    }

    public destroy() {
        this.Target = null;

        return super.destroy();
    }

    public static Tween(target?: cc.Node): daTweenColor {
        let _node = new cc.Node("daTweenColor");
        _node.parent = cc.director.getScene();
        let _tween = _node.addComponent(daTweenColor);
        _tween.InitTween(target);

        return _tween;
    }

}
