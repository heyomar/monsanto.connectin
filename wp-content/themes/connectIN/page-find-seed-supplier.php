<?php get_header(); ?>

<div class="make__offwhite row">
  <div class="col-xs-12 col-sm-8">
    <div class="box">
      <div class="inner-hero">
          <h1 class="inner-hero-headline"><?php the_title(); ?></h1>
          <div class="inner-hero-copy">
            <?php the_field('hero_copy'); ?>
          </div>
      </div>
    </div>
  </div>

  <div class="col-xs-12 col-sm-4">
    <div class="box">
        <div class="suppliers__select-ctn">
          <p>Find seed suppliers and WestBred representatives near you.</p>

            <label>
              <select id="stateselect" class="" name="">
                <?php $states = get_terms(array(
                  'taxonomy' => 'states'
                )); ?>
                <option>Select a state</option>
                <?php foreach($states as $state) : ?>

                  <option value="<?php echo $state->slug; ?>"><?php echo $state->name; ?></option>
                <?php endforeach; ?>
              </select>
          </label>
        </div>
    </div>
  </div>
</div>

<div class="suppliers__section-title make__headline"><h3>Seed Suppliers</h3></div>
<div class="suppliers__ctn">
  <?php $suppliers = new WP_Query( array( 'post_type' => 'suppliers' ) );?>
    <?php if( $suppliers->have_posts()): ?>
      <div class="row">
        <?php while ( $suppliers->have_posts()) : $suppliers->the_post();  ?>

              <div class="col-xs-12 col-sm-4 supplier <?php
                $stateterms = get_the_terms(get_the_ID(), 'states' );
                foreach ($stateterms as $stateterm) {
                  echo $stateterm->slug . " ";
                }
              ?>">
                <div class="box">
                  <div class="supplier__info">
                    <h4><?php the_title(); ?></h4>
                    <span class="supplier__address-copy"><?php the_field('supplier_address'); ?></span>
                    <span class="supplier__phonenumber-copy"><?php the_field('supplier_phone_number'); ?></span>
                    <span><a href="#" class="supplier__email-copy"><?php the_field('supplier_email'); ?></a></span>
                    <span><a href="#" class="supplier__suteurl-copy"><?php the_field('supplier_site_url'); ?></a></span>
                  </div>
                </div>
              </div>

        <?php endwhile; ?>
      </div>
    <?php endif ?>
</div>

<div class="rep__ctn">
<?php $reps = new WP_Query( array( 'post_type' => 'reps' ) );?>
<h3 class="make__headline">Westbred Representatives</h3>
<?php if( $reps->have_posts()): ?>
<div class="row">
  <?php while ( $reps->have_posts()) : $reps->the_post();  ?>
  <div class="col-xs-12 col-sm-6 rep <?php
    $stateterms = get_the_terms(get_the_ID(), 'states' );
    foreach ($stateterms as $stateterm) {
      echo $stateterm->slug . " ";
    }
  ?>">
    <div class="box">
      <div class="rep__info">
        <div class="row">
        <img src="<?php the_field('rep_photo'); ?>" alt="" />
        <div class="col-xs-6 col-sm-6">
          <h4><?php the_field('rep_name') ?></h4>
        <span><?php the_field('rep_position'); ?></span>
        <span><?php the_field('rep_phone'); ?></span>
        <span><?php the_field('rep_email'); ?></span>
        <span><?php the_field('rep_address'); ?></span>
      </div>
      </div>
      </div>
    </div>
  </div>
  <?php endwhile; ?>
</div>
<?php endif ?>
</div>

<?php get_footer();?>
