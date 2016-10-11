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
					url: 'https://hlk-pdf-server.centralus.cloudapp.azure.com/api/v1/EmailLink?templateName=WestBred_ProfitCalc' + queryStringAdd,
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

//# sourceMappingURL=data:application/json;base64,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N0MsU0FBUyxLQUFULENBQWdCLEdBQWhCLEVBQXFCO0FBQ25CLFdBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxHQTNDNEM7O0FBQzdDLElBQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixZQUFZO0FBQ25DO0FBQ0QsR0FGRDs7QUE0QkEsWUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxPQUF6QyxFQUFrRCxLQUFsRDtBQTdCNkM7QUE0QzlDIiwiZmlsZSI6ImJ1bmRsZS5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5maXR2aWRzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4ndXNlIHN0cmljdCdcblxudmFyIHNlbGVjdG9ycyA9IFtcblx0J2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG5cdCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcblx0J2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuXHQnaWZyYW1lW3NyYyo9XCJraWNrc3RhcnRlci5jb21cIl1bc3JjKj1cInZpZGVvLmh0bWxcIl0nLFxuXHQnb2JqZWN0J1xuXVxuXG52YXIgY3NzID0gJy5mbHVpZC13aWR0aC12aWRlby13cmFwcGVye3dpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowO30uZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlciBpZnJhbWUsLmZsdWlkLXdpZHRoLXZpZGVvLXdyYXBwZXIgb2JqZWN0LC5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIGVtYmVkIHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt9J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRTZWxlY3Rvciwgb3B0cykge1xuXHRwYXJlbnRTZWxlY3RvciA9IHBhcmVudFNlbGVjdG9yIHx8ICdib2R5J1xuXHRvcHRzID0gb3B0cyB8fCB7fVxuXG5cdGlmIChpc09iamVjdChwYXJlbnRTZWxlY3RvcikpIHtcblx0XHRvcHRzID0gcGFyZW50U2VsZWN0b3Jcblx0XHRwYXJlbnRTZWxlY3RvciA9ICdib2R5J1xuXHR9XG5cblx0b3B0cy5pZ25vcmUgPSBvcHRzLmlnbm9yZSB8fCAnJ1xuXHRvcHRzLnBsYXllcnMgPSBvcHRzLnBsYXllcnMgfHwgJydcblxuXHR2YXIgY29udGFpbmVycyA9IHF1ZXJ5QWxsKHBhcmVudFNlbGVjdG9yKVxuXHRpZiAoIWhhc0xlbmd0aChjb250YWluZXJzKSkgcmV0dXJuXG5cblx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZml0LXZpZHMtc3R5bGUnKSkge1xuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZXMoKSlcblx0fVxuXG5cdHZhciBjdXN0b20gPSB0b1NlbGVjdG9yQXJyYXkob3B0cy5wbGF5ZXJzKSB8fCBbXVxuXHR2YXIgaWdub3JlZCA9IHRvU2VsZWN0b3JBcnJheShvcHRzLmlnbm9yZSkgfHwgW11cblx0dmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzXG5cdFx0LmZpbHRlcihub3RJZ25vcmVkKGlnbm9yZWQpKVxuXHRcdC5jb25jYXQoY3VzdG9tKVxuXHRcdC5qb2luKClcblxuXHRpZiAoIWhhc0xlbmd0aChzZWxlY3RvcikpIHJldHVyblxuXG5cdGNvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHZpZGVvcyA9IHF1ZXJ5QWxsKGNvbnRhaW5lciwgc2VsZWN0b3IpXG5cdFx0dmlkZW9zLmZvckVhY2goZnVuY3Rpb24gKHZpZGVvKSB7XG5cdFx0XHR3cmFwKHZpZGVvKVxuXHRcdH0pXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsIChlbCwgc2VsZWN0b3IpIHtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRzZWxlY3RvciA9IGVsXG5cdFx0ZWwgPSBkb2N1bWVudFxuXHR9XG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvckFycmF5IChpbnB1dCkge1xuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbnB1dC5zcGxpdCgnLCcpLm1hcCh0cmltKS5maWx0ZXIoaGFzTGVuZ3RoKVxuXHR9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGZsYXR0ZW4oaW5wdXQubWFwKHRvU2VsZWN0b3JBcnJheSkuZmlsdGVyKGhhc0xlbmd0aCkpXG5cdH1cblx0cmV0dXJuIGlucHV0IHx8IFtdXG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsKSB7XG5cdGlmICgvZmx1aWQtd2lkdGgtdmlkZW8td3JhcHBlci8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSkpIHJldHVyblxuXG5cdHZhciB3aWR0aEF0dHIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJyksIDEwKVxuXHR2YXIgaGVpZ2h0QXR0ciA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JyksIDEwKVxuXG5cdHZhciB3aWR0aCA9ICFpc05hTih3aWR0aEF0dHIpID8gd2lkdGhBdHRyIDogZWwuY2xpZW50V2lkdGhcblx0dmFyIGhlaWdodCA9ICFpc05hTihoZWlnaHRBdHRyKSA/IGhlaWdodEF0dHIgOiBlbC5jbGllbnRIZWlnaHRcblx0dmFyIGFzcGVjdCA9IGhlaWdodCAvIHdpZHRoXG5cblx0ZWwucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpXG5cdGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcblxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuXHR3cmFwcGVyLmNsYXNzTmFtZSA9ICdmbHVpZC13aWR0aC12aWRlby13cmFwcGVyJ1xuXHR3cmFwcGVyLnN0eWxlLnBhZGRpbmdUb3AgPSAoYXNwZWN0ICogMTAwKSArICclJ1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBzdHlsZXMgKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ZGl2LmlubmVySFRNTCA9ICc8cD54PC9wPjxzdHlsZSBpZD1cImZpdC12aWRzLXN0eWxlXCI+JyArIGNzcyArICc8L3N0eWxlPidcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzFdXG59XG5cbmZ1bmN0aW9uIG5vdElnbm9yZWQgKGlnbm9yZWQpIHtcblx0aWYgKGlnbm9yZWQubGVuZ3RoIDwgMSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGlnbm9yZWQuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xXG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTGVuZ3RoIChpbnB1dCkge1xuXHRyZXR1cm4gaW5wdXQubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiB0cmltIChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoaW5wdXQpIHtcblx0cmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChpbnB1dCkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoaW5wdXQpIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5maXR2aWRzKCk7XG5jb25zdCBtYWlsYmFyID0gYFxuPGRpdiBjbGFzcz1cIm1haWxiYXItaGVhZGVyXCI+XG4gIDxzcGFuIGlkPVwibWFpbGJhci1hY3RpdmF0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvd19fNzY4dXBcIj5TaWduIHVwIGZvciBlbWFpbCB1cGRhdGVzIGFib3V0IHRoZSBDb25uZWN0SU7ihKIgV2hlYXQgSW5zaWdodCBTeXN0ZW0uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGlkZV9fNzY4ZG93blwiPlNpZ24gdXAgZm9yIGVtYWlsIHVwZGF0ZXM8L3NwYW4+XG4gICAgPHN2ZyBjbGFzcz1cImljb24gZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz5cbiAgPC9zcGFuPlxuXG4gIDwvc3Bhbj5cblxuICA8c3BhbiBpZD1cIm1haWxiYXItZGlzbWlzc1wiIGNsYXNzPVwiZGlzbWlzc1wiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jaXJjbGUtY3Jvc3NcIj48L3VzZT5cbiAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGlkPVwibWFpbGJhci1ib2R5XCIgY2xhc3M9XCJtYWlsYmFyLWJvZHlcIj5cbiAgICA8IS0tIGZvcm0gIC0tPlxuICAgIDxkaXYgaWQ9XCJzaWdudXBmb3JtX19jdG5cIiBjbGFzcz1cIndGb3JtQ29udGFpbmVyXCI+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj48L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid0Zvcm1cIiBpZD1cInRmYV8wLVdSUFJcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2Rlc2VjdGlvblwiIGlkPVwiY29kZS10ZmFfMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwid0Zvcm1UaXRsZVwiIGlkPVwidGZhXzAtVFwiPkNvbm5lY3RJTiBFbWFpbCBTaWdudXA8L2gzPlxuICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cImh0dHBzOi8vd3d3LnRmYWZvcm1zLmNvbS9yZXNwb25zZXMvcHJvY2Vzc29yXCIgY2xhc3M9XCJoaW50c0JlbG93IGxhYmVsc0Fib3ZlIENvbm5lY3RJTi1FbWFpbC1TaWdudXBcIiBpZD1cInRmYV8wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8xLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzEtTFwiIGZvcj1cInRmYV8xXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMVwiIG5hbWU9XCJ0ZmFfMVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkZpcnN0IE5hbWVcIiBjbGFzcz1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0ZmFfMi1EXCIgY2xhc3M9XCJvbmVGaWVsZCBmaWVsZC1jb250YWluZXItRCAgICAgXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBpZD1cInRmYV8yLUxcIiBmb3I9XCJ0ZmFfMlwiIGNsYXNzPVwibGFiZWwgcHJlRmllbGQgcmVxTWFya1wiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0ZmFfMlwiIG5hbWU9XCJ0ZmFfMlwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiB0aXRsZT1cIkxhc3QgTmFtZVwiIGNsYXNzPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV8zLURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzMtTFwiIGZvcj1cInRmYV8zXCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dFdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGZhXzNcIiBuYW1lPVwidGZhXzNcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiXCIgdGl0bGU9XCJFbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUtZW1haWwgcmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRmYV80LURcIiBjbGFzcz1cIm9uZUZpZWxkIGZpZWxkLWNvbnRhaW5lci1EICAgICBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGlkPVwidGZhXzQtTFwiIGZvcj1cInRmYV80XCIgY2xhc3M9XCJsYWJlbCBwcmVGaWVsZCByZXFNYXJrXCI+SSBhbSBhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0V3JhcHBlclwiPjxzcGFuIGlkPVwidGZhXzRcIiBjbGFzcz1cImNob2ljZXMgdmVydGljYWwgcmVxdWlyZWRcIj48c3BhbiBjbGFzcz1cIm9uZUNob2ljZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV82XCIgY2xhc3M9XCJcIiBjaGVja2VkIGlkPVwidGZhXzZcIiBuYW1lPVwidGZhXzZcIj48bGFiZWwgY2xhc3M9XCJsYWJlbCBwb3N0RmllbGRcIiBpZD1cInRmYV82LUxcIiBmb3I9XCJ0ZmFfNlwiPkdyb3dlcjwvbGFiZWw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm9uZUNob2ljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRmYV81XCIgY2xhc3M9XCJcIiBpZD1cInRmYV81XCIgbmFtZT1cInRmYV81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwgcG9zdEZpZWxkXCIgaWQ9XCJ0ZmFfNS1MXCIgZm9yPVwidGZhXzVcIj5TZWVkIFN1cHBsaWVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIGlkPVwidGZhXzAtQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeUFjdGlvblwiIHZhbHVlPVwiU3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiNDMzNzEzXCIgbmFtZT1cInRmYV9kYkZvcm1JZFwiIGlkPVwidGZhX2RiRm9ybUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlwiIG5hbWU9XCJ0ZmFfZGJSZXNwb25zZUlkXCIgaWQ9XCJ0ZmFfZGJSZXNwb25zZUlkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cImE4NjIzYTY5ZDFlNjI2NGY0NjU2Mjg4N2UwY2NkNTk5XCIgbmFtZT1cInRmYV9kYkNvbnRyb2xcIiBpZD1cInRmYV9kYkNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiN1wiIG5hbWU9XCJ0ZmFfZGJWZXJzaW9uSWRcIiBpZD1cInRmYV9kYlZlcnNpb25JZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCJcIiBuYW1lPVwidGZhX3N3aXRjaGVkb2ZmXCIgaWQ9XCJ0ZmFfc3dpdGNoZWRvZmZcIj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmBcblxuaWYgKCAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWduLXVwJykgPT09IHRydWUpIHx8IChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKXN1YnNjcmliZWRcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLCAnJDEnKSAhPT0gJ3RydWUnKSApIHtcblxuICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykgPT09IHRydWUpIHtcbiAgICAkKCcjbWFpbGJhcicpLmhpZGUoKVxuICB9ZWxzZSB7XG4gICAgJCgnI21haWxiYXInKS5odG1sKG1haWxiYXIpXG4gIH1cblxufVxuXG4vLyBjbGljayB0aXRsZSBvciBkb3duIGFycm93XG4kKCcjbWFpbGJhci1hY3RpdmF0ZScpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHZoXG4gIGNvbnN0ICRib2R5ID0gJCgnI21haWxiYXItYm9keScpXG4gIGNvbnN0IGFycm93RG93biA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+J1xuICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgIHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21haWxiYXInKS5oZWlnaHQoKVxuICB9IGVsc2Uge1xuICAgIHZoID0gNDAwXG4gIH1cblxuICBpZiAoJGJvZHkuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93VXApXG4gIH0gZWxzZSB7XG4gICAgJGJvZHkuYW5pbWF0ZSh7IGhlaWdodDogMCB9KVxuICAgICQodGhpcykuY2hpbGRyZW4oJ3N2ZycpLmh0bWwoYXJyb3dEb3duKVxuICB9XG5cbiAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYWlsYmFyLWFjdGl2ZScpXG4gICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxufSlcblxuLy8gY2xpY2sgZGlzbWlzc1xuJCgnI21haWxiYXItZGlzbWlzcycpLm9uKCdjbGljaycsIGRpc21pc3NNYWlsYmFyKVxuXG5mdW5jdGlvbiBkaXNtaXNzTWFpbGJhciAoKSB7XG4gIC8vIGlmIHRoZSBtZW51IGlzIGFjdGl2ZSBhbmQgeW91IGRpc21pc3MsIHJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0XG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtYWN0aXZlJykpIHtcbiAgICBjb25zdCBtZW51ID0gJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJylcbiAgICBjb25zdCBhZGRlZEhlaWdodCA9IG1lbnUuaGVpZ2h0KCkgKyAkKCcjbWFpbGJhcicpLmhlaWdodCgpXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBhZGRlZEhlaWdodCArICdweCcpXG4gIH1cblxuICAkKCcjbWFpbGJhcicpLmFuaW1hdGUoeyBoZWlnaHQ6ICcwJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWFpbGJhci1hY3RpdmUnKVxuICB9KVxuXG4gIGRvY3VtZW50LmNvb2tpZSA9ICdzdWJzY3JpYmVkPXRydWUnXG59XG4kKCcjbWVudS1hY3RpdmF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG1haWxiYXIgPSAwXG4gIGlmICgkKCcjbWFpbGJhci1ib2R5JykubGVuZ3RoKSB7XG4gICAgbWFpbGJhciA9ICQoJyNtYWlsYmFyJykuaGVpZ2h0KClcbiAgfVxuXG4gIGNvbnN0IHZoID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnI21lbnUnKS5oZWlnaHQoKSAtIG1haWxiYXJcbiAgY29uc3QgbWVudSA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tZW51XCI+PC91c2U+J1xuICBjb25zdCBjcm9zcyA9ICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jcm9zc1wiPjwvdXNlPidcblxuICBpZiAoJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuaGVpZ2h0KCkgPT09IDApIHtcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgJCgnI21lbnUtaGVhZGVyLW1lbnUtY29udGFpbmVyJykuYW5pbWF0ZSh7IGhlaWdodDogdmggfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGNyb3NzKVxuICB9IGVsc2Uge1xuICAgICQoJyNtZW51LWhlYWRlci1tZW51LWNvbnRhaW5lcicpLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSlcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKG1lbnUpXG4gIH1cblxuICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtYWN0aXZlJylcbiAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdtZW51LWFjdGl2ZScpXG59KVxuXG4vLyBUT0RPOiByZWNhbGMgbWVudSBoZWlnaHQgb24gcmVzaXplIGlmIGluIG1vYmlsZSB3aWR0aHNcbiQod2luZG93KS5yZXNpemUoKVxuJCgnLmJlbmVmaXRzX19oZWFkbGluZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCh0aGlzKS5uZXh0KClcbiAgICBjb25zdCBhcnJvd0Rvd24gPSAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPidcbiAgICBjb25zdCBhcnJvd1VwID0gJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXVwXCI+PC91c2U+J1xuXG4gICAgJGJvZHkuc2xpZGVUb2dnbGUoKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzdmcnKS5odG1sKGFycm93RG93bilcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3ZnJykuaHRtbChhcnJvd1VwKVxuICAgIH1cblxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cbn0pXG4vLyB3aW5kb3cuYWxlcnQgPSBmdW5jdGlvbiAoKSB7fVxuLy8gIFZhbGlkYXRlIENvbnRhY3QgVXMgRmllbGRzXG5pZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjb250YWN0LXVzJykpIHtcbiAgICAkKCcucHJpbWFyeUFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIFZhbGl0KCkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQoJy52YWxpZGF0ZS1lbWFpbCcpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RFbWFpbCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB4IHNvbGlkIHJlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNjb250YWN0RW1haWwnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCgnI3RmYV8yJykudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFweCBzb2xpZCByZWRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcImluaXRpYWxcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVuaXQgPSBWYWxpdCgpO1xuICAgICAgICB2YXIgZXJyb3IgPSAnPHNwYW4gc3R5bGU9XCJwb3NpdGlvbjpzdGF0aWM7XCIgY2xhc3M9XCJlcnJvckZvcm1NZXNzYWdlXCI+WW91IG11c3QgY29tcGxldGUgYWxsIGZpZWxkcyBhYm92ZS48L3NwYW4+J1xuICAgICAgICBpZiAocnVuaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnI3RmYV8wJykuc3VibWl0KClcbiAgICAgICAgICAgICQoJy5lcnJvckZvcm1NZXNzYWdlJykucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkKCcuZXJyb3JGb3JtTWVzc2FnZScpWzBdKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdE1lc3NhZ2UnKS5hZnRlcihlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4ndXNlIHN0cmljdCdcblxuXG5cdGlmICggJCgnYm9keScpLmhhc0NsYXNzKCd3aGVhdC1wcm9maXRhYmlsaXR5LWNhbGN1bGF0b3InKSApIHtcblxuXHRcdCQoJy50b2dnbGVNb2RhbCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnI2VtYWlsRGF0YScpLnNsaWRlRG93bigpXG5cdFx0IH0pO1xuXG5cdFx0JCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHQgICQoJy50aGFua3lvdW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0JCgnI3Jlc2V0X2Zvcm0sI3RoYW5reW91X19zdGFydG92ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblx0XHR9KTtcblxuXHRcdCQoXCIjZW1haWxEYXRhRm9ybVwiKS5iaW5kKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZSkge1xuXHRcdCAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcblx0XHQgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBkZWZhdWx0IGV2ZW50XG5cdFx0ICAgfVxuXHRcdH0pO1xuXG5cblx0XHQkKCcjZG93bmxvYWRQREYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdCQoJyNwZGZEYXRhJykudmFsKEpTT04uc3RyaW5naWZ5KGRhdGFFeHRyYWN0KCkpKVxuXHRcdFx0JCgnI3BkZkZvcm0nKS5zdWJtaXQoKVxuXHRcdH0pXG5cblx0XHQkKCcjbWFpbFBERicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvL1ZhbGlkYXRlIEVtYWlsXG5cdFx0XHRmdW5jdGlvbiBpc19lbWFpbChlbWFpbCl7XG5cdFx0XHR2YXIgZW1haWxSZWcgPSAvXlthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVpdezIsNH0kLztcblx0XHRcdHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTsgfVxuXG5cdFx0XHR2YXIgZW1haWxJbnB1dCA9IGlzX2VtYWlsKCQoJyNyZWNpcGllbnRFbWFpbCcpLnZhbCgpKVxuXHRcdFx0dmFyIGVtYWlsRXJyb3IgPSAnPHNtYWxsIGNsYXNzPVwiZW1haWxFcnJvclwiPlBsZWFzZSBlbnRlciB2YWxpZCBlbWFpbC48L3NtYWxsJ1xuXG5cdFx0XHRpZiAoZW1haWxJbnB1dCA9PSBmYWxzZSkge1xuXHRcdFx0XHQkKCcjcmVjaXBpZW50RW1haWwnKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRpZiAoJCgnLmVtYWlsRXJyb3InKVswXSkge1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0JCgnI21haWxQREYnKS5hZnRlcihlbWFpbEVycm9yKVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHQkKCcuZW1haWxFcnJvcicpLnJlbW92ZSgpXG5cdFx0XHRcdCQoJyNyZWNpcGllbnRFbWFpbCcpLmNzcyh7XCJib3JkZXItY29sb3JcIjogXCJpbmhlcml0XCJ9KVxuXHRcdFx0XHR2YXIgcXVlcnlTdHJpbmdBZGQgPSAnJnJlY2lwaWVudHM9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKCcjcmVjaXBpZW50RW1haWwnKS52YWwoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICcmc2VuZGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ25vLXJlcGx5QGhsa2FnZW5jeS5jb20nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZzdWJqZWN0PScgKyBlbmNvZGVVUklDb21wb25lbnQoJ1lvdXIgV2hlYXQgUHJvZml0YWJpbGl0eSBDYWxjdWxhdG9yIFJlc3VsdHMnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZmaXJzdE5hbWU9J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJyZtZW1iZXJCdXNuYW1lPSdcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogJ2h0dHBzOi8vaGxrLXBkZi1zZXJ2ZXIuY2VudHJhbHVzLmNsb3VkYXBwLmF6dXJlLmNvbS9hcGkvdjEvRW1haWxMaW5rP3RlbXBsYXRlTmFtZT1XZXN0QnJlZF9Qcm9maXRDYWxjJyArIHF1ZXJ5U3RyaW5nQWRkLFxuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiAneyBcImpzb25cIiA6ICcgKyBKU09OLnN0cmluZ2lmeShkYXRhRXh0cmFjdCgpKSArICd9Jyxcblx0XHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBvcHRzID0ge1xuXHRcdFx0XHRcdFx0ICBsaW5lczogMTMgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG5cdFx0XHRcdFx0XHQsIGxlbmd0aDogMjggLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcblx0XHRcdFx0XHRcdCwgd2lkdGg6IDE0IC8vIFRoZSBsaW5lIHRoaWNrbmVzc1xuXHRcdFx0XHRcdFx0LCByYWRpdXM6IDQyIC8vIFRoZSByYWRpdXMgb2YgdGhlIGlubmVyIGNpcmNsZVxuXHRcdFx0XHRcdFx0LCBzY2FsZTogMC4xNSAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG5cdFx0XHRcdFx0XHQsIGNvcm5lcnM6IDAuMyAvLyBDb3JuZXIgcm91bmRuZXNzICgwLi4xKVxuXHRcdFx0XHRcdFx0LCBjb2xvcjogJyNmZmYnIC8vICNyZ2Igb3IgI3JyZ2diYiBvciBhcnJheSBvZiBjb2xvcnNcblx0XHRcdFx0XHRcdCwgb3BhY2l0eTogMCAvLyBPcGFjaXR5IG9mIHRoZSBsaW5lc1xuXHRcdFx0XHRcdFx0LCByb3RhdGU6IDAgLy8gVGhlIHJvdGF0aW9uIG9mZnNldFxuXHRcdFx0XHRcdFx0LCBkaXJlY3Rpb246IDEgLy8gMTogY2xvY2t3aXNlLCAtMTogY291bnRlcmNsb2Nrd2lzZVxuXHRcdFx0XHRcdFx0LCBzcGVlZDogMSAvLyBSb3VuZHMgcGVyIHNlY29uZFxuXHRcdFx0XHRcdFx0LCB0cmFpbDogODUgLy8gQWZ0ZXJnbG93IHBlcmNlbnRhZ2Vcblx0XHRcdFx0XHRcdCwgZnBzOiAyMCAvLyBGcmFtZXMgcGVyIHNlY29uZCB3aGVuIHVzaW5nIHNldFRpbWVvdXQoKSBhcyBhIGZhbGxiYWNrIGZvciBDU1Ncblx0XHRcdFx0XHRcdCwgekluZGV4OiAyZTkgLy8gVGhlIHotaW5kZXggKGRlZmF1bHRzIHRvIDIwMDAwMDAwMDApXG5cdFx0XHRcdFx0XHQsIGNsYXNzTmFtZTogJ3NwaW5uZXInIC8vIFRoZSBDU1MgY2xhc3MgdG8gYXNzaWduIHRvIHRoZSBzcGlubmVyXG5cdFx0XHRcdFx0XHQsIHRvcDogJy0yMHB4JyAvLyBUb3AgcG9zaXRpb24gcmVsYXRpdmUgdG8gcGFyZW50XG5cdFx0XHRcdFx0XHQsIGxlZnQ6ICc1MCUnIC8vIExlZnQgcG9zaXRpb24gcmVsYXRpdmUgdG8gcGFyZW50XG5cdFx0XHRcdFx0XHQsIHNoYWRvdzogZmFsc2UgLy8gV2hldGhlciB0byByZW5kZXIgYSBzaGFkb3dcblx0XHRcdFx0XHRcdCwgaHdhY2NlbDogZmFsc2UgLy8gV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uXG5cdFx0XHRcdFx0XHQsIHBvc2l0aW9uOiAncmVsYXRpdmUnIC8vIEVsZW1lbnQgcG9zaXRpb25pbmdcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIob3B0cykuc3BpbigpXG5cdFx0XHRcdFx0XHQkKCcjbWFpbFBERicpLmNzcygnY29sb3InLCAndHJhbnNwYXJlbnQnKTtcblx0XHRcdFx0XHRcdCQoJyNtYWlsUERGJykuYWZ0ZXIoc3Bpbm5lci5lbClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQoJyNlbWFpbERhdGEnKS5oaWRlKClcblx0XHRcdFx0XHQkKCcjdGhhbmt5b3Vtb2RhbCcpLnNob3coKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0fSlcblxuXHRcdGZ1bmN0aW9uIGRhdGFFeHRyYWN0ICgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNlcnRHZXJtaW5hdGlvbjogJCgnI2NlcnRfc2VlZF9nZXJtaW5hdGlvbicpLnZhbCgpLFxuXHRcdFx0XHRjZXJ0UHVyZVNlZWQ6ICQoJyNjZXJ0X3NlZWRfcHVyZV9zZWVkJykudmFsKCksXG5cdFx0XHRcdGNlcnRTZWVkQ29zdDogJCgnI2NlcnRfc2VlZF9jb3N0X3Blcl91bml0JykudmFsKCksXG5cdFx0XHRcdHNhdmVkR2VybWluYXRpb246ICQoJyNzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJykudmFsKCksXG5cdFx0XHRcdHNhdmVkUHVyZVNlZWQ6ICQoJyNzYXZlZF9zZWVkX3B1cmVfc2VlZCcpLnZhbCgpLFxuXHRcdFx0XHRzYXZlZFNlZWRDb3N0OiAkKCcjc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0JykudmFsKCksXG5cdFx0XHRcdHNlYXNvbjogJCgnaW5wdXRbbmFtZT1cImNyb3Bfc2Vhc29uXCJdOmNoZWNrZWQnKS52YWwoKSxcblx0XHRcdFx0dGFyZ2V0WWllbGQ6ICQoJyNjcm9wX3RhcmdldF95aWVsZCcpLnZhbCgpLFxuXHRcdFx0XHR3aGVhdFByaWNlOiAkKCcjY3JvcF93aGVhdF9wcmljZScpLnZhbCgpLFxuXHRcdFx0XHR0YXJnZXRQbGFudFBvcHVsYXRpb246ICQoJyNjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJykudmFsKCksXG5cdFx0XHRcdGZsYXRTZWVkaW5nUmF0ZTogJCgnI2Nyb3BfZmxhdF9zZWVkaW5nX3JhdGUnKS52YWwoKSxcblx0XHRcdFx0YWNyZXNQbGFudGVkOiAkKCcjY3JvcF9hY3Jlc19wbGFudGVkJykudmFsKCksXG5cdFx0XHRcdHlpZWxkSW1wYWN0T3ZlcnNlZWRpbmc6ICQoJyNjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X292ZXJzZWVkaW5nJykudmFsKCksXG5cdFx0XHRcdHlpZWxkSW1wYWN0VW5kZXJzZWVkaW5nOiAkKCcjY3JvcF9wZXJjZW50X3lpZWxkX2ltcGFjdF91bmRlcnNlZWRpbmcnKS52YWwoKSxcblx0XHRcdFx0aW1wYWN0Q29tcGFyZUdyYXBoOiAkKCcjY29tcGFyZUdyYXBoJykudmFsKCksXG5cdFx0XHRcdG1heGltaXplUmV2ZW51ZUdyYXBoOiAkKCcjcmV2ZW51ZUdyYXBoJykudmFsKClcblx0XHRcdH1cblx0XHR9XG5cblxuXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gTWFpbiBhcHAgc3RhcnR1cFxuXG5cdFx0XHR2YXIgVXRpbGl0eSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIEdldCB0aGUgdG9wIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgaW4gdGhlIGRvY3VtZW50XG5cdFx0XHRcdC8vIEZyb20gc21vb3RoU2Nyb2xsLCBodHRwczovL2dpdGh1Yi5jb20vYWxpY2VsaWV1dGllci9zbW9vdGhTY3JvbGwvYmxvYi9tYXN0ZXIvc21vb3Roc2Nyb2xsLmpzXG5cdFx0XHRcdHZhciBnZXRUb3AgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRcdFx0Ly8gcmV0dXJuIHZhbHVlIG9mIGh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC4uLiBJRSA6IDAsIG90aGVyIGJyb3dzZXJzIDogLXBhZ2VZT2Zmc2V0XG5cdFx0XHRcdFx0aWYoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSByZXR1cm4gLXdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBzY3JlZW4gdmlld3BvcnQgd2lkdGhcblx0XHRcdFx0dmFyIGdldFZpZXdwb3J0V2lkdGggPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBkaWdpdCBzZXBhcmF0b3IgY2hhcmFjdGVycyB0byBhIG51bWVyaWMgc3RyaW5nXG5cdFx0XHRcdHZhciBhZGREaWdpdFNlcGFyYXRvcnMgPSBmdW5jdGlvbiAobnVtKSB7XG5cdFx0XHRcdFx0dmFyIG4gPSBudW0udG9TdHJpbmcoKVxuXHRcdFx0XHRcdHZhciBwID0gbi5pbmRleE9mKCcuJylcblx0XHRcdFx0XHRyZXR1cm4gbi5yZXBsYWNlKC9cXGQoPz0oPzpcXGR7M30pKyg/OlxcLnwkKSkvZywgZnVuY3Rpb24gKCQwLCBpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcCA8IDAgfHwgaSA8IHAgPyAoJDAgKyAnLCcpIDogJDBcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmV0dXJuIHRoZSBjaGFyYWN0ZXIgcmVwcmVzZW50YXRpb24gb2YgSW5maW5pdHlcblx0XHRcdFx0dmFyIGdldEluZmluaXR5Q2hhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ+KInidcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcm1hdCBhIG51bWJlciBmb3IgZGlzcGxheVxuXHRcdFx0XHR2YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24gKG51bWJlciwgZGVjaW1hbHMsIHNob3dQb3NpdGl2ZSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobnVtYmVyKVxuXHRcdFx0XHRcdGlmICghaXNOYU4odmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBkZWNpbWFscyAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVjaW1hbHMgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gS2VlcCBhIHNldCBudW1iZXIgb2YgZGVjaW1hbHMsIGV2ZW4gaWYgemVyb2VzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChkZWNpbWFscykpXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBKdXN0IHRydW5jYXRlIHRvIGEgZml4ZWQgbnVtYmVyIG9mIGRlY2ltYWxzLCBidXQgZG9uJ3QgcHJlc2VydmUgdHJhaWxpbmcgemVyb2VzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyhwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQoMikpKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGdldEluZmluaXR5Q2hhcigpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9ybWF0IGEgbnVtYmVyIGFzIGN1cnJlbnkgZm9yIGRpc3BsYXlcblx0XHRcdFx0dmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24gKG51bWJlciwgc2hvd0RlY2ltYWxzLCBzaG93UG9zaXRpdmUpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KG51bWJlcilcblx0XHRcdFx0XHRpZiAoIWlzTmFOKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUgPCAwID8gJy0gJyA6IChzaG93UG9zaXRpdmUgPT09IHRydWUgPyAnKyAnIDogJycpKSArICckJyArIGFkZERpZ2l0U2VwYXJhdG9ycyhNYXRoLmFicyh2YWx1ZSkudG9GaXhlZChzaG93RGVjaW1hbHMgPT09IHRydWUgPyAyIDogMCkpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBnZXRJbmZpbml0eUNoYXIoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENvbnZlcnQgYSBmb3JtYXR0ZWQgbnVtYmVyIGJhY2sgaW50byBhbiBhY3R1YWwgbnVtYmVyXG5cdFx0XHRcdHZhciB1bmZvcm1hdE51bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLnJlcGxhY2UoL1teLVxcZFxcLmVdL2csICcnKS50cmltKCkpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JtYXQgYSBpbnB1dCBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlIFwiZGF0YS1mb3JtYXRcIiBhdHRyaWJ1dGVcblx0XHRcdFx0dmFyIGZvcm1hdFZhbHVlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRpZiAoIWVsZW1lbnQgfHwgKGVsZW1lbnQgJiYgIWVsZW1lbnQudmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJydcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIGVsZW1lbnQudmFsdWUgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWx1ZVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBmb3JtYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmRhdGFzZXQuZm9ybWF0XG5cblx0XHRcdFx0XHRzd2l0Y2ggKGZvcm1hdCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSlcblxuXHRcdFx0XHRcdFx0Y2FzZSAnc2lnbmVkbnVtYmVyJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdE51bWJlcih1bmZvcm1hdE51bWJlcihlbGVtZW50LnZhbHVlKSwgbnVsbCwgdHJ1ZSlcblxuXHRcdFx0XHRcdFx0Y2FzZSAnaW50ZWdlcic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIDApXG5cblx0XHRcdFx0XHRcdGNhc2UgJ2ZpeGVkMic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXROdW1iZXIodW5mb3JtYXROdW1iZXIoZWxlbWVudC52YWx1ZSksIDIpXG5cblx0XHRcdFx0XHRcdGNhc2UgJ2N1cnJlbmN5Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdEN1cnJlbmN5KHVuZm9ybWF0TnVtYmVyKGVsZW1lbnQudmFsdWUpKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudmFsdWVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Z2V0VG9wOiBnZXRUb3AsXG5cdFx0XHRcdFx0Z2V0Vmlld3BvcnRXaWR0aDogZ2V0Vmlld3BvcnRXaWR0aCxcblx0XHRcdFx0XHRhZGREaWdpdFNlcGFyYXRvcnM6IGFkZERpZ2l0U2VwYXJhdG9ycyxcblx0XHRcdFx0XHRnZXRJbmZpbml0eUNoYXI6IGdldEluZmluaXR5Q2hhcixcblx0XHRcdFx0XHRmb3JtYXROdW1iZXI6IGZvcm1hdE51bWJlcixcblx0XHRcdFx0XHRmb3JtYXRDdXJyZW5jeTogZm9ybWF0Q3VycmVuY3ksXG5cdFx0XHRcdFx0dW5mb3JtYXROdW1iZXI6IHVuZm9ybWF0TnVtYmVyLFxuXHRcdFx0XHRcdGZvcm1hdFZhbHVlOiBmb3JtYXRWYWx1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9KCkpXG5cblx0XHRcdHZhciBTZWVkQ2FsY0RhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgU0VFRFNfUEVSX0xCX01JTiA9IDkwMDBcblx0XHRcdFx0dmFyIFNFRURTX1BFUl9MQl9NQVggPSAxODAwMFxuXHRcdFx0XHR2YXIgU0VFRFNfUEVSX0xCX1NURVAgPSA1MDBcblxuXHRcdFx0XHR2YXIgU2VlZENhbGNVc2VyRGF0YSA9IGZ1bmN0aW9uIChjZXJ0aWZpZWQpIHtcblx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzXG5cdFx0XHRcdFx0dGhpcy5zZWFzb24gPSAnd2ludGVyJyAvLyBzcHJpbmd8d2ludGVyXG5cblx0XHRcdFx0XHR0aGlzLnBlcmNlbnRHZXJtaW5hdGlvbiA9IDBcblx0XHRcdFx0XHR0aGlzLnBlcmNlbnRQdXJlU2VlZCA9IDBcblx0XHRcdFx0XHR0aGlzLmNvc3RQZXJDV1QgPSAwXG5cdFx0XHRcdFx0dGhpcy50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMud2hlYXRQcmljZVBlckJ1c2hlbCA9IDBcblx0XHRcdFx0XHR0aGlzLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDBcblx0XHRcdFx0XHR0aGlzLmZsYXRSYXRlTGJQZXJBY3JlID0gMFxuXHRcdFx0XHRcdHRoaXMuYWNyZXNQbGFudGVkID0gMFxuXG5cdFx0XHRcdFx0dGhpcy51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAgLy8gcGVyIDEwMCwwMDAgc2VlZHMgcGVyIGFjcmVcblx0XHRcdFx0XHR0aGlzLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwIC8vIHBlciAxMDAsMDAwIHNlZWRzIHBlciBhY3JlXG5cblx0XHRcdFx0XHQvLyBPdGhlclxuXHRcdFx0XHRcdHRoaXMuaXNDZXJ0aWZpZWQgPSAhIWNlcnRpZmllZFxuXG5cdFx0XHRcdFx0Ly8gTWV0aG9kc1xuXHRcdFx0XHRcdHRoaXMucmVzZXRUb0RlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaXNDZXJ0aWZpZWQpIHtcblx0XHRcdFx0XHRcdFx0c2V0Q2VydGlmaWVkU2VlZERlZmF1bHRzKHRoaXMpXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZXRTYXZlZFNlZWREZWZhdWx0cyh0aGlzKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEluaXRpYWxpemVcblx0XHRcdFx0XHR0aGlzLnJlc2V0VG9EZWZhdWx0cygpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgT3B0aW1hbFNlZWRpbmdSYXRlSW1wYWN0RGF0YSA9IGZ1bmN0aW9uIChzZWVkc1BlckxiKSB7XG5cdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlZFxuXHRcdFx0XHRcdHRoaXMueWllbGRBZHZhbnRhZ2VCdXNoZWxzUGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLnNlZWRMYlBlckFjcmVSZXF1aXJlZCA9IDBcblx0XHRcdFx0XHR0aGlzLnNlZWRzUGVyQWNyZVJlcXVpcmVkID0gMFxuXHRcdFx0XHRcdHRoaXMuY29zdFBlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0ID0gMFxuXHRcdFx0XHRcdHRoaXMuYWN0dWFsU2VlZGluZ1JhdGUgPSAwXG5cdFx0XHRcdFx0dGhpcy5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gMFxuXHRcdFx0XHRcdHRoaXMub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0ID0gMFxuXHRcdFx0XHRcdHRoaXMuZmxhdFJhdGVDb3N0UGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLmNvc3RQZXJBY3JlRGlmZmVyZW5jZSA9IDBcblx0XHRcdFx0XHR0aGlzLnRvdGFsU2VlZENvc3QgPSAwXG5cdFx0XHRcdFx0dGhpcy50b3RhbFNlZWRDb3N0RGlmZmVyZW50aWFsID0gMFxuXHRcdFx0XHRcdHRoaXMucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgPSAwXG5cdFx0XHRcdFx0dGhpcy5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlID0gMFxuXHRcdFx0XHRcdHRoaXMubmV0UmV2ZW51ZUxiUGVyQWNyZSA9IDBcblx0XHRcdFx0XHR0aGlzLm9wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWVCZW5lZml0ID0gMFxuXG5cdFx0XHRcdFx0Ly8gT3RoZXJcblx0XHRcdFx0XHR0aGlzLnNlZWRzUGVyTGIgPSBzZWVkc1BlckxiXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgc2V0Q2VydGlmaWVkU2VlZERlZmF1bHRzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHRcdFx0dXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gMC45NVxuXHRcdFx0XHRcdHVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCA9IDAuOTg1XG5cdFx0XHRcdFx0dXNlckRhdGEuY29zdFBlckNXVCA9IDE4XG5cdFx0XHRcdFx0dXNlckRhdGEudGFyZ2V0WWllbGRCdXNoZWxzUGVyQWNyZSA9IDgwXG5cdFx0XHRcdFx0dXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IDMuNVxuXHRcdFx0XHRcdHVzZXJEYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IDEwMDAwMDBcblx0XHRcdFx0XHR1c2VyRGF0YS5mbGF0UmF0ZUxiUGVyQWNyZSA9IDEwMFxuXHRcdFx0XHRcdHVzZXJEYXRhLmFjcmVzUGxhbnRlZCA9IDI1MDBcblx0XHRcdFx0XHR1c2VyRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IDAuNVxuXHRcdFx0XHRcdHVzZXJEYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblxuXHRcdFx0XHRcdHVzZXJEYXRhLmlzQ2VydGlmaWVkID0gdHJ1ZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHNldFNhdmVkU2VlZERlZmF1bHRzID0gZnVuY3Rpb24gKHVzZXJEYXRhKSB7XG5cdFx0XHRcdFx0dXNlckRhdGEucGVyY2VudEdlcm1pbmF0aW9uID0gMC45M1xuXHRcdFx0XHRcdHVzZXJEYXRhLnBlcmNlbnRQdXJlU2VlZCA9IDAuOTVcblx0XHRcdFx0XHR1c2VyRGF0YS5jb3N0UGVyQ1dUID0gNy40NlxuXHRcdFx0XHRcdHVzZXJEYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSA4MFxuXHRcdFx0XHRcdHVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgPSAzLjVcblx0XHRcdFx0XHR1c2VyRGF0YS50YXJnZXRQbGFudFBvcHVsYXRpb24gPSAxMDAwMDAwXG5cdFx0XHRcdFx0dXNlckRhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSAxMDBcblx0XHRcdFx0XHR1c2VyRGF0YS5hY3Jlc1BsYW50ZWQgPSAyNTAwXG5cdFx0XHRcdFx0dXNlckRhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSAwLjVcblx0XHRcdFx0XHR1c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ID0gMC41XG5cblx0XHRcdFx0XHR1c2VyRGF0YS5pc0NlcnRpZmllZCA9IGZhbHNlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2FsY3VsYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRkYXRhLnNlZWRMYlBlckFjcmVSZXF1aXJlZCA9IGRhdGEudXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uIC8gKGRhdGEuc2VlZHNQZXJMYiAqIGRhdGEudXNlckRhdGEucGVyY2VudFB1cmVTZWVkICogZGF0YS51c2VyRGF0YS5wZXJjZW50R2VybWluYXRpb24pXG5cblx0XHRcdFx0XHRkYXRhLnNlZWRzUGVyQWNyZVJlcXVpcmVkID0gZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgKiBkYXRhLnNlZWRzUGVyTGJcblxuXHRcdFx0XHRcdGRhdGEuY29zdFBlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmNvc3RQZXJDV1QgKiAoZGF0YS5zZWVkTGJQZXJBY3JlUmVxdWlyZWQgLyAxMDApXG5cblx0XHRcdFx0XHRkYXRhLnRvdGFsU2VlZENvc3QgPSBkYXRhLmNvc3RQZXJBY3JlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0XHRcdGRhdGEuYWN0dWFsU2VlZGluZ1JhdGUgPSBkYXRhLnVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlICogZGF0YS5zZWVkc1BlckxiICogZGF0YS51c2VyRGF0YS5wZXJjZW50UHVyZVNlZWQgKiBkYXRhLnVzZXJEYXRhLnBlcmNlbnRHZXJtaW5hdGlvblxuXG5cdFx0XHRcdFx0ZGF0YS5zZWVkaW5nUmF0ZVZzVGFyZ2V0ID0gZGF0YS5hY3R1YWxTZWVkaW5nUmF0ZSAtIGRhdGEudXNlckRhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uXG5cblx0XHRcdFx0XHRkYXRhLm92ZXJVbmRlclNlZWRpbmdQb3RlbnRpYWxZaWVsZEltcGFjdCA9IGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCA8IDBcblx0XHRcdFx0XHRcdD8gKGRhdGEuc2VlZGluZ1JhdGVWc1RhcmdldCAvIDEwMDAwMCkgKiBkYXRhLnVzZXJEYXRhLnVuZGVyU2VlZGluZ1lpZWxkSW1wYWN0ICogZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlXG5cdFx0XHRcdFx0XHQ6IChkYXRhLnNlZWRpbmdSYXRlVnNUYXJnZXQgLyAxMDAwMDApICogZGF0YS51c2VyRGF0YS5vdmVyU2VlZGluZ1lpZWxkSW1wYWN0ICogZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICogLTFcblxuXHRcdFx0XHRcdGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZSA9IGRhdGEudXNlckRhdGEuY29zdFBlckNXVCAqIChkYXRhLnVzZXJEYXRhLmZsYXRSYXRlTGJQZXJBY3JlIC8gMTAwKVxuXG5cdFx0XHRcdFx0ZGF0YS5jb3N0UGVyQWNyZURpZmZlcmVuY2UgPSBkYXRhLmNvc3RQZXJBY3JlIC0gZGF0YS5mbGF0UmF0ZUNvc3RQZXJBY3JlXG5cblx0XHRcdFx0XHRkYXRhLnRvdGFsU2VlZENvc3RGbGF0UmF0ZSA9IGRhdGEuZmxhdFJhdGVDb3N0UGVyQWNyZSAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkXG5cblx0XHRcdFx0XHRkYXRhLnRvdGFsU2VlZENvc3RGbGF0UmF0ZURpZmZlcmVudGlhbCA9IGRhdGEuY29zdFBlckFjcmVEaWZmZXJlbmNlICogZGF0YS51c2VyRGF0YS5hY3Jlc1BsYW50ZWRcblxuXHRcdFx0XHRcdGRhdGEucG90ZW50aWFsWWllbGRCZW5lZml0QnVzaGVsc1BlckFjcmUgPSBkYXRhLnVzZXJEYXRhLmlzQ2VydGlmaWVkID8gKGRhdGEudXNlckRhdGEuc2Vhc29uLnRvTG93ZXJDYXNlKCkgPT09ICdzcHJpbmcnID8gNC41IDogNy41KSA6IDBcblxuXHRcdFx0XHRcdGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSA9ICgoZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSkgKiBkYXRhLnVzZXJEYXRhLndoZWF0UHJpY2VQZXJCdXNoZWwgKiBkYXRhLnVzZXJEYXRhLmFjcmVzUGxhbnRlZCkgLSBkYXRhLnRvdGFsU2VlZENvc3RcblxuXHRcdFx0XHRcdGRhdGEubmV0UmV2ZW51ZUxiUGVyQWNyZSA9ICgoZGF0YS51c2VyRGF0YS50YXJnZXRZaWVsZEJ1c2hlbHNQZXJBY3JlICsgZGF0YS5wb3RlbnRpYWxZaWVsZEJlbmVmaXRCdXNoZWxzUGVyQWNyZSArIGRhdGEub3ZlclVuZGVyU2VlZGluZ1BvdGVudGlhbFlpZWxkSW1wYWN0KSAqIGRhdGEudXNlckRhdGEud2hlYXRQcmljZVBlckJ1c2hlbCAqIGRhdGEudXNlckRhdGEuYWNyZXNQbGFudGVkKSAtIGRhdGEudG90YWxTZWVkQ29zdFxuXG5cdFx0XHRcdFx0ZGF0YS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlQmVuZWZpdCA9IGRhdGEub3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZSAtIGRhdGEubmV0UmV2ZW51ZUxiUGVyQWNyZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGdldERhdGFTZXJpZXMgPSBmdW5jdGlvbiAodXNlckRhdGEpIHtcblx0XHRcdFx0XHR2YXIgc2VyaWVzID0gW11cblxuXHRcdFx0XHRcdGZvciAodmFyIHNlZWRzUGVyTGIgPSBTRUVEU19QRVJfTEJfTUlOOyBzZWVkc1BlckxiIDw9IFNFRURTX1BFUl9MQl9NQVg7IHNlZWRzUGVyTGIgKz0gU0VFRFNfUEVSX0xCX1NURVApIHtcblx0XHRcdFx0XHRcdHZhciBkYXRhSXRlbSA9IG5ldyBPcHRpbWFsU2VlZGluZ1JhdGVJbXBhY3REYXRhKHNlZWRzUGVyTGIpXG5cblx0XHRcdFx0XHRcdC8vIE1lcmdlIGluIHRoZSB1c2VyRGF0YSBwcm9wZXJ0aWVzXG5cdFx0XHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YSA9IHt9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBwcm9wIGluIHVzZXJEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh1c2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB0eXBlb2YgdXNlckRhdGFbcHJvcF0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRhSXRlbS51c2VyRGF0YVtwcm9wXSA9IHVzZXJEYXRhW3Byb3BdXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y2FsY3VsYXRlKGRhdGFJdGVtKVxuXHRcdFx0XHRcdFx0c2VyaWVzLnB1c2goZGF0YUl0ZW0pXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHNlcmllc1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGdldFNlcmllc0NvbHVtbkRhdGEgPSBmdW5jdGlvbiAoc2VyaWVzLCBjb2x1bW4pIHtcblx0XHRcdFx0XHR2YXIgZGF0YSA9IFtdXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IHNlcmllc1tpXTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRkYXRhLnB1c2goc2VyaWVzW2ldW2NvbHVtbl0pXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0U2VlZENhbGNVc2VyRGF0YTogU2VlZENhbGNVc2VyRGF0YSxcblx0XHRcdFx0XHRnZXREYXRhU2VyaWVzOiBnZXREYXRhU2VyaWVzLFxuXHRcdFx0XHRcdGdldFNlcmllc0NvbHVtbkRhdGE6IGdldFNlcmllc0NvbHVtbkRhdGFcblx0XHRcdFx0fVxuXHRcdFx0fSgpKVxuXG5cdFx0XHR2YXIgU2VlZENhbGMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBDT05TVEFOVFNcblx0XHRcdFx0dmFyIENIQVJUX01PQklMRV9TTUFMTF9NQVhfV0lEVEggPSA0MDAgICAvLyBtYXggd2lkdGggZm9yIHNtYWxsIGRldmljZXNcblx0XHRcdFx0dmFyIENIQVJUX01PQklMRV9TTUFMTF9NQVhfSEVJR0hUID0gMjY3ICAvLyBtYXggaGVpZ2h0IGZvciBzbWFsbCBkZXZpY2VzXG5cdFx0XHRcdHZhciBDSEFSVF9NT0JJTEVfTUFYX1dJRFRIID0gNjAwICAgLy8gbWF4IHdpZHRoIGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdFx0XHR2YXIgQ0hBUlRfTU9CSUxFX01BWF9IRUlHSFQgPSAzMDAgIC8vIG1heCBoZWlnaHQgZm9yIG1vYmlsZSBkZXZpY2VzXG5cdFx0XHRcdHZhciBDSEFSVF9NQVhfV0lEVEggPSA2MDBcblx0XHRcdFx0dmFyIENIQVJUX01BWF9IRUlHSFQgPSAzMDBcblx0XHRcdFx0dmFyIENPTE9SX0RBUktfUkVEID0gJyM1MjkzQUInXG5cdFx0XHRcdHZhciBDT0xPUl9MSUdIVF9SRUQgPSAnIzcyYjFjOCdcblx0XHRcdFx0dmFyIENPTE9SX0RBUktfQkxVRSA9ICcjMzczODM2J1xuXHRcdFx0XHR2YXIgQ09MT1JfTElHSFRfQkxVRSA9ICcjNjQ2NTYwJ1xuXG5cdFx0XHRcdC8vIFBST1BFUlRJRVNcblxuXHRcdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGEgPSBuZXcgU2VlZENhbGNEYXRhLlNlZWRDYWxjVXNlckRhdGEodHJ1ZSlcblx0XHRcdFx0dmFyIHNhdmVkU2VlZERhdGEgPSBuZXcgU2VlZENhbGNEYXRhLlNlZWRDYWxjVXNlckRhdGEoKVxuXG5cdFx0XHRcdC8vIE1FVEhPRFNcblxuXHRcdFx0XHR2YXIgaXNNb2JpbGVTbWFsbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5nZXRWaWV3cG9ydFdpZHRoKCkgPCBDSEFSVF9NT0JJTEVfU01BTExfTUFYX1dJRFRIXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaXNNb2JpbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFV0aWxpdHkuZ2V0Vmlld3BvcnRXaWR0aCgpIDwgQ0hBUlRfTU9CSUxFX01BWF9XSURUSFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGNhbGN1bGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cdFx0XHRcdFx0Zm9ybS5jbGFzc0xpc3QuYWRkKCdjYWxjdWxhdGVkJylcblxuXHRcdFx0XHRcdC8vIEdldCBmb3JtIGZpZWxkIGRhdGFcblx0XHRcdFx0XHR1cGRhdGVVc2VyRGF0YUZyb21Gb3JtKClcblxuXHRcdFx0XHRcdC8vIFNjcm9sbCB0byBmaXJzdCBncmFwaCAoc2V0IGEgZGVsYXkgdG8gYWxsb3cgdGhlIHNlY3Rpb25zIHRvIGJlY29tZSB2aXNpYmxlKVxuXHRcdFx0XHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gXHR2YXIgaGVhZGVyQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtc2l0ZS1uYXYtd3JhcHBlci1oZWFkZXInKSxcblx0XHRcdFx0XHQvLyBcdFx0aGVhZGVyQmFyRml4ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXJCYXIpLnBvc2l0aW9uID09PSAnZml4ZWQnLFxuXHRcdFx0XHRcdC8vIFx0XHRvZmZzZXQgPSBoZWFkZXJCYXJGaXhlZCA/IC1oZWFkZXJCYXIuY2xpZW50SGVpZ2h0IDogMCxcblx0XHRcdFx0XHQvLyBcdFx0dG9wID0gVXRpbGl0eS5nZXRUb3AoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGMtc2VjdGlvbicpKSArIG9mZnNldFxuXHRcdFx0XHRcdC8vIFx0c21vb3RoU2Nyb2xsKHRvcClcblx0XHRcdFx0XHQvLyB9LCA1MClcblxuXHRcdFx0XHRcdC8vIFJlLXJlbmRlciB0aGUgZ3JhcGhzXG5cdFx0XHRcdFx0dmFyIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoY2VydGlmaWVkU2VlZERhdGEpXG5cdFx0XHRcdFx0dmFyIHNhdmVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhzYXZlZFNlZWREYXRhKVxuXHRcdFx0XHRcdHVwZGF0ZUdyYXBocyhjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblxuXHRcdFx0XHRcdC8vIFNldCB0aGUgQ2FsY3VsYXRlIGJ1dHRvbiB0ZXh0XG5cdFx0XHRcdFx0dmFyIGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdGUnKVxuXHRcdFx0XHRcdGlmIChidG4udGV4dENvbnRlbnQgPT09ICdDYWxjdWxhdGUnKSB7XG5cdFx0XHRcdFx0XHRidG4udGV4dENvbnRlbnQgPSAnUmUtQ2FsY3VsYXRlJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXBkYXRlVXNlckRhdGFGcm9tRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS5wZXJjZW50R2VybWluYXRpb24gPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCA9IHBhcnNlRmxvYXQoZm9ybVsnY2VydF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLmNvc3RQZXJDV1QgPSBwYXJzZUZsb2F0KGZvcm1bJ2NlcnRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUpXG5cblx0XHRcdFx0XHRzYXZlZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9nZXJtaW5hdGlvbiddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdHNhdmVkU2VlZERhdGEucGVyY2VudFB1cmVTZWVkID0gcGFyc2VGbG9hdChmb3JtWydzYXZlZF9zZWVkX3B1cmVfc2VlZCddLnZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdHNhdmVkU2VlZERhdGEuY29zdFBlckNXVCA9IHBhcnNlRmxvYXQoZm9ybVsnc2F2ZWRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUpXG5cblx0XHRcdFx0XHQvLyBUaGVzZSBmaWVsZHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZXMgaW4gYm90aCBkYXRhc2V0c1xuXHRcdFx0XHRcdHZhciBzZWFzb25zID0gZm9ybVsnY3JvcF9zZWFzb24nXVxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2Vhc29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKHNlYXNvbnNbaV0uY2hlY2tlZCkgY2VydGlmaWVkU2VlZERhdGEuc2Vhc29uID0gc2F2ZWRTZWVkRGF0YS5zZWFzb24gPSBzZWFzb25zW2ldLnZhbHVlXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGNlcnRpZmllZFNlZWREYXRhLnNlYXNvbiA9IHNhdmVkU2VlZERhdGEuc2Vhc29uID0gZm9ybVsnY3JvcF9zZWFzb24nXS52YWx1ZVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBzYXZlZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmUgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfdGFyZ2V0X3lpZWxkJ10udmFsdWUpXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IHNhdmVkU2VlZERhdGEud2hlYXRQcmljZVBlckJ1c2hlbCA9IHBhcnNlRmxvYXQoZm9ybVsnY3JvcF93aGVhdF9wcmljZSddLnZhbHVlKVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFBsYW50UG9wdWxhdGlvbiA9IHNhdmVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX3RhcmdldF9wbGFudGluZ19wb3B1bGF0aW9uJ10udmFsdWUpXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmUgPSBzYXZlZFNlZWREYXRhLmZsYXRSYXRlTGJQZXJBY3JlID0gcGFyc2VGbG9hdChmb3JtWydjcm9wX2ZsYXRfc2VlZGluZ19yYXRlJ10udmFsdWUpXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEuYWNyZXNQbGFudGVkID0gc2F2ZWRTZWVkRGF0YS5hY3Jlc1BsYW50ZWQgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfYWNyZXNfcGxhbnRlZCddLnZhbHVlKVxuXHRcdFx0XHRcdGNlcnRpZmllZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBzYXZlZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnXS52YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRjZXJ0aWZpZWRTZWVkRGF0YS51bmRlclNlZWRpbmdZaWVsZEltcGFjdCA9IHNhdmVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3QgPSBwYXJzZUZsb2F0KGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3RfdW5kZXJzZWVkaW5nJ10udmFsdWUpIC8gMTAwXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXBkYXRlRm9ybUZyb21Vc2VyRGF0YSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cblx0XHRcdFx0XHRmb3JtWydjZXJ0X3NlZWRfZ2VybWluYXRpb24nXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiAqIDEwMFxuXHRcdFx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9wdXJlX3NlZWQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCAqIDEwMFxuXHRcdFx0XHRcdGZvcm1bJ2NlcnRfc2VlZF9jb3N0X3Blcl91bml0J10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdFx0XHRmb3JtWydzYXZlZF9zZWVkX2dlcm1pbmF0aW9uJ10udmFsdWUgPSBzYXZlZFNlZWREYXRhLnBlcmNlbnRHZXJtaW5hdGlvbiAqIDEwMFxuXHRcdFx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfcHVyZV9zZWVkJ10udmFsdWUgPSBzYXZlZFNlZWREYXRhLnBlcmNlbnRQdXJlU2VlZCAqIDEwMFxuXHRcdFx0XHRcdGZvcm1bJ3NhdmVkX3NlZWRfY29zdF9wZXJfdW5pdCddLnZhbHVlID0gc2F2ZWRTZWVkRGF0YS5jb3N0UGVyQ1dUXG5cblx0XHRcdFx0XHQvLyBUaGVzZSBmaWVsZHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZXMgaW4gYm90aCBkYXRhc2V0cywgc28ganVzdCB1c2UgdGhlIGZpcnN0IG9uZVxuXHRcdFx0XHRcdC8vIGZvcm1bJ2Nyb3Bfc2Vhc29uJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gLy8gYnJva2VuIGluIFNhZmFyaVxuXHRcdFx0XHRcdGlmIChjZXJ0aWZpZWRTZWVkRGF0YS5zZWFzb24gPT09ICd3aW50ZXInKSB7XG5cdFx0XHRcdFx0XHRmb3JtWydjcm9wX3NlYXNvbiddWzBdLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZvcm1bJ2Nyb3Bfc2Vhc29uJ11bMV0uY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF90YXJnZXRfeWllbGQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLnRhcmdldFlpZWxkQnVzaGVsc1BlckFjcmVcblx0XHRcdFx0XHRmb3JtWydjcm9wX3doZWF0X3ByaWNlJ10udmFsdWUgPSBjZXJ0aWZpZWRTZWVkRGF0YS53aGVhdFByaWNlUGVyQnVzaGVsXG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF90YXJnZXRfcGxhbnRpbmdfcG9wdWxhdGlvbiddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudGFyZ2V0UGxhbnRQb3B1bGF0aW9uXG5cdFx0XHRcdFx0Zm9ybVsnY3JvcF9mbGF0X3NlZWRpbmdfcmF0ZSddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEuZmxhdFJhdGVMYlBlckFjcmVcblx0XHRcdFx0XHRmb3JtWydjcm9wX2FjcmVzX3BsYW50ZWQnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLmFjcmVzUGxhbnRlZFxuXHRcdFx0XHRcdGZvcm1bJ2Nyb3BfcGVyY2VudF95aWVsZF9pbXBhY3Rfb3ZlcnNlZWRpbmcnXS52YWx1ZSA9IGNlcnRpZmllZFNlZWREYXRhLm92ZXJTZWVkaW5nWWllbGRJbXBhY3Rcblx0XHRcdFx0XHRmb3JtWydjcm9wX3BlcmNlbnRfeWllbGRfaW1wYWN0X3VuZGVyc2VlZGluZyddLnZhbHVlID0gY2VydGlmaWVkU2VlZERhdGEudW5kZXJTZWVkaW5nWWllbGRJbXBhY3Rcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzaG93UmVzZXRMaW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmVzZXQgbGluayBpcyB2aXNpYmxlXG5cdFx0XHRcdFx0dmFyIHJlc2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJyk7XG5cdFx0XHRcdFx0cmVzZXRMaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGhpZGVSZXNldExpbmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSByZXNldCBsaW5rIGlzIHZpc2libGVcblx0XHRcdFx0XHR2YXIgcmVzZXRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X2Zvcm0nKTtcblx0XHRcdFx0XHRyZXNldExpbmsuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmVzZXRJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gUmVzZXQgdGhlIGRhdGEgdmFsdWVzIHRvIGRlZmF1bHRzXG5cdFx0XHRcdFx0Y2VydGlmaWVkU2VlZERhdGEucmVzZXRUb0RlZmF1bHRzKClcblx0XHRcdFx0XHRzYXZlZFNlZWREYXRhLnJlc2V0VG9EZWZhdWx0cygpXG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgZm9ybSBmaWVsZCB2YWx1ZXNcblx0XHRcdFx0XHR1cGRhdGVGb3JtRnJvbVVzZXJEYXRhKClcblxuXHRcdFx0XHRcdC8vIEhpZGUgdGhlIHJlc2V0IGxpbmsgYWdhaW5cblx0XHRcdFx0XHRoaWRlUmVzZXRMaW5rKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZ2V0Q2hhcnRDYW52YXNIdG1sID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdFx0dmFyIHZpZXdwb3J0V2lkdGggPSBVdGlsaXR5LmdldFZpZXdwb3J0V2lkdGgoKVxuXHRcdFx0XHRcdHZhciBjYW52YXNTaXplID0ge1xuXHRcdFx0XHRcdFx0d2lkdGg6IGlzTW9iaWxlKCkgPyB2aWV3cG9ydFdpZHRoIDogQ0hBUlRfTUFYX1dJRFRILFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBpc01vYmlsZVNtYWxsKCkgPyBDSEFSVF9NT0JJTEVfU01BTExfTUFYX0hFSUdIVCA6IGlzTW9iaWxlKCkgPyBDSEFSVF9NT0JJTEVfTUFYX0hFSUdIVCA6IENIQVJUX01BWF9IRUlHSFRcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgaHRtbCA9ICc8Y2FudmFzIGlkPVwiJyArIGlkICsgJ1wiIGNsYXNzPVwiZ3JhcGggYmxvY2stY2VudGVyXCIgd2lkdGg9XCInICsgY2FudmFzU2l6ZS53aWR0aCArICdcIiBoZWlnaHQ9XCInICsgY2FudmFzU2l6ZS5oZWlnaHQgKyAnXCI+PC9jYW52YXM+J1xuXG5cdFx0XHRcdFx0cmV0dXJuIGh0bWxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzZXRDaGFydERlZmF1bHRzID0gZnVuY3Rpb24gKGFuaW1hdGUpIHtcblx0XHRcdFx0XHQvLyBHbG9iYWwgY2hhcnQgY29uZmlnXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250RmFtaWx5ID0gJ1wiR290aGFtIFNTbSBBXCIsIFwiR290aGFtIFNTbSBCXCIsIEx1Y2lkYSBHcmFuZGUsIFwiTHVjaWRhIEdyYW5kZVwiLCBMdWNpZGEgU2FucyBVbmljb2RlLCBcIkx1Y2lkYSBTYW5zIFVuaWNvZGVcIiwgTHVjaWRhIFNhbnMsIFwiTHVjaWRhIFNhbnNcIiwgR2VuZXZhLCBWZXJkYW5hLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJ1xuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxNlxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZVxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLmxpbmUuYm9yZGVyV2lkdGggPSAyXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLmxpbmUuZmlsbCA9IGZhbHNlXG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzID0gNVxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5ib3JkZXJXaWR0aCA9IDJcblxuXHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5hbmltYXRpb24uZHVyYXRpb24gPSBhbmltYXRlID09PSBmYWxzZSA/IDAgOiAxMDAwXG5cblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubGVnZW5kLmRpc3BsYXkgPSBmYWxzZVxuXG5cdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmV2ZW50cyA9IHVuZGVmaW5lZCAvLyBpZ25vcmUgbW91c2UvdG91Y2ggZXZlbnRzXG5cblx0XHRcdFx0XHQvLyBzcGVjaWFsIHNldHRpbmdzIGZvciBzbWFsbGVyIHNjcmVlbiBzaXplc1xuXHRcdFx0XHRcdGlmIChpc01vYmlsZVNtYWxsKCkpIHtcblx0XHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxMVxuXHRcdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzTW9iaWxlKCkpIHtcblx0XHRcdFx0XHRcdENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udFNpemUgPSAxMlxuXHRcdFx0XHRcdFx0Q2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LnJhZGl1cyA9IDRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXBkYXRlR3JhcGhDb21wYXJlSW1wYWN0ID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKSB7XG5cdFx0XHRcdFx0Ly8gU2V0IHVwIGdyYXBoIGNhbnZhc1xuXHRcdFx0XHRcdHZhciBjaGFydElkID0gJ2dyYXBoX2NvbXBhcmVfaW1wYWN0J1xuXHRcdFx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfc2VjdGlvbicpXG5cdFx0XHRcdFx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ193cmFwcGVyJylcblx0XHRcdFx0XHR2YXIgbGVnZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfbGVnZW5kJylcblx0XHRcdFx0XHR2YXIgY2FudmFzID0gZ2V0Q2hhcnRDYW52YXNIdG1sKGNoYXJ0SWQpXG5cdFx0XHRcdFx0dmFyIG1vYmlsZSA9IGlzTW9iaWxlKClcblx0XHRcdFx0XHR2YXIgbW9iaWxlU21hbGwgPSBpc01vYmlsZVNtYWxsKClcblxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgJ2hpZGRlbicgQ1NTIGNsYXNzXG5cdFx0XHRcdFx0c2VjdGlvbi5jbGFzc05hbWUgPSBzZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqXFxiaGlkZGVuXFxiL2csICcnKVxuXG5cdFx0XHRcdFx0Ly8gZGVzdHJveSBhbmQgcmVjcmVhdGUgdGhlIGNhbnZhc1xuXHRcdFx0XHRcdGlmICh3cmFwcGVyLmhhc0NoaWxkTm9kZXMoKSkgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmNoaWxkTm9kZXNbMF0pXG5cdFx0XHRcdFx0d3JhcHBlci5pbm5lckhUTUwgPSBjYW52YXNcblxuXHRcdFx0XHRcdC8vIEdldCB0aGUgeC1heGlzIGxhYmVsc1xuXHRcdFx0XHRcdHZhciB4TGFiZWxzID0gW11cblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbaV07IGkrKykge1xuXHRcdFx0XHRcdFx0eExhYmVscy5wdXNoKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzW2ldLnNlZWRzUGVyTGIudG9TdHJpbmcoKSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdFx0XHR2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZClcblx0XHRcdFx0XHR2YXIgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnbGluZScsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdGxhYmVsczogeExhYmVscyxcblx0XHRcdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFNlZWRDYWxjRGF0YS5nZXRTZXJpZXNDb2x1bW5EYXRhKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCAnb3B0aW1hbFNlZWRpbmdSYXRlTmV0UmV2ZW51ZScpLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfREFSS19SRUQsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0RBUktfUkVELFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJvcmRlckNvbG9yOiBDT0xPUl9EQVJLX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAnY2lyY2xlJyxcblx0XHRcdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fY2lyY2xlLWxpbmUtYmx1ZS1zb2xpZC5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiAnQ2VydGlmaWVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgJ25ldFJldmVudWVMYlBlckFjcmUnKSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0xJR0hUX1JFRCxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfTElHSFRfUkVELFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdjaXJjbGUnLFxuXHRcdFx0XHRcdFx0XHRcdGxlZ2VuZEljb25JbWFnZTogJy93cC1jb250ZW50L3RoZW1lcy9jb25uZWN0SU4vYXNzZXRzL2ltYWdlcy9pY29uX19jaXJjbGUtbGluZS1ibHVlLnBuZycgLy8gbm9uLWFwaSBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IE9wdGltYWwgU2VlZGluZyBSYXRlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogU2VlZENhbGNEYXRhLmdldFNlcmllc0NvbHVtbkRhdGEoc2F2ZWRTZWVkRGF0YVNlcmllcywgJ29wdGltYWxTZWVkaW5nUmF0ZU5ldFJldmVudWUnKSxcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0RBUktfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50QmFja2dyb3VuZENvbG9yOiBDT0xPUl9EQVJLX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRCb3JkZXJDb2xvcjogQ09MT1JfREFSS19CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50UmFkaXVzOiBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQucmFkaXVzICsgMSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludFN0eWxlOiAncmVjdCcsXG5cdFx0XHRcdFx0XHRcdFx0bGVnZW5kSWNvbkltYWdlOiAnL3dwLWNvbnRlbnQvdGhlbWVzL2Nvbm5lY3RJTi9hc3NldHMvaW1hZ2VzL2ljb25fX3NxdWFyZS1saW5lLWRhcmstc29saWQucG5nJyAvLyBub24tYXBpIHByb3BlcnR5XG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogJ1NhdmVkIFNlZWQgTmV0IFJldmVudWUgYnkgTGJzL0EgKCQpJyxcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBTZWVkQ2FsY0RhdGEuZ2V0U2VyaWVzQ29sdW1uRGF0YShzYXZlZFNlZWREYXRhU2VyaWVzLCAnbmV0UmV2ZW51ZUxiUGVyQWNyZScpLFxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogQ09MT1JfTElHSFRfQkxVRSxcblx0XHRcdFx0XHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50Qm9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX0JMVUUsXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRSYWRpdXM6IENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5yYWRpdXMgKyAxLFxuXHRcdFx0XHRcdFx0XHRcdHBvaW50U3R5bGU6ICdyZWN0Jyxcblx0XHRcdFx0XHRcdFx0XHRsZWdlbmRJY29uSW1hZ2U6ICcvd3AtY29udGVudC90aGVtZXMvY29ubmVjdElOL2Fzc2V0cy9pbWFnZXMvaWNvbl9fc3F1YXJlLWxpbmUtZGFyay5wbmcnIC8vIG5vbi1hcGkgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHRcdFx0XHRcdHhBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdib3R0b20nLFxuXHRcdFx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ1NlZWRzL0xiJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9udFN0eWxlOiAnYm9sZCdcblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aWNrczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGluZGV4ICUgMiA9PT0gMCA/IFV0aWxpdHkuYWRkRGlnaXRTZXBhcmF0b3JzKHZhbHVlKSA6ICcnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdFx0XHR5QXhlczogW3tcblx0XHRcdFx0XHRcdFx0XHRcdHNjYWxlTGFiZWw6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdOZXQgUmV2ZW51ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb250U3R5bGU6ICdib2xkJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdHRpY2tzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gVXRpbGl0eS5mb3JtYXRDdXJyZW5jeSh2YWx1ZSwgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblxuXHRcdCAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgJCgnI2NvbXBhcmVHcmFwaCcpLnZhbChjaGFydC50b0Jhc2U2NEltYWdlKCkpXG5cdFx0ICAgICAgfSwgMTUwMClcblxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBsZWdlbmRcblx0XHRcdFx0XHRsZWdlbmQuY2xhc3NMaXN0LmFkZCgnY2FsYy1jaGFydC10eXBlLScgKyBjaGFydC5jb25maWcudHlwZSk7XG5cblx0XHRcdFx0XHR2YXIgbGVnZW5kSHRtbCA9ICc8ZGl2Pidcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMCwgaXRlbTsgdHlwZW9mIChpdGVtID0gY2hhcnQuY29uZmlnLmRhdGEuZGF0YXNldHNbaV0pICE9PSAndW5kZWZpbmVkJzsgaSsrKSB7XG5cdFx0XHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8ZGl2PjxpbWcgY2xhc3M9XCJjYWxjLWxlZ2VuZC1pY29uXCIgc3JjPVwiJyArIGl0ZW0ubGVnZW5kSWNvbkltYWdlICsgJ1wiIGFsdD1cIlwiPiA8c3BhbiBjbGFzcz1cImNhbGMtbGVnZW5kLWxhYmVsXCI+JyArIGl0ZW0ubGFiZWwgKyAnPC9zcGFuPjwvZGl2Pidcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGVnZW5kSHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdFx0XHRsZWdlbmQuaW5uZXJIVE1MID0gbGVnZW5kSHRtbFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHVwZGF0ZUdyYXBoTWF4aW1pemVSZXZlbnVlID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzKSB7XG5cdFx0XHRcdFx0Ly8gUmVzZXQgc29tZSBnbG9iYWwgY2hhcnQgZGVmYXVsdHNcblx0XHRcdFx0XHRDaGFydC5kZWZhdWx0cy5nbG9iYWwubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWVcblxuXHRcdFx0XHRcdC8vIFNldCB1cCBncmFwaCBjYW52YXNcblx0XHRcdFx0XHR2YXIgY2hhcnRJZCA9ICdncmFwaF9tYXhpbWl6ZV9yZXZlbnVlJ1xuXHRcdFx0XHRcdHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfc2VjdGlvbicpXG5cdFx0XHRcdFx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjaGFydElkICsgJ193cmFwcGVyJylcblx0XHRcdFx0XHR2YXIgbGVnZW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZCArICdfbGVnZW5kJylcblx0XHRcdFx0XHR2YXIgY2FudmFzID0gZ2V0Q2hhcnRDYW52YXNIdG1sKGNoYXJ0SWQpXG5cblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlICdoaWRkZW4nIENTUyBjbGFzc1xuXHRcdFx0XHRcdHNlY3Rpb24uY2xhc3NOYW1lID0gc2VjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKlxcYmhpZGRlblxcYi9nLCAnJylcblxuXHRcdFx0XHRcdC8vIGRlc3Ryb3kgYW5kIHJlY3JlYXRlIHRoZSBjYW52YXNcblx0XHRcdFx0XHRpZiAod3JhcHBlci5oYXNDaGlsZE5vZGVzKCkpIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5jaGlsZE5vZGVzWzBdKVxuXHRcdFx0XHRcdHdyYXBwZXIuaW5uZXJIVE1MID0gY2FudmFzXG5cblx0XHRcdFx0XHQvLyBDb25maWd1cmUgYW5kIHJlbmRlciB0aGUgY2hhcnRcblx0XHRcdFx0XHR2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2hhcnRJZClcblx0XHRcdFx0XHR2YXIgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnYmFyJyxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0bGFiZWxzOiBbXSxcblx0XHRcdFx0XHRcdFx0ZGF0YXNldHM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdDZXJ0aWZpZWQgU2VlZCBOZXQgUmV2ZW51ZSBieSBPcHRpbWFsIFNlZWRpbmcgUmF0ZSAoJCknLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IFsgY2VydGlmaWVkU2VlZERhdGFTZXJpZXNbIGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLmxlbmd0aCAtIDEgXS5vcHRpbWFsU2VlZGluZ1JhdGVOZXRSZXZlbnVlIF0sXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9SRUQsXG5cdFx0XHRcdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IENPTE9SX0xJR0hUX1JFRFxuXHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6ICdTYXZlZCBTZWVkIE5ldCBSZXZlbnVlIGJ5IExicy9BICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogWyBzYXZlZFNlZWREYXRhU2VyaWVzWyBzYXZlZFNlZWREYXRhU2VyaWVzLmxlbmd0aCAtIDEgXS5uZXRSZXZlbnVlTGJQZXJBY3JlIF0sXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBDT0xPUl9MSUdIVF9CTFVFLFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlckNvbG9yOiBDT0xPUl9MSUdIVF9CTFVFXG5cdFx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRcdG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG5cdFx0XHRcdFx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHRcdFx0XHRcdHlBeGVzOiBbe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2NhbGVMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbFN0cmluZzogJ05ldCBSZXZlbnVlICgkKScsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvbnRTdHlsZTogJ2JvbGQnXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0dGlja3M6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBVdGlsaXR5LmZvcm1hdEN1cnJlbmN5KHZhbHVlLCBmYWxzZSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXG5cdFx0ICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAkKCcjcmV2ZW51ZUdyYXBoJykudmFsKGNoYXJ0LnRvQmFzZTY0SW1hZ2UoKSlcblx0XHQgICAgICB9LCAxNTAwKVxuXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZFxuXHRcdFx0XHRcdGxlZ2VuZC5jbGFzc0xpc3QuYWRkKCdjYWxjLWNoYXJ0LXR5cGUtJyArIGNoYXJ0LmNvbmZpZy50eXBlKTtcblxuXHRcdFx0XHRcdHZhciBsZWdlbmRIdG1sID0gJzxkaXY+J1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyB0eXBlb2YgKGl0ZW0gPSBjaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1tpXSkgIT09ICd1bmRlZmluZWQnOyBpKyspIHtcblx0XHRcdFx0XHRcdGxlZ2VuZEh0bWwgKz0gJzxkaXY+PHNwYW4gY2xhc3M9XCJjYWxjLWxlZ2VuZC1pY29uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBpdGVtLmJhY2tncm91bmRDb2xvciArICdcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FsYy1sZWdlbmQtbGFiZWxcIj4nICsgaXRlbS5sYWJlbCArICc8L3NwYW4+PC9kaXY+J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsZWdlbmRIdG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0XHRcdGxlZ2VuZC5pbm5lckhUTUwgPSBsZWdlbmRIdG1sXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdXBkYXRlR3JhcGhzID0gZnVuY3Rpb24gKGNlcnRpZmllZFNlZWREYXRhU2VyaWVzLCBzYXZlZFNlZWREYXRhU2VyaWVzLCBhbmltYXRlKSB7XG5cdFx0XHRcdFx0c2V0Q2hhcnREZWZhdWx0cyhhbmltYXRlKVxuXHRcdFx0XHRcdHVwZGF0ZUdyYXBoQ29tcGFyZUltcGFjdChjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblx0XHRcdFx0XHR1cGRhdGVHcmFwaE1heGltaXplUmV2ZW51ZShjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcylcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEVWRU5UU1xuXG5cdFx0XHRcdHZhciBvbkNhbGN1bGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdFx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcblx0XHRcdFx0XHRcdCAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0ICAkKCcuY2FsYy1maWVsZCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQgICAgaWYgKCAkKHRoaXMpLnZhbCgpID09PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1wiYm9yZGVyLWNvbG9yXCI6IFwicmVkXCJ9KVxuXHRcdFx0XHRcdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpc1ZhbGlkKVxuXHRcdFx0XHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuY3NzKHtcImJvcmRlci1jb2xvclwiOiBcIiM2NjY2NWNcIn0pXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHRcdCAgcmV0dXJuIGlzVmFsaWQ7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0dmFyIGdvID0gdmFsaWRhdGVGb3JtKClcblx0XHRcdFx0XHRcdHZhciBlcnJvckZvcm1NZXNzYWdlID0gJzxzcGFuIGNsYXNzPVwiZXJyb3JGb3JtTWVzc2FnZVwiPllvdSBtdXN0IGNvbXBsZXRlIGFsbCBmaWVsZHMgYWJvdmUgdG8gY2FsY3VsYXRlLjwvc3Bhbj4nXG5cdFx0XHRcdFx0XHRpZiAoIGdvID09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2l0IGlzIHZhbGlkJylcblx0XHRcdFx0XHRcdFx0JCgnLmVycm9yRm9ybU1lc3NhZ2UnKS5yZW1vdmUoKVxuXHRcdFx0XHRcdFx0XHQkKCcjZ3JhcGhfY29tcGFyZV9pbXBhY3Rfc2VjdGlvbiAsICNncmFwaF9tYXhpbWl6ZV9yZXZlbnVlX3NlY3Rpb24nKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdFx0XHQkKCcuYWN0aW9uRGF0YScpLnNob3coKS5zbGlkZURvd24oKVxuXHRcdFx0XHRcdFx0XHRjYWxjdWxhdGUoKVxuXHRcdFx0XHRcdFx0fWVsc2UgaWYgKCBnbyA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnaXQgaXMgbm90IHZhbGlkJylcblx0XHRcdFx0XHRcdFx0aWYgKCQoJy5lcnJvckZvcm1NZXNzYWdlJylbMF0pIHtcblxuXHRcdFx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0JCgnI3lpZWxkSW1wYWN0Rm9yVW5kZXJzZWVkaW5nJykuYWZ0ZXIoZXJyb3JGb3JtTWVzc2FnZSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb25Gb3JtSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0XHQvLyBTaG93IHRoZSAncmVzZXQgZm9ybScgbGluayB3aGVuIGRldmlhdGluZyBmcm9tIHRoZSBkZWZhdWx0c1xuXHRcdFx0XHRcdHNob3dSZXNldExpbmsoKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9uUmVzZXRGb3JtID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRcdFx0Ly8gUmVzZXQgdGhlIGRhdGEgYW5kIGZvcm0gdmFsdWVzXG5cdFx0XHRcdFx0cmVzZXRJbnB1dHMoKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9uRW1haWxEYXRhID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0XHRcdFx0Ly8gTk9URTogVGhlIGdlbmVyYXRlZCBQREYgd2lsbCBoYXZlIHRoZSBkYXRhIHRoYXQgaXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBjaGFydHMuIElmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGZvcm0gZmllbGQgdmFsdWVzLCBidXQgbm90IGNsaWNrZWQgXCJDYWxjdWxhdGVcIiwgdGhlbiB0aGVzZSBhcmUgbm90IHJlZmxlY3RlZCBpbiB0aGUgb3V0cHV0LlxuXG5cdFx0XHRcdFx0Ly8gVE9ETzogU2hvdyBlbWFpbCBmaWVsZHMgZm9yIHVzZXIgaW5wdXQuIFN1Ym1pdHRpbmcgdGhpcyBmb3JtIHdpbGwgZXhlY3V0ZSB0aGUgZW1haWxEYXRhKCkgbWV0aG9kLlxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbygnRW1haWwgUERGJylcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBvbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdC8vIE9ubHkgcmVkcmF3IHRoZSBncmFwaHMgaWYgdGhleSBoYXZlIGJlZW4gY2FsY3VsYXRlZCBhdCBsZWFzdCBvbmNlIGFscmVhZHlcblx0XHRcdFx0XHR2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWVkX2NhbGNfZm9ybScpXG5cdFx0XHRcdFx0aWYgKGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYWxjdWxhdGVkJykpIHtcblx0XHRcdFx0XHRcdC8vIFJlLXJlbmRlciB0aGUgZ3JhcGhzXG5cdFx0XHRcdFx0XHR2YXIgY2VydGlmaWVkU2VlZERhdGFTZXJpZXMgPSBTZWVkQ2FsY0RhdGEuZ2V0RGF0YVNlcmllcyhjZXJ0aWZpZWRTZWVkRGF0YSlcblx0XHRcdFx0XHRcdHZhciBzYXZlZFNlZWREYXRhU2VyaWVzID0gU2VlZENhbGNEYXRhLmdldERhdGFTZXJpZXMoc2F2ZWRTZWVkRGF0YSlcblx0XHRcdFx0XHRcdHVwZGF0ZUdyYXBocyhjZXJ0aWZpZWRTZWVkRGF0YVNlcmllcywgc2F2ZWRTZWVkRGF0YVNlcmllcywgZmFsc2UpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9uRG93bmxvYWRQZGYgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0XHQvLyBOT1RFOiBUaGUgZ2VuZXJhdGVkIFBERiB3aWxsIGhhdmUgdGhlIGRhdGEgdGhhdCBpcyBjdXJyZW50bHkgcmVwcmVzZW50ZWQgaW4gdGhlIGNoYXJ0cy4gSWYgdGhlIHVzZXIgaGFzIGNoYW5nZWQgZm9ybSBmaWVsZCB2YWx1ZXMsIGJ1dCBub3QgY2xpY2tlZCBcIkNhbGN1bGF0ZVwiLCB0aGVuIHRoZXNlIGFyZSBub3QgcmVmbGVjdGVkIGluIHRoZSBvdXRwdXQuXG5cblx0XHRcdFx0XHQvLyBUT0RPOiBUcmlnZ2VyaW5nIHRoaXMgaGFuZGxlciB3aWxsIGV4ZWN1dGUgdGhlIGRvd25sb2FkUGRmKCkgbWV0aG9kXG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKCdEb3dubG9hZCBQREYnKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHdpcmVFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm1FbGVtZW50cyA9ICQoJyNzZWVkX2NhbGNfZm9ybSBpbnB1dCwgI3NlZWRfY2FsY19mb3JtIHRleHRhcmVhLCAjc2VlZF9jYWxjX2Zvcm0gc2VsZWN0Jylcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGVsID0gZm9ybUVsZW1lbnRzW2ldXG5cdFx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkZvcm1JbnB1dENoYW5nZSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgY2FsY3VsYXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0ZScpXG5cdFx0XHRcdFx0Y2FsY3VsYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYWxjdWxhdGUpXG5cblx0XHRcdFx0XHQvLyBBZGQgdHJpZ2dlciB0byByZXNldCB0byB0aGUgZGVmYXVsdCB2YWx1ZXNcblx0XHRcdFx0XHR2YXIgcmVzZXRGb3JtTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9mb3JtJylcblx0XHRcdFx0XHRyZXNldEZvcm1MaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25SZXNldEZvcm0pXG5cblx0XHRcdFx0XHQvLyBBZGQgdHJpZ2dlciB0byBlbWFpbCB0aGUgcmVzdWx0cyBhcyBhIFBERlxuXHRcdFx0XHRcdC8vdmFyIGVtYWlsRGF0YUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbF9kYXRhJylcblx0XHRcdFx0XHQvL2VtYWlsRGF0YUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRW1haWxEYXRhKVxuXG5cdFx0XHRcdFx0Ly8gQWRkIHRyaWdnZXIgdG8gZG93bmxvYWQgdGhlIHJlc3VsdHMgYXMgYSBQREZcblx0XHRcdFx0XHQvL3ZhciBkb3dubG9hZFBkZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3dubG9hZF9wZGYnKVxuXHRcdFx0XHRcdC8vZG93bmxvYWRQZGYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvd25sb2FkUGRmKVxuXG5cdFx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uV2luZG93UmVzaXplKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIEluaXRpYWxpemUgdXNlciBmb3JtIGlucHV0cyB3aXRoIGRlZmF1bHQgZGF0YVxuXHRcdFx0XHRcdHVwZGF0ZUZvcm1Gcm9tVXNlckRhdGEoKVxuXG5cdFx0XHRcdFx0Ly8gV2lyZSB1cCBpbnRlcmFjdGl2ZSBldmVudHNcblx0XHRcdFx0XHR3aXJlRXZlbnRzKClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB7IGluaXQ6IGluaXQgfVxuXHRcdFx0fSgpKVxuXG5cdFx0XHRTZWVkQ2FsYy5pbml0KClcblx0XHR9KVxuXG5cblx0fVxuICBpZiggJCgnYm9keScpLmhhc0NsYXNzKCdmaW5kLXNlZWQtc3VwcGxpZXInKSApIHtcbiAgICAkKCcjc3RhdGVzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlU3RhdGUoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZSAoKSB7XG4gICAgICBpZiAoJCgnI3Jlc3VsdHMnKS5oYXNDbGFzcygnaGlkZGVuJykpIHtcbiAgICAgICAgJCgnI3Jlc3VsdHMnKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgIH1cbiAgICAgIHZhciBzZWxlY3RlZHN0YXRlID0gJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXG4gICAgICAkKCcuc3VwcGxpZXIsIC5yZXAnKS5oaWRlKClcbiAgICAgICQoJy4nICsgc2VsZWN0ZWRzdGF0ZSkuc2hvdygpXG5cbiAgICAgIGlmICghJCgnLicgKyBzZWxlY3RlZHN0YXRlKVswXSkge1xuICAgICAgICBpZiAoJCgnI3N0YXRlc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKSA9PT0gJ1NlbGVjdCBhIHN0YXRlJykge1xuICAgICAgICAgICQoJyNyZXN1bHRzJykuaGlkZSgpXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAkKCcjcmVzdWx0cycpLnNob3coKVxuICAgICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLnNob3coKVxuICAgICAgICAgIHZhciBzdGF0ZUNob3NlbiA9ICQoJyNzdGF0ZXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS50ZXh0KClcbiAgICAgICAgICAkKCcuZmFpbHVyZVNwYW4nKS50ZXh0KHN0YXRlQ2hvc2VuKVxuICAgICAgICAgICQoJy5yZXBfX2N0bicpLmhpZGUoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy5mYWlsdXJlX19ub3N1cHBsaWVycycpLmhpZGUoKVxuICAgICAgICAgICQoJy5yZXBfX2N0bicpLnNob3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc3VjY2VzcywgZXJyb3IpXG5cbiAgICBmdW5jdGlvbiBzdWNjZXNzIChwb3NpdGlvbikge1xuICAgICAgdmFyIEdFT0NPRElORyA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz0nICsgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSArICcma2V5PUFJemFTeUFJYXBRYkJyQmNJRlR1SWxNeGJYYk10eTNkVDdSMWIyaydcblxuICAgICAgJC5nZXRKU09OKEdFT0NPRElORykuZG9uZShmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgdmFyIHRoZXN0YXRlID0gbG9jYXRpb24ucmVzdWx0c1swXS5hZGRyZXNzX2NvbXBvbmVudHNbNF0uc2hvcnRfbmFtZVxuICAgICAgICAkKCcjc3RhdGVzZWxlY3QnKS52YWwodGhlc3RhdGUpXG4gICAgICAgIGNoYW5nZVN0YXRlKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3IgKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH1cbiAgfVxuIl19