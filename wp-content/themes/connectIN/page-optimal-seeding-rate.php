<?php
get_header();
get_template_part('components/inner-hero'); ?>

<div class="risks center__grid row">
  <div class="col-xs-12">
    <div class="box center__text">
      <h2><?php the_field('risks_headline'); ?></h2>
      <div class="risks-copy"><?php the_field('risks_copy'); ?></div>
    </div>
  </div>
</div>

<div class="center__grid align center__text give__room row remove__top-pad">
  <div class="col-sm-6">
    <div class="box">
      <div class="risks-underseed">
        <img src="<?php the_field('underseed_image'); ?>">
        <div class="risks-underseed-copy"><?php the_field('underseed_copy'); ?></div>
      </div>
    </div>
  </div>

  <div class="col-sm-6">
    <div class="box">
      <img src="<?php the_field('overseed_image'); ?>">
      <div class="risks-underseed-copy"><?php the_field('overseed_copy'); ?></div>
    </div>
  </div>
</div>

<div class="benefits__op-ctn give__room">
  <div class="center__grid row">
    <div class="col-sm-6">
      <div class="box">
        <h2><?php the_field('benefits_headline'); ?></h2>
        <?php the_field('benefits_copy') ?>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="box">
        <?php the_field('benefits_list') ?>
      </div>
    </div>
  </div>
</div>

<div class="row center__grid give__room">
  <div class="col-sm-12">
    <div class="box center__text">
      <h3>Growers, maximize the potential of your seed investment. Ask for your<br> Optimal Seeding Rate recommendation today.</h3><br>
      <a class="button__plain" href="/find-seed-supplier">Find a Seed Supplier</a>
    </div>
  </div>
</div>

<?php get_footer(); ?>
