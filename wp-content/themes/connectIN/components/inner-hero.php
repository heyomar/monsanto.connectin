<div class="inner-hero">
  <h1 class="inner-hero-headline"><?php the_title(); ?></h1>
  <div class="inner-hero-copy">
    <?php the_field('hero_copy'); ?>
  </div>
<?php if (is_page('optimal-seeding-rate')) : ?>
  <div class="embed-container">
    <!-- TODO: Place production video here in page admin -->
    <!-- NOTE: remember to set JSAPI and other configurations -->
	   <?php the_field('hero_video'); ?>
  </div>
<?php endif; ?>
</div>
