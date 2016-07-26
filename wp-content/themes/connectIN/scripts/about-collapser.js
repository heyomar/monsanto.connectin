$('.benefits__headline').on('click touchend', function () {
  if ($(window).width() <= 768) {
    const $body = $(this).next()
    const arrowDown = '<use xlink:href="#icon-down"></use>'
    const arrowUp = '<use xlink:href="#icon-up"></use>'

    $body.slideToggle()

    if ($(this).hasClass('active')) {
      $(this).children('svg').html(arrowUp)
    } else {
      $(this).children('svg').html(arrowDown)
    }

    $(this).toggleClass('active')
  }
})
