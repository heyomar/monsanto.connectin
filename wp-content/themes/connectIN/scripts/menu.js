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
