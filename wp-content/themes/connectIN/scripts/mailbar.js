// click title or down arrow
$('#mailbar-activate').on('click touchend', function () {
  const $body = $('#mailbar-body')
  const vh = $(window).height() - 60
  const arrowDown = '<use xlink:href="#icon-down"></use>'
  const arrowUp = '<use xlink:href="#icon-up"></use>'

  if ($body.height() === 0) {
    $body.animate({ height: vh })
    $(this).children('svg').html(arrowUp)
  } else {
    $body.animate({ height: 0 })
    $(this).children('svg').html(arrowDown)
  }

  $('body').toggleClass('mailbar-active')
})

// TODO: submit mailbar form
// run dismissMailbar() after thank you - a dismiss button perhaps?

// click dismiss
$('#mailbar-dismiss').on('click touchend', dismissMailbar)

function dismissMailbar () {
  $('#mailbar').animate({ height: '0' }, function () {
    $(this).remove()
  })
  // TODO: set a cookie here (after testing that is) to keep window dismissed for TBD time
}
