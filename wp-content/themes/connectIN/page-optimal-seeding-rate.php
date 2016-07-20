<?php
get_header();
get_template_part('components/inner-hero'); ?>

<div class="risks row">
  <div class="col-xs-12">
    <div class="box center">
      <h2><?php the_field('risks_headline'); ?></h2>
      <div class="risks-copy"><?php the_field('risks_copy'); ?></div>
    </div>
  </div>

  <div class="risks-seeding room row">
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
</div>

<?php get_footer(); ?>
