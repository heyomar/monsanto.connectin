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
