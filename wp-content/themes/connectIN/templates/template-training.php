<?php
/**
 * Template Name: Training 2017
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
							<h2 class="title">How To Use The Conenctin<br>Wheat Insight System</h2>
							<p class="copy">Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Facilis eaque, nisi at quibusdam. Obcaecati voluptas quo,
							eligendi inventore! Fugit magni vel facilis molestias illum at
							quam necessitatibus quibusdam nemo impedit.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ REPORTING ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="reporting">
			<div class="inner mxw-1000-center">
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<div class="content">
							<h3 class="title">Transactional Reporting</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed unde officiis aliquam vel debitis quos minima animi labore praesentium, enim, minus, commodi voluptatum ratione neque dignissimos tenetur fuga autem? Nulla?</p>
						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ MOBILE VIDEO PLAYER ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="carousel">
			<div class="inner nopad">
				<div class="row">
					<div class="col-xs-12">
						<div id="slicktest" class="content">

						<?php if( have_rows('videos') ): ?>
							<?php while ( have_rows('videos') ) : the_row(); ?>

							<div class="block"><?php the_sub_field('video'); ?></div>

							<?php endwhile; ?>
						<?php endif; ?>

						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ DESKTOP VIDEO PLAYER ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="player">
			<div class="inner">
				<div class="row">
					<div class="col-xs-12 col-sm-4 col-md-4 nopad">
						<div class="content">
							<div class="videos">
								<ul class="list">
									<?php if( have_rows('videos') ): ?>
										<?php while ( have_rows('videos') ) : the_row(); ?>

											<?php
											$iframe = get_sub_field('video');
											preg_match('/src="(.+?)"/', $iframe, $matches);
											$src = $matches[1];

											echo '<li data-video="' . $src . '" class="item">' . get_sub_field('video_title') . '</li>';
											?>

										<?php endwhile; ?>
									<?php endif; ?>
								</ul>
							</div>
						</div>
					</div>

					<div class="col-xs-12 col-sm-8 col-md-8 nopad">
						<div class="content">
							<div class="video">
								<iframe id="frame" width="560" height="315" src="https://www.youtube.com/embed/6DBi41reeF0" frameborder="0" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="reporting-guides">
			<div class="inner">
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<h3 class="title">Transactionl Reporting Guides</h3>
						THIS IS WHERE THE GUIDE FORMS WILL GO
					</div>
				</div>
			</div>
		</div>

	<?php endwhile; ?>
<?php endif ?>
<?php get_footer(); ?>
