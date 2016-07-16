<div class="inner-hero">
  <h1 class="inner-hero-headline"><?php the_title(); ?></h1>
  <div class="inner-hero-copy">
    <?php the_field('hero_copy'); ?>
  </div>
<?php if (is_page('optimal-seeding-rate')) : ?>
  <div class="embed-container">
    <!-- TODO: Place production video here in page admin -->
	   <?php the_field('hero_video'); ?>
  </div>
<?php endif; ?>
</div>

<div class="risks">
  <h2><?php the_field('risks_headline'); ?></h2>
</div>
