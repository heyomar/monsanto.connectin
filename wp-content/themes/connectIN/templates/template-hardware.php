<?php
/**
 * Template Name: Hardware 2017
 * @package WordPress
 */
 ?>


 <?php get_header(); ?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<!--[––––
			↓ INTRO HERO ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
			<section class="intro">
				<div class="inner mxw-1250-center">
					<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-6">
								<div class="content">
									<h2 class="title"><?php the_field('hero_title'); ?></h2>
									<h3 class="subtitle"><?php the_field('hero_sub_title'); ?></h3>
									<?php the_field('hero_copy'); ?>
								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-6">
								<div class="content">
									<iframe width="560" height="315" src="<?php the_field('hero_video_link'); ?>" frameborder="0" allowfullscreen></iframe>
								</div>
						</div>

						<div class="col-xs-12 col-sm-12">
							<div class="content">
								<?php the_field('hero_under_video_copy'); ?>
							</div>
						</div>
					</div>
				</div>
			</section>
<!--[––––
			↓ CALLOUTS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
			<section class="callouts">
					<div class="row">
						<div class="col-xs-12 col-sm-6 nopad order">
							<div class="content ">
								<h2><?php the_field('ots_title'); ?></h2>
								<div class="copy"><?php the_field('ots_copy'); ?></div>
								<a href="<?php the_field('ots_button_link'); ?>" class="button"><?php the_field('ots_button_copy'); ?></a>
							</div>
						</div>

						<div class="col-xs-12 col-sm-6 nopad training">
							<div class="content">
								<h2><?php the_field('tm_title'); ?></h2>
								<div class="copy"><?php the_field('tm_copy'); ?></div>
								<a href="<?php the_field('tm_button_link'); ?>" class="button"><?php the_field('tm_button_copy'); ?></a>
							</div>
						</div>
					</div>
			</section>
<!--[––––
			↓ BENEFITS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
			<section class="benefits mxw-1000-center">
				<div class="lead">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<div class="content">
								<h2 class="title center-text"><?php the_field('sb_title'); ?></h2>
								<div class="copy responsive-text-align"><?php the_field('sb_copy'); ?></div>
							</div>
						</div>
					</div>
					<div class="single-video">
							<iframe width="560" height="315" src="<?php the_field('sb_video_link'); ?>" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
<!--[––––
			↓ REASONS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
<div class="reasons">
	<div class="row">

		<?php if( have_rows('sb_list') ): ?>
			<?php while ( have_rows('sb_list') ) : the_row(); ?>

			<div class="hide-image col-xs-12 col-sm-2">
				<div class="content list-image">
					<img class="bullet-image" src="<?php the_sub_field('image'); ?>" alt="">
				</div>
			</div>

			<div class="col-xs-12 col-sm-10 col-md-10">
				<div class="content">
					<ul class="list">

						<span class="title"><?php the_sub_field('list_heading'); ?></span>
						<?php if( have_rows('list_items') ): ?>

							<?php while ( have_rows('list_items') ) : the_row(); ?>
								<li><?php the_sub_field('bullet_points') ?></li>
							<?php endwhile; ?>

						<?php else : ?>
						<?php endif; ?>

					</ul>
				</div>
			</div>
			<?php endwhile; ?>
		<?php else : ?>
		<?php endif; ?>
		</div>
	</div>
</section>

		<?php endwhile; ?>
	<?php endif ?>
 <?php get_footer(); ?>
