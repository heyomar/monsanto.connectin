"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.fitvids = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {

            'use strict';

            var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', 'object'];

            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';

            module.exports = function (parentSelector, opts) {
                parentSelector = parentSelector || 'body';
                opts = opts || {};

                if (isObject(parentSelector)) {
                    opts = parentSelector;
                    parentSelector = 'body';
                }

                opts.ignore = opts.ignore || '';
                opts.players = opts.players || '';

                var containers = queryAll(parentSelector);
                if (!hasLength(containers)) return;

                if (!document.getElementById('fit-vids-style')) {
                    var head = document.head || document.getElementsByTagName('head')[0];
                    head.appendChild(styles());
                }

                var custom = toSelectorArray(opts.players) || [];
                var ignored = toSelectorArray(opts.ignore) || [];
                var selector = selectors.filter(notIgnored(ignored)).concat(custom).join();

                if (!hasLength(selector)) return;

                containers.forEach(function (container) {
                    var videos = queryAll(container, selector);
                    videos.forEach(function (video) {
                        wrap(video);
                    });
                });
            };

            function queryAll(el, selector) {
                if (typeof el === 'string') {
                    selector = el;
                    el = document;
                }
                return Array.prototype.slice.call(el.querySelectorAll(selector));
            }

            function toSelectorArray(input) {
                if (typeof input === 'string') {
                    return input.split(',').map(trim).filter(hasLength);
                } else if (isArray(input)) {
                    return flatten(input.map(toSelectorArray).filter(hasLength));
                }
                return input || [];
            }

            function wrap(el) {
                if (/fluid-width-video-wrapper/.test(el.parentNode.className)) return;

                var widthAttr = parseInt(el.getAttribute('width'), 10);
                var heightAttr = parseInt(el.getAttribute('height'), 10);

                var width = !isNaN(widthAttr) ? widthAttr : el.clientWidth;
                var height = !isNaN(heightAttr) ? heightAttr : el.clientHeight;
                var aspect = height / width;

                el.removeAttribute('width');
                el.removeAttribute('height');

                var wrapper = document.createElement('div');
                el.parentNode.insertBefore(wrapper, el);
                wrapper.className = 'fluid-width-video-wrapper';
                wrapper.style.paddingTop = aspect * 100 + '%';
                wrapper.appendChild(el);
            }

            function styles() {
                var div = document.createElement('div');
                div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
                return div.childNodes[1];
            }

            function notIgnored(ignored) {
                if (ignored.length < 1) {
                    return function () {
                        return true;
                    };
                }
                return function (selector) {
                    return ignored.indexOf(selector) === -1;
                };
            }

            function hasLength(input) {
                return input.length > 0;
            }

            function trim(str) {
                return str.replace(/^\s+|\s+$/g, '');
            }

            function flatten(input) {
                return [].concat.apply([], input);
            }

            function isObject(input) {
                return Object.prototype.toString.call(input) === '[object Object]';
            }

            function isArray(input) {
                return Object.prototype.toString.call(input) === '[object Array]';
            }
        }, {}] }, {}, [1])(1);
});

fitvids();
/*! Lity - v2.2.2 - 2016-12-14
* http://sorgalla.com/lity/
* Copyright (c) 2015-2016 Jan Sorgalla; Licensed MIT */
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory(window, $);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        module.exports = factory(window, require('jquery'));
    } else {
        window.lity = factory(window, window.jQuery || window.Zepto);
    }
})(typeof window !== "undefined" ? window : undefined, function (window, $) {
    'use strict';

    var document = window.document;

    var _win = $(window);
    var _deferred = $.Deferred;
    var _html = $('html');
    var _instances = [];

    var _attrAriaHidden = 'aria-hidden';
    var _dataAriaHidden = 'lity-' + _attrAriaHidden;

    var _focusableElementsSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

    var _defaultOptions = {
        handler: null,
        handlers: {
            image: imageHandler,
            inline: inlineHandler,
            youtube: youtubeHandler,
            vimeo: vimeoHandler,
            googlemaps: googlemapsHandler,
            facebookvideo: facebookvideoHandler,
            iframe: iframeHandler
        },
        template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
    };

    var _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;
    var _youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
    var _vimeoRegex = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
    var _googlemapsRegex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;
    var _facebookvideoRegex = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;

    var _transitionEndEvent = function () {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return false;
    }();

    function transitionEnd(element) {
        var deferred = _deferred();

        if (!_transitionEndEvent || !element.length) {
            deferred.resolve();
        } else {
            element.one(_transitionEndEvent, deferred.resolve);
            setTimeout(deferred.resolve, 500);
        }

        return deferred.promise();
    }

    function settings(currSettings, key, value) {
        if (arguments.length === 1) {
            return $.extend({}, currSettings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof currSettings[key] === 'undefined' ? null : currSettings[key];
            }

            currSettings[key] = value;
        } else {
            $.extend(currSettings, key);
        }

        return this;
    }

    function parseQueryParams(params) {
        var pairs = decodeURI(params.split('#')[0]).split('&');
        var obj = {},
            p;

        for (var i = 0, n = pairs.length; i < n; i++) {
            if (!pairs[i]) {
                continue;
            }

            p = pairs[i].split('=');
            obj[p[0]] = p[1];
        }

        return obj;
    }

    function appendQueryParams(url, params) {
        return url + (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
    }

    function transferHash(originalUrl, newUrl) {
        var pos = originalUrl.indexOf('#');

        if (-1 === pos) {
            return newUrl;
        }

        if (pos > 0) {
            originalUrl = originalUrl.substr(pos);
        }

        return newUrl + originalUrl;
    }

    function error(msg) {
        return $('<span class="lity-error"/>').append(msg);
    }

    function imageHandler(target, instance) {
        var desc = instance.opener() && instance.opener().data('lity-desc') || 'Image with no description';
        var img = $('<img src="' + target + '" alt="' + desc + '"/>');
        var deferred = _deferred();
        var failed = function failed() {
            deferred.reject(error('Failed loading image'));
        };

        img.on('load', function () {
            if (this.naturalWidth === 0) {
                return failed();
            }

            deferred.resolve(img);
        }).on('error', failed);

        return deferred.promise();
    }

    imageHandler.test = function (target) {
        return _imageRegexp.test(target);
    };

    function inlineHandler(target, instance) {
        var el, placeholder, hasHideClass;

        try {
            el = $(target);
        } catch (e) {
            return false;
        }

        if (!el.length) {
            return false;
        }

        placeholder = $('<i style="display:none !important"/>');
        hasHideClass = el.hasClass('lity-hide');

        instance.element().one('lity:remove', function () {
            placeholder.before(el).remove();

            if (hasHideClass && !el.closest('.lity-content').length) {
                el.addClass('lity-hide');
            }
        });

        return el.removeClass('lity-hide').after(placeholder);
    }

    function youtubeHandler(target) {
        var matches = _youtubeRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.youtube' + (matches[2] || '') + '.com/embed/' + matches[4], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[5] || '')))));
    }

    function vimeoHandler(target) {
        var matches = _vimeoRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://player.vimeo.com/video/' + matches[3], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || '')))));
    }

    function facebookvideoHandler(target) {
        var matches = _facebookvideoRegex.exec(target);

        if (!matches) {
            return false;
        }

        if (0 !== target.indexOf('http')) {
            target = 'https:' + target;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.facebook.com/plugins/video.php?href=' + target, $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || '')))));
    }

    function googlemapsHandler(target) {
        var matches = _googlemapsRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.google.' + matches[3] + '/maps?' + matches[6], {
            output: matches[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
        })));
    }

    function iframeHandler(target) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + target + '"/></div>';
    }

    function winHeight() {
        return document.documentElement.clientHeight ? document.documentElement.clientHeight : Math.round(_win.height());
    }

    function keydown(e) {
        var current = currentInstance();

        if (!current) {
            return;
        }

        // ESC key
        if (e.keyCode === 27) {
            current.close();
        }

        // TAB key
        if (e.keyCode === 9) {
            handleTabKey(e, current);
        }
    }

    function handleTabKey(e, instance) {
        var focusableElements = instance.element().find(_focusableElementsSelector);
        var focusedIndex = focusableElements.index(document.activeElement);

        if (e.shiftKey && focusedIndex <= 0) {
            focusableElements.get(focusableElements.length - 1).focus();
            e.preventDefault();
        } else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
            focusableElements.get(0).focus();
            e.preventDefault();
        }
    }

    function resize() {
        $.each(_instances, function (i, instance) {
            instance.resize();
        });
    }

    function registerInstance(instanceToRegister) {
        if (1 === _instances.unshift(instanceToRegister)) {
            _html.addClass('lity-active');

            _win.on({
                resize: resize,
                keydown: keydown
            });
        }

        $('body > *').not(instanceToRegister.element()).addClass('lity-hidden').each(function () {
            var el = $(this);

            if (undefined !== el.data(_dataAriaHidden)) {
                return;
            }

            el.data(_dataAriaHidden, el.attr(_attrAriaHidden) || null);
        }).attr(_attrAriaHidden, 'true');
    }

    function removeInstance(instanceToRemove) {
        var show;

        instanceToRemove.element().attr(_attrAriaHidden, 'true');

        if (1 === _instances.length) {
            _html.removeClass('lity-active');

            _win.off({
                resize: resize,
                keydown: keydown
            });
        }

        _instances = $.grep(_instances, function (instance) {
            return instanceToRemove !== instance;
        });

        if (!!_instances.length) {
            show = _instances[0].element();
        } else {
            show = $('.lity-hidden');
        }

        show.removeClass('lity-hidden').each(function () {
            var el = $(this),
                oldAttr = el.data(_dataAriaHidden);

            if (!oldAttr) {
                el.removeAttr(_attrAriaHidden);
            } else {
                el.attr(_attrAriaHidden, oldAttr);
            }

            el.removeData(_dataAriaHidden);
        });
    }

    function currentInstance() {
        if (0 === _instances.length) {
            return null;
        }

        return _instances[0];
    }

    function factory(target, instance, handlers, preferredHandler) {
        var handler = 'inline',
            content;

        var currentHandlers = $.extend({}, handlers);

        if (preferredHandler && currentHandlers[preferredHandler]) {
            content = currentHandlers[preferredHandler](target, instance);
            handler = preferredHandler;
        } else {
            // Run inline and iframe handlers after all other handlers
            $.each(['inline', 'iframe'], function (i, name) {
                delete currentHandlers[name];

                currentHandlers[name] = handlers[name];
            });

            $.each(currentHandlers, function (name, currentHandler) {
                // Handler might be "removed" by setting callback to null
                if (!currentHandler) {
                    return true;
                }

                if (currentHandler.test && !currentHandler.test(target, instance)) {
                    return true;
                }

                content = currentHandler(target, instance);

                if (false !== content) {
                    handler = name;
                    return false;
                }
            });
        }

        return { handler: handler, content: content || '' };
    }

    function Lity(target, options, opener, activeElement) {
        var self = this;
        var result;
        var isReady = false;
        var isClosed = false;
        var element;
        var content;

        options = $.extend({}, _defaultOptions, options);

        element = $(options.template);

        // -- API --

        self.element = function () {
            return element;
        };

        self.opener = function () {
            return opener;
        };

        self.options = $.proxy(settings, self, options);
        self.handlers = $.proxy(settings, self, options.handlers);

        self.resize = function () {
            if (!isReady || isClosed) {
                return;
            }

            content.css('max-height', winHeight() + 'px').trigger('lity:resize', [self]);
        };

        self.close = function () {
            if (!isReady || isClosed) {
                return;
            }

            isClosed = true;

            removeInstance(self);

            var deferred = _deferred();

            // We return focus only if the current focus is inside this instance
            if (activeElement && (document.activeElement === element[0] || $.contains(element[0], document.activeElement))) {
                try {
                    activeElement.focus();
                } catch (e) {
                    // Ignore exceptions, eg. for SVG elements which can't be
                    // focused in IE11
                }
            }

            content.trigger('lity:close', [self]);

            element.removeClass('lity-opened').addClass('lity-closed');

            transitionEnd(content.add(element)).always(function () {
                content.trigger('lity:remove', [self]);
                element.remove();
                element = undefined;
                deferred.resolve();
            });

            return deferred.promise();
        };

        // -- Initialization --

        result = factory(target, self, options.handlers, options.handler);

        element.attr(_attrAriaHidden, 'false').addClass('lity-loading lity-opened lity-' + result.handler).appendTo('body').focus().on('click', '[data-lity-close]', function (e) {
            if ($(e.target).is('[data-lity-close]')) {
                self.close();
            }
        }).trigger('lity:open', [self]);

        registerInstance(self);

        $.when(result.content).always(ready);

        function ready(result) {
            content = $(result).css('max-height', winHeight() + 'px');

            element.find('.lity-loader').each(function () {
                var loader = $(this);

                transitionEnd(loader).always(function () {
                    loader.remove();
                });
            });

            element.removeClass('lity-loading').find('.lity-content').empty().append(content);

            isReady = true;

            content.trigger('lity:ready', [self]);
        }
    }

    function lity(target, options, opener) {
        if (!target.preventDefault) {
            opener = $(opener);
        } else {
            target.preventDefault();
            opener = $(this);
            target = opener.data('lity-target') || opener.attr('href') || opener.attr('src');
        }

        var instance = new Lity(target, $.extend({}, opener.data('lity-options') || opener.data('lity'), options), opener, document.activeElement);

        if (!target.preventDefault) {
            return instance;
        }
    }

    lity.version = '2.2.2';
    lity.options = $.proxy(settings, lity, _defaultOptions);
    lity.handlers = $.proxy(settings, lity, _defaultOptions.handlers);
    lity.current = currentInstance;

    $(document).on('click.lity', '[data-lity]', lity);

    return lity;
});
/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
    var e = -1,
        o = -1,
        i = function i(t) {
        return parseFloat(t) || 0;
    },
        a = function a(e) {
        var o = 1,
            a = t(e),
            n = null,
            r = [];return a.each(function () {
            var e = t(this),
                a = e.offset().top - i(e.css("margin-top")),
                s = r.length > 0 ? r[r.length - 1] : null;null === s ? r.push(e) : Math.floor(Math.abs(n - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), n = a;
        }), r;
    },
        n = function n(e) {
        var o = {
            byRow: !0, property: "height", target: null, remove: !1 };return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o);
    },
        r = t.fn.matchHeight = function (e) {
        var o = n(e);if (o.remove) {
            var i = this;return this.css(o.property, ""), t.each(r._groups, function (t, e) {
                e.elements = e.elements.not(i);
            }), this;
        }return this.length <= 1 && !o.target ? this : (r._groups.push({ elements: this, options: o }), r._apply(this, o), this);
    };r.version = "0.7.0", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._rows = a, r._parse = i, r._parseOptions = n, r._apply = function (e, o) {
        var s = n(o),
            h = t(e),
            l = [h],
            c = t(window).scrollTop(),
            p = t("html").outerHeight(!0),
            d = h.parents().filter(":hidden");return d.each(function () {
            var e = t(this);e.data("style-cache", e.attr("style"));
        }), d.css("display", "block"), s.byRow && !s.target && (h.each(function () {
            var e = t(this),
                o = e.css("display");"inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({ display: o, "padding-top": "0",
                "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px", overflow: "hidden" });
        }), l = a(h), h.each(function () {
            var e = t(this);e.attr("style", e.data("style-cache") || "");
        })), t.each(l, function (e, o) {
            var a = t(o),
                n = 0;if (s.target) n = s.target.outerHeight(!1);else {
                if (s.byRow && a.length <= 1) return void a.css(s.property, "");a.each(function () {
                    var e = t(this),
                        o = e.attr("style"),
                        i = e.css("display");"inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");var a = {
                        display: i };a[s.property] = "", e.css(a), e.outerHeight(!1) > n && (n = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "");
                });
            }a.each(function () {
                var e = t(this),
                    o = 0;s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += i(e.css("border-top-width")) + i(e.css("border-bottom-width")), o += i(e.css("padding-top")) + i(e.css("padding-bottom"))), e.css(s.property, n - o + "px"));
            });
        }), d.each(function () {
            var e = t(this);e.attr("style", e.data("style-cache") || null);
        }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)), this;
    }, r._applyDataApi = function () {
        var e = {};t("[data-match-height], [data-mh]").each(function () {
            var o = t(this),
                i = o.attr("data-mh") || o.attr("data-match-height");i in e ? e[i] = e[i].add(o) : e[i] = o;
        }), t.each(e, function () {
            this.matchHeight(!0);
        });
    };var s = function s(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
            r._apply(this.elements, this.options);
        }), r._afterUpdate && r._afterUpdate(e, r._groups);
    };r._update = function (i, a) {
        if (a && "resize" === a.type) {
            var n = t(window).width();if (n === e) return;e = n;
        }i ? -1 === o && (o = setTimeout(function () {
            s(a), o = -1;
        }, r._throttle)) : s(a);
    }, t(r._applyDataApi), t(window).bind("load", function (t) {
        r._update(!1, t);
    }), t(window).bind("resize orientationchange", function (t) {
        r._update(!0, t);
    });
});var mailbar = "\n<div class=\"mailbar-header\">\n  <span id=\"mailbar-activate\">\n    <span class=\"show__768up\">Sign up for email updates about the ConnectIN\u2122 Wheat Insight System.</span>\n    <span class=\"hide__768down\">Sign up for email updates</span>\n    <svg class=\"icon down\"><use xlink:href=\"#icon-down\"></use></svg>\n  </span>\n\n  </span>\n\n  <span id=\"mailbar-dismiss\" class=\"dismiss\">\n    <svg class=\"icon\">\n      <use xlink:href=\"#icon-circle-cross\"></use>\n    </svg>\n  </span>\n</div>\n<div id=\"mailbar-body\" class=\"mailbar-body\">\n    <!-- form  -->\n    <div id=\"signupform__ctn\" class=\"wFormContainer\">\n        <style type=\"text/css\"></style>\n        <div class=\"wForm\" id=\"tfa_0-WRPR\" dir=\"ltr\">\n            <div class=\"codesection\" id=\"code-tfa_0\"></div>\n            <h3 class=\"wFormTitle\" id=\"tfa_0-T\">ConnectIN Email Signup</h3>\n            <form method=\"post\" action=\"https://www.tfaforms.com/responses/processor\" class=\"hintsBelow labelsAbove ConnectIN-Email-Signup\" id=\"tfa_0\">\n                <div id=\"tfa_1-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_1-L\" for=\"tfa_1\" class=\"label preField reqMark\">First Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_1\" name=\"tfa_1\" value=\"\" placeholder=\"\" title=\"First Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_2-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_2-L\" for=\"tfa_2\" class=\"label preField reqMark\">Last Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_2\" name=\"tfa_2\" value=\"\" placeholder=\"\" title=\"Last Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_3-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_3-L\" for=\"tfa_3\" class=\"label preField reqMark\">Email</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_3\" name=\"tfa_3\" value=\"\" placeholder=\"\" title=\"Email\" class=\"validate-email required\">\n                    </div>\n                </div>\n                <div id=\"tfa_4-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_4-L\" for=\"tfa_4\" class=\"label preField reqMark\">I am a:</label>\n                    <br>\n                    <div class=\"inputWrapper\"><span id=\"tfa_4\" class=\"choices vertical required\"><span class=\"oneChoice\"><input type=\"checkbox\" value=\"tfa_6\" class=\"\" checked id=\"tfa_6\" name=\"tfa_6\"><label class=\"label postField\" id=\"tfa_6-L\" for=\"tfa_6\">Grower</label></span>\n                        <span\n                            class=\"oneChoice\">\n                            <input type=\"checkbox\" value=\"tfa_5\" class=\"\" id=\"tfa_5\" name=\"tfa_5\">\n                            <label class=\"label postField\" id=\"tfa_5-L\" for=\"tfa_5\">Seed Supplier</label>\n                            </span>\n                            </span>\n                    </div>\n                </div>\n                <div class=\"actions\" id=\"tfa_0-A\">\n                    <input type=\"submit\" class=\"primaryAction\" value=\"Submit\">\n                </div>\n                <div style=\"clear:both\"></div>\n                <input type=\"hidden\" value=\"433713\" name=\"tfa_dbFormId\" id=\"tfa_dbFormId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_dbResponseId\" id=\"tfa_dbResponseId\">\n                <input type=\"hidden\" value=\"a8623a69d1e6264f46562887e0ccd599\" name=\"tfa_dbControl\" id=\"tfa_dbControl\">\n                <input type=\"hidden\" value=\"7\" name=\"tfa_dbVersionId\" id=\"tfa_dbVersionId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_switchedoff\" id=\"tfa_switchedoff\">\n            </form>\n        </div>\n        </div>\n    </div>\n\n</div>\n";

if ($('body').hasClass('sign-up') === true || document.cookie.replace(/(?:(?:^|.*;\s*)subscribed\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {

    if ($('body').hasClass('contact-us') === true) {
        $('#mailbar').hide();
    } else {
        $('#mailbar').html(mailbar);
    }
}

// click title or down arrow
$('#mailbar-activate').on('click touchend', function () {
    var vh = void 0;
    var $body = $('#mailbar-body');
    var arrowDown = '<use xlink:href="#icon-down"></use>';
    var arrowUp = '<use xlink:href="#icon-up"></use>';

    if ($(window).width() < 768) {
        vh = $(window).height() - $('#mailbar').height();
    } else {
        vh = 400;
    }

    if ($body.height() === 0) {
        window.scroll(0, 0);
        $body.animate({ height: vh });
        $(this).children('svg').html(arrowUp);
    } else {
        $body.animate({ height: 0 });
        $(this).children('svg').html(arrowDown);
    }

    $('body').toggleClass('mailbar-active');
    $('html').toggleClass('mailbar-active');
});

// click dismiss
$('#mailbar-dismiss').on('click', dismissMailbar);

function dismissMailbar() {
    // if the menu is active and you dismiss, recalculate menu height
    if ($('body').hasClass('menu-active')) {
        var menu = $('#menu-header-menu-container');
        var addedHeight = menu.height() + $('#mailbar').height();
        $('#menu-header-menu-container').css('height', addedHeight + 'px');
    }

    $('#mailbar').animate({ height: '0' }, function () {
        $(this).remove();
        $('body').removeClass('mailbar-active');
    });

    document.cookie = 'subscribed=true';
}
$('#menu-activate').on('click', function () {
    var mailbar = 0;
    if ($('#mailbar-body').length) {
        mailbar = $('#mailbar').height();
    }

    var vh = $(window).height() - $('#menu').height() - mailbar;
    var menu = '<use xlink:href="#icon-menu"></use>';
    var cross = '<use xlink:href="#icon-cross"></use>';

    if ($('#menu-header-menu-container').height() === 0) {
        window.scroll(0, 0);
        $('#menu-header-menu-container').animate({ height: vh });
        $(this).children('svg').html(cross);
    } else {
        $('#menu-header-menu-container').animate({ height: 0 });
        $(this).children('svg').html(menu);
    }

    $('body').toggleClass('menu-active');
    $('html').toggleClass('menu-active');
});

// TODO: recalc menu height on resize if in mobile widths
$(window).resize();
$('.benefits__headline').on('click', function () {
    if ($(window).width() <= 768) {
        var $body = $(this).next();
        var arrowDown = '<use xlink:href="#icon-down"></use>';
        var arrowUp = '<use xlink:href="#icon-up"></use>';

        $body.slideToggle();

        if ($(this).hasClass('active')) {
            $(this).children('svg').html(arrowDown);
        } else {
            $(this).children('svg').html(arrowUp);
        }

        $(this).toggleClass('active');
    }
});
// window.alert = function () {}
//  Validate Contact Us Fields
if ($('body').hasClass('contact-us')) {
    $('.primaryAction').on('click', function (e) {
        e.preventDefault();

        function Valit() {
            var isValid = true;
            if ($('.validate-email').val() === "") {
                $('#contactEmail').css({
                    "border": "1px solid red"
                });
                isValid = false;
            } else {
                $('#contactEmail').css({
                    "border-color": "initial"
                });
            }
            if ($('#tfa_2').val() === "") {
                $('#contactMessage').css({
                    "border": "1px solid red"
                });
                isValid = false;
            } else {
                $('#contactMessage').css({
                    "border-color": "initial"
                });
            }
            return isValid;
        }
        var runit = Valit();
        var error = '<span style="position:static;" class="errorFormMessage">You must complete all fields above.</span>';
        if (runit == true) {
            $('#tfa_0').submit();
            $('.errorFormMessage').remove();
        } else {
            if ($('.errorFormMessage')[0]) {} else {
                $('#contactMessage').after(error);
            }
        }
    });
}
'use strict';

if ($('body').hasClass('wheat-profitability-calculator')) {
    (function () {
        var dataExtract = function dataExtract() {
            return {
                certGermination: $('#cert_seed_germination').val(),
                certPureSeed: $('#cert_seed_pure_seed').val(),
                certSeedCost: $('#cert_seed_cost_per_unit').val(),
                savedGermination: $('#saved_seed_germination').val(),
                savedPureSeed: $('#saved_seed_pure_seed').val(),
                savedSeedCost: $('#saved_seed_cost_per_unit').val(),
                season: $('input[name="crop_season"]:checked').val(),
                targetYield: $('#crop_target_yield').val(),
                wheatPrice: $('#crop_wheat_price').val(),
                targetPlantPopulation: $('#crop_target_planting_population').val(),
                flatSeedingRate: $('#crop_flat_seeding_rate').val(),
                acresPlanted: $('#crop_acres_planted').val(),
                yieldImpactOverseeding: $('#crop_percent_yield_impact_overseeding').val(),
                yieldImpactUnderseeding: $('#crop_percent_yield_impact_underseeding').val(),
                impactCompareGraph: $('#compareGraph').val(),
                maximizeRevenueGraph: $('#revenueGraph').val()
            };
        };

        $('.toggleModal').on('click', function () {
            $('#emailData').slideDown();
        });

        $('.close').on('click', function (e) {
            $('.thankyoumodal').removeClass('active');
        });

        $('#reset_form,#thankyou__startover').on('click', function () {
            window.location.reload();
            $(window).scrollTop(0);
        });

        $("#emailDataForm").bind("keypress", function (e) {
            if (e.keyCode == 13) {
                return false; // ignore default event
            }
        });

        $('#downloadPDF').click(function (e) {
            e.preventDefault();

            $('#pdfData').val(JSON.stringify(dataExtract()));
            $('#pdfForm').submit();
        });

        $('#mailPDF').click(function (e) {
            //Validate Email
            function is_email(email) {
                var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailReg.test(email);
            }

            var emailInput = is_email($('#recipientEmail').val());
            var emailError = '<small class="emailError">Please enter valid email.</small';

            if (emailInput == false) {
                $('#recipientEmail').css({ "border-color": "red" });
                if ($('.emailError')[0]) {} else {
                    $('#mailPDF').after(emailError);
                }
            } else {
                $('.emailError').remove();
                $('#recipientEmail').css({ "border-color": "inherit" });
                var queryStringAdd = '&recipients=' + encodeURIComponent($('#recipientEmail').val()) + '&sender=' + encodeURIComponent('no-reply@connectinsystem.com') + '&subject=' + encodeURIComponent('Your Wheat Profitability Calculator Results') + '&firstName=' + '&memberBusname=';

                $.ajax({
                    url: 'https://pdfgen.msvc.io/api/v1/EmailLink?templateName=WestBred_ProfitCalc' + queryStringAdd,
                    type: 'POST',
                    data: '{ "json" : ' + JSON.stringify(dataExtract()) + '}',
                    beforeSend: function beforeSend() {
                        var opts = {
                            lines: 13 // The number of lines to draw
                            , length: 28 // The length of each line
                            , width: 14 // The line thickness
                            , radius: 42 // The radius of the inner circle
                            , scale: 0.15 // Scales overall size of the spinner
                            , corners: 0.3 // Corner roundness (0..1)
                            , color: '#fff' // #rgb or #rrggbb or array of colors
                            , opacity: 0 // Opacity of the lines
                            , rotate: 0 // The rotation offset
                            , direction: 1 // 1: clockwise, -1: counterclockwise
                            , speed: 1 // Rounds per second
                            , trail: 85 // Afterglow percentage
                            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                            , zIndex: 2e9 // The z-index (defaults to 2000000000)
                            , className: 'spinner' // The CSS class to assign to the spinner
                            , top: '-20px' // Top position relative to parent
                            , left: '50%' // Left position relative to parent
                            , shadow: false // Whether to render a shadow
                            , hwaccel: false // Whether to use hardware acceleration
                            , position: 'relative' // Element positioning
                        };
                        var spinner = new Spinner(opts).spin();
                        $('#mailPDF').css('color', 'transparent');
                        $('#mailPDF').after(spinner.el);
                    }
                }).done(function () {
                    $('#emailData').hide();
                    $('#thankyoumodal').show().slideDown();
                    console.log("success");
                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            }
        });

        $(document).ready(function () {
            // Main app startup

            var Utility = function () {
                // Get the top position of an element in the document
                // From smoothScroll, https://github.com/alicelieutier/smoothScroll/blob/master/smoothscroll.js
                var getTop = function getTop(element) {
                    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
                    if (element.nodeName === 'HTML') return -window.pageYOffset;
                    return element.getBoundingClientRect().top + window.pageYOffset;
                };

                // Get the current screen viewport width
                var getViewportWidth = function getViewportWidth() {
                    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                };

                // Add digit separator characters to a numeric string
                var addDigitSeparators = function addDigitSeparators(num) {
                    var n = num.toString();
                    var p = n.indexOf('.');
                    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
                        return p < 0 || i < p ? $0 + ',' : $0;
                    });
                };

                // Return the character representation of Infinity
                var getInfinityChar = function getInfinityChar() {
                    return '∞';
                };

                // Format a number for display
                var formatNumber = function formatNumber(number, decimals, showPositive) {
                    var value = parseFloat(number);
                    if (!isNaN(value) && isFinite(value)) {
                        if (typeof decimals !== 'undefined' && decimals !== null) {
                            // Keep a set number of decimals, even if zeroes
                            return (value < 0 ? '- ' : showPositive === true ? '+ ' : '') + addDigitSeparators(Math.abs(value).toFixed(decimals));
                        } else {
                            // Just truncate to a fixed number of decimals, but don't preserve trailing zeroes
                            return (value < 0 ? '- ' : showPositive === true ? '+ ' : '') + addDigitSeparators(Math.abs(parseFloat(value.toFixed(2))));
                        }
                    } else {
                        return getInfinityChar();
                    }
                };

                // Format a number as curreny for display
                var formatCurrency = function formatCurrency(number, showDecimals, showPositive) {
                    var value = parseFloat(number);
                    if (!isNaN(value) && isFinite(value)) {
                        return (value < 0 ? '- ' : showPositive === true ? '+ ' : '') + '$' + addDigitSeparators(Math.abs(value).toFixed(showDecimals === true ? 2 : 0));
                    } else {
                        return getInfinityChar();
                    }
                };

                // Convert a formatted number back into an actual number
                var unformatNumber = function unformatNumber(value) {
                    return parseFloat(value.replace(/[^-\d\.e]/g, '').trim());
                };

                // Format a input field according to the "data-format" attribute
                var formatValue = function formatValue(element) {
                    if (!element || element && !element.value) {
                        return '';
                    }

                    if (typeof element.value !== 'string') {
                        return element.value;
                    }

                    var format = document.querySelector(element).dataset.format;

                    switch (format) {
                        case 'number':
                            return formatNumber(unformatNumber(element.value));

                        case 'signednumber':
                            return formatNumber(unformatNumber(element.value), null, true);

                        case 'integer':
                            return formatNumber(unformatNumber(element.value), 0);

                        case 'fixed2':
                            return formatNumber(unformatNumber(element.value), 2);

                        case 'currency':
                            return formatCurrency(unformatNumber(element.value));
                    }

                    return element.value;
                };

                return {
                    getTop: getTop,
                    getViewportWidth: getViewportWidth,
                    addDigitSeparators: addDigitSeparators,
                    getInfinityChar: getInfinityChar,
                    formatNumber: formatNumber,
                    formatCurrency: formatCurrency,
                    unformatNumber: unformatNumber,
                    formatValue: formatValue
                };
            }();

            var SeedCalcData = function () {
                var SEEDS_PER_LB_MIN = 9000;
                var SEEDS_PER_LB_MAX = 18000;
                var SEEDS_PER_LB_STEP = 500;

                var SeedCalcUserData = function SeedCalcUserData(certified) {
                    // Properties
                    this.season = 'winter'; // spring|winter

                    this.percentGermination = 0;
                    this.percentPureSeed = 0;
                    this.costPerCWT = 0;
                    this.targetYieldBushelsPerAcre = 0;
                    this.wheatPricePerBushel = 0;
                    this.targetPlantPopulation = 0;
                    this.flatRateLbPerAcre = 0;
                    this.acresPlanted = 0;

                    this.underSeedingYieldImpact = 0; // per 100,000 seeds per acre
                    this.overSeedingYieldImpact = 0; // per 100,000 seeds per acre

                    // Other
                    this.isCertified = !!certified;

                    // Methods
                    this.resetToDefaults = function () {
                        if (this.isCertified) {
                            setCertifiedSeedDefaults(this);
                        } else {
                            setSavedSeedDefaults(this);
                        }
                    };

                    // Initialize
                    this.resetToDefaults();
                };

                var OptimalSeedingRateImpactData = function OptimalSeedingRateImpactData(seedsPerLb) {
                    // Calculated
                    this.yieldAdvantageBushelsPerAcre = 0;
                    this.seedLbPerAcreRequired = 0;
                    this.seedsPerAcreRequired = 0;
                    this.costPerAcre = 0;
                    this.totalSeedCost = 0;
                    this.actualSeedingRate = 0;
                    this.seedingRateVsTarget = 0;
                    this.overUnderSeedingPotentialYieldImpact = 0;
                    this.flatRateCostPerAcre = 0;
                    this.costPerAcreDifference = 0;
                    this.totalSeedCost = 0;
                    this.totalSeedCostDifferential = 0;
                    this.potentialYieldBenefitBushelsPerAcre = 0;
                    this.optimalSeedingRateNetRevenue = 0;
                    this.netRevenueLbPerAcre = 0;
                    this.optimalSeedingRateNetRevenueBenefit = 0;

                    // Other
                    this.seedsPerLb = seedsPerLb;
                };

                var setCertifiedSeedDefaults = function setCertifiedSeedDefaults(userData) {
                    userData.percentGermination = 0.95;
                    userData.percentPureSeed = 0.985;
                    userData.costPerCWT = 18;
                    userData.targetYieldBushelsPerAcre = 80;
                    userData.wheatPricePerBushel = 3.5;
                    userData.targetPlantPopulation = 1000000;
                    userData.flatRateLbPerAcre = 100;
                    userData.acresPlanted = 2500;
                    userData.underSeedingYieldImpact = 0.5;
                    userData.overSeedingYieldImpact = 0.5;

                    userData.isCertified = true;
                };

                var setSavedSeedDefaults = function setSavedSeedDefaults(userData) {
                    userData.percentGermination = 0.93;
                    userData.percentPureSeed = 0.95;
                    userData.costPerCWT = 7.46;
                    userData.targetYieldBushelsPerAcre = 80;
                    userData.wheatPricePerBushel = 3.5;
                    userData.targetPlantPopulation = 1000000;
                    userData.flatRateLbPerAcre = 100;
                    userData.acresPlanted = 2500;
                    userData.underSeedingYieldImpact = 0.5;
                    userData.overSeedingYieldImpact = 0.5;

                    userData.isCertified = false;
                };

                var calculate = function calculate(data) {
                    data.seedLbPerAcreRequired = data.userData.targetPlantPopulation / (data.seedsPerLb * data.userData.percentPureSeed * data.userData.percentGermination);

                    data.seedsPerAcreRequired = data.seedLbPerAcreRequired * data.seedsPerLb;

                    data.costPerAcre = data.userData.costPerCWT * (data.seedLbPerAcreRequired / 100);

                    data.totalSeedCost = data.costPerAcre * data.userData.acresPlanted;

                    data.actualSeedingRate = data.userData.flatRateLbPerAcre * data.seedsPerLb * data.userData.percentPureSeed * data.userData.percentGermination;

                    data.seedingRateVsTarget = data.actualSeedingRate - data.userData.targetPlantPopulation;

                    data.overUnderSeedingPotentialYieldImpact = data.seedingRateVsTarget < 0 ? data.seedingRateVsTarget / 100000 * data.userData.underSeedingYieldImpact * data.userData.targetYieldBushelsPerAcre : data.seedingRateVsTarget / 100000 * data.userData.overSeedingYieldImpact * data.userData.targetYieldBushelsPerAcre * -1;

                    data.flatRateCostPerAcre = data.userData.costPerCWT * (data.userData.flatRateLbPerAcre / 100);

                    data.costPerAcreDifference = data.costPerAcre - data.flatRateCostPerAcre;

                    data.totalSeedCostFlatRate = data.flatRateCostPerAcre * data.userData.acresPlanted;

                    data.totalSeedCostFlatRateDifferential = data.costPerAcreDifference * data.userData.acresPlanted;

                    data.potentialYieldBenefitBushelsPerAcre = data.userData.isCertified ? data.userData.season.toLowerCase() === 'spring' ? 4.5 : 7.5 : 0;

                    data.optimalSeedingRateNetRevenue = (data.userData.targetYieldBushelsPerAcre + data.potentialYieldBenefitBushelsPerAcre) * data.userData.wheatPricePerBushel * data.userData.acresPlanted - data.totalSeedCost;

                    data.netRevenueLbPerAcre = (data.userData.targetYieldBushelsPerAcre + data.potentialYieldBenefitBushelsPerAcre + data.overUnderSeedingPotentialYieldImpact) * data.userData.wheatPricePerBushel * data.userData.acresPlanted - data.totalSeedCost;

                    data.optimalSeedingRateNetRevenueBenefit = data.optimalSeedingRateNetRevenue - data.netRevenueLbPerAcre;
                };

                var getDataSeries = function getDataSeries(userData) {
                    var series = [];

                    for (var seedsPerLb = SEEDS_PER_LB_MIN; seedsPerLb <= SEEDS_PER_LB_MAX; seedsPerLb += SEEDS_PER_LB_STEP) {
                        var dataItem = new OptimalSeedingRateImpactData(seedsPerLb);

                        // Merge in the userData properties
                        dataItem.userData = {};
                        for (var prop in userData) {
                            if (userData.hasOwnProperty(prop) && typeof userData[prop] !== 'function') {
                                dataItem.userData[prop] = userData[prop];
                            }
                        }

                        calculate(dataItem);
                        series.push(dataItem);
                    }

                    return series;
                };

                var getSeriesColumnData = function getSeriesColumnData(series, column) {
                    var data = [];
                    for (var i = 0; series[i]; i++) {
                        data.push(series[i][column]);
                    }

                    return data;
                };

                return {
                    SeedCalcUserData: SeedCalcUserData,
                    getDataSeries: getDataSeries,
                    getSeriesColumnData: getSeriesColumnData
                };
            }();

            var SeedCalc = function () {
                // CONSTANTS
                var CHART_MOBILE_SMALL_MAX_WIDTH = 400; // max width for small devices
                var CHART_MOBILE_SMALL_MAX_HEIGHT = 267; // max height for small devices
                var CHART_MOBILE_MAX_WIDTH = 600; // max width for mobile devices
                var CHART_MOBILE_MAX_HEIGHT = 300; // max height for mobile devices
                var CHART_MAX_WIDTH = 600;
                var CHART_MAX_HEIGHT = 300;
                var COLOR_DARK_RED = '#5293AB';
                var COLOR_LIGHT_RED = '#72b1c8';
                var COLOR_DARK_BLUE = '#373836';
                var COLOR_LIGHT_BLUE = '#646560';

                // PROPERTIES

                var certifiedSeedData = new SeedCalcData.SeedCalcUserData(true);
                var savedSeedData = new SeedCalcData.SeedCalcUserData();

                // METHODS

                var isMobileSmall = function isMobileSmall() {
                    return Utility.getViewportWidth() < CHART_MOBILE_SMALL_MAX_WIDTH;
                };

                var isMobile = function isMobile() {
                    return Utility.getViewportWidth() < CHART_MOBILE_MAX_WIDTH;
                };

                var calculate = function calculate() {
                    var form = document.getElementById('seed_calc_form');
                    form.classList.add('calculated');

                    // Get form field data
                    updateUserDataFromForm();

                    // Scroll to first graph (set a delay to allow the sections to become visible)
                    // setTimeout(function() {
                    // 	var headerBar = document.querySelector('.c-site-nav-wrapper-header'),
                    // 		headerBarFixed = window.getComputedStyle(headerBar).position === 'fixed',
                    // 		offset = headerBarFixed ? -headerBar.clientHeight : 0,
                    // 		top = Utility.getTop(document.querySelector('.calc-section')) + offset
                    // 	smoothScroll(top)
                    // }, 50)

                    // Re-render the graphs
                    var certifiedSeedDataSeries = SeedCalcData.getDataSeries(certifiedSeedData);
                    var savedSeedDataSeries = SeedCalcData.getDataSeries(savedSeedData);
                    updateGraphs(certifiedSeedDataSeries, savedSeedDataSeries);

                    // Set the Calculate button text
                    var btn = document.getElementById('calculate');
                    if (btn.textContent === 'Calculate') {
                        btn.textContent = 'Re-Calculate';
                    }
                };

                var updateUserDataFromForm = function updateUserDataFromForm() {
                    var form = document.getElementById('seed_calc_form');

                    certifiedSeedData.percentGermination = parseFloat(form['cert_seed_germination'].value) / 100;
                    certifiedSeedData.percentPureSeed = parseFloat(form['cert_seed_pure_seed'].value) / 100;
                    certifiedSeedData.costPerCWT = parseFloat(form['cert_seed_cost_per_unit'].value);

                    savedSeedData.percentGermination = parseFloat(form['saved_seed_germination'].value) / 100;
                    savedSeedData.percentPureSeed = parseFloat(form['saved_seed_pure_seed'].value) / 100;
                    savedSeedData.costPerCWT = parseFloat(form['saved_seed_cost_per_unit'].value);

                    // These fields have the same values in both datasets
                    var seasons = form['crop_season'];
                    for (var i = 0; i < seasons.length; i++) {
                        if (seasons[i].checked) certifiedSeedData.season = savedSeedData.season = seasons[i].value;
                        break;
                    }

                    // certifiedSeedData.season = savedSeedData.season = form['crop_season'].value
                    certifiedSeedData.targetYieldBushelsPerAcre = savedSeedData.targetYieldBushelsPerAcre = parseFloat(form['crop_target_yield'].value);
                    certifiedSeedData.wheatPricePerBushel = savedSeedData.wheatPricePerBushel = parseFloat(form['crop_wheat_price'].value);
                    certifiedSeedData.targetPlantPopulation = savedSeedData.targetPlantPopulation = parseFloat(form['crop_target_planting_population'].value);
                    certifiedSeedData.flatRateLbPerAcre = savedSeedData.flatRateLbPerAcre = parseFloat(form['crop_flat_seeding_rate'].value);
                    certifiedSeedData.acresPlanted = savedSeedData.acresPlanted = parseFloat(form['crop_acres_planted'].value);
                    certifiedSeedData.overSeedingYieldImpact = savedSeedData.overSeedingYieldImpact = parseFloat(form['crop_percent_yield_impact_overseeding'].value) / 100;
                    certifiedSeedData.underSeedingYieldImpact = savedSeedData.underSeedingYieldImpact = parseFloat(form['crop_percent_yield_impact_underseeding'].value) / 100;
                };

                var updateFormFromUserData = function updateFormFromUserData() {
                    var form = document.getElementById('seed_calc_form');

                    form['cert_seed_germination'].value = certifiedSeedData.percentGermination * 100;
                    form['cert_seed_pure_seed'].value = certifiedSeedData.percentPureSeed * 100;
                    form['cert_seed_cost_per_unit'].value = certifiedSeedData.costPerCWT;

                    form['saved_seed_germination'].value = savedSeedData.percentGermination * 100;
                    form['saved_seed_pure_seed'].value = savedSeedData.percentPureSeed * 100;
                    form['saved_seed_cost_per_unit'].value = savedSeedData.costPerCWT;

                    // These fields have the same values in both datasets, so just use the first one
                    // form['crop_season'].value = certifiedSeedData.season // broken in Safari
                    if (certifiedSeedData.season === 'winter') {
                        form['crop_season'][0].checked = true;
                    } else {
                        form['crop_season'][1].checked = true;
                    }
                    form['crop_target_yield'].value = certifiedSeedData.targetYieldBushelsPerAcre;
                    form['crop_wheat_price'].value = certifiedSeedData.wheatPricePerBushel;
                    form['crop_target_planting_population'].value = certifiedSeedData.targetPlantPopulation;
                    form['crop_flat_seeding_rate'].value = certifiedSeedData.flatRateLbPerAcre;
                    form['crop_acres_planted'].value = certifiedSeedData.acresPlanted;
                    form['crop_percent_yield_impact_overseeding'].value = certifiedSeedData.overSeedingYieldImpact;
                    form['crop_percent_yield_impact_underseeding'].value = certifiedSeedData.underSeedingYieldImpact;
                };

                var showResetLink = function showResetLink() {
                    // Make sure the reset link is visible
                    var resetLink = document.getElementById('reset_form');
                    resetLink.classList.remove('invisible');
                };

                var hideResetLink = function hideResetLink() {
                    // Make sure the reset link is visible
                    var resetLink = document.getElementById('reset_form');
                    resetLink.classList.add('invisible');
                };

                var resetInputs = function resetInputs() {
                    // Reset the data values to defaults
                    certifiedSeedData.resetToDefaults();
                    savedSeedData.resetToDefaults();

                    // Update form field values
                    updateFormFromUserData();

                    // Hide the reset link again
                    hideResetLink();
                };

                var getChartCanvasHtml = function getChartCanvasHtml(id) {
                    var viewportWidth = Utility.getViewportWidth();
                    var canvasSize = {
                        width: isMobile() ? viewportWidth : CHART_MAX_WIDTH,
                        height: isMobileSmall() ? CHART_MOBILE_SMALL_MAX_HEIGHT : isMobile() ? CHART_MOBILE_MAX_HEIGHT : CHART_MAX_HEIGHT
                    };

                    var html = '<canvas id="' + id + '" class="graph block-center" width="' + canvasSize.width + '" height="' + canvasSize.height + '"></canvas>';

                    return html;
                };

                var setChartDefaults = function setChartDefaults(animate) {
                    // Global chart config
                    Chart.defaults.global.defaultFontFamily = '"Gotham SSm A", "Gotham SSm B", Lucida Grande, "Lucida Grande", Lucida Sans Unicode, "Lucida Sans Unicode", Lucida Sans, "Lucida Sans", Geneva, Verdana, Helvetica, Arial, sans-serif';
                    Chart.defaults.global.defaultFontSize = 16;

                    Chart.defaults.global.maintainAspectRatio = false;

                    Chart.defaults.global.elements.line.borderWidth = 2;
                    Chart.defaults.global.elements.line.fill = false;

                    Chart.defaults.global.elements.point.radius = 5;
                    Chart.defaults.global.elements.point.borderWidth = 2;

                    Chart.defaults.global.animation.duration = animate === false ? 0 : 1000;

                    Chart.defaults.global.legend.display = false;

                    Chart.defaults.global.events = undefined; // ignore mouse/touch events

                    // special settings for smaller screen sizes
                    if (isMobileSmall()) {
                        Chart.defaults.global.defaultFontSize = 11;
                        Chart.defaults.global.elements.point.radius = 2;
                    } else if (isMobile()) {
                        Chart.defaults.global.defaultFontSize = 12;
                        Chart.defaults.global.elements.point.radius = 4;
                    }
                };

                var updateGraphCompareImpact = function updateGraphCompareImpact(certifiedSeedDataSeries, savedSeedDataSeries) {
                    // Set up graph canvas
                    var chartId = 'graph_compare_impact';
                    var section = document.getElementById(chartId + '_section');
                    var wrapper = document.getElementById(chartId + '_wrapper');
                    var legend = document.getElementById(chartId + '_legend');
                    var canvas = getChartCanvasHtml(chartId);
                    var mobile = isMobile();
                    var mobileSmall = isMobileSmall();

                    // Remove the 'hidden' CSS class
                    section.className = section.className.replace(/\s*\bhidden\b/g, '');

                    // destroy and recreate the canvas
                    if (wrapper.hasChildNodes()) wrapper.removeChild(wrapper.childNodes[0]);
                    wrapper.innerHTML = canvas;

                    // Get the x-axis labels
                    var xLabels = [];
                    for (var i = 0; certifiedSeedDataSeries[i]; i++) {
                        xLabels.push(certifiedSeedDataSeries[i].seedsPerLb.toString());
                    }

                    // Configure and render the chart
                    var ctx = document.getElementById(chartId);
                    var chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: xLabels,
                            datasets: [{
                                label: 'Certified Seed Net Revenue by Optimal Seeding Rate ($)',
                                data: SeedCalcData.getSeriesColumnData(certifiedSeedDataSeries, 'optimalSeedingRateNetRevenue'),
                                backgroundColor: COLOR_DARK_RED,
                                borderColor: COLOR_DARK_RED,
                                pointBackgroundColor: COLOR_DARK_RED,
                                pointBorderColor: COLOR_DARK_RED,
                                pointStyle: 'circle',
                                legendIconImage: '/wp-content/themes/connectIN/assets/images/icon__circle-line-blue-solid.png' // non-api property
                            }, {
                                label: 'Certified Seed Net Revenue by Lbs/A ($)',
                                data: SeedCalcData.getSeriesColumnData(certifiedSeedDataSeries, 'netRevenueLbPerAcre'),
                                backgroundColor: COLOR_LIGHT_RED,
                                borderColor: COLOR_LIGHT_RED,
                                pointBackgroundColor: '#ffffff',
                                pointBorderColor: COLOR_LIGHT_RED,
                                pointStyle: 'circle',
                                legendIconImage: '/wp-content/themes/connectIN/assets/images/icon__circle-line-blue.png' // non-api property
                            }, {
                                label: 'Saved Seed Net Revenue by Optimal Seeding Rate ($)',
                                data: SeedCalcData.getSeriesColumnData(savedSeedDataSeries, 'optimalSeedingRateNetRevenue'),
                                backgroundColor: COLOR_DARK_BLUE,
                                borderColor: COLOR_DARK_BLUE,
                                pointBackgroundColor: COLOR_DARK_BLUE,
                                pointBorderColor: COLOR_DARK_BLUE,
                                pointRadius: Chart.defaults.global.elements.point.radius + 1,
                                pointStyle: 'rect',
                                legendIconImage: '/wp-content/themes/connectIN/assets/images/icon__square-line-dark-solid.png' // non-api property
                            }, {
                                label: 'Saved Seed Net Revenue by Lbs/A ($)',
                                data: SeedCalcData.getSeriesColumnData(savedSeedDataSeries, 'netRevenueLbPerAcre'),
                                backgroundColor: COLOR_LIGHT_BLUE,
                                borderColor: COLOR_LIGHT_BLUE,
                                pointBackgroundColor: '#ffffff',
                                pointBorderColor: COLOR_LIGHT_BLUE,
                                pointRadius: Chart.defaults.global.elements.point.radius + 1,
                                pointStyle: 'rect',
                                legendIconImage: '/wp-content/themes/connectIN/assets/images/icon__square-line-dark.png' // non-api property
                            }]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    position: 'bottom',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Seeds/Lb',
                                        fontStyle: 'bold'
                                    },
                                    ticks: {
                                        callback: function callback(value, index, values) {
                                            return index % 2 === 0 ? Utility.addDigitSeparators(value) : '';
                                        }
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Net Revenue ($)',
                                        fontStyle: 'bold'
                                    },
                                    ticks: {
                                        callback: function callback(value, index, values) {
                                            return Utility.formatCurrency(value, false);
                                        }
                                    }
                                }]
                            }
                        }
                    });

                    setTimeout(function () {
                        $('#compareGraph').val(chart.toBase64Image());
                    }, 1500);

                    // Update legend
                    legend.classList.add('calc-chart-type-' + chart.config.type);

                    var legendHtml = '<div>';
                    for (var i = 0, item; typeof (item = chart.config.data.datasets[i]) !== 'undefined'; i++) {
                        legendHtml += '<div><img class="calc-legend-icon" src="' + item.legendIconImage + '" alt=""> <span class="calc-legend-label">' + item.label + '</span></div>';
                    }
                    legendHtml += '</div>';
                    legend.innerHTML = legendHtml;
                };

                var updateGraphMaximizeRevenue = function updateGraphMaximizeRevenue(certifiedSeedDataSeries, savedSeedDataSeries) {
                    // Reset some global chart defaults
                    Chart.defaults.global.maintainAspectRatio = true;

                    // Set up graph canvas
                    var chartId = 'graph_maximize_revenue';
                    var section = document.getElementById(chartId + '_section');
                    var wrapper = document.getElementById(chartId + '_wrapper');
                    var legend = document.getElementById(chartId + '_legend');
                    var canvas = getChartCanvasHtml(chartId);

                    // Remove the 'hidden' CSS class
                    section.className = section.className.replace(/\s*\bhidden\b/g, '');

                    // destroy and recreate the canvas
                    if (wrapper.hasChildNodes()) wrapper.removeChild(wrapper.childNodes[0]);
                    wrapper.innerHTML = canvas;

                    // Configure and render the chart
                    var ctx = document.getElementById(chartId);
                    var chart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: [],
                            datasets: [{
                                label: 'Certified Seed Net Revenue by Optimal Seeding Rate ($)',
                                data: [certifiedSeedDataSeries[certifiedSeedDataSeries.length - 1].optimalSeedingRateNetRevenue],
                                backgroundColor: COLOR_LIGHT_RED,
                                borderColor: COLOR_LIGHT_RED
                            }, {
                                label: 'Saved Seed Net Revenue by Lbs/A ($)',
                                data: [savedSeedDataSeries[savedSeedDataSeries.length - 1].netRevenueLbPerAcre],
                                backgroundColor: COLOR_LIGHT_BLUE,
                                borderColor: COLOR_LIGHT_BLUE
                            }]
                        },

                        options: {
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Net Revenue ($)',
                                        fontStyle: 'bold'
                                    },
                                    ticks: {
                                        callback: function callback(value, index, values) {
                                            return Utility.formatCurrency(value, false);
                                        }
                                    }
                                }]
                            }
                        }
                    });

                    setTimeout(function () {
                        $('#revenueGraph').val(chart.toBase64Image());
                    }, 1500);

                    // Update legend
                    legend.classList.add('calc-chart-type-' + chart.config.type);

                    var legendHtml = '<div>';
                    for (var i = 0, item; typeof (item = chart.config.data.datasets[i]) !== 'undefined'; i++) {
                        legendHtml += '<div><span class="calc-legend-icon" style="background-color:' + item.backgroundColor + '"></span> <span class="calc-legend-label">' + item.label + '</span></div>';
                    }
                    legendHtml += '</div>';
                    legend.innerHTML = legendHtml;
                };

                var updateGraphs = function updateGraphs(certifiedSeedDataSeries, savedSeedDataSeries, animate) {
                    setChartDefaults(animate);
                    updateGraphCompareImpact(certifiedSeedDataSeries, savedSeedDataSeries);
                    updateGraphMaximizeRevenue(certifiedSeedDataSeries, savedSeedDataSeries);
                };

                // EVENTS

                var onCalculate = function onCalculate(event) {
                    event.preventDefault();

                    function validateForm() {
                        var isValid = true;
                        $('.calc-field').each(function () {
                            if ($(this).val() === '') {
                                $(this).css({ "border-color": "red" });
                                isValid = false;
                                console.log(isValid);
                            } else {
                                $(this).css({ "border-color": "#66665c" });
                            }
                        });
                        return isValid;
                    }

                    $(document).ready(function () {
                        var go = validateForm();
                        var errorFormMessage = '<span class="errorFormMessage">You must complete all fields above to calculate.</span>';
                        if (go == true) {
                            console.log('it is valid');
                            $('.errorFormMessage').remove();
                            $('#graph_compare_impact_section , #graph_maximize_revenue_section').slideDown();
                            $('.actionData').show().slideDown();
                            calculate();
                        } else if (go == false) {
                            console.log('it is not valid');
                            if ($('.errorFormMessage')[0]) {} else {
                                $('#yieldImpactForUnderseeding').after(errorFormMessage);
                            }
                        }
                    });
                };

                var onFormInputChange = function onFormInputChange(event) {
                    event.preventDefault();

                    // Show the 'reset form' link when deviating from the defaults
                    showResetLink();
                };

                var onResetForm = function onResetForm(event) {
                    event.preventDefault();

                    // Reset the data and form values
                    resetInputs();
                };

                var onEmailData = function onEmailData(event) {
                    event.preventDefault();

                    // NOTE: The generated PDF will have the data that is currently represented in the charts. If the user has changed form field values, but not clicked "Calculate", then these are not reflected in the output.

                    // TODO: Show email fields for user input. Submitting this form will execute the emailData() method.
                    console.info('Email PDF');
                };

                var onWindowResize = function onWindowResize(event) {
                    // Only redraw the graphs if they have been calculated at least once already
                    var form = document.getElementById('seed_calc_form');
                    if (form.classList.contains('calculated')) {
                        // Re-render the graphs
                        var certifiedSeedDataSeries = SeedCalcData.getDataSeries(certifiedSeedData);
                        var savedSeedDataSeries = SeedCalcData.getDataSeries(savedSeedData);
                        updateGraphs(certifiedSeedDataSeries, savedSeedDataSeries, false);
                    }
                };

                var onDownloadPdf = function onDownloadPdf(event) {
                    event.preventDefault();

                    // NOTE: The generated PDF will have the data that is currently represented in the charts. If the user has changed form field values, but not clicked "Calculate", then these are not reflected in the output.

                    // TODO: Triggering this handler will execute the downloadPdf() method
                    console.info('Download PDF');
                };

                var wireEvents = function wireEvents() {
                    var formElements = $('#seed_calc_form input, #seed_calc_form textarea, #seed_calc_form select');
                    for (var i = 0; i < formElements.length; i++) {
                        var el = formElements[i];
                        el.addEventListener('change', onFormInputChange);
                    }

                    var calculateBtn = document.getElementById('calculate');
                    calculateBtn.addEventListener('click', onCalculate);

                    // Add trigger to reset to the default values
                    var resetFormLink = document.getElementById('reset_form');
                    resetFormLink.addEventListener('click', onResetForm);

                    // Add trigger to email the results as a PDF
                    //var emailDataBtn = document.getElementById('email_data')
                    //emailDataBtn.addEventListener('click', onEmailData)

                    // Add trigger to download the results as a PDF
                    //var downloadPdf = document.getElementById('download_pdf')
                    //downloadPdf.addEventListener('click', onDownloadPdf)

                    window.addEventListener('resize', onWindowResize);
                };

                var init = function init() {
                    // Initialize user form inputs with default data
                    updateFormFromUserData();

                    // Wire up interactive events
                    wireEvents();
                };

                return { init: init };
            }();

            SeedCalc.init();
        });
    })();
}
if ($('body').hasClass('find-seed-supplier')) {
    (function () {
        var changeState = function changeState() {
            if ($('#results').hasClass('hidden')) {
                $('#results').removeClass('hidden');
            }
            var selectedstate = $('#stateselect option:selected').val();
            $('.supplier, .rep').hide();
            $('.suppliers__ctn__anchor').hide();
            $('.' + selectedstate).show();

            if (!$('.' + selectedstate)[0]) {
                if ($('#stateselect option:selected').text() === 'Select a state') {
                    $('#results').hide();
                } else {
                    $('#results').show();
                    $('.failure__nosuppliers').show();
                    var stateChosen = $('#stateselect option:selected').text();
                    $('.failureSpan').text(stateChosen || "your state");
                    $('.rep__ctn').hide();
                }
            } else {
                $('.failure__nosuppliers').hide();
                $('.rep__ctn').show();
                $('.suppliers__ctn__anchor').show();
            }
        };

        // navigator.geolocation.getCurrentPosition(success, error)

        var success = function success(position) {
            console.log(position.coords.latitude);
            var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k';

            $.getJSON(GEOCODING).done(function (location) {
                var thestate = location.results[6].address_components[0].short_name;
                $('#stateselect').val(thestate);
                changeState();
            });
        };

        var error = function error(err) {
            console.log(err);
        };

        $('#stateselect').change(function () {
            changeState();
        });
    })();
}
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var Slick = window.Slick || {};

    Slick = function () {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function customPaging(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
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
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);
        }

        return Slick;
    }();

    Slick.prototype.activateADA = function () {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

        var _ = this;

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= _.slideCount) {
            return false;
        }

        _.unload();

        if (typeof index === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function (targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -_.currentLeft;
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function step(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' + now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function complete() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });
            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function () {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };

    Slick.prototype.getNavTarget = function () {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;
    };

    Slick.prototype.asNavFor = function (index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && (typeof asNavFor === "undefined" ? "undefined" : _typeof(asNavFor)) === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };

    Slick.prototype.applyTransition = function (slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.autoPlay = function () {

        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    Slick.prototype.autoPlayClear = function () {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    Slick.prototype.autoPlayIterator = function () {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {

            if (_.options.infinite === false) {

                if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                    _.direction = 0;
                } else if (_.direction === 0) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }
                }
            }

            _.slideHandler(slideTo);
        }
    };

    Slick.prototype.buildArrows = function () {

        var _ = this;

        if (_.options.arrows === true) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                }
            } else {

                _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
                    'aria-disabled': 'true',
                    'tabindex': '-1'
                });
            }
        }
    };

    Slick.prototype.buildDots = function () {

        var _ = this,
            i,
            dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');
        }
    };

    Slick.prototype.buildOut = function () {

        var _ = this;

        _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };

    Slick.prototype.buildRows = function () {

        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if (_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({
                'width': 100 / _.options.slidesPerRow + '%',
                'display': 'inline-block'
            });
        }
    };

    Slick.prototype.checkResponsive = function (initial, forceUpdate) {

        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Slick.prototype.changeSlide = function (event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset,
            slideOffset,
            unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }
    };

    Slick.prototype.checkNavigable = function (index) {

        var _ = this,
            navigables,
            prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function () {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpSlideEvents = function () {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    };

    Slick.prototype.cleanUpRows = function () {

        var _ = this,
            originalSlides;

        if (_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };

    Slick.prototype.clickHandler = function (event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    Slick.prototype.destroy = function (refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {

            _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {

            _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {

            _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
                $(this).attr('style', $(this).data('originalStyling'));
            });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };

    Slick.prototype.disableTransition = function (slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function () {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }
        }
    };

    Slick.prototype.fadeSlideOut = function (slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {

        var _ = this;

        _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*:not(.slick-arrow)', function (event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function () {

                if (_.options.pauseOnFocus) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }
            }, 0);
        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

        var _ = this;
        return _.currentSlide;
    };

    Slick.prototype.getDotCount = function () {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    };

    Slick.prototype.getLeft = function (slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                verticalOffset = verticalHeight * _.options.slidesToShow * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                    } else {
                        _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                        verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

        var _ = this;

        return _.options[option];
    };

    Slick.prototype.getNavigableIndexes = function () {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;
    };

    Slick.prototype.getSlick = function () {

        return this;
    };

    Slick.prototype.getSlideCount = function () {

        var _ = this,
            slidesTraversed,
            swipedSlide,
            centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };

    Slick.prototype.init = function (creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {

            _.paused = false;
            _.autoPlay();
        }
    };

    Slick.prototype.initADA = function () {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            }).first().attr('aria-selected', 'true').end().find('button').attr('role', 'button').end().closest('div').attr('role', 'toolbar');
        }
        _.activateADA();
    };

    Slick.prototype.initArrowEvents = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off('click.slick').on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.off('click.slick').on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }
    };

    Slick.prototype.initDotEvents = function () {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true) {

            $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initSlideEvents = function () {

        var _ = this;

        if (_.options.pauseOnHover) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initializeEvents = function () {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.initUI = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();
        }
    };

    Slick.prototype.keyHandler = function (event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };

    Slick.prototype.lazyLoad = function () {

        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function () {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {

                    image.animate({ opacity: 0 }, 100, function () {
                        image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                            image.removeAttr('data-lazy').removeClass('slick-loading');
                        });
                        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                    });
                };

                imageToLoad.onerror = function () {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                };

                imageToLoad.src = imageSource;
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };

    Slick.prototype.loadSlider = function () {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    Slick.prototype.next = Slick.prototype.slickNext = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    Slick.prototype.orientationChange = function () {

        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    Slick.prototype.pause = Slick.prototype.slickPause = function () {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

    Slick.prototype.play = Slick.prototype.slickPlay = function () {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };

    Slick.prototype.postSlide = function (index) {

        var _ = this;

        if (!_.unslicked) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }
        }
    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    Slick.prototype.preventDefault = function (event) {

        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function (tryCount) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageToLoad;

        if ($imgsToLoad.length) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {

                image.attr('src', imageSource).removeAttr('data-lazy').removeClass('slick-loading');

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {

                if (tryCount < 3) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();
                }
            };

            imageToLoad.src = imageSource;
        } else {

            _.$slider.trigger('allImagesLoaded', [_]);
        }
    };

    Slick.prototype.refresh = function (initializing) {

        var _ = this,
            currentSlide,
            lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if (!initializing) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };

    Slick.prototype.registerBreakpoints = function () {

        var _ = this,
            breakpoint,
            currentBreakpoint,
            l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {

                l = _.breakpoints.length - 1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            _.breakpoints.sort(function (a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    };

    Slick.prototype.reinit = function () {

        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);
    };

    Slick.prototype.resize = function () {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition();
                }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

        var _ = this;

        if (typeof index === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.setCSS = function (position) {

        var _ = this,
            positionProps = {},
            x,
            y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };

    Slick.prototype.setDimensions = function () {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: '0px ' + _.options.centerPadding
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: _.options.centerPadding + ' 0px'
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    };

    Slick.prototype.setFade = function () {

        var _ = this,
            targetLeft;

        _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };

    Slick.prototype.setHeight = function () {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this,
            l,
            item,
            option,
            value,
            refresh = false,
            type;

        if ($.type(arguments[0]) === 'object') {

            option = arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ($.type(arguments[0]) === 'string') {

            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                type = 'responsive';
            } else if (typeof arguments[1] !== 'undefined') {

                type = 'single';
            }
        }

        if (type === 'single') {

            _.options[option] = value;
        } else if (type === 'multiple') {

            $.each(option, function (opt, val) {

                _.options[opt] = val;
            });
        } else if (type === 'responsive') {

            for (item in value) {

                if ($.type(_.options.responsive) !== 'array') {

                    _.options.responsive = [value[item]];
                } else {

                    l = _.options.responsive.length - 1;

                    // loop through the responsive object and splice out duplicates.
                    while (l >= 0) {

                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

                            _.options.responsive.splice(l, 1);
                        }

                        l--;
                    }

                    _.options.responsive.push(value[item]);
                }
            }
        }

        if (refresh) {

            _.unload();
            _.reinit();
        }
    };

    Slick.prototype.setPosition = function () {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);
    };

    Slick.prototype.setProps = function () {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
    };

    Slick.prototype.setSlideClasses = function (index) {

        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

        allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

        _.$slides.eq(index).addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {

                    _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
                }

                if (index === 0) {

                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                } else if (index === _.slideCount - 1) {

                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                }
            }

            _.$slides.eq(index).addClass('slick-center');
        } else {

            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides.addClass('slick-active').attr('aria-hidden', 'false');
            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

                    allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function () {

        var _ = this,
            i,
            slideIndex,
            infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                    $(this).attr('id', '');
                });
            }
        }
    };

    Slick.prototype.interrupt = function (toggle) {

        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {

        var _ = this;

        var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;
        }

        _.slideHandler(index);
    };

    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

        var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    Slick.prototype.startLoad = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();
        }

        _.$slider.addClass('slick-loading');
    };

    Slick.prototype.swipeDirection = function () {

        var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? 'right' : 'left';
        }
        if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    };

    Slick.prototype.swipeEnd = function (event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            direction = _.swipeDirection();

            switch (direction) {

                case 'left':
                case 'down':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:

            }

            if (direction != 'vertical') {

                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);
            }
        } else {

            if (_.touchObject.startX !== _.touchObject.curX) {

                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

    Slick.prototype.swipeHandler = function (event) {

        var _ = this;

        if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }
    };

    Slick.prototype.swipeMove = function (event) {

        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);
    };

    Slick.prototype.swipeStart = function (event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;
    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.unload = function () {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
    };

    Slick.prototype.unslick = function (fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };

    Slick.prototype.updateArrows = function () {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    };

    Slick.prototype.updateDots = function () {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots.find('li').removeClass('slick-active').attr('aria-hidden', 'true');

            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active').attr('aria-hidden', 'false');
        }
    };

    Slick.prototype.visibility = function () {

        var _ = this;

        if (_.options.autoplay) {

            if (document[_.hidden]) {

                _.interrupted = true;
            } else {

                _.interrupted = false;
            }
        }
    };

    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
});
$(document).ready(function () {
    $('.action .row .nopad').matchHeight();
});

//[–––
//			↓ MOBILE SLICK VIDEO SLIDER ↓
//––––––––––––––––––––––––––––––––––––––//]
$('#slick-reporting, #slick-training').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [{
        breakpoint: 768,
        settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    }, {
        breakpoint: 400,
        settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    }]
});

//[–––
//			↓ SEND PDFS ↓
//––––––––––––––––––––––––––––––––––––––//]
$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();

        var theForm = $(this);

        var emailField = $(this['email-address']).val();
        if ($('.pdf-email-error')[0]) {
            $('pdf-email-error').hide();
        }
        if (!emailField) {
            $('.pdf-email-error').show();
        }

        if (emailField) {

            $('.pdf-email-error').hide();

            var serialData = $(this).serialize();

            $.ajax({
                url: '/email.php',
                type: 'POST',
                data: serialData
            }).done(function () {
                console.log("success");
                $(theForm).hide();
                $(theForm).next().show();
            });
        }
    });
});

//[–––
//			↓ SWAP VIDEOS  ↓
//––––––––––––––––––––––––––––––––––––––//]
$('.list .item').on('click', function () {
    if ($(this).parents('.list').children('.item').hasClass('active')) {
        $(this).parents('.list').children('.item').removeClass('active');
    }
    $(this).addClass('active');
    var chosenVideoURL = $(this).attr('data-video');
    $(this).parents('.col-xs-12').next().find('iframe').attr('src', chosenVideoURL + '?rel=0&amp;showinfo=0');
});

//[–––
//			↓ SHOW AND HIDE EMAIL FORMS ↓
//––––––––––––––––––––––––––––––––––––––//]
$('.email-button').on('click', function () {

    if ($(this).parents('.row').children('.email-field').hasClass('email-active')) {
        $(this).parent().parent().next().removeClass('email-active').slideUp();
        return;
    } else {
        $('.email-active').slideUp();
        $('.email-active').removeClass('email-active');
        $(this).parent().parent().next().addClass('email-active').slideDown();
    }
});

//# sourceMappingURL=data:application/json;base64,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dGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG4vKiEgTGl0eSAtIHYyLjIuMiAtIDIwMTYtMTItMTRcbiogaHR0cDovL3NvcmdhbGxhLmNvbS9saXR5L1xuKiBDb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBKYW4gU29yZ2FsbGE7IExpY2Vuc2VkIE1JVCAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uKCQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KHdpbmRvdywgJCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkod2luZG93LCByZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxpdHkgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKHdpbmRvdywgJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBfd2luID0gJCh3aW5kb3cpO1xuICAgIHZhciBfZGVmZXJyZWQgPSAkLkRlZmVycmVkO1xuICAgIHZhciBfaHRtbCA9ICQoJ2h0bWwnKTtcbiAgICB2YXIgX2luc3RhbmNlcyA9IFtdO1xuXG4gICAgdmFyIF9hdHRyQXJpYUhpZGRlbiA9ICdhcmlhLWhpZGRlbic7XG4gICAgdmFyIF9kYXRhQXJpYUhpZGRlbiA9ICdsaXR5LScgKyBfYXR0ckFyaWFIaWRkZW47XG5cbiAgICB2YXIgX2ZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPSAnYVtocmVmXSxhcmVhW2hyZWZdLGlucHV0Om5vdChbZGlzYWJsZWRdKSxzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxidXR0b246bm90KFtkaXNhYmxlZF0pLGlmcmFtZSxvYmplY3QsZW1iZWQsW2NvbnRlbnRlZGl0YWJsZV0sW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJztcblxuICAgIHZhciBfZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIGhhbmRsZXI6IG51bGwsXG4gICAgICAgIGhhbmRsZXJzOiB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2VIYW5kbGVyLFxuICAgICAgICAgICAgaW5saW5lOiBpbmxpbmVIYW5kbGVyLFxuICAgICAgICAgICAgeW91dHViZTogeW91dHViZUhhbmRsZXIsXG4gICAgICAgICAgICB2aW1lbzogdmltZW9IYW5kbGVyLFxuICAgICAgICAgICAgZ29vZ2xlbWFwczogZ29vZ2xlbWFwc0hhbmRsZXIsXG4gICAgICAgICAgICBmYWNlYm9va3ZpZGVvOiBmYWNlYm9va3ZpZGVvSGFuZGxlcixcbiAgICAgICAgICAgIGlmcmFtZTogaWZyYW1lSGFuZGxlclxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJsaXR5XCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWw9XCJEaWFsb2cgV2luZG93IChQcmVzcyBlc2NhcGUgdG8gY2xvc2UpXCIgdGFiaW5kZXg9XCItMVwiPjxkaXYgY2xhc3M9XCJsaXR5LXdyYXBcIiBkYXRhLWxpdHktY2xvc2Ugcm9sZT1cImRvY3VtZW50XCI+PGRpdiBjbGFzcz1cImxpdHktbG9hZGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+TG9hZGluZy4uLjwvZGl2PjxkaXYgY2xhc3M9XCJsaXR5LWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJsaXR5LWNvbnRlbnRcIj48L2Rpdj48YnV0dG9uIGNsYXNzPVwibGl0eS1jbG9zZVwiIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiQ2xvc2UgKFByZXNzIGVzY2FwZSB0byBjbG9zZSlcIiBkYXRhLWxpdHktY2xvc2U+JnRpbWVzOzwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICB9O1xuXG4gICAgdmFyIF9pbWFnZVJlZ2V4cCA9IC8oXmRhdGE6aW1hZ2VcXC8pfChcXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicHxibXB8aWNvfHRpZmY/KShcXD9cXFMqKT8kKS9pO1xuICAgIHZhciBfeW91dHViZVJlZ2V4ID0gLyh5b3V0dWJlKC1ub2Nvb2tpZSk/XFwuY29tfHlvdXR1XFwuYmUpXFwvKHdhdGNoXFw/dj18dlxcL3x1XFwvfGVtYmVkXFwvPyk/KFtcXHctXXsxMX0pKC4qKT8vaTtcbiAgICB2YXIgX3ZpbWVvUmVnZXggPSAgLyh2aW1lbyhwcm8pPy5jb20pXFwvKD86W15cXGRdKyk/KFxcZCspXFw/PyguKik/JC87XG4gICAgdmFyIF9nb29nbGVtYXBzUmVnZXggPSAvKChtYXBzfHd3dylcXC4pP2dvb2dsZVxcLihbXlxcL1xcP10rKVxcLz8oKG1hcHNcXC8/KT9cXD8pKC4qKS9pO1xuICAgIHZhciBfZmFjZWJvb2t2aWRlb1JlZ2V4ID0gLyhmYWNlYm9va1xcLmNvbSlcXC8oW2EtejAtOV8tXSopXFwvdmlkZW9zXFwvKFswLTldKikoLiopPyQvaTtcblxuICAgIHZhciBfdHJhbnNpdGlvbkVuZEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgT1RyYW5zaXRpb246ICdvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNFbmRFdmVudE5hbWVzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKCk7XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gX2RlZmVycmVkKCk7XG5cbiAgICAgICAgaWYgKCFfdHJhbnNpdGlvbkVuZEV2ZW50IHx8ICFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5vbmUoX3RyYW5zaXRpb25FbmRFdmVudCwgZGVmZXJyZWQucmVzb2x2ZSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGRlZmVycmVkLnJlc29sdmUsIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHRpbmdzKGN1cnJTZXR0aW5ncywga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBjdXJyU2V0dGluZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgY3VyclNldHRpbmdzW2tleV0gPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IGN1cnJTZXR0aW5nc1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyU2V0dGluZ3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJC5leHRlbmQoY3VyclNldHRpbmdzLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VRdWVyeVBhcmFtcyhwYXJhbXMpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZGVjb2RlVVJJKHBhcmFtcy5zcGxpdCgnIycpWzBdKS5zcGxpdCgnJicpO1xuICAgICAgICB2YXIgb2JqID0ge30sIHA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYWlycy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghcGFpcnNbaV0pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICBvYmpbcFswXV0gPSBwWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRRdWVyeVBhcmFtcyh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKCc/JykgPiAtMSA/ICcmJyA6ICc/JykgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNmZXJIYXNoKG9yaWdpbmFsVXJsLCBuZXdVcmwpIHtcbiAgICAgICAgdmFyIHBvcyA9IG9yaWdpbmFsVXJsLmluZGV4T2YoJyMnKTtcblxuICAgICAgICBpZiAoLTEgPT09IHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld1VybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFVybCA9IG9yaWdpbmFsVXJsLnN1YnN0cihwb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld1VybCArIG9yaWdpbmFsVXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yKG1zZykge1xuICAgICAgICByZXR1cm4gJCgnPHNwYW4gY2xhc3M9XCJsaXR5LWVycm9yXCIvPicpLmFwcGVuZChtc2cpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGltYWdlSGFuZGxlcih0YXJnZXQsIGluc3RhbmNlKSB7XG4gICAgICAgIHZhciBkZXNjID0gKGluc3RhbmNlLm9wZW5lcigpICYmIGluc3RhbmNlLm9wZW5lcigpLmRhdGEoJ2xpdHktZGVzYycpKSB8fCAnSW1hZ2Ugd2l0aCBubyBkZXNjcmlwdGlvbic7XG4gICAgICAgIHZhciBpbWcgPSAkKCc8aW1nIHNyYz1cIicgKyB0YXJnZXQgKyAnXCIgYWx0PVwiJyArIGRlc2MgKyAnXCIvPicpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBfZGVmZXJyZWQoKTtcbiAgICAgICAgdmFyIGZhaWxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKCdGYWlsZWQgbG9hZGluZyBpbWFnZScpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpbWdcbiAgICAgICAgICAgIC5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdHVyYWxXaWR0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignZXJyb3InLCBmYWlsZWQpXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGltYWdlSGFuZGxlci50ZXN0ID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBfaW1hZ2VSZWdleHAudGVzdCh0YXJnZXQpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVIYW5kbGVyKHRhcmdldCwgaW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIGVsLCBwbGFjZWhvbGRlciwgaGFzSGlkZUNsYXNzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbCA9ICQodGFyZ2V0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYWNlaG9sZGVyID0gJCgnPGkgc3R5bGU9XCJkaXNwbGF5Om5vbmUgIWltcG9ydGFudFwiLz4nKTtcbiAgICAgICAgaGFzSGlkZUNsYXNzID0gZWwuaGFzQ2xhc3MoJ2xpdHktaGlkZScpO1xuXG4gICAgICAgIGluc3RhbmNlXG4gICAgICAgICAgICAuZWxlbWVudCgpXG4gICAgICAgICAgICAub25lKCdsaXR5OnJlbW92ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIC5iZWZvcmUoZWwpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNIaWRlQ2xhc3MgJiYgIWVsLmNsb3Nlc3QoJy5saXR5LWNvbnRlbnQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYWRkQ2xhc3MoJ2xpdHktaGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGl0eS1oaWRlJylcbiAgICAgICAgICAgIC5hZnRlcihwbGFjZWhvbGRlcilcbiAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHlvdXR1YmVIYW5kbGVyKHRhcmdldCkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IF95b3V0dWJlUmVnZXguZXhlYyh0YXJnZXQpO1xuXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZUhhbmRsZXIoXG4gICAgICAgICAgICB0cmFuc2Zlckhhc2goXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cueW91dHViZScgKyAobWF0Y2hlc1syXSB8fCAnJykgKyAnLmNvbS9lbWJlZC8nICsgbWF0Y2hlc1s0XSxcbiAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVF1ZXJ5UGFyYW1zKG1hdGNoZXNbNV0gfHwgJycpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmltZW9IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IF92aW1lb1JlZ2V4LmV4ZWModGFyZ2V0KTtcblxuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWVIYW5kbGVyKFxuICAgICAgICAgICAgdHJhbnNmZXJIYXNoKFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBhcHBlbmRRdWVyeVBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nICsgbWF0Y2hlc1szXSxcbiAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVF1ZXJ5UGFyYW1zKG1hdGNoZXNbNF0gfHwgJycpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFjZWJvb2t2aWRlb0hhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gX2ZhY2Vib29rdmlkZW9SZWdleC5leGVjKHRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoMCAhPT0gdGFyZ2V0LmluZGV4T2YoJ2h0dHAnKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJ2h0dHBzOicgKyB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lSGFuZGxlcihcbiAgICAgICAgICAgIHRyYW5zZmVySGFzaChcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgYXBwZW5kUXVlcnlQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vcGx1Z2lucy92aWRlby5waHA/aHJlZj0nICsgdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUXVlcnlQYXJhbXMobWF0Y2hlc1s0XSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb29nbGVtYXBzSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBfZ29vZ2xlbWFwc1JlZ2V4LmV4ZWModGFyZ2V0KTtcblxuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWVIYW5kbGVyKFxuICAgICAgICAgICAgdHJhbnNmZXJIYXNoKFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBhcHBlbmRRdWVyeVBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZS4nICsgbWF0Y2hlc1szXSArICcvbWFwcz8nICsgbWF0Y2hlc1s2XSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0OiBtYXRjaGVzWzZdLmluZGV4T2YoJ2xheWVyPWMnKSA+IDAgPyAnc3ZlbWJlZCcgOiAnZW1iZWQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaWZyYW1lSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwibGl0eS1pZnJhbWUtY29udGFpbmVyXCI+PGlmcmFtZSBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4gc3JjPVwiJyArIHRhcmdldCArICdcIi8+PC9kaXY+JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aW5IZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogTWF0aC5yb3VuZChfd2luLmhlaWdodCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrZXlkb3duKGUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBjdXJyZW50SW5zdGFuY2UoKTtcblxuICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVTQyBrZXlcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRBQiBrZXlcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICAgICAgaGFuZGxlVGFiS2V5KGUsIGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiS2V5KGUsIGluc3RhbmNlKSB7XG4gICAgICAgIHZhciBmb2N1c2FibGVFbGVtZW50cyA9IGluc3RhbmNlLmVsZW1lbnQoKS5maW5kKF9mb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKTtcbiAgICAgICAgdmFyIGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA8PSAwKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cy5nZXQoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzLmdldCgwKS5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICAkLmVhY2goX2luc3RhbmNlcywgZnVuY3Rpb24oaSwgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlVG9SZWdpc3Rlcikge1xuICAgICAgICBpZiAoMSA9PT0gX2luc3RhbmNlcy51bnNoaWZ0KGluc3RhbmNlVG9SZWdpc3RlcikpIHtcbiAgICAgICAgICAgIF9odG1sLmFkZENsYXNzKCdsaXR5LWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBfd2luXG4gICAgICAgICAgICAgICAgLm9uKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplOiByZXNpemUsXG4gICAgICAgICAgICAgICAgICAgIGtleWRvd246IGtleWRvd25cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYm9keSA+IConKS5ub3QoaW5zdGFuY2VUb1JlZ2lzdGVyLmVsZW1lbnQoKSlcbiAgICAgICAgICAgIC5hZGRDbGFzcygnbGl0eS1oaWRkZW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IGVsLmRhdGEoX2RhdGFBcmlhSGlkZGVuKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWwuZGF0YShfZGF0YUFyaWFIaWRkZW4sIGVsLmF0dHIoX2F0dHJBcmlhSGlkZGVuKSB8fCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihfYXR0ckFyaWFIaWRkZW4sICd0cnVlJylcbiAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUluc3RhbmNlKGluc3RhbmNlVG9SZW1vdmUpIHtcbiAgICAgICAgdmFyIHNob3c7XG5cbiAgICAgICAgaW5zdGFuY2VUb1JlbW92ZVxuICAgICAgICAgICAgLmVsZW1lbnQoKVxuICAgICAgICAgICAgLmF0dHIoX2F0dHJBcmlhSGlkZGVuLCAndHJ1ZScpXG4gICAgICAgIDtcblxuICAgICAgICBpZiAoMSA9PT0gX2luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIF9odG1sLnJlbW92ZUNsYXNzKCdsaXR5LWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBfd2luXG4gICAgICAgICAgICAgICAgLm9mZih7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplLFxuICAgICAgICAgICAgICAgICAgICBrZXlkb3duOiBrZXlkb3duXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9pbnN0YW5jZXMgPSAkLmdyZXAoX2luc3RhbmNlcywgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZVRvUmVtb3ZlICE9PSBpbnN0YW5jZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCEhX2luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNob3cgPSBfaW5zdGFuY2VzWzBdLmVsZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3cgPSAkKCcubGl0eS1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGl0eS1oaWRkZW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKSwgb2xkQXR0ciA9IGVsLmRhdGEoX2RhdGFBcmlhSGlkZGVuKTtcblxuICAgICAgICAgICAgICAgIGlmICghb2xkQXR0cikge1xuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKF9hdHRyQXJpYUhpZGRlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXR0cihfYXR0ckFyaWFIaWRkZW4sIG9sZEF0dHIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsLnJlbW92ZURhdGEoX2RhdGFBcmlhSGlkZGVuKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICgwID09PSBfaW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2luc3RhbmNlc1swXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWN0b3J5KHRhcmdldCwgaW5zdGFuY2UsIGhhbmRsZXJzLCBwcmVmZXJyZWRIYW5kbGVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gJ2lubGluZScsIGNvbnRlbnQ7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRIYW5kbGVycyA9ICQuZXh0ZW5kKHt9LCBoYW5kbGVycyk7XG5cbiAgICAgICAgaWYgKHByZWZlcnJlZEhhbmRsZXIgJiYgY3VycmVudEhhbmRsZXJzW3ByZWZlcnJlZEhhbmRsZXJdKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gY3VycmVudEhhbmRsZXJzW3ByZWZlcnJlZEhhbmRsZXJdKHRhcmdldCwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgaGFuZGxlciA9IHByZWZlcnJlZEhhbmRsZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSdW4gaW5saW5lIGFuZCBpZnJhbWUgaGFuZGxlcnMgYWZ0ZXIgYWxsIG90aGVyIGhhbmRsZXJzXG4gICAgICAgICAgICAkLmVhY2goWydpbmxpbmUnLCAnaWZyYW1lJ10sIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgY3VycmVudEhhbmRsZXJzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudEhhbmRsZXJzW25hbWVdID0gaGFuZGxlcnNbbmFtZV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJC5lYWNoKGN1cnJlbnRIYW5kbGVycywgZnVuY3Rpb24obmFtZSwgY3VycmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGVyIG1pZ2h0IGJlIFwicmVtb3ZlZFwiIGJ5IHNldHRpbmcgY2FsbGJhY2sgdG8gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SGFuZGxlci50ZXN0ICYmXG4gICAgICAgICAgICAgICAgICAgICFjdXJyZW50SGFuZGxlci50ZXN0KHRhcmdldCwgaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjdXJyZW50SGFuZGxlcih0YXJnZXQsIGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtoYW5kbGVyOiBoYW5kbGVyLCBjb250ZW50OiBjb250ZW50IHx8ICcnfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMaXR5KHRhcmdldCwgb3B0aW9ucywgb3BlbmVyLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdmFyIGlzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdmFyIGlzQ2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICB2YXIgY29udGVudDtcblxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIF9kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBlbGVtZW50ID0gJChvcHRpb25zLnRlbXBsYXRlKTtcblxuICAgICAgICAvLyAtLSBBUEkgLS1cblxuICAgICAgICBzZWxmLmVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYub3BlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gb3BlbmVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYub3B0aW9ucyAgPSAkLnByb3h5KHNldHRpbmdzLCBzZWxmLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5oYW5kbGVycyA9ICQucHJveHkoc2V0dGluZ3MsIHNlbGYsIG9wdGlvbnMuaGFuZGxlcnMpO1xuXG4gICAgICAgIHNlbGYucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVhZHkgfHwgaXNDbG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAuY3NzKCdtYXgtaGVpZ2h0Jywgd2luSGVpZ2h0KCkgKyAncHgnKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdsaXR5OnJlc2l6ZScsIFtzZWxmXSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVhZHkgfHwgaXNDbG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmVtb3ZlSW5zdGFuY2Uoc2VsZik7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF9kZWZlcnJlZCgpO1xuXG4gICAgICAgICAgICAvLyBXZSByZXR1cm4gZm9jdXMgb25seSBpZiB0aGUgY3VycmVudCBmb2N1cyBpcyBpbnNpZGUgdGhpcyBpbnN0YW5jZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnRbMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgJC5jb250YWlucyhlbGVtZW50WzBdLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLCBlZy4gZm9yIFNWRyBlbGVtZW50cyB3aGljaCBjYW4ndCBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBmb2N1c2VkIGluIElFMTFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRlbnQudHJpZ2dlcignbGl0eTpjbG9zZScsIFtzZWxmXSk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpdHktb3BlbmVkJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpdHktY2xvc2VkJylcbiAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZChjb250ZW50LmFkZChlbGVtZW50KSlcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnRyaWdnZXIoJ2xpdHk6cmVtb3ZlJywgW3NlbGZdKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gLS0gSW5pdGlhbGl6YXRpb24gLS1cblxuICAgICAgICByZXN1bHQgPSBmYWN0b3J5KHRhcmdldCwgc2VsZiwgb3B0aW9ucy5oYW5kbGVycywgb3B0aW9ucy5oYW5kbGVyKTtcblxuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAuYXR0cihfYXR0ckFyaWFIaWRkZW4sICdmYWxzZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpdHktbG9hZGluZyBsaXR5LW9wZW5lZCBsaXR5LScgKyByZXN1bHQuaGFuZGxlcilcbiAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICAgICAuZm9jdXMoKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsICdbZGF0YS1saXR5LWNsb3NlXScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ1tkYXRhLWxpdHktY2xvc2VdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudHJpZ2dlcignbGl0eTpvcGVuJywgW3NlbGZdKVxuICAgICAgICA7XG5cbiAgICAgICAgcmVnaXN0ZXJJbnN0YW5jZShzZWxmKTtcblxuICAgICAgICAkLndoZW4ocmVzdWx0LmNvbnRlbnQpXG4gICAgICAgICAgICAuYWx3YXlzKHJlYWR5KVxuICAgICAgICA7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVhZHkocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZW50ID0gJChyZXN1bHQpXG4gICAgICAgICAgICAgICAgLmNzcygnbWF4LWhlaWdodCcsIHdpbkhlaWdodCgpICsgJ3B4JylcbiAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgICAgIC5maW5kKCcubGl0eS1sb2FkZXInKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZGVyID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRW5kKGxvYWRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpdHktbG9hZGluZycpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5saXR5LWNvbnRlbnQnKVxuICAgICAgICAgICAgICAgIC5lbXB0eSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZChjb250ZW50KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29udGVudFxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdsaXR5OnJlYWR5JywgW3NlbGZdKVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGl0eSh0YXJnZXQsIG9wdGlvbnMsIG9wZW5lcikge1xuICAgICAgICBpZiAoIXRhcmdldC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgb3BlbmVyID0gJChvcGVuZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuZXIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gb3BlbmVyLmRhdGEoJ2xpdHktdGFyZ2V0JykgfHwgb3BlbmVyLmF0dHIoJ2hyZWYnKSB8fCBvcGVuZXIuYXR0cignc3JjJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgTGl0eShcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIG9wZW5lci5kYXRhKCdsaXR5LW9wdGlvbnMnKSB8fCBvcGVuZXIuZGF0YSgnbGl0eScpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcGVuZXIsXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpdHkudmVyc2lvbiAgPSAnMi4yLjInO1xuICAgIGxpdHkub3B0aW9ucyAgPSAkLnByb3h5KHNldHRpbmdzLCBsaXR5LCBfZGVmYXVsdE9wdGlvbnMpO1xuICAgIGxpdHkuaGFuZGxlcnMgPSAkLnByb3h5KHNldHRpbmdzLCBsaXR5LCBfZGVmYXVsdE9wdGlvbnMuaGFuZGxlcnMpO1xuICAgIGxpdHkuY3VycmVudCAgPSBjdXJyZW50SW5zdGFuY2U7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2subGl0eScsICdbZGF0YS1saXR5XScsIGxpdHkpO1xuXG4gICAgcmV0dXJuIGxpdHk7XG59KSk7XG4vKlxuKiBqcXVlcnktbWF0Y2gtaGVpZ2h0IDAuNy4wIGJ5IEBsaWFicnVcbiogaHR0cDovL2JybS5pby9qcXVlcnktbWF0Y2gtaGVpZ2h0L1xuKiBMaWNlbnNlIE1JVFxuKi9cbiFmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiXSx0KTpcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10KHJlcXVpcmUoXCJqcXVlcnlcIikpOnQoalF1ZXJ5KX0oZnVuY3Rpb24odCl7dmFyIGU9LTEsbz0tMSxpPWZ1bmN0aW9uKHQpe3JldHVybiBwYXJzZUZsb2F0KHQpfHwwfSxhPWZ1bmN0aW9uKGUpe3ZhciBvPTEsYT10KGUpLG49bnVsbCxyPVtdO3JldHVybiBhLmVhY2goZnVuY3Rpb24oKXt2YXIgZT10KHRoaXMpLGE9ZS5vZmZzZXQoKS50b3AtaShlLmNzcyhcIm1hcmdpbi10b3BcIikpLHM9ci5sZW5ndGg+MD9yW3IubGVuZ3RoLTFdOm51bGw7bnVsbD09PXM/ci5wdXNoKGUpOk1hdGguZmxvb3IoTWF0aC5hYnMobi1hKSk8PW8/cltyLmxlbmd0aC0xXT1zLmFkZChlKTpyLnB1c2goZSksbj1hfSkscn0sbj1mdW5jdGlvbihlKXt2YXIgbz17XG5ieVJvdzohMCxwcm9wZXJ0eTpcImhlaWdodFwiLHRhcmdldDpudWxsLHJlbW92ZTohMX07cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGU/dC5leHRlbmQobyxlKTooXCJib29sZWFuXCI9PXR5cGVvZiBlP28uYnlSb3c9ZTpcInJlbW92ZVwiPT09ZSYmKG8ucmVtb3ZlPSEwKSxvKX0scj10LmZuLm1hdGNoSGVpZ2h0PWZ1bmN0aW9uKGUpe3ZhciBvPW4oZSk7aWYoby5yZW1vdmUpe3ZhciBpPXRoaXM7cmV0dXJuIHRoaXMuY3NzKG8ucHJvcGVydHksXCJcIiksdC5lYWNoKHIuX2dyb3VwcyxmdW5jdGlvbih0LGUpe2UuZWxlbWVudHM9ZS5lbGVtZW50cy5ub3QoaSl9KSx0aGlzfXJldHVybiB0aGlzLmxlbmd0aDw9MSYmIW8udGFyZ2V0P3RoaXM6KHIuX2dyb3Vwcy5wdXNoKHtlbGVtZW50czp0aGlzLG9wdGlvbnM6b30pLHIuX2FwcGx5KHRoaXMsbyksdGhpcyl9O3IudmVyc2lvbj1cIjAuNy4wXCIsci5fZ3JvdXBzPVtdLHIuX3Rocm90dGxlPTgwLHIuX21haW50YWluU2Nyb2xsPSExLHIuX2JlZm9yZVVwZGF0ZT1udWxsLFxuci5fYWZ0ZXJVcGRhdGU9bnVsbCxyLl9yb3dzPWEsci5fcGFyc2U9aSxyLl9wYXJzZU9wdGlvbnM9bixyLl9hcHBseT1mdW5jdGlvbihlLG8pe3ZhciBzPW4obyksaD10KGUpLGw9W2hdLGM9dCh3aW5kb3cpLnNjcm9sbFRvcCgpLHA9dChcImh0bWxcIikub3V0ZXJIZWlnaHQoITApLGQ9aC5wYXJlbnRzKCkuZmlsdGVyKFwiOmhpZGRlblwiKTtyZXR1cm4gZC5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzKTtlLmRhdGEoXCJzdHlsZS1jYWNoZVwiLGUuYXR0cihcInN0eWxlXCIpKX0pLGQuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIikscy5ieVJvdyYmIXMudGFyZ2V0JiYoaC5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzKSxvPWUuY3NzKFwiZGlzcGxheVwiKTtcImlubGluZS1ibG9ja1wiIT09byYmXCJmbGV4XCIhPT1vJiZcImlubGluZS1mbGV4XCIhPT1vJiYobz1cImJsb2NrXCIpLGUuZGF0YShcInN0eWxlLWNhY2hlXCIsZS5hdHRyKFwic3R5bGVcIikpLGUuY3NzKHtkaXNwbGF5Om8sXCJwYWRkaW5nLXRvcFwiOlwiMFwiLFxuXCJwYWRkaW5nLWJvdHRvbVwiOlwiMFwiLFwibWFyZ2luLXRvcFwiOlwiMFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMFwiLFwiYm9yZGVyLXRvcC13aWR0aFwiOlwiMFwiLFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiOlwiMFwiLGhlaWdodDpcIjEwMHB4XCIsb3ZlcmZsb3c6XCJoaWRkZW5cIn0pfSksbD1hKGgpLGguZWFjaChmdW5jdGlvbigpe3ZhciBlPXQodGhpcyk7ZS5hdHRyKFwic3R5bGVcIixlLmRhdGEoXCJzdHlsZS1jYWNoZVwiKXx8XCJcIil9KSksdC5lYWNoKGwsZnVuY3Rpb24oZSxvKXt2YXIgYT10KG8pLG49MDtpZihzLnRhcmdldCluPXMudGFyZ2V0Lm91dGVySGVpZ2h0KCExKTtlbHNle2lmKHMuYnlSb3cmJmEubGVuZ3RoPD0xKXJldHVybiB2b2lkIGEuY3NzKHMucHJvcGVydHksXCJcIik7YS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9dCh0aGlzKSxvPWUuYXR0cihcInN0eWxlXCIpLGk9ZS5jc3MoXCJkaXNwbGF5XCIpO1wiaW5saW5lLWJsb2NrXCIhPT1pJiZcImZsZXhcIiE9PWkmJlwiaW5saW5lLWZsZXhcIiE9PWkmJihpPVwiYmxvY2tcIik7dmFyIGE9e1xuZGlzcGxheTppfTthW3MucHJvcGVydHldPVwiXCIsZS5jc3MoYSksZS5vdXRlckhlaWdodCghMSk+biYmKG49ZS5vdXRlckhlaWdodCghMSkpLG8/ZS5hdHRyKFwic3R5bGVcIixvKTplLmNzcyhcImRpc3BsYXlcIixcIlwiKX0pfWEuZWFjaChmdW5jdGlvbigpe3ZhciBlPXQodGhpcyksbz0wO3MudGFyZ2V0JiZlLmlzKHMudGFyZ2V0KXx8KFwiYm9yZGVyLWJveFwiIT09ZS5jc3MoXCJib3gtc2l6aW5nXCIpJiYobys9aShlLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikpK2koZS5jc3MoXCJib3JkZXItYm90dG9tLXdpZHRoXCIpKSxvKz1pKGUuY3NzKFwicGFkZGluZy10b3BcIikpK2koZS5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiKSkpLGUuY3NzKHMucHJvcGVydHksbi1vK1wicHhcIikpfSl9KSxkLmVhY2goZnVuY3Rpb24oKXt2YXIgZT10KHRoaXMpO2UuYXR0cihcInN0eWxlXCIsZS5kYXRhKFwic3R5bGUtY2FjaGVcIil8fG51bGwpfSksci5fbWFpbnRhaW5TY3JvbGwmJnQod2luZG93KS5zY3JvbGxUb3AoYy9wKnQoXCJodG1sXCIpLm91dGVySGVpZ2h0KCEwKSksXG50aGlzfSxyLl9hcHBseURhdGFBcGk9ZnVuY3Rpb24oKXt2YXIgZT17fTt0KFwiW2RhdGEtbWF0Y2gtaGVpZ2h0XSwgW2RhdGEtbWhdXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgbz10KHRoaXMpLGk9by5hdHRyKFwiZGF0YS1taFwiKXx8by5hdHRyKFwiZGF0YS1tYXRjaC1oZWlnaHRcIik7aSBpbiBlP2VbaV09ZVtpXS5hZGQobyk6ZVtpXT1vfSksdC5lYWNoKGUsZnVuY3Rpb24oKXt0aGlzLm1hdGNoSGVpZ2h0KCEwKX0pfTt2YXIgcz1mdW5jdGlvbihlKXtyLl9iZWZvcmVVcGRhdGUmJnIuX2JlZm9yZVVwZGF0ZShlLHIuX2dyb3VwcyksdC5lYWNoKHIuX2dyb3VwcyxmdW5jdGlvbigpe3IuX2FwcGx5KHRoaXMuZWxlbWVudHMsdGhpcy5vcHRpb25zKX0pLHIuX2FmdGVyVXBkYXRlJiZyLl9hZnRlclVwZGF0ZShlLHIuX2dyb3Vwcyl9O3IuX3VwZGF0ZT1mdW5jdGlvbihpLGEpe2lmKGEmJlwicmVzaXplXCI9PT1hLnR5cGUpe3ZhciBuPXQod2luZG93KS53aWR0aCgpO2lmKG49PT1lKXJldHVybjtlPW47XG59aT8tMT09PW8mJihvPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtzKGEpLG89LTF9LHIuX3Rocm90dGxlKSk6cyhhKX0sdChyLl9hcHBseURhdGFBcGkpLHQod2luZG93KS5iaW5kKFwibG9hZFwiLGZ1bmN0aW9uKHQpe3IuX3VwZGF0ZSghMSx0KX0pLHQod2luZG93KS5iaW5kKFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlXCIsZnVuY3Rpb24odCl7ci5fdXBkYXRlKCEwLHQpfSl9KTtjb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcblxuICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykgPT09IHRydWUpIHtcbiAgICAkKCcjbWFpbGJhcicpLmhpZGUoKVxuICB9ZWxzZSB7XG4gICAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG4gIH1cblxufVxuXG4vLyBjbGljayB0aXRsZSBvciBkb3duIGFycm93XG4kKCcjbWFpbGJhci1hY3RpdmF0ZScpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHZoXG4gIGNvbnN0ICRib2R5ID0gJCgnI21haWxiYXItYm9keScpXG4gIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgIHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9IGVsc2Uge1xuICAgIHZoID0gNDAwXG4gIH1cblxuICBpZiAoJGJvZHkuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gIH0gZWxzZSB7XG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICB9XG5cbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxufSlcblxuLy8gY2xpY2sgZGlzbWlzc1xuJCgnI21haWxiYXItZGlzbWlzcycpLm9uKCdjbGljaycsIGRpc21pc3NNYWlsYmFyKVxuXG5mdW5jdGlvbiBkaXNtaXNzTWFpbGJhciAoKSB7XG4gIC8vIGlmIHRoZSBtZW51IGlzIGFjdGl2ZSBhbmQgeW91IGRpc21pc3MsIHJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0XG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtYWN0aXZlJykpIHtcbiAgICBjb25zdCBtZW51ID0gJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJylcbiAgICBjb25zdCBhZGRlZEhlaWdodCA9IG1lbnUuaGVpZ2h0KCkgKyAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBhZGRlZEhlaWdodCArICdweCcpXG4gIH1cblxuICAkKCcjbWFpbGJhcicpLmFuaW1hdGUoeyBoZWlnaHQ6ICcwJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxuICB9KVxuXG4gIGRvY3VtZW50LmNvb2tpZSA9ICdzdWJzY3JpYmVkPXRydWUnXG59XG4kKCcjbWVudS1hY3RpdmF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG1haWxiYXIgPSAwXG4gIGlmICgkKCcjbWFpbGJhci1ib2R5JykubGVuZ3RoKSB7XG4gICAgbWFpbGJhciA9ICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgfVxuXG4gIGNvbnN0IHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21lbnUnKS5oZWlnaHQoKSAtIG1haWxiYXJcbiAgY29uc3QgbWVudSA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tZW51XCI+PC91c2U+J1xuICBjb25zdCBjcm9zcyA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jcm9zc1wiPjwvdXNlPidcblxuICBpZiAoJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGNyb3NzKVxuICB9IGVsc2Uge1xuICAgICQoJyNtZW51LWhlYWRlci1tZW51LWNvbnRhaW5lcicpLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKG1lbnUpXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2ZScpXG59KVxuXG4vLyBUT0RPOiByZWNhbGMgbWVudSBoZWlnaHQgb24gcmVzaXplIGlmIGluIG1vYmlsZSB3aWR0aHNcbiQod2luZG93KS5yZXNpemUoKVxuJCgnLmJlbmVmaXRzX19oZWFkbGluZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCh0aGlzKS5uZXh0KClcbiAgICBjb25zdCBhcnJvd0Rvd24gPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPidcbiAgICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gICAgJGJvZHkuc2xpZGVUb2dnbGUoKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93RG93bilcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd1VwKVxuICAgIH1cblxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pXG4vLyB3aW5kb3cuYWxlcnQgPSBmdW5jdGlvbiAoKSB7fVxuLy8gIFZhbGlkYXRlIENvbnRhY3QgVXMgRmllbGRzXG5pZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykpIHtcbiAgICAkKCcucHJpbWFyeUFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIFZhbGl0KCkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQoJy52YWxpZGF0ZS1lbWFpbCcpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0RW1haWwnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCgnI3RmYV8yJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFweCBzb2xpZCByZWRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVuaXQgPSBWYWxpdCgpO1xuICAgICAgICB2YXIgZXJyb3IgPSAnPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjpzdGF0aWM7XCIgY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZS48L3NwYW4+J1xuICAgICAgICBpZiAocnVuaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnI3RmYV8wJykuc3VibWl0KClcbiAgICAgICAgICAgICQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5hZnRlcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4ndXNlIHN0cmljdCdcblxuXG5cdGlmICggJCgnYm9keScpLmhhc0NsYXNzKCd3aGVhdC1wcm9maXRhYmlsaXR5LWNhbGN1bGF0b3InKSApIHtcblxuXHRcdCQoJy50b2dnbGVNb2RhbCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnI2VtYWlsRGF0YScpLnNsaWRlRG93bigpXG5cdFx0IH0pO1xuXG5cdFx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHQgICQoJy50aGFua3lvdW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0JCgnI3Jlc2V0X2Zvcm0sI3RoYW5reW91X19zdGFydG92ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblx0XHR9KTtcblxuXHRcdCQoXCIjZW1haWxEYXRhRm9ybVwiKS5iaW5kKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZSkge1xuXHRcdCAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcblx0XHQgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBkZWZhdWx0IGV2ZW50XG5cdFx0ICAgfVxuXHRcdH0pO1xuXG5cblx0XHQkKCcjZG93bmxvYWRQREYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdCQoJyNwZGZEYXRhJykudmFsKEpTT04uc3RyaW5naWZ5KGRhdGFFeHRyYWN0KCkpKVxuXHRcdFx0JCgnI3BkZkZvcm0nKS5zdWJtaXQoKVxuXHRcdH0pXG5cblx0XHQkKCcjbWFpbFBERicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvL1ZhbGlkYXRlIEVtYWlsXG5cdFx0XHRmdW5jdGlvbiBpc19lbWFpbChlbWFpbCl7XG5cdFx0XHR2YXIgZW1haWxSZWcgPSAvXlthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVpdezIsNH0kLztcblx0XHRcdHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTsgfVxuXG5cdFx0XHR2YXIgZW1haWxJbnB1dCA9IGlzX2VtYWlsKCQoJyNyZWNpcGllbnRFbWFpbCcpLnZhbCgpKVxuXHRcdFx0dmFyIGVtYWlsRXJyb3IgPSAnPHNtYWxsIGNsYXNzPVwiZW1haWxFcnJvclwiPlBsZWFzZSBlbnRlciB2YWxpZCBlbWFpbC48L3NtYWxsJ1xuXG5cdFx0XHRpZiAoZW1haWxJbnB1dCA9PSBmYWxzZSkge1xuXHRcdFx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRpZiAoJCgnLmVtYWlsRXJyb3InKVswXSkge1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihlbWFpbEVycm9yKVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHQkKCcuZW1haWxFcnJvcicpLnJlbW92ZSgpXG5cdFx0XHRcdCQoJyNyZWNpcGllbnRFbWFpbCcpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJpbmhlcml0XCJ9KVxuXHRcdFx0XHR2YXIgcXVlcnlTdHJpbmdBZGQgPSAnJnJlY2lwaWVudHM9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKCcjcmVjaXBpZW50RW1haWwnKS52YWwoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc2VuZGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ25vLXJlcGx5QGNvbm5lY3RpbnN5c3RlbS5jb20nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZzdWJqZWN0PScgKyBlbmNvZGVVUklDb21wb25lbnQoJ1lvdXIgV2hlYXQgUHJvZml0YWJpbGl0eSBDYWxjdWxhdG9yIFJlc3VsdHMnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZmaXJzdE5hbWU9J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogJ2h0dHBzOi8vcGRmZ2VuLm1zdmMuaW8vYXBpL3YxL0VtYWlsTGluaz90ZW1wbGF0ZU5hbWU9V2VzdEJyZWRfUHJvZml0Q2FsYycgKyBxdWVyeVN0cmluZ0FkZCxcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YTogJ3sgXCJqc29uXCIgOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkgKyAnfScsXG5cdFx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3B0cyA9IHtcblx0XHRcdFx0XHRcdCAgbGluZXM6IDEzIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuXHRcdFx0XHRcdFx0LCBsZW5ndGg6IDI4IC8vIFRoZSBsZW5ndGggb2YgZWFjaCBsaW5lXG5cdFx0XHRcdFx0XHQsIHdpZHRoOiAxNCAvLyBUaGUgbGluZSB0aGlja25lc3Ncblx0XHRcdFx0XHRcdCwgcmFkaXVzOiA0MiAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcblx0XHRcdFx0XHRcdCwgc2NhbGU6IDAuMTUgLy8gU2NhbGVzIG92ZXJhbGwgc2l6ZSBvZiB0aGUgc3Bpbm5lclxuXHRcdFx0XHRcdFx0LCBjb3JuZXJzOiAwLjMgLy8gQ29ybmVyIHJvdW5kbmVzcyAoMC4uMSlcblx0XHRcdFx0XHRcdCwgY29sb3I6ICcjZmZmJyAvLyAjcmdiIG9yICNycmdnYmIgb3IgYXJyYXkgb2YgY29sb3JzXG5cdFx0XHRcdFx0XHQsIG9wYWNpdHk6IDAgLy8gT3BhY2l0eSBvZiB0aGUgbGluZXNcblx0XHRcdFx0XHRcdCwgcm90YXRlOiAwIC8vIFRoZSByb3RhdGlvbiBvZmZzZXRcblx0XHRcdFx0XHRcdCwgZGlyZWN0aW9uOiAxIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2Vcblx0XHRcdFx0XHRcdCwgc3BlZWQ6IDEgLy8gUm91bmRzIHBlciBzZWNvbmRcblx0XHRcdFx0XHRcdCwgdHJhaWw6IDg1IC8vIEFmdGVyZ2xvdyBwZXJjZW50YWdlXG5cdFx0XHRcdFx0XHQsIGZwczogMjAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZyBzZXRUaW1lb3V0KCkgYXMgYSBmYWxsYmFjayBmb3IgQ1NTXG5cdFx0XHRcdFx0XHQsIHpJbmRleDogMmU5IC8vIFRoZSB6LWluZGV4IChkZWZhdWx0cyB0byAyMDAwMDAwMDAwKVxuXHRcdFx0XHRcdFx0LCBjbGFzc05hbWU6ICdzcGlubmVyJyAvLyBUaGUgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgc3Bpbm5lclxuXHRcdFx0XHRcdFx0LCB0b3A6ICctMjBweCcgLy8gVG9wIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuXHRcdFx0XHRcdFx0LCBsZWZ0OiAnNTAlJyAvLyBMZWZ0IHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuXHRcdFx0XHRcdFx0LCBzaGFkb3c6IGZhbHNlIC8vIFdoZXRoZXIgdG8gcmVuZGVyIGEgc2hhZG93XG5cdFx0XHRcdFx0XHQsIGh3YWNjZWw6IGZhbHNlIC8vIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvblxuXHRcdFx0XHRcdFx0LCBwb3NpdGlvbjogJ3JlbGF0aXZlJyAvLyBFbGVtZW50IHBvc2l0aW9uaW5nXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKG9wdHMpLnNwaW4oKVxuXHRcdFx0XHRcdFx0JCgnI21haWxQREYnKS5jc3MoJ2NvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XG5cdFx0XHRcdFx0XHQkKCcjbWFpbFBERicpLmFmdGVyKHNwaW5uZXIuZWwpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKCcjZW1haWxEYXRhJykuaGlkZSgpXG5cdFx0XHRcdFx0JCgnI3RoYW5reW91bW9kYWwnKS5zaG93KCkuc2xpZGVEb3duKClcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdH0pXG5cblx0XHRmdW5jdGlvbiBkYXRhRXh0cmFjdCAoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjZXJ0R2VybWluYXRpb246ICQoJyNjZXJ0X3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSxcblx0XHRcdFx0Y2VydFB1cmVTZWVkOiAkKCcjY2VydF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpLFxuXHRcdFx0XHRjZXJ0U2VlZENvc3Q6ICQoJyNjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCcpLnZhbCgpLFxuXHRcdFx0XHRzYXZlZEdlcm1pbmF0aW9uOiAkKCcjc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbicpLnZhbCgpLFxuXHRcdFx0XHRzYXZlZFB1cmVTZWVkOiAkKCcjc2F2ZWRfc2VlZF9wdXJlX3NlZWQnKS52YWwoKSxcblx0XHRcdFx0c2F2ZWRTZWVkQ29zdDogJCgnI3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCcpLnZhbCgpLFxuXHRcdFx0XHRzZWFzb246ICQoJ2lucHV0W25hbWU9XCJjcm9wX3NlYXNvblwiXTpjaGVja2VkJykudmFsKCksXG5cdFx0XHRcdHRhcmdldFlpZWxkOiAkKCcjY3JvcF90YXJnZXRfeWllbGQnKS52YWwoKSxcblx0XHRcdFx0d2hlYXRQcmljZTogJCgnI2Nyb3Bfd2hlYXRfcHJpY2UnKS52YWwoKSxcblx0XHRcdFx0dGFyZ2V0UGxhbnRQb3B1bGF0aW9uOiAkKCcjY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbicpLnZhbCgpLFxuXHRcdFx0XHRmbGF0U2VlZGluZ1JhdGU6ICQoJyNjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJykudmFsKCksXG5cdFx0XHRcdGFjcmVzUGxhbnRlZDogJCgnI2Nyb3BfYWNyZXNfcGxhbnRlZCcpLnZhbCgpLFxuXHRcdFx0XHR5aWVsZEltcGFjdE92ZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZycpLnZhbCgpLFxuXHRcdFx0XHR5aWVsZEltcGFjdFVuZGVyc2VlZGluZzogJCgnI2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJykudmFsKCksXG5cdFx0XHRcdGltcGFjdENvbXBhcmVHcmFwaDogJCgnI2NvbXBhcmVHcmFwaCcpLnZhbCgpLFxuXHRcdFx0XHRtYXhpbWl6ZVJldmVudWVHcmFwaDogJCgnI3JldmVudWVHcmFwaCcpLnZhbCgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cblxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIE1haW4gYXBwIHN0YXJ0dXBcblxuXHRcdFx0dmFyIFV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBHZXQgdGhlIHRvcCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IGluIHRoZSBkb2N1bWVudFxuXHRcdFx0XHQvLyBGcm9tIHNtb290aFNjcm9sbCwgaHR0cHM6Ly9naXRodWIuY29tL2FsaWNlbGlldXRpZXIvc21vb3RoU2Nyb2xsL2Jsb2IvbWFzdGVyL3Ntb290aHNjcm9sbC5qc1xuXHRcdFx0XHR2YXIgZ2V0VG9wID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0XHRcdC8vIHJldHVybiB2YWx1ZSBvZiBodG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAuLi4gSUUgOiAwLCBvdGhlciBicm93c2VycyA6IC1wYWdlWU9mZnNldFxuXHRcdFx0XHRcdGlmKGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJykgcmV0dXJuIC13aW5kb3cucGFnZVlPZmZzZXRcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgc2NyZWVuIHZpZXdwb3J0IHdpZHRoXG5cdFx0XHRcdHZhciBnZXRWaWV3cG9ydFdpZHRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgZGlnaXQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgdG8gYSBudW1lcmljIHN0cmluZ1xuXHRcdFx0XHR2YXIgYWRkRGlnaXRTZXBhcmF0b3JzID0gZnVuY3Rpb24gKG51bSkge1xuXHRcdFx0XHRcdHZhciBuID0gbnVtLnRvU3RyaW5nKClcblx0XHRcdFx0XHR2YXIgcCA9IG4uaW5kZXhPZignLicpXG5cdFx0XHRcdFx0cmV0dXJuIG4ucmVwbGFjZSgvXFxkKD89KD86XFxkezN9KSsoPzpcXC58JCkpL2csIGZ1bmN0aW9uICgkMCwgaSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHAgPCAwIHx8IGkgPCBwID8gKCQwICsgJywnKSA6ICQwXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJldHVybiB0aGUgY2hhcmFjdGVyIHJlcHJlc2VudGF0aW9uIG9mIEluZmluaXR5XG5cdFx0XHRcdHZhciBnZXRJbmZpbml0eUNoYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuICfiiJ4nXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JtYXQgYSBudW1iZXIgZm9yIGRpc3BsYXlcblx0XHRcdFx0dmFyIGZvcm1hdE51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIsIGRlY2ltYWxzLCBzaG93UG9zaXRpdmUpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KG51bWJlcilcblx0XHRcdFx0XHRpZiAoIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZGVjaW1hbHMgIT09ICd1bmRlZmluZWQnICYmIGRlY2ltYWxzICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEtlZXAgYSBzZXQgbnVtYmVyIG9mIGRlY2ltYWxzLCBldmVuIGlmIHplcm9lc1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoZGVjaW1hbHMpKVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gSnVzdCB0cnVuY2F0ZSB0byBhIGZpeGVkIG51bWJlciBvZiBkZWNpbWFscywgYnV0IGRvbid0IHByZXNlcnZlIHRyYWlsaW5nIHplcm9lc1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnMocGFyc2VGbG9hdCh2YWx1ZS50b0ZpeGVkKDIpKSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBnZXRJbmZpbml0eUNoYXIoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcm1hdCBhIG51bWJlciBhcyBjdXJyZW55IGZvciBkaXNwbGF5XG5cdFx0XHRcdHZhciBmb3JtYXRDdXJyZW5jeSA9IGZ1bmN0aW9uIChudW1iZXIsIHNob3dEZWNpbWFscywgc2hvd1Bvc2l0aXZlKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChudW1iZXIpXG5cdFx0XHRcdFx0aWYgKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyAnJCcgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoc2hvd0RlY2ltYWxzID09PSB0cnVlID8gMiA6IDApKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZ2V0SW5maW5pdHlDaGFyKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDb252ZXJ0IGEgZm9ybWF0dGVkIG51bWJlciBiYWNrIGludG8gYW4gYWN0dWFsIG51bWJlclxuXHRcdFx0XHR2YXIgdW5mb3JtYXROdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKC9bXi1cXGRcXC5lXS9nLCAnJykudHJpbSgpKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9ybWF0IGEgaW5wdXQgZmllbGQgYWNjb3JkaW5nIHRvIHRoZSBcImRhdGEtZm9ybWF0XCIgYXR0cmlidXRlXG5cdFx0XHRcdHZhciBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0aWYgKCFlbGVtZW50IHx8IChlbGVtZW50ICYmICFlbGVtZW50LnZhbHVlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICcnXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBlbGVtZW50LnZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsdWVcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgZm9ybWF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5kYXRhc2V0LmZvcm1hdFxuXG5cdFx0XHRcdFx0c3dpdGNoIChmb3JtYXQpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cblx0XHRcdFx0XHRcdGNhc2UgJ3NpZ25lZG51bWJlcic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIG51bGwsIHRydWUpXG5cblx0XHRcdFx0XHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCAwKVxuXG5cdFx0XHRcdFx0XHRjYXNlICdmaXhlZDInOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCAyKVxuXG5cdFx0XHRcdFx0XHRjYXNlICdjdXJyZW5jeSc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXRDdXJyZW5jeSh1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50LnZhbHVlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGdldFRvcDogZ2V0VG9wLFxuXHRcdFx0XHRcdGdldFZpZXdwb3J0V2lkdGg6IGdldFZpZXdwb3J0V2lkdGgsXG5cdFx0XHRcdFx0YWRkRGlnaXRTZXBhcmF0b3JzOiBhZGREaWdpdFNlcGFyYXRvcnMsXG5cdFx0XHRcdFx0Z2V0SW5maW5pdHlDaGFyOiBnZXRJbmZpbml0eUNoYXIsXG5cdFx0XHRcdFx0Zm9ybWF0TnVtYmVyOiBmb3JtYXROdW1iZXIsXG5cdFx0XHRcdFx0Zm9ybWF0Q3VycmVuY3k6IGZvcm1hdEN1cnJlbmN5LFxuXHRcdFx0XHRcdHVuZm9ybWF0TnVtYmVyOiB1bmZvcm1hdE51bWJlcixcblx0XHRcdFx0XHRmb3JtYXRWYWx1ZTogZm9ybWF0VmFsdWVcblx0XHRcdFx0fVxuXHRcdFx0fSgpKVxuXG5cdFx0XHR2YXIgU2VlZENhbGNEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIFNFRURTX1BFUl9MQl9NSU4gPSA5MDAwXG5cdFx0XHRcdHZhciBTRUVEU19QRVJfTEJfTUFYID0gMTgwMDBcblx0XHRcdFx0dmFyIFNFRURTX1BFUl9MQl9TVEVQID0gNTAwXG5cblx0XHRcdFx0dmFyIFNlZWRDYWxjVXNlckRhdGEgPSBmdW5jdGlvbiAoY2VydGlmaWVkKSB7XG5cdFx0XHRcdFx0Ly8gUHJvcGVydGllc1xuXHRcdFx0XHRcdHRoaXMuc2Vhc29uID0gJ3dpbnRlcicgLy8gc3ByaW5nfHdpbnRlclxuXG5cdFx0XHRcdFx0dGhpcy5wZXJjZW50R2VybWluYXRpb24gPSAwXG5cdFx0XHRcdFx0dGhpcy5wZXJjZW50UHVyZVNlZWQgPSAwXG5cdFx0XHRcdFx0dGhpcy5jb3N0UGVyQ1dUID0gMFxuXHRcdFx0XHRcdHRoaXMudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAwXG5cdFx0XHRcdFx0dGhpcy50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAwXG5cdFx0XHRcdFx0dGhpcy5mbGF0UmF0ZUxiUGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLmFjcmVzUGxhbnRlZCA9IDBcblxuXHRcdFx0XHRcdHRoaXMudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwIC8vIHBlciAxMDAsMDAwIHNlZWRzIHBlciBhY3JlXG5cdFx0XHRcdFx0dGhpcy5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXG5cdFx0XHRcdFx0Ly8gT3RoZXJcblx0XHRcdFx0XHR0aGlzLmlzQ2VydGlmaWVkID0gISFjZXJ0aWZpZWRcblxuXHRcdFx0XHRcdC8vIE1ldGhvZHNcblx0XHRcdFx0XHR0aGlzLnJlc2V0VG9EZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmlzQ2VydGlmaWVkKSB7XG5cdFx0XHRcdFx0XHRcdHNldENlcnRpZmllZFNlZWREZWZhdWx0cyh0aGlzKVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2V0U2F2ZWRTZWVkRGVmYXVsdHModGhpcylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBJbml0aWFsaXplXG5cdFx0XHRcdFx0dGhpcy5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIE9wdGltYWxTZWVkaW5nUmF0ZUltcGFjdERhdGEgPSBmdW5jdGlvbiAoc2VlZHNQZXJMYikge1xuXHRcdFx0XHRcdC8vIENhbGN1bGF0ZWRcblx0XHRcdFx0XHR0aGlzLnlpZWxkQWR2YW50YWdlQnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgPSAwXG5cdFx0XHRcdFx0dGhpcy5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IDBcblx0XHRcdFx0XHR0aGlzLmNvc3RQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMudG90YWxTZWVkQ29zdCA9IDBcblx0XHRcdFx0XHR0aGlzLmFjdHVhbFNlZWRpbmdSYXRlID0gMFxuXHRcdFx0XHRcdHRoaXMuc2VlZGluZ1JhdGVWc1RhcmdldCA9IDBcblx0XHRcdFx0XHR0aGlzLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCA9IDBcblx0XHRcdFx0XHR0aGlzLmZsYXRSYXRlQ29zdFBlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy5jb3N0UGVyQWNyZURpZmZlcmVuY2UgPSAwXG5cdFx0XHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0ID0gMFxuXHRcdFx0XHRcdHRoaXMudG90YWxTZWVkQ29zdERpZmZlcmVudGlhbCA9IDBcblx0XHRcdFx0XHR0aGlzLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSA9IDBcblx0XHRcdFx0XHR0aGlzLm5ldFJldmVudWVMYlBlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlQmVuZWZpdCA9IDBcblxuXHRcdFx0XHRcdC8vIE90aGVyXG5cdFx0XHRcdFx0dGhpcy5zZWVkc1BlckxiID0gc2VlZHNQZXJMYlxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHNldENlcnRpZmllZFNlZWREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdHVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDAuOTVcblx0XHRcdFx0XHR1c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgPSAwLjk4NVxuXHRcdFx0XHRcdHVzZXJEYXRhLmNvc3RQZXJDV1QgPSAxOFxuXHRcdFx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0XHRcdHVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAzLjVcblx0XHRcdFx0XHR1c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAxMDAwMDAwXG5cdFx0XHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdFx0XHR1c2VyRGF0YS5hY3Jlc1BsYW50ZWQgPSAyNTAwXG5cdFx0XHRcdFx0dXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblx0XHRcdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdFx0XHR1c2VyRGF0YS5pc0NlcnRpZmllZCA9IHRydWVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzZXRTYXZlZFNlZWREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdHVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDAuOTNcblx0XHRcdFx0XHR1c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgPSAwLjk1XG5cdFx0XHRcdFx0dXNlckRhdGEuY29zdFBlckNXVCA9IDcuNDZcblx0XHRcdFx0XHR1c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gODBcblx0XHRcdFx0XHR1c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gMy41XG5cdFx0XHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gMTAwXG5cdFx0XHRcdFx0dXNlckRhdGEuYWNyZXNQbGFudGVkID0gMjUwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHRcdFx0dXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXG5cdFx0XHRcdFx0dXNlckRhdGEuaXNDZXJ0aWZpZWQgPSBmYWxzZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGNhbGN1bGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0ZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgPSBkYXRhLnVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiAvIChkYXRhLnNlZWRzUGVyTGIgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCAqIGRhdGEudXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uKVxuXG5cdFx0XHRcdFx0ZGF0YS5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkICogZGF0YS5zZWVkc1BlckxiXG5cblx0XHRcdFx0XHRkYXRhLmNvc3RQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5jb3N0UGVyQ1dUICogKGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkIC8gMTAwKVxuXG5cdFx0XHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0ID0gZGF0YS5jb3N0UGVyQWNyZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdFx0XHRkYXRhLmFjdHVhbFNlZWRpbmdSYXRlID0gZGF0YS51c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSAqIGRhdGEuc2VlZHNQZXJMYiAqIGRhdGEudXNlckRhdGEucGVyY2VudFB1cmVTZWVkICogZGF0YS51c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb25cblxuXHRcdFx0XHRcdGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCA9IGRhdGEuYWN0dWFsU2VlZGluZ1JhdGUgLSBkYXRhLnVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvblxuXG5cdFx0XHRcdFx0ZGF0YS5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QgPSBkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgPCAwXG5cdFx0XHRcdFx0XHQ/IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCAqIGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZVxuXHRcdFx0XHRcdFx0OiAoZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IC8gMTAwMDAwKSAqIGRhdGEudXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCAqIGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSAqIC0xXG5cblx0XHRcdFx0XHRkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmNvc3RQZXJDV1QgKiAoZGF0YS51c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSAvIDEwMClcblxuXHRcdFx0XHRcdGRhdGEuY29zdFBlckFjcmVEaWZmZXJlbmNlID0gZGF0YS5jb3N0UGVyQWNyZSAtIGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZVxuXG5cdFx0XHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0RmxhdFJhdGUgPSBkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmUgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0RmxhdFJhdGVEaWZmZXJlbnRpYWwgPSBkYXRhLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdFx0XHRkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5pc0NlcnRpZmllZCA/IChkYXRhLnVzZXJEYXRhLnNlYXNvbi50b0xvd2VyQ2FzZSgpID09PSAnc3ByaW5nJyA/IDQuNSA6IDcuNSkgOiAwXG5cblx0XHRcdFx0XHRkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgPSAoKGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSArIGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUpICogZGF0YS51c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWQpIC0gZGF0YS50b3RhbFNlZWRDb3N0XG5cblx0XHRcdFx0XHRkYXRhLm5ldFJldmVudWVMYlBlckFjcmUgPSAoKGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSArIGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgKyBkYXRhLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCkgKiBkYXRhLnVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZCkgLSBkYXRhLnRvdGFsU2VlZENvc3RcblxuXHRcdFx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZUJlbmVmaXQgPSBkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgLSBkYXRhLm5ldFJldmVudWVMYlBlckFjcmVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBnZXREYXRhU2VyaWVzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHRcdFx0dmFyIHNlcmllcyA9IFtdXG5cblx0XHRcdFx0XHRmb3IgKHZhciBzZWVkc1BlckxiID0gU0VFRFNfUEVSX0xCX01JTjsgc2VlZHNQZXJMYiA8PSBTRUVEU19QRVJfTEJfTUFYOyBzZWVkc1BlckxiICs9IFNFRURTX1BFUl9MQl9TVEVQKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YUl0ZW0gPSBuZXcgT3B0aW1hbFNlZWRpbmdSYXRlSW1wYWN0RGF0YShzZWVkc1BlckxiKVxuXG5cdFx0XHRcdFx0XHQvLyBNZXJnZSBpbiB0aGUgdXNlckRhdGEgcHJvcGVydGllc1xuXHRcdFx0XHRcdFx0ZGF0YUl0ZW0udXNlckRhdGEgPSB7fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgcHJvcCBpbiB1c2VyRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRpZiAodXNlckRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdHlwZW9mIHVzZXJEYXRhW3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUl0ZW0udXNlckRhdGFbcHJvcF0gPSB1c2VyRGF0YVtwcm9wXVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNhbGN1bGF0ZShkYXRhSXRlbSlcblx0XHRcdFx0XHRcdHNlcmllcy5wdXNoKGRhdGFJdGVtKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBzZXJpZXNcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBnZXRTZXJpZXNDb2x1bW5EYXRhID0gZnVuY3Rpb24gKHNlcmllcywgY29sdW1uKSB7XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBbXVxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBzZXJpZXNbaV07IGkrKykge1xuXHRcdFx0XHRcdFx0ZGF0YS5wdXNoKHNlcmllc1tpXVtjb2x1bW5dKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBkYXRhXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFNlZWRDYWxjVXNlckRhdGE6IFNlZWRDYWxjVXNlckRhdGEsXG5cdFx0XHRcdFx0Z2V0RGF0YVNlcmllczogZ2V0RGF0YVNlcmllcyxcblx0XHRcdFx0XHRnZXRTZXJpZXNDb2x1bW5EYXRhOiBnZXRTZXJpZXNDb2x1bW5EYXRhXG5cdFx0XHRcdH1cblx0XHRcdH0oKSlcblxuXHRcdFx0dmFyIFNlZWRDYWxjID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gQ09OU1RBTlRTXG5cdFx0XHRcdHZhciBDSEFSVF9NT0JJTEVfU01BTExfTUFYX1dJRFRIID0gNDAwICAgLy8gbWF4IHdpZHRoIGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0XHRcdHZhciBDSEFSVF9NT0JJTEVfU01BTExfTUFYX0hFSUdIVCA9IDI2NyAgLy8gbWF4IGhlaWdodCBmb3Igc21hbGwgZGV2aWNlc1xuXHRcdFx0XHR2YXIgQ0hBUlRfTU9CSUxFX01BWF9XSURUSCA9IDYwMCAgIC8vIG1heCB3aWR0aCBmb3IgbW9iaWxlIGRldmljZXNcblx0XHRcdFx0dmFyIENIQVJUX01PQklMRV9NQVhfSEVJR0hUID0gMzAwICAvLyBtYXggaGVpZ2h0IGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdFx0XHR2YXIgQ0hBUlRfTUFYX1dJRFRIID0gNjAwXG5cdFx0XHRcdHZhciBDSEFSVF9NQVhfSEVJR0hUID0gMzAwXG5cdFx0XHRcdHZhciBDT0xPUl9EQVJLX1JFRCA9ICcjNTI5M0FCJ1xuXHRcdFx0XHR2YXIgQ09MT1JfTElHSFRfUkVEID0gJyM3MmIxYzgnXG5cdFx0XHRcdHZhciBDT0xPUl9EQVJLX0JMVUUgPSAnIzM3MzgzNidcblx0XHRcdFx0dmFyIENPTE9SX0xJR0hUX0JMVUUgPSAnIzY0NjU2MCdcblxuXHRcdFx0XHQvLyBQUk9QRVJUSUVTXG5cblx0XHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhID0gbmV3IFNlZWRDYWxjRGF0YS5TZWVkQ2FsY1VzZXJEYXRhKHRydWUpXG5cdFx0XHRcdHZhciBzYXZlZFNlZWREYXRhID0gbmV3IFNlZWRDYWxjRGF0YS5TZWVkQ2FsY1VzZXJEYXRhKClcblxuXHRcdFx0XHQvLyBNRVRIT0RTXG5cblx0XHRcdFx0dmFyIGlzTW9iaWxlU21hbGwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpIDwgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9XSURUSFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGlzTW9iaWxlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKSA8IENIQVJUX01PQklMRV9NQVhfV0lEVEhcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBjYWxjdWxhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LmFkZCgnY2FsY3VsYXRlZCcpXG5cblx0XHRcdFx0XHQvLyBHZXQgZm9ybSBmaWVsZCBkYXRhXG5cdFx0XHRcdFx0dXBkYXRlVXNlckRhdGFGcm9tRm9ybSgpXG5cblx0XHRcdFx0XHQvLyBTY3JvbGwgdG8gZmlyc3QgZ3JhcGggKHNldCBhIGRlbGF5IHRvIGFsbG93IHRoZSBzZWN0aW9ucyB0byBiZWNvbWUgdmlzaWJsZSlcblx0XHRcdFx0XHQvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIFx0dmFyIGhlYWRlckJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXNpdGUtbmF2LXdyYXBwZXItaGVhZGVyJyksXG5cdFx0XHRcdFx0Ly8gXHRcdGhlYWRlckJhckZpeGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaGVhZGVyQmFyKS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJyxcblx0XHRcdFx0XHQvLyBcdFx0b2Zmc2V0ID0gaGVhZGVyQmFyRml4ZWQgPyAtaGVhZGVyQmFyLmNsaWVudEhlaWdodCA6IDAsXG5cdFx0XHRcdFx0Ly8gXHRcdHRvcCA9IFV0aWxpdHkuZ2V0VG9wKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxjLXNlY3Rpb24nKSkgKyBvZmZzZXRcblx0XHRcdFx0XHQvLyBcdHNtb290aFNjcm9sbCh0b3ApXG5cdFx0XHRcdFx0Ly8gfSwgNTApXG5cblx0XHRcdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0XHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKGNlcnRpZmllZFNlZWREYXRhKVxuXHRcdFx0XHRcdHZhciBzYXZlZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoc2F2ZWRTZWVkRGF0YSlcblx0XHRcdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cblx0XHRcdFx0XHQvLyBTZXQgdGhlIENhbGN1bGF0ZSBidXR0b24gdGV4dFxuXHRcdFx0XHRcdHZhciBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRlJylcblx0XHRcdFx0XHRpZiAoYnRuLnRleHRDb250ZW50ID09PSAnQ2FsY3VsYXRlJykge1xuXHRcdFx0XHRcdFx0YnRuLnRleHRDb250ZW50ID0gJ1JlLUNhbGN1bGF0ZSc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHVwZGF0ZVVzZXJEYXRhRnJvbUZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5jb3N0UGVyQ1dUID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlKVxuXG5cdFx0XHRcdFx0c2F2ZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRzYXZlZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRzYXZlZFNlZWREYXRhLmNvc3RQZXJDV1QgPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlKVxuXG5cdFx0XHRcdFx0Ly8gVGhlc2UgZmllbGRzIGhhdmUgdGhlIHNhbWUgdmFsdWVzIGluIGJvdGggZGF0YXNldHNcblx0XHRcdFx0XHR2YXIgc2Vhc29ucyA9IGZvcm1bJ2Nyb3Bfc2Vhc29uJ11cblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlYXNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChzZWFzb25zW2ldLmNoZWNrZWQpIGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9IHNhdmVkU2VlZERhdGEuc2Vhc29uID0gc2Vhc29uc1tpXS52YWx1ZVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPSBzYXZlZFNlZWREYXRhLnNlYXNvbiA9IGZvcm1bJ2Nyb3Bfc2Vhc29uJ10udmFsdWVcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gc2F2ZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3RhcmdldF95aWVsZCddLnZhbHVlKVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSBzYXZlZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3Bfd2hlYXRfcHJpY2UnXS52YWx1ZSlcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSBzYXZlZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbiddLnZhbHVlKVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gc2F2ZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZSddLnZhbHVlKVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmFjcmVzUGxhbnRlZCA9IHNhdmVkU2VlZERhdGEuYWNyZXNQbGFudGVkID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX2FjcmVzX3BsYW50ZWQnXS52YWx1ZSlcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gc2F2ZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBzYXZlZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZyddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXG5cdFx0XHRcdFx0Zm9ybVsnY2VydF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gKiAxMDBcblx0XHRcdFx0XHRmb3JtWydjZXJ0X3NlZWRfcHVyZV9zZWVkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdFx0XHRmb3JtWydjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuY29zdFBlckNXVFxuXG5cdFx0XHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gKiAxMDBcblx0XHRcdFx0XHRmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdFx0XHRmb3JtWydzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEuY29zdFBlckNXVFxuXG5cdFx0XHRcdFx0Ly8gVGhlc2UgZmllbGRzIGhhdmUgdGhlIHNhbWUgdmFsdWVzIGluIGJvdGggZGF0YXNldHMsIHNvIGp1c3QgdXNlIHRoZSBmaXJzdCBvbmVcblx0XHRcdFx0XHQvLyBmb3JtWydjcm9wX3NlYXNvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uIC8vIGJyb2tlbiBpbiBTYWZhcmlcblx0XHRcdFx0XHRpZiAoY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID09PSAnd2ludGVyJykge1xuXHRcdFx0XHRcdFx0Zm9ybVsnY3JvcF9zZWFzb24nXVswXS5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRmb3JtWydjcm9wX3NlYXNvbiddWzFdLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlXG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF93aGVhdF9wcmljZSddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbFxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvblxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlXG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF9hY3Jlc19wbGFudGVkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWRcblx0XHRcdFx0XHRmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0XG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgc2hvd1Jlc2V0TGluayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0XHRcdHZhciByZXNldExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpO1xuXHRcdFx0XHRcdHJlc2V0TGluay5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBoaWRlUmVzZXRMaW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmVzZXQgbGluayBpcyB2aXNpYmxlXG5cdFx0XHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRcdFx0cmVzZXRMaW5rLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJlc2V0SW5wdXRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIFJlc2V0IHRoZSBkYXRhIHZhbHVlcyB0byBkZWZhdWx0c1xuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnJlc2V0VG9EZWZhdWx0cygpXG5cdFx0XHRcdFx0c2F2ZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIGZvcm0gZmllbGQgdmFsdWVzXG5cdFx0XHRcdFx0dXBkYXRlRm9ybUZyb21Vc2VyRGF0YSgpXG5cblx0XHRcdFx0XHQvLyBIaWRlIHRoZSByZXNldCBsaW5rIGFnYWluXG5cdFx0XHRcdFx0aGlkZVJlc2V0TGluaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGdldENoYXJ0Q2FudmFzSHRtbCA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRcdHZhciB2aWV3cG9ydFdpZHRoID0gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKClcblx0XHRcdFx0XHR2YXIgY2FudmFzU2l6ZSA9IHtcblx0XHRcdFx0XHRcdHdpZHRoOiBpc01vYmlsZSgpID8gdmlld3BvcnRXaWR0aCA6IENIQVJUX01BWF9XSURUSCxcblx0XHRcdFx0XHRcdGhlaWdodDogaXNNb2JpbGVTbWFsbCgpID8gQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9IRUlHSFQgOiBpc01vYmlsZSgpID8gQ0hBUlRfTU9CSUxFX01BWF9IRUlHSFQgOiBDSEFSVF9NQVhfSEVJR0hUXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGh0bWwgPSAnPGNhbnZhcyBpZD1cIicgKyBpZCArICdcIiBjbGFzcz1cImdyYXBoIGJsb2NrLWNlbnRlclwiIHdpZHRoPVwiJyArIGNhbnZhc1NpemUud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGNhbnZhc1NpemUuaGVpZ2h0ICsgJ1wiPjwvY2FudmFzPidcblxuXHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgc2V0Q2hhcnREZWZhdWx0cyA9IGZ1bmN0aW9uIChhbmltYXRlKSB7XG5cdFx0XHRcdFx0Ly8gR2xvYmFsIGNoYXJ0IGNvbmZpZ1xuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udEZhbWlseSA9ICdcIkdvdGhhbSBTU20gQVwiLCBcIkdvdGhhbSBTU20gQlwiLCBMdWNpZGEgR3JhbmRlLCBcIkx1Y2lkYSBHcmFuZGVcIiwgTHVjaWRhIFNhbnMgVW5pY29kZSwgXCJMdWNpZGEgU2FucyBVbmljb2RlXCIsIEx1Y2lkYSBTYW5zLCBcIkx1Y2lkYSBTYW5zXCIsIEdlbmV2YSwgVmVyZGFuYSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZidcblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTZcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5tYWludGFpbkFzcGVjdFJhdGlvID0gZmFsc2VcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLmJvcmRlcldpZHRoID0gMlxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLmZpbGwgPSBmYWxzZVxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDVcblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuYm9yZGVyV2lkdGggPSAyXG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuYW5pbWF0aW9uLmR1cmF0aW9uID0gYW5pbWF0ZSA9PT0gZmFsc2UgPyAwIDogMTAwMFxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmxlZ2VuZC5kaXNwbGF5ID0gZmFsc2VcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5ldmVudHMgPSB1bmRlZmluZWQgLy8gaWdub3JlIG1vdXNlL3RvdWNoIGV2ZW50c1xuXG5cdFx0XHRcdFx0Ly8gc3BlY2lhbCBzZXR0aW5ncyBmb3Igc21hbGxlciBzY3JlZW4gc2l6ZXNcblx0XHRcdFx0XHRpZiAoaXNNb2JpbGVTbWFsbCgpKSB7XG5cdFx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTFcblx0XHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSAyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc01vYmlsZSgpKSB7XG5cdFx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTJcblx0XHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSA0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHVwZGF0ZUdyYXBoQ29tcGFyZUltcGFjdCA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcykge1xuXHRcdFx0XHRcdC8vIFNldCB1cCBncmFwaCBjYW52YXNcblx0XHRcdFx0XHR2YXIgY2hhcnRJZCA9ICdncmFwaF9jb21wYXJlX2ltcGFjdCdcblx0XHRcdFx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3NlY3Rpb24nKVxuXHRcdFx0XHRcdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfd3JhcHBlcicpXG5cdFx0XHRcdFx0dmFyIGxlZ2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX2xlZ2VuZCcpXG5cdFx0XHRcdFx0dmFyIGNhbnZhcyA9IGdldENoYXJ0Q2FudmFzSHRtbChjaGFydElkKVxuXHRcdFx0XHRcdHZhciBtb2JpbGUgPSBpc01vYmlsZSgpXG5cdFx0XHRcdFx0dmFyIG1vYmlsZVNtYWxsID0gaXNNb2JpbGVTbWFsbCgpXG5cblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlICdoaWRkZW4nIENTUyBjbGFzc1xuXHRcdFx0XHRcdHNlY3Rpb24uY2xhc3NOYW1lID0gc2VjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKlxcYmhpZGRlblxcYi9nLCAnJylcblxuXHRcdFx0XHRcdC8vIGRlc3Ryb3kgYW5kIHJlY3JlYXRlIHRoZSBjYW52YXNcblx0XHRcdFx0XHRpZiAod3JhcHBlci5oYXNDaGlsZE5vZGVzKCkpIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5jaGlsZE5vZGVzWzBdKVxuXHRcdFx0XHRcdHdyYXBwZXIuaW5uZXJIVE1MID0gY2FudmFzXG5cblx0XHRcdFx0XHQvLyBHZXQgdGhlIHgtYXhpcyBsYWJlbHNcblx0XHRcdFx0XHR2YXIgeExhYmVscyA9IFtdXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGNlcnRpZmllZFNlZWREYXRhU2VyaWVzW2ldOyBpKyspIHtcblx0XHRcdFx0XHRcdHhMYWJlbHMucHVzaChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1tpXS5zZWVkc1BlckxiLnRvU3RyaW5nKCkpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQ29uZmlndXJlIGFuZCByZW5kZXIgdGhlIGNoYXJ0XG5cdFx0XHRcdFx0dmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQpXG5cdFx0XHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2xpbmUnLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRsYWJlbHM6IHhMYWJlbHMsXG5cdFx0XHRcdFx0XHRcdGRhdGFzZXRzOiBbe1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgJ29wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUnKSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ2NpcmNsZScsXG5cdFx0XHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX2NpcmNsZS1saW5lLWJsdWUtc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsICduZXRSZXZlbnVlTGJQZXJBY3JlJyksXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAnY2lyY2xlJyxcblx0XHRcdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fY2lyY2xlLWxpbmUtYmx1ZS5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKHNhdmVkU2VlZERhdGFTZXJpZXMsICdvcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlJyksXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFJhZGl1czogQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyArIDEsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ3JlY3QnLFxuXHRcdFx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19zcXVhcmUtbGluZS1kYXJrLXNvbGlkLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoc2F2ZWRTZWVkRGF0YVNlcmllcywgJ25ldFJldmVudWVMYlBlckFjcmUnKSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50UmFkaXVzOiBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzICsgMSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAncmVjdCcsXG5cdFx0XHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX3NxdWFyZS1saW5lLWRhcmsucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdFx0XHR4QXhlczogW3tcblx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiAnYm90dG9tJyxcblx0XHRcdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdTZWVkcy9MYicsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpbmRleCAlIDIgPT09IDAgPyBVdGlsaXR5LmFkZERpZ2l0U2VwYXJhdG9ycyh2YWx1ZSkgOiAnJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHRcdFx0eUF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnTmV0IFJldmVudWUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZm9ybWF0Q3VycmVuY3kodmFsdWUsIGZhbHNlKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cblx0XHQgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICQoJyNjb21wYXJlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuXHRcdCAgICAgIH0sIDE1MDApXG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgbGVnZW5kXG5cdFx0XHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHRcdFx0dmFyIGxlZ2VuZEh0bWwgPSAnPGRpdj4nXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGl0ZW07IHR5cGVvZiAoaXRlbSA9IGNoYXJ0LmNvbmZpZy5kYXRhLmRhdGFzZXRzW2ldKSAhPT0gJ3VuZGVmaW5lZCc7IGkrKykge1xuXHRcdFx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48aW1nIGNsYXNzPVwiY2FsYy1sZWdlbmQtaWNvblwiIHNyYz1cIicgKyBpdGVtLmxlZ2VuZEljb25JbWFnZSArICdcIiBhbHQ9XCJcIj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzwvZGl2Pic7XG5cdFx0XHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB1cGRhdGVHcmFwaE1heGltaXplUmV2ZW51ZSA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcykge1xuXHRcdFx0XHRcdC8vIFJlc2V0IHNvbWUgZ2xvYmFsIGNoYXJ0IGRlZmF1bHRzXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLm1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlXG5cblx0XHRcdFx0XHQvLyBTZXQgdXAgZ3JhcGggY2FudmFzXG5cdFx0XHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfbWF4aW1pemVfcmV2ZW51ZSdcblx0XHRcdFx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3NlY3Rpb24nKVxuXHRcdFx0XHRcdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfd3JhcHBlcicpXG5cdFx0XHRcdFx0dmFyIGxlZ2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX2xlZ2VuZCcpXG5cdFx0XHRcdFx0dmFyIGNhbnZhcyA9IGdldENoYXJ0Q2FudmFzSHRtbChjaGFydElkKVxuXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSAnaGlkZGVuJyBDU1MgY2xhc3Ncblx0XHRcdFx0XHRzZWN0aW9uLmNsYXNzTmFtZSA9IHNlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoL1xccypcXGJoaWRkZW5cXGIvZywgJycpXG5cblx0XHRcdFx0XHQvLyBkZXN0cm95IGFuZCByZWNyZWF0ZSB0aGUgY2FudmFzXG5cdFx0XHRcdFx0aWYgKHdyYXBwZXIuaGFzQ2hpbGROb2RlcygpKSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuY2hpbGROb2Rlc1swXSlcblx0XHRcdFx0XHR3cmFwcGVyLmlubmVySFRNTCA9IGNhbnZhc1xuXG5cdFx0XHRcdFx0Ly8gQ29uZmlndXJlIGFuZCByZW5kZXIgdGhlIGNoYXJ0XG5cdFx0XHRcdFx0dmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQpXG5cdFx0XHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2JhcicsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdGxhYmVsczogW10sXG5cdFx0XHRcdFx0XHRcdGRhdGFzZXRzOiBbe1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBbIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzWyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcy5sZW5ndGggLSAxIF0ub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSBdLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRURcblx0XHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFsgc2F2ZWRTZWVkRGF0YVNlcmllc1sgc2F2ZWRTZWVkRGF0YVNlcmllcy5sZW5ndGggLSAxIF0ubmV0UmV2ZW51ZUxiUGVyQWNyZSBdLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRVxuXHRcdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdFx0XHR5QXhlczogW3tcblx0XHRcdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdOZXQgUmV2ZW51ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblxuXHRcdCAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgJCgnI3JldmVudWVHcmFwaCcpLnZhbChjaGFydC50b0Jhc2U2NEltYWdlKCkpXG5cdFx0ICAgICAgfSwgMTUwMClcblxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBsZWdlbmRcblx0XHRcdFx0XHRsZWdlbmQuY2xhc3NMaXN0LmFkZCgnY2FsYy1jaGFydC10eXBlLScgKyBjaGFydC5jb25maWcudHlwZSk7XG5cblx0XHRcdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMCwgaXRlbTsgdHlwZW9mIChpdGVtID0gY2hhcnQuY29uZmlnLmRhdGEuZGF0YXNldHNbaV0pICE9PSAndW5kZWZpbmVkJzsgaSsrKSB7XG5cdFx0XHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8ZGl2PjxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtaWNvblwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgKyAnXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWxhYmVsXCI+JyArIGl0ZW0ubGFiZWwgKyAnPC9zcGFuPjwvZGl2Pidcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdFx0XHRsZWdlbmQuaW5uZXJIVE1MID0gbGVnZW5kSHRtbFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHVwZGF0ZUdyYXBocyA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcywgYW5pbWF0ZSkge1xuXHRcdFx0XHRcdHNldENoYXJ0RGVmYXVsdHMoYW5pbWF0ZSlcblx0XHRcdFx0XHR1cGRhdGVHcmFwaENvbXBhcmVJbXBhY3QoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cdFx0XHRcdFx0dXBkYXRlR3JhcGhNYXhpbWl6ZVJldmVudWUoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBFVkVOVFNcblxuXHRcdFx0XHR2YXIgb25DYWxjdWxhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0XHRmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG5cdFx0XHRcdFx0XHQgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCAgJCgnLmNhbGMtZmllbGQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0ICAgIGlmICggJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcInJlZFwifSlcblx0XHRcdFx0XHRcdFx0XHRcdGlzVmFsaWQgPSBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaXNWYWxpZClcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCIjNjY2NjVjXCJ9KVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0XHQgIHJldHVybiBpc1ZhbGlkO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHZhciBnbyA9IHZhbGlkYXRlRm9ybSgpXG5cdFx0XHRcdFx0XHR2YXIgZXJyb3JGb3JtTWVzc2FnZSA9ICc8c3BhbiBjbGFzcz1cImVycm9yRm9ybU1lc3NhZ2VcIj5Zb3UgbXVzdCBjb21wbGV0ZSBhbGwgZmllbGRzIGFib3ZlIHRvIGNhbGN1bGF0ZS48L3NwYW4+J1xuXHRcdFx0XHRcdFx0aWYgKCBnbyA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpdCBpcyB2YWxpZCcpXG5cdFx0XHRcdFx0XHRcdCQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcblx0XHRcdFx0XHRcdFx0JCgnI2dyYXBoX2NvbXBhcmVfaW1wYWN0X3NlY3Rpb24gLCAjZ3JhcGhfbWF4aW1pemVfcmV2ZW51ZV9zZWN0aW9uJykuc2xpZGVEb3duKClcblx0XHRcdFx0XHRcdFx0JCgnLmFjdGlvbkRhdGEnKS5zaG93KCkuc2xpZGVEb3duKClcblx0XHRcdFx0XHRcdFx0Y2FsY3VsYXRlKClcblx0XHRcdFx0XHRcdH1lbHNlIGlmICggZ28gPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2l0IGlzIG5vdCB2YWxpZCcpXG5cdFx0XHRcdFx0XHRcdGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7XG5cblx0XHRcdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdCQoJyN5aWVsZEltcGFjdEZvclVuZGVyc2VlZGluZycpLmFmdGVyKGVycm9yRm9ybU1lc3NhZ2UpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9uRm9ybUlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRcdFx0Ly8gU2hvdyB0aGUgJ3Jlc2V0IGZvcm0nIGxpbmsgd2hlbiBkZXZpYXRpbmcgZnJvbSB0aGUgZGVmYXVsdHNcblx0XHRcdFx0XHRzaG93UmVzZXRMaW5rKClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvblJlc2V0Rm9ybSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0XHRcdC8vIFJlc2V0IHRoZSBkYXRhIGFuZCBmb3JtIHZhbHVlc1xuXHRcdFx0XHRcdHJlc2V0SW5wdXRzKClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvbkVtYWlsRGF0YSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0XHRcdC8vIE5PVEU6IFRoZSBnZW5lcmF0ZWQgUERGIHdpbGwgaGF2ZSB0aGUgZGF0YSB0aGF0IGlzIGN1cnJlbnRseSByZXByZXNlbnRlZCBpbiB0aGUgY2hhcnRzLiBJZiB0aGUgdXNlciBoYXMgY2hhbmdlZCBmb3JtIGZpZWxkIHZhbHVlcywgYnV0IG5vdCBjbGlja2VkIFwiQ2FsY3VsYXRlXCIsIHRoZW4gdGhlc2UgYXJlIG5vdCByZWZsZWN0ZWQgaW4gdGhlIG91dHB1dC5cblxuXHRcdFx0XHRcdC8vIFRPRE86IFNob3cgZW1haWwgZmllbGRzIGZvciB1c2VyIGlucHV0LiBTdWJtaXR0aW5nIHRoaXMgZm9ybSB3aWxsIGV4ZWN1dGUgdGhlIGVtYWlsRGF0YSgpIG1ldGhvZC5cblx0XHRcdFx0XHRjb25zb2xlLmluZm8oJ0VtYWlsIFBERicpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBPbmx5IHJlZHJhdyB0aGUgZ3JhcGhzIGlmIHRoZXkgaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgYXQgbGVhc3Qgb25jZSBhbHJlYWR5XG5cdFx0XHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXHRcdFx0XHRcdGlmIChmb3JtLmNsYXNzTGlzdC5jb250YWlucygnY2FsY3VsYXRlZCcpKSB7XG5cdFx0XHRcdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0XHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoY2VydGlmaWVkU2VlZERhdGEpXG5cdFx0XHRcdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKHNhdmVkU2VlZERhdGEpXG5cdFx0XHRcdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMsIGZhbHNlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvbkRvd25sb2FkUGRmID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRcdFx0Ly8gTk9URTogVGhlIGdlbmVyYXRlZCBQREYgd2lsbCBoYXZlIHRoZSBkYXRhIHRoYXQgaXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBjaGFydHMuIElmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGZvcm0gZmllbGQgdmFsdWVzLCBidXQgbm90IGNsaWNrZWQgXCJDYWxjdWxhdGVcIiwgdGhlbiB0aGVzZSBhcmUgbm90IHJlZmxlY3RlZCBpbiB0aGUgb3V0cHV0LlxuXG5cdFx0XHRcdFx0Ly8gVE9ETzogVHJpZ2dlcmluZyB0aGlzIGhhbmRsZXIgd2lsbCBleGVjdXRlIHRoZSBkb3dubG9hZFBkZigpIG1ldGhvZFxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbygnRG93bmxvYWQgUERGJylcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB3aXJlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBmb3JtRWxlbWVudHMgPSAkKCcjc2VlZF9jYWxjX2Zvcm0gaW5wdXQsICNzZWVkX2NhbGNfZm9ybSB0ZXh0YXJlYSwgI3NlZWRfY2FsY19mb3JtIHNlbGVjdCcpXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmb3JtRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBlbCA9IGZvcm1FbGVtZW50c1tpXVxuXHRcdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25Gb3JtSW5wdXRDaGFuZ2UpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGNhbGN1bGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdGUnKVxuXHRcdFx0XHRcdGNhbGN1bGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2FsY3VsYXRlKVxuXG5cdFx0XHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gcmVzZXQgdG8gdGhlIGRlZmF1bHQgdmFsdWVzXG5cdFx0XHRcdFx0dmFyIHJlc2V0Rm9ybUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpXG5cdFx0XHRcdFx0cmVzZXRGb3JtTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uUmVzZXRGb3JtKVxuXG5cdFx0XHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gZW1haWwgdGhlIHJlc3VsdHMgYXMgYSBQREZcblx0XHRcdFx0XHQvL3ZhciBlbWFpbERhdGFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWxfZGF0YScpXG5cdFx0XHRcdFx0Ly9lbWFpbERhdGFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkVtYWlsRGF0YSlcblxuXHRcdFx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIGRvd25sb2FkIHRoZSByZXN1bHRzIGFzIGEgUERGXG5cdFx0XHRcdFx0Ly92YXIgZG93bmxvYWRQZGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmxvYWRfcGRmJylcblx0XHRcdFx0XHQvL2Rvd25sb2FkUGRmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Eb3dubG9hZFBkZilcblxuXHRcdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBJbml0aWFsaXplIHVzZXIgZm9ybSBpbnB1dHMgd2l0aCBkZWZhdWx0IGRhdGFcblx0XHRcdFx0XHR1cGRhdGVGb3JtRnJvbVVzZXJEYXRhKClcblxuXHRcdFx0XHRcdC8vIFdpcmUgdXAgaW50ZXJhY3RpdmUgZXZlbnRzXG5cdFx0XHRcdFx0d2lyZUV2ZW50cygpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4geyBpbml0OiBpbml0IH1cblx0XHRcdH0oKSlcblxuXHRcdFx0U2VlZENhbGMuaW5pdCgpXG5cdFx0fSlcblxuXG5cdH1cbmlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpbmQtc2VlZC1zdXBwbGllcicpICkge1xuICAkKCcjc3RhdGVzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIGNoYW5nZVN0YXRlKClcbiAgfSlcblxuICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZSAoKSB7XG4gICAgaWYgKCQoJyNyZXN1bHRzJykuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAkKCcjcmVzdWx0cycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgIH1cbiAgICB2YXIgc2VsZWN0ZWRzdGF0ZSA9ICQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKVxuICAgICQoJy5zdXBwbGllciwgLnJlcCcpLmhpZGUoKVxuICAgICQoJy5zdXBwbGllcnNfX2N0bl9fYW5jaG9yJykuaGlkZSgpXG4gICAgJCgnLicgKyBzZWxlY3RlZHN0YXRlKS5zaG93KClcblxuICAgIGlmICghJCgnLicgKyBzZWxlY3RlZHN0YXRlKVswXSkge1xuICAgICAgaWYgKCQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCkgPT09ICdTZWxlY3QgYSBzdGF0ZScpIHtcbiAgICAgICAgJCgnI3Jlc3VsdHMnKS5oaWRlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNyZXN1bHRzJykuc2hvdygpXG4gICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLnNob3coKVxuICAgICAgICB2YXIgc3RhdGVDaG9zZW4gPSAkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpXG4gICAgICAgICQoJy5mYWlsdXJlU3BhbicpLnRleHQoc3RhdGVDaG9zZW4gfHwgXCJ5b3VyIHN0YXRlXCIpXG4gICAgICAgICQoJy5yZXBfX2N0bicpLmhpZGUoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLmhpZGUoKVxuICAgICAgICAkKCcucmVwX19jdG4nKS5zaG93KClcbiAgICAgICAgJCgnLnN1cHBsaWVyc19fY3RuX19hbmNob3InKS5zaG93KClcbiAgICB9XG4gIH1cblxuICAvLyBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yKVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MgKHBvc2l0aW9uKSB7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKVxuICAgIHZhciBHRU9DT0RJTkcgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9JyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUgKyAnJmtleT1BSXphU3lBSWFwUWJCckJjSUZUdUlsTXhiWGJNdHkzZFQ3UjFiMmsnXG5cbiAgICAkLmdldEpTT04oR0VPQ09ESU5HKS5kb25lKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgdmFyIHRoZXN0YXRlID0gbG9jYXRpb24ucmVzdWx0c1s2XS5hZGRyZXNzX2NvbXBvbmVudHNbMF0uc2hvcnRfbmFtZVxuICAgICAgJCgnI3N0YXRlc2VsZWN0JykudmFsKHRoZXN0YXRlKVxuICAgICAgY2hhbmdlU3RhdGUoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBlcnJvciAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKVxuICB9XG59XG4vKlxuICAgICBfIF8gICAgICBfICAgICAgIF9cbiBfX198IChfKSBfX198IHwgX18gIChfKV9fX1xuLyBfX3wgfCB8LyBfX3wgfC8gLyAgfCAvIF9ffFxuXFxfXyBcXCB8IHwgKF9ffCAgIDwgXyB8IFxcX18gXFxcbnxfX18vX3xffFxcX19ffF98XFxfKF8pLyB8X19fL1xuICAgICAgICAgICAgICAgICAgIHxfXy9cblxuIFZlcnNpb246IDEuNi4wXG4gIEF1dGhvcjogS2VuIFdoZWVsZXJcbiBXZWJzaXRlOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW9cbiAgICBEb2NzOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2tcbiAgICBSZXBvOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrXG4gIElzc3VlczogaHR0cDovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9zbGljay9pc3N1ZXNcblxuICovXG4vKiBnbG9iYWwgd2luZG93LCBkb2N1bWVudCwgZGVmaW5lLCBqUXVlcnksIHNldEludGVydmFsLCBjbGVhckludGVydmFsICovXG4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG5cbn0oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgU2xpY2sgPSB3aW5kb3cuU2xpY2sgfHwge307XG5cbiAgICBTbGljayA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgaW5zdGFuY2VVaWQgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIFNsaWNrKGVsZW1lbnQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgICAgIHZhciBfID0gdGhpcywgZGF0YVNldHRpbmdzO1xuXG4gICAgICAgICAgICBfLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBhcHBlbmREb3RzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXJvbGU9XCJub25lXCIgY2xhc3M9XCJzbGljay1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXJvbGU9XCJub25lXCIgY2xhc3M9XCJzbGljay1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHRcIiB0YWJpbmRleD1cIjBcIiByb2xlPVwiYnV0dG9uXCI+TmV4dDwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdlYXNlJyxcbiAgICAgICAgICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1yb2xlPVwibm9uZVwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiAvPicpLnRleHQoaSArIDEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG90c0NsYXNzOiAnc2xpY2stZG90cycsXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgZWRnZUZyaWN0aW9uOiAwLjM1LFxuICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uRG90c0hvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXNwb25kVG86ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcm93czogMSxcbiAgICAgICAgICAgICAgICBydGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlOiAnJyxcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJSb3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICAgICAgc3dpcGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3dpcGVUb1NsaWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2hUaHJlc2hvbGQ6IDUsXG4gICAgICAgICAgICAgICAgdXNlQ1NTOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3YWl0Rm9yQW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIF8uaW5pdGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b1BsYXlUaW1lcjogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgJGRvdHM6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpc3RIZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgICRuZXh0QXJyb3c6IG51bGwsXG4gICAgICAgICAgICAgICAgJHByZXZBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICBzbGlkZUNvdW50OiBudWxsLFxuICAgICAgICAgICAgICAgIHNsaWRlV2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgJHNsaWRlVHJhY2s6IG51bGwsXG4gICAgICAgICAgICAgICAgJHNsaWRlczogbnVsbCxcbiAgICAgICAgICAgICAgICBzbGlkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZU9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBzd2lwZUxlZnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgJGxpc3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgdG91Y2hPYmplY3Q6IHt9LFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybXNFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1bnNsaWNrZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkLmV4dGVuZChfLCBfLmluaXRpYWxzKTtcblxuICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gbnVsbDtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy5hbmltUHJvcCA9IG51bGw7XG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRzID0gW107XG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5ncyA9IFtdO1xuICAgICAgICAgICAgXy5jc3NUcmFuc2l0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgXy5mb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5oaWRkZW4gPSAnaGlkZGVuJztcbiAgICAgICAgICAgIF8ucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIF8ucG9zaXRpb25Qcm9wID0gbnVsbDtcbiAgICAgICAgICAgIF8ucmVzcG9uZFRvID0gbnVsbDtcbiAgICAgICAgICAgIF8ucm93Q291bnQgPSAxO1xuICAgICAgICAgICAgXy5zaG91bGRDbGljayA9IHRydWU7XG4gICAgICAgICAgICBfLiRzbGlkZXIgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBudWxsO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgXy53aW5kb3dXaWR0aCA9IDA7XG4gICAgICAgICAgICBfLndpbmRvd1RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgZGF0YVNldHRpbmdzID0gJChlbGVtZW50KS5kYXRhKCdzbGljaycpIHx8IHt9O1xuXG4gICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5kZWZhdWx0cywgc2V0dGluZ3MsIGRhdGFTZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcblxuICAgICAgICAgICAgXy5vcmlnaW5hbFNldHRpbmdzID0gXy5vcHRpb25zO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfLmhpZGRlbiA9ICdtb3pIaWRkZW4nO1xuICAgICAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfLmhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICAgICAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5hdXRvUGxheSA9ICQucHJveHkoXy5hdXRvUGxheSwgXyk7XG4gICAgICAgICAgICBfLmF1dG9QbGF5Q2xlYXIgPSAkLnByb3h5KF8uYXV0b1BsYXlDbGVhciwgXyk7XG4gICAgICAgICAgICBfLmF1dG9QbGF5SXRlcmF0b3IgPSAkLnByb3h5KF8uYXV0b1BsYXlJdGVyYXRvciwgXyk7XG4gICAgICAgICAgICBfLmNoYW5nZVNsaWRlID0gJC5wcm94eShfLmNoYW5nZVNsaWRlLCBfKTtcbiAgICAgICAgICAgIF8uY2xpY2tIYW5kbGVyID0gJC5wcm94eShfLmNsaWNrSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLnNlbGVjdEhhbmRsZXIgPSAkLnByb3h5KF8uc2VsZWN0SGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLnNldFBvc2l0aW9uID0gJC5wcm94eShfLnNldFBvc2l0aW9uLCBfKTtcbiAgICAgICAgICAgIF8uc3dpcGVIYW5kbGVyID0gJC5wcm94eShfLnN3aXBlSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLmRyYWdIYW5kbGVyID0gJC5wcm94eShfLmRyYWdIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8ua2V5SGFuZGxlciA9ICQucHJveHkoXy5rZXlIYW5kbGVyLCBfKTtcblxuICAgICAgICAgICAgXy5pbnN0YW5jZVVpZCA9IGluc3RhbmNlVWlkKys7XG5cbiAgICAgICAgICAgIC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG4gICAgICAgICAgICAvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAobXVzdCBzdGFydCB3aXRoIDwpXG4gICAgICAgICAgICAvLyBFeHRyYWN0ZWQgZnJvbSBqUXVlcnkgdjEuMTEgc291cmNlXG4gICAgICAgICAgICBfLmh0bWxFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qKSQvO1xuXG5cbiAgICAgICAgICAgIF8ucmVnaXN0ZXJCcmVha3BvaW50cygpO1xuICAgICAgICAgICAgXy5pbml0KHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU2xpY2s7XG5cbiAgICB9KCkpO1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFjdGl2YXRlQURBID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1hY3RpdmUnKS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICdmYWxzZSdcbiAgICAgICAgfSkuZmluZCgnYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0JykuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFkZFNsaWRlID0gU2xpY2sucHJvdG90eXBlLnNsaWNrQWRkID0gZnVuY3Rpb24obWFya3VwLCBpbmRleCwgYWRkQmVmb3JlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGFkZEJlZm9yZSA9IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCB8fCAoaW5kZXggPj0gXy5zbGlkZUNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBfLiRzbGlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhZGRCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuaW5zZXJ0QmVmb3JlKF8uJHNsaWRlcy5lcShpbmRleCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuaW5zZXJ0QWZ0ZXIoXy4kc2xpZGVzLmVxKGluZGV4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWRkQmVmb3JlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLnByZXBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmFwcGVuZChfLiRzbGlkZXMpO1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBpbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlc0NhY2hlID0gXy4kc2xpZGVzO1xuXG4gICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFuaW1hdGVIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMSAmJiBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldEhlaWdodCA9IF8uJHNsaWRlcy5lcShfLmN1cnJlbnRTbGlkZSkub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICBfLiRsaXN0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogdGFyZ2V0SGVpZ2h0XG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hbmltYXRlU2xpZGUgPSBmdW5jdGlvbih0YXJnZXRMZWZ0LCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBhbmltUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYW5pbWF0ZUhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAtdGFyZ2V0TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy50cmFuc2Zvcm1zRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRMZWZ0ID0gLShfLmN1cnJlbnRMZWZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCh7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1TdGFydDogXy5jdXJyZW50TGVmdFxuICAgICAgICAgICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBhbmltU3RhcnQ6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBfLm9wdGlvbnMuc3BlZWQsXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZzogXy5vcHRpb25zLmVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3cgPSBNYXRoLmNlaWwobm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm93ICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKDBweCwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm93ICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSBNYXRoLmNlaWwodGFyZ2V0TGVmdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHRhcmdldExlZnQgKyAncHgsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZTNkKDBweCwnICsgdGFyZ2V0TGVmdCArICdweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXy5kaXNhYmxlVHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXROYXZUYXJnZXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBhc05hdkZvciA9IF8ub3B0aW9ucy5hc05hdkZvcjtcblxuICAgICAgICBpZiAoIGFzTmF2Rm9yICYmIGFzTmF2Rm9yICE9PSBudWxsICkge1xuICAgICAgICAgICAgYXNOYXZGb3IgPSAkKGFzTmF2Rm9yKS5ub3QoXy4kc2xpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc05hdkZvcjtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXNOYXZGb3IgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gXy5nZXROYXZUYXJnZXQoKTtcblxuICAgICAgICBpZiAoIGFzTmF2Rm9yICE9PSBudWxsICYmIHR5cGVvZiBhc05hdkZvciA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgICAgICBhc05hdkZvci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLnNsaWNrKCdnZXRTbGljaycpO1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQudW5zbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zbGlkZUhhbmRsZXIoaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFwcGx5VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHNsaWRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdHJhbnNpdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25bXy50cmFuc2l0aW9uVHlwZV0gPSBfLnRyYW5zZm9ybVR5cGUgKyAnICcgKyBfLm9wdGlvbnMuc3BlZWQgKyAnbXMgJyArIF8ub3B0aW9ucy5jc3NFYXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9ICdvcGFjaXR5ICcgKyBfLm9wdGlvbnMuc3BlZWQgKyAnbXMgJyArIF8ub3B0aW9ucy5jc3NFYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGUpLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcblxuICAgICAgICBpZiAoIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICBfLmF1dG9QbGF5VGltZXIgPSBzZXRJbnRlcnZhbCggXy5hdXRvUGxheUl0ZXJhdG9yLCBfLm9wdGlvbnMuYXV0b3BsYXlTcGVlZCApO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5Q2xlYXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uYXV0b1BsYXlUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfLmF1dG9QbGF5VGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5SXRlcmF0b3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZVRvID0gXy5jdXJyZW50U2xpZGUgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgaWYgKCAhXy5wYXVzZWQgJiYgIV8uaW50ZXJydXB0ZWQgJiYgIV8uZm9jdXNzZWQgKSB7XG5cbiAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSApIHtcblxuICAgICAgICAgICAgICAgIGlmICggXy5kaXJlY3Rpb24gPT09IDEgJiYgKCBfLmN1cnJlbnRTbGlkZSArIDEgKSA9PT0gKCBfLnNsaWRlQ291bnQgLSAxICkpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kaXJlY3Rpb24gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBfLmRpcmVjdGlvbiA9PT0gMCApIHtcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZVRvID0gXy5jdXJyZW50U2xpZGUgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBfLmN1cnJlbnRTbGlkZSAtIDEgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggc2xpZGVUbyApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRBcnJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdyA9ICQoXy5vcHRpb25zLnByZXZBcnJvdykuYWRkQ2xhc3MoJ3NsaWNrLWFycm93Jyk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgPSAkKF8ub3B0aW9ucy5uZXh0QXJyb3cpLmFkZENsYXNzKCdzbGljay1hcnJvdycpO1xuXG4gICAgICAgICAgICBpZiggXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2staGlkZGVuJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXgnKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWhpZGRlbicpLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIHRhYmluZGV4Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5wcmV2QXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5wcmVwZW5kVG8oXy5vcHRpb25zLmFwcGVuZEFycm93cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMubmV4dEFycm93KSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYXBwZW5kVG8oXy5vcHRpb25zLmFwcGVuZEFycm93cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5hZGQoIF8uJG5leHRBcnJvdyApXG5cbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkRG90cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGksIGRvdDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLWRvdHRlZCcpO1xuXG4gICAgICAgICAgICBkb3QgPSAkKCc8dWwgLz4nKS5hZGRDbGFzcyhfLm9wdGlvbnMuZG90c0NsYXNzKTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8PSBfLmdldERvdENvdW50KCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGRvdC5hcHBlbmQoJCgnPGxpIC8+JykuYXBwZW5kKF8ub3B0aW9ucy5jdXN0b21QYWdpbmcuY2FsbCh0aGlzLCBfLCBpKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRkb3RzID0gZG90LmFwcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmREb3RzKTtcblxuICAgICAgICAgICAgXy4kZG90cy5maW5kKCdsaScpLmZpcnN0KCkuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZE91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXMgPVxuICAgICAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCBfLm9wdGlvbnMuc2xpZGUgKyAnOm5vdCguc2xpY2stY2xvbmVkKScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1zbGlkZScpO1xuXG4gICAgICAgIF8uc2xpZGVDb3VudCA9IF8uJHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIC5kYXRhKCdvcmlnaW5hbFN0eWxpbmcnLCAkKGVsZW1lbnQpLmF0dHIoJ3N0eWxlJykgfHwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2sgPSAoXy5zbGlkZUNvdW50ID09PSAwKSA/XG4gICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykuYXBwZW5kVG8oXy4kc2xpZGVyKSA6XG4gICAgICAgICAgICBfLiRzbGlkZXMud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLnBhcmVudCgpO1xuXG4gICAgICAgIF8uJGxpc3QgPSBfLiRzbGlkZVRyYWNrLndyYXAoXG4gICAgICAgICAgICAnPGRpdiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBjbGFzcz1cInNsaWNrLWxpc3RcIi8+JykucGFyZW50KCk7XG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlIHx8IF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlcikubm90KCdbc3JjXScpLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG5cbiAgICAgICAgXy5idWlsZEFycm93cygpO1xuXG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG5cbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG5cblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3Nlcyh0eXBlb2YgXy5jdXJyZW50U2xpZGUgPT09ICdudW1iZXInID8gXy5jdXJyZW50U2xpZGUgOiAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5hZGRDbGFzcygnZHJhZ2dhYmxlJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBhLCBiLCBjLCBuZXdTbGlkZXMsIG51bU9mU2xpZGVzLCBvcmlnaW5hbFNsaWRlcyxzbGlkZXNQZXJTZWN0aW9uO1xuXG4gICAgICAgIG5ld1NsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXIuY2hpbGRyZW4oKTtcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDEpIHtcblxuICAgICAgICAgICAgc2xpZGVzUGVyU2VjdGlvbiA9IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cgKiBfLm9wdGlvbnMucm93cztcbiAgICAgICAgICAgIG51bU9mU2xpZGVzID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLmxlbmd0aCAvIHNsaWRlc1BlclNlY3Rpb25cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZvcihhID0gMDsgYSA8IG51bU9mU2xpZGVzOyBhKyspe1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcihiID0gMDsgYiA8IF8ub3B0aW9ucy5yb3dzOyBiKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IoYyA9IDA7IGMgPCBfLm9wdGlvbnMuc2xpZGVzUGVyUm93OyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoYSAqIHNsaWRlc1BlclNlY3Rpb24gKyAoKGIgKiBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArIGMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2xpZGVzLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG5ld1NsaWRlcyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzooMTAwIC8gXy5vcHRpb25zLnNsaWRlc1BlclJvdykgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoZWNrUmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKGluaXRpYWwsIGZvcmNlVXBkYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtwb2ludCwgdGFyZ2V0QnJlYWtwb2ludCwgcmVzcG9uZFRvV2lkdGgsIHRyaWdnZXJCcmVha3BvaW50ID0gZmFsc2U7XG4gICAgICAgIHZhciBzbGlkZXJXaWR0aCA9IF8uJHNsaWRlci53aWR0aCgpO1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgICBpZiAoXy5yZXNwb25kVG8gPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnc2xpZGVyJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBzbGlkZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLnJlc3BvbmRUbyA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gTWF0aC5taW4od2luZG93V2lkdGgsIHNsaWRlcldpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLnJlc3BvbnNpdmUgJiZcbiAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aCAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAoYnJlYWtwb2ludCBpbiBfLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludHMuaGFzT3duUHJvcGVydHkoYnJlYWtwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3JpZ2luYWxTZXR0aW5ncy5tb2JpbGVGaXJzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA8IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA+IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRCcmVha3BvaW50ICE9PSBfLmFjdGl2ZUJyZWFrcG9pbnQgfHwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy51bnNsaWNrKHRhcmdldEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9IF8ub3JpZ2luYWxTZXR0aW5ncztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgdHJpZ2dlciBicmVha3BvaW50cyBkdXJpbmcgYW4gYWN0dWFsIGJyZWFrLiBub3Qgb24gaW5pdGlhbGl6ZS5cbiAgICAgICAgICAgIGlmKCAhaW5pdGlhbCAmJiB0cmlnZ2VyQnJlYWtwb2ludCAhPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2JyZWFrcG9pbnQnLCBbXywgdHJpZ2dlckJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGV2ZW50LCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQsIHNsaWRlT2Zmc2V0LCB1bmV2ZW5PZmZzZXQ7XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIGEgbGluaywgcHJldmVudCBkZWZhdWx0IGFjdGlvbi5cbiAgICAgICAgaWYoJHRhcmdldC5pcygnYScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIG5vdCB0aGUgPGxpPiBlbGVtZW50IChpZTogYSBjaGlsZCksIGZpbmQgdGhlIDxsaT4uXG4gICAgICAgIGlmKCEkdGFyZ2V0LmlzKCdsaScpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5ldmVuT2Zmc2V0ID0gKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCk7XG4gICAgICAgIGluZGV4T2Zmc2V0ID0gdW5ldmVuT2Zmc2V0ID8gMCA6IChfLnNsaWRlQ291bnQgLSBfLmN1cnJlbnRTbGlkZSkgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLm1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jdXJyZW50U2xpZGUgLSBzbGlkZU9mZnNldCwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSArIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRhdGEuaW5kZXggPT09IDAgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleCB8fCAkdGFyZ2V0LmluZGV4KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmNoZWNrTmF2aWdhYmxlKGluZGV4KSwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmNoaWxkcmVuKCkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tOYXZpZ2FibGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG5hdmlnYWJsZXMsIHByZXZOYXZpZ2FibGU7XG5cbiAgICAgICAgbmF2aWdhYmxlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpO1xuICAgICAgICBwcmV2TmF2aWdhYmxlID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBpbmRleCA9IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gaW4gbmF2aWdhYmxlcykge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IG5hdmlnYWJsZXNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBwcmV2TmF2aWdhYmxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldk5hdmlnYWJsZSA9IG5hdmlnYWJsZXNbbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyAmJiBfLiRkb3RzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cylcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJyk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9mZignY2xpY2suc2xpY2snLCBfLmNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub2ZmKF8udmlzaWJpbGl0eUNoYW5nZSwgXy52aXNpYmlsaXR5KTtcblxuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub2ZmKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5vcmllbnRhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnJlc2l6ZSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vZmYoJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vZmYoJ2xvYWQuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8uc2V0UG9zaXRpb24pO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3JlYWR5LnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcFNsaWRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpO1xuICAgICAgICBfLiRsaXN0Lm9mZignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBvcmlnaW5hbFNsaWRlcztcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDEpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzID0gXy4kc2xpZGVzLmNoaWxkcmVuKCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQob3JpZ2luYWxTbGlkZXMpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLnNob3VsZENsaWNrID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKHJlZnJlc2gpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheUNsZWFyKCk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuXG4gICAgICAgIF8uY2xlYW5VcEV2ZW50cygpO1xuXG4gICAgICAgICQoJy5zbGljay1jbG9uZWQnLCBfLiRzbGlkZXIpLmRldGFjaCgpO1xuXG4gICAgICAgIGlmIChfLiRkb3RzKSB7XG4gICAgICAgICAgICBfLiRkb3RzLnJlbW92ZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkIHNsaWNrLWFycm93IHNsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXgnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCcnKTtcblxuICAgICAgICAgICAgaWYgKCBfLmh0bWxFeHByLnRlc3QoIF8ub3B0aW9ucy5wcmV2QXJyb3cgKSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJG5leHRBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLm5leHRBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChfLiRzbGlkZXMpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLXZpc2libGUgc2xpY2stY3VycmVudCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zbGljay1pbmRleCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdzdHlsZScsICQodGhpcykuZGF0YSgnb3JpZ2luYWxTdHlsaW5nJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJGxpc3QuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hcHBlbmQoXy4kc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uY2xlYW5VcFJvd3MoKTtcblxuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgXy51bnNsaWNrZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmKCFyZWZyZXNoKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignZGVzdHJveScsIFtfXSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZGlzYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSB7fTtcblxuICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJyc7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGUpLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGUgPSBmdW5jdGlvbihzbGlkZUluZGV4LCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5kaXNhYmxlVHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZhZGVTbGlkZU91dCA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tGaWx0ZXIgPSBmdW5jdGlvbihmaWx0ZXIpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5maWx0ZXIoZmlsdGVyKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZvY3VzSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXJcbiAgICAgICAgICAgIC5vZmYoJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snKVxuICAgICAgICAgICAgLm9uKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJyxcbiAgICAgICAgICAgICAgICAnKjpub3QoLnNsaWNrLWFycm93KScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdmFyICRzZiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggXy5vcHRpb25zLnBhdXNlT25Gb2N1cyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb2N1c3NlZCA9ICRzZi5pcygnOmZvY3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDApO1xuXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0Q3VycmVudCA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0N1cnJlbnRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF8uY3VycmVudFNsaWRlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXREb3RDb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICB2YXIgYnJlYWtQb2ludCA9IDA7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIHBhZ2VyUXR5ID0gMDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gXy5zbGlkZUNvdW50O1xuICAgICAgICB9IGVsc2UgaWYoIV8ub3B0aW9ucy5hc05hdkZvcikge1xuICAgICAgICAgICAgcGFnZXJRdHkgPSAxICsgTWF0aC5jZWlsKChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgKytwYWdlclF0eTtcbiAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlclF0eSAtIDE7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldExlZnQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgIHZlcnRpY2FsSGVpZ2h0LFxuICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0U2xpZGU7XG5cbiAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgIHZlcnRpY2FsSGVpZ2h0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKF8uc2xpZGVXaWR0aCAqIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpICogLTE7XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAodmVydGljYWxIZWlnaHQgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAqIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID4gXy5zbGlkZUNvdW50ICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPiBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogdmVydGljYWxIZWlnaHQpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiBfLnNsaWRlV2lkdGg7XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiB2ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ICs9IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpIC0gXy5zbGlkZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgKz0gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICgoc2xpZGVJbmRleCAqIF8uc2xpZGVXaWR0aCkgKiAtMSkgKyBfLnNsaWRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICgoc2xpZGVJbmRleCAqIHZlcnRpY2FsSGVpZ2h0KSAqIC0xKSArIHZlcnRpY2FsT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyB8fCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFNsaWRlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy4kc2xpZGVUcmFjay53aWR0aCgpIC0gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAtIHRhcmdldFNsaWRlLndpZHRoKCkpICogLTE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IHRhcmdldFNsaWRlWzBdID8gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAqIC0xIDogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldFNsaWRlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uJHNsaWRlVHJhY2sud2lkdGgoKSAtIHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgLSB0YXJnZXRTbGlkZS53aWR0aCgpKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IHRhcmdldFNsaWRlWzBdID8gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAqIC0xIDogMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ICs9IChfLiRsaXN0LndpZHRoKCkgLSB0YXJnZXRTbGlkZS5vdXRlcldpZHRoKCkpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRMZWZ0O1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRPcHRpb24gPSBTbGljay5wcm90b3R5cGUuc2xpY2tHZXRPcHRpb24gPSBmdW5jdGlvbihvcHRpb24pIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF8ub3B0aW9uc1tvcHRpb25dO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXROYXZpZ2FibGVJbmRleGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtQb2ludCA9IDAsXG4gICAgICAgICAgICBjb3VudGVyID0gMCxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXSxcbiAgICAgICAgICAgIG1heDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbWF4ID0gXy5zbGlkZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtQb2ludCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAqIC0xO1xuICAgICAgICAgICAgY291bnRlciA9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAqIC0xO1xuICAgICAgICAgICAgbWF4ID0gXy5zbGlkZUNvdW50ICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgbWF4KSB7XG4gICAgICAgICAgICBpbmRleGVzLnB1c2goYnJlYWtQb2ludCk7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgIGNvdW50ZXIgKz0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ZXM7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldFNsaWNrID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldFNsaWRlQ291bnQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZXNUcmF2ZXJzZWQsIHN3aXBlZFNsaWRlLCBjZW50ZXJPZmZzZXQ7XG5cbiAgICAgICAgY2VudGVyT2Zmc2V0ID0gXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgPyBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKSA6IDA7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLXNsaWRlJykuZWFjaChmdW5jdGlvbihpbmRleCwgc2xpZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUub2Zmc2V0TGVmdCAtIGNlbnRlck9mZnNldCArICgkKHNsaWRlKS5vdXRlcldpZHRoKCkgLyAyKSA+IChfLnN3aXBlTGVmdCAqIC0xKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2lwZWRTbGlkZSA9IHNsaWRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNsaWRlc1RyYXZlcnNlZCA9IE1hdGguYWJzKCQoc3dpcGVkU2xpZGUpLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKSAtIF8uY3VycmVudFNsaWRlKSB8fCAxO1xuXG4gICAgICAgICAgICByZXR1cm4gc2xpZGVzVHJhdmVyc2VkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdvVG8gPSBTbGljay5wcm90b3R5cGUuc2xpY2tHb1RvID0gZnVuY3Rpb24oc2xpZGUsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KHNsaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkb250QW5pbWF0ZSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihjcmVhdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoISQoXy4kc2xpZGVyKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xuXG4gICAgICAgICAgICAkKF8uJHNsaWRlcikuYWRkQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG5cbiAgICAgICAgICAgIF8uYnVpbGRSb3dzKCk7XG4gICAgICAgICAgICBfLmJ1aWxkT3V0KCk7XG4gICAgICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgICAgICBfLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgXy5sb2FkU2xpZGVyKCk7XG4gICAgICAgICAgICBfLmluaXRpYWxpemVFdmVudHMoKTtcbiAgICAgICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKHRydWUpO1xuICAgICAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNyZWF0aW9uKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignaW5pdCcsIFtfXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uaW5pdEFEQSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0QURBID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgXy4kc2xpZGVzLmFkZChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmF0dHIoJ3JvbGUnLCAnbGlzdGJveCcpO1xuXG4gICAgICAgIF8uJHNsaWRlcy5ub3QoXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAncm9sZSc6ICdvcHRpb24nLFxuICAgICAgICAgICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBpICsgJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgXy4kZG90cy5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3ByZXNlbnRhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAnbmF2aWdhdGlvbicgKyBfLmluc3RhbmNlVWlkICsgaSArICcnLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnc2xpY2stc2xpZGUnICsgXy5pbnN0YW5jZVVpZCArIGkgKyAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlyc3QoKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKS5lbmQoKVxuICAgICAgICAgICAgICAgIC5maW5kKCdidXR0b24nKS5hdHRyKCdyb2xlJywgJ2J1dHRvbicpLmVuZCgpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJ2RpdicpLmF0dHIoJ3JvbGUnLCAndG9vbGJhcicpO1xuICAgICAgICB9XG4gICAgICAgIF8uYWN0aXZhdGVBREEoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdEFycm93RXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgLm9mZignY2xpY2suc2xpY2snKVxuICAgICAgICAgICAgICAgLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICduZXh0J1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdERvdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKS5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4J1xuICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8ub3B0aW9ucy5wYXVzZU9uRG90c0hvdmVyID09PSB0cnVlICkge1xuXG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRTbGlkZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5wYXVzZU9uSG92ZXIgKSB7XG5cbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRpYWxpemVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5pbml0QXJyb3dFdmVudHMoKTtcblxuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3N0YXJ0J1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdtb3ZlJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoZW5kLnNsaWNrIG1vdXNldXAuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2VuZCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuXG4gICAgICAgIF8uJGxpc3Qub24oJ2NsaWNrLnNsaWNrJywgXy5jbGlja0hhbmRsZXIpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKF8udmlzaWJpbGl0eUNoYW5nZSwgJC5wcm94eShfLnZpc2liaWxpdHksIF8pKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbignb3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsICQucHJveHkoXy5vcmllbnRhdGlvbkNoYW5nZSwgXykpO1xuXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ucmVzaXplLCBfKSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vbignZHJhZ3N0YXJ0JywgXy5wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3JlYWR5LnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdFVJID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LnNob3coKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5zaG93KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICAgLy9Eb250IHNsaWRlIGlmIHRoZSBjdXJzb3IgaXMgaW5zaWRlIHRoZSBmb3JtIGZpZWxkcyBhbmQgYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgICAgICBpZighZXZlbnQudGFyZ2V0LnRhZ05hbWUubWF0Y2goJ1RFWFRBUkVBfElOUFVUfFNFTEVDVCcpKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICduZXh0JyA6ICAncHJldmlvdXMnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICdwcmV2aW91cycgOiAnbmV4dCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxhenlMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgbG9hZFJhbmdlLCBjbG9uZVJhbmdlLCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcblxuICAgICAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKGltYWdlc1Njb3BlKSB7XG5cbiAgICAgICAgICAgICQoJ2ltZ1tkYXRhLWxhenldJywgaW1hZ2VzU2NvcGUpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNvdXJjZSA9ICQodGhpcykuYXR0cignZGF0YS1sYXp5JyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyBvcGFjaXR5OiAwIH0sIDEwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGltYWdlU291cmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtbGF6eScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZGVkJywgW18sIGltYWdlLCBpbWFnZVNvdXJjZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0ciggJ2RhdGEtbGF6eScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnc2xpY2stbG9hZGluZycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnc2xpY2stbGF6eWxvYWQtZXJyb3InICk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkRXJyb3InLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLmN1cnJlbnRTbGlkZSArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gcmFuZ2VTdGFydCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gTWF0aC5tYXgoMCwgXy5jdXJyZW50U2xpZGUgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKSk7XG4gICAgICAgICAgICAgICAgcmFuZ2VFbmQgPSAyICsgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkgKyBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLm9wdGlvbnMuaW5maW5pdGUgPyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgXy5jdXJyZW50U2xpZGUgOiBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gTWF0aC5jZWlsKHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZVN0YXJ0ID4gMCkgcmFuZ2VTdGFydC0tO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZUVuZCA8PSBfLnNsaWRlQ291bnQpIHJhbmdlRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJykuc2xpY2UocmFuZ2VTdGFydCwgcmFuZ2VFbmQpO1xuICAgICAgICBsb2FkSW1hZ2VzKGxvYWRSYW5nZSk7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1jbG9uZWQnKS5zbGljZSgwLCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKiAtMSk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxvYWRTbGlkZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5pbml0VUkoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAncHJvZ3Jlc3NpdmUnKSB7XG4gICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5uZXh0ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrTmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm9yaWVudGF0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucGF1c2UgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcbiAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wbGF5ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIF8ub3B0aW9ucy5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wb3N0U2xpZGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIV8udW5zbGlja2VkICkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWZ0ZXJDaGFuZ2UnLCBbXywgaW5kZXhdKTtcblxuICAgICAgICAgICAgXy5hbmltYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuICAgICAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5pbml0QURBKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUHJldiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAncHJldmlvdXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJvZ3Jlc3NpdmVMYXp5TG9hZCA9IGZ1bmN0aW9uKCB0cnlDb3VudCApIHtcblxuICAgICAgICB0cnlDb3VudCA9IHRyeUNvdW50IHx8IDE7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJGltZ3NUb0xvYWQgPSAkKCAnaW1nW2RhdGEtbGF6eV0nLCBfLiRzbGlkZXIgKSxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VTb3VyY2UsXG4gICAgICAgICAgICBpbWFnZVRvTG9hZDtcblxuICAgICAgICBpZiAoICRpbWdzVG9Mb2FkLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgaW1hZ2UgPSAkaW1nc1RvTG9hZC5maXJzdCgpO1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSBpbWFnZS5hdHRyKCdkYXRhLWxhenknKTtcbiAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoICdzcmMnLCBpbWFnZVNvdXJjZSApXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenknKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkZWQnLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcbiAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0cnlDb3VudCA8IDMgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIHRyeSB0byBsb2FkIHRoZSBpbWFnZSAzIHRpbWVzLFxuICAgICAgICAgICAgICAgICAgICAgKiBsZWF2ZSBhIHNsaWdodCBkZWxheSBzbyB3ZSBkb24ndCBnZXRcbiAgICAgICAgICAgICAgICAgICAgICogc2VydmVycyBibG9ja2luZyB0aGUgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCB0cnlDb3VudCArIDEgKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0ciggJ2RhdGEtbGF6eScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnc2xpY2stbG9hZGluZycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnc2xpY2stbGF6eWxvYWQtZXJyb3InICk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkRXJyb3InLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcblxuICAgICAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2FsbEltYWdlc0xvYWRlZCcsIFsgXyBdKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiggaW5pdGlhbGl6aW5nICkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgY3VycmVudFNsaWRlLCBsYXN0VmlzaWJsZUluZGV4O1xuXG4gICAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuXG4gICAgICAgIC8vIGluIG5vbi1pbmZpbml0ZSBzbGlkZXJzLCB3ZSBkb24ndCB3YW50IHRvIGdvIHBhc3QgdGhlXG4gICAgICAgIC8vIGxhc3QgdmlzaWJsZSBpbmRleC5cbiAgICAgICAgaWYoICFfLm9wdGlvbnMuaW5maW5pdGUgJiYgKCBfLmN1cnJlbnRTbGlkZSA+IGxhc3RWaXNpYmxlSW5kZXggKSkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBsYXN0VmlzaWJsZUluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbGVzcyBzbGlkZXMgdGhhbiB0byBzaG93LCBnbyB0byBzdGFydC5cbiAgICAgICAgaWYgKCBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gMDtcblxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG5cbiAgICAgICAgXy5kZXN0cm95KHRydWUpO1xuXG4gICAgICAgICQuZXh0ZW5kKF8sIF8uaW5pdGlhbHMsIHsgY3VycmVudFNsaWRlOiBjdXJyZW50U2xpZGUgfSk7XG5cbiAgICAgICAgXy5pbml0KCk7XG5cbiAgICAgICAgaWYoICFpbml0aWFsaXppbmcgKSB7XG5cbiAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRTbGlkZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlZ2lzdGVyQnJlYWtwb2ludHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGJyZWFrcG9pbnQsIGN1cnJlbnRCcmVha3BvaW50LCBsLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZVNldHRpbmdzID0gXy5vcHRpb25zLnJlc3BvbnNpdmUgfHwgbnVsbDtcblxuICAgICAgICBpZiAoICQudHlwZShyZXNwb25zaXZlU2V0dGluZ3MpID09PSAnYXJyYXknICYmIHJlc3BvbnNpdmVTZXR0aW5ncy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8ucmVzcG9uZFRvID0gXy5vcHRpb25zLnJlc3BvbmRUbyB8fCAnd2luZG93JztcblxuICAgICAgICAgICAgZm9yICggYnJlYWtwb2ludCBpbiByZXNwb25zaXZlU2V0dGluZ3MgKSB7XG5cbiAgICAgICAgICAgICAgICBsID0gXy5icmVha3BvaW50cy5sZW5ndGgtMTtcbiAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5icmVha3BvaW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNpdmVTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnJlYWtwb2ludHMgYW5kIGN1dCBvdXQgYW55IGV4aXN0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uZXMgd2l0aCB0aGUgc2FtZSBicmVha3BvaW50IG51bWJlciwgd2UgZG9uJ3Qgd2FudCBkdXBlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLmJyZWFrcG9pbnRzW2xdICYmIF8uYnJlYWtwb2ludHNbbF0gPT09IGN1cnJlbnRCcmVha3BvaW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMuc3BsaWNlKGwsMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnB1c2goY3VycmVudEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tjdXJyZW50QnJlYWtwb2ludF0gPSByZXNwb25zaXZlU2V0dGluZ3NbYnJlYWtwb2ludF0uc2V0dGluZ3M7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5icmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBfLm9wdGlvbnMubW9iaWxlRmlyc3QgKSA/IGEtYiA6IGItYTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKF8ub3B0aW9ucy5zbGlkZSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50ICYmIF8uY3VycmVudFNsaWRlICE9PSAwKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcblxuICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgIF8uc2V0dXBJbmZpbml0ZSgpO1xuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG4gICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5jbGVhblVwU2xpZGVFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZShmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICBfLnBhdXNlZCA9ICFfLm9wdGlvbnMuYXV0b3BsYXk7XG4gICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcigncmVJbml0JywgW19dKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSAhPT0gXy53aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF8ud2luZG93RGVsYXkpO1xuICAgICAgICAgICAgXy53aW5kb3dEZWxheSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSgpO1xuICAgICAgICAgICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7IF8uc2V0UG9zaXRpb24oKTsgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZW1vdmVTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1JlbW92ZSA9IGZ1bmN0aW9uKGluZGV4LCByZW1vdmVCZWZvcmUsIHJlbW92ZUFsbCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZW1vdmVCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gMCA6IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHJlbW92ZUJlZm9yZSA9PT0gdHJ1ZSA/IC0taW5kZXggOiBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPCAxIHx8IGluZGV4IDwgMCB8fCBpbmRleCA+IF8uc2xpZGVDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUFsbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmVxKGluZGV4KS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRDU1MgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIHgsIHk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHggPSBfLnBvc2l0aW9uUHJvcCA9PSAnbGVmdCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuICAgICAgICB5ID0gXy5wb3NpdGlvblByb3AgPT0gJ3RvcCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuXG4gICAgICAgIHBvc2l0aW9uUHJvcHNbXy5wb3NpdGlvblByb3BdID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fTtcbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgKyB4ICsgJywgJyArIHkgKyAnKSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAnLCAnICsgeSArICcsIDBweCknO1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKCcwcHggJyArIF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kbGlzdC5oZWlnaHQoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nICsgJyAwcHgnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy5saXN0V2lkdGggPSBfLiRsaXN0LndpZHRoKCk7XG4gICAgICAgIF8ubGlzdEhlaWdodCA9IF8uJGxpc3QuaGVpZ2h0KCk7XG5cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiBfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2xpZGVXaWR0aCA9IE1hdGguY2VpbChfLmxpc3RXaWR0aCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay53aWR0aChNYXRoLmNlaWwoKF8uc2xpZGVXaWR0aCAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcblxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKDUwMDAgKiBfLnNsaWRlQ291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoKTtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suaGVpZ2h0KE1hdGguY2VpbCgoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5sZW5ndGgpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJXaWR0aCh0cnVlKSAtIF8uJHNsaWRlcy5maXJzdCgpLndpZHRoKCk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLndpZHRoKF8uc2xpZGVXaWR0aCAtIG9mZnNldCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldEZhZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRMZWZ0O1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uc2xpZGVXaWR0aCAqIGluZGV4KSAqIC0xO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLmNzcyh7XG4gICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAxLFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuY3NzKCdoZWlnaHQnLCB0YXJnZXRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldE9wdGlvbiA9XG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWNrU2V0T3B0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjY2VwdHMgYXJndW1lbnRzIGluIGZvcm1hdCBvZjpcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIGNoYW5naW5nIGEgc2luZ2xlIG9wdGlvbidzIHZhbHVlOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzZXQgb2YgcmVzcG9uc2l2ZSBvcHRpb25zOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsICdyZXNwb25zaXZlJywgW3t9LCAuLi5dLCByZWZyZXNoIClcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIHVwZGF0aW5nIG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlIChub3QgcmVzcG9uc2l2ZSlcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCB7ICdvcHRpb24nOiB2YWx1ZSwgLi4uIH0sIHJlZnJlc2ggKVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGwsIGl0ZW0sIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggPSBmYWxzZSwgdHlwZTtcblxuICAgICAgICBpZiggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ29iamVjdCcgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICByZWZyZXNoID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdHlwZSA9ICdtdWx0aXBsZSc7XG5cbiAgICAgICAgfSBlbHNlIGlmICggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ3N0cmluZycgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgIGlmICggYXJndW1lbnRzWzBdID09PSAncmVzcG9uc2l2ZScgJiYgJC50eXBlKCBhcmd1bWVudHNbMV0gKSA9PT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgIHR5cGUgPSAncmVzcG9uc2l2ZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBhcmd1bWVudHNbMV0gIT09ICd1bmRlZmluZWQnICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cbiAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnbXVsdGlwbGUnICkge1xuXG4gICAgICAgICAgICAkLmVhY2goIG9wdGlvbiAsIGZ1bmN0aW9uKCBvcHQsIHZhbCApIHtcblxuICAgICAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRdID0gdmFsO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdyZXNwb25zaXZlJyApIHtcblxuICAgICAgICAgICAgZm9yICggaXRlbSBpbiB2YWx1ZSApIHtcblxuICAgICAgICAgICAgICAgIGlmKCAkLnR5cGUoIF8ub3B0aW9ucy5yZXNwb25zaXZlICkgIT09ICdhcnJheScgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgPSBbIHZhbHVlW2l0ZW1dIF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGwgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHJlc3BvbnNpdmUgb2JqZWN0IGFuZCBzcGxpY2Ugb3V0IGR1cGxpY2F0ZXMuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKCBsID49IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucmVzcG9uc2l2ZVtsXS5icmVha3BvaW50ID09PSB2YWx1ZVtpdGVtXS5icmVha3BvaW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUuc3BsaWNlKGwsMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbC0tO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5wdXNoKCB2YWx1ZVtpdGVtXSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcmVmcmVzaCApIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldERpbWVuc2lvbnMoKTtcblxuICAgICAgICBfLnNldEhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2V0Q1NTKF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zZXRGYWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc2V0UG9zaXRpb24nLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQcm9wcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG5cbiAgICAgICAgXy5wb3NpdGlvblByb3AgPSBfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgPyAndG9wJyA6ICdsZWZ0JztcblxuICAgICAgICBpZiAoXy5wb3NpdGlvblByb3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLk1velRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLm1zVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnVzZUNTUyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuZmFkZSApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIF8ub3B0aW9ucy56SW5kZXggPT09ICdudW1iZXInICkge1xuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMuekluZGV4IDwgMyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnpJbmRleCA9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gXy5kZWZhdWx0cy56SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLk9UcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdPVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctby10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdPVHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnTW96VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbW96LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ01velRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLk1velBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLXdlYmtpdC10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd3ZWJraXRUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ21zVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbXMtdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnbXNUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUubXNUcmFuc2Zvcm0gPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgJiYgXy5hbmltVHlwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd0cmFuc2l0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBfLnRyYW5zZm9ybXNFbmFibGVkID0gXy5vcHRpb25zLnVzZVRyYW5zZm9ybSAmJiAoXy5hbmltVHlwZSAhPT0gbnVsbCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSk7XG4gICAgfTtcblxuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFNsaWRlQ2xhc3NlcyA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0LCBhbGxTbGlkZXMsIGluZGV4T2Zmc2V0LCByZW1haW5kZXI7XG5cbiAgICAgICAgYWxsU2xpZGVzID0gXy4kc2xpZGVyXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWN1cnJlbnQnKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBjZW50ZXJPZmZzZXQgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIDEpIC0gY2VudGVyT2Zmc2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggLSBjZW50ZXJPZmZzZXQsIGluZGV4ICsgY2VudGVyT2Zmc2V0ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSBjZW50ZXJPZmZzZXQgKyAxLCBpbmRleE9mZnNldCArIGNlbnRlck9mZnNldCArIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGFsbFNsaWRlcy5sZW5ndGggLSAxIC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBfLnNsaWRlQ291bnQgLSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgLmVxKGluZGV4KVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4LCBpbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWxsU2xpZGVzLmxlbmd0aCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlbWFpbmRlciA9IF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgPyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgaW5kZXggOiBpbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAmJiAoXy5zbGlkZUNvdW50IC0gaW5kZXgpIDwgXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0IC0gKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSByZW1haW5kZXIpLCBpbmRleE9mZnNldCArIHJlbWFpbmRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCwgaW5kZXhPZmZzZXQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ29uZGVtYW5kJykge1xuICAgICAgICAgICAgXy5sYXp5TG9hZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldHVwSW5maW5pdGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBpLCBzbGlkZUluZGV4LCBpbmZpbml0ZUNvdW50O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5vcHRpb25zLmNlbnRlck1vZGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgJiYgXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHNsaWRlSW5kZXggPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBfLnNsaWRlQ291bnQ7IGkgPiAoXy5zbGlkZUNvdW50IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQpOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGkgLSAxO1xuICAgICAgICAgICAgICAgICAgICAkKF8uJHNsaWRlc1tzbGlkZUluZGV4XSkuY2xvbmUodHJ1ZSkuYXR0cignaWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4Jywgc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmVwZW5kVG8oXy4kc2xpZGVUcmFjaykuYWRkQ2xhc3MoJ3NsaWNrLWNsb25lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5maW5pdGVDb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAkKF8uJHNsaWRlc1tzbGlkZUluZGV4XSkuY2xvbmUodHJ1ZSkuYXR0cignaWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4Jywgc2xpZGVJbmRleCArIF8uc2xpZGVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKS5hZGRDbGFzcygnc2xpY2stY2xvbmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpLmZpbmQoJ1tpZF0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2lkJywgJycpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbiggdG9nZ2xlICkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIXRvZ2dsZSApIHtcbiAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBfLmludGVycnVwdGVkID0gdG9nZ2xlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZWxlY3RIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRhcmdldEVsZW1lbnQgPVxuICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmlzKCcuc2xpY2stc2xpZGUnKSA/XG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpIDpcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLnNsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0RWxlbWVudC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JykpO1xuXG4gICAgICAgIGlmICghaW5kZXgpIGluZGV4ID0gMDtcblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy5zZXRTbGlkZUNsYXNzZXMoaW5kZXgpO1xuICAgICAgICAgICAgXy5hc05hdkZvcihpbmRleCk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2xpZGVIYW5kbGVyKGluZGV4KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2xpZGVIYW5kbGVyID0gZnVuY3Rpb24oaW5kZXgsIHN5bmMsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIHRhcmdldFNsaWRlLCBhbmltU2xpZGUsIG9sZFNsaWRlLCBzbGlkZUxlZnQsIHRhcmdldExlZnQgPSBudWxsLFxuICAgICAgICAgICAgXyA9IHRoaXMsIG5hdlRhcmdldDtcblxuICAgICAgICBzeW5jID0gc3luYyB8fCBmYWxzZTtcblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUgJiYgXy5vcHRpb25zLndhaXRGb3JBbmltYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgJiYgXy5jdXJyZW50U2xpZGUgPT09IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzeW5jID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5hc05hdkZvcihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRTbGlkZSA9IGluZGV4O1xuICAgICAgICB0YXJnZXRMZWZ0ID0gXy5nZXRMZWZ0KHRhcmdldFNsaWRlKTtcbiAgICAgICAgc2xpZGVMZWZ0ID0gXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBfLmN1cnJlbnRMZWZ0ID0gXy5zd2lwZUxlZnQgPT09IG51bGwgPyBzbGlkZUxlZnQgOiBfLnN3aXBlTGVmdDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gZmFsc2UgJiYgKGluZGV4IDwgMCB8fCBpbmRleCA+IF8uZ2V0RG90Q291bnQoKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLmFuaW1hdGVTbGlkZShzbGlkZUxlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgKGluZGV4IDwgMCB8fCBpbmRleCA+IChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHNsaWRlTGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRTbGlkZSA8IDApIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgLSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gXy5zbGlkZUNvdW50ICsgdGFyZ2V0U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2xpZGUgPj0gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gdGFyZ2V0U2xpZGUgLSBfLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYmVmb3JlQ2hhbmdlJywgW18sIF8uY3VycmVudFNsaWRlLCBhbmltU2xpZGVdKTtcblxuICAgICAgICBvbGRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGFuaW1TbGlkZTtcblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXNOYXZGb3IgKSB7XG5cbiAgICAgICAgICAgIG5hdlRhcmdldCA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG4gICAgICAgICAgICBuYXZUYXJnZXQgPSBuYXZUYXJnZXQuc2xpY2soJ2dldFNsaWNrJyk7XG5cbiAgICAgICAgICAgIGlmICggbmF2VGFyZ2V0LnNsaWRlQ291bnQgPD0gbmF2VGFyZ2V0Lm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgICAgIG5hdlRhcmdldC5zZXRTbGlkZUNsYXNzZXMoXy5jdXJyZW50U2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGVPdXQob2xkU2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGUoYW5pbVNsaWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHRhcmdldExlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3RhcnRMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LmhpZGUoKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5oaWRlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVEaXJlY3Rpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgeERpc3QsIHlEaXN0LCByLCBzd2lwZUFuZ2xlLCBfID0gdGhpcztcblxuICAgICAgICB4RGlzdCA9IF8udG91Y2hPYmplY3Quc3RhcnRYIC0gXy50b3VjaE9iamVjdC5jdXJYO1xuICAgICAgICB5RGlzdCA9IF8udG91Y2hPYmplY3Quc3RhcnRZIC0gXy50b3VjaE9iamVjdC5jdXJZO1xuICAgICAgICByID0gTWF0aC5hdGFuMih5RGlzdCwgeERpc3QpO1xuXG4gICAgICAgIHN3aXBlQW5nbGUgPSBNYXRoLnJvdW5kKHIgKiAxODAgLyBNYXRoLlBJKTtcbiAgICAgICAgaWYgKHN3aXBlQW5nbGUgPCAwKSB7XG4gICAgICAgICAgICBzd2lwZUFuZ2xlID0gMzYwIC0gTWF0aC5hYnMoc3dpcGVBbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPD0gNDUpICYmIChzd2lwZUFuZ2xlID49IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlIDw9IDM2MCkgJiYgKHN3aXBlQW5nbGUgPj0gMzE1KSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdsZWZ0JyA6ICdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA+PSAxMzUpICYmIChzd2lwZUFuZ2xlIDw9IDIyNSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAncmlnaHQnIDogJ2xlZnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKChzd2lwZUFuZ2xlID49IDM1KSAmJiAoc3dpcGVBbmdsZSA8PSAxMzUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ3ZlcnRpY2FsJztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVFbmQgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlQ291bnQsXG4gICAgICAgICAgICBkaXJlY3Rpb247XG5cbiAgICAgICAgXy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgICAgIF8uc2hvdWxkQ2xpY2sgPSAoIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiAxMCApID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5jdXJYID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdlZGdlJywgW18sIF8uc3dpcGVEaXJlY3Rpb24oKSBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+PSBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlICkge1xuXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBfLnN3aXBlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbiApIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ291bnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jaGVja05hdmlnYWJsZSggXy5jdXJyZW50U2xpZGUgKyBfLmdldFNsaWRlQ291bnQoKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSArIF8uZ2V0U2xpZGVDb3VudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudERpcmVjdGlvbiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ291bnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jaGVja05hdmlnYWJsZSggXy5jdXJyZW50U2xpZGUgLSBfLmdldFNsaWRlQ291bnQoKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSAtIF8uZ2V0U2xpZGVDb3VudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudERpcmVjdGlvbiA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIGRpcmVjdGlvbiAhPSAndmVydGljYWwnICkge1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIHNsaWRlQ291bnQgKTtcbiAgICAgICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3N3aXBlJywgW18sIGRpcmVjdGlvbiBdKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICggXy50b3VjaE9iamVjdC5zdGFydFggIT09IF8udG91Y2hPYmplY3QuY3VyWCApIHtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBfLmN1cnJlbnRTbGlkZSApO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKChfLm9wdGlvbnMuc3dpcGUgPT09IGZhbHNlKSB8fCAoJ29udG91Y2hlbmQnIGluIGRvY3VtZW50ICYmIF8ub3B0aW9ucy5zd2lwZSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gZmFsc2UgJiYgZXZlbnQudHlwZS5pbmRleE9mKCdtb3VzZScpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5maW5nZXJDb3VudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aCA6IDE7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5taW5Td2lwZSA9IF8ubGlzdFdpZHRoIC8gXy5vcHRpb25zXG4gICAgICAgICAgICAudG91Y2hUaHJlc2hvbGQ7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8udG91Y2hPYmplY3QubWluU3dpcGUgPSBfLmxpc3RIZWlnaHQgLyBfLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAudG91Y2hUaHJlc2hvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEuYWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlU3RhcnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlTW92ZShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZUVuZChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGVkZ2VXYXNIaXQgPSBmYWxzZSxcbiAgICAgICAgICAgIGN1ckxlZnQsIHN3aXBlRGlyZWN0aW9uLCBzd2lwZUxlbmd0aCwgcG9zaXRpb25PZmZzZXQsIHRvdWNoZXM7XG5cbiAgICAgICAgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCA/IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyA6IG51bGw7XG5cbiAgICAgICAgaWYgKCFfLmRyYWdnaW5nIHx8IHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1ckxlZnQgPSBfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QuY3VyWCA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYO1xuICAgICAgICBfLnRvdWNoT2JqZWN0LmN1clkgPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzWzBdLnBhZ2VZIDogZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID0gTWF0aC5yb3VuZChNYXRoLnNxcnQoXG4gICAgICAgICAgICBNYXRoLnBvdyhfLnRvdWNoT2JqZWN0LmN1clggLSBfLnRvdWNoT2JqZWN0LnN0YXJ0WCwgMikpKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWSAtIF8udG91Y2hPYmplY3Quc3RhcnRZLCAyKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVEaXJlY3Rpb24gPSBfLnN3aXBlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKHN3aXBlRGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb25PZmZzZXQgPSAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAxIDogLTEpICogKF8udG91Y2hPYmplY3QuY3VyWCA+IF8udG91Y2hPYmplY3Quc3RhcnRYID8gMSA6IC0xKTtcbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gXy50b3VjaE9iamVjdC5jdXJZID4gXy50b3VjaE9iamVjdC5zdGFydFkgPyAxIDogLTE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aDtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKChfLmN1cnJlbnRTbGlkZSA9PT0gMCAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JykgfHwgKF8uY3VycmVudFNsaWRlID49IF8uZ2V0RG90Q291bnQoKSAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCAqIF8ub3B0aW9ucy5lZGdlRnJpY3Rpb247XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgKHN3aXBlTGVuZ3RoICogKF8uJGxpc3QuaGVpZ2h0KCkgLyBfLmxpc3RXaWR0aCkpICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIHN3aXBlTGVuZ3RoICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgfHwgXy5vcHRpb25zLnRvdWNoTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5zZXRDU1MoXy5zd2lwZUxlZnQpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZVN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0b3VjaGVzO1xuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ICE9PSAxIHx8IF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFggPSBfLnRvdWNoT2JqZWN0LmN1clggPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFkgPSBfLnRvdWNoT2JqZWN0LmN1clkgPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VZIDogZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBfLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudW5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tVbmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kc2xpZGVzQ2FjaGUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICAkKCcuc2xpY2stY2xvbmVkJywgXy4kc2xpZGVyKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAoXy4kZG90cykge1xuICAgICAgICAgICAgXy4kZG90cy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLiRwcmV2QXJyb3cgJiYgXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5wcmV2QXJyb3cpKSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kbmV4dEFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMubmV4dEFycm93KSkge1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlIHNsaWNrLWFjdGl2ZSBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgICAgLmNzcygnd2lkdGgnLCAnJyk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuc2xpY2sgPSBmdW5jdGlvbihmcm9tQnJlYWtwb2ludCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3Vuc2xpY2snLCBbXywgZnJvbUJyZWFrcG9pbnRdKTtcbiAgICAgICAgXy5kZXN0cm95KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZUFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiZcbiAgICAgICAgICAgIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiZcbiAgICAgICAgICAgICFfLm9wdGlvbnMuaW5maW5pdGUgKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSAxICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudXBkYXRlRG90cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgICAgICAgXy4kZG90c1xuICAgICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmVxKE1hdGguZmxvb3IoXy5jdXJyZW50U2xpZGUgLyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnZpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIGlmICggZG9jdW1lbnRbXy5oaWRkZW5dICkge1xuXG4gICAgICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJC5mbi5zbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGwgPSBfLmxlbmd0aCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICByZXQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBvcHQgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgX1tpXS5zbGljayA9IG5ldyBTbGljayhfW2ldLCBvcHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldCA9IF9baV0uc2xpY2tbb3B0XS5hcHBseShfW2ldLnNsaWNrLCBhcmdzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ICE9ICd1bmRlZmluZWQnKSByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH07XG5cbn0pKTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgJCgnLmFjdGlvbiAucm93IC5ub3BhZCcpLm1hdGNoSGVpZ2h0KCk7XG59KVxuXG4vL1vigJPigJPigJNcbi8vXHRcdFx04oaTIE1PQklMRSBTTElDSyBWSURFTyBTTElERVIg4oaTXG4vL+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAky8vXVxuJCgnI3NsaWNrLXJlcG9ydGluZywgI3NsaWNrLXRyYWluaW5nJykuc2xpY2soe1xuICBjZW50ZXJNb2RlOiB0cnVlLFxuICBjZW50ZXJQYWRkaW5nOiAnNjBweCcsXG4gIHNsaWRlc1RvU2hvdzogMyxcbiAgcmVzcG9uc2l2ZTogW1xuICAgIHtcbiAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgIHNldHRpbmdzOiB7XG5cdFx0XHRcdGFycm93czogdHJ1ZSxcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgY2VudGVyUGFkZGluZzogJzQwcHgnLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGJyZWFrcG9pbnQ6IDQwMCxcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgY2VudGVyUGFkZGluZzogJzQwcHgnLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0pO1xuXG4vL1vigJPigJPigJNcbi8vXHRcdFx04oaTIFNFTkQgUERGUyDihpNcbi8v4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCTLy9dXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0JCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB0aGVGb3JtID0gJCh0aGlzKTtcblxuXHRcdGNvbnN0IGVtYWlsRmllbGQgPSAkKHRoaXNbJ2VtYWlsLWFkZHJlc3MnXSkudmFsKCk7XG5cdFx0aWYgKCQoJy5wZGYtZW1haWwtZXJyb3InKVswXSkge1xuXHRcdFx0JCgncGRmLWVtYWlsLWVycm9yJykuaGlkZSgpO1xuXHRcdH1cblx0XHRpZighZW1haWxGaWVsZCl7XG5cdFx0XHQkKCcucGRmLWVtYWlsLWVycm9yJykuc2hvdygpO1xuXHRcdH1cblxuXHRcdGlmKGVtYWlsRmllbGQpIHtcblxuXHRcdFx0JCgnLnBkZi1lbWFpbC1lcnJvcicpLmhpZGUoKTtcblxuXHRcdFx0Y29uc3Qgc2VyaWFsRGF0YSA9ICQodGhpcykuc2VyaWFsaXplKCk7XG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogJy9lbWFpbC5waHAnLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGE6IHNlcmlhbERhdGFcblx0XHRcdH0pXG5cdFx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHQkKHRoZUZvcm0pLmhpZGUoKTtcblx0XHRcdFx0JCh0aGVGb3JtKS5uZXh0KCkuc2hvdygpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG59KTtcblxuXG4vL1vigJPigJPigJNcbi8vXHRcdFx04oaTIFNXQVAgVklERU9TICDihpNcbi8v4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCT4oCTLy9dXG4kKCcubGlzdCAuaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0aWYgKCQodGhpcykucGFyZW50cygnLmxpc3QnKS5jaGlsZHJlbignLml0ZW0nKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcblx0XHQkKHRoaXMpLnBhcmVudHMoJy5saXN0JykuY2hpbGRyZW4oJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9XG5cdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRjb25zdCBjaG9zZW5WaWRlb1VSTCA9ICQodGhpcykuYXR0cignZGF0YS12aWRlbycpO1xuXHQkKHRoaXMpLnBhcmVudHMoJy5jb2wteHMtMTInKS5uZXh0KCkuZmluZCgnaWZyYW1lJykuYXR0cignc3JjJywgY2hvc2VuVmlkZW9VUkwgKyAnP3JlbD0wJmFtcDtzaG93aW5mbz0wJyk7XG59KTtcblxuXG4vL1vigJPigJPigJNcbi8vXHRcdFx04oaTIFNIT1cgQU5EIEhJREUgRU1BSUwgRk9STVMg4oaTXG4vL+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAk+KAky8vXVxuJCgnLmVtYWlsLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuXHRpZiAoJCh0aGlzKS5wYXJlbnRzKCcucm93JykuY2hpbGRyZW4oJy5lbWFpbC1maWVsZCcpLmhhc0NsYXNzKCdlbWFpbC1hY3RpdmUnKSkge1xuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkubmV4dCgpLnJlbW92ZUNsYXNzKCdlbWFpbC1hY3RpdmUnKS5zbGlkZVVwKCk7XG5cdFx0cmV0dXJuXG5cdH0gZWxzZSB7XG5cdFx0JCgnLmVtYWlsLWFjdGl2ZScpLnNsaWRlVXAoKTtcblx0XHQkKCcuZW1haWwtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2VtYWlsLWFjdGl2ZScpO1xuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkubmV4dCgpLmFkZENsYXNzKCdlbWFpbC1hY3RpdmUnKS5zbGlkZURvd24oKTtcblx0fVxuXG59KVxuIl19