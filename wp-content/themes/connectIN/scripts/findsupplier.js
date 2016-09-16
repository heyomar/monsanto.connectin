$(document).ready(function () {
  if(window.location.href.indexOf("/find-seed-supplier") > -1) {
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
          $('.failure__nosuppliers').show()
          var stateChosen = $('#stateselect option:selected').text()
          $('.failureSpan').text(stateChosen)
          $('.rep__ctn').hide()
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

})
