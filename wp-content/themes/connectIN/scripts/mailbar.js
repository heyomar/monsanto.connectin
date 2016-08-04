const mailbar = `
<div class="mailbar-header">
  <span id="mailbar-activate">
    <span class="show__768up">Sign up for email updates about the ConnectIN™ Wheat Insight System.</span>
    <span class="hide__768down">Sign up for email updates</span>
    <svg class="icon down"><use xlink:href="#icon-down"></use></svg>
  </span>

  </span>

  <span id="mailbar-dismiss" class="dismiss">
    <svg class="icon">
      <use xlink:href="#icon-circle-cross"></use>
    </svg>
  </span>
</div>
<div id="mailbar-body" class="mailbar-body">
    <!-- form  -->
    <div id="signupform__ctn" class="wFormContainer">
        <style type="text/css"></style>
        <div class="wForm" id="tfa_0-WRPR" dir="ltr">
            <div class="codesection" id="code-tfa_0"></div>
            <h3 class="wFormTitle" id="tfa_0-T">ConnectIN Email Signup</h3>
            <form method="post" action="https://www.tfaforms.com/responses/processor" class="hintsBelow labelsAbove" id="tfa_0">
                <div id="tfa_1-D" class="oneField field-container-D     ">
                    <label id="tfa_1-L" for="tfa_1" class="label preField reqMark">First Name</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_1" name="tfa_1" value="" placeholder="" title="First Name" class="required">
                    </div>
                </div>
                <div id="tfa_2-D" class="oneField field-container-D     ">
                    <label id="tfa_2-L" for="tfa_2" class="label preField reqMark">Last Name</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_2" name="tfa_2" value="" placeholder="" title="Last Name" class="required">
                    </div>
                </div>
                <div id="tfa_3-D" class="oneField field-container-D     ">
                    <label id="tfa_3-L" for="tfa_3" class="label preField reqMark">Email</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_3" name="tfa_3" value="" placeholder="" title="Email" class="validate-email required">
                    </div>
                </div>
                <div id="tfa_4-D" class="oneField field-container-D     ">
                    <label id="tfa_4-L" for="tfa_4" class="label preField reqMark">I am a:</label>
                    <br>
                    <div class="inputWrapper"><span id="tfa_4" class="choices vertical required"><span class="oneChoice"><input type="checkbox" value="tfa_6" class="" checked id="tfa_6" name="tfa_6"><label class="label postField" id="tfa_6-L" for="tfa_6">Grower</label></span>
                        <span
                            class="oneChoice">
                            <input type="checkbox" value="tfa_5" class="" id="tfa_5" name="tfa_5">
                            <label class="label postField" id="tfa_5-L" for="tfa_5">Seed Supplier</label>
                            </span>
                            </span>
                    </div>
                </div>
                <div class="actions" id="tfa_0-A">
                    <input type="submit" class="primaryAction" value="Submit">
                </div>
                <div style="clear:both"></div>
                <input type="hidden" value="433713" name="tfa_dbFormId" id="tfa_dbFormId">
                <input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId">
                <input type="hidden" value="a8623a69d1e6264f46562887e0ccd599" name="tfa_dbControl" id="tfa_dbControl">
                <input type="hidden" value="7" name="tfa_dbVersionId" id="tfa_dbVersionId">
                <input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
            </form>
        </div>
        </div>
    </div>

</div>
`

// SET COOKIE HERE
$('#tfa_0-A input').on('click', function (event) {
  event.preventDefault()
  console.log('IT works!')
  // set cookie
  Cookies.set('subscribed', 'true', { expires: 1500 })
  // $('#tfa_0').submit()
})

if (!$('body').hasClass('sign-up') || false) {
  $('#mailbar').html(mailbar)
}



// click title or down arrow
$('#mailbar-activate').on('click touchend', function () {
  let vh
  const $body = $('#mailbar-body')
  const arrowDown = '<use xlink:href="#icon-down"></use>'
  const arrowUp = '<use xlink:href="#icon-up"></use>'

  if ($(window).width() < 768) {
    vh = $(window).height() - $('#mailbar').height()
  } else {
    vh = 400
  }

  if ($body.height() === 0) {
    window.scroll(0, 0)
    $body.animate({ height: vh })
    $(this).children('svg').html(arrowUp)
  } else {
    $body.animate({ height: 0 })
    $(this).children('svg').html(arrowDown)
  }

  $('body').toggleClass('mailbar-active')
  $('html').toggleClass('mailbar-active')
})

// TODO: submit mailbar form
// run dismissMailbar() after thank you - a dismiss button that replaces the form submit perhaps?

// click dismiss
$('#mailbar-dismiss').on('click', dismissMailbar)

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
  Cookies.set('subscribed', 'true')
}
