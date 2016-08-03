<?php
get_header();
get_template_part('components/inner-hero'); ?>

<div id="contactform__ctn" class="wFormContainer">
    <style type="text/css"></style>
    <div class="">
        <div class="wForm" id="tfa_0-WRPR" dir="ltr">
            <div class="codesection" id="code-tfa_0"></div>
            <h3 class="wFormTitle" id="tfa_0-T">ConnectIN Contact Form</h3>
            <form method="post" action="https://www.tfaforms.com/responses/processor" class="hintsBelow labelsAbove" id="tfa_0">
                <div id="tfa_1-D" class="oneField field-container-D     ">
                    <label id="tfa_1-L" for="tfa_1" class="label preField reqMark">Email</label>
                    <br>
                    <div class="inputWrapper">
                        <input type="text" id="tfa_1" name="tfa_1" value="" placeholder="" title="Email" class="validate-email required">
                    </div>
                </div>
                <div id="tfa_2-D" class="oneField field-container-D     ">
                    <label id="tfa_2-L" for="tfa_2" class="label preField reqMark">Message</label>
                    <br>
                    <div class="inputWrapper">
                        <textarea id="tfa_2" name="tfa_2" title="Message" class="required"></textarea>
                    </div>
                </div>
                <div class="actions" id="tfa_0-A">
                    <input type="submit" class="primaryAction" value="Submit">
                </div>
                <div style="clear:both"></div>
                <input type="hidden" value="433706" name="tfa_dbFormId" id="tfa_dbFormId">
                <input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId">
                <input type="hidden" value="a32599eb5ce6499828c696353798cec9" name="tfa_dbControl" id="tfa_dbControl">
                <input type="hidden" value="5" name="tfa_dbVersionId" id="tfa_dbVersionId">
                <input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
            </form>
        </div>
    </div>
</div>

<?php get_footer(); ?>
