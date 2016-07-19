<?php get_header(); ?>

  <!-- THE MEAT -->
  <div class="hero__ctn">
    <div class="hero__inner-ctn">
      <h1 class="hero__title"><?php the_field('hero_title'); ?></h1>
      <h3 class="hero__subtitle"><?php the_field('hero_subtitle'); ?></h3>
      <?php the_field('hero_copy'); ?>
      <a href="" class="hero__button button__plain"><?php the_field('hero_button_copy'); ?></a>
    </div>
  </div>

  <div class="seed__ctn flex__ctn">
    <div class="flex__three">
      <h3 class="seed__headline headline"><?php the_field('seed_headline'); ?></h3>
      <?php the_field('seed_copy'); ?>
      <a href="" class="seed__button button__plain"><?php the_field('seed_button_copy'); ?></a>
    </div>

    <div class="flex__one">
      <img src="http://placehold.it/350x150" alt="" />
    </div>
  </div>

  <div class="flex__ctn">
    <div class="supply__ctn flex__half">
      <h3 class="supply__headline headline"><?php the_field('supply_headline'); ?></h3>
      <?php the_field('supply_copy'); ?>
      <a href="" class="supply__button button__plain"><?php the_field('supply_button_copy'); ?></a>
    </div>

    <div class="calc__ctn flex__half">
      <h3 class="calc__headline headline"><?php the_field('calc_headline'); ?></h3>
      <?php the_field('calc_copy'); ?>
      <a href="" class="calc__button button__plain"><?php the_field('calc_button_copy'); ?></a>
    </div>
  <div>


<?php get_footer(); ?>
