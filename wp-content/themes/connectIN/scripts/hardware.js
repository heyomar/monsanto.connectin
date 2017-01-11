$(document).ready(function () {
  $('.action .row .nopad').matchHeight();
})

//[–––
//			↓ MOBILE SLICK VIDEO SLIDER ↓
//––––––––––––––––––––––––––––––––––––––//]
$('#slick-reporting, #slick-training').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
				arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 400,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});

//[–––
//			↓ SEND PDFS ↓
//––––––––––––––––––––––––––––––––––––––//]
$(document).ready(function() {
	$('form').on('submit', function(e){
		e.preventDefault();

		const theForm = $(this);

		const emailField = $(this['email-address']).val();
		if ($('.pdf-email-error')[0]) {
			$('pdf-email-error').hide();
		}
		if(!emailField){
			$('.pdf-email-error').show();
		}

		if(emailField) {

			$('.pdf-email-error').hide();

			const serialData = $(this).serialize();

			$.ajax({
				url: '/email.php',
				type: 'POST',
				data: serialData
			})
			.done(function() {
				console.log("success");
				$(theForm).hide();
				$(theForm).next().show();
			})

		}

	})

});


//[–––
//			↓ SWAP VIDEOS  ↓
//––––––––––––––––––––––––––––––––––––––//]
$('.list .item').on('click', function () {
	if ($(this).parents('.list').children('.item').hasClass('active')) {
		$(this).parents('.list').children('.item').removeClass('active');
	}
	$(this).addClass('active');
	const chosenVideoURL = $(this).attr('data-video');
	$(this).parents('.col-xs-12').next().find('iframe').attr('src', chosenVideoURL + '?rel=0&amp;showinfo=0');
});


//[–––
//			↓ SHOW AND HIDE EMAIL FORMS ↓
//––––––––––––––––––––––––––––––––––––––//]
$('.email-button').on('click', function () {
	if ($(this).parents('row').children('.email-field').hasClass('email-active')) {
		$(this).parent().parent().next().removeClass('email-active').slideUp();
	} else {
		$('.email-active').slideUp();
		$(this).parent().parent().next().addClass('email-active').slideDown();
	}
})
