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
      } else {
        $('#results').show()
        $('.failure__nosuppliers').show()
        var stateChosen = $('#stateselect option:selected').text()
        $('.failureSpan').text(stateChosen || "your state")
        $('.rep__ctn').hide()
      }
    } else {
        $('.failure__nosuppliers').hide()
        $('.rep__ctn').show()
        $('.suppliers__ctn__anchor').show()
    }
  }

  navigator.geolocation.getCurrentPosition(success, error)

  function success (position) {
    console.log(position.coords.latitude)
    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k'

    $.getJSON(GEOCODING).done(function (location) {
      var thestate = location.results[6].address_components[0].short_name
      $('#stateselect').val(thestate)
      changeState()
    })
  }

  function error (err) {
    console.log(err)
  }
}
