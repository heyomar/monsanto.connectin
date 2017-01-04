<?php
/**
 * Template Name: How to Order 2017
 * @package WordPress
 */
 ?>


 <?php get_header(); ?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<!--[––––
			↓ HERO ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="hero">
			<div class="inner mxw-1000-center">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div class="content">
							<h2 class="title"><?php the_field('hero_title') ?></h2>
							<div class="copy"><?php the_field('hero_copy') ?></div>
						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ STEPS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="step step-one">
			<div class="inner mxw-765-center">
				<span class="number">1</span>
				<h3 class="title"><?php the_field('step_1_title'); ?></h3>
				<div class="content">

					<div class="copy"><?php the_field('step_1_copy'); ?></div>
				</div>
			</div>
		</div>

		<div class="step step-two">
			<div class="inner mxw-765-center">
				<div class="number">2</div>
				<h3 class="title"><?php the_field('step_2_title'); ?></h3>
				<div class="content">
					<div class="copy"><?php the_field('step_2_copy'); ?></div>
				</div>
			</div>
		</div>
<!--[––––
			↓ SUPPORTED DEVICES ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="supported-devices deskpad">
			<div class="inner mxw-1000-center">
				<div class="row">

					<div class="col-xs-12 col-sm-6 col-md-6 nopad">
						<div class="content tablets">
							<h3 class="title"><?php the_field('mt_section_title'); ?></h3>
							<div class="list">
								<?php if( have_rows('mobile_device') ): ?>

								    <?php while ( have_rows('mobile_device') ) : the_row(); ?>
											<ul>
												<strong class="list-title"><?php the_sub_field('device_name'); ?></strong>
												<?php if( have_rows('specs') ): ?>

												    <?php while ( have_rows('specs') ) : the_row(); ?>
															<li><?php the_sub_field('specs_bullet'); ?></li>
												    <?php endwhile; ?>

												<?php else : ?>

												<?php endif; ?>
											</ul>

								    <?php endwhile; ?>

								<?php else : ?>

								<?php endif; ?>
							</div>
						</div>
					</div>

					<div class="col-xs-12 col-sm-6 col-md-6 nopad">
						<div class="content printers">
							<h3 class="title"><?php the_field('p_section_title'); ?></h3>
							<div class="list">
								<?php if( have_rows('printer_device') ): ?>

								    <?php while ( have_rows('printer_device') ) : the_row(); ?>
											<ul>
												<strong class="list-title"><?php the_sub_field('device_name'); ?></strong>
												<?php if( have_rows('specs') ): ?>

														<?php while ( have_rows('specs') ) : the_row(); ?>
															<li><?php the_sub_field('bullet'); ?></li>
														<?php endwhile; ?>

												<?php else : ?>

												<?php endif; ?>
											</ul>

								    <?php endwhile; ?>

								<?php else : ?>

								<?php endif; ?>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ COPY SNIPPET ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="copy-snippet">
			<div class="inner mxw-1000-center">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class="content">
						<?php the_field('wtb_intro_copy'); ?>
					</div>
				</div>
			</div>
		</div>

	<div class="find-tablet deskpad">
		<div class="inner">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-4 nopad">
					<div class="content phone">
						<h3 class="title"><?php the_field('zones_title'); ?></h3>
						<div class="instructions">
							<img src="<?php the_field('zones_logo') ?>" alt="">
							<br><br>
							<?php the_field('zones_copy') ?>
						</div>
					</div>
				</div>

				<div class="col-xs-12 col-sm-12 col-md-4 nopad">
					<div class="content amazon">
						<h3 class="title"><?php the_field('amazon_title'); ?></h3>
						<div class="instructions">
							<img src="<?php the_field('amazon_logo'); ?>" alt="">
							<br><br>
							<?php the_field('amazon_copy'); ?>
						<a target="_blank" class="button" href="<?php the_field('button_link'); ?>"><?php the_field('button_copy'); ?></a>
						</div>
					</div>
				</div>

				<div class="col-xs-12 col-sm-12 col-md-4 nopad">
					<div class="content retailer">
						<h3 class="title"><?php the_field('retailer_title') ?></h3>
						<div class="instructions">
							<?php if( have_rows('retailer_logos') ): ?>

							    <?php while ( have_rows('retailer_logos') ) : the_row(); ?>
										<img src="<?php the_sub_field('logo'); ?>" alt=""><br>
							    <?php endwhile; ?>

							<?php else : ?>

							<?php endif; ?>
							<?php the_field('help_text'); ?>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
<!--[––––
			↓ INCENTIVES ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
	<div class="incentives">
		<div class="inner mxw-1000-center">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class="content">
						<h3 class="title"><?php the_field('pi_title'); ?></h3>
						<?php the_field('pi_copy'); ?>
						<a target="_blank" class="button" href="<?php the_field('pi_button_link');?>"><?php the_field('pi_button_copy'); ?></a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php endwhile; ?>
<?php endif ?>
<?php get_footer(); ?>
