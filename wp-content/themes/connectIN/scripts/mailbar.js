const mailbar = `<div class="mailbar-header">
  <span id="mailbar-activate">
    Sign up for email updates
    <svg class="icon down"><use xlink:href="#icon-down"></use></svg>
  </span>
  <span id="mailbar-dismiss" class="dismiss">
    <svg class="icon"><use xlink:href="#icon-circle-cross"></use></svg>
  </span>
</div>
<div id="mailbar-body" class="mailbar-body">
  <!-- form  -->
  FORM GOES HERE
</div>`

// TODO: check for cookie before running this insertion
$('#mailbar').html(mailbar)

// click title or down arrow
$('#mailbar-activate').on('click touchend', function () {
  const $body = $('#mailbar-body')
  const vh = $(window).height() - $('#mailbar').height()
  const arrowDown = '<use xlink:href="#icon-down"></use>'
  const arrowUp = '<use xlink:href="#icon-up"></use>'

  if ($body.height() === 0) {
    window.scroll(0, 0)
    $body.animate({ height: vh })
    $(this).children('svg').html(arrowUp)
  } else {
    $body.animate({ height: 0 })
    $(this).children('svg').html(arrowDown)
  }

  $('body').toggleClass('mailbar-active')
})

// TODO: submit mailbar form
// run dismissMailbar() after thank you - a dismiss button that replaces the form submit perhaps?

// click dismiss
$('#mailbar-dismiss').on('click touchend', dismissMailbar)

function dismissMailbar () {
  // if the menu is active and you dismiss, recalculate menu height
  if ($('body').hasClass('menu-active')) {
    const menu = $('#menu-header-menu-container')
    const addedHeight = menu.height() + $('#mailbar').height()
    $('#menu-header-menu-container').css('height', addedHeight + 'px')
  }

  $('#mailbar').animate({ height: '0' }, function () {
    $(this).remove()
    $('body').removeClass('mailbar-active')
  })
  // TODO: set a cookie here (after testing that is) to keep window dismissed for TBD time
}
