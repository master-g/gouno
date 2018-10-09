	/** 
	 * 贝兹曲线(完成第一部分)
	 */
	export class AnimationCurve {

		public PointStart: CurvePoint;
		public PointEnd: CurvePoint;
		public PointList: Array<CurvePoint>;

		private _curvePointes: Array<CurvePoint>;

		public constructor() {
			this.PointList = new Array<CurvePoint>();
			this.PointStart = new CurvePoint(0, 0);
			this.PointEnd = new CurvePoint(1, 1);
		}

		/** 获取曲线中对应X轴的一个值 */
		public CurveValue(_valueX: number) {
			if (this._curvePointes) {
				let _idx = Math.floor(_valueX * 100);
				if (this._curvePointes.length > _idx)
					return this._curvePointes[_idx].Y;
			}

			//没有初始化曲线，返回原值
			return _valueX;
		}

		/** 添加一个控制点，控制点区间:(0,-∞) => (1,+∞)*/
		public AddPoint(_x: number, _y: number) {
			if (_x < 0) _x = 0;
			else if (_x > 1) _x = 1;

			this.PointList.push(new CurvePoint(_x, _y))
		}

		/** 根据控制点,计算曲线 */
		public InitCurve() {
			this._curvePointes = [];

			this._curvePointes.push(new CurvePoint(0, this.PointStart.Y));
			let _x_value = 1;
			let _cpCount = 100;//生成Curve点数,点数越多越精确
			let _lastT = 0;
			for (var t = 0; t < 1000; t++) {
				var _t = t / 1000;

				var _x = this._getXbyT(_t);

				if (_x > _x_value / _cpCount) {
					var _y = this._getYbyT(_t);
					var _ly = this._getYbyT(_lastT);

					this._curvePointes.push(new CurvePoint(_x_value / _cpCount, (_y + _ly) / 2));
					_x_value++;
				}

				_lastT = _t;
			}

			this._curvePointes.push(new CurvePoint(1, this.PointEnd.Y));
		}

		/**
		 * 根据T计算Y的值
		 * n阶曲线 控制点数_pointCount n=_pointCount+1
		 * //公式 
		 * X = X0(1-t)^n + n*X1*t^1*(1-t)^(n-1) + n*X2*t^2*(1-t)^(n-2)...+Xn*t^n
		 * Y轴计算公式相同
		 */
		private _getXbyT(_t: number): number {
			let _pointCount = this.PointList.length;//控制点数,1个点是二阶贝塞尔曲线

			var _x = Math.pow((1 - _t), _pointCount + 1) * this.PointStart.X + Math.pow(_t, _pointCount + 1) * this.PointEnd.X;
			for (var i = 1; i <= _pointCount; i++) {
				var _pi = this.PointList[i - 1];
				_x += (_pointCount + 1) * Math.pow(_t, i) * Math.pow((1 - _t), _pointCount + 1 - i) * _pi.X;
			}

			return _x;
		}

		/** 根据T计算Y的值 */
		private _getYbyT(_t: number): number {
			let _pointCount = this.PointList.length;//控制点数,1个点是二阶贝塞尔曲线

			var _y = Math.pow((1 - _t), _pointCount + 1) * this.PointStart.Y + Math.pow(_t, _pointCount + 1) * this.PointEnd.Y;
			for (var i = 1; i <= _pointCount; i++) {
				var _pi = this.PointList[i - 1];
				_y += (_pointCount + 1) * Math.pow(_t, i) * Math.pow((1 - _t), _pointCount + 1 - i) * _pi.Y;
			}

			return _y;
		}

		/** 绘制曲线 */
		// public getLine(_w: number, _h: number): egret.Shape {
		// 	let _shape = new egret.Shape();
		// 	_shape.graphics.lineStyle(3, 0xff0000);
		// 	let _lenght = this._curvePointes.length;
		// 	for (var i = 0; i < _lenght - 1; i++) {
		// 		_shape.graphics.moveTo(this._curvePointes[i].X * _w, (1 - this._curvePointes[i].Y) * _h);
		// 		_shape.graphics.lineTo(this._curvePointes[i + 1].X * _w, (1 - this._curvePointes[i + 1].Y) * _h)
		// 	}
		// 	_shape.graphics.endFill();

		// 	return _shape;
		// }
	}

	/**
	 * 贝塞尔曲线控制点
	 */
	export class CurvePoint {
		private _Y: number;//y轴
		private _X: number;//X轴

		private LeftTengent: number;
		private RightTengent: number;

		public constructor(_x: number, _y: number) {
			this.SetY(_y);
			this.SetX(_x);
		}

		//Value
		public SetY(_y: number) {
			this._Y = _y;
		}
		public get Y(): number { return this._Y; }

		//Time
		public SetX(_x: number) {
			if (_x > 1) _x = 1;
			else if (_x < 0) _x = 0;

			this._X = _x;
		}
		public get X(): number { return this._X; }

	}


	/**
	 * 贝塞尔曲线绘制编辑
	 */
	// export class CurveLineEdit extends egret.Sprite {

	// 	private _Curve: AnimationCurve;
	// 	private _Points: egret.Bitmap[];

	// 	private _Width: number;
	// 	private _Height: number;

	// 	public OnChange: daDelegateJ<AnimationCurve>;

	// 	public constructor() {
	// 		super();

	// 		this._Points = [];
	// 		this.addListener();
	// 	}

	// 	public DrawLine(_curve: AnimationCurve, _w: number, _h: number) {
	// 		this._Curve = _curve;
	// 		this._Width = _w;
	// 		this._Height = _h;

	// 		while(this.numChildren > 0)
	// 			this.removeChildren();
	// 		this._Points = [];


	// 		this.drawBg(_w, _h);
	// 		this.drawPoint(_w, _h);

	// 		let _line = _curve.getLine(_w, _h);
	// 		this.addChild(_line);
	// 	}

	// 	/** 画背景 */
	// 	private drawBg(_w: number, _h: number) {
	// 		var _bg = new eui.Rect(_w*3, _h*3, 0x999999);
	// 		var _line = new egret.Shape();
	// 		var _line1 = new egret.Shape();
	// 		_line.graphics.lineStyle(2, 0x000000);
	// 		_line1.graphics.lineStyle(1, 0x444444);

	// 		//画网格-列
	// 		for (var i = 0; i < 21; i++) {
	// 			let _l: egret.Shape;
	// 			if (i % 2 == 0) _l = _line
	// 			else _l = _line1;

	// 			let _x = i * _w / 20;
	// 			_l.graphics.moveTo(_x, 0);
	// 			_l.graphics.lineTo(_x, _h);
	// 		}
	// 		//画网格-行
	// 		for (var i = 0; i < 21; i++) {
	// 			let _l: egret.Shape;
	// 			if (i % 2 == 0) _l = _line
	// 			else _l = _line1;

	// 			let _y = i * _h / 20;
	// 			_l.graphics.moveTo(0, _y);
	// 			_l.graphics.lineTo(_w, _y);
	// 		}

	// 		_line.graphics.endFill();
	// 		_line1.graphics.endFill();

	// 		this.addChild(_bg);
	// 		this.addChild(_line);
	// 		this.addChild(_line1);
	// 		_bg.x = -_w;
	// 		_bg.y = -_h;
	// 	}

	// 	private drawPoint(_w: number, _h: number) {
	// 		if (this._Points) {
	// 			for (var i in this._Points) {
	// 				this.removeChild(this._Points[i])
	// 			}
	// 			this._Points = [];
	// 		}

	// 		for (var i in this._Curve.PointList) {
	// 			let _bm = AssetsManager.CreateBitMapByName("radiobutton_select_down_png");
	// 			_bm.height = _bm.width = 20;
	// 			_bm.anchorOffsetX = _bm.width / 2;
	// 			_bm.anchorOffsetY = _bm.height / 2;
	// 			this._Points.push(_bm);
	// 			this.addChild(_bm);
	// 			_bm.touchEnabled = true;

	// 			let _cp = this._Curve.PointList[i];
	// 			_bm.x = _cp.X * _w;
	// 			_bm.y = (1 - _cp.Y) * _h;
	// 		}
	// 	}


	// 	private addListener() {
	// 		// Main.STAGE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
	// 		// Main.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
	// 		// Main.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveHandler, this);
	// 	}
	// 	private removeListener() {
	// 		// Main.STAGE.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
	// 		// Main.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
	// 		// Main.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveHandler, this);
	// 	}


	// 	private _posX: number;
	// 	private _posY: number;
	// 	private _moveX: number;
	// 	private _moveY: number;
	// 	private _moveItem: egret.Bitmap;
	// 	private _pointIndex: string;
	// 	private onTouchBeginHandler(e: egret.TouchEvent) {
	// 		if (this._Points && !this._moveItem) {
	// 			for (var i in this._Points) {
	// 				if (e.target == this._Points[i]) {
	// 					this._moveX = e.stageX;
	// 					this._moveY = e.stageY;
	// 					this._moveItem = this._Points[i];
	// 					this._posX = this._moveItem.x;
	// 					this._posY = this._moveItem.y;
	// 					this._pointIndex = i;
	// 					return;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	private onTouchEndHandler(e: egret.TouchEvent) {
	// 		if (!this._moveItem)
	// 			return;

	// 		var _cp: CurvePoint = this._Curve.PointList[this._pointIndex];
	// 		let _X = (this._moveItem.x) / this._Width;
	// 		let _Y = (this._Height - this._moveItem.y) / this._Height;
	// 		_cp.SetX(_X);
	// 		_cp.SetY(_Y);
	// 		this._Curve.InitCurve();
	// 		this.DrawLine(this._Curve, this._Width, this._Height);

	// 		this._moveItem = null;
	// 		if(this.OnChange != null){
	// 			this.OnChange.Call(this._Curve);
	// 		}
	// 	}
	// 	private onTouchMoveHandler(e: egret.TouchEvent) {

	// 		if (this._moveItem) {
	// 			this._posX += e.stageX - this._moveX;
	// 			this._posY += e.stageY - this._moveY;
	// 			this._moveX = e.stageX;
	// 			this._moveY = e.stageY;

	// 			this._moveItem.x = this._posX < 0 ? 0 : this._posX > this._Width ? this._Width : this._posX;
	// 			this._moveItem.y = this._posY;
	// 		}
	// 	}


	// }