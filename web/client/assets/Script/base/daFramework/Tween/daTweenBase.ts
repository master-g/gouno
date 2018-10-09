import { daDelegate, daDelegateJ } from "../Tools/daDelegate";
import { daFramework } from "./Tween";
import { AnimationCurve } from "../Tools/AnimationCurve";

const daTweenPlayType = cc.Enum({
    ONCE: daFramework.Tween.daTweenPlayType.ONCE,
    LOOP: daFramework.Tween.daTweenPlayType.LOOP,
    PINGPONG: daFramework.Tween.daTweenPlayType.PINGPONG,
});
const { ccclass, property } = cc._decorator;

@ccclass
export default class daTweenBase extends cc.Component implements ITween {
    @property(cc.Node)
    public Target: cc.Node = null;
    public OnFinish: daDelegate;
    public OnUpdate: daDelegateJ<number>;

    @property(({ type: daTweenPlayType }))
    public TweenType = daTweenPlayType.ONCE;
    @property
    public Duration: number = 1;
    @property
    public Delay: number = 0;//延时
    @property
    public IsForward = true;
    @property
    public IsAutoPlay = false;


    private _totalTime: number = 0;//动画播放总时间
    public isPlaying: boolean = false;
    public isFinish: boolean = false;


    public constructor() {
        super();

        this.OnFinish = new daDelegate();
        this.OnUpdate = new daDelegateJ();
    }

    public get isTarget():boolean{
        if(this.Target == null) return false;

        return this.Target.isValid;
    }

    public InitTween(_target: cc.Node = null) {

        if (_target == null) _target = this.node;

        this.Target = _target;
        this.Reset();
    }

    /** 取值范围0-1 */
    public get TweenValue(): number {
        if (!this.Duration || this.Duration <= 0)
            return 0;

        let _value = this._tweenTime / this.Duration;

        switch (this.TweenType) {
            case daTweenPlayType.ONCE:
                _value = _value > 1 ? 1 : _value;
                break;
            case daTweenPlayType.LOOP:
                _value = _value % 1;
                break;
            case daTweenPlayType.PINGPONG:
                _value = _value % 2;
                if (_value > 1)
                    _value = 2 - _value;
                break;
        }


        _value = this.isFinish ? 1 : _value;
        return this._animationCurve(this.IsForward ? _value : 1 - _value);
    }
    private get _tweenTime(): number {//获取当前动画播放时间
        if (this._totalTime <= this.Delay)
            return 0;

        return this._totalTime - this.Delay;
    }

    private _curveFunc: Function;
    private _curveObj: AnimationCurve;
    private _animationCurve(_value: number) {//可编辑曲线接口,暂无，直接返回原Value
        if (this._curveFunc)
            return this._curveFunc(_value);

        if (!this._curveObj)
            return _value;

        return this._curveObj.CurveValue(_value);
    }
    /** 通过函数初始化curve曲线 */
    public SetCurveByFunc(_func: (_value: number) => number) {
        if (_func)
            this._curveFunc = _func;

        return this;
    }
    public SetCurveByCurve(_curve: AnimationCurve) {
        this._curveObj = _curve;
        return this;
    }
    /** 通过控制点初始化Curve曲线 */
    public SetCurveByPoint(_points: number[]) {
        if (!this._curveObj)
            this._curveObj = new AnimationCurve();

        this._curveObj.PointList = [];
        let _length = Math.floor(_points.length / 2);
        for (var i = 0; i < _length; i++) {
            let _x = _points[i];
            let _y = _points[i + 1];
            this._curveObj.AddPoint(_x, _y);
        }
        this._curveObj.InitCurve();
        return this;
    }

    protected TweenFinish() {
        if (this.isFinish)
            return;
        this.isFinish = true;

        if (this.OnFinish) {
            this.OnFinish.CallOnce();
        }

        if (this.isOnce) {
            this.tweenClear();
            this.node.destroy();
        }
    }

    /** 马上结束动画 */
    public FinishImmediately() {
        if (this.isFinish) return;

        this.TweenFinish();
    }

    public Reset() {
        this._totalTime = 0;
        this.isFinish = false;
        this.isPlaying = false;

        return this;
    }
    public ResetToBegin() {
        return this.Reset();
    }
    public PlayForwards() {
        this.ResetToBegin();
        this.IsForward = true;

        return this.Play();
    }
    public PlayBackwards() {
        this.ResetToBegin();
        this.IsForward = false;

        return this.Play();
    }
    public Play(_type?: daFramework.Tween.daTweenPlayType) {
        this.TweenType = _type == null ? this.TweenType : _type;
        if (this.TweenType == null) this.TweenType = daTweenPlayType.ONCE;
        this.isPlaying = true;

        return this;
    }

    private isOnce = false;
    public PlayOnce() {
        this.isOnce = true;
        this.TweenType = daTweenPlayType.ONCE;
        this.isPlaying = true
        return this;
    }
    public Pause() { this.isPlaying = false; return this; }
    public SetDuration(_duration: number) { this.Duration = _duration; return this; }
    public SetDelay(_delay: number) { this.Delay = _delay; return this; }
    public SetOnFinish<Z>(_thisObj: Z, _onfinish: (this: Z) => void) {
        this.OnFinish.removeDelegate();
        if (_thisObj && _onfinish)
            this.OnFinish.addDelegate(_thisObj, _onfinish);
        return this;
    }
    public SetOnUpdate<Z>(_thisObj: Z, _onUpdate: (this: Z, _deltaTime: number) => void) {
        this.OnUpdate.removeDelegate();
        if (_thisObj && _onUpdate)
            this.OnUpdate.addDelegate(_thisObj, _onUpdate);
        return this;
    }
    public SetTarget(_target: cc.Node) { this.Target = _target; return this; }

    public tweenClear() {
        if (this.OnFinish) this.OnFinish.removeDelegate();
        if (this.OnUpdate) this.OnUpdate.removeDelegate();
        this.Target = null;
    }

    protected tweenUpdate(_deltaTime: number) {
        if (this.isFinish)
            return;
        if (this.isPlaying) {
            this._totalTime += _deltaTime;

            if (this.OnUpdate) this.OnUpdate.Call(_deltaTime);

            switch (this.TweenType) {
                case daTweenPlayType.ONCE:
                    if (this._tweenTime >= this.Duration) {
                        this.TweenFinish();
                    }
                    break;
                case daTweenPlayType.LOOP:
                    break;
                case daTweenPlayType.PINGPONG:
                    break;
            }
        }

    }

    start() {
        if(this.Target == null) this.InitTween(this.Target)

        if (this.IsAutoPlay && !this.isPlaying) this.PlayForwards();
    }

    update(_deltaTime: number) {
        this.tweenUpdate(_deltaTime);
    }


    public static Tween(target?: cc.Node): daTweenBase {
        let _node = new cc.Node("daTweenBase");
        _node.parent = cc.director.getScene();
        let _tween = _node.addComponent(daTweenBase);
        _tween.InitTween(target);

        return _tween;
    }

}

export interface ITween {

    Reset(): this;
    ResetToBegin(): this;
    PlayForwards(): this;
    PlayBackwards(): this;
}