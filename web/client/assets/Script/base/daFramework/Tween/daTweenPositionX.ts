
import daTweenBase from "./daTweenBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class daTweenPositionX extends daTweenBase {
    @property
    public t_From: number = 0;
    @property
    public t_To: number = 0;

    protected tweenUpdate(_deltaTime: number) {
        super.tweenUpdate(_deltaTime);

        if (this.isFinish) return;
        if (!this.isTarget) return;

        if (this.isPlaying && this.t_From != null && this.t_To != null) {
            this.Target.x = this.t_From + (this.t_To - this.t_From) * this.TweenValue;
        }

    }

    protected TweenFinish() {
        if (this.isTarget && this.t_From != null && this.t_To != null) {
            this.Target.x = this.t_From + (this.t_To - this.t_From) * this.TweenValue;
        }

        super.TweenFinish();
    }

    public ResetToBegin() {
        if (this.isTarget && this.t_From) {
            this.Target.x = this.t_From;
        }

        return super.ResetToBegin();
    }

    public InitTween(_target: cc.Node = null) {
        super.InitTween(_target);
        this.t_From = null;
        this.t_To = null;
    }

    public From(_from: number) {
        this.t_From = _from;
        if (this.isTarget) {
            this.Target.x = _from;
        }
        return this;
    }

    public To(_to: number) {
        this.t_To = _to;
        if ((this.t_From == null || this.t_From == 0) && this.isTarget) {
            this.t_From = this.Target.position.x;
        }
        return this;
    }

    public destroy() {
        this.Target = null;

        return super.destroy();
    }

    public static Tween(target?: cc.Node): daTweenPositionX {
        let _node = new cc.Node("daTweenPositionX");
        _node.parent = cc.director.getScene();
        let _tween = _node.addComponent(daTweenPositionX);
        _tween.InitTween(target);

        return _tween;
    }
}
