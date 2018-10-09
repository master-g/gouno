import { AnimationCurve, CurvePoint } from "../Tools/AnimationCurve";
import daTweenPosition from "./daTweenPosition";
import daTweenPositionX from "./daTweenPositionX";

export namespace daFramework {

	export module Tween {
		export enum daTweenPlayType {
			ONCE = 0,
			LOOP = 1, 
			PINGPONG = 2,
		};

		// sin 0 ~ pi/2 曲线
		export function TWEENFUNC_SIN(value): number {
			return Math.sin((value) * Math.PI / 2);
		}

		export function TWEENFUNC_COS(value): number {
			return Math.cos((value) * Math.PI / 2);
		}

		/** sin 0 ~ Pi 曲线 */
		export function TWEENFUNC_SIN02(value: number): number {
			return Math.sin((value) * Math.PI);
		}

		/** sin -pi/2 ~ 0 曲线  */
		export function TWEENFUNC_SIN03(value :number):number {
			return Math.sin((value - 1) * Math.PI / 2) + 1
		}

		export function TWEENCURVE_01(): AnimationCurve {
			return TweenCurves.GetCurve(0);
		}
		export function TWEENCURVE_02(): AnimationCurve {
			return TweenCurves.GetCurve(1);
		}


		export function Init() {
			TweenCurves.Init();
		}

		export class TweenCurves {
			private static _instance: TweenCurves;

			public static Init() {
				if (this._instance == null)
					this._instance = new TweenCurves();

				this._instance._curveList = [];
				this._instance._pointList = [];
				this._instance._pointList.push([new CurvePoint(0.1, 0.6), new CurvePoint(0.1, 1)]);
				this._instance._pointList.push([new CurvePoint(0.3, 1), new CurvePoint(0.2, 1)]);

				for (var i = 0; i < this._instance._pointList.length; i++) {
					let _curve = new AnimationCurve();
					_curve.PointList = this._instance._pointList[i];
					_curve.InitCurve();
					this._instance._curveList.push(_curve);
				}
			}

			private _curveList: AnimationCurve[];
			private _pointList: CurvePoint[][];

			public static GetCurve(_idx): AnimationCurve {
				if (this._instance == null) return null;

				return this._instance._curveList[_idx];
			}

		}


	}


}
