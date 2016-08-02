<?php get_header(); ?>

  <!-- THE MEAT -->
  <div class="hero__ctn">
    <div class="hero__inner-ctn">
      <h1 class="hero__title"><?php the_field('hero_title'); ?></h1>
      <h3 class="hero__subtitle"><?php the_field('hero_subtitle'); ?></h3>
      <?php the_field('hero_copy'); ?>

      <a href="<?php the_field('hero_button_link'); ?>" class="hero__button button__plain"><?php the_field('hero_button_copy'); ?></a>
    </div>
  </div>

  <div class="make__wide">
    <div class="seed__ctn row">
      <div class=" col-md-7">
        <div class="box give__room">
          <h3 class="seed__headline make__headline"><?php the_field('seed_headline'); ?></h3>
          <?php the_field('seed_copy'); ?>
          <a href="<?php the_field('seed_button_link'); ?>" class="seed__button button__plain"><?php the_field('seed_button_copy'); ?></a>
        </div>
      </div>

      <div class="center__text col-md-5">
        <div class="box give__room">
          <img class="seed__image" src="<?php the_field('seed_image'); ?>" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="supply__ctn">
    <div class="row make__wide">
      <div class=" col-md-6">
        <div class="box give__room">
          <h3 class="supply__headline make__headline"><?php the_field('supply_headline'); ?></h3>
          <?php the_field('supply_copy'); ?>
          <a href="<?php the_field('supply_button_link'); ?>" class="supply__button button__plain"><?php the_field('supply_button_copy'); ?></a>

        </div>
      </div>

      <div class="col-md-6 product__ctn give__room">
        <div class="box">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/about__unit.png" alt="" />
        </div>
      </div>

    <!-- <div class="calc__ctn col-sm-6">
      <div class="box give__room">
        <h3 class="calc__headline make__headline"><?php the_field('calc_headline'); ?></h3>
        <?php the_field('calc_copy'); ?>
        <a href="<?php the_field('calc_button_link'); ?>" class="calc__button button__plain"><?php the_field('calc_button_copy'); ?></a>
      </div>
    </div> -->
  </div>
</div>

<?php get_footer(); ?>
