"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
var mailbar = "\n<div class=\"mailbar-header\">\n  <span id=\"mailbar-activate\">\n    <span class=\"show__768up\">Sign up for email updates about the ConnectIN™ Wheat Insight System.</span>\n    <span class=\"hide__768down\">Sign up for email updates</span>\n    <svg class=\"icon down\"><use xlink:href=\"#icon-down\"></use></svg>\n  </span>\n\n  </span>\n\n  <span id=\"mailbar-dismiss\" class=\"dismiss\">\n    <svg class=\"icon\">\n      <use xlink:href=\"#icon-circle-cross\"></use>\n    </svg>\n  </span>\n</div>\n<div id=\"mailbar-body\" class=\"mailbar-body\">\n    <!-- form  -->\n    <div id=\"signupform__ctn\" class=\"wFormContainer\">\n        <style type=\"text/css\"></style>\n        <div class=\"wForm\" id=\"tfa_0-WRPR\" dir=\"ltr\">\n            <div class=\"codesection\" id=\"code-tfa_0\"></div>\n            <h3 class=\"wFormTitle\" id=\"tfa_0-T\">ConnectIN Email Signup</h3>\n            <form method=\"post\" action=\"https://www.tfaforms.com/responses/processor\" class=\"hintsBelow labelsAbove ConnectIN-Email-Signup\" id=\"tfa_0\">\n                <div id=\"tfa_1-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_1-L\" for=\"tfa_1\" class=\"label preField reqMark\">First Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_1\" name=\"tfa_1\" value=\"\" placeholder=\"\" title=\"First Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_2-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_2-L\" for=\"tfa_2\" class=\"label preField reqMark\">Last Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_2\" name=\"tfa_2\" value=\"\" placeholder=\"\" title=\"Last Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_3-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_3-L\" for=\"tfa_3\" class=\"label preField reqMark\">Email</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input type=\"text\" id=\"tfa_3\" name=\"tfa_3\" value=\"\" placeholder=\"\" title=\"Email\" class=\"validate-email required\">\n                    </div>\n                </div>\n                <div id=\"tfa_4-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_4-L\" for=\"tfa_4\" class=\"label preField reqMark\">I am a:</label>\n                    <br>\n                    <div class=\"inputWrapper\"><span id=\"tfa_4\" class=\"choices vertical required\"><span class=\"oneChoice\"><input type=\"checkbox\" value=\"tfa_6\" class=\"\" checked id=\"tfa_6\" name=\"tfa_6\"><label class=\"label postField\" id=\"tfa_6-L\" for=\"tfa_6\">Grower</label></span>\n                        <span\n                            class=\"oneChoice\">\n                            <input type=\"checkbox\" value=\"tfa_5\" class=\"\" id=\"tfa_5\" name=\"tfa_5\">\n                            <label class=\"label postField\" id=\"tfa_5-L\" for=\"tfa_5\">Seed Supplier</label>\n                            </span>\n                            </span>\n                    </div>\n                </div>\n                <div class=\"actions\" id=\"tfa_0-A\">\n                    <input type=\"submit\" class=\"primaryAction\" value=\"Submit\">\n                </div>\n                <div style=\"clear:both\"></div>\n                <input type=\"hidden\" value=\"433713\" name=\"tfa_dbFormId\" id=\"tfa_dbFormId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_dbResponseId\" id=\"tfa_dbResponseId\">\n                <input type=\"hidden\" value=\"a8623a69d1e6264f46562887e0ccd599\" name=\"tfa_dbControl\" id=\"tfa_dbControl\">\n                <input type=\"hidden\" value=\"7\" name=\"tfa_dbVersionId\" id=\"tfa_dbVersionId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_switchedoff\" id=\"tfa_switchedoff\">\n            </form>\n        </div>\n        </div>\n    </div>\n\n</div>\n";

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

$('.toggleModal').on('click', function (e) {
	$('.modal').toggleClass('active');
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
		var queryStringAdd = '&recipients=' + encodeURIComponent($('#recipientEmail').val()) + '&sender=' + encodeURIComponent('no-reply@hlkagency.com') + '&subject=' + encodeURIComponent('Your Wheat Profitability Calculator Results') + '&firstName=' + '&memberBusname=';

		$.ajax({
			url: 'http://hlk-pdf-server.centralus.cloudapp.azure.com/api/v1/EmailLink?templateName=WestBred_ProfitCalc' + queryStringAdd,
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
			$('.modal').hide();
			$('.thankyoumodal').toggleClass('active');
			console.log("success");
		}).fail(function () {
			console.log("error");
		}).always(function () {
			console.log("complete");
		});
	}
});

function dataExtract() {
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
}

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
			var formElements = document.getElementById('seed_calc_form').querySelectorAll('input, textarea, select');
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
if ($('body').hasClass('find-seed-supplier')) {
	(function () {
		var changeState = function changeState() {
			if ($('#results').hasClass('hidden')) {
				$('#results').removeClass('hidden');
			}
			var selectedstate = $('#stateselect option:selected').val();
			$('.supplier, .rep').hide();
			$('.' + selectedstate).show();

			if (!$('.' + selectedstate)[0]) {
				$('.failure__nosuppliers').show();
				var stateChosen = $('#stateselect option:selected').text();
				$('.failureSpan').text(stateChosen);
				$('.rep__ctn').hide();
			} else {
				$('.failure__nosuppliers').hide();
				$('.rep__ctn').show();
			}
		};

		var success = function success(position) {
			var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k';

			$.getJSON(GEOCODING).done(function (location) {
				var thestate = location.results[0].address_components[4].short_name;
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

		navigator.geolocation.getCurrentPosition(success, error);
	})();
}

//# sourceMappingURL=data:application/json;base64,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eEI2QztBQXVDOUMiLCJmaWxlIjoiYnVuZGxlLmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmZpdHZpZHMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgc2VsZWN0b3JzID0gW1xuXHQnaWZyYW1lW3NyYyo9XCJwbGF5ZXIudmltZW8uY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLW5vY29va2llLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cImtpY2tzdGFydGVyLmNvbVwiXVtzcmMqPVwidmlkZW8uaHRtbFwiXScsXG5cdCdvYmplY3QnXG5dXG5cbnZhciBjc3MgPSAnLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXJ7d2lkdGg6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjA7fS5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGlmcmFtZSwuZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBvYmplY3QsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgZW1iZWQge3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO30nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudFNlbGVjdG9yLCBvcHRzKSB7XG5cdHBhcmVudFNlbGVjdG9yID0gcGFyZW50U2VsZWN0b3IgfHwgJ2JvZHknXG5cdG9wdHMgPSBvcHRzIHx8IHt9XG5cblx0aWYgKGlzT2JqZWN0KHBhcmVudFNlbGVjdG9yKSkge1xuXHRcdG9wdHMgPSBwYXJlbnRTZWxlY3RvclxuXHRcdHBhcmVudFNlbGVjdG9yID0gJ2JvZHknXG5cdH1cblxuXHRvcHRzLmlnbm9yZSA9IG9wdHMuaWdub3JlIHx8ICcnXG5cdG9wdHMucGxheWVycyA9IG9wdHMucGxheWVycyB8fCAnJ1xuXG5cdHZhciBjb250YWluZXJzID0gcXVlcnlBbGwocGFyZW50U2VsZWN0b3IpXG5cdGlmICghaGFzTGVuZ3RoKGNvbnRhaW5lcnMpKSByZXR1cm5cblxuXHRpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXQtdmlkcy1zdHlsZScpKSB7XG5cdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlcygpKVxuXHR9XG5cblx0dmFyIGN1c3RvbSA9IHRvU2VsZWN0b3JBcnJheShvcHRzLnBsYXllcnMpIHx8IFtdXG5cdHZhciBpZ25vcmVkID0gdG9TZWxlY3RvckFycmF5KG9wdHMuaWdub3JlKSB8fCBbXVxuXHR2YXIgc2VsZWN0b3IgPSBzZWxlY3RvcnNcblx0XHQuZmlsdGVyKG5vdElnbm9yZWQoaWdub3JlZCkpXG5cdFx0LmNvbmNhdChjdXN0b20pXG5cdFx0LmpvaW4oKVxuXG5cdGlmICghaGFzTGVuZ3RoKHNlbGVjdG9yKSkgcmV0dXJuXG5cblx0Y29udGFpbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHR2YXIgdmlkZW9zID0gcXVlcnlBbGwoY29udGFpbmVyLCBzZWxlY3Rvcilcblx0XHR2aWRlb3MuZm9yRWFjaChmdW5jdGlvbiAodmlkZW8pIHtcblx0XHRcdHdyYXAodmlkZW8pXG5cdFx0fSlcblx0fSlcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwgKGVsLCBzZWxlY3Rvcikge1xuXHRpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuXHRcdHNlbGVjdG9yID0gZWxcblx0XHRlbCA9IGRvY3VtZW50XG5cdH1cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxufVxuXG5mdW5jdGlvbiB0b1NlbGVjdG9yQXJyYXkgKGlucHV0KSB7XG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNwbGl0KCcsJykubWFwKHRyaW0pLmZpbHRlcihoYXNMZW5ndGgpXG5cdH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gZmxhdHRlbihpbnB1dC5tYXAodG9TZWxlY3RvckFycmF5KS5maWx0ZXIoaGFzTGVuZ3RoKSlcblx0fVxuXHRyZXR1cm4gaW5wdXQgfHwgW11cbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwpIHtcblx0aWYgKC9mbHVpZC13aWR0aC12aWRlby13cmFwcGVyLy50ZXN0KGVsLnBhcmVudE5vZGUuY2xhc3NOYW1lKSkgcmV0dXJuXG5cblx0dmFyIHdpZHRoQXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSwgMTApXG5cdHZhciBoZWlnaHRBdHRyID0gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSwgMTApXG5cblx0dmFyIHdpZHRoID0gIWlzTmFOKHdpZHRoQXR0cikgPyB3aWR0aEF0dHIgOiBlbC5jbGllbnRXaWR0aFxuXHR2YXIgaGVpZ2h0ID0gIWlzTmFOKGhlaWdodEF0dHIpID8gaGVpZ2h0QXR0ciA6IGVsLmNsaWVudEhlaWdodFxuXHR2YXIgYXNwZWN0ID0gaGVpZ2h0IC8gd2lkdGhcblxuXHRlbC5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJylcblx0ZWwucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKVxuXG5cdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgZWwpXG5cdHdyYXBwZXIuY2xhc3NOYW1lID0gJ2ZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXInXG5cdHdyYXBwZXIuc3R5bGUucGFkZGluZ1RvcCA9IChhc3BlY3QgKiAxMDApICsgJyUnXG5cdHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpXG59XG5cbmZ1bmN0aW9uIHN0eWxlcyAoKSB7XG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRkaXYuaW5uZXJIVE1MID0gJzxwPng8L3A+PHN0eWxlIGlkPVwiZml0LXZpZHMtc3R5bGVcIj4nICsgY3NzICsgJzwvc3R5bGU+J1xuXHRyZXR1cm4gZGl2LmNoaWxkTm9kZXNbMV1cbn1cblxuZnVuY3Rpb24gbm90SWdub3JlZCAoaWdub3JlZCkge1xuXHRpZiAoaWdub3JlZC5sZW5ndGggPCAxKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XHRyZXR1cm4gaWdub3JlZC5pbmRleE9mKHNlbGVjdG9yKSA9PT0gLTFcblx0fVxufVxuXG5mdW5jdGlvbiBoYXNMZW5ndGggKGlucHV0KSB7XG5cdHJldHVybiBpbnB1dC5sZW5ndGggPiAwXG59XG5cbmZ1bmN0aW9uIHRyaW0gKHN0cikge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuIChpbnB1dCkge1xuXHRyZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBpbnB1dClcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKGlucHV0KSB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJ1xufVxuXG5mdW5jdGlvbiBpc0FycmF5IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xufVxuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG5cbmZpdHZpZHMoKTtcbmNvbnN0IG1haWxiYXIgPSBgXG48ZGl2IGNsYXNzPVwibWFpbGJhci1oZWFkZXJcIj5cbiAgPHNwYW4gaWQ9XCJtYWlsYmFyLWFjdGl2YXRlXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzaG93X183Njh1cFwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXMgYWJvdXQgdGhlIENvbm5lY3RJTuKEoiBXaGVhdCBJbnNpZ2h0IFN5c3RlbS48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJoaWRlX183Njhkb3duXCI+U2lnbiB1cCBmb3IgZW1haWwgdXBkYXRlczwvc3Bhbj5cbiAgICA8c3ZnIGNsYXNzPVwiaWNvbiBkb3duXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPjwvc3ZnPlxuICA8L3NwYW4+XG5cbiAgPC9zcGFuPlxuXG4gIDxzcGFuIGlkPVwibWFpbGJhci1kaXNtaXNzXCIgY2xhc3M9XCJkaXNtaXNzXCI+XG4gICAgPHN2ZyBjbGFzcz1cImljb25cIj5cbiAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNpcmNsZS1jcm9zc1wiPjwvdXNlPlxuICAgIDwvc3ZnPlxuICA8L3NwYW4+XG48L2Rpdj5cbjxkaXYgaWQ9XCJtYWlsYmFyLWJvZHlcIiBjbGFzcz1cIm1haWxiYXItYm9keVwiPlxuICAgIDwhLS0gZm9ybSAgLS0+XG4gICAgPGRpdiBpZD1cInNpZ251cGZvcm1fX2N0blwiIGNsYXNzPVwid0Zvcm1Db250YWluZXJcIj5cbiAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPjwvc3R5bGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3Rm9ybVwiIGlkPVwidGZhXzAtV1JQUlwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvZGVzZWN0aW9uXCIgaWQ9XCJjb2RlLXRmYV8wXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJ3Rm9ybVRpdGxlXCIgaWQ9XCJ0ZmFfMC1UXCI+Q29ubmVjdElOIEVtYWlsIFNpZ251cDwvaDM+XG4gICAgICAgICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiaHR0cHM6Ly93d3cudGZhZm9ybXMuY29tL3Jlc3BvbnNlcy9wcm9jZXNzb3JcIiBjbGFzcz1cImhpbnRzQmVsb3cgbGFiZWxzQWJvdmUgQ29ubmVjdElOLUVtYWlsLVNpZ251cFwiIGlkPVwidGZhXzBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGZhXzEtRFwiIGNsYXNzPVwib25lRmllbGQgZmllbGQtY29udGFpbmVyLUQgICAgIFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaWQ9XCJ0ZmFfMS1MXCIgZm9yPVwidGZhXzFcIiBjbGFzcz1cImxhYmVsIHByZUZpZWxkIHJlcU1hcmtcIj5GaXJzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRXcmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRmYV8xXCIgbmFtZT1cInRmYV8xXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlwiIHRpdGxlPVwiRmlyc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8yLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzItTFwiIGZvcj1cInRmYV8yXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+TGFzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRXcmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRmYV8yXCIgbmFtZT1cInRmYV8yXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlwiIHRpdGxlPVwiTGFzdCBOYW1lXCIgY2xhc3M9XCJyZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGZhXzMtRFwiIGNsYXNzPVwib25lRmllbGQgZmllbGQtY29udGFpbmVyLUQgICAgIFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaWQ9XCJ0ZmFfMy1MXCIgZm9yPVwidGZhXzNcIiBjbGFzcz1cImxhYmVsIHByZUZpZWxkIHJlcU1hcmtcIj5FbWFpbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfM1wiIG5hbWU9XCJ0ZmFfM1wiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkVtYWlsXCIgY2xhc3M9XCJ2YWxpZGF0ZS1lbWFpbCByZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGZhXzQtRFwiIGNsYXNzPVwib25lRmllbGQgZmllbGQtY29udGFpbmVyLUQgICAgIFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaWQ9XCJ0ZmFfNC1MXCIgZm9yPVwidGZhXzRcIiBjbGFzcz1cImxhYmVsIHByZUZpZWxkIHJlcU1hcmtcIj5JIGFtIGE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRXcmFwcGVyXCI+PHNwYW4gaWQ9XCJ0ZmFfNFwiIGNsYXNzPVwiY2hvaWNlcyB2ZXJ0aWNhbCByZXF1aXJlZFwiPjxzcGFuIGNsYXNzPVwib25lQ2hvaWNlXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwidGZhXzZcIiBjbGFzcz1cIlwiIGNoZWNrZWQgaWQ9XCJ0ZmFfNlwiIG5hbWU9XCJ0ZmFfNlwiPjxsYWJlbCBjbGFzcz1cImxhYmVsIHBvc3RGaWVsZFwiIGlkPVwidGZhXzYtTFwiIGZvcj1cInRmYV82XCI+R3Jvd2VyPC9sYWJlbD48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwib25lQ2hvaWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwidGZhXzVcIiBjbGFzcz1cIlwiIGlkPVwidGZhXzVcIiBuYW1lPVwidGZhXzVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV81LUxcIiBmb3I9XCJ0ZmFfNVwiPlNlZWQgU3VwcGxpZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCIgaWQ9XCJ0ZmFfMC1BXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJwcmltYXJ5QWN0aW9uXCIgdmFsdWU9XCJTdWJtaXRcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCI0MzM3MTNcIiBuYW1lPVwidGZhX2RiRm9ybUlkXCIgaWQ9XCJ0ZmFfZGJGb3JtSWRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiXCIgbmFtZT1cInRmYV9kYlJlc3BvbnNlSWRcIiBpZD1cInRmYV9kYlJlc3BvbnNlSWRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiYTg2MjNhNjlkMWU2MjY0ZjQ2NTYyODg3ZTBjY2Q1OTlcIiBuYW1lPVwidGZhX2RiQ29udHJvbFwiIGlkPVwidGZhX2RiQ29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCI3XCIgbmFtZT1cInRmYV9kYlZlcnNpb25JZFwiIGlkPVwidGZhX2RiVmVyc2lvbklkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfc3dpdGNoZWRvZmZcIiBpZD1cInRmYV9zd2l0Y2hlZG9mZlwiPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuYFxuXG5pZiAoICgkKCdib2R5JykuaGFzQ2xhc3MoJ3NpZ24tdXAnKSA9PT0gdHJ1ZSkgfHwgKGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oPzooPzpefC4qO1xccyopc3Vic2NyaWJlZFxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJC8sICckMScpICE9PSAndHJ1ZScpICkge1xuXG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2NvbnRhY3QtdXMnKSA9PT0gdHJ1ZSkge1xuICAgICQoJyNtYWlsYmFyJykuaGlkZSgpXG4gIH1lbHNlIHtcbiAgICAkKCcjbWFpbGJhcicpLmh0bWwobWFpbGJhcilcbiAgfVxuXG59XG5cbi8vIGNsaWNrIHRpdGxlIG9yIGRvd24gYXJyb3dcbiQoJyNtYWlsYmFyLWFjdGl2YXRlJykub24oJ2NsaWNrIHRvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuICBsZXQgdmhcbiAgY29uc3QgJGJvZHkgPSAkKCcjbWFpbGJhci1ib2R5JylcbiAgY29uc3QgYXJyb3dEb3duID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT4nXG4gIGNvbnN0IGFycm93VXAgPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tdXBcIj48L3VzZT4nXG5cbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgdmggPSAkKHdpbmRvdykuaGVpZ2h0KCkgLSAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gIH0gZWxzZSB7XG4gICAgdmggPSA0MDBcbiAgfVxuXG4gIGlmICgkYm9keS5oZWlnaHQoKSA9PT0gMCkge1xuICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAkYm9keS5hbmltYXRlKHsgaGVpZ2h0OiB2aCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dVcClcbiAgfSBlbHNlIHtcbiAgICAkYm9keS5hbmltYXRlKHsgaGVpZ2h0OiAwIH0pXG4gICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd0Rvd24pXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21haWxiYXItYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG59KVxuXG4vLyBjbGljayBkaXNtaXNzXG4kKCcjbWFpbGJhci1kaXNtaXNzJykub24oJ2NsaWNrJywgZGlzbWlzc01haWxiYXIpXG5cbmZ1bmN0aW9uIGRpc21pc3NNYWlsYmFyICgpIHtcbiAgLy8gaWYgdGhlIG1lbnUgaXMgYWN0aXZlIGFuZCB5b3UgZGlzbWlzcywgcmVjYWxjdWxhdGUgbWVudSBoZWlnaHRcbiAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnbWVudS1hY3RpdmUnKSkge1xuICAgIGNvbnN0IG1lbnUgPSAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKVxuICAgIGNvbnN0IGFkZGVkSGVpZ2h0ID0gbWVudS5oZWlnaHQoKSArICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgICAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5jc3MoJ2hlaWdodCcsIGFkZGVkSGVpZ2h0ICsgJ3B4JylcbiAgfVxuXG4gICQoJyNtYWlsYmFyJykuYW5pbWF0ZSh7IGhlaWdodDogJzAnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZSgpXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gIH0pXG5cbiAgZG9jdW1lbnQuY29va2llID0gJ3N1YnNjcmliZWQ9dHJ1ZSdcbn1cbiQoJyNtZW51LWFjdGl2YXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBsZXQgbWFpbGJhciA9IDBcbiAgaWYgKCQoJyNtYWlsYmFyLWJvZHknKS5sZW5ndGgpIHtcbiAgICBtYWlsYmFyID0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9XG5cbiAgY29uc3QgdmggPSAkKHdpbmRvdykuaGVpZ2h0KCkgLSAkKCcjbWVudScpLmhlaWdodCgpIC0gbWFpbGJhclxuICBjb25zdCBtZW51ID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1lbnVcIj48L3VzZT4nXG4gIGNvbnN0IGNyb3NzID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNyb3NzXCI+PC91c2U+J1xuXG4gIGlmICgkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5oZWlnaHQoKSA9PT0gMCkge1xuICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5hbmltYXRlKHsgaGVpZ2h0OiB2aCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoY3Jvc3MpXG4gIH0gZWxzZSB7XG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwobWVudSlcbiAgfVxuXG4gICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWVudS1hY3RpdmUnKVxuICAkKCdodG1sJykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbn0pXG5cbi8vIFRPRE86IHJlY2FsYyBtZW51IGhlaWdodCBvbiByZXNpemUgaWYgaW4gbW9iaWxlIHdpZHRoc1xuJCh3aW5kb3cpLnJlc2l6ZSgpXG4kKCcuYmVuZWZpdHNfX2hlYWRsaW5lJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKHRoaXMpLm5leHQoKVxuICAgIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICAgIGNvbnN0IGFycm93VXAgPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tdXBcIj48L3VzZT4nXG5cbiAgICAkYm9keS5zbGlkZVRvZ2dsZSgpXG5cbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gICAgfVxuXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgfVxufSlcbi8vIHdpbmRvdy5hbGVydCA9IGZ1bmN0aW9uICgpIHt9XG4vLyAgVmFsaWRhdGUgQ29udGFjdCBVcyBGaWVsZHNcbmlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2NvbnRhY3QtdXMnKSkge1xuICAgICQoJy5wcmltYXJ5QWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgZnVuY3Rpb24gVmFsaXQoKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoJCgnLnZhbGlkYXRlLWVtYWlsJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdEVtYWlsJykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHggc29saWQgcmVkXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yXCI6IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKCcjdGZhXzInKS52YWwoKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0TWVzc2FnZScpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0TWVzc2FnZScpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yXCI6IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBydW5pdCA9IFZhbGl0KCk7XG4gICAgICAgIHZhciBlcnJvciA9ICc8c3BhbiBzdHlsZT1cInBvc2l0aW9uOnN0YXRpYztcIiBjbGFzcz1cImVycm9yRm9ybU1lc3NhZ2VcIj5Zb3UgbXVzdCBjb21wbGV0ZSBhbGwgZmllbGRzIGFib3ZlLjwvc3Bhbj4nXG4gICAgICAgIGlmIChydW5pdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAkKCcjdGZhXzAnKS5zdWJtaXQoKVxuICAgICAgICAgICAgJCgnLmVycm9yRm9ybU1lc3NhZ2UnKS5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCQoJy5lcnJvckZvcm1NZXNzYWdlJylbMF0pIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0TWVzc2FnZScpLmFmdGVyKGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cbid1c2Ugc3RyaWN0J1xuXG4kKCcudG9nZ2xlTW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAkKCcubW9kYWwnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG59KTtcblxuJCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgJCgnLnRoYW5reW91bW9kYWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59KTtcblxuJCgnI3Jlc2V0X2Zvcm0sI3RoYW5reW91X19zdGFydG92ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdCQod2luZG93KS5zY3JvbGxUb3AoMCk7XG59KTtcblxuJChcIiNlbWFpbERhdGFGb3JtXCIpLmJpbmQoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBkZWZhdWx0IGV2ZW50XG4gICB9XG59KTtcblxuXG4kKCcjZG93bmxvYWRQREYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KClcblxuXHQkKCcjcGRmRGF0YScpLnZhbChKU09OLnN0cmluZ2lmeShkYXRhRXh0cmFjdCgpKSlcblx0JCgnI3BkZkZvcm0nKS5zdWJtaXQoKVxufSlcblxuJCgnI21haWxQREYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHQvL1ZhbGlkYXRlIEVtYWlsXG5cdGZ1bmN0aW9uIGlzX2VtYWlsKGVtYWlsKXtcblx0dmFyIGVtYWlsUmVnID0gL15bYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aXXsyLDR9JC87XG5cdHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTsgfVxuXG5cdHZhciBlbWFpbElucHV0ID0gaXNfZW1haWwoJCgnI3JlY2lwaWVudEVtYWlsJykudmFsKCkpXG5cdHZhciBlbWFpbEVycm9yID0gJzxzbWFsbCBjbGFzcz1cImVtYWlsRXJyb3JcIj5QbGVhc2UgZW50ZXIgdmFsaWQgZW1haWwuPC9zbWFsbCdcblxuXHRpZiAoZW1haWxJbnB1dCA9PSBmYWxzZSkge1xuXHRcdCQoJyNyZWNpcGllbnRFbWFpbCcpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJyZWRcIn0pXG5cdFx0aWYgKCQoJy5lbWFpbEVycm9yJylbMF0pIHtcblx0XHR9ZWxzZSB7XG5cdFx0XHQkKCcjbWFpbFBERicpLmFmdGVyKGVtYWlsRXJyb3IpXG5cdFx0fVxuXG5cblx0fWVsc2Uge1xuXHRcdCQoJy5lbWFpbEVycm9yJykucmVtb3ZlKClcblx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwiaW5oZXJpdFwifSlcblx0XHR2YXIgcXVlcnlTdHJpbmdBZGQgPSAnJnJlY2lwaWVudHM9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKCcjcmVjaXBpZW50RW1haWwnKS52YWwoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZzZW5kZXI9JyArIGVuY29kZVVSSUNvbXBvbmVudCgnbm8tcmVwbHlAaGxrYWdlbmN5LmNvbScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc3ViamVjdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCdZb3VyIFdoZWF0IFByb2ZpdGFiaWxpdHkgQ2FsY3VsYXRvciBSZXN1bHRzJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZmaXJzdE5hbWU9J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KyAnJm1lbWJlckJ1c25hbWU9J1xuXG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogJ2h0dHA6Ly9obGstcGRmLXNlcnZlci5jZW50cmFsdXMuY2xvdWRhcHAuYXp1cmUuY29tL2FwaS92MS9FbWFpbExpbms/dGVtcGxhdGVOYW1lPVdlc3RCcmVkX1Byb2ZpdENhbGMnICsgcXVlcnlTdHJpbmdBZGQsXG5cdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRkYXRhOiAneyBcImpzb25cIiA6ICcgKyBKU09OLnN0cmluZ2lmeShkYXRhRXh0cmFjdCgpKSArICd9Jyxcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgb3B0cyA9IHtcblx0XHRcdFx0ICBsaW5lczogMTMgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG5cdFx0XHRcdCwgbGVuZ3RoOiAyOCAvLyBUaGUgbGVuZ3RoIG9mIGVhY2ggbGluZVxuXHRcdFx0XHQsIHdpZHRoOiAxNCAvLyBUaGUgbGluZSB0aGlja25lc3Ncblx0XHRcdFx0LCByYWRpdXM6IDQyIC8vIFRoZSByYWRpdXMgb2YgdGhlIGlubmVyIGNpcmNsZVxuXHRcdFx0XHQsIHNjYWxlOiAwLjE1IC8vIFNjYWxlcyBvdmVyYWxsIHNpemUgb2YgdGhlIHNwaW5uZXJcblx0XHRcdFx0LCBjb3JuZXJzOiAwLjMgLy8gQ29ybmVyIHJvdW5kbmVzcyAoMC4uMSlcblx0XHRcdFx0LCBjb2xvcjogJyNmZmYnIC8vICNyZ2Igb3IgI3JyZ2diYiBvciBhcnJheSBvZiBjb2xvcnNcblx0XHRcdFx0LCBvcGFjaXR5OiAwIC8vIE9wYWNpdHkgb2YgdGhlIGxpbmVzXG5cdFx0XHRcdCwgcm90YXRlOiAwIC8vIFRoZSByb3RhdGlvbiBvZmZzZXRcblx0XHRcdFx0LCBkaXJlY3Rpb246IDEgLy8gMTogY2xvY2t3aXNlLCAtMTogY291bnRlcmNsb2Nrd2lzZVxuXHRcdFx0XHQsIHNwZWVkOiAxIC8vIFJvdW5kcyBwZXIgc2Vjb25kXG5cdFx0XHRcdCwgdHJhaWw6IDg1IC8vIEFmdGVyZ2xvdyBwZXJjZW50YWdlXG5cdFx0XHRcdCwgZnBzOiAyMCAvLyBGcmFtZXMgcGVyIHNlY29uZCB3aGVuIHVzaW5nIHNldFRpbWVvdXQoKSBhcyBhIGZhbGxiYWNrIGZvciBDU1Ncblx0XHRcdFx0LCB6SW5kZXg6IDJlOSAvLyBUaGUgei1pbmRleCAoZGVmYXVsdHMgdG8gMjAwMDAwMDAwMClcblx0XHRcdFx0LCBjbGFzc05hbWU6ICdzcGlubmVyJyAvLyBUaGUgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgc3Bpbm5lclxuXHRcdFx0XHQsIHRvcDogJy0yMHB4JyAvLyBUb3AgcG9zaXRpb24gcmVsYXRpdmUgdG8gcGFyZW50XG5cdFx0XHRcdCwgbGVmdDogJzUwJScgLy8gTGVmdCBwb3NpdGlvbiByZWxhdGl2ZSB0byBwYXJlbnRcblx0XHRcdFx0LCBzaGFkb3c6IGZhbHNlIC8vIFdoZXRoZXIgdG8gcmVuZGVyIGEgc2hhZG93XG5cdFx0XHRcdCwgaHdhY2NlbDogZmFsc2UgLy8gV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uXG5cdFx0XHRcdCwgcG9zaXRpb246ICdyZWxhdGl2ZScgLy8gRWxlbWVudCBwb3NpdGlvbmluZ1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIob3B0cykuc3BpbigpXG5cdFx0XHRcdCQoJyNtYWlsUERGJykuY3NzKCdjb2xvcicsICd0cmFuc3BhcmVudCcpO1xuXHRcdFx0XHQkKCcjbWFpbFBERicpLmFmdGVyKHNwaW5uZXIuZWwpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdCQoJy5tb2RhbCcpLmhpZGUoKVxuXHRcdFx0JCgnLnRoYW5reW91bW9kYWwnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcblx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcblx0XHR9KVxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcblx0XHR9KVxuXHRcdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuXHRcdH0pXG5cdH1cblxufSlcblxuZnVuY3Rpb24gZGF0YUV4dHJhY3QgKCkge1xuXHRyZXR1cm4ge1xuXHRcdGNlcnRHZXJtaW5hdGlvbjogJCgnI2NlcnRfc2VlZF9nZXJtaW5hdGlvbicpLnZhbCgpLFxuXHRcdGNlcnRQdXJlU2VlZDogJCgnI2NlcnRfc2VlZF9wdXJlX3NlZWQnKS52YWwoKSxcblx0XHRjZXJ0U2VlZENvc3Q6ICQoJyNjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCcpLnZhbCgpLFxuXHRcdHNhdmVkR2VybWluYXRpb246ICQoJyNzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJykudmFsKCksXG5cdFx0c2F2ZWRQdXJlU2VlZDogJCgnI3NhdmVkX3NlZWRfcHVyZV9zZWVkJykudmFsKCksXG5cdFx0c2F2ZWRTZWVkQ29zdDogJCgnI3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCcpLnZhbCgpLFxuXHRcdHNlYXNvbjogJCgnaW5wdXRbbmFtZT1cImNyb3Bfc2Vhc29uXCJdOmNoZWNrZWQnKS52YWwoKSxcblx0XHR0YXJnZXRZaWVsZDogJCgnI2Nyb3BfdGFyZ2V0X3lpZWxkJykudmFsKCksXG5cdFx0d2hlYXRQcmljZTogJCgnI2Nyb3Bfd2hlYXRfcHJpY2UnKS52YWwoKSxcblx0XHR0YXJnZXRQbGFudFBvcHVsYXRpb246ICQoJyNjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJykudmFsKCksXG5cdFx0ZmxhdFNlZWRpbmdSYXRlOiAkKCcjY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZScpLnZhbCgpLFxuXHRcdGFjcmVzUGxhbnRlZDogJCgnI2Nyb3BfYWNyZXNfcGxhbnRlZCcpLnZhbCgpLFxuXHRcdHlpZWxkSW1wYWN0T3ZlcnNlZWRpbmc6ICQoJyNjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJykudmFsKCksXG5cdFx0eWllbGRJbXBhY3RVbmRlcnNlZWRpbmc6ICQoJyNjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZycpLnZhbCgpLFxuXHRcdGltcGFjdENvbXBhcmVHcmFwaDogJCgnI2NvbXBhcmVHcmFwaCcpLnZhbCgpLFxuXHRcdG1heGltaXplUmV2ZW51ZUdyYXBoOiAkKCcjcmV2ZW51ZUdyYXBoJykudmFsKClcblx0fVxufVxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHQvLyBNYWluIGFwcCBzdGFydHVwXG5cblx0dmFyIFV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8vIEdldCB0aGUgdG9wIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgaW4gdGhlIGRvY3VtZW50XG5cdFx0Ly8gRnJvbSBzbW9vdGhTY3JvbGwsIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGljZWxpZXV0aWVyL3Ntb290aFNjcm9sbC9ibG9iL21hc3Rlci9zbW9vdGhzY3JvbGwuanNcblx0XHR2YXIgZ2V0VG9wID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0Ly8gcmV0dXJuIHZhbHVlIG9mIGh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC4uLiBJRSA6IDAsIG90aGVyIGJyb3dzZXJzIDogLXBhZ2VZT2Zmc2V0XG5cdFx0XHRpZihlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHJldHVybiAtd2luZG93LnBhZ2VZT2Zmc2V0XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSBjdXJyZW50IHNjcmVlbiB2aWV3cG9ydCB3aWR0aFxuXHRcdHZhciBnZXRWaWV3cG9ydFdpZHRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcblx0XHR9XG5cblx0XHQvLyBBZGQgZGlnaXQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgdG8gYSBudW1lcmljIHN0cmluZ1xuXHRcdHZhciBhZGREaWdpdFNlcGFyYXRvcnMgPSBmdW5jdGlvbiAobnVtKSB7XG5cdFx0XHR2YXIgbiA9IG51bS50b1N0cmluZygpXG5cdFx0XHR2YXIgcCA9IG4uaW5kZXhPZignLicpXG5cdFx0XHRyZXR1cm4gbi5yZXBsYWNlKC9cXGQoPz0oPzpcXGR7M30pKyg/OlxcLnwkKSkvZywgZnVuY3Rpb24gKCQwLCBpKSB7XG5cdFx0XHRcdHJldHVybiBwIDwgMCB8fCBpIDwgcCA/ICgkMCArICcsJykgOiAkMFxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNoYXJhY3RlciByZXByZXNlbnRhdGlvbiBvZiBJbmZpbml0eVxuXHRcdHZhciBnZXRJbmZpbml0eUNoYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJ+KInidcblx0XHR9XG5cblx0XHQvLyBGb3JtYXQgYSBudW1iZXIgZm9yIGRpc3BsYXlcblx0XHR2YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24gKG51bWJlciwgZGVjaW1hbHMsIHNob3dQb3NpdGl2ZSkge1xuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChudW1iZXIpXG5cdFx0XHRpZiAoIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkZWNpbWFscyAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVjaW1hbHMgIT09IG51bGwpIHtcblx0XHRcdFx0XHQvLyBLZWVwIGEgc2V0IG51bWJlciBvZiBkZWNpbWFscywgZXZlbiBpZiB6ZXJvZXNcblx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoZGVjaW1hbHMpKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEp1c3QgdHJ1bmNhdGUgdG8gYSBmaXhlZCBudW1iZXIgb2YgZGVjaW1hbHMsIGJ1dCBkb24ndCBwcmVzZXJ2ZSB0cmFpbGluZyB6ZXJvZXNcblx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnMocGFyc2VGbG9hdCh2YWx1ZS50b0ZpeGVkKDIpKSkpXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBnZXRJbmZpbml0eUNoYXIoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZvcm1hdCBhIG51bWJlciBhcyBjdXJyZW55IGZvciBkaXNwbGF5XG5cdFx0dmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24gKG51bWJlciwgc2hvd0RlY2ltYWxzLCBzaG93UG9zaXRpdmUpIHtcblx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobnVtYmVyKVxuXHRcdFx0aWYgKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArICckJyArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChzaG93RGVjaW1hbHMgPT09IHRydWUgPyAyIDogMCkpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZ2V0SW5maW5pdHlDaGFyKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGEgZm9ybWF0dGVkIG51bWJlciBiYWNrIGludG8gYW4gYWN0dWFsIG51bWJlclxuXHRcdHZhciB1bmZvcm1hdE51bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgvW14tXFxkXFwuZV0vZywgJycpLnRyaW0oKSlcblx0XHR9XG5cblx0XHQvLyBGb3JtYXQgYSBpbnB1dCBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlIFwiZGF0YS1mb3JtYXRcIiBhdHRyaWJ1dGVcblx0XHR2YXIgZm9ybWF0VmFsdWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0aWYgKCFlbGVtZW50IHx8IChlbGVtZW50ICYmICFlbGVtZW50LnZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gJydcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBlbGVtZW50LnZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWx1ZVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZm9ybWF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5kYXRhc2V0LmZvcm1hdFxuXG5cdFx0XHRzd2l0Y2ggKGZvcm1hdCkge1xuXHRcdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cblx0XHRcdFx0Y2FzZSAnc2lnbmVkbnVtYmVyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCBudWxsLCB0cnVlKVxuXG5cdFx0XHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIDApXG5cblx0XHRcdFx0Y2FzZSAnZml4ZWQyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCAyKVxuXG5cdFx0XHRcdGNhc2UgJ2N1cnJlbmN5Jzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0Q3VycmVuY3kodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cdFx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsdWVcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Z2V0VG9wOiBnZXRUb3AsXG5cdFx0XHRnZXRWaWV3cG9ydFdpZHRoOiBnZXRWaWV3cG9ydFdpZHRoLFxuXHRcdFx0YWRkRGlnaXRTZXBhcmF0b3JzOiBhZGREaWdpdFNlcGFyYXRvcnMsXG5cdFx0XHRnZXRJbmZpbml0eUNoYXI6IGdldEluZmluaXR5Q2hhcixcblx0XHRcdGZvcm1hdE51bWJlcjogZm9ybWF0TnVtYmVyLFxuXHRcdFx0Zm9ybWF0Q3VycmVuY3k6IGZvcm1hdEN1cnJlbmN5LFxuXHRcdFx0dW5mb3JtYXROdW1iZXI6IHVuZm9ybWF0TnVtYmVyLFxuXHRcdFx0Zm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG5cdFx0fVxuXHR9KCkpXG5cblx0dmFyIFNlZWRDYWxjRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFNFRURTX1BFUl9MQl9NSU4gPSA5MDAwXG5cdFx0dmFyIFNFRURTX1BFUl9MQl9NQVggPSAxODAwMFxuXHRcdHZhciBTRUVEU19QRVJfTEJfU1RFUCA9IDUwMFxuXG5cdFx0dmFyIFNlZWRDYWxjVXNlckRhdGEgPSBmdW5jdGlvbiAoY2VydGlmaWVkKSB7XG5cdFx0XHQvLyBQcm9wZXJ0aWVzXG5cdFx0XHR0aGlzLnNlYXNvbiA9ICd3aW50ZXInIC8vIHNwcmluZ3x3aW50ZXJcblxuXHRcdFx0dGhpcy5wZXJjZW50R2VybWluYXRpb24gPSAwXG5cdFx0XHR0aGlzLnBlcmNlbnRQdXJlU2VlZCA9IDBcblx0XHRcdHRoaXMuY29zdFBlckNXVCA9IDBcblx0XHRcdHRoaXMudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMud2hlYXRQcmljZVBlckJ1c2hlbCA9IDBcblx0XHRcdHRoaXMudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMFxuXHRcdFx0dGhpcy5mbGF0UmF0ZUxiUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMuYWNyZXNQbGFudGVkID0gMFxuXG5cdFx0XHR0aGlzLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXHRcdFx0dGhpcy5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXG5cdFx0XHQvLyBPdGhlclxuXHRcdFx0dGhpcy5pc0NlcnRpZmllZCA9ICEhY2VydGlmaWVkXG5cblx0XHRcdC8vIE1ldGhvZHNcblx0XHRcdHRoaXMucmVzZXRUb0RlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAodGhpcy5pc0NlcnRpZmllZCkge1xuXHRcdFx0XHRcdHNldENlcnRpZmllZFNlZWREZWZhdWx0cyh0aGlzKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNldFNhdmVkU2VlZERlZmF1bHRzKHRoaXMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZVxuXHRcdFx0dGhpcy5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdH1cblxuXHRcdHZhciBPcHRpbWFsU2VlZGluZ1JhdGVJbXBhY3REYXRhID0gZnVuY3Rpb24gKHNlZWRzUGVyTGIpIHtcblx0XHRcdC8vIENhbGN1bGF0ZWRcblx0XHRcdHRoaXMueWllbGRBZHZhbnRhZ2VCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gMFxuXHRcdFx0dGhpcy5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IDBcblx0XHRcdHRoaXMuY29zdFBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLnRvdGFsU2VlZENvc3QgPSAwXG5cdFx0XHR0aGlzLmFjdHVhbFNlZWRpbmdSYXRlID0gMFxuXHRcdFx0dGhpcy5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gMFxuXHRcdFx0dGhpcy5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QgPSAwXG5cdFx0XHR0aGlzLmZsYXRSYXRlQ29zdFBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSA9IDBcblx0XHRcdHRoaXMudG90YWxTZWVkQ29zdCA9IDBcblx0XHRcdHRoaXMudG90YWxTZWVkQ29zdERpZmZlcmVudGlhbCA9IDBcblx0XHRcdHRoaXMucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgPSAwXG5cdFx0XHR0aGlzLm5ldFJldmVudWVMYlBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWVCZW5lZml0ID0gMFxuXG5cdFx0XHQvLyBPdGhlclxuXHRcdFx0dGhpcy5zZWVkc1BlckxiID0gc2VlZHNQZXJMYlxuXHRcdH1cblxuXHRcdHZhciBzZXRDZXJ0aWZpZWRTZWVkRGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDAuOTVcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCA9IDAuOTg1XG5cdFx0XHR1c2VyRGF0YS5jb3N0UGVyQ1dUID0gMThcblx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gdHJ1ZVxuXHRcdH1cblxuXHRcdHZhciBzZXRTYXZlZFNlZWREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0dXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gMC45M1xuXHRcdFx0dXNlckRhdGEucGVyY2VudFB1cmVTZWVkID0gMC45NVxuXHRcdFx0dXNlckRhdGEuY29zdFBlckNXVCA9IDcuNDZcblx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gZmFsc2Vcblx0XHR9XG5cblx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gZGF0YS51c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gLyAoZGF0YS5zZWVkc1BlckxiICogZGF0YS51c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbilcblxuXHRcdFx0ZGF0YS5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkICogZGF0YS5zZWVkc1BlckxiXG5cblx0XHRcdGRhdGEuY29zdFBlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmNvc3RQZXJDV1QgKiAoZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgLyAxMDApXG5cblx0XHRcdGRhdGEudG90YWxTZWVkQ29zdCA9IGRhdGEuY29zdFBlckFjcmUgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRkYXRhLmFjdHVhbFNlZWRpbmdSYXRlID0gZGF0YS51c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSAqIGRhdGEuc2VlZHNQZXJMYiAqIGRhdGEudXNlckRhdGEucGVyY2VudFB1cmVTZWVkICogZGF0YS51c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb25cblxuXHRcdFx0ZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gZGF0YS5hY3R1YWxTZWVkaW5nUmF0ZSAtIGRhdGEudXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uXG5cblx0XHRcdGRhdGEub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0ID0gZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IDwgMFxuXHRcdFx0XHQ/IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCAqIGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZVxuXHRcdFx0XHQ6IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ICogZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICogLTFcblxuXHRcdFx0ZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5jb3N0UGVyQ1dUICogKGRhdGEudXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgLyAxMDApXG5cblx0XHRcdGRhdGEuY29zdFBlckFjcmVEaWZmZXJlbmNlID0gZGF0YS5jb3N0UGVyQWNyZSAtIGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZVxuXG5cdFx0XHRkYXRhLnRvdGFsU2VlZENvc3RGbGF0UmF0ZSA9IGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdGRhdGEudG90YWxTZWVkQ29zdEZsYXRSYXRlRGlmZmVyZW50aWFsID0gZGF0YS5jb3N0UGVyQWNyZURpZmZlcmVuY2UgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5pc0NlcnRpZmllZCA/IChkYXRhLnVzZXJEYXRhLnNlYXNvbi50b0xvd2VyQ2FzZSgpID09PSAnc3ByaW5nJyA/IDQuNSA6IDcuNSkgOiAwXG5cblx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSA9ICgoZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSkgKiBkYXRhLnVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZCkgLSBkYXRhLnRvdGFsU2VlZENvc3RcblxuXHRcdFx0ZGF0YS5uZXRSZXZlbnVlTGJQZXJBY3JlID0gKChkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKyBkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QpICogZGF0YS51c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWQpIC0gZGF0YS50b3RhbFNlZWRDb3N0XG5cblx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZUJlbmVmaXQgPSBkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgLSBkYXRhLm5ldFJldmVudWVMYlBlckFjcmVcblx0XHR9XG5cblx0XHR2YXIgZ2V0RGF0YVNlcmllcyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0dmFyIHNlcmllcyA9IFtdXG5cblx0XHRcdGZvciAodmFyIHNlZWRzUGVyTGIgPSBTRUVEU19QRVJfTEJfTUlOOyBzZWVkc1BlckxiIDw9IFNFRURTX1BFUl9MQl9NQVg7IHNlZWRzUGVyTGIgKz0gU0VFRFNfUEVSX0xCX1NURVApIHtcblx0XHRcdFx0dmFyIGRhdGFJdGVtID0gbmV3IE9wdGltYWxTZWVkaW5nUmF0ZUltcGFjdERhdGEoc2VlZHNQZXJMYilcblxuXHRcdFx0XHQvLyBNZXJnZSBpbiB0aGUgdXNlckRhdGEgcHJvcGVydGllc1xuXHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YSA9IHt9XG5cdFx0XHRcdGZvciAodmFyIHByb3AgaW4gdXNlckRhdGEpIHtcblx0XHRcdFx0XHRpZiAodXNlckRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdHlwZW9mIHVzZXJEYXRhW3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YVtwcm9wXSA9IHVzZXJEYXRhW3Byb3BdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FsY3VsYXRlKGRhdGFJdGVtKVxuXHRcdFx0XHRzZXJpZXMucHVzaChkYXRhSXRlbSlcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNlcmllc1xuXHRcdH1cblxuXHRcdHZhciBnZXRTZXJpZXNDb2x1bW5EYXRhID0gZnVuY3Rpb24gKHNlcmllcywgY29sdW1uKSB7XG5cdFx0XHR2YXIgZGF0YSA9IFtdXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgc2VyaWVzW2ldOyBpKyspIHtcblx0XHRcdFx0ZGF0YS5wdXNoKHNlcmllc1tpXVtjb2x1bW5dKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGF0YVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRTZWVkQ2FsY1VzZXJEYXRhOiBTZWVkQ2FsY1VzZXJEYXRhLFxuXHRcdFx0Z2V0RGF0YVNlcmllczogZ2V0RGF0YVNlcmllcyxcblx0XHRcdGdldFNlcmllc0NvbHVtbkRhdGE6IGdldFNlcmllc0NvbHVtbkRhdGFcblx0XHR9XG5cdH0oKSlcblxuXHR2YXIgU2VlZENhbGMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8vIENPTlNUQU5UU1xuXHRcdHZhciBDSEFSVF9NT0JJTEVfU01BTExfTUFYX1dJRFRIID0gNDAwICAgLy8gbWF4IHdpZHRoIGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9TTUFMTF9NQVhfSEVJR0hUID0gMjY3ICAvLyBtYXggaGVpZ2h0IGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9NQVhfV0lEVEggPSA2MDAgICAvLyBtYXggd2lkdGggZm9yIG1vYmlsZSBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9NQVhfSEVJR0hUID0gMzAwICAvLyBtYXggaGVpZ2h0IGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdHZhciBDSEFSVF9NQVhfV0lEVEggPSA2MDBcblx0XHR2YXIgQ0hBUlRfTUFYX0hFSUdIVCA9IDMwMFxuXHRcdHZhciBDT0xPUl9EQVJLX1JFRCA9ICcjNTI5M0FCJ1xuXHRcdHZhciBDT0xPUl9MSUdIVF9SRUQgPSAnIzcyYjFjOCdcblx0XHR2YXIgQ09MT1JfREFSS19CTFVFID0gJyMzNzM4MzYnXG5cdFx0dmFyIENPTE9SX0xJR0hUX0JMVUUgPSAnIzY0NjU2MCdcblxuXHRcdC8vIFBST1BFUlRJRVNcblxuXHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YSA9IG5ldyBTZWVkQ2FsY0RhdGEuU2VlZENhbGNVc2VyRGF0YSh0cnVlKVxuXHRcdHZhciBzYXZlZFNlZWREYXRhID0gbmV3IFNlZWRDYWxjRGF0YS5TZWVkQ2FsY1VzZXJEYXRhKClcblxuXHRcdC8vIE1FVEhPRFNcblxuXHRcdHZhciBpc01vYmlsZVNtYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpIDwgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9XSURUSFxuXHRcdH1cblxuXHRcdHZhciBpc01vYmlsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKSA8IENIQVJUX01PQklMRV9NQVhfV0lEVEhcblx0XHR9XG5cblx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXHRcdFx0Zm9ybS5jbGFzc0xpc3QuYWRkKCdjYWxjdWxhdGVkJylcblxuXHRcdFx0Ly8gR2V0IGZvcm0gZmllbGQgZGF0YVxuXHRcdFx0dXBkYXRlVXNlckRhdGFGcm9tRm9ybSgpXG5cblx0XHRcdC8vIFNjcm9sbCB0byBmaXJzdCBncmFwaCAoc2V0IGEgZGVsYXkgdG8gYWxsb3cgdGhlIHNlY3Rpb25zIHRvIGJlY29tZSB2aXNpYmxlKVxuXHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdC8vIFx0dmFyIGhlYWRlckJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXNpdGUtbmF2LXdyYXBwZXItaGVhZGVyJyksXG5cdFx0XHQvLyBcdFx0aGVhZGVyQmFyRml4ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXJCYXIpLnBvc2l0aW9uID09PSAnZml4ZWQnLFxuXHRcdFx0Ly8gXHRcdG9mZnNldCA9IGhlYWRlckJhckZpeGVkID8gLWhlYWRlckJhci5jbGllbnRIZWlnaHQgOiAwLFxuXHRcdFx0Ly8gXHRcdHRvcCA9IFV0aWxpdHkuZ2V0VG9wKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxjLXNlY3Rpb24nKSkgKyBvZmZzZXRcblx0XHRcdC8vIFx0c21vb3RoU2Nyb2xsKHRvcClcblx0XHRcdC8vIH0sIDUwKVxuXG5cdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoY2VydGlmaWVkU2VlZERhdGEpXG5cdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKHNhdmVkU2VlZERhdGEpXG5cdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cblx0XHRcdC8vIFNldCB0aGUgQ2FsY3VsYXRlIGJ1dHRvbiB0ZXh0XG5cdFx0XHR2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZScpXG5cdFx0XHRpZiAoYnRuLnRleHRDb250ZW50ID09PSAnQ2FsY3VsYXRlJykge1xuXHRcdFx0XHRidG4udGV4dENvbnRlbnQgPSAnUmUtQ2FsY3VsYXRlJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlVXNlckRhdGFGcm9tRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuY29zdFBlckNXVCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdHNhdmVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0Ly8gVGhlc2UgZmllbGRzIGhhdmUgdGhlIHNhbWUgdmFsdWVzIGluIGJvdGggZGF0YXNldHNcblx0XHRcdHZhciBzZWFzb25zID0gZm9ybVsnY3JvcF9zZWFzb24nXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWFzb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChzZWFzb25zW2ldLmNoZWNrZWQpIGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9IHNhdmVkU2VlZERhdGEuc2Vhc29uID0gc2Vhc29uc1tpXS52YWx1ZVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPSBzYXZlZFNlZWREYXRhLnNlYXNvbiA9IGZvcm1bJ2Nyb3Bfc2Vhc29uJ10udmFsdWVcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBzYXZlZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gc2F2ZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSBzYXZlZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbiddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSBzYXZlZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWQgPSBzYXZlZFNlZWREYXRhLmFjcmVzUGxhbnRlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9hY3Jlc19wbGFudGVkJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gc2F2ZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IHNhdmVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cblx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRmb3JtWydjZXJ0X3NlZWRfcHVyZV9zZWVkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdC8vIFRoZXNlIGZpZWxkcyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBpbiBib3RoIGRhdGFzZXRzLCBzbyBqdXN0IHVzZSB0aGUgZmlyc3Qgb25lXG5cdFx0XHQvLyBmb3JtWydjcm9wX3NlYXNvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uIC8vIGJyb2tlbiBpbiBTYWZhcmlcblx0XHRcdGlmIChjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPT09ICd3aW50ZXInKSB7XG5cdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMF0uY2hlY2tlZCA9IHRydWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMV0uY2hlY2tlZCA9IHRydWVcblx0XHRcdH1cblx0XHRcdGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlXG5cdFx0XHRmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsXG5cdFx0XHRmb3JtWydjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb25cblx0XHRcdGZvcm1bJ2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlXG5cdFx0XHRmb3JtWydjcm9wX2FjcmVzX3BsYW50ZWQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmFjcmVzUGxhbnRlZFxuXHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZyddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdFxuXHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0XG5cdFx0fVxuXG5cdFx0dmFyIHNob3dSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0fVxuXG5cdFx0dmFyIGhpZGVSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc2V0SW5wdXRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gUmVzZXQgdGhlIGRhdGEgdmFsdWVzIHRvIGRlZmF1bHRzXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXG5cdFx0XHQvLyBVcGRhdGUgZm9ybSBmaWVsZCB2YWx1ZXNcblx0XHRcdHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEoKVxuXG5cdFx0XHQvLyBIaWRlIHRoZSByZXNldCBsaW5rIGFnYWluXG5cdFx0XHRoaWRlUmVzZXRMaW5rKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGdldENoYXJ0Q2FudmFzSHRtbCA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0dmFyIHZpZXdwb3J0V2lkdGggPSBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKVxuXHRcdFx0dmFyIGNhbnZhc1NpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiBpc01vYmlsZSgpID8gdmlld3BvcnRXaWR0aCA6IENIQVJUX01BWF9XSURUSCxcblx0XHRcdFx0aGVpZ2h0OiBpc01vYmlsZVNtYWxsKCkgPyBDSEFSVF9NT0JJTEVfU01BTExfTUFYX0hFSUdIVCA6IGlzTW9iaWxlKCkgPyBDSEFSVF9NT0JJTEVfTUFYX0hFSUdIVCA6IENIQVJUX01BWF9IRUlHSFRcblx0XHRcdH1cblxuXHRcdFx0dmFyIGh0bWwgPSAnPGNhbnZhcyBpZD1cIicgKyBpZCArICdcIiBjbGFzcz1cImdyYXBoIGJsb2NrLWNlbnRlclwiIHdpZHRoPVwiJyArIGNhbnZhc1NpemUud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGNhbnZhc1NpemUuaGVpZ2h0ICsgJ1wiPjwvY2FudmFzPidcblxuXHRcdFx0cmV0dXJuIGh0bWxcblx0XHR9XG5cblx0XHR2YXIgc2V0Q2hhcnREZWZhdWx0cyA9IGZ1bmN0aW9uIChhbmltYXRlKSB7XG5cdFx0XHQvLyBHbG9iYWwgY2hhcnQgY29uZmlnXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRGYW1pbHkgPSAnXCJHb3RoYW0gU1NtIEFcIiwgXCJHb3RoYW0gU1NtIEJcIiwgTHVjaWRhIEdyYW5kZSwgXCJMdWNpZGEgR3JhbmRlXCIsIEx1Y2lkYSBTYW5zIFVuaWNvZGUsIFwiTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBMdWNpZGEgU2FucywgXCJMdWNpZGEgU2Fuc1wiLCBHZW5ldmEsIFZlcmRhbmEsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTZcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMubGluZS5ib3JkZXJXaWR0aCA9IDJcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLmZpbGwgPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gNVxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmJvcmRlcldpZHRoID0gMlxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuYW5pbWF0aW9uLmR1cmF0aW9uID0gYW5pbWF0ZSA9PT0gZmFsc2UgPyAwIDogMTAwMFxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubGVnZW5kLmRpc3BsYXkgPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZXZlbnRzID0gdW5kZWZpbmVkIC8vIGlnbm9yZSBtb3VzZS90b3VjaCBldmVudHNcblxuXHRcdFx0Ly8gc3BlY2lhbCBzZXR0aW5ncyBmb3Igc21hbGxlciBzY3JlZW4gc2l6ZXNcblx0XHRcdGlmIChpc01vYmlsZVNtYWxsKCkpIHtcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDExXG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSAyXG5cdFx0XHR9IGVsc2UgaWYgKGlzTW9iaWxlKCkpIHtcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDEyXG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSA0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUdyYXBoQ29tcGFyZUltcGFjdCA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcykge1xuXHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfY29tcGFyZV9pbXBhY3QnXG5cdFx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3NlY3Rpb24nKVxuXHRcdFx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ193cmFwcGVyJylcblx0XHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19sZWdlbmQnKVxuXHRcdFx0dmFyIGNhbnZhcyA9IGdldENoYXJ0Q2FudmFzSHRtbChjaGFydElkKVxuXHRcdFx0dmFyIG1vYmlsZSA9IGlzTW9iaWxlKClcblx0XHRcdHZhciBtb2JpbGVTbWFsbCA9IGlzTW9iaWxlU21hbGwoKVxuXG5cdFx0XHQvLyBSZW1vdmUgdGhlICdoaWRkZW4nIENTUyBjbGFzc1xuXHRcdFx0c2VjdGlvbi5jbGFzc05hbWUgPSBzZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqXFxiaGlkZGVuXFxiL2csICcnKVxuXG5cdFx0XHQvLyBkZXN0cm95IGFuZCByZWNyZWF0ZSB0aGUgY2FudmFzXG5cdFx0XHRpZiAod3JhcHBlci5oYXNDaGlsZE5vZGVzKCkpIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5jaGlsZE5vZGVzWzBdKVxuXHRcdFx0d3JhcHBlci5pbm5lckhUTUwgPSBjYW52YXNcblxuXHRcdFx0Ly8gR2V0IHRoZSB4LWF4aXMgbGFiZWxzXG5cdFx0XHR2YXIgeExhYmVscyA9IFtdXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV07IGkrKykge1xuXHRcdFx0XHR4TGFiZWxzLnB1c2goY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV0uc2VlZHNQZXJMYi50b1N0cmluZygpKVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHR0eXBlOiAnbGluZScsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRsYWJlbHM6IHhMYWJlbHMsXG5cdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgJ29wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUnKSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdjaXJjbGUnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX2NpcmNsZS1saW5lLWJsdWUtc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsICduZXRSZXZlbnVlTGJQZXJBY3JlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ2NpcmNsZScsXG5cdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fY2lyY2xlLWxpbmUtYmx1ZS5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKHNhdmVkU2VlZERhdGFTZXJpZXMsICdvcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRSYWRpdXM6IENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgKyAxLFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ3JlY3QnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX3NxdWFyZS1saW5lLWRhcmstc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShzYXZlZFNlZWREYXRhU2VyaWVzLCAnbmV0UmV2ZW51ZUxiUGVyQWNyZScpLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50UmFkaXVzOiBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzICsgMSxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdyZWN0Jyxcblx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19zcXVhcmUtbGluZS1kYXJrLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdHhBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogJ2JvdHRvbScsXG5cdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnU2VlZHMvTGInLFxuXHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGluZGV4ICUgMiA9PT0gMCA/IFV0aWxpdHkuYWRkRGlnaXRTZXBhcmF0b3JzKHZhbHVlKSA6ICcnXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjb21wYXJlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuICAgICAgfSwgMTUwMClcblxuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48aW1nIGNsYXNzPVwiY2FsYy1sZWdlbmQtaWNvblwiIHNyYz1cIicgKyBpdGVtLmxlZ2VuZEljb25JbWFnZSArICdcIiBhbHQ9XCJcIj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHR9XG5cdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlR3JhcGhNYXhpbWl6ZVJldmVudWUgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpIHtcblx0XHRcdC8vIFJlc2V0IHNvbWUgZ2xvYmFsIGNoYXJ0IGRlZmF1bHRzXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWVcblxuXHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfbWF4aW1pemVfcmV2ZW51ZSdcblx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfc2VjdGlvbicpXG5cdFx0XHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3dyYXBwZXInKVxuXHRcdFx0dmFyIGxlZ2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX2xlZ2VuZCcpXG5cdFx0XHR2YXIgY2FudmFzID0gZ2V0Q2hhcnRDYW52YXNIdG1sKGNoYXJ0SWQpXG5cblx0XHRcdC8vIFJlbW92ZSB0aGUgJ2hpZGRlbicgQ1NTIGNsYXNzXG5cdFx0XHRzZWN0aW9uLmNsYXNzTmFtZSA9IHNlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoL1xccypcXGJoaWRkZW5cXGIvZywgJycpXG5cblx0XHRcdC8vIGRlc3Ryb3kgYW5kIHJlY3JlYXRlIHRoZSBjYW52YXNcblx0XHRcdGlmICh3cmFwcGVyLmhhc0NoaWxkTm9kZXMoKSkgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmNoaWxkTm9kZXNbMF0pXG5cdFx0XHR3cmFwcGVyLmlubmVySFRNTCA9IGNhbnZhc1xuXG5cdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHR0eXBlOiAnYmFyJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdGxhYmVsczogW10sXG5cdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBbIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzWyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcy5sZW5ndGggLSAxIF0ub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSBdLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVEXG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBbIHNhdmVkU2VlZERhdGFTZXJpZXNbIHNhdmVkU2VlZERhdGFTZXJpZXMubGVuZ3RoIC0gMSBdLm5ldFJldmVudWVMYlBlckFjcmUgXSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogdHJ1ZSxcblx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNyZXZlbnVlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuICAgICAgfSwgMTUwMClcblxuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWljb25cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArIGl0ZW0uYmFja2dyb3VuZENvbG9yICsgJ1wiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHR9XG5cdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlR3JhcGhzID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzLCBhbmltYXRlKSB7XG5cdFx0XHRzZXRDaGFydERlZmF1bHRzKGFuaW1hdGUpXG5cdFx0XHR1cGRhdGVHcmFwaENvbXBhcmVJbXBhY3QoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cdFx0XHR1cGRhdGVHcmFwaE1heGltaXplUmV2ZW51ZShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblx0XHR9XG5cblx0XHQvLyBFVkVOVFNcblxuXHRcdHZhciBvbkNhbGN1bGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG5cdFx0XHRcdCAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuXHRcdFx0XHQgICQoJy5jYWxjLWZpZWxkJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0ICAgIGlmICggJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2Vcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaXNWYWxpZClcblx0XHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwiIzY2NjY1Y1wifSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0ICB9KTtcblx0XHRcdFx0ICByZXR1cm4gaXNWYWxpZDtcblx0XHRcdFx0fVxuXG5cdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgZ28gPSB2YWxpZGF0ZUZvcm0oKVxuXHRcdFx0XHR2YXIgZXJyb3JGb3JtTWVzc2FnZSA9ICc8c3BhbiBjbGFzcz1cImVycm9yRm9ybU1lc3NhZ2VcIj5Zb3UgbXVzdCBjb21wbGV0ZSBhbGwgZmllbGRzIGFib3ZlIHRvIGNhbGN1bGF0ZS48L3NwYW4+J1xuXHRcdFx0XHRpZiAoIGdvID09IHRydWUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaXQgaXMgdmFsaWQnKVxuXHRcdFx0XHRcdCQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcblx0XHRcdFx0XHQkKCcjZ3JhcGhfY29tcGFyZV9pbXBhY3Rfc2VjdGlvbiAsICNncmFwaF9tYXhpbWl6ZV9yZXZlbnVlX3NlY3Rpb24nKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdCQoJy5hY3Rpb25EYXRhJykuc2hvdygpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0Y2FsY3VsYXRlKClcblx0XHRcdFx0fWVsc2UgaWYgKCBnbyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpdCBpcyBub3QgdmFsaWQnKVxuXHRcdFx0XHRcdGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7XG5cblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcjeWllbGRJbXBhY3RGb3JVbmRlcnNlZWRpbmcnKS5hZnRlcihlcnJvckZvcm1NZXNzYWdlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR2YXIgb25Gb3JtSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gU2hvdyB0aGUgJ3Jlc2V0IGZvcm0nIGxpbmsgd2hlbiBkZXZpYXRpbmcgZnJvbSB0aGUgZGVmYXVsdHNcblx0XHRcdHNob3dSZXNldExpbmsoKVxuXHRcdH1cblxuXHRcdHZhciBvblJlc2V0Rm9ybSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHQvLyBSZXNldCB0aGUgZGF0YSBhbmQgZm9ybSB2YWx1ZXNcblx0XHRcdHJlc2V0SW5wdXRzKClcblx0XHR9XG5cblx0XHR2YXIgb25FbWFpbERhdGEgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gTk9URTogVGhlIGdlbmVyYXRlZCBQREYgd2lsbCBoYXZlIHRoZSBkYXRhIHRoYXQgaXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBjaGFydHMuIElmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGZvcm0gZmllbGQgdmFsdWVzLCBidXQgbm90IGNsaWNrZWQgXCJDYWxjdWxhdGVcIiwgdGhlbiB0aGVzZSBhcmUgbm90IHJlZmxlY3RlZCBpbiB0aGUgb3V0cHV0LlxuXG5cdFx0XHQvLyBUT0RPOiBTaG93IGVtYWlsIGZpZWxkcyBmb3IgdXNlciBpbnB1dC4gU3VibWl0dGluZyB0aGlzIGZvcm0gd2lsbCBleGVjdXRlIHRoZSBlbWFpbERhdGEoKSBtZXRob2QuXG5cdFx0XHRjb25zb2xlLmluZm8oJ0VtYWlsIFBERicpXG5cdFx0fVxuXG5cdFx0dmFyIG9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHQvLyBPbmx5IHJlZHJhdyB0aGUgZ3JhcGhzIGlmIHRoZXkgaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgYXQgbGVhc3Qgb25jZSBhbHJlYWR5XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cdFx0XHRpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbGN1bGF0ZWQnKSkge1xuXHRcdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhjZXJ0aWZpZWRTZWVkRGF0YSlcblx0XHRcdFx0dmFyIHNhdmVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhzYXZlZFNlZWREYXRhKVxuXHRcdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBvbkRvd25sb2FkUGRmID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdC8vIE5PVEU6IFRoZSBnZW5lcmF0ZWQgUERGIHdpbGwgaGF2ZSB0aGUgZGF0YSB0aGF0IGlzIGN1cnJlbnRseSByZXByZXNlbnRlZCBpbiB0aGUgY2hhcnRzLiBJZiB0aGUgdXNlciBoYXMgY2hhbmdlZCBmb3JtIGZpZWxkIHZhbHVlcywgYnV0IG5vdCBjbGlja2VkIFwiQ2FsY3VsYXRlXCIsIHRoZW4gdGhlc2UgYXJlIG5vdCByZWZsZWN0ZWQgaW4gdGhlIG91dHB1dC5cblxuXHRcdFx0Ly8gVE9ETzogVHJpZ2dlcmluZyB0aGlzIGhhbmRsZXIgd2lsbCBleGVjdXRlIHRoZSBkb3dubG9hZFBkZigpIG1ldGhvZFxuXHRcdFx0Y29uc29sZS5pbmZvKCdEb3dubG9hZCBQREYnKVxuXHRcdH1cblxuXHRcdHZhciB3aXJlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm1FbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jylcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGZvcm1FbGVtZW50c1tpXVxuXHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkZvcm1JbnB1dENoYW5nZSlcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNhbGN1bGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdGUnKVxuXHRcdFx0Y2FsY3VsYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYWxjdWxhdGUpXG5cblx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIHJlc2V0IHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xuXHRcdFx0dmFyIHJlc2V0Rm9ybUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpXG5cdFx0XHRyZXNldEZvcm1MaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25SZXNldEZvcm0pXG5cblx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIGVtYWlsIHRoZSByZXN1bHRzIGFzIGEgUERGXG5cdFx0XHQvL3ZhciBlbWFpbERhdGFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWxfZGF0YScpXG5cdFx0XHQvL2VtYWlsRGF0YUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRW1haWxEYXRhKVxuXG5cdFx0XHQvLyBBZGQgdHJpZ2dlciB0byBkb3dubG9hZCB0aGUgcmVzdWx0cyBhcyBhIFBERlxuXHRcdFx0Ly92YXIgZG93bmxvYWRQZGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmxvYWRfcGRmJylcblx0XHRcdC8vZG93bmxvYWRQZGYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvd25sb2FkUGRmKVxuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUpO1xuXHRcdH1cblxuXHRcdHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB1c2VyIGZvcm0gaW5wdXRzIHdpdGggZGVmYXVsdCBkYXRhXG5cdFx0XHR1cGRhdGVGb3JtRnJvbVVzZXJEYXRhKClcblxuXHRcdFx0Ly8gV2lyZSB1cCBpbnRlcmFjdGl2ZSBldmVudHNcblx0XHRcdHdpcmVFdmVudHMoKVxuXHRcdH1cblxuXHRcdHJldHVybiB7IGluaXQ6IGluaXQgfVxuXHR9KCkpXG5cblx0U2VlZENhbGMuaW5pdCgpXG59KVxuICBpZiggJCgnYm9keScpLmhhc0NsYXNzKCdmaW5kLXNlZWQtc3VwcGxpZXInKSApIHtcbiAgICAkKCcjc3RhdGVzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlU3RhdGUoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZSAoKSB7XG4gICAgICBpZiAoJCgnI3Jlc3VsdHMnKS5oYXNDbGFzcygnaGlkZGVuJykpIHtcbiAgICAgICAgJCgnI3Jlc3VsdHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgIH1cbiAgICAgIHZhciBzZWxlY3RlZHN0YXRlID0gJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXG4gICAgICAkKCcuc3VwcGxpZXIsIC5yZXAnKS5oaWRlKClcbiAgICAgICQoJy4nICsgc2VsZWN0ZWRzdGF0ZSkuc2hvdygpXG5cbiAgICAgIGlmICghJCgnLicgKyBzZWxlY3RlZHN0YXRlKVswXSkge1xuICAgICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLnNob3coKVxuICAgICAgICAgIHZhciBzdGF0ZUNob3NlbiA9ICQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS50ZXh0KClcbiAgICAgICAgICAkKCcuZmFpbHVyZVNwYW4nKS50ZXh0KHN0YXRlQ2hvc2VuKVxuICAgICAgICAgICQoJy5yZXBfX2N0bicpLmhpZGUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcuZmFpbHVyZV9fbm9zdXBwbGllcnMnKS5oaWRlKClcbiAgICAgICAgICAkKCcucmVwX19jdG4nKS5zaG93KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yKVxuXG4gICAgZnVuY3Rpb24gc3VjY2VzcyAocG9zaXRpb24pIHtcbiAgICAgIHZhciBHRU9DT0RJTkcgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9JyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUgKyAnJmtleT1BSXphU3lBSWFwUWJCckJjSUZUdUlsTXhiWGJNdHkzZFQ3UjFiMmsnXG5cbiAgICAgICQuZ2V0SlNPTihHRU9DT0RJTkcpLmRvbmUoZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciB0aGVzdGF0ZSA9IGxvY2F0aW9uLnJlc3VsdHNbMF0uYWRkcmVzc19jb21wb25lbnRzWzRdLnNob3J0X25hbWVcbiAgICAgICAgJCgnI3N0YXRlc2VsZWN0JykudmFsKHRoZXN0YXRlKVxuICAgICAgICBjaGFuZ2VTdGF0ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9XG4gIH1cbiJdfQ==