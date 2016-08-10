<?php
get_header();
get_template_part('components/inner-hero'); ?>

<div id="signupform__ctn" class="wFormContainer">
    <style type="text/css"></style>
    <div class="">
        <div class="wForm" id="tfa_0-WRPR" dir="ltr">
            <div class="codesection" id="code-tfa_0"></div>
            <h3 class="wFormTitle" id="tfa_0-T">ConnectIN Email Signup</h3>
            <form method="post" action="https://www.tfaforms.com/responses/processor" class="hintsBelow labelsAbove ConnectIN-Email-Signup" id="tfa_0">
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
                <div id="checkbox__ctn" class="oneField field-container-D     ">
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
                <input type="hidden" value="4" name="tfa_dbVersionId" id="tfa_dbVersionId">
                <input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
            </form>
        </div>
    </div>
</div>

<?php get_footer(); ?>
