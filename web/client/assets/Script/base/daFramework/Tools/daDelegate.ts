
/** 没有参数的委托类 */
export class daDelegate {
	public OnDelegate: Array<Function>;
	public thisObjs: Array<any>;

	/** 使用 daDelegateJKW.daDelegate()创建委托对象 */
	public constructor() {
		this.OnDelegate = new Array<Function>();
		this.thisObjs = new Array<any>();
	}

	public Call() {
		if (this.OnDelegate) {
			let _len = this.OnDelegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				this.OnDelegate[i].call(this.thisObjs[i]);
			}
		}
	}

	/** 执行一次就清空 */
	public CallOnce() {
		if (this.OnDelegate) {
			let _delegate = this.OnDelegate;
			let _thisObjs = this.thisObjs;
			this.OnDelegate = [];
			this.thisObjs = [];

			let _len = _delegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				_delegate[i].call(_thisObjs[i]);
			}

		}
	}

	public addDelegate<Z>(_thisObj: Z, _delegate: (this: Z) => void) {
		this.OnDelegate.push(_delegate);
		this.thisObjs.push(_thisObj);
	}

	public removeDelegate<Z>(_thisObj?: Z, _delegate?: (this: Z) => void) {
		if (_thisObj && _delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}
	public removeFunction<Z>(_thisObj?: Z, _delegate?: Function) {
		if (_delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}

	public static Create<Z>(_thisObj: Z, _event: (this: Z) => void): daDelegate {
		let _delegate: daDelegate = new daDelegate();
		_delegate.thisObjs.push(_thisObj);
		_delegate.OnDelegate.push(_event);

		return _delegate;
	}
}

/** 1个参数的委托类 */
export class daDelegateJ<J>{
	public OnDelegate: Array<Function>;
	public thisObjs: Array<any>;

	/** 使用 daDelegateJKW.daDelegate()创建委托对象 */
	public constructor() {
		this.OnDelegate = new Array<Function>();
		this.thisObjs = new Array<any>();
	}

	public Call<J>(_j: J) {
		if (this.OnDelegate) {
			let _len = this.OnDelegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				this.OnDelegate[i].call(this.thisObjs[i], _j);
			}
		}
	}

	/** 执行一次就清空 */
	public CallOnce<J>(_j: J) {
		if (this.OnDelegate) {
			let _delegate = this.OnDelegate;
			let _thisObjs = this.thisObjs;
			this.OnDelegate = [];
			this.thisObjs = [];

			let _len = _delegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				_delegate[i].call(_thisObjs[i], _j);
			}

		}
	}


	public addDelegate<Z>(_thisObj: Z, _delegate: (this: Z, _j: J) => void) {
		this.OnDelegate.push(_delegate);
		this.thisObjs.push(_thisObj);
	}

	public removeDelegate<Z>(_thisObj?: Z, _delegate?: (this: Z, _j: J) => void) {
		if (_delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}
	public removeFunction<Z>(_thisObj?: Z, _delegate?: Function) {
		if (_delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}

	public static Create<Z, J>(_thisObj: Z, _event: (this: Z, _j: J) => void): daDelegateJ<J> {
		let _delegate: daDelegateJ<J> = new daDelegateJ();
		_delegate.thisObjs.push(_thisObj);
		_delegate.OnDelegate.push(_event);

		return _delegate;
	}
}

/** 2个参数的委托类 */
export class daDelegateJK<J, K>{
	public OnDelegate: Array<Function>;
	public thisObjs: Array<any>;

	/** 使用 daDelegateJKW.daDelegate()创建委托对象 */
	public constructor() {
		this.OnDelegate = new Array<Function>();
		this.thisObjs = new Array<any>();
	}

	public Call<J, K>(_j: J, _k: K) {
		if (this.OnDelegate) {
			let _len = this.OnDelegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				this.OnDelegate[i].call(this.thisObjs[i], _j, _k);
			}
		}
	}
	/** 执行一次就清空 */
	public CallOnce<J, K>(_j: J, _k: K) {
		if (this.OnDelegate) {
			let _delegate = this.OnDelegate;
			let _thisObjs = this.thisObjs;
			this.OnDelegate = [];
			this.thisObjs = [];


			let _len = _delegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				_delegate[i].call(_thisObjs[i], _j, _k);
			}

		}
	}

	public addDelegate<Z>(_thisObj: Z, _delegate: (this: Z, _j: J, _k: K) => void) {
		this.OnDelegate.push(_delegate);
		this.thisObjs.push(_thisObj);
	}

	public removeDelegate<Z>(_thisObj?: Z, _delegate?: (this: Z, _j: J, _k: K) => void) {
		if (_thisObj && _delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}
	public removeFunction<Z>(_thisObj?: Z, _delegate?: Function) {
		if (_delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}

	public static Create<Z, J, K>(_thisObj: Z, _event: (this: Z, _j: J, _K: K) => void): daDelegateJK<J, K> {
		let _delegate: daDelegateJK<J, K> = new daDelegateJK();
		_delegate.thisObjs.push(_thisObj);
		_delegate.OnDelegate.push(_event);

		return _delegate;
	}
}

/** 3个参数的委托类 */
export class daDelegateJKW<J, K, W>{
	public OnDelegate: Array<Function>;
	public thisObjs: Array<any>;

	/** 使用 daDelegateJKW.daDelegate()创建委托对象 */
	public constructor() {
		this.OnDelegate = new Array<Function>();
		this.thisObjs = new Array<any>();
	}

	public Call<J, K, W>(_j: J, _k: K, _w: W) {
		if (this.OnDelegate) {

			let _len = this.OnDelegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				this.OnDelegate[i].call(this.thisObjs[i], _j, _k, _w);
			}
		}
	}
	/** 执行一次就清空 */
	public CallOnce<J, K, W>(_j: J, _k: K, _w: W) {
		if (this.OnDelegate) {
			let _delegate = this.OnDelegate;
			let _thisObjs = this.thisObjs;
			this.OnDelegate = [];
			this.thisObjs = [];


			let _len = _delegate.length;
			for (var i = _len - 1; i >= 0; i--) {
				_delegate[i].call(_thisObjs[i], _j, _k, _w);
			}

		}
	}

	public addDelegate<Z>(_thisObj: Z, _delegate: (this: Z, _j: J, _k: K, _w: W) => void) {
		this.OnDelegate.push(_delegate);
		this.thisObjs.push(_thisObj);
	}

	public removeDelegate<Z>(_thisObj?: Z, _delegate?: (this: Z, _j: J, _k: K, _w: W) => void) {
		if (_thisObj && _delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}
	public removeFunction<Z>(_thisObj?: Z, _delegate?: Function) {
		if (_delegate) {
			let _len = this.OnDelegate.length;
			for (var i = 0; i < _len; i++) {
				if (this.OnDelegate[i] == _delegate && this.thisObjs[i] == _thisObj) {
					this.OnDelegate.splice(i, 1);
					this.thisObjs.splice(i, 1);

					return;
				}
			}
		} else {
			this.OnDelegate = [];
			this.thisObjs = [];
		}
	}

	public static Create<Z, J, K, W>(_thisObj: Z, _event: (this: Z, _j: J, _K: K, _w: W) => void): daDelegateJKW<J, K, W> {
		let _delegate: daDelegateJKW<J, K, W> = new daDelegateJKW();
		_delegate.thisObjs.push(_thisObj);
		_delegate.OnDelegate.push(_event);

		return _delegate;
	}
}