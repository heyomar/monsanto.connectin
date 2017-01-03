<?php get_header();
      get_template_part('components/inner-hero');?>

  <!-- THE MEAT -->
  <div class="why__ctn row">
    <div class="col-sm-12">
      <div class="box give__room">
        <h3 class="make__headline"><?php the_field('why_headline'); ?></h3>
        <?php the_field('why_copy'); ?>
        <div class="why__video center__grid"><?php the_field('why_video'); ?></div>
      </div>
    </div>
  </div>

  <div class="benefits__ctn row">
    <div class="col-xs-12">
      <div class="box">
        <h3 class="make__headline"><?php the_field('benefits_headline'); ?></h3>
        <?php the_field('benefits_copy'); ?>
      </div>
    </div>
  </div>

<div class="benifits__o-list-ctn make__wide">
    <?php if( have_rows('benefit_section') ): ?>

        <?php while ( have_rows('benefit_section') ) : the_row(); ?>

          <div class="benefits__i-list-ctn">
            <h3 class="benefits__headline"><?php the_sub_field('benefits_sets_title'); ?> <svg class="icon"><use xlink:href="#icon-down"></use></svg></h3>

            <?php if( have_rows('benefit_sets') ): ?>
              <ul class="benefits__list-ul">
              <?php while ( have_rows('benefit_sets')) : the_row(); ?>

                <li><?php the_sub_field('benefit');?></li>

              <?php endwhile; ?>
              </ul>
            <?php endif; ?>
          </div>

        <?php endwhile;?>

    <?php endif ?>
</div>




  <div class="how__ctn">
    <div class="row center__grid give__room">
      <div class="col-sm-12">
        <div class="box center__text">
          <h3 class="make__headline"><?php the_field('how_headline') ?></h3>
          <?php the_field('how_copy') ?>
        </div>
      </div>
    </div>

    <div class="row make__wide give__room">
      <div class="col-sm-4">
        <div class="box">
          <h3><span class="make__number">1</span><?php the_field('step_1_headline') ?></h3>
          <?php the_field('step_1_copy') ?>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="box">
          <h3><span class="make__number">2</span><?php the_field('step_2_headline') ?></h3>
          <?php the_field('step_2_copy') ?>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="box">
          <h3><span class="make__number">3</span><?php the_field('step_3_headline') ?></h3>
          <?php the_field('step_3_copy') ?>
        </div>
      </div>
    </div>
    <div class="how__product-ctn make__wide row give__room">
      <div class="how__logo-ctn col-sm-4">
        <div class=" box">
          <a href="/" class="no-border"><svg class="icon icon-connectin"><use xlink:href="#icon-connectin-color"></use></svg></a>
        </div>
      </div>

      <div class="col-sm-8">
        <div class="box">
          <img class="how__product" src="<?php the_field('product_photo'); ?>" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="row center__grid give__room">
    <div class="col-sm-12">
      <div class="box center__text add__bottom-pad-35">
        <h3>Seed Suppliers, contact your WestBred representative to bring<br>the benefits of the ConnectIN System to your customers.</h3><br>
        <a class="button__plain" href="/find-seed-supplier">Find Your Representative</a>
      </div>
    </div>
  </div>
  <?php get_footer(); ?>
