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
                <option>Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
          </label>
        </div>
    </div>
  </div>
</div>

<div id="results" class="hidden"><div class="suppliers__section-title make__headline"><h3>Seed Suppliers</h3></div>
<div class="suppliers__ctn">
  <?php $suppliers = new WP_Query( array(
                                    'post_type' => 'suppliers',
                                    'posts_per_page' => -1,
                                    'orderby' => 'title',
                                    'order' => 'ASC' ) );?>
    <?php if( $suppliers->have_posts()): ?>
      <div class="row">
        <?php while ( $suppliers->have_posts()) : $suppliers->the_post();  ?>

              <div class="col-xs-12 col-sm-4 supplier <?php the_field('supplier_state'); ?>">
                <div class="box">
                  <div class="supplier__info">
                    <h4><?php the_title(); ?></h4>
                    <span class="supplier__address-copy"><?php the_field('supplier_address'); ?></span>
                    <span class="supplier__phonenumber-copy"><?php the_field('supplier_phone_number'); ?></span>
                    <span><a href="" class="supplier__email-copy"><?php the_field('supplier_email'); ?></a></span>
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
            <h4><?php the_title(); ?></h4>
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
</div></div>

<?php get_footer();?>
