(function(e) {
  function s(a) {
    var b = a.zoom,
      c = a.V,
      g = a.W;
    "body" !== b.options.appendSelector && (c -= b.a.offset().left, g -= b.a.offset().top);
    var d = a.e,
      f = a.g;
    this.data = a;
    this.oa = this.b = null;
    this.Ha = 0;
    this.zoom = b;
    this.K = !0;
    this.s = this.interval = this.u = this.p = 0;
    var k = this,
      l;
    k.b = e("<div class='" + a.N + "' style='position:absolute;overflow:hidden'  ></div>");
    var r = e("<img data-pin-no-hover='true' style='-webkit-touch-callout:none;position:absolute;max-width:none !important' src='" + v(b.Y, b.options) + "'/>");
    "inside" == b.options.position && r.bind("touchstart", function(a) {
      a.preventDefault();
      alert("x");
      return !1
    });
    b.options.variableMagnification && r.bind("mousewheel", function(a, b) {
      k.zoom.pa(0.1 * b);
      return !1
    });
    k.oa = r;
    r.width(k.zoom.e);
    r.css(b.T, b.U);
    k.b.css(b.T, b.U);
    var p = k.b;
    p.append(r);
    var m = e("<div style='position:absolute;'></div>");
    a.caption ? ("html" == b.options.captionType ? l = a.caption : "attr" == b.options.captionType && (l = e("<div class='cloudzoom-caption'>" + a.caption + "</div>")), l.css("display", "block"), m.css({
      width: d
    }), p.append(m), m.append(l), e(b.options.appendSelector).append(p), this.s = l.outerHeight(), "bottom" == b.options.captionPosition ? m.css("top", f) : (m.css("top", 0), this.Ha = this.s)) : e(b.options.appendSelector).append(p);
    p.css({
      opacity: 0,
      width: d,
      height: f + this.s
    });
    this.zoom.D = "auto" === b.options.minMagnification ? Math.max(d / b.a.width(), f / b.a.height()) : b.options.minMagnification;
    this.zoom.C = "auto" === b.options.maxMagnification ? r.width() / b.a.width() : b.options.maxMagnification;
    a = p.height();
    this.K = !1;
    b.options.zoomFlyOut ? (f = b.a.offset(), f.left += b.d / 2, f.top += b.c / 2, p.offset(f), p.width(0), p.height(0), p.animate({
      left: c,
      top: g,
      width: d,
      height: a,
      opacity: 1
    }, {
      duration: b.options.animationTime,
      complete: function() {
        k.K = !0
      }
    })) : (p.offset({
      left: c,
      top: g
    }), p.width(d), p.height(a), p.animate({
      opacity: 1
    }, {
      duration: b.options.animationTime,
      complete: function() {
        k.K = !0
      }
    }))
  }

  function x(a, b, c) {
    this.a = a;
    this.fa = a[0];
    this.ta = c;
    this.Ea = !0;
    var g = this;
    this.interval = setInterval(function() {
      0 < g.fa.width && 0 < g.fa.height && (clearInterval(g.interval), g.Ea = !1, g.ta(a))
    }, 100);
    a.bind("error", function() {
      g.ta(a, {
        wa: b
      })
    });
    this.fa.src = b
  }

  function d(a, b) {
    function c() {
      n.update();
      window.Va(c)
    }

    function g() {
      var c;
      c = "" != b.image ? b.image : "" + a.attr("src");
      n.Ba();
      b.lazyLoadZoom ? a.bind("touchstart.preload " + n.options.mouseTriggerEvent + ".preload", function() {
        n.R(c, b.zoomImage)
      }) : n.R(c, b.zoomImage)
    }
    var n = this;
    b = e.extend({}, e.fn.CloudZoom.defaults, b);
    var f = d.za(a, e.fn.CloudZoom.attr);
    b = e.extend({}, b, f);
    1 > b.easing && (b.easing = 1);
    f = a.parent();
    f.is("a") && "" == b.zoomImage && (b.zoomImage = f.attr("href"), f.removeAttr("href"));
    f = e("<div class='" + b.zoomClass + "'</div>");
    e("body").append(f);
    this.U = "translateZ(0)";
    this.T = "-webkit-transform";
    this.ca = f.width();
    this.ba = f.height();
    b.zoomWidth && (this.ca = b.zoomWidth, this.ba = b.zoomHeight);
    f.remove();
    this.options = b;
    this.a = a;
    this.g = this.e = this.d = this.c = 0;
    this.J = this.m = null;
    this.j = this.n = 0;
    this.F = {
      x: 0,
      y: 0
    };
    this.Za = this.caption = "";
    this.ia = {
      x: 0,
      y: 0
    };
    this.k = [];
    this.ya = 0;
    this.xa = "";
    this.b = this.w = this.v = null;
    this.Y = "";
    this.O = this.X = this.ea = !1;
    this.H = null;
    this.na = this.Ta = !1;
    this.l = null;
    this.id = ++d.id;
    this.L = this.Da = this.Ca = 0;
    this.o = this.h = null;
    this.Fa = this.C = this.D = this.f = this.i = this.qa = 0;
    this.va(a);
    this.ua = !1;
    this.Q = this.B = this.ha = this.ga = 0;
    this.I = !1;
    this.ma = 0;
    this.q = "";
    if (a.is(":hidden")) var k = setInterval(function() {
      a.is(":hidden") || (clearInterval(k), g())
    }, 100);
    else g();
    c()
  }

  function v(a, b) {
    var c = b.uriEscapeMethod;
    return "escape" == c ? escape(a) : "encodeURI" == c ? encodeURI(a) : a
  }

  function h(a) {
    for (var b = "", c, g = B("\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74"), d = a[g](0) - 32, e = 1; e < a.length - 1; e++)
      c = a[g](e), c ^= d & 31, d++, b += String[B("\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65")](c);
    a[g](e);
    return b
  }

  function B(a) {
    return a;
  }

  function y(a) {
    var b = a || window.event,
      c = [].slice.call(arguments, 1),
      g = 0,
      d = 0,
      f = 0;
    a = e.event.fix(b);
    a.type = "mousewheel";
    b.wheelDelta && (g = b.wheelDelta / 120);
    b.detail && (g = -b.detail / 3);
    f = g;
    void 0 !== b.axis && b.axis === b.HORIZONTAL_AXIS && (f = 0, d = -1 * g);
    void 0 !== b.wheelDeltaY && (f = b.wheelDeltaY / 120);
    void 0 !== b.wheelDeltaX && (d = -1 * b.wheelDeltaX / 120);
    c.unshift(a, g, d, f);
    return (e.event.dispatch || e.event.handle).apply(this, c)
  }
  var t = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks)
    for (var q = t.length; q;) e.event.fixHooks[t[--q]] = e.event.mouseHooks;
  e.event.special.mousewheel = {
    setup: function() {
      if (this.addEventListener)
        for (var a = t.length; a;) this.addEventListener(t[--a], y, !1);
      else this.onmousewheel = y
    },
    teardown: function() {
      if (this.removeEventListener)
        for (var a = t.length; a;) this.removeEventListener(t[--a], y, !1);
      else this.onmousewheel = null
    }
  };
  e.fn.extend({
    mousewheel: function(a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
    },
    unmousewheel: function(a) {
      return this.unbind("mousewheel", a)
    }
  });
  window.Va = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 20)
      }
  }();
  var q = document.getElementsByTagName("script"),
    w = q[q.length - 1].src.lastIndexOf("/");
  "undefined" != typeof window.CloudZoom || q[q.length - 1].src.slice(0, w);
  var q = window,
    C = q["Function"],
    u = !0,
    D = !1,
    E = "NOTAPP",
    w = "PURCHABRZE".length,
    z = !1,
    A = !1;
  5 == w ? A = !0 : 4 == w && (z = !0);
  d.ja = e(window).width();
  e(window).bind("resize.cloudzoom orientationchange.cloudzoom", function() {
    d.ja = e(this).width()
  });
  d.prototype.M = function() {
    return "inside" === this.options.zoomPosition || d.ja <= this.options.autoInside ? !0 : !1
  };
  d.prototype.update = function() {
    var a = this.h;
    null != a && (this.r(this.F, 0), this.f != this.i && (this.i += (this.f - this.i) / this.options.easing, 1E-4 > Math.abs(this.f - this.i) && (this.i = this.f), this.Sa()), a.update())
  };
  d.id = 0;
  d.prototype.Na = function(a) {
    var b = this.Y.replace(/^\/|\/$/g, "");
    if (0 == this.k.length) return {
      href: this.options.zoomImage,
      title: this.a.attr("title")
    };
    if (void 0 != a) return this.k;
    a = [];
    for (var c = 0; c < this.k.length && this.k[c].href.replace(/^\/|\/$/g, "") != b; c++);
    for (b = 0; b < this.k.length; b++) a[b] = this.k[c], c++, c >= this.k.length && (c = 0);
    return a
  };
  d.prototype.getGalleryList = d.prototype.Na;
  d.prototype.S = function() {
    clearTimeout(this.qa);
    null != this.o && this.o.remove()
  };
  d.prototype.Ba = function() {
    var a = this;
    "click" != a.options.mouseTriggerEvent && (this.Ta || this.a.bind("mouseover.prehov mousemove.prehov mouseout.prehov", function(b) {
      a.H = "mouseout" == b.type ? null : {
        pageX: b.pageX,
        pageY: b.pageY
      }
    }))
  };
  d.prototype.La = function() {
    this.H = null;
    this.a.unbind("mouseover.prehov mousemove.prehov mouseout.prehov")
  };
  d.prototype.R = function(a, b) {
    var c = this;
    c.a.unbind("touchstart.preload " + c.options.mouseTriggerEvent + ".preload");
    c.Ba();
    this.S();
    e(this.options.appendSelector).children(".cloudzoom-fade-" + c.id).remove();
    null != this.w && (this.w.cancel(), this.w = null);
    null != this.v && (this.v.cancel(), this.v = null);
    this.Y = "" != b && void 0 != b ? b : a;
    this.O = this.X = !1;
    !c.options.galleryFade || !c.ea || c.M() && null != c.h || (c.l = e(new Image).css({
      position: "absolute",
      left: 0,
      top: 0
    }), c.l.attr("src", c.a.attr("src")), c.l.width(c.a.width()), c.l.height(c.a.height()), "body" === c.options.appendSelector && c.l.offset(c.a.offset()), c.l.addClass("cloudzoom-fade-" + c.id), e(c.options.appendSelector).append(c.l));
    this.Ra();
    var g = e(new Image);
    this.v = new x(g, a, function(a, b) {
      c.v = null;
      e(c.options.appendSelector).children(".cloudzoom-fade-" + c.id).fadeOut(c.options.fadeTime, function() {
        e(this).remove();
        c.l = null
      });
      void 0 !== b ? (c.S(), c.options.errorCallback({
        $element: c.a,
        type: "IMAGE_NOT_FOUND",
        data: b.wa
      })) : (c.O = !0, c.a.attr("src", g.attr("src")), c.Aa())
    })
  };
  d.prototype.Ra = function() {
    var a = this;
    a.qa = setTimeout(function() {
      a.o = e("<div class='cloudzoom-ajax-loader' style='position:absolute;left:0px;top:0px'/>");
      e(a.options.appendSelector).append(a.o);
      var b = a.o.width(),
        g = a.o.height(),
        b = a.a.offset().left + a.a.width() / 2 - b / 2,
        g = a.a.offset().top + a.a.height() / 2 - g / 2;
      "body" !== a.options.appendSelector && (b -= a.a.offset().left, g -= a.a.offset().top);
      a.o.css({
        left: b,
        top: g
      })
    }, 250);
    var b = e(new Image);
    this.w = new x(b, this.Y, function(c, g) {
      a.w = null;
      a.e = b[0].width;
      a.g = b[0].height;
      void 0 !== g ? (a.S(), a.options.errorCallback({
        $element: a.a,
        type: "IMAGE_NOT_FOUND",
        data: g.wa
      })) : (a.X = !0, a.Aa())
    })
  };
  d.prototype.loadImage = d.prototype.R;
  d.prototype.Ja = function() {
    alert("Cloud Zoom API OK")
  };
  d.prototype.apiTest = d.prototype.Ja;
  d.prototype.t = function() {
    null != this.h && (this.options.touchStartDelay && (this.I = !0), this.h.da(), this.a.trigger("cloudzoom_end_zoom"));
    this.h = null
  };
  d.prototype.da = function() {
    e(document).unbind("mousemove." + this.id);
    this.a.unbind();
    null != this.b && (this.b.unbind(), this.t());
    this.a.removeData("CloudZoom");
    e(this.options.appendSelector).children(".cloudzoom-fade-" + this.id).remove();
    this.ua = !0
  };
  d.prototype.destroy = d.prototype.da;
  d.prototype.Ka = function(a) {
    if (!this.options.hoverIntentDelay) return !1;
    0 === this.B && (this.B = (new Date).getTime(), this.ga = a.pageX, this.ha = a.pageY);
    var b = a.pageX - this.ga,
      c = a.pageY - this.ha,
      b = Math.sqrt(b * b + c * c);
    this.ga = a.pageX;
    this.ha = a.pageY;
    a = (new Date).getTime();
    b <= this.options.hoverIntentDistance ? this.Q += a - this.B : this.B = a;
    if (this.Q < this.options.hoverIntentDelay) return !0;
    this.Q = this.B = 0;
    return !1
  };
  d.prototype.$ = function() {
    var a = this;
    this.q = "";
    a.a.bind(a.options.mouseTriggerEvent + ".trigger", function(b) {
      if ("touch" !== a.q && (a.q = "mouse", !a.aa() && null == a.b && !a.Ka(b))) {
        var c = a.a.offset();
        b = new d.G(b.pageX - c.left, b.pageY - c.top);
        a.P();
        a.A();
        a.r(b, 0);
        a.F = b
      }
    })
  };
  d.prototype.aa = function() {
    if (this.ua || !this.X || !this.O || d.ja <= this.options.disableOnScreenWidth || "touch" === this.q && this.I) return !0;
    if (!1 === this.options.disableZoom) return !1;
    if (!0 === this.options.disableZoom) return !0;
    if ("auto" == this.options.disableZoom) {
      if (!isNaN(this.options.maxMagnification) && 1 < this.options.maxMagnification) return !1;
      if (this.a.width() >= this.e) return !0
    }
    return !1
  };
  d.prototype.Aa = function() {
    var a = this;
    if (a.X && a.O) {
      this.sa();
      a.e = a.a.width() * this.i;
      a.g = a.a.height() * this.i;
      this.S();
      this.la();
      null != a.h && (a.t(), a.A(), a.J.attr("src", v(this.a.attr("src"), this.options)), a.r(a.ia, 0));
      if (!a.ea) {
        a.ea = !0;
        e(document).bind("MSPointerUp pointerup mousemove." + this.id, function(b) {
          if (null != a.b) {
            var c = a.a.offset(),
              g = !0,
              c = new d.G(b.pageX - Math.floor(c.left), b.pageY - Math.floor(c.top));
            if (-1 > c.x || c.x > a.d || 0 > c.y || c.y > a.c) g = !1, a.options.permaZoom || (a.b.remove(), a.t(), a.b = null);
            a.na = !1;
            if ("MSPointerUp" === b.type || "pointerup" === b.type) a.na = !0;
            g && (a.F = c)
          }
        });
        a.$();
        var b = 0,
          c = 0,
          g = 0,
          n = function(a, b) {
            return Math.sqrt((a.pageX - b.pageX) * (a.pageX - b.pageX) + (a.pageY - b.pageY) * (a.pageY - b.pageY))
          };
        a.a.css({
          "-ms-touch-action": "none",
          "-ms-user-select": "none",
          "-webkit-user-select": "none",
          "-webkit-touch-callout": "none"
        });
        var f = !1;
        a.a.bind("touchstart touchmove touchend", function(b) {
          "touchstart" == b.type && (f = !0);
          "touchmove" == b.type && (f = !1);
          "touchend" == b.type && f && (a.Ga(), f = !1)
        });
        a.options.touchStartDelay && (a.I = !0, a.a.bind("touchstart touchmove touchend", function(b) {
          if (a.I) {
            a.q = "touch";
            if ("touchstart" === b.type) clearTimeout(a.ma), a.ma = setTimeout(function() {
              a.I = !1;
              a.a.trigger(b)
            }, 100);
            else if (clearTimeout(a.ma), "touchend" === b.type) return !1;
            return !0
          }
        }));
        a.a.bind("touchstart touchmove touchend", function(e) {
          a.q = "touch";
          if (a.aa()) return !0;
          var f = e.originalEvent,
            k = a.a.offset(),
            m = {
              x: 0,
              y: 0
            },
            h = f.type;
          if ("touchend" == h && 0 == f.touches.length) return a.ka(h, m), !1;
          m = new d.G(f.touches[0].pageX - Math.floor(k.left), f.touches[0].pageY - Math.floor(k.top));
          a.F = m;
          if ("touchstart" == h && 1 == f.touches.length && null == a.b) return a.ka(h, m), !1;
          2 > b && 2 == f.touches.length && (c = a.f, g = n(f.touches[0], f.touches[1]));
          b = f.touches.length;
          2 == b && a.options.variableMagnification && (f = n(f.touches[0], f.touches[1]) / g, a.f = a.M() ? c * f : c / f, a.f < a.D && (a.f = a.D), a.f > a.C && (a.f = a.C));
          a.ka("touchmove", m);
          e.preventDefault();
          e.stopPropagation();
          return e.returnValue = !1
        });
        if (null != a.H) {
          if (a.aa()) return;
          var k = a.a.offset(),
            k = new d.G(a.H.pageX - k.left, a.H.pageY - k.top);
          a.P();
          a.A();
          a.r(k, 0);
          a.F = k
        }
      }
      a.La();
      a.a.trigger("cloudzoom_ready")
    }
  };
  d.prototype.ka = function(a, b) {
    switch (a) {
      case "touchstart":
        if (null != this.b) break;
        clearTimeout(this.interval);
        this.P();
        this.A();
        this.r(b, this.j / 2);
        this.update();
        break;
      case "touchend":
        clearTimeout(this.interval);
        null == this.b || this.options.permaZoom || (this.b.remove(), this.b = null, this.t());
        break;
      case "touchmove":
        null == this.b && (clearTimeout(this.interval), this.P(), this.A())
    }
  };
  d.prototype.Sa = function() {
    var a = this.i;
    if (null != this.b) {
      var b = this.h;
      this.n = b.b.width() / (this.a.width() * a) * this.a.width();
      this.j = b.b.height() / (this.a.height() * a) * this.a.height();
      this.j -= b.s / a;
      this.m.width(this.n);
      this.m.height(this.j);
      this.r(this.ia, 0)
    }
  };
  d.prototype.pa = function(a) {
    this.f += a;
    this.f < this.D && (this.f = this.D);
    this.f > this.C && (this.f = this.C)
  };
  d.prototype.va = function(a) {
    this.caption = null;
    "attr" == this.options.captionType ? (a = a.attr(this.options.captionSource), "" != a && void 0 != a && (this.caption = a)) : "html" == this.options.captionType && (a = e(this.options.captionSource), a.length && (this.caption = a.clone(), a.css("display", "none")))
  };
  d.prototype.Oa = function(a, b) {
    if ("html" == b.captionType) {
      var c;
      c = e(b.captionSource);
      c.length && c.css("display", "none")
    }
  };
  d.prototype.sa = function() {
    this.f = this.i = "auto" === this.options.startMagnification ? this.e / this.a.width() : this.options.startMagnification
  };
  d.prototype.A = function() {
    var a = this;
    e(window).unbind("contextmenu.cloudzoom");
    a.options.touchStartDelay && e(window).bind("contextmenu.cloudzoom", function(a) {
      var b = e(a.target);
      if (b.parent().hasClass("cloudzoom-lens") || b.parent().hasClass("cloudzoom-zoom-inside")) return a.preventDefault(), !1
    });
    a.a.trigger("cloudzoom_start_zoom");
    this.sa();
    a.e = a.a.width() * this.i;
    a.g = a.a.height() * this.i;
    var b = this.m;
    b.css(a.T, a.U);
    var c = a.d,
      g = a.c,
      d = a.e,
      f = a.g,
      k = a.caption;
    if (a.M()) {
      b.width(a.d / a.e * a.d);
      b.height(a.c / a.g * a.c);
      b.css("display", "none");
      var l = a.options.zoomOffsetX,
        h = a.options.zoomOffsetY;
      a.options.autoInside && (l = h = 0);
      a.h = new s({
        zoom: a,
        V: a.a.offset().left + l,
        W: a.a.offset().top + h,
        e: a.d,
        g: a.c,
        caption: k,
        N: a.options.zoomInsideClass
      });
      a.ra(a.h.b);
      a.h.b.bind("touchmove touchstart touchend", function(b) {
        a.a.trigger(b);
        return !1
      })
    } else if (isNaN(a.options.zoomPosition)) l = e(a.options.zoomPosition), b.width(l.width() / a.e * a.d), b.height(l.height() / a.g * a.c), b.fadeIn(a.options.fadeTime), a.options.zoomFullSize || "full" == a.options.zoomSizeMode ? (b.width(a.d), b.height(a.c), b.css("display", "none"), a.h = new s({
      zoom: a,
      V: l.offset().left,
      W: l.offset().top,
      e: a.e,
      g: a.g,
      caption: k,
      N: a.options.zoomClass
    })) : a.h = new s({
      zoom: a,
      V: l.offset().left,
      W: l.offset().top,
      e: l.width(),
      g: l.height(),
      caption: k,
      N: a.options.zoomClass,
      Z: l
    });
    else {
      var l = a.options.zoomOffsetX,
        h = a.options.zoomOffsetY,
        p = !1;
      if (this.options.lensWidth) {
        var m = this.options.lensWidth,
          q = this.options.lensHeight;
        m > c && (m = c);
        q > g && (q = g);
        b.width(m);
        b.height(q)
      }
      d *= b.width() / c;
      f *= b.height() / g;
      m = a.options.zoomSizeMode;
      if (a.options.zoomFullSize || "full" == m) d = a.e, f = a.g, b.width(a.d), b.height(a.c), b.css("display", "none"), p = !0;
      else if (a.options.zoomMatchSize || "image" == m) b.width(a.d / a.e * a.d), b.height(a.c / a.g * a.c), d = a.d, f = a.c;
      else if ("zoom" === m || this.options.zoomWidth) b.width(a.ca / a.e * a.d), b.height(a.ba / a.g * a.c), d = a.ca, f = a.ba;
      c = [
        [c / 2 - d / 2, -f],
        [c - d, -f],
        [c, -f],
        [c, 0],
        [c, g / 2 - f / 2],
        [c, g - f],
        [c, g],
        [c - d, g],
        [c / 2 - d / 2, g],
        [0, g],
        [-d, g],
        [-d, g - f],
        [-d, g / 2 - f / 2],
        [-d, 0],
        [-d, -f],
        [0, -f]
      ];
      l += c[a.options.zoomPosition][0];
      h += c[a.options.zoomPosition][1];
      p || b.fadeIn(a.options.fadeTime);
      a.h = new s({
        zoom: a,
        V: a.a.offset().left + l,
        W: a.a.offset().top + h,
        e: d,
        g: f,
        caption: k,
        N: a.options.zoomClass
      })
    }
    a.h.p = void 0;
    a.n = b.width();
    a.j = b.height();
    this.options.variableMagnification && a.m.bind("mousewheel", function(b, c) {
      a.pa(0.1 * c);
      return !1
    })
  };
  d.prototype.Qa = function() {
    return this.h ? !0 : !1
  };
  d.prototype.isZoomOpen = d.prototype.Qa;
  d.prototype.Ma = function() {
    this.a.unbind(this.options.mouseTriggerEvent + ".trigger");
    var a = this;
    null != this.b && (this.b.remove(), this.b = null);
    this.t();
    setTimeout(function() {
      a.$()
    }, 1)
  };
  d.prototype.closeZoom = d.prototype.Ma;
  d.prototype.Ga = function() {
    var a = this;
    this.a.unbind(a.options.mouseTriggerEvent + ".trigger");
    this.a.trigger("click");
    setTimeout(function() {
      a.$()
    }, 1)
  };
  d.prototype.ra = function(a) {
    var b = this;
    "mouse" === b.q && a.bind("mousedown." + b.id + " mouseup." + b.id, function(a) {
      "mousedown" === a.type ? b.Fa = (new Date).getTime() : (b.na && (b.b && b.b.remove(), b.t(), b.b = null), 250 >= (new Date).getTime() - b.Fa && b.Ga())
    })
  };
  d.prototype.P = function() {
    5 == E.length && !1 == D && (u = !0);
    var a = this,
      b;
    a.la();
    a.m = e("<div class='" + a.options.lensClass + "' style='overflow:hidden;display:none;position:absolute;top:0px;left:0px;'/>");
    var c = e('<img style="-webkit-touch-callout: none;position:absolute;left:0;top:0;max-width:none !important" src="' + v(this.a.attr("src"), this.options) + '">');
    c.css(a.T, a.U);
    c.width(this.a.width());
    c.height(this.a.height());
    a.J = c;
    a.J.attr("src", v(this.a.attr("src"), this.options));
    var d = a.m;
    a.b = e("<div class='cloudzoom-blank' style='position:absolute;left:0px;top:0px'/>");
    var n = a.b;
    b = e("<div style='background-color:" + a.options.tintColor + ";width:100%;height:100%;'/>");
    b.css("opacity", a.options.tintOpacity);
    b.fadeIn(a.options.fadeTime);
    n.width(a.d);
    n.height(a.c);
    "body" === a.options.appendSelector && n.offset(a.a.offset());
    e(a.options.appendSelector).append(n);
    n.append(b);
    n.append(d);
    n.bind("touchmove touchstart touchend", function(b) {
      a.a.trigger(b);
      return !1
    });
    d.append(c);
    a.L = parseInt(d.css("borderTopWidth"), 10);
    isNaN(a.L) && (a.L = 0);
    a.ra(a.b);
  };
  d.prototype.r = function(a, b) {
    var c, d;
    this.ia = a;
    c = a.x;
    d = a.y;
    b = 0;
    this.M() && (b = 0);
    c -= this.n / 2 + 0;
    d -= this.j / 2 + b;
    c > this.d - this.n ? c = this.d - this.n : 0 > c && (c = 0);
    d > this.c - this.j ? d = this.c - this.j : 0 > d && (d = 0);
    var e = this.L;
    this.m.parent();
    this.m.css({
      left: Math.ceil(c) - e,
      top: Math.ceil(d) - e
    });
    c = -c;
    d = -d;
    this.J.css({
      left: Math.floor(c) + "px",
      top: Math.floor(d) + "px"
    });
    this.Ca = c;
    this.Da = d
  };
  d.za = function(a, b) {
    var c = null,
      d = a.attr(b);
    if ("string" == typeof d) {
      var d = e.trim(d),
        h = d.indexOf("{"),
        f = d.indexOf("}");
      f != d.length - 1 && (f = d.indexOf("};"));
      if (-1 != h && -1 != f) {
        d = d.substr(h, f - h + 1);
        try {
          c = e.parseJSON(d)
        } catch (k) {
          console.error("Invalid JSON in " + b + " attribute:" + d)
        }
      } else c = (new C("return {" + d + "}"))()
    }
    return c
  };
  d.G = function(a, b) {
    this.x = a;
    this.y = b
  };
  d.point = d.G;
  x.prototype.cancel = function() {
    clearInterval(this.interval);
    this.Ea = !1
  };
  d.Xa = function() {};
  d.setScriptPath = d.Xa;
  d.Ua = function() {
    e(function() {
      e(".cloudzoom").CloudZoom();
      e(".cloudzoom-gallery").CloudZoom()
    })
  };
  d.quickStart = d.Ua;
  d.prototype.la = function() {
    this.d = this.a.outerWidth();
    this.c = this.a.outerHeight()
  };
  d.prototype.refreshImage = d.prototype.la;
  d.version = "3.1 rev 1410150700";
  d.Ya = function() {
    D = !0
  };
  d.Pa = function() {
    d.browser = {};
    d.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    var a = new C("a", 'if(window.location.protocol=="file:")return false;var c=encodeURIComponent(window.location.hostname);a=a.split(",");for(var b=0;b<a.length;b++)if(c==a[b]||c.substring(c.length-(a[b].length+1))==="."+a[b]||-1!==c.indexOf("."+a[b]+".")||0===c.indexOf(a[b]+"."))return!1;return!0');
    if (5 != E.length) {
      var b = "starplugins.com";
      u = a(b)
    } else u = !1, d.Ya();
    this._ = ""
  };
  d.Wa = function(a) {
    e.fn.CloudZoom.attr = a
  };
  d.setAttr = d.Wa;
  e.fn.CloudZoom = function(a) {
    return this.each(function() {
      if (e(this).hasClass("cloudzoom-gallery")) {
        var b = d.za(e(this), e.fn.CloudZoom.attr),
          c = e(b.useZoom).data("CloudZoom");
        c.Oa(e(this), b);
        var g = e.extend({}, c.options, b),
          h = e(this).parent(),
          f = g.zoomImage;
        h.is("a") && (f = h.attr("href"));
        c.k.push({
          href: f,
          title: e(this).attr("title"),
          Ia: e(this)
        });
        e(this).bind(g.galleryEvent, function() {
          var a;
          for (a = 0; a < c.k.length; a++) c.k[a].Ia.removeClass("cloudzoom-gallery-active");
          e(this).addClass("cloudzoom-gallery-active");
          if (b.image == c.xa) return !1;
          c.xa = b.image;
          c.options = e.extend({}, c.options, b);
          c.va(e(this));
          var d = e(this).parent();
          d.is("a") && (b.zoomImage = d.attr("href"));
          a = "mouseover" == b.galleryEvent ? c.options.galleryHoverDelay : 1;
          clearTimeout(c.ya);
          c.ya = setTimeout(function() {
            c.R(b.image, b.zoomImage)
          }, a);
          if (d.is("a") || e(this).is("a")) return !1
        })
      } else e(this).data("CloudZoom", new d(e(this), a))
    })
  };
  e.fn.CloudZoom.attr = "data-cloudzoom";
  e.fn.CloudZoom.defaults = {
    image: "",
    zoomImage: "",
    tintColor: "#fff",
    tintOpacity: 0.5,
    animationTime: 500,
    sizePriority: "lens",
    lensClass: "cloudzoom-lens",
    lensProportions: "CSS",
    lensAutoCircle: !1,
    innerZoom: !1,
    galleryEvent: "click",
    easeTime: 500,
    zoomSizeMode: "lens",
    zoomMatchSize: !1,
    zoomPosition: 3,
    zoomOffsetX: 15,
    zoomOffsetY: 0,
    zoomFullSize: !1,
    zoomFlyOut: !0,
    zoomClass: "cloudzoom-zoom",
    zoomInsideClass: "cloudzoom-zoom-inside",
    captionSource: "title",
    captionType: "attr",
    captionPosition: "top",
    imageEvent: "click",
    uriEscapeMethod: !1,
    errorCallback: function() {},
    variableMagnification: !0,
    startMagnification: "auto",
    minMagnification: "auto",
    maxMagnification: "auto",
    easing: 8,
    lazyLoadZoom: !1,
    mouseTriggerEvent: "mousemove",
    disableZoom: !1,
    galleryFade: !0,
    galleryHoverDelay: 200,
    permaZoom: !1,
    zoomWidth: 0,
    zoomHeight: 0,
    lensWidth: 0,
    lensHeight: 0,
    hoverIntentDelay: 0,
    hoverIntentDistance: 2,
    autoInside: 0,
    disableOnScreenWidth: 0,
    touchStartDelay: 0,
    appendSelector: "body"
  };
  s.prototype.update = function() {
    var a = this.zoom,
      b, c;
    this.data.Z && this.K && (b = this.data.Z.offset().left, c = this.data.Z.offset().top, this.b.css({
      left: b + "px",
      top: c + "px"
    }));
    b = a.i;
    c = -a.Ca + a.n / 2;
    var d = -a.Da + a.j / 2;
    void 0 == this.p && (this.p = c, this.u = d);
    this.p += (c - this.p) / a.options.easing;
    this.u += (d - this.u) / a.options.easing;
    c = -this.p * b;
    c += a.n / 2 * b;
    var d = -this.u * b,
      d = d + a.j / 2 * b,
      e = a.a.width() * b,
      a = a.a.height() * b;
    0 < c && (c = 0);
    0 < d && (d = 0);
    c + e < this.b.width() && (c += this.b.width() - (c + e));
    d + a < this.b.height() - this.s && (d += this.b.height() - this.s - (d + a));
    this.oa.css({
      left: c + "px",
      top: d + this.Ha + "px",
      width: e
    })
  };
  s.prototype.da = function() {
    var a = this;
    a.b.bind("touchstart", function() {
      return !1
    });
    var b = this.zoom.a.offset();
    this.zoom.options.zoomFlyOut ? this.b.animate({
      left: b.left + this.zoom.d / 2,
      top: b.top + this.zoom.c / 2,
      opacity: 0,
      width: 1,
      height: 1
    }, {
      duration: this.zoom.options.animationTime,
      step: function() {
        d.browser.webkit && a.b.width(a.b.width())
      },
      complete: function() {
        a.b.remove()
      }
    }) : this.b.animate({
      opacity: 0
    }, {
      duration: this.zoom.options.animationTime,
      complete: function() {
        a.b.remove()
      }
    })
  };
  q.CloudZoom = d;
  d.Pa()
})(jQuery);;
