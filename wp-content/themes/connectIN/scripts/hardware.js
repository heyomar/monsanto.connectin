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


$('.list .item').on('click', function () {
	$(this).addClass('active');

	const chosenVideoURL = $(this).attr('data-video');
	console.log(chosenVideoURL);
	$('#frame').attr('src', chosenVideoURL);

	if ($('#frame').attr('src') === chosenVideoURL) {

	}
});


$('.email-button').on('click', function () {
	if ($('.email-active')[0]) {
		$(this).parent().parent().next().removeClass('email-active').slideUp();
	} else {
		$(this).parent().parent().next().slideDown().addClass('email-active');
	}
})
