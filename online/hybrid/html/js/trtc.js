! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define &&
		define.amd ? define(t) : (e = e || self).TRTC = t()
}(this, function() {
	var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ?
		global : "undefined" != typeof self ? self : {};

	function t(e, t) {
		return e(t = {
			exports: {}
		}, t.exports), t.exports
	}
	var n, r, i, o = "object",
		a = function(e) {
			return e && e.Math == Math && e
		},
		s = a(typeof globalThis == o && globalThis) || a(typeof window == o && window) || a(typeof self == o && self) || a(
			typeof e == o && e) || Function("return this")(),
		c = function(e) {
			try {
				return !!e()
			} catch (t) {
				return 1
			}
		},
		u = !c(function() {
			return 7 != Object.defineProperty({}, "a", {
				get: function() {
					return 7
				}
			}).a
		}),
		d = {}.propertyIsEnumerable,
		l = Object.getOwnPropertyDescriptor,
		p = {
			f: l && !d.call({
				1: 2
			}, 1) ? function(e) {
				var t = l(this, e);
				return !!t && t.enumerable
			} : d
		},
		f = function(e, t) {
			return {
				enumerable: !(1 & e),
				configurable: !(2 & e),
				writable: !(4 & e),
				value: t
			}
		},
		h = {}.toString,
		m = function(e) {
			return h.call(e).slice(8, -1)
		},
		v = "".split,
		g = c(function() {
			return !Object("z").propertyIsEnumerable(0)
		}) ? function(e) {
			return "String" == m(e) ? v.call(e, "") : Object(e)
		} : Object,
		_ = function(e) {
			if (null == e) throw TypeError("Can't call method on " + e);
			return e
		},
		y = function(e) {
			return g(_(e))
		},
		S = function(e) {
			return "object" == typeof e ? null !== e : "function" == typeof e
		},
		b = function(e, t) {
			if (!S(e)) return e;
			var n, r;
			if (t && "function" == typeof(n = e.toString) && !S(r = n.call(e))) return r;
			if ("function" == typeof(n = e.valueOf) && !S(r = n.call(e))) return r;
			if (!t && "function" == typeof(n = e.toString) && !S(r = n.call(e))) return r;
			throw TypeError("Can't convert object to primitive value")
		},
		k = {}.hasOwnProperty,
		C = function(e, t) {
			return k.call(e, t)
		},
		w = s.document,
		R = S(w) && S(w.createElement),
		T = function(e) {
			return R ? w.createElement(e) : {}
		},
		E = !u && !c(function() {
			return 7 != Object.defineProperty(T("div"), "a", {
				get: function() {
					return 7
				}
			}).a
		}),
		I = Object.getOwnPropertyDescriptor,
		P = {
			f: u ? I : function(e, t) {
				if (e = y(e), t = b(t, 1), E) try {
					return I(e, t)
				} catch (n) {}
				if (C(e, t)) return f(!p.f.call(e, t), e[t])
			}
		},
		x = function(e) {
			if (!S(e)) throw TypeError(String(e) + " is not an object");
			return e
		},
		A = Object.defineProperty,
		O = {
			f: u ? A : function(e, t, n) {
				if (x(e), t = b(t, 1), x(n), E) try {
					return A(e, t, n)
				} catch (r) {}
				if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
				return "value" in n && (e[t] = n.value), e
			}
		},
		D = u ? function(e, t, n) {
			return O.f(e, t, f(1, n))
		} : function(e, t, n) {
			return e[t] = n, e
		},
		L = function(e, t) {
			try {
				D(s, e, t)
			} catch (n) {
				s[e] = t
			}
			return t
		},
		N = t(function(e) {
			var t = s["__core-js_shared__"] || L("__core-js_shared__", {});
			(e.exports = function(e, n) {
				return t[e] || (t[e] = void 0 !== n ? n : {})
			})("versions", []).push({
				version: "3.1.3",
				mode: "global",
				copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
			})
		}),
		M = N("native-function-to-string", Function.toString),
		j = s.WeakMap,
		V = "function" == typeof j && /native code/.test(M.call(j)),
		U = 0,
		F = Math.random(),
		G = function(e) {
			return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++U + F).toString(36)
		},
		B = N("keys"),
		H = function(e) {
			return B[e] || (B[e] = G(e))
		},
		z = {},
		W = s.WeakMap;
	if (V) {
		var J = new W,
			q = J.get,
			K = J.has,
			$ = J.set;
		n = function(e, t) {
			return $.call(J, e, t), t
		}, r = function(e) {
			return q.call(J, e) || {}
		}, i = function(e) {
			return K.call(J, e)
		}
	} else {
		var Y = H("state");
		z[Y] = 1, n = function(e, t) {
			return D(e, Y, t), t
		}, r = function(e) {
			return C(e, Y) ? e[Y] : {}
		}, i = function(e) {
			return C(e, Y)
		}
	}
	var Q = {
			set: n,
			get: r,
			has: i,
			enforce: function(e) {
				return i(e) ? r(e) : n(e, {})
			},
			getterFor: function(e) {
				return function(t) {
					var n;
					if (!S(t) || (n = r(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
					return n
				}
			}
		},
		X = t(function(e) {
			var t = Q.get,
				n = Q.enforce,
				r = String(M).split("toString");
			N("inspectSource", function(e) {
				return M.call(e)
			}), (e.exports = function(e, t, i, o) {
				var a = o ? !!o.unsafe : 0,
					c = o ? !!o.enumerable : 0,
					u = o ? !!o.noTargetGet : 0;
				"function" == typeof i && ("string" != typeof t || C(i, "name") || D(i, "name", t), n(i).source = r.join(
						"string" == typeof t ? t : "")), e !== s ? (a ? !u && e[t] && (c = 1) : delete e[t], c ? e[t] = i : D(e, t, i)) :
					c ? e[t] = i : L(t, i)
			})(Function.prototype, "toString", function() {
				return "function" == typeof this && t(this).source || M.call(this)
			})
		}),
		Z = s,
		ee = function(e) {
			return "function" == typeof e ? e : void 0
		},
		te = function(e, t) {
			return arguments.length < 2 ? ee(Z[e]) || ee(s[e]) : Z[e] && Z[e][t] || s[e] && s[e][t]
		},
		ne = Math.ceil,
		re = Math.floor,
		ie = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? re : ne)(e)
		},
		oe = Math.min,
		ae = function(e) {
			return e > 0 ? oe(ie(e), 9007199254740991) : 0
		},
		se = Math.max,
		ce = Math.min,
		ue = function(e, t) {
			var n = ie(e);
			return n < 0 ? se(n + t, 0) : ce(n, t)
		},
		de = function(e) {
			return function(t, n, r) {
				var i, o = y(t),
					a = ae(o.length),
					s = ue(r, a);
				if (e && n != n) {
					for (; a > s;)
						if ((i = o[s++]) != i) return 1
				} else
					for (; a > s; s++)
						if ((e || s in o) && o[s] === n) return e || s || 0;
				return !e && -1
			}
		},
		le = {
			includes: de(1),
			indexOf: de(0)
		},
		pe = le.indexOf,
		fe = function(e, t) {
			var n, r = y(e),
				i = 0,
				o = [];
			for (n in r) !C(z, n) && C(r, n) && o.push(n);
			for (; t.length > i;) C(r, n = t[i++]) && (~pe(o, n) || o.push(n));
			return o
		},
		he = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString",
			"valueOf"
		],
		me = he.concat("length", "prototype"),
		ve = {
			f: Object.getOwnPropertyNames || function(e) {
				return fe(e, me)
			}
		},
		ge = {
			f: Object.getOwnPropertySymbols
		},
		_e = te("Reflect", "ownKeys") || function(e) {
			var t = ve.f(x(e)),
				n = ge.f;
			return n ? t.concat(n(e)) : t
		},
		ye = function(e, t) {
			for (var n = _e(t), r = O.f, i = P.f, o = 0; o < n.length; o++) {
				var a = n[o];
				C(e, a) || r(e, a, i(t, a))
			}
		},
		Se = /#|\.prototype\./,
		be = function(e, t) {
			var n = Ce[ke(e)];
			return n == Re ? 1 : n == we ? 0 : "function" == typeof t ? c(t) : !!t
		},
		ke = be.normalize = function(e) {
			return String(e).replace(Se, ".").toLowerCase()
		},
		Ce = be.data = {},
		we = be.NATIVE = "N",
		Re = be.POLYFILL = "P",
		Te = be,
		Ee = P.f,
		Ie = function(e, t) {
			var n, r, i, o, a, c = e.target,
				u = e.global,
				d = e.stat;
			if (n = u ? s : d ? s[c] || L(c, {}) : (s[c] || {}).prototype)
				for (r in t) {
					if (o = t[r], i = e.noTargetGet ? (a = Ee(n, r)) && a.value : n[r], !Te(u ? r : c + (d ? "." : "#") + r, e.forced) &&
						void 0 !== i) {
						if (typeof o == typeof i) continue;
						ye(o, i)
					}(e.sham || i && i.sham) && D(o, "sham", 1), X(n, r, o, e)
				}
		},
		Pe = Array.isArray || function(e) {
			return "Array" == m(e)
		},
		xe = function(e) {
			return Object(_(e))
		},
		Ae = function(e, t, n) {
			var r = b(t);
			r in e ? O.f(e, r, f(0, n)) : e[r] = n
		},
		Oe = !!Object.getOwnPropertySymbols && !c(function() {
			return !String(Symbol())
		}),
		De = s.Symbol,
		Le = N("wks"),
		Ne = function(e) {
			return Le[e] || (Le[e] = Oe && De[e] || (Oe ? De : G)("Symbol." + e))
		},
		Me = Ne("species"),
		je = function(e, t) {
			var n;
			return Pe(e) && ("function" != typeof(n = e.constructor) || n !== Array && !Pe(n.prototype) ? S(n) && null === (n =
				n[Me]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
		},
		Ve = Ne("species"),
		Ue = function(e) {
			return !c(function() {
				var t = [];
				return (t.constructor = {})[Ve] = function() {
					return {
						foo: 1
					}
				}, 1 !== t[e](Boolean).foo
			})
		},
		Fe = Ne("isConcatSpreadable"),
		Ge = !c(function() {
			var e = [];
			return e[Fe] = 0, e.concat()[0] !== e
		}),
		Be = Ue("concat"),
		He = function(e) {
			if (!S(e)) return 0;
			var t = e[Fe];
			return void 0 !== t ? !!t : Pe(e)
		};
	Ie({
		target: "Array",
		proto: 1,
		forced: !Ge || !Be
	}, {
		concat: function(e) {
			var t, n, r, i, o, a = xe(this),
				s = je(a, 0),
				c = 0;
			for (t = -1, r = arguments.length; t < r; t++)
				if (o = -1 === t ? a : arguments[t], He(o)) {
					if (c + (i = ae(o.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
					for (n = 0; n < i; n++, c++) n in o && Ae(s, c, o[n])
				} else {
					if (c >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
					Ae(s, c++, o)
				} return s.length = c, s
		}
	});
	var ze = function(e) {
			if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
			return e
		},
		We = function(e, t, n) {
			if (ze(e), void 0 === t) return e;
			switch (n) {
				case 0:
					return function() {
						return e.call(t)
					};
				case 1:
					return function(n) {
						return e.call(t, n)
					};
				case 2:
					return function(n, r) {
						return e.call(t, n, r)
					};
				case 3:
					return function(n, r, i) {
						return e.call(t, n, r, i)
					}
			}
			return function() {
				return e.apply(t, arguments)
			}
		},
		Je = [].push,
		qe = function(e) {
			var t = 1 == e,
				n = 2 == e,
				r = 3 == e,
				i = 4 == e,
				o = 6 == e,
				a = 5 == e || o;
			return function(s, c, u, d) {
				for (var l, p, f = xe(s), h = g(f), m = We(c, u, 3), v = ae(h.length), _ = 0, y = d || je, S = t ? y(s, v) : n ?
						y(s, 0) : void 0; v > _; _++)
					if ((a || _ in h) && (p = m(l = h[_], _, f), e))
						if (t) S[_] = p;
						else if (p) switch (e) {
					case 3:
						return 1;
					case 5:
						return l;
					case 6:
						return _;
					case 2:
						Je.call(S, l)
				} else if (i) return 0;
				return o ? -1 : r || i ? i : S
			}
		},
		Ke = {
			forEach: qe(0),
			map: qe(1),
			filter: qe(2),
			some: qe(3),
			every: qe(4),
			find: qe(5),
			findIndex: qe(6)
		},
		$e = Ke.filter;
	Ie({
		target: "Array",
		proto: 1,
		forced: !Ue("filter")
	}, {
		filter: function(e) {
			return $e(this, e, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	var Ye = Ke.map;

	function Qe(e) {
		return (Qe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		})(e)
	}

	function Xe(e, t, n, r, i, o, a) {
		try {
			var s = e[o](a),
				c = s.value
		} catch (u) {
			return void n(u)
		}
		s.done ? t(c) : Promise.resolve(c).then(r, i)
	}

	function Ze(e) {
		return function() {
			var t = this,
				n = arguments;
			return new Promise(function(r, i) {
				var o = e.apply(t, n);

				function a(e) {
					Xe(o, r, i, a, s, "next", e)
				}

				function s(e) {
					Xe(o, r, i, a, s, "throw", e)
				}
				a(void 0)
			})
		}
	}

	function et(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function tt(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || 0, r.configurable = 1, "value" in r && (r.writable = 1), Object.defineProperty(e, r.key,
				r)
		}
	}

	function nt(e, t, n) {
		return t && tt(e.prototype, t), n && tt(e, n), e
	}

	function rt(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: 1,
			configurable: 1,
			writable: 1
		}) : e[t] = n, e
	}

	function it(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {},
				r = Object.keys(n);
			"function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(
				e) {
				return Object.getOwnPropertyDescriptor(n, e).enumerable
			}))), r.forEach(function(t) {
				rt(e, t, n[t])
			})
		}
		return e
	}

	function ot(e, t) {
		if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
		e.prototype = Object.create(t && t.prototype, {
			constructor: {
				value: e,
				writable: 1,
				configurable: 1
			}
		}), t && st(e, t)
	}

	function at(e) {
		return (at = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
			return e.__proto__ || Object.getPrototypeOf(e)
		})(e)
	}

	function st(e, t) {
		return (st = Object.setPrototypeOf || function(e, t) {
			return e.__proto__ = t, e
		})(e, t)
	}

	function ct(e, t, n) {
		return (ct = function() {
			if ("undefined" == typeof Reflect || !Reflect.construct) return 0;
			if (Reflect.construct.sham) return 0;
			if ("function" == typeof Proxy) return 1;
			try {
				return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 1
			} catch (e) {
				return 0
			}
		}() ? Reflect.construct : function(e, t, n) {
			var r = [null];
			r.push.apply(r, t);
			var i = new(Function.bind.apply(e, r));
			return n && st(i, n.prototype), i
		}).apply(null, arguments)
	}

	function ut(e) {
		var t = "function" == typeof Map ? new Map : void 0;
		return (ut = function(e) {
			if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
			var n;
			if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
			if (void 0 !== t) {
				if (t.has(e)) return t.get(e);
				t.set(e, r)
			}

			function r() {
				return ct(e, arguments, at(this).constructor)
			}
			return r.prototype = Object.create(e.prototype, {
				constructor: {
					value: r,
					enumerable: 0,
					writable: 1,
					configurable: 1
				}
			}), st(r, e)
		})(e)
	}

	function dt(e, t) {
		return !t || "object" != typeof t && "function" != typeof t ? function(e) {
			if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e
		}(e) : t
	}

	function lt(e, t, n) {
		return (lt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
			var r = function(e, t) {
				for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = at(e)););
				return e
			}(e, t);
			if (r) {
				var i = Object.getOwnPropertyDescriptor(r, t);
				return i.get ? i.get.call(n) : i.value
			}
		})(e, t, n || e)
	}

	function pt(e, t) {
		return function(e) {
			if (Array.isArray(e)) return e
		}(e) || function(e, t) {
			var n = [],
				r = 1,
				i = 0,
				o = void 0;
			try {
				for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r =
					1);
			} catch (c) {
				i = 1, o = c
			} finally {
				try {
					r || null == s.return || s.return()
				} finally {
					if (i) throw o
				}
			}
			return n
		}(e, t) || function() {
			throw new TypeError("Invalid attempt to destructure non-iterable instance")
		}()
	}
	Ie({
		target: "Array",
		proto: 1,
		forced: !Ue("map")
	}, {
		map: function(e) {
			return Ye(this, e, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	t(function(e) {
		! function(t) {
			var n, r = Object.prototype,
				i = r.hasOwnProperty,
				o = "function" == typeof Symbol ? Symbol : {},
				a = o.iterator || "@@iterator",
				s = o.asyncIterator || "@@asyncIterator",
				c = o.toStringTag || "@@toStringTag",
				u = t.regeneratorRuntime;
			if (u) e.exports = u;
			else {
				(u = t.regeneratorRuntime = e.exports).wrap = y;
				var d = "suspendedStart",
					l = "suspendedYield",
					p = "executing",
					f = "completed",
					h = {},
					m = {};
				m[a] = function() {
					return this
				};
				var v = Object.getPrototypeOf,
					g = v && v(v(x([])));
				g && g !== r && i.call(g, a) && (m = g);
				var _ = C.prototype = b.prototype = Object.create(m);
				k.prototype = _.constructor = C, C.constructor = k, C[c] = k.displayName = "GeneratorFunction", u.isGeneratorFunction =
					function(e) {
						var t = "function" == typeof e && e.constructor;
						return t ? t === k || "GeneratorFunction" === (t.displayName || t.name) : 0
					}, u.mark = function(e) {
						return Object.setPrototypeOf ? Object.setPrototypeOf(e, C) : (e.__proto__ = C, c in e || (e[c] =
							"GeneratorFunction")), e.prototype = Object.create(_), e
					}, u.awrap = function(e) {
						return {
							__await: e
						}
					}, w(R.prototype), R.prototype[s] = function() {
						return this
					}, u.AsyncIterator = R, u.async = function(e, t, n, r) {
						var i = new R(y(e, t, n, r));
						return u.isGeneratorFunction(t) ? i : i.next().then(function(e) {
							return e.done ? e.value : i.next()
						})
					}, w(_), _[c] = "Generator", _[a] = function() {
						return this
					}, _.toString = function() {
						return "[object Generator]"
					}, u.keys = function(e) {
						var t = [];
						for (var n in e) t.push(n);
						return t.reverse(),
							function n() {
								for (; t.length;) {
									var r = t.pop();
									if (r in e) return n.value = r, n.done = 0, n
								}
								return n.done = 1, n
							}
					}, u.values = x, P.prototype = {
						constructor: P,
						reset: function(e) {
							if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = 0, this.delegate = null, this.method =
								"next", this.arg = n, this.tryEntries.forEach(I), !e)
								for (var t in this) "t" === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n)
						},
						stop: function() {
							this.done = 1;
							var e = this.tryEntries[0].completion;
							if ("throw" === e.type) throw e.arg;
							return this.rval
						},
						dispatchException: function(e) {
							if (this.done) throw e;
							var t = this;

							function r(r, i) {
								return s.type = "throw", s.arg = e, t.next = r, i && (t.method = "next", t.arg = n), !!i
							}
							for (var o = this.tryEntries.length - 1; o >= 0; --o) {
								var a = this.tryEntries[o],
									s = a.completion;
								if ("root" === a.tryLoc) return r("end");
								if (a.tryLoc <= this.prev) {
									var c = i.call(a, "catchLoc"),
										u = i.call(a, "finallyLoc");
									if (c && u) {
										if (this.prev < a.catchLoc) return r(a.catchLoc, 1);
										if (this.prev < a.finallyLoc) return r(a.finallyLoc)
									} else if (c) {
										if (this.prev < a.catchLoc) return r(a.catchLoc, 1)
									} else {
										if (!u) throw new Error("try statement without catch or finally");
										if (this.prev < a.finallyLoc) return r(a.finallyLoc)
									}
								}
							}
						},
						abrupt: function(e, t) {
							for (var n = this.tryEntries.length - 1; n >= 0; --n) {
								var r = this.tryEntries[n];
								if (r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
									var o = r;
									break
								}
							}
							o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
							var a = o ? o.completion : {};
							return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, h) : this.complete(a)
						},
						complete: function(e, t) {
							if ("throw" === e.type) throw e.arg;
							return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval =
									this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t),
								h
						},
						finish: function(e) {
							for (var t = this.tryEntries.length - 1; t >= 0; --t) {
								var n = this.tryEntries[t];
								if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), I(n), h
							}
						},
						catch: function(e) {
							for (var t = this.tryEntries.length - 1; t >= 0; --t) {
								var n = this.tryEntries[t];
								if (n.tryLoc === e) {
									var r = n.completion;
									if ("throw" === r.type) {
										var i = r.arg;
										I(n)
									}
									return i
								}
							}
							throw new Error("illegal catch attempt")
						},
						delegateYield: function(e, t, r) {
							return this.delegate = {
								iterator: x(e),
								resultName: t,
								nextLoc: r
							}, "next" === this.method && (this.arg = n), h
						}
					}
			}

			function y(e, t, n, r) {
				var i = t && t.prototype instanceof b ? t : b,
					o = Object.create(i.prototype),
					a = new P(r || []);
				return o._invoke = function(e, t, n) {
					var r = d;
					return function(i, o) {
						if (r === p) throw new Error("Generator is already running");
						if (r === f) {
							if ("throw" === i) throw o;
							return A()
						}
						for (n.method = i, n.arg = o;;) {
							var a = n.delegate;
							if (a) {
								var s = T(a, n);
								if (s) {
									if (s === h) continue;
									return s
								}
							}
							if ("next" === n.method) n.sent = n._sent = n.arg;
							else if ("throw" === n.method) {
								if (r === d) throw r = f, n.arg;
								n.dispatchException(n.arg)
							} else "return" === n.method && n.abrupt("return", n.arg);
							r = p;
							var c = S(e, t, n);
							if ("normal" === c.type) {
								if (r = n.done ? f : l, c.arg === h) continue;
								return {
									value: c.arg,
									done: n.done
								}
							}
							"throw" === c.type && (r = f, n.method = "throw", n.arg = c.arg)
						}
					}
				}(e, n, a), o
			}

			function S(e, t, n) {
				try {
					return {
						type: "normal",
						arg: e.call(t, n)
					}
				} catch (r) {
					return {
						type: "throw",
						arg: r
					}
				}
			}

			function b() {}

			function k() {}

			function C() {}

			function w(e) {
				["next", "throw", "return"].forEach(function(t) {
					e[t] = function(e) {
						return this._invoke(t, e)
					}
				})
			}

			function R(e) {
				var t;
				this._invoke = function(n, r) {
					function o() {
						return new Promise(function(t, o) {
							! function t(n, r, o, a) {
								var s = S(e[n], e, r);
								if ("throw" !== s.type) {
									var c = s.arg,
										u = c.value;
									return u && "object" == typeof u && i.call(u, "__await") ? Promise.resolve(u.__await).then(function(e) {
										t("next", e, o, a)
									}, function(e) {
										t("throw", e, o, a)
									}) : Promise.resolve(u).then(function(e) {
										c.value = e, o(c)
									}, a)
								}
								a(s.arg)
							}(n, r, t, o)
						})
					}
					return t = t ? t.then(o, o) : o()
				}
			}

			function T(e, t) {
				var r = e.iterator[t.method];
				if (r === n) {
					if (t.delegate = null, "throw" === t.method) {
						if (e.iterator.return && (t.method = "return", t.arg = n, T(e, t), "throw" === t.method)) return h;
						t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
					}
					return h
				}
				var i = S(r, e.iterator, t.arg);
				if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, h;
				var o = i.arg;
				return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next",
					t.arg = n), t.delegate = null, h) : o : (t.method = "throw", t.arg = new TypeError(
					"iterator result is not an object"), t.delegate = null, h)
			}

			function E(e) {
				var t = {
					tryLoc: e[0]
				};
				1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
			}

			function I(e) {
				var t = e.completion || {};
				t.type = "normal", delete t.arg, e.completion = t
			}

			function P(e) {
				this.tryEntries = [{
					tryLoc: "root"
				}], e.forEach(E, this), this.reset(1)
			}

			function x(e) {
				if (e) {
					var t = e[a];
					if (t) return t.call(e);
					if ("function" == typeof e.next) return e;
					if (!isNaN(e.length)) {
						var r = -1,
							o = function t() {
								for (; ++r < e.length;)
									if (i.call(e, r)) return t.value = e[r], t.done = 0, t;
								return t.value = n, t.done = 1, t
							};
						return o.next = o
					}
				}
				return {
					next: A
				}
			}

			function A() {
				return {
					value: n,
					done: 1
				}
			}
		}(function() {
			return this
		}() || Function("return this")())
	});
	let ft = 1,
		ht = 1;

	function mt(e, t, n) {
		const r = e.match(t);
		return r && r.length >= n && parseInt(r[n], 10)
	}

	function vt(e, t, n) {
		if (!e.RTCPeerConnection) return;
		const r = e.RTCPeerConnection.prototype,
			i = r.addEventListener;
		r.addEventListener = function(e, r) {
			if (e !== t) return i.apply(this, arguments);
			const o = e => {
				const t = n(e);
				t && r(t)
			};
			return this._eventMap = this._eventMap || {}, this._eventMap[r] = o, i.apply(this, [e, o])
		};
		const o = r.removeEventListener;
		r.removeEventListener = function(e, n) {
			if (e !== t || !this._eventMap || !this._eventMap[n]) return o.apply(this, arguments);
			const r = this._eventMap[n];
			return delete this._eventMap[n], o.apply(this, [e, r])
		}, Object.defineProperty(r, "on" + t, {
			get() {
				return this["_on" + t]
			},
			set(e) {
				this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(
					t, this["_on" + t] = e)
			},
			enumerable: 1,
			configurable: 1
		})
	}

	function gt(e) {
		return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (ft = e, e ?
			"adapter.js logging disabled" : "adapter.js logging enabled")
	}

	function _t(e) {
		return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (ht = !e,
			"adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
	}

	function yt() {
		if ("object" == typeof window) {
			if (ft) return;
			"undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
		}
	}

	function St(e, t) {
		ht && console.warn(e + " is deprecated, please use " + t + " instead.")
	}

	function bt(e) {
		const {
			navigator: t
		} = e, n = {
			browser: null,
			version: null
		};
		if (void 0 === e || !e.navigator) return n.browser = "Not a browser.", n;
		if (t.mozGetUserMedia) n.browser = "firefox", n.version = mt(t.userAgent, /Firefox\/(\d+)\./, 1);
		else if (t.webkitGetUserMedia || 0 == e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) n.browser =
			"chrome", n.version = mt(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
		else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) n.browser = "edge", n.version = mt(t.userAgent,
			/Edge\/(\d+).(\d+)$/, 2);
		else {
			if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return n.browser =
				"Not a supported browser.", n;
			n.browser = "safari", n.version = mt(t.userAgent, /AppleWebKit\/(\d+)\./, 1), n.supportsUnifiedPlan = e.RTCRtpTransceiver &&
				"currentDirection" in e.RTCRtpTransceiver.prototype
		}
		return n
	}

	function kt(e) {
		return "[object Object]" === Object.prototype.toString.call(e)
	}

	function Ct(e) {
		return kt(e) ? Object.keys(e).reduce(function(t, n) {
			const r = kt(e[n]),
				i = r ? Ct(e[n]) : e[n],
				o = r && !Object.keys(i).length;
			return void 0 === i || o ? t : Object.assign(t, {
				[n]: i
			})
		}, {}) : e
	}

	function wt(e, t, n) {
		const r = n ? "outbound-rtp" : "inbound-rtp",
			i = new Map;
		if (null === t) return i;
		const o = [];
		return e.forEach(e => {
			"track" === e.type && e.trackIdentifier === t.id && o.push(e)
		}), o.forEach(t => {
			e.forEach(n => {
				n.type === r && n.trackId === t.id && function e(t, n, r) {
					n && !r.has(n.id) && (r.set(n.id, n), Object.keys(n).forEach(i => {
						i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(n => {
							e(t, t.get(n), r)
						})
					}))
				}(e, n, i)
			})
		}), i
	}
	const Rt = yt;

	function Tt(e) {
		const t = e && e.navigator;
		if (!t.mediaDevices) return;
		const n = bt(e),
			r = function(e) {
				if ("object" != typeof e || e.mandatory || e.optional) return e;
				const t = {};
				return Object.keys(e).forEach(n => {
					if ("require" === n || "advanced" === n || "mediaSource" === n) return;
					const r = "object" == typeof e[n] ? e[n] : {
						ideal: e[n]
					};
					void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
					const i = function(e, t) {
						return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
					};
					if (void 0 !== r.ideal) {
						t.optional = t.optional || [];
						let e = {};
						"number" == typeof r.ideal ? (e[i("min", n)] = r.ideal, t.optional.push(e), (e = {})[i("max", n)] = r.ideal, t
							.optional.push(e)) : (e[i("", n)] = r.ideal, t.optional.push(e))
					}
					void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) :
						["min", "max"].forEach(e => {
							void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
						})
				}), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
			},
			i = function(e, i) {
				if (n.version >= 61) return i(e);
				if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
					const t = function(e, t, n) {
						t in e && !(n in e) && (e[n] = e[t], delete e[t])
					};
					t((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), t(e.audio,
						"noiseSuppression", "googNoiseSuppression"), e.audio = r(e.audio)
				}
				if (e && "object" == typeof e.video) {
					let o = e.video.facingMode;
					o = o && ("object" == typeof o ? o : {
						ideal: o
					});
					const a = n.version < 66;
					if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) &&
						(!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || a)) {
						let n;
						if (delete e.video.facingMode, "environment" === o.exact || "environment" === o.ideal ? n = ["back", "rear"] :
							"user" !== o.exact && "user" !== o.ideal || (n = ["front"]), n) return t.mediaDevices.enumerateDevices().then(t => {
							let a = (t = t.filter(e => "videoinput" === e.kind)).find(e => n.some(t => e.label.toLowerCase().includes(t)));
							return !a && t.length && n.includes("back") && (a = t[t.length - 1]), a && (e.video.deviceId = o.exact ? {
								exact: a.deviceId
							} : {
								ideal: a.deviceId
							}), e.video = r(e.video), Rt("chrome: " + JSON.stringify(e)), i(e)
						})
					}
					e.video = r(e.video)
				}
				return Rt("chrome: " + JSON.stringify(e)), i(e)
			},
			o = function(e) {
				return n.version >= 64 ? e : {
					name: {
						PermissionDeniedError: "NotAllowedError",
						PermissionDismissedError: "NotAllowedError",
						InvalidStateError: "NotAllowedError",
						DevicesNotFoundError: "NotFoundError",
						ConstraintNotSatisfiedError: "OverconstrainedError",
						TrackStartError: "NotReadableError",
						MediaDeviceFailedDueToShutdown: "NotAllowedError",
						MediaDeviceKillSwitchOn: "NotAllowedError",
						TabCaptureError: "AbortError",
						ScreenCaptureError: "AbortError",
						DeviceCaptureError: "AbortError"
					} [e.name] || e.name,
					message: e.message,
					constraint: e.constraint || e.constraintName,
					toString() {
						return this.name + (this.message && ": ") + this.message
					}
				}
			};
		if (t.getUserMedia = function(e, n, r) {
				i(e, e => {
					t.webkitGetUserMedia(e, n, e => {
						r && r(o(e))
					})
				})
			}.bind(t), t.mediaDevices.getUserMedia) {
			const e = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
			t.mediaDevices.getUserMedia = function(t) {
				return i(t, t => e(t).then(e => {
					if (t.audio && !e.getAudioTracks().length || t.video && !e.getVideoTracks().length) throw e.getTracks().forEach(
						e => {
							e.stop()
						}), new DOMException("", "NotFoundError");
					return e
				}, e => Promise.reject(o(e))))
			}
		}
	}

	function Et(e) {
		e.MediaStream = e.MediaStream || e.webkitMediaStream
	}

	function It(e) {
		if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) vt(e, "track", e =>
			(e.transceiver || Object.defineProperty(e, "transceiver", {
				value: {
					receiver: e.receiver
				}
			}), e));
		else {
			Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
				get() {
					return this._ontrack
				},
				set(e) {
					this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack =
						e)
				},
				enumerable: 1,
				configurable: 1
			});
			const t = e.RTCPeerConnection.prototype.setRemoteDescription;
			e.RTCPeerConnection.prototype.setRemoteDescription = function() {
				return this._ontrackpoly || (this._ontrackpoly = t => {
					t.stream.addEventListener("addtrack", n => {
						let r;
						r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.track
							.id) : {
							track: n.track
						};
						const i = new Event("track");
						i.track = n.track, i.receiver = r, i.transceiver = {
							receiver: r
						}, i.streams = [t.stream], this.dispatchEvent(i)
					}), t.stream.getTracks().forEach(n => {
						let r;
						r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.id) :
							{
								track: n
							};
						const i = new Event("track");
						i.track = n, i.receiver = r, i.transceiver = {
							receiver: r
						}, i.streams = [t.stream], this.dispatchEvent(i)
					})
				}, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments)
			}
		}
	}

	function Pt(e) {
		if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) &&
			"createDTMFSender" in e.RTCPeerConnection.prototype) {
			const t = function(e, t) {
				return {
					track: t,
					get dtmf() {
						return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null),
							this._dtmf
					},
					_pc: e
				}
			};
			if (!e.RTCPeerConnection.prototype.getSenders) {
				e.RTCPeerConnection.prototype.getSenders = function() {
					return this._senders = this._senders || [], this._senders.slice()
				};
				const n = e.RTCPeerConnection.prototype.addTrack;
				e.RTCPeerConnection.prototype.addTrack = function(e, r) {
					let i = n.apply(this, arguments);
					return i || (i = t(this, e), this._senders.push(i)), i
				};
				const r = e.RTCPeerConnection.prototype.removeTrack;
				e.RTCPeerConnection.prototype.removeTrack = function(e) {
					r.apply(this, arguments);
					const t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
				}
			}
			const n = e.RTCPeerConnection.prototype.addStream;
			e.RTCPeerConnection.prototype.addStream = function(e) {
				this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(e => {
					this._senders.push(t(this, e))
				})
			};
			const r = e.RTCPeerConnection.prototype.removeStream;
			e.RTCPeerConnection.prototype.removeStream = function(e) {
				this._senders = this._senders || [], r.apply(this, [e]), e.getTracks().forEach(e => {
					const t = this._senders.find(t => t.track === e);
					t && this._senders.splice(this._senders.indexOf(t), 1)
				})
			}
		} else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype &&
			"createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
			const t = e.RTCPeerConnection.prototype.getSenders;
			e.RTCPeerConnection.prototype.getSenders = function() {
				const e = t.apply(this, []);
				return e.forEach(e => e._pc = this), e
			}, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
				get() {
					return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) :
						this._dtmf = null), this._dtmf
				}
			})
		}
	}

	function xt(e) {
		if (!e.RTCPeerConnection) return;
		const t = e.RTCPeerConnection.prototype.getStats;
		e.RTCPeerConnection.prototype.getStats = function() {
			const [e, n, r] = arguments;
			if (arguments.length > 0 && "function" == typeof e) return t.apply(this, arguments);
			if (0 === t.length && (0 === arguments.length || "function" != typeof e)) return t.apply(this, []);
			const i = function(e) {
					const t = {};
					return e.result().forEach(e => {
						const n = {
							id: e.id,
							timestamp: e.timestamp,
							type: {
								localcandidate: "local-candidate",
								remotecandidate: "remote-candidate"
							} [e.type] || e.type
						};
						e.names().forEach(t => {
							n[t] = e.stat(t)
						}), t[n.id] = n
					}), t
				},
				o = function(e) {
					return new Map(Object.keys(e).map(t => [t, e[t]]))
				};
			if (arguments.length >= 2) {
				const r = function(e) {
					n(o(i(e)))
				};
				return t.apply(this, [r, e])
			}
			return new Promise((e, n) => {
				t.apply(this, [function(t) {
					e(o(i(t)))
				}, n])
			}).then(n, r)
		}
	}

	function At(e) {
		if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return;
		if (!("getStats" in e.RTCRtpSender.prototype)) {
			const t = e.RTCPeerConnection.prototype.getSenders;
			t && (e.RTCPeerConnection.prototype.getSenders = function() {
				const e = t.apply(this, []);
				return e.forEach(e => e._pc = this), e
			});
			const n = e.RTCPeerConnection.prototype.addTrack;
			n && (e.RTCPeerConnection.prototype.addTrack = function() {
				const e = n.apply(this, arguments);
				return e._pc = this, e
			}), e.RTCRtpSender.prototype.getStats = function() {
				const e = this;
				return this._pc.getStats().then(t => wt(t, e.track, 1))
			}
		}
		if (!("getStats" in e.RTCRtpReceiver.prototype)) {
			const t = e.RTCPeerConnection.prototype.getReceivers;
			t && (e.RTCPeerConnection.prototype.getReceivers = function() {
				const e = t.apply(this, []);
				return e.forEach(e => e._pc = this), e
			}), vt(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function() {
				const e = this;
				return this._pc.getStats().then(t => wt(t, e.track, 0))
			}
		}
		if (!("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype)) return;
		const t = e.RTCPeerConnection.prototype.getStats;
		e.RTCPeerConnection.prototype.getStats = function() {
			if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
				const e = arguments[0];
				let t, n, r;
				return this.getSenders().forEach(n => {
						n.track === e && (t ? r = 1 : t = n)
					}), this.getReceivers().forEach(t => (t.track === e && (n ? r = 1 : n = t), t.track === e)), r || t && n ?
					Promise.reject(new DOMException("There are more than one sender or receiver for the track.",
						"InvalidAccessError")) : t ? t.getStats() : n ? n.getStats() : Promise.reject(new DOMException(
						"There is no sender or receiver for the track.", "InvalidAccessError"))
			}
			return t.apply(this, arguments)
		}
	}

	function Ot(e) {
		e.RTCPeerConnection.prototype.getLocalStreams = function() {
			return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(e =>
				this._shimmedLocalStreams[e][0])
		};
		const t = e.RTCPeerConnection.prototype.addTrack;
		e.RTCPeerConnection.prototype.addTrack = function(e, n) {
			if (!n) return t.apply(this, arguments);
			this._shimmedLocalStreams = this._shimmedLocalStreams || {};
			const r = t.apply(this, arguments);
			return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[
				n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r], r
		};
		const n = e.RTCPeerConnection.prototype.addStream;
		e.RTCPeerConnection.prototype.addStream = function(e) {
			this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(e => {
				if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.",
					"InvalidAccessError")
			});
			const t = this.getSenders();
			n.apply(this, arguments);
			const r = this.getSenders().filter(e => -1 === t.indexOf(e));
			this._shimmedLocalStreams[e.id] = [e].concat(r)
		};
		const r = e.RTCPeerConnection.prototype.removeStream;
		e.RTCPeerConnection.prototype.removeStream = function(e) {
			return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], r.apply(
				this, arguments)
		};
		const i = e.RTCPeerConnection.prototype.removeTrack;
		e.RTCPeerConnection.prototype.removeTrack = function(e) {
			return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(
				t => {
					const n = this._shimmedLocalStreams[t].indexOf(e); - 1 !== n && this._shimmedLocalStreams[t].splice(n, 1), 1 ===
						this._shimmedLocalStreams[t].length && delete this._shimmedLocalStreams[t]
				}), i.apply(this, arguments)
		}
	}

	function Dt(e) {
		if (!e.RTCPeerConnection) return;
		const t = bt(e);
		if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return Ot(e);
		const n = e.RTCPeerConnection.prototype.getLocalStreams;
		e.RTCPeerConnection.prototype.getLocalStreams = function() {
			const e = n.apply(this);
			return this._reverseStreams = this._reverseStreams || {}, e.map(e => this._reverseStreams[e.id])
		};
		const r = e.RTCPeerConnection.prototype.addStream;
		e.RTCPeerConnection.prototype.addStream = function(t) {
			if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(
					e => {
						if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.",
							"InvalidAccessError")
					}), !this._reverseStreams[t.id]) {
				const n = new e.MediaStream(t.getTracks());
				this._streams[t.id] = n, this._reverseStreams[n.id] = t, t = n
			}
			r.apply(this, [t])
		};
		const i = e.RTCPeerConnection.prototype.removeStream;

		function o(e, t) {
			let n = t.sdp;
			return Object.keys(e._reverseStreams || []).forEach(t => {
				const r = e._reverseStreams[t],
					i = e._streams[r.id];
				n = n.replace(new RegExp(i.id, "g"), r.id)
			}), new RTCSessionDescription({
				type: t.type,
				sdp: n
			})
		}

		function a(e, t) {
			let n = t.sdp;
			return Object.keys(e._reverseStreams || []).forEach(t => {
				const r = e._reverseStreams[t],
					i = e._streams[r.id];
				n = n.replace(new RegExp(r.id, "g"), i.id)
			}), new RTCSessionDescription({
				type: t.type,
				sdp: n
			})
		}
		e.RTCPeerConnection.prototype.removeStream = function(e) {
			this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i.apply(this, [this._streams[
				e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[
				e.id]
		}, e.RTCPeerConnection.prototype.addTrack = function(t, n) {
			if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.",
				"InvalidStateError");
			const r = [].slice.call(arguments, 1);
			if (1 !== r.length || !r[0].getTracks().find(e => e === t)) throw new DOMException(
				"The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
				"NotSupportedError");
			const i = this.getSenders().find(e => e.track === t);
			if (i) throw new DOMException("Track already exists.", "InvalidAccessError");
			this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
			const o = this._streams[n.id];
			if (o) o.addTrack(t), Promise.resolve().then(() => {
				this.dispatchEvent(new Event("negotiationneeded"))
			});
			else {
				const r = new e.MediaStream([t]);
				this._streams[n.id] = r, this._reverseStreams[r.id] = n, this.addStream(r)
			}
			return this.getSenders().find(e => e.track === t)
		}, ["createOffer", "createAnswer"].forEach(function(t) {
			const n = e.RTCPeerConnection.prototype[t],
				r = {
					[t]() {
						const e = arguments;
						return arguments.length && "function" == typeof arguments[0] ? n.apply(this, [t => {
							const n = o(this, t);
							e[0].apply(null, [n])
						}, t => {
							e[1] && e[1].apply(null, t)
						}, arguments[2]]) : n.apply(this, arguments).then(e => o(this, e))
					}
				};
			e.RTCPeerConnection.prototype[t] = r[t]
		});
		const s = e.RTCPeerConnection.prototype.setLocalDescription;
		e.RTCPeerConnection.prototype.setLocalDescription = function() {
			return arguments.length && arguments[0].type ? (arguments[0] = a(this, arguments[0]), s.apply(this, arguments)) :
				s.apply(this, arguments)
		};
		const c = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
		Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
			get() {
				const e = c.get.apply(this);
				return "" === e.type ? e : o(this, e)
			}
		}), e.RTCPeerConnection.prototype.removeTrack = function(e) {
			if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.",
				"InvalidStateError");
			if (!e._pc) throw new DOMException(
				"Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
			if (!(e._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
			let t;
			this._streams = this._streams || {}, Object.keys(this._streams).forEach(n => {
				this._streams[n].getTracks().find(t => e.track === t) && (t = this._streams[n])
			}), t && (1 === t.getTracks().length ? this.removeStream(this._reverseStreams[t.id]) : t.removeTrack(e.track),
				this.dispatchEvent(new Event("negotiationneeded")))
		}
	}

	function Lt(e) {
		const t = bt(e);
		if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), !e.RTCPeerConnection)
			return;
		t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
			const n = e.RTCPeerConnection.prototype[t],
				r = {
					[t]() {
						return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]),
							n.apply(this, arguments)
					}
				};
			e.RTCPeerConnection.prototype[t] = r[t]
		});
		const n = e.RTCPeerConnection.prototype.addIceCandidate;
		e.RTCPeerConnection.prototype.addIceCandidate = function() {
			return arguments[0] ? t.version < 78 && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(
				this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
		}
	}

	function Nt(e) {
		vt(e, "negotiationneeded", e => {
			if ("stable" === e.target.signalingState) return e
		})
	}
	var Mt = Object.freeze({
		shimMediaStream: Et,
		shimOnTrack: It,
		shimGetSendersWithDtmf: Pt,
		shimGetStats: xt,
		shimSenderReceiverGetStats: At,
		shimAddTrackRemoveTrackWithNative: Ot,
		shimAddTrackRemoveTrack: Dt,
		shimPeerConnection: Lt,
		fixNegotiationNeeded: Nt,
		shimGetUserMedia: Tt,
		shimGetDisplayMedia: function(e, t) {
			e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (
				"function" == typeof t ? e.navigator.mediaDevices.getDisplayMedia = function(n) {
					return t(n).then(t => {
						const r = n.video && n.video.width,
							i = n.video && n.video.height,
							o = n.video && n.video.frameRate;
						return n.video = {
								mandatory: {
									chromeMediaSource: "desktop",
									chromeMediaSourceId: t,
									maxFrameRate: o || 3
								}
							}, r && (n.video.mandatory.maxWidth = r), i && (n.video.mandatory.maxHeight = i), e.navigator.mediaDevices
							.getUserMedia(n)
					})
				} : console.error("shimGetDisplayMedia: getSourceId argument is not a function"))
		}
	});
	var jt = t(function(e) {
		var t = {
			generateIdentifier: function() {
				return Math.random().toString(36).substr(2, 10)
			}
		};
		t.localCName = t.generateIdentifier(), t.splitLines = function(e) {
			return e.trim().split("\n").map(function(e) {
				return e.trim()
			})
		}, t.splitSections = function(e) {
			return e.split("\nm=").map(function(e, t) {
				return (t > 0 ? "m=" + e : e).trim() + "\r\n"
			})
		}, t.getDescription = function(e) {
			var n = t.splitSections(e);
			return n && n[0]
		}, t.getMediaSections = function(e) {
			var n = t.splitSections(e);
			return n.shift(), n
		}, t.matchPrefix = function(e, n) {
			return t.splitLines(e).filter(function(e) {
				return 0 === e.indexOf(n)
			})
		}, t.parseCandidate = function(e) {
			for (var t, n = {
					foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
					component: parseInt(t[1], 10),
					protocol: t[2].toLowerCase(),
					priority: parseInt(t[3], 10),
					ip: t[4],
					address: t[4],
					port: parseInt(t[5], 10),
					type: t[7]
				}, r = 8; r < t.length; r += 2) switch (t[r]) {
				case "raddr":
					n.relatedAddress = t[r + 1];
					break;
				case "rport":
					n.relatedPort = parseInt(t[r + 1], 10);
					break;
				case "tcptype":
					n.tcpType = t[r + 1];
					break;
				case "ufrag":
					n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
					break;
				default:
					n[t[r]] = t[r + 1]
			}
			return n
		}, t.writeCandidate = function(e) {
			var t = [];
			t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address ||
				e.ip), t.push(e.port);
			var n = e.type;
			return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e
					.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() &&
				(t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment ||
					e.ufrag)), "candidate:" + t.join(" ")
		}, t.parseIceOptions = function(e) {
			return e.substr(14).split(" ")
		}, t.parseRtpMap = function(e) {
			var t = e.substr(9).split(" "),
				n = {
					payloadType: parseInt(t.shift(), 10)
				};
			return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ?
				parseInt(t[2], 10) : 1, n.numChannels = n.channels, n
		}, t.writeRtpMap = function(e) {
			var t = e.payloadType;
			void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
			var n = e.channels || e.numChannels || 1;
			return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n"
		}, t.parseExtmap = function(e) {
			var t = e.substr(9).split(" ");
			return {
				id: parseInt(t[0], 10),
				direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
				uri: t[1]
			}
		}, t.writeExtmap = function(e) {
			return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction :
				"") + " " + e.uri + "\r\n"
		}, t.parseFmtp = function(e) {
			for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split(
				"="))[0].trim()] = t[1];
			return n
		}, t.writeFmtp = function(e) {
			var t = "",
				n = e.payloadType;
			if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters)
				.length) {
				var r = [];
				Object.keys(e.parameters).forEach(function(t) {
					e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
				}), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
			}
			return t
		}, t.parseRtcpFb = function(e) {
			var t = e.substr(e.indexOf(" ") + 1).split(" ");
			return {
				type: t.shift(),
				parameter: t.join(" ")
			}
		}, t.writeRtcpFb = function(e) {
			var t = "",
				n = e.payloadType;
			return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length &&
				e.rtcpFeedback.forEach(function(e) {
					t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
				}), t
		}, t.parseSsrcMedia = function(e) {
			var t = e.indexOf(" "),
				n = {
					ssrc: parseInt(e.substr(7, t - 7), 10)
				},
				r = e.indexOf(":", t);
			return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t +
				1), n
		}, t.parseSsrcGroup = function(e) {
			var t = e.substr(13).split(" ");
			return {
				semantics: t.shift(),
				ssrcs: t.map(function(e) {
					return parseInt(e, 10)
				})
			}
		}, t.getMid = function(e) {
			var n = t.matchPrefix(e, "a=mid:")[0];
			if (n) return n.substr(6)
		}, t.parseFingerprint = function(e) {
			var t = e.substr(14).split(" ");
			return {
				algorithm: t[0].toLowerCase(),
				value: t[1]
			}
		}, t.getDtlsParameters = function(e, n) {
			return {
				role: "auto",
				fingerprints: t.matchPrefix(e + n, "a=fingerprint:").map(t.parseFingerprint)
			}
		}, t.writeDtlsParameters = function(e, t) {
			var n = "a=setup:" + t + "\r\n";
			return e.fingerprints.forEach(function(e) {
				n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
			}), n
		}, t.getIceParameters = function(e, n) {
			var r = t.splitLines(e);
			return {
				usernameFragment: (r = r.concat(t.splitLines(n))).filter(function(e) {
					return 0 === e.indexOf("a=ice-ufrag:")
				})[0].substr(12),
				password: r.filter(function(e) {
					return 0 === e.indexOf("a=ice-pwd:")
				})[0].substr(10)
			}
		}, t.writeIceParameters = function(e) {
			return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
		}, t.parseRtpParameters = function(e) {
			for (var n = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: [],
					rtcp: []
				}, r = t.splitLines(e)[0].split(" "), i = 3; i < r.length; i++) {
				var o = r[i],
					a = t.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
				if (a) {
					var s = t.parseRtpMap(a),
						c = t.matchPrefix(e, "a=fmtp:" + o + " ");
					switch (s.parameters = c.length ? t.parseFmtp(c[0]) : {}, s.rtcpFeedback = t.matchPrefix(e, "a=rtcp-fb:" + o +
						" ").map(t.parseRtcpFb), n.codecs.push(s), s.name.toUpperCase()) {
						case "RED":
						case "ULPFEC":
							n.fecMechanisms.push(s.name.toUpperCase())
					}
				}
			}
			return t.matchPrefix(e, "a=extmap:").forEach(function(e) {
				n.headerExtensions.push(t.parseExtmap(e))
			}), n
		}, t.writeRtpDescription = function(e, n) {
			var r = "";
			r += "m=" + e + " ", r += n.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += n.codecs.map(
				function(e) {
					return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
				}).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", n.codecs.forEach(
				function(e) {
					r += t.writeRtpMap(e), r += t.writeFmtp(e), r += t.writeRtcpFb(e)
				});
			var i = 0;
			return n.codecs.forEach(function(e) {
					e.maxptime > i && (i = e.maxptime)
				}), i > 0 && (r += "a=maxptime:" + i + "\r\n"), r += "a=rtcp-mux\r\n", n.headerExtensions && n.headerExtensions
				.forEach(function(e) {
					r += t.writeExtmap(e)
				}), r
		}, t.parseRtpEncodingParameters = function(e) {
			var n, r = [],
				i = t.parseRtpParameters(e),
				o = -1 !== i.fecMechanisms.indexOf("RED"),
				a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
				s = t.matchPrefix(e, "a=ssrc:").map(function(e) {
					return t.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				}),
				c = s.length > 0 && s[0].ssrc,
				u = t.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
					return e.substr(17).split(" ").map(function(e) {
						return parseInt(e, 10)
					})
				});
			u.length > 0 && u[0].length > 1 && u[0][0] === c && (n = u[0][1]), i.codecs.forEach(function(e) {
				if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
					var t = {
						ssrc: c,
						codecPayloadType: parseInt(e.parameters.apt, 10)
					};
					c && n && (t.rtx = {
						ssrc: n
					}), r.push(t), o && ((t = JSON.parse(JSON.stringify(t))).fec = {
						ssrc: c,
						mechanism: a ? "red+ulpfec" : "red"
					}, r.push(t))
				}
			}), 0 === r.length && c && r.push({
				ssrc: c
			});
			var d = t.matchPrefix(e, "b=");
			return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf(
				"b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
				e.maxBitrate = d
			})), r
		}, t.parseRtcpParameters = function(e) {
			var n = {},
				r = t.matchPrefix(e, "a=ssrc:").map(function(e) {
					return t.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				})[0];
			r && (n.cname = r.value, n.ssrc = r.ssrc);
			var i = t.matchPrefix(e, "a=rtcp-rsize");
			n.reducedSize = i.length > 0, n.compound = 0 === i.length;
			var o = t.matchPrefix(e, "a=rtcp-mux");
			return n.mux = o.length > 0, n
		}, t.parseMsid = function(e) {
			var n, r = t.matchPrefix(e, "a=msid:");
			if (1 === r.length) return {
				stream: (n = r[0].substr(7).split(" "))[0],
				track: n[1]
			};
			var i = t.matchPrefix(e, "a=ssrc:").map(function(e) {
				return t.parseSsrcMedia(e)
			}).filter(function(e) {
				return "msid" === e.attribute
			});
			return i.length > 0 ? {
				stream: (n = i[0].value.split(" "))[0],
				track: n[1]
			} : void 0
		}, t.generateSessionId = function() {
			return Math.random().toString().substr(2, 21)
		}, t.writeSessionBoilerplate = function(e, n, r) {
			var i = void 0 !== n ? n : 2;
			return "v=0\r\no=" + (r || "thisisadapterortc") + " " + (e || t.generateSessionId()) + " " + i +
				" IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
		}, t.writeMediaSection = function(e, n, r, i) {
			var o = t.writeRtpDescription(e.kind, n);
			if (o += t.writeIceParameters(e.iceGatherer.getLocalParameters()), o += t.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),
					"offer" === r ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", e.direction ? o += "a=" + e.direction +
				"\r\n" : e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ?
				o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
				var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
				o += "a=" + a, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a, e.sendEncodingParameters[0].rtx &&
					(o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, o += "a=ssrc-group:FID " + e.sendEncodingParameters[
						0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + t.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[
				0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + t.localCName + "\r\n"), o
		}, t.getDirection = function(e, n) {
			for (var r = t.splitLines(e), i = 0; i < r.length; i++) switch (r[i]) {
				case "a=sendrecv":
				case "a=sendonly":
				case "a=recvonly":
				case "a=inactive":
					return r[i].substr(2)
			}
			return n ? t.getDirection(n) : "sendrecv"
		}, t.getKind = function(e) {
			return t.splitLines(e)[0].split(" ")[0].substr(2)
		}, t.isRejected = function(e) {
			return "0" === e.split(" ", 2)[1]
		}, t.parseMLine = function(e) {
			var n = t.splitLines(e)[0].substr(2).split(" ");
			return {
				kind: n[0],
				port: parseInt(n[1], 10),
				protocol: n[2],
				fmt: n.slice(3).join(" ")
			}
		}, t.parseOLine = function(e) {
			var n = t.matchPrefix(e, "o=")[0].substr(2).split(" ");
			return {
				username: n[0],
				sessionId: n[1],
				sessionVersion: parseInt(n[2], 10),
				netType: n[3],
				addressType: n[4],
				address: n[5]
			}
		}, t.isValidSDP = function(e) {
			if ("string" != typeof e || 0 === e.length) return 0;
			for (var n = t.splitLines(e), r = 0; r < n.length; r++)
				if (n[r].length < 2 || "=" !== n[r].charAt(1)) return 0;
			return 1
		}, e.exports = t
	});

	function Vt(e, t, n, r, i) {
		var o = jt.writeRtpDescription(e.kind, t);
		if (o += jt.writeIceParameters(e.iceGatherer.getLocalParameters()), o += jt.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),
				"offer" === n ? "actpass" : i || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o +=
			"a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o +=
			"a=inactive\r\n", e.rtpSender) {
			var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
			e.rtpSender._initialTrackId = a;
			var s = "msid:" + (r ? r.id : "-") + " " + a + "\r\n";
			o += "a=" + s, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + s, e.sendEncodingParameters[0].rtx && (o +=
				"a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + s, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0]
				.ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
		}
		return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + jt.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[
			0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + jt.localCName + "\r\n"), o
	}

	function Ut(e, t) {
		var n = {
				codecs: [],
				headerExtensions: [],
				fecMechanisms: []
			},
			r = function(e, t) {
				e = parseInt(e, 10);
				for (var n = 0; n < t.length; n++)
					if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
			},
			i = function(e, t, n, i) {
				var o = r(e.parameters.apt, n),
					a = r(t.parameters.apt, i);
				return o && a && o.name.toLowerCase() === a.name.toLowerCase()
			};
		return e.codecs.forEach(function(r) {
			for (var o = 0; o < t.codecs.length; o++) {
				var a = t.codecs[o];
				if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
					if ("rtx" === r.name.toLowerCase() && r.parameters && a.parameters.apt && !i(r, a, e.codecs, t.codecs)) continue;
					(a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(r.numChannels, a.numChannels), n.codecs.push(a), a.rtcpFeedback =
						a.rtcpFeedback.filter(function(e) {
							for (var t = 0; t < r.rtcpFeedback.length; t++)
								if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return 1;
							return 0
						});
					break
				}
			}
		}), e.headerExtensions.forEach(function(e) {
			for (var r = 0; r < t.headerExtensions.length; r++) {
				var i = t.headerExtensions[r];
				if (e.uri === i.uri) {
					n.headerExtensions.push(i);
					break
				}
			}
		}), n
	}

	function Ft(e, t, n) {
		return -1 !== {
			offer: {
				setLocalDescription: ["stable", "have-local-offer"],
				setRemoteDescription: ["stable", "have-remote-offer"]
			},
			answer: {
				setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
				setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
			}
		} [t][e].indexOf(n)
	}

	function Gt(e, t) {
		var n = e.getRemoteCandidates().find(function(e) {
			return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol ===
				e.protocol && t.type === e.type
		});
		return n || e.addRemoteCandidate(t), !n
	}

	function Bt(e, t) {
		var n = new Error(t);
		return n.name = e, n.code = {
			NotSupportedError: 9,
			InvalidStateError: 11,
			InvalidAccessError: 15,
			TypeError: void 0,
			OperationError: void 0
		} [e], n
	}
	var Ht = function(e, t) {
		function n(t, n) {
			n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
				track: t
			}))
		}

		function r(t, n, r, i) {
			var o = new Event("track");
			o.track = n, o.receiver = r, o.transceiver = {
				receiver: r
			}, o.streams = i, e.setTimeout(function() {
				t._dispatchEvent("track", o)
			})
		}
		var i = function(n) {
			var r = this,
				i = document.createDocumentFragment();
			if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
					r[e] = i[e].bind(i)
				}), this.canTrickleIceCandidates = null, this.needNegotiation = 0, this.localStreams = [], this.remoteStreams = [],
				this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState =
				"new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})),
				this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw Bt(
				"NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
			switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
				case "all":
				case "relay":
					break;
				default:
					n.iceTransportPolicy = "all"
			}
			switch (n.bundlePolicy) {
				case "balanced":
				case "max-compat":
				case "max-bundle":
					break;
				default:
					n.bundlePolicy = "balanced"
			}
			if (n.iceServers = function(e, t) {
					var n = 0;
					return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
						if (e && (e.urls || e.url)) {
							var r = e.urls || e.url;
							e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
							var i = "string" == typeof r;
							return i && (r = [r]), r = r.filter(function(e) {
								return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp") && -1 === e.indexOf("turn:[") && !n ?
									(n = 1, 1) : 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp")
							}), delete e.url, e.urls = i ? r[0] : r, !!r.length
						}
					})
				}(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize)
				for (var o = n.iceCandidatePoolSize; o > 0; o--) this._iceGatherers.push(new e.RTCIceGatherer({
					iceServers: n.iceServers,
					gatherPolicy: n.iceTransportPolicy
				}));
			else n.iceCandidatePoolSize = 0;
			this._config = n, this.transceivers = [], this._sdpSessionId = jt.generateSessionId(), this._sdpSessionVersion =
				0, this._dtlsRole = void 0, this._isClosed = 0
		};
		Object.defineProperty(i.prototype, "localDescription", {
				configurable: 1,
				get: function() {
					return this._localDescription
				}
			}), Object.defineProperty(i.prototype, "remoteDescription", {
				configurable: 1,
				get: function() {
					return this._remoteDescription
				}
			}), i.prototype.onicecandidate = null, i.prototype.onaddstream = null, i.prototype.ontrack = null, i.prototype.onremovestream =
			null, i.prototype.onsignalingstatechange = null, i.prototype.oniceconnectionstatechange = null, i.prototype.onconnectionstatechange =
			null, i.prototype.onicegatheringstatechange = null, i.prototype.onnegotiationneeded = null, i.prototype.ondatachannel =
			null, i.prototype._dispatchEvent = function(e, t) {
				this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
			}, i.prototype._emitGatheringStateChange = function() {
				var e = new Event("icegatheringstatechange");
				this._dispatchEvent("icegatheringstatechange", e)
			}, i.prototype.getConfiguration = function() {
				return this._config
			}, i.prototype.getLocalStreams = function() {
				return this.localStreams
			}, i.prototype.getRemoteStreams = function() {
				return this.remoteStreams
			}, i.prototype._createTransceiver = function(e, t) {
				var n = this.transceivers.length > 0,
					r = {
						track: null,
						iceGatherer: null,
						iceTransport: null,
						dtlsTransport: null,
						localCapabilities: null,
						remoteCapabilities: null,
						rtpSender: null,
						rtpReceiver: null,
						kind: e,
						mid: null,
						sendEncodingParameters: null,
						recvEncodingParameters: null,
						stream: null,
						associatedRemoteMediaStreams: [],
						wantReceive: 1
					};
				if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport, r.dtlsTransport = this.transceivers[
					0].dtlsTransport;
				else {
					var i = this._createIceAndDtlsTransports();
					r.iceTransport = i.iceTransport, r.dtlsTransport = i.dtlsTransport
				}
				return t || this.transceivers.push(r), r
			}, i.prototype.addTrack = function(t, n) {
				if (this._isClosed) throw Bt("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
				var r;
				if (this.transceivers.find(function(e) {
						return e.track === t
					})) throw Bt("InvalidAccessError", "Track already exists.");
				for (var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind ||
					(r = this.transceivers[i]);
				return r || (r = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(
						n) && this.localStreams.push(n), r.track = t, r.stream = n, r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport),
					r.rtpSender
			}, i.prototype.addStream = function(e) {
				var n = this;
				if (t >= 15025) e.getTracks().forEach(function(t) {
					n.addTrack(t, e)
				});
				else {
					var r = e.clone();
					e.getTracks().forEach(function(e, t) {
						var n = r.getTracks()[t];
						e.addEventListener("enabled", function(e) {
							n.enabled = e.enabled
						})
					}), r.getTracks().forEach(function(e) {
						n.addTrack(e, r)
					})
				}
			}, i.prototype.removeTrack = function(t) {
				if (this._isClosed) throw Bt("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
				if (!(t instanceof e.RTCRtpSender)) throw new TypeError(
					"Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
				var n = this.transceivers.find(function(e) {
					return e.rtpSender === t
				});
				if (!n) throw Bt("InvalidAccessError", "Sender was not created by this connection.");
				var r = n.stream;
				n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map(function(e) {
						return e.stream
					}).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1),
					this._maybeFireNegotiationNeeded()
			}, i.prototype.removeStream = function(e) {
				var t = this;
				e.getTracks().forEach(function(e) {
					var n = t.getSenders().find(function(t) {
						return t.track === e
					});
					n && t.removeTrack(n)
				})
			}, i.prototype.getSenders = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpSender
				}).map(function(e) {
					return e.rtpSender
				})
			}, i.prototype.getReceivers = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpReceiver
				}).map(function(e) {
					return e.rtpReceiver
				})
			}, i.prototype._createIceGatherer = function(t, n) {
				var r = this;
				if (n && t > 0) return this.transceivers[0].iceGatherer;
				if (this._iceGatherers.length) return this._iceGatherers.shift();
				var i = new e.RTCIceGatherer({
					iceServers: this._config.iceServers,
					gatherPolicy: this._config.iceTransportPolicy
				});
				return Object.defineProperty(i, "state", {
					value: "new",
					writable: 1
				}), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
					var n = !e.candidate || 0 === Object.keys(e.candidate).length;
					i.state = n ? "completed" : "gathering", null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t]
						.bufferedCandidateEvents.push(e)
				}, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
			}, i.prototype._gather = function(t, n) {
				var r = this,
					i = this.transceivers[n].iceGatherer;
				if (!i.onlocalcandidate) {
					var o = this.transceivers[n].bufferedCandidateEvents;
					this.transceivers[n].bufferedCandidateEvents = null, i.removeEventListener("localcandidate", this.transceivers[n]
						.bufferCandidates), i.onlocalcandidate = function(e) {
						if (!(r.usingBundle && n > 0)) {
							var o = new Event("icecandidate");
							o.candidate = {
								sdpMid: t,
								sdpMLineIndex: n
							};
							var a = e.candidate,
								s = !a || 0 === Object.keys(a).length;
							if (s) "new" !== i.state && "gathering" !== i.state || (i.state = "completed");
							else {
								"new" === i.state && (i.state = "gathering"), a.component = 1, a.ufrag = i.getLocalParameters().usernameFragment;
								var c = jt.writeCandidate(a);
								o.candidate = Object.assign(o.candidate, jt.parseCandidate(c)), o.candidate.candidate = c, o.candidate.toJSON =
									function() {
										return {
											candidate: o.candidate.candidate,
											sdpMid: o.candidate.sdpMid,
											sdpMLineIndex: o.candidate.sdpMLineIndex,
											usernameFragment: o.candidate.usernameFragment
										}
									}
							}
							var u = jt.getMediaSections(r._localDescription.sdp);
							u[o.candidate.sdpMLineIndex] += s ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", r._localDescription
								.sdp = jt.getDescription(r._localDescription.sdp) + u.join("");
							var d = r.transceivers.every(function(e) {
								return e.iceGatherer && "completed" === e.iceGatherer.state
							});
							"gathering" !== r.iceGatheringState && (r.iceGatheringState = "gathering", r._emitGatheringStateChange()), s ||
								r._dispatchEvent("icecandidate", o), d && (r._dispatchEvent("icecandidate", new Event("icecandidate")), r.iceGatheringState =
									"complete", r._emitGatheringStateChange())
						}
					}, e.setTimeout(function() {
						o.forEach(function(e) {
							i.onlocalcandidate(e)
						})
					}, 0)
				}
			}, i.prototype._createIceAndDtlsTransports = function() {
				var t = this,
					n = new e.RTCIceTransport(null);
				n.onicestatechange = function() {
					t._updateIceConnectionState(), t._updateConnectionState()
				};
				var r = new e.RTCDtlsTransport(n);
				return r.ondtlsstatechange = function() {
					t._updateConnectionState()
				}, r.onerror = function() {
					Object.defineProperty(r, "state", {
						value: "failed",
						writable: 1
					}), t._updateConnectionState()
				}, {
					iceTransport: n,
					dtlsTransport: r
				}
			}, i.prototype._disposeIceAndDtlsTransports = function(e) {
				var t = this.transceivers[e].iceGatherer;
				t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
				var n = this.transceivers[e].iceTransport;
				n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
				var r = this.transceivers[e].dtlsTransport;
				r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
			}, i.prototype._transceive = function(e, n, r) {
				var i = Ut(e.localCapabilities, e.remoteCapabilities);
				n && e.rtpSender && (i.encodings = e.sendEncodingParameters, i.rtcp = {
						cname: jt.localCName,
						compound: e.rtcpParameters.compound
					}, e.recvEncodingParameters.length && (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(i)), r &&
					e.rtpReceiver && i.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters
						.forEach(function(e) {
							delete e.rtx
						}), e.recvEncodingParameters.length ? i.encodings = e.recvEncodingParameters : i.encodings = [{}], i.rtcp = {
							compound: e.rtcpParameters.compound
						}, e.rtcpParameters.cname && (i.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (i.rtcp
							.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(i))
			}, i.prototype.setLocalDescription = function(e) {
				var t, n, r = this;
				if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(Bt("TypeError", 'Unsupported type "' + e.type +
					'"'));
				if (!Ft("setLocalDescription", e.type, r.signalingState) || r._isClosed) return Promise.reject(Bt(
					"InvalidStateError", "Can not set local " + e.type + " in state " + r.signalingState));
				if ("offer" === e.type) t = jt.splitSections(e.sdp), n = t.shift(), t.forEach(function(e, t) {
					var n = jt.parseRtpParameters(e);
					r.transceivers[t].localCapabilities = n
				}), r.transceivers.forEach(function(e, t) {
					r._gather(e.mid, t)
				});
				else if ("answer" === e.type) {
					t = jt.splitSections(r._remoteDescription.sdp), n = t.shift();
					var i = jt.matchPrefix(n, "a=ice-lite").length > 0;
					t.forEach(function(e, t) {
						var o = r.transceivers[t],
							a = o.iceGatherer,
							s = o.iceTransport,
							c = o.dtlsTransport,
							u = o.localCapabilities,
							d = o.remoteCapabilities;
						if (!(jt.isRejected(e) && 0 === jt.matchPrefix(e, "a=bundle-only").length) && !o.rejected) {
							var l = jt.getIceParameters(e, n),
								p = jt.getDtlsParameters(e, n);
							i && (p.role = "server"), r.usingBundle && 0 !== t || (r._gather(o.mid, t), "new" === s.state && s.start(a,
								l, i ? "controlling" : "controlled"), "new" === c.state && c.start(p));
							var f = Ut(u, d);
							r._transceive(o, f.codecs.length > 0, 0)
						}
					})
				}
				return r._localDescription = {
						type: e.type,
						sdp: e.sdp
					}, "offer" === e.type ? r._updateSignalingState("have-local-offer") : r._updateSignalingState("stable"), Promise
					.resolve()
			}, i.prototype.setRemoteDescription = function(i) {
				var o = this;
				if (-1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(Bt("TypeError", 'Unsupported type "' + i.type +
					'"'));
				if (!Ft("setRemoteDescription", i.type, o.signalingState) || o._isClosed) return Promise.reject(Bt(
					"InvalidStateError", "Can not set remote " + i.type + " in state " + o.signalingState));
				var a = {};
				o.remoteStreams.forEach(function(e) {
					a[e.id] = e
				});
				var s = [],
					c = jt.splitSections(i.sdp),
					u = c.shift(),
					d = jt.matchPrefix(u, "a=ice-lite").length > 0,
					l = jt.matchPrefix(u, "a=group:BUNDLE ").length > 0;
				o.usingBundle = l;
				var p = jt.matchPrefix(u, "a=ice-options:")[0];
				return o.canTrickleIceCandidates = p ? p.substr(14).split(" ").indexOf("trickle") >= 0 : 0, c.forEach(function(r,
						c) {
						var p = jt.splitLines(r),
							f = jt.getKind(r),
							h = jt.isRejected(r) && 0 === jt.matchPrefix(r, "a=bundle-only").length,
							m = p[0].substr(2).split(" ")[2],
							v = jt.getDirection(r, u),
							g = jt.parseMsid(r),
							_ = jt.getMid(r) || jt.generateIdentifier();
						if (h || "application" === f && ("DTLS/SCTP" === m || "UDP/DTLS/SCTP" === m)) o.transceivers[c] = {
							mid: _,
							kind: f,
							protocol: m,
							rejected: 1
						};
						else {
							var y, S, b, k, C, w, R, T, E;
							!h && o.transceivers[c] && o.transceivers[c].rejected && (o.transceivers[c] = o._createTransceiver(f, 1));
							var I, P, x = jt.parseRtpParameters(r);
							h || (I = jt.getIceParameters(r, u), (P = jt.getDtlsParameters(r, u)).role = "client"), R = jt.parseRtpEncodingParameters(
								r);
							var A = jt.parseRtcpParameters(r),
								O = jt.matchPrefix(r, "a=end-of-candidates", u).length > 0,
								D = jt.matchPrefix(r, "a=candidate:").map(function(e) {
									return jt.parseCandidate(e)
								}).filter(function(e) {
									return 1 === e.component
								});
							if (("offer" === i.type || "answer" === i.type) && !h && l && c > 0 && o.transceivers[c] && (o._disposeIceAndDtlsTransports(
										c), o.transceivers[c].iceGatherer = o.transceivers[0].iceGatherer, o.transceivers[c].iceTransport = o.transceivers[
										0].iceTransport, o.transceivers[c].dtlsTransport = o.transceivers[0].dtlsTransport, o.transceivers[c].rtpSender &&
									o.transceivers[c].rtpSender.setTransport(o.transceivers[0].dtlsTransport), o.transceivers[c].rtpReceiver &&
									o.transceivers[c].rtpReceiver.setTransport(o.transceivers[0].dtlsTransport)), "offer" !== i.type || h) {
								if ("answer" === i.type && !h) {
									S = (y = o.transceivers[c]).iceGatherer, b = y.iceTransport, k = y.dtlsTransport, C = y.rtpReceiver, w = y.sendEncodingParameters,
										T = y.localCapabilities, o.transceivers[c].recvEncodingParameters = R, o.transceivers[c].remoteCapabilities =
										x, o.transceivers[c].rtcpParameters = A, D.length && "new" === b.state && (!d && !O || l && 0 !== c ? D.forEach(
											function(e) {
												Gt(y.iceTransport, e)
											}) : b.setRemoteCandidates(D)), l && 0 !== c || ("new" === b.state && b.start(S, I, "controlling"), "new" ===
											k.state && k.start(P)), !Ut(y.localCapabilities, y.remoteCapabilities).codecs.filter(function(e) {
											return "rtx" === e.name.toLowerCase()
										}).length && y.sendEncodingParameters[0].rtx && delete y.sendEncodingParameters[0].rtx, o._transceive(y,
											"sendrecv" === v || "recvonly" === v, "sendrecv" === v || "sendonly" === v), !C || "sendrecv" !== v &&
										"sendonly" !== v ? delete y.rtpReceiver : (E = C.track, g ? (a[g.stream] || (a[g.stream] = new e.MediaStream),
											n(E, a[g.stream]), s.push([E, C, a[g.stream]])) : (a.default || (a.default = new e.MediaStream), n(E, a.default),
											s.push([E, C, a.default])))
								}
							} else {
								(y = o.transceivers[c] || o._createTransceiver(f)).mid = _, y.iceGatherer || (y.iceGatherer = o._createIceGatherer(
									c, l)), D.length && "new" === y.iceTransport.state && (!O || l && 0 !== c ? D.forEach(function(e) {
									Gt(y.iceTransport, e)
								}) : y.iceTransport.setRemoteCandidates(D)), T = e.RTCRtpReceiver.getCapabilities(f), t < 15019 && (T.codecs =
									T.codecs.filter(function(e) {
										return "rtx" !== e.name
									})), w = y.sendEncodingParameters || [{
									ssrc: 1001 * (2 * c + 2)
								}];
								var L, N = 0;
								if ("sendrecv" === v || "sendonly" === v) {
									if (N = !y.rtpReceiver, C = y.rtpReceiver || new e.RTCRtpReceiver(y.dtlsTransport, f), N) E = C.track, g &&
										"-" === g.stream || (g ? (a[g.stream] || (a[g.stream] = new e.MediaStream, Object.defineProperty(a[g.stream],
											"id", {
												get: function() {
													return g.stream
												}
											})), Object.defineProperty(E, "id", {
											get: function() {
												return g.track
											}
										}), L = a[g.stream]) : (a.default || (a.default = new e.MediaStream), L = a.default)), L && (n(E, L), y.associatedRemoteMediaStreams
											.push(L)), s.push([E, C, L])
								} else y.rtpReceiver && y.rtpReceiver.track && (y.associatedRemoteMediaStreams.forEach(function(t) {
									var n = t.getTracks().find(function(e) {
										return e.id === y.rtpReceiver.track.id
									});
									n && function(t, n) {
										n.removeTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
											track: t
										}))
									}(n, t)
								}), y.associatedRemoteMediaStreams = []);
								y.localCapabilities = T, y.remoteCapabilities = x, y.rtpReceiver = C, y.rtcpParameters = A, y.sendEncodingParameters =
									w, y.recvEncodingParameters = R, o._transceive(o.transceivers[c], 0, N)
							}
						}
					}), void 0 === o._dtlsRole && (o._dtlsRole = "offer" === i.type ? "active" : "passive"), o._remoteDescription = {
						type: i.type,
						sdp: i.sdp
					}, "offer" === i.type ? o._updateSignalingState("have-remote-offer") : o._updateSignalingState("stable"), Object
					.keys(a).forEach(function(t) {
						var n = a[t];
						if (n.getTracks().length) {
							if (-1 === o.remoteStreams.indexOf(n)) {
								o.remoteStreams.push(n);
								var i = new Event("addstream");
								i.stream = n, e.setTimeout(function() {
									o._dispatchEvent("addstream", i)
								})
							}
							s.forEach(function(e) {
								var t = e[0],
									i = e[1];
								n.id === e[2].id && r(o, t, i, [n])
							})
						}
					}), s.forEach(function(e) {
						e[2] || r(o, e[0], e[1], [])
					}), e.setTimeout(function() {
						o && o.transceivers && o.transceivers.forEach(function(e) {
							e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (
								console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport
								.addRemoteCandidate({}))
						})
					}, 4e3), Promise.resolve()
			}, i.prototype.close = function() {
				this.transceivers.forEach(function(e) {
					e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender
						.stop(), e.rtpReceiver && e.rtpReceiver.stop()
				}), this._isClosed = 1, this._updateSignalingState("closed")
			}, i.prototype._updateSignalingState = function(e) {
				this.signalingState = e;
				var t = new Event("signalingstatechange");
				this._dispatchEvent("signalingstatechange", t)
			}, i.prototype._maybeFireNegotiationNeeded = function() {
				var t = this;
				"stable" === this.signalingState && 1 != this.needNegotiation && (this.needNegotiation = 1, e.setTimeout(function() {
					if (t.needNegotiation) {
						t.needNegotiation = 0;
						var e = new Event("negotiationneeded");
						t._dispatchEvent("negotiationneeded", e)
					}
				}, 0))
			}, i.prototype._updateIceConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					checking: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if (this.transceivers.forEach(function(e) {
						e.iceTransport && !e.rejected && t[e.iceTransport.state]++
					}), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e =
					"disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"),
					e !== this.iceConnectionState) {
					this.iceConnectionState = e;
					var n = new Event("iceconnectionstatechange");
					this._dispatchEvent("iceconnectionstatechange", n)
				}
			}, i.prototype._updateConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					connecting: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if (this.transceivers.forEach(function(e) {
						e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++)
					}), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t
					.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !==
					this.connectionState) {
					this.connectionState = e;
					var n = new Event("connectionstatechange");
					this._dispatchEvent("connectionstatechange", n)
				}
			}, i.prototype.createOffer = function() {
				var n = this;
				if (n._isClosed) return Promise.reject(Bt("InvalidStateError", "Can not call createOffer after close"));
				var r = n.transceivers.filter(function(e) {
						return "audio" === e.kind
					}).length,
					i = n.transceivers.filter(function(e) {
						return "video" === e.kind
					}).length,
					o = arguments[0];
				if (o) {
					if (o.mandatory || o.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
					void 0 !== o.offerToReceiveAudio && (r = 1 == o.offerToReceiveAudio ? 1 : 0 == o.offerToReceiveAudio ? 0 : o.offerToReceiveAudio),
						void 0 !== o.offerToReceiveVideo && (i = 1 == o.offerToReceiveVideo ? 1 : 0 == o.offerToReceiveVideo ? 0 : o.offerToReceiveVideo)
				}
				for (n.transceivers.forEach(function(e) {
						"audio" === e.kind ? --r < 0 && (e.wantReceive = 0) : "video" === e.kind && --i < 0 && (e.wantReceive = 0)
					}); r > 0 || i > 0;) r > 0 && (n._createTransceiver("audio"), r--), i > 0 && (n._createTransceiver("video"), i--);
				var a = jt.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
				n.transceivers.forEach(function(r, i) {
					var o = r.track,
						a = r.kind,
						s = r.mid || jt.generateIdentifier();
					r.mid = s, r.iceGatherer || (r.iceGatherer = n._createIceGatherer(i, n.usingBundle));
					var c = e.RTCRtpSender.getCapabilities(a);
					t < 15019 && (c.codecs = c.codecs.filter(function(e) {
						return "rtx" !== e.name
					})), c.codecs.forEach(function(e) {
						"H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters[
								"level-asymmetry-allowed"] = "1"), r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities
							.codecs.forEach(function(t) {
								e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType =
									t.payloadType)
							})
					}), c.headerExtensions.forEach(function(e) {
						(r.remoteCapabilities && r.remoteCapabilities.headerExtensions || []).forEach(function(t) {
							e.uri === t.uri && (e.id = t.id)
						})
					});
					var u = r.sendEncodingParameters || [{
						ssrc: 1001 * (2 * i + 1)
					}];
					o && t >= 15019 && "video" === a && !u[0].rtx && (u[0].rtx = {
							ssrc: u[0].ssrc + 1
						}), r.wantReceive && (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, a)), r.localCapabilities = c, r.sendEncodingParameters =
						u
				}), "max-compat" !== n._config.bundlePolicy && (a += "a=group:BUNDLE " + n.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n"), a += "a=ice-options:trickle\r\n", n.transceivers.forEach(function(e, t) {
					a += Vt(e, e.localCapabilities, "offer", e.stream, n._dtlsRole), a += "a=rtcp-rsize\r\n", !e.iceGatherer ||
						"new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(
							function(e) {
								e.component = 1, a += "a=" + jt.writeCandidate(e) + "\r\n"
							}), "completed" === e.iceGatherer.state && (a += "a=end-of-candidates\r\n"))
				});
				var s = new e.RTCSessionDescription({
					type: "offer",
					sdp: a
				});
				return Promise.resolve(s)
			}, i.prototype.createAnswer = function() {
				var n = this;
				if (n._isClosed) return Promise.reject(Bt("InvalidStateError", "Can not call createAnswer after close"));
				if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(
					Bt("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
				var r = jt.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
				n.usingBundle && (r += "a=group:BUNDLE " + n.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n"), r += "a=ice-options:trickle\r\n";
				var i = jt.getMediaSections(n._remoteDescription.sdp).length;
				n.transceivers.forEach(function(e, o) {
					if (!(o + 1 > i)) {
						if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? r +=
							"m=application 0 DTLS/SCTP 5000\r\n" : r += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" :
							"audio" === e.kind ? r += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind &&
							(r += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(r +=
								"c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
						var a;
						if (e.stream) "audio" === e.kind ? a = e.stream.getAudioTracks()[0] : "video" === e.kind && (a = e.stream.getVideoTracks()[
							0]), a && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[
							0].rtx = {
							ssrc: e.sendEncodingParameters[0].ssrc + 1
						});
						var s = Ut(e.localCapabilities, e.remoteCapabilities);
						!s.codecs.filter(function(e) {
							return "rtx" === e.name.toLowerCase()
						}).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, r += Vt(e, s,
							"answer", e.stream, n._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (r +=
							"a=rtcp-rsize\r\n")
					}
				});
				var o = new e.RTCSessionDescription({
					type: "answer",
					sdp: r
				});
				return Promise.resolve(o)
			}, i.prototype.addIceCandidate = function(e) {
				var t, n = this;
				return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError(
					"sdpMLineIndex or sdpMid required")) : new Promise(function(r, i) {
					if (!n._remoteDescription) return i(Bt("InvalidStateError",
						"Can not add ICE candidate without a remote description"));
					if (e && "" !== e.candidate) {
						var o = e.sdpMLineIndex;
						if (e.sdpMid)
							for (var a = 0; a < n.transceivers.length; a++)
								if (n.transceivers[a].mid === e.sdpMid) {
									o = a;
									break
								} var s = n.transceivers[o];
						if (!s) return i(Bt("OperationError", "Can not add ICE candidate"));
						if (s.rejected) return r();
						var c = Object.keys(e.candidate).length > 0 ? jt.parseCandidate(e.candidate) : {};
						if ("tcp" === c.protocol && (0 === c.port || 9 === c.port)) return r();
						if (c.component && 1 !== c.component) return r();
						if ((0 === o || o > 0 && s.iceTransport !== n.transceivers[0].iceTransport) && !Gt(s.iceTransport, c)) return i(
							Bt("OperationError", "Can not add ICE candidate"));
						var u = e.candidate.trim();
						0 === u.indexOf("a=") && (u = u.substr(2)), (t = jt.getMediaSections(n._remoteDescription.sdp))[o] += "a=" +
							(c.type ? u : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = jt.getDescription(n._remoteDescription
								.sdp) + t.join("")
					} else
						for (var d = 0; d < n.transceivers.length && (n.transceivers[d].rejected || (n.transceivers[d].iceTransport.addRemoteCandidate({}),
								(t = jt.getMediaSections(n._remoteDescription.sdp))[d] += "a=end-of-candidates\r\n", n._remoteDescription.sdp =
								jt.getDescription(n._remoteDescription.sdp) + t.join(""), !n.usingBundle)); d++);
					r()
				})
			}, i.prototype.getStats = function(t) {
				if (t && t instanceof e.MediaStreamTrack) {
					var n = null;
					if (this.transceivers.forEach(function(e) {
							e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (n =
								e.rtpReceiver)
						}), !n) throw Bt("InvalidAccessError", "Invalid selector.");
					return n.getStats()
				}
				var r = [];
				return this.transceivers.forEach(function(e) {
					["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
						e[t] && r.push(e[t].getStats())
					})
				}), Promise.all(r).then(function(e) {
					var t = new Map;
					return e.forEach(function(e) {
						e.forEach(function(e) {
							t.set(e.id, e)
						})
					}), t
				})
			};
		["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
			var n = e[t];
			if (n && n.prototype && n.prototype.getStats) {
				var r = n.prototype.getStats;
				n.prototype.getStats = function() {
					return r.apply(this).then(function(e) {
						var t = new Map;
						return Object.keys(e).forEach(function(n) {
							var r;
							e[n].type = {
								inboundrtp: "inbound-rtp",
								outboundrtp: "outbound-rtp",
								candidatepair: "candidate-pair",
								localcandidate: "local-candidate",
								remotecandidate: "remote-candidate"
							} [(r = e[n]).type] || r.type, t.set(n, e[n])
						}), t
					})
				}
			}
		});
		var o = ["createOffer", "createAnswer"];
		return o.forEach(function(e) {
			var t = i.prototype[e];
			i.prototype[e] = function() {
				var e = arguments;
				return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
					"function" == typeof e[0] && e[0].apply(null, [t])
				}, function(t) {
					"function" == typeof e[1] && e[1].apply(null, [t])
				}) : t.apply(this, arguments)
			}
		}), (o = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
			var t = i.prototype[e];
			i.prototype[e] = function() {
				var e = arguments;
				return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
					"function" == typeof e[1] && e[1].apply(null)
				}, function(t) {
					"function" == typeof e[2] && e[2].apply(null, [t])
				}) : t.apply(this, arguments)
			}
		}), ["getStats"].forEach(function(e) {
			var t = i.prototype[e];
			i.prototype[e] = function() {
				var e = arguments;
				return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
					"function" == typeof e[1] && e[1].apply(null)
				}) : t.apply(this, arguments)
			}
		}), i
	};

	function zt(e) {
		const t = e && e.navigator,
			n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
		t.mediaDevices.getUserMedia = function(e) {
			return n(e).catch(e => Promise.reject(function(e) {
				return {
					name: {
						PermissionDeniedError: "NotAllowedError"
					} [e.name] || e.name,
					message: e.message,
					constraint: e.constraint,
					toString() {
						return this.name
					}
				}
			}(e)))
		}
	}

	function Wt(e) {
		"getDisplayMedia" in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator
			.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)))
	}

	function Jt(e) {
		const t = bt(e);
		if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
				return e
			}), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
				return e
			}), t.version < 15025)) {
			const t = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
			Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
				set(e) {
					t.set.call(this, e);
					const n = new Event("enabled");
					n.enabled = e, this.dispatchEvent(n)
				}
			})
		}!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
			get() {
				return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" ===
					this.track.kind && (this._dtmf = null)), this._dtmf
			}
		}), e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
		const n = Ht(e, t.version);
		e.RTCPeerConnection = function(e) {
			return e && e.iceServers && (e.iceServers = function(e, t) {
				let n = 0;
				return (e = JSON.parse(JSON.stringify(e))).filter(e => {
					if (e && (e.urls || e.url)) {
						var t = e.urls || e.url;
						e.url && !e.urls && St("RTCIceServer.url", "RTCIceServer.urls");
						const r = "string" == typeof t;
						return r && (t = [t]), t = t.filter(e => {
							if (0 === e.indexOf("stun:")) return 0;
							const t = e.startsWith("turn") && !e.startsWith("turn:[") && e.includes("transport=udp");
							return t && !n ? (n = 1, 1) : t && !n
						}), delete e.url, e.urls = r ? t[0] : t, !!t.length
					}
				})
			}(e.iceServers, t.version), yt("ICE servers after filtering:", e.iceServers)), new n(e)
		}, e.RTCPeerConnection.prototype = n.prototype
	}

	function qt(e) {
		!e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender
			.prototype.setTrack)
	}
	var Kt = Object.freeze({
		shimPeerConnection: Jt,
		shimReplaceTrack: qt,
		shimGetUserMedia: zt,
		shimGetDisplayMedia: Wt
	});

	function $t(e) {
		const t = bt(e),
			n = e && e.navigator,
			r = e && e.MediaStreamTrack;
		if (n.getUserMedia = function(e, t, r) {
				St("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(t, r)
			}, !(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
			const e = function(e, t, n) {
					t in e && !(n in e) && (e[n] = e[t], delete e[t])
				},
				t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
			if (n.mediaDevices.getUserMedia = function(n) {
					return "object" == typeof n && "object" == typeof n.audio && (n = JSON.parse(JSON.stringify(n)), e(n.audio,
						"autoGainControl", "mozAutoGainControl"), e(n.audio, "noiseSuppression", "mozNoiseSuppression")), t(n)
				}, r && r.prototype.getSettings) {
				const t = r.prototype.getSettings;
				r.prototype.getSettings = function() {
					const n = t.apply(this, arguments);
					return e(n, "mozAutoGainControl", "autoGainControl"), e(n, "mozNoiseSuppression", "noiseSuppression"), n
				}
			}
			if (r && r.prototype.applyConstraints) {
				const t = r.prototype.applyConstraints;
				r.prototype.applyConstraints = function(n) {
					return "audio" === this.kind && "object" == typeof n && (n = JSON.parse(JSON.stringify(n)), e(n,
						"autoGainControl", "mozAutoGainControl"), e(n, "noiseSuppression", "mozNoiseSuppression")), t.apply(this, [n])
				}
			}
		}
	}

	function Yt(e) {
		"object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent
			.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
			get() {
				return {
					receiver: this.receiver
				}
			}
		})
	}

	function Qt(e) {
		const t = bt(e);
		if ("object" != typeof e || !e.RTCPeerConnection && !e.mozRTCPeerConnection) return;
		!e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), t.version < 53 &&
			["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
				const n = e.RTCPeerConnection.prototype[t],
					r = {
						[t]() {
							return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]),
								n.apply(this, arguments)
						}
					};
				e.RTCPeerConnection.prototype[t] = r[t]
			});
		const n = e.RTCPeerConnection.prototype.addIceCandidate;
		e.RTCPeerConnection.prototype.addIceCandidate = function() {
			return arguments[0] ? t.version < 68 && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(
				this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
		};
		const r = {
				inboundrtp: "inbound-rtp",
				outboundrtp: "outbound-rtp",
				candidatepair: "candidate-pair",
				localcandidate: "local-candidate",
				remotecandidate: "remote-candidate"
			},
			i = e.RTCPeerConnection.prototype.getStats;
		e.RTCPeerConnection.prototype.getStats = function() {
			const [e, n, o] = arguments;
			return i.apply(this, [e || null]).then(e => {
				if (t.version < 53 && !n) try {
					e.forEach(e => {
						e.type = r[e.type] || e.type
					})
				} catch (i) {
					if ("TypeError" !== i.name) throw i;
					e.forEach((t, n) => {
						e.set(n, Object.assign({}, t, {
							type: r[t.type] || t.type
						}))
					})
				}
				return e
			}).then(n, o)
		}
	}

	function Xt(e) {
		if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
		if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
		const t = e.RTCPeerConnection.prototype.getSenders;
		t && (e.RTCPeerConnection.prototype.getSenders = function() {
			const e = t.apply(this, []);
			return e.forEach(e => e._pc = this), e
		});
		const n = e.RTCPeerConnection.prototype.addTrack;
		n && (e.RTCPeerConnection.prototype.addTrack = function() {
			const e = n.apply(this, arguments);
			return e._pc = this, e
		}), e.RTCRtpSender.prototype.getStats = function() {
			return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map)
		}
	}

	function Zt(e) {
		if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
		if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
		const t = e.RTCPeerConnection.prototype.getReceivers;
		t && (e.RTCPeerConnection.prototype.getReceivers = function() {
			const e = t.apply(this, []);
			return e.forEach(e => e._pc = this), e
		}), vt(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function() {
			return this._pc.getStats(this.track)
		}
	}

	function en(e) {
		!e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream =
			function(e) {
				St("removeStream", "removeTrack"), this.getSenders().forEach(t => {
					t.track && e.getTracks().includes(t.track) && this.removeTrack(t)
				})
			})
	}

	function tn(e) {
		e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
	}
	var nn = Object.freeze({
		shimOnTrack: Yt,
		shimPeerConnection: Qt,
		shimSenderGetStats: Xt,
		shimReceiverGetStats: Zt,
		shimRemoveStream: en,
		shimRTCDataChannel: tn,
		shimGetUserMedia: $t,
		shimGetDisplayMedia: function(e, t) {
			e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator
				.mediaDevices.getDisplayMedia = function(n) {
					if (!n || !n.video) {
						const e = new DOMException("getDisplayMedia without video constraints is undefined");
						return e.name = "NotFoundError", e.code = 8, Promise.reject(e)
					}
					return 1 == n.video ? n.video = {
						mediaSource: t
					} : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n)
				})
		}
	});

	function rn(e) {
		if ("object" == typeof e && e.RTCPeerConnection) {
			if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
					return this._localStreams || (this._localStreams = []), this._localStreams
				}), !("addStream" in e.RTCPeerConnection.prototype)) {
				const t = e.RTCPeerConnection.prototype.addTrack;
				e.RTCPeerConnection.prototype.addStream = function(e) {
					this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e
						.getAudioTracks().forEach(n => t.call(this, n, e)), e.getVideoTracks().forEach(n => t.call(this, n, e))
				}, e.RTCPeerConnection.prototype.addTrack = function(e) {
					const n = arguments[1];
					return n && (this._localStreams ? this._localStreams.includes(n) || this._localStreams.push(n) : this._localStreams = [
						n
					]), t.apply(this, arguments)
				}
			}
			"removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
				this._localStreams || (this._localStreams = []);
				const t = this._localStreams.indexOf(e);
				if (-1 === t) return;
				this._localStreams.splice(t, 1);
				const n = e.getTracks();
				this.getSenders().forEach(e => {
					n.includes(e.track) && this.removeTrack(e)
				})
			})
		}
	}

	function on(e) {
		if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection
				.prototype.getRemoteStreams = function() {
					return this._remoteStreams ? this._remoteStreams : []
				}), !("onaddstream" in e.RTCPeerConnection.prototype))) {
			Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
				get() {
					return this._onaddstream
				},
				set(e) {
					this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener(
						"track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener(
						"track", this._onaddstreampoly = e => {
							e.streams.forEach(e => {
								if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(e)) return;
								this._remoteStreams.push(e);
								const t = new Event("addstream");
								t.stream = e, this.dispatchEvent(t)
							})
						})
				}
			});
			const t = e.RTCPeerConnection.prototype.setRemoteDescription;
			e.RTCPeerConnection.prototype.setRemoteDescription = function() {
				const e = this;
				return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t) {
					t.streams.forEach(t => {
						if (e._remoteStreams || (e._remoteStreams = []), e._remoteStreams.indexOf(t) >= 0) return;
						e._remoteStreams.push(t);
						const n = new Event("addstream");
						n.stream = t, e.dispatchEvent(n)
					})
				}), t.apply(e, arguments)
			}
		}
	}

	function an(e) {
		if ("object" != typeof e || !e.RTCPeerConnection) return;
		const t = e.RTCPeerConnection.prototype,
			n = t.createOffer,
			r = t.createAnswer,
			i = t.setLocalDescription,
			o = t.setRemoteDescription,
			a = t.addIceCandidate;
		t.createOffer = function(e, t) {
			const r = arguments.length >= 2 ? arguments[2] : arguments[0],
				i = n.apply(this, [r]);
			return t ? (i.then(e, t), Promise.resolve()) : i
		}, t.createAnswer = function(e, t) {
			const n = arguments.length >= 2 ? arguments[2] : arguments[0],
				i = r.apply(this, [n]);
			return t ? (i.then(e, t), Promise.resolve()) : i
		};
		let s = function(e, t, n) {
			const r = i.apply(this, [e]);
			return n ? (r.then(t, n), Promise.resolve()) : r
		};
		t.setLocalDescription = s, s = function(e, t, n) {
			const r = o.apply(this, [e]);
			return n ? (r.then(t, n), Promise.resolve()) : r
		}, t.setRemoteDescription = s, s = function(e, t, n) {
			const r = a.apply(this, [e]);
			return n ? (r.then(t, n), Promise.resolve()) : r
		}, t.addIceCandidate = s
	}

	function sn(e) {
		const t = e && e.navigator;
		if (t.mediaDevices && t.mediaDevices.getUserMedia) {
			const e = t.mediaDevices,
				n = e.getUserMedia.bind(e);
			t.mediaDevices.getUserMedia = e => n(cn(e))
		}!t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
			t.mediaDevices.getUserMedia(e).then(n, r)
		}.bind(t))
	}

	function cn(e) {
		return e && void 0 !== e.video ? Object.assign({}, e, {
			video: Ct(e.video)
		}) : e
	}

	function un(e) {
		const t = e.RTCPeerConnection;
		e.RTCPeerConnection = function(e, n) {
			if (e && e.iceServers) {
				const t = [];
				for (let n = 0; n < e.iceServers.length; n++) {
					let r = e.iceServers[n];
					!r.hasOwnProperty("urls") && r.hasOwnProperty("url") ? (St("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(
						JSON.stringify(r))).urls = r.url, delete r.url, t.push(r)) : t.push(e.iceServers[n])
				}
				e.iceServers = t
			}
			return new t(e, n)
		}, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(
			e.RTCPeerConnection, "generateCertificate", {
				get: () => t.generateCertificate
			})
	}

	function dn(e) {
		"object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent
			.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
			get() {
				return {
					receiver: this.receiver
				}
			}
		})
	}

	function ln(e) {
		const t = e.RTCPeerConnection.prototype.createOffer;
		e.RTCPeerConnection.prototype.createOffer = function(e) {
			if (e) {
				void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
				const t = this.getTransceivers().find(e => "audio" === e.receiver.track.kind);
				0 == e.offerToReceiveAudio && t ? "sendrecv" === t.direction ? t.setDirection ? t.setDirection("sendonly") : t.direction =
					"sendonly" : "recvonly" === t.direction && (t.setDirection ? t.setDirection("inactive") : t.direction =
						"inactive") : 1 != e.offerToReceiveAudio || t || this.addTransceiver("audio"), void 0 !== e.offerToReceiveVideo &&
					(e.offerToReceiveVideo = !!e.offerToReceiveVideo);
				const n = this.getTransceivers().find(e => "video" === e.receiver.track.kind);
				0 == e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction =
					"sendonly" : "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction =
						"inactive") : 1 != e.offerToReceiveVideo || n || this.addTransceiver("video")
			}
			return t.apply(this, arguments)
		}
	}
	var pn = Object.freeze({
		shimLocalStreamsAPI: rn,
		shimRemoteStreamsAPI: on,
		shimCallbacksAPI: an,
		shimGetUserMedia: sn,
		shimConstraints: cn,
		shimRTCIceServerUrls: un,
		shimTrackEventTransceiver: dn,
		shimCreateOfferLegacy: ln
	});

	function fn(e) {
		if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return;
		const t = e.RTCIceCandidate;
		e.RTCIceCandidate = function(e) {
			if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e)))
					.candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
				const n = new t(e),
					r = jt.parseCandidate(e.candidate),
					i = Object.assign(n, r);
				return i.toJSON = function() {
					return {
						candidate: i.candidate,
						sdpMid: i.sdpMid,
						sdpMLineIndex: i.sdpMLineIndex,
						usernameFragment: i.usernameFragment
					}
				}, i
			}
			return new t(e)
		}, e.RTCIceCandidate.prototype = t.prototype, vt(e, "icecandidate", t => (t.candidate && Object.defineProperty(t,
			"candidate", {
				value: new e.RTCIceCandidate(t.candidate),
				writable: "false"
			}), t))
	}

	function hn(e) {
		if (!e.RTCPeerConnection) return;
		const t = bt(e);
		"sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
			get() {
				return void 0 === this._sctp ? null : this._sctp
			}
		});
		const n = function(e) {
				if (!e || !e.sdp) return 0;
				const t = jt.splitSections(e.sdp);
				return t.shift(), t.some(e => {
					const t = jt.parseMLine(e);
					return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
				})
			},
			r = function(e) {
				const t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
				if (null === t || t.length < 2) return -1;
				const n = parseInt(t[1], 10);
				return n != n ? -1 : n
			},
			i = function(e) {
				let n = 65536;
				return "firefox" === t.browser && (n = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ?
					65535 : 65536 : 2147483637), n
			},
			o = function(e, n) {
				let r = 65536;
				"firefox" === t.browser && 57 === t.version && (r = 65535);
				const i = jt.matchPrefix(e.sdp, "a=max-message-size:");
				return i.length > 0 ? r = parseInt(i[0].substr(19), 10) : "firefox" === t.browser && -1 !== n && (r = 2147483637),
					r
			},
			a = e.RTCPeerConnection.prototype.setRemoteDescription;
		e.RTCPeerConnection.prototype.setRemoteDescription = function() {
			if (this._sctp = null, "chrome" === t.browser && t.version >= 76) {
				const {
					sdpSemantics: e
				} = this.getConfiguration();
				"plan-b" === e && Object.defineProperty(this, "sctp", {
					get() {
						return void 0 === this._sctp ? null : this._sctp
					},
					enumerable: 1,
					configurable: 1
				})
			}
			if (n(arguments[0])) {
				const e = r(arguments[0]),
					t = i(e),
					n = o(arguments[0], e);
				let a;
				a = 0 === t && 0 === n ? Number.POSITIVE_INFINITY : 0 === t || 0 === n ? Math.max(t, n) : Math.min(t, n);
				const s = {};
				Object.defineProperty(s, "maxMessageSize", {
					get: () => a
				}), this._sctp = s
			}
			return a.apply(this, arguments)
		}
	}

	function mn(e) {
		if (!(e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype)) return;

		function t(e, t) {
			const n = e.send;
			e.send = function() {
				const r = arguments[0],
					i = r.length || r.size || r.byteLength;
				if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw new TypeError(
					"Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
				return n.apply(e, arguments)
			}
		}
		const n = e.RTCPeerConnection.prototype.createDataChannel;
		e.RTCPeerConnection.prototype.createDataChannel = function() {
			const e = n.apply(this, arguments);
			return t(e, this), e
		}, vt(e, "datachannel", e => (t(e.channel, e.target), e))
	}

	function vn(e) {
		if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return;
		const t = e.RTCPeerConnection.prototype;
		Object.defineProperty(t, "connectionState", {
			get() {
				return {
					completed: "connected",
					checking: "connecting"
				} [this.iceConnectionState] || this.iceConnectionState
			},
			enumerable: 1,
			configurable: 1
		}), Object.defineProperty(t, "onconnectionstatechange", {
			get() {
				return this._onconnectionstatechange || null
			},
			set(e) {
				this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange),
					delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange =
					e)
			},
			enumerable: 1,
			configurable: 1
		}), ["setLocalDescription", "setRemoteDescription"].forEach(e => {
			const n = t[e];
			t[e] = function() {
				return this._connectionstatechangepoly || (this._connectionstatechangepoly = e => {
					const t = e.target;
					if (t._lastConnectionState !== t.connectionState) {
						t._lastConnectionState = t.connectionState;
						const n = new Event("connectionstatechange", e);
						t.dispatchEvent(n)
					}
					return e
				}, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this,
					arguments)
			}
		})
	}

	function gn(e) {
		if (!e.RTCPeerConnection) return;
		const t = bt(e);
		if ("chrome" === t.browser && t.version >= 71) return;
		const n = e.RTCPeerConnection.prototype.setRemoteDescription;
		e.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
			return e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(e =>
				"a=extmap-allow-mixed" !== e.trim()).join("\n")), n.apply(this, arguments)
		}
	}
	var _n = Object.freeze({
		shimRTCIceCandidate: fn,
		shimMaxMessageSize: hn,
		shimSendThrowTypeError: mn,
		shimConnectionState: vn,
		removeAllowExtmapMixed: gn
	});
	const yn = function({
		window: e
	} = {}, t = {
		shimChrome: 1,
		shimFirefox: 1,
		shimEdge: 1,
		shimSafari: 1
	}) {
		const n = yt,
			r = bt(e),
			i = {
				browserDetails: r,
				commonShim: _n,
				extractVersion: mt,
				disableLog: gt,
				disableWarnings: _t
			};
		switch (r.browser) {
			case "chrome":
				if (!Mt || !Lt || !t.shimChrome) return n("Chrome shim is not included in this adapter release."), i;
				n("adapter.js shimming chrome."), i.browserShim = Mt, Tt(e), Et(e), Lt(e), It(e), Dt(e), Pt(e), xt(e), At(e), Nt(
					e), fn(e), vn(e), hn(e), mn(e), gn(e);
				break;
			case "firefox":
				if (!nn || !Qt || !t.shimFirefox) return n("Firefox shim is not included in this adapter release."), i;
				n("adapter.js shimming firefox."), i.browserShim = nn, $t(e), Qt(e), Yt(e), en(e), Xt(e), Zt(e), tn(e), fn(e), vn(
					e), hn(e), mn(e);
				break;
			case "edge":
				if (!Kt || !Jt || !t.shimEdge) return n("MS edge shim is not included in this adapter release."), i;
				n("adapter.js shimming edge."), i.browserShim = Kt, zt(e), Wt(e), Jt(e), qt(e), hn(e), mn(e);
				break;
			case "safari":
				if (!pn || !t.shimSafari) return n("Safari shim is not included in this adapter release."), i;
				n("adapter.js shimming safari."), i.browserShim = pn, un(e), ln(e), an(e), rn(e), on(e), dn(e), sn(e), fn(e), hn(
					e), mn(e), gn(e);
				break;
			default:
				n("Unsupported browser!")
		}
		return i
	}({
		window: window
	});
	var Sn = function(e, t) {
			var n = [][e];
			return !n || !c(function() {
				n.call(null, t || function() {
					throw 1
				}, 1)
			})
		},
		bn = le.indexOf,
		kn = [].indexOf,
		Cn = !!kn && 1 / [1].indexOf(1, -0) < 0,
		wn = Sn("indexOf");
	Ie({
		target: "Array",
		proto: 1,
		forced: Cn || wn
	}, {
		indexOf: function(e) {
			return Cn ? kn.apply(this, arguments) || 0 : bn(this, e, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	var Rn = Ne("species"),
		Tn = [].slice,
		En = Math.max;
	Ie({
		target: "Array",
		proto: 1,
		forced: !Ue("slice")
	}, {
		slice: function(e, t) {
			var n, r, i, o = y(this),
				a = ae(o.length),
				s = ue(e, a),
				c = ue(void 0 === t ? a : t, a);
			if (Pe(o) && ("function" != typeof(n = o.constructor) || n !== Array && !Pe(n.prototype) ? S(n) && null === (n =
					n[Rn]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return Tn.call(o, s, c);
			for (r = new(void 0 === n ? Array : n)(En(c - s, 0)), i = 0; s < c; s++, i++) s in o && Ae(r, i, o[s]);
			return r.length = i, r
		}
	});
	var In = [].slice,
		Pn = {},
		xn = function(e, t, n) {
			if (!(t in Pn)) {
				for (var r = [], i = 0; i < t; i++) r[i] = "a[" + i + "]";
				Pn[t] = Function("C,a", "return new C(" + r.join(",") + ")")
			}
			return Pn[t](e, n)
		},
		An = Function.bind || function(e) {
			var t = ze(this),
				n = In.call(arguments, 1),
				r = function() {
					var i = n.concat(In.call(arguments));
					return this instanceof r ? xn(t, i.length, i) : t.apply(e, i)
				};
			return S(t.prototype) && (r.prototype = t.prototype), r
		};
	Ie({
		target: "Function",
		proto: 1
	}, {
		bind: An
	});
	var On = O.f,
		Dn = Function.prototype,
		Ln = Dn.toString,
		Nn = /^\s*function ([^ (]*)/;
	!u || "name" in Dn || On(Dn, "name", {
		configurable: 1,
		get: function() {
			try {
				return Ln.call(this).match(Nn)[1]
			} catch (e) {
				return ""
			}
		}
	});
	var Mn = function() {
			var e = x(this),
				t = "";
			return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode &&
				(t += "u"), e.sticky && (t += "y"), t
		},
		jn = RegExp.prototype.exec,
		Vn = String.prototype.replace,
		Un = jn,
		Fn = function() {
			var e = /a/,
				t = /b*/g;
			return jn.call(e, "a"), jn.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
		}(),
		Gn = void 0 !== /()??/.exec("")[1];
	(Fn || Gn) && (Un = function(e) {
		var t, n, r, i, o = this;
		return Gn && (n = new RegExp("^" + o.source + "$(?!\\s)", Mn.call(o))), Fn && (t = o.lastIndex), r = jn.call(o, e),
			Fn && r && (o.lastIndex = o.global ? r.index + r[0].length : t), Gn && r && r.length > 1 && Vn.call(r[0], n,
				function() {
					for (i = 1; i < arguments.length - 2; i++) void 0 === arguments[i] && (r[i] = void 0)
				}), r
	});
	var Bn = Un;
	Ie({
		target: "RegExp",
		proto: 1,
		forced: /./.exec !== Bn
	}, {
		exec: Bn
	});
	var Hn = function() {
		var e = function() {},
			t = "undefined",
			n = ["trace", "debug", "info", "warn", "error"];

		function r(e, t) {
			var n = e[t];
			if ("function" == typeof n.bind) return n.bind(e);
			try {
				return Function.prototype.bind.call(n, e)
			} catch (r) {
				return function() {
					return Function.prototype.apply.apply(n, [e, arguments])
				}
			}
		}

		function i(t, r) {
			for (var i = 0; i < n.length; i++) {
				var o = n[i];
				this[o] = i < t ? e : this.methodFactory(o, t, r)
			}
			this.log = this.debug
		}

		function o(e, n, r) {
			return function() {
				("undefined" == typeof console ? "undefined" : Qe(console)) !== t && (i.call(this, n, r), this[e].apply(this,
					arguments))
			}
		}

		function a(n, i, a) {
			return function(n) {
				return "debug" === n && (n = "log"), ("undefined" == typeof console ? "undefined" : Qe(console)) === t ? 0 :
					void 0 !== console[n] ? r(console, n) : void 0 !== console.log ? r(console, "log") : e
			}(n) || o.apply(this, arguments)
		}

		function s(e, r, o) {
			var s, c = this,
				u = "loglevel";

			function d() {
				var e;
				if (("undefined" == typeof window ? "undefined" : Qe(window)) !== t) {
					try {
						e = window.localStorage[u]
					} catch (i) {}
					if (Qe(e) === t) try {
						var n = window.document.cookie,
							r = n.indexOf(encodeURIComponent(u) + "="); - 1 !== r && (e = /^([^;]+)/.exec(n.slice(r))[1])
					} catch (i) {}
					return void 0 === c.levels[e] && (e = void 0), e
				}
			}
			e && (u += ":" + e), c.name = e, c.levels = {
				TRACE: 0,
				DEBUG: 1,
				INFO: 2,
				WARN: 3,
				ERROR: 4,
				SILENT: 5
			}, c.methodFactory = o || a, c.getLevel = function() {
				return s
			}, c.setLevel = function(r, o) {
				if ("string" == typeof r && void 0 !== c.levels[r.toUpperCase()] && (r = c.levels[r.toUpperCase()]), !("number" ==
						typeof r && r >= 0 && r <= c.levels.SILENT)) throw "log.setLevel() called with invalid level: " + r;
				if (s = r, 0 != o && function(e) {
						var r = (n[e] || "silent").toUpperCase();
						if (("undefined" == typeof window ? "undefined" : Qe(window)) !== t) {
							try {
								return void(window.localStorage[u] = r)
							} catch (i) {}
							try {
								window.document.cookie = encodeURIComponent(u) + "=" + r + ";"
							} catch (i) {}
						}
					}(r), i.call(c, r, e), ("undefined" == typeof console ? "undefined" : Qe(console)) === t && r < c.levels.SILENT)
					return "No console available for logging"
			}, c.setDefaultLevel = function(e) {
				d() || c.setLevel(e, 0)
			}, c.enableAll = function(e) {
				c.setLevel(c.levels.TRACE, e)
			}, c.disableAll = function(e) {
				c.setLevel(c.levels.SILENT, e)
			};
			var l = d();
			null == l && (l = null == r ? "WARN" : r), c.setLevel(l, 0)
		}
		var c = new s,
			u = {};
		c.getLogger = function(e) {
			if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
			var t = u[e];
			return t || (t = u[e] = new s(e, c.getLevel(), c.methodFactory)), t
		};
		var d = ("undefined" == typeof window ? "undefined" : Qe(window)) !== t ? window.log : void 0;
		return c.noConflict = function() {
			return ("undefined" == typeof window ? "undefined" : Qe(window)) !== t && window.log === c && (window.log = d), c
		}, c.getLoggers = function() {
			return u
		}, c
	}();
	Ie({
		target: "Array",
		stat: 1
	}, {
		isArray: Pe
	});
	var zn = [].join,
		Wn = g != Object,
		Jn = Sn("join", ",");
	Ie({
		target: "Array",
		proto: 1,
		forced: Wn || Jn
	}, {
		join: function(e) {
			return zn.call(y(this), void 0 === e ? "," : e)
		}
	});
	var qn = Ke.some;
	Ie({
		target: "Array",
		proto: 1,
		forced: Sn("some")
	}, {
		some: function(e) {
			return qn(this, e, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	var Kn = Math.max,
		$n = Math.min;
	Ie({
		target: "Array",
		proto: 1,
		forced: !Ue("splice")
	}, {
		splice: function(e, t) {
			var n, r, i, o, a, s, c = xe(this),
				u = ae(c.length),
				d = ue(e, u),
				l = arguments.length;
			if (0 === l ? n = r = 0 : 1 === l ? (n = 0, r = u - d) : (n = l - 2, r = $n(Kn(ie(t), 0), u - d)), u + n - r >
				9007199254740991) throw TypeError("Maximum allowed length exceeded");
			for (i = je(c, r), o = 0; o < r; o++)(a = d + o) in c && Ae(i, o, c[a]);
			if (i.length = r, n < r) {
				for (o = d; o < u - r; o++) s = o + n, (a = o + r) in c ? c[s] = c[a] : delete c[s];
				for (o = u; o > u - r + n; o--) delete c[o - 1]
			} else if (n > r)
				for (o = u - r; o > d; o--) s = o + n - 1, (a = o + r - 1) in c ? c[s] = c[a] : delete c[s];
			for (o = 0; o < n; o++) c[o + d] = arguments[o + 2];
			return c.length = u - r + n, i
		}
	});
	var Yn = "".repeat || function(e) {
			var t = String(_(this)),
				n = "",
				r = ie(e);
			if (r < 0 || Infinity == r) throw RangeError("Wrong number of repetitions");
			for (; r > 0;
				(r >>>= 1) && (t += t)) 1 & r && (n += t);
			return n
		},
		Qn = Math.ceil,
		Xn = function(e) {
			return function(t, n, r) {
				var i, o, a = String(_(t)),
					s = a.length,
					c = void 0 === r ? " " : String(r),
					u = ae(n);
				return u <= s || "" == c ? a : (i = u - s, (o = Yn.call(c, Qn(i / c.length))).length > i && (o = o.slice(0, i)),
					e ? a + o : o + a)
			}
		},
		Zn = {
			start: Xn(0),
			end: Xn(1)
		}.start,
		er = Math.abs,
		tr = Date.prototype,
		nr = tr.getTime,
		rr = tr.toISOString,
		ir = c(function() {
			return "0385-07-25T07:06:39.999Z" != rr.call(new Date(-5e13 - 1))
		}) || !c(function() {
			rr.call(new Date(NaN))
		}) ? function() {
			if (!isFinite(nr.call(this))) throw RangeError("Invalid time value");
			var e = this.getUTCFullYear(),
				t = this.getUTCMilliseconds(),
				n = e < 0 ? "-" : e > 9999 ? "+" : "";
			return n + Zn(er(e), n ? 6 : 4, 0) + "-" + Zn(this.getUTCMonth() + 1, 2, 0) + "-" + Zn(this.getUTCDate(), 2, 0) +
				"T" + Zn(this.getUTCHours(), 2, 0) + ":" + Zn(this.getUTCMinutes(), 2, 0) + ":" + Zn(this.getUTCSeconds(), 2, 0) +
				"." + Zn(t, 3, 0) + "Z"
		} : rr;
	Ie({
		target: "Date",
		proto: 1,
		forced: Date.prototype.toISOString !== ir
	}, {
		toISOString: ir
	});
	var or = Date.prototype,
		ar = or.toString,
		sr = or.getTime;
	new Date(NaN) + "" != "Invalid Date" && X(or, "toString", function() {
		var e = sr.call(this);
		return e == e ? ar.call(this) : "Invalid Date"
	});
	var cr = P.f,
		ur = c(function() {
			cr(1)
		});
	Ie({
		target: "Object",
		stat: 1,
		forced: !u || ur,
		sham: !u
	}, {
		getOwnPropertyDescriptor: function(e, t) {
			return cr(y(e), t)
		}
	});
	var dr = !c(function() {
			function e() {}
			return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
		}),
		lr = H("IE_PROTO"),
		pr = Object.prototype,
		fr = dr ? Object.getPrototypeOf : function(e) {
			return e = xe(e), C(e, lr) ? e[lr] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor
				.prototype : e instanceof Object ? pr : null
		},
		hr = c(function() {
			fr(1)
		});
	Ie({
		target: "Object",
		stat: 1,
		forced: hr,
		sham: !dr
	}, {
		getPrototypeOf: function(e) {
			return fr(xe(e))
		}
	});
	var mr = Ne("toStringTag"),
		vr = "Arguments" == m(function() {
			return arguments
		}()),
		gr = function(e) {
			var t, n, r;
			return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
				try {
					return e[t]
				} catch (n) {}
			}(t = Object(e), mr)) ? n : vr ? m(t) : "Object" == (r = m(t)) && "function" == typeof t.callee ? "Arguments" : r
		},
		_r = {};
	_r[Ne("toStringTag")] = "z";
	var yr = "[object z]" !== String(_r) ? function() {
			return "[object " + gr(this) + "]"
		} : _r.toString,
		Sr = Object.prototype;
	yr !== Sr.toString && X(Sr, "toString", yr, {
		unsafe: 1
	});
	var br = RegExp.prototype,
		kr = br.toString,
		Cr = c(function() {
			return "/a/b" != kr.call({
				source: "a",
				flags: "b"
			})
		}),
		wr = "toString" != kr.name;
	(Cr || wr) && X(RegExp.prototype, "toString", function() {
		var e = x(this),
			t = String(e.source),
			n = e.flags;
		return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in br) ? Mn.call(e) : n)
	}, {
		unsafe: 1
	});
	var Rr = Ne("species"),
		Tr = !c(function() {
			var e = /./;
			return e.exec = function() {
				var e = [];
				return e.groups = {
					a: "7"
				}, e
			}, "7" !== "".replace(e, "$<a>")
		}),
		Er = !c(function() {
			var e = /(?:)/,
				t = e.exec;
			e.exec = function() {
				return t.apply(this, arguments)
			};
			var n = "ab".split(e);
			return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
		}),
		Ir = function(e, t, n, r) {
			var i = Ne(e),
				o = !c(function() {
					var t = {};
					return t[i] = function() {
						return 7
					}, 7 != "" [e](t)
				}),
				a = o && !c(function() {
					var t = 0,
						n = /a/;
					return n.exec = function() {
						return t = 1, null
					}, "split" === e && (n.constructor = {}, n.constructor[Rr] = function() {
						return n
					}), n[i](""), !t
				});
			if (!o || !a || "replace" === e && !Tr || "split" === e && !Er) {
				var s = /./ [i],
					u = n(i, "" [e], function(e, t, n, r, i) {
						return t.exec === Bn ? o && !i ? {
							done: 1,
							value: s.call(t, n, r)
						} : {
							done: 1,
							value: e.call(n, t, r)
						} : {
							done: 0
						}
					}),
					d = u[0],
					l = u[1];
				X(String.prototype, e, d), X(RegExp.prototype, i, 2 == t ? function(e, t) {
					return l.call(e, this, t)
				} : function(e) {
					return l.call(e, this)
				}), r && D(RegExp.prototype[i], "sham", 1)
			}
		},
		Pr = function(e) {
			return function(t, n) {
				var r, i, o = String(_(t)),
					a = ie(n),
					s = o.length;
				return a < 0 || a >= s ? e ? "" : void 0 : (r = o.charCodeAt(a)) < 55296 || r > 56319 || a + 1 === s || (i = o.charCodeAt(
						a + 1)) < 56320 || i > 57343 ? e ? o.charAt(a) : r : e ? o.slice(a, a + 2) : i - 56320 + (r - 55296 << 10) +
					65536
			}
		},
		xr = {
			codeAt: Pr(0),
			charAt: Pr(1)
		},
		Ar = xr.charAt,
		Or = function(e, t, n) {
			return t + (n ? Ar(e, t).length : 1)
		},
		Dr = function(e, t) {
			var n = e.exec;
			if ("function" == typeof n) {
				var r = n.call(e, t);
				if ("object" != typeof r) throw TypeError("RegExp exec method returned something other than an Object or null");
				return r
			}
			if ("RegExp" !== m(e)) throw TypeError("RegExp#exec called on incompatible receiver");
			return Bn.call(e, t)
		},
		Lr = Math.max,
		Nr = Math.min,
		Mr = Math.floor,
		jr = /\$([$&'`]|\d\d?|<[^>]*>)/g,
		Vr = /\$([$&'`]|\d\d?)/g;
	Ir("replace", 2, function(e, t, n) {
		return [function(n, r) {
			var i = _(this),
				o = null == n ? void 0 : n[e];
			return void 0 !== o ? o.call(n, i, r) : t.call(String(i), n, r)
		}, function(e, i) {
			var o = n(t, e, this, i);
			if (o.done) return o.value;
			var a = x(e),
				s = String(this),
				c = "function" == typeof i;
			c || (i = String(i));
			var u = a.global;
			if (u) {
				var d = a.unicode;
				a.lastIndex = 0
			}
			for (var l = [];;) {
				var p = Dr(a, s);
				if (null === p) break;
				if (l.push(p), !u) break;
				"" === String(p[0]) && (a.lastIndex = Or(s, ae(a.lastIndex), d))
			}
			for (var f, h = "", m = 0, v = 0; v < l.length; v++) {
				p = l[v];
				for (var g = String(p[0]), _ = Lr(Nr(ie(p.index), s.length), 0), y = [], S = 1; S < p.length; S++) y.push(void 0 ===
					(f = p[S]) ? f : String(f));
				var b = p.groups;
				if (c) {
					var k = [g].concat(y, _, s);
					void 0 !== b && k.push(b);
					var C = String(i.apply(void 0, k))
				} else C = r(g, s, _, y, b, i);
				_ >= m && (h += s.slice(m, _) + C, m = _ + g.length)
			}
			return h + s.slice(m)
		}];

		function r(e, n, r, i, o, a) {
			var s = r + e.length,
				c = i.length,
				u = Vr;
			return void 0 !== o && (o = xe(o), u = jr), t.call(a, u, function(t, a) {
				var u;
				switch (a.charAt(0)) {
					case "$":
						return "$";
					case "&":
						return e;
					case "`":
						return n.slice(0, r);
					case "'":
						return n.slice(s);
					case "<":
						u = o[a.slice(1, -1)];
						break;
					default:
						var d = +a;
						if (0 === d) return t;
						if (d > c) {
							var l = Mr(d / 10);
							return 0 === l ? t : l <= c ? void 0 === i[l - 1] ? a.charAt(1) : i[l - 1] + a.charAt(1) : t
						}
						u = i[d - 1]
				}
				return void 0 === u ? "" : u
			})
		}
	});
	var Ur = Ne("match"),
		Fr = function(e) {
			var t;
			return S(e) && (void 0 !== (t = e[Ur]) ? !!t : "RegExp" == m(e))
		},
		Gr = Ne("species"),
		Br = function(e, t) {
			var n, r = x(e).constructor;
			return void 0 === r || null == (n = x(r)[Gr]) ? t : ze(n)
		},
		Hr = [].push,
		zr = Math.min,
		Wr = !c(function() {
			return !RegExp(4294967295, "y")
		});
	Ir("split", 2, function(e, t, n) {
		var r;
		return r = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length ||
			4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e, n) {
				var r = String(_(this)),
					i = void 0 === n ? 4294967295 : n >>> 0;
				if (0 === i) return [];
				if (void 0 === e) return [r];
				if (!Fr(e)) return t.call(r, e, i);
				for (var o, a, s, c = [], u = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e
						.sticky ? "y" : ""), d = 0, l = new RegExp(e.source, u + "g");
					(o = Bn.call(l, r)) && !((a = l.lastIndex) > d && (c.push(r.slice(d, o.index)), o.length > 1 && o.index < r.length &&
						Hr.apply(c, o.slice(1)), s = o[0].length, d = a, c.length >= i));) l.lastIndex === o.index && l.lastIndex++;
				return d === r.length ? !s && l.test("") || c.push("") : c.push(r.slice(d)), c.length > i ? c.slice(0, i) : c
			} : "0".split(void 0, 0).length ? function(e, n) {
				return void 0 === e && 0 === n ? [] : t.call(this, e, n)
			} : t, [function(t, n) {
				var i = _(this),
					o = null == t ? void 0 : t[e];
				return void 0 !== o ? o.call(t, i, n) : r.call(String(i), t, n)
			}, function(e, i) {
				var o = n(r, e, this, i, r !== t);
				if (o.done) return o.value;
				var a = x(e),
					s = String(this),
					c = Br(a, RegExp),
					u = a.unicode,
					d = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (Wr ? "y" : "g"),
					l = new c(Wr ? a : "^(?:" + a.source + ")", d),
					p = void 0 === i ? 4294967295 : i >>> 0;
				if (0 === p) return [];
				if (0 === s.length) return null === Dr(l, s) ? [s] : [];
				for (var f = 0, h = 0, m = []; h < s.length;) {
					l.lastIndex = Wr ? h : 0;
					var v, g = Dr(l, Wr ? s : s.slice(h));
					if (null === g || (v = zr(ae(l.lastIndex + (Wr ? 0 : h)), s.length)) === f) h = Or(s, h, u);
					else {
						if (m.push(s.slice(f, h)), m.length === p) return m;
						for (var _ = 1; _ <= g.length - 1; _++)
							if (m.push(g[_]), m.length === p) return m;
						h = f = v
					}
				}
				return m.push(s.slice(f)), m
			}]
	}, !Wr);
	var Jr = te("navigator", "userAgent") || "",
		qr = [].slice,
		Kr = /MSIE .\./.test(Jr),
		$r = function(e) {
			return function(t, n) {
				var r = arguments.length > 2,
					i = r ? qr.call(arguments, 2) : void 0;
				return e(r ? function() {
					("function" == typeof t ? t : Function(t)).apply(this, i)
				} : t, n)
			}
		};
	Ie({
		global: 1,
		bind: 1,
		forced: Kr
	}, {
		setTimeout: $r(s.setTimeout),
		setInterval: $r(s.setInterval)
	});
	var Yr = function(e, t) {
			return function() {
				for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
				return e.apply(t, n)
			}
		},
		Qr = Object.prototype.toString;

	function Xr(e) {
		return "[object Array]" === Qr.call(e)
	}

	function Zr(e) {
		return null !== e && "object" == typeof e
	}

	function ei(e) {
		return "[object Function]" === Qr.call(e)
	}

	function ti(e, t) {
		if (null != e)
			if ("object" != typeof e && (e = [e]), Xr(e))
				for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
			else
				for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
	}
	var ni = {
		isArray: Xr,
		isArrayBuffer: function(e) {
			return "[object ArrayBuffer]" === Qr.call(e)
		},
		isBuffer: function(e) {
			return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(
				e)
		},
		isFormData: function(e) {
			return "undefined" != typeof FormData && e instanceof FormData
		},
		isArrayBufferView: function(e) {
			return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
		},
		isString: function(e) {
			return "string" == typeof e
		},
		isNumber: function(e) {
			return "number" == typeof e
		},
		isObject: Zr,
		isUndefined: function(e) {
			return void 0 === e
		},
		isDate: function(e) {
			return "[object Date]" === Qr.call(e)
		},
		isFile: function(e) {
			return "[object File]" === Qr.call(e)
		},
		isBlob: function(e) {
			return "[object Blob]" === Qr.call(e)
		},
		isFunction: ei,
		isStream: function(e) {
			return Zr(e) && ei(e.pipe)
		},
		isURLSearchParams: function(e) {
			return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
		},
		isStandardBrowserEnv: function() {
			return "undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product &&
				"NS" !== navigator.product ? "undefined" != typeof window && "undefined" != typeof document : 0
		},
		forEach: ti,
		merge: function e() {
			var t = {};

			function n(n, r) {
				"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n
			}
			for (var r = 0, i = arguments.length; r < i; r++) ti(arguments[r], n);
			return t
		},
		deepMerge: function e() {
			var t = {};

			function n(n, r) {
				"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n
			}
			for (var r = 0, i = arguments.length; r < i; r++) ti(arguments[r], n);
			return t
		},
		extend: function(e, t, n) {
			return ti(t, function(t, r) {
				e[r] = n && "function" == typeof t ? Yr(t, n) : t
			}), e
		},
		trim: function(e) {
			return e.replace(/^\s*/, "").replace(/\s*$/, "")
		}
	};

	function ri(e) {
		return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(
			/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
	}
	var ii = function(e, t, n) {
		if (!t) return e;
		var r;
		if (n) r = n(t);
		else if (ni.isURLSearchParams(t)) r = t.toString();
		else {
			var i = [];
			ni.forEach(t, function(e, t) {
				null != e && (ni.isArray(e) ? t += "[]" : e = [e], ni.forEach(e, function(e) {
					ni.isDate(e) ? e = e.toISOString() : ni.isObject(e) && (e = JSON.stringify(e)), i.push(ri(t) + "=" + ri(e))
				}))
			}), r = i.join("&")
		}
		if (r) {
			var o = e.indexOf("#"); - 1 !== o && (e = e.slice(0, o)), e += (-1 === e.indexOf("?") ? "?" : "&") + r
		}
		return e
	};

	function oi() {
		this.handlers = []
	}
	oi.prototype.use = function(e, t) {
		return this.handlers.push({
			fulfilled: e,
			rejected: t
		}), this.handlers.length - 1
	}, oi.prototype.eject = function(e) {
		this.handlers[e] && (this.handlers[e] = null)
	}, oi.prototype.forEach = function(e) {
		ni.forEach(this.handlers, function(t) {
			null !== t && e(t)
		})
	};
	var ai = oi,
		si = function(e, t, n) {
			return ni.forEach(n, function(n) {
				e = n(e, t)
			}), e
		},
		ci = function(e) {
			return !(!e || !e.__CANCEL__)
		},
		ui = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ?
		window : {};

	function di() {
		throw new Error("setTimeout has not been defined")
	}

	function li() {
		throw new Error("clearTimeout has not been defined")
	}
	var pi = di,
		fi = li;

	function hi(e) {
		if (pi === setTimeout) return setTimeout(e, 0);
		if ((pi === di || !pi) && setTimeout) return pi = setTimeout, setTimeout(e, 0);
		try {
			return pi(e, 0)
		} catch (t) {
			try {
				return pi.call(null, e, 0)
			} catch (t) {
				return pi.call(this, e, 0)
			}
		}
	}
	"function" == typeof ui.setTimeout && (pi = setTimeout), "function" == typeof ui.clearTimeout && (fi = clearTimeout);
	var mi, vi = [],
		gi = 0,
		_i = -1;

	function yi() {
		gi && mi && (gi = 0, mi.length ? vi = mi.concat(vi) : _i = -1, vi.length && Si())
	}

	function Si() {
		if (!gi) {
			var e = hi(yi);
			gi = 1;
			for (var t = vi.length; t;) {
				for (mi = vi, vi = []; ++_i < t;) mi && mi[_i].run();
				_i = -1, t = vi.length
			}
			mi = null, gi = 0,
				function(e) {
					if (fi === clearTimeout) return clearTimeout(e);
					if ((fi === li || !fi) && clearTimeout) return fi = clearTimeout, clearTimeout(e);
					try {
						fi(e)
					} catch (t) {
						try {
							return fi.call(null, e)
						} catch (t) {
							return fi.call(this, e)
						}
					}
				}(e)
		}
	}

	function bi(e, t) {
		this.fun = e, this.array = t
	}
	bi.prototype.run = function() {
		this.fun.apply(null, this.array)
	};

	function ki() {}
	var Ci = ki,
		wi = ki,
		Ri = ki,
		Ti = ki,
		Ei = ki,
		Ii = ki,
		Pi = ki;
	var xi = ui.performance || {},
		Ai = xi.now || xi.mozNow || xi.msNow || xi.oNow || xi.webkitNow || function() {
			return (new Date).getTime()
		};
	var Oi = new Date;
	var Di = {
			nextTick: function(e) {
				var t = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				vi.push(new bi(e, t)), 1 !== vi.length || gi || hi(Si)
			},
			title: "browser",
			browser: 1,
			env: {},
			argv: [],
			version: "",
			versions: {},
			on: Ci,
			addListener: wi,
			once: Ri,
			off: Ti,
			removeListener: Ei,
			removeAllListeners: Ii,
			emit: Pi,
			binding: function(e) {
				throw new Error("process.binding is not supported")
			},
			cwd: function() {
				return "/"
			},
			chdir: function(e) {
				throw new Error("process.chdir is not supported")
			},
			umask: function() {
				return 0
			},
			hrtime: function(e) {
				var t = .001 * Ai.call(xi),
					n = Math.floor(t),
					r = Math.floor(t % 1 * 1e9);
				return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r]
			},
			platform: "browser",
			release: {},
			config: {},
			uptime: function() {
				return (new Date - Oi) / 1e3
			}
		},
		Li = function(e, t) {
			ni.forEach(e, function(n, r) {
				r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
			})
		},
		Ni = function(e, t, n, r, i) {
			return function(e, t, n, r, i) {
				return e.config = t, n && (e.code = n), e.request = r, e.response = i, e.isAxiosError = 1, e.toJSON = function() {
					return {
						message: this.message,
						name: this.name,
						description: this.description,
						number: this.number,
						fileName: this.fileName,
						lineNumber: this.lineNumber,
						columnNumber: this.columnNumber,
						stack: this.stack,
						config: this.config,
						code: this.code
					}
				}, e
			}(new Error(e), t, n, r, i)
		},
		Mi = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host",
			"if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization",
			"referer", "retry-after", "user-agent"
		],
		ji = ni.isStandardBrowserEnv() ? function() {
			var e, t = /(msie|trident)/i.test(navigator.userAgent),
				n = document.createElement("a");

			function r(e) {
				var r = e;
				return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
					href: n.href,
					protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
					host: n.host,
					search: n.search ? n.search.replace(/^\?/, "") : "",
					hash: n.hash ? n.hash.replace(/^#/, "") : "",
					hostname: n.hostname,
					port: n.port,
					pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
				}
			}
			return e = r(window.location.href),
				function(t) {
					var n = ni.isString(t) ? r(t) : t;
					return n.protocol === e.protocol && n.host === e.host
				}
		}() : function() {
			return 1
		},
		Vi = ni.isStandardBrowserEnv() ? {
			write: function(e, t, n, r, i, o) {
				var a = [];
				a.push(e + "=" + encodeURIComponent(t)), ni.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), ni.isString(
						r) && a.push("path=" + r), ni.isString(i) && a.push("domain=" + i), 1 == o && a.push("secure"), document.cookie =
					a.join("; ")
			},
			read: function(e) {
				var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
				return t ? decodeURIComponent(t[3]) : null
			},
			remove: function(e) {
				this.write(e, "", Date.now() - 864e5)
			}
		} : {
			write: function() {},
			read: function() {
				return null
			},
			remove: function() {}
		},
		Ui = function(e) {
			return new Promise(function(t, n) {
				var r = e.data,
					i = e.headers;
				ni.isFormData(r) && delete i["Content-Type"];
				var o = new XMLHttpRequest;
				if (e.auth) {
					var a = e.auth.username || "",
						s = e.auth.password || "";
					i.Authorization = "Basic " + btoa(a + ":" + s)
				}
				if (o.open(e.method.toUpperCase(), ii(e.url, e.params, e.paramsSerializer), 1), o.timeout = e.timeout, o.onreadystatechange =
					function() {
						if (o && 4 === o.readyState && (0 !== o.status || o.responseURL && 0 === o.responseURL.indexOf("file:"))) {
							var r = "getAllResponseHeaders" in o ? function(e) {
									var t, n, r, i = {};
									return e ? (ni.forEach(e.split("\n"), function(e) {
										if (r = e.indexOf(":"), t = ni.trim(e.substr(0, r)).toLowerCase(), n = ni.trim(e.substr(r + 1)), t) {
											if (i[t] && Mi.indexOf(t) >= 0) return;
											i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n
										}
									}), i) : i
								}(o.getAllResponseHeaders()) : null,
								i = {
									data: e.responseType && "text" !== e.responseType ? o.response : o.responseText,
									status: o.status,
									statusText: o.statusText,
									headers: r,
									config: e,
									request: o
								};
							! function(e, t, n) {
								var r = n.config.validateStatus;
								!r || r(n.status) ? e(n) : t(Ni("Request failed with status code " + n.status, n.config, null, n.request, n))
							}(t, n, i), o = null
						}
					}, o.onabort = function() {
						o && (n(Ni("Request aborted", e, "ECONNABORTED", o)), o = null)
					}, o.onerror = function() {
						n(Ni("Network Error", e, null, o)), o = null
					}, o.ontimeout = function() {
						n(Ni("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", o)), o = null
					}, ni.isStandardBrowserEnv()) {
					var c = Vi,
						u = (e.withCredentials || ji(e.url)) && e.xsrfCookieName ? c.read(e.xsrfCookieName) : void 0;
					u && (i[e.xsrfHeaderName] = u)
				}
				if ("setRequestHeader" in o && ni.forEach(i, function(e, t) {
						void 0 === r && "content-type" === t.toLowerCase() ? delete i[t] : o.setRequestHeader(t, e)
					}), e.withCredentials && (o.withCredentials = 1), e.responseType) try {
					o.responseType = e.responseType
				} catch (d) {
					if ("json" !== e.responseType) throw d
				}
				"function" == typeof e.onDownloadProgress && o.addEventListener("progress", e.onDownloadProgress), "function" ==
					typeof e.onUploadProgress && o.upload && o.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken &&
					e.cancelToken.promise.then(function(e) {
						o && (o.abort(), n(e), o = null)
					}), void 0 === r && (r = null), o.send(r)
			})
		},
		Fi = {
			"Content-Type": "application/x-www-form-urlencoded"
		};

	function Gi(e, t) {
		!ni.isUndefined(e) && ni.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
	}
	var Bi = {
		adapter: function() {
			var e;
			return void 0 !== Di && "[object process]" === Object.prototype.toString.call(Di) ? e = Ui : "undefined" !=
				typeof XMLHttpRequest && (e = Ui), e
		}(),
		transformRequest: [function(e, t) {
			return Li(t, "Accept"), Li(t, "Content-Type"), ni.isFormData(e) || ni.isArrayBuffer(e) || ni.isBuffer(e) || ni.isStream(
				e) || ni.isFile(e) || ni.isBlob(e) ? e : ni.isArrayBufferView(e) ? e.buffer : ni.isURLSearchParams(e) ? (Gi(t,
				"application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : ni.isObject(e) ? (Gi(t,
				"application/json;charset=utf-8"), JSON.stringify(e)) : e
		}],
		transformResponse: [function(e) {
			if ("string" == typeof e) try {
				e = JSON.parse(e)
			} catch (t) {}
			return e
		}],
		timeout: 0,
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
		maxContentLength: -1,
		validateStatus: function(e) {
			return e >= 200 && e < 300
		},
		headers: {
			common: {
				Accept: "application/json, text/plain, */*"
			}
		}
	};
	ni.forEach(["delete", "get", "head"], function(e) {
		Bi.headers[e] = {}
	}), ni.forEach(["post", "put", "patch"], function(e) {
		Bi.headers[e] = ni.merge(Fi)
	});
	var Hi = Bi;

	function zi(e) {
		e.cancelToken && e.cancelToken.throwIfRequested()
	}
	var Wi = function(e) {
			var t, n;
			return zi(e), e.baseURL && ! function(e) {
					return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
				}(e.url) && (e.url = (t = e.baseURL, (n = e.url) ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t)), e.headers =
				e.headers || {}, e.data = si(e.data, e.headers, e.transformRequest), e.headers = ni.merge(e.headers.common || {},
					e.headers[e.method] || {}, e.headers || {}), ni.forEach(["delete", "get", "head", "post", "put", "patch",
					"common"
				], function(t) {
					delete e.headers[t]
				}), (e.adapter || Hi.adapter)(e).then(function(t) {
					return zi(e), t.data = si(t.data, t.headers, e.transformResponse), t
				}, function(t) {
					return ci(t) || (zi(e), t && t.response && (t.response.data = si(t.response.data, t.response.headers, e.transformResponse))),
						Promise.reject(t)
				})
		},
		Ji = function(e, t) {
			t = t || {};
			var n = {};
			return ni.forEach(["url", "method", "params", "data"], function(e) {
				void 0 !== t[e] && (n[e] = t[e])
			}), ni.forEach(["headers", "auth", "proxy"], function(r) {
				ni.isObject(t[r]) ? n[r] = ni.deepMerge(e[r], t[r]) : void 0 !== t[r] ? n[r] = t[r] : ni.isObject(e[r]) ? n[r] =
					ni.deepMerge(e[r]) : void 0 !== e[r] && (n[r] = e[r])
			}), ni.forEach(["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout",
				"withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress",
				"onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent",
				"cancelToken", "socketPath"
			], function(r) {
				void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
			}), n
		};

	function qi(e) {
		this.defaults = e, this.interceptors = {
			request: new ai,
			response: new ai
		}
	}
	qi.prototype.request = function(e) {
		"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = Ji(this.defaults, e)).method =
			e.method ? e.method.toLowerCase() : "get";
		var t = [Wi, void 0],
			n = Promise.resolve(e);
		for (this.interceptors.request.forEach(function(e) {
				t.unshift(e.fulfilled, e.rejected)
			}), this.interceptors.response.forEach(function(e) {
				t.push(e.fulfilled, e.rejected)
			}); t.length;) n = n.then(t.shift(), t.shift());
		return n
	}, qi.prototype.getUri = function(e) {
		return e = Ji(this.defaults, e), ii(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
	}, ni.forEach(["delete", "get", "head", "options"], function(e) {
		qi.prototype[e] = function(t, n) {
			return this.request(ni.merge(n || {}, {
				method: e,
				url: t
			}))
		}
	}), ni.forEach(["post", "put", "patch"], function(e) {
		qi.prototype[e] = function(t, n, r) {
			return this.request(ni.merge(r || {}, {
				method: e,
				url: t,
				data: n
			}))
		}
	});
	var Ki = qi;

	function $i(e) {
		this.message = e
	}
	$i.prototype.toString = function() {
		return "Cancel" + (this.message ? ": " + this.message : "")
	}, $i.prototype.__CANCEL__ = 1;
	var Yi = $i;

	function Qi(e) {
		if ("function" != typeof e) throw new TypeError("executor must be a function.");
		var t;
		this.promise = new Promise(function(e) {
			t = e
		});
		var n = this;
		e(function(e) {
			n.reason || (n.reason = new Yi(e), t(n.reason))
		})
	}
	Qi.prototype.throwIfRequested = function() {
		if (this.reason) throw this.reason
	}, Qi.source = function() {
		var e;
		return {
			token: new Qi(function(t) {
				e = t
			}),
			cancel: e
		}
	};
	var Xi = Qi;

	function Zi(e) {
		var t = new Ki(e),
			n = Yr(Ki.prototype.request, t);
		return ni.extend(n, Ki.prototype, t), ni.extend(n, t), n
	}
	var eo = Zi(Hi);
	eo.Axios = Ki, eo.create = function(e) {
		return Zi(Ji(eo.defaults, e))
	}, eo.Cancel = Yi, eo.CancelToken = Xi, eo.isCancel = ci, eo.all = function(e) {
		return Promise.all(e)
	}, eo.spread = function(e) {
		return function(t) {
			return e.apply(null, t)
		}
	};
	var to = eo,
		no = eo;
	to.default = no;
	var ro, io = to;

	function oo(e) {
		try {
			return JSON.stringify(e)
		} catch (n) {
			if (!ro) try {
				var t = {};
				t.a = t, JSON.stringify(t)
			} catch (r) {
				ro = r.message
			}
			if (n.message === ro) return "[Circular]";
			throw n
		}
	}

	function ao(e) {
		var t = "",
			n = 0;
		return e.length > 1 && "string" == typeof e[0] && (t = (t = e[0].replace(/(%?)(%([sdjo]))/g, function(t, r, i, o) {
			if (!r) {
				var a = e[n += 1],
					s = "";
				switch (o) {
					case "s":
						s += a;
						break;
					case "d":
						s += +a;
						break;
					case "j":
						s = oo(a);
						break;
					case "o":
						var c = oo(a);
						"{" !== c[0] && "[" !== c[0] && (c = "<".concat(c, ">")), s = function(e) {
							if (!Object.getOwnPropertyDescriptor || !Object.getPrototypeOf) return Object.prototype.toString.call(e).slice(
								8, -1);
							for (; e;) {
								var t = Object.getOwnPropertyDescriptor(e, "constructor");
								if (void 0 !== t && "function" == typeof t.value && "" !== t.value.name) return t.value.name;
								e = Object.getPrototypeOf(e)
							}
							return ""
						}(a) + c
				}
				return s
			}
			return t
		})).replace(/%{2,2}/g, "%"), n += 1), e.length > n && (t && (t += " "), t += e.slice(n).join(" ")), t
	}
	var so = Object.prototype.hasOwnProperty;

	function co() {
		try {
			throw new Error
		} catch (e) {
			return e.stack
		}
	}

	function uo(e) {
		var t = this,
			n = [],
			r = [];
		this.length = function() {
			return n.length
		}, this.sent = function() {
			return r.length
		}, this.push = function(t) {
			n.push(t), n.length > e && n.shift()
		}, this.send = function() {
			return r.length || (r = n, n = []), r
		}, this.confirm = function() {
			r = [], t.content = ""
		}, this.fail = function() {
			var i = 1 + n.length + r.length - e;
			i > 0 && (r.splice(0, i), n = r.concat(n), t.confirm())
		}
	}
	var lo, po, fo, ho = !!co();

	function mo(e) {
		return "[".concat(e.timestamp, "] <").concat(e.level.label.toUpperCase(), ">").concat(e.logger ? " (".concat(e.logger,
			")") : "", ": ").concat(e.message).concat(e.stacktrace ? "\n".concat(e.stacktrace) : "")
	}
	var vo = {
			url: "https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_log",
			interval: 1e3,
			level: "trace",
			capacity: 0,
			stacktrace: {
				levels: ["trace", "warn", "error"],
				depth: 3,
				excess: 0
			},
			timestamp: function() {
				return (new Date).toISOString()
			},
			format: mo
		},
		go = -1,
		_o = 0,
		yo = "",
		So = "",
		bo = "",
		ko = function(e) {
			_o || (yo = "".concat(e.sdkAppId), So = "".concat(e.userId), bo = "".concat(e.version), _o = 1)
		},
		Co = function(e, t) {
			if (!e || !e.getLogger) throw new TypeError("Argument is not a root loglevel object");
			if (lo) throw new Error("You can assign a plugin only one time");
			lo = e;
			var n = function e() {
				for (var t = {}, n = 0; n < arguments.length; n += 1) {
					var r = Object(arguments[n]);
					for (var i in r) so.call(r, i) && (t[i] = "object" !== Qe(r[i]) || Array.isArray(r[i]) ? r[i] : e(t[i], r[i]))
				}
				return t
			}(vo, t);
			n.capacity = n.capacity || 500;
			var r, i = n.interval;
			go = setInterval(function() {
				if (!_o) return;
				if (!o.sent()) {
					if (!o.length()) return;
					var e = o.send();
					o.content = r ? '{"logs":['.concat(e.join(","), "]}") : e.join("\n"),
						function(e) {
							if (!_o) return;
							var t = JSON.stringify({
								timestamp: vo.timestamp(),
								sdkAppId: yo,
								userId: So,
								version: bo,
								log: e
							});
							io.post(n.url, t).then(function(e) {
								o.confirm()
							}).catch(function(e) {
								console.log(e), o.fail()
							})
						}(o.content)
				}
			}, i);
			var o = new uo(n.capacity);
			return po = e.methodFactory, fo = function(e, t, i) {
				var a = po(e, t, i),
					s = ho && n.stacktrace.levels.some(function(t) {
						return t === e
					}),
					c = lo.levels[e.toUpperCase()],
					u = c >= lo.levels[n.level.toUpperCase()];
				return function() {
					for (var t = arguments.length, d = new Array(t), l = 0; l < t; l++) d[l] = arguments[l];
					var p = ao(d);
					if (u) {
						var f = (new Date).toLocaleString(),
							h = s ? co() : "";
						if (h) {
							var m = h.split("\n");
							m.splice(0, n.stacktrace.excess + 3);
							var v = n.stacktrace.depth;
							if (v && m.length !== v + 1) {
								var g = m.splice(0, v);
								h = g.join("\n"), m.length && (h += "\n    and ".concat(m.length, " more"))
							} else h = m.join("\n")
						}
						var _ = n.format({
							message: p,
							level: {
								label: e,
								value: c
							},
							logger: i || "",
							timestamp: f,
							stacktrace: h
						});
						void 0 === r && (r = "string" != typeof _);
						var y = "";
						if (r) try {
							y += JSON.stringify(_)
						} catch (k) {
							return a.apply(void 0, d), void lo.getLogger("logger").error(k)
						} else y += _;
						o.push(y)
					}
					var S = (new Date).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
						b = "[" + S + "] <" + e.toUpperCase() + "> " + p;
					a.apply(void 0, [b])
				}
			}, e.methodFactory = fo, e.setLevel(e.getLevel()), e
		},
		wo = function() {
			if (!lo) throw new Error("You can't disable a not appled plugin");
			if (fo !== lo.methodFactory) throw new Error("You can't disable a plugin after appling another plugin");
			lo.methodFactory = po, lo.setLevel(lo.getLevel()), lo = void 0, clearInterval(go)
		},
		Ro = 0;
	Hn.setConfig = function(e) {
		ko(e)
	}, Hn.setLogLevel = function(e) {
		Hn.info("TRTC LogLevel was set to: " + e), Hn.setLevel(e)
	}, Hn.enableUploadLog = function() {
		Ro || (Hn.info("enable upload log"), Co(Hn), Ro = 1)
	}, Hn.disableUploadLog = function() {
		Ro && (Hn.warn("disable upload log! Without log we are difficult to help you triage the issue you might run into!"),
			wo(), Ro = 0)
	}, Hn.enableUploadLog(), Hn.setLevel("INFO");
	var To = Object.keys || function(e) {
			return fe(e, he)
		},
		Eo = u ? Object.defineProperties : function(e, t) {
			x(e);
			for (var n, r = To(t), i = r.length, o = 0; i > o;) O.f(e, n = r[o++], t[n]);
			return e
		},
		Io = te("document", "documentElement"),
		Po = H("IE_PROTO"),
		xo = function() {},
		Ao = function() {
			var e, t = T("iframe"),
				n = he.length;
			for (t.style.display = "none", Io.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(),
				e.write("<script>document.F=Object<\/script>"), e.close(), Ao = e.F; n--;) delete Ao.prototype[he[n]];
			return Ao()
		},
		Oo = Object.create || function(e, t) {
			var n;
			return null !== e ? (xo.prototype = x(e), n = new xo, xo.prototype = null, n[Po] = e) : n = Ao(), void 0 === t ? n :
				Eo(n, t)
		};
	z[Po] = 1;
	var Do = ve.f,
		Lo = {}.toString,
		No = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
		Mo = {
			f: function(e) {
				return No && "[object Window]" == Lo.call(e) ? function(e) {
					try {
						return Do(e)
					} catch (t) {
						return No.slice()
					}
				}(e) : Do(y(e))
			}
		},
		jo = {
			f: Ne
		},
		Vo = O.f,
		Uo = function(e) {
			var t = Z.Symbol || (Z.Symbol = {});
			C(t, e) || Vo(t, e, {
				value: jo.f(e)
			})
		},
		Fo = O.f,
		Go = Ne("toStringTag"),
		Bo = function(e, t, n) {
			e && !C(e = n ? e : e.prototype, Go) && Fo(e, Go, {
				configurable: 1,
				value: t
			})
		},
		Ho = Ke.forEach,
		zo = H("hidden"),
		Wo = Ne("toPrimitive"),
		Jo = Q.set,
		qo = Q.getterFor("Symbol"),
		Ko = Object.prototype,
		$o = s.Symbol,
		Yo = s.JSON,
		Qo = Yo && Yo.stringify,
		Xo = P.f,
		Zo = O.f,
		ea = Mo.f,
		ta = p.f,
		na = N("symbols"),
		ra = N("op-symbols"),
		ia = N("string-to-symbol-registry"),
		oa = N("symbol-to-string-registry"),
		aa = N("wks"),
		sa = s.QObject,
		ca = !sa || !sa.prototype || !sa.prototype.findChild,
		ua = u && c(function() {
			return 7 != Oo(Zo({}, "a", {
				get: function() {
					return Zo(this, "a", {
						value: 7
					}).a
				}
			})).a
		}) ? function(e, t, n) {
			var r = Xo(Ko, t);
			r && delete Ko[t], Zo(e, t, n), r && e !== Ko && Zo(Ko, t, r)
		} : Zo,
		da = function(e, t) {
			var n = na[e] = Oo($o.prototype);
			return Jo(n, {
				type: "Symbol",
				tag: e,
				description: t
			}), u || (n.description = t), n
		},
		la = Oe && "symbol" == typeof $o.iterator ? function(e) {
			return "symbol" == typeof e
		} : function(e) {
			return Object(e) instanceof $o
		},
		pa = function(e, t, n) {
			e === Ko && pa(ra, t, n), x(e);
			var r = b(t, 1);
			return x(n), C(na, r) ? (n.enumerable ? (C(e, zo) && e[zo][r] && (e[zo][r] = 0), n = Oo(n, {
				enumerable: f(0, 0)
			})) : (C(e, zo) || Zo(e, zo, f(1, {})), e[zo][r] = 1), ua(e, r, n)) : Zo(e, r, n)
		},
		fa = function(e, t) {
			x(e);
			var n = y(t),
				r = To(n).concat(ga(n));
			return Ho(r, function(t) {
				u && !ha.call(n, t) || pa(e, t, n[t])
			}), e
		},
		ha = function(e) {
			var t = b(e, 1),
				n = ta.call(this, t);
			return this === Ko && C(na, t) && !C(ra, t) ? 0 : n || !C(this, t) || !C(na, t) || C(this, zo) && this[zo][t] ? n :
				1
		},
		ma = function(e, t) {
			var n = y(e),
				r = b(t, 1);
			if (n !== Ko || !C(na, r) || C(ra, r)) {
				var i = Xo(n, r);
				return !i || !C(na, r) || C(n, zo) && n[zo][r] || (i.enumerable = 1), i
			}
		},
		va = function(e) {
			var t = ea(y(e)),
				n = [];
			return Ho(t, function(e) {
				C(na, e) || C(z, e) || n.push(e)
			}), n
		},
		ga = function(e) {
			var t = e === Ko,
				n = ea(t ? ra : y(e)),
				r = [];
			return Ho(n, function(e) {
				!C(na, e) || t && !C(Ko, e) || r.push(na[e])
			}), r
		};
	Oe || (X(($o = function() {
		if (this instanceof $o) throw TypeError("Symbol is not a constructor");
		var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
			t = G(e),
			n = function(e) {
				this === Ko && n.call(ra, e), C(this, zo) && C(this[zo], t) && (this[zo][t] = 0), ua(this, t, f(1, e))
			};
		return u && ca && ua(Ko, t, {
			configurable: 1,
			set: n
		}), da(t, e)
	}).prototype, "toString", function() {
		return qo(this).tag
	}), p.f = ha, O.f = pa, P.f = ma, ve.f = Mo.f = va, ge.f = ga, u && (Zo($o.prototype, "description", {
		configurable: 1,
		get: function() {
			return qo(this).description
		}
	}), X(Ko, "propertyIsEnumerable", ha, {
		unsafe: 1
	})), jo.f = function(e) {
		return da(Ne(e), e)
	}), Ie({
		global: 1,
		wrap: 1,
		forced: !Oe,
		sham: !Oe
	}, {
		Symbol: $o
	}), Ho(To(aa), function(e) {
		Uo(e)
	}), Ie({
		target: "Symbol",
		stat: 1,
		forced: !Oe
	}, {
		for: function(e) {
			var t = String(e);
			if (C(ia, t)) return ia[t];
			var n = $o(t);
			return ia[t] = n, oa[n] = t, n
		},
		keyFor: function(e) {
			if (!la(e)) throw TypeError(e + " is not a symbol");
			if (C(oa, e)) return oa[e]
		},
		useSetter: function() {
			ca = 1
		},
		useSimple: function() {
			ca = 0
		}
	}), Ie({
		target: "Object",
		stat: 1,
		forced: !Oe,
		sham: !u
	}, {
		create: function(e, t) {
			return void 0 === t ? Oo(e) : fa(Oo(e), t)
		},
		defineProperty: pa,
		defineProperties: fa,
		getOwnPropertyDescriptor: ma
	}), Ie({
		target: "Object",
		stat: 1,
		forced: !Oe
	}, {
		getOwnPropertyNames: va,
		getOwnPropertySymbols: ga
	}), Ie({
		target: "Object",
		stat: 1,
		forced: c(function() {
			ge.f(1)
		})
	}, {
		getOwnPropertySymbols: function(e) {
			return ge.f(xe(e))
		}
	}), Yo && Ie({
		target: "JSON",
		stat: 1,
		forced: !Oe || c(function() {
			var e = $o();
			return "[null]" != Qo([e]) || "{}" != Qo({
				a: e
			}) || "{}" != Qo(Object(e))
		})
	}, {
		stringify: function(e) {
			for (var t, n, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
			if (n = t = r[1], (S(t) || void 0 !== e) && !la(e)) return Pe(t) || (t = function(e, t) {
				if ("function" == typeof n && (t = n.call(this, e, t)), !la(t)) return t
			}), r[1] = t, Qo.apply(Yo, r)
		}
	}), $o.prototype[Wo] || D($o.prototype, Wo, $o.prototype.valueOf), Bo($o, "Symbol"), z[zo] = 1;
	var _a = O.f,
		ya = s.Symbol;
	if (u && "function" == typeof ya && (!("description" in ya.prototype) || void 0 !== ya().description)) {
		var Sa = {},
			ba = function() {
				var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
					t = this instanceof ba ? new ya(e) : void 0 === e ? ya() : ya(e);
				return "" === e && (Sa[t] = 1), t
			};
		ye(ba, ya);
		var ka = ba.prototype = ya.prototype;
		ka.constructor = ba;
		var Ca = ka.toString,
			wa = "Symbol(test)" == String(ya("test")),
			Ra = /^Symbol\((.*)\)[^)]+$/;
		_a(ka, "description", {
			configurable: 1,
			get: function() {
				var e = S(this) ? this.valueOf() : this,
					t = Ca.call(e);
				if (C(Sa, e)) return "";
				var n = wa ? t.slice(7, -1) : t.replace(Ra, "$1");
				return "" === n ? void 0 : n
			}
		}), Ie({
			global: 1,
			forced: 1
		}, {
			Symbol: ba
		})
	}
	Uo("iterator");
	var Ta = Ke.forEach,
		Ea = Sn("forEach") ? function(e) {
			return Ta(this, e, arguments.length > 1 ? arguments[1] : void 0)
		} : [].forEach;
	Ie({
		target: "Array",
		proto: 1,
		forced: [].forEach != Ea
	}, {
		forEach: Ea
	});
	var Ia = Ne("unscopables"),
		Pa = Array.prototype;
	null == Pa[Ia] && D(Pa, Ia, Oo(null));
	var xa, Aa, Oa, Da = function(e) {
			Pa[Ia][e] = 1
		},
		La = {},
		Na = Ne("iterator"),
		Ma = 0;
	[].keys && ("next" in (Oa = [].keys()) ? (Aa = fr(fr(Oa))) !== Object.prototype && (xa = Aa) : Ma = 1), null == xa &&
		(xa = {}), C(xa, Na) || D(xa, Na, function() {
			return this
		});
	var ja = {
			IteratorPrototype: xa,
			BUGGY_SAFARI_ITERATORS: Ma
		},
		Va = ja.IteratorPrototype,
		Ua = function() {
			return this
		},
		Fa = Object.setPrototypeOf || ("__proto__" in {} ? function() {
			var e, t = 0,
				n = {};
			try {
				(e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
			} catch (r) {}
			return function(n, r) {
				return x(n),
					function(e) {
						if (!S(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype")
					}(r), t ? e.call(n, r) : n.__proto__ = r, n
			}
		}() : void 0),
		Ga = ja.IteratorPrototype,
		Ba = ja.BUGGY_SAFARI_ITERATORS,
		Ha = Ne("iterator"),
		za = function() {
			return this
		},
		Wa = function(e, t, n, r, i, o, a) {
			! function(e, t, n) {
				var r = t + " Iterator";
				e.prototype = Oo(Va, {
					next: f(1, n)
				}), Bo(e, r, 0), La[r] = Ua
			}(n, t, r);
			var s, c, u, d = function(e) {
					if (e === i && v) return v;
					if (!Ba && e in h) return h[e];
					switch (e) {
						case "keys":
						case "values":
						case "entries":
							return function() {
								return new n(this, e)
							}
					}
					return function() {
						return new n(this)
					}
				},
				l = t + " Iterator",
				p = 0,
				h = e.prototype,
				m = h[Ha] || h["@@iterator"] || i && h[i],
				v = !Ba && m || d(i),
				g = "Array" == t && h.entries || m;
			if (g && (s = fr(g.call(new e)), Ga !== Object.prototype && s.next && (fr(s) !== Ga && (Fa ? Fa(s, Ga) : "function" !=
					typeof s[Ha] && D(s, Ha, za)), Bo(s, l, 1))), "values" == i && m && "values" !== m.name && (p = 1, v = function() {
					return m.call(this)
				}), h[Ha] !== v && D(h, Ha, v), La[t] = v, i)
				if (c = {
						values: d("values"),
						keys: o ? v : d("keys"),
						entries: d("entries")
					}, a)
					for (u in c) !Ba && !p && u in h || X(h, u, c[u]);
				else Ie({
					target: t,
					proto: 1,
					forced: Ba || p
				}, c);
			return c
		},
		Ja = Q.set,
		qa = Q.getterFor("Array Iterator"),
		Ka = Wa(Array, "Array", function(e, t) {
			Ja(this, {
				type: "Array Iterator",
				target: y(e),
				index: 0,
				kind: t
			})
		}, function() {
			var e = qa(this),
				t = e.target,
				n = e.kind,
				r = e.index++;
			return !t || r >= t.length ? (e.target = void 0, {
				value: void 0,
				done: 1
			}) : "keys" == n ? {
				value: r,
				done: 0
			} : "values" == n ? {
				value: t[r],
				done: 0
			} : {
				value: [r, t[r]],
				done: 0
			}
		}, "values");
	La.Arguments = La.Array, Da("keys"), Da("values"), Da("entries");
	var $a = !c(function() {
			return Object.isExtensible(Object.preventExtensions({}))
		}),
		Ya = t(function(e) {
			var t = O.f,
				n = G("meta"),
				r = 0,
				i = Object.isExtensible || function() {
					return 1
				},
				o = function(e) {
					t(e, n, {
						value: {
							objectID: "O" + ++r,
							weakData: {}
						}
					})
				},
				a = e.exports = {
					REQUIRED: 0,
					fastKey: function(e, t) {
						if (!S(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
						if (!C(e, n)) {
							if (!i(e)) return "F";
							if (!t) return "E";
							o(e)
						}
						return e[n].objectID
					},
					getWeakData: function(e, t) {
						if (!C(e, n)) {
							if (!i(e)) return 1;
							if (!t) return 0;
							o(e)
						}
						return e[n].weakData
					},
					onFreeze: function(e) {
						return $a && a.REQUIRED && i(e) && !C(e, n) && o(e), e
					}
				};
			z[n] = 1
		}),
		Qa = (Ya.REQUIRED, Ya.fastKey, Ya.getWeakData, Ya.onFreeze, Ne("iterator")),
		Xa = Array.prototype,
		Za = Ne("iterator"),
		es = function(e, t, n, r) {
			try {
				return r ? t(x(n)[0], n[1]) : t(n)
			} catch (o) {
				var i = e.return;
				throw void 0 !== i && x(i.call(e)), o
			}
		},
		ts = t(function(e) {
			var t = function(e, t) {
				this.stopped = e, this.result = t
			};
			(e.exports = function(e, n, r, i, o) {
				var a, s, c, u, d, l, p, f = We(n, r, i ? 2 : 1);
				if (o) a = e;
				else {
					if ("function" != typeof(s = function(e) {
							if (null != e) return e[Za] || e["@@iterator"] || La[gr(e)]
						}(e))) throw TypeError("Target is not iterable");
					if (void 0 !== (p = s) && (La.Array === p || Xa[Qa] === p)) {
						for (c = 0, u = ae(e.length); u > c; c++)
							if ((d = i ? f(x(l = e[c])[0], l[1]) : f(e[c])) && d instanceof t) return d;
						return new t(0)
					}
					a = s.call(e)
				}
				for (; !(l = a.next()).done;)
					if ((d = es(a, f, l.value, i)) && d instanceof t) return d;
				return new t(0)
			}).stop = function(e) {
				return new t(1, e)
			}
		}),
		ns = function(e, t, n) {
			if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
			return e
		},
		rs = Ne("iterator"),
		is = 0;
	try {
		var os = 0,
			as = {
				next: function() {
					return {
						done: !!os++
					}
				},
				return: function() {
					is = 1
				}
			};
		as[rs] = function() {
			return this
		}, Array.from(as, function() {
			throw 2
		})
	} catch (cp) {}
	var ss = function(e, t) {
			if (!t && !is) return 0;
			var n = 0;
			try {
				var r = {};
				r[rs] = function() {
					return {
						next: function() {
							return {
								done: n = 1
							}
						}
					}
				}, e(r)
			} catch (cp) {}
			return n
		},
		cs = function(e, t, n) {
			var r, i;
			return Fa && "function" == typeof(r = t.constructor) && r !== n && S(i = r.prototype) && i !== n.prototype && Fa(e,
				i), e
		},
		us = function(e, t, n) {
			for (var r in t) X(e, r, t[r], n);
			return e
		},
		ds = Ne("species"),
		ls = function(e) {
			var t = te(e),
				n = O.f;
			u && t && !t[ds] && n(t, ds, {
				configurable: 1,
				get: function() {
					return this
				}
			})
		},
		ps = O.f,
		fs = Ya.fastKey,
		hs = Q.set,
		ms = Q.getterFor,
		vs = (function(e, t, n, r, i) {
			var o = s[e],
				a = o && o.prototype,
				u = o,
				d = r ? "set" : "add",
				l = {},
				p = function(e) {
					var t = a[e];
					X(a, e, "add" == e ? function(e) {
						return t.call(this, 0 === e ? 0 : e), this
					} : "delete" == e ? function(e) {
						return i && !S(e) ? 0 : t.call(this, 0 === e ? 0 : e)
					} : "get" == e ? function(e) {
						return i && !S(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
					} : "has" == e ? function(e) {
						return i && !S(e) ? 0 : t.call(this, 0 === e ? 0 : e)
					} : function(e, n) {
						return t.call(this, 0 === e ? 0 : e, n), this
					})
				};
			if (Te(e, "function" != typeof o || !(i || a.forEach && !c(function() {
					(new o).entries().next()
				})))) u = n.getConstructor(t, e, r, d), Ya.REQUIRED = 1;
			else if (Te(e, 1)) {
				var f = new u,
					h = f[d](i ? {} : -0, 1) != f,
					m = c(function() {
						f.has(1)
					}),
					v = ss(function(e) {
						new o(e)
					}),
					g = !i && c(function() {
						for (var e = new o, t = 5; t--;) e[d](t, t);
						return !e.has(-0)
					});
				v || ((u = t(function(t, n) {
						ns(t, u, e);
						var i = cs(new o, t, u);
						return null != n && ts(n, i[d], i, r), i
					})).prototype = a, a.constructor = u), (m || g) && (p("delete"), p("has"), r && p("get")), (g || h) && p(d), i &&
					a.clear && delete a.clear
			}
			l[e] = u, Ie({
				global: 1,
				forced: u != o
			}, l), Bo(u, e), i || n.setStrong(u, e, r)
		}("Map", function(e) {
			return function() {
				return e(this, arguments.length ? arguments[0] : void 0)
			}
		}, {
			getConstructor: function(e, t, n, r) {
				var i = e(function(e, o) {
						ns(e, i, t), hs(e, {
							type: t,
							index: Oo(null),
							first: void 0,
							last: void 0,
							size: 0
						}), u || (e.size = 0), null != o && ts(o, e[r], e, n)
					}),
					o = ms(t),
					a = function(e, t, n) {
						var r, i, a = o(e),
							c = s(e, t);
						return c ? c.value = n : (a.last = c = {
							index: i = fs(t, 1),
							key: t,
							value: n,
							previous: r = a.last,
							next: void 0,
							removed: 0
						}, a.first || (a.first = c), r && (r.next = c), u ? a.size++ : e.size++, "F" !== i && (a.index[i] = c)), e
					},
					s = function(e, t) {
						var n, r = o(e),
							i = fs(t);
						if ("F" !== i) return r.index[i];
						for (n = r.first; n; n = n.next)
							if (n.key == t) return n
					};
				return us(i.prototype, {
					clear: function() {
						for (var e = o(this), t = e.index, n = e.first; n;) n.removed = 1, n.previous && (n.previous = n.previous.next =
							void 0), delete t[n.index], n = n.next;
						e.first = e.last = void 0, u ? e.size = 0 : this.size = 0
					},
					delete: function(e) {
						var t = o(this),
							n = s(this, e);
						if (n) {
							var r = n.next,
								i = n.previous;
							delete t.index[n.index], n.removed = 1, i && (i.next = r), r && (r.previous = i), t.first == n && (t.first =
								r), t.last == n && (t.last = i), u ? t.size-- : this.size--
						}
						return !!n
					},
					forEach: function(e) {
						for (var t, n = o(this), r = We(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.next : n.first;)
							for (r(t.value, t.key, this); t && t.removed;) t = t.previous
					},
					has: function(e) {
						return !!s(this, e)
					}
				}), us(i.prototype, n ? {
					get: function(e) {
						var t = s(this, e);
						return t && t.value
					},
					set: function(e, t) {
						return a(this, 0 === e ? 0 : e, t)
					}
				} : {
					add: function(e) {
						return a(this, e = 0 === e ? 0 : e, e)
					}
				}), u && ps(i.prototype, "size", {
					get: function() {
						return o(this).size
					}
				}), i
			},
			setStrong: function(e, t, n) {
				var r = t + " Iterator",
					i = ms(t),
					o = ms(r);
				Wa(e, t, function(e, t) {
					hs(this, {
						type: r,
						target: e,
						state: i(e),
						kind: t,
						last: void 0
					})
				}, function() {
					for (var e = o(this), t = e.kind, n = e.last; n && n.removed;) n = n.previous;
					return e.target && (e.last = n = n ? n.next : e.state.first) ? "keys" == t ? {
						value: n.key,
						done: 0
					} : "values" == t ? {
						value: n.value,
						done: 0
					} : {
						value: [n.key, n.value],
						done: 0
					} : (e.target = void 0, {
						value: void 0,
						done: 1
					})
				}, n ? "entries" : "values", !n, 1), ls(t)
			}
		}, 1), "\t\n\v\f\r                　\u2028\u2029\ufeff"),
		gs = "[" + vs + "]",
		_s = RegExp("^" + gs + gs + "*"),
		ys = RegExp(gs + gs + "*$"),
		Ss = function(e) {
			return function(t) {
				var n = String(_(t));
				return 1 & e && (n = n.replace(_s, "")), 2 & e && (n = n.replace(ys, "")), n
			}
		},
		bs = {
			start: Ss(1),
			end: Ss(2),
			trim: Ss(3)
		},
		ks = ve.f,
		Cs = P.f,
		ws = O.f,
		Rs = bs.trim,
		Ts = s.Number,
		Es = Ts.prototype,
		Is = "Number" == m(Oo(Es)),
		Ps = function(e) {
			var t, n, r, i, o, a, s, c, u = b(e, 0);
			if ("string" == typeof u && u.length > 2)
				if (43 === (t = (u = Rs(u)).charCodeAt(0)) || 45 === t) {
					if (88 === (n = u.charCodeAt(2)) || 120 === n) return NaN
				} else if (48 === t) {
				switch (u.charCodeAt(1)) {
					case 66:
					case 98:
						r = 2, i = 49;
						break;
					case 79:
					case 111:
						r = 8, i = 55;
						break;
					default:
						return +u
				}
				for (a = (o = u.slice(2)).length, s = 0; s < a; s++)
					if ((c = o.charCodeAt(s)) < 48 || c > i) return NaN;
				return parseInt(o, r)
			}
			return +u
		};
	if (Te("Number", !Ts(" 0o1") || !Ts("0b1") || Ts("+0x1"))) {
		for (var xs, As = function(e) {
					var t = arguments.length < 1 ? 0 : e,
						n = this;
					return n instanceof As && (Is ? c(function() {
						Es.valueOf.call(n)
					}) : "Number" != m(n)) ? cs(new Ts(Ps(t)), n, As) : Ps(t)
				}, Os = u ? ks(Ts) :
				"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger"
				.split(","), Ds = 0; Os.length > Ds; Ds++) C(Ts, xs = Os[Ds]) && !C(As, xs) && ws(As, xs, Cs(Ts, xs));
		As.prototype = Es, Es.constructor = As, X(s, "Number", As)
	}
	var Ls = Math.floor;
	Ie({
		target: "Number",
		stat: 1
	}, {
		isInteger: function(e) {
			return !S(e) && isFinite(e) && Ls(e) === e
		}
	});
	var Ns, Ms, js, Vs = s.location,
		Us = s.setImmediate,
		Fs = s.clearImmediate,
		Gs = s.process,
		Bs = s.MessageChannel,
		Hs = s.Dispatch,
		zs = 0,
		Ws = {},
		Js = function(e) {
			if (Ws.hasOwnProperty(e)) {
				var t = Ws[e];
				delete Ws[e], t()
			}
		},
		qs = function(e) {
			return function() {
				Js(e)
			}
		},
		Ks = function(e) {
			Js(e.data)
		},
		$s = function(e) {
			s.postMessage(e + "", Vs.protocol + "//" + Vs.host)
		};
	Us && Fs || (Us = function(e) {
			for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
			return Ws[++zs] = function() {
				("function" == typeof e ? e : Function(e)).apply(void 0, t)
			}, Ns(zs), zs
		}, Fs = function(e) {
			delete Ws[e]
		}, "process" == m(Gs) ? Ns = function(e) {
			Gs.nextTick(qs(e))
		} : Hs && Hs.now ? Ns = function(e) {
			Hs.now(qs(e))
		} : Bs ? (js = (Ms = new Bs).port2, Ms.port1.onmessage = Ks, Ns = We(js.postMessage, js, 1)) : !s.addEventListener ||
		"function" != typeof postMessage || s.importScripts || c($s) ? Ns = "onreadystatechange" in T("script") ? function(
			e) {
			Io.appendChild(T("script")).onreadystatechange = function() {
				Io.removeChild(this), Js(e)
			}
		} : function(e) {
			setTimeout(qs(e), 0)
		} : (Ns = $s, s.addEventListener("message", Ks, 0)));
	var Ys, Qs, Xs, Zs, ec, tc, nc, rc = {
			set: Us,
			clear: Fs
		},
		ic = P.f,
		oc = rc.set,
		ac = s.MutationObserver || s.WebKitMutationObserver,
		sc = s.process,
		cc = s.Promise,
		uc = "process" == m(sc),
		dc = ic(s, "queueMicrotask"),
		lc = dc && dc.value;
	lc || (Ys = function() {
		var e, t;
		for (uc && (e = sc.domain) && e.exit(); Qs;) {
			t = Qs.fn, Qs = Qs.next;
			try {
				t()
			} catch (cp) {
				throw Qs ? Zs() : Xs = void 0, cp
			}
		}
		Xs = void 0, e && e.enter()
	}, uc ? Zs = function() {
		sc.nextTick(Ys)
	} : ac && !/(iphone|ipod|ipad).*applewebkit/i.test(Jr) ? (ec = 1, tc = document.createTextNode(""), new ac(Ys).observe(
		tc, {
			characterData: 1
		}), Zs = function() {
		tc.data = ec = !ec
	}) : cc && cc.resolve ? (nc = cc.resolve(void 0), Zs = function() {
		nc.then(Ys)
	}) : Zs = function() {
		oc.call(s, Ys)
	});
	var pc, fc, hc, mc = lc || function(e) {
			var t = {
				fn: e,
				next: void 0
			};
			Xs && (Xs.next = t), Qs || (Qs = t, Zs()), Xs = t
		},
		vc = function(e) {
			var t, n;
			this.promise = new e(function(e, r) {
				if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
				t = e, n = r
			}), this.resolve = ze(t), this.reject = ze(n)
		},
		gc = {
			f: function(e) {
				return new vc(e)
			}
		},
		_c = function(e, t) {
			if (x(e), S(t) && t.constructor === e) return t;
			var n = gc.f(e);
			return (0, n.resolve)(t), n.promise
		},
		yc = function(e) {
			try {
				return {
					error: 0,
					value: e()
				}
			} catch (cp) {
				return {
					error: 1,
					value: cp
				}
			}
		},
		Sc = rc.set,
		bc = Ne("species"),
		kc = "Promise",
		Cc = Q.get,
		wc = Q.set,
		Rc = Q.getterFor(kc),
		Tc = s.Promise,
		Ec = s.TypeError,
		Ic = s.document,
		Pc = s.process,
		xc = s.fetch,
		Ac = Pc && Pc.versions,
		Oc = Ac && Ac.v8 || "",
		Dc = gc.f,
		Lc = Dc,
		Nc = "process" == m(Pc),
		Mc = !!(Ic && Ic.createEvent && s.dispatchEvent),
		jc = Te(kc, function() {
			var e = Tc.resolve(1),
				t = function() {},
				n = (e.constructor = {})[bc] = function(e) {
					e(t, t)
				};
			return !((Nc || "function" == typeof PromiseRejectionEvent) && e.then(t) instanceof n && 0 !== Oc.indexOf("6.6") &&
				-1 === Jr.indexOf("Chrome/66"))
		}),
		Vc = jc || !ss(function(e) {
			Tc.all(e).catch(function() {})
		}),
		Uc = function(e) {
			var t;
			return S(e) && "function" == typeof(t = e.then) ? t : 0
		},
		Fc = function(e, t, n) {
			if (!t.notified) {
				t.notified = 1;
				var r = t.reactions;
				mc(function() {
					for (var i = t.value, o = 1 == t.state, a = 0; r.length > a;) {
						var s, c, u, d = r[a++],
							l = o ? d.ok : d.fail,
							p = d.resolve,
							f = d.reject,
							h = d.domain;
						try {
							l ? (o || (2 === t.rejection && zc(e, t), t.rejection = 1), 1 == l ? s = i : (h && h.enter(), s = l(i), h &&
									(h.exit(), u = 1)), s === d.promise ? f(Ec("Promise-chain cycle")) : (c = Uc(s)) ? c.call(s, p, f) : p(s)) :
								f(i)
						} catch (cp) {
							h && !u && h.exit(), f(cp)
						}
					}
					t.reactions = [], t.notified = 0, n && !t.rejection && Bc(e, t)
				})
			}
		},
		Gc = function(e, t, n) {
			var r, i;
			Mc ? ((r = Ic.createEvent("Event")).promise = t, r.reason = n, r.initEvent(e, 0, 1), s.dispatchEvent(r)) : r = {
				promise: t,
				reason: n
			}, (i = s["on" + e]) ? i(r) : "unhandledrejection" === e && function(e, t) {
				var n = s.console;
				n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
			}("Unhandled promise rejection", n)
		},
		Bc = function(e, t) {
			Sc.call(s, function() {
				var n, r = t.value;
				if (Hc(t) && (n = yc(function() {
						Nc ? Pc.emit("unhandledRejection", r, e) : Gc("unhandledrejection", e, r)
					}), t.rejection = Nc || Hc(t) ? 2 : 1, n.error)) throw n.value
			})
		},
		Hc = function(e) {
			return 1 !== e.rejection && !e.parent
		},
		zc = function(e, t) {
			Sc.call(s, function() {
				Nc ? Pc.emit("rejectionHandled", e) : Gc("rejectionhandled", e, t.value)
			})
		},
		Wc = function(e, t, n, r) {
			return function(i) {
				e(t, n, i, r)
			}
		},
		Jc = function(e, t, n, r) {
			t.done || (t.done = 1, r && (t = r), t.value = n, t.state = 2, Fc(e, t, 1))
		},
		qc = function(e, t, n, r) {
			if (!t.done) {
				t.done = 1, r && (t = r);
				try {
					if (e === n) throw Ec("Promise can't be resolved itself");
					var i = Uc(n);
					i ? mc(function() {
						var r = {
							done: 0
						};
						try {
							i.call(n, Wc(qc, e, r, t), Wc(Jc, e, r, t))
						} catch (cp) {
							Jc(e, r, cp, t)
						}
					}) : (t.value = n, t.state = 1, Fc(e, t, 0))
				} catch (cp) {
					Jc(e, {
						done: 0
					}, cp, t)
				}
			}
		};
	jc && (Tc = function(e) {
		ns(this, Tc, kc), ze(e), pc.call(this);
		var t = Cc(this);
		try {
			e(Wc(qc, this, t), Wc(Jc, this, t))
		} catch (cp) {
			Jc(this, t, cp)
		}
	}, (pc = function(e) {
		wc(this, {
			type: kc,
			done: 0,
			notified: 0,
			parent: 0,
			reactions: [],
			rejection: 0,
			state: 0,
			value: void 0
		})
	}).prototype = us(Tc.prototype, {
		then: function(e, t) {
			var n = Rc(this),
				r = Dc(Br(this, Tc));
			return r.ok = "function" == typeof e ? e : 1, r.fail = "function" == typeof t && t, r.domain = Nc ? Pc.domain :
				void 0, n.parent = 1, n.reactions.push(r), 0 != n.state && Fc(this, n, 0), r.promise
		},
		catch: function(e) {
			return this.then(void 0, e)
		}
	}), fc = function() {
		var e = new pc,
			t = Cc(e);
		this.promise = e, this.resolve = Wc(qc, e, t), this.reject = Wc(Jc, e, t)
	}, gc.f = Dc = function(e) {
		return e === Tc || e === hc ? new fc(e) : Lc(e)
	}, "function" == typeof xc && Ie({
		global: 1,
		enumerable: 1,
		forced: 1
	}, {
		fetch: function(e) {
			return _c(Tc, xc.apply(s, arguments))
		}
	})), Ie({
		global: 1,
		wrap: 1,
		forced: jc
	}, {
		Promise: Tc
	}), Bo(Tc, kc, 0), ls(kc), hc = Z.Promise, Ie({
		target: kc,
		stat: 1,
		forced: jc
	}, {
		reject: function(e) {
			var t = Dc(this);
			return t.reject.call(void 0, e), t.promise
		}
	}), Ie({
		target: kc,
		stat: 1,
		forced: jc
	}, {
		resolve: function(e) {
			return _c(this, e)
		}
	}), Ie({
		target: kc,
		stat: 1,
		forced: Vc
	}, {
		all: function(e) {
			var t = this,
				n = Dc(t),
				r = n.resolve,
				i = n.reject,
				o = yc(function() {
					var n = ze(t.resolve),
						o = [],
						a = 0,
						s = 1;
					ts(e, function(e) {
						var c = a++,
							u = 0;
						o.push(void 0), s++, n.call(t, e).then(function(e) {
							u || (u = 1, o[c] = e, --s || r(o))
						}, i)
					}), --s || r(o)
				});
			return o.error && i(o.value), n.promise
		},
		race: function(e) {
			var t = this,
				n = Dc(t),
				r = n.reject,
				i = yc(function() {
					var i = ze(t.resolve);
					ts(e, function(e) {
						i.call(t, e).then(n.resolve, r)
					})
				});
			return i.error && r(i.value), n.promise
		}
	});
	var Kc = xr.charAt,
		$c = Q.set,
		Yc = Q.getterFor("String Iterator");
	Wa(String, "String", function(e) {
		$c(this, {
			type: "String Iterator",
			string: String(e),
			index: 0
		})
	}, function() {
		var e, t = Yc(this),
			n = t.string,
			r = t.index;
		return r >= n.length ? {
			value: void 0,
			done: 1
		} : (e = Kc(n, r), t.index += e.length, {
			value: e,
			done: 0
		})
	});
	var Qc = function(e) {
			if (Fr(e)) throw TypeError("The method doesn't accept regular expressions");
			return e
		},
		Xc = Ne("match"),
		Zc = "".startsWith,
		eu = Math.min;
	Ie({
		target: "String",
		proto: 1,
		forced: ! function(e) {
			var t = /./;
			try {
				"/./" [e](t)
			} catch (n) {
				try {
					return t[Xc] = 0, "/./" [e](t)
				} catch (r) {}
			}
			return 0
		}("startsWith")
	}, {
		startsWith: function(e) {
			var t = String(_(this));
			Qc(e);
			var n = ae(eu(arguments.length > 1 ? arguments[1] : void 0, t.length)),
				r = String(e);
			return Zc ? Zc.call(t, r, n) : t.slice(n, n + r.length) === r
		}
	});
	var tu = {
		CSSRuleList: 0,
		CSSStyleDeclaration: 0,
		CSSValueList: 0,
		ClientRectList: 0,
		DOMRectList: 0,
		DOMStringList: 0,
		DOMTokenList: 1,
		DataTransferItemList: 0,
		FileList: 0,
		HTMLAllCollection: 0,
		HTMLCollection: 0,
		HTMLFormElement: 0,
		HTMLSelectElement: 0,
		MediaList: 0,
		MimeTypeArray: 0,
		NamedNodeMap: 0,
		NodeList: 1,
		PaintRequestList: 0,
		Plugin: 0,
		PluginArray: 0,
		SVGLengthList: 0,
		SVGNumberList: 0,
		SVGPathSegList: 0,
		SVGPointList: 0,
		SVGStringList: 0,
		SVGTransformList: 0,
		SourceBufferList: 0,
		StyleSheetList: 0,
		TextTrackCueList: 0,
		TextTrackList: 0,
		TouchList: 0
	};
	for (var nu in tu) {
		var ru = s[nu],
			iu = ru && ru.prototype;
		if (iu && iu.forEach !== Ea) try {
			D(iu, "forEach", Ea)
		} catch (cp) {
			iu.forEach = Ea
		}
	}
	var ou = Ne("iterator"),
		au = Ne("toStringTag"),
		su = Ka.values;
	for (var cu in tu) {
		var uu = s[cu],
			du = uu && uu.prototype;
		if (du) {
			if (du[ou] !== su) try {
				D(du, ou, su)
			} catch (cp) {
				du[ou] = su
			}
			if (du[au] || D(du, au, cu), tu[cu])
				for (var lu in Ka)
					if (du[lu] !== Ka[lu]) try {
						D(du, lu, Ka[lu])
					} catch (cp) {
						du[lu] = Ka[lu]
					}
		}
	}
	var pu = c(function() {
		To(1)
	});
	Ie({
		target: "Object",
		stat: 1,
		forced: pu
	}, {
		keys: function(e) {
			return To(xe(e))
		}
	});
	var fu = p.f,
		hu = function(e) {
			return function(t) {
				for (var n, r = y(t), i = To(r), o = i.length, a = 0, s = []; o > a;) n = i[a++], u && !fu.call(r, n) || s.push(e ?
					[n, r[n]] : r[n]);
				return s
			}
		},
		mu = {
			entries: hu(1),
			values: hu(0)
		}.values;
	Ie({
		target: "Object",
		stat: 1
	}, {
		values: function(e) {
			return mu(e)
		}
	});
	var vu = Object.prototype.hasOwnProperty,
		gu = Object.prototype.toString;

	function _u(e) {
		if (null == e) return 1;
		if ("boolean" == typeof e) return 0;
		if ("number" == typeof e) return 0 === e;
		if ("string" == typeof e) return 0 === e.length;
		if ("function" == typeof e) return 0 === e.length;
		if (Array.isArray(e)) return 0 === e.length;
		if (e instanceof Error) return "" === e.message;
		if (e.toString == gu) switch (e.toString()) {
			case "[object File]":
			case "[object Map]":
			case "[object Set]":
				return 0 === e.size;
			case "[object Object]":
				for (var t in e)
					if (vu.call(e, t)) return 0;
				return 1
		}
		return 0
	}
	var yu = t(function(e) {
			var t = Object.prototype.hasOwnProperty,
				n = "~";

			function r() {}

			function i(e, t, n) {
				this.fn = e, this.context = t, this.once = n || 0
			}

			function o(e, t, r, o, a) {
				if ("function" != typeof r) throw new TypeError("The listener must be a function");
				var s = new i(r, o || e, a),
					c = n ? n + t : t;
				return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] =
					s, e._eventsCount++), e
			}

			function a(e, t) {
				0 == --e._eventsCount ? e._events = new r : delete e._events[t]
			}

			function s() {
				this._events = new r, this._eventsCount = 0
			}
			Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (n = 0)), s.prototype.eventNames =
				function() {
					var e, r, i = [];
					if (0 === this._eventsCount) return i;
					for (r in e = this._events) t.call(e, r) && i.push(n ? r.slice(1) : r);
					return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(e)) : i
				}, s.prototype.listeners = function(e) {
					var t = n ? n + e : e,
						r = this._events[t];
					if (!r) return [];
					if (r.fn) return [r.fn];
					for (var i = 0, o = r.length, a = new Array(o); i < o; i++) a[i] = r[i].fn;
					return a
				}, s.prototype.listenerCount = function(e) {
					var t = n ? n + e : e,
						r = this._events[t];
					return r ? r.fn ? 1 : r.length : 0
				}, s.prototype.emit = function(e, t, r, i, o, a) {
					var s = n ? n + e : e;
					if (!this._events[s]) return 0;
					var c, u, d = this._events[s],
						l = arguments.length;
					if (d.fn) {
						switch (d.once && this.removeListener(e, d.fn, void 0, 1), l) {
							case 1:
								return d.fn.call(d.context), 1;
							case 2:
								return d.fn.call(d.context, t), 1;
							case 3:
								return d.fn.call(d.context, t, r), 1;
							case 4:
								return d.fn.call(d.context, t, r, i), 1;
							case 5:
								return d.fn.call(d.context, t, r, i, o), 1;
							case 6:
								return d.fn.call(d.context, t, r, i, o, a), 1
						}
						for (u = 1, c = new Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
						d.fn.apply(d.context, c)
					} else {
						var p, f = d.length;
						for (u = 0; u < f; u++) switch (d[u].once && this.removeListener(e, d[u].fn, void 0, 1), l) {
							case 1:
								d[u].fn.call(d[u].context);
								break;
							case 2:
								d[u].fn.call(d[u].context, t);
								break;
							case 3:
								d[u].fn.call(d[u].context, t, r);
								break;
							case 4:
								d[u].fn.call(d[u].context, t, r, i);
								break;
							default:
								if (!c)
									for (p = 1, c = new Array(l - 1); p < l; p++) c[p - 1] = arguments[p];
								d[u].fn.apply(d[u].context, c)
						}
					}
					return 1
				}, s.prototype.on = function(e, t, n) {
					return o(this, e, t, n, 0)
				}, s.prototype.once = function(e, t, n) {
					return o(this, e, t, n, 1)
				}, s.prototype.removeListener = function(e, t, r, i) {
					var o = n ? n + e : e;
					if (!this._events[o]) return this;
					if (!t) return a(this, o), this;
					var s = this._events[o];
					if (s.fn) s.fn !== t || i && !s.once || r && s.context !== r || a(this, o);
					else {
						for (var c = 0, u = [], d = s.length; c < d; c++)(s[c].fn !== t || i && !s[c].once || r && s[c].context !== r) &&
							u.push(s[c]);
						u.length ? this._events[o] = 1 === u.length ? u[0] : u : a(this, o)
					}
					return this
				}, s.prototype.removeAllListeners = function(e) {
					var t;
					return e ? (t = n ? n + e : e, this._events[t] && a(this, t)) : (this._events = new r, this._eventsCount = 0),
						this
				}, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = n, s.EventEmitter =
				s, e.exports = s
		}),
		Su = "connection-state-changed",
		bu = "error",
		ku = {
			DISCONNECTED: "DISCONNECTED",
			CONNECTING: "CONNECTING",
			RECONNECTING: "RECONNECTING",
			CONNECTED: "CONNECTED"
		},
		Cu = {
			NEW_REMOTE_SDP: 2,
			NEW_ICE_CANDIDATE: 4,
			CLINET_BANNDED: 8,
			CHANNEL_SETUP_SUCCESS: 19,
			CHANNEL_SETUP_FAILED: 80,
			CHANNEL_RECONNECT_FAILED: 514,
			JOIN_ROOM_RESULT: 20,
			PEER_JOIN: 16,
			PEER_LEAVE: 18,
			UPDATE_REMOTE_SDP: 48,
			UPDATE_AUDIO_SSRC: 50,
			UPDATE_VIDEO_SSRC: 52,
			UPDATE_REMOTE_MUTE_STAT: 23,
			CLOSE_PEER_ACK: 10,
			SUBSCRIBE_ACK: 26
		},
		wu = {
			NEW_REMOTE_SDP: "new-remote-sdp",
			NEW_ICE_CANDIDATE: "new-ice-candidate",
			CLINET_BANNDED: "client-banned",
			CHANNEL_SETUP_SUCCESS: "channel-setup-success",
			CHANNEL_SETUP_FAILED: "channel-setup-failed",
			CHANNEL_RECONNECT_FAILED: "channel-reconnect-failed",
			JOIN_ROOM_RESULT: "join-room-result",
			PEER_JOIN: "peer-join",
			PEER_LEAVE: "peer-leave",
			UPDATE_REMOTE_SDP: "update-remote-sdp",
			UPDATE_AUDIO_SSRC: "update-audio-ssrc",
			UPDATE_VIDEO_SSRC: "update-video-ssrc",
			UPDATE_REMOTE_MUTE_STAT: "update-remote-mute-stat",
			CLOSE_PEER_ACK: "close-peer-ack",
			SUBSCRIBE_ACK: "subscribe-ack",
			REQUEST_REBUILD_SESSION: "request-rebuild-session"
		},
		Ru = "on_peer_sdp",
		Tu = "on_reexchange_sdp",
		Eu = "on_peer_candidate",
		Iu = "on_create_room",
		Pu = "on_close_peer",
		xu = "on_quality_report",
		Au = "on_rebuild_session",
		Ou = "on_change_av_state",
		Du = "on_subscribe",
		Lu = "on_constraints_config",
		Nu = "on_test_ws_broken",
		Mu = {
			INVALID_PARAMETER: 4096,
			INVALID_OPERATION: 4097,
			SIGNAL_CAHNNEL_SETUP_FAILED: 16385,
			SIGNAL_CHANNEL_ERROR: 16386,
			ICE_TRANSPORT_ERROR: 16387,
			JOIN_ROOM_FAILED: 16388,
			CREATE_OFFER_FAILED: 16389,
			CLIENT_BANNED: 16448,
			SERVER_TIMEOUT: 16449,
			SUBSCRIPTION_TIMEOUT: 16450,
			PLAY_NOT_ALLOWED: 16451,
			UNKOWN: 65535
		},
		ju = function(e) {
			function t(e) {
				var n, r = e.message,
					i = e.code,
					o = void 0 === i ? Mu.UNKOWN : i;
				return et(this, t), (n = dt(this, at(t).call(this, r))).code_ = o, n.name = "RtcError", n
			}
			return ot(t, ut(Error)), nt(t, [{
				key: "getCode",
				value: function() {
					return this.code_
				}
			}]), t
		}(),
		Vu = O.f,
		Uu = ve.f,
		Fu = Ne("match"),
		Gu = s.RegExp,
		Bu = Gu.prototype,
		Hu = /a/g,
		zu = /a/g,
		Wu = new Gu(Hu) !== Hu;
	if (u && Te("RegExp", !Wu || c(function() {
			return zu[Fu] = 0, Gu(Hu) != Hu || Gu(zu) == zu || "/a/i" != Gu(Hu, "i")
		}))) {
		for (var Ju = function(e, t) {
				var n = this instanceof Ju,
					r = Fr(e),
					i = void 0 === t;
				return !n && r && e.constructor === Ju && i ? e : cs(Wu ? new Gu(r && !i ? e.source : e, t) : Gu((r = e instanceof Ju) ?
					e.source : e, r && i ? Mn.call(e) : t), n ? this : Bu, Ju)
			}, qu = function(e) {
				e in Ju || Vu(Ju, e, {
					configurable: 1,
					get: function() {
						return Gu[e]
					},
					set: function(t) {
						Gu[e] = t
					}
				})
			}, Ku = Uu(Gu), $u = 0; Ku.length > $u;) qu(Ku[$u++]);
		Bu.constructor = Ju, Ju.prototype = Bu, X(s, "RegExp", Ju)
	}
	ls("RegExp"), Ir("match", 1, function(e, t, n) {
		return [function(t) {
			var n = _(this),
				r = null == t ? void 0 : t[e];
			return void 0 !== r ? r.call(t, n) : new RegExp(t)[e](String(n))
		}, function(e) {
			var r = n(t, e, this);
			if (r.done) return r.value;
			var i = x(e),
				o = String(this);
			if (!i.global) return Dr(i, o);
			var a = i.unicode;
			i.lastIndex = 0;
			for (var s, c = [], u = 0; null !== (s = Dr(i, o));) {
				var d = String(s[0]);
				c[u] = d, "" === d && (i.lastIndex = Or(o, ae(i.lastIndex), a)), u++
			}
			return 0 === u ? null : c
		}]
	});
	var Yu = Object.is || function(e, t) {
		return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
	};
	Ir("search", 1, function(e, t, n) {
		return [function(t) {
			var n = _(this),
				r = null == t ? void 0 : t[e];
			return void 0 !== r ? r.call(t, n) : new RegExp(t)[e](String(n))
		}, function(e) {
			var r = n(t, e, this);
			if (r.done) return r.value;
			var i = x(e),
				o = String(this),
				a = i.lastIndex;
			Yu(a, 0) || (i.lastIndex = 0);
			var s = Dr(i, o);
			return Yu(i.lastIndex, a) || (i.lastIndex = a), null === s ? -1 : s.index
		}]
	});
	var Qu = function(e) {
			var t = window.location.search.match(new RegExp("(\\?|&)" + e + "=([^&]*)(&|$)"));
			return t ? decodeURIComponent(t[2]) : ""
		},
		Xu = function() {
			return Qu("trtc_env")
		},
		Zu = function(e) {
			var t = e,
				n = Qu("trtc_env");
			return n && (t = "wss://" + n + ".rtc.qq.com:8687"), t
		},
		ed = {
			sdkAppId: "",
			userId: "",
			version: "",
			env: "qcloud"
		},
		td = function(e) {
			ed.sdkAppId = "".concat(e.sdkAppId), ed.version = "".concat(e.version), ed.env = e.env, ed.userId = e.userId
		},
		nd = function(e) {
			"qcloud" === ed.env && function(e) {
				var t = JSON.stringify({
					timestamp: (new Date).toISOString(),
					sdkAppId: ed.sdkAppId,
					userId: ed.userId,
					version: ed.version,
					log: "stat-".concat(e.eventType, "-").concat(e.result)
				});
				io.post("https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_log", t).then(function(e) {}).catch(
					function(e) {
						console.log(e)
					})
			}(e);
			var t = it({}, e, ed);
			io.post("https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_event", JSON.stringify(t)).then(
				function(e) {}).catch(function(e) {
				console.log(e)
			})
		},
		rd = 3,
		id = function() {
			function e(t) {
				et(this, e), this.sdkAppId_ = t.sdkAppId, this.userId_ = t.userId, this.userSig_ = t.userSig, this.url_ = t.url,
					this.backupUrl_ = t.backupUrl, this.version_ = t.version, this.urlWithParam_ = "".concat(this.url_, "?sdkAppid=")
					.concat(this.sdkAppId_, "&identifier=").concat(this.userId_, "&userSig=").concat(this.userSig_), this.backupUrlWithParam_ =
					"".concat(this.backupUrl_, "?sdkAppid=").concat(this.sdkAppId_, "&identifier=").concat(this.userId_, "&userSig=")
					.concat(this.userSig_), this.isConnected_ = 0, this.isConnecting_ = 0, this.tryCount_ = rd, this.socketInUse_ =
					null, this.socket_ = null, this.backupSocket_ = null, this.backupTimer_ = -1, this.reconnectTimer_ = -1, this.signalInfo_ = {},
					this.currentState_ = ku.DISCONNECTED, this.emitter_ = new yu
			}
			return nt(e, [{
				key: "connect",
				value: function() {
					var e = this;
					Hn.info("connect to url: ".concat(this.urlWithParam_)), this.emitter_.emit(Su, {
						prevState: this.currentState_,
						state: ku.CONNECTING
					}), this.currentState_ = ku.CONNECTING, this.socket_ = new WebSocket(this.urlWithParam_), this.bindSocket(
						this.socket_), this.backupTimer_ = setTimeout(function() {
						e.isConnected_ || (Hn.info("trying to connect to backupUrl"), e.tryConnectBackup())
					}, 1e3)
				}
			}, {
				key: "tryConnectBackup",
				value: function() {
					this.backupSocket_ || (Hn.debug("try to connect to url: ".concat(this.backupUrlWithParam_)), this.backupSocket_ =
						new WebSocket(this.backupUrlWithParam_), this.bindSocket(this.backupSocket_))
				}
			}, {
				key: "bindSocket",
				value: function(e) {
					e.onopen = this.onopen.bind(this), e.onclose = this.onclose.bind(this), e.onerror = this.onerror.bind(this),
						e.onmessage = this.onmessage.bind(this)
				}
			}, {
				key: "unbindSocket",
				value: function(e) {
					e.onopen = function() {}, e.onclose = function() {}, e.onerror = function() {}, e.onmessage = function() {}
				}
			}, {
				key: "unbindAndCloseSocket",
				value: function(e) {
					if ("main" === e) {
						if (this.socket_) {
							this.unbindSocket(this.socket_);
							try {
								this.socket_.close(1e3)
							} catch (t) {}
							this.socket_ = null
						}
					} else if (this.backupSocket_) {
						this.unbindSocket(this.backupSocket_);
						try {
							this.backupSocket_.close(1e3)
						} catch (t) {}
						this.backupSocket_ = null
					}
				}
			}, {
				key: "clearBackupTimer",
				value: function() {
					-1 !== this.backupTimer_ && (clearTimeout(this.backupTimer_), this.backupTimer_ = -1)
				}
			}, {
				key: "onopen",
				value: function(e) {
					if (!this.isConnected_) {
						this.isConnecting_ ? nd({
							eventType: "websocketReconnectionState",
							result: "success"
						}) : nd({
							eventType: "websocketConnectionState",
							result: "success"
						}), this.isConnected_ = 1, this.isConnecting_ = 0, this.clearBackupTimer(), e.target === this.socket_ ? (
							this.unbindAndCloseSocket("backup"), this.socketInUse_ = this.socket_) : (this.unbindAndCloseSocket("main"),
							this.socketInUse_ = this.backupSocket_);
						var t = e.target.url;
						Hn.info("[".concat(this.userId_, "] websocket[").concat(t, "] is connected")), this.emitter_.emit(Su, {
							prevState: this.currentState_,
							state: ku.CONNECTED
						}), this.currentState_ = ku.CONNECTED
					}
				}
			}, {
				key: "onclose",
				value: function(e) {
					var t = e.target.url,
						n = e.target === this.socketInUse_;
					Hn.info("[".concat(this.userId_, "] websocket[").concat(t, " InUse: ").concat(n, "] is closed with code: ").concat(
						e.code)), e.target === this.socketInUse_ && (this.isConnected_ = 0, !e.wasClean || 1e3 !== e.code && 1005 !==
						e.code ? (Hn.warn("[".concat(this.userId_, "] onclose code:").concat(e.code, " reason:").concat(e.reason)),
							this.isConnecting_ && this.tryCount_ <= 0 ? (this.isConnecting_ = 0, this.tryCount_ = rd, Hn.error("[".concat(
								this.userId_, "] reconnect failed")), this.emitter_.emit(Su, {
								prevState: this.currentState_,
								state: ku.DISCONNECTED
							}), this.currentState_ = ku.DISCONNECTED, nd({
								eventType: "websocketReconnectionState",
								result: "failed"
							}), this.emitter_.emit(bu, new ju({
								code: Mu.SIGNAL_CHANNEL_ERROR,
								message: "WebSocket reconnection failed"
							}))) : (Hn.warn("close current websocket and schedule a reconnect timeout"), this.socketInUse_.onclose =
								function() {}, this.socketInUse_.close(4011), this.socket_ = this.backupSocket_ = this.socketInUse_ =
								null, this.reconnect(t))) : (this.emitter_.emit(Su, {
							prevState: this.currentState_,
							state: ku.DISCONNECTED
						}), this.currentState_ = ku.DISCONNECTED))
				}
			}, {
				key: "onerror",
				value: function(e) {
					var t = e.target.url;
					Hn.error("[".concat(this.userId_, "] websocket[").concat(t, "] error observed")), this.isConnected_ ? e.target ===
						this.socketInUse_ && (this.isConnected_ = 0, this.unbindAndCloseSocket("main"), this.unbindAndCloseSocket(
							"backup"), this.socketInUse_ = null, this.emitter_.emit(bu, new ju({
							code: Mu.SIGNAL_CHANNEL_ERROR,
							message: "WebSocket error observed"
						}))) : (e.target == this.socket_ ? (this.unbindAndCloseSocket("main"), this.isConnecting_ || (Hn.warn(
							"main socket error observed, try connecting to backup domain"), this.tryConnectBackup())) : this.unbindAndCloseSocket(
							"backup"), null === this.socket_ && null === this.backupSocket_ && (this.isConnecting_ ? nd({
							eventType: "websocketReconnectionState",
							result: "failed"
						}) : nd({
							eventType: "websocketConnectionState",
							result: "failed"
						}), Hn.error("SignalChannel setup failed"), this.emitter_.emit(bu, new ju({
							code: Mu.SIGNAL_CHANNEL_ERROR,
							message: "failed to connect to remote server via websocket"
						}))))
				}
			}, {
				key: "onmessage",
				value: function(e) {
					var t = this;
					if (this.isConnected_) {
						var n = JSON.parse(e.data),
							r = n.cmd,
							i = n.content,
							o = Object.values(Cu),
							a = Object.keys(Cu)[o.indexOf(r)],
							s = wu[a];
						if (r !== Cu.UPDATE_REMOTE_MUTE_STAT) {
							var c = e.target == this.socket_ ? this.url_ : this.backupUrl_;
							Hn.info("[".concat(this.userId_, "] websocket[").concat(c, "] received message: ").concat(e.data)), Hn.info(
								"[".concat(this.userId_, "] Received event: [ ").concat(s, " ]"))
						}
						switch (r) {
							case Cu.CHANNEL_SETUP_SUCCESS:
								this.signalInfo_.relayIp = i.relayip, this.signalInfo_.relayInnerIp = i.innerip, this.signalInfo_.signalIp =
									i.signalip, this.signalInfo_.localIp = i.localip, this.signalInfo_.dataPort = i.dataport, this.signalInfo_
									.stunPort = i.stunport, this.signalInfo_.checkSigSeq = i.checkSigSeq, this.signalInfo_.socketId = i.socketid,
									this.signalInfo_.tinyId = i.tinyid, this.signalInfo_.openId = i.openid, this.signalInfo_.stunPortList = i
									.stunportList, !i.stunportList || i.stunportList.length <= 0 ? this.signalInfo_.stunServers = "stun:" + i
									.relayip + ":" + i.stunport : (this.signalInfo_.stunServers = [], i.stunportList.forEach(function(e) {
										var n = "stun:" + i.relayip + ":" + e;
										t.signalInfo_.stunServers.push(n)
									})), i.cgiurl && (this.signalInfo_.logCgiUrl = i.cgiurl), Hn.info("ChannelSetup Success: signalIp:".concat(
										i.signalip, " relayIp:").concat(i.relayip, " stunPort:").concat(i.stunport)), 1 === (i.rc || 0) ? this.emitter_
									.emit(wu.REQUEST_REBUILD_SESSION, {
										signalInfo: this.signalInfo_
									}) : this.emitter_.emit(s, {
										signalInfo: this.signalInfo_
									});
								break;
							case Cu.CHANNEL_SETUP_FAILED:
								var u = "sdkAppId invalid",
									d = "";
								void 0 !== i.errorCode && (u = i.errorCode, d = i.errorMsg), this.emitter_.emit(bu, new ju({
									code: Mu.CHANNEL_SETUP_FAILED,
									message: "SignalChannel setup failure: ('errorCode': ".concat(u, ", 'errorMsg': ").concat(d, " })")
								}));
								break;
							default:
								this.emitter_.emit(s, {
									data: n
								})
						}
					}
				}
			}, {
				key: "reconnect",
				value: function(e) {
					var t = this;
					this.reconnectTimer_ = setTimeout(function() {
						t.isConnecting_ = 1, t.tryCount_ -= 1;
						var n = e;
						_u(t.signalInfo_) || -1 !== e.indexOf("&rc=1") || (n = e + "&iip=" + t.signalInfo_.relayInnerIp + "&dp=" +
								t.signalInfo_.dataPort + "&oip=" + t.signalInfo_.relayIp + "&sp=" + t.signalInfo_.stunPort + "&rc=1"), t
							.emitter_.emit(Su, {
								prevState: t.currentState_,
								state: ku.RECONNECTING
							}), t.currentState_ = ku.RECONNECTING, t.socket_ = new WebSocket(n), t.bindSocket(t.socket_)
					}, 3e3)
				}
			}, {
				key: "send",
				value: function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
						n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
					if (this.isConnected_) {
						var r = this.createSendMessage(e);
						r.data = t, void 0 !== n && (r.srctinyid = n), this.socketInUse_.send(JSON.stringify(r))
					}
				}
			}, {
				key: "createSendMessage",
				value: function(e) {
					return {
						tag_key: e,
						data: "",
						openid: this.userId_,
						tinyid: this.signalInfo_.tinyId,
						version: this.version_,
						ua: navigator.userAgent,
						useStrRoomid: 0
					}
				}
			}, {
				key: "close",
				value: function() {
					Hn.info("close SignalChannel"), -1 !== this.reconnectTimer_ && (clearTimeout(this.reconnectTimer_), this.reconnectTimer_ = -
						1), this.clearBackupTimer(), this.isConnected_ = 0, this.socketInUse_ = null, this.unbindAndCloseSocket(
						"main"), this.unbindAndCloseSocket("backup")
				}
			}, {
				key: "on",
				value: function(e, t, n) {
					this.emitter_.on(e, t, n)
				}
			}, {
				key: "removeListener",
				value: function(e, t, n) {
					this.emitter_.removeListener(e, t, n)
				}
			}, {
				key: "once",
				value: function(e, t) {
					this.emitter_.once(e, t)
				}
			}]), e
		}(),
		od = bs.trim,
		ad = s.parseFloat,
		sd = 1 / ad(vs + "-0") != -Infinity ? function(e) {
			var t = od(String(e)),
				n = ad(t);
			return 0 === n && "-" == t.charAt(0) ? -0 : n
		} : ad;
	Ie({
		global: 1,
		forced: parseFloat != sd
	}, {
		parseFloat: sd
	});
	var cd, ud, dd = window.navigator && window.navigator.userAgent || "",
		ld = /AppleWebKit\/([\d.]+)/i.exec(dd),
		pd = (ld && parseFloat(ld.pop()), /iPad/i.test(dd)),
		fd = /iPhone/i.test(dd) && !pd,
		hd = /iPod/i.test(dd),
		md = fd || pd || hd,
		vd = ((cd = dd.match(/OS (\d+)_/i)) && cd[1] && cd[1], /Android/i.test(dd)),
		gd = function() {
			var e = dd.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
			if (!e) return null;
			var t = e[1] && parseFloat(e[1]),
				n = e[2] && parseFloat(e[2]);
			return t && n ? parseFloat(e[1] + "." + e[2]) : t || null
		}(),
		_d = (vd && /webkit/i.test(dd), /Firefox/i.test(dd)),
		yd = /Edge/i.test(dd),
		Sd = !yd && /Chrome/i.test(dd),
		bd = (function() {
			var e = dd.match(/Chrome\/(\d+)/);
			e && e[1] && parseFloat(e[1])
		}(), function() {
			var e = dd.match(/Chrome\/([\d.]+)/);
			return e && e[1] ? e[1] : null
		}()),
		kd = (/MSIE\s8\.0/.test(dd), function() {
			var e = /MSIE\s(\d+)\.\d/.exec(dd),
				t = e && parseFloat(e[1]);
			!t && /Trident\/7.0/i.test(dd) && /rv:11.0/.test(dd) && (t = 11)
		}(), /Safari/i.test(dd) && !Sd && !vd && !yd),
		Cd = function() {
			var e = dd.match(/Version\/([\d.]+)/);
			return e && e[1] ? e[1] : null
		}(),
		wd = /TBS\/\d+/i.test(dd),
		Rd = (function() {
				var e = dd.match(/TBS\/(\d+)/i);
				if (e && e[1]) e[1]
			}(), !wd && /MQQBrowser\/\d+/i.test(dd), !wd && / QQBrowser\/\d+/i.test(dd), /(micromessenger|webbrowser)/i.test(dd),
			/Windows/i.test(dd), /MAC OS X/i.test(dd), /MicroMessenger/i.test(dd), Sd ? "Chrome/" + bd : kd ? "Safari/" + Cd :
			"NotSupportedBrowser");
	window.addEventListener("message", function(e) {
		e.origin == window.location.origin && function(e) {
			if ("PermissionDeniedError" == e) {
				if (ud) return ud("PermissionDeniedError");
				throw new Error("PermissionDeniedError")
			}
			e.sourceId && ud && ud(e.sourceId, 1 == e.canRequestAudioTrack)
		}(e.data)
	});
	window.InstallTrigger;
	var Td = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
		Ed = (window.chrome, function() {
			var e = 0;
			return ["RTCPeerConnection", "webkitRTCPeerConnection", "RTCIceGatherer"].forEach(function(t) {
				t in window && (e = 1)
			}), e
		}),
		Id = function() {
			var e = Ze(regeneratorRuntime.mark(function e() {
				var t, n;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return t = new RTCPeerConnection, "", n = 0, e.prev = 3, e.next = 6, t.createOffer({
								offerToReceiveAudio: 1,
								offerToReceiveVideo: 1
							});
						case 6:
							-1 !== e.sent.sdp.toLowerCase().indexOf("h264") && (n = 1), e.next = 12;
							break;
						case 10:
							e.prev = 10, e.t0 = e.catch(3);
						case 12:
							return t.close(), e.abrupt("return", n);
						case 14:
						case "end":
							return e.stop()
					}
				}, e, null, [
					[3, 10]
				])
			}));
			return function() {
				return e.apply(this, arguments)
			}
		}(),
		Pd = function() {
			if ("undefined" == typeof RTCRtpTransceiver) return 0;
			if (!("currentDirection" in RTCRtpTransceiver.prototype)) return 0;
			var e = new RTCPeerConnection,
				t = 0;
			try {
				e.addTransceiver("audio"), t = 1
			} catch (n) {}
			return e.close(), t
		},
		xd = 1,
		Ad = 2,
		Od = 20,
		Dd = 21,
		Ld = "5Y2wZK8nANNAoVw6dSAHVjNxrD1ObBM2kBPV",
		Nd = "224d130c-7b5c-415b-aaa2-79c2eb5a6df2",
		Md = 2,
		jd = 7,
		Vd = Ke.find,
		Ud = 1;
	"find" in [] && Array(1).find(function() {
		Ud = 0
	}), Ie({
		target: "Array",
		proto: 1,
		forced: Ud
	}, {
		find: function(e) {
			return Vd(this, e, arguments.length > 1 ? arguments[1] : void 0)
		}
	}), Da("find");
	var Fd = function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
				var t = 16 * Math.random() | 0;
				return ("x" == e ? t : 3 & t | 8).toString(16)
			})
		},
		Gd = "stream-added",
		Bd = "stream-removed",
		Hd = "stream-updated",
		zd = "stream-published",
		Wd = "stream-subscribed",
		Jd = "stream-unsubscribed",
		qd = "error",
		Kd = "stream-added",
		$d = "stream-removed",
		Yd = "stream-updated",
		Qd = "stream-subscribed",
		Xd = "connection-state-changed",
		Zd = "peer-join",
		el = "peer-leave",
		tl = "mute-audio",
		nl = "mute-video",
		rl = "unmute-audio",
		il = "unmute-video",
		ol = "client-banned",
		al = "error",
		sl = "player-state-changed",
		cl = "screen-sharing-stopped",
		ul = "player-state-changed",
		dl = 1..toFixed,
		ll = Math.floor,
		pl = function(e, t, n) {
			return 0 === t ? n : t % 2 == 1 ? pl(e, t - 1, n * e) : pl(e * e, t / 2, n)
		},
		fl = dl && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) ||
			"1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !c(function() {
			dl.call({})
		});
	Ie({
		target: "Number",
		proto: 1,
		forced: fl
	}, {
		toFixed: function(e) {
			var t, n, r, i, o = function(e) {
					if ("number" != typeof e && "Number" != m(e)) throw TypeError("Incorrect invocation");
					return +e
				}(this),
				a = ie(e),
				s = [0, 0, 0, 0, 0, 0],
				c = "",
				u = "0",
				d = function(e, t) {
					for (var n = -1, r = t; ++n < 6;) r += e * s[n], s[n] = r % 1e7, r = ll(r / 1e7)
				},
				l = function(e) {
					for (var t = 6, n = 0; --t >= 0;) n += s[t], s[t] = ll(n / e), n = n % e * 1e7
				},
				p = function() {
					for (var e = 6, t = ""; --e >= 0;)
						if ("" !== t || 0 === e || 0 !== s[e]) {
							var n = String(s[e]);
							t = "" === t ? n : t + Yn.call("0", 7 - n.length) + n
						} return t
				};
			if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");
			if (o != o) return "NaN";
			if (o <= -1e21 || o >= 1e21) return String(o);
			if (o < 0 && (c = "-", o = -o), o > 1e-21)
				if (n = (t = function(e) {
						for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
						for (; n >= 2;) t += 1, n /= 2;
						return t
					}(o * pl(2, 69, 1)) - 69) < 0 ? o * pl(2, -t, 1) : o / pl(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
					for (d(0, n), r = a; r >= 7;) d(1e7, 0), r -= 7;
					for (d(pl(10, r, 1), 0), r = t - 1; r >= 23;) l(1 << 23), r -= 23;
					l(1 << r), d(1, 1), l(2), u = p()
				} else d(0, n), d(1 << -t, 0), u = p() + Yn.call("0", a);
			return u = a > 0 ? c + ((i = u.length) <= a ? "0." + Yn.call("0", a - i) + u : u.slice(0, i - a) + "." + u.slice(
				i - a)) : c + u
		}
	});
	var hl = window.AudioContext || window.webkitAudioContext,
		ml = null,
		vl = function() {
			function e() {
				var t = this;
				et(this, e), ml || (ml = new hl), this.context_ = ml, this.instant_ = 0, this.slow_ = 0, this.clip_ = 0, this.script_ =
					this.context_.createScriptProcessor(2048, 1, 1), this.script_.onaudioprocess = function(e) {
						var n, r = e.inputBuffer.getChannelData(0),
							i = 0,
							o = 0;
						for (n = 0; n < r.length; ++n) i += r[n] * r[n], Math.abs(r[n]) > .99 && (o += 1);
						t.instant_ = Math.sqrt(i / r.length), t.slow_ = .95 * t.slow_ + .05 * t.instant_, t.clip_ = o / r.length
					}
			}
			return nt(e, [{
				key: "connectToSource",
				value: function(e, t) {
					try {
						var n = new MediaStream;
						n.addTrack(e), this.mic_ = this.context_.createMediaStreamSource(n), this.mic_.connect(this.script_), this.script_
							.connect(this.context_.destination), void 0 !== t && t(null)
					} catch (r) {
						Hn.error("soundMeter connectoToSource error: " + r), void 0 !== t && t(r)
					}
				}
			}, {
				key: "stop",
				value: function() {
					this.mic_.disconnect(), this.script_.disconnect()
				}
			}, {
				key: "getVolume",
				value: function() {
					return this.instant_.toFixed(2)
				}
			}]), e
		}(),
		gl = function() {
			function e(t) {
				et(this, e), this.stream_ = t.stream, this.userId_ = t.stream.getUserId(), this.log_ = this.stream_.getIDLogger(),
					this.track_ = t.track, this.div_ = t.div, this.muted_ = t.muted, this.outputDeviceId_ = t.outputDeviceId, this.volume_ =
					t.volume, this.element_ = null, this.emitter_ = new yu, this.state_ = "NONE", this.soundMeter_ = null
			}
			var t, n, r;
			return nt(e, [{
				key: "play",
				value: (r = Ze(regeneratorRuntime.mark(function e() {
					var t, n, r;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if ((t = new MediaStream).addTrack(this.track_), (n = document.createElement("audio")).srcObject = t,
									n.muted = this.muted_, n.setAttribute("id", "audio_".concat(this.stream_.getId())), n.setAttribute(
										"autoplay", "autoplay"), n.setAttribute("playsinline", "playsinline"), this.div_.appendChild(n), !
									this.outputDeviceId_) {
									e.next = 12;
									break
								}
								return e.next = 12, n.setSinkId(this.outputDeviceId_);
							case 12:
								return this.element_ = n, this.setVolume(this.volume_), this.handleEvents(), e.prev = 15, e.next =
									18, n.play();
							case 18:
								e.next = 26;
								break;
							case 20:
								if (e.prev = 20, e.t0 = e.catch(15), this.log_.warn("<audio> play() error: " + e.t0), !(r = e.t0.toString() +
										" <audio>").startsWith("NotAllowedError")) {
									e.next = 26;
									break
								}
								throw new ju({
									code: Mu.PLAY_NOT_ALLOWED,
									message: r
								});
							case 26:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[15, 20]
					])
				})), function() {
					return r.apply(this, arguments)
				})
			}, {
				key: "handleEvents",
				value: function() {
					var e = this;
					this.element_.addEventListener("playing", function(t) {
						e.log_.info("stream - audio player is starting playing"), e.state_ = "PLAYING", e.emitter_.emit(ul, {
							state: e.state_,
							reason: "playing"
						})
					}), this.element_.addEventListener("ended", function(t) {
						e.log_.info("stream - audio player is ended"), "STOPPED" !== e.state_ && (e.state_ = "STOPPED", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "ended"
							}))
					}), this.element_.addEventListener("pause", function(t) {
						e.log_.info("stream - audio player is paused"), e.state_ = "PAUSED", e.emitter_.emit(ul, {
							state: e.state_,
							reason: "pause"
						})
					}), this.track_.addEventListener("ended", function(t) {
						e.log_.info("stream - audio player track is ended"), "STOPPED" !== e.state_ && (e.state_ = "STOPPED", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "ended"
							}))
					}), this.track_.addEventListener("mute", function(t) {
						e.log_.info("stream - audio track is muted"), "PAUSED" !== e.state_ && (e.state_ = "PAUSED", e.emitter_.emit(
							ul, {
								state: e.state_,
								reason: "mute"
							}))
					}), this.track_.addEventListener("unmute", function(t) {
						e.log_.info("stream - audio track is unmuted"), "PAUSED" === e.state_ && (e.state_ = "PLAYING", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "unmute"
							}))
					})
				}
			}, {
				key: "setSinkId",
				value: (n = Ze(regeneratorRuntime.mark(function e(t) {
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.outputDeviceId_ === t) {
									e.next = 4;
									break
								}
								return e.next = 3, this.element_.setSinkId(t);
							case 3:
								this.outputDeviceId_ = t;
							case 4:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return n.apply(this, arguments)
				})
			}, {
				key: "setVolume",
				value: function(e) {
					this.log_.info("stream - audioElement setVolume to : ".concat(e)), this.element_.volume = e
				}
			}, {
				key: "getAudioLevel",
				value: function() {
					return this.soundMeter_ || (this.soundMeter_ = new vl, this.soundMeter_.connectToSource(this.track_)), this.soundMeter_
						.getVolume()
				}
			}, {
				key: "stop",
				value: function() {
					this.div_.removeChild(this.element_), this.soundMeter_ && (this.soundMeter_.stop(), this.soundMeter_ = null)
				}
			}, {
				key: "resume",
				value: (t = Ze(regeneratorRuntime.mark(function e() {
					var t;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return e.prev = 0, e.next = 3, this.element_.play();
							case 3:
								e.next = 11;
								break;
							case 5:
								if (e.prev = 5, e.t0 = e.catch(0), this.log_.warn("<audio> play() error: " + e.t0), !(t = e.t0.toString() +
										" <audio>").startsWith("NotAllowedError")) {
									e.next = 11;
									break
								}
								throw new ju({
									code: Mu.PLAY_NOT_ALLOWED,
									message: t
								});
							case 11:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[0, 5]
					])
				})), function() {
					return t.apply(this, arguments)
				})
			}, {
				key: "on",
				value: function(e, t) {
					this.emitter_.on(e, t)
				}
			}]), e
		}(),
		_l = function() {
			function e(t) {
				et(this, e), this.stream_ = t.stream, this.userId_ = t.stream.getUserId(), this.log_ = this.stream_.getIDLogger(),
					this.track_ = t.track, this.div_ = t.div, this.muted_ = t.muted, this.objectFit_ = t.objectFit, this.mirror_ = t.mirror,
					this.element_ = null, this.emitter_ = new yu, this.state_ = "NONE"
			}
			var t, n;
			return nt(e, [{
				key: "play",
				value: (n = Ze(regeneratorRuntime.mark(function e() {
					var t, n, r, i;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return (t = new MediaStream).addTrack(this.track_), (n = document.createElement("video")).srcObject =
									t, n.muted = 1, r = 0, this.mirror_ && (r = "180deg"), n.setAttribute("id", "video_".concat(this.stream_
										.getId())), n.setAttribute("style",
										"width: 100%; height: 100%; position: absolute; transform: rotateY(".concat(r, "); object-fit: ").concat(
											this.objectFit_)), n.setAttribute("autoplay", "autoplay"), n.setAttribute("playsinline",
										"playsinline"), this.div_.appendChild(n), this.element_ = n, this.handleEvents(), e.prev = 14, e.next =
									17, n.play();
							case 17:
								e.next = 25;
								break;
							case 19:
								if (e.prev = 19, e.t0 = e.catch(14), this.log_.warn("<video> play() error: " + e.t0), !(i = e.t0.toString() +
										" <video>").startsWith("NotAllowedError")) {
									e.next = 25;
									break
								}
								throw new ju({
									code: Mu.PLAY_NOT_ALLOWED,
									message: i
								});
							case 25:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[14, 19]
					])
				})), function() {
					return n.apply(this, arguments)
				})
			}, {
				key: "handleEvents",
				value: function() {
					var e = this;
					this.element_.addEventListener("playing", function(t) {
						e.log_.info("stream - video player is starting playing"), e.state_ = "PLAYING", e.emitter_.emit(ul, {
							state: e.state_,
							reason: "playing"
						})
					}), this.element_.addEventListener("ended", function(t) {
						e.log_.info("stream - video player is ended"), "STOPPED" !== e.state_ && (e.state_ = "STOPPED", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "ended"
							}))
					}), this.element_.addEventListener("pause", function(t) {
						e.log_.info("stream - video player is paused"), e.state_ = "PAUSED", e.emitter_.emit(ul, {
							state: e.state_,
							reason: "pause"
						})
					}), this.track_.addEventListener("ended", function(t) {
						e.log_.info("stream - video player track is ended"), "STOPPED" !== e.state_ && (e.state_ = "STOPPED", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "ended"
							}))
					}), this.track_.addEventListener("mute", function(t) {
						e.log_.info("stream - video track is muted"), "PAUSED" !== e.state_ && (e.state_ = "PAUSED", e.emitter_.emit(
							ul, {
								state: e.state_,
								reason: "mute"
							}))
					}), this.track_.addEventListener("unmute", function(t) {
						e.log_.info("stream - video track is unmuted"), "PAUSED" === e.state_ && (e.state_ = "PLAYING", e.emitter_
							.emit(ul, {
								state: e.state_,
								reason: "unmute"
							}))
					})
				}
			}, {
				key: "stop",
				value: function() {
					this.div_.removeChild(this.element_)
				}
			}, {
				key: "resume",
				value: (t = Ze(regeneratorRuntime.mark(function e() {
					var t;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return e.prev = 0, e.next = 3, this.element_.play();
							case 3:
								e.next = 11;
								break;
							case 5:
								if (e.prev = 5, e.t0 = e.catch(0), this.log_.warn("<video> play() error: " + e.t0), !(t = e.t0.toString() +
										" <video>").startsWith("NotAllowedError")) {
									e.next = 11;
									break
								}
								throw new ju({
									code: Mu.PLAY_NOT_ALLOWED,
									message: t
								});
							case 11:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[0, 5]
					])
				})), function() {
					return t.apply(this, arguments)
				})
			}, {
				key: "getVideoFrame",
				value: function() {
					var e = document.createElement("canvas");
					return e.width = this.element_.videoWidth, e.height = this.element_.videoHeight, e.getContext("2d").drawImage(
						this.element_, 0, 0), e.toDataURL("image/png")
				}
			}, {
				key: "on",
				value: function(e, t) {
					this.emitter_.on(e, t)
				}
			}]), e
		}(),
		yl = function() {
			function e(t) {
				et(this, e), this.id_ = t.id, this.direction_ = t.direction, this.type_ = t.type, this.directionPrefix_ = "local" ===
					this.direction_ ? "" : "*"
			}
			return nt(e, [{
				key: "log",
				value: function(e, t) {
					Hn[e]("[".concat(this.directionPrefix_).concat(this.id_, "] ").concat(this.type_, " ").concat(t))
				}
			}, {
				key: "info",
				value: function(e) {
					this.log("info", e)
				}
			}, {
				key: "debug",
				value: function(e) {
					this.log("debug", e)
				}
			}, {
				key: "warn",
				value: function(e) {
					this.log("warn", e)
				}
			}, {
				key: "error",
				value: function(e) {
					this.log("error", e)
				}
			}]), e
		}(),
		Sl = function() {
			function e(t) {
				et(this, e), this.userId_ = t.userId, this.isRemote_ = t.isRemote, this.type_ = t.type, this.log_ = new yl({
						id: "s|" + this.userId_,
						direction: this.isRemote_ ? "remote" : "local",
						type: this.isRemote_ ? this.type_ : ""
					}), this.mirror_ = 0, this.isRemote_ || (this.mirror_ = 1), void 0 !== t.mirror && (this.mirror_ = t.mirror),
					this.mediaStream_ = null, this.div_ = null, this.isPlaying_ = 0, this.connection_ = null, this.hasAudio_ = 0,
					this.hasVideo_ = 0, this.audioPlayer_ = null, this.videoPlayer_ = null, this.muted_ = 0, this.objectFit_ =
					"cover", this.id_ = Fd(), this.audioOutputDeviceId_ = 0, this.audioVolume_ = 1, this.emitter_ = new yu
			}
			var t, n, r, i, o;
			return nt(e, [{
				key: "getType",
				value: function() {
					return this.type_
				}
			}, {
				key: "getIDLogger",
				value: function() {
					return this.log_
				}
			}, {
				key: "setConnection",
				value: function(e) {
					this.connection_ !== e && (this.connection_ = e)
				}
			}, {
				key: "getConnection",
				value: function() {
					return this.connection_
				}
			}, {
				key: "play",
				value: (o = Ze(regeneratorRuntime.mark(function e(t, n) {
					var r, i;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!this.isPlaying_) {
									e.next = 2;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "duplicated play() call observed, please stop() firstly"
								});
							case 2:
								if (this.isPlaying_ = 1, this.log_.info("stream start to play with options: ".concat(JSON.stringify(
										n))), (r = document.createElement("div")).setAttribute("id", "player_".concat(this.id_)), r.setAttribute(
										"style",
										"width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;"), i =
									t, "object" !== Qe(t) && (i = document.getElementById(t)), i.appendChild(r), this.div_ = r, this.isRemote_ ||
									(this.muted_ = 1), n && void 0 !== n.muted && (this.muted_ = n.muted), this.isRemote_ &&
									"auxiliary" === this.getType() && (this.objectFit_ = "contain"), n && void 0 !== n.objectFit && (
										this.objectFit_ = n.objectFit), !this.hasVideo_) {
									e.next = 18;
									break
								}
								return e.next = 18, this.playVideo();
							case 18:
								if (!this.hasAudio_) {
									e.next = 21;
									break
								}
								return e.next = 21, this.playAudio();
							case 21:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e, t) {
					return o.apply(this, arguments)
				})
			}, {
				key: "playAudio",
				value: (i = Ze(regeneratorRuntime.mark(function e() {
					var t, n = this;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (t = this.getAudioTrack(), this.audioPlayer_ || !t) {
									e.next = 7;
									break
								}
								return this.log_.info("stream - create AudioPlayer and play"), this.audioPlayer_ = new gl({
									stream: this,
									track: t,
									div: this.div_,
									muted: this.muted_,
									outputDeviceId: this.audioOutputDeviceId_,
									volume: this.audioVolume_
								}), this.audioPlayer_.on(ul, function(e) {
									n.emitter_.emit(sl, {
										type: "audio",
										state: e.state,
										reason: e.reason
									})
								}), e.next = 7, this.audioPlayer_.play();
							case 7:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function() {
					return i.apply(this, arguments)
				})
			}, {
				key: "playVideo",
				value: (r = Ze(regeneratorRuntime.mark(function e() {
					var t, n = this;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (t = this.getVideoTrack(), this.videoPlayer_ || !t) {
									e.next = 7;
									break
								}
								return this.log_.info("stream - create VideoPlayer and play"), this.videoPlayer_ = new _l({
									stream: this,
									track: t,
									div: this.div_,
									muted: this.muted_,
									objectFit: this.objectFit_,
									mirror: this.mirror_
								}), this.videoPlayer_.on(ul, function(e) {
									n.emitter_.emit(sl, {
										type: "video",
										state: e.state,
										reason: e.reason
									})
								}), e.next = 7, this.videoPlayer_.play();
							case 7:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function() {
					return r.apply(this, arguments)
				})
			}, {
				key: "stopAudio",
				value: function() {
					this.audioPlayer_ && (this.log_.info("stream - stop AudioPlayer"), this.audioPlayer_.stop(), this.audioPlayer_ =
						null)
				}
			}, {
				key: "stopVideo",
				value: function() {
					this.videoPlayer_ && (this.log_.info("stream - stop VideoPlayer"), this.videoPlayer_.stop(), this.videoPlayer_ =
						null)
				}
			}, {
				key: "restartAudio",
				value: function() {
					this.isPlaying_ && (this.stopAudio(), this.playAudio())
				}
			}, {
				key: "restartVideo",
				value: function() {
					this.isPlaying_ && (this.stopVideo(), this.playVideo())
				}
			}, {
				key: "stop",
				value: function() {
					this.isPlaying_ && (this.isPlaying_ = 0, this.stopAudio(), this.stopVideo(), this.div_.parentNode.removeChild(
						this.div_))
				}
			}, {
				key: "resume",
				value: (n = Ze(regeneratorRuntime.mark(function e() {
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.isPlaying_) {
									e.next = 2;
									break
								}
								return e.abrupt("return");
							case 2:
								if (this.log_.info("stream - resume"), !this.videoPlayer_) {
									e.next = 6;
									break
								}
								return e.next = 6, this.videoPlayer_.resume();
							case 6:
								if (!this.audioPlayer_) {
									e.next = 9;
									break
								}
								return e.next = 9, this.audioPlayer_.resume();
							case 9:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function() {
					return n.apply(this, arguments)
				})
			}, {
				key: "close",
				value: function() {
					this.isPlaying_ && this.stop(), this.mediaStream_ && (this.mediaStream_.preventEvent = 1, this.mediaStream_.getTracks()
						.forEach(function(e) {
							e.stop()
						}), this.mediaStream_ = null)
				}
			}, {
				key: "muteAudio",
				value: function() {
					return this.doEnableTrack(1, 0)
				}
			}, {
				key: "muteVideo",
				value: function() {
					return this.doEnableTrack(0, 0)
				}
			}, {
				key: "unmuteAudio",
				value: function() {
					return this.doEnableTrack(1, 1)
				}
			}, {
				key: "unmuteVideo",
				value: function() {
					return this.doEnableTrack(0, 1)
				}
			}, {
				key: "doEnableTrack",
				value: function(e, t) {
					var n = 0;
					return e ? this.mediaStream_.getAudioTracks().forEach(function(e) {
						n = 1, e.enabled = t
					}) : this.mediaStream_.getVideoTracks().forEach(function(e) {
						n = 1, e.enabled = t
					}), n
				}
			}, {
				key: "getId",
				value: function() {
					return this.id_
				}
			}, {
				key: "getUserId",
				value: function() {
					return this.userId_
				}
			}, {
				key: "isPlaying",
				value: function() {
					return this.isPlaying_
				}
			}, {
				key: "setAudioOutput",
				value: (t = Ze(regeneratorRuntime.mark(function e(t) {
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.audioOutputDeviceId_ = t, !this.audioPlayer_) {
									e.next = 4;
									break
								}
								return e.next = 4, this.audioPlayer_.setSinkId(t);
							case 4:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return t.apply(this, arguments)
				})
			}, {
				key: "setAudioVolume",
				value: function(e) {
					this.audioVolume_ = e, this.log_.info("setAudioVolume to ".concat(e)), this.audioPlayer_ && this.audioPlayer_
						.setVolume(e)
				}
			}, {
				key: "getAudioLevel",
				value: function() {
					var e = 0;
					return this.audioPlayer_ && (e = this.audioPlayer_.getAudioLevel()), e
				}
			}, {
				key: "hasAudio",
				value: function() {
					return this.hasAudio_
				}
			}, {
				key: "hasVideo",
				value: function() {
					return this.hasVideo_
				}
			}, {
				key: "getAudioTrack",
				value: function() {
					var e = null;
					if (this.mediaStream_) {
						var t = this.mediaStream_.getAudioTracks();
						t.length > 0 && (e = t[0])
					}
					return e
				}
			}, {
				key: "getVideoTrack",
				value: function() {
					var e = null;
					if (this.mediaStream_) {
						var t = this.mediaStream_.getVideoTracks();
						t.length > 0 && (e = t[0])
					}
					return e
				}
			}, {
				key: "getVideoFrame",
				value: function() {
					return this.videoPlayer_ ? this.videoPlayer_.getVideoFrame() : null
				}
			}, {
				key: "getMediaStream",
				value: function() {
					return this.mediaStream_
				}
			}, {
				key: "setMediaStream",
				value: function(e) {
					e !== this.mediaStream_ && (this.mediaStream_ = e)
				}
			}, {
				key: "setHasVideo",
				value: function(e) {
					this.hasVideo_ = e, this.isPlaying_ && (e ? (this.log_.info("stream updated, play video"), this.playVideo()) :
						(this.log_.info("stream updated, stop video"), this.stopVideo()))
				}
			}, {
				key: "setHasAudio",
				value: function(e) {
					this.hasAudio_ = e, this.isPlaying_ && (e ? (this.log_.info("stream updated, play audio"), this.playAudio()) :
						(this.log_.info("stream updated, stop audio"), this.stopAudio()))
				}
			}, {
				key: "on",
				value: function(e, t) {
					this.emitter_.on(e, t)
				}
			}, {
				key: "isRemote",
				value: function() {
					return this.isRemote_
				}
			}]), e
		}(),
		bl = function(e) {
			function t(e) {
				var n;
				et(this, t);
				var r = it({}, e, {
					isRemote: 1,
					type: e.type
				});
				return (n = dt(this, at(t).call(this, r))).isInSubscriptionCycle_ = 0, n
			}
			return ot(t, Sl), nt(t, [{
				key: "getType",
				value: function() {
					return lt(at(t.prototype), "getType", this).call(this)
				}
			}, {
				key: "setInSubscriptionCycle",
				value: function(e) {
					this.isInSubscriptionCycle_ = e
				}
			}, {
				key: "isInSubscriptionCycle",
				value: function() {
					return this.isInSubscriptionCycle_
				}
			}]), t
		}(),
		kl = {
			HOST: "host",
			SRFLX: "srflx",
			PRFLX: "prflx",
			RELAY: "relay"
		},
		Cl = {
			TCP: "tcp",
			UDP: "udp"
		},
		wl = function(e) {
			var t = new RegExp(
					"(?:a=)?candidate:([a-zA-Z0-9\\+\\/]+)\\s([0-9]{1,5})\\s([0-9a-zA-Z\\-\\.!\\%\\*_\\+\\`\\'\\~]+)\\s([0-9]{1,10})\\s((?:[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})|(?:\\:?(?:[0-9a-fA-F]{0,4}\\:?)+))\\s([0-9]{1,5})\\styp\\s([0-9a-zA-Z\\-\\.!\\%\\*_\\+\\`\\'\\~]+)(?:\\sraddr\\s((?:[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})|(?:\\:?(?:[0-9a-fA-F]{0,4}\\:?)+))\\srport\\s([0-9]{1,5}))?(?:\\sgeneration\\s(\\d+))?"
				),
				n = e.match(t);
			if (!n) return Hn.warn("parseIceCandidate(): parsed is empty: " + n), null;
			for (var r = ["foundation", "component_id", "transport", "priority", "localIP", "localPort", "type", "remoteIP",
					"remotePort", "generation"
				], i = {}, o = 0; o < r.length; o++) i[r[o]] = n[o + 1];
			return function(e) {
				e.type.toUpperCase() in kl && e.transport.toUpperCase()
			}(i), i
		},
		Rl = bs.trim,
		Tl = s.parseInt,
		El = /^[+-]?0[Xx]/,
		Il = 8 !== Tl(vs + "08") || 22 !== Tl(vs + "0x16") ? function(e, t) {
			var n = Rl(String(e));
			return Tl(n, t >>> 0 || (El.test(n) ? 16 : 10))
		} : Tl;
	Ie({
		global: 1,
		forced: parseInt != Il
	}, {
		parseInt: Il
	});
	var Pl = function(e) {
			var t = e.split(".");
			return 256 * parseInt(t[0]) * 256 * 256 + 256 * parseInt(t[1]) * 256 + 256 * parseInt(t[2]) + parseInt(t[3])
		},
		xl = function(e, t, n) {
			return e >= t && e <= n
		},
		Al = t(function(e) {
			var t = e.exports = {
				v: [{
					name: "version",
					reg: /^(\d*)$/
				}],
				o: [{
					name: "origin",
					reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
					names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
					format: "%s %s %d %s IP%d %s"
				}],
				s: [{
					name: "name"
				}],
				i: [{
					name: "description"
				}],
				u: [{
					name: "uri"
				}],
				e: [{
					name: "email"
				}],
				p: [{
					name: "phone"
				}],
				z: [{
					name: "timezones"
				}],
				r: [{
					name: "repeats"
				}],
				t: [{
					name: "timing",
					reg: /^(\d*) (\d*)/,
					names: ["start", "stop"],
					format: "%d %d"
				}],
				c: [{
					name: "connection",
					reg: /^IN IP(\d) (\S*)/,
					names: ["version", "ip"],
					format: "IN IP%d %s"
				}],
				b: [{
					push: "bandwidth",
					reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
					names: ["type", "limit"],
					format: "%s:%s"
				}],
				m: [{
					reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
					names: ["type", "port", "protocol", "payloads"],
					format: "%s %d %s %s"
				}],
				a: [{
					push: "rtp",
					reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
					names: ["payload", "codec", "rate", "encoding"],
					format: function(e) {
						return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
					}
				}, {
					push: "fmtp",
					reg: /^fmtp:(\d*) ([\S| ]*)/,
					names: ["payload", "config"],
					format: "fmtp:%d %s"
				}, {
					name: "control",
					reg: /^control:(.*)/,
					format: "control:%s"
				}, {
					name: "rtcp",
					reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
					names: ["port", "netType", "ipVer", "address"],
					format: function(e) {
						return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
					}
				}, {
					push: "rtcpFbTrrInt",
					reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
					names: ["payload", "value"],
					format: "rtcp-fb:%d trr-int %d"
				}, {
					push: "rtcpFb",
					reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
					names: ["payload", "type", "subtype"],
					format: function(e) {
						return null != e.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
					}
				}, {
					push: "ext",
					reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
					names: ["value", "direction", "encrypt-uri", "uri", "config"],
					format: function(e) {
						return "extmap:%d" + (e.direction ? "/%s" : "%v") + (e["encrypt-uri"] ? " %s" : "%v") + " %s" + (e.config ?
							" %s" : "")
					}
				}, {
					push: "crypto",
					reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
					names: ["id", "suite", "config", "sessionConfig"],
					format: function(e) {
						return null != e.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
					}
				}, {
					name: "setup",
					reg: /^setup:(\w*)/,
					format: "setup:%s"
				}, {
					name: "mid",
					reg: /^mid:([^\s]*)/,
					format: "mid:%s"
				}, {
					name: "msid",
					reg: /^msid:(.*)/,
					format: "msid:%s"
				}, {
					name: "ptime",
					reg: /^ptime:(\d*)/,
					format: "ptime:%d"
				}, {
					name: "maxptime",
					reg: /^maxptime:(\d*)/,
					format: "maxptime:%d"
				}, {
					name: "direction",
					reg: /^(sendrecv|recvonly|sendonly|inactive)/
				}, {
					name: "icelite",
					reg: /^(ice-lite)/
				}, {
					name: "iceUfrag",
					reg: /^ice-ufrag:(\S*)/,
					format: "ice-ufrag:%s"
				}, {
					name: "icePwd",
					reg: /^ice-pwd:(\S*)/,
					format: "ice-pwd:%s"
				}, {
					name: "fingerprint",
					reg: /^fingerprint:(\S*) (\S*)/,
					names: ["type", "hash"],
					format: "fingerprint:%s %s"
				}, {
					push: "candidates",
					reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
					names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype",
						"generation", "network-id", "network-cost"
					],
					format: function(e) {
						var t = "candidate:%s %d %s %d %s %d typ %s";
						return t += null != e.raddr ? " raddr %s rport %d" : "%v%v", t += null != e.tcptype ? " tcptype %s" : "%v",
							null != e.generation && (t += " generation %d"), t += null != e["network-id"] ? " network-id %d" : "%v", t +=
							null != e["network-cost"] ? " network-cost %d" : "%v"
					}
				}, {
					name: "endOfCandidates",
					reg: /^(end-of-candidates)/
				}, {
					name: "remoteCandidates",
					reg: /^remote-candidates:(.*)/,
					format: "remote-candidates:%s"
				}, {
					name: "iceOptions",
					reg: /^ice-options:(\S*)/,
					format: "ice-options:%s"
				}, {
					push: "ssrcs",
					reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
					names: ["id", "attribute", "value"],
					format: function(e) {
						var t = "ssrc:%d";
						return null != e.attribute && (t += " %s", null != e.value && (t += ":%s")), t
					}
				}, {
					push: "ssrcGroups",
					reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
					names: ["semantics", "ssrcs"],
					format: "ssrc-group:%s %s"
				}, {
					name: "msidSemantic",
					reg: /^msid-semantic:\s?(\w*) (\S*)/,
					names: ["semantic", "token"],
					format: "msid-semantic: %s %s"
				}, {
					push: "groups",
					reg: /^group:(\w*) (.*)/,
					names: ["type", "mids"],
					format: "group:%s %s"
				}, {
					name: "rtcpMux",
					reg: /^(rtcp-mux)/
				}, {
					name: "rtcpRsize",
					reg: /^(rtcp-rsize)/
				}, {
					name: "sctpmap",
					reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
					names: ["sctpmapNumber", "app", "maxMessageSize"],
					format: function(e) {
						return null != e.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
					}
				}, {
					name: "xGoogleFlag",
					reg: /^x-google-flag:([^\s]*)/,
					format: "x-google-flag:%s"
				}, {
					push: "rids",
					reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
					names: ["id", "direction", "params"],
					format: function(e) {
						return e.params ? "rid:%s %s %s" : "rid:%s %s"
					}
				}, {
					push: "imageattrs",
					reg: new RegExp(
						"^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
					),
					names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
					format: function(e) {
						return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "")
					}
				}, {
					name: "simulcast",
					reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),
					names: ["dir1", "list1", "dir2", "list2"],
					format: function(e) {
						return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "")
					}
				}, {
					name: "simulcast_03",
					reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
					names: ["value"],
					format: "simulcast: %s"
				}, {
					name: "framerate",
					reg: /^framerate:(\d+(?:$|\.\d+))/,
					format: "framerate:%s"
				}, {
					name: "sourceFilter",
					reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
					names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
					format: "source-filter: %s %s %s %s %s"
				}, {
					name: "bundleOnly",
					reg: /^(bundle-only)/
				}, {
					name: "label",
					reg: /^label:(.+)/,
					format: "label:%s"
				}, {
					name: "sctpPort",
					reg: /^sctp-port:(\d+)$/,
					format: "sctp-port:%s"
				}, {
					name: "maxMessageSize",
					reg: /^max-message-size:(\d+)$/,
					format: "max-message-size:%s"
				}, {
					push: "invalid",
					names: ["value"]
				}]
			};
			Object.keys(t).forEach(function(e) {
				t[e].forEach(function(e) {
					e.reg || (e.reg = /(.*)/), e.format || (e.format = "%s")
				})
			})
		}),
		Ol = (Al.v, Al.o, Al.s, Al.i, Al.u, Al.e, Al.p, Al.z, Al.r, Al.t, Al.c, Al.b, Al.m, Al.a, t(function(e, t) {
			var n = function(e) {
					return String(Number(e)) === e ? Number(e) : e
				},
				r = function(e, t, r) {
					var i = e.name && e.names;
					e.push && !t[e.push] ? t[e.push] = [] : i && !t[e.name] && (t[e.name] = {});
					var o = e.push ? {} : i ? t[e.name] : t;
					! function(e, t, r, i) {
						if (i && !r) t[i] = n(e[1]);
						else
							for (var o = 0; o < r.length; o += 1) null != e[o + 1] && (t[r[o]] = n(e[o + 1]))
					}(r.match(e.reg), o, e.names, e.name), e.push && t[e.push].push(o)
				},
				i = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
			t.parse = function(e) {
				var t = {},
					n = [],
					o = t;
				return e.split(/(\r\n|\r|\n)/).filter(i).forEach(function(e) {
					var t = e[0],
						i = e.slice(2);
					"m" === t && (n.push({
						rtp: [],
						fmtp: []
					}), o = n[n.length - 1]);
					for (var a = 0; a < (Al[t] || []).length; a += 1) {
						var s = Al[t][a];
						if (s.reg.test(i)) return r(s, o, i)
					}
				}), t.media = n, t
			};
			var o = function(e, t) {
				var r = t.split(/=(.+)/, 2);
				return 2 === r.length ? e[r[0]] = n(r[1]) : 1 === r.length && t.length > 1 && (e[r[0]] = void 0), e
			};
			t.parseParams = function(e) {
				return e.split(/;\s?/).reduce(o, {})
			}, t.parseFmtpConfig = t.parseParams, t.parsePayloads = function(e) {
				return e.toString().split(" ").map(Number)
			}, t.parseRemoteCandidates = function(e) {
				for (var t = [], r = e.split(" ").map(n), i = 0; i < r.length; i += 3) t.push({
					component: r[i],
					ip: r[i + 1],
					port: r[i + 2]
				});
				return t
			}, t.parseImageAttributes = function(e) {
				return e.split(" ").map(function(e) {
					return e.substring(1, e.length - 1).split(",").reduce(o, {})
				})
			}, t.parseSimulcastStreamList = function(e) {
				return e.split(";").map(function(e) {
					return e.split(",").map(function(e) {
						var t, r = 0;
						return "~" !== e[0] ? t = n(e) : (t = n(e.substring(1, e.length)), r = 1), {
							scid: t,
							paused: r
						}
					})
				})
			}
		})),
		Dl = (Ol.parse, Ol.parseParams, Ol.parseFmtpConfig, Ol.parsePayloads, Ol.parseRemoteCandidates, Ol.parseImageAttributes,
			Ol.parseSimulcastStreamList, /%[sdv%]/g),
		Ll = function(e) {
			var t = 1,
				n = arguments,
				r = n.length;
			return e.replace(Dl, function(e) {
				if (t >= r) return e;
				var i = n[t];
				switch (t += 1, e) {
					case "%%":
						return "%";
					case "%s":
						return String(i);
					case "%d":
						return Number(i);
					case "%v":
						return ""
				}
			})
		},
		Nl = function(e, t, n) {
			var r = [e + "=" + (t.format instanceof Function ? t.format(t.push ? n : n[t.name]) : t.format)];
			if (t.names)
				for (var i = 0; i < t.names.length; i += 1) {
					var o = t.names[i];
					t.name ? r.push(n[t.name][o]) : r.push(n[t.names[i]])
				} else r.push(n[t.name]);
			return Ll.apply(null, r)
		},
		Ml = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
		jl = ["i", "c", "b", "a"],
		Vl = {
			write: function(e, t) {
				t = t || {}, null == e.version && (e.version = 0), null == e.name && (e.name = " "), e.media.forEach(function(e) {
					null == e.payloads && (e.payloads = "")
				});
				var n = t.outerOrder || Ml,
					r = t.innerOrder || jl,
					i = [];
				return n.forEach(function(t) {
					Al[t].forEach(function(n) {
						n.name in e && null != e[n.name] ? i.push(Nl(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(
							function(e) {
								i.push(Nl(t, n, e))
							})
					})
				}), e.media.forEach(function(e) {
					i.push(Nl("m", Al.m[0], e)), r.forEach(function(t) {
						Al[t].forEach(function(n) {
							n.name in e && null != e[n.name] ? i.push(Nl(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(
								function(e) {
									i.push(Nl(t, n, e))
								})
						})
					})
				}), i.join("\r\n") + "\r\n"
			},
			parse: Ol.parse,
			parseFmtpConfig: Ol.parseFmtpConfig,
			parseParams: Ol.parseParams,
			parsePayloads: Ol.parsePayloads,
			parseRemoteCandidates: Ol.parseRemoteCandidates,
			parseImageAttributes: Ol.parseImageAttributes,
			parseSimulcastStreamList: Ol.parseSimulcastStreamList
		},
		Ul = function(e) {
			return Vl.parse(e)
		},
		Fl = function(e) {
			return e >> 16 & 255
		},
		Gl = {
			voiceActivityDetection: 0
		},
		Bl = function() {
			function e(t) {
				et(this, e), this.userId_ = t.userId, this.tinyId_ = t.tinyId, this.client_ = t.client, this.sdpSemantics_ = t.client
					.getSdpSemantics(), this.iceServers_ = t.iceServers, this.isUplink_ = t.isUplink, this.log_ = new yl({
						id: "n|" + this.userId_,
						direction: this.isUplink_ ? "local" : "remote",
						type: ""
					}), this.signalChannel_ = t.signalChannel, this.peerConnection_ = null, this.connectTimer_ = -1, this.remoteStreams_ =
					new Map, this.localStream_ = null, this.iceCandidates_ = [], this.isIceCandidateSent_ = 0, this.isSdpExchanged_ =
					0, this.waitForUpdatedAnswer_ = 0, this.mutedState_ = 0, this.subscribeState_ = {
						audio: 1,
						video: 1,
						auxiliary: 1
					}, this.pendingSubscription_ = [], this.pendingStreams_ = [], this.subscriptionTimeout_ = -1, this.subscriptionRetryCount_ =
					0, this.isSubscriptionPending_ = 0, this.sentSubscriptionAfterConnected_ = 0, this.emitter_ = new yu
			}
			var t, n, r, i, o, a;
			return nt(e, [{
				key: "initialize",
				value: function() {
					var e = {
						sdpSemantics: this.sdpSemantics_,
						iceServers: this.client_.getIceServers(),
						bundlePolicy: "max-bundle",
						rtcpMuxPolicy: "require",
						tcpCandidatePolicy: "disable",
						IceTransportsType: "nohost"
					};
					this.peerConnection_ = new RTCPeerConnection(e), this.peerConnection_.onicecandidate = this.onIceCandidate.bind(
							this), this.peerConnection_.oniceconnectionstatechange = this.onIceConnectionStateChange.bind(this), this.peerConnection_
						.onconnectionstatechange = this.onConnectionStateChange.bind(this), this.peerConnection_.onicegatheringstatechange =
						this.onIceGatheringStateChange.bind(this), this.isUplink_ || (this.peerConnection_.ontrack = this.onTrack.bind(
							this)), this.installSignalChannelEvents()
				}
			}, {
				key: "publish",
				value: function(e, t) {
					var n = this;
					this.localStream_ = e;
					var r = e.getMediaStream();
					this.log_.info("is publishing stream: ".concat(e.getId())), r.getTracks().forEach(function(e) {
						n.peerConnection_.addTrack(e, r)
					}), this.updateMediaSettings(r), this.exchangeOffer(t)
				}
			}, {
				key: "updateMediaSettings",
				value: function(e) {
					var t = this,
						n = {
							EncVideoCodec: "H264",
							EncVideoWidth: 0,
							EncVideoHeight: 0,
							EncVideoBr: "0",
							EncVideoFps: 0,
							EncAudioCodec: "opus",
							EncAudioFS: 0,
							EncAudioCh: 0,
							EncAudioBr: "0"
						};
					"getSettings" in MediaStreamTrack.prototype ? e.getTracks().forEach(function(e) {
							var r = e.getSettings();
							if ("audio" === e.kind) {
								var i = 1;
								r.channelCount && (i = r.channelCount), n.EncAudioCh = i, n.EncAudioBr = "".concat(1e3 * t.localStream_.getAudioBitrate()),
									n.EncAudioFS = r.sampleRate
							} else "video" === e.kind && (n.EncVideoWidth = r.width, n.EncVideoHeight = r.height, n.EncVideoFps = r.frameRate,
								n.EncVideoBr = "".concat(1e3 * t.localStream_.getVideoBitrate()))
						}) : n = this.getMediaSettingsFromProfile(n), this.log_.info("updateMediaSettings: " + JSON.stringify(n)),
						this.signalChannel_.send(Lu, n)
				}
			}, {
				key: "getMediaSettingsFromProfile",
				value: function(e) {
					var t = this.localStream_;
					if (t) {
						if (t.getAudioTrack()) {
							var n = t.getAudioProfile();
							e.EncAudioCh = n.channelCount, e.EncAudioBr = "".concat(1e3 * n.bitrate), e.EncAudioFS = n.sampleRate
						}
						if (t.getVideoTrack()) {
							var r = t.getVideoProfile();
							e.EncVideoWidth = r.width, e.EncVideoHeight = r.height, e.EncVideoFps = r.frameRate, e.EncVideoBr = "".concat(
								1e3 * r.bitrate)
						}
					}
					return e
				}
			}, {
				key: "replaceStream",
				value: (a = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r, i = this;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!this.peerConnection_) {
									e.next = 8;
									break
								}
								return n = t.getVideoTracks(), r = t.getAudioTracks(), (this.peerConnection_.getSenders() || []).forEach(
									function(e) {
										e.track && ("video" === e.track.kind ? e.replaceTrack && n.length > 0 ? e.replaceTrack(n[0]) : (i
												.peerConnection_.removeTrack(e), n.length > 0 && i.peerConnection_.addTrack(n[0], t)) :
											"audio" === e.track.kind && (e.replaceTrack && r.length > 0 ? e.replaceTrack(r[0]) : (i.peerConnection_
												.removeTrack(e), r.length > 0 && i.peerConnection_.addTrack(r[0], t))))
									}), this.updateMediaSettings(t), e.next = 8, this.updateOffer();
							case 8:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return a.apply(this, arguments)
				})
			}, {
				key: "addTrack",
				value: (o = Ze(regeneratorRuntime.mark(function e(t) {
					var n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!this.peerConnection_) {
									e.next = 7;
									break
								}
								return this.log_.info("is adding ".concat(t.kind, " track to current published local stream")), n =
									this.localStream_.getMediaStream(), this.peerConnection_.addTrack(t, n), this.updateMediaSettings(n),
									e.next = 7, this.updateOffer();
							case 7:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return o.apply(this, arguments)
				})
			}, {
				key: "removeTrack",
				value: (i = Ze(regeneratorRuntime.mark(function e(t) {
					var n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!this.peerConnection_) {
									e.next = 8;
									break
								}
								if (this.log_.info("is removing ".concat(t.kind, " track from current published local stream")), !(n =
										this.peerConnection_.getSenders().find(function(e) {
											return e.track === t
										}))) {
									e.next = 8;
									break
								}
								return this.peerConnection_.removeTrack(n), this.updateMediaSettings(this.localStream_.getMediaStream()),
									e.next = 8, this.updateOffer();
							case 8:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return i.apply(this, arguments)
				})
			}, {
				key: "isReplaceTrackAvailable",
				value: function() {
					return "RTCRtpSender" in window && "replaceTrack" in window.RTCRtpSender.prototype
				}
			}, {
				key: "replaceTrack",
				value: (r = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r = this;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.isReplaceTrackAvailable()) {
									e.next = 2;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "replaceTrack is not supported in this browser, please use switchDevice or addTrack instead"
								});
							case 2:
								if (this.peerConnection_) {
									e.next = 4;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "replaceTrack() is only valid after the LocalStream has been published"
								});
							case 4:
								if (0 !== (n = this.peerConnection_.getSenders()).length) {
									e.next = 7;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "replaceTrack() is only valid after the LocalStream has been published"
								});
							case 7:
								n.forEach(function(e) {
									e.track && e.track.kind === t.kind && (r.log_.info("is replacing ".concat(t.kind,
										" track to current published local stream")), e.replaceTrack(t))
								});
							case 8:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return r.apply(this, arguments)
				})
			}, {
				key: "close",
				value: function() {
					var e = this;
					this.log_.info("closing connection"), -1 !== this.connectTimer_ && (clearTimeout(this.connectTimer_), this.connectTimer_ = -
							1), -1 !== this.subscriptionTimeout_ && (clearTimeout(this.subscriptionTimeout_), this.subscriptionTimeout_ = -
							1), this.peerConnection_ && (this.peerConnection_.close(), this.peerConnection_ = null), this.isUplink_ ||
						(this.remoteStreams_.forEach(function(t, n, r) {
							var i = t;
							i.setConnection(null), e.emitter_.emit(Bd, {
								stream: i
							})
						}), this.remoteStreams_.clear()), this.uninstallSignalChannelEvents()
				}
			}, {
				key: "installSignalChannelEvents",
				value: function() {
					this.isUplink_ && this.signalChannel_.on(wu.NEW_REMOTE_SDP, this.onNewRemoteSdp, this), this.signalChannel_.on(
						wu.NEW_ICE_CANDIDATE, this.onNewIceCandidate, this), this.isUplink_ || (this.signalChannel_.on(wu.UPDATE_REMOTE_SDP,
							this.onUpdateRemoteSdp, this), this.signalChannel_.on(wu.UPDATE_AUDIO_SSRC, this.onUpdateAudioSSRC, this),
						this.signalChannel_.on(wu.UPDATE_VIDEO_SSRC, this.onUpdateVideoSSRC, this), this.signalChannel_.on(wu.SUBSCRIBE_ACK,
							this.onSubscription, this))
				}
			}, {
				key: "uninstallSignalChannelEvents",
				value: function() {
					this.isUplink_ && this.signalChannel_.removeListener(wu.NEW_REMOTE_SDP, this.onNewRemoteSdp, this), this.signalChannel_
						.removeListener(wu.NEW_ICE_CANDIDATE, this.onNewIceCandidate, this), this.isUplink_ || (this.signalChannel_.removeListener(
							wu.UPDATE_REMOTE_SDP, this.onUpdateRemoteSdp, this), this.signalChannel_.removeListener(wu.UPDATE_AUDIO_SSRC,
							this.onUpdateAudioSSRC, this), this.signalChannel_.removeListener(wu.UPDATE_VIDEO_SSRC, this.onUpdateVideoSSRC,
							this), this.signalChannel_.removeListener(wu.SUBSCRIBE_ACK, this.onSubscription, this))
				}
			}, {
				key: "onNewRemoteSdp",
				value: function(e) {
					if (this.hitTest(e.data.srctinyid)) {
						var t = e.data.content;
						this.acceptAnswer(t)
					}
				}
			}, {
				key: "onNewIceCandidate",
				value: function(e) {
					this.hitTest(e.data.srctinyid) && this.addIceCandidate(e.data.content)
				}
			}, {
				key: "onUpdateRemoteSdp",
				value: function(e) {
					var t = e.data.content;
					if (this.hitTest(t.srctinyid)) {
						this.log_.info("is updating remote sdp offer");
						var n = t.newSdp;
						this.updateRemoteDescription(n)
					}
				}
			}, {
				key: "onUpdateAudioSSRC",
				value: function(e) {
					var t = e.data.content;
					if (this.hitTest(t.srctinyid)) {
						this.log_.info("is updating audio ssrc");
						var n = t.newSdp;
						this.updateRemoteDescription(n)
					}
				}
			}, {
				key: "onUpdateVideoSSRC",
				value: function(e) {
					var t = e.data.content;
					if (this.hitTest(t.srctinyid)) {
						this.log_.info("is updating video ssrc");
						var n = t.newSdp;
						this.updateRemoteDescription(n)
					}
				}
			}, {
				key: "onTrack",
				value: function(e) {
					var t = e.streams[0],
						n = e.track;
					if (this.log_.info("ontrack() kind: ".concat(n.kind, " id: ").concat(n.id, " streamId: ").concat(t.id)),
						"unified-plan" === this.sdpSemantics_) {
						var r = function(e) {
							var t = Vl.parse(e),
								n = {
									audio: [],
									video: []
								};
							return t.media.forEach(function(e) {
								if (e.ssrcs) {
									var t = e.ssrcs[0].id >> 16 & 255;
									if ("audio" === e.type) n.audio.push(Ld);
									else if ("video" == e.type) {
										var r = t === Md ? Ld : Nd;
										n.video.push(r)
									}
								}
							}), n
						}(this.peerConnection_.remoteDescription.sdp);
						if ("audio" === n.kind) {
							if (0 === r.audio.length || t.id !== Ld) return void this.log_.debug("skip this invalid audio track")
						} else if (-1 === r.video.indexOf(t.id)) return void this.log_.debug("skip this invalid video track: ".concat(
							n.id, "  msid: ").concat(t.id))
					}
					nd({
						eventType: "ontrack",
						kind: n.kind
					});
					var i = 0,
						o = this.remoteStreams_.get(t.id);
					if (void 0 === o) {
						var a = t.id === Ld ? "main" : "auxiliary";
						(o = new bl({
							type: a,
							userId: this.userId_
						})).setConnection(this), this.remoteStreams_.set(t.id, o), i = 1
					}
					o.setMediaStream(t), "audio" === n.kind ? (o.hasAudio() && o.isPlaying() && (this.log_.debug(
							"already has an audio track, restart audio player with the new track"), o.restartAudio()), o.setHasAudio(1)) :
						(o.hasVideo() && o.isPlaying() && (this.log_.debug(
							"already has an video track, restart video player with the new track"), o.restartVideo()), o.setHasVideo(1)),
						i ? this.emitter_.emit(Gd, {
							stream: o
						}) : this.emitter_.emit(Hd, {
							stream: o
						})
				}
			}, {
				key: "isRtpSenderAvailable",
				value: function() {
					return "RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype
				}
			}, {
				key: "setBandwidth",
				value: (n = Ze(regeneratorRuntime.mark(function e(t, n) {
					var r, i, o = this;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (this.isUplink_) {
									e.next = 2;
									break
								}
								return e.abrupt("return");
							case 2:
								void 0 === n && (n = "video"), this.isRtpSenderAvailable() && (r = this.peerConnection_.getSenders()
									.find(function(e) {
										return e.track && e.track.kind === n
									})) && ((i = r.getParameters()).encodings || (i.encodings = [{}]), "unlimited" === t ? delete i.encodings[
									0].maxBitrate : i.encodings[0].maxBitrate = 1e3 * t, r.setParameters(i).then(function() {
									o.log_.debug(n + " bandwidth was set to " + t + " kbps")
								}).catch(function(e) {
									return o.log_.error("failed to set bandwidth: " + e)
								}));
							case 4:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e, t) {
					return n.apply(this, arguments)
				})
			}, {
				key: "updateVideoBandwidthRestriction",
				value: function(e, t) {
					return e = -1 === e.indexOf("b=AS:") ? e.replace(/m=video (.*)\r\nc=IN (.*)\r\n/,
						"m=video $1\r\nc=IN $2\r\nb=AS:" + t + "\r\n") : e.replace(new RegExp("b=AS:.*\r\n"), "b=AS:" + t + "\r\n")
				}
			}, {
				key: "updateAudioBandwidthRestriction",
				value: function(e, t) {
					return e = e.replace(/m=audio (.*)\r\nc=IN (.*)\r\n/, "m=audio $1\r\nc=IN $2\r\nb=AS:" + t + "\r\n")
				}
			}, {
				key: "removeBandwidthRestriction",
				value: function(e) {
					return e.replace(/b=AS:.*\r\n/, "").replace(/b=TIAS:.*\r\n/, "")
				}
			}, {
				key: "exchangeOffer",
				value: function(e) {
					var t = this;
					this.peerConnection_.createOffer(Gl).then(function(e) {
						return t.peerConnection_.setLocalDescription(e)
					}).then(function() {
						t.log_.info("createOffer success, sending offer to remote server");
						var e = t.peerConnection_.localDescription;
						t.log_.debug("sending sdp offer: " + e.sdp), t.signalChannel_.send(Ru, e, 0), nd({
							eventType: "setLocalDescription",
							kind: "offer",
							result: "success"
						})
					}).catch(function(n) {
						nd({
							eventType: "setLocalDescription",
							kind: "offer",
							result: "failed"
						}), t.log_.error("failed to create offer"), e(new ju({
							code: Mu.CREATE_OFFER_FAILED,
							message: "failed to create offer"
						}))
					})
				}
			}, {
				key: "updateOffer",
				value: (t = Ze(regeneratorRuntime.mark(function e() {
					var t, n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return t = "", e.prev = 1, e.next = 4, this.peerConnection_.createOffer(Gl);
							case 4:
								return t = e.sent, e.next = 7, this.peerConnection_.setLocalDescription(t);
							case 7:
								n = this.peerConnection_.localDescription, this.log_.info(
									"createOffer success, sending updated offer to remote server"), this.log_.debug("updatedOffer: " +
									n.sdp), this.signalChannel_.send(Tu, n, 0), this.waitForUpdatedAnswer_ = 1, nd({
									eventType: "setLocalDescription",
									kind: "offer",
									result: "success"
								}), e.next = 20;
								break;
							case 15:
								throw e.prev = 15, e.t0 = e.catch(1), nd({
									eventType: "setLocalDescription",
									kind: "offer",
									result: "failed"
								}), this.log_.error("failed to create updated sdp offer"), new ju({
									code: Mu.CREATE_OFFER_FAILED,
									message: "failed to create updated sdp offer"
								});
							case 20:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[1, 15]
					])
				})), function() {
					return t.apply(this, arguments)
				})
			}, {
				key: "acceptAnswer",
				value: function(e) {
					var t = this,
						n = this.localStream_.getVideoBitrate(),
						r = this.updateVideoBandwidthRestriction(e.sdp, n),
						i = this.localStream_.getAudioBitrate();
					r = this.updateAudioBandwidthRestriction(r, i);
					var o = {
						type: e.type,
						sdp: r
					};
					this.peerConnection_.setRemoteDescription(o).then(function() {
						t.log_.debug("accepted anwswer: " + r), t.setBandwidth(i, "audio"), t.setBandwidth(n, "video"), t.waitForUpdatedAnswer_ ||
							(t.log_.info("accepted remote answer, fired stream-published event"), t.emitter_.emit(zd, {
								stream: t.localStream_
							}), t.isSdpExchanged_ = 1, t.sendIceCandidate()), t.waitForUpdatedAnswer_ && (t.waitForUpdatedAnswer_ = 0),
							nd({
								eventType: "setRemoteDescription",
								kind: "answer",
								result: "success"
							})
					}, function(e) {
						nd({
							eventType: "setRemoteDescription",
							kind: "answer",
							result: "failed"
						}), t.log_.error("failed to accept remote answer " + e)
					})
				}
			}, {
				key: "onIceCandidate",
				value: function(e) {
					if (e.candidate) {
						var t, n, r, i, o, a, s, c, u, d, l = e.candidate;
						if (this.log_.info("onIceCandidate() sdpMLineIndex: " + l.sdpMLineIndex + " sdpMid: " + l.sdpMid +
								" candidate: " + l.candidate), l.candidate) {
							var p = wl(l.candidate);
							!p || p.transport !== Cl.UDP || p.type !== kl.SRFLX && (p.type !== kl.HOST || (t = p.localIP, n = Pl(t), r =
								Pl("10.0.0.0"), i = Pl("10.255.255.255"), o = Pl("172.16.0.0"), a = Pl("172.31.255.255"), s = Pl(
									"192.168.0.0"), c = Pl("192.168.255.255"), u = Pl("127.0.0.0"), d = Pl("127.255.255.255"), xl(n, r, i) ||
								xl(n, o, a) || xl(n, s, c) || xl(n, u, d))) || (this.iceCandidates_.push({
								candidate: l,
								type: p.type
							}), this.sendIceCandidate())
						}
					} else if (this.log_.debug("onIceCandidate ended"), 0 === this.iceCandidates_.length) {
						var f = "no valid ice candidate found";
						nd({
							eventType: "getIceCandidate",
							result: "failed"
						}), this.log_.error(f), this.emitter_.emit(qd, new ju({
							message: f,
							code: Mu.ICE_TRANSPORT_ERROR
						}))
					} else this.sendIceCandidate(1)
				}
			}, {
				key: "findCandidate",
				value: function(e) {
					var t = this.iceCandidates_.find(function(t) {
						return t.type === e
					});
					if (t) return t.candidate
				}
			}, {
				key: "sendIceCandidate",
				value: function(e) {
					if (!this.isIceCandidateSent_ && this.isSdpExchanged_) {
						var t = this.findCandidate(kl.SRFLX);
						if (t) {
							this.log_.info("send ice-candidate to remote server: " + t.candidate);
							var n = this.isUplink_ ? 0 : this.tinyId_;
							this.signalChannel_.send(Eu, t, n), this.isIceCandidateSent_ = 1, nd({
								eventType: "getIceCandidate",
								result: "success"
							})
						}
						if (e && !this.isIceCandidateSent_ && (t = this.findCandidate(kl.HOST))) {
							this.log_.info("send ice-candidate to remote server: " + t.candidate);
							var r = this.isUplink_ ? 0 : this.tinyId_;
							this.signalChannel_.send(Eu, t, r), this.isIceCandidateSent_ = 1, nd({
								eventType: "getIceCandidate",
								result: "success"
							})
						}
					}
				}
			}, {
				key: "onIceConnectionStateChange",
				value: function(e) {
					this.log_.info("onIceConnectionStateChange() iceConnectionState: " + e.target.iceConnectionState +
						" iceGatheringState: " + e.target.iceGatheringState)
				}
			}, {
				key: "onConnectionStateChange",
				value: function(e) {
					var t = this;
					if (this.log_.info("onConnectionStateChange() connectionState: " + e.target.connectionState), "connecting" ===
						e.target.connectionState) {
						this.connectTimer_ = setTimeout(function() {
							var e = "DTLS Transport connection timeout (".concat(10, "s)");
							nd({
								eventType: "iceConnectionState",
								result: "failed"
							}), t.log_.error(e), t.emitter_.emit(qd, new ju({
								message: e,
								code: Mu.ICE_TRANSPORT_ERROR
							}))
						}, 1e4)
					} else clearTimeout(this.connectTimer_), this.connectTimer_ = -1;
					if ("failed" === e.target.connectionState) {
						var n = "ICE/DTLS Transport connection failed";
						nd({
							eventType: "iceConnectionState",
							result: "failed"
						}), this.log_.error(n), this.emitter_.emit(qd, new ju({
							message: n,
							code: Mu.ICE_TRANSPORT_ERROR
						}))
					}
					if (("connected" === e.target.connectionState || "completed" === e.target.connectionState) && (nd({
							eventType: "iceConnectionState",
							result: "success"
						}), !this.sentSubscriptionAfterConnected_ && this.pendingSubscription_.length > 0)) {
						this.log_.info("send pending subscription after RTCPeerConnection is connected");
						var r = this.pendingSubscription_[0];
						this.doSendSubscription(r.data, r.stream), this.sentSubscriptionAfterConnected_ = 1
					}
				}
			}, {
				key: "onIceGatheringStateChange",
				value: function(e) {
					this.log_.debug("onIceGatheringStateChange() iceGatheringState: " + e.target.iceGatheringState)
				}
			}, {
				key: "addIceCandidate",
				value: function(e) {
					var t = this;
					this.log_.info("add remote ice candidate: " + e.candidate), this.peerConnection_.addIceCandidate(e).then(
						function() {
							nd({
								eventType: "addIceCandidate",
								result: "success"
							})
						}).catch(function(e) {
						nd({
							eventType: "addIceCandidate",
							result: "failed"
						}), t.log_.error("failed to addIceCandidate " + e)
					})
				}
			}, {
				key: "hitTest",
				value: function(e) {
					return (0 === e || "0" === e) && this.isUplink_ || e === this.tinyId_
				}
			}, {
				key: "updateRemoteDescription",
				value: function(e) {
					var t = this;
					this.log_.debug("updateRemoteDescription() ".concat(e.sdp));
					var n = this.peerConnection_.remoteDescription.sdp;
					this.peerConnection_.setRemoteDescription(e).then(function() {
						if (nd({
								eventType: "setRemoteDescription",
								kind: "offer",
								result: "success"
							}), t.log_.info("updateRemoteDescription success"), "unified-plan" === t.sdpSemantics_) {
							var r = function(e, t) {
								var n = Vl.parse(e).media,
									r = Vl.parse(t).media;
								return {
									added: r.filter(function(e) {
										var t = n.find(function(t) {
											return t.mid === e.mid
										});
										return (void 0 === t || void 0 === t.ssrcs) && e.ssrcs
									}),
									removed: n.filter(function(e) {
										var t = r.find(function(t) {
											return t.mid === e.mid
										});
										return (void 0 === t || void 0 === t.ssrcs) && e.ssrcs
									})
								}
							}(n, e.sdp);
							t.addRemoteTrack(r.added), t.removeRemoteTrack(r.removed)
						} else t.removeRemoteTrackLegacy(n, e.sdp);
						var i = t.pendingStreams_.shift();
						i && (t.log_.debug("mark ".concat(i.getType(), " stream exit subscription cycle")), i.setInSubscriptionCycle(
							0))
					}).catch(function(e) {
						nd({
							eventType: "setRemoteDescription",
							kind: "offer",
							result: "failed"
						}), t.log_.error("updateRemoteDescription failed ".concat(e))
					})
				}
			}, {
				key: "addRemoteTrack",
				value: function(e) {
					var t = this;
					e.forEach(function(e) {
						var n = e.mid,
							r = Fl(e.ssrcs[0].id) === jd ? Nd : Ld,
							i = t.peerConnection_.getReceivers()[n];
						if (i && i.track) {
							t.log_.info("add ".concat(i.track.kind, " track ").concat(i.track.id));
							var o = t.remoteStreams_.get(r);
							if (o) o.getMediaStream().addTrack(i.track), "audio" === i.track.kind ? o.setHasAudio(1) : o.setHasVideo(
								1), t.emitter_.emit(Hd, {
								stream: o
							});
							else {
								t.log_.debug("remoteStream for msid:".concat(r, " not exist"));
								var a = new MediaStream;
								a.addTrack(i.track), (o = new bl({
									type: r === Ld ? "main" : "auxiliary",
									userId: t.userId_
								})).setMediaStream(a), o.setConnection(t), t.remoteStreams_.set(r, o), "audio" === i.track.kind ? o.setHasAudio(
									1) : o.setHasVideo(1), t.emitter_.emit("stream-added", {
									stream: o
								})
							}
						}
					})
				}
			}, {
				key: "removeRemoteTrack",
				value: function(e) {
					var t = this;
					e.forEach(function(e) {
						var n = Fl(e.ssrcs[0].id),
							r = n === Md ? "video" : n === jd ? "auxVideo" : "audio";
						t.log_.info("[".concat(r, "] track was removed"));
						var i = "auxVideo" === r ? Nd : Ld,
							o = t.remoteStreams_.get(i);
						o && (i !== Nd && 0 !== o.getMediaStream().getTracks().length || o.isInSubscriptionCycle() ? ("audio" ===
							r ? o.setHasAudio(0) : o.setHasVideo(0), t.emitter_.emit(Hd, {
								stream: o
							})) : (t.log_.info("remote stream ".concat(i, " removed")), t.remoteStreams_.delete(i), t.emitter_.emit(
							Bd, {
								stream: o
							})))
					})
				}
			}, {
				key: "removeRemoteTrackLegacy",
				value: function(e, t) {
					var n = this,
						r = Ul(e).media,
						i = Ul(t).media;
					r.filter(function(e) {
						var t, r = i.find(function(t) {
								return t.type === e.type
							}),
							o = Md;
						if ("audio" === e.type) void 0 !== r && void 0 !== r.ssrcs || !e.ssrcs || (n.log_.info(
							"[audio] track was removed"), (t = n.remoteStreams_.get(o)) && (0 === t.getMediaStream().getTracks().length ?
							t.isInSubscriptionCycle() || (n.log_.info("remote stream ".concat(o, " removed")), n.remoteStreams_.delete(
								o), n.emitter_.emit(Bd, {
								stream: t
							})) : (t.setHasAudio(0), n.emitter_.emit(Hd, {
								stream: t
							}))));
						else if ((void 0 === r || void 0 === r.ssrcs) && e.ssrcs || r.ssrcGroups && e.ssrcGroups && r.ssrcGroups.length <
							e.ssrcGroups.length) {
							var a = 0,
								s = 0;
							void 0 === r.ssrcs && 2 === e.ssrcGroups.length ? (n.log_.info("[main & aux video] tracks were removed"),
								a = 1, s = 1) : void 0 === r.ssrcs && 1 === e.ssrcGroups.length ? (n.log_.info(
								"[main video] track was removed"), a = 1) : e.ssrcGroups.length > r.ssrcGroups.length && (n.log_.info(
								"[auxiliary video] track was removed"), s = 1), s && (o = Nd, n.log_.info("remote stream ".concat(o,
								" removed")), (t = n.remoteStreams_.get(o)) && !t.isInSubscriptionCycle() && (n.remoteStreams_.delete(
								o), n.emitter_.emit(Bd, {
								stream: t
							}))), a && (o = Ld, (t = n.remoteStreams_.get(o)) && (0 === t.getMediaStream().getTracks().length ? t.isInSubscriptionCycle() ||
								(n.log_.info("remote stream ".concat(o, " removed")), n.remoteStreams_.delete(o), n.emitter_.emit(Bd, {
									stream: t
								})) : (t.setHasVideo(0), n.emitter_.emit(Hd, {
									stream: t
								}))))
						}
					})
				}
			}, {
				key: "setRemoteOffer",
				value: function(e) {
					var t = this;
					this.peerConnection_.setRemoteDescription(e).then(function() {
						return nd({
							eventType: "setRemoteDescription",
							kind: "offer",
							result: "success"
						}), t.peerConnection_.createAnswer()
					}).then(function(e) {
						return t.peerConnection_.setLocalDescription(e)
					}).then(function() {
						var e = t.peerConnection_.localDescription;
						t.signalChannel_.send(Ru, e, t.tinyId_), t.log_.info("accepted remote offer and acknowledged answer"), t.isSdpExchanged_ =
							1, t.sendIceCandidate()
					}).catch(function(e) {
						nd({
							eventType: "setRemoteDescription",
							kind: "offer",
							result: "failed"
						}), t.log_.error("failed to accept remote offer " + e)
					})
				}
			}, {
				key: "setMutedState",
				value: function(e, t) {
					if (this.isUplink_) {
						"audio" === e ? t ? this.mutedState_ |= 4 : this.mutedState_ &= -5 : t ? this.mutedState_ |= 1 : this.mutedState_ &=
							-2;
						var n = {
							srctinyid: 0,
							userid: this.userId_,
							flag: this.mutedState_
						};
						this.log_.info("set ".concat(e, " muted state: [").concat(t ? "mute" : "unmute", "]")), this.signalChannel_.send(
							Ou, n)
					}
				}
			}, {
				key: "onSubscription",
				value: function(e) {
					var t = e.data.content,
						n = t.srctinyid;
					if (this.hitTest(n)) {
						var r = 0 === t.errCode ? 1 : 0,
							i = this.pendingSubscription_.shift();
						if (void 0 !== i) {
							this.subscriptionRetryCount_ = 0, this.isSubscriptionPending_ = 0, -1 !== this.subscriptionTimeout_ && (
								clearTimeout(this.subscriptionTimeout_), this.subscriptionTimeout_ = -1);
							var o = i.stream;
							this.log_.info("".concat(o.getType(), " stream ").concat(i.type, " result: ").concat(r ? "success" :
								"failure")), "subscribe" === i.type ? (nd({
								eventType: "subscribe",
								result: 0 === t.errCode ? "success" : "failed"
							}), this.emitter_.emit(Wd, {
								result: r,
								stream: o
							})) : (nd({
								eventType: "unsubscribe",
								result: 0 === t.errCode ? "success" : "failed"
							}), this.emitter_.emit(Jd, {
								result: r,
								stream: o
							}))
						}
						if (this.pendingSubscription_.length > 0) {
							var a = this.pendingSubscription_[0];
							this.log_.info("schedule a pending subscription"), this.doSendSubscription(a.data, a.stream)
						}
					}
				}
			}, {
				key: "subscribe",
				value: function(e, t) {
					void 0 === t || "main" === e.getType() && void 0 !== t.audio && void 0 !== t.video && t.audio === this.subscribeState_
						.audio && t.video === this.subscribeState_.video || "auxiliary" === e.getType() && void 0 !== t.video &&
						this.subscribeState_.auxiliary === t.video ? this.emitter_.emit(Wd, {
							stream: e,
							result: 1
						}) : ("main" === e.getType() ? (void 0 !== t.audio && (this.subscribeState_.audio = t.audio), void 0 !== t.video &&
								(this.subscribeState_.video = t.video)) : void 0 !== t.video && (this.subscribeState_.auxiliary = t.video),
							this.log_.info("subscribe ".concat(e.getType(), " stream with options ").concat(JSON.stringify(t),
								" current state: ").concat(JSON.stringify(this.subscribeState_))), this.sendSubscription(e, "subscribe"))
				}
			}, {
				key: "unsubscribe",
				value: function(e) {
					"main" === e.getType() ? (this.subscribeState_.audio = 0, this.subscribeState_.video = 0) : this.subscribeState_
						.auxiliary = 0, this.log_.info("unsubscribe ".concat(e.getType(), " stream with ").concat(JSON.stringify(
							this.subscribeState_))), this.sendSubscription(e, "unsubscribe")
				}
			}, {
				key: "sendSubscription",
				value: function(e, t) {
					var n = {
						srctinyid: this.tinyId_,
						userid: this.userId_,
						audio: this.subscribeState_.audio,
						bigVideo: this.subscribeState_.video,
						auxVideo: this.subscribeState_.auxiliary
					};
					this.pendingSubscription_.length > 0 ? this.log_.debug("queue the subscription for later handling") : this.doSendSubscription(
						n, e), this.pendingSubscription_.push({
						stream: e,
						type: t,
						data: n
					}), e.setInSubscriptionCycle(1)
				}
			}, {
				key: "doSendSubscription",
				value: function(e, t) {
					var n = this;
					"connected" === this.peerConnection_.connectionState || "completed" === this.peerConnection_.connectionState ?
						(t && this.pendingStreams_.push(t), this.log_.debug(
							"doSendSubscription() send SUBSCRIBE command with data: ".concat(JSON.stringify(e))), this.signalChannel_.send(
							Du, e), this.isSubscriptionPending_ = 1, this.subscriptionTimeout_ = setTimeout(function() {
							if (n.isSubscriptionPending_)
								if (n.log_.debug("subscription timeout"), n.subscriptionRetryCount_ += 1, n.subscriptionRetryCount_ <= 3) {
									n.log_.debug("resend subscription");
									var e = n.pendingSubscription_[0].data;
									n.doSendSubscription(e)
								} else n.log_.error("remote server not response to subscription"), n.pendingSubscription_.shift(), n.pendingStreams_
									.shift(), n.isSubscriptionPending_ = 0, n.subscriptionRetryCount_ = 0, n.emitter_.emit(qd, new ju({
										code: Mu.SUBSCRIPTION_TIMEOUT,
										message: "remote server not response to subscription"
									}))
						}, 2e3)) : this.log_.debug("try to send subscription when connectionState ".concat(this.peerConnection_.connectionState))
				}
			}, {
				key: "getPeerConnection",
				value: function() {
					return this.peerConnection_
				}
			}, {
				key: "getUserId",
				value: function() {
					return this.userId_
				}
			}, {
				key: "getTinyId",
				value: function() {
					return this.tinyId_
				}
			}, {
				key: "on",
				value: function(e, t) {
					this.emitter_.on(e, t)
				}
			}]), e
		}(),
		Hl = function() {
			function e(t) {
				et(this, e), this.prevReport_ = {}
			}
			var t, n, r, i;
			return nt(e, [{
				key: "getSenderStats",
				value: (i = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (n = {
										audio: {
											bytesSent: 0,
											packetsSent: 0
										},
										video: {
											bytesSent: 0,
											packetsSent: 0,
											framesEncoded: 0,
											frameWidth: 0,
											frameHeight: 0,
											framesSent: 0
										},
										rtt: 0
									}, !(r = t.getPeerConnection())) {
									e.next = 13;
									break
								}
								return e.prev = 3, e.next = 6, r.getStats();
							case 6:
								e.sent.forEach(function(e) {
									"outbound-rtp" === e.type ? "video" === e.mediaType ? (n.video.bytesSent = e.bytesSent, n.video.packetsSent =
											e.packetsSent, n.video.framesEncoded = e.framesEncoded) : "audio" === e.mediaType && (n.audio.bytesSent =
											e.bytesSent, n.audio.packetsSent = e.packetsSent) : "candidate-pair" === e.type ? n.rtt = 1e3 *
										e.currentRoundTripTime : "track" === e.type && -1 !== e.id.indexOf("_sender_") && void 0 !== e.frameWidth &&
										(n.video.frameWidth = e.frameWidth, n.video.frameHeight = e.frameHeight, n.video.framesSent = e.framesSent)
								}), e.next = 13;
								break;
							case 10:
								e.prev = 10, e.t0 = e.catch(3), Hn.warn("failed to getStats on sender connection");
							case 13:
								return e.abrupt("return", n);
							case 14:
							case "end":
								return e.stop()
						}
					}, e, null, [
						[3, 10]
					])
				})), function(e) {
					return i.apply(this, arguments)
				})
			}, {
				key: "getReceiverStats",
				value: (r = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (n = {
										tinyId: t.getTinyId(),
										userId: t.getUserId(),
										hasAudio: 0,
										hasVideo: 0,
										audio: {
											bytesReceived: 0,
											packetsReceived: 0,
											packetsLost: 0,
											jitter: 0
										},
										video: {
											bytesReceived: 0,
											packetsReceived: 0,
											packetsLost: 0,
											framesDecoded: 0,
											frameWidth: 0,
											frameHeight: 0
										}
									}, !(r = t.getPeerConnection())) {
									e.next = 13;
									break
								}
								return e.prev = 3, e.next = 6, r.getStats();
							case 6:
								e.sent.forEach(function(e) {
									"inbound-rtp" === e.type ? "audio" === e.mediaType ? (n.audio.packetsReceived = e.packetsReceived,
											n.audio.bytesReceived = e.bytesReceived, n.audio.packetsLost = e.packetsLost, n.audio.jitter =
											e.jitter, n.hasAudio = 1) : "video" === e.mediaType && (n.video.packetsReceived = e.packetsReceived,
											n.video.bytesReceived = e.bytesReceived, n.video.packetsLost = e.packetsLost, n.video.framesDecoded =
											e.framesDecoded, n.hasVideo = 1) : "track" === e.type && -1 !== e.id.indexOf("_receiver_") &&
										void 0 !== e.frameWidth && (n.video.frameWidth = e.frameWidth, n.video.frameHeight = e.frameHeight)
								}), e.next = 13;
								break;
							case 10:
								e.prev = 10, e.t0 = e.catch(3), Hn.warn("failed to getStats on receiver connection");
							case 13:
								return e.abrupt("return", n);
							case 14:
							case "end":
								return e.stop()
						}
					}, e, null, [
						[3, 10]
					])
				})), function(e) {
					return r.apply(this, arguments)
				})
			}, {
				key: "getStats",
				value: (n = Ze(regeneratorRuntime.mark(function e(t, n) {
					var r, i, o, a, s, c, u, d, l, p;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (r = {}, !t) {
									e.next = 5;
									break
								}
								return e.next = 4, this.getSenderStats(t);
							case 4:
								r = e.sent;
							case 5:
								i = [], o = 1, a = 0, s = void 0, e.prev = 9, c = n[Symbol.iterator]();
							case 11:
								if (o = (u = c.next()).done) {
									e.next = 20;
									break
								}
								return (d = pt(u.value, 2))[0], l = d[1], e.next = 15, this.getReceiverStats(l);
							case 15:
								p = e.sent, i.push(p);
							case 17:
								o = 1, e.next = 11;
								break;
							case 20:
								e.next = 26;
								break;
							case 22:
								e.prev = 22, e.t0 = e.catch(9), a = 1, s = e.t0;
							case 26:
								e.prev = 26, e.prev = 27, o || null == c.return || c.return();
							case 29:
								if (e.prev = 29, !a) {
									e.next = 32;
									break
								}
								throw s;
							case 32:
								return e.finish(29);
							case 33:
								return e.finish(26);
							case 34:
								return e.abrupt("return", {
									senderStats: r,
									receiverStats: i
								});
							case 35:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[9, 22, 26, 34],
						[27, , 29, 33]
					])
				})), function(e, t) {
					return n.apply(this, arguments)
				})
			}, {
				key: "prepareReport",
				value: function(e, t) {
					_u(e.senderStats) || (t.uint32_delay = e.senderStats.rtt, t.AudioReportState.uint32_audio_enc_pkg_br = e.senderStats
							.audio.bytesSent, t.VideoReportState.uint32_video_snd_br = e.senderStats.video.bytesSent, t.VideoReportState
							.uint32_send_total_pkg = e.senderStats.video.packetsSent, t.VideoReportState.VideoEncState[0].uint32_enc_width =
							e.senderStats.video.frameWidth, t.VideoReportState.VideoEncState[0].uint32_enc_height = e.senderStats.video
							.frameHeight, t.VideoReportState.VideoEncState[0].uint32_enc_fps = e.senderStats.video.framesSent), e.receiverStats
						.forEach(function(e) {
							e.hasAudio && (t.AudioReportState.AudioDecState.push({
									uint32_audio_delay: 0,
									uint32_audio_jitter: e.audio.jitter,
									uint32_audio_real_recv_pkg: e.audio.packetsReceived,
									uint32_audio_flow: e.audio.bytesReceived,
									uint32_audio_real_recv_br: 0,
									uint64_sender_uin: e.tinyId,
									packetsLost: e.audio.packetsLost
								}), t.AudioReportState.uint32_audio_real_recv_pkg += e.audio.packetsReceived, t.AudioReportState.uint32_audio_flow +=
								e.audio.bytesReceived, t.uint32_real_num += e.audio.packetsReceived), e.hasVideo && (t.VideoReportState.VideoDecState
								.push({
									uint32_video_recv_fps: e.video.framesDecoded,
									uint32_video_recv_br: e.video.bytesReceived,
									uint32_video_real_recv_pkg: e.video.packetsReceived,
									uint32_dec_height: e.video.frameHeight,
									uint32_dec_width: e.video.frameWidth,
									uint32_video_jitter: 0,
									uint64_sender_uin: e.tinyId,
									packetsLost: e.video.packetsLost
								}), t.VideoReportState.uint32_video_total_real_recv_pkg += e.video.packetsReceived, t.VideoReportState.uint32_video_rcv_br +=
								e.video.bytesReceived)
						}), t.uint64_end_utime = (new Date).getTime();
					var n = this.prevReport_;
					if (this.prevReport_ = JSON.parse(JSON.stringify(t)), _u(n)) t.AudioReportState.uint32_audio_enc_pkg_br = 8 *
						t.AudioReportState.uint32_audio_enc_pkg_br / 2, t.VideoReportState.uint32_video_rcv_br = 8 * t.VideoReportState
						.uint32_video_rcv_br / 2, t.VideoReportState.uint32_video_snd_br = 8 * t.VideoReportState.uint32_video_snd_br /
						2, t.VideoReportState.VideoDecState.forEach(function(e) {
							e.uint32_video_recv_br = 8 * e.uint32_video_recv_br / 2, t.uint32_total_send_bps = t.AudioReportState.uint32_audio_enc_pkg_br +
								t.VideoReportState.uint32_video_snd_br
						});
					else {
						t.uint64_begine_utime = n.uint64_end_utime, t.uint32_real_num -= n.uint32_real_num, t.uint32_real_num <= 0 &&
							(t.uint32_real_num = 0), t.AudioReportState.uint32_audio_real_recv_pkg -= n.AudioReportState.uint32_audio_real_recv_pkg,
							t.AudioReportState.uint32_audio_real_recv_pkg <= 0 && (t.AudioReportState.uint32_audio_real_recv_pkg = 0),
							t.AudioReportState.uint32_audio_enc_pkg_br -= n.AudioReportState.uint32_audio_enc_pkg_br, t.AudioReportState
							.uint32_audio_enc_pkg_br <= 0 && (t.AudioReportState.uint32_audio_enc_pkg_br = 0), t.AudioReportState.uint32_audio_enc_pkg_br =
							8 * t.AudioReportState.uint32_audio_enc_pkg_br / 2, t.VideoReportState.uint32_video_snd_br -= n.VideoReportState
							.uint32_video_snd_br, t.VideoReportState.uint32_video_snd_br <= 0 && (t.VideoReportState.uint32_video_snd_br =
								0), t.VideoReportState.uint32_video_snd_br = 8 * t.VideoReportState.uint32_video_snd_br / 2, t.AudioReportState
							.uint32_audio_flow -= n.AudioReportState.uint32_audio_flow, t.AudioReportState.uint32_audio_flow <= 0 && (t
								.AudioReportState.uint32_audio_flow = 0), t.VideoReportState.uint32_send_total_pkg -= n.VideoReportState.uint32_send_total_pkg,
							t.VideoReportState.uint32_send_total_pkg <= 0 && (t.VideoReportState.uint32_send_total_pkg = 0), t.VideoReportState
							.uint32_video_rcv_br -= n.VideoReportState.uint32_video_rcv_br, t.VideoReportState.uint32_video_rcv_br <= 0 &&
							(t.VideoReportState.uint32_video_rcv_br = 0), t.VideoReportState.uint32_video_rcv_br = 8 * t.VideoReportState
							.uint32_video_rcv_br / 2, t.VideoReportState.uint32_video_total_real_recv_pkg -= n.VideoReportState.uint32_video_total_real_recv_pkg,
							t.VideoReportState.uint32_video_total_real_recv_pkg <= 0 && (t.VideoReportState.uint32_video_total_real_recv_pkg =
								0), t.VideoReportState.VideoEncState[0].uint32_enc_fps -= n.VideoReportState.VideoEncState[0].uint32_enc_fps,
							t.VideoReportState.VideoEncState[0].uint32_enc_fps < 0 && (t.VideoReportState.VideoEncState[0].uint32_enc_fps =
								0), t.VideoReportState.VideoEncState[0].uint32_enc_fps = t.VideoReportState.VideoEncState[0].uint32_enc_fps /
							2;
						for (var r = t.VideoReportState.VideoDecState.length, i = 0; i < r; i++) {
							for (var o = t.VideoReportState.VideoDecState[i], a = o.uint64_sender_uin, s = o.uint32_video_real_recv_pkg,
									c = o.uint32_video_recv_br, u = o.uint32_video_recv_fps, d = 0; d < n.VideoReportState.VideoDecState.length; d++) {
								var l = n.VideoReportState.VideoDecState[d];
								if (l.uint64_sender_uin === a) {
									(s -= l.uint32_video_real_recv_pkg) <= 0 && (s = 0), (c -= l.uint32_video_recv_br) <= 0 && (c = 0), (u -=
										l.uint32_video_recv_fps) < 0 && (u = 0);
									break
								}
							}
							t.VideoReportState.VideoDecState[i].uint32_video_real_recv_pkg = s, t.VideoReportState.VideoDecState[i].uint32_video_recv_br =
								8 * c / 2, t.VideoReportState.VideoDecState[i].uint32_video_recv_fps = u / 2
						}
						r = t.AudioReportState.AudioDecState.length;
						for (var p = 0; p < r; p++) {
							for (var f = t.AudioReportState.AudioDecState[p], h = f.uint32_audio_real_recv_pkg, m = f.uint32_audio_flow,
									v = f.uint64_sender_uin, g = 0; g < n.AudioReportState.AudioDecState.length; g++) {
								var _ = n.AudioReportState.AudioDecState[g];
								if (_.uint64_sender_uin === v) {
									(h -= _.uint32_audio_real_recv_pkg) <= 0 && (h = 0), (m -= _.uint32_audio_flow) <= 0 && (m = 0);
									break
								}
							}
							t.AudioReportState.AudioDecState[p].uint32_audio_real_recv_pkg = h, t.AudioReportState.AudioDecState[p].uint32_audio_flow =
								m, t.AudioReportState.AudioDecState[p].uint32_audio_real_recv_br = 8 * m / 2
						}
						t.AudioReportState.uint32_audio_real_recv_br = 8 * t.AudioReportState.uint32_audio_flow / 2, t.uint32_real_num =
							t.AudioReportState.uint32_audio_real_recv_pkg + t.VideoReportState.uint32_video_total_real_recv_pkg, t.uint32_total_send_bps =
							t.AudioReportState.uint32_audio_enc_pkg_br + t.VideoReportState.uint32_video_snd_br, t.uint32_total_recv_bps =
							t.AudioReportState.uint32_audio_real_recv_br + t.VideoReportState.uint32_video_rcv_br
					}
					return t
				}
			}, {
				key: "getStatsReport",
				value: (t = Ze(regeneratorRuntime.mark(function e(t, n) {
					var r, i;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return r = {
									uint64_begine_utime: (new Date).getTime(),
									uint64_end_utime: 0,
									uint32_real_num: 0,
									uint32_delay: 0,
									uint32_CPU_curfreq: 0,
									uint32_total_send_bps: 0,
									uint32_total_recv_bps: 0,
									AudioReportState: {
										uint32_audio_enc_pkg_br: 0,
										uint32_audio_real_recv_pkg: 0,
										uint32_audio_flow: 0,
										uint32_audio_real_recv_br: 0,
										uint32_audio_delay: 0,
										uint32_audio_jitter: 0,
										uint32_microphone_status: 1,
										AudioDecState: []
									},
									VideoReportState: {
										uint32_video_delay: 0,
										uint32_video_snd_br: 0,
										uint32_video_total_real_recv_pkg: 0,
										uint32_video_rcv_br: 0,
										uint32_send_total_pkg: 0,
										VideoEncState: [{
											uint32_enc_width: 0,
											uint32_enc_height: 0,
											uint32_capture_fps: 0,
											uint32_enc_fps: 0
										}],
										VideoDecState: []
									}
								}, e.next = 3, this.getStats(t, n);
							case 3:
								return i = e.sent, this.prepareReport(i, r), e.abrupt("return", r);
							case 6:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e, n) {
					return t.apply(this, arguments)
				})
			}]), e
		}(),
		zl = function() {
			function e(t) {
				if (et(this, e), this.mode_ = t.mode, this.sdpSemantics_ = "plan-b", void 0 !== t.sdpSemantics ? this.sdpSemantics_ =
					t.sdpSemantics : Pd() && (this.sdpSemantics_ = "unified-plan"), this.sdkAppId_ = t.sdkAppId, this.userId_ = t.userId,
					this.log_ = new yl({
						id: "c|" + this.userId_,
						direction: "local",
						type: ""
					}), this.userSig_ = t.userSig, this.roomId_ = 0, this.recordId_ = null, this.pureAudioPushMode_ = null, this.version_ =
					t.version, this.log_.info("using sdpSemantics: " + this.sdpSemantics_), Hn.setConfig({
						sdkAppId: this.sdkAppId_,
						userId: this.userId_,
						version: this.version_
					}), void 0 !== t.recordId) {
					if (!Number.isInteger(Number(t.recordId))) throw new ju({
						code: Mu.INVALID_PARAM,
						message: "recordId must be an integer number"
					});
					this.recordId_ = t.recordId
				}
				if (void 0 !== t.pureAudioPushMode) {
					if (!Number.isInteger(Number(t.pureAudioPushMode))) throw new ju({
						code: Mu.INVALID_PARAM,
						message: "pureAudioPushMode must be an integer number"
					});
					this.pureAudioPushMode_ = t.pureAudioPushMode
				}
				this.disableReceiver_ = 0, this.signalChannel_ = null, this.role_ = "anchor", this.privateMapKey_ = "", this.tinyId_ =
					0, this.proxy_ = null, this.turnServer_ = null, this.connections_ = new Map, this.mutedStates_ = new Map, this.localStream_ =
					null, this.isPublishing_ = 0, this.uplinkConnection_ = null, this.emitter_ = new yu, this.signalInfo_ = {}, this.isInitialized_ =
					0, this.isJoined_ = 0, this.heartbeat_ = -1, this.stats_ = new Hl, this.joinTimeout_ = -1, this.publishTimeout_ = -
					1, this.unpublishTimeout_ = -1
			}
			var t, n, r, i, o, a, s;
			return nt(e, [{
				key: "setProxyServer",
				value: function(e) {
					if (!e.startsWith("wss://")) throw new ju({
						code: Mu.INVALID_PARAMETER,
						message: 'proxy server url shall be started with "wss://"'
					});
					this.proxy_ = e
				}
			}, {
				key: "getUrl",
				value: function(e) {
					var t = Zu(e);
					return !Xu() && this.proxy_ && (t = this.proxy_), t
				}
			}, {
				key: "getBackupUrl",
				value: function() {
					return this.proxy_ ? this.proxy_ : Zu("wss://bk.rtc.qq.com:8687")
				}
			}, {
				key: "setTurnServer",
				value: function(e) {
					this.turnServer_ = {}, this.turnServer_.urls = "turn://" + e.url, void 0 !== e.username && void 0 !== e.credential &&
						(this.turnServer_.username = e.username, this.turnServer_.credential = e.credential, this.turnServer_.credentialType =
							"password", void 0 !== this.turnServer_.credentialType && (this.turnServer_.credentialType = e.credentialType)
						)
				}
			}, {
				key: "initialize",
				value: function() {
					var e = this;
					return new Promise(function(t, n) {
						e.log_.info("setup signal channel"), e.signalChannel_ = new id({
							sdkAppId: e.sdkAppId_,
							userId: e.userId_,
							userSig: e.userSig_,
							url: e.getUrl("wss://qcloud.rtc.qq.com:8687"),
							backupUrl: e.getUrl("wss://bk.rtc.qq.com:8687"),
							version: e.version_
						}), e.signalChannel_.on(Su, function(t) {
							e.log_.info("SignalChannel state changed from ".concat(t.prevState, " to ").concat(t.state)), e.emitter_
								.emit(Xd, t)
						}), e.signalChannel_.on(bu, function(t) {
							e.isInitialized_ ? (e.closeUplink(), e.emitter_.emit(al, t)) : n(t)
						}), e.signalChannel_.on(wu.CHANNEL_SETUP_FAILED, function(t) {
							e.log_.error("signal channel setup failed"), n(t)
						}), e.signalChannel_.on(wu.CHANNEL_SETUP_SUCCESS, function(n) {
							e.signalInfo_ = n.signalInfo, e.tinyId_ = e.signalInfo_.tinyId, e.isInitialized_ = 1, t()
						}), e.signalChannel_.on(wu.PEER_JOIN, function(t) {
							e.disableReceiver_ || e.onPeerJoin(t.data)
						}), e.signalChannel_.on(wu.PEER_LEAVE, function(t) {
							e.onPeerLeave(t.data)
						}), e.signalChannel_.on(wu.UPDATE_REMOTE_MUTE_STAT, function(t) {
							e.onUpdateRemoteMuteStat(t.data)
						}), e.signalChannel_.on(wu.CLINET_BANNDED, function(t) {
							var n = t.data.content;
							if (e.closeUplink(), "banned" === n.type) {
								var r = "you got banned by account admin";
								e.log_.error("user was banned because of " + r), e.onClientBanned(r)
							} else if ("kick" === n.type) {
								var i = "duplicated userId joining the room";
								e.log_.error("user was banned because of " + i), e.onClientBanned(i)
							} else e.log_.error("Relay server timeout observed"), e.emitter_.emit(al, new ju({
								code: Mu.SERVER_TIMEOUT,
								message: "Relay server timeout observed"
							}))
						}), e.signalChannel_.on(wu.REQUEST_REBUILD_SESSION, function(t) {
							e.signalInfo_ = t.signalInfo;
							var n = [];
							e.connections_ && n.push(0);
							var r = [],
								i = 1,
								o = 0,
								a = void 0;
							try {
								for (var s, c = e.connections_[Symbol.iterator](); !(i = (s = c.next()).done); i = 1) {
									var u = pt(s.value, 2),
										d = u[0],
										l = u[1];
									n.push(d);
									var p = l.getPeerConnection().remoteDescription;
									p && r.push(p.sdp)
								}
							} catch (h) {
								o = 1, a = h
							} finally {
								try {
									i || null == c.return || c.return()
								} finally {
									if (o) throw a
								}
							}
							var f = {
								socketid: e.signalInfo_.socketId,
								tinyid: e.tinyId_,
								appid: e.sdkAppId_,
								openid: e.userId_,
								sessionid: e.roomId_,
								sids: n,
								relayInfo: e.signalInfo_.relayInnerIp,
								remotesdp: r
							};
							try {
								e.log_.info("reconnect - rebuild session with data: ".concat(JSON.stringify(f))), e.signalChannel_.send(
									Au, f)
							} catch (cp) {
								e.log_.error("reconnect failed because rebuild session failed")
							}
						}), e.signalChannel_.connect()
					})
				}
			}, {
				key: "join",
				value: (s = Ze(regeneratorRuntime.mark(function e(t) {
					var n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return (n = Xu()) || (n = "qcloud", this.proxy_ && this.proxy_.startsWith("wss://trtc.rtc.qq.com") &&
									(n = "trtc")), td({
									env: n,
									sdkAppId: this.sdkAppId_,
									userId: this.userId_,
									version: this.version_
								}), e.prev = 3, e.next = 6, this.initialize();
							case 6:
								return e.next = 8, this.doJoin(t);
							case 8:
								e.next = 14;
								break;
							case 10:
								throw e.prev = 10, e.t0 = e.catch(3), nd({
									eventType: "join",
									result: "failed"
								}), e.t0;
							case 14:
								nd({
									eventType: "join",
									result: "success"
								});
							case 15:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[3, 10]
					])
				})), function(e) {
					return s.apply(this, arguments)
				})
			}, {
				key: "doJoin",
				value: function(e) {
					var t = this;
					return new Promise(function(n, r) {
						if (!t.isInitialized_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "SignalChannel is not ready yet"
						});
						if (t.isJoined_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "duplicate join() called"
						});
						t.roomId_ = e.roomId, void 0 !== e.role && (t.role_ = e.role);
						var i = "";
						void 0 !== e.privateMapKey && (i = e.privateMapKey), t.privateMapKey_ = i, t.log_.info(
							"Join() => joining room: ".concat(e.roomId, " mode: ").concat(t.mode_, " role: ").concat(t.role_));
						var o = t.signalInfo_,
							a = {
								openid: o.openId,
								tinyid: o.tinyId,
								peerconnectionport: "",
								useStrRoomid: 0,
								roomid: String(e.roomId),
								sdkAppID: String(t.sdkAppId_),
								socketid: o.socketId,
								userSig: t.userSig_,
								privMapEncrypt: i,
								privMap: "",
								relayip: o.relayInnerIp,
								dataport: o.dataPort,
								stunport: o.stunPort,
								checkSigSeq: o.checkSigSeq,
								pstnBizType: 0,
								pstnPhoneNumber: null,
								recordId: t.recordId_,
								pureAudioPushMod: t.pureAudioPushMode_,
								role: "user",
								jsSdkVersion: String(4e3),
								sdpSemantics: t.sdpSemantics_,
								browserVersion: Rd,
								closeLocalMedia: 1,
								trtcscene: "live" === t.mode_ ? Ad : xd,
								trtcrole: "anchor" === t.role_ ? Od : Dd,
								report: null
							};
						t.joinTimeout_ = setTimeout(function() {
							t.log_.error("join room timeout observed"), r(new ju({
								code: Mu.JOIN_ROOM_FAILED,
								message: "join room timeout"
							}))
						}, 2e3), t.signalChannel_.send(Iu, a), t.signalChannel_.once(wu.JOIN_ROOM_RESULT, function(e) {
							clearTimeout(t.joinTimeout_), t.joinTimeout_ = -1;
							var i = e.data.content.ret;
							i ? (t.log_.error("Join room failed result: " + i + " error: " + e.data.content.error), r(new ju({
								code: Mu.JOIN_ROOM_FAILED,
								message: "Failed to join room - " + e.data.content.error
							}))) : (t.isJoined_ = 1, t.log_.info("Join room success, start heartbeat"), t.startHeartbeat(), n())
						})
					})
				}
			}, {
				key: "leave",
				value: (a = Ze(regeneratorRuntime.mark(function e() {
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								return e.prev = 0, e.next = 3, this.doLeave();
							case 3:
								e.next = 7;
								break;
							case 5:
								e.prev = 5, e.t0 = e.catch(0);
							case 7:
								this.isJoined_ = 0, this.destroy(), nd({
									eventType: "leave",
									result: "success"
								});
							case 10:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[0, 5]
					])
				})), function() {
					return a.apply(this, arguments)
				})
			}, {
				key: "doLeave",
				value: function() {
					var e = this;
					return new Promise(function(t, n) {
						return e.isJoined_ ? (e.log_.info("leave() => leaving room"), e.stopHeartbeat(), e.closeConnections(), e.mutedStates_
							.clear(), e.clearPublishTimeout(), e.clearUnpublishTimeout(), e.closeUplink(), t()) : t()
					})
				}
			}, {
				key: "clearPublishTimeout",
				value: function() {
					-1 !== this.publishTimeout_ && (clearTimeout(this.publishTimeout_), this.publishTimeout_ = -1)
				}
			}, {
				key: "clearUnpublishTimeout",
				value: function() {
					this.unpublishTimeout_ && (clearTimeout(this.unpublishTimeout_), this.unpublishTimeout_ = -1)
				}
			}, {
				key: "closeConnections",
				value: function() {
					this.connections_.forEach(function(e) {
						e.close()
					}), this.connections_.clear()
				}
			}, {
				key: "destroy",
				value: function() {
					if (this.isJoined_) throw this.log_.warn("please call leave() before destroy() client"), new ju({
						code: Mu.INVALID_OPERATION,
						message: "Please call leave() before destory() the client"
					});
					this.log_.info("destroying SignalChannel"), this.signalChannel_ && (this.signalChannel_.close(), this.signalChannel_ =
						null)
				}
			}, {
				key: "publish",
				value: function(e) {
					var t = this;
					return new Promise(function(n, r) {
						if (!t.isJoined_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "please call join() before publish()"
						});
						if ("live" === t.mode_ && "audience" === t.role_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: 'no permission to publish() under live/audience, please call swithRole("anchor") firstly before publish()'
						});
						if (t.localStream_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "duplicate publishing, please unpublish and then re-publish"
						});
						if (t.isPublishing_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "previous publishing is ongoing, please avod re-publishing"
						});
						t.isPublishing_ = 1, t.log_.info("publish() => publishing local stream");
						var i = new Bl({
							userId: t.userId_,
							tinyId: t.tinyId_,
							client: t,
							iceServers: t.signalInfo_.stunServers,
							isUplink: 1,
							signalChannel: t.signalChannel_
						});
						i.initialize(), t.publishTimeout_ = setTimeout(function() {
							t.log_.error("failed to publish because of timeout"), nd({
								eventType: "publish",
								result: "failed"
							}), r(new ju({
								code: Mu.UNKNOWN,
								message: "publish timeout"
							}))
						}, 2e3), i.publish(e, function(e) {
							t.clearPublishTimeout(), t.isPublishing_ = 0, t.log_.error("failed to publish stream"), nd({
								eventType: "publish",
								result: "failed"
							}), r(e)
						}), i.on(zd, function(e) {
							t.clearPublishTimeout(), t.isPublishing_ = 0, t.localStream_ = e.stream, t.localStream_.setConnection(i),
								t.uplinkConnection_ = i, nd({
									eventType: "publish",
									result: "success"
								}), n()
						}), i.on(qd, function(e) {
							t.emitter_.emit(al, e)
						})
					})
				}
			}, {
				key: "unpublish",
				value: function(e) {
					var t = this;
					return new Promise(function(n, r) {
						if (t.isPublishing_) throw new ju({
							code: Mu.INVALID_OPERATION,
							message: "unpublish() is being called during publish() is ongoing"
						});
						if (e !== t.localStream_) throw new ju({
							code: Mu.INVALID_PARAMETER,
							message: "stream has not been published yet"
						});
						t.log_.info("unpublish() => unpublishing local stream"), t.doUnpublish().then(function() {
							nd({
								eventType: "unpublish",
								result: "success"
							}), n()
						}).catch(function(e) {
							nd({
								eventType: "unpublish",
								result: "failed"
							}), r()
						})
					})
				}
			}, {
				key: "doUnpublish",
				value: function() {
					var e = this;
					return new Promise(function(t, n) {
						e.signalChannel_.send(Pu), e.unpublishTimeout_ = setTimeout(function() {
							e.log_.warn("unpublish() timeout"), e.closeUplink()
						}, 2e3), e.signalChannel_.once(wu.CLOSE_PEER_ACK, function(n) {
							return e.clearUnpublishTimeout(), e.log_.info("received CLOSE_PEER_ACK, close uplink connection"), e.closeUplink(),
								t()
						})
					})
				}
			}, {
				key: "closeUplink",
				value: function() {
					this.uplinkConnection_ && (this.uplinkConnection_.close(), this.uplinkConnection_ = null, this.localStream_.setConnection(
						null), this.localStream_ = null)
				}
			}, {
				key: "subscribe",
				value: function(e, t) {
					if (!e.isRemote()) throw new ju({
						code: Mu.INVALID_PARAMETER,
						message: "try to subscribe a local stream"
					});
					this.log_.info("subscribe() => subscribe to [".concat(e.getUserId(), "] ").concat(e.getType(),
						" stream with options: ").concat(JSON.stringify(t))), e.getConnection().subscribe(e, t)
				}
			}, {
				key: "unsubscribe",
				value: function(e) {
					if (!e.isRemote()) throw new ju({
						code: Mu.INVALID_PARAMETER,
						message: "try to unsubscribe a local stream"
					});
					this.log_.info("unsubscribe() => unsubscribe to [".concat(e.getUserId(), "] ").concat(e.getType(), " stream")),
						e.getConnection().unsubscribe(e)
				}
			}, {
				key: "switchRole",
				value: (o = Ze(regeneratorRuntime.mark(function e(t) {
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if ("live" === this.mode_) {
									e.next = 2;
									break
								}
								return e.abrupt("return");
							case 2:
								if (this.role_ === t) {
									e.next = 11;
									break
								}
								if (this.role_ = t, this.log_.info("switchRole() => switch role to: " + t), this.isJoined_) {
									e.next = 7;
									break
								}
								return e.abrupt("return");
							case 7:
								return e.next = 9, this.leave();
							case 9:
								return e.next = 11, this.join({
									role: t,
									roomId: this.roomId_,
									privateMapKey: this.privateMapKey_
								});
							case 11:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return o.apply(this, arguments)
				})
			}, {
				key: "on",
				value: function(e, t) {
					this.emitter_.on(e, t)
				}
			}, {
				key: "off",
				value: function(e, t) {
					this.emitter_.off(e, t)
				}
			}, {
				key: "getRemoteMutedState",
				value: function() {
					var e = this,
						t = [];
					return this.mutedStates_.forEach(function(n, r, i) {
						var o = e.connections_.get(r);
						o && t.push(it({
							userId: o.getUserId()
						}, n))
					}), t
				}
			}, {
				key: "setDefaultMuteRemoteStreams",
				value: function(e) {
					this.log_.info("setDefaultMuteRemoteStreams muted: " + e), this.disableReceiver_ = e
				}
			}, {
				key: "getLocalAudioStats",
				value: (i = Ze(regeneratorRuntime.mark(function e() {
					var t, n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if ((t = {})[this.userId_] = {
										bytesSent: 0,
										packetsSent: 0
									}, !this.uplinkConnection_) {
									e.next = 7;
									break
								}
								return e.next = 5, this.stats_.getSenderStats(this.uplinkConnection_);
							case 5:
								n = e.sent, t[this.userId_] = {
									bytesSent: n.audio.bytesSent,
									packetsSent: n.audio.packetsSent
								};
							case 7:
								return e.abrupt("return", t);
							case 8:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function() {
					return i.apply(this, arguments)
				})
			}, {
				key: "getLocalVideoStats",
				value: (r = Ze(regeneratorRuntime.mark(function e() {
					var t, n;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if ((t = {})[this.userId_] = {
										bytesSent: 0,
										packetsSent: 0,
										framesEncoded: 0,
										framesSent: 0,
										frameWidth: 0,
										frameHeight: 0
									}, !this.uplinkConnection_) {
									e.next = 7;
									break
								}
								return e.next = 5, this.stats_.getSenderStats(this.uplinkConnection_);
							case 5:
								n = e.sent, t[this.userId_] = {
									bytesSent: n.video.bytesSent,
									packetsSent: n.video.packetsSent,
									framesEncoded: n.video.framesEncoded,
									framesSent: n.video.framesSent,
									frameWidth: n.video.frameWidth,
									frameHeight: n.video.frameHeight
								};
							case 7:
								return e.abrupt("return", t);
							case 8:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function() {
					return r.apply(this, arguments)
				})
			}, {
				key: "getRemoteAudioStats",
				value: (n = Ze(regeneratorRuntime.mark(function e() {
					var t, n, r, i, o, a, s, c, u;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								t = {}, n = 1, r = 0, i = void 0, e.prev = 4, o = this.connections_[Symbol.iterator]();
							case 6:
								if (n = (a = o.next()).done) {
									e.next = 15;
									break
								}
								return (s = pt(a.value, 2))[0], c = s[1], e.next = 10, this.stats_.getReceiverStats(c);
							case 10:
								(u = e.sent).hasAudio && (t[u.userId] = {
									bytesReceived: u.audio.bytesReceived,
									packetsReceived: u.audio.packetsReceived,
									packetsLost: u.audio.packetsLost
								});
							case 12:
								n = 1, e.next = 6;
								break;
							case 15:
								e.next = 21;
								break;
							case 17:
								e.prev = 17, e.t0 = e.catch(4), r = 1, i = e.t0;
							case 21:
								e.prev = 21, e.prev = 22, n || null == o.return || o.return();
							case 24:
								if (e.prev = 24, !r) {
									e.next = 27;
									break
								}
								throw i;
							case 27:
								return e.finish(24);
							case 28:
								return e.finish(21);
							case 29:
								return e.abrupt("return", t);
							case 30:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[4, 17, 21, 29],
						[22, , 24, 28]
					])
				})), function() {
					return n.apply(this, arguments)
				})
			}, {
				key: "getRemoteVideoStats",
				value: (t = Ze(regeneratorRuntime.mark(function e() {
					var t, n, r, i, o, a, s, c, u;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								t = {}, n = 1, r = 0, i = void 0, e.prev = 4, o = this.connections_[Symbol.iterator]();
							case 6:
								if (n = (a = o.next()).done) {
									e.next = 15;
									break
								}
								return (s = pt(a.value, 2))[0], c = s[1], e.next = 10, this.stats_.getReceiverStats(c);
							case 10:
								(u = e.sent).hasVideo && (t[u.userId] = {
									bytesReceived: u.video.bytesReceived,
									packetsReceived: u.video.packetsReceived,
									packetsLost: u.video.packetsLost,
									framesDecoded: u.video.framesDecoded,
									frameWidth: u.video.frameWidth,
									frameHeight: u.video.frameHeight
								});
							case 12:
								n = 1, e.next = 6;
								break;
							case 15:
								e.next = 21;
								break;
							case 17:
								e.prev = 17, e.t0 = e.catch(4), r = 1, i = e.t0;
							case 21:
								e.prev = 21, e.prev = 22, n || null == o.return || o.return();
							case 24:
								if (e.prev = 24, !r) {
									e.next = 27;
									break
								}
								throw i;
							case 27:
								return e.finish(24);
							case 28:
								return e.finish(21);
							case 29:
								return e.abrupt("return", t);
							case 30:
							case "end":
								return e.stop()
						}
					}, e, this, [
						[4, 17, 21, 29],
						[22, , 24, 28]
					])
				})), function() {
					return t.apply(this, arguments)
				})
			}, {
				key: "getSdpSemantics",
				value: function() {
					return this.sdpSemantics_
				}
			}, {
				key: "getIceServers",
				value: function() {
					var e = [];
					return e.push({
						urls: this.signalInfo_.stunServers
					}), this.turnServer_ && e.push(this.turnServer_), e
				}
			}, {
				key: "startHeartbeat",
				value: function() {
					if (-1 === this.heartbeat_) {
						this.log_.info("startHeartbeat..."), this.heartbeat_ = setInterval(this.doHeartbeat.bind(this), 2e3)
					}
				}
			}, {
				key: "stopHeartbeat",
				value: function() {
					-1 !== this.heartbeat_ && (this.log_.info("stopHeartbeat"), clearInterval(this.heartbeat_), this.heartbeat_ = -
						1)
				}
			}, {
				key: "doHeartbeat",
				value: function() {
					var e = this;
					this.stats_.getStatsReport(this.uplinkConnection_, this.connections_).then(function(t) {
						var n = {
								WebRTCQualityReq: t,
								sdkAppId: e.sdkAppId_,
								tinyid: e.tinyId_,
								roomid: e.roomId_,
								socketid: e.signalInfo_.socketId,
								clientip: e.signalInfo_.localIp,
								serverip: e.signalInfo_.relayIp,
								cpunumber: navigator.hardwareConcurrency || 0,
								cpudevice: navigator.platform,
								devicename: navigator.platform,
								ostype: navigator.platform
							},
							r = 0;
						if (e.localStream_ && e.localStream_.getMediaStream()) {
							var i = e.localStream_.getMediaStream().getAudioTracks();
							r = i.length > 0 && i[0].muted ? 3 : 1
						}
						n.WebRTCQualityReq.AudioReportState.uint32_microphone_status = r, e.signalChannel_.send(xu, n)
					})
				}
			}, {
				key: "onPeerJoin",
				value: function(e) {
					var t = this,
						n = e.content,
						r = n.srcopenid,
						i = n.srctinyid,
						o = n.remoteoffer,
						a = this.connections_.get(i);
					a && (this.log_.warn("duplicated peer-join observed, rebuild the connection"), this.log_.info("remote peer ["
							.concat(r, "] is leaving")), this.emitter_.emit(el, {
							userId: r
						}), a.close(), this.connections_.delete(i)), this.log_.info("remote peer [".concat(r, "] is online")), this.emitter_
						.emit(Zd, {
							userId: r
						});
					var s = new Bl({
						userId: r,
						tinyId: i,
						client: this,
						iceServers: this.signalInfo_.stunServers,
						isUplink: 0,
						signalChannel: this.signalChannel_
					});
					this.connections_.set(i, s), s.initialize(), s.setRemoteOffer(o), s.on(Gd, function(e) {
						t.emitter_.emit(Kd, {
							stream: e.stream
						})
					}), s.on(Bd, function(e) {
						t.emitter_.emit($d, {
							stream: e.stream
						})
					}), s.on(Hd, function(e) {
						t.emitter_.emit(Yd, {
							stream: e.stream
						})
					}), s.on(Wd, function(e) {
						t.emitter_.emit(Qd, {
							stream: e.stream
						})
					}), s.on(qd, function(e) {
						t.emitter_.emit(al, e)
					})
				}
			}, {
				key: "onPeerLeave",
				value: function(e) {
					var t = e.content,
						n = t.srctinyid,
						r = t.srcopenid,
						i = this.connections_.get(n);
					i && (void 0 === r && (r = i.getUserId()), this.log_.info("remote peer [".concat(r, "] is leaving")), this.emitter_
						.emit(el, {
							userId: r
						}), i.close(), this.connections_.delete(n))
				}
			}, {
				key: "onUpdateRemoteMuteStat",
				value: function(e) {
					var t = this,
						n = e.content;
					n.userlist.forEach(function(e) {
						var n = e.srctinyid,
							r = e.userid;
						if (0 !== n && n !== t.tinyId_)
							if (t.connections_.get(n)) {
								var i = !!(1 & e.flag),
									o = !!(8 & e.flag),
									a = !!(64 & e.flag),
									s = !!(16 & e.flag),
									c = t.mutedStates_.get(n);
								if (void 0 === c) return t.mutedStates_.set(n, {
									hasAudio: o,
									hasVideo: i,
									audioMuted: a,
									videoMuted: s
								}), i && (s ? t.emitter_.emit(nl, {
									userId: r
								}) : t.emitter_.emit(il, {
									userId: r
								})), void(o && (a ? t.emitter_.emit(tl, {
									userId: r
								}) : t.emitter_.emit(rl, {
									userId: r
								})));
								o && c.audioMuted !== a && (a ? t.emitter_.emit(tl, {
									userId: r
								}) : t.emitter_.emit(rl, {
									userId: r
								}));
								var u = !s && i;
								(!c.videoMuted && c.hasVideo) !== u && (u ? t.emitter_.emit(il, {
									userId: r
								}) : t.emitter_.emit(nl, {
									userId: r
								})), t.mutedStates_.set(n, {
									hasAudio: o,
									hasVideo: i,
									audioMuted: a,
									videoMuted: s
								})
							} else t.mutedStates_.delete(n)
					})
				}
			}, {
				key: "onClientBanned",
				value: function(e) {
					this.emitter_.emit(ol, new ju({
						code: Mu.CLIENT_BANNED,
						message: "client was banned because of " + e
					}))
				}
			}, {
				key: "triggerReconnectForTest",
				value: function(e) {
					var t = {
						exitcode: e
					};
					this.log_.warn("triggerReconnectForTest exitcode: " + e), this.signalChannel_.send(Nu, t)
				}
			}, {
				key: "setBandwidthForTest",
				value: function(e) {
					this.uplinkConnection_ && this.uplinkConnection_.setBandwidth(e)
				}
			}]), e
		}(),
		Wl = function() {
			var e = Ze(regeneratorRuntime.mark(function e(t) {
				var n;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return n = Jl(t), Hn.info("getUserMedia with contraints: " + JSON.stringify(n)), e.next = 4, navigator.mediaDevices
								.getUserMedia(n);
						case 4:
							return e.abrupt("return", e.sent);
						case 5:
						case "end":
							return e.stop()
					}
				}, e)
			}));
			return function(t) {
				return e.apply(this, arguments)
			}
		}();

	function Jl(e) {
		return {
			audio: e.audio ? void 0 !== e.microphoneId ? {
				deviceId: {
					exact: e.microphoneId
				},
				sampleRate: e.sampleRate,
				channelCount: e.channelCount
			} : {
				sampleRate: e.sampleRate,
				channelCount: e.channelCount
			} : 0,
			video: void 0 !== e.facingMode && e.video ? {
				facingMode: e.facingMode,
				width: e.width,
				height: e.height,
				frameRate: e.frameRate
			} : void 0 !== e.cameraId && e.video ? {
				deviceId: {
					exact: e.cameraId
				},
				width: e.width,
				height: e.height,
				frameRate: e.frameRate
			} : e.video ? void 0 !== e.width ? {
				width: e.width,
				height: e.height,
				frameRate: e.frameRate
			} : 1 : 0
		}
	}
	var ql = function() {
		var e = Ze(regeneratorRuntime.mark(function e(t) {
			var n, r, i, o;
			return regeneratorRuntime.wrap(function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0:
						if (n = null, !t.audio) {
							e.next = 7;
							break
						}
						return r = Kl(t), Hn.info("getUserMedia with constraints: " + JSON.stringify(r)), e.next = 6, navigator.mediaDevices
							.getUserMedia(r);
					case 6:
						n = e.sent;
					case 7:
						return i = $l(t), Hn.info("getDisplayMedia with contraints: " + JSON.stringify(i)), e.next = 11,
							navigator.mediaDevices.getDisplayMedia(i);
					case 11:
						return o = e.sent, n && o.addTrack(n.getAudioTracks()[0]), e.abrupt("return", o);
					case 14:
					case "end":
						return e.stop()
				}
			}, e)
		}));
		return function(t) {
			return e.apply(this, arguments)
		}
	}();

	function Kl(e) {
		return {
			audio: void 0 !== e.microphoneId ? {
				deviceId: {
					exact: e.microphoneId
				},
				sampleRate: e.sampleRate,
				channelCount: e.channelCount
			} : {
				sampleRate: e.sampleRate,
				channelCount: e.channelCount
			},
			video: 0
		}
	}

	function $l(e) {
		var t = {
			width: e.width,
			height: e.height,
			frameRate: e.frameRate
		};
		return void 0 !== e.screenSource && (t.displaySurface = e.screenSource), {
			video: t
		}
	}
	var Yl = new Map;
	Yl.set("120p", {
		width: 160,
		height: 120,
		frameRate: 15,
		bitrate: 200
	}), Yl.set("180p", {
		width: 320,
		height: 180,
		frameRate: 15,
		bitrate: 350
	}), Yl.set("240p", {
		width: 320,
		height: 240,
		frameRate: 15,
		bitrate: 400
	}), Yl.set("360p", {
		width: 640,
		height: 360,
		frameRate: 15,
		bitrate: 800
	}), Yl.set("480p", {
		width: 640,
		height: 480,
		frameRate: 15,
		bitrate: 900
	}), Yl.set("720p", {
		width: 1280,
		height: 720,
		frameRate: 15,
		bitrate: 1500
	}), Yl.set("1080p", {
		width: 1920,
		height: 1080,
		frameRate: 15,
		bitrate: 2e3
	}), Yl.set("1440p", {
		width: 2560,
		height: 1440,
		frameRate: 30,
		bitrate: 4860
	}), Yl.set("4K", {
		width: 3840,
		height: 2160,
		frameRate: 30,
		bitrate: 9e3
	});
	var Ql = new Map;
	Ql.set("480p", {
		width: 640,
		height: 480,
		frameRate: 5,
		bitrate: 900
	}), Ql.set("480p_2", {
		width: 640,
		height: 480,
		frameRate: 30,
		bitrate: 1e3
	}), Ql.set("720p", {
		width: 1280,
		height: 720,
		frameRate: 5,
		bitrate: 1200
	}), Ql.set("720p_2", {
		width: 1280,
		height: 720,
		frameRate: 30,
		bitrate: 3e3
	}), Ql.set("1080p", {
		width: 1920,
		height: 1080,
		frameRate: 5,
		bitrate: 1600
	}), Yl.set("1080p_2", {
		width: 1920,
		height: 1080,
		frameRate: 30,
		bitrate: 4e3
	});
	var Xl = new Map;
	Xl.set("standard", {
		sampleRate: 48e3,
		channelCount: 1,
		bitrate: 40
	}), Xl.set("high", {
		sampleRate: 48e3,
		channelCount: 1,
		bitrate: 128
	});
	var Zl = function(e) {
			function t(e) {
				var n;
				et(this, t);
				var r = it({}, e, {
					isRemote: 0,
					type: "local"
				});
				return e.screen && (r.mirror = 0), (n = dt(this, at(t).call(this, r))).video_ = e.video, n.audio_ = e.audio, n.cameraId_ =
					e.cameraId, n.facingMode_ = e.facingMode, n.microphoneId_ = e.microphoneId, n.videoSource_ = e.videoSource, n.audioSource_ =
					e.audioSource, n.screen_ = e.screen, n.screenSource_ = e.screenSource, n.audioProfile_ = {
						sampleRate: 48e3,
						channelCount: 1,
						bitrate: 40
					}, n.videoProfile_ = {
						width: 640,
						height: 480,
						frameRate: 15,
						bitrate: 900
					}, n.screenProfile_ = {
						width: 1920,
						height: 1080,
						frameRate: 5,
						bitrate: 1600
					}, n.videoBitrate_ = n.screen_ ? 1600 : 900, n
			}
			var n, r, i, o;
			return ot(t, Sl), nt(t, [{
				key: "initialize",
				value: function() {
					var e = this;
					return new Promise(function(t, n) {
						if (void 0 === e.audio_) {
							var r = new MediaStream;
							return void 0 !== e.audioSource_ && (r.addTrack(e.audioSource_), e.setHasAudio(1)), void 0 !== e.videoSource_ &&
								(r.addTrack(e.videoSource_), e.setHasVideo(1)), e.setMediaStream(r), nd({
									eventType: "stream-initialize",
									kind: "custom",
									result: "success"
								}), t()
						}
						e.screen_ ? (e.log_.info("initialize stream audio: " + e.audio_ + " screen: " + e.screen_), ql({
							audio: e.audio_,
							microphoneId: e.microphoneId_,
							screenSource: e.screenSource_,
							width: e.screenProfile_.width,
							height: e.screenProfile_.height,
							frameRate: e.screenProfile_.frameRate,
							sampleRate: e.audioProfile_.sampleRate,
							channelCount: e.audioProfile_.channelCount
						}).catch(function(t) {
							nd({
								eventType: "stream-initialize",
								kind: "getDisplayMedia",
								result: "failed"
							}), e.log_.error("getDisplayMedia error observed " + t), n(t)
						}).then(function(n) {
							return e.setMediaStream(n), e.setHasAudio(e.audio_), e.setHasVideo(1), e.listenForScreenSharingStopped(
								e.getVideoTrack()), e.setVideoContentHint("detail"), nd({
								eventType: "stream-initialize",
								kind: "getDisplayMedia",
								result: "success"
							}), t()
						})) : (e.log_.info("initialize stream audio: " + e.audio_ + " video: " + e.video_), Wl({
							audio: e.audio_,
							video: e.video_,
							facingMode: e.facingMode_,
							cameraId: e.cameraId_,
							microphoneId: e.microphoneId_,
							width: e.videoProfile_.width,
							height: e.videoProfile_.height,
							frameRate: e.videoProfile_.frameRate,
							sampleRate: e.audioProfile_.sampleRate,
							channelCount: e.audioProfile_.channelCount
						}).catch(function(t) {
							nd({
								eventType: "stream-initialize",
								kind: "getUserMedia",
								result: "failed"
							}), e.log_.error("getUserMedia error observed " + t), n(t)
						}).then(function(n) {
							return e.setMediaStream(n), e.setHasAudio(e.audio_), e.setHasVideo(e.video_), e.log_.debug(
								"gotStream hasAudio: " + e.hasAudio_ + " hasVideo: " + e.hasVideo_), nd({
								eventType: "stream-initialize",
								kind: "getUserMedia",
								result: "success"
							}), t()
						}))
					})
				}
			}, {
				key: "listenForScreenSharingStopped",
				value: function(e) {
					var t = this;
					e.addEventListener("ended", function(e) {
						t.log_.info("screensharing was stopped because the video track is ended"), t.emitter_.emit(cl)
					})
				}
			}, {
				key: "muteAudio",
				value: function() {
					var e = lt(at(t.prototype), "muteAudio", this).call(this);
					if (e) {
						this.log_.info("localStream mute audio");
						var n = this.getConnection();
						n && n.setMutedState("audio", 1)
					}
					return e
				}
			}, {
				key: "muteVideo",
				value: function() {
					this.log_.info("localStream mute video");
					var e = lt(at(t.prototype), "muteVideo", this).call(this);
					if (e) {
						var n = this.getConnection();
						n && n.setMutedState("video", 1)
					}
					return e
				}
			}, {
				key: "unmuteAudio",
				value: function() {
					var e = lt(at(t.prototype), "unmuteAudio", this).call(this);
					if (e) {
						this.log_.info("localStream unmute audio");
						var n = this.getConnection();
						n && n.setMutedState("audio", 0)
					}
					return e
				}
			}, {
				key: "unmuteVideo",
				value: function() {
					this.log_.info("localStream unmute video");
					var e = lt(at(t.prototype), "unmuteVideo", this).call(this);
					if (e) {
						var n = this.getConnection();
						n && n.setMutedState("video", 0)
					}
					return e
				}
			}, {
				key: "setAudioProfile",
				value: function(e) {
					var t;
					"object" === Qe(e) ? t = e : void 0 === (t = Xl.get(e)) && (t = Xl.get("standard")), this.log_.info(
						"setAudioProfile: " + JSON.stringify(t)), this.audioProfile_ = t
				}
			}, {
				key: "setVideoProfile",
				value: function(e) {
					var t;
					"object" === Qe(e) ? t = e : void 0 === (t = Yl.get(e)) && (t = Yl.get("480p")), this.log_.info(
						"setVideoProfile " + JSON.stringify(t)), this.videoProfile_ = t, this.videoBitrate_ = t.bitrate
				}
			}, {
				key: "getVideoBitrate",
				value: function() {
					return this.videoBitrate_
				}
			}, {
				key: "getAudioBitrate",
				value: function() {
					return this.audioProfile_.bitrate
				}
			}, {
				key: "setScreenProfile",
				value: function(e) {
					var t = e;
					"object" !== Qe(e) && void 0 === (t = Ql.get(e)) && (t = Ql.get("1080p")), this.log_.info("setScreenProfile " +
						JSON.stringify(e)), this.screenProfile_ = t, this.videoBitrate_ = t.bitrate
				}
			}, {
				key: "getVideoProfile",
				value: function() {
					return this.screen_ ? this.screenProfile_ : this.videoProfile_
				}
			}, {
				key: "getAudioProfile",
				value: function() {
					return this.audioProfile_
				}
			}, {
				key: "setVideoContentHint",
				value: function(e) {
					var t = this.getVideoTrack();
					t && "contentHint" in t && (this.log_.info("set video track contentHint to: " + e), t.contentHint = e, t.contentHint !==
						e && this.log_.warn("Invalid video track contentHint: " + e))
				}
			}, {
				key: "switchDevice",
				value: (o = Ze(regeneratorRuntime.mark(function e(n, r) {
					var i, o, a;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!("audio" === n && this.microphoneId_ === r || "video" === n && this.cameraId_ === r || this.audioSource_ ||
										this.videoSource_ || this.screen_)) {
									e.next = 2;
									break
								}
								return e.abrupt("return");
							case 2:
								if ("audio" === n && (this.microphoneId_ = r, this.audio_ || (this.audio_ = 1)), "video" === n && (
										"user" === r || "environment" === r ? this.facingMode_ = r : this.cameraId_ = r, this.video_ || (
											this.video_ = 1)), this.getMediaStream()) {
									e.next = 6;
									break
								}
								return e.abrupt("return");
							case 6:
								return this.log_.info("switchDevice " + n + " to: " + r), "video" === n && (vd || md) && (i = this.getVideoTrack()) &&
									i.stop(), e.next = 10, Wl({
										audio: this.audio_,
										video: this.video_,
										facingMode: this.facingMode_,
										cameraId: this.cameraId_,
										microphoneId: this.microphoneId_,
										width: this.videoProfile_.width,
										height: this.videoProfile_.height,
										frameRate: this.videoProfile_.frameRate,
										sampleRate: this.audioProfile_.sampleRate,
										channelCount: this.audioProfile_.channelCount
									});
							case 10:
								if (o = e.sent, this.setMediaStream(o), !(a = this.getConnection())) {
									e.next = 16;
									break
								}
								return e.next = 16, a.replaceStream(o);
							case 16:
								return this.log_.info("swichDevice - restart audio/video player"), lt(at(t.prototype),
									"restartAudio", this).call(this), lt(at(t.prototype), "restartVideo", this).call(this), e.abrupt(
									"return");
							case 20:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e, t) {
					return o.apply(this, arguments)
				})
			}, {
				key: "addTrack",
				value: (i = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r, i;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (n = this.getMediaStream()) {
									e.next = 3;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "the local stream is not initialized yet"
								});
							case 3:
								if (!("audio" === t.kind && n.getAudioTracks().length > 0 || "video" === t.kind && n.getVideoTracks()
										.length > 0)) {
									e.next = 5;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "A Stream has at most one audio track and one video track"
								});
							case 5:
								if ("video" !== t.kind) {
									e.next = 10;
									break
								}
								if (!("getSettings" in MediaStreamTrack.prototype)) {
									e.next = 10;
									break
								}
								if ((r = t.getSettings()).width === this.videoProfile_.width && r.height === this.videoProfile_.height) {
									e.next = 10;
									break
								}
								throw new ju({
									code: Mu.INVALID_PARAMETER,
									message: "video resolution of the track (".concat(r.width, " x ").concat(r.height,
										") shall be kept the same as the one defined via setVideoProfile(): ").concat(this.videoProfile_
										.width, " x ").concat(this.videoProfile_.height)
								});
							case 10:
								if (n.addTrack(t), "audio" === t.kind ? this.setHasAudio(1) : this.setHasVideo(1), !(i = this.getConnection())) {
									e.next = 16;
									break
								}
								return e.next = 16, i.addTrack(t);
							case 16:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return i.apply(this, arguments)
				})
			}, {
				key: "removeTrack",
				value: (r = Ze(regeneratorRuntime.mark(function e(t) {
					var n, r;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if ("audio" !== t.kind) {
									e.next = 2;
									break
								}
								throw new ju({
									code: Mu.INVALID_PARAMETER,
									message: "remove audio track is not supported"
								});
							case 2:
								if (n = this.getMediaStream()) {
									e.next = 5;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "the local stream is not initialized yet"
								});
							case 5:
								if (-1 !== n.getTracks().indexOf(t)) {
									e.next = 7;
									break
								}
								throw new ju({
									code: Mu.INVALID_PARAMETER,
									message: "the track to be removed is not being publishing"
								});
							case 7:
								if (n.removeTrack(t), "audio" === t.kind ? this.setHasAudio(0) : this.setHasVideo(0), !(r = this.getConnection())) {
									e.next = 14;
									break
								}
								return e.next = 13, r.removeTrack(t);
							case 13:
								r.setMutedState(t.kind, 1);
							case 14:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return r.apply(this, arguments)
				})
			}, {
				key: "replaceTrack",
				value: (n = Ze(regeneratorRuntime.mark(function e(n) {
					var r, i, o;
					return regeneratorRuntime.wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (r = this.getMediaStream()) {
									e.next = 3;
									break
								}
								throw new ju({
									code: Mu.INVALID_OPERATION,
									message: "the local stream is not initialized yet"
								});
							case 3:
								if (!("audio" === n.kind && r.getAudioTracks().length <= 0 || "video" === n.kind && r.getVideoTracks()
										.length <= 0)) {
									e.next = 5;
									break
								}
								throw new ju({
									code: Mu.INVALID_PARAMETER,
									message: "try to replace ".concat(n.kind, " track but there's no previous ").concat(n.kind,
										" being published")
								});
							case 5:
								if ("video" !== n.kind) {
									e.next = 10;
									break
								}
								if (!("getSettings" in MediaStreamTrack.prototype)) {
									e.next = 10;
									break
								}
								if ((i = n.getSettings()).width === this.videoProfile_.width && i.height === this.videoProfile_.height) {
									e.next = 10;
									break
								}
								throw new ju({
									code: Mu.INVALID_PARAMETER,
									message: "video resolution of the track (".concat(i.width, " x ").concat(i.height,
										") shall be kept the same as the one defined via setVideoProfile(): ").concat(this.videoProfile_
										.width, " x ").concat(this.videoProfile_.height)
								});
							case 10:
								if ("audio" === n.kind ? (r.removeTrack(r.getAudioTracks()[0]), r.addTrack(n), lt(at(t.prototype),
										"restartAudio", this).call(this)) : (r.removeTrack(r.getVideoTracks()[0]), r.addTrack(n), lt(at(t.prototype),
										"restartVideo", this).call(this)), !(o = this.getConnection())) {
									e.next = 15;
									break
								}
								return e.next = 15, o.replaceTrack(n);
							case 15:
							case "end":
								return e.stop()
						}
					}, e, this)
				})), function(e) {
					return n.apply(this, arguments)
				})
			}]), t
		}(),
		ep = function() {
			function e() {
				et(this, e), this.cache = [], this.init()
			}
			return nt(e, [{
				key: "report",
				value: function(e, t) {
					var n = this;
					try {
						window.MtaH5 ? (window.MtaH5.clickStat(e, t), this.cache.forEach(function(e) {
							var t = e.name,
								r = e.param;
							window.MtaH5.clickStat(t, r), n.cache.shift()
						})) : this.cache.push({
							name: e,
							param: t
						})
					} catch (cp) {}
				}
			}, {
				key: "stat",
				value: function() {
					try {
						window.MtaH5 && window.MtaH5.pgv()
					} catch (cp) {}
				}
			}, {
				key: "init",
				value: function() {
					try {
						window._mtac = {
							autoReport: 1
						};
						var e = document.createElement("script");
						e.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4", e.setAttribute("name", "MTAH5"), e.setAttribute("sid",
							"500699039"), e.setAttribute("cid", "500699088");
						var t = document.getElementsByTagName("script")[0];
						t.parentNode.insertBefore(e, t)
					} catch (cp) {}
				}
			}]), e
		}();
	console.log("WebRTC-adapter ".concat(yn.browserDetails.browser, "/").concat(yn.browserDetails.version));
	var tp, np, rp, ip, op, ap = new ep,
		sp = {
			VERSION: "4.2.0",
			Logger: {
				LogLevel: {
					TRACE: 0,
					DEBUG: 1,
					INFO: 2,
					WARN: 3,
					ERROR: 4,
					NONE: 5
				},
				setLogLevel: function(e) {
					Hn.setLogLevel(e)
				},
				enableUploadLog: function() {
					Hn.enableUploadLog()
				},
				disableUploadLog: function() {
					Hn.disableUploadLog()
				}
			},
			checkSystemRequirements: (op = Ze(regeneratorRuntime.mark(function e() {
				var t, n, r;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return t = Ed(), e.next = 3, Id();
						case 3:
							return n = e.sent, (r = !_d && t && n) || Hn.error("".concat(Rd, " isWebRTCSupported: ").concat(t,
								" isH264Supported: ").concat(n)), e.abrupt("return", r);
						case 7:
						case "end":
							return e.stop()
					}
				}, e)
			})), function() {
				return op.apply(this, arguments)
			}),
			isScreenShareSupported: function() {
				return e = 0, navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && (e = 1), e;
				var e
			},
			getDevices: (ip = Ze(regeneratorRuntime.mark(function e() {
				var t;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, navigator.mediaDevices.enumerateDevices();
						case 2:
							return t = e.sent, e.abrupt("return", t.map(function(e, t) {
								var n = e.label;
								return e.label || (n = e.kind + "_" + t), {
									label: n,
									deviceId: e.deviceId,
									kind: e.kind
								}
							}));
						case 4:
						case "end":
							return e.stop()
					}
				}, e)
			})), function() {
				return ip.apply(this, arguments)
			}),
			getCameras: (rp = Ze(regeneratorRuntime.mark(function e() {
				var t;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, navigator.mediaDevices.enumerateDevices();
						case 2:
							return t = e.sent, e.abrupt("return", t.filter(function(e) {
								return "videoinput" === e.kind
							}).map(function(e, t) {
								var n = e.label;
								return e.label || (n = "camera_" + t), {
									label: n,
									deviceId: e.deviceId,
									kind: e.kind
								}
							}));
						case 4:
						case "end":
							return e.stop()
					}
				}, e)
			})), function() {
				return rp.apply(this, arguments)
			}),
			getMicrophones: (np = Ze(regeneratorRuntime.mark(function e() {
				var t;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, navigator.mediaDevices.enumerateDevices();
						case 2:
							return t = e.sent, e.abrupt("return", t.filter(function(e) {
								return "audioinput" === e.kind
							}).map(function(e, t) {
								var n = e.label;
								return e.label || (n = "microphone_" + t), {
									label: n,
									deviceId: e.deviceId,
									kind: e.kind
								}
							}));
						case 4:
						case "end":
							return e.stop()
					}
				}, e)
			})), function() {
				return np.apply(this, arguments)
			}),
			getSpeakers: (tp = Ze(regeneratorRuntime.mark(function e() {
				var t;
				return regeneratorRuntime.wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, navigator.mediaDevices.enumerateDevices();
						case 2:
							return t = e.sent, e.abrupt("return", t.filter(function(e) {
								return "audiooutput" === e.kind
							}).map(function(e, t) {
								var n = e.label;
								return e.label || (n = "speaker_" + t), {
									label: n,
									deviceId: e.deviceId,
									kind: e.kind
								}
							}));
						case 4:
						case "end":
							return e.stop()
					}
				}, e)
			})), function() {
				return tp.apply(this, arguments)
			}),
			createClient: function(e) {
				ap.report("sdkAppID", {
					value: e.sdkAppId
				}), ap.report("version", {
					value: this.VERSION
				});
				var t = {
					version: this.VERSION
				};
				return new zl(it({}, t, e))
			},
			createStream: function(e) {
				if (!(void 0 === e.audio && void 0 === e.video || void 0 === e.audioSource && void 0 === e.videoSource)) throw new ju({
					code: Mu.INVALID_PARAMETER,
					message: "LocalStream must be created by createStream() with either audio/video or audioSource/videoSourcebut can not be mixed with audio/video and audioSource/videoSource"
				});
				if (void 0 !== e.screen && 1 == e.screen && 1 == e.video) throw new ju({
					code: Mu.INVALID_PARAMETER,
					message: "screen/video options are mutually exclusive, they can not be both true"
				});
				if (void 0 !== e.screen && 1 == e.screen && !this.isScreenShareSupported()) throw new ju({
					code: Mu.INVALID_OPERATION,
					message: "screen capture is not supported, please use the latest chrome browser"
				});
				return new Zl(e)
			}
		};
	return Hn.info("TRTC Web SDK Version: " + sp.VERSION), Hn.info("UserAgent: " + navigator.userAgent), Hn.info(
		"URL of current page: " + location.href), sp
});
