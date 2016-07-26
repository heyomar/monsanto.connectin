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
  <div class="wFormContainer"  >

  <style type="text/css"></style><div class=""><div class="wForm" id="tfa_0-WRPR" dir="ltr">
<div class="codesection" id="code-tfa_0"></div>
<form method="post" action="https://www.tfaforms.com/responses/processor" class="hintsBelow labelsAbove" id="tfa_0">
<div id="tfa_1-D" class="oneField field-container-D     ">
<label id="tfa_1-L" for="tfa_1" class="label preField reqMark">First Name</label><br><div class="inputWrapper"><input type="text" id="tfa_1" name="tfa_1" value="" placeholder="" title="First Name" class="required"></div>
</div>
<div id="tfa_2-D" class="oneField field-container-D     ">
<label id="tfa_2-L" for="tfa_2" class="label preField reqMark">Last Name</label><br><div class="inputWrapper"><input type="text" id="tfa_2" name="tfa_2" value="" placeholder="" title="Last Name" class="required"></div>
</div>
<div id="tfa_3-D" class="oneField field-container-D     ">
<label id="tfa_3-L" for="tfa_3" class="label preField reqMark">Email</label><br><div class="inputWrapper"><input type="text" id="tfa_3" name="tfa_3" value="" placeholder="" title="Email" class="validate-email required"></div>
</div>
<div class="actions" id="tfa_0-A"><input type="submit" class="primaryAction" value="Submit"></div>
<div style="clear:both"></div>
<input type="hidden" value="433713" name="tfa_dbFormId" id="tfa_dbFormId"><input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId"><input type="hidden" value="a8623a69d1e6264f46562887e0ccd599" name="tfa_dbControl" id="tfa_dbControl"><input type="hidden" value="1" name="tfa_dbVersionId" id="tfa_dbVersionId"><input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
</form>
</div></div>

</div>

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
