! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(t),
                appendDots: e(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = e(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = e(t).data("slick") || {}, n.options = e.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = e.proxy(n.autoPlay, n), n.autoPlayClear = e.proxy(n.autoPlayClear, n), n.autoPlayIterator = e.proxy(n.autoPlayIterator, n), n.changeSlide = e.proxy(n.changeSlide, n), n.clickHandler = e.proxy(n.clickHandler, n), n.selectHandler = e.proxy(n.selectHandler, n), n.setPosition = e.proxy(n.setPosition, n), n.swipeHandler = e.proxy(n.swipeHandler, n), n.dragHandler = e.proxy(n.dragHandler, n), n.keyHandler = e.proxy(n.keyHandler, n), n.instanceUid = i++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
        var i = 0;
        return t
    }(), t.prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, i, o) {
        var s = this;
        if ("boolean" == typeof i) o = i, i = null;
        else if (0 > i || i >= s.slideCount) return !1;
        s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? e(t).appendTo(s.$slideTrack) : o ? e(t).insertBefore(s.$slides.eq(i)) : e(t).insertAfter(s.$slides.eq(i)) : !0 === o ? e(t).prependTo(s.$slideTrack) : e(t).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, i) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (t = -t), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: t
        }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
            top: t
        }, s.options.speed, s.options.easing, i) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), e({
            animStart: s.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === s.options.vertical ? (o[s.animType] = "translate(" + e + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + e + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                i && i.call()
            }
        })) : (s.applyTransition(), t = Math.ceil(t), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + t + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + t + "px, 0px)", s.$slideTrack.css(o), i && setTimeout(function() {
            s.disableTransition(), i.call()
        }, s.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this,
            i = t.options.asNavFor;
        return i && null !== i && (i = e(i).not(t.$slider)), i
    }, t.prototype.asNavFor = function(t) {
        var i = this,
            o = i.getNavTarget();
        null !== o && "object" == typeof o && o.each(function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, i, o = this;
        if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(o.options.dotsClass), t = 0; t <= o.getDotCount(); t += 1) i.append(e("<li />").append(o.options.customPaging.call(this, o, t)));
            o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, i, o, s, n, r, a = this;
        if (o = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows, s = Math.ceil(n.length / r), e = 0; s > e; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = e * r + (t * a.options.slidesPerRow + i);
                        n.get(c) && d.appendChild(n.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            a.$slider.empty().append(o), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, i) {
        var o, s, n, r = this,
            a = !1,
            l = r.$slider.width(),
            d = window.innerWidth || e(window).width();
        if ("window" === r.respondTo ? n = d : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(d, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || i) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), a = s), t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
        }
    }, t.prototype.changeSlide = function(t, i) {
        var o, s, n, r = this,
            a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, i);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, i);
                break;
            case "index":
                var l = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, i;
        if (t = this.getNavigableIndexes(), i = 0, e > t[t.length - 1]) e = t[t.length - 1];
        else
            for (var o in t) {
                if (e < t[o]) {
                    e = i;
                    break
                }
                i = t[o]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            i = {};
        i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
            i.stopImmediatePropagation();
            var o = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = o.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            o = 0;
        if (!0 === e.options.infinite)
            for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) o = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return o - 1
    }, t.prototype.getLeft = function(e) {
        var t, i, o, s = this,
            n = 0;
        return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = i * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll != 0 && e + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (e > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (e - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (e - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * i * -1))) : e + s.options.slidesToShow > s.slideCount && (s.slideOffset = (e + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (e + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), t = !1 === s.options.vertical ? e * s.slideWidth * -1 + s.slideOffset : e * i * -1 + n, !0 === s.options.variableWidth && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === s.options.centerMode && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow + 1), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (s.$list.width() - o.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            o = 0,
            s = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, o = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); e > i;) s.push(i), i = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return s
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, i, o = this;
        return i = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            return n.offsetLeft - i + e(n).outerWidth() / 2 > -1 * o.swipeLeft ? (t = n, !1) : void 0
        }), Math.abs(e(t).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            e(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + i
            })
        }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(i) {
            e(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + i,
                id: "slick-slide" + t.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    i = e(this).attr("data-lazy"),
                    o = document.createElement("img");
                o.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, t, i])
                    })
                }, o.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i])
                }, o.src = i
            })
        }
        var i, o, s, n, r = this;
        !0 === r.options.centerMode ? !0 === r.options.infinite ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), !0 === r.options.fade && (s > 0 && s--, n <= r.slideCount && n++)), i = r.$slider.find(".slick-slide").slice(s, n), t(i), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), t(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), t(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), t(o))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, o, s, n = this,
            r = e("img[data-lazy]", n.$slider);
        r.length ? (i = r.first(), o = i.attr("data-lazy"), s = document.createElement("img"), s.onload = function() {
            i.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, i, o]), n.progressiveLazyLoad()
        }, s.onerror = function() {
            3 > t ? setTimeout(function() {
                n.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, o]), n.progressiveLazyLoad())
        }, s.src = o) : n.$slider.trigger("allImagesLoaded", [n])
    }, t.prototype.refresh = function(t) {
        var i, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), i = s.currentSlide, s.destroy(!0), e.extend(s, s.initials, {
            currentSlide: i
        }), s.init(), t || s.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, i, o, s = this,
            n = s.options.responsive || null;
        if ("array" === e.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (t in n)
                if (o = s.breakpoints.length - 1, i = n[t].breakpoint, n.hasOwnProperty(t)) {
                    for (; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === i && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(i), s.breakpointSettings[i] = n[t].settings
                }
            s.breakpoints.sort(function(e, t) {
                return s.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var o = this;
        return "boolean" == typeof e ? (t = e, e = !0 === t ? 0 : o.slideCount - 1) : e = !0 === t ? --e : e, !(o.slideCount < 1 || 0 > e || e > o.slideCount - 1) && (o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, t.prototype.setCSS = function(e) {
        var t, i, o = this,
            s = {};
        !0 === o.options.rtl && (e = -e), t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", s[o.positionProp] = e, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + t + ", " + i + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + t + ", " + i + ", 0px)", o.$slideTrack.css(s)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each(function(o, s) {
            t = i.slideWidth * o * -1, !0 === i.options.rtl ? e(s).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(s).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, i, o, s, n, r = this,
            a = !1;
        if ("object" === e.type(arguments[0]) ? (o = arguments[0], a = arguments[1], n = "multiple") : "string" === e.type(arguments[0]) && (o = arguments[0], s = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) e.each(o, function(e, t) {
            r.options[e] = t
        });
        else if ("responsive" === n)
            for (i in s)
                if ("array" !== e.type(r.options.responsive)) r.options.responsive = [s[i]];
                else {
                    for (t = r.options.responsive.length - 1; t >= 0;) r.options.responsive[t].breakpoint === s[i].breakpoint && r.options.responsive.splice(t, 1), t--;
                    r.options.responsive.push(s[i])
                }
        a && (r.unload(), r.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
        var t, i, o, s, n = this;
        i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(e).addClass("slick-current"), !0 === n.options.centerMode ? (t = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (e >= t && e <= n.slideCount - 1 - t ? n.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + e,
            i.slice(o - t + 1, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(e, e + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + e : e, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow ? i.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, i, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (i = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, t = s.slideCount; t > s.slideCount - o; t -= 1) i = t - 1, e(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (t = 0; o > t; t += 1) i = t, e(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var i = this,
            o = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(s), void i.asNavFor(s)) : void i.slideHandler(s)
    }, t.prototype.slideHandler = function(e, t, i) {
        var o, s, n, r, a, l = null,
            d = this;
        return t = t || !1, !0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e || d.slideCount <= d.options.slidesToShow ? void 0 : (!1 === t && d.asNavFor(e), o = e, l = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (0 > e || e > d.getDotCount() * d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : !1 === d.options.infinite && !0 === d.options.centerMode && (0 > e || e > d.slideCount - d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), s = 0 > o ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = d.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade ? (!0 !== i ? (d.fadeSlideOut(n), d.fadeSlide(s, function() {
            d.postSlide(s)
        })) : d.postSlide(s), void d.animateHeight()) : void(!0 !== i ? d.animateSlide(l, function() {
            d.postSlide(s)
        }) : d.postSlide(s))))
    }, t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, i, o, s = this;
        return e = s.touchObject.startX - s.touchObject.curX, t = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(t, e), o = Math.round(180 * i / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : 360 >= o && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && 225 >= o ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, i, o = this;
        if (o.dragging = !1, o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
                case "left":
                case "down":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(t), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, i, o, s, n, r = this;
        return n = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (t = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), !0 === r.options.verticalSwiping && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && e.preventDefault(), s = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, !1 === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = t + o * s : r.swipeLeft = t + o * (r.$list.height() / r.listWidth) * s, !0 === r.options.verticalSwiping && (r.swipeLeft = t + o * s), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
    }, t.prototype.swipeStart = function(e) {
        var t, i = this;
        return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0))
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, i, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (e = 0; r > e; e++)
            if ("object" == typeof s || void 0 === s ? o[e].slick = new t(o[e], s) : i = o[e].slick[s].apply(o[e].slick, n), void 0 !== i) return i;
        return o
    }
}),
function(e) {
    e.fn.niceSelect = function(t) {
        function i(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var i = t.next(),
                o = t.find("option"),
                s = t.find("option:selected");
            i.find(".current").html(s.data("display") || s.text()), o.each(function(t) {
                var o = e(this),
                    s = o.data("display");
                i.find("ul").append(e("<li></li>").attr("data-value", o.val()).attr("data-display", s || null).addClass("option" + (o.is(":selected") ? " selected" : "") + (o.is(":disabled") ? " disabled" : "")).html(o.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                o = e(this).next(".nice-select"),
                s = o.hasClass("open");
            o.length && (o.remove(), i(t), s && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                i = e(this).next(".nice-select");
            i.length && (i.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || i(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var i = e(this);
            e(".nice-select").not(i).removeClass("open"), i.toggleClass("open"), i.hasClass("open") ? (i.find(".option"), i.find(".focus").removeClass("focus"), i.find(".selected").addClass("focus")) : i.focus()
        }), e(document).on("click.nice_select", function(t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var i = e(this),
                o = i.closest(".nice-select");
            o.find(".selected").removeClass("selected"), i.addClass("selected");
            var s = i.data("display") || i.text();
            o.find(".current").text(s), o.prev("select").val(i.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var i = e(this),
                o = e(i.find(".focus") || i.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return i.hasClass("open") ? o.trigger("click") : i.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (i.hasClass("open")) {
                    var s = o.nextAll(".option:not(.disabled)").first();
                    s.length > 0 && (i.find(".focus").removeClass("focus"), s.addClass("focus"))
                } else i.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (i.hasClass("open")) {
                    var n = o.prevAll(".option:not(.disabled)").first();
                    n.length > 0 && (i.find(".focus").removeClass("focus"), n.addClass("focus"))
                } else i.trigger("click");
                return !1
            }
            if (27 == t.keyCode) i.hasClass("open") && i.trigger("click");
            else if (9 == t.keyCode && i.hasClass("open")) return !1
        });
        var o = document.createElement("a").style;
        return o.cssText = "pointer-events:auto", "auto" !== o.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery),
function() {
    function e(e) {
        return !!e.exifdata
    }

    function t(e, t) {
        t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
        for (var i = atob(e), o = i.length, s = new ArrayBuffer(o), n = new Uint8Array(s), r = 0; r < o; r++) n[r] = i.charCodeAt(r);
        return s
    }

    function i(e, t) {
        var i = new XMLHttpRequest;
        i.open("GET", e, !0), i.responseType = "blob", i.onload = function(e) {
            200 != this.status && 0 !== this.status || t(this.response)
        }, i.send()
    }

    function o(e, o) {
        function n(t) {
            var i = s(t),
                n = r(t),
                a = f(t);
            e.exifdata = i || {}, e.iptcdata = n || {}, e.xmpdata = a || {}, o && o.call(e)
        }
        if (e.src)
            if (/^data\:/i.test(e.src)) {
                var a = t(e.src);
                n(a)
            } else if (/^blob\:/i.test(e.src)) {
            var l = new FileReader;
            l.onload = function(e) {
                n(e.target.result)
            }, i(e.src, function(e) {
                l.readAsArrayBuffer(e)
            })
        } else {
            var d = new XMLHttpRequest;
            d.onload = function() {
                if (200 != this.status && 0 !== this.status) throw "Could not load image";
                n(d.response), d = null
            }, d.open("GET", e.src, !0), d.responseType = "arraybuffer", d.send(null)
        } else if (self.FileReader && (e instanceof self.Blob || e instanceof self.File)) {
            var l = new FileReader;
            l.onload = function(e) {
                m && console.log("Got file of length " + e.target.result.byteLength), n(e.target.result)
            }, l.readAsArrayBuffer(e)
        }
    }

    function s(e) {
        var t = new DataView(e);
        if (m && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return m && console.log("Not a valid JPEG"), !1;
        for (var i, o = 2, s = e.byteLength; o < s;) {
            if (255 != t.getUint8(o)) return m && console.log("Not a valid marker at offset " + o + ", found: " + t.getUint8(o)), !1;
            if (i = t.getUint8(o + 1), m && console.log(i), 225 == i) return m && console.log("Found 0xFFE1 marker"), u(t, o + 4, t.getUint16(o + 2));
            o += 2 + t.getUint16(o + 2)
        }
    }

    function r(e) {
        var t = new DataView(e);
        if (m && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return m && console.log("Not a valid JPEG"), !1;
        for (var i = 2, o = e.byteLength; i < o;) {
            if (function(e, t) {
                    return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
                }(t, i)) {
                var s = t.getUint8(i + 7);
                s % 2 != 0 && (s += 1), 0 === s && (s = 4);
                return a(e, i + 8 + s, t.getUint16(i + 6 + s))
            }
            i++
        }
    }

    function a(e, t, i) {
        for (var o, s, n, r, a = new DataView(e), l = {}, d = t; d < t + i;) 28 === a.getUint8(d) && 2 === a.getUint8(d + 1) && (r = a.getUint8(d + 2)) in $ && (n = a.getInt16(d + 3), n + 5, s = $[r], o = h(a, d + 5, n), l.hasOwnProperty(s) ? l[s] instanceof Array ? l[s].push(o) : l[s] = [l[s], o] : l[s] = o), d++;
        return l
    }

    function l(e, t, i, o, s) {
        var n, r, a, l = e.getUint16(i, !s),
            c = {};
        for (a = 0; a < l; a++) n = i + 12 * a + 2, r = o[e.getUint16(n, !s)], !r && m && console.log("Unknown tag: " + e.getUint16(n, !s)), c[r] = d(e, n, t, i, s);
        return c
    }

    function d(e, t, i, o, s) {
        var n, r, a, l, d, c, p = e.getUint16(t + 2, !s),
            u = e.getUint32(t + 4, !s),
            f = e.getUint32(t + 8, !s) + i;
        switch (p) {
            case 1:
            case 7:
                if (1 == u) return e.getUint8(t + 8, !s);
                for (n = u > 4 ? f : t + 8, r = [], l = 0; l < u; l++) r[l] = e.getUint8(n + l);
                return r;
            case 2:
                return n = u > 4 ? f : t + 8, h(e, n, u - 1);
            case 3:
                if (1 == u) return e.getUint16(t + 8, !s);
                for (n = u > 2 ? f : t + 8, r = [], l = 0; l < u; l++) r[l] = e.getUint16(n + 2 * l, !s);
                return r;
            case 4:
                if (1 == u) return e.getUint32(t + 8, !s);
                for (r = [], l = 0; l < u; l++) r[l] = e.getUint32(f + 4 * l, !s);
                return r;
            case 5:
                if (1 == u) return d = e.getUint32(f, !s), c = e.getUint32(f + 4, !s), a = new Number(d / c), a.numerator = d, a.denominator = c, a;
                for (r = [], l = 0; l < u; l++) d = e.getUint32(f + 8 * l, !s), c = e.getUint32(f + 4 + 8 * l, !s), r[l] = new Number(d / c), r[l].numerator = d, r[l].denominator = c;
                return r;
            case 9:
                if (1 == u) return e.getInt32(t + 8, !s);
                for (r = [], l = 0; l < u; l++) r[l] = e.getInt32(f + 4 * l, !s);
                return r;
            case 10:
                if (1 == u) return e.getInt32(f, !s) / e.getInt32(f + 4, !s);
                for (r = [], l = 0; l < u; l++) r[l] = e.getInt32(f + 8 * l, !s) / e.getInt32(f + 4 + 8 * l, !s);
                return r
        }
    }

    function c(e, t, i) {
        var o = e.getUint16(t, !i);
        return e.getUint32(t + 2 + 12 * o, !i)
    }

    function p(e, t, i, o) {
        var s = c(e, t + i, o);
        if (!s) return {};
        if (s > e.byteLength) return {};
        var n = l(e, t, t + s, S, o);
        if (n.Compression) switch (n.Compression) {
            case 6:
                if (n.JpegIFOffset && n.JpegIFByteCount) {
                    var r = t + n.JpegIFOffset,
                        a = n.JpegIFByteCount;
                    n.blob = new Blob([new Uint8Array(e.buffer, r, a)], {
                        type: "image/jpeg"
                    })
                }
                break;
            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", n.Compression)
        } else 2 == n.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
        return n
    }

    function h(e, t, i) {
        var o = "";
        for (n = t; n < t + i; n++) o += String.fromCharCode(e.getUint8(n));
        return o
    }

    function u(e, t) {
        if ("Exif" != h(e, t, 4)) return m && console.log("Not valid EXIF data! " + h(e, t, 4)), !1;
        var i, o, s, n, r, a = t + 6;
        if (18761 == e.getUint16(a)) i = !1;
        else {
            if (19789 != e.getUint16(a)) return m && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
            i = !0
        }
        if (42 != e.getUint16(a + 2, !i)) return m && console.log("Not valid TIFF data! (no 0x002A)"), !1;
        var d = e.getUint32(a + 4, !i);
        if (d < 8) return m && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(a + 4, !i)), !1;
        if (o = l(e, a, a + d, k, i), o.ExifIFDPointer) {
            n = l(e, a, a + o.ExifIFDPointer, y, i);
            for (s in n) {
                switch (s) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        n[s] = C[s][n[s]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        n[s] = String.fromCharCode(n[s][0], n[s][1], n[s][2], n[s][3]);
                        break;
                    case "ComponentsConfiguration":
                        n[s] = C.Components[n[s][0]] + C.Components[n[s][1]] + C.Components[n[s][2]] + C.Components[n[s][3]]
                }
                o[s] = n[s]
            }
        }
        if (o.GPSInfoIFDPointer) {
            r = l(e, a, a + o.GPSInfoIFDPointer, b, i);
            for (s in r) {
                switch (s) {
                    case "GPSVersionID":
                        r[s] = r[s][0] + "." + r[s][1] + "." + r[s][2] + "." + r[s][3]
                }
                o[s] = r[s]
            }
        }
        return o.thumbnail = p(e, a, d, i), o
    }

    function f(e) {
        if ("DOMParser" in self) {
            var t = new DataView(e);
            if (m && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return m && console.log("Not a valid JPEG"), !1;
            for (var i = 2, o = e.byteLength, s = new DOMParser; i < o - 4;) {
                if ("http" == h(t, i, 4)) {
                    var n = i - 1,
                        r = t.getUint16(i - 2) - 1,
                        a = h(t, n, r),
                        l = a.indexOf("xmpmeta>") + 8;
                    a = a.substring(a.indexOf("<x:xmpmeta"), l);
                    var d = a.indexOf("x:xmpmeta") + 10;
                    a = a.slice(0, d) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + a.slice(d);
                    return g(s.parseFromString(a, "text/xml"))
                }
                i++
            }
        }
    }

    function g(e) {
        try {
            var t = {};
            if (e.children.length > 0)
                for (var i = 0; i < e.children.length; i++) {
                    var o = e.children.item(i),
                        s = o.attributes;
                    for (var n in s) {
                        var r = s[n],
                            a = r.nodeName,
                            l = r.nodeValue;
                        void 0 !== a && (t[a] = l)
                    }
                    var d = o.nodeName;
                    if (void 0 === t[d]) t[d] = xml2json(o);
                    else {
                        if (void 0 === t[d].push) {
                            var c = t[d];
                            t[d] = [], t[d].push(c)
                        }
                        t[d].push(xml2json(o))
                    }
                } else t = e.textContent;
            return t
        } catch (e) {
            console.log(e.message)
        }
    }
    var m = !1,
        v = this,
        w = function(e) {
            return e instanceof w ? e : this instanceof w ? void(this.EXIFwrapped = e) : new w(e)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), exports.EXIF = w) : v.EXIF = w;
    var y = w.Tags = {
            36864: "ExifVersion",
            40960: "FlashpixVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            37121: "ComponentsConfiguration",
            37122: "CompressedBitsPerPixel",
            37500: "MakerNote",
            37510: "UserComment",
            40964: "RelatedSoundFile",
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37520: "SubsecTime",
            37521: "SubsecTimeOriginal",
            37522: "SubsecTimeDigitized",
            33434: "ExposureTime",
            33437: "FNumber",
            34850: "ExposureProgram",
            34852: "SpectralSensitivity",
            34855: "ISOSpeedRatings",
            34856: "OECF",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBias",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37396: "SubjectArea",
            37386: "FocalLength",
            41483: "FlashEnergy",
            41484: "SpatialFrequencyResponse",
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: "FocalPlaneResolutionUnit",
            41492: "SubjectLocation",
            41493: "ExposureIndex",
            41495: "SensingMethod",
            41728: "FileSource",
            41729: "SceneType",
            41730: "CFAPattern",
            41985: "CustomRendered",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41988: "DigitalZoomRation",
            41989: "FocalLengthIn35mmFilm",
            41990: "SceneCaptureType",
            41991: "GainControl",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness",
            41995: "DeviceSettingDescription",
            41996: "SubjectDistanceRange",
            40965: "InteroperabilityIFDPointer",
            42016: "ImageUniqueID"
        },
        k = w.TiffTags = {
            256: "ImageWidth",
            257: "ImageHeight",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer",
            40965: "InteroperabilityIFDPointer",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            274: "Orientation",
            277: "SamplesPerPixel",
            284: "PlanarConfiguration",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            282: "XResolution",
            283: "YResolution",
            296: "ResolutionUnit",
            273: "StripOffsets",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            301: "TransferFunction",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            529: "YCbCrCoefficients",
            532: "ReferenceBlackWhite",
            306: "DateTime",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            315: "Artist",
            33432: "Copyright"
        },
        b = w.GPSTags = {
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude",
            5: "GPSAltitudeRef",
            6: "GPSAltitude",
            7: "GPSTimeStamp",
            8: "GPSSatellites",
            9: "GPSStatus",
            10: "GPSMeasureMode",
            11: "GPSDOP",
            12: "GPSSpeedRef",
            13: "GPSSpeed",
            14: "GPSTrackRef",
            15: "GPSTrack",
            16: "GPSImgDirectionRef",
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: "GPSDestLatitudeRef",
            20: "GPSDestLatitude",
            21: "GPSDestLongitudeRef",
            22: "GPSDestLongitude",
            23: "GPSDestBearingRef",
            24: "GPSDestBearing",
            25: "GPSDestDistanceRef",
            26: "GPSDestDistance",
            27: "GPSProcessingMethod",
            28: "GPSAreaInformation",
            29: "GPSDateStamp",
            30: "GPSDifferential"
        },
        S = w.IFD1Tags = {
            256: "ImageWidth",
            257: "ImageHeight",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            273: "StripOffsets",
            274: "Orientation",
            277: "SamplesPerPixel",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            282: "XResolution",
            283: "YResolution",
            284: "PlanarConfiguration",
            296: "ResolutionUnit",
            513: "JpegIFOffset",
            514: "JpegIFByteCount",
            529: "YCbCrCoefficients",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            532: "ReferenceBlackWhite"
        },
        C = w.StringValues = {
            ExposureProgram: {
                0: "Not defined",
                1: "Manual",
                2: "Normal program",
                3: "Aperture priority",
                4: "Shutter priority",
                5: "Creative program",
                6: "Action program",
                7: "Portrait mode",
                8: "Landscape mode"
            },
            MeteringMode: {
                0: "Unknown",
                1: "Average",
                2: "CenterWeightedAverage",
                3: "Spot",
                4: "MultiSpot",
                5: "Pattern",
                6: "Partial",
                255: "Other"
            },
            LightSource: {
                0: "Unknown",
                1: "Daylight",
                2: "Fluorescent",
                3: "Tungsten (incandescent light)",
                4: "Flash",
                9: "Fine weather",
                10: "Cloudy weather",
                11: "Shade",
                12: "Daylight fluorescent (D 5700 - 7100K)",
                13: "Day white fluorescent (N 4600 - 5400K)",
                14: "Cool white fluorescent (W 3900 - 4500K)",
                15: "White fluorescent (WW 3200 - 3700K)",
                17: "Standard light A",
                18: "Standard light B",
                19: "Standard light C",
                20: "D55",
                21: "D65",
                22: "D75",
                23: "D50",
                24: "ISO studio tungsten",
                255: "Other"
            },
            Flash: {
                0: "Flash did not fire",
                1: "Flash fired",
                5: "Strobe return light not detected",
                7: "Strobe return light detected",
                9: "Flash fired, compulsory flash mode",
                13: "Flash fired, compulsory flash mode, return light not detected",
                15: "Flash fired, compulsory flash mode, return light detected",
                16: "Flash did not fire, compulsory flash mode",
                24: "Flash did not fire, auto mode",
                25: "Flash fired, auto mode",
                29: "Flash fired, auto mode, return light not detected",
                31: "Flash fired, auto mode, return light detected",
                32: "No flash function",
                65: "Flash fired, red-eye reduction mode",
                69: "Flash fired, red-eye reduction mode, return light not detected",
                71: "Flash fired, red-eye reduction mode, return light detected",
                73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                89: "Flash fired, auto mode, red-eye reduction mode",
                93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            SensingMethod: {
                1: "Not defined",
                2: "One-chip color area sensor",
                3: "Two-chip color area sensor",
                4: "Three-chip color area sensor",
                5: "Color sequential area sensor",
                7: "Trilinear sensor",
                8: "Color sequential linear sensor"
            },
            SceneCaptureType: {
                0: "Standard",
                1: "Landscape",
                2: "Portrait",
                3: "Night scene"
            },
            SceneType: {
                1: "Directly photographed"
            },
            CustomRendered: {
                0: "Normal process",
                1: "Custom process"
            },
            WhiteBalance: {
                0: "Auto white balance",
                1: "Manual white balance"
            },
            GainControl: {
                0: "None",
                1: "Low gain up",
                2: "High gain up",
                3: "Low gain down",
                4: "High gain down"
            },
            Contrast: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            Saturation: {
                0: "Normal",
                1: "Low saturation",
                2: "High saturation"
            },
            Sharpness: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            SubjectDistanceRange: {
                0: "Unknown",
                1: "Macro",
                2: "Close view",
                3: "Distant view"
            },
            FileSource: {
                3: "DSC"
            },
            Components: {
                0: "",
                1: "Y",
                2: "Cb",
                3: "Cr",
                4: "R",
                5: "G",
                6: "B"
            }
        },
        $ = {
            120: "caption",
            110: "credit",
            25: "keywords",
            55: "dateCreated",
            80: "byline",
            85: "bylineTitle",
            122: "captionWriter",
            105: "headline",
            116: "copyright",
            15: "category"
        };
    w.getData = function(t, i) {
        return !(self.Image && t instanceof self.Image || self.HTMLImageElement && t instanceof self.HTMLImageElement && !t.complete) && (e(t) ? i && i.call(t) : o(t, i), !0)
    }, w.getTag = function(t, i) {
        if (e(t)) return t.exifdata[i]
    }, w.getIptcTag = function(t, i) {
        if (e(t)) return t.iptcdata[i]
    }, w.getAllTags = function(t) {
        if (!e(t)) return {};
        var i, o = t.exifdata,
            s = {};
        for (i in o) o.hasOwnProperty(i) && (s[i] = o[i]);
        return s
    }, w.getAllIptcTags = function(t) {
        if (!e(t)) return {};
        var i, o = t.iptcdata,
            s = {};
        for (i in o) o.hasOwnProperty(i) && (s[i] = o[i]);
        return s
    }, w.pretty = function(t) {
        if (!e(t)) return "";
        var i, o = t.exifdata,
            s = "";
        for (i in o) o.hasOwnProperty(i) && ("object" == typeof o[i] ? o[i] instanceof Number ? s += i + " : " + o[i] + " [" + o[i].numerator + "/" + o[i].denominator + "]\r\n" : s += i + " : [" + o[i].length + " values]\r\n" : s += i + " : " + o[i] + "\r\n");
        return s
    }, w.readFromBinaryFile = function(e) {
        return s(e)
    }, "function" == typeof define && define.amd && define("exif-js", [], function() {
        return w
    })
}.call(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["exports"], t) : t("object" == typeof exports && "string" != typeof exports.nodeName ? exports : e.commonJsStrict = {})
    }(this, function(e) {
        function t(e) {
            if (e in z) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), i = U.length; i--;)
                if ((e = U[i] + t) in z) return e
        }

        function i(e, t) {
            e = e || {};
            for (var o in t) t[o] && t[o].constructor && t[o].constructor === Object ? (e[o] = e[o] || {}, i(e[o], t[o])) : e[o] = t[o];
            return e
        }

        function o(e) {
            if ("createEvent" in document) {
                var t = document.createEvent("HTMLEvents");
                t.initEvent("change", !1, !0), e.dispatchEvent(t)
            } else e.fireEvent("onchange")
        }

        function s(e, t, i) {
            if ("string" == typeof t) {
                var o = t;
                t = {}, t[o] = i
            }
            for (var s in t) e.style[s] = t[s]
        }

        function n(e, t) {
            e.classList ? e.classList.add(t) : e.className += " " + t
        }

        function r(e, t) {
            e.classList ? e.classList.remove(t) : e.className = e.className.replace(t, "")
        }

        function a(e) {
            return parseInt(e, 10)
        }

        function l(e, t) {
            var i = t || new Image;
            return i.style.opacity = 0, new Promise(function(t) {
                i.src === e ? t(i) : (i.removeAttribute("crossOrigin"), e.match(/^https?:\/\/|^\/\//) && i.setAttribute("crossOrigin", "anonymous"), i.onload = function() {
                    setTimeout(function() {
                        t(i)
                    }, 1)
                }, i.src = e)
            })
        }

        function d(e, t) {
            window.EXIF || t(0), EXIF.getData(e, function() {
                var e = EXIF.getTag(this, "Orientation");
                t(e)
            })
        }

        function c(e, t, i) {
            var o = t.width,
                s = t.height,
                n = e.getContext("2d");
            switch (e.width = t.width, e.height = t.height, n.save(), i) {
                case 2:
                    n.translate(o, 0), n.scale(-1, 1);
                    break;
                case 3:
                    n.translate(o, s), n.rotate(180 * Math.PI / 180);
                    break;
                case 4:
                    n.translate(0, s), n.scale(1, -1);
                    break;
                case 5:
                    e.width = s, e.height = o, n.rotate(90 * Math.PI / 180), n.scale(1, -1);
                    break;
                case 6:
                    e.width = s, e.height = o, n.rotate(90 * Math.PI / 180), n.translate(0, -s);
                    break;
                case 7:
                    e.width = s, e.height = o, n.rotate(-90 * Math.PI / 180), n.translate(-o, s), n.scale(1, -1);
                    break;
                case 8:
                    e.width = s, e.height = o, n.translate(0, o), n.rotate(-90 * Math.PI / 180)
            }
            n.drawImage(t, 0, 0, o, s), n.restore()
        }

        function p() {
            var e, t, i, o, r, a = this,
                l = a.options.viewport.type ? "cr-vp-" + a.options.viewport.type : null;
            a.options.useCanvas = a.options.enableOrientation || h.call(a), a.data = {}, a.elements = {}, e = a.elements.boundary = document.createElement("div"), t = a.elements.viewport = document.createElement("div"), a.elements.img = document.createElement("img"), i = a.elements.overlay = document.createElement("div"), a.options.useCanvas ? (a.elements.canvas = document.createElement("canvas"), a.elements.preview = a.elements.canvas) : a.elements.preview = a.elements.img, n(e, "cr-boundary"), o = a.options.boundary.width, r = a.options.boundary.height, s(e, {
                width: o + (isNaN(o) ? "" : "px"),
                height: r + (isNaN(r) ? "" : "px")
            }), n(t, "cr-viewport"), l && n(t, l), s(t, {
                width: a.options.viewport.width + "px",
                height: a.options.viewport.height + "px"
            }), t.setAttribute("tabindex", 0), n(a.elements.preview, "cr-image"), n(i, "cr-overlay"), a.element.appendChild(e), e.appendChild(a.elements.preview), e.appendChild(t), e.appendChild(i), n(a.element, "croppie-container"), a.options.customClass && n(a.element, a.options.customClass), w.call(this), a.options.enableZoom && f.call(a)
        }

        function h() {
            return this.options.enableExif && window.EXIF
        }

        function u(e) {
            if (this.options.enableZoom) {
                var t = this.elements.zoomer,
                    i = A(e, 4);
                t.value = Math.max(t.min, Math.min(t.max, i))
            }
        }

        function f() {
            function e() {
                g.call(i, {
                    value: parseFloat(s.value),
                    origin: new Y(i.elements.preview),
                    viewportRect: i.elements.viewport.getBoundingClientRect(),
                    transform: W.parse(i.elements.preview)
                })
            }

            function t(t) {
                var o, s;
                o = t.wheelDelta ? t.wheelDelta / 1200 : t.deltaY ? t.deltaY / 1060 : t.detail ? t.detail / -60 : 0, s = i._currentZoom + o * i._currentZoom, t.preventDefault(), u.call(i, s), e.call(i)
            }
            var i = this,
                o = i.elements.zoomerWrap = document.createElement("div"),
                s = i.elements.zoomer = document.createElement("input");
            n(o, "cr-slider-wrap"), n(s, "cr-slider"), s.type = "range", s.step = "0.0001", s.value = 1, s.style.display = i.options.showZoomer ? "" : "none", i.element.appendChild(o), o.appendChild(s), i._currentZoom = 1, i.elements.zoomer.addEventListener("input", e), i.elements.zoomer.addEventListener("change", e), i.options.mouseWheelZoom && (i.elements.boundary.addEventListener("mousewheel", t), i.elements.boundary.addEventListener("DOMMouseScroll", t))
        }

        function g(e) {
            function t() {
                var e = {};
                e[j] = o.toString(), e[H] = r.toString(), s(i.elements.preview, e)
            }
            var i = this,
                o = e ? e.transform : W.parse(i.elements.preview),
                n = e ? e.viewportRect : i.elements.viewport.getBoundingClientRect(),
                r = e ? e.origin : new Y(i.elements.preview);
            if (i._currentZoom = e ? e.value : i._currentZoom, o.scale = i._currentZoom, t(), i.options.enforceBoundary) {
                var a = m.call(i, n),
                    l = a.translate,
                    d = a.origin;
                o.x >= l.maxX && (r.x = d.minX, o.x = l.maxX), o.x <= l.minX && (r.x = d.maxX, o.x = l.minX), o.y >= l.maxY && (r.y = d.minY, o.y = l.maxY), o.y <= l.minY && (r.y = d.maxY, o.y = l.minY)
            }
            t(), G.call(i), k.call(i)
        }

        function m(e) {
            var t = this,
                i = t._currentZoom,
                o = e.width,
                s = e.height,
                n = t.elements.boundary.clientWidth / 2,
                r = t.elements.boundary.clientHeight / 2,
                a = t.elements.preview.getBoundingClientRect(),
                l = a.width,
                d = a.height,
                c = o / 2,
                p = s / 2,
                h = -1 * (c / i - n),
                u = h - (l * (1 / i) - o * (1 / i)),
                f = -1 * (p / i - r),
                g = f - (d * (1 / i) - s * (1 / i)),
                m = 1 / i * c,
                v = l * (1 / i) - m,
                w = 1 / i * p;
            return {
                translate: {
                    maxX: h,
                    minX: u,
                    maxY: f,
                    minY: g
                },
                origin: {
                    maxX: v,
                    minX: m,
                    maxY: d * (1 / i) - w,
                    minY: w
                }
            }
        }

        function v() {
            var e = this,
                t = e._currentZoom,
                i = e.elements.preview.getBoundingClientRect(),
                o = e.elements.viewport.getBoundingClientRect(),
                n = W.parse(e.elements.preview.style[j]),
                r = new Y(e.elements.preview),
                a = o.top - i.top + o.height / 2,
                l = o.left - i.left + o.width / 2,
                d = {},
                c = {};
            d.y = a / t, d.x = l / t, c.y = (d.y - r.y) * (1 - t), c.x = (d.x - r.x) * (1 - t), n.x -= c.x, n.y -= c.y;
            var p = {};
            p[H] = d.x + "px " + d.y + "px", p[j] = n.toString(), s(e.elements.preview, p)
        }

        function w() {
            function e(e, t) {
                var i = f.elements.preview.getBoundingClientRect(),
                    o = h.y + t,
                    s = h.x + e;
                f.options.enforceBoundary ? (p.top > i.top + t && p.bottom < i.bottom + t && (h.y = o), p.left > i.left + e && p.right < i.right + e && (h.x = s)) : (h.y = o, h.x = s)
            }

            function t(e) {
                var t = 37,
                    o = 38,
                    s = 39,
                    n = 40;
                if (!e.shiftKey || e.keyCode != o && e.keyCode != n) {
                    if (e.keyCode >= 37 && e.keyCode <= 40) {
                        e.preventDefault();
                        var r = function(e) {
                            switch (e) {
                                case t:
                                    return [1, 0];
                                case o:
                                    return [0, 1];
                                case s:
                                    return [-1, 0];
                                case n:
                                    return [0, -1]
                            }
                        }(e.keyCode);
                        h = W.parse(f.elements.preview), document.body.style[N] = "none", p = f.elements.viewport.getBoundingClientRect(), i(r)
                    }
                } else {
                    var a = 0;
                    a = e.keyCode == o ? parseFloat(f.elements.zoomer.value, 10) + parseFloat(f.elements.zoomer.step, 10) : parseFloat(f.elements.zoomer.value, 10) - parseFloat(f.elements.zoomer.step, 10), f.setZoom(a)
                }
            }

            function i(t) {
                var i = t[0],
                    o = t[1],
                    n = {};
                e(i, o), n[j] = h.toString(), s(f.elements.preview, n), y.call(f), document.body.style[N] = "", v.call(f), k.call(f), c = 0
            }

            function n(e) {
                if (e.preventDefault(), !g) {
                    if (g = !0, l = e.pageX, d = e.pageY, e.touches) {
                        var t = e.touches[0];
                        l = t.pageX, d = t.pageY
                    }
                    h = W.parse(f.elements.preview), window.addEventListener("mousemove", r), window.addEventListener("touchmove", r), window.addEventListener("mouseup", a), window.addEventListener("touchend", a), document.body.style[N] = "none", p = f.elements.viewport.getBoundingClientRect()
                }
            }

            function r(t) {
                t.preventDefault();
                var i = t.pageX,
                    n = t.pageY;
                if (t.touches) {
                    var r = t.touches[0];
                    i = r.pageX, n = r.pageY
                }
                var a = i - l,
                    p = n - d,
                    g = {};
                if ("touchmove" == t.type && t.touches.length > 1) {
                    var m = t.touches[0],
                        v = t.touches[1],
                        w = Math.sqrt((m.pageX - v.pageX) * (m.pageX - v.pageX) + (m.pageY - v.pageY) * (m.pageY - v.pageY));
                    c || (c = w / f._currentZoom);
                    var k = w / c;
                    return u.call(f, k), void o(f.elements.zoomer)
                }
                e(a, p), g[j] = h.toString(), s(f.elements.preview, g), y.call(f), d = n, l = i
            }

            function a() {
                g = !1, window.removeEventListener("mousemove", r), window.removeEventListener("touchmove", r), window.removeEventListener("mouseup", a), window.removeEventListener("touchend", a), document.body.style[N] = "", v.call(f), k.call(f), c = 0
            }
            var l, d, c, p, h, f = this,
                g = !1;
            f.elements.overlay.addEventListener("mousedown", n), f.elements.viewport.addEventListener("keydown", t), f.elements.overlay.addEventListener("touchstart", n)
        }

        function y() {
            var e = this,
                t = e.elements.boundary.getBoundingClientRect(),
                i = e.elements.preview.getBoundingClientRect();
            s(e.elements.overlay, {
                width: i.width + "px",
                height: i.height + "px",
                top: i.top - t.top + "px",
                left: i.left - t.left + "px"
            })
        }

        function k() {
            var e, t = this,
                i = t.get();
            if (b.call(t))
                if (t.options.update.call(t, i), t.$ && "undefined" == typeof Prototype) t.$(t.element).trigger("update", i);
                else {
                    var e;
                    window.CustomEvent ? e = new CustomEvent("update", {
                        detail: i
                    }) : (e = document.createEvent("CustomEvent"), e.initCustomEvent("update", !0, !0, i)), t.element.dispatchEvent(e)
                }
        }

        function b() {
            return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0
        }

        function S() {
            var e, t, i, n, r, a = this,
                l = 0,
                d = 1.5,
                c = 1,
                p = {},
                h = a.elements.preview,
                f = a.elements.zoomer,
                g = new W(0, 0, c),
                m = new Y,
                w = b.call(a);
            if (w && !a.data.bound) {
                if (a.data.bound = !0, p[j] = g.toString(), p[H] = m.toString(), p.opacity = 1, s(h, p), e = h.getBoundingClientRect(), t = a.elements.viewport.getBoundingClientRect(), i = a.elements.boundary.getBoundingClientRect(), a._originalImageWidth = e.width, a._originalImageHeight = e.height, a.options.enableZoom) {
                    a.options.enforceBoundary && (n = t.width / e.width, r = t.height / e.height, l = Math.max(n, r)), l >= d && (d = l + 1), f.min = A(l, 4), f.max = A(d, 4);
                    var k = Math.max(i.width / e.width, i.height / e.height);
                    c = null !== a.data.boundZoom ? a.data.boundZoom : k, u.call(a, c), o(f)
                } else a._currentZoom = c;
                g.scale = a._currentZoom, p[j] = g.toString(), s(h, p), a.data.points.length ? C.call(a, a.data.points) : $.call(a), v.call(a), y.call(a)
            }
        }

        function C(e) {
            if (4 != e.length) throw "Croppie - Invalid number of points supplied: " + e;
            var t = this,
                i = e[2] - e[0],
                o = t.elements.viewport.getBoundingClientRect(),
                n = t.elements.boundary.getBoundingClientRect(),
                r = {
                    left: o.left - n.left,
                    top: o.top - n.top
                },
                a = o.width / i,
                l = e[1],
                d = e[0],
                c = -1 * e[1] + r.top,
                p = -1 * e[0] + r.left,
                h = {};
            h[H] = d + "px " + l + "px", h[j] = new W(p, c, a).toString(), s(t.elements.preview, h), u.call(t, a), t._currentZoom = a
        }

        function $() {
            var e = this,
                t = e.elements.preview.getBoundingClientRect(),
                i = e.elements.viewport.getBoundingClientRect(),
                o = e.elements.boundary.getBoundingClientRect(),
                n = i.left - o.left,
                r = i.top - o.top,
                a = n - (t.width - i.width) / 2,
                l = r - (t.height - i.height) / 2,
                d = new W(a, l, e._currentZoom);
            s(e.elements.preview, j, d.toString())
        }

        function x(e) {
            var t = this,
                i = t.elements.canvas,
                o = t.elements.img,
                s = i.getContext("2d"),
                n = h.call(t),
                e = t.options.enableOrientation && e;
            s.clearRect(0, 0, i.width, i.height), i.width = o.width, i.height = o.height, n ? d(o, function(t) {
                c(i, o, a(t, 10)), e && c(i, o, e)
            }) : e && c(i, o, e)
        }

        function T(e) {
            var t = this,
                i = e.points,
                o = a(i[0]),
                s = a(i[1]),
                n = a(i[2]),
                r = a(i[3]),
                l = n - o,
                d = r - s,
                c = e.circle,
                p = document.createElement("canvas"),
                h = p.getContext("2d"),
                u = l,
                f = d,
                g = 0,
                m = 0,
                v = u,
                w = f,
                y = e.outputWidth && e.outputHeight,
                k = 1;
            return y && (v = e.outputWidth, w = e.outputHeight, k = v / u), p.width = v, p.height = w, e.backgroundColor && (h.fillStyle = e.backgroundColor, h.fillRect(0, 0, u, f)), o < 0 && (g = Math.abs(o), o = 0), s < 0 && (m = Math.abs(s), s = 0), n > t._originalImageWidth && (l = t._originalImageWidth - o, u = l), r > t._originalImageHeight && (d = t._originalImageHeight - s, f = d), 1 !== k && (g *= k, m *= k, u *= k, f *= k), h.drawImage(this.elements.preview, o, s, l, d, g, m, u, f), c && (h.fillStyle = "#fff", h.globalCompositeOperation = "destination-in", h.beginPath(), h.arc(u / 2, f / 2, u / 2, 0, 2 * Math.PI, !0), h.closePath(), h.fill()), p
        }

        function _(e) {
            var t = e.points,
                i = document.createElement("div"),
                o = document.createElement("img"),
                r = t[2] - t[0],
                a = t[3] - t[1];
            return n(i, "croppie-result"), i.appendChild(o), s(o, {
                left: -1 * t[0] + "px",
                top: -1 * t[1] + "px"
            }), o.src = e.url, s(i, {
                width: r + "px",
                height: a + "px"
            }), i
        }

        function D(e) {
            return T.call(this, e).toDataURL(e.format, e.quality)
        }

        function P(e) {
            var t = this;
            return new Promise(function(i, o) {
                T.call(t, e).toBlob(function(e) {
                    i(e)
                }, e.format, e.quality)
            })
        }

        function I(e, t) {
            var i, o = this,
                s = [],
                n = null;
            if ("string" == typeof e) i = e, e = {};
            else if (Array.isArray(e)) s = e.slice();
            else {
                if (void 0 === e && o.data.url) return S.call(o), k.call(o), null;
                i = e.url, s = e.points || [], n = void 0 === e.zoom ? null : e.zoom
            }
            return o.data.bound = !1, o.data.url = i || o.data.url, o.data.boundZoom = n, l(i, o.elements.img).then(function(i) {
                if (s.length) o.options.relative && (s = [s[0] * i.naturalWidth / 100, s[1] * i.naturalHeight / 100, s[2] * i.naturalWidth / 100, s[3] * i.naturalHeight / 100]), o.data.points = s.map(function(e) {
                    return parseFloat(e)
                });
                else {
                    var n, r, a = i.naturalWidth,
                        l = i.naturalHeight,
                        d = o.elements.viewport.getBoundingClientRect(),
                        c = d.width / d.height;
                    a / l > c ? (r = l, n = r * c) : (n = a, r = n / c);
                    var p = (a - n) / 2,
                        h = (l - r) / 2,
                        u = p + n,
                        f = h + r;
                    o.data.points = [p, h, u, f]
                }
                o.options.useCanvas && (o.elements.img.exifdata = null, x.call(o, e.orientation || 1)), S.call(o), k.call(o), t && t()
            })
        }

        function A(e, t) {
            return parseFloat(e).toFixed(t || 0)
        }

        function E() {
            var e = this,
                t = e.elements.preview.getBoundingClientRect(),
                i = e.elements.viewport.getBoundingClientRect(),
                o = i.left - t.left,
                s = i.top - t.top,
                n = (i.width - e.elements.viewport.offsetWidth) / 2,
                r = (i.height - e.elements.viewport.offsetHeight) / 2,
                a = o + e.elements.viewport.offsetWidth + n,
                l = s + e.elements.viewport.offsetHeight + r,
                d = e._currentZoom;
            (d === 1 / 0 || isNaN(d)) && (d = 1);
            var c = e.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
            return o = Math.max(c, o / d), s = Math.max(c, s / d), a = Math.max(c, a / d), l = Math.max(c, l / d), {
                points: [A(o), A(s), A(a), A(l)],
                zoom: d
            }
        }

        function F(e) {
            var t = this,
                o = E.call(t),
                s = i(V, i({}, e)),
                n = "string" == typeof e ? e : s.type || "base64",
                r = s.size,
                a = s.format,
                l = s.quality,
                d = s.backgroundColor,
                c = "boolean" == typeof s.circle ? s.circle : "circle" === t.options.viewport.type,
                p = t.elements.viewport.getBoundingClientRect(),
                h = p.width / p.height;
            return "viewport" === r ? (o.outputWidth = p.width, o.outputHeight = p.height) : "object" == typeof r && (r.width && r.height ? (o.outputWidth = r.width, o.outputHeight = r.height) : r.width ? (o.outputWidth = r.width, o.outputHeight = r.width / h) : r.height && (o.outputWidth = r.height * h, o.outputHeight = r.height)), q.indexOf(a) > -1 && (o.format = "image/" + a, o.quality = l), o.circle = c, o.url = t.data.url, o.backgroundColor = d, new Promise(function(e, i) {
                switch (n.toLowerCase()) {
                    case "rawcanvas":
                        e(T.call(t, o));
                        break;
                    case "canvas":
                    case "base64":
                        e(D.call(t, o));
                        break;
                    case "blob":
                        P.call(t, o).then(e);
                        break;
                    default:
                        e(_.call(t, o))
                }
            })
        }

        function M() {
            S.call(this)
        }

        function O(e) {
            if (!this.options.useCanvas) throw "Croppie: Cannot rotate without enableOrientation";
            var t = this,
                i = t.elements.canvas,
                o = (t.elements.img, document.createElement("canvas")),
                s = 1;
            o.width = i.width, o.height = i.height, o.getContext("2d").drawImage(i, 0, 0), 90 !== e && -270 !== e || (s = 6), -90 !== e && 270 !== e || (s = 8), 180 !== e && -180 !== e || (s = 3), c(i, o, s), g.call(t)
        }

        function L() {
            var e = this;
            e.element.removeChild(e.elements.boundary), r(e.element, "croppie-container"), e.options.enableZoom && e.element.removeChild(e.elements.zoomerWrap), delete e.elements
        }

        function R(e, t) {
            if (this.element = e, this.options = i(i({}, R.defaults), t), "img" === this.element.tagName.toLowerCase()) {
                var o = this.element;
                n(o, "cr-original-image");
                var s = document.createElement("div");
                this.element.parentNode.appendChild(s), s.appendChild(o), this.element = s, this.options.url = this.options.url || o.src
            }
            if (p.call(this), this.options.url) {
                var r = {
                    url: this.options.url,
                    points: this.options.points
                };
                delete this.options.url, delete this.options.points, I.call(this, r)
            }
        }
        "function" != typeof Promise && function(e) {
            function t(e, t) {
                return function() {
                    e.apply(t, arguments)
                }
            }

            function i(e) {
                if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof e) throw new TypeError("not a function");
                this._state = null, this._value = null, this._deferreds = [], l(e, t(s, this), t(n, this))
            }

            function o(e) {
                var t = this;
                return null === this._state ? void this._deferreds.push(e) : void c(function() {
                    var i = t._state ? e.onFulfilled : e.onRejected;
                    if (null === i) return void(t._state ? e.resolve : e.reject)(t._value);
                    var o;
                    try {
                        o = i(t._value)
                    } catch (t) {
                        return void e.reject(t)
                    }
                    e.resolve(o)
                })
            }

            function s(e) {
                try {
                    if (e === this) throw new TypeError("A promise cannot be resolved with itself.");
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var i = e.then;
                        if ("function" == typeof i) return void l(t(i, e), t(s, this), t(n, this))
                    }
                    this._state = !0, this._value = e, r.call(this)
                } catch (e) {
                    n.call(this, e)
                }
            }

            function n(e) {
                this._state = !1, this._value = e, r.call(this)
            }

            function r() {
                for (var e = 0, t = this._deferreds.length; t > e; e++) o.call(this, this._deferreds[e]);
                this._deferreds = null
            }

            function a(e, t, i, o) {
                this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = i, this.reject = o
            }

            function l(e, t, i) {
                var o = !1;
                try {
                    e(function(e) {
                        o || (o = !0, t(e))
                    }, function(e) {
                        o || (o = !0, i(e))
                    })
                } catch (e) {
                    if (o) return;
                    o = !0, i(e)
                }
            }
            var d = setTimeout,
                c = "function" == typeof setImmediate && setImmediate || function(e) {
                    d(e, 1)
                },
                p = Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
            i.prototype.catch = function(e) {
                return this.then(null, e)
            }, i.prototype.then = function(e, t) {
                var s = this;
                return new i(function(i, n) {
                    o.call(s, new a(e, t, i, n))
                })
            }, i.all = function() {
                var e = Array.prototype.slice.call(1 === arguments.length && p(arguments[0]) ? arguments[0] : arguments);
                return new i(function(t, i) {
                    function o(n, r) {
                        try {
                            if (r && ("object" == typeof r || "function" == typeof r)) {
                                var a = r.then;
                                if ("function" == typeof a) return void a.call(r, function(e) {
                                    o(n, e)
                                }, i)
                            }
                            e[n] = r, 0 == --s && t(e)
                        } catch (e) {
                            i(e)
                        }
                    }
                    if (0 === e.length) return t([]);
                    for (var s = e.length, n = 0; n < e.length; n++) o(n, e[n])
                })
            }, i.resolve = function(e) {
                return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
                    t(e)
                })
            }, i.reject = function(e) {
                return new i(function(t, i) {
                    i(e)
                })
            }, i.race = function(e) {
                return new i(function(t, i) {
                    for (var o = 0, s = e.length; s > o; o++) e[o].then(t, i)
                })
            }, i._setImmediateFn = function(e) {
                c = e
            }, "undefined" != typeof module && module.exports ? module.exports = i : e.Promise || (e.Promise = i)
        }(this), "function" != typeof window.CustomEvent && function() {
            function e(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
            }
            e.prototype = window.Event.prototype, window.CustomEvent = e
        }(), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function(e, t, i) {
                for (var o = atob(this.toDataURL(t, i).split(",")[1]), s = o.length, n = new Uint8Array(s), r = 0; r < s; r++) n[r] = o.charCodeAt(r);
                e(new Blob([n], {
                    type: t || "image/png"
                }))
            }
        });
        var H, j, N, U = ["Webkit", "Moz", "ms"],
            z = document.createElement("div").style;
        j = t("transform"), H = t("transformOrigin"), N = t("userSelect");
        var B = {
                translate3d: {
                    suffix: ", 0px"
                },
                translate: {
                    suffix: ""
                }
            },
            W = function(e, t, i) {
                this.x = parseFloat(e), this.y = parseFloat(t), this.scale = parseFloat(i)
            };
        W.parse = function(e) {
            return e.style ? W.parse(e.style[j]) : e.indexOf("matrix") > -1 || e.indexOf("none") > -1 ? W.fromMatrix(e) : W.fromString(e)
        }, W.fromMatrix = function(e) {
            var t = e.substring(7).split(",");
            return t.length && "none" !== e || (t = [1, 0, 0, 1, 0, 0]), new W(a(t[4]), a(t[5]), parseFloat(t[0]))
        }, W.fromString = function(e) {
            var t = e.split(") "),
                i = t[0].substring(R.globals.translate.length + 1).split(","),
                o = t.length > 1 ? t[1].substring(6) : 1,
                s = i.length > 1 ? i[0] : 0,
                n = i.length > 1 ? i[1] : 0;
            return new W(s, n, o)
        }, W.prototype.toString = function() {
            var e = B[R.globals.translate].suffix || "";
            return R.globals.translate + "(" + this.x + "px, " + this.y + "px" + e + ") scale(" + this.scale + ")"
        };
        var Y = function(e) {
            if (!e || !e.style[H]) return this.x = 0, void(this.y = 0);
            var t = e.style[H].split(" ");
            this.x = parseFloat(t[0]), this.y = parseFloat(t[1])
        };
        Y.prototype.toString = function() {
            return this.x + "px " + this.y + "px"
        };
        var G = function(e, t, i) {
                var o;
                return function() {
                    var s = this,
                        n = arguments,
                        r = function() {
                            o = null, i || e.apply(s, n)
                        },
                        a = i && !o;
                    clearTimeout(o), o = setTimeout(r, t), a && e.apply(s, n)
                }
            }(y, 500),
            V = {
                type: "canvas",
                format: "png",
                quality: 1
            },
            q = ["jpeg", "webp", "png"];
        if (window.jQuery) {
            var X = window.jQuery;
            X.fn.croppie = function(e) {
                if ("string" == typeof e) {
                    var t = Array.prototype.slice.call(arguments, 1),
                        i = X(this).data("croppie");
                    return "get" === e ? i.get() : "result" === e ? i.result.apply(i, t) : "bind" === e ? i.bind.apply(i, t) : this.each(function() {
                        var i = X(this).data("croppie");
                        if (i) {
                            var o = i[e];
                            if (!X.isFunction(o)) throw "Croppie " + e + " method not found";
                            o.apply(i, t), "destroy" === e && X(this).removeData("croppie")
                        }
                    })
                }
                return this.each(function() {
                    var t = new R(this, e);
                    t.$ = X, X(this).data("croppie", t)
                })
            }
        }
        R.defaults = {
            viewport: {
                width: 100,
                height: 100,
                type: "square"
            },
            boundary: {},
            orientationControls: {
                enabled: !0,
                leftClass: "",
                rightClass: ""
            },
            customClass: "",
            showZoomer: !0,
            enableZoom: !0,
            mouseWheelZoom: !0,
            enableExif: !1,
            enforceBoundary: !0,
            enableOrientation: !1,
            update: function() {}
        }, R.globals = {
            translate: "translate3d"
        }, i(R.prototype, {
            bind: function(e, t) {
                return I.call(this, e, t)
            },
            get: function() {
                var e = E.call(this),
                    t = e.points;
                return this.options.relative && (t[0] /= this.elements.img.naturalWidth / 100, t[1] /= this.elements.img.naturalHeight / 100, t[2] /= this.elements.img.naturalWidth / 100, t[3] /= this.elements.img.naturalHeight / 100), e
            },
            result: function(e) {
                return F.call(this, e)
            },
            refresh: function() {
                return M.call(this)
            },
            setZoom: function(e) {
                u.call(this, e), o(this.elements.zoomer)
            },
            rotate: function(e) {
                O.call(this, e)
            },
            destroy: function() {
                return L.call(this)
            }
        }), e.Croppie = window.Croppie = R, "object" == typeof module && module.exports && (module.exports = R)
    }),
    function(e) {
        "use strict";

        function t(t, o) {
            return this.each(function() {
                var s = e(this),
                    n = s.data("bs.modal"),
                    r = e.extend({}, i.DEFAULTS, s.data(), "object" == typeof t && t);
                n || s.data("bs.modal", n = new i(this, r)), "string" == typeof t ? n[t](o) : r.show && n.show(o)
            })
        }
        var i = function(t, i) {
            this.options = i, this.$body = e(document.body), this.$element = e(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, i.prototype.toggle = function(e) {
            return this.isShown ? this.hide() : this.show(e)
        }, i.prototype.show = function(t) {
            var o = this,
                s = e.Event("show.bs.modal", {
                    relatedTarget: t
                });
            this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                o.$element.one("mouseup.dismiss.bs.modal", function(t) {
                    e(t.target).is(o.$element) && (o.ignoreBackdropClick = !0)
                })
            }), this.backdrop(function() {
                var s = e.support.transition && o.$element.hasClass("fade");
                o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), s && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
                var n = e.Event("shown.bs.modal", {
                    relatedTarget: t
                });
                s ? o.$dialog.one("bsTransitionEnd", function() {
                    o.$element.trigger("focus").trigger(n)
                }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n)
            }))
        }, i.prototype.hide = function(t) {
            t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
        }, i.prototype.enforceFocus = function() {
            e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
                document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
            }, this))
        }, i.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy(function(e) {
                27 == e.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, i.prototype.resize = function() {
            this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal")
        }, i.prototype.hideModal = function() {
            var e = this;
            this.$element.hide(), this.backdrop(function() {
                e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal")
            })
        }, i.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, i.prototype.backdrop = function(t) {
            var o = this,
                s = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = e.support.transition && s;
                if (this.$backdrop = e(document.createElement("div")).addClass("modal-backdrop " + s).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) {
                        if (this.ignoreBackdropClick) return void(this.ignoreBackdropClick = !1);
                        e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                    }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
                n ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : t()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var r = function() {
                    o.removeBackdrop(), t && t()
                };
                e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
            } else t && t()
        }, i.prototype.handleUpdate = function() {
            this.adjustDialog()
        }, i.prototype.adjustDialog = function() {
            var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
            })
        }, i.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        }, i.prototype.checkScrollbar = function() {
            var e = window.innerWidth;
            if (!e) {
                var t = document.documentElement.getBoundingClientRect();
                e = t.right - Math.abs(t.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
        }, i.prototype.setScrollbar = function() {
            var e = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
        }, i.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        }, i.prototype.measureScrollbar = function() {
            var e = document.createElement("div");
            e.className = "modal-scrollbar-measure", this.$body.append(e);
            var t = e.offsetWidth - e.clientWidth;
            return this.$body[0].removeChild(e), t
        };
        var o = e.fn.modal;
        e.fn.modal = t, e.fn.modal.Constructor = i, e.fn.modal.noConflict = function() {
            return e.fn.modal = o, this
        }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
            var o = e(this),
                s = o.attr("href"),
                n = e(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
                r = n.data("bs.modal") ? "toggle" : e.extend({
                    remote: !/#/.test(s) && s
                }, n.data(), o.data());
            o.is("a") && i.preventDefault(), n.one("show.bs.modal", function(e) {
                e.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                    o.is(":visible") && o.trigger("focus")
                })
            }), t.call(n, r, this)
        })
    }(jQuery),
    function(e) {
        "function" == typeof define && define.amd ? define("datepicker", ["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(e) {
        "use strict";

        function t(e) {
            return C.call(e).slice(8, -1).toLowerCase()
        }

        function i(e) {
            return "string" == typeof e
        }

        function o(e) {
            return "number" == typeof e && !isNaN(e)
        }

        function s(e) {
            return void 0 === e
        }

        function n(e) {
            return "date" === t(e)
        }

        function r(e, t) {
            var i = [];
            return Array.from ? Array.from(e).slice(t || 0) : (o(t) && i.push(t), i.slice.apply(e, i))
        }

        function a(e, t) {
            var i = r(arguments, 2);
            return function() {
                return e.apply(t, i.concat(r(arguments)))
            }
        }

        function l(e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }

        function d(e, t) {
            return [31, l(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        }

        function c(e) {
            var t, i, o = String(e).toLowerCase(),
                s = o.match(w);
            if (!s || 0 === s.length) throw new Error("Invalid date format.");
            for (e = {
                    source: o,
                    parts: s
                }, t = s.length, i = 0; i < t; i++) switch (s[i]) {
                case "dd":
                case "d":
                    e.hasDay = !0;
                    break;
                case "mm":
                case "m":
                    e.hasMonth = !0;
                    break;
                case "yyyy":
                case "yy":
                    e.hasYear = !0
            }
            return e
        }

        function p(t, i) {
            i = e.isPlainObject(i) ? i : {}, i.language && (i = e.extend({}, p.LANGUAGES[i.language], i)), this.$element = e(t), this.options = e.extend({}, p.DEFAULTS, i), this.isBuilt = !1, this.isShown = !1, this.isInput = !1, this.isInline = !1, this.initialValue = "", this.initialDate = null, this.startDate = null, this.endDate = null, this.init()
        }
        var h = e(window),
            u = window.document,
            f = e(u),
            g = window.Number,
            m = "datepicker",
            v = "click.datepicker",
            w = /(y|m|d)+/g,
            y = /^\d{2,4}$/,
            k = ["datepicker-top-left", "datepicker-top-right", "datepicker-bottom-left", "datepicker-bottom-right"].join(" "),
            b = "datepicker-hide",
            S = Math.min,
            C = Object.prototype.toString;
        p.prototype = {
            constructor: p,
            init: function() {
                var t = this.options,
                    i = this.$element,
                    o = t.startDate,
                    s = t.endDate,
                    n = t.date;
                this.$trigger = e(t.trigger), this.isInput = i.is("input") || i.is("textarea"), this.isInline = t.inline && (t.container || !this.isInput), this.format = c(t.format), this.oldValue = this.initialValue = this.getValue(), n = this.parseDate(n || this.initialValue), o && (o = this.parseDate(o), n.getTime() < o.getTime() && (n = new Date(o)), this.startDate = o), s && (s = this.parseDate(s), o && s.getTime() < o.getTime() && (s = new Date(o)), n.getTime() > s.getTime() && (n = new Date(s)), this.endDate = s), this.date = n, this.viewDate = new Date(n), this.initialDate = new Date(this.date), this.bind(), (t.autoShow || this.isInline) && this.show(), t.autoPick && this.pick()
            },
            build: function() {
                var t, i = this.options,
                    o = this.$element;
                this.isBuilt || (this.isBuilt = !0, this.$picker = t = e(i.template), this.$week = t.find('[data-view="week"]'), this.$yearsPicker = t.find('[data-view="years picker"]'), this.$yearsPrev = t.find('[data-view="years prev"]'), this.$yearsNext = t.find('[data-view="years next"]'), this.$yearsCurrent = t.find('[data-view="years current"]'), this.$years = t.find('[data-view="years"]'), this.$monthsPicker = t.find('[data-view="months picker"]'), this.$yearPrev = t.find('[data-view="year prev"]'), this.$yearNext = t.find('[data-view="year next"]'), this.$yearCurrent = t.find('[data-view="year current"]'), this.$months = t.find('[data-view="months"]'), this.$daysPicker = t.find('[data-view="days picker"]'), this.$monthPrev = t.find('[data-view="month prev"]'), this.$monthNext = t.find('[data-view="month next"]'), this.$monthCurrent = t.find('[data-view="month current"]'), this.$days = t.find('[data-view="days"]'), this.isInline ? e(i.container || o).append(t.addClass("datepicker-inline")) : (e(u.body).append(t.addClass("datepicker-dropdown")), t.addClass(b)), this.fillWeek())
            },
            unbuild: function() {
                this.isBuilt && (this.isBuilt = !1, this.$picker.remove())
            },
            bind: function() {
                var t = this.options,
                    i = this.$element;
                e.isFunction(t.show) && i.on("show.datepicker", t.show), e.isFunction(t.hide) && i.on("hide.datepicker", t.hide), e.isFunction(t.pick) && i.on("pick.datepicker", t.pick), this.isInput && i.on("keyup.datepicker", e.proxy(this.keyup, this)), this.isInline || (t.trigger ? this.$trigger.on(v, e.proxy(this.toggle, this)) : this.isInput ? i.on("focus.datepicker", e.proxy(this.show, this)) : i.on(v, e.proxy(this.show, this)))
            },
            unbind: function() {
                var t = this.options,
                    i = this.$element;
                e.isFunction(t.show) && i.off("show.datepicker", t.show), e.isFunction(t.hide) && i.off("hide.datepicker", t.hide), e.isFunction(t.pick) && i.off("pick.datepicker", t.pick), this.isInput && i.off("keyup.datepicker", this.keyup), this.isInline || (t.trigger ? this.$trigger.off(v, this.toggle) : this.isInput ? i.off("focus.datepicker", this.show) : i.off(v, this.show))
            },
            showView: function(e) {
                var t = this.$yearsPicker,
                    i = this.$monthsPicker,
                    o = this.$daysPicker,
                    s = this.format;
                if (s.hasYear || s.hasMonth || s.hasDay) switch (g(e)) {
                    case 2:
                    case "years":
                        i.addClass(b), o.addClass(b), s.hasYear ? (this.fillYears(), t.removeClass(b), this.place()) : this.showView(0);
                        break;
                    case 1:
                    case "months":
                        t.addClass(b), o.addClass(b), s.hasMonth ? (this.fillMonths(), i.removeClass(b), this.place()) : this.showView(2);
                        break;
                    default:
                        t.addClass(b), i.addClass(b), s.hasDay ? (this.fillDays(), o.removeClass(b), this.place()) : this.showView(1)
                }
            },
            hideView: function() {
                !this.isInline && this.options.autoHide && this.hide()
            },
            place: function() {
                if (!this.isInline) {
                    var e = this.options,
                        t = this.$element,
                        i = this.$picker,
                        o = f.outerWidth(),
                        s = f.outerHeight(),
                        n = t.outerWidth(),
                        r = t.outerHeight(),
                        a = i.width(),
                        l = i.height(),
                        d = t.offset(),
                        c = d.left,
                        p = d.top,
                        h = parseFloat(e.offset) || 10,
                        u = "datepicker-top-left";
                    p > l && p + r + l > s ? (p -= l + h, u = "datepicker-bottom-left") : p += r + h, c + a > o && (c = c + n - a, u = u.replace("left", "right")), i.removeClass(k).addClass(u).css({
                        top: p,
                        left: c,
                        zIndex: parseInt(e.zIndex, 10)
                    })
                }
            },
            trigger: function(t, i) {
                var o = e.Event(t, i);
                return this.$element.trigger(o), o
            },
            createItem: function(t) {
                var i = this.options,
                    o = i.itemTag,
                    s = {
                        text: "",
                        view: "",
                        muted: !1,
                        picked: !1,
                        disabled: !1,
                        highlighted: !1
                    },
                    n = [];
                return e.extend(s, t), s.muted && n.push(i.mutedClass), s.highlighted && n.push(i.highlightedClass), s.picked && n.push(i.pickedClass), s.disabled && n.push(i.disabledClass), "<" + o + ' class="' + n.join(" ") + '"' + (s.view ? ' data-view="' + s.view + '"' : "") + ">" + s.text + "</" + o + ">"
            },
            fillAll: function() {
                this.fillYears(), this.fillMonths(), this.fillDays()
            },
            fillWeek: function() {
                var t, i = this.options,
                    o = parseInt(i.weekStart, 10) % 7,
                    s = i.daysMin,
                    n = "";
                for (s = e.merge(s.slice(o), s.slice(0, o)), t = 0; t <= 6; t++) n += this.createItem({
                    text: s[t]
                });
                this.$week.html(n)
            },
            fillYears: function() {
                var t, i = this.options,
                    o = i.disabledClass || "",
                    s = i.yearSuffix || "",
                    n = e.isFunction(i.filter) && i.filter,
                    r = this.startDate,
                    a = this.endDate,
                    l = this.viewDate,
                    d = l.getFullYear(),
                    c = l.getMonth(),
                    p = l.getDate(),
                    h = this.date,
                    u = h.getFullYear(),
                    f = !1,
                    g = !1,
                    m = !1,
                    v = !1,
                    w = !1,
                    y = "";
                for (t = -5; t <= 6; t++) h = new Date(d + t, c, p), w = -5 === t || 6 === t, v = d + t === u, m = !1, r && (m = h.getFullYear() < r.getFullYear(), -5 === t && (f = m)), !m && a && (m = h.getFullYear() > a.getFullYear(), 6 === t && (g = m)), !m && n && (m = !1 === n.call(this.$element, h)), y += this.createItem({
                    text: d + t,
                    view: m ? "year disabled" : v ? "year picked" : "year",
                    muted: w,
                    picked: v,
                    disabled: m
                });
                this.$yearsPrev.toggleClass(o, f), this.$yearsNext.toggleClass(o, g), this.$yearsCurrent.toggleClass(o, !0).html(d + -5 + s + " - " + (d + 6) + s), this.$years.html(y)
            },
            fillMonths: function() {
                var t, i = this.options,
                    o = i.disabledClass || "",
                    s = i.monthsShort,
                    n = e.isFunction(i.filter) && i.filter,
                    r = this.startDate,
                    a = this.endDate,
                    l = this.viewDate,
                    d = l.getFullYear(),
                    c = l.getDate(),
                    p = this.date,
                    h = p.getFullYear(),
                    u = p.getMonth(),
                    f = !1,
                    g = !1,
                    m = !1,
                    v = !1,
                    w = "";
                for (t = 0; t <= 11; t++) p = new Date(d, t, c), v = d === h && t === u, m = !1, r && (f = p.getFullYear() === r.getFullYear(), m = f && p.getMonth() < r.getMonth()), !m && a && (g = p.getFullYear() === a.getFullYear(), m = g && p.getMonth() > a.getMonth()), !m && n && (m = !1 === n.call(this.$element, p)), w += this.createItem({
                    index: t,
                    text: s[t],
                    view: m ? "month disabled" : v ? "month picked" : "month",
                    picked: v,
                    disabled: m
                });
                this.$yearPrev.toggleClass(o, f), this.$yearNext.toggleClass(o, g), this.$yearCurrent.toggleClass(o, f && g).html(d + i.yearSuffix || ""), this.$months.html(w)
            },
            fillDays: function() {
                var t, i, o, s = this.options,
                    n = s.disabledClass || "",
                    r = s.yearSuffix || "",
                    a = s.monthsShort,
                    l = parseInt(s.weekStart, 10) % 7,
                    c = e.isFunction(s.filter) && s.filter,
                    p = this.startDate,
                    h = this.endDate,
                    u = this.viewDate,
                    f = u.getFullYear(),
                    g = u.getMonth(),
                    m = f,
                    v = g,
                    w = f,
                    y = new Date,
                    k = y.getFullYear(),
                    b = y.getMonth(),
                    S = y.getDate(),
                    C = g,
                    $ = this.date,
                    x = $.getFullYear(),
                    T = $.getMonth(),
                    _ = $.getDate(),
                    D = !1,
                    P = !1,
                    I = !1,
                    A = !1,
                    E = [],
                    F = [],
                    M = [];
                for (0 === g ? (m -= 1, v = 11) : v -= 1, t = d(m, v), $ = new Date(f, g, 1), o = $.getDay() - l, o <= 0 && (o += 7), p && (D = $.getTime() <= p.getTime()), i = t - (o - 1); i <= t; i++) $ = new Date(m, v, i), I = !1, p && (I = $.getTime() < p.getTime()), !I && c && (I = !1 === c.call(this.$element, $)), E.push(this.createItem({
                    text: i,
                    view: "day prev",
                    muted: !0,
                    disabled: I,
                    highlighted: m === k && v === b && $.getDate() === S
                }));
                for (11 === g ? (w += 1, C = 0) : C += 1, t = d(f, g), o = 42 - (E.length + t), $ = new Date(f, g, t), h && (P = $.getTime() >= h.getTime()), i = 1; i <= o; i++) $ = new Date(w, C, i), I = !1, h && (I = $.getTime() > h.getTime()), !I && c && (I = !1 === c.call(this.$element, $)), F.push(this.createItem({
                    text: i,
                    view: "day next",
                    muted: !0,
                    disabled: I,
                    highlighted: w === k && C === b && $.getDate() === S
                }));
                for (i = 1; i <= t; i++) $ = new Date(f, g, i), A = f === x && g === T && i === _, I = !1, p && (I = $.getTime() < p.getTime()), !I && h && (I = $.getTime() > h.getTime()), !I && c && (I = !1 === c.call(this.$element, $)), M.push(this.createItem({
                    text: i,
                    view: I ? "day disabled" : A ? "day picked" : "day",
                    picked: A,
                    disabled: I,
                    highlighted: f === k && g === b && $.getDate() === S
                }));
                this.$monthPrev.toggleClass(n, D), this.$monthNext.toggleClass(n, P), this.$monthCurrent.toggleClass(n, D && P).html(s.yearFirst ? f + r + " " + a[g] : a[g] + " " + f + r), this.$days.html(E.join("") + M.join(" ") + F.join(""))
            },
            click: function(t) {
                var i, o, s, n, r, a, l = e(t.target),
                    d = this.viewDate;
                if (t.stopPropagation(), t.preventDefault(), !l.hasClass("disabled")) switch (i = d.getFullYear(), o = d.getMonth(), s = d.getDate(), a = l.data("view")) {
                    case "years prev":
                    case "years next":
                        i = "years prev" === a ? i - 10 : i + 10, r = l.text(), n = y.test(r), n && (i = parseInt(r, 10), this.date = new Date(i, o, S(s, 28))), this.viewDate = new Date(i, o, S(s, 28)), this.fillYears(), n && (this.showView(1), this.pick("year"));
                        break;
                    case "year prev":
                    case "year next":
                        i = "year prev" === a ? i - 1 : i + 1, this.viewDate = new Date(i, o, S(s, 28)), this.fillMonths();
                        break;
                    case "year current":
                        this.format.hasYear && this.showView(2);
                        break;
                    case "year picked":
                        this.format.hasMonth ? this.showView(1) : this.hideView(), this.pick("year");
                        break;
                    case "year":
                        i = parseInt(l.text(), 10), this.date = new Date(i, o, S(s, 28)), this.viewDate = new Date(i, o, S(s, 28)), this.format.hasMonth ? this.showView(1) : this.hideView(), this.pick("year");
                        break;
                    case "month prev":
                    case "month next":
                        o = "month prev" === a ? o - 1 : "month next" === a ? o + 1 : o, this.viewDate = new Date(i, o, S(s, 28)), this.fillDays();
                        break;
                    case "month current":
                        this.format.hasMonth && this.showView(1);
                        break;
                    case "month picked":
                        this.format.hasDay ? this.showView(0) : this.hideView(), this.pick("month");
                        break;
                    case "month":
                        o = e.inArray(l.text(), this.options.monthsShort), this.date = new Date(i, o, S(s, 28)), this.viewDate = new Date(i, o, S(s, 28)), this.format.hasDay ? this.showView(0) : this.hideView(), this.pick("month");
                        break;
                    case "day prev":
                    case "day next":
                    case "day":
                        o = "day prev" === a ? o - 1 : "day next" === a ? o + 1 : o, s = parseInt(l.text(), 10), this.date = new Date(i, o, s), this.viewDate = new Date(i, o, s), this.fillDays(), "day" === a && this.hideView(), this.pick("day");
                        break;
                    case "day picked":
                        this.hideView(), this.pick("day")
                }
            },
            clickDoc: function(e) {
                for (var t, i = e.target, o = this.$element[0], s = this.$trigger[0]; i !== u;) {
                    if (i === s || i === o) {
                        t = !0;
                        break
                    }
                    i = i.parentNode
                }
                t || this.hide()
            },
            keyup: function() {
                this.update()
            },
            keyupDoc: function(e) {
                this.isInput && e.target !== this.$element[0] && this.isShown && ("Tab" === e.key || 9 === e.keyCode) && this.hide()
            },
            getValue: function() {
                var e = this.$element,
                    t = "";
                return this.isInput ? t = e.val() : this.isInline ? this.options.container && (t = e.text()) : t = e.text(), t
            },
            setValue: function(e) {
                var t = this.$element;
                e = i(e) ? e : "", this.isInput ? t.val(e) : this.isInline ? this.options.container && t.text(e) : t.text(e)
            },
            show: function() {
                this.isBuilt || this.build(), this.isShown || this.trigger("show.datepicker").isDefaultPrevented() || (this.isShown = !0, this.$picker.removeClass(b).on(v, e.proxy(this.click, this)), this.showView(this.options.startView), this.isInline || (h.on("resize.datepicker", this._place = a(this.place, this)), f.on(v, this._clickDoc = a(this.clickDoc, this)), f.on("keyup.datepicker", this._keyupDoc = a(this.keyupDoc, this)), this.place()))
            },
            hide: function() {
                this.isShown && (this.trigger("hide.datepicker").isDefaultPrevented() || (this.isShown = !1, this.$picker.addClass(b).off(v, this.click), this.isInline || (h.off("resize.datepicker", this._place), f.off(v, this._clickDoc), f.off("keyup.datepicker", this._keyupDoc))))
            },
            toggle: function() {
                this.isShown ? this.hide() : this.show()
            },
            update: function() {
                var e = this.getValue();
                e !== this.oldValue && (this.setDate(e, !0), this.oldValue = e)
            },
            pick: function(e) {
                var t = this.$element,
                    i = this.date;
                this.trigger("pick.datepicker", {
                    view: e || "",
                    date: i
                }).isDefaultPrevented() || (this.setValue(i = this.formatDate(this.date)), this.isInput && t.trigger("change"))
            },
            reset: function() {
                this.setDate(this.initialDate, !0), this.setValue(this.initialValue), this.isShown && this.showView(this.options.startView)
            },
            getMonthName: function(t, i) {
                var n = this.options,
                    r = n.months;
                return e.isNumeric(t) ? t = g(t) : s(i) && (i = t), !0 === i && (r = n.monthsShort), r[o(t) ? t : this.date.getMonth()]
            },
            getDayName: function(t, i, n) {
                var r = this.options,
                    a = r.days;
                return e.isNumeric(t) ? t = g(t) : (s(n) && (n = i), s(i) && (i = t)), a = !0 === n ? r.daysMin : !0 === i ? r.daysShort : a, a[o(t) ? t : this.date.getDay()]
            },
            getDate: function(e) {
                var t = this.date;
                return e ? this.formatDate(t) : new Date(t)
            },
            setDate: function(t, o) {
                var s = this.options.filter;
                if (n(t) || i(t)) {
                    if (t = this.parseDate(t), e.isFunction(s) && !1 === s.call(this.$element, t)) return;
                    this.date = t, this.viewDate = new Date(t), o || this.pick(), this.isBuilt && this.fillAll()
                }
            },
            setStartDate: function(e) {
                (n(e) || i(e)) && (this.startDate = this.parseDate(e), this.isBuilt && this.fillAll())
            },
            setEndDate: function(e) {
                (n(e) || i(e)) && (this.endDate = this.parseDate(e), this.isBuilt && this.fillAll())
            },
            parseDate: function(e) {
                var t, o, s, r, a, l, d = this.format,
                    c = [];
                if (n(e)) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
                if (i(e) && (c = e.match(/\d+/g) || []), e = new Date, o = e.getFullYear(), s = e.getDate(), r = e.getMonth(), t = d.parts.length, c.length === t)
                    for (l = 0; l < t; l++) switch (a = parseInt(c[l], 10) || 1, d.parts[l]) {
                        case "dd":
                        case "d":
                            s = a;
                            break;
                        case "mm":
                        case "m":
                            r = a - 1;
                            break;
                        case "yy":
                            o = 2e3 + a;
                            break;
                        case "yyyy":
                            o = a
                    }
                return new Date(o, r, s)
            },
            formatDate: function(e) {
                var t, i, o, s, r, a = this.format,
                    l = "";
                if (n(e))
                    for (l = a.source, i = e.getFullYear(), s = {
                            d: e.getDate(),
                            m: e.getMonth() + 1,
                            yy: i.toString().substring(2),
                            yyyy: i
                        }, s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, t = a.parts.length, r = 0; r < t; r++) o = a.parts[r], l = l.replace(o, s[o]);
                return l
            },
            destroy: function() {
                this.unbind(), this.unbuild(), this.$element.removeData(m)
            }
        }, p.LANGUAGES = {}, p.DEFAULTS = {
            autoShow: !1,
            autoHide: !1,
            autoPick: !1,
            inline: !1,
            container: null,
            trigger: null,
            language: "",
            format: "mm/dd/yyyy",
            date: null,
            startDate: null,
            endDate: null,
            startView: 0,
            weekStart: 0,
            yearFirst: !1,
            yearSuffix: "",
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            itemTag: "li",
            mutedClass: "muted",
            pickedClass: "picked",
            disabledClass: "disabled",
            highlightedClass: "highlighted",
            template: '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
            offset: 10,
            zIndex: 1e3,
            filter: null,
            show: null,
            hide: null,
            pick: null
        }, p.setDefaults = function(t) {
            t = e.isPlainObject(t) ? t : {}, t.language && (t = e.extend({}, p.LANGUAGES[t.language], t)), e.extend(p.DEFAULTS, t)
        }, p.other = e.fn.datepicker, e.fn.datepicker = function(t) {
            var o, n = r(arguments, 1);
            return this.each(function() {
                var s, r, a = e(this),
                    l = a.data(m);
                if (!l) {
                    if (/destroy/.test(t)) return;
                    s = e.extend({}, a.data(), e.isPlainObject(t) && t), a.data(m, l = new p(this, s))
                }
                i(t) && e.isFunction(r = l[t]) && (o = r.apply(l, n))
            }), s(o) ? this : o
        }, e.fn.datepicker.Constructor = p, e.fn.datepicker.languages = p.LANGUAGES, e.fn.datepicker.setDefaults = p.setDefaults, e.fn.datepicker.noConflict = function() {
            return e.fn.datepicker = p.other, this
        }
    }),
    function(e) {
        "use strict";

        function t() {
            this.$nav = e("#navigation")
        }

        function i() {
            this.$carousel = e(".carousel")
        }

        function o() {
            this.$story_csl = e("#story-csl")
        }

        function s() {
            this.$button_set = e('[data-donate="options"]'), this.$field = e('[data-donate="value"]').first(), this.$totals = e('[data-donate="total"]'), this.$error_el = e('[data-donate="error"]').first(), this.has_error = !1, this.donation_amount = 0
        }

        function n() {
            this.$field_raw_file_trigger = e("[data-upload-trigger]"), this.$field_raw_file = e("#image-upload"), this.$field_before_image = e("#shaver-before-image"), this.$field_after_image = e("#shaver-after-image"), this.$crop_modal = e("#crop-modal"), this.$crop_preview = e("#crop-preview"), this.$get_crop_result_btn = e("#get-crop-result"), this.image_scope = ""
        }

        function r() {
            this.init = function() {
                e(document).on("change", '[data-selector="category-switch"]', function() {
                    location.assign(e(this).val())
                })
            }
        }

        function a() {
            this.$back_top_button = e("#back-top")
        }

        function l() {
            this.$button_set = e('[data-toggle="heading"]')
        }

        function d() {
            this.$field = e('[data-age-check="trigger"]')
        }

        function c() {
            this.$share_links = e("[data-share]")
        }

        function p() {
            this.$field = e("[data-show-field]")
        }

        function h() {
            this.$cookie_ui = e('[data-cookies="ui"]'), this.$cookie_accept_btn = e('[data-cookies="accept"]'), this.cookie_consent_name = "_cookie_consent", this.cookie_consent_lifetime = 365, this.cookie_consent_value = "true"
        }

        function u() {
            this.$checkboxes = e("[data-toggle-checkbox]")
        }

        function f() {
            this.$search_btn = e('[data-postcode="search"]'), this.default_btn_text = "Look up address", this.$address_postcode = e('[data-postcode="address-postcode"]'), this.$address_select = e('[data-postcode="options"]'), this.address_options = [], this.$address_line_1 = e('[data-postcode="address-line-1"]'), this.$address_line_2 = e('[data-postcode="address-line-2"]'), this.$address_town = e('[data-postcode="address-city"]'), this.$address_verification_flag = e("#IsPafValid")
        }
        var g = g || {};
        g.options = {
            postcode_lookup_endpoint: "/umbraco/surface/AddressLookup/addresses"
        }, g.helpers = {
            get_extension: function(e) {
                return e.substr(e.lastIndexOf(".") + 1)
            },
            is_image_file: function(e) {
                switch (g.helpers.get_extension(e)) {
                    case "jpg":
                    case "JPG":
                    case "jpeg":
                    case "JPEG":
                    case "png":
                    case "PNG":
                        return !0
                }
                return !1
            }
        }, t.prototype.init = function() {
            var t = this;
            e(document).on("click", '[data-toggle="nav"]', function() {
                t.$nav.hasClass("nav--active") ? t.$nav.removeClass("nav--active") : t.$nav.addClass("nav--active")
            })
        }, i.prototype.init = function() {
            this.$carousel.slick({
                slidesToShow: 1,
                adaptiveHeight: !0,
                prevArrow: '<button class="carousel__button carousel__button--prev" aria-label="Read previous item"></button>',
                nextArrow: '<button class="carousel__button carousel__button--next" aria-label="Read next item"></button>'
            })
        }, o.prototype.init = function() {
            this.$story_csl.slick({
                centerMode: !0,
                centerPadding: "20%",
                slidesToShow: 1,
                prevArrow: '<button class="story-csl__button story-csl__button--prev" aria-label="Previous story"></button>',
                nextArrow: '<button class="story-csl__button story-csl__button--next" aria-label="Next story"></button>',
                adaptiveHeight: !0,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        centerPadding: "120px"
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        centerPadding: "80px",
                        arrows: !1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        centerPadding: "40px",
                        arrows: !1
                    }
                }]
            })
        }, s.prototype.toggle = function(e) {
            var t = e.find('input[type="radio"]').first();
            t.length > 0 && t.val() && this.setAmount(t.val()), t.trigger("focus"), this.$button_set.find(".active").removeClass("active"), e.addClass("active"), this.updateTotals()
        }, s.prototype.setAmount = function(e) {
            this.$field.val(e), this.donation_amount = e
        }, s.prototype.resetButtons = function() {
            this.$button_set.find(".active").removeClass("active")
        }, s.prototype.reconcileButtons = function() {
            var e = this.$button_set.find(':radio[value="' + this.donation_amount + '"]');
            e.length && e.first().closest(".button").addClass("active")
        }, s.prototype.validateAmount = function(e) {
            var t = /^[0-9,.]*$/,
                i = !0;
            return ((e.match(/\./g) || []).length > 1 || !1 === t.test(e)) && (i = !1), i || this.showError("Please enter a valid number, such as 50 or 50.00"), i
        }, s.prototype.updateTotals = function() {
            var t = this;
            this.$totals.each(function() {
                isNaN(t.donation_amount) ? e(this).text("£0.00") : e(this).text("£" + t.donation_amount)
            })
        }, s.prototype.showError = function(e) {
            this.has_error = !0, this.$field.addClass("field--error"), this.$field.attr("aria-invalid", "true"), this.$error_el.addClass("field__hint--error").text(e)
        }, s.prototype.clearError = function() {
            this.has_error = !1, this.$field.removeClass("field--error"), this.$field.attr("aria-invalid", "false"), this.$error_el.removeClass("field__hint--error").text("")
        }, s.prototype.init = function() {
            var t = this;
            this.$button_set.on("click", function(i) {
                i.preventDefault();
                var o = e(i.target).closest(".button");
                o.length > 0 && t.toggle(o), t.has_error && t.clearError()
            }), this.$field.on("input", function() {
                t.has_error && t.clearError(), "" !== e(this).val() ? (t.donation_amount = parseFloat(e(this).val()), t.donation_amount = t.donation_amount.toFixed(2)) : t.donation_amount = 0, t.updateTotals(), t.resetButtons()
            }), this.$field.on("change", function() {
                t.has_error && t.clearError(), t.validateAmount(e(this).val()) && (t.donation_amount > 0 ? e(this).val(t.donation_amount) : e(this).val("Amount"), t.reconcileButtons())
            })
        }, n.prototype.init = function() {
            var t = this;
            t.$field_raw_file_trigger.on("click", function(i) {
                i.preventDefault(), t.image_scope = e(i.target).data("upload-trigger"), t.$field_raw_file.trigger("click")
            }), t.$field_raw_file.on("change", function() {
                var i = e('[data-upload-error="' + t.image_scope + '"]');
                if (e(i).text(""), e(i).closest(".field-row").removeClass("field-row--error"), this.files && this.files[0])
                    if (!0 === g.helpers.is_image_file(this.files[0].name)) {
                        var o = new FileReader;
                        o.onload = function(e) {
                            t.$crop_preview.croppie({
                                url: e.target.result,
                                enableExif: !0,
                                boundary: {
                                    width: 250,
                                    height: 250
                                },
                                viewport: {
                                    width: 150,
                                    height: 150
                                }
                            }), t.$crop_modal.modal("show")
                        }, o.readAsDataURL(this.files[0])
                    } else e(i).text("Please choose a .jpg, .jpeg or .png image"), e(i).closest(".field-row").addClass("field-row--error"), t.$crop_modal.modal("hide")
            }), t.$get_crop_result_btn.on("click", function(i) {
                i.preventDefault(), t.$crop_preview.croppie("result", {
                    type: "base64",
                    size: {
                        height: 800,
                        width: 800
                    },
                    format: "jpeg",
                    quality: 1,
                    circle: !1
                }).then(function(i) {
                    switch (t.image_scope) {
                        case "before":
                            t.$field_before_image.val(i);
                            break;
                        case "after":
                            t.$field_after_image.val(i);
                            break;
                        default:
                            console.error("crop preview was not defined!")
                    }
                    e('[data-preview-image="' + t.image_scope + '"]').css({
                        "background-image": "url(" + i + ")"
                    }), t.$crop_modal.modal("hide")
                })
            }), t.$crop_modal.on("hide.bs.modal", function() {
                t.$field_raw_file.val(""), t.$crop_preview.croppie("destroy")
            })
        }, a.prototype.init = function() {
            this.$back_top_button.on("click", function(t) {
                e("html, body").animate({
                    scrollTop: "0px"
                })
            })
        }, l.prototype.close_all = function() {
            var t = e(".toggle__heading"),
                i = e(".toggle__content"),
                o = this;
            t.removeClass("open"), i.each(function() {
                e(this).hasClass("open") && o.close_content(e(this))
            })
        }, l.prototype.open_content = function(e) {
            var t = this;
            e.animate({
                "max-height": "9999px"
            }, 500, function() {
                e.addClass("open"), t.scroll_to_section(e), setTimeout(function() {
                    t.update_max_height(e)
                }, 1e3)
            })
        }, l.prototype.close_content = function(e) {
            e.removeClass("open"), e.animate({
                "max-height": "0px"
            }, 0, function() {
                e.removeAttr("style")
            })
        }, l.prototype.update_max_height = function(e) {
            var t = e.outerHeight();
            e.css({
                "max-height": 2 * t + "px"
            })
        }, l.prototype.open_on_load = function() {
            var t = this;
            e(".toggle__content").each(function() {
                e(this).hasClass("open") && (e(this).css({
                    "max-height": "9999px"
                }).addClass("open"), setTimeout(function() {
                    t.update_max_height(e(this))
                }, 500))
            })
        }, l.prototype.scroll_to_section = function(t) {
            e("html, body").animate({
                scrollTop: t.offset().top - 40
            }, 500);
            var i = t.find(".field").first();
            i && i.focus()
        }, l.prototype.toggle = function(e) {
            var t = e.closest(".toggle__heading"),
                i = t.next(".toggle__content");
            !0 === e.data("toggle-all") && this.close_all(), t.hasClass("open") ? t.removeClass("open") : t.addClass("open"), i.hasClass("open") ? this.close_content(i) : this.open_content(i)
        }, l.prototype.init = function() {
            var t = this;
            t.open_on_load(), this.$button_set.on("click", function(i) {
                i.preventDefault();
                var o = e(i.target);
                o.length > 0 && t.toggle(o)
            })
        }, d.prototype.show_message = function(e) {
            var t = e.data("age-check-message") || "";
            e.closest(".field-row").addClass("field-row--warning").find(".field__hint").text(t)
        }, d.prototype.clear_message = function(e) {
            e.closest(".field-row").removeClass("field-row--warning").find(".field__hint").text("")
        }, d.prototype.init = function() {
            var t = this;
            t.$field.on("change", function(i) {
                "Under 18" == e(i.target).val() ? t.show_message(e(i.target)) : t.clear_message(e(i.target))
            })
        }, c.prototype.render_for_pinterest = function(e) {
            var t = {
                    url: window.location.href,
                    media: e.data("share-image")
                },
                i = Object.keys(t).map(function(e) {
                    return e + "=" + encodeURIComponent(t[e])
                }).join("&");
            e.attr("href", "//www.pinterest.com/pin/create/button/?" + i)
        }, c.prototype.init = function() {
            var t = this;
            t.$share_links.each(function(i) {
                var o = e(this);
                "pinterest" === o.data("share") && t.render_for_pinterest(o)
            })
        }, p.prototype.init = function(t) {
            this.$field.on("change", function(t) {
                "True" === e(t.target).val() ? e('[data-hidden-field="' + e(t.target).data("show-field") + '"]').show() : e('[data-hidden-field="' + e(t.target).data("show-field") + '"]').hide()
            })
        }, h.prototype.has_consent = function() {
            var e = this.cookie_consent_name + "=";
            return -1 != document.cookie.indexOf("; " + e) || 0 === document.cookie.indexOf(e)
        }, h.prototype.consent = function() {
            var e, t = new Date;
            t.setTime(t.getTime() + 24 * this.cookie_consent_lifetime * 60 * 60 * 1e3), e = "expires=" + t.toUTCString(), document.cookie = this.cookie_consent_name + "=" + this.cookie_consent_value + ";" + e + ";path=/"
        }, h.prototype.init = function() {
            var e = this;
            this.has_consent() || e.$cookie_ui.addClass("cookies--no-consent"), e.$cookie_accept_btn.on("click", function() {
                e.$cookie_ui.removeClass("cookies--no-consent"), e.consent()
            })
        }, u.prototype.init = function() {
            this.$checkboxes.on("change", function(t) {
                !0 === e(t.target).prop("checked") && e('[data-toggle-checkbox="' + e(t.target).data("toggle-checkbox") + '"]').not(this).each(function() {
                    e(this).prop("checked", !1)
                })
            })
        }, f.prototype.init = function() {
            var t = this;
            this.$search_btn.on("click", function(i) {
                i.preventDefault(), t.$address_select.closest(".field-row").addClass("field-row--hidden"), t.$address_select.find("option").length > 0 && t.$address_select.find("option").remove().end().niceSelect("update"), e(this).text("searching..."), t.clear_error_message(), !0 === t.validate_field() && t.find_address()
            }), this.$address_select.on("change", function() {
                t.update_address()
            })
        }, f.prototype.validate_field = function() {
            return "" !== this.$address_postcode.val() || (this.show_message("Please enter a postcode", "error"), this.$search_btn.text(this.default_btn_text), !1)
        }, f.prototype.show_message = function(e, t) {
            "error" == t && this.$address_postcode.closest(".field-row").addClass("field-row--error"), this.$address_postcode.siblings(".field__hint").text(e)
        }, f.prototype.clear_error_message = function() {
            this.$address_postcode.closest(".field-row").removeClass("field-row--error"), this.$address_postcode.siblings(".field__hint").text("")
        }, f.prototype.find_address = function() {
            var t = this,
                i = t.$address_postcode.val();
            i = i.replace(/\s+/g, "");
            var o = e.ajax({
                url: g.options.postcode_lookup_endpoint + "?postcode=" + i,
                method: "GET"
            });
            o.done(function(e) {
                t.$search_btn.text(t.default_btn_text), e.constructor === Array && 0 === e.length && t.show_message("No addresses found for this postcode"), t.show_address_options(e), t.address_options = e
            }), o.fail(function(e, o) {
                t.$search_btn.text(t.default_btn_text), t.show_message("Could not retrieve any addresses matching that postcode - please manually enter your address"), console.error("the GET request to " + g.options.postcode_lookup_endpoint + "?postcode=" + i + " failed"), console.error(e), console.error(o)
            })
        }, f.prototype.show_address_options = function(t) {
            var i = this;
            t.length > 0 && i.$address_select.append(e("<option></option>").attr("value", "").text("Please choose your address..."));
            for (var o = 0; o < t.length; o++) i.$address_select.append(e("<option></option>").attr("value", o).text(t[o].CompleteAddress));
            i.$address_select.closest(".field-row").removeClass("field-row--hidden"), i.$address_select.niceSelect("update")
        }, f.prototype.update_address = function() {
            var e = this;
            if ("" !== e.$address_select.val()) {
                window.verified_address = e.address_options[e.$address_select.val()];
                for (var t in window.verified_address) window.verified_address[t] || (window.verified_address[t] = "");
                e.$address_line_1.val(window.verified_address.Line1), e.$address_line_2.val(window.verified_address.Line2), e.$address_town.val(window.verified_address.Town), e.$address_postcode.val(window.verified_address.PostCode), e.set_verified_address_flag(!0)
            }
        }, f.prototype.set_verified_address_flag = function(e) {
            e ? this.$address_verification_flag.val("True") : this.$address_verification_flag.val("False")
        }, g.components = {
            navigation: new t,
            carousel: new i,
            story_carousel: new o,
            category_switches: new r,
            donate: new s,
            shaver: new n,
            backtop: new a,
            toggle: new l,
            share: new c,
            age_check: new d,
            show_field: new p,
            cookie_consent: new h,
            toggle_checkbox: new u,
            postcode_lookup: new f
        }, g.init = function() {
            for (var e in g.components) "function" == typeof g.components[e].init && g.components[e].init()
        }, e(function() {
            g.init(), e("select").niceSelect(), e('[data-toggle="datepicker"]').datepicker({
                format: "dd/mm/yyyy",
                minDate: 0
            }), e("#joinForm").submit(function(t) {
                t.preventDefault();
                var i = this;
                if (window.verified_address) {
                    var o = e('[data-postcode="address-line-1"]').val(),
                        s = e('[data-postcode="address-line-2"]').val(),
                        n = e('[data-postcode="address-city"]').val(),
                        r = e('[data-postcode="address-postcode"]').val();
                    window.verified_address.Line1 != o || window.verified_address.Line2 != s || window.verified_address.Town != n || window.verified_address.PostCode != r ? g.components.postcode_lookup.$address_verification_flag.val("False") : g.components.postcode_lookup.$address_verification_flag.val("True")
                } else g.components.postcode_lookup.$address_verification_flag.val("False");
                i.submit()
            })
        })
    }(jQuery);