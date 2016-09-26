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
				if ($('#stateselect option:selected').text() === 'Select a state') {
					$('#results').hide();
				} else {
					$('#results').show();
					$('.failure__nosuppliers').show();
					var stateChosen = $('#stateselect option:selected').text();
					$('.failureSpan').text(stateChosen);
					$('.rep__ctn').hide();
				}
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

//# sourceMappingURL=data:application/json;base64,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O0FBQ0QsR0FGRDs7QUE0QkEsWUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxPQUF6QyxFQUFrRCxLQUFsRDtBQTdCNkM7QUE0QzlDIiwiZmlsZSI6ImJ1bmRsZS5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG5jb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcblxuICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykgPT09IHRydWUpIHtcbiAgICAkKCcjbWFpbGJhcicpLmhpZGUoKVxuICB9ZWxzZSB7XG4gICAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG4gIH1cblxufVxuXG4vLyBjbGljayB0aXRsZSBvciBkb3duIGFycm93XG4kKCcjbWFpbGJhci1hY3RpdmF0ZScpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHZoXG4gIGNvbnN0ICRib2R5ID0gJCgnI21haWxiYXItYm9keScpXG4gIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgIHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9IGVsc2Uge1xuICAgIHZoID0gNDAwXG4gIH1cblxuICBpZiAoJGJvZHkuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gIH0gZWxzZSB7XG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICB9XG5cbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxufSlcblxuLy8gY2xpY2sgZGlzbWlzc1xuJCgnI21haWxiYXItZGlzbWlzcycpLm9uKCdjbGljaycsIGRpc21pc3NNYWlsYmFyKVxuXG5mdW5jdGlvbiBkaXNtaXNzTWFpbGJhciAoKSB7XG4gIC8vIGlmIHRoZSBtZW51IGlzIGFjdGl2ZSBhbmQgeW91IGRpc21pc3MsIHJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0XG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtYWN0aXZlJykpIHtcbiAgICBjb25zdCBtZW51ID0gJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJylcbiAgICBjb25zdCBhZGRlZEhlaWdodCA9IG1lbnUuaGVpZ2h0KCkgKyAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBhZGRlZEhlaWdodCArICdweCcpXG4gIH1cblxuICAkKCcjbWFpbGJhcicpLmFuaW1hdGUoeyBoZWlnaHQ6ICcwJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxuICB9KVxuXG4gIGRvY3VtZW50LmNvb2tpZSA9ICdzdWJzY3JpYmVkPXRydWUnXG59XG4kKCcjbWVudS1hY3RpdmF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG1haWxiYXIgPSAwXG4gIGlmICgkKCcjbWFpbGJhci1ib2R5JykubGVuZ3RoKSB7XG4gICAgbWFpbGJhciA9ICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgfVxuXG4gIGNvbnN0IHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21lbnUnKS5oZWlnaHQoKSAtIG1haWxiYXJcbiAgY29uc3QgbWVudSA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tZW51XCI+PC91c2U+J1xuICBjb25zdCBjcm9zcyA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jcm9zc1wiPjwvdXNlPidcblxuICBpZiAoJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGNyb3NzKVxuICB9IGVsc2Uge1xuICAgICQoJyNtZW51LWhlYWRlci1tZW51LWNvbnRhaW5lcicpLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKG1lbnUpXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2ZScpXG59KVxuXG4vLyBUT0RPOiByZWNhbGMgbWVudSBoZWlnaHQgb24gcmVzaXplIGlmIGluIG1vYmlsZSB3aWR0aHNcbiQod2luZG93KS5yZXNpemUoKVxuJCgnLmJlbmVmaXRzX19oZWFkbGluZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCh0aGlzKS5uZXh0KClcbiAgICBjb25zdCBhcnJvd0Rvd24gPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPidcbiAgICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gICAgJGJvZHkuc2xpZGVUb2dnbGUoKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93RG93bilcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd1VwKVxuICAgIH1cblxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pXG4vLyB3aW5kb3cuYWxlcnQgPSBmdW5jdGlvbiAoKSB7fVxuLy8gIFZhbGlkYXRlIENvbnRhY3QgVXMgRmllbGRzXG5pZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykpIHtcbiAgICAkKCcucHJpbWFyeUFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIFZhbGl0KCkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQoJy52YWxpZGF0ZS1lbWFpbCcpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0RW1haWwnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCgnI3RmYV8yJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFweCBzb2xpZCByZWRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVuaXQgPSBWYWxpdCgpO1xuICAgICAgICB2YXIgZXJyb3IgPSAnPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjpzdGF0aWM7XCIgY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZS48L3NwYW4+J1xuICAgICAgICBpZiAocnVuaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnI3RmYV8wJykuc3VibWl0KClcbiAgICAgICAgICAgICQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5hZnRlcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4ndXNlIHN0cmljdCdcblxuJCgnLnRvZ2dsZU1vZGFsJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuXHRcdCQoJyNlbWFpbERhdGEnKS5zbGlkZURvd24oKVxuIH0pO1xuXG5cbiQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICQoJy50aGFua3lvdW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbiQoJyNyZXNldF9mb3JtLCN0aGFua3lvdV9fc3RhcnRvdmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHQkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xufSk7XG5cbiQoXCIjZW1haWxEYXRhRm9ybVwiKS5iaW5kKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZSkge1xuICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgZGVmYXVsdCBldmVudFxuICAgfVxufSk7XG5cblxuJCgnI2Rvd25sb2FkUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0JCgnI3BkZkRhdGEnKS52YWwoSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkpXG5cdCQoJyNwZGZGb3JtJykuc3VibWl0KClcbn0pXG5cbiQoJyNtYWlsUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0Ly9WYWxpZGF0ZSBFbWFpbFxuXHRmdW5jdGlvbiBpc19lbWFpbChlbWFpbCl7XG5cdHZhciBlbWFpbFJlZyA9IC9eW2EtekEtWjAtOS5fLV0rQFthLXpBLVowLTkuLV0rXFwuW2EtekEtWl17Miw0fSQvO1xuXHRyZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7IH1cblxuXHR2YXIgZW1haWxJbnB1dCA9IGlzX2VtYWlsKCQoJyNyZWNpcGllbnRFbWFpbCcpLnZhbCgpKVxuXHR2YXIgZW1haWxFcnJvciA9ICc8c21hbGwgY2xhc3M9XCJlbWFpbEVycm9yXCI+UGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsLjwvc21hbGwnXG5cblx0aWYgKGVtYWlsSW5wdXQgPT0gZmFsc2UpIHtcblx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdGlmICgkKCcuZW1haWxFcnJvcicpWzBdKSB7XG5cdFx0fWVsc2Uge1xuXHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihlbWFpbEVycm9yKVxuXHRcdH1cblxuXG5cdH1lbHNlIHtcblx0XHQkKCcuZW1haWxFcnJvcicpLnJlbW92ZSgpXG5cdFx0JCgnI3JlY2lwaWVudEVtYWlsJykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcImluaGVyaXRcIn0pXG5cdFx0dmFyIHF1ZXJ5U3RyaW5nQWRkID0gJyZyZWNpcGllbnRzPScgKyBlbmNvZGVVUklDb21wb25lbnQoJCgnI3JlY2lwaWVudEVtYWlsJykudmFsKCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc2VuZGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ25vLXJlcGx5QGhsa2FnZW5jeS5jb20nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KyAnJnN1YmplY3Q9JyArIGVuY29kZVVSSUNvbXBvbmVudCgnWW91ciBXaGVhdCBQcm9maXRhYmlsaXR5IENhbGN1bGF0b3IgUmVzdWx0cycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmZmlyc3ROYW1lPSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICdodHRwOi8vaGxrLXBkZi1zZXJ2ZXIuY2VudHJhbHVzLmNsb3VkYXBwLmF6dXJlLmNvbS9hcGkvdjEvRW1haWxMaW5rP3RlbXBsYXRlTmFtZT1XZXN0QnJlZF9Qcm9maXRDYWxjJyArIHF1ZXJ5U3RyaW5nQWRkLFxuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0ZGF0YTogJ3sgXCJqc29uXCIgOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkgKyAnfScsXG5cdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIG9wdHMgPSB7XG5cdFx0XHRcdCAgbGluZXM6IDEzIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuXHRcdFx0XHQsIGxlbmd0aDogMjggLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcblx0XHRcdFx0LCB3aWR0aDogMTQgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG5cdFx0XHRcdCwgcmFkaXVzOiA0MiAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcblx0XHRcdFx0LCBzY2FsZTogMC4xNSAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG5cdFx0XHRcdCwgY29ybmVyczogMC4zIC8vIENvcm5lciByb3VuZG5lc3MgKDAuLjEpXG5cdFx0XHRcdCwgY29sb3I6ICcjZmZmJyAvLyAjcmdiIG9yICNycmdnYmIgb3IgYXJyYXkgb2YgY29sb3JzXG5cdFx0XHRcdCwgb3BhY2l0eTogMCAvLyBPcGFjaXR5IG9mIHRoZSBsaW5lc1xuXHRcdFx0XHQsIHJvdGF0ZTogMCAvLyBUaGUgcm90YXRpb24gb2Zmc2V0XG5cdFx0XHRcdCwgZGlyZWN0aW9uOiAxIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2Vcblx0XHRcdFx0LCBzcGVlZDogMSAvLyBSb3VuZHMgcGVyIHNlY29uZFxuXHRcdFx0XHQsIHRyYWlsOiA4NSAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuXHRcdFx0XHQsIGZwczogMjAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZyBzZXRUaW1lb3V0KCkgYXMgYSBmYWxsYmFjayBmb3IgQ1NTXG5cdFx0XHRcdCwgekluZGV4OiAyZTkgLy8gVGhlIHotaW5kZXggKGRlZmF1bHRzIHRvIDIwMDAwMDAwMDApXG5cdFx0XHRcdCwgY2xhc3NOYW1lOiAnc3Bpbm5lcicgLy8gVGhlIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIHNwaW5uZXJcblx0XHRcdFx0LCB0b3A6ICctMjBweCcgLy8gVG9wIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuXHRcdFx0XHQsIGxlZnQ6ICc1MCUnIC8vIExlZnQgcG9zaXRpb24gcmVsYXRpdmUgdG8gcGFyZW50XG5cdFx0XHRcdCwgc2hhZG93OiBmYWxzZSAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuXHRcdFx0XHQsIGh3YWNjZWw6IGZhbHNlIC8vIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvblxuXHRcdFx0XHQsIHBvc2l0aW9uOiAncmVsYXRpdmUnIC8vIEVsZW1lbnQgcG9zaXRpb25pbmdcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKG9wdHMpLnNwaW4oKVxuXHRcdFx0XHQkKCcjbWFpbFBERicpLmNzcygnY29sb3InLCAndHJhbnNwYXJlbnQnKTtcblx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihzcGlubmVyLmVsKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcjZW1haWxEYXRhJykuaGlkZSgpXG5cdFx0XHQkKCcjdGhhbmt5b3Vtb2RhbCcpLnNob3coKS5zbGlkZURvd24oKVxuXHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdH0pXG5cdFx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuXHRcdH0pXG5cdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG5cdFx0fSlcblx0fVxuXG59KVxuXG5mdW5jdGlvbiBkYXRhRXh0cmFjdCAoKSB7XG5cdHJldHVybiB7XG5cdFx0Y2VydEdlcm1pbmF0aW9uOiAkKCcjY2VydF9zZWVkX2dlcm1pbmF0aW9uJykudmFsKCksXG5cdFx0Y2VydFB1cmVTZWVkOiAkKCcjY2VydF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpLFxuXHRcdGNlcnRTZWVkQ29zdDogJCgnI2NlcnRfc2VlZF9jb3N0X3Blcl91bml0JykudmFsKCksXG5cdFx0c2F2ZWRHZXJtaW5hdGlvbjogJCgnI3NhdmVkX3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSxcblx0XHRzYXZlZFB1cmVTZWVkOiAkKCcjc2F2ZWRfc2VlZF9wdXJlX3NlZWQnKS52YWwoKSxcblx0XHRzYXZlZFNlZWRDb3N0OiAkKCcjc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0JykudmFsKCksXG5cdFx0c2Vhc29uOiAkKCdpbnB1dFtuYW1lPVwiY3JvcF9zZWFzb25cIl06Y2hlY2tlZCcpLnZhbCgpLFxuXHRcdHRhcmdldFlpZWxkOiAkKCcjY3JvcF90YXJnZXRfeWllbGQnKS52YWwoKSxcblx0XHR3aGVhdFByaWNlOiAkKCcjY3JvcF93aGVhdF9wcmljZScpLnZhbCgpLFxuXHRcdHRhcmdldFBsYW50UG9wdWxhdGlvbjogJCgnI2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nKS52YWwoKSxcblx0XHRmbGF0U2VlZGluZ1JhdGU6ICQoJyNjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJykudmFsKCksXG5cdFx0YWNyZXNQbGFudGVkOiAkKCcjY3JvcF9hY3Jlc19wbGFudGVkJykudmFsKCksXG5cdFx0eWllbGRJbXBhY3RPdmVyc2VlZGluZzogJCgnI2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnKS52YWwoKSxcblx0XHR5aWVsZEltcGFjdFVuZGVyc2VlZGluZzogJCgnI2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJykudmFsKCksXG5cdFx0aW1wYWN0Q29tcGFyZUdyYXBoOiAkKCcjY29tcGFyZUdyYXBoJykudmFsKCksXG5cdFx0bWF4aW1pemVSZXZlbnVlR3JhcGg6ICQoJyNyZXZlbnVlR3JhcGgnKS52YWwoKVxuXHR9XG59XG5cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdC8vIE1haW4gYXBwIHN0YXJ0dXBcblxuXHR2YXIgVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gR2V0IHRoZSB0b3AgcG9zaXRpb24gb2YgYW4gZWxlbWVudCBpbiB0aGUgZG9jdW1lbnRcblx0XHQvLyBGcm9tIHNtb290aFNjcm9sbCwgaHR0cHM6Ly9naXRodWIuY29tL2FsaWNlbGlldXRpZXIvc21vb3RoU2Nyb2xsL2Jsb2IvbWFzdGVyL3Ntb290aHNjcm9sbC5qc1xuXHRcdHZhciBnZXRUb3AgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHQvLyByZXR1cm4gdmFsdWUgb2YgaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLi4uIElFIDogMCwgb3RoZXIgYnJvd3NlcnMgOiAtcGFnZVlPZmZzZXRcblx0XHRcdGlmKGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJykgcmV0dXJuIC13aW5kb3cucGFnZVlPZmZzZXRcblx0XHRcdHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHR9XG5cblx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgc2NyZWVuIHZpZXdwb3J0IHdpZHRoXG5cdFx0dmFyIGdldFZpZXdwb3J0V2lkdGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBkaWdpdCBzZXBhcmF0b3IgY2hhcmFjdGVycyB0byBhIG51bWVyaWMgc3RyaW5nXG5cdFx0dmFyIGFkZERpZ2l0U2VwYXJhdG9ycyA9IGZ1bmN0aW9uIChudW0pIHtcblx0XHRcdHZhciBuID0gbnVtLnRvU3RyaW5nKClcblx0XHRcdHZhciBwID0gbi5pbmRleE9mKCcuJylcblx0XHRcdHJldHVybiBuLnJlcGxhY2UoL1xcZCg/PSg/OlxcZHszfSkrKD86XFwufCQpKS9nLCBmdW5jdGlvbiAoJDAsIGkpIHtcblx0XHRcdFx0cmV0dXJuIHAgPCAwIHx8IGkgPCBwID8gKCQwICsgJywnKSA6ICQwXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2hhcmFjdGVyIHJlcHJlc2VudGF0aW9uIG9mIEluZmluaXR5XG5cdFx0dmFyIGdldEluZmluaXR5Q2hhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiAn4oieJ1xuXHRcdH1cblxuXHRcdC8vIEZvcm1hdCBhIG51bWJlciBmb3IgZGlzcGxheVxuXHRcdHZhciBmb3JtYXROdW1iZXIgPSBmdW5jdGlvbiAobnVtYmVyLCBkZWNpbWFscywgc2hvd1Bvc2l0aXZlKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KG51bWJlcilcblx0XHRcdGlmICghaXNOYU4odmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRlY2ltYWxzICE9PSAndW5kZWZpbmVkJyAmJiBkZWNpbWFscyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdC8vIEtlZXAgYSBzZXQgbnVtYmVyIG9mIGRlY2ltYWxzLCBldmVuIGlmIHplcm9lc1xuXHRcdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChkZWNpbWFscykpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gSnVzdCB0cnVuY2F0ZSB0byBhIGZpeGVkIG51bWJlciBvZiBkZWNpbWFscywgYnV0IGRvbid0IHByZXNlcnZlIHRyYWlsaW5nIHplcm9lc1xuXHRcdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyhwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQoMikpKSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGdldEluZmluaXR5Q2hhcigpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRm9ybWF0IGEgbnVtYmVyIGFzIGN1cnJlbnkgZm9yIGRpc3BsYXlcblx0XHR2YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbiAobnVtYmVyLCBzaG93RGVjaW1hbHMsIHNob3dQb3NpdGl2ZSkge1xuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChudW1iZXIpXG5cdFx0XHRpZiAoIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgJyQnICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHZhbHVlKS50b0ZpeGVkKHNob3dEZWNpbWFscyA9PT0gdHJ1ZSA/IDIgOiAwKSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBnZXRJbmZpbml0eUNoYXIoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgYSBmb3JtYXR0ZWQgbnVtYmVyIGJhY2sgaW50byBhbiBhY3R1YWwgbnVtYmVyXG5cdFx0dmFyIHVuZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKC9bXi1cXGRcXC5lXS9nLCAnJykudHJpbSgpKVxuXHRcdH1cblxuXHRcdC8vIEZvcm1hdCBhIGlucHV0IGZpZWxkIGFjY29yZGluZyB0byB0aGUgXCJkYXRhLWZvcm1hdFwiIGF0dHJpYnV0ZVxuXHRcdHZhciBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRpZiAoIWVsZW1lbnQgfHwgKGVsZW1lbnQgJiYgIWVsZW1lbnQudmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiAnJ1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIGVsZW1lbnQudmFsdWUgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtZW50LnZhbHVlXG5cdFx0XHR9XG5cblx0XHRcdHZhciBmb3JtYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmRhdGFzZXQuZm9ybWF0XG5cblx0XHRcdHN3aXRjaCAoZm9ybWF0KSB7XG5cdFx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSlcblxuXHRcdFx0XHRjYXNlICdzaWduZWRudW1iZXInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIG51bGwsIHRydWUpXG5cblx0XHRcdFx0Y2FzZSAnaW50ZWdlcic6XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgMClcblxuXHRcdFx0XHRjYXNlICdmaXhlZDInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIDIpXG5cblx0XHRcdFx0Y2FzZSAnY3VycmVuY3knOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXRDdXJyZW5jeSh1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSlcblx0XHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbWVudC52YWx1ZVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXRUb3A6IGdldFRvcCxcblx0XHRcdGdldFZpZXdwb3J0V2lkdGg6IGdldFZpZXdwb3J0V2lkdGgsXG5cdFx0XHRhZGREaWdpdFNlcGFyYXRvcnM6IGFkZERpZ2l0U2VwYXJhdG9ycyxcblx0XHRcdGdldEluZmluaXR5Q2hhcjogZ2V0SW5maW5pdHlDaGFyLFxuXHRcdFx0Zm9ybWF0TnVtYmVyOiBmb3JtYXROdW1iZXIsXG5cdFx0XHRmb3JtYXRDdXJyZW5jeTogZm9ybWF0Q3VycmVuY3ksXG5cdFx0XHR1bmZvcm1hdE51bWJlcjogdW5mb3JtYXROdW1iZXIsXG5cdFx0XHRmb3JtYXRWYWx1ZTogZm9ybWF0VmFsdWVcblx0XHR9XG5cdH0oKSlcblxuXHR2YXIgU2VlZENhbGNEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgU0VFRFNfUEVSX0xCX01JTiA9IDkwMDBcblx0XHR2YXIgU0VFRFNfUEVSX0xCX01BWCA9IDE4MDAwXG5cdFx0dmFyIFNFRURTX1BFUl9MQl9TVEVQID0gNTAwXG5cblx0XHR2YXIgU2VlZENhbGNVc2VyRGF0YSA9IGZ1bmN0aW9uIChjZXJ0aWZpZWQpIHtcblx0XHRcdC8vIFByb3BlcnRpZXNcblx0XHRcdHRoaXMuc2Vhc29uID0gJ3dpbnRlcicgLy8gc3ByaW5nfHdpbnRlclxuXG5cdFx0XHR0aGlzLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDBcblx0XHRcdHRoaXMucGVyY2VudFB1cmVTZWVkID0gMFxuXHRcdFx0dGhpcy5jb3N0UGVyQ1dUID0gMFxuXHRcdFx0dGhpcy50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy53aGVhdFByaWNlUGVyQnVzaGVsID0gMFxuXHRcdFx0dGhpcy50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAwXG5cdFx0XHR0aGlzLmZsYXRSYXRlTGJQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy5hY3Jlc1BsYW50ZWQgPSAwXG5cblx0XHRcdHRoaXMudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwIC8vIHBlciAxMDAsMDAwIHNlZWRzIHBlciBhY3JlXG5cdFx0XHR0aGlzLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwIC8vIHBlciAxMDAsMDAwIHNlZWRzIHBlciBhY3JlXG5cblx0XHRcdC8vIE90aGVyXG5cdFx0XHR0aGlzLmlzQ2VydGlmaWVkID0gISFjZXJ0aWZpZWRcblxuXHRcdFx0Ly8gTWV0aG9kc1xuXHRcdFx0dGhpcy5yZXNldFRvRGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0aGlzLmlzQ2VydGlmaWVkKSB7XG5cdFx0XHRcdFx0c2V0Q2VydGlmaWVkU2VlZERlZmF1bHRzKHRoaXMpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2V0U2F2ZWRTZWVkRGVmYXVsdHModGhpcylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbml0aWFsaXplXG5cdFx0XHR0aGlzLnJlc2V0VG9EZWZhdWx0cygpXG5cdFx0fVxuXG5cdFx0dmFyIE9wdGltYWxTZWVkaW5nUmF0ZUltcGFjdERhdGEgPSBmdW5jdGlvbiAoc2VlZHNQZXJMYikge1xuXHRcdFx0Ly8gQ2FsY3VsYXRlZFxuXHRcdFx0dGhpcy55aWVsZEFkdmFudGFnZUJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0dGhpcy5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgPSAwXG5cdFx0XHR0aGlzLnNlZWRzUGVyQWNyZVJlcXVpcmVkID0gMFxuXHRcdFx0dGhpcy5jb3N0UGVyQWNyZSA9IDBcblx0XHRcdHRoaXMudG90YWxTZWVkQ29zdCA9IDBcblx0XHRcdHRoaXMuYWN0dWFsU2VlZGluZ1JhdGUgPSAwXG5cdFx0XHR0aGlzLnNlZWRpbmdSYXRlVnNUYXJnZXQgPSAwXG5cdFx0XHR0aGlzLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCA9IDBcblx0XHRcdHRoaXMuZmxhdFJhdGVDb3N0UGVyQWNyZSA9IDBcblx0XHRcdHRoaXMuY29zdFBlckFjcmVEaWZmZXJlbmNlID0gMFxuXHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0ID0gMFxuXHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0RGlmZmVyZW50aWFsID0gMFxuXHRcdFx0dGhpcy5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSA9IDBcblx0XHRcdHRoaXMubmV0UmV2ZW51ZUxiUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZUJlbmVmaXQgPSAwXG5cblx0XHRcdC8vIE90aGVyXG5cdFx0XHR0aGlzLnNlZWRzUGVyTGIgPSBzZWVkc1BlckxiXG5cdFx0fVxuXG5cdFx0dmFyIHNldENlcnRpZmllZFNlZWREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0dXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gMC45NVxuXHRcdFx0dXNlckRhdGEucGVyY2VudFB1cmVTZWVkID0gMC45ODVcblx0XHRcdHVzZXJEYXRhLmNvc3RQZXJDV1QgPSAxOFxuXHRcdFx0dXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDgwXG5cdFx0XHR1c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gMy41XG5cdFx0XHR1c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAxMDAwMDAwXG5cdFx0XHR1c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IDEwMFxuXHRcdFx0dXNlckRhdGEuYWNyZXNQbGFudGVkID0gMjUwMFxuXHRcdFx0dXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblx0XHRcdHVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblxuXHRcdFx0dXNlckRhdGEuaXNDZXJ0aWZpZWQgPSB0cnVlXG5cdFx0fVxuXG5cdFx0dmFyIHNldFNhdmVkU2VlZERlZmF1bHRzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHR1c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSAwLjkzXG5cdFx0XHR1c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgPSAwLjk1XG5cdFx0XHR1c2VyRGF0YS5jb3N0UGVyQ1dUID0gNy40NlxuXHRcdFx0dXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDgwXG5cdFx0XHR1c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gMy41XG5cdFx0XHR1c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAxMDAwMDAwXG5cdFx0XHR1c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IDEwMFxuXHRcdFx0dXNlckRhdGEuYWNyZXNQbGFudGVkID0gMjUwMFxuXHRcdFx0dXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblx0XHRcdHVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblxuXHRcdFx0dXNlckRhdGEuaXNDZXJ0aWZpZWQgPSBmYWxzZVxuXHRcdH1cblxuXHRcdHZhciBjYWxjdWxhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0ZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgPSBkYXRhLnVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiAvIChkYXRhLnNlZWRzUGVyTGIgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCAqIGRhdGEudXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uKVxuXG5cdFx0XHRkYXRhLnNlZWRzUGVyQWNyZVJlcXVpcmVkID0gZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgKiBkYXRhLnNlZWRzUGVyTGJcblxuXHRcdFx0ZGF0YS5jb3N0UGVyQWNyZSA9IGRhdGEudXNlckRhdGEuY29zdFBlckNXVCAqIChkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCAvIDEwMClcblxuXHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0ID0gZGF0YS5jb3N0UGVyQWNyZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdGRhdGEuYWN0dWFsU2VlZGluZ1JhdGUgPSBkYXRhLnVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlICogZGF0YS5zZWVkc1BlckxiICogZGF0YS51c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvblxuXG5cdFx0XHRkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgPSBkYXRhLmFjdHVhbFNlZWRpbmdSYXRlIC0gZGF0YS51c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb25cblxuXHRcdFx0ZGF0YS5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QgPSBkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgPCAwXG5cdFx0XHRcdD8gKGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCAvIDEwMDAwMCkgKiBkYXRhLnVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ICogZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlXG5cdFx0XHRcdDogKGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCAvIDEwMDAwMCkgKiBkYXRhLnVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgKiBkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKiAtMVxuXG5cdFx0XHRkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmNvc3RQZXJDV1QgKiAoZGF0YS51c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSAvIDEwMClcblxuXHRcdFx0ZGF0YS5jb3N0UGVyQWNyZURpZmZlcmVuY2UgPSBkYXRhLmNvc3RQZXJBY3JlIC0gZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlXG5cblx0XHRcdGRhdGEudG90YWxTZWVkQ29zdEZsYXRSYXRlID0gZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0ZGF0YS50b3RhbFNlZWRDb3N0RmxhdFJhdGVEaWZmZXJlbnRpYWwgPSBkYXRhLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmlzQ2VydGlmaWVkID8gKGRhdGEudXNlckRhdGEuc2Vhc29uLnRvTG93ZXJDYXNlKCkgPT09ICdzcHJpbmcnID8gNC41IDogNy41KSA6IDBcblxuXHRcdFx0ZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlID0gKChkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKyBkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlKSAqIGRhdGEudXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkKSAtIGRhdGEudG90YWxTZWVkQ29zdFxuXG5cdFx0XHRkYXRhLm5ldFJldmVudWVMYlBlckFjcmUgPSAoKGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSArIGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgKyBkYXRhLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCkgKiBkYXRhLnVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZCkgLSBkYXRhLnRvdGFsU2VlZENvc3RcblxuXHRcdFx0ZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlQmVuZWZpdCA9IGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSAtIGRhdGEubmV0UmV2ZW51ZUxiUGVyQWNyZVxuXHRcdH1cblxuXHRcdHZhciBnZXREYXRhU2VyaWVzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHR2YXIgc2VyaWVzID0gW11cblxuXHRcdFx0Zm9yICh2YXIgc2VlZHNQZXJMYiA9IFNFRURTX1BFUl9MQl9NSU47IHNlZWRzUGVyTGIgPD0gU0VFRFNfUEVSX0xCX01BWDsgc2VlZHNQZXJMYiArPSBTRUVEU19QRVJfTEJfU1RFUCkge1xuXHRcdFx0XHR2YXIgZGF0YUl0ZW0gPSBuZXcgT3B0aW1hbFNlZWRpbmdSYXRlSW1wYWN0RGF0YShzZWVkc1BlckxiKVxuXG5cdFx0XHRcdC8vIE1lcmdlIGluIHRoZSB1c2VyRGF0YSBwcm9wZXJ0aWVzXG5cdFx0XHRcdGRhdGFJdGVtLnVzZXJEYXRhID0ge31cblx0XHRcdFx0Zm9yICh2YXIgcHJvcCBpbiB1c2VyRGF0YSkge1xuXHRcdFx0XHRcdGlmICh1c2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB0eXBlb2YgdXNlckRhdGFbcHJvcF0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdGRhdGFJdGVtLnVzZXJEYXRhW3Byb3BdID0gdXNlckRhdGFbcHJvcF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxjdWxhdGUoZGF0YUl0ZW0pXG5cdFx0XHRcdHNlcmllcy5wdXNoKGRhdGFJdGVtKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2VyaWVzXG5cdFx0fVxuXG5cdFx0dmFyIGdldFNlcmllc0NvbHVtbkRhdGEgPSBmdW5jdGlvbiAoc2VyaWVzLCBjb2x1bW4pIHtcblx0XHRcdHZhciBkYXRhID0gW11cblx0XHRcdGZvciAodmFyIGkgPSAwOyBzZXJpZXNbaV07IGkrKykge1xuXHRcdFx0XHRkYXRhLnB1c2goc2VyaWVzW2ldW2NvbHVtbl0pXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFNlZWRDYWxjVXNlckRhdGE6IFNlZWRDYWxjVXNlckRhdGEsXG5cdFx0XHRnZXREYXRhU2VyaWVzOiBnZXREYXRhU2VyaWVzLFxuXHRcdFx0Z2V0U2VyaWVzQ29sdW1uRGF0YTogZ2V0U2VyaWVzQ29sdW1uRGF0YVxuXHRcdH1cblx0fSgpKVxuXG5cdHZhciBTZWVkQ2FsYyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gQ09OU1RBTlRTXG5cdFx0dmFyIENIQVJUX01PQklMRV9TTUFMTF9NQVhfV0lEVEggPSA0MDAgICAvLyBtYXggd2lkdGggZm9yIHNtYWxsIGRldmljZXNcblx0XHR2YXIgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9IRUlHSFQgPSAyNjcgIC8vIG1heCBoZWlnaHQgZm9yIHNtYWxsIGRldmljZXNcblx0XHR2YXIgQ0hBUlRfTU9CSUxFX01BWF9XSURUSCA9IDYwMCAgIC8vIG1heCB3aWR0aCBmb3IgbW9iaWxlIGRldmljZXNcblx0XHR2YXIgQ0hBUlRfTU9CSUxFX01BWF9IRUlHSFQgPSAzMDAgIC8vIG1heCBoZWlnaHQgZm9yIG1vYmlsZSBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01BWF9XSURUSCA9IDYwMFxuXHRcdHZhciBDSEFSVF9NQVhfSEVJR0hUID0gMzAwXG5cdFx0dmFyIENPTE9SX0RBUktfUkVEID0gJyM1MjkzQUInXG5cdFx0dmFyIENPTE9SX0xJR0hUX1JFRCA9ICcjNzJiMWM4J1xuXHRcdHZhciBDT0xPUl9EQVJLX0JMVUUgPSAnIzM3MzgzNidcblx0XHR2YXIgQ09MT1JfTElHSFRfQkxVRSA9ICcjNjQ2NTYwJ1xuXG5cdFx0Ly8gUFJPUEVSVElFU1xuXG5cdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhID0gbmV3IFNlZWRDYWxjRGF0YS5TZWVkQ2FsY1VzZXJEYXRhKHRydWUpXG5cdFx0dmFyIHNhdmVkU2VlZERhdGEgPSBuZXcgU2VlZENhbGNEYXRhLlNlZWRDYWxjVXNlckRhdGEoKVxuXG5cdFx0Ly8gTUVUSE9EU1xuXG5cdFx0dmFyIGlzTW9iaWxlU21hbGwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKCkgPCBDSEFSVF9NT0JJTEVfU01BTExfTUFYX1dJRFRIXG5cdFx0fVxuXG5cdFx0dmFyIGlzTW9iaWxlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpIDwgQ0hBUlRfTU9CSUxFX01BWF9XSURUSFxuXHRcdH1cblxuXHRcdHZhciBjYWxjdWxhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cdFx0XHRmb3JtLmNsYXNzTGlzdC5hZGQoJ2NhbGN1bGF0ZWQnKVxuXG5cdFx0XHQvLyBHZXQgZm9ybSBmaWVsZCBkYXRhXG5cdFx0XHR1cGRhdGVVc2VyRGF0YUZyb21Gb3JtKClcblxuXHRcdFx0Ly8gU2Nyb2xsIHRvIGZpcnN0IGdyYXBoIChzZXQgYSBkZWxheSB0byBhbGxvdyB0aGUgc2VjdGlvbnMgdG8gYmVjb21lIHZpc2libGUpXG5cdFx0XHQvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gXHR2YXIgaGVhZGVyQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtc2l0ZS1uYXYtd3JhcHBlci1oZWFkZXInKSxcblx0XHRcdC8vIFx0XHRoZWFkZXJCYXJGaXhlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhlYWRlckJhcikucG9zaXRpb24gPT09ICdmaXhlZCcsXG5cdFx0XHQvLyBcdFx0b2Zmc2V0ID0gaGVhZGVyQmFyRml4ZWQgPyAtaGVhZGVyQmFyLmNsaWVudEhlaWdodCA6IDAsXG5cdFx0XHQvLyBcdFx0dG9wID0gVXRpbGl0eS5nZXRUb3AoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGMtc2VjdGlvbicpKSArIG9mZnNldFxuXHRcdFx0Ly8gXHRzbW9vdGhTY3JvbGwodG9wKVxuXHRcdFx0Ly8gfSwgNTApXG5cblx0XHRcdC8vIFJlLXJlbmRlciB0aGUgZ3JhcGhzXG5cdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhjZXJ0aWZpZWRTZWVkRGF0YSlcblx0XHRcdHZhciBzYXZlZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoc2F2ZWRTZWVkRGF0YSlcblx0XHRcdHVwZGF0ZUdyYXBocyhjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblxuXHRcdFx0Ly8gU2V0IHRoZSBDYWxjdWxhdGUgYnV0dG9uIHRleHRcblx0XHRcdHZhciBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRlJylcblx0XHRcdGlmIChidG4udGV4dENvbnRlbnQgPT09ICdDYWxjdWxhdGUnKSB7XG5cdFx0XHRcdGJ0bi50ZXh0Q29udGVudCA9ICdSZS1DYWxjdWxhdGUnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciB1cGRhdGVVc2VyRGF0YUZyb21Gb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlKSAvIDEwMFxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfcHVyZV9zZWVkJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5jb3N0UGVyQ1dUID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlKVxuXG5cdFx0XHRzYXZlZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlKSAvIDEwMFxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfcHVyZV9zZWVkJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRzYXZlZFNlZWREYXRhLmNvc3RQZXJDV1QgPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlKVxuXG5cdFx0XHQvLyBUaGVzZSBmaWVsZHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZXMgaW4gYm90aCBkYXRhc2V0c1xuXHRcdFx0dmFyIHNlYXNvbnMgPSBmb3JtWydjcm9wX3NlYXNvbiddXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlYXNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHNlYXNvbnNbaV0uY2hlY2tlZCkgY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID0gc2F2ZWRTZWVkRGF0YS5zZWFzb24gPSBzZWFzb25zW2ldLnZhbHVlXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cblx0XHRcdC8vIGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9IHNhdmVkU2VlZERhdGEuc2Vhc29uID0gZm9ybVsnY3JvcF9zZWFzb24nXS52YWx1ZVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IHNhdmVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF90YXJnZXRfeWllbGQnXS52YWx1ZSlcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSBzYXZlZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3Bfd2hlYXRfcHJpY2UnXS52YWx1ZSlcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IHNhdmVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IHNhdmVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnXS52YWx1ZSlcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmFjcmVzUGxhbnRlZCA9IHNhdmVkU2VlZERhdGEuYWNyZXNQbGFudGVkID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX2FjcmVzX3BsYW50ZWQnXS52YWx1ZSlcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBzYXZlZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnXS52YWx1ZSkgLyAxMDBcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gc2F2ZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnXS52YWx1ZSkgLyAxMDBcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlRm9ybUZyb21Vc2VyRGF0YSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblxuXHRcdFx0Zm9ybVsnY2VydF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gKiAxMDBcblx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCAqIDEwMFxuXHRcdFx0Zm9ybVsnY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmNvc3RQZXJDV1RcblxuXHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gKiAxMDBcblx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfcHVyZV9zZWVkJ10udmFsdWUgPSBzYXZlZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCAqIDEwMFxuXHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUgPSBzYXZlZFNlZWREYXRhLmNvc3RQZXJDV1RcblxuXHRcdFx0Ly8gVGhlc2UgZmllbGRzIGhhdmUgdGhlIHNhbWUgdmFsdWVzIGluIGJvdGggZGF0YXNldHMsIHNvIGp1c3QgdXNlIHRoZSBmaXJzdCBvbmVcblx0XHRcdC8vIGZvcm1bJ2Nyb3Bfc2Vhc29uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gLy8gYnJva2VuIGluIFNhZmFyaVxuXHRcdFx0aWYgKGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9PT0gJ3dpbnRlcicpIHtcblx0XHRcdFx0Zm9ybVsnY3JvcF9zZWFzb24nXVswXS5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9ybVsnY3JvcF9zZWFzb24nXVsxXS5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0fVxuXHRcdFx0Zm9ybVsnY3JvcF90YXJnZXRfeWllbGQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmVcblx0XHRcdGZvcm1bJ2Nyb3Bfd2hlYXRfcHJpY2UnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWxcblx0XHRcdGZvcm1bJ2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvblxuXHRcdFx0Zm9ybVsnY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZSddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmVcblx0XHRcdGZvcm1bJ2Nyb3BfYWNyZXNfcGxhbnRlZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuYWNyZXNQbGFudGVkXG5cdFx0XHRmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0XG5cdFx0XHRmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZyddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3Rcblx0XHR9XG5cblx0XHR2YXIgc2hvd1Jlc2V0TGluayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmVzZXQgbGluayBpcyB2aXNpYmxlXG5cdFx0XHR2YXIgcmVzZXRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKTtcblx0XHRcdHJlc2V0TGluay5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcblx0XHR9XG5cblx0XHR2YXIgaGlkZVJlc2V0TGluayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmVzZXQgbGluayBpcyB2aXNpYmxlXG5cdFx0XHR2YXIgcmVzZXRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKTtcblx0XHRcdHJlc2V0TGluay5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblx0XHR9XG5cblx0XHR2YXIgcmVzZXRJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBSZXNldCB0aGUgZGF0YSB2YWx1ZXMgdG8gZGVmYXVsdHNcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnJlc2V0VG9EZWZhdWx0cygpXG5cdFx0XHRzYXZlZFNlZWREYXRhLnJlc2V0VG9EZWZhdWx0cygpXG5cblx0XHRcdC8vIFVwZGF0ZSBmb3JtIGZpZWxkIHZhbHVlc1xuXHRcdFx0dXBkYXRlRm9ybUZyb21Vc2VyRGF0YSgpXG5cblx0XHRcdC8vIEhpZGUgdGhlIHJlc2V0IGxpbmsgYWdhaW5cblx0XHRcdGhpZGVSZXNldExpbmsoKTtcblx0XHR9XG5cblx0XHR2YXIgZ2V0Q2hhcnRDYW52YXNIdG1sID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHR2YXIgdmlld3BvcnRXaWR0aCA9IFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpXG5cdFx0XHR2YXIgY2FudmFzU2l6ZSA9IHtcblx0XHRcdFx0d2lkdGg6IGlzTW9iaWxlKCkgPyB2aWV3cG9ydFdpZHRoIDogQ0hBUlRfTUFYX1dJRFRILFxuXHRcdFx0XHRoZWlnaHQ6IGlzTW9iaWxlU21hbGwoKSA/IENIQVJUX01PQklMRV9TTUFMTF9NQVhfSEVJR0hUIDogaXNNb2JpbGUoKSA/IENIQVJUX01PQklMRV9NQVhfSEVJR0hUIDogQ0hBUlRfTUFYX0hFSUdIVFxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaHRtbCA9ICc8Y2FudmFzIGlkPVwiJyArIGlkICsgJ1wiIGNsYXNzPVwiZ3JhcGggYmxvY2stY2VudGVyXCIgd2lkdGg9XCInICsgY2FudmFzU2l6ZS53aWR0aCArICdcIiBoZWlnaHQ9XCInICsgY2FudmFzU2l6ZS5oZWlnaHQgKyAnXCI+PC9jYW52YXM+J1xuXG5cdFx0XHRyZXR1cm4gaHRtbFxuXHRcdH1cblxuXHRcdHZhciBzZXRDaGFydERlZmF1bHRzID0gZnVuY3Rpb24gKGFuaW1hdGUpIHtcblx0XHRcdC8vIEdsb2JhbCBjaGFydCBjb25maWdcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udEZhbWlseSA9ICdcIkdvdGhhbSBTU20gQVwiLCBcIkdvdGhhbSBTU20gQlwiLCBMdWNpZGEgR3JhbmRlLCBcIkx1Y2lkYSBHcmFuZGVcIiwgTHVjaWRhIFNhbnMgVW5pY29kZSwgXCJMdWNpZGEgU2FucyBVbmljb2RlXCIsIEx1Y2lkYSBTYW5zLCBcIkx1Y2lkYSBTYW5zXCIsIEdlbmV2YSwgVmVyZGFuYSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZidcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxNlxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLmJvcmRlcldpZHRoID0gMlxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLmxpbmUuZmlsbCA9IGZhbHNlXG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSA1XG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuYm9yZGVyV2lkdGggPSAyXG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5hbmltYXRpb24uZHVyYXRpb24gPSBhbmltYXRlID09PSBmYWxzZSA/IDAgOiAxMDAwXG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5sZWdlbmQuZGlzcGxheSA9IGZhbHNlXG5cblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5ldmVudHMgPSB1bmRlZmluZWQgLy8gaWdub3JlIG1vdXNlL3RvdWNoIGV2ZW50c1xuXG5cdFx0XHQvLyBzcGVjaWFsIHNldHRpbmdzIGZvciBzbWFsbGVyIHNjcmVlbiBzaXplc1xuXHRcdFx0aWYgKGlzTW9iaWxlU21hbGwoKSkge1xuXHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTFcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDJcblx0XHRcdH0gZWxzZSBpZiAoaXNNb2JpbGUoKSkge1xuXHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTJcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDRcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlR3JhcGhDb21wYXJlSW1wYWN0ID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKSB7XG5cdFx0XHQvLyBTZXQgdXAgZ3JhcGggY2FudmFzXG5cdFx0XHR2YXIgY2hhcnRJZCA9ICdncmFwaF9jb21wYXJlX2ltcGFjdCdcblx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfc2VjdGlvbicpXG5cdFx0XHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3dyYXBwZXInKVxuXHRcdFx0dmFyIGxlZ2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX2xlZ2VuZCcpXG5cdFx0XHR2YXIgY2FudmFzID0gZ2V0Q2hhcnRDYW52YXNIdG1sKGNoYXJ0SWQpXG5cdFx0XHR2YXIgbW9iaWxlID0gaXNNb2JpbGUoKVxuXHRcdFx0dmFyIG1vYmlsZVNtYWxsID0gaXNNb2JpbGVTbWFsbCgpXG5cblx0XHRcdC8vIFJlbW92ZSB0aGUgJ2hpZGRlbicgQ1NTIGNsYXNzXG5cdFx0XHRzZWN0aW9uLmNsYXNzTmFtZSA9IHNlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoL1xccypcXGJoaWRkZW5cXGIvZywgJycpXG5cblx0XHRcdC8vIGRlc3Ryb3kgYW5kIHJlY3JlYXRlIHRoZSBjYW52YXNcblx0XHRcdGlmICh3cmFwcGVyLmhhc0NoaWxkTm9kZXMoKSkgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmNoaWxkTm9kZXNbMF0pXG5cdFx0XHR3cmFwcGVyLmlubmVySFRNTCA9IGNhbnZhc1xuXG5cdFx0XHQvLyBHZXQgdGhlIHgtYXhpcyBsYWJlbHNcblx0XHRcdHZhciB4TGFiZWxzID0gW11cblx0XHRcdGZvciAodmFyIGkgPSAwOyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1tpXTsgaSsrKSB7XG5cdFx0XHRcdHhMYWJlbHMucHVzaChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1tpXS5zZWVkc1BlckxiLnRvU3RyaW5nKCkpXG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbmZpZ3VyZSBhbmQgcmVuZGVyIHRoZSBjaGFydFxuXHRcdFx0dmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQpXG5cdFx0XHR2YXIgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG5cdFx0XHRcdHR5cGU6ICdsaW5lJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdGxhYmVsczogeExhYmVscyxcblx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCAnb3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZScpLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ2NpcmNsZScsXG5cdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fY2lyY2xlLWxpbmUtYmx1ZS1zb2xpZC5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgJ25ldFJldmVudWVMYlBlckFjcmUnKSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAnY2lyY2xlJyxcblx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19jaXJjbGUtbGluZS1ibHVlLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoc2F2ZWRTZWVkRGF0YVNlcmllcywgJ29wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUnKSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludFJhZGl1czogQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyArIDEsXG5cdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAncmVjdCcsXG5cdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fc3F1YXJlLWxpbmUtZGFyay1zb2xpZC5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKHNhdmVkU2VlZERhdGFTZXJpZXMsICduZXRSZXZlbnVlTGJQZXJBY3JlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRSYWRpdXM6IENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgKyAxLFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ3JlY3QnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX3NxdWFyZS1saW5lLWRhcmsucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHRcdFx0eEF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiAnYm90dG9tJyxcblx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdTZWVkcy9MYicsXG5cdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5kZXggJSAyID09PSAwID8gVXRpbGl0eS5hZGREaWdpdFNlcGFyYXRvcnModmFsdWUpIDogJydcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0eUF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnTmV0IFJldmVudWUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmZvcm1hdEN1cnJlbmN5KHZhbHVlLCBmYWxzZSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2NvbXBhcmVHcmFwaCcpLnZhbChjaGFydC50b0Jhc2U2NEltYWdlKCkpXG4gICAgICB9LCAxNTAwKVxuXG5cdFx0XHQvLyBVcGRhdGUgbGVnZW5kXG5cdFx0XHRsZWdlbmQuY2xhc3NMaXN0LmFkZCgnY2FsYy1jaGFydC10eXBlLScgKyBjaGFydC5jb25maWcudHlwZSk7XG5cblx0XHRcdHZhciBsZWdlbmRIdG1sID0gJzxkaXY+J1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGl0ZW07IHR5cGVvZiAoaXRlbSA9IGNoYXJ0LmNvbmZpZy5kYXRhLmRhdGFzZXRzW2ldKSAhPT0gJ3VuZGVmaW5lZCc7IGkrKykge1xuXHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8ZGl2PjxpbWcgY2xhc3M9XCJjYWxjLWxlZ2VuZC1pY29uXCIgc3JjPVwiJyArIGl0ZW0ubGVnZW5kSWNvbkltYWdlICsgJ1wiIGFsdD1cIlwiPiA8c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWxhYmVsXCI+JyArIGl0ZW0ubGFiZWwgKyAnPC9zcGFuPjwvZGl2Pidcblx0XHRcdH1cblx0XHRcdGxlZ2VuZEh0bWwgKz0gJzwvZGl2Pic7XG5cdFx0XHRsZWdlbmQuaW5uZXJIVE1MID0gbGVnZW5kSHRtbFxuXHRcdH1cblxuXHRcdHZhciB1cGRhdGVHcmFwaE1heGltaXplUmV2ZW51ZSA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcykge1xuXHRcdFx0Ly8gUmVzZXQgc29tZSBnbG9iYWwgY2hhcnQgZGVmYXVsdHNcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5tYWludGFpbkFzcGVjdFJhdGlvID0gdHJ1ZVxuXG5cdFx0XHQvLyBTZXQgdXAgZ3JhcGggY2FudmFzXG5cdFx0XHR2YXIgY2hhcnRJZCA9ICdncmFwaF9tYXhpbWl6ZV9yZXZlbnVlJ1xuXHRcdFx0dmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19zZWN0aW9uJylcblx0XHRcdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfd3JhcHBlcicpXG5cdFx0XHR2YXIgbGVnZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfbGVnZW5kJylcblx0XHRcdHZhciBjYW52YXMgPSBnZXRDaGFydENhbnZhc0h0bWwoY2hhcnRJZClcblxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSAnaGlkZGVuJyBDU1MgY2xhc3Ncblx0XHRcdHNlY3Rpb24uY2xhc3NOYW1lID0gc2VjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKlxcYmhpZGRlblxcYi9nLCAnJylcblxuXHRcdFx0Ly8gZGVzdHJveSBhbmQgcmVjcmVhdGUgdGhlIGNhbnZhc1xuXHRcdFx0aWYgKHdyYXBwZXIuaGFzQ2hpbGROb2RlcygpKSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuY2hpbGROb2Rlc1swXSlcblx0XHRcdHdyYXBwZXIuaW5uZXJIVE1MID0gY2FudmFzXG5cblx0XHRcdC8vIENvbmZpZ3VyZSBhbmQgcmVuZGVyIHRoZSBjaGFydFxuXHRcdFx0dmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQpXG5cdFx0XHR2YXIgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG5cdFx0XHRcdHR5cGU6ICdiYXInLFxuXHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0bGFiZWxzOiBbXSxcblx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFsgY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLmxlbmd0aCAtIDEgXS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlIF0sXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRURcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFsgc2F2ZWRTZWVkRGF0YVNlcmllc1sgc2F2ZWRTZWVkRGF0YVNlcmllcy5sZW5ndGggLSAxIF0ubmV0UmV2ZW51ZUxiUGVyQWNyZSBdLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUVcblx0XHRcdFx0XHR9XVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuXHRcdFx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHRcdFx0eUF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnTmV0IFJldmVudWUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmZvcm1hdEN1cnJlbmN5KHZhbHVlLCBmYWxzZSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI3JldmVudWVHcmFwaCcpLnZhbChjaGFydC50b0Jhc2U2NEltYWdlKCkpXG4gICAgICB9LCAxNTAwKVxuXG5cdFx0XHQvLyBVcGRhdGUgbGVnZW5kXG5cdFx0XHRsZWdlbmQuY2xhc3NMaXN0LmFkZCgnY2FsYy1jaGFydC10eXBlLScgKyBjaGFydC5jb25maWcudHlwZSk7XG5cblx0XHRcdHZhciBsZWdlbmRIdG1sID0gJzxkaXY+J1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGl0ZW07IHR5cGVvZiAoaXRlbSA9IGNoYXJ0LmNvbmZpZy5kYXRhLmRhdGFzZXRzW2ldKSAhPT0gJ3VuZGVmaW5lZCc7IGkrKykge1xuXHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8ZGl2PjxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtaWNvblwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonICsgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgKyAnXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWxhYmVsXCI+JyArIGl0ZW0ubGFiZWwgKyAnPC9zcGFuPjwvZGl2Pidcblx0XHRcdH1cblx0XHRcdGxlZ2VuZEh0bWwgKz0gJzwvZGl2Pic7XG5cdFx0XHRsZWdlbmQuaW5uZXJIVE1MID0gbGVnZW5kSHRtbFxuXHRcdH1cblxuXHRcdHZhciB1cGRhdGVHcmFwaHMgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMsIGFuaW1hdGUpIHtcblx0XHRcdHNldENoYXJ0RGVmYXVsdHMoYW5pbWF0ZSlcblx0XHRcdHVwZGF0ZUdyYXBoQ29tcGFyZUltcGFjdChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblx0XHRcdHVwZGF0ZUdyYXBoTWF4aW1pemVSZXZlbnVlKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXHRcdH1cblxuXHRcdC8vIEVWRU5UU1xuXG5cdFx0dmFyIG9uQ2FsY3VsYXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcblx0XHRcdFx0ICB2YXIgaXNWYWxpZCA9IHRydWU7XG5cdFx0XHRcdCAgJCgnLmNhbGMtZmllbGQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQgICAgaWYgKCAkKHRoaXMpLnZhbCgpID09PSAnJykge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJyZWRcIn0pXG5cdFx0XHRcdFx0XHRcdGlzVmFsaWQgPSBmYWxzZVxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpc1ZhbGlkKVxuXHRcdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCIjNjY2NjVjXCJ9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHQgIH0pO1xuXHRcdFx0XHQgIHJldHVybiBpc1ZhbGlkO1xuXHRcdFx0XHR9XG5cblx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBnbyA9IHZhbGlkYXRlRm9ybSgpXG5cdFx0XHRcdHZhciBlcnJvckZvcm1NZXNzYWdlID0gJzxzcGFuIGNsYXNzPVwiZXJyb3JGb3JtTWVzc2FnZVwiPllvdSBtdXN0IGNvbXBsZXRlIGFsbCBmaWVsZHMgYWJvdmUgdG8gY2FsY3VsYXRlLjwvc3Bhbj4nXG5cdFx0XHRcdGlmICggZ28gPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpdCBpcyB2YWxpZCcpXG5cdFx0XHRcdFx0JCgnLmVycm9yRm9ybU1lc3NhZ2UnKS5yZW1vdmUoKVxuXHRcdFx0XHRcdCQoJyNncmFwaF9jb21wYXJlX2ltcGFjdF9zZWN0aW9uICwgI2dyYXBoX21heGltaXplX3JldmVudWVfc2VjdGlvbicpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0JCgnLmFjdGlvbkRhdGEnKS5zaG93KCkuc2xpZGVEb3duKClcblx0XHRcdFx0XHRjYWxjdWxhdGUoKVxuXHRcdFx0XHR9ZWxzZSBpZiAoIGdvID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2l0IGlzIG5vdCB2YWxpZCcpXG5cdFx0XHRcdFx0aWYgKCQoJy5lcnJvckZvcm1NZXNzYWdlJylbMF0pIHtcblxuXHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdCQoJyN5aWVsZEltcGFjdEZvclVuZGVyc2VlZGluZycpLmFmdGVyKGVycm9yRm9ybU1lc3NhZ2UpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdHZhciBvbkZvcm1JbnB1dENoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHQvLyBTaG93IHRoZSAncmVzZXQgZm9ybScgbGluayB3aGVuIGRldmlhdGluZyBmcm9tIHRoZSBkZWZhdWx0c1xuXHRcdFx0c2hvd1Jlc2V0TGluaygpXG5cdFx0fVxuXG5cdFx0dmFyIG9uUmVzZXRGb3JtID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdC8vIFJlc2V0IHRoZSBkYXRhIGFuZCBmb3JtIHZhbHVlc1xuXHRcdFx0cmVzZXRJbnB1dHMoKVxuXHRcdH1cblxuXHRcdHZhciBvbkVtYWlsRGF0YSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHQvLyBOT1RFOiBUaGUgZ2VuZXJhdGVkIFBERiB3aWxsIGhhdmUgdGhlIGRhdGEgdGhhdCBpcyBjdXJyZW50bHkgcmVwcmVzZW50ZWQgaW4gdGhlIGNoYXJ0cy4gSWYgdGhlIHVzZXIgaGFzIGNoYW5nZWQgZm9ybSBmaWVsZCB2YWx1ZXMsIGJ1dCBub3QgY2xpY2tlZCBcIkNhbGN1bGF0ZVwiLCB0aGVuIHRoZXNlIGFyZSBub3QgcmVmbGVjdGVkIGluIHRoZSBvdXRwdXQuXG5cblx0XHRcdC8vIFRPRE86IFNob3cgZW1haWwgZmllbGRzIGZvciB1c2VyIGlucHV0LiBTdWJtaXR0aW5nIHRoaXMgZm9ybSB3aWxsIGV4ZWN1dGUgdGhlIGVtYWlsRGF0YSgpIG1ldGhvZC5cblx0XHRcdGNvbnNvbGUuaW5mbygnRW1haWwgUERGJylcblx0XHR9XG5cblx0XHR2YXIgb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdC8vIE9ubHkgcmVkcmF3IHRoZSBncmFwaHMgaWYgdGhleSBoYXZlIGJlZW4gY2FsY3VsYXRlZCBhdCBsZWFzdCBvbmNlIGFscmVhZHlcblx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblx0XHRcdGlmIChmb3JtLmNsYXNzTGlzdC5jb250YWlucygnY2FsY3VsYXRlZCcpKSB7XG5cdFx0XHRcdC8vIFJlLXJlbmRlciB0aGUgZ3JhcGhzXG5cdFx0XHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKGNlcnRpZmllZFNlZWREYXRhKVxuXHRcdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKHNhdmVkU2VlZERhdGEpXG5cdFx0XHRcdHVwZGF0ZUdyYXBocyhjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcywgZmFsc2UpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIG9uRG93bmxvYWRQZGYgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gTk9URTogVGhlIGdlbmVyYXRlZCBQREYgd2lsbCBoYXZlIHRoZSBkYXRhIHRoYXQgaXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBjaGFydHMuIElmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGZvcm0gZmllbGQgdmFsdWVzLCBidXQgbm90IGNsaWNrZWQgXCJDYWxjdWxhdGVcIiwgdGhlbiB0aGVzZSBhcmUgbm90IHJlZmxlY3RlZCBpbiB0aGUgb3V0cHV0LlxuXG5cdFx0XHQvLyBUT0RPOiBUcmlnZ2VyaW5nIHRoaXMgaGFuZGxlciB3aWxsIGV4ZWN1dGUgdGhlIGRvd25sb2FkUGRmKCkgbWV0aG9kXG5cdFx0XHRjb25zb2xlLmluZm8oJ0Rvd25sb2FkIFBERicpXG5cdFx0fVxuXG5cdFx0dmFyIHdpcmVFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZm9ybUVsZW1lbnRzID0gJCgnI3NlZWRfY2FsY19mb3JtIGlucHV0LCAjc2VlZF9jYWxjX2Zvcm0gdGV4dGFyZWEsICNzZWVkX2NhbGNfZm9ybSBzZWxlY3QnKVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmb3JtRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGVsID0gZm9ybUVsZW1lbnRzW2ldXG5cdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uRm9ybUlucHV0Q2hhbmdlKVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY2FsY3VsYXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZScpXG5cdFx0XHRjYWxjdWxhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbGN1bGF0ZSlcblxuXHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gcmVzZXQgdG8gdGhlIGRlZmF1bHQgdmFsdWVzXG5cdFx0XHR2YXIgcmVzZXRGb3JtTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJylcblx0XHRcdHJlc2V0Rm9ybUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblJlc2V0Rm9ybSlcblxuXHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gZW1haWwgdGhlIHJlc3VsdHMgYXMgYSBQREZcblx0XHRcdC8vdmFyIGVtYWlsRGF0YUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbF9kYXRhJylcblx0XHRcdC8vZW1haWxEYXRhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25FbWFpbERhdGEpXG5cblx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIGRvd25sb2FkIHRoZSByZXN1bHRzIGFzIGEgUERGXG5cdFx0XHQvL3ZhciBkb3dubG9hZFBkZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3dubG9hZF9wZGYnKVxuXHRcdFx0Ly9kb3dubG9hZFBkZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRG93bmxvYWRQZGYpXG5cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSk7XG5cdFx0fVxuXG5cdFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBJbml0aWFsaXplIHVzZXIgZm9ybSBpbnB1dHMgd2l0aCBkZWZhdWx0IGRhdGFcblx0XHRcdHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEoKVxuXG5cdFx0XHQvLyBXaXJlIHVwIGludGVyYWN0aXZlIGV2ZW50c1xuXHRcdFx0d2lyZUV2ZW50cygpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHsgaW5pdDogaW5pdCB9XG5cdH0oKSlcblxuXHRTZWVkQ2FsYy5pbml0KClcbn0pXG4gIGlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpbmQtc2VlZC1zdXBwbGllcicpICkge1xuICAgICQoJyNzdGF0ZXNlbGVjdCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICBjaGFuZ2VTdGF0ZSgpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVN0YXRlICgpIHtcbiAgICAgIGlmICgkKCcjcmVzdWx0cycpLmhhc0NsYXNzKCdoaWRkZW4nKSkge1xuICAgICAgICAkKCcjcmVzdWx0cycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgfVxuICAgICAgdmFyIHNlbGVjdGVkc3RhdGUgPSAkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudmFsKClcbiAgICAgICQoJy5zdXBwbGllciwgLnJlcCcpLmhpZGUoKVxuICAgICAgJCgnLicgKyBzZWxlY3RlZHN0YXRlKS5zaG93KClcblxuICAgICAgaWYgKCEkKCcuJyArIHNlbGVjdGVkc3RhdGUpWzBdKSB7XG4gICAgICAgIGlmICgkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpID09PSAnU2VsZWN0IGEgc3RhdGUnKSB7XG4gICAgICAgICAgJCgnI3Jlc3VsdHMnKS5oaWRlKClcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICQoJyNyZXN1bHRzJykuc2hvdygpXG4gICAgICAgICAgJCgnLmZhaWx1cmVfX25vc3VwcGxpZXJzJykuc2hvdygpXG4gICAgICAgICAgdmFyIHN0YXRlQ2hvc2VuID0gJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKVxuICAgICAgICAgICQoJy5mYWlsdXJlU3BhbicpLnRleHQoc3RhdGVDaG9zZW4pXG4gICAgICAgICAgJCgnLnJlcF9fY3RuJykuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmZhaWx1cmVfX25vc3VwcGxpZXJzJykuaGlkZSgpXG4gICAgICAgICAgJCgnLnJlcF9fY3RuJykuc2hvdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzdWNjZXNzLCBlcnJvcilcblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MgKHBvc2l0aW9uKSB7XG4gICAgICB2YXIgR0VPQ09ESU5HID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPScgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlICsgJyZrZXk9QUl6YVN5QUlhcFFiQnJCY0lGVHVJbE14YlhiTXR5M2RUN1IxYjJrJ1xuXG4gICAgICAkLmdldEpTT04oR0VPQ09ESU5HKS5kb25lKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICB2YXIgdGhlc3RhdGUgPSBsb2NhdGlvbi5yZXN1bHRzWzBdLmFkZHJlc3NfY29tcG9uZW50c1s0XS5zaG9ydF9uYW1lXG4gICAgICAgICQoJyNzdGF0ZXNlbGVjdCcpLnZhbCh0aGVzdGF0ZSlcbiAgICAgICAgY2hhbmdlU3RhdGUoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvciAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxuICB9XG4iXX0=