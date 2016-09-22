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

//# sourceMappingURL=data:application/json;base64,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b3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG5jb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcblxuICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykgPT09IHRydWUpIHtcbiAgICAkKCcjbWFpbGJhcicpLmhpZGUoKVxuICB9ZWxzZSB7XG4gICAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG4gIH1cblxufVxuXG4vLyBjbGljayB0aXRsZSBvciBkb3duIGFycm93XG4kKCcjbWFpbGJhci1hY3RpdmF0ZScpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHZoXG4gIGNvbnN0ICRib2R5ID0gJCgnI21haWxiYXItYm9keScpXG4gIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgIHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9IGVsc2Uge1xuICAgIHZoID0gNDAwXG4gIH1cblxuICBpZiAoJGJvZHkuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gIH0gZWxzZSB7XG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICB9XG5cbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxufSlcblxuLy8gY2xpY2sgZGlzbWlzc1xuJCgnI21haWxiYXItZGlzbWlzcycpLm9uKCdjbGljaycsIGRpc21pc3NNYWlsYmFyKVxuXG5mdW5jdGlvbiBkaXNtaXNzTWFpbGJhciAoKSB7XG4gIC8vIGlmIHRoZSBtZW51IGlzIGFjdGl2ZSBhbmQgeW91IGRpc21pc3MsIHJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0XG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtYWN0aXZlJykpIHtcbiAgICBjb25zdCBtZW51ID0gJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJylcbiAgICBjb25zdCBhZGRlZEhlaWdodCA9IG1lbnUuaGVpZ2h0KCkgKyAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBhZGRlZEhlaWdodCArICdweCcpXG4gIH1cblxuICAkKCcjbWFpbGJhcicpLmFuaW1hdGUoeyBoZWlnaHQ6ICcwJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxuICB9KVxuXG4gIGRvY3VtZW50LmNvb2tpZSA9ICdzdWJzY3JpYmVkPXRydWUnXG59XG4kKCcjbWVudS1hY3RpdmF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG1haWxiYXIgPSAwXG4gIGlmICgkKCcjbWFpbGJhci1ib2R5JykubGVuZ3RoKSB7XG4gICAgbWFpbGJhciA9ICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgfVxuXG4gIGNvbnN0IHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21lbnUnKS5oZWlnaHQoKSAtIG1haWxiYXJcbiAgY29uc3QgbWVudSA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tZW51XCI+PC91c2U+J1xuICBjb25zdCBjcm9zcyA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jcm9zc1wiPjwvdXNlPidcblxuICBpZiAoJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGNyb3NzKVxuICB9IGVsc2Uge1xuICAgICQoJyNtZW51LWhlYWRlci1tZW51LWNvbnRhaW5lcicpLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKG1lbnUpXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2ZScpXG59KVxuXG4vLyBUT0RPOiByZWNhbGMgbWVudSBoZWlnaHQgb24gcmVzaXplIGlmIGluIG1vYmlsZSB3aWR0aHNcbiQod2luZG93KS5yZXNpemUoKVxuJCgnLmJlbmVmaXRzX19oZWFkbGluZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCh0aGlzKS5uZXh0KClcbiAgICBjb25zdCBhcnJvd0Rvd24gPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPidcbiAgICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gICAgJGJvZHkuc2xpZGVUb2dnbGUoKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93RG93bilcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd1VwKVxuICAgIH1cblxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pXG4vLyB3aW5kb3cuYWxlcnQgPSBmdW5jdGlvbiAoKSB7fVxuLy8gIFZhbGlkYXRlIENvbnRhY3QgVXMgRmllbGRzXG5pZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykpIHtcbiAgICAkKCcucHJpbWFyeUFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIFZhbGl0KCkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQoJy52YWxpZGF0ZS1lbWFpbCcpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0RW1haWwnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCgnI3RmYV8yJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFweCBzb2xpZCByZWRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVuaXQgPSBWYWxpdCgpO1xuICAgICAgICB2YXIgZXJyb3IgPSAnPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjpzdGF0aWM7XCIgY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZS48L3NwYW4+J1xuICAgICAgICBpZiAocnVuaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnI3RmYV8wJykuc3VibWl0KClcbiAgICAgICAgICAgICQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5hZnRlcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4ndXNlIHN0cmljdCdcblxuJCgnLnRvZ2dsZU1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgJCgnLm1vZGFsJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbiQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICQoJy50aGFua3lvdW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbiQoJyNyZXNldF9mb3JtLCN0aGFua3lvdV9fc3RhcnRvdmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHQkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xufSk7XG5cbiQoXCIjZW1haWxEYXRhRm9ybVwiKS5iaW5kKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZSkge1xuICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgZGVmYXVsdCBldmVudFxuICAgfVxufSk7XG5cblxuJCgnI2Rvd25sb2FkUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0JCgnI3BkZkRhdGEnKS52YWwoSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkpXG5cdCQoJyNwZGZGb3JtJykuc3VibWl0KClcbn0pXG5cbiQoJyNtYWlsUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0Ly9WYWxpZGF0ZSBFbWFpbFxuXHRmdW5jdGlvbiBpc19lbWFpbChlbWFpbCl7XG5cdHZhciBlbWFpbFJlZyA9IC9eW2EtekEtWjAtOS5fLV0rQFthLXpBLVowLTkuLV0rXFwuW2EtekEtWl17Miw0fSQvO1xuXHRyZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7IH1cblxuXHR2YXIgZW1haWxJbnB1dCA9IGlzX2VtYWlsKCQoJyNyZWNpcGllbnRFbWFpbCcpLnZhbCgpKVxuXHR2YXIgZW1haWxFcnJvciA9ICc8c21hbGwgY2xhc3M9XCJlbWFpbEVycm9yXCI+UGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsLjwvc21hbGwnXG5cblx0aWYgKGVtYWlsSW5wdXQgPT0gZmFsc2UpIHtcblx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdGlmICgkKCcuZW1haWxFcnJvcicpWzBdKSB7XG5cdFx0fWVsc2Uge1xuXHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihlbWFpbEVycm9yKVxuXHRcdH1cblxuXG5cdH1lbHNlIHtcblx0XHQkKCcuZW1haWxFcnJvcicpLnJlbW92ZSgpXG5cdFx0JCgnI3JlY2lwaWVudEVtYWlsJykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcImluaGVyaXRcIn0pXG5cdFx0dmFyIHF1ZXJ5U3RyaW5nQWRkID0gJyZyZWNpcGllbnRzPScgKyBlbmNvZGVVUklDb21wb25lbnQoJCgnI3JlY2lwaWVudEVtYWlsJykudmFsKCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc2VuZGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ25vLXJlcGx5QGhsa2FnZW5jeS5jb20nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KyAnJnN1YmplY3Q9JyArIGVuY29kZVVSSUNvbXBvbmVudCgnWW91ciBXaGVhdCBQcm9maXRhYmlsaXR5IENhbGN1bGF0b3IgUmVzdWx0cycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmZmlyc3ROYW1lPSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICdodHRwOi8vaGxrLXBkZi1zZXJ2ZXIuY2VudHJhbHVzLmNsb3VkYXBwLmF6dXJlLmNvbS9hcGkvdjEvRW1haWxMaW5rP3RlbXBsYXRlTmFtZT1XZXN0QnJlZF9Qcm9maXRDYWxjJyArIHF1ZXJ5U3RyaW5nQWRkLFxuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0ZGF0YTogJ3sgXCJqc29uXCIgOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkgKyAnfScsXG5cdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIG9wdHMgPSB7XG5cdFx0XHRcdCAgbGluZXM6IDEzIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuXHRcdFx0XHQsIGxlbmd0aDogMjggLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcblx0XHRcdFx0LCB3aWR0aDogMTQgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG5cdFx0XHRcdCwgcmFkaXVzOiA0MiAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcblx0XHRcdFx0LCBzY2FsZTogMC4xNSAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG5cdFx0XHRcdCwgY29ybmVyczogMC4zIC8vIENvcm5lciByb3VuZG5lc3MgKDAuLjEpXG5cdFx0XHRcdCwgY29sb3I6ICcjZmZmJyAvLyAjcmdiIG9yICNycmdnYmIgb3IgYXJyYXkgb2YgY29sb3JzXG5cdFx0XHRcdCwgb3BhY2l0eTogMCAvLyBPcGFjaXR5IG9mIHRoZSBsaW5lc1xuXHRcdFx0XHQsIHJvdGF0ZTogMCAvLyBUaGUgcm90YXRpb24gb2Zmc2V0XG5cdFx0XHRcdCwgZGlyZWN0aW9uOiAxIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2Vcblx0XHRcdFx0LCBzcGVlZDogMSAvLyBSb3VuZHMgcGVyIHNlY29uZFxuXHRcdFx0XHQsIHRyYWlsOiA4NSAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuXHRcdFx0XHQsIGZwczogMjAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZyBzZXRUaW1lb3V0KCkgYXMgYSBmYWxsYmFjayBmb3IgQ1NTXG5cdFx0XHRcdCwgekluZGV4OiAyZTkgLy8gVGhlIHotaW5kZXggKGRlZmF1bHRzIHRvIDIwMDAwMDAwMDApXG5cdFx0XHRcdCwgY2xhc3NOYW1lOiAnc3Bpbm5lcicgLy8gVGhlIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIHNwaW5uZXJcblx0XHRcdFx0LCB0b3A6ICctMjBweCcgLy8gVG9wIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuXHRcdFx0XHQsIGxlZnQ6ICc1MCUnIC8vIExlZnQgcG9zaXRpb24gcmVsYXRpdmUgdG8gcGFyZW50XG5cdFx0XHRcdCwgc2hhZG93OiBmYWxzZSAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuXHRcdFx0XHQsIGh3YWNjZWw6IGZhbHNlIC8vIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvblxuXHRcdFx0XHQsIHBvc2l0aW9uOiAncmVsYXRpdmUnIC8vIEVsZW1lbnQgcG9zaXRpb25pbmdcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKG9wdHMpLnNwaW4oKVxuXHRcdFx0XHQkKCcjbWFpbFBERicpLmNzcygnY29sb3InLCAndHJhbnNwYXJlbnQnKTtcblx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihzcGlubmVyLmVsKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcubW9kYWwnKS5oaWRlKClcblx0XHRcdCQoJy50aGFua3lvdW1vZGFsJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG5cdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG5cdFx0fSlcblx0XHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG5cdFx0fSlcblx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcblx0XHR9KVxuXHR9XG5cbn0pXG5cbmZ1bmN0aW9uIGRhdGFFeHRyYWN0ICgpIHtcblx0cmV0dXJuIHtcblx0XHRjZXJ0R2VybWluYXRpb246ICQoJyNjZXJ0X3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSxcblx0XHRjZXJ0UHVyZVNlZWQ6ICQoJyNjZXJ0X3NlZWRfcHVyZV9zZWVkJykudmFsKCksXG5cdFx0Y2VydFNlZWRDb3N0OiAkKCcjY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRzYXZlZEdlcm1pbmF0aW9uOiAkKCcjc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbicpLnZhbCgpLFxuXHRcdHNhdmVkUHVyZVNlZWQ6ICQoJyNzYXZlZF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpLFxuXHRcdHNhdmVkU2VlZENvc3Q6ICQoJyNzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRzZWFzb246ICQoJ2lucHV0W25hbWU9XCJjcm9wX3NlYXNvblwiXTpjaGVja2VkJykudmFsKCksXG5cdFx0dGFyZ2V0WWllbGQ6ICQoJyNjcm9wX3RhcmdldF95aWVsZCcpLnZhbCgpLFxuXHRcdHdoZWF0UHJpY2U6ICQoJyNjcm9wX3doZWF0X3ByaWNlJykudmFsKCksXG5cdFx0dGFyZ2V0UGxhbnRQb3B1bGF0aW9uOiAkKCcjY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbicpLnZhbCgpLFxuXHRcdGZsYXRTZWVkaW5nUmF0ZTogJCgnI2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnKS52YWwoKSxcblx0XHRhY3Jlc1BsYW50ZWQ6ICQoJyNjcm9wX2FjcmVzX3BsYW50ZWQnKS52YWwoKSxcblx0XHR5aWVsZEltcGFjdE92ZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZycpLnZhbCgpLFxuXHRcdHlpZWxkSW1wYWN0VW5kZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnKS52YWwoKSxcblx0XHRpbXBhY3RDb21wYXJlR3JhcGg6ICQoJyNjb21wYXJlR3JhcGgnKS52YWwoKSxcblx0XHRtYXhpbWl6ZVJldmVudWVHcmFwaDogJCgnI3JldmVudWVHcmFwaCcpLnZhbCgpXG5cdH1cbn1cblxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0Ly8gTWFpbiBhcHAgc3RhcnR1cFxuXG5cdHZhciBVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBHZXQgdGhlIHRvcCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IGluIHRoZSBkb2N1bWVudFxuXHRcdC8vIEZyb20gc21vb3RoU2Nyb2xsLCBodHRwczovL2dpdGh1Yi5jb20vYWxpY2VsaWV1dGllci9zbW9vdGhTY3JvbGwvYmxvYi9tYXN0ZXIvc21vb3Roc2Nyb2xsLmpzXG5cdFx0dmFyIGdldFRvcCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdC8vIHJldHVybiB2YWx1ZSBvZiBodG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAuLi4gSUUgOiAwLCBvdGhlciBicm93c2VycyA6IC1wYWdlWU9mZnNldFxuXHRcdFx0aWYoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSByZXR1cm4gLXdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0cmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdH1cblxuXHRcdC8vIEdldCB0aGUgY3VycmVudCBzY3JlZW4gdmlld3BvcnQgd2lkdGhcblx0XHR2YXIgZ2V0Vmlld3BvcnRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGRpZ2l0IHNlcGFyYXRvciBjaGFyYWN0ZXJzIHRvIGEgbnVtZXJpYyBzdHJpbmdcblx0XHR2YXIgYWRkRGlnaXRTZXBhcmF0b3JzID0gZnVuY3Rpb24gKG51bSkge1xuXHRcdFx0dmFyIG4gPSBudW0udG9TdHJpbmcoKVxuXHRcdFx0dmFyIHAgPSBuLmluZGV4T2YoJy4nKVxuXHRcdFx0cmV0dXJuIG4ucmVwbGFjZSgvXFxkKD89KD86XFxkezN9KSsoPzpcXC58JCkpL2csIGZ1bmN0aW9uICgkMCwgaSkge1xuXHRcdFx0XHRyZXR1cm4gcCA8IDAgfHwgaSA8IHAgPyAoJDAgKyAnLCcpIDogJDBcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjaGFyYWN0ZXIgcmVwcmVzZW50YXRpb24gb2YgSW5maW5pdHlcblx0XHR2YXIgZ2V0SW5maW5pdHlDaGFyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICfiiJ4nXG5cdFx0fVxuXG5cdFx0Ly8gRm9ybWF0IGEgbnVtYmVyIGZvciBkaXNwbGF5XG5cdFx0dmFyIGZvcm1hdE51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIsIGRlY2ltYWxzLCBzaG93UG9zaXRpdmUpIHtcblx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobnVtYmVyKVxuXHRcdFx0aWYgKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZGVjaW1hbHMgIT09ICd1bmRlZmluZWQnICYmIGRlY2ltYWxzICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0Ly8gS2VlcCBhIHNldCBudW1iZXIgb2YgZGVjaW1hbHMsIGV2ZW4gaWYgemVyb2VzXG5cdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHZhbHVlKS50b0ZpeGVkKGRlY2ltYWxzKSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBKdXN0IHRydW5jYXRlIHRvIGEgZml4ZWQgbnVtYmVyIG9mIGRlY2ltYWxzLCBidXQgZG9uJ3QgcHJlc2VydmUgdHJhaWxpbmcgemVyb2VzXG5cdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHBhcnNlRmxvYXQodmFsdWUudG9GaXhlZCgyKSkpKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZ2V0SW5maW5pdHlDaGFyKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGb3JtYXQgYSBudW1iZXIgYXMgY3VycmVueSBmb3IgZGlzcGxheVxuXHRcdHZhciBmb3JtYXRDdXJyZW5jeSA9IGZ1bmN0aW9uIChudW1iZXIsIHNob3dEZWNpbWFscywgc2hvd1Bvc2l0aXZlKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KG51bWJlcilcblx0XHRcdGlmICghaXNOYU4odmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyAnJCcgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoc2hvd0RlY2ltYWxzID09PSB0cnVlID8gMiA6IDApKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGdldEluZmluaXR5Q2hhcigpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBhIGZvcm1hdHRlZCBudW1iZXIgYmFjayBpbnRvIGFuIGFjdHVhbCBudW1iZXJcblx0XHR2YXIgdW5mb3JtYXROdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLnJlcGxhY2UoL1teLVxcZFxcLmVdL2csICcnKS50cmltKCkpXG5cdFx0fVxuXG5cdFx0Ly8gRm9ybWF0IGEgaW5wdXQgZmllbGQgYWNjb3JkaW5nIHRvIHRoZSBcImRhdGEtZm9ybWF0XCIgYXR0cmlidXRlXG5cdFx0dmFyIGZvcm1hdFZhbHVlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdGlmICghZWxlbWVudCB8fCAoZWxlbWVudCAmJiAhZWxlbWVudC52YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuICcnXG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgZWxlbWVudC52YWx1ZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsdWVcblx0XHRcdH1cblxuXHRcdFx0dmFyIGZvcm1hdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkuZGF0YXNldC5mb3JtYXRcblxuXHRcdFx0c3dpdGNoIChmb3JtYXQpIHtcblx0XHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpKVxuXG5cdFx0XHRcdGNhc2UgJ3NpZ25lZG51bWJlcic6XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgbnVsbCwgdHJ1ZSlcblxuXHRcdFx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCAwKVxuXG5cdFx0XHRcdGNhc2UgJ2ZpeGVkMic6XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgMilcblxuXHRcdFx0XHRjYXNlICdjdXJyZW5jeSc6XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdEN1cnJlbmN5KHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpKVxuXHRcdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtZW50LnZhbHVlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGdldFRvcDogZ2V0VG9wLFxuXHRcdFx0Z2V0Vmlld3BvcnRXaWR0aDogZ2V0Vmlld3BvcnRXaWR0aCxcblx0XHRcdGFkZERpZ2l0U2VwYXJhdG9yczogYWRkRGlnaXRTZXBhcmF0b3JzLFxuXHRcdFx0Z2V0SW5maW5pdHlDaGFyOiBnZXRJbmZpbml0eUNoYXIsXG5cdFx0XHRmb3JtYXROdW1iZXI6IGZvcm1hdE51bWJlcixcblx0XHRcdGZvcm1hdEN1cnJlbmN5OiBmb3JtYXRDdXJyZW5jeSxcblx0XHRcdHVuZm9ybWF0TnVtYmVyOiB1bmZvcm1hdE51bWJlcixcblx0XHRcdGZvcm1hdFZhbHVlOiBmb3JtYXRWYWx1ZVxuXHRcdH1cblx0fSgpKVxuXG5cdHZhciBTZWVkQ2FsY0RhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBTRUVEU19QRVJfTEJfTUlOID0gOTAwMFxuXHRcdHZhciBTRUVEU19QRVJfTEJfTUFYID0gMTgwMDBcblx0XHR2YXIgU0VFRFNfUEVSX0xCX1NURVAgPSA1MDBcblxuXHRcdHZhciBTZWVkQ2FsY1VzZXJEYXRhID0gZnVuY3Rpb24gKGNlcnRpZmllZCkge1xuXHRcdFx0Ly8gUHJvcGVydGllc1xuXHRcdFx0dGhpcy5zZWFzb24gPSAnd2ludGVyJyAvLyBzcHJpbmd8d2ludGVyXG5cblx0XHRcdHRoaXMucGVyY2VudEdlcm1pbmF0aW9uID0gMFxuXHRcdFx0dGhpcy5wZXJjZW50UHVyZVNlZWQgPSAwXG5cdFx0XHR0aGlzLmNvc3RQZXJDV1QgPSAwXG5cdFx0XHR0aGlzLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHR0aGlzLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAwXG5cdFx0XHR0aGlzLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDBcblx0XHRcdHRoaXMuZmxhdFJhdGVMYlBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLmFjcmVzUGxhbnRlZCA9IDBcblxuXHRcdFx0dGhpcy51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAgLy8gcGVyIDEwMCwwMDAgc2VlZHMgcGVyIGFjcmVcblx0XHRcdHRoaXMub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAgLy8gcGVyIDEwMCwwMDAgc2VlZHMgcGVyIGFjcmVcblxuXHRcdFx0Ly8gT3RoZXJcblx0XHRcdHRoaXMuaXNDZXJ0aWZpZWQgPSAhIWNlcnRpZmllZFxuXG5cdFx0XHQvLyBNZXRob2RzXG5cdFx0XHR0aGlzLnJlc2V0VG9EZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHRoaXMuaXNDZXJ0aWZpZWQpIHtcblx0XHRcdFx0XHRzZXRDZXJ0aWZpZWRTZWVkRGVmYXVsdHModGhpcylcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZXRTYXZlZFNlZWREZWZhdWx0cyh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluaXRpYWxpemVcblx0XHRcdHRoaXMucmVzZXRUb0RlZmF1bHRzKClcblx0XHR9XG5cblx0XHR2YXIgT3B0aW1hbFNlZWRpbmdSYXRlSW1wYWN0RGF0YSA9IGZ1bmN0aW9uIChzZWVkc1BlckxiKSB7XG5cdFx0XHQvLyBDYWxjdWxhdGVkXG5cdFx0XHR0aGlzLnlpZWxkQWR2YW50YWdlQnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHR0aGlzLnNlZWRMYlBlckFjcmVSZXF1aXJlZCA9IDBcblx0XHRcdHRoaXMuc2VlZHNQZXJBY3JlUmVxdWlyZWQgPSAwXG5cdFx0XHR0aGlzLmNvc3RQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0ID0gMFxuXHRcdFx0dGhpcy5hY3R1YWxTZWVkaW5nUmF0ZSA9IDBcblx0XHRcdHRoaXMuc2VlZGluZ1JhdGVWc1RhcmdldCA9IDBcblx0XHRcdHRoaXMub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0ID0gMFxuXHRcdFx0dGhpcy5mbGF0UmF0ZUNvc3RQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy5jb3N0UGVyQWNyZURpZmZlcmVuY2UgPSAwXG5cdFx0XHR0aGlzLnRvdGFsU2VlZENvc3QgPSAwXG5cdFx0XHR0aGlzLnRvdGFsU2VlZENvc3REaWZmZXJlbnRpYWwgPSAwXG5cdFx0XHR0aGlzLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlID0gMFxuXHRcdFx0dGhpcy5uZXRSZXZlbnVlTGJQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlQmVuZWZpdCA9IDBcblxuXHRcdFx0Ly8gT3RoZXJcblx0XHRcdHRoaXMuc2VlZHNQZXJMYiA9IHNlZWRzUGVyTGJcblx0XHR9XG5cblx0XHR2YXIgc2V0Q2VydGlmaWVkU2VlZERlZmF1bHRzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHR1c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSAwLjk1XG5cdFx0XHR1c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgPSAwLjk4NVxuXHRcdFx0dXNlckRhdGEuY29zdFBlckNXVCA9IDE4XG5cdFx0XHR1c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gODBcblx0XHRcdHVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAzLjVcblx0XHRcdHVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDEwMDAwMDBcblx0XHRcdHVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gMTAwXG5cdFx0XHR1c2VyRGF0YS5hY3Jlc1BsYW50ZWQgPSAyNTAwXG5cdFx0XHR1c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXHRcdFx0dXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXG5cdFx0XHR1c2VyRGF0YS5pc0NlcnRpZmllZCA9IHRydWVcblx0XHR9XG5cblx0XHR2YXIgc2V0U2F2ZWRTZWVkRGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDAuOTNcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCA9IDAuOTVcblx0XHRcdHVzZXJEYXRhLmNvc3RQZXJDV1QgPSA3LjQ2XG5cdFx0XHR1c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gODBcblx0XHRcdHVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAzLjVcblx0XHRcdHVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDEwMDAwMDBcblx0XHRcdHVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gMTAwXG5cdFx0XHR1c2VyRGF0YS5hY3Jlc1BsYW50ZWQgPSAyNTAwXG5cdFx0XHR1c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXHRcdFx0dXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXG5cdFx0XHR1c2VyRGF0YS5pc0NlcnRpZmllZCA9IGZhbHNlXG5cdFx0fVxuXG5cdFx0dmFyIGNhbGN1bGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCA9IGRhdGEudXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uIC8gKGRhdGEuc2VlZHNQZXJMYiAqIGRhdGEudXNlckRhdGEucGVyY2VudFB1cmVTZWVkICogZGF0YS51c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24pXG5cblx0XHRcdGRhdGEuc2VlZHNQZXJBY3JlUmVxdWlyZWQgPSBkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCAqIGRhdGEuc2VlZHNQZXJMYlxuXG5cdFx0XHRkYXRhLmNvc3RQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5jb3N0UGVyQ1dUICogKGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkIC8gMTAwKVxuXG5cdFx0XHRkYXRhLnRvdGFsU2VlZENvc3QgPSBkYXRhLmNvc3RQZXJBY3JlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0ZGF0YS5hY3R1YWxTZWVkaW5nUmF0ZSA9IGRhdGEudXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgKiBkYXRhLnNlZWRzUGVyTGIgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCAqIGRhdGEudXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uXG5cblx0XHRcdGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCA9IGRhdGEuYWN0dWFsU2VlZGluZ1JhdGUgLSBkYXRhLnVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvblxuXG5cdFx0XHRkYXRhLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCA9IGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCA8IDBcblx0XHRcdFx0PyAoZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IC8gMTAwMDAwKSAqIGRhdGEudXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgKiBkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmVcblx0XHRcdFx0OiAoZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IC8gMTAwMDAwKSAqIGRhdGEudXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCAqIGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSAqIC0xXG5cblx0XHRcdGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZSA9IGRhdGEudXNlckRhdGEuY29zdFBlckNXVCAqIChkYXRhLnVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlIC8gMTAwKVxuXG5cdFx0XHRkYXRhLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSA9IGRhdGEuY29zdFBlckFjcmUgLSBkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmVcblxuXHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0RmxhdFJhdGUgPSBkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmUgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRkYXRhLnRvdGFsU2VlZENvc3RGbGF0UmF0ZURpZmZlcmVudGlhbCA9IGRhdGEuY29zdFBlckFjcmVEaWZmZXJlbmNlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0ZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSA9IGRhdGEudXNlckRhdGEuaXNDZXJ0aWZpZWQgPyAoZGF0YS51c2VyRGF0YS5zZWFzb24udG9Mb3dlckNhc2UoKSA9PT0gJ3NwcmluZycgPyA0LjUgOiA3LjUpIDogMFxuXG5cdFx0XHRkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgPSAoKGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSArIGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUpICogZGF0YS51c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWQpIC0gZGF0YS50b3RhbFNlZWRDb3N0XG5cblx0XHRcdGRhdGEubmV0UmV2ZW51ZUxiUGVyQWNyZSA9ICgoZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSArIGRhdGEub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0KSAqIGRhdGEudXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkKSAtIGRhdGEudG90YWxTZWVkQ29zdFxuXG5cdFx0XHRkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWVCZW5lZml0ID0gZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlIC0gZGF0YS5uZXRSZXZlbnVlTGJQZXJBY3JlXG5cdFx0fVxuXG5cdFx0dmFyIGdldERhdGFTZXJpZXMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdHZhciBzZXJpZXMgPSBbXVxuXG5cdFx0XHRmb3IgKHZhciBzZWVkc1BlckxiID0gU0VFRFNfUEVSX0xCX01JTjsgc2VlZHNQZXJMYiA8PSBTRUVEU19QRVJfTEJfTUFYOyBzZWVkc1BlckxiICs9IFNFRURTX1BFUl9MQl9TVEVQKSB7XG5cdFx0XHRcdHZhciBkYXRhSXRlbSA9IG5ldyBPcHRpbWFsU2VlZGluZ1JhdGVJbXBhY3REYXRhKHNlZWRzUGVyTGIpXG5cblx0XHRcdFx0Ly8gTWVyZ2UgaW4gdGhlIHVzZXJEYXRhIHByb3BlcnRpZXNcblx0XHRcdFx0ZGF0YUl0ZW0udXNlckRhdGEgPSB7fVxuXHRcdFx0XHRmb3IgKHZhciBwcm9wIGluIHVzZXJEYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHVzZXJEYXRhLmhhc093blByb3BlcnR5KHByb3ApICYmIHR5cGVvZiB1c2VyRGF0YVtwcm9wXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0ZGF0YUl0ZW0udXNlckRhdGFbcHJvcF0gPSB1c2VyRGF0YVtwcm9wXVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhbGN1bGF0ZShkYXRhSXRlbSlcblx0XHRcdFx0c2VyaWVzLnB1c2goZGF0YUl0ZW0pXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXJpZXNcblx0XHR9XG5cblx0XHR2YXIgZ2V0U2VyaWVzQ29sdW1uRGF0YSA9IGZ1bmN0aW9uIChzZXJpZXMsIGNvbHVtbikge1xuXHRcdFx0dmFyIGRhdGEgPSBbXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IHNlcmllc1tpXTsgaSsrKSB7XG5cdFx0XHRcdGRhdGEucHVzaChzZXJpZXNbaV1bY29sdW1uXSlcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGFcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0U2VlZENhbGNVc2VyRGF0YTogU2VlZENhbGNVc2VyRGF0YSxcblx0XHRcdGdldERhdGFTZXJpZXM6IGdldERhdGFTZXJpZXMsXG5cdFx0XHRnZXRTZXJpZXNDb2x1bW5EYXRhOiBnZXRTZXJpZXNDb2x1bW5EYXRhXG5cdFx0fVxuXHR9KCkpXG5cblx0dmFyIFNlZWRDYWxjID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBDT05TVEFOVFNcblx0XHR2YXIgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9XSURUSCA9IDQwMCAgIC8vIG1heCB3aWR0aCBmb3Igc21hbGwgZGV2aWNlc1xuXHRcdHZhciBDSEFSVF9NT0JJTEVfU01BTExfTUFYX0hFSUdIVCA9IDI2NyAgLy8gbWF4IGhlaWdodCBmb3Igc21hbGwgZGV2aWNlc1xuXHRcdHZhciBDSEFSVF9NT0JJTEVfTUFYX1dJRFRIID0gNjAwICAgLy8gbWF4IHdpZHRoIGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdHZhciBDSEFSVF9NT0JJTEVfTUFYX0hFSUdIVCA9IDMwMCAgLy8gbWF4IGhlaWdodCBmb3IgbW9iaWxlIGRldmljZXNcblx0XHR2YXIgQ0hBUlRfTUFYX1dJRFRIID0gNjAwXG5cdFx0dmFyIENIQVJUX01BWF9IRUlHSFQgPSAzMDBcblx0XHR2YXIgQ09MT1JfREFSS19SRUQgPSAnIzUyOTNBQidcblx0XHR2YXIgQ09MT1JfTElHSFRfUkVEID0gJyM3MmIxYzgnXG5cdFx0dmFyIENPTE9SX0RBUktfQkxVRSA9ICcjMzczODM2J1xuXHRcdHZhciBDT0xPUl9MSUdIVF9CTFVFID0gJyM2NDY1NjAnXG5cblx0XHQvLyBQUk9QRVJUSUVTXG5cblx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGEgPSBuZXcgU2VlZENhbGNEYXRhLlNlZWRDYWxjVXNlckRhdGEodHJ1ZSlcblx0XHR2YXIgc2F2ZWRTZWVkRGF0YSA9IG5ldyBTZWVkQ2FsY0RhdGEuU2VlZENhbGNVc2VyRGF0YSgpXG5cblx0XHQvLyBNRVRIT0RTXG5cblx0XHR2YXIgaXNNb2JpbGVTbWFsbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKSA8IENIQVJUX01PQklMRV9TTUFMTF9NQVhfV0lEVEhcblx0XHR9XG5cblx0XHR2YXIgaXNNb2JpbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKCkgPCBDSEFSVF9NT0JJTEVfTUFYX1dJRFRIXG5cdFx0fVxuXG5cdFx0dmFyIGNhbGN1bGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblx0XHRcdGZvcm0uY2xhc3NMaXN0LmFkZCgnY2FsY3VsYXRlZCcpXG5cblx0XHRcdC8vIEdldCBmb3JtIGZpZWxkIGRhdGFcblx0XHRcdHVwZGF0ZVVzZXJEYXRhRnJvbUZvcm0oKVxuXG5cdFx0XHQvLyBTY3JvbGwgdG8gZmlyc3QgZ3JhcGggKHNldCBhIGRlbGF5IHRvIGFsbG93IHRoZSBzZWN0aW9ucyB0byBiZWNvbWUgdmlzaWJsZSlcblx0XHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBcdHZhciBoZWFkZXJCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1zaXRlLW5hdi13cmFwcGVyLWhlYWRlcicpLFxuXHRcdFx0Ly8gXHRcdGhlYWRlckJhckZpeGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaGVhZGVyQmFyKS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJyxcblx0XHRcdC8vIFx0XHRvZmZzZXQgPSBoZWFkZXJCYXJGaXhlZCA/IC1oZWFkZXJCYXIuY2xpZW50SGVpZ2h0IDogMCxcblx0XHRcdC8vIFx0XHR0b3AgPSBVdGlsaXR5LmdldFRvcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsYy1zZWN0aW9uJykpICsgb2Zmc2V0XG5cdFx0XHQvLyBcdHNtb290aFNjcm9sbCh0b3ApXG5cdFx0XHQvLyB9LCA1MClcblxuXHRcdFx0Ly8gUmUtcmVuZGVyIHRoZSBncmFwaHNcblx0XHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKGNlcnRpZmllZFNlZWREYXRhKVxuXHRcdFx0dmFyIHNhdmVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhzYXZlZFNlZWREYXRhKVxuXHRcdFx0dXBkYXRlR3JhcGhzKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXG5cdFx0XHQvLyBTZXQgdGhlIENhbGN1bGF0ZSBidXR0b24gdGV4dFxuXHRcdFx0dmFyIGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdGUnKVxuXHRcdFx0aWYgKGJ0bi50ZXh0Q29udGVudCA9PT0gJ0NhbGN1bGF0ZScpIHtcblx0XHRcdFx0YnRuLnRleHRDb250ZW50ID0gJ1JlLUNhbGN1bGF0ZSc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZVVzZXJEYXRhRnJvbUZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSkgLyAxMDBcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmNvc3RQZXJDV1QgPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUpXG5cblx0XHRcdHNhdmVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRzYXZlZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSkgLyAxMDBcblx0XHRcdHNhdmVkU2VlZERhdGEuY29zdFBlckNXVCA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUpXG5cblx0XHRcdC8vIFRoZXNlIGZpZWxkcyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBpbiBib3RoIGRhdGFzZXRzXG5cdFx0XHR2YXIgc2Vhc29ucyA9IGZvcm1bJ2Nyb3Bfc2Vhc29uJ11cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2Vhc29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoc2Vhc29uc1tpXS5jaGVja2VkKSBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPSBzYXZlZFNlZWREYXRhLnNlYXNvbiA9IHNlYXNvbnNbaV0udmFsdWVcblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID0gc2F2ZWRTZWVkRGF0YS5zZWFzb24gPSBmb3JtWydjcm9wX3NlYXNvbiddLnZhbHVlXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gc2F2ZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3RhcmdldF95aWVsZCddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IHNhdmVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF93aGVhdF9wcmljZSddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gc2F2ZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nXS52YWx1ZSlcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gc2F2ZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZSddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuYWNyZXNQbGFudGVkID0gc2F2ZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfYWNyZXNfcGxhbnRlZCddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IHNhdmVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZyddLnZhbHVlKSAvIDEwMFxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBzYXZlZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZyddLnZhbHVlKSAvIDEwMFxuXHRcdH1cblxuXHRcdHZhciB1cGRhdGVGb3JtRnJvbVVzZXJEYXRhID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXG5cdFx0XHRmb3JtWydjZXJ0X3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiAqIDEwMFxuXHRcdFx0Zm9ybVsnY2VydF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkICogMTAwXG5cdFx0XHRmb3JtWydjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuY29zdFBlckNXVFxuXG5cdFx0XHRmb3JtWydzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUgPSBzYXZlZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiAqIDEwMFxuXHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkICogMTAwXG5cdFx0XHRmb3JtWydzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEuY29zdFBlckNXVFxuXG5cdFx0XHQvLyBUaGVzZSBmaWVsZHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZXMgaW4gYm90aCBkYXRhc2V0cywgc28ganVzdCB1c2UgdGhlIGZpcnN0IG9uZVxuXHRcdFx0Ly8gZm9ybVsnY3JvcF9zZWFzb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiAvLyBicm9rZW4gaW4gU2FmYXJpXG5cdFx0XHRpZiAoY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID09PSAnd2ludGVyJykge1xuXHRcdFx0XHRmb3JtWydjcm9wX3NlYXNvbiddWzBdLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3JtWydjcm9wX3NlYXNvbiddWzFdLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHR9XG5cdFx0XHRmb3JtWydjcm9wX3RhcmdldF95aWVsZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZVxuXHRcdFx0Zm9ybVsnY3JvcF93aGVhdF9wcmljZSddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbFxuXHRcdFx0Zm9ybVsnY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uXG5cdFx0XHRmb3JtWydjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZVxuXHRcdFx0Zm9ybVsnY3JvcF9hY3Jlc19wbGFudGVkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWRcblx0XHRcdGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3Rcblx0XHRcdGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdFxuXHRcdH1cblxuXHRcdHZhciBzaG93UmVzZXRMaW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSByZXNldCBsaW5rIGlzIHZpc2libGVcblx0XHRcdHZhciByZXNldExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpO1xuXHRcdFx0cmVzZXRMaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXHRcdH1cblxuXHRcdHZhciBoaWRlUmVzZXRMaW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSByZXNldCBsaW5rIGlzIHZpc2libGVcblx0XHRcdHZhciByZXNldExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpO1xuXHRcdFx0cmVzZXRMaW5rLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuXHRcdH1cblxuXHRcdHZhciByZXNldElucHV0cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFJlc2V0IHRoZSBkYXRhIHZhbHVlcyB0byBkZWZhdWx0c1xuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucmVzZXRUb0RlZmF1bHRzKClcblx0XHRcdHNhdmVkU2VlZERhdGEucmVzZXRUb0RlZmF1bHRzKClcblxuXHRcdFx0Ly8gVXBkYXRlIGZvcm0gZmllbGQgdmFsdWVzXG5cdFx0XHR1cGRhdGVGb3JtRnJvbVVzZXJEYXRhKClcblxuXHRcdFx0Ly8gSGlkZSB0aGUgcmVzZXQgbGluayBhZ2FpblxuXHRcdFx0aGlkZVJlc2V0TGluaygpO1xuXHRcdH1cblxuXHRcdHZhciBnZXRDaGFydENhbnZhc0h0bWwgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHZhciB2aWV3cG9ydFdpZHRoID0gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKClcblx0XHRcdHZhciBjYW52YXNTaXplID0ge1xuXHRcdFx0XHR3aWR0aDogaXNNb2JpbGUoKSA/IHZpZXdwb3J0V2lkdGggOiBDSEFSVF9NQVhfV0lEVEgsXG5cdFx0XHRcdGhlaWdodDogaXNNb2JpbGVTbWFsbCgpID8gQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9IRUlHSFQgOiBpc01vYmlsZSgpID8gQ0hBUlRfTU9CSUxFX01BWF9IRUlHSFQgOiBDSEFSVF9NQVhfSEVJR0hUXG5cdFx0XHR9XG5cblx0XHRcdHZhciBodG1sID0gJzxjYW52YXMgaWQ9XCInICsgaWQgKyAnXCIgY2xhc3M9XCJncmFwaCBibG9jay1jZW50ZXJcIiB3aWR0aD1cIicgKyBjYW52YXNTaXplLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyBjYW52YXNTaXplLmhlaWdodCArICdcIj48L2NhbnZhcz4nXG5cblx0XHRcdHJldHVybiBodG1sXG5cdFx0fVxuXG5cdFx0dmFyIHNldENoYXJ0RGVmYXVsdHMgPSBmdW5jdGlvbiAoYW5pbWF0ZSkge1xuXHRcdFx0Ly8gR2xvYmFsIGNoYXJ0IGNvbmZpZ1xuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250RmFtaWx5ID0gJ1wiR290aGFtIFNTbSBBXCIsIFwiR290aGFtIFNTbSBCXCIsIEx1Y2lkYSBHcmFuZGUsIFwiTHVjaWRhIEdyYW5kZVwiLCBMdWNpZGEgU2FucyBVbmljb2RlLCBcIkx1Y2lkYSBTYW5zIFVuaWNvZGVcIiwgTHVjaWRhIFNhbnMsIFwiTHVjaWRhIFNhbnNcIiwgR2VuZXZhLCBWZXJkYW5hLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJ1xuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDE2XG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5tYWludGFpbkFzcGVjdFJhdGlvID0gZmFsc2VcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLmxpbmUuYm9yZGVyV2lkdGggPSAyXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMubGluZS5maWxsID0gZmFsc2VcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDVcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5ib3JkZXJXaWR0aCA9IDJcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmFuaW1hdGlvbi5kdXJhdGlvbiA9IGFuaW1hdGUgPT09IGZhbHNlID8gMCA6IDEwMDBcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmxlZ2VuZC5kaXNwbGF5ID0gZmFsc2VcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmV2ZW50cyA9IHVuZGVmaW5lZCAvLyBpZ25vcmUgbW91c2UvdG91Y2ggZXZlbnRzXG5cblx0XHRcdC8vIHNwZWNpYWwgc2V0dGluZ3MgZm9yIHNtYWxsZXIgc2NyZWVuIHNpemVzXG5cdFx0XHRpZiAoaXNNb2JpbGVTbWFsbCgpKSB7XG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxMVxuXHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gMlxuXHRcdFx0fSBlbHNlIGlmIChpc01vYmlsZSgpKSB7XG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxMlxuXHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gNFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciB1cGRhdGVHcmFwaENvbXBhcmVJbXBhY3QgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpIHtcblx0XHRcdC8vIFNldCB1cCBncmFwaCBjYW52YXNcblx0XHRcdHZhciBjaGFydElkID0gJ2dyYXBoX2NvbXBhcmVfaW1wYWN0J1xuXHRcdFx0dmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19zZWN0aW9uJylcblx0XHRcdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfd3JhcHBlcicpXG5cdFx0XHR2YXIgbGVnZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfbGVnZW5kJylcblx0XHRcdHZhciBjYW52YXMgPSBnZXRDaGFydENhbnZhc0h0bWwoY2hhcnRJZClcblx0XHRcdHZhciBtb2JpbGUgPSBpc01vYmlsZSgpXG5cdFx0XHR2YXIgbW9iaWxlU21hbGwgPSBpc01vYmlsZVNtYWxsKClcblxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSAnaGlkZGVuJyBDU1MgY2xhc3Ncblx0XHRcdHNlY3Rpb24uY2xhc3NOYW1lID0gc2VjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKlxcYmhpZGRlblxcYi9nLCAnJylcblxuXHRcdFx0Ly8gZGVzdHJveSBhbmQgcmVjcmVhdGUgdGhlIGNhbnZhc1xuXHRcdFx0aWYgKHdyYXBwZXIuaGFzQ2hpbGROb2RlcygpKSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuY2hpbGROb2Rlc1swXSlcblx0XHRcdHdyYXBwZXIuaW5uZXJIVE1MID0gY2FudmFzXG5cblx0XHRcdC8vIEdldCB0aGUgeC1heGlzIGxhYmVsc1xuXHRcdFx0dmFyIHhMYWJlbHMgPSBbXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGNlcnRpZmllZFNlZWREYXRhU2VyaWVzW2ldOyBpKyspIHtcblx0XHRcdFx0eExhYmVscy5wdXNoKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzW2ldLnNlZWRzUGVyTGIudG9TdHJpbmcoKSlcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29uZmlndXJlIGFuZCByZW5kZXIgdGhlIGNoYXJ0XG5cdFx0XHR2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZClcblx0XHRcdHZhciBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcblx0XHRcdFx0dHlwZTogJ2xpbmUnLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0bGFiZWxzOiB4TGFiZWxzLFxuXHRcdFx0XHRcdGRhdGFzZXRzOiBbe1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsICdvcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAnY2lyY2xlJyxcblx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19jaXJjbGUtbGluZS1ibHVlLXNvbGlkLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCAnbmV0UmV2ZW51ZUxiUGVyQWNyZScpLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcblx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdjaXJjbGUnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX2NpcmNsZS1saW5lLWJsdWUucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShzYXZlZFNlZWREYXRhU2VyaWVzLCAnb3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZScpLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50UmFkaXVzOiBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzICsgMSxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdyZWN0Jyxcblx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19zcXVhcmUtbGluZS1kYXJrLXNvbGlkLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoc2F2ZWRTZWVkRGF0YVNlcmllcywgJ25ldFJldmVudWVMYlBlckFjcmUnKSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcblx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludFJhZGl1czogQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyArIDEsXG5cdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAncmVjdCcsXG5cdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fc3F1YXJlLWxpbmUtZGFyay5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHR9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0c2NhbGVzOiB7XG5cdFx0XHRcdFx0XHR4QXhlczogW3tcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdib3R0b20nLFxuXHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ1NlZWRzL0xiJyxcblx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpbmRleCAlIDIgPT09IDAgPyBVdGlsaXR5LmFkZERpZ2l0U2VwYXJhdG9ycyh2YWx1ZSkgOiAnJ1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR5QXhlczogW3tcblx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdOZXQgUmV2ZW51ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZm9ybWF0Q3VycmVuY3kodmFsdWUsIGZhbHNlKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY29tcGFyZUdyYXBoJykudmFsKGNoYXJ0LnRvQmFzZTY0SW1hZ2UoKSlcbiAgICAgIH0sIDE1MDApXG5cblx0XHRcdC8vIFVwZGF0ZSBsZWdlbmRcblx0XHRcdGxlZ2VuZC5jbGFzc0xpc3QuYWRkKCdjYWxjLWNoYXJ0LXR5cGUtJyArIGNoYXJ0LmNvbmZpZy50eXBlKTtcblxuXHRcdFx0dmFyIGxlZ2VuZEh0bWwgPSAnPGRpdj4nXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgaXRlbTsgdHlwZW9mIChpdGVtID0gY2hhcnQuY29uZmlnLmRhdGEuZGF0YXNldHNbaV0pICE9PSAndW5kZWZpbmVkJzsgaSsrKSB7XG5cdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzxkaXY+PGltZyBjbGFzcz1cImNhbGMtbGVnZW5kLWljb25cIiBzcmM9XCInICsgaXRlbS5sZWdlbmRJY29uSW1hZ2UgKyAnXCIgYWx0PVwiXCI+IDxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtbGFiZWxcIj4nICsgaXRlbS5sYWJlbCArICc8L3NwYW4+PC9kaXY+J1xuXHRcdFx0fVxuXHRcdFx0bGVnZW5kSHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdGxlZ2VuZC5pbm5lckhUTUwgPSBsZWdlbmRIdG1sXG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUdyYXBoTWF4aW1pemVSZXZlbnVlID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKSB7XG5cdFx0XHQvLyBSZXNldCBzb21lIGdsb2JhbCBjaGFydCBkZWZhdWx0c1xuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLm1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlXG5cblx0XHRcdC8vIFNldCB1cCBncmFwaCBjYW52YXNcblx0XHRcdHZhciBjaGFydElkID0gJ2dyYXBoX21heGltaXplX3JldmVudWUnXG5cdFx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3NlY3Rpb24nKVxuXHRcdFx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ193cmFwcGVyJylcblx0XHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19sZWdlbmQnKVxuXHRcdFx0dmFyIGNhbnZhcyA9IGdldENoYXJ0Q2FudmFzSHRtbChjaGFydElkKVxuXG5cdFx0XHQvLyBSZW1vdmUgdGhlICdoaWRkZW4nIENTUyBjbGFzc1xuXHRcdFx0c2VjdGlvbi5jbGFzc05hbWUgPSBzZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqXFxiaGlkZGVuXFxiL2csICcnKVxuXG5cdFx0XHQvLyBkZXN0cm95IGFuZCByZWNyZWF0ZSB0aGUgY2FudmFzXG5cdFx0XHRpZiAod3JhcHBlci5oYXNDaGlsZE5vZGVzKCkpIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5jaGlsZE5vZGVzWzBdKVxuXHRcdFx0d3JhcHBlci5pbm5lckhUTUwgPSBjYW52YXNcblxuXHRcdFx0Ly8gQ29uZmlndXJlIGFuZCByZW5kZXIgdGhlIGNoYXJ0XG5cdFx0XHR2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZClcblx0XHRcdHZhciBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcblx0XHRcdFx0dHlwZTogJ2JhcicsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRsYWJlbHM6IFtdLFxuXHRcdFx0XHRcdGRhdGFzZXRzOiBbe1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogWyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1sgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMubGVuZ3RoIC0gMSBdLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgXSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRFxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogWyBzYXZlZFNlZWREYXRhU2VyaWVzWyBzYXZlZFNlZWREYXRhU2VyaWVzLmxlbmd0aCAtIDEgXS5uZXRSZXZlbnVlTGJQZXJBY3JlIF0sXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG5cdFx0XHRcdFx0c2NhbGVzOiB7XG5cdFx0XHRcdFx0XHR5QXhlczogW3tcblx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdOZXQgUmV2ZW51ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZm9ybWF0Q3VycmVuY3kodmFsdWUsIGZhbHNlKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjcmV2ZW51ZUdyYXBoJykudmFsKGNoYXJ0LnRvQmFzZTY0SW1hZ2UoKSlcbiAgICAgIH0sIDE1MDApXG5cblx0XHRcdC8vIFVwZGF0ZSBsZWdlbmRcblx0XHRcdGxlZ2VuZC5jbGFzc0xpc3QuYWRkKCdjYWxjLWNoYXJ0LXR5cGUtJyArIGNoYXJ0LmNvbmZpZy50eXBlKTtcblxuXHRcdFx0dmFyIGxlZ2VuZEh0bWwgPSAnPGRpdj4nXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgaXRlbTsgdHlwZW9mIChpdGVtID0gY2hhcnQuY29uZmlnLmRhdGEuZGF0YXNldHNbaV0pICE9PSAndW5kZWZpbmVkJzsgaSsrKSB7XG5cdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzxkaXY+PHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1pY29uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBpdGVtLmJhY2tncm91bmRDb2xvciArICdcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtbGFiZWxcIj4nICsgaXRlbS5sYWJlbCArICc8L3NwYW4+PC9kaXY+J1xuXHRcdFx0fVxuXHRcdFx0bGVnZW5kSHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdGxlZ2VuZC5pbm5lckhUTUwgPSBsZWdlbmRIdG1sXG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUdyYXBocyA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcywgYW5pbWF0ZSkge1xuXHRcdFx0c2V0Q2hhcnREZWZhdWx0cyhhbmltYXRlKVxuXHRcdFx0dXBkYXRlR3JhcGhDb21wYXJlSW1wYWN0KGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXHRcdFx0dXBkYXRlR3JhcGhNYXhpbWl6ZVJldmVudWUoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cdFx0fVxuXG5cdFx0Ly8gRVZFTlRTXG5cblx0XHR2YXIgb25DYWxjdWxhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0ZnVuY3Rpb24gdmFsaWRhdGVGb3JtKCkge1xuXHRcdFx0XHQgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcblx0XHRcdFx0ICAkKCcuY2FsYy1maWVsZCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCAgICBpZiAoICQodGhpcykudmFsKCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcInJlZFwifSlcblx0XHRcdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlzVmFsaWQpXG5cdFx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcIiM2NjY2NWNcIn0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdCAgfSk7XG5cdFx0XHRcdCAgcmV0dXJuIGlzVmFsaWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGdvID0gdmFsaWRhdGVGb3JtKClcblx0XHRcdFx0dmFyIGVycm9yRm9ybU1lc3NhZ2UgPSAnPHNwYW4gY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZSB0byBjYWxjdWxhdGUuPC9zcGFuPidcblx0XHRcdFx0aWYgKCBnbyA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2l0IGlzIHZhbGlkJylcblx0XHRcdFx0XHQkKCcuZXJyb3JGb3JtTWVzc2FnZScpLnJlbW92ZSgpXG5cdFx0XHRcdFx0JCgnI2dyYXBoX2NvbXBhcmVfaW1wYWN0X3NlY3Rpb24gLCAjZ3JhcGhfbWF4aW1pemVfcmV2ZW51ZV9zZWN0aW9uJykuc2xpZGVEb3duKClcblx0XHRcdFx0XHQkKCcuYWN0aW9uRGF0YScpLnNob3coKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdGNhbGN1bGF0ZSgpXG5cdFx0XHRcdH1lbHNlIGlmICggZ28gPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaXQgaXMgbm90IHZhbGlkJylcblx0XHRcdFx0XHRpZiAoJCgnLmVycm9yRm9ybU1lc3NhZ2UnKVswXSkge1xuXG5cdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnI3lpZWxkSW1wYWN0Rm9yVW5kZXJzZWVkaW5nJykuYWZ0ZXIoZXJyb3JGb3JtTWVzc2FnZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0dmFyIG9uRm9ybUlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdC8vIFNob3cgdGhlICdyZXNldCBmb3JtJyBsaW5rIHdoZW4gZGV2aWF0aW5nIGZyb20gdGhlIGRlZmF1bHRzXG5cdFx0XHRzaG93UmVzZXRMaW5rKClcblx0XHR9XG5cblx0XHR2YXIgb25SZXNldEZvcm0gPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gUmVzZXQgdGhlIGRhdGEgYW5kIGZvcm0gdmFsdWVzXG5cdFx0XHRyZXNldElucHV0cygpXG5cdFx0fVxuXG5cdFx0dmFyIG9uRW1haWxEYXRhID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdC8vIE5PVEU6IFRoZSBnZW5lcmF0ZWQgUERGIHdpbGwgaGF2ZSB0aGUgZGF0YSB0aGF0IGlzIGN1cnJlbnRseSByZXByZXNlbnRlZCBpbiB0aGUgY2hhcnRzLiBJZiB0aGUgdXNlciBoYXMgY2hhbmdlZCBmb3JtIGZpZWxkIHZhbHVlcywgYnV0IG5vdCBjbGlja2VkIFwiQ2FsY3VsYXRlXCIsIHRoZW4gdGhlc2UgYXJlIG5vdCByZWZsZWN0ZWQgaW4gdGhlIG91dHB1dC5cblxuXHRcdFx0Ly8gVE9ETzogU2hvdyBlbWFpbCBmaWVsZHMgZm9yIHVzZXIgaW5wdXQuIFN1Ym1pdHRpbmcgdGhpcyBmb3JtIHdpbGwgZXhlY3V0ZSB0aGUgZW1haWxEYXRhKCkgbWV0aG9kLlxuXHRcdFx0Y29uc29sZS5pbmZvKCdFbWFpbCBQREYnKVxuXHRcdH1cblxuXHRcdHZhciBvbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0Ly8gT25seSByZWRyYXcgdGhlIGdyYXBocyBpZiB0aGV5IGhhdmUgYmVlbiBjYWxjdWxhdGVkIGF0IGxlYXN0IG9uY2UgYWxyZWFkeVxuXHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXHRcdFx0aWYgKGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYWxjdWxhdGVkJykpIHtcblx0XHRcdFx0Ly8gUmUtcmVuZGVyIHRoZSBncmFwaHNcblx0XHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoY2VydGlmaWVkU2VlZERhdGEpXG5cdFx0XHRcdHZhciBzYXZlZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoc2F2ZWRTZWVkRGF0YSlcblx0XHRcdFx0dXBkYXRlR3JhcGhzKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzLCBmYWxzZSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgb25Eb3dubG9hZFBkZiA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHQvLyBOT1RFOiBUaGUgZ2VuZXJhdGVkIFBERiB3aWxsIGhhdmUgdGhlIGRhdGEgdGhhdCBpcyBjdXJyZW50bHkgcmVwcmVzZW50ZWQgaW4gdGhlIGNoYXJ0cy4gSWYgdGhlIHVzZXIgaGFzIGNoYW5nZWQgZm9ybSBmaWVsZCB2YWx1ZXMsIGJ1dCBub3QgY2xpY2tlZCBcIkNhbGN1bGF0ZVwiLCB0aGVuIHRoZXNlIGFyZSBub3QgcmVmbGVjdGVkIGluIHRoZSBvdXRwdXQuXG5cblx0XHRcdC8vIFRPRE86IFRyaWdnZXJpbmcgdGhpcyBoYW5kbGVyIHdpbGwgZXhlY3V0ZSB0aGUgZG93bmxvYWRQZGYoKSBtZXRob2Rcblx0XHRcdGNvbnNvbGUuaW5mbygnRG93bmxvYWQgUERGJylcblx0XHR9XG5cblx0XHR2YXIgd2lyZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBmb3JtRWxlbWVudHMgPSAkKCcjc2VlZF9jYWxjX2Zvcm0gaW5wdXQsICNzZWVkX2NhbGNfZm9ybSB0ZXh0YXJlYSwgI3NlZWRfY2FsY19mb3JtIHNlbGVjdCcpXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBmb3JtRWxlbWVudHNbaV1cblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25Gb3JtSW5wdXRDaGFuZ2UpXG5cdFx0XHR9XG5cblx0XHRcdHZhciBjYWxjdWxhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRlJylcblx0XHRcdGNhbGN1bGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2FsY3VsYXRlKVxuXG5cdFx0XHQvLyBBZGQgdHJpZ2dlciB0byByZXNldCB0byB0aGUgZGVmYXVsdCB2YWx1ZXNcblx0XHRcdHZhciByZXNldEZvcm1MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKVxuXHRcdFx0cmVzZXRGb3JtTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uUmVzZXRGb3JtKVxuXG5cdFx0XHQvLyBBZGQgdHJpZ2dlciB0byBlbWFpbCB0aGUgcmVzdWx0cyBhcyBhIFBERlxuXHRcdFx0Ly92YXIgZW1haWxEYXRhQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsX2RhdGEnKVxuXHRcdFx0Ly9lbWFpbERhdGFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkVtYWlsRGF0YSlcblxuXHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gZG93bmxvYWQgdGhlIHJlc3VsdHMgYXMgYSBQREZcblx0XHRcdC8vdmFyIGRvd25sb2FkUGRmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25sb2FkX3BkZicpXG5cdFx0XHQvL2Rvd25sb2FkUGRmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Eb3dubG9hZFBkZilcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uV2luZG93UmVzaXplKTtcblx0XHR9XG5cblx0XHR2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIEluaXRpYWxpemUgdXNlciBmb3JtIGlucHV0cyB3aXRoIGRlZmF1bHQgZGF0YVxuXHRcdFx0dXBkYXRlRm9ybUZyb21Vc2VyRGF0YSgpXG5cblx0XHRcdC8vIFdpcmUgdXAgaW50ZXJhY3RpdmUgZXZlbnRzXG5cdFx0XHR3aXJlRXZlbnRzKClcblx0XHR9XG5cblx0XHRyZXR1cm4geyBpbml0OiBpbml0IH1cblx0fSgpKVxuXG5cdFNlZWRDYWxjLmluaXQoKVxufSlcbiAgaWYoICQoJ2JvZHknKS5oYXNDbGFzcygnZmluZC1zZWVkLXN1cHBsaWVyJykgKSB7XG4gICAgJCgnI3N0YXRlc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5nZVN0YXRlKClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlU3RhdGUgKCkge1xuICAgICAgaWYgKCQoJyNyZXN1bHRzJykuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgICQoJyNyZXN1bHRzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgICB9XG4gICAgICB2YXIgc2VsZWN0ZWRzdGF0ZSA9ICQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKVxuICAgICAgJCgnLnN1cHBsaWVyLCAucmVwJykuaGlkZSgpXG4gICAgICAkKCcuJyArIHNlbGVjdGVkc3RhdGUpLnNob3coKVxuXG4gICAgICBpZiAoISQoJy4nICsgc2VsZWN0ZWRzdGF0ZSlbMF0pIHtcbiAgICAgICAgICAkKCcuZmFpbHVyZV9fbm9zdXBwbGllcnMnKS5zaG93KClcbiAgICAgICAgICB2YXIgc3RhdGVDaG9zZW4gPSAkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpXG4gICAgICAgICAgJCgnLmZhaWx1cmVTcGFuJykudGV4dChzdGF0ZUNob3NlbilcbiAgICAgICAgICAkKCcucmVwX19jdG4nKS5oaWRlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmZhaWx1cmVfX25vc3VwcGxpZXJzJykuaGlkZSgpXG4gICAgICAgICAgJCgnLnJlcF9fY3RuJykuc2hvdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzdWNjZXNzLCBlcnJvcilcblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MgKHBvc2l0aW9uKSB7XG4gICAgICB2YXIgR0VPQ09ESU5HID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPScgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlICsgJyZrZXk9QUl6YVN5QUlhcFFiQnJCY0lGVHVJbE14YlhiTXR5M2RUN1IxYjJrJ1xuXG4gICAgICAkLmdldEpTT04oR0VPQ09ESU5HKS5kb25lKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICB2YXIgdGhlc3RhdGUgPSBsb2NhdGlvbi5yZXN1bHRzWzBdLmFkZHJlc3NfY29tcG9uZW50c1s0XS5zaG9ydF9uYW1lXG4gICAgICAgICQoJyNzdGF0ZXNlbGVjdCcpLnZhbCh0aGVzdGF0ZSlcbiAgICAgICAgY2hhbmdlU3RhdGUoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvciAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxuICB9XG4iXX0=