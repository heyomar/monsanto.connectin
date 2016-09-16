<?php
get_header();
get_template_part('components/inner-hero'); ?>
<?php get_template_part('components/wheat-calc'); ?>

<div class="actionData">
  <h3 class="make__h3">SHARE YOUR WHEAT PROFITABILITY
  CALCULATIONS</h3><button class="toggleModal">EMAIL THIS DATA</button>
  <button class="" onclick="generate('download')">DOWNLOAD PDF</button>
</div>

<div class="modal">
  <form class="">
    <h3 class="make__h3">Email This Data</h3>

    <span>Recipient:</span>
    <span class="close toggleModal">&#215;</span>


    <div class="field-ctn">
      <div class="label-ctn">
        <label for="email">Email &nbsp;</label>
      </div>
      <div class="input-ctn">
        <input id="recipientEmail" name="email" required="" type="text" value="">
      </div>
    </div>

    <span>Sender:</span>
    <div class="field-ctn">
      <div class="label-ctn">
        <label for="name">Name&nbsp;</label>
      </div>
      <div class="input-ctn">
        <input id="senderName" name="name" required="" type="text" value="">
      </div>
    </div>
    <div class="field-ctn">
      <div class="label-ctn">
        <label for="senderEmail">Email &nbsp;</label>
      </div>
      <div class="input-ctn">
        <input id="senderEmail" name="senderEmail" required="" type="text" value="">
      </div>
    </div>

    <div class="modal__checkbox">
      <input id="email__checkbox" type="checkbox" name="EmailCopy" value="Yes" checked>
      <label id="email__checkbox-label" for="EmailCopy">Send a copy to myself</label>
    </div>

    <div class="center__text">
      <button id="sendPDF" name="button" onclick="generate('email')" type=
      "button">Send PDF</button>
    </div>

  </form>
</div>

<div class="thankyoumodal">
  <span class="close toggleModal">&#215;</span>
  <h3 class="make__h3">Thank You</h3>
  <p>The PDF has been sent.</p><button name="button" type="button">START
  OVER</button>
</div>
<?php get_footer(); ?>
