<?php get_header(); ?>

<!-- <div class="menu__ctn">
  <div class="row">
    <div class="menu__logo box">
      <a href="/"><svg class="icon icon-connectin"><use xlink:href="#icon-connectin"></use></svg></a>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12">
      <div class="box">
        <div class="menu__contact-bar">
          <span class="menu__find-seed">
            <img src="/assets/images/menu__mappin-icon.svg" alt="" />
            <a href="/">Find a Seed Supplier</a>
          </span>
          <span class="menu__contact-us">
            <img src="/assets/images/menu__mail-icon.svg" alt="" />
            <a href="/">Contact Us</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</div> -->



  <!-- THE MEAT -->
  <div class="hero__ctn">
    <div class="hero__inner-ctn">
      <h1 class="hero__title"><?php the_field('hero_title'); ?></h1>
      <h3 class="hero__subtitle"><?php the_field('hero_subtitle'); ?></h3>
      <?php the_field('hero_copy'); ?>
      <a href="" class="hero__button button__plain"><?php the_field('hero_button_copy'); ?></a>
    </div>
  </div>

  <div class="make__wide">
    <div class="seed__ctn row">
      <div class=" col-md-7">
        <div class="box give__room">
          <h3 class="seed__headline make__headline"><?php the_field('seed_headline'); ?></h3>
          <?php the_field('seed_copy'); ?>
          <a href="" class="seed__button button__plain"><?php the_field('seed_button_copy'); ?></a>
        </div>
      </div>

      <div class="center__text col-md-5">
        <div class="box give__room">
          <img class="seed__image" src="<?php the_field('seed_image'); ?>" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div class="make__wide row">
      <div class="supply__ctn col-sm-6">
        <div class="box give__room">
          <h3 class="supply__headline make__headline"><?php the_field('supply_headline'); ?></h3>
          <?php the_field('supply_copy'); ?>
          <a href="" class="supply__button button__plain"><?php the_field('supply_button_copy'); ?></a>
        </div>
      </div>

    <div class="calc__ctn col-sm-6">
      <div class="box give__room">
        <h3 class="calc__headline make__headline"><?php the_field('calc_headline'); ?></h3>
        <?php the_field('calc_copy'); ?>
        <a href="" class="calc__button button__plain"><?php the_field('calc_button_copy'); ?></a>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>
