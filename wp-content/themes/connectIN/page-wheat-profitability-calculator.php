<?php
get_header();
get_template_part('components/inner-hero'); ?>
<?php get_template_part('components/wheat-calc'); ?>

<div class="actionData">
  <h3 class="make__h3">SHARE YOUR WHEAT PROFITABILITY
  CALCULATIONS</h3><button class="toggleModal">EMAIL THIS DATA</button>
  <form action="https://pdfgen.msvc.io/api/v1/Download?templateName=WestBred_ProfitCalc" method='post' id="pdfForm">
    <input type="hidden" name="json" id="pdfData">
    <button type="submit" id="downloadPDF">DOWNLOAD PDF</button>
  </form>
</div>

<div id="emailData" class="modal">
  <form id="emailDataForm" class="">
    <h3 class="make__h3">Email This Data</h3>

    <span>Recipient:</span>

    <div class="field-ctn">
      <div class="label-ctn">
        <label for="email">Email &nbsp;</label>
      </div>
      <div class="input-ctn">
        <input id="recipientEmail" name="email" required="" type="text" value="" required>
      </div>
    </div>

    <div class="center__text">
      <button id="mailPDF" type="button">Send PDF</button>
    </div>

  </form>
</div>

<div id="thankyoumodal" class="modal">
  <h3 class="calcpage__h3 center__text">Thank You</h3>
  <p>The PDF has been sent.</p><div class="center__text"><button id="thankyou__startover" name="button" type="button">START
  OVER</button></div>
</div>
<?php get_footer(); ?>
