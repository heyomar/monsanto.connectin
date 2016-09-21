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
var mailbar = "\n<div class=\"mailbar-header\">\n  <span id=\"mailbar-activate\">\n    <span class=\"show__768up\">Sign up for email updates about the ConnectIN™ Wheat Insight System.</span>\n    <span class=\"hide__768down\">Sign up for email updates</span>\n    <svg class=\"icon down\"><use xlink:href=\"#icon-down\"></use></svg>\n  </span>\n\n  </span>\n\n  <span id=\"mailbar-dismiss\" class=\"dismiss\">\n    <svg class=\"icon\">\n      <use xlink:href=\"#icon-circle-cross\"></use>\n    </svg>\n  </span>\n</div>\n<div id=\"mailbar-body\" class=\"mailbar-body\">\n    <!-- form  -->\n    <div id=\"signupform__ctn\" class=\"wFormContainer\">\n        <style type=\"text/css\"></style>\n        <div class=\"wForm\" id=\"tfa_0-WRPR\" dir=\"ltr\">\n            <div class=\"codesection\" id=\"code-tfa_0\"></div>\n            <h3 class=\"wFormTitle\" id=\"tfa_0-T\">ConnectIN Email Signup</h3>\n            <form method=\"post\" action=\"https://www.tfaforms.com/responses/processor\" class=\"hintsBelow labelsAbove ConnectIN-Email-Signup\" id=\"tfa_0\">\n                <div id=\"tfa_1-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_1-L\" for=\"tfa_1\" class=\"label preField reqMark\">First Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input required type=\"text\" id=\"tfa_1\" name=\"tfa_1\" value=\"\" placeholder=\"\" title=\"First Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_2-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_2-L\" for=\"tfa_2\" class=\"label preField reqMark\">Last Name</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input required type=\"text\" id=\"tfa_2\" name=\"tfa_2\" value=\"\" placeholder=\"\" title=\"Last Name\" class=\"required\">\n                    </div>\n                </div>\n                <div id=\"tfa_3-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_3-L\" for=\"tfa_3\" class=\"label preField reqMark\">Email</label>\n                    <br>\n                    <div class=\"inputWrapper\">\n                        <input required type=\"text\" id=\"tfa_3\" name=\"tfa_3\" value=\"\" placeholder=\"\" title=\"Email\" class=\"validate-email required\">\n                    </div>\n                </div>\n                <div id=\"tfa_4-D\" class=\"oneField field-container-D     \">\n                    <label id=\"tfa_4-L\" for=\"tfa_4\" class=\"label preField reqMark\">I am a:</label>\n                    <br>\n                    <div class=\"inputWrapper\"><span id=\"tfa_4\" class=\"choices vertical required\"><span class=\"oneChoice\"><input type=\"checkbox\" value=\"tfa_6\" class=\"\" checked id=\"tfa_6\" name=\"tfa_6\"><label class=\"label postField\" id=\"tfa_6-L\" for=\"tfa_6\">Grower</label></span>\n                        <span\n                            class=\"oneChoice\">\n                            <input type=\"checkbox\" value=\"tfa_5\" class=\"\" id=\"tfa_5\" name=\"tfa_5\">\n                            <label class=\"label postField\" id=\"tfa_5-L\" for=\"tfa_5\">Seed Supplier</label>\n                            </span>\n                            </span>\n                    </div>\n                </div>\n                <div class=\"actions\" id=\"tfa_0-A\">\n                    <input type=\"submit\" class=\"primaryAction\" value=\"Submit\">\n                </div>\n                <div style=\"clear:both\"></div>\n                <input type=\"hidden\" value=\"433713\" name=\"tfa_dbFormId\" id=\"tfa_dbFormId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_dbResponseId\" id=\"tfa_dbResponseId\">\n                <input type=\"hidden\" value=\"a8623a69d1e6264f46562887e0ccd599\" name=\"tfa_dbControl\" id=\"tfa_dbControl\">\n                <input type=\"hidden\" value=\"7\" name=\"tfa_dbVersionId\" id=\"tfa_dbVersionId\">\n                <input type=\"hidden\" value=\"\" name=\"tfa_switchedoff\" id=\"tfa_switchedoff\">\n            </form>\n        </div>\n        </div>\n    </div>\n\n</div>\n";

if ($('body').hasClass('sign-up') === true || document.cookie.replace(/(?:(?:^|.*;\s*)subscribed\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {
	$('#mailbar').html(mailbar);
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
'use strict';

$('.toggleModal').on('click', function (e) {
	$('.modal').toggleClass('active');
});

$('.close').on('click', function (e) {
	$('.thankyoumodal').removeClass('active');
});

$('#reset_form,#thankyou__startover').on('click', function () {
	window.location.reload();
});

$('#downloadPDF').click(function (e) {
	e.preventDefault();

	$('#pdfData').val(JSON.stringify(dataExtract()));
	$('#pdfForm').submit();
});

$('#mailPDF').click(function (e) {
	var queryStringAdd = '&recipients=' + encodeURIComponent($('#recipientEmail').val()) + '&sender=' + encodeURIComponent('no-reply@hlkagency.com') + '&subject=' + encodeURIComponent('Wheat Profitability Results') + '&firstName=' + '&memberBusname=';

	$.ajax({
		url: 'http://hlk-pdf-server.centralus.cloudapp.azure.com/api/v1/Email?templateName=WestBred_ProfitCalc' + queryStringAdd,
		type: 'POST',
		data: '{ "json" : ' + JSON.stringify(dataExtract()) + '}'
	}).done(function () {
		console.log("success");
	}).fail(function () {
		console.log("error");
	}).always(function () {
		console.log("complete");
	});
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

// if( $('body').hasClass('wheat-profitability-calculator') ) {

// function ajaxPost(url, onComplete, dataType) {

// 	if (window.XDomainRequest) {

// 		var xdr = new XDomainRequest();
// 		xdr.timeout = 3000;

// 		xdr.onload = function () {
// 			var result = JSON.parse(xdr.responseText);
// 			onComplete(result);
// 		};

// 		xdr.open("get", url);
// 		xdr.send();

// 	} else {
// 		var ajaxConfig = { url: url, success: onComplete };
// 		if (dataType != null) ajaxConfig.dataType = dataType;
// 		$.ajax(ajaxConfig);
// 	}
// };

// function generate(type) {
// 		var certSeed = '?certGermination=' + $('#cert_seed_germination').val() +
// 										'&certPureSeed=' + $('#cert_seed_pure_seed').val() +
// 										'&certSeedCost=' + $('#cert_seed_cost_per_unit').val()

// 		var savedSeed = '&savedGermination=' + $('#saved_seed_germination').val() +
// 										'&savedPureSeed=' + $('#saved_seed_pure_seed').val() +
// 								 		'&savedSeedCost=' + $('#saved_seed_cost_per_unit').val()

// 		var season = '&season=spring'
// 		if ($("input[name='crop_season'][value='winter']").prop('checked') === true) {
// 				season = '&season=winter'
// 		}

// 		var yieldForm = '&targetYield=' + $('#crop_target_yield').val() +
// 										'&wheatPrice=' + $('#crop_wheat_price').val() +
// 										'&targetPlantPopulation=' + $('#crop_target_planting_population').val() +
// 										'&flatSeedingRate=' + $('#crop_flat_seeding_rate').val() +
// 										'&acresPlanted=' + $('#crop_acres_planted').val() +
// 										'&yieldImpactOverseeding=' + $('#crop_percent_yield_impact_overseeding').val() +
// 										'&yieldImpactUnderseeding=' + $('#crop_percent_yield_impact_underseeding').val()

// 		var emailData = '&recipientEmail=' + $('#recipientEmail').val()

// 		if (type === 'download') {
// 			var downloadString = 'http://test.monpdfservice.hlktesting.com/WBProfitCalc/WheatProfitability/WheatProfitabilityToPdf' + certSeed + savedSeed + season + yieldForm
// 			window.location.href = downloadString
// 		}

// 		if (type === 'email') {
// 			var emailString = 'http://test.monpdfservice.hlktesting.com/WBProfitCalc/WheatProfitability/WheatProfitabilityToEmail' + certSeed + savedSeed + season + yieldForm + emailData

// 		ajaxPost(emailString, function(data){
// 			if (data.success) {
// 				$('.modal').hide()
// 				$('.thankyoumodal').toggleClass('active')
// 			} else {
// 				alert(data.error)
// 			}
// 		}, 'jsonp')

// 		}
// }

// }

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

//# sourceMappingURL=data:application/json;base64,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QWxCLENBQXVCLFdBQXZCO0FBQ0EsTUFBRSxXQUFGLEVBQWUsSUFBZjtBQUNILElBTEQsTUFLTztBQUNILE1BQUUsdUJBQUYsRUFBMkIsSUFBM0I7QUFDQSxNQUFFLFdBQUYsRUFBZSxJQUFmO0FBQ0g7QUFDRixHQXRCNEM7O0FBQUEsTUEwQnBDLE9BMUJvQyxHQTBCN0MsU0FBUyxPQUFULENBQWtCLFFBQWxCLEVBQTRCO0FBQzFCLE9BQUksWUFBWSw4REFBOEQsU0FBUyxNQUFULENBQWdCLFFBQTlFLEdBQXlGLEdBQXpGLEdBQStGLFNBQVMsTUFBVCxDQUFnQixTQUEvRyxHQUEySCw4Q0FBM0k7O0FBRUEsS0FBRSxPQUFGLENBQVUsU0FBVixFQUFxQixJQUFyQixDQUEwQixVQUFVLFFBQVYsRUFBb0I7QUFDNUMsUUFBSSxXQUFXLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFvQixrQkFBcEIsQ0FBdUMsQ0FBdkMsRUFBMEMsVUFBekQ7QUFDQSxNQUFFLGNBQUYsRUFBa0IsR0FBbEIsQ0FBc0IsUUFBdEI7QUFDQTtBQUNELElBSkQ7QUFLRCxHQWxDNEM7O0FBQUEsTUFvQ3BDLEtBcENvQyxHQW9DN0MsU0FBUyxLQUFULENBQWdCLEdBQWhCLEVBQXFCO0FBQ25CLFdBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxHQXRDNEM7O0FBQzdDLElBQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixZQUFZO0FBQ25DO0FBQ0QsR0FGRDs7QUF1QkEsWUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxPQUF6QyxFQUFrRCxLQUFsRDtBQXhCNkM7QUF1QzlDIiwiZmlsZSI6ImJ1bmRsZS5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG5jb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcbiAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG59XG5cbi8vIGNsaWNrIHRpdGxlIG9yIGRvd24gYXJyb3dcbiQoJyNtYWlsYmFyLWFjdGl2YXRlJykub24oJ2NsaWNrIHRvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuICBsZXQgdmhcbiAgY29uc3QgJGJvZHkgPSAkKCcjbWFpbGJhci1ib2R5JylcbiAgY29uc3QgYXJyb3dEb3duID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT4nXG4gIGNvbnN0IGFycm93VXAgPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tdXBcIj48L3VzZT4nXG5cbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgdmggPSAkKHdpbmRvdykuaGVpZ2h0KCkgLSAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gIH0gZWxzZSB7XG4gICAgdmggPSA0MDBcbiAgfVxuXG4gIGlmICgkYm9keS5oZWlnaHQoKSA9PT0gMCkge1xuICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAkYm9keS5hbmltYXRlKHsgaGVpZ2h0OiB2aCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dVcClcbiAgfSBlbHNlIHtcbiAgICAkYm9keS5hbmltYXRlKHsgaGVpZ2h0OiAwIH0pXG4gICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd0Rvd24pXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21haWxiYXItYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG59KVxuXG4vLyBjbGljayBkaXNtaXNzXG4kKCcjbWFpbGJhci1kaXNtaXNzJykub24oJ2NsaWNrJywgZGlzbWlzc01haWxiYXIpXG5cbmZ1bmN0aW9uIGRpc21pc3NNYWlsYmFyICgpIHtcbiAgLy8gaWYgdGhlIG1lbnUgaXMgYWN0aXZlIGFuZCB5b3UgZGlzbWlzcywgcmVjYWxjdWxhdGUgbWVudSBoZWlnaHRcbiAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnbWVudS1hY3RpdmUnKSkge1xuICAgIGNvbnN0IG1lbnUgPSAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKVxuICAgIGNvbnN0IGFkZGVkSGVpZ2h0ID0gbWVudS5oZWlnaHQoKSArICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgICAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5jc3MoJ2hlaWdodCcsIGFkZGVkSGVpZ2h0ICsgJ3B4JylcbiAgfVxuXG4gICQoJyNtYWlsYmFyJykuYW5pbWF0ZSh7IGhlaWdodDogJzAnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZSgpXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gIH0pXG5cbiAgZG9jdW1lbnQuY29va2llID0gJ3N1YnNjcmliZWQ9dHJ1ZSdcbn1cbiQoJyNtZW51LWFjdGl2YXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBsZXQgbWFpbGJhciA9IDBcbiAgaWYgKCQoJyNtYWlsYmFyLWJvZHknKS5sZW5ndGgpIHtcbiAgICBtYWlsYmFyID0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9XG5cbiAgY29uc3QgdmggPSAkKHdpbmRvdykuaGVpZ2h0KCkgLSAkKCcjbWVudScpLmhlaWdodCgpIC0gbWFpbGJhclxuICBjb25zdCBtZW51ID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1lbnVcIj48L3VzZT4nXG4gIGNvbnN0IGNyb3NzID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWNyb3NzXCI+PC91c2U+J1xuXG4gIGlmICgkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5oZWlnaHQoKSA9PT0gMCkge1xuICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAkKCcjbWVudS1oZWFkZXItbWVudS1jb250YWluZXInKS5hbmltYXRlKHsgaGVpZ2h0OiB2aCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoY3Jvc3MpXG4gIH0gZWxzZSB7XG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwobWVudSlcbiAgfVxuXG4gICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWVudS1hY3RpdmUnKVxuICAkKCdodG1sJykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbn0pXG5cbi8vIFRPRE86IHJlY2FsYyBtZW51IGhlaWdodCBvbiByZXNpemUgaWYgaW4gbW9iaWxlIHdpZHRoc1xuJCh3aW5kb3cpLnJlc2l6ZSgpXG4kKCcuYmVuZWZpdHNfX2hlYWRsaW5lJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKHRoaXMpLm5leHQoKVxuICAgIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICAgIGNvbnN0IGFycm93VXAgPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tdXBcIj48L3VzZT4nXG5cbiAgICAkYm9keS5zbGlkZVRvZ2dsZSgpXG5cbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gICAgfVxuXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgfVxufSlcbid1c2Ugc3RyaWN0J1xuXG4kKCcudG9nZ2xlTW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAkKCcubW9kYWwnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG59KTtcblxuJCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgJCgnLnRoYW5reW91bW9kYWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59KTtcblxuJCgnI3Jlc2V0X2Zvcm0sI3RoYW5reW91X19zdGFydG92ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuJCgnI2Rvd25sb2FkUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0JCgnI3BkZkRhdGEnKS52YWwoSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkpXG5cdCQoJyNwZGZGb3JtJykuc3VibWl0KClcbn0pXG5cbiQoJyNtYWlsUERGJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0dmFyIHF1ZXJ5U3RyaW5nQWRkID0gJyZyZWNpcGllbnRzPScgKyBlbmNvZGVVUklDb21wb25lbnQoJCgnI3JlY2lwaWVudEVtYWlsJykudmFsKCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KyAnJnNlbmRlcj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCduby1yZXBseUBobGthZ2VuY3kuY29tJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc3ViamVjdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCdXaGVhdCBQcm9maXRhYmlsaXR5IFJlc3VsdHMnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZmaXJzdE5hbWU9J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHQkLmFqYXgoe1xuXHRcdHVybDogJ2h0dHA6Ly9obGstcGRmLXNlcnZlci5jZW50cmFsdXMuY2xvdWRhcHAuYXp1cmUuY29tL2FwaS92MS9FbWFpbD90ZW1wbGF0ZU5hbWU9V2VzdEJyZWRfUHJvZml0Q2FsYycgKyBxdWVyeVN0cmluZ0FkZCxcblx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0ZGF0YTogJ3sgXCJqc29uXCIgOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YUV4dHJhY3QoKSkgKyAnfSdcblx0fSlcblx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHR9KVxuXHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuXHR9KVxuXHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG5cdH0pXG5cbn0pXG5cbmZ1bmN0aW9uIGRhdGFFeHRyYWN0ICgpIHtcblx0cmV0dXJuIHtcblx0XHRjZXJ0R2VybWluYXRpb246ICQoJyNjZXJ0X3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSxcblx0XHRjZXJ0UHVyZVNlZWQ6ICQoJyNjZXJ0X3NlZWRfcHVyZV9zZWVkJykudmFsKCksXG5cdFx0Y2VydFNlZWRDb3N0OiAkKCcjY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRzYXZlZEdlcm1pbmF0aW9uOiAkKCcjc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbicpLnZhbCgpLFxuXHRcdHNhdmVkUHVyZVNlZWQ6ICQoJyNzYXZlZF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpLFxuXHRcdHNhdmVkU2VlZENvc3Q6ICQoJyNzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRzZWFzb246ICQoJ2lucHV0W25hbWU9XCJjcm9wX3NlYXNvblwiXTpjaGVja2VkJykudmFsKCksXG5cdFx0dGFyZ2V0WWllbGQ6ICQoJyNjcm9wX3RhcmdldF95aWVsZCcpLnZhbCgpLFxuXHRcdHdoZWF0UHJpY2U6ICQoJyNjcm9wX3doZWF0X3ByaWNlJykudmFsKCksXG5cdFx0dGFyZ2V0UGxhbnRQb3B1bGF0aW9uOiAkKCcjY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbicpLnZhbCgpLFxuXHRcdGZsYXRTZWVkaW5nUmF0ZTogJCgnI2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnKS52YWwoKSxcblx0XHRhY3Jlc1BsYW50ZWQ6ICQoJyNjcm9wX2FjcmVzX3BsYW50ZWQnKS52YWwoKSxcblx0XHR5aWVsZEltcGFjdE92ZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZycpLnZhbCgpLFxuXHRcdHlpZWxkSW1wYWN0VW5kZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnKS52YWwoKSxcblx0XHRpbXBhY3RDb21wYXJlR3JhcGg6ICQoJyNjb21wYXJlR3JhcGgnKS52YWwoKSxcblx0XHRtYXhpbWl6ZVJldmVudWVHcmFwaDogJCgnI3JldmVudWVHcmFwaCcpLnZhbCgpXG5cdH1cbn1cblxuLy8gaWYoICQoJ2JvZHknKS5oYXNDbGFzcygnd2hlYXQtcHJvZml0YWJpbGl0eS1jYWxjdWxhdG9yJykgKSB7XG5cblx0Ly8gZnVuY3Rpb24gYWpheFBvc3QodXJsLCBvbkNvbXBsZXRlLCBkYXRhVHlwZSkge1xuXG5cdC8vIFx0aWYgKHdpbmRvdy5YRG9tYWluUmVxdWVzdCkge1xuXG5cdC8vIFx0XHR2YXIgeGRyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG5cdC8vIFx0XHR4ZHIudGltZW91dCA9IDMwMDA7XG5cblx0Ly8gXHRcdHhkci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0XHRcdHZhciByZXN1bHQgPSBKU09OLnBhcnNlKHhkci5yZXNwb25zZVRleHQpO1xuXHQvLyBcdFx0XHRvbkNvbXBsZXRlKHJlc3VsdCk7XG5cdC8vIFx0XHR9O1xuXG5cdC8vIFx0XHR4ZHIub3BlbihcImdldFwiLCB1cmwpO1xuXHQvLyBcdFx0eGRyLnNlbmQoKTtcblxuXHQvLyBcdH0gZWxzZSB7XG5cdC8vIFx0XHR2YXIgYWpheENvbmZpZyA9IHsgdXJsOiB1cmwsIHN1Y2Nlc3M6IG9uQ29tcGxldGUgfTtcblx0Ly8gXHRcdGlmIChkYXRhVHlwZSAhPSBudWxsKSBhamF4Q29uZmlnLmRhdGFUeXBlID0gZGF0YVR5cGU7XG5cdC8vIFx0XHQkLmFqYXgoYWpheENvbmZpZyk7XG5cdC8vIFx0fVxuXHQvLyB9O1xuXG5cdC8vIGZ1bmN0aW9uIGdlbmVyYXRlKHR5cGUpIHtcblx0Ly8gXHRcdHZhciBjZXJ0U2VlZCA9ICc/Y2VydEdlcm1pbmF0aW9uPScgKyAkKCcjY2VydF9zZWVkX2dlcm1pbmF0aW9uJykudmFsKCkgK1xuXHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdCcmY2VydFB1cmVTZWVkPScgKyAkKCcjY2VydF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpICtcblx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHQnJmNlcnRTZWVkQ29zdD0nICsgJCgnI2NlcnRfc2VlZF9jb3N0X3Blcl91bml0JykudmFsKClcblxuXHQvLyBcdFx0dmFyIHNhdmVkU2VlZCA9ICcmc2F2ZWRHZXJtaW5hdGlvbj0nICsgJCgnI3NhdmVkX3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSArXG5cdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0JyZzYXZlZFB1cmVTZWVkPScgKyAkKCcjc2F2ZWRfc2VlZF9wdXJlX3NlZWQnKS52YWwoKSArXG5cdC8vIFx0XHRcdFx0XHRcdFx0XHQgXHRcdCcmc2F2ZWRTZWVkQ29zdD0nICsgJCgnI3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCcpLnZhbCgpXG5cblx0Ly8gXHRcdHZhciBzZWFzb24gPSAnJnNlYXNvbj1zcHJpbmcnXG5cdC8vIFx0XHRpZiAoJChcImlucHV0W25hbWU9J2Nyb3Bfc2Vhc29uJ11bdmFsdWU9J3dpbnRlciddXCIpLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSkge1xuXHQvLyBcdFx0XHRcdHNlYXNvbiA9ICcmc2Vhc29uPXdpbnRlcidcblx0Ly8gXHRcdH1cblxuXHQvLyBcdFx0dmFyIHlpZWxkRm9ybSA9ICcmdGFyZ2V0WWllbGQ9JyArICQoJyNjcm9wX3RhcmdldF95aWVsZCcpLnZhbCgpICtcblx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHQnJndoZWF0UHJpY2U9JyArICQoJyNjcm9wX3doZWF0X3ByaWNlJykudmFsKCkgK1xuXHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdCcmdGFyZ2V0UGxhbnRQb3B1bGF0aW9uPScgKyAkKCcjY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbicpLnZhbCgpICtcblx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHQnJmZsYXRTZWVkaW5nUmF0ZT0nICsgJCgnI2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnKS52YWwoKSArXG5cdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0JyZhY3Jlc1BsYW50ZWQ9JyArICQoJyNjcm9wX2FjcmVzX3BsYW50ZWQnKS52YWwoKSArXG5cdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0JyZ5aWVsZEltcGFjdE92ZXJzZWVkaW5nPScgKyAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZycpLnZhbCgpICtcblx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHQnJnlpZWxkSW1wYWN0VW5kZXJzZWVkaW5nPScgKyAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnKS52YWwoKVxuXG5cdC8vIFx0XHR2YXIgZW1haWxEYXRhID0gJyZyZWNpcGllbnRFbWFpbD0nICsgJCgnI3JlY2lwaWVudEVtYWlsJykudmFsKClcblxuXHQvLyBcdFx0aWYgKHR5cGUgPT09ICdkb3dubG9hZCcpIHtcblx0Ly8gXHRcdFx0dmFyIGRvd25sb2FkU3RyaW5nID0gJ2h0dHA6Ly90ZXN0Lm1vbnBkZnNlcnZpY2UuaGxrdGVzdGluZy5jb20vV0JQcm9maXRDYWxjL1doZWF0UHJvZml0YWJpbGl0eS9XaGVhdFByb2ZpdGFiaWxpdHlUb1BkZicgKyBjZXJ0U2VlZCArIHNhdmVkU2VlZCArIHNlYXNvbiArIHlpZWxkRm9ybVxuXHQvLyBcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRvd25sb2FkU3RyaW5nXG5cdC8vIFx0XHR9XG5cblx0Ly8gXHRcdGlmICh0eXBlID09PSAnZW1haWwnKSB7XG5cdC8vIFx0XHRcdHZhciBlbWFpbFN0cmluZyA9ICdodHRwOi8vdGVzdC5tb25wZGZzZXJ2aWNlLmhsa3Rlc3RpbmcuY29tL1dCUHJvZml0Q2FsYy9XaGVhdFByb2ZpdGFiaWxpdHkvV2hlYXRQcm9maXRhYmlsaXR5VG9FbWFpbCcgKyBjZXJ0U2VlZCArIHNhdmVkU2VlZCArIHNlYXNvbiArIHlpZWxkRm9ybSArIGVtYWlsRGF0YVxuXG5cdC8vIFx0XHRhamF4UG9zdChlbWFpbFN0cmluZywgZnVuY3Rpb24oZGF0YSl7XG5cdC8vIFx0XHRcdGlmIChkYXRhLnN1Y2Nlc3MpIHtcblx0Ly8gXHRcdFx0XHQkKCcubW9kYWwnKS5oaWRlKClcblx0Ly8gXHRcdFx0XHQkKCcudGhhbmt5b3Vtb2RhbCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuXHQvLyBcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdGFsZXJ0KGRhdGEuZXJyb3IpXG5cdC8vIFx0XHRcdH1cblx0Ly8gXHRcdH0sICdqc29ucCcpXG5cblx0Ly8gXHRcdH1cblx0Ly8gfVxuXG5cbi8vIH1cblxuXG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHQvLyBNYWluIGFwcCBzdGFydHVwXG5cblx0dmFyIFV0aWxpdHkgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8vIEdldCB0aGUgdG9wIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgaW4gdGhlIGRvY3VtZW50XG5cdFx0Ly8gRnJvbSBzbW9vdGhTY3JvbGwsIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGljZWxpZXV0aWVyL3Ntb290aFNjcm9sbC9ibG9iL21hc3Rlci9zbW9vdGhzY3JvbGwuanNcblx0XHR2YXIgZ2V0VG9wID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0Ly8gcmV0dXJuIHZhbHVlIG9mIGh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC4uLiBJRSA6IDAsIG90aGVyIGJyb3dzZXJzIDogLXBhZ2VZT2Zmc2V0XG5cdFx0XHRpZihlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHJldHVybiAtd2luZG93LnBhZ2VZT2Zmc2V0XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSBjdXJyZW50IHNjcmVlbiB2aWV3cG9ydCB3aWR0aFxuXHRcdHZhciBnZXRWaWV3cG9ydFdpZHRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcblx0XHR9XG5cblx0XHQvLyBBZGQgZGlnaXQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgdG8gYSBudW1lcmljIHN0cmluZ1xuXHRcdHZhciBhZGREaWdpdFNlcGFyYXRvcnMgPSBmdW5jdGlvbiAobnVtKSB7XG5cdFx0XHR2YXIgbiA9IG51bS50b1N0cmluZygpXG5cdFx0XHR2YXIgcCA9IG4uaW5kZXhPZignLicpXG5cdFx0XHRyZXR1cm4gbi5yZXBsYWNlKC9cXGQoPz0oPzpcXGR7M30pKyg/OlxcLnwkKSkvZywgZnVuY3Rpb24gKCQwLCBpKSB7XG5cdFx0XHRcdHJldHVybiBwIDwgMCB8fCBpIDwgcCA/ICgkMCArICcsJykgOiAkMFxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNoYXJhY3RlciByZXByZXNlbnRhdGlvbiBvZiBJbmZpbml0eVxuXHRcdHZhciBnZXRJbmZpbml0eUNoYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJ+KInidcblx0XHR9XG5cblx0XHQvLyBGb3JtYXQgYSBudW1iZXIgZm9yIGRpc3BsYXlcblx0XHR2YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24gKG51bWJlciwgZGVjaW1hbHMsIHNob3dQb3NpdGl2ZSkge1xuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChudW1iZXIpXG5cdFx0XHRpZiAoIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkZWNpbWFscyAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVjaW1hbHMgIT09IG51bGwpIHtcblx0XHRcdFx0XHQvLyBLZWVwIGEgc2V0IG51bWJlciBvZiBkZWNpbWFscywgZXZlbiBpZiB6ZXJvZXNcblx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnModmFsdWUpLnRvRml4ZWQoZGVjaW1hbHMpKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEp1c3QgdHJ1bmNhdGUgdG8gYSBmaXhlZCBudW1iZXIgb2YgZGVjaW1hbHMsIGJ1dCBkb24ndCBwcmVzZXJ2ZSB0cmFpbGluZyB6ZXJvZXNcblx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlIDwgMCA/ICctICcgOiAoc2hvd1Bvc2l0aXZlID09PSB0cnVlID8gJysgJyA6ICcnKSkgKyBhZGREaWdpdFNlcGFyYXRvcnMoTWF0aC5hYnMocGFyc2VGbG9hdCh2YWx1ZS50b0ZpeGVkKDIpKSkpXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBnZXRJbmZpbml0eUNoYXIoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZvcm1hdCBhIG51bWJlciBhcyBjdXJyZW55IGZvciBkaXNwbGF5XG5cdFx0dmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24gKG51bWJlciwgc2hvd0RlY2ltYWxzLCBzaG93UG9zaXRpdmUpIHtcblx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobnVtYmVyKVxuXHRcdFx0aWYgKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArICckJyArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChzaG93RGVjaW1hbHMgPT09IHRydWUgPyAyIDogMCkpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZ2V0SW5maW5pdHlDaGFyKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGEgZm9ybWF0dGVkIG51bWJlciBiYWNrIGludG8gYW4gYWN0dWFsIG51bWJlclxuXHRcdHZhciB1bmZvcm1hdE51bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgvW14tXFxkXFwuZV0vZywgJycpLnRyaW0oKSlcblx0XHR9XG5cblx0XHQvLyBGb3JtYXQgYSBpbnB1dCBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlIFwiZGF0YS1mb3JtYXRcIiBhdHRyaWJ1dGVcblx0XHR2YXIgZm9ybWF0VmFsdWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0aWYgKCFlbGVtZW50IHx8IChlbGVtZW50ICYmICFlbGVtZW50LnZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gJydcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBlbGVtZW50LnZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWx1ZVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZm9ybWF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5kYXRhc2V0LmZvcm1hdFxuXG5cdFx0XHRzd2l0Y2ggKGZvcm1hdCkge1xuXHRcdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cblx0XHRcdFx0Y2FzZSAnc2lnbmVkbnVtYmVyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCBudWxsLCB0cnVlKVxuXG5cdFx0XHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIDApXG5cblx0XHRcdFx0Y2FzZSAnZml4ZWQyJzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCAyKVxuXG5cdFx0XHRcdGNhc2UgJ2N1cnJlbmN5Jzpcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0Q3VycmVuY3kodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cdFx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsdWVcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Z2V0VG9wOiBnZXRUb3AsXG5cdFx0XHRnZXRWaWV3cG9ydFdpZHRoOiBnZXRWaWV3cG9ydFdpZHRoLFxuXHRcdFx0YWRkRGlnaXRTZXBhcmF0b3JzOiBhZGREaWdpdFNlcGFyYXRvcnMsXG5cdFx0XHRnZXRJbmZpbml0eUNoYXI6IGdldEluZmluaXR5Q2hhcixcblx0XHRcdGZvcm1hdE51bWJlcjogZm9ybWF0TnVtYmVyLFxuXHRcdFx0Zm9ybWF0Q3VycmVuY3k6IGZvcm1hdEN1cnJlbmN5LFxuXHRcdFx0dW5mb3JtYXROdW1iZXI6IHVuZm9ybWF0TnVtYmVyLFxuXHRcdFx0Zm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG5cdFx0fVxuXHR9KCkpXG5cblx0dmFyIFNlZWRDYWxjRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFNFRURTX1BFUl9MQl9NSU4gPSA5MDAwXG5cdFx0dmFyIFNFRURTX1BFUl9MQl9NQVggPSAxODAwMFxuXHRcdHZhciBTRUVEU19QRVJfTEJfU1RFUCA9IDUwMFxuXG5cdFx0dmFyIFNlZWRDYWxjVXNlckRhdGEgPSBmdW5jdGlvbiAoY2VydGlmaWVkKSB7XG5cdFx0XHQvLyBQcm9wZXJ0aWVzXG5cdFx0XHR0aGlzLnNlYXNvbiA9ICd3aW50ZXInIC8vIHNwcmluZ3x3aW50ZXJcblxuXHRcdFx0dGhpcy5wZXJjZW50R2VybWluYXRpb24gPSAwXG5cdFx0XHR0aGlzLnBlcmNlbnRQdXJlU2VlZCA9IDBcblx0XHRcdHRoaXMuY29zdFBlckNXVCA9IDBcblx0XHRcdHRoaXMudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMud2hlYXRQcmljZVBlckJ1c2hlbCA9IDBcblx0XHRcdHRoaXMudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMFxuXHRcdFx0dGhpcy5mbGF0UmF0ZUxiUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMuYWNyZXNQbGFudGVkID0gMFxuXG5cdFx0XHR0aGlzLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXHRcdFx0dGhpcy5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXG5cdFx0XHQvLyBPdGhlclxuXHRcdFx0dGhpcy5pc0NlcnRpZmllZCA9ICEhY2VydGlmaWVkXG5cblx0XHRcdC8vIE1ldGhvZHNcblx0XHRcdHRoaXMucmVzZXRUb0RlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAodGhpcy5pc0NlcnRpZmllZCkge1xuXHRcdFx0XHRcdHNldENlcnRpZmllZFNlZWREZWZhdWx0cyh0aGlzKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNldFNhdmVkU2VlZERlZmF1bHRzKHRoaXMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZVxuXHRcdFx0dGhpcy5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdH1cblxuXHRcdHZhciBPcHRpbWFsU2VlZGluZ1JhdGVJbXBhY3REYXRhID0gZnVuY3Rpb24gKHNlZWRzUGVyTGIpIHtcblx0XHRcdC8vIENhbGN1bGF0ZWRcblx0XHRcdHRoaXMueWllbGRBZHZhbnRhZ2VCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdHRoaXMuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gMFxuXHRcdFx0dGhpcy5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IDBcblx0XHRcdHRoaXMuY29zdFBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLnRvdGFsU2VlZENvc3QgPSAwXG5cdFx0XHR0aGlzLmFjdHVhbFNlZWRpbmdSYXRlID0gMFxuXHRcdFx0dGhpcy5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gMFxuXHRcdFx0dGhpcy5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QgPSAwXG5cdFx0XHR0aGlzLmZsYXRSYXRlQ29zdFBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSA9IDBcblx0XHRcdHRoaXMudG90YWxTZWVkQ29zdCA9IDBcblx0XHRcdHRoaXMudG90YWxTZWVkQ29zdERpZmZlcmVudGlhbCA9IDBcblx0XHRcdHRoaXMucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgPSAwXG5cdFx0XHR0aGlzLm5ldFJldmVudWVMYlBlckFjcmUgPSAwXG5cdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWVCZW5lZml0ID0gMFxuXG5cdFx0XHQvLyBPdGhlclxuXHRcdFx0dGhpcy5zZWVkc1BlckxiID0gc2VlZHNQZXJMYlxuXHRcdH1cblxuXHRcdHZhciBzZXRDZXJ0aWZpZWRTZWVkRGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDAuOTVcblx0XHRcdHVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCA9IDAuOTg1XG5cdFx0XHR1c2VyRGF0YS5jb3N0UGVyQ1dUID0gMThcblx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gdHJ1ZVxuXHRcdH1cblxuXHRcdHZhciBzZXRTYXZlZFNlZWREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0dXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gMC45M1xuXHRcdFx0dXNlckRhdGEucGVyY2VudFB1cmVTZWVkID0gMC45NVxuXHRcdFx0dXNlckRhdGEuY29zdFBlckNXVCA9IDcuNDZcblx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gZmFsc2Vcblx0XHR9XG5cblx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gZGF0YS51c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gLyAoZGF0YS5zZWVkc1BlckxiICogZGF0YS51c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbilcblxuXHRcdFx0ZGF0YS5zZWVkc1BlckFjcmVSZXF1aXJlZCA9IGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkICogZGF0YS5zZWVkc1BlckxiXG5cblx0XHRcdGRhdGEuY29zdFBlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmNvc3RQZXJDV1QgKiAoZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgLyAxMDApXG5cblx0XHRcdGRhdGEudG90YWxTZWVkQ29zdCA9IGRhdGEuY29zdFBlckFjcmUgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRkYXRhLmFjdHVhbFNlZWRpbmdSYXRlID0gZGF0YS51c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSAqIGRhdGEuc2VlZHNQZXJMYiAqIGRhdGEudXNlckRhdGEucGVyY2VudFB1cmVTZWVkICogZGF0YS51c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb25cblxuXHRcdFx0ZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gZGF0YS5hY3R1YWxTZWVkaW5nUmF0ZSAtIGRhdGEudXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uXG5cblx0XHRcdGRhdGEub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0ID0gZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IDwgMFxuXHRcdFx0XHQ/IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCAqIGRhdGEudXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZVxuXHRcdFx0XHQ6IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ICogZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICogLTFcblxuXHRcdFx0ZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5jb3N0UGVyQ1dUICogKGRhdGEudXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgLyAxMDApXG5cblx0XHRcdGRhdGEuY29zdFBlckFjcmVEaWZmZXJlbmNlID0gZGF0YS5jb3N0UGVyQWNyZSAtIGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZVxuXG5cdFx0XHRkYXRhLnRvdGFsU2VlZENvc3RGbGF0UmF0ZSA9IGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdGRhdGEudG90YWxTZWVkQ29zdEZsYXRSYXRlRGlmZmVyZW50aWFsID0gZGF0YS5jb3N0UGVyQWNyZURpZmZlcmVuY2UgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5pc0NlcnRpZmllZCA/IChkYXRhLnVzZXJEYXRhLnNlYXNvbi50b0xvd2VyQ2FzZSgpID09PSAnc3ByaW5nJyA/IDQuNSA6IDcuNSkgOiAwXG5cblx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSA9ICgoZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSkgKiBkYXRhLnVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZCkgLSBkYXRhLnRvdGFsU2VlZENvc3RcblxuXHRcdFx0ZGF0YS5uZXRSZXZlbnVlTGJQZXJBY3JlID0gKChkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKyBkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QpICogZGF0YS51c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWQpIC0gZGF0YS50b3RhbFNlZWRDb3N0XG5cblx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZUJlbmVmaXQgPSBkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgLSBkYXRhLm5ldFJldmVudWVMYlBlckFjcmVcblx0XHR9XG5cblx0XHR2YXIgZ2V0RGF0YVNlcmllcyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0dmFyIHNlcmllcyA9IFtdXG5cblx0XHRcdGZvciAodmFyIHNlZWRzUGVyTGIgPSBTRUVEU19QRVJfTEJfTUlOOyBzZWVkc1BlckxiIDw9IFNFRURTX1BFUl9MQl9NQVg7IHNlZWRzUGVyTGIgKz0gU0VFRFNfUEVSX0xCX1NURVApIHtcblx0XHRcdFx0dmFyIGRhdGFJdGVtID0gbmV3IE9wdGltYWxTZWVkaW5nUmF0ZUltcGFjdERhdGEoc2VlZHNQZXJMYilcblxuXHRcdFx0XHQvLyBNZXJnZSBpbiB0aGUgdXNlckRhdGEgcHJvcGVydGllc1xuXHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YSA9IHt9XG5cdFx0XHRcdGZvciAodmFyIHByb3AgaW4gdXNlckRhdGEpIHtcblx0XHRcdFx0XHRpZiAodXNlckRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdHlwZW9mIHVzZXJEYXRhW3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YVtwcm9wXSA9IHVzZXJEYXRhW3Byb3BdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FsY3VsYXRlKGRhdGFJdGVtKVxuXHRcdFx0XHRzZXJpZXMucHVzaChkYXRhSXRlbSlcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNlcmllc1xuXHRcdH1cblxuXHRcdHZhciBnZXRTZXJpZXNDb2x1bW5EYXRhID0gZnVuY3Rpb24gKHNlcmllcywgY29sdW1uKSB7XG5cdFx0XHR2YXIgZGF0YSA9IFtdXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgc2VyaWVzW2ldOyBpKyspIHtcblx0XHRcdFx0ZGF0YS5wdXNoKHNlcmllc1tpXVtjb2x1bW5dKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGF0YVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRTZWVkQ2FsY1VzZXJEYXRhOiBTZWVkQ2FsY1VzZXJEYXRhLFxuXHRcdFx0Z2V0RGF0YVNlcmllczogZ2V0RGF0YVNlcmllcyxcblx0XHRcdGdldFNlcmllc0NvbHVtbkRhdGE6IGdldFNlcmllc0NvbHVtbkRhdGFcblx0XHR9XG5cdH0oKSlcblxuXHR2YXIgU2VlZENhbGMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8vIENPTlNUQU5UU1xuXHRcdHZhciBDSEFSVF9NT0JJTEVfU01BTExfTUFYX1dJRFRIID0gNDAwICAgLy8gbWF4IHdpZHRoIGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9TTUFMTF9NQVhfSEVJR0hUID0gMjY3ICAvLyBtYXggaGVpZ2h0IGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9NQVhfV0lEVEggPSA2MDAgICAvLyBtYXggd2lkdGggZm9yIG1vYmlsZSBkZXZpY2VzXG5cdFx0dmFyIENIQVJUX01PQklMRV9NQVhfSEVJR0hUID0gMzAwICAvLyBtYXggaGVpZ2h0IGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdHZhciBDSEFSVF9NQVhfV0lEVEggPSA2MDBcblx0XHR2YXIgQ0hBUlRfTUFYX0hFSUdIVCA9IDMwMFxuXHRcdHZhciBDT0xPUl9EQVJLX1JFRCA9ICcjNTI5M0FCJ1xuXHRcdHZhciBDT0xPUl9MSUdIVF9SRUQgPSAnIzcyYjFjOCdcblx0XHR2YXIgQ09MT1JfREFSS19CTFVFID0gJyMzNzM4MzYnXG5cdFx0dmFyIENPTE9SX0xJR0hUX0JMVUUgPSAnIzY0NjU2MCdcblxuXHRcdC8vIFBST1BFUlRJRVNcblxuXHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YSA9IG5ldyBTZWVkQ2FsY0RhdGEuU2VlZENhbGNVc2VyRGF0YSh0cnVlKVxuXHRcdHZhciBzYXZlZFNlZWREYXRhID0gbmV3IFNlZWRDYWxjRGF0YS5TZWVkQ2FsY1VzZXJEYXRhKClcblxuXHRcdC8vIE1FVEhPRFNcblxuXHRcdHZhciBpc01vYmlsZVNtYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpIDwgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9XSURUSFxuXHRcdH1cblxuXHRcdHZhciBpc01vYmlsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKSA8IENIQVJUX01PQklMRV9NQVhfV0lEVEhcblx0XHR9XG5cblx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlZF9jYWxjX2Zvcm0nKVxuXHRcdFx0Zm9ybS5jbGFzc0xpc3QuYWRkKCdjYWxjdWxhdGVkJylcblxuXHRcdFx0Ly8gR2V0IGZvcm0gZmllbGQgZGF0YVxuXHRcdFx0dXBkYXRlVXNlckRhdGFGcm9tRm9ybSgpXG5cblx0XHRcdC8vIFNjcm9sbCB0byBmaXJzdCBncmFwaCAoc2V0IGEgZGVsYXkgdG8gYWxsb3cgdGhlIHNlY3Rpb25zIHRvIGJlY29tZSB2aXNpYmxlKVxuXHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdC8vIFx0dmFyIGhlYWRlckJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXNpdGUtbmF2LXdyYXBwZXItaGVhZGVyJyksXG5cdFx0XHQvLyBcdFx0aGVhZGVyQmFyRml4ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXJCYXIpLnBvc2l0aW9uID09PSAnZml4ZWQnLFxuXHRcdFx0Ly8gXHRcdG9mZnNldCA9IGhlYWRlckJhckZpeGVkID8gLWhlYWRlckJhci5jbGllbnRIZWlnaHQgOiAwLFxuXHRcdFx0Ly8gXHRcdHRvcCA9IFV0aWxpdHkuZ2V0VG9wKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxjLXNlY3Rpb24nKSkgKyBvZmZzZXRcblx0XHRcdC8vIFx0c21vb3RoU2Nyb2xsKHRvcClcblx0XHRcdC8vIH0sIDUwKVxuXG5cdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoY2VydGlmaWVkU2VlZERhdGEpXG5cdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKHNhdmVkU2VlZERhdGEpXG5cdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cblx0XHRcdC8vIFNldCB0aGUgQ2FsY3VsYXRlIGJ1dHRvbiB0ZXh0XG5cdFx0XHR2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZScpXG5cdFx0XHRpZiAoYnRuLnRleHRDb250ZW50ID09PSAnQ2FsY3VsYXRlJykge1xuXHRcdFx0XHRidG4udGV4dENvbnRlbnQgPSAnUmUtQ2FsY3VsYXRlJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlVXNlckRhdGFGcm9tRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuY29zdFBlckNXVCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSkgLyAxMDBcblx0XHRcdHNhdmVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0Ly8gVGhlc2UgZmllbGRzIGhhdmUgdGhlIHNhbWUgdmFsdWVzIGluIGJvdGggZGF0YXNldHNcblx0XHRcdHZhciBzZWFzb25zID0gZm9ybVsnY3JvcF9zZWFzb24nXVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWFzb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChzZWFzb25zW2ldLmNoZWNrZWQpIGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9IHNhdmVkU2VlZERhdGEuc2Vhc29uID0gc2Vhc29uc1tpXS52YWx1ZVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPSBzYXZlZFNlZWREYXRhLnNlYXNvbiA9IGZvcm1bJ2Nyb3Bfc2Vhc29uJ10udmFsdWVcblx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBzYXZlZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gc2F2ZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSBzYXZlZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbiddLnZhbHVlKVxuXHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSBzYXZlZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWQgPSBzYXZlZFNlZWREYXRhLmFjcmVzUGxhbnRlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9hY3Jlc19wbGFudGVkJ10udmFsdWUpXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gc2F2ZWRTZWVkRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IHNhdmVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cblx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRmb3JtWydjZXJ0X3NlZWRfcHVyZV9zZWVkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgKiAxMDBcblx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdC8vIFRoZXNlIGZpZWxkcyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBpbiBib3RoIGRhdGFzZXRzLCBzbyBqdXN0IHVzZSB0aGUgZmlyc3Qgb25lXG5cdFx0XHQvLyBmb3JtWydjcm9wX3NlYXNvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uIC8vIGJyb2tlbiBpbiBTYWZhcmlcblx0XHRcdGlmIChjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPT09ICd3aW50ZXInKSB7XG5cdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMF0uY2hlY2tlZCA9IHRydWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMV0uY2hlY2tlZCA9IHRydWVcblx0XHRcdH1cblx0XHRcdGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlXG5cdFx0XHRmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsXG5cdFx0XHRmb3JtWydjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb25cblx0XHRcdGZvcm1bJ2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlXG5cdFx0XHRmb3JtWydjcm9wX2FjcmVzX3BsYW50ZWQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmFjcmVzUGxhbnRlZFxuXHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZyddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdFxuXHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0XG5cdFx0fVxuXG5cdFx0dmFyIHNob3dSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0fVxuXG5cdFx0dmFyIGhpZGVSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc2V0SW5wdXRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gUmVzZXQgdGhlIGRhdGEgdmFsdWVzIHRvIGRlZmF1bHRzXG5cdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdFx0c2F2ZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXG5cdFx0XHQvLyBVcGRhdGUgZm9ybSBmaWVsZCB2YWx1ZXNcblx0XHRcdHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEoKVxuXG5cdFx0XHQvLyBIaWRlIHRoZSByZXNldCBsaW5rIGFnYWluXG5cdFx0XHRoaWRlUmVzZXRMaW5rKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGdldENoYXJ0Q2FudmFzSHRtbCA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0dmFyIHZpZXdwb3J0V2lkdGggPSBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKVxuXHRcdFx0dmFyIGNhbnZhc1NpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiBpc01vYmlsZSgpID8gdmlld3BvcnRXaWR0aCA6IENIQVJUX01BWF9XSURUSCxcblx0XHRcdFx0aGVpZ2h0OiBpc01vYmlsZVNtYWxsKCkgPyBDSEFSVF9NT0JJTEVfU01BTExfTUFYX0hFSUdIVCA6IGlzTW9iaWxlKCkgPyBDSEFSVF9NT0JJTEVfTUFYX0hFSUdIVCA6IENIQVJUX01BWF9IRUlHSFRcblx0XHRcdH1cblxuXHRcdFx0dmFyIGh0bWwgPSAnPGNhbnZhcyBpZD1cIicgKyBpZCArICdcIiBjbGFzcz1cImdyYXBoIGJsb2NrLWNlbnRlclwiIHdpZHRoPVwiJyArIGNhbnZhc1NpemUud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGNhbnZhc1NpemUuaGVpZ2h0ICsgJ1wiPjwvY2FudmFzPidcblxuXHRcdFx0cmV0dXJuIGh0bWxcblx0XHR9XG5cblx0XHR2YXIgc2V0Q2hhcnREZWZhdWx0cyA9IGZ1bmN0aW9uIChhbmltYXRlKSB7XG5cdFx0XHQvLyBHbG9iYWwgY2hhcnQgY29uZmlnXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRGYW1pbHkgPSAnXCJHb3RoYW0gU1NtIEFcIiwgXCJHb3RoYW0gU1NtIEJcIiwgTHVjaWRhIEdyYW5kZSwgXCJMdWNpZGEgR3JhbmRlXCIsIEx1Y2lkYSBTYW5zIFVuaWNvZGUsIFwiTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBMdWNpZGEgU2FucywgXCJMdWNpZGEgU2Fuc1wiLCBHZW5ldmEsIFZlcmRhbmEsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRTaXplID0gMTZcblxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMubGluZS5ib3JkZXJXaWR0aCA9IDJcblx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLmZpbGwgPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gNVxuXHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmJvcmRlcldpZHRoID0gMlxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuYW5pbWF0aW9uLmR1cmF0aW9uID0gYW5pbWF0ZSA9PT0gZmFsc2UgPyAwIDogMTAwMFxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubGVnZW5kLmRpc3BsYXkgPSBmYWxzZVxuXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZXZlbnRzID0gdW5kZWZpbmVkIC8vIGlnbm9yZSBtb3VzZS90b3VjaCBldmVudHNcblxuXHRcdFx0Ly8gc3BlY2lhbCBzZXR0aW5ncyBmb3Igc21hbGxlciBzY3JlZW4gc2l6ZXNcblx0XHRcdGlmIChpc01vYmlsZVNtYWxsKCkpIHtcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDExXG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSAyXG5cdFx0XHR9IGVsc2UgaWYgKGlzTW9iaWxlKCkpIHtcblx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDEyXG5cdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSA0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHVwZGF0ZUdyYXBoQ29tcGFyZUltcGFjdCA9IGZ1bmN0aW9uIChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcykge1xuXHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfY29tcGFyZV9pbXBhY3QnXG5cdFx0XHR2YXIgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3NlY3Rpb24nKVxuXHRcdFx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ193cmFwcGVyJylcblx0XHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19sZWdlbmQnKVxuXHRcdFx0dmFyIGNhbnZhcyA9IGdldENoYXJ0Q2FudmFzSHRtbChjaGFydElkKVxuXHRcdFx0dmFyIG1vYmlsZSA9IGlzTW9iaWxlKClcblx0XHRcdHZhciBtb2JpbGVTbWFsbCA9IGlzTW9iaWxlU21hbGwoKVxuXG5cdFx0XHQvLyBSZW1vdmUgdGhlICdoaWRkZW4nIENTUyBjbGFzc1xuXHRcdFx0c2VjdGlvbi5jbGFzc05hbWUgPSBzZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqXFxiaGlkZGVuXFxiL2csICcnKVxuXG5cdFx0XHQvLyBkZXN0cm95IGFuZCByZWNyZWF0ZSB0aGUgY2FudmFzXG5cdFx0XHRpZiAod3JhcHBlci5oYXNDaGlsZE5vZGVzKCkpIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5jaGlsZE5vZGVzWzBdKVxuXHRcdFx0d3JhcHBlci5pbm5lckhUTUwgPSBjYW52YXNcblxuXHRcdFx0Ly8gR2V0IHRoZSB4LWF4aXMgbGFiZWxzXG5cdFx0XHR2YXIgeExhYmVscyA9IFtdXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV07IGkrKykge1xuXHRcdFx0XHR4TGFiZWxzLnB1c2goY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV0uc2VlZHNQZXJMYi50b1N0cmluZygpKVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHR0eXBlOiAnbGluZScsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRsYWJlbHM6IHhMYWJlbHMsXG5cdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgJ29wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUnKSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdjaXJjbGUnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX2NpcmNsZS1saW5lLWJsdWUtc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsICduZXRSZXZlbnVlTGJQZXJBY3JlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ2NpcmNsZScsXG5cdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fY2lyY2xlLWxpbmUtYmx1ZS5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKHNhdmVkU2VlZERhdGFTZXJpZXMsICdvcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlJyksXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0cG9pbnRSYWRpdXM6IENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgKyAxLFxuXHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ3JlY3QnLFxuXHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX3NxdWFyZS1saW5lLWRhcmstc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShzYXZlZFNlZWREYXRhU2VyaWVzLCAnbmV0UmV2ZW51ZUxiUGVyQWNyZScpLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdHBvaW50UmFkaXVzOiBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzICsgMSxcblx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdyZWN0Jyxcblx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19zcXVhcmUtbGluZS1kYXJrLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdHhBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogJ2JvdHRvbScsXG5cdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnU2VlZHMvTGInLFxuXHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGluZGV4ICUgMiA9PT0gMCA/IFV0aWxpdHkuYWRkRGlnaXRTZXBhcmF0b3JzKHZhbHVlKSA6ICcnXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjb21wYXJlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuICAgICAgfSwgMTUwMClcblxuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48aW1nIGNsYXNzPVwiY2FsYy1sZWdlbmQtaWNvblwiIHNyYz1cIicgKyBpdGVtLmxlZ2VuZEljb25JbWFnZSArICdcIiBhbHQ9XCJcIj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHR9XG5cdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlR3JhcGhNYXhpbWl6ZVJldmVudWUgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpIHtcblx0XHRcdC8vIFJlc2V0IHNvbWUgZ2xvYmFsIGNoYXJ0IGRlZmF1bHRzXG5cdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWVcblxuXHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfbWF4aW1pemVfcmV2ZW51ZSdcblx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfc2VjdGlvbicpXG5cdFx0XHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3dyYXBwZXInKVxuXHRcdFx0dmFyIGxlZ2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX2xlZ2VuZCcpXG5cdFx0XHR2YXIgY2FudmFzID0gZ2V0Q2hhcnRDYW52YXNIdG1sKGNoYXJ0SWQpXG5cblx0XHRcdC8vIFJlbW92ZSB0aGUgJ2hpZGRlbicgQ1NTIGNsYXNzXG5cdFx0XHRzZWN0aW9uLmNsYXNzTmFtZSA9IHNlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoL1xccypcXGJoaWRkZW5cXGIvZywgJycpXG5cblx0XHRcdC8vIGRlc3Ryb3kgYW5kIHJlY3JlYXRlIHRoZSBjYW52YXNcblx0XHRcdGlmICh3cmFwcGVyLmhhc0NoaWxkTm9kZXMoKSkgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmNoaWxkTm9kZXNbMF0pXG5cdFx0XHR3cmFwcGVyLmlubmVySFRNTCA9IGNhbnZhc1xuXG5cdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0dmFyIGNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuXHRcdFx0XHR0eXBlOiAnYmFyJyxcblx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdGxhYmVsczogW10sXG5cdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBbIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzWyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcy5sZW5ndGggLSAxIF0ub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSBdLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVEXG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRkYXRhOiBbIHNhdmVkU2VlZERhdGFTZXJpZXNbIHNhdmVkU2VlZERhdGFTZXJpZXMubGVuZ3RoIC0gMSBdLm5ldFJldmVudWVMYlBlckFjcmUgXSxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogdHJ1ZSxcblx0XHRcdFx0XHRzY2FsZXM6IHtcblx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNyZXZlbnVlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuICAgICAgfSwgMTUwMClcblxuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWljb25cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArIGl0ZW0uYmFja2dyb3VuZENvbG9yICsgJ1wiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHR9XG5cdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlR3JhcGhzID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzLCBhbmltYXRlKSB7XG5cdFx0XHRzZXRDaGFydERlZmF1bHRzKGFuaW1hdGUpXG5cdFx0XHR1cGRhdGVHcmFwaENvbXBhcmVJbXBhY3QoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpXG5cdFx0XHR1cGRhdGVHcmFwaE1heGltaXplUmV2ZW51ZShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblx0XHR9XG5cblx0XHQvLyBFVkVOVFNcblxuXHRcdHZhciBvbkNhbGN1bGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG5cdFx0XHRcdCAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuXHRcdFx0XHQgICQoJy5jYWxjLWZpZWxkJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0ICAgIGlmICggJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2Vcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaXNWYWxpZClcblx0XHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwiIzY2NjY1Y1wifSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0ICB9KTtcblx0XHRcdFx0ICByZXR1cm4gaXNWYWxpZDtcblx0XHRcdFx0fVxuXG5cdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgZ28gPSB2YWxpZGF0ZUZvcm0oKVxuXHRcdFx0XHR2YXIgZXJyb3JGb3JtTWVzc2FnZSA9ICc8c3BhbiBjbGFzcz1cImVycm9yRm9ybU1lc3NhZ2VcIj5Zb3UgbXVzdCBjb21wbGV0ZSBhbGwgZmllbGRzIGFib3ZlIHRvIGNhbGN1bGF0ZS48L3NwYW4+J1xuXHRcdFx0XHRpZiAoIGdvID09IHRydWUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaXQgaXMgdmFsaWQnKVxuXHRcdFx0XHRcdCQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcblx0XHRcdFx0XHQkKCcjZ3JhcGhfY29tcGFyZV9pbXBhY3Rfc2VjdGlvbiAsICNncmFwaF9tYXhpbWl6ZV9yZXZlbnVlX3NlY3Rpb24nKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdCQoJy5hY3Rpb25EYXRhJykuc2hvdygpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0Y2FsY3VsYXRlKClcblx0XHRcdFx0fWVsc2UgaWYgKCBnbyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpdCBpcyBub3QgdmFsaWQnKVxuXHRcdFx0XHRcdGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7XG5cblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcjeWllbGRJbXBhY3RGb3JVbmRlcnNlZWRpbmcnKS5hZnRlcihlcnJvckZvcm1NZXNzYWdlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR2YXIgb25Gb3JtSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gU2hvdyB0aGUgJ3Jlc2V0IGZvcm0nIGxpbmsgd2hlbiBkZXZpYXRpbmcgZnJvbSB0aGUgZGVmYXVsdHNcblx0XHRcdHNob3dSZXNldExpbmsoKVxuXHRcdH1cblxuXHRcdHZhciBvblJlc2V0Rm9ybSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHQvLyBSZXNldCB0aGUgZGF0YSBhbmQgZm9ybSB2YWx1ZXNcblx0XHRcdHJlc2V0SW5wdXRzKClcblx0XHR9XG5cblx0XHR2YXIgb25FbWFpbERhdGEgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0Ly8gTk9URTogVGhlIGdlbmVyYXRlZCBQREYgd2lsbCBoYXZlIHRoZSBkYXRhIHRoYXQgaXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBjaGFydHMuIElmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGZvcm0gZmllbGQgdmFsdWVzLCBidXQgbm90IGNsaWNrZWQgXCJDYWxjdWxhdGVcIiwgdGhlbiB0aGVzZSBhcmUgbm90IHJlZmxlY3RlZCBpbiB0aGUgb3V0cHV0LlxuXG5cdFx0XHQvLyBUT0RPOiBTaG93IGVtYWlsIGZpZWxkcyBmb3IgdXNlciBpbnB1dC4gU3VibWl0dGluZyB0aGlzIGZvcm0gd2lsbCBleGVjdXRlIHRoZSBlbWFpbERhdGEoKSBtZXRob2QuXG5cdFx0XHRjb25zb2xlLmluZm8oJ0VtYWlsIFBERicpXG5cdFx0fVxuXG5cdFx0dmFyIG9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHQvLyBPbmx5IHJlZHJhdyB0aGUgZ3JhcGhzIGlmIHRoZXkgaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgYXQgbGVhc3Qgb25jZSBhbHJlYWR5XG5cdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cdFx0XHRpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbGN1bGF0ZWQnKSkge1xuXHRcdFx0XHQvLyBSZS1yZW5kZXIgdGhlIGdyYXBoc1xuXHRcdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhjZXJ0aWZpZWRTZWVkRGF0YSlcblx0XHRcdFx0dmFyIHNhdmVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhzYXZlZFNlZWREYXRhKVxuXHRcdFx0XHR1cGRhdGVHcmFwaHMoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBvbkRvd25sb2FkUGRmID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdC8vIE5PVEU6IFRoZSBnZW5lcmF0ZWQgUERGIHdpbGwgaGF2ZSB0aGUgZGF0YSB0aGF0IGlzIGN1cnJlbnRseSByZXByZXNlbnRlZCBpbiB0aGUgY2hhcnRzLiBJZiB0aGUgdXNlciBoYXMgY2hhbmdlZCBmb3JtIGZpZWxkIHZhbHVlcywgYnV0IG5vdCBjbGlja2VkIFwiQ2FsY3VsYXRlXCIsIHRoZW4gdGhlc2UgYXJlIG5vdCByZWZsZWN0ZWQgaW4gdGhlIG91dHB1dC5cblxuXHRcdFx0Ly8gVE9ETzogVHJpZ2dlcmluZyB0aGlzIGhhbmRsZXIgd2lsbCBleGVjdXRlIHRoZSBkb3dubG9hZFBkZigpIG1ldGhvZFxuXHRcdFx0Y29uc29sZS5pbmZvKCdEb3dubG9hZCBQREYnKVxuXHRcdH1cblxuXHRcdHZhciB3aXJlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGZvcm1FbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jylcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGZvcm1FbGVtZW50c1tpXVxuXHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkZvcm1JbnB1dENoYW5nZSlcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNhbGN1bGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdGUnKVxuXHRcdFx0Y2FsY3VsYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYWxjdWxhdGUpXG5cblx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIHJlc2V0IHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xuXHRcdFx0dmFyIHJlc2V0Rm9ybUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpXG5cdFx0XHRyZXNldEZvcm1MaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25SZXNldEZvcm0pXG5cblx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIGVtYWlsIHRoZSByZXN1bHRzIGFzIGEgUERGXG5cdFx0XHQvL3ZhciBlbWFpbERhdGFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWxfZGF0YScpXG5cdFx0XHQvL2VtYWlsRGF0YUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRW1haWxEYXRhKVxuXG5cdFx0XHQvLyBBZGQgdHJpZ2dlciB0byBkb3dubG9hZCB0aGUgcmVzdWx0cyBhcyBhIFBERlxuXHRcdFx0Ly92YXIgZG93bmxvYWRQZGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmxvYWRfcGRmJylcblx0XHRcdC8vZG93bmxvYWRQZGYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvd25sb2FkUGRmKVxuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUpO1xuXHRcdH1cblxuXHRcdHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB1c2VyIGZvcm0gaW5wdXRzIHdpdGggZGVmYXVsdCBkYXRhXG5cdFx0XHR1cGRhdGVGb3JtRnJvbVVzZXJEYXRhKClcblxuXHRcdFx0Ly8gV2lyZSB1cCBpbnRlcmFjdGl2ZSBldmVudHNcblx0XHRcdHdpcmVFdmVudHMoKVxuXHRcdH1cblxuXHRcdHJldHVybiB7IGluaXQ6IGluaXQgfVxuXHR9KCkpXG5cblx0U2VlZENhbGMuaW5pdCgpXG59KVxuICBpZiggJCgnYm9keScpLmhhc0NsYXNzKCdmaW5kLXNlZWQtc3VwcGxpZXInKSApIHtcbiAgICAkKCcjc3RhdGVzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlU3RhdGUoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZSAoKSB7XG4gICAgICBpZiAoJCgnI3Jlc3VsdHMnKS5oYXNDbGFzcygnaGlkZGVuJykpIHtcbiAgICAgICAgJCgnI3Jlc3VsdHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgIH1cbiAgICAgIHZhciBzZWxlY3RlZHN0YXRlID0gJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXG4gICAgICAkKCcuc3VwcGxpZXIsIC5yZXAnKS5oaWRlKClcbiAgICAgICQoJy4nICsgc2VsZWN0ZWRzdGF0ZSkuc2hvdygpXG5cbiAgICAgIGlmICghJCgnLicgKyBzZWxlY3RlZHN0YXRlKVswXSkge1xuICAgICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLnNob3coKVxuICAgICAgICAgIHZhciBzdGF0ZUNob3NlbiA9ICQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS50ZXh0KClcbiAgICAgICAgICAkKCcuZmFpbHVyZVNwYW4nKS50ZXh0KHN0YXRlQ2hvc2VuKVxuICAgICAgICAgICQoJy5yZXBfX2N0bicpLmhpZGUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcuZmFpbHVyZV9fbm9zdXBwbGllcnMnKS5oaWRlKClcbiAgICAgICAgICAkKCcucmVwX19jdG4nKS5zaG93KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yKVxuXG4gICAgZnVuY3Rpb24gc3VjY2VzcyAocG9zaXRpb24pIHtcbiAgICAgIHZhciBHRU9DT0RJTkcgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9JyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUgKyAnJmtleT1BSXphU3lBSWFwUWJCckJjSUZUdUlsTXhiWGJNdHkzZFQ3UjFiMmsnXG5cbiAgICAgICQuZ2V0SlNPTihHRU9DT0RJTkcpLmRvbmUoZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciB0aGVzdGF0ZSA9IGxvY2F0aW9uLnJlc3VsdHNbMF0uYWRkcmVzc19jb21wb25lbnRzWzRdLnNob3J0X25hbWVcbiAgICAgICAgJCgnI3N0YXRlc2VsZWN0JykudmFsKHRoZXN0YXRlKVxuICAgICAgICBjaGFuZ2VTdGF0ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9XG4gIH1cbiJdfQ==