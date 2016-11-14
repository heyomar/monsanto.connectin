(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fitvids = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict'

var selectors = [
	'iframe[src*="player.vimeo.com"]',
	'iframe[src*="youtube.com"]',
	'iframe[src*="youtube-nocookie.com"]',
	'iframe[src*="kickstarter.com"][src*="video.html"]',
	'object'
]

var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}'

module.exports = function (parentSelector, opts) {
	parentSelector = parentSelector || 'body'
	opts = opts || {}

	if (isObject(parentSelector)) {
		opts = parentSelector
		parentSelector = 'body'
	}

	opts.ignore = opts.ignore || ''
	opts.players = opts.players || ''

	var containers = queryAll(parentSelector)
	if (!hasLength(containers)) return

	if (!document.getElementById('fit-vids-style')) {
		var head = document.head || document.getElementsByTagName('head')[0]
		head.appendChild(styles())
	}

	var custom = toSelectorArray(opts.players) || []
	var ignored = toSelectorArray(opts.ignore) || []
	var selector = selectors
		.filter(notIgnored(ignored))
		.concat(custom)
		.join()

	if (!hasLength(selector)) return

	containers.forEach(function (container) {
		var videos = queryAll(container, selector)
		videos.forEach(function (video) {
			wrap(video)
		})
	})
}

function queryAll (el, selector) {
	if (typeof el === 'string') {
		selector = el
		el = document
	}
	return Array.prototype.slice.call(el.querySelectorAll(selector))
}

function toSelectorArray (input) {
	if (typeof input === 'string') {
		return input.split(',').map(trim).filter(hasLength)
	} else if (isArray(input)) {
		return flatten(input.map(toSelectorArray).filter(hasLength))
	}
	return input || []
}

function wrap (el) {
	if (/fluid-width-video-wrapper/.test(el.parentNode.className)) return

	var widthAttr = parseInt(el.getAttribute('width'), 10)
	var heightAttr = parseInt(el.getAttribute('height'), 10)

	var width = !isNaN(widthAttr) ? widthAttr : el.clientWidth
	var height = !isNaN(heightAttr) ? heightAttr : el.clientHeight
	var aspect = height / width

	el.removeAttribute('width')
	el.removeAttribute('height')

	var wrapper = document.createElement('div')
	el.parentNode.insertBefore(wrapper, el)
	wrapper.className = 'fluid-width-video-wrapper'
	wrapper.style.paddingTop = (aspect * 100) + '%'
	wrapper.appendChild(el)
}

function styles () {
	var div = document.createElement('div')
	div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>'
	return div.childNodes[1]
}

function notIgnored (ignored) {
	if (ignored.length < 1) {
		return function () {
			return true
		}
	}
	return function (selector) {
		return ignored.indexOf(selector) === -1
	}
}

function hasLength (input) {
	return input.length > 0
}

function trim (str) {
	return str.replace(/^\s+|\s+$/g, '')
}

function flatten (input) {
	return [].concat.apply([], input)
}

function isObject (input) {
	return Object.prototype.toString.call(input) === '[object Object]'
}

function isArray (input) {
	return Object.prototype.toString.call(input) === '[object Array]'
}

},{}]},{},[1])(1)
});

fitvids();
const mailbar = `
<div class="mailbar-header">
  <span id="mailbar-activate">
    <span class="show__768up">Sign up for email updates about the ConnectIN™ Wheat Insight System.</span>
    <span class="hide__768down">Sign up for email updates</span>
    <svg class="icon down"><use xlink:href="#icon-down"></use></svg>
  </span>

  </span>

  <span id="mailbar-dismiss" class="dismiss">
    <svg class="icon">
      <use xlink:href="#icon-circle-cross"></use>
    </svg>
  </span>
</div>
<div id="mailbar-body" class="mailbar-body">
    <!-- form  -->
    <div id="signupform__ctn" class="wFormContainer">
        <style type="text/css"></style>
        <div class="wForm" id="tfa_0-WRPR" dir="ltr">
            <div class="codesection" id="code-tfa_0"></div>
            <h3 class="wFormTitle" id="tfa_0-T">ConnectIN Email Signup</h3>
            <form method="post" action="https://www.tfaforms.com/responses/processor" class="hintsBelow labelsAbove ConnectIN-Email-Signup" id="tfa_0">
                <div id="tfa_1-D" class="oneField field-container-D     ">
                    <label id="tfa_1-L" for="tfa_1" class="label preField reqMark">First Name</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_1" name="tfa_1" value="" placeholder="" title="First Name" class="required">
                    </div>
                </div>
                <div id="tfa_2-D" class="oneField field-container-D     ">
                    <label id="tfa_2-L" for="tfa_2" class="label preField reqMark">Last Name</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_2" name="tfa_2" value="" placeholder="" title="Last Name" class="required">
                    </div>
                </div>
                <div id="tfa_3-D" class="oneField field-container-D     ">
                    <label id="tfa_3-L" for="tfa_3" class="label preField reqMark">Email</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_3" name="tfa_3" value="" placeholder="" title="Email" class="validate-email required">
                    </div>
                </div>
                <div id="tfa_4-D" class="oneField field-container-D     ">
                    <label id="tfa_4-L" for="tfa_4" class="label preField reqMark">I am a:</label>
                    <br>
                    <div class="inputWrapper"><span id="tfa_4" class="choices vertical required"><span class="oneChoice"><input type="checkbox" value="tfa_6" class="" checked id="tfa_6" name="tfa_6"><label class="label postField" id="tfa_6-L" for="tfa_6">Grower</label></span>
                        <span
                            class="oneChoice">
                            <input type="checkbox" value="tfa_5" class="" id="tfa_5" name="tfa_5">
                            <label class="label postField" id="tfa_5-L" for="tfa_5">Seed Supplier</label>
                            </span>
                            </span>
                    </div>
                </div>
                <div class="actions" id="tfa_0-A">
                    <input type="submit" class="primaryAction" value="Submit">
                </div>
                <div style="clear:both"></div>
                <input type="hidden" value="433713" name="tfa_dbFormId" id="tfa_dbFormId">
                <input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId">
                <input type="hidden" value="a8623a69d1e6264f46562887e0ccd599" name="tfa_dbControl" id="tfa_dbControl">
                <input type="hidden" value="7" name="tfa_dbVersionId" id="tfa_dbVersionId">
                <input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
            </form>
        </div>
        </div>
    </div>

</div>
`

if ( ($('body').hasClass('sign-up') === true) || (document.cookie.replace(/(?:(?:^|.*;\s*)subscribed\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') ) {

  if ($('body').hasClass('contact-us') === true) {
    $('#mailbar').hide()
  }else {
    $('#mailbar').html(mailbar)
  }

}

// click title or down arrow
$('#mailbar-activate').on('click touchend', function () {
  let vh
  const $body = $('#mailbar-body')
  const arrowDown = '<use xlink:href="#icon-down"></use>'
  const arrowUp = '<use xlink:href="#icon-up"></use>'

  if ($(window).width() < 768) {
    vh = $(window).height() - $('#mailbar').height()
  } else {
    vh = 400
  }

  if ($body.height() === 0) {
    window.scroll(0, 0)
    $body.animate({ height: vh })
    $(this).children('svg').html(arrowUp)
  } else {
    $body.animate({ height: 0 })
    $(this).children('svg').html(arrowDown)
  }

  $('body').toggleClass('mailbar-active')
  $('html').toggleClass('mailbar-active')
})

// click dismiss
$('#mailbar-dismiss').on('click', dismissMailbar)

function dismissMailbar () {
  // if the menu is active and you dismiss, recalculate menu height
  if ($('body').hasClass('menu-active')) {
    const menu = $('#menu-header-menu-container')
    const addedHeight = menu.height() + $('#mailbar').height()
    $('#menu-header-menu-container').css('height', addedHeight + 'px')
  }

  $('#mailbar').animate({ height: '0' }, function () {
    $(this).remove()
    $('body').removeClass('mailbar-active')
  })

  document.cookie = 'subscribed=true'
}
$('#menu-activate').on('click', function () {
  let mailbar = 0
  if ($('#mailbar-body').length) {
    mailbar = $('#mailbar').height()
  }

  const vh = $(window).height() - $('#menu').height() - mailbar
  const menu = '<use xlink:href="#icon-menu"></use>'
  const cross = '<use xlink:href="#icon-cross"></use>'

  if ($('#menu-header-menu-container').height() === 0) {
    window.scroll(0, 0)
    $('#menu-header-menu-container').animate({ height: vh })
    $(this).children('svg').html(cross)
  } else {
    $('#menu-header-menu-container').animate({ height: 0 })
    $(this).children('svg').html(menu)
  }

  $('body').toggleClass('menu-active')
  $('html').toggleClass('menu-active')
})

// TODO: recalc menu height on resize if in mobile widths
$(window).resize()
$('.benefits__headline').on('click', function () {
  if ($(window).width() <= 768) {
    const $body = $(this).next()
    const arrowDown = '<use xlink:href="#icon-down"></use>'
    const arrowUp = '<use xlink:href="#icon-up"></use>'

    $body.slideToggle()

    if ($(this).hasClass('active')) {
      $(this).children('svg').html(arrowDown)
    } else {
      $(this).children('svg').html(arrowUp)
    }

    $(this).toggleClass('active')
  }
})
// window.alert = function () {}
//  Validate Contact Us Fields
if ($('body').hasClass('contact-us')) {
    $('.primaryAction').on('click', function(e) {
        e.preventDefault();

        function Valit() {
            var isValid = true;
            if ($('.validate-email').val() === "") {
                $('#contactEmail').css({
                    "border": "1px solid red"
                })
                isValid = false;
            } else {
                $('#contactEmail').css({
                    "border-color": "initial"
                })
            }
            if ($('#tfa_2').val() === "") {
                $('#contactMessage').css({
                    "border": "1px solid red"
                })
                isValid = false;
            } else {
                $('#contactMessage').css({
                    "border-color": "initial"
                })
            }
            return isValid;
        }
        var runit = Valit();
        var error = '<span style="position:static;" class="errorFormMessage">You must complete all fields above.</span>'
        if (runit == true) {
            $('#tfa_0').submit()
            $('.errorFormMessage').remove()
        } else {
            if ($('.errorFormMessage')[0]) {} else {
                $('#contactMessage').after(error)
            }
        }
    })
}
'use strict'


	if ( $('body').hasClass('wheat-profitability-calculator') ) {

		$('.toggleModal').on('click',function(){
				$('#emailData').slideDown()
		 });

		$('.close').on('click', function (e) {
		  $('.thankyoumodal').removeClass('active');
		});

		$('#reset_form,#thankyou__startover').on('click', function(){
			window.location.reload();
			$(window).scrollTop(0);
		});

		$("#emailDataForm").bind("keypress", function(e) {
		   if (e.keyCode == 13) {
		      return false; // ignore default event
		   }
		});


		$('#downloadPDF').click(function (e) {
			e.preventDefault()

			$('#pdfData').val(JSON.stringify(dataExtract()))
			$('#pdfForm').submit()
		})

		$('#mailPDF').click(function (e) {
			//Validate Email
			function is_email(email){
			var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			return emailReg.test(email); }

			var emailInput = is_email($('#recipientEmail').val())
			var emailError = '<small class="emailError">Please enter valid email.</small'

			if (emailInput == false) {
				$('#recipientEmail').css({"border-color": "red"})
				if ($('.emailError')[0]) {
				}else {
					$('#mailPDF').after(emailError)
				}


			}else {
				$('.emailError').remove()
				$('#recipientEmail').css({"border-color": "inherit"})
				var queryStringAdd = '&recipients=' + encodeURIComponent($('#recipientEmail').val())
														+ '&sender=' + encodeURIComponent('no-reply@connectinsystem.com')
														+ '&subject=' + encodeURIComponent('Your Wheat Profitability Calculator Results')
														+ '&firstName='
														+ '&memberBusname='

				$.ajax({
					url: 'https://pdfgen.msvc.io/api/v1/EmailLink?templateName=WestBred_ProfitCalc' + queryStringAdd,
					type: 'POST',
					data: '{ "json" : ' + JSON.stringify(dataExtract()) + '}',
					beforeSend: function() {
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
						}
						var spinner = new Spinner(opts).spin()
						$('#mailPDF').css('color', 'transparent');
						$('#mailPDF').after(spinner.el)
					}
				})
				.done(function() {
					$('#emailData').hide()
					$('#thankyoumodal').show().slideDown()
					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				})
			}

		})

		function dataExtract () {
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
			}
		}



		$(document).ready(function () {
			// Main app startup

			var Utility = (function () {
				// Get the top position of an element in the document
				// From smoothScroll, https://github.com/alicelieutier/smoothScroll/blob/master/smoothscroll.js
				var getTop = function(element) {
					// return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
					if(element.nodeName === 'HTML') return -window.pageYOffset
					return element.getBoundingClientRect().top + window.pageYOffset;
				}

				// Get the current screen viewport width
				var getViewportWidth = function() {
					return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				}

				// Add digit separator characters to a numeric string
				var addDigitSeparators = function (num) {
					var n = num.toString()
					var p = n.indexOf('.')
					return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
						return p < 0 || i < p ? ($0 + ',') : $0
					})
				}

				// Return the character representation of Infinity
				var getInfinityChar = function () {
					return '∞'
				}

				// Format a number for display
				var formatNumber = function (number, decimals, showPositive) {
					var value = parseFloat(number)
					if (!isNaN(value) && isFinite(value)) {
						if (typeof decimals !== 'undefined' && decimals !== null) {
							// Keep a set number of decimals, even if zeroes
							return (value < 0 ? '- ' : (showPositive === true ? '+ ' : '')) + addDigitSeparators(Math.abs(value).toFixed(decimals))
						} else {
							// Just truncate to a fixed number of decimals, but don't preserve trailing zeroes
							return (value < 0 ? '- ' : (showPositive === true ? '+ ' : '')) + addDigitSeparators(Math.abs(parseFloat(value.toFixed(2))))
						}
					} else {
						return getInfinityChar()
					}
				}

				// Format a number as curreny for display
				var formatCurrency = function (number, showDecimals, showPositive) {
					var value = parseFloat(number)
					if (!isNaN(value) && isFinite(value)) {
						return (value < 0 ? '- ' : (showPositive === true ? '+ ' : '')) + '$' + addDigitSeparators(Math.abs(value).toFixed(showDecimals === true ? 2 : 0))
					} else {
						return getInfinityChar()
					}
				}

				// Convert a formatted number back into an actual number
				var unformatNumber = function (value) {
					return parseFloat(value.replace(/[^-\d\.e]/g, '').trim())
				}

				// Format a input field according to the "data-format" attribute
				var formatValue = function (element) {
					if (!element || (element && !element.value)) {
						return ''
					}

					if (typeof element.value !== 'string') {
						return element.value
					}

					var format = document.querySelector(element).dataset.format

					switch (format) {
						case 'number':
							return formatNumber(unformatNumber(element.value))

						case 'signednumber':
							return formatNumber(unformatNumber(element.value), null, true)

						case 'integer':
							return formatNumber(unformatNumber(element.value), 0)

						case 'fixed2':
							return formatNumber(unformatNumber(element.value), 2)

						case 'currency':
							return formatCurrency(unformatNumber(element.value))
						}

					return element.value
				}

				return {
					getTop: getTop,
					getViewportWidth: getViewportWidth,
					addDigitSeparators: addDigitSeparators,
					getInfinityChar: getInfinityChar,
					formatNumber: formatNumber,
					formatCurrency: formatCurrency,
					unformatNumber: unformatNumber,
					formatValue: formatValue
				}
			}())

			var SeedCalcData = (function () {
				var SEEDS_PER_LB_MIN = 9000
				var SEEDS_PER_LB_MAX = 18000
				var SEEDS_PER_LB_STEP = 500

				var SeedCalcUserData = function (certified) {
					// Properties
					this.season = 'winter' // spring|winter

					this.percentGermination = 0
					this.percentPureSeed = 0
					this.costPerCWT = 0
					this.targetYieldBushelsPerAcre = 0
					this.wheatPricePerBushel = 0
					this.targetPlantPopulation = 0
					this.flatRateLbPerAcre = 0
					this.acresPlanted = 0

					this.underSeedingYieldImpact = 0 // per 100,000 seeds per acre
					this.overSeedingYieldImpact = 0 // per 100,000 seeds per acre

					// Other
					this.isCertified = !!certified

					// Methods
					this.resetToDefaults = function () {
						if (this.isCertified) {
							setCertifiedSeedDefaults(this)
						} else {
							setSavedSeedDefaults(this)
						}
					}

					// Initialize
					this.resetToDefaults()
				}

				var OptimalSeedingRateImpactData = function (seedsPerLb) {
					// Calculated
					this.yieldAdvantageBushelsPerAcre = 0
					this.seedLbPerAcreRequired = 0
					this.seedsPerAcreRequired = 0
					this.costPerAcre = 0
					this.totalSeedCost = 0
					this.actualSeedingRate = 0
					this.seedingRateVsTarget = 0
					this.overUnderSeedingPotentialYieldImpact = 0
					this.flatRateCostPerAcre = 0
					this.costPerAcreDifference = 0
					this.totalSeedCost = 0
					this.totalSeedCostDifferential = 0
					this.potentialYieldBenefitBushelsPerAcre = 0
					this.optimalSeedingRateNetRevenue = 0
					this.netRevenueLbPerAcre = 0
					this.optimalSeedingRateNetRevenueBenefit = 0

					// Other
					this.seedsPerLb = seedsPerLb
				}

				var setCertifiedSeedDefaults = function (userData) {
					userData.percentGermination = 0.95
					userData.percentPureSeed = 0.985
					userData.costPerCWT = 18
					userData.targetYieldBushelsPerAcre = 80
					userData.wheatPricePerBushel = 3.5
					userData.targetPlantPopulation = 1000000
					userData.flatRateLbPerAcre = 100
					userData.acresPlanted = 2500
					userData.underSeedingYieldImpact = 0.5
					userData.overSeedingYieldImpact = 0.5

					userData.isCertified = true
				}

				var setSavedSeedDefaults = function (userData) {
					userData.percentGermination = 0.93
					userData.percentPureSeed = 0.95
					userData.costPerCWT = 7.46
					userData.targetYieldBushelsPerAcre = 80
					userData.wheatPricePerBushel = 3.5
					userData.targetPlantPopulation = 1000000
					userData.flatRateLbPerAcre = 100
					userData.acresPlanted = 2500
					userData.underSeedingYieldImpact = 0.5
					userData.overSeedingYieldImpact = 0.5

					userData.isCertified = false
				}

				var calculate = function (data) {
					data.seedLbPerAcreRequired = data.userData.targetPlantPopulation / (data.seedsPerLb * data.userData.percentPureSeed * data.userData.percentGermination)

					data.seedsPerAcreRequired = data.seedLbPerAcreRequired * data.seedsPerLb

					data.costPerAcre = data.userData.costPerCWT * (data.seedLbPerAcreRequired / 100)

					data.totalSeedCost = data.costPerAcre * data.userData.acresPlanted

					data.actualSeedingRate = data.userData.flatRateLbPerAcre * data.seedsPerLb * data.userData.percentPureSeed * data.userData.percentGermination

					data.seedingRateVsTarget = data.actualSeedingRate - data.userData.targetPlantPopulation

					data.overUnderSeedingPotentialYieldImpact = data.seedingRateVsTarget < 0
						? (data.seedingRateVsTarget / 100000) * data.userData.underSeedingYieldImpact * data.userData.targetYieldBushelsPerAcre
						: (data.seedingRateVsTarget / 100000) * data.userData.overSeedingYieldImpact * data.userData.targetYieldBushelsPerAcre * -1

					data.flatRateCostPerAcre = data.userData.costPerCWT * (data.userData.flatRateLbPerAcre / 100)

					data.costPerAcreDifference = data.costPerAcre - data.flatRateCostPerAcre

					data.totalSeedCostFlatRate = data.flatRateCostPerAcre * data.userData.acresPlanted

					data.totalSeedCostFlatRateDifferential = data.costPerAcreDifference * data.userData.acresPlanted

					data.potentialYieldBenefitBushelsPerAcre = data.userData.isCertified ? (data.userData.season.toLowerCase() === 'spring' ? 4.5 : 7.5) : 0

					data.optimalSeedingRateNetRevenue = ((data.userData.targetYieldBushelsPerAcre + data.potentialYieldBenefitBushelsPerAcre) * data.userData.wheatPricePerBushel * data.userData.acresPlanted) - data.totalSeedCost

					data.netRevenueLbPerAcre = ((data.userData.targetYieldBushelsPerAcre + data.potentialYieldBenefitBushelsPerAcre + data.overUnderSeedingPotentialYieldImpact) * data.userData.wheatPricePerBushel * data.userData.acresPlanted) - data.totalSeedCost

					data.optimalSeedingRateNetRevenueBenefit = data.optimalSeedingRateNetRevenue - data.netRevenueLbPerAcre
				}

				var getDataSeries = function (userData) {
					var series = []

					for (var seedsPerLb = SEEDS_PER_LB_MIN; seedsPerLb <= SEEDS_PER_LB_MAX; seedsPerLb += SEEDS_PER_LB_STEP) {
						var dataItem = new OptimalSeedingRateImpactData(seedsPerLb)

						// Merge in the userData properties
						dataItem.userData = {}
						for (var prop in userData) {
							if (userData.hasOwnProperty(prop) && typeof userData[prop] !== 'function') {
								dataItem.userData[prop] = userData[prop]
							}
						}

						calculate(dataItem)
						series.push(dataItem)
					}

					return series
				}

				var getSeriesColumnData = function (series, column) {
					var data = []
					for (var i = 0; series[i]; i++) {
						data.push(series[i][column])
					}

					return data
				}

				return {
					SeedCalcUserData: SeedCalcUserData,
					getDataSeries: getDataSeries,
					getSeriesColumnData: getSeriesColumnData
				}
			}())

			var SeedCalc = (function () {
				// CONSTANTS
				var CHART_MOBILE_SMALL_MAX_WIDTH = 400   // max width for small devices
				var CHART_MOBILE_SMALL_MAX_HEIGHT = 267  // max height for small devices
				var CHART_MOBILE_MAX_WIDTH = 600   // max width for mobile devices
				var CHART_MOBILE_MAX_HEIGHT = 300  // max height for mobile devices
				var CHART_MAX_WIDTH = 600
				var CHART_MAX_HEIGHT = 300
				var COLOR_DARK_RED = '#5293AB'
				var COLOR_LIGHT_RED = '#72b1c8'
				var COLOR_DARK_BLUE = '#373836'
				var COLOR_LIGHT_BLUE = '#646560'

				// PROPERTIES

				var certifiedSeedData = new SeedCalcData.SeedCalcUserData(true)
				var savedSeedData = new SeedCalcData.SeedCalcUserData()

				// METHODS

				var isMobileSmall = function () {
					return Utility.getViewportWidth() < CHART_MOBILE_SMALL_MAX_WIDTH
				}

				var isMobile = function () {
					return Utility.getViewportWidth() < CHART_MOBILE_MAX_WIDTH
				}

				var calculate = function () {
					var form = document.getElementById('seed_calc_form')
					form.classList.add('calculated')

					// Get form field data
					updateUserDataFromForm()

					// Scroll to first graph (set a delay to allow the sections to become visible)
					// setTimeout(function() {
					// 	var headerBar = document.querySelector('.c-site-nav-wrapper-header'),
					// 		headerBarFixed = window.getComputedStyle(headerBar).position === 'fixed',
					// 		offset = headerBarFixed ? -headerBar.clientHeight : 0,
					// 		top = Utility.getTop(document.querySelector('.calc-section')) + offset
					// 	smoothScroll(top)
					// }, 50)

					// Re-render the graphs
					var certifiedSeedDataSeries = SeedCalcData.getDataSeries(certifiedSeedData)
					var savedSeedDataSeries = SeedCalcData.getDataSeries(savedSeedData)
					updateGraphs(certifiedSeedDataSeries, savedSeedDataSeries)

					// Set the Calculate button text
					var btn = document.getElementById('calculate')
					if (btn.textContent === 'Calculate') {
						btn.textContent = 'Re-Calculate';
					}
				}

				var updateUserDataFromForm = function () {
					var form = document.getElementById('seed_calc_form')

					certifiedSeedData.percentGermination = parseFloat(form['cert_seed_germination'].value) / 100
					certifiedSeedData.percentPureSeed = parseFloat(form['cert_seed_pure_seed'].value) / 100
					certifiedSeedData.costPerCWT = parseFloat(form['cert_seed_cost_per_unit'].value)

					savedSeedData.percentGermination = parseFloat(form['saved_seed_germination'].value) / 100
					savedSeedData.percentPureSeed = parseFloat(form['saved_seed_pure_seed'].value) / 100
					savedSeedData.costPerCWT = parseFloat(form['saved_seed_cost_per_unit'].value)

					// These fields have the same values in both datasets
					var seasons = form['crop_season']
					for (var i = 0; i < seasons.length; i++) {
						if (seasons[i].checked) certifiedSeedData.season = savedSeedData.season = seasons[i].value
						break
					}

					// certifiedSeedData.season = savedSeedData.season = form['crop_season'].value
					certifiedSeedData.targetYieldBushelsPerAcre = savedSeedData.targetYieldBushelsPerAcre = parseFloat(form['crop_target_yield'].value)
					certifiedSeedData.wheatPricePerBushel = savedSeedData.wheatPricePerBushel = parseFloat(form['crop_wheat_price'].value)
					certifiedSeedData.targetPlantPopulation = savedSeedData.targetPlantPopulation = parseFloat(form['crop_target_planting_population'].value)
					certifiedSeedData.flatRateLbPerAcre = savedSeedData.flatRateLbPerAcre = parseFloat(form['crop_flat_seeding_rate'].value)
					certifiedSeedData.acresPlanted = savedSeedData.acresPlanted = parseFloat(form['crop_acres_planted'].value)
					certifiedSeedData.overSeedingYieldImpact = savedSeedData.overSeedingYieldImpact = parseFloat(form['crop_percent_yield_impact_overseeding'].value) / 100
					certifiedSeedData.underSeedingYieldImpact = savedSeedData.underSeedingYieldImpact = parseFloat(form['crop_percent_yield_impact_underseeding'].value) / 100
				}

				var updateFormFromUserData = function () {
					var form = document.getElementById('seed_calc_form')

					form['cert_seed_germination'].value = certifiedSeedData.percentGermination * 100
					form['cert_seed_pure_seed'].value = certifiedSeedData.percentPureSeed * 100
					form['cert_seed_cost_per_unit'].value = certifiedSeedData.costPerCWT

					form['saved_seed_germination'].value = savedSeedData.percentGermination * 100
					form['saved_seed_pure_seed'].value = savedSeedData.percentPureSeed * 100
					form['saved_seed_cost_per_unit'].value = savedSeedData.costPerCWT

					// These fields have the same values in both datasets, so just use the first one
					// form['crop_season'].value = certifiedSeedData.season // broken in Safari
					if (certifiedSeedData.season === 'winter') {
						form['crop_season'][0].checked = true
					} else {
						form['crop_season'][1].checked = true
					}
					form['crop_target_yield'].value = certifiedSeedData.targetYieldBushelsPerAcre
					form['crop_wheat_price'].value = certifiedSeedData.wheatPricePerBushel
					form['crop_target_planting_population'].value = certifiedSeedData.targetPlantPopulation
					form['crop_flat_seeding_rate'].value = certifiedSeedData.flatRateLbPerAcre
					form['crop_acres_planted'].value = certifiedSeedData.acresPlanted
					form['crop_percent_yield_impact_overseeding'].value = certifiedSeedData.overSeedingYieldImpact
					form['crop_percent_yield_impact_underseeding'].value = certifiedSeedData.underSeedingYieldImpact
				}

				var showResetLink = function () {
					// Make sure the reset link is visible
					var resetLink = document.getElementById('reset_form');
					resetLink.classList.remove('invisible');
				}

				var hideResetLink = function () {
					// Make sure the reset link is visible
					var resetLink = document.getElementById('reset_form');
					resetLink.classList.add('invisible');
				}

				var resetInputs = function () {
					// Reset the data values to defaults
					certifiedSeedData.resetToDefaults()
					savedSeedData.resetToDefaults()

					// Update form field values
					updateFormFromUserData()

					// Hide the reset link again
					hideResetLink();
				}

				var getChartCanvasHtml = function (id) {
					var viewportWidth = Utility.getViewportWidth()
					var canvasSize = {
						width: isMobile() ? viewportWidth : CHART_MAX_WIDTH,
						height: isMobileSmall() ? CHART_MOBILE_SMALL_MAX_HEIGHT : isMobile() ? CHART_MOBILE_MAX_HEIGHT : CHART_MAX_HEIGHT
					}

					var html = '<canvas id="' + id + '" class="graph block-center" width="' + canvasSize.width + '" height="' + canvasSize.height + '"></canvas>'

					return html
				}

				var setChartDefaults = function (animate) {
					// Global chart config
					Chart.defaults.global.defaultFontFamily = '"Gotham SSm A", "Gotham SSm B", Lucida Grande, "Lucida Grande", Lucida Sans Unicode, "Lucida Sans Unicode", Lucida Sans, "Lucida Sans", Geneva, Verdana, Helvetica, Arial, sans-serif'
					Chart.defaults.global.defaultFontSize = 16

					Chart.defaults.global.maintainAspectRatio = false

					Chart.defaults.global.elements.line.borderWidth = 2
					Chart.defaults.global.elements.line.fill = false

					Chart.defaults.global.elements.point.radius = 5
					Chart.defaults.global.elements.point.borderWidth = 2

					Chart.defaults.global.animation.duration = animate === false ? 0 : 1000

					Chart.defaults.global.legend.display = false

					Chart.defaults.global.events = undefined // ignore mouse/touch events

					// special settings for smaller screen sizes
					if (isMobileSmall()) {
						Chart.defaults.global.defaultFontSize = 11
						Chart.defaults.global.elements.point.radius = 2
					} else if (isMobile()) {
						Chart.defaults.global.defaultFontSize = 12
						Chart.defaults.global.elements.point.radius = 4
					}
				}

				var updateGraphCompareImpact = function (certifiedSeedDataSeries, savedSeedDataSeries) {
					// Set up graph canvas
					var chartId = 'graph_compare_impact'
					var section = document.getElementById(chartId + '_section')
					var wrapper = document.getElementById(chartId + '_wrapper')
					var legend = document.getElementById(chartId + '_legend')
					var canvas = getChartCanvasHtml(chartId)
					var mobile = isMobile()
					var mobileSmall = isMobileSmall()

					// Remove the 'hidden' CSS class
					section.className = section.className.replace(/\s*\bhidden\b/g, '')

					// destroy and recreate the canvas
					if (wrapper.hasChildNodes()) wrapper.removeChild(wrapper.childNodes[0])
					wrapper.innerHTML = canvas

					// Get the x-axis labels
					var xLabels = []
					for (var i = 0; certifiedSeedDataSeries[i]; i++) {
						xLabels.push(certifiedSeedDataSeries[i].seedsPerLb.toString())
					}

					// Configure and render the chart
					var ctx = document.getElementById(chartId)
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
										callback: function (value, index, values) {
											return index % 2 === 0 ? Utility.addDigitSeparators(value) : ''
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
										callback: function (value, index, values) {
											return Utility.formatCurrency(value, false)
										}
									}
								}]
							}
						}
					})

		      setTimeout(function () {
		        $('#compareGraph').val(chart.toBase64Image())
		      }, 1500)

					// Update legend
					legend.classList.add('calc-chart-type-' + chart.config.type);

					var legendHtml = '<div>'
					for (var i = 0, item; typeof (item = chart.config.data.datasets[i]) !== 'undefined'; i++) {
						legendHtml += '<div><img class="calc-legend-icon" src="' + item.legendIconImage + '" alt=""> <span class="calc-legend-label">' + item.label + '</span></div>'
					}
					legendHtml += '</div>';
					legend.innerHTML = legendHtml
				}

				var updateGraphMaximizeRevenue = function (certifiedSeedDataSeries, savedSeedDataSeries) {
					// Reset some global chart defaults
					Chart.defaults.global.maintainAspectRatio = true

					// Set up graph canvas
					var chartId = 'graph_maximize_revenue'
					var section = document.getElementById(chartId + '_section')
					var wrapper = document.getElementById(chartId + '_wrapper')
					var legend = document.getElementById(chartId + '_legend')
					var canvas = getChartCanvasHtml(chartId)

					// Remove the 'hidden' CSS class
					section.className = section.className.replace(/\s*\bhidden\b/g, '')

					// destroy and recreate the canvas
					if (wrapper.hasChildNodes()) wrapper.removeChild(wrapper.childNodes[0])
					wrapper.innerHTML = canvas

					// Configure and render the chart
					var ctx = document.getElementById(chartId)
					var chart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: [],
							datasets: [{
								label: 'Certified Seed Net Revenue by Optimal Seeding Rate ($)',
								data: [ certifiedSeedDataSeries[ certifiedSeedDataSeries.length - 1 ].optimalSeedingRateNetRevenue ],
								backgroundColor: COLOR_LIGHT_RED,
								borderColor: COLOR_LIGHT_RED
							}, {
								label: 'Saved Seed Net Revenue by Lbs/A ($)',
								data: [ savedSeedDataSeries[ savedSeedDataSeries.length - 1 ].netRevenueLbPerAcre ],
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
										callback: function (value, index, values) {
											return Utility.formatCurrency(value, false)
										}
									}
								}]
							}
						}
					})

		      setTimeout(function () {
		        $('#revenueGraph').val(chart.toBase64Image())
		      }, 1500)

					// Update legend
					legend.classList.add('calc-chart-type-' + chart.config.type);

					var legendHtml = '<div>'
					for (var i = 0, item; typeof (item = chart.config.data.datasets[i]) !== 'undefined'; i++) {
						legendHtml += '<div><span class="calc-legend-icon" style="background-color:' + item.backgroundColor + '"></span> <span class="calc-legend-label">' + item.label + '</span></div>'
					}
					legendHtml += '</div>';
					legend.innerHTML = legendHtml
				}

				var updateGraphs = function (certifiedSeedDataSeries, savedSeedDataSeries, animate) {
					setChartDefaults(animate)
					updateGraphCompareImpact(certifiedSeedDataSeries, savedSeedDataSeries)
					updateGraphMaximizeRevenue(certifiedSeedDataSeries, savedSeedDataSeries)
				}

				// EVENTS

				var onCalculate = function (event) {
					event.preventDefault()

					function validateForm() {
						  var isValid = true;
						  $('.calc-field').each(function() {
						    if ( $(this).val() === '') {
									$(this).css({"border-color": "red"})
									isValid = false
									console.log(isValid)
								}else {
									$(this).css({"border-color": "#66665c"})
								}
						  });
						  return isValid;
						}

					$(document).ready(function(){
						var go = validateForm()
						var errorFormMessage = '<span class="errorFormMessage">You must complete all fields above to calculate.</span>'
						if ( go == true) {
							console.log('it is valid')
							$('.errorFormMessage').remove()
							$('#graph_compare_impact_section , #graph_maximize_revenue_section').slideDown()
							$('.actionData').show().slideDown()
							calculate()
						}else if ( go == false) {
							console.log('it is not valid')
							if ($('.errorFormMessage')[0]) {

							}else {
								$('#yieldImpactForUnderseeding').after(errorFormMessage)
							}
						}
					})
				}

				var onFormInputChange = function (event) {
					event.preventDefault()

					// Show the 'reset form' link when deviating from the defaults
					showResetLink()
				}

				var onResetForm = function (event) {
					event.preventDefault()

					// Reset the data and form values
					resetInputs()
				}

				var onEmailData = function (event) {
					event.preventDefault()

					// NOTE: The generated PDF will have the data that is currently represented in the charts. If the user has changed form field values, but not clicked "Calculate", then these are not reflected in the output.

					// TODO: Show email fields for user input. Submitting this form will execute the emailData() method.
					console.info('Email PDF')
				}

				var onWindowResize = function (event) {
					// Only redraw the graphs if they have been calculated at least once already
					var form = document.getElementById('seed_calc_form')
					if (form.classList.contains('calculated')) {
						// Re-render the graphs
						var certifiedSeedDataSeries = SeedCalcData.getDataSeries(certifiedSeedData)
						var savedSeedDataSeries = SeedCalcData.getDataSeries(savedSeedData)
						updateGraphs(certifiedSeedDataSeries, savedSeedDataSeries, false)
					}
				}

				var onDownloadPdf = function (event) {
					event.preventDefault()

					// NOTE: The generated PDF will have the data that is currently represented in the charts. If the user has changed form field values, but not clicked "Calculate", then these are not reflected in the output.

					// TODO: Triggering this handler will execute the downloadPdf() method
					console.info('Download PDF')
				}

				var wireEvents = function () {
					var formElements = $('#seed_calc_form input, #seed_calc_form textarea, #seed_calc_form select')
					for (var i = 0; i < formElements.length; i++) {
						var el = formElements[i]
						el.addEventListener('change', onFormInputChange)
					}

					var calculateBtn = document.getElementById('calculate')
					calculateBtn.addEventListener('click', onCalculate)

					// Add trigger to reset to the default values
					var resetFormLink = document.getElementById('reset_form')
					resetFormLink.addEventListener('click', onResetForm)

					// Add trigger to email the results as a PDF
					//var emailDataBtn = document.getElementById('email_data')
					//emailDataBtn.addEventListener('click', onEmailData)

					// Add trigger to download the results as a PDF
					//var downloadPdf = document.getElementById('download_pdf')
					//downloadPdf.addEventListener('click', onDownloadPdf)

					window.addEventListener('resize', onWindowResize);
				}

				var init = function () {
					// Initialize user form inputs with default data
					updateFormFromUserData()

					// Wire up interactive events
					wireEvents()
				}

				return { init: init }
			}())

			SeedCalc.init()
		})


	}
  if( $('body').hasClass('find-seed-supplier') ) {
    $('#stateselect').change(function () {
      changeState()
    })

    function changeState () {
      if ($('#results').hasClass('hidden')) {
        $('#results').removeClass('hidden')
      }
      var selectedstate = $('#stateselect option:selected').val()
      $('.supplier, .rep').hide()
      $('.' + selectedstate).show()

      if (!$('.' + selectedstate)[0]) {
        if ($('#stateselect option:selected').text() === 'Select a state') {
          $('#results').hide()
        }else {
          $('#results').show()
          $('.failure__nosuppliers').show()
          var stateChosen = $('#stateselect option:selected').text()
          $('.failureSpan').text(stateChosen)
          $('.rep__ctn').hide()
        }
      } else {
          $('.failure__nosuppliers').hide()
          $('.rep__ctn').show()
      }
    }

    navigator.geolocation.getCurrentPosition(success, error)

    function success (position) {
      var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k'

      $.getJSON(GEOCODING).done(function (location) {
        var thestate = location.results[0].address_components[4].short_name
        $('#stateselect').val(thestate)
        changeState()
      })
    }

    function error (err) {
      console.log(err)
    }
  }
