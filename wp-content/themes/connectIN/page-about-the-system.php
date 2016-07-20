<?php get_header();
      get_template_part('components/inner-hero');?>

  <!-- THE MEAT -->
  <div class="why__ctn">
    <h3 class="headline"><?php the_field('why_headline'); ?></h3>
    <?php the_field('why_copy'); ?>
    <div class="why__video"><?php the_field('why_video'); ?></div>
  </div>

  <div class="benefits__ctn">
    <h3 class="headline"><?php the_field('benefits_headline'); ?></h3>
    <?php the_field('benefits_copy'); ?>
  </div>


  <?php get_footer(); ?>
