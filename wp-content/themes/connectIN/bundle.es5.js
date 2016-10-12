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

//# sourceMappingURL=data:application/json;base64,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N0MsU0FBUyxLQUFULENBQWdCLEdBQWhCLEVBQXFCO0FBQ25CLFdBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxHQTNDNEM7O0FBQzdDLElBQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixZQUFZO0FBQ25DO0FBQ0QsR0FGRDs7QUE0QkEsWUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxPQUF6QyxFQUFrRCxLQUFsRDtBQTdCNkM7QUE0QzlDIiwiZmlsZSI6ImJ1bmRsZS5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG5jb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcblxuICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykgPT09IHRydWUpIHtcbiAgICAkKCcjbWFpbGJhcicpLmhpZGUoKVxuICB9ZWxzZSB7XG4gICAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG4gIH1cblxufVxuXG4vLyBjbGljayB0aXRsZSBvciBkb3duIGFycm93XG4kKCcjbWFpbGJhci1hY3RpdmF0ZScpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHZoXG4gIGNvbnN0ICRib2R5ID0gJCgnI21haWxiYXItYm9keScpXG4gIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgIHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9IGVsc2Uge1xuICAgIHZoID0gNDAwXG4gIH1cblxuICBpZiAoJGJvZHkuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gIH0gZWxzZSB7XG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICB9XG5cbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxufSlcblxuLy8gY2xpY2sgZGlzbWlzc1xuJCgnI21haWxiYXItZGlzbWlzcycpLm9uKCdjbGljaycsIGRpc21pc3NNYWlsYmFyKVxuXG5mdW5jdGlvbiBkaXNtaXNzTWFpbGJhciAoKSB7XG4gIC8vIGlmIHRoZSBtZW51IGlzIGFjdGl2ZSBhbmQgeW91IGRpc21pc3MsIHJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0XG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtYWN0aXZlJykpIHtcbiAgICBjb25zdCBtZW51ID0gJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJylcbiAgICBjb25zdCBhZGRlZEhlaWdodCA9IG1lbnUuaGVpZ2h0KCkgKyAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBhZGRlZEhlaWdodCArICdweCcpXG4gIH1cblxuICAkKCcjbWFpbGJhcicpLmFuaW1hdGUoeyBoZWlnaHQ6ICcwJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxuICB9KVxuXG4gIGRvY3VtZW50LmNvb2tpZSA9ICdzdWJzY3JpYmVkPXRydWUnXG59XG4kKCcjbWVudS1hY3RpdmF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG1haWxiYXIgPSAwXG4gIGlmICgkKCcjbWFpbGJhci1ib2R5JykubGVuZ3RoKSB7XG4gICAgbWFpbGJhciA9ICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgfVxuXG4gIGNvbnN0IHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21lbnUnKS5oZWlnaHQoKSAtIG1haWxiYXJcbiAgY29uc3QgbWVudSA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tZW51XCI+PC91c2U+J1xuICBjb25zdCBjcm9zcyA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jcm9zc1wiPjwvdXNlPidcblxuICBpZiAoJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGNyb3NzKVxuICB9IGVsc2Uge1xuICAgICQoJyNtZW51LWhlYWRlci1tZW51LWNvbnRhaW5lcicpLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKG1lbnUpXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2ZScpXG59KVxuXG4vLyBUT0RPOiByZWNhbGMgbWVudSBoZWlnaHQgb24gcmVzaXplIGlmIGluIG1vYmlsZSB3aWR0aHNcbiQod2luZG93KS5yZXNpemUoKVxuJCgnLmJlbmVmaXRzX19oZWFkbGluZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCh0aGlzKS5uZXh0KClcbiAgICBjb25zdCBhcnJvd0Rvd24gPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPidcbiAgICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gICAgJGJvZHkuc2xpZGVUb2dnbGUoKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93RG93bilcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd1VwKVxuICAgIH1cblxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pXG4vLyB3aW5kb3cuYWxlcnQgPSBmdW5jdGlvbiAoKSB7fVxuLy8gIFZhbGlkYXRlIENvbnRhY3QgVXMgRmllbGRzXG5pZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykpIHtcbiAgICAkKCcucHJpbWFyeUFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIFZhbGl0KCkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQoJy52YWxpZGF0ZS1lbWFpbCcpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0RW1haWwnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCgnI3RmYV8yJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFweCBzb2xpZCByZWRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVuaXQgPSBWYWxpdCgpO1xuICAgICAgICB2YXIgZXJyb3IgPSAnPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjpzdGF0aWM7XCIgY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZS48L3NwYW4+J1xuICAgICAgICBpZiAocnVuaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnI3RmYV8wJykuc3VibWl0KClcbiAgICAgICAgICAgICQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5hZnRlcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4ndXNlIHN0cmljdCdcblxuXG5cdGlmICggJCgnYm9keScpLmhhc0NsYXNzKCd3aGVhdC1wcm9maXRhYmlsaXR5LWNhbGN1bGF0b3InKSApIHtcblxuXHRcdCQoJy50b2dnbGVNb2RhbCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnI2VtYWlsRGF0YScpLnNsaWRlRG93bigpXG5cdFx0IH0pO1xuXG5cdFx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHQgICQoJy50aGFua3lvdW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0JCgnI3Jlc2V0X2Zvcm0sI3RoYW5reW91X19zdGFydG92ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblx0XHR9KTtcblxuXHRcdCQoXCIjZW1haWxEYXRhRm9ybVwiKS5iaW5kKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZSkge1xuXHRcdCAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcblx0XHQgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBkZWZhdWx0IGV2ZW50XG5cdFx0ICAgfVxuXHRcdH0pO1xuXG5cblx0XHQkKCcjZG93bmxvYWRQREYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdCQoJyNwZGZEYXRhJykudmFsKEpTT04uc3RyaW5naWZ5KGRhdGFFeHRyYWN0KCkpKVxuXHRcdFx0JCgnI3BkZkZvcm0nKS5zdWJtaXQoKVxuXHRcdH0pXG5cblx0XHQkKCcjbWFpbFBERicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvL1ZhbGlkYXRlIEVtYWlsXG5cdFx0XHRmdW5jdGlvbiBpc19lbWFpbChlbWFpbCl7XG5cdFx0XHR2YXIgZW1haWxSZWcgPSAvXlthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVpdezIsNH0kLztcblx0XHRcdHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTsgfVxuXG5cdFx0XHR2YXIgZW1haWxJbnB1dCA9IGlzX2VtYWlsKCQoJyNyZWNpcGllbnRFbWFpbCcpLnZhbCgpKVxuXHRcdFx0dmFyIGVtYWlsRXJyb3IgPSAnPHNtYWxsIGNsYXNzPVwiZW1haWxFcnJvclwiPlBsZWFzZSBlbnRlciB2YWxpZCBlbWFpbC48L3NtYWxsJ1xuXG5cdFx0XHRpZiAoZW1haWxJbnB1dCA9PSBmYWxzZSkge1xuXHRcdFx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRpZiAoJCgnLmVtYWlsRXJyb3InKVswXSkge1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihlbWFpbEVycm9yKVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHQkKCcuZW1haWxFcnJvcicpLnJlbW92ZSgpXG5cdFx0XHRcdCQoJyNyZWNpcGllbnRFbWFpbCcpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJpbmhlcml0XCJ9KVxuXHRcdFx0XHR2YXIgcXVlcnlTdHJpbmdBZGQgPSAnJnJlY2lwaWVudHM9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKCcjcmVjaXBpZW50RW1haWwnKS52YWwoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc2VuZGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ25vLXJlcGx5QGhsa2FnZW5jeS5jb20nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZzdWJqZWN0PScgKyBlbmNvZGVVUklDb21wb25lbnQoJ1lvdXIgV2hlYXQgUHJvZml0YWJpbGl0eSBDYWxjdWxhdG9yIFJlc3VsdHMnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZmaXJzdE5hbWU9J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogJ2h0dHA6Ly9obGstcGRmLXNlcnZlci5jZW50cmFsdXMuY2xvdWRhcHAuYXp1cmUuY29tL2FwaS92MS9FbWFpbExpbms/dGVtcGxhdGVOYW1lPVdlc3RCcmVkX1Byb2ZpdENhbGMnICsgcXVlcnlTdHJpbmdBZGQsXG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdGRhdGE6ICd7IFwianNvblwiIDogJyArIEpTT04uc3RyaW5naWZ5KGRhdGFFeHRyYWN0KCkpICsgJ30nLFxuXHRcdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIG9wdHMgPSB7XG5cdFx0XHRcdFx0XHQgIGxpbmVzOiAxMyAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIHRvIGRyYXdcblx0XHRcdFx0XHRcdCwgbGVuZ3RoOiAyOCAvLyBUaGUgbGVuZ3RoIG9mIGVhY2ggbGluZVxuXHRcdFx0XHRcdFx0LCB3aWR0aDogMTQgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG5cdFx0XHRcdFx0XHQsIHJhZGl1czogNDIgLy8gVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG5cdFx0XHRcdFx0XHQsIHNjYWxlOiAwLjE1IC8vIFNjYWxlcyBvdmVyYWxsIHNpemUgb2YgdGhlIHNwaW5uZXJcblx0XHRcdFx0XHRcdCwgY29ybmVyczogMC4zIC8vIENvcm5lciByb3VuZG5lc3MgKDAuLjEpXG5cdFx0XHRcdFx0XHQsIGNvbG9yOiAnI2ZmZicgLy8gI3JnYiBvciAjcnJnZ2JiIG9yIGFycmF5IG9mIGNvbG9yc1xuXHRcdFx0XHRcdFx0LCBvcGFjaXR5OiAwIC8vIE9wYWNpdHkgb2YgdGhlIGxpbmVzXG5cdFx0XHRcdFx0XHQsIHJvdGF0ZTogMCAvLyBUaGUgcm90YXRpb24gb2Zmc2V0XG5cdFx0XHRcdFx0XHQsIGRpcmVjdGlvbjogMSAvLyAxOiBjbG9ja3dpc2UsIC0xOiBjb3VudGVyY2xvY2t3aXNlXG5cdFx0XHRcdFx0XHQsIHNwZWVkOiAxIC8vIFJvdW5kcyBwZXIgc2Vjb25kXG5cdFx0XHRcdFx0XHQsIHRyYWlsOiA4NSAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuXHRcdFx0XHRcdFx0LCBmcHM6IDIwIC8vIEZyYW1lcyBwZXIgc2Vjb25kIHdoZW4gdXNpbmcgc2V0VGltZW91dCgpIGFzIGEgZmFsbGJhY2sgZm9yIENTU1xuXHRcdFx0XHRcdFx0LCB6SW5kZXg6IDJlOSAvLyBUaGUgei1pbmRleCAoZGVmYXVsdHMgdG8gMjAwMDAwMDAwMClcblx0XHRcdFx0XHRcdCwgY2xhc3NOYW1lOiAnc3Bpbm5lcicgLy8gVGhlIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIHNwaW5uZXJcblx0XHRcdFx0XHRcdCwgdG9wOiAnLTIwcHgnIC8vIFRvcCBwb3NpdGlvbiByZWxhdGl2ZSB0byBwYXJlbnRcblx0XHRcdFx0XHRcdCwgbGVmdDogJzUwJScgLy8gTGVmdCBwb3NpdGlvbiByZWxhdGl2ZSB0byBwYXJlbnRcblx0XHRcdFx0XHRcdCwgc2hhZG93OiBmYWxzZSAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuXHRcdFx0XHRcdFx0LCBod2FjY2VsOiBmYWxzZSAvLyBXaGV0aGVyIHRvIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb25cblx0XHRcdFx0XHRcdCwgcG9zaXRpb246ICdyZWxhdGl2ZScgLy8gRWxlbWVudCBwb3NpdGlvbmluZ1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcihvcHRzKS5zcGluKClcblx0XHRcdFx0XHRcdCQoJyNtYWlsUERGJykuY3NzKCdjb2xvcicsICd0cmFuc3BhcmVudCcpO1xuXHRcdFx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihzcGlubmVyLmVsKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCgnI2VtYWlsRGF0YScpLmhpZGUoKVxuXHRcdFx0XHRcdCQoJyN0aGFua3lvdW1vZGFsJykuc2hvdygpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHR9KVxuXG5cdFx0ZnVuY3Rpb24gZGF0YUV4dHJhY3QgKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2VydEdlcm1pbmF0aW9uOiAkKCcjY2VydF9zZWVkX2dlcm1pbmF0aW9uJykudmFsKCksXG5cdFx0XHRcdGNlcnRQdXJlU2VlZDogJCgnI2NlcnRfc2VlZF9wdXJlX3NlZWQnKS52YWwoKSxcblx0XHRcdFx0Y2VydFNlZWRDb3N0OiAkKCcjY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRcdFx0c2F2ZWRHZXJtaW5hdGlvbjogJCgnI3NhdmVkX3NlZWRfZ2VybWluYXRpb24nKS52YWwoKSxcblx0XHRcdFx0c2F2ZWRQdXJlU2VlZDogJCgnI3NhdmVkX3NlZWRfcHVyZV9zZWVkJykudmFsKCksXG5cdFx0XHRcdHNhdmVkU2VlZENvc3Q6ICQoJyNzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnKS52YWwoKSxcblx0XHRcdFx0c2Vhc29uOiAkKCdpbnB1dFtuYW1lPVwiY3JvcF9zZWFzb25cIl06Y2hlY2tlZCcpLnZhbCgpLFxuXHRcdFx0XHR0YXJnZXRZaWVsZDogJCgnI2Nyb3BfdGFyZ2V0X3lpZWxkJykudmFsKCksXG5cdFx0XHRcdHdoZWF0UHJpY2U6ICQoJyNjcm9wX3doZWF0X3ByaWNlJykudmFsKCksXG5cdFx0XHRcdHRhcmdldFBsYW50UG9wdWxhdGlvbjogJCgnI2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nKS52YWwoKSxcblx0XHRcdFx0ZmxhdFNlZWRpbmdSYXRlOiAkKCcjY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZScpLnZhbCgpLFxuXHRcdFx0XHRhY3Jlc1BsYW50ZWQ6ICQoJyNjcm9wX2FjcmVzX3BsYW50ZWQnKS52YWwoKSxcblx0XHRcdFx0eWllbGRJbXBhY3RPdmVyc2VlZGluZzogJCgnI2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnKS52YWwoKSxcblx0XHRcdFx0eWllbGRJbXBhY3RVbmRlcnNlZWRpbmc6ICQoJyNjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZycpLnZhbCgpLFxuXHRcdFx0XHRpbXBhY3RDb21wYXJlR3JhcGg6ICQoJyNjb21wYXJlR3JhcGgnKS52YWwoKSxcblx0XHRcdFx0bWF4aW1pemVSZXZlbnVlR3JhcGg6ICQoJyNyZXZlbnVlR3JhcGgnKS52YWwoKVxuXHRcdFx0fVxuXHRcdH1cblxuXG5cblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBNYWluIGFwcCBzdGFydHVwXG5cblx0XHRcdHZhciBVdGlsaXR5ID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gR2V0IHRoZSB0b3AgcG9zaXRpb24gb2YgYW4gZWxlbWVudCBpbiB0aGUgZG9jdW1lbnRcblx0XHRcdFx0Ly8gRnJvbSBzbW9vdGhTY3JvbGwsIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGljZWxpZXV0aWVyL3Ntb290aFNjcm9sbC9ibG9iL21hc3Rlci9zbW9vdGhzY3JvbGwuanNcblx0XHRcdFx0dmFyIGdldFRvcCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdFx0XHQvLyByZXR1cm4gdmFsdWUgb2YgaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLi4uIElFIDogMCwgb3RoZXIgYnJvd3NlcnMgOiAtcGFnZVlPZmZzZXRcblx0XHRcdFx0XHRpZihlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHJldHVybiAtd2luZG93LnBhZ2VZT2Zmc2V0XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IHRoZSBjdXJyZW50IHNjcmVlbiB2aWV3cG9ydCB3aWR0aFxuXHRcdFx0XHR2YXIgZ2V0Vmlld3BvcnRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRkIGRpZ2l0IHNlcGFyYXRvciBjaGFyYWN0ZXJzIHRvIGEgbnVtZXJpYyBzdHJpbmdcblx0XHRcdFx0dmFyIGFkZERpZ2l0U2VwYXJhdG9ycyA9IGZ1bmN0aW9uIChudW0pIHtcblx0XHRcdFx0XHR2YXIgbiA9IG51bS50b1N0cmluZygpXG5cdFx0XHRcdFx0dmFyIHAgPSBuLmluZGV4T2YoJy4nKVxuXHRcdFx0XHRcdHJldHVybiBuLnJlcGxhY2UoL1xcZCg/PSg/OlxcZHszfSkrKD86XFwufCQpKS9nLCBmdW5jdGlvbiAoJDAsIGkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBwIDwgMCB8fCBpIDwgcCA/ICgkMCArICcsJykgOiAkMFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZXR1cm4gdGhlIGNoYXJhY3RlciByZXByZXNlbnRhdGlvbiBvZiBJbmZpbml0eVxuXHRcdFx0XHR2YXIgZ2V0SW5maW5pdHlDaGFyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiAn4oieJ1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9ybWF0IGEgbnVtYmVyIGZvciBkaXNwbGF5XG5cdFx0XHRcdHZhciBmb3JtYXROdW1iZXIgPSBmdW5jdGlvbiAobnVtYmVyLCBkZWNpbWFscywgc2hvd1Bvc2l0aXZlKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChudW1iZXIpXG5cdFx0XHRcdFx0aWYgKCFpc05hTih2YWx1ZSkgJiYgaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGRlY2ltYWxzICE9PSAndW5kZWZpbmVkJyAmJiBkZWNpbWFscyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHQvLyBLZWVwIGEgc2V0IG51bWJlciBvZiBkZWNpbWFscywgZXZlbiBpZiB6ZXJvZXNcblx0XHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHZhbHVlKS50b0ZpeGVkKGRlY2ltYWxzKSlcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIEp1c3QgdHJ1bmNhdGUgdG8gYSBmaXhlZCBudW1iZXIgb2YgZGVjaW1hbHMsIGJ1dCBkb24ndCBwcmVzZXJ2ZSB0cmFpbGluZyB6ZXJvZXNcblx0XHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHBhcnNlRmxvYXQodmFsdWUudG9GaXhlZCgyKSkpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZ2V0SW5maW5pdHlDaGFyKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JtYXQgYSBudW1iZXIgYXMgY3VycmVueSBmb3IgZGlzcGxheVxuXHRcdFx0XHR2YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbiAobnVtYmVyLCBzaG93RGVjaW1hbHMsIHNob3dQb3NpdGl2ZSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobnVtYmVyKVxuXHRcdFx0XHRcdGlmICghaXNOYU4odmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSA8IDAgPyAnLSAnIDogKHNob3dQb3NpdGl2ZSA9PT0gdHJ1ZSA/ICcrICcgOiAnJykpICsgJyQnICsgYWRkRGlnaXRTZXBhcmF0b3JzKE1hdGguYWJzKHZhbHVlKS50b0ZpeGVkKHNob3dEZWNpbWFscyA9PT0gdHJ1ZSA/IDIgOiAwKSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGdldEluZmluaXR5Q2hhcigpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ29udmVydCBhIGZvcm1hdHRlZCBudW1iZXIgYmFjayBpbnRvIGFuIGFjdHVhbCBudW1iZXJcblx0XHRcdFx0dmFyIHVuZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgvW14tXFxkXFwuZV0vZywgJycpLnRyaW0oKSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcm1hdCBhIGlucHV0IGZpZWxkIGFjY29yZGluZyB0byB0aGUgXCJkYXRhLWZvcm1hdFwiIGF0dHJpYnV0ZVxuXHRcdFx0XHR2YXIgZm9ybWF0VmFsdWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdGlmICghZWxlbWVudCB8fCAoZWxlbWVudCAmJiAhZWxlbWVudC52YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnJ1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgZWxlbWVudC52YWx1ZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LnZhbHVlXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGZvcm1hdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkuZGF0YXNldC5mb3JtYXRcblxuXHRcdFx0XHRcdHN3aXRjaCAoZm9ybWF0KSB7XG5cdFx0XHRcdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpKVxuXG5cdFx0XHRcdFx0XHRjYXNlICdzaWduZWRudW1iZXInOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0TnVtYmVyKHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpLCBudWxsLCB0cnVlKVxuXG5cdFx0XHRcdFx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgMClcblxuXHRcdFx0XHRcdFx0Y2FzZSAnZml4ZWQyJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgMilcblxuXHRcdFx0XHRcdFx0Y2FzZSAnY3VycmVuY3knOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0Q3VycmVuY3kodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSkpXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWx1ZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRnZXRUb3A6IGdldFRvcCxcblx0XHRcdFx0XHRnZXRWaWV3cG9ydFdpZHRoOiBnZXRWaWV3cG9ydFdpZHRoLFxuXHRcdFx0XHRcdGFkZERpZ2l0U2VwYXJhdG9yczogYWRkRGlnaXRTZXBhcmF0b3JzLFxuXHRcdFx0XHRcdGdldEluZmluaXR5Q2hhcjogZ2V0SW5maW5pdHlDaGFyLFxuXHRcdFx0XHRcdGZvcm1hdE51bWJlcjogZm9ybWF0TnVtYmVyLFxuXHRcdFx0XHRcdGZvcm1hdEN1cnJlbmN5OiBmb3JtYXRDdXJyZW5jeSxcblx0XHRcdFx0XHR1bmZvcm1hdE51bWJlcjogdW5mb3JtYXROdW1iZXIsXG5cdFx0XHRcdFx0Zm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdH0oKSlcblxuXHRcdFx0dmFyIFNlZWRDYWxjRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBTRUVEU19QRVJfTEJfTUlOID0gOTAwMFxuXHRcdFx0XHR2YXIgU0VFRFNfUEVSX0xCX01BWCA9IDE4MDAwXG5cdFx0XHRcdHZhciBTRUVEU19QRVJfTEJfU1RFUCA9IDUwMFxuXG5cdFx0XHRcdHZhciBTZWVkQ2FsY1VzZXJEYXRhID0gZnVuY3Rpb24gKGNlcnRpZmllZCkge1xuXHRcdFx0XHRcdC8vIFByb3BlcnRpZXNcblx0XHRcdFx0XHR0aGlzLnNlYXNvbiA9ICd3aW50ZXInIC8vIHNwcmluZ3x3aW50ZXJcblxuXHRcdFx0XHRcdHRoaXMucGVyY2VudEdlcm1pbmF0aW9uID0gMFxuXHRcdFx0XHRcdHRoaXMucGVyY2VudFB1cmVTZWVkID0gMFxuXHRcdFx0XHRcdHRoaXMuY29zdFBlckNXVCA9IDBcblx0XHRcdFx0XHR0aGlzLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy53aGVhdFByaWNlUGVyQnVzaGVsID0gMFxuXHRcdFx0XHRcdHRoaXMudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMFxuXHRcdFx0XHRcdHRoaXMuZmxhdFJhdGVMYlBlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy5hY3Jlc1BsYW50ZWQgPSAwXG5cblx0XHRcdFx0XHR0aGlzLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMCAvLyBwZXIgMTAwLDAwMCBzZWVkcyBwZXIgYWNyZVxuXHRcdFx0XHRcdHRoaXMub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAgLy8gcGVyIDEwMCwwMDAgc2VlZHMgcGVyIGFjcmVcblxuXHRcdFx0XHRcdC8vIE90aGVyXG5cdFx0XHRcdFx0dGhpcy5pc0NlcnRpZmllZCA9ICEhY2VydGlmaWVkXG5cblx0XHRcdFx0XHQvLyBNZXRob2RzXG5cdFx0XHRcdFx0dGhpcy5yZXNldFRvRGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5pc0NlcnRpZmllZCkge1xuXHRcdFx0XHRcdFx0XHRzZXRDZXJ0aWZpZWRTZWVkRGVmYXVsdHModGhpcylcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNldFNhdmVkU2VlZERlZmF1bHRzKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gSW5pdGlhbGl6ZVxuXHRcdFx0XHRcdHRoaXMucmVzZXRUb0RlZmF1bHRzKClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBPcHRpbWFsU2VlZGluZ1JhdGVJbXBhY3REYXRhID0gZnVuY3Rpb24gKHNlZWRzUGVyTGIpIHtcblx0XHRcdFx0XHQvLyBDYWxjdWxhdGVkXG5cdFx0XHRcdFx0dGhpcy55aWVsZEFkdmFudGFnZUJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gMFxuXHRcdFx0XHRcdHRoaXMuc2VlZHNQZXJBY3JlUmVxdWlyZWQgPSAwXG5cdFx0XHRcdFx0dGhpcy5jb3N0UGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLnRvdGFsU2VlZENvc3QgPSAwXG5cdFx0XHRcdFx0dGhpcy5hY3R1YWxTZWVkaW5nUmF0ZSA9IDBcblx0XHRcdFx0XHR0aGlzLnNlZWRpbmdSYXRlVnNUYXJnZXQgPSAwXG5cdFx0XHRcdFx0dGhpcy5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QgPSAwXG5cdFx0XHRcdFx0dGhpcy5mbGF0UmF0ZUNvc3RQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMuY29zdFBlckFjcmVEaWZmZXJlbmNlID0gMFxuXHRcdFx0XHRcdHRoaXMudG90YWxTZWVkQ29zdCA9IDBcblx0XHRcdFx0XHR0aGlzLnRvdGFsU2VlZENvc3REaWZmZXJlbnRpYWwgPSAwXG5cdFx0XHRcdFx0dGhpcy5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgPSAwXG5cdFx0XHRcdFx0dGhpcy5uZXRSZXZlbnVlTGJQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZUJlbmVmaXQgPSAwXG5cblx0XHRcdFx0XHQvLyBPdGhlclxuXHRcdFx0XHRcdHRoaXMuc2VlZHNQZXJMYiA9IHNlZWRzUGVyTGJcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzZXRDZXJ0aWZpZWRTZWVkRGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdFx0XHR1c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSAwLjk1XG5cdFx0XHRcdFx0dXNlckRhdGEucGVyY2VudFB1cmVTZWVkID0gMC45ODVcblx0XHRcdFx0XHR1c2VyRGF0YS5jb3N0UGVyQ1dUID0gMThcblx0XHRcdFx0XHR1c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gODBcblx0XHRcdFx0XHR1c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gMy41XG5cdFx0XHRcdFx0dXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gMTAwMDAwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gMTAwXG5cdFx0XHRcdFx0dXNlckRhdGEuYWNyZXNQbGFudGVkID0gMjUwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cdFx0XHRcdFx0dXNlckRhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXG5cdFx0XHRcdFx0dXNlckRhdGEuaXNDZXJ0aWZpZWQgPSB0cnVlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgc2V0U2F2ZWRTZWVkRGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdFx0XHR1c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSAwLjkzXG5cdFx0XHRcdFx0dXNlckRhdGEucGVyY2VudFB1cmVTZWVkID0gMC45NVxuXHRcdFx0XHRcdHVzZXJEYXRhLmNvc3RQZXJDV1QgPSA3LjQ2XG5cdFx0XHRcdFx0dXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDgwXG5cdFx0XHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0XHRcdHVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDEwMDAwMDBcblx0XHRcdFx0XHR1c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IDEwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdFx0XHR1c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXHRcdFx0XHRcdHVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblxuXHRcdFx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gZmFsc2Vcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBjYWxjdWxhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGRhdGEuc2VlZExiUGVyQWNyZVJlcXVpcmVkID0gZGF0YS51c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gLyAoZGF0YS5zZWVkc1BlckxiICogZGF0YS51c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvbilcblxuXHRcdFx0XHRcdGRhdGEuc2VlZHNQZXJBY3JlUmVxdWlyZWQgPSBkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCAqIGRhdGEuc2VlZHNQZXJMYlxuXG5cdFx0XHRcdFx0ZGF0YS5jb3N0UGVyQWNyZSA9IGRhdGEudXNlckRhdGEuY29zdFBlckNXVCAqIChkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCAvIDEwMClcblxuXHRcdFx0XHRcdGRhdGEudG90YWxTZWVkQ29zdCA9IGRhdGEuY29zdFBlckFjcmUgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRcdFx0ZGF0YS5hY3R1YWxTZWVkaW5nUmF0ZSA9IGRhdGEudXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgKiBkYXRhLnNlZWRzUGVyTGIgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCAqIGRhdGEudXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uXG5cblx0XHRcdFx0XHRkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgPSBkYXRhLmFjdHVhbFNlZWRpbmdSYXRlIC0gZGF0YS51c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb25cblxuXHRcdFx0XHRcdGRhdGEub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0ID0gZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IDwgMFxuXHRcdFx0XHRcdFx0PyAoZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0IC8gMTAwMDAwKSAqIGRhdGEudXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgKiBkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmVcblx0XHRcdFx0XHRcdDogKGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCAvIDEwMDAwMCkgKiBkYXRhLnVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgKiBkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKiAtMVxuXG5cdFx0XHRcdFx0ZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlID0gZGF0YS51c2VyRGF0YS5jb3N0UGVyQ1dUICogKGRhdGEudXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgLyAxMDApXG5cblx0XHRcdFx0XHRkYXRhLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSA9IGRhdGEuY29zdFBlckFjcmUgLSBkYXRhLmZsYXRSYXRlQ29zdFBlckFjcmVcblxuXHRcdFx0XHRcdGRhdGEudG90YWxTZWVkQ29zdEZsYXRSYXRlID0gZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0XHRcdGRhdGEudG90YWxTZWVkQ29zdEZsYXRSYXRlRGlmZmVyZW50aWFsID0gZGF0YS5jb3N0UGVyQWNyZURpZmZlcmVuY2UgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZFxuXG5cdFx0XHRcdFx0ZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSA9IGRhdGEudXNlckRhdGEuaXNDZXJ0aWZpZWQgPyAoZGF0YS51c2VyRGF0YS5zZWFzb24udG9Mb3dlckNhc2UoKSA9PT0gJ3NwcmluZycgPyA0LjUgOiA3LjUpIDogMFxuXG5cdFx0XHRcdFx0ZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlID0gKChkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKyBkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlKSAqIGRhdGEudXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkKSAtIGRhdGEudG90YWxTZWVkQ29zdFxuXG5cdFx0XHRcdFx0ZGF0YS5uZXRSZXZlbnVlTGJQZXJBY3JlID0gKChkYXRhLnVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgKyBkYXRhLnBvdGVudGlhbFlpZWxkQmVuZWZpdEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5vdmVyVW5kZXJTZWVkaW5nUG90ZW50aWFsWWllbGRJbXBhY3QpICogZGF0YS51c2VyRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWQpIC0gZGF0YS50b3RhbFNlZWRDb3N0XG5cblx0XHRcdFx0XHRkYXRhLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWVCZW5lZml0ID0gZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlIC0gZGF0YS5uZXRSZXZlbnVlTGJQZXJBY3JlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZ2V0RGF0YVNlcmllcyA9IGZ1bmN0aW9uICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdHZhciBzZXJpZXMgPSBbXVxuXG5cdFx0XHRcdFx0Zm9yICh2YXIgc2VlZHNQZXJMYiA9IFNFRURTX1BFUl9MQl9NSU47IHNlZWRzUGVyTGIgPD0gU0VFRFNfUEVSX0xCX01BWDsgc2VlZHNQZXJMYiArPSBTRUVEU19QRVJfTEJfU1RFUCkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGFJdGVtID0gbmV3IE9wdGltYWxTZWVkaW5nUmF0ZUltcGFjdERhdGEoc2VlZHNQZXJMYilcblxuXHRcdFx0XHRcdFx0Ly8gTWVyZ2UgaW4gdGhlIHVzZXJEYXRhIHByb3BlcnRpZXNcblx0XHRcdFx0XHRcdGRhdGFJdGVtLnVzZXJEYXRhID0ge31cblx0XHRcdFx0XHRcdGZvciAodmFyIHByb3AgaW4gdXNlckRhdGEpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHVzZXJEYXRhLmhhc093blByb3BlcnR5KHByb3ApICYmIHR5cGVvZiB1c2VyRGF0YVtwcm9wXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFJdGVtLnVzZXJEYXRhW3Byb3BdID0gdXNlckRhdGFbcHJvcF1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjYWxjdWxhdGUoZGF0YUl0ZW0pXG5cdFx0XHRcdFx0XHRzZXJpZXMucHVzaChkYXRhSXRlbSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gc2VyaWVzXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZ2V0U2VyaWVzQ29sdW1uRGF0YSA9IGZ1bmN0aW9uIChzZXJpZXMsIGNvbHVtbikge1xuXHRcdFx0XHRcdHZhciBkYXRhID0gW11cblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgc2VyaWVzW2ldOyBpKyspIHtcblx0XHRcdFx0XHRcdGRhdGEucHVzaChzZXJpZXNbaV1bY29sdW1uXSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gZGF0YVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRTZWVkQ2FsY1VzZXJEYXRhOiBTZWVkQ2FsY1VzZXJEYXRhLFxuXHRcdFx0XHRcdGdldERhdGFTZXJpZXM6IGdldERhdGFTZXJpZXMsXG5cdFx0XHRcdFx0Z2V0U2VyaWVzQ29sdW1uRGF0YTogZ2V0U2VyaWVzQ29sdW1uRGF0YVxuXHRcdFx0XHR9XG5cdFx0XHR9KCkpXG5cblx0XHRcdHZhciBTZWVkQ2FsYyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIENPTlNUQU5UU1xuXHRcdFx0XHR2YXIgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9XSURUSCA9IDQwMCAgIC8vIG1heCB3aWR0aCBmb3Igc21hbGwgZGV2aWNlc1xuXHRcdFx0XHR2YXIgQ0hBUlRfTU9CSUxFX1NNQUxMX01BWF9IRUlHSFQgPSAyNjcgIC8vIG1heCBoZWlnaHQgZm9yIHNtYWxsIGRldmljZXNcblx0XHRcdFx0dmFyIENIQVJUX01PQklMRV9NQVhfV0lEVEggPSA2MDAgICAvLyBtYXggd2lkdGggZm9yIG1vYmlsZSBkZXZpY2VzXG5cdFx0XHRcdHZhciBDSEFSVF9NT0JJTEVfTUFYX0hFSUdIVCA9IDMwMCAgLy8gbWF4IGhlaWdodCBmb3IgbW9iaWxlIGRldmljZXNcblx0XHRcdFx0dmFyIENIQVJUX01BWF9XSURUSCA9IDYwMFxuXHRcdFx0XHR2YXIgQ0hBUlRfTUFYX0hFSUdIVCA9IDMwMFxuXHRcdFx0XHR2YXIgQ09MT1JfREFSS19SRUQgPSAnIzUyOTNBQidcblx0XHRcdFx0dmFyIENPTE9SX0xJR0hUX1JFRCA9ICcjNzJiMWM4J1xuXHRcdFx0XHR2YXIgQ09MT1JfREFSS19CTFVFID0gJyMzNzM4MzYnXG5cdFx0XHRcdHZhciBDT0xPUl9MSUdIVF9CTFVFID0gJyM2NDY1NjAnXG5cblx0XHRcdFx0Ly8gUFJPUEVSVElFU1xuXG5cdFx0XHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YSA9IG5ldyBTZWVkQ2FsY0RhdGEuU2VlZENhbGNVc2VyRGF0YSh0cnVlKVxuXHRcdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YSA9IG5ldyBTZWVkQ2FsY0RhdGEuU2VlZENhbGNVc2VyRGF0YSgpXG5cblx0XHRcdFx0Ly8gTUVUSE9EU1xuXG5cdFx0XHRcdHZhciBpc01vYmlsZVNtYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKSA8IENIQVJUX01PQklMRV9TTUFMTF9NQVhfV0lEVEhcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBpc01vYmlsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKCkgPCBDSEFSVF9NT0JJTEVfTUFYX1dJRFRIXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblx0XHRcdFx0XHRmb3JtLmNsYXNzTGlzdC5hZGQoJ2NhbGN1bGF0ZWQnKVxuXG5cdFx0XHRcdFx0Ly8gR2V0IGZvcm0gZmllbGQgZGF0YVxuXHRcdFx0XHRcdHVwZGF0ZVVzZXJEYXRhRnJvbUZvcm0oKVxuXG5cdFx0XHRcdFx0Ly8gU2Nyb2xsIHRvIGZpcnN0IGdyYXBoIChzZXQgYSBkZWxheSB0byBhbGxvdyB0aGUgc2VjdGlvbnMgdG8gYmVjb21lIHZpc2libGUpXG5cdFx0XHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBcdHZhciBoZWFkZXJCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1zaXRlLW5hdi13cmFwcGVyLWhlYWRlcicpLFxuXHRcdFx0XHRcdC8vIFx0XHRoZWFkZXJCYXJGaXhlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhlYWRlckJhcikucG9zaXRpb24gPT09ICdmaXhlZCcsXG5cdFx0XHRcdFx0Ly8gXHRcdG9mZnNldCA9IGhlYWRlckJhckZpeGVkID8gLWhlYWRlckJhci5jbGllbnRIZWlnaHQgOiAwLFxuXHRcdFx0XHRcdC8vIFx0XHR0b3AgPSBVdGlsaXR5LmdldFRvcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsYy1zZWN0aW9uJykpICsgb2Zmc2V0XG5cdFx0XHRcdFx0Ly8gXHRzbW9vdGhTY3JvbGwodG9wKVxuXHRcdFx0XHRcdC8vIH0sIDUwKVxuXG5cdFx0XHRcdFx0Ly8gUmUtcmVuZGVyIHRoZSBncmFwaHNcblx0XHRcdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhjZXJ0aWZpZWRTZWVkRGF0YSlcblx0XHRcdFx0XHR2YXIgc2F2ZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKHNhdmVkU2VlZERhdGEpXG5cdFx0XHRcdFx0dXBkYXRlR3JhcGhzKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSBDYWxjdWxhdGUgYnV0dG9uIHRleHRcblx0XHRcdFx0XHR2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZScpXG5cdFx0XHRcdFx0aWYgKGJ0bi50ZXh0Q29udGVudCA9PT0gJ0NhbGN1bGF0ZScpIHtcblx0XHRcdFx0XHRcdGJ0bi50ZXh0Q29udGVudCA9ICdSZS1DYWxjdWxhdGUnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB1cGRhdGVVc2VyRGF0YUZyb21Gb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkID0gcGFyc2VGbG9hdChmb3JtWydjZXJ0X3NlZWRfcHVyZV9zZWVkJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuY29zdFBlckNXVCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0XHRcdHNhdmVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdFx0c2F2ZWRTZWVkRGF0YS5wZXJjZW50UHVyZVNlZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ3NhdmVkX3NlZWRfcHVyZV9zZWVkJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdFx0c2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSlcblxuXHRcdFx0XHRcdC8vIFRoZXNlIGZpZWxkcyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBpbiBib3RoIGRhdGFzZXRzXG5cdFx0XHRcdFx0dmFyIHNlYXNvbnMgPSBmb3JtWydjcm9wX3NlYXNvbiddXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWFzb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoc2Vhc29uc1tpXS5jaGVja2VkKSBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPSBzYXZlZFNlZWREYXRhLnNlYXNvbiA9IHNlYXNvbnNbaV0udmFsdWVcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID0gc2F2ZWRTZWVkRGF0YS5zZWFzb24gPSBmb3JtWydjcm9wX3NlYXNvbiddLnZhbHVlXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IHNhdmVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF90YXJnZXRfeWllbGQnXS52YWx1ZSlcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gc2F2ZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUpXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gc2F2ZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfdGFyZ2V0X3BsYW50aW5nX3BvcHVsYXRpb24nXS52YWx1ZSlcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IHNhdmVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnXS52YWx1ZSlcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWQgPSBzYXZlZFNlZWREYXRhLmFjcmVzUGxhbnRlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9hY3Jlc19wbGFudGVkJ10udmFsdWUpXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IHNhdmVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZyddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gc2F2ZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB1cGRhdGVGb3JtRnJvbVVzZXJEYXRhID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblxuXHRcdFx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRcdFx0Zm9ybVsnY2VydF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkICogMTAwXG5cdFx0XHRcdFx0Zm9ybVsnY2VydF9zZWVkX2Nvc3RfcGVyX3VuaXQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmNvc3RQZXJDV1RcblxuXHRcdFx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEucGVyY2VudEdlcm1pbmF0aW9uICogMTAwXG5cdFx0XHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSA9IHNhdmVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkICogMTAwXG5cdFx0XHRcdFx0Zm9ybVsnc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUgPSBzYXZlZFNlZWREYXRhLmNvc3RQZXJDV1RcblxuXHRcdFx0XHRcdC8vIFRoZXNlIGZpZWxkcyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBpbiBib3RoIGRhdGFzZXRzLCBzbyBqdXN0IHVzZSB0aGUgZmlyc3Qgb25lXG5cdFx0XHRcdFx0Ly8gZm9ybVsnY3JvcF9zZWFzb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiAvLyBicm9rZW4gaW4gU2FmYXJpXG5cdFx0XHRcdFx0aWYgKGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9PT0gJ3dpbnRlcicpIHtcblx0XHRcdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMF0uY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Zm9ybVsnY3JvcF9zZWFzb24nXVsxXS5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3JtWydjcm9wX3RhcmdldF95aWVsZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZVxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3Bfd2hlYXRfcHJpY2UnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLndoZWF0UHJpY2VQZXJCdXNoZWxcblx0XHRcdFx0XHRmb3JtWydjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb25cblx0XHRcdFx0XHRmb3JtWydjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZVxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfYWNyZXNfcGxhbnRlZCddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuYWNyZXNQbGFudGVkXG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF9vdmVyc2VlZGluZyddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEub3ZlclNlZWRpbmdZaWVsZEltcGFjdFxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHNob3dSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSByZXNldCBsaW5rIGlzIHZpc2libGVcblx0XHRcdFx0XHR2YXIgcmVzZXRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKTtcblx0XHRcdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaGlkZVJlc2V0TGluayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIHJlc2V0IGxpbmsgaXMgdmlzaWJsZVxuXHRcdFx0XHRcdHZhciByZXNldExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfZm9ybScpO1xuXHRcdFx0XHRcdHJlc2V0TGluay5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciByZXNldElucHV0cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBSZXNldCB0aGUgZGF0YSB2YWx1ZXMgdG8gZGVmYXVsdHNcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5yZXNldFRvRGVmYXVsdHMoKVxuXHRcdFx0XHRcdHNhdmVkU2VlZERhdGEucmVzZXRUb0RlZmF1bHRzKClcblxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBmb3JtIGZpZWxkIHZhbHVlc1xuXHRcdFx0XHRcdHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEoKVxuXG5cdFx0XHRcdFx0Ly8gSGlkZSB0aGUgcmVzZXQgbGluayBhZ2FpblxuXHRcdFx0XHRcdGhpZGVSZXNldExpbmsoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBnZXRDaGFydENhbnZhc0h0bWwgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0XHR2YXIgdmlld3BvcnRXaWR0aCA9IFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpXG5cdFx0XHRcdFx0dmFyIGNhbnZhc1NpemUgPSB7XG5cdFx0XHRcdFx0XHR3aWR0aDogaXNNb2JpbGUoKSA/IHZpZXdwb3J0V2lkdGggOiBDSEFSVF9NQVhfV0lEVEgsXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGlzTW9iaWxlU21hbGwoKSA/IENIQVJUX01PQklMRV9TTUFMTF9NQVhfSEVJR0hUIDogaXNNb2JpbGUoKSA/IENIQVJUX01PQklMRV9NQVhfSEVJR0hUIDogQ0hBUlRfTUFYX0hFSUdIVFxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBodG1sID0gJzxjYW52YXMgaWQ9XCInICsgaWQgKyAnXCIgY2xhc3M9XCJncmFwaCBibG9jay1jZW50ZXJcIiB3aWR0aD1cIicgKyBjYW52YXNTaXplLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyBjYW52YXNTaXplLmhlaWdodCArICdcIj48L2NhbnZhcz4nXG5cblx0XHRcdFx0XHRyZXR1cm4gaHRtbFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHNldENoYXJ0RGVmYXVsdHMgPSBmdW5jdGlvbiAoYW5pbWF0ZSkge1xuXHRcdFx0XHRcdC8vIEdsb2JhbCBjaGFydCBjb25maWdcblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRGYW1pbHkgPSAnXCJHb3RoYW0gU1NtIEFcIiwgXCJHb3RoYW0gU1NtIEJcIiwgTHVjaWRhIEdyYW5kZSwgXCJMdWNpZGEgR3JhbmRlXCIsIEx1Y2lkYSBTYW5zIFVuaWNvZGUsIFwiTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBMdWNpZGEgU2FucywgXCJMdWNpZGEgU2Fuc1wiLCBHZW5ldmEsIFZlcmRhbmEsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDE2XG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMubGluZS5ib3JkZXJXaWR0aCA9IDJcblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMubGluZS5maWxsID0gZmFsc2VcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgPSA1XG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmJvcmRlcldpZHRoID0gMlxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmFuaW1hdGlvbi5kdXJhdGlvbiA9IGFuaW1hdGUgPT09IGZhbHNlID8gMCA6IDEwMDBcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5sZWdlbmQuZGlzcGxheSA9IGZhbHNlXG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZXZlbnRzID0gdW5kZWZpbmVkIC8vIGlnbm9yZSBtb3VzZS90b3VjaCBldmVudHNcblxuXHRcdFx0XHRcdC8vIHNwZWNpYWwgc2V0dGluZ3MgZm9yIHNtYWxsZXIgc2NyZWVuIHNpemVzXG5cdFx0XHRcdFx0aWYgKGlzTW9iaWxlU21hbGwoKSkge1xuXHRcdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDExXG5cdFx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gMlxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNNb2JpbGUoKSkge1xuXHRcdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZSA9IDEyXG5cdFx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gNFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB1cGRhdGVHcmFwaENvbXBhcmVJbXBhY3QgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpIHtcblx0XHRcdFx0XHQvLyBTZXQgdXAgZ3JhcGggY2FudmFzXG5cdFx0XHRcdFx0dmFyIGNoYXJ0SWQgPSAnZ3JhcGhfY29tcGFyZV9pbXBhY3QnXG5cdFx0XHRcdFx0dmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19zZWN0aW9uJylcblx0XHRcdFx0XHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3dyYXBwZXInKVxuXHRcdFx0XHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19sZWdlbmQnKVxuXHRcdFx0XHRcdHZhciBjYW52YXMgPSBnZXRDaGFydENhbnZhc0h0bWwoY2hhcnRJZClcblx0XHRcdFx0XHR2YXIgbW9iaWxlID0gaXNNb2JpbGUoKVxuXHRcdFx0XHRcdHZhciBtb2JpbGVTbWFsbCA9IGlzTW9iaWxlU21hbGwoKVxuXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSAnaGlkZGVuJyBDU1MgY2xhc3Ncblx0XHRcdFx0XHRzZWN0aW9uLmNsYXNzTmFtZSA9IHNlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoL1xccypcXGJoaWRkZW5cXGIvZywgJycpXG5cblx0XHRcdFx0XHQvLyBkZXN0cm95IGFuZCByZWNyZWF0ZSB0aGUgY2FudmFzXG5cdFx0XHRcdFx0aWYgKHdyYXBwZXIuaGFzQ2hpbGROb2RlcygpKSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuY2hpbGROb2Rlc1swXSlcblx0XHRcdFx0XHR3cmFwcGVyLmlubmVySFRNTCA9IGNhbnZhc1xuXG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSB4LWF4aXMgbGFiZWxzXG5cdFx0XHRcdFx0dmFyIHhMYWJlbHMgPSBbXVxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1tpXTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR4TGFiZWxzLnB1c2goY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV0uc2VlZHNQZXJMYi50b1N0cmluZygpKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIENvbmZpZ3VyZSBhbmQgcmVuZGVyIHRoZSBjaGFydFxuXHRcdFx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0XHRcdHZhciBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdsaW5lJyxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bGFiZWxzOiB4TGFiZWxzLFxuXHRcdFx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsICdvcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlJyksXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdjaXJjbGUnLFxuXHRcdFx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19jaXJjbGUtbGluZS1ibHVlLXNvbGlkLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCAnbmV0UmV2ZW51ZUxiUGVyQWNyZScpLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ2NpcmNsZScsXG5cdFx0XHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX2NpcmNsZS1saW5lLWJsdWUucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgT3B0aW1hbCBTZWVkaW5nIFJhdGUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShzYXZlZFNlZWREYXRhU2VyaWVzLCAnb3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZScpLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRSYWRpdXM6IENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgKyAxLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdyZWN0Jyxcblx0XHRcdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fc3F1YXJlLWxpbmUtZGFyay1zb2xpZC5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnU2F2ZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBMYnMvQSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKHNhdmVkU2VlZERhdGFTZXJpZXMsICduZXRSZXZlbnVlTGJQZXJBY3JlJyksXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFJhZGl1czogQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyArIDEsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRTdHlsZTogJ3JlY3QnLFxuXHRcdFx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19zcXVhcmUtbGluZS1kYXJrLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0c2NhbGVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0eEF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogJ2JvdHRvbScsXG5cdFx0XHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnU2VlZHMvTGInLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5kZXggJSAyID09PSAwID8gVXRpbGl0eS5hZGREaWdpdFNlcGFyYXRvcnModmFsdWUpIDogJydcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmZvcm1hdEN1cnJlbmN5KHZhbHVlLCBmYWxzZSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXG5cdFx0ICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAkKCcjY29tcGFyZUdyYXBoJykudmFsKGNoYXJ0LnRvQmFzZTY0SW1hZ2UoKSlcblx0XHQgICAgICB9LCAxNTAwKVxuXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0XHRcdGxlZ2VuZC5jbGFzc0xpc3QuYWRkKCdjYWxjLWNoYXJ0LXR5cGUtJyArIGNoYXJ0LmNvbmZpZy50eXBlKTtcblxuXHRcdFx0XHRcdHZhciBsZWdlbmRIdG1sID0gJzxkaXY+J1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzxkaXY+PGltZyBjbGFzcz1cImNhbGMtbGVnZW5kLWljb25cIiBzcmM9XCInICsgaXRlbS5sZWdlbmRJY29uSW1hZ2UgKyAnXCIgYWx0PVwiXCI+IDxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtbGFiZWxcIj4nICsgaXRlbS5sYWJlbCArICc8L3NwYW4+PC9kaXY+J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0XHRcdGxlZ2VuZC5pbm5lckhUTUwgPSBsZWdlbmRIdG1sXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXBkYXRlR3JhcGhNYXhpbWl6ZVJldmVudWUgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMpIHtcblx0XHRcdFx0XHQvLyBSZXNldCBzb21lIGdsb2JhbCBjaGFydCBkZWZhdWx0c1xuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5tYWludGFpbkFzcGVjdFJhdGlvID0gdHJ1ZVxuXG5cdFx0XHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0XHRcdHZhciBjaGFydElkID0gJ2dyYXBoX21heGltaXplX3JldmVudWUnXG5cdFx0XHRcdFx0dmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19zZWN0aW9uJylcblx0XHRcdFx0XHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoYXJ0SWQgKyAnX3dyYXBwZXInKVxuXHRcdFx0XHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ19sZWdlbmQnKVxuXHRcdFx0XHRcdHZhciBjYW52YXMgPSBnZXRDaGFydENhbnZhc0h0bWwoY2hhcnRJZClcblxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgJ2hpZGRlbicgQ1NTIGNsYXNzXG5cdFx0XHRcdFx0c2VjdGlvbi5jbGFzc05hbWUgPSBzZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqXFxiaGlkZGVuXFxiL2csICcnKVxuXG5cdFx0XHRcdFx0Ly8gZGVzdHJveSBhbmQgcmVjcmVhdGUgdGhlIGNhbnZhc1xuXHRcdFx0XHRcdGlmICh3cmFwcGVyLmhhc0NoaWxkTm9kZXMoKSkgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmNoaWxkTm9kZXNbMF0pXG5cdFx0XHRcdFx0d3JhcHBlci5pbm5lckhUTUwgPSBjYW52YXNcblxuXHRcdFx0XHRcdC8vIENvbmZpZ3VyZSBhbmQgcmVuZGVyIHRoZSBjaGFydFxuXHRcdFx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkKVxuXHRcdFx0XHRcdHZhciBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdiYXInLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRsYWJlbHM6IFtdLFxuXHRcdFx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ0NlcnRpZmllZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogWyBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllc1sgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMubGVuZ3RoIC0gMSBdLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUgXSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVEXG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBbIHNhdmVkU2VlZERhdGFTZXJpZXNbIHNhdmVkU2VlZERhdGFTZXJpZXMubGVuZ3RoIC0gMSBdLm5ldFJldmVudWVMYlBlckFjcmUgXSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUVcblx0XHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0c2NhbGVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0eUF4ZXM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0XHRzY2FsZUxhYmVsOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnTmV0IFJldmVudWUgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZm9ybWF0Q3VycmVuY3kodmFsdWUsIGZhbHNlKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cblx0XHQgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICQoJyNyZXZlbnVlR3JhcGgnKS52YWwoY2hhcnQudG9CYXNlNjRJbWFnZSgpKVxuXHRcdCAgICAgIH0sIDE1MDApXG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgbGVnZW5kXG5cdFx0XHRcdFx0bGVnZW5kLmNsYXNzTGlzdC5hZGQoJ2NhbGMtY2hhcnQtdHlwZS0nICsgY2hhcnQuY29uZmlnLnR5cGUpO1xuXG5cdFx0XHRcdFx0dmFyIGxlZ2VuZEh0bWwgPSAnPGRpdj4nXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGl0ZW07IHR5cGVvZiAoaXRlbSA9IGNoYXJ0LmNvbmZpZy5kYXRhLmRhdGFzZXRzW2ldKSAhPT0gJ3VuZGVmaW5lZCc7IGkrKykge1xuXHRcdFx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPGRpdj48c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWljb25cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArIGl0ZW0uYmFja2dyb3VuZENvbG9yICsgJ1wiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1sYWJlbFwiPicgKyBpdGVtLmxhYmVsICsgJzwvc3Bhbj48L2Rpdj4nXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzwvZGl2Pic7XG5cdFx0XHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGxlZ2VuZEh0bWxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB1cGRhdGVHcmFwaHMgPSBmdW5jdGlvbiAoY2VydGlmaWVkU2VlZERhdGFTZXJpZXMsIHNhdmVkU2VlZERhdGFTZXJpZXMsIGFuaW1hdGUpIHtcblx0XHRcdFx0XHRzZXRDaGFydERlZmF1bHRzKGFuaW1hdGUpXG5cdFx0XHRcdFx0dXBkYXRlR3JhcGhDb21wYXJlSW1wYWN0KGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXHRcdFx0XHRcdHVwZGF0ZUdyYXBoTWF4aW1pemVSZXZlbnVlKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRVZFTlRTXG5cblx0XHRcdFx0dmFyIG9uQ2FsY3VsYXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRcdFx0ZnVuY3Rpb24gdmFsaWRhdGVGb3JtKCkge1xuXHRcdFx0XHRcdFx0ICB2YXIgaXNWYWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQgICQoJy5jYWxjLWZpZWxkJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCAgICBpZiAoICQodGhpcykudmFsKCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJyZWRcIn0pXG5cdFx0XHRcdFx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlzVmFsaWQpXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwiIzY2NjY1Y1wifSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQgIH0pO1xuXHRcdFx0XHRcdFx0ICByZXR1cm4gaXNWYWxpZDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHR2YXIgZ28gPSB2YWxpZGF0ZUZvcm0oKVxuXHRcdFx0XHRcdFx0dmFyIGVycm9yRm9ybU1lc3NhZ2UgPSAnPHNwYW4gY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZSB0byBjYWxjdWxhdGUuPC9zcGFuPidcblx0XHRcdFx0XHRcdGlmICggZ28gPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnaXQgaXMgdmFsaWQnKVxuXHRcdFx0XHRcdFx0XHQkKCcuZXJyb3JGb3JtTWVzc2FnZScpLnJlbW92ZSgpXG5cdFx0XHRcdFx0XHRcdCQoJyNncmFwaF9jb21wYXJlX2ltcGFjdF9zZWN0aW9uICwgI2dyYXBoX21heGltaXplX3JldmVudWVfc2VjdGlvbicpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0XHRcdCQoJy5hY3Rpb25EYXRhJykuc2hvdygpLnNsaWRlRG93bigpXG5cdFx0XHRcdFx0XHRcdGNhbGN1bGF0ZSgpXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZiAoIGdvID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpdCBpcyBub3QgdmFsaWQnKVxuXHRcdFx0XHRcdFx0XHRpZiAoJCgnLmVycm9yRm9ybU1lc3NhZ2UnKVswXSkge1xuXG5cdFx0XHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdFx0XHQkKCcjeWllbGRJbXBhY3RGb3JVbmRlcnNlZWRpbmcnKS5hZnRlcihlcnJvckZvcm1NZXNzYWdlKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvbkZvcm1JbnB1dENoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0XHRcdC8vIFNob3cgdGhlICdyZXNldCBmb3JtJyBsaW5rIHdoZW4gZGV2aWF0aW5nIGZyb20gdGhlIGRlZmF1bHRzXG5cdFx0XHRcdFx0c2hvd1Jlc2V0TGluaygpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb25SZXNldEZvcm0gPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0XHQvLyBSZXNldCB0aGUgZGF0YSBhbmQgZm9ybSB2YWx1ZXNcblx0XHRcdFx0XHRyZXNldElucHV0cygpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb25FbWFpbERhdGEgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0XHQvLyBOT1RFOiBUaGUgZ2VuZXJhdGVkIFBERiB3aWxsIGhhdmUgdGhlIGRhdGEgdGhhdCBpcyBjdXJyZW50bHkgcmVwcmVzZW50ZWQgaW4gdGhlIGNoYXJ0cy4gSWYgdGhlIHVzZXIgaGFzIGNoYW5nZWQgZm9ybSBmaWVsZCB2YWx1ZXMsIGJ1dCBub3QgY2xpY2tlZCBcIkNhbGN1bGF0ZVwiLCB0aGVuIHRoZXNlIGFyZSBub3QgcmVmbGVjdGVkIGluIHRoZSBvdXRwdXQuXG5cblx0XHRcdFx0XHQvLyBUT0RPOiBTaG93IGVtYWlsIGZpZWxkcyBmb3IgdXNlciBpbnB1dC4gU3VibWl0dGluZyB0aGlzIGZvcm0gd2lsbCBleGVjdXRlIHRoZSBlbWFpbERhdGEoKSBtZXRob2QuXG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKCdFbWFpbCBQREYnKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0Ly8gT25seSByZWRyYXcgdGhlIGdyYXBocyBpZiB0aGV5IGhhdmUgYmVlbiBjYWxjdWxhdGVkIGF0IGxlYXN0IG9uY2UgYWxyZWFkeVxuXHRcdFx0XHRcdHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZWRfY2FsY19mb3JtJylcblx0XHRcdFx0XHRpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbGN1bGF0ZWQnKSkge1xuXHRcdFx0XHRcdFx0Ly8gUmUtcmVuZGVyIHRoZSBncmFwaHNcblx0XHRcdFx0XHRcdHZhciBjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcyA9IFNlZWRDYWxjRGF0YS5nZXREYXRhU2VyaWVzKGNlcnRpZmllZFNlZWREYXRhKVxuXHRcdFx0XHRcdFx0dmFyIHNhdmVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhzYXZlZFNlZWREYXRhKVxuXHRcdFx0XHRcdFx0dXBkYXRlR3JhcGhzKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzLCBmYWxzZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb25Eb3dubG9hZFBkZiA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0XHRcdC8vIE5PVEU6IFRoZSBnZW5lcmF0ZWQgUERGIHdpbGwgaGF2ZSB0aGUgZGF0YSB0aGF0IGlzIGN1cnJlbnRseSByZXByZXNlbnRlZCBpbiB0aGUgY2hhcnRzLiBJZiB0aGUgdXNlciBoYXMgY2hhbmdlZCBmb3JtIGZpZWxkIHZhbHVlcywgYnV0IG5vdCBjbGlja2VkIFwiQ2FsY3VsYXRlXCIsIHRoZW4gdGhlc2UgYXJlIG5vdCByZWZsZWN0ZWQgaW4gdGhlIG91dHB1dC5cblxuXHRcdFx0XHRcdC8vIFRPRE86IFRyaWdnZXJpbmcgdGhpcyBoYW5kbGVyIHdpbGwgZXhlY3V0ZSB0aGUgZG93bmxvYWRQZGYoKSBtZXRob2Rcblx0XHRcdFx0XHRjb25zb2xlLmluZm8oJ0Rvd25sb2FkIFBERicpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgd2lyZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZm9ybUVsZW1lbnRzID0gJCgnI3NlZWRfY2FsY19mb3JtIGlucHV0LCAjc2VlZF9jYWxjX2Zvcm0gdGV4dGFyZWEsICNzZWVkX2NhbGNfZm9ybSBzZWxlY3QnKVxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgZWwgPSBmb3JtRWxlbWVudHNbaV1cblx0XHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uRm9ybUlucHV0Q2hhbmdlKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBjYWxjdWxhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRlJylcblx0XHRcdFx0XHRjYWxjdWxhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbGN1bGF0ZSlcblxuXHRcdFx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIHJlc2V0IHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xuXHRcdFx0XHRcdHZhciByZXNldEZvcm1MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKVxuXHRcdFx0XHRcdHJlc2V0Rm9ybUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblJlc2V0Rm9ybSlcblxuXHRcdFx0XHRcdC8vIEFkZCB0cmlnZ2VyIHRvIGVtYWlsIHRoZSByZXN1bHRzIGFzIGEgUERGXG5cdFx0XHRcdFx0Ly92YXIgZW1haWxEYXRhQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsX2RhdGEnKVxuXHRcdFx0XHRcdC8vZW1haWxEYXRhQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25FbWFpbERhdGEpXG5cblx0XHRcdFx0XHQvLyBBZGQgdHJpZ2dlciB0byBkb3dubG9hZCB0aGUgcmVzdWx0cyBhcyBhIFBERlxuXHRcdFx0XHRcdC8vdmFyIGRvd25sb2FkUGRmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25sb2FkX3BkZicpXG5cdFx0XHRcdFx0Ly9kb3dubG9hZFBkZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRG93bmxvYWRQZGYpXG5cblx0XHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gSW5pdGlhbGl6ZSB1c2VyIGZvcm0gaW5wdXRzIHdpdGggZGVmYXVsdCBkYXRhXG5cdFx0XHRcdFx0dXBkYXRlRm9ybUZyb21Vc2VyRGF0YSgpXG5cblx0XHRcdFx0XHQvLyBXaXJlIHVwIGludGVyYWN0aXZlIGV2ZW50c1xuXHRcdFx0XHRcdHdpcmVFdmVudHMoKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHsgaW5pdDogaW5pdCB9XG5cdFx0XHR9KCkpXG5cblx0XHRcdFNlZWRDYWxjLmluaXQoKVxuXHRcdH0pXG5cblxuXHR9XG4gIGlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpbmQtc2VlZC1zdXBwbGllcicpICkge1xuICAgICQoJyNzdGF0ZXNlbGVjdCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICBjaGFuZ2VTdGF0ZSgpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVN0YXRlICgpIHtcbiAgICAgIGlmICgkKCcjcmVzdWx0cycpLmhhc0NsYXNzKCdoaWRkZW4nKSkge1xuICAgICAgICAkKCcjcmVzdWx0cycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgfVxuICAgICAgdmFyIHNlbGVjdGVkc3RhdGUgPSAkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudmFsKClcbiAgICAgICQoJy5zdXBwbGllciwgLnJlcCcpLmhpZGUoKVxuICAgICAgJCgnLicgKyBzZWxlY3RlZHN0YXRlKS5zaG93KClcblxuICAgICAgaWYgKCEkKCcuJyArIHNlbGVjdGVkc3RhdGUpWzBdKSB7XG4gICAgICAgIGlmICgkKCcjc3RhdGVzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpID09PSAnU2VsZWN0IGEgc3RhdGUnKSB7XG4gICAgICAgICAgJCgnI3Jlc3VsdHMnKS5oaWRlKClcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICQoJyNyZXN1bHRzJykuc2hvdygpXG4gICAgICAgICAgJCgnLmZhaWx1cmVfX25vc3VwcGxpZXJzJykuc2hvdygpXG4gICAgICAgICAgdmFyIHN0YXRlQ2hvc2VuID0gJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKVxuICAgICAgICAgICQoJy5mYWlsdXJlU3BhbicpLnRleHQoc3RhdGVDaG9zZW4pXG4gICAgICAgICAgJCgnLnJlcF9fY3RuJykuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmZhaWx1cmVfX25vc3VwcGxpZXJzJykuaGlkZSgpXG4gICAgICAgICAgJCgnLnJlcF9fY3RuJykuc2hvdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzdWNjZXNzLCBlcnJvcilcblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MgKHBvc2l0aW9uKSB7XG4gICAgICB2YXIgR0VPQ09ESU5HID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPScgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlICsgJyZrZXk9QUl6YVN5QUlhcFFiQnJCY0lGVHVJbE14YlhiTXR5M2RUN1IxYjJrJ1xuXG4gICAgICAkLmdldEpTT04oR0VPQ09ESU5HKS5kb25lKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICB2YXIgdGhlc3RhdGUgPSBsb2NhdGlvbi5yZXN1bHRzWzBdLmFkZHJlc3NfY29tcG9uZW50c1s0XS5zaG9ydF9uYW1lXG4gICAgICAgICQoJyNzdGF0ZXNlbGVjdCcpLnZhbCh0aGVzdGF0ZSlcbiAgICAgICAgY2hhbmdlU3RhdGUoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvciAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxuICB9XG4iXX0=