<?php
/**
 * Template Name: How to Order 2017
 * @package WordPress
 */
 ?>


 <?php get_header(); ?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div class="hero">
			<div class="inner">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div class="content">
							<h2 class="title">How To Order The Conenctin System</h2>
							<p class="copy">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis eaque, nisi at quibusdam. Obcaecati voluptas quo, eligendi inventore! Fugit magni vel facilis molestias illum at quam necessitatibus quibusdam nemo impedit.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="step-one">
			<div class="inner">
				<div class="content">
					<span class="title">Purchase the ConnectIN Seed Counter Directly</span>
					<p class="copy">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, aperiam ab ipsam, porro dolorum dolor nisi a suscipit molestias fugit consequuntur architecto pariatur maiores voluptates</p>
				</div>
			</div>
		</div>


	<?php endwhile; ?>
<?php endif ?>
<?php get_footer(); ?>
