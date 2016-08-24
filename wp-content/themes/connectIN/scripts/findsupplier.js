$('#stateselect').change(function() {
  var selectedstate = $('#stateselect option:selected').val()
  $('.supplier').hide()
  $('.' + selectedstate).show()
})

$('#stateselect').change(function() {
  var selectedstate = $('#stateselect option:selected').val()
  $('.rep').hide()
  $('.' + selectedstate).show()
})

// window.onload = function() {
//   var startPos;
//   var geoOptions = {
//     enableHighAccuracy: true
//   }
//
//   var geoSuccess = function(position) {
//     startPos = position;
//     // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//     // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//   };
//   var geoError = function(error) {
//     console.log('Error occurred. Error code: ' + error.code);
//     // error.code can be:
//     //   0: unknown error
//     //   1: permission denied
//     //   2: position unavailable (error response from location provider)
//     //   3: timed out
//   };
//
//   navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
// };


navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)

            // var GEOCODING = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude +  + position.coords.longitude + '&sensor=false';

            var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAIapQbBrBcIFTuIlMxbXbMty3dT7R1b2k'

            $.getJSON(GEOCODING).done(function(location) {
                console.log(location)
            })
        }

        function error(err) {
            console.log(err)
        }
