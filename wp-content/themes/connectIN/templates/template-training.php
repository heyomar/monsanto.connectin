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
							<h2 class="title"><?php the_field('hero_title'); ?></h2>
							<div class="copy"><?php the_field('hero_copy'); ?></div>
						</div>
					</div>
				</div>
			</div>
		</div>
<!--[––––
			↓ REPORTING ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
	<div class="beige">
		<div class="reporting">
			<div class="inner mxw-1000-center">
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<div class="content">
							<h2 class="title"><?php the_field('tr_title'); ?></h2>
							<div class="responsive-text-align"><?php the_field('tr_copy'); ?></div>
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
						<div id="slick-reporting" class="content">

						<?php if( have_rows('reporting_videos') ): ?>
							<?php while ( have_rows('reporting_videos') ) : the_row(); ?>

							<div class="block">
								<h4><?php the_sub_field('video_title') ?></h4>
								<a href="<?php
								$iframe = get_sub_field('video');
								preg_match('/src="(.+?)"/', $iframe, $matches);
								$src = $matches[1];
								echo $src;?>" data-lity> <div style="background-image:url('<?php echo get_sub_field('video_thumbnail'); ?>');" class="thumbnail"></div> </a>
							</div>

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
									<?php if( have_rows('reporting_videos') ): ?>
										<?php while ( have_rows('reporting_videos') ) : the_row(); ?>

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
								<iframe class="ReportingFrame TheFrame" width="560" height="315" src="<?php the_field('tr_starting_video'); ?>" frameborder="0" allowfullscreen></iframe>
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
						<h3 class="title">Transactional Reporting Guides</h3>
						<?php if( have_rows('transactional_reporting_guides') ): ?>

						    <?php while ( have_rows('transactional_reporting_guides') ) : the_row(); ?>
									<div class="action">
										<div class="mxw-600-center">
											<div class="row">
												<div class="col-xs-9 col-sm-9 nopad">
													<a target="_blank" href="<?php the_sub_field('file') ?>"><div class="download"><?php the_sub_field('file_name'); ?></div></a>
												</div>

												<div class="col-xs-3 col-sm-3 nopad">
													<div class="email">
														<div class="email-button">
															<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/icon-email.png" alt="">
															<span class="email-text">EMAIL</span></div>
													</div>

												</div>

												<div class="email-field" id="box-one">
													<form class="" action="/email.php" method="post">
														<input type="hidden" name="pdfURL" value="<?php the_sub_field('file') ?>">
														<label for="email-address">Email Address</label>
														<input type="text" name="email-address" value="">
														<input class="pdf-submit" type="submit" name="email-submit-button"
																	value="Submit"/>
													</form>
												</div>

											</div>
										</div>
									</div>

						    <?php endwhile; ?>

						<?php else : ?>

						<?php endif; ?>

					</div>
				</div>
			</div>
		</div>
</div>
<!--[––––
			↓ QUICK TRAINING TIPS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
		<div class="quick-training-tips">
			<div class="inner mxw-1000-center">
						<div class="content">
							<h2 class="title">Quick Training Tips</h2>
							<div class="responsive-text-align"><?php the_field('qtt_copy'); ?></div>
						</div>
			</div>
		</div>

		<!--[––––
					↓ QUICK TIP - MOBILE VIDEO PLAYER ↓
		–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
				<div class="carousel">
					<div class="inner nopad">
						<div class="row">
							<div class="col-xs-12">
								<div id="slick-training" class="content">

								<?php if( have_rows('quick_tip_videos') ): ?>
									<?php while ( have_rows('quick_tip_videos') ) : the_row(); ?>

									<div class="block">
										<h4><?php the_sub_field('video_title') ?></h4>
										<a href="<?php
										$iframe = get_sub_field('video');
										preg_match('/src="(.+?)"/', $iframe, $matches);
										$src = $matches[1];
										echo $src;?>" data-lity> <div style="background-image:url('<?php echo get_sub_field('video_thumbnail'); ?>');" class="thumbnail"></div> </a>
									</div>

									<?php endwhile; ?>
								<?php endif; ?>

								</div>
							</div>
						</div>
					</div>
				</div>
		<!--[––––
					↓ QUICK TIP - DESKTOP VIDEO PLAYER ↓
		–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
				<div class="player">
					<div class="inner">
						<div class="row">
							<div class="col-xs-12 col-sm-4 col-md-4 nopad">
								<div class="content">
									<div class="videos">
										<ul class="list">
											<?php if( have_rows('quick_tip_videos') ): ?>
												<?php while ( have_rows('quick_tip_videos') ) : the_row(); ?>

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
										<iframe class="QuickTipsFrame TheFrame" width="560" height="315" src=<?php the_field('qt_starting_video'); ?> frameborder="0" allowfullscreen></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

<!--[––––
			↓ DOWNLOAD TRAINING MANUALS ↓
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//]-->
	<div class="download-manuals">
		<div class="inner mxw-1000-center">
			<div class="row">
				<div class="col-xs-12">
					<div class="content">
						<h2 class="title">Download the Full Training Manual</h2>
						<div class="responsive-text-align"><?php the_field('ftm_copy'); ?></div><br>
						<?php if( have_rows('full_training_manual') ): ?>

						    <?php while ( have_rows('full_training_manual') ) : the_row(); ?>
									<div class="action">
										<div class="mxw-600-center">
											<div class="row">
												<div class="col-xs-9 col-sm-9 nopad">
													<a target="_blank" href="<?php the_sub_field('file') ?>">
														<div class="download-ctn">
															<div class="download"><?php the_sub_field('file_name'); ?></div>
														</div>
													</a>
												</div>

												<div class="col-xs-3 col-sm-3 nopad">
													<div class="email">
														<div class="email-button">
															<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/icon-email.png" alt="">
															<span class="email-text">EMAIL</span></div>
													</div>

												</div>
												<div class="email-field" id="box-one">
													<form class="pdf-mini-form" action="/email.php" method="post">
														<input type="hidden" name="pdfURL" value="<?php the_sub_field('file') ?>">
														<label for="email-address">Email Address</label>
														<input class="email-address-field" type="text" name="email-address">
														<input class="pdf-submit" type="submit" name="email-submit-button"
																	value="Submit"/>
														<div class="pdf-email-error">Please enter a valid email address.</div>
													</form>
														<div class="mini-thanks">Your PDF has been sent! Thank You!</div>
												</div>
											</div>
										</div>
									</div>

						    <?php endwhile; ?>

						<?php else : ?>

						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php endwhile; ?>
<?php endif ?>
<?php get_footer(); ?>
