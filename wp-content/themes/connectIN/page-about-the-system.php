<?php get_header();
      get_template_part('components/inner-hero');?>

  <!-- THE MEAT -->
  <div class="why__ctn row">
    <div class="col-sm-12">
      <div class="box room">
        <h3 class="headline"><?php the_field('why_headline'); ?></h3>
        <?php the_field('why_copy'); ?>
        <div class="why__video center"><?php the_field('why_video'); ?></div>
      </div>
    </div>
  </div>

  <div class="benefits__ctn row">
    <div class="col-xs-12">
      <div class="box">
        <h3 class="headline"><?php the_field('benefits_headline'); ?></h3>
        <?php the_field('benefits_copy'); ?>
      </div>
    </div>
  </div>


  <?php get_footer(); ?>
