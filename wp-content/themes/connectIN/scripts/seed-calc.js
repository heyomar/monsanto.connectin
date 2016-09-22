'use strict'

$('.toggleModal').on('click', function (e) {
  $('.modal').toggleClass('active');
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
												+ '&sender=' + encodeURIComponent('no-reply@hlkagency.com')
												+ '&subject=' + encodeURIComponent('Your Wheat Profitability Calculator Results')
												+ '&firstName='
												+ '&memberBusname='

		$.ajax({
			url: 'http://hlk-pdf-server.centralus.cloudapp.azure.com/api/v1/EmailLink?templateName=WestBred_ProfitCalc' + queryStringAdd,
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
			$('.modal').hide()
			$('.thankyoumodal').toggleClass('active')
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
