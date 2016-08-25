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
}

navigator.geolocation.getCurrentPosition(success, error)

function success (position) {
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)

  var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k'

  $.getJSON(GEOCODING).done(function (location) {
    console.log(location)
    var thestate = location.results[0].address_components[4].long_name
    thestate = thestate.replace(/\s+/g, '-').toLowerCase()
    console.log(thestate)

    $('#stateselect').val(thestate)
    changeState()
  })
}

function error (err) {
  console.log(err)
}
