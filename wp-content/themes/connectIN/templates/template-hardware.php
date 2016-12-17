<?php
/**
 * Template Name: Hardware 2017
 * @package WordPress
 */
 ?>


 <?php get_header(); ?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>


			<section class="intro">
				<div class="inner">
					<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-6">
								<div class="content">
									<h2 class="title">Why The System Is Necessary and Valuable</h2>
									<h3 class="subtitle">A Business Solution For A New Need</h3>
									<p class="copy">Differences in seed size and density can result in over- or underseeding, inhibiting a grower’s yield and profit potential. Instead, they recommend using customized seeding rates that account for these differences. With the new technology of the ConnectIN™ Wheat Insight System, you can help your customers purchase and plant seeds in a way that aligns with the new recommendations — and enjoy the many benefits it brings to your seed supply business. <br><br> <strong>Planting by the pound is no longer agronomists’ <br>recommended method.</strong>
									</p>

								</div>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-6">
								<div class="content">
									<iframe width="560" height="315" src="https://www.youtube.com/embed/6DBi41reeF0" frameborder="0" allowfullscreen></iframe>
								</div>
						</div>

						<div class="col-xs-12 col-sm-12">
							<div class="content">
								<p class="copy">Differences in seed size and density can result in over- or underseeding, inhibiting a grower’s yield and profit potential. Instead, they recommend using customized seeding rates that account for these differences. With the new technology of the ConnectIN™ Wheat Insight System, you can help your customers purchase and plant seeds in a way that aligns with the new recommendations — and enjoy the many benefits it 		brings to your seed supply business.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="callouts">
					<div class="row">
						<div class="col-xs-12 col-sm-6 nopad">
							<div class="content order">
								<h2>Order The System</h2>
								<p class="copy">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit eaque neque maiores obcaecati excepturi debitis inventore magni odio, animi similique, totam quod numquam, soluta voluptas, eius cumque doloremque. Facere, suscipit.</p>
								<a href="" class="button">Order The System</a>
							</div>
						</div>

						<div class="col-xs-12 col-sm-6 nopad">
							<div class="content training">
								<h2>Training Materials</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde blanditiis molestiae nulla perspiciatis impedit sint, amet magnam quam libero nesciunt dignissimos quisquam quas ipsam, quasi officia possimus veritatis consequatur eveniet!</p>
								<a href="" class="button">Using The System</a>
							</div>
						</div>
					</div>
			</section>

			<section class="benefits">
				<div class="lead">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-6">
							<div class="content">
								<h2 class="title">System Benefits</h2>
								<p class="copy">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, reiciendis veritatis dicta fugiat neque enim recusandae tempora asperiores omnis, culpa eos ex porro temporibus, odio quis, doloribus officiis nulla. Quisquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur eum vitae hic quam aperiam vel enim rem eligendi facilis fugit nulla animi, eius doloribus aspernatur error sunt, eveniet magnam nemo.</p>
							</div>
						</div>

						<div class="col-xs-12 col-sm-12 col-md-6">
							<div class="content">
								<iframe width="560" height="315" src="https://www.youtube.com/embed/6DBi41reeF0" frameborder="0" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>

				<div class="reasons">
					<div class="row">

						<div class="hide-image col-xs-12 col-sm-2">
							<div class="content list-image">
								<img class="bullet-image" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/list-truck.png" alt="">
							</div>
						</div>
						<div class="col-xs-12 col-sm-10 col-md-10">
							<div class="content">
								<ul class="list">
									<span class="title">Smarter Business Planning</span>
									<li>Forecast more accurately and make more informed decisions with the help of historical sales data.</li>
									<li>Follow seed from ordering to packaging, all the way to harvest. Get estimated arrival times, and provide yield estimates to your customers.</li>
								</ul>
							</div>
						</div>


						<div class="hide-image col-xs-12 col-sm-2">
							<div class="content list-image">
								<img class="bullet-image" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/list-forklift.png" alt="">
							</div>
						</div>
						<div class="col-xs-12 col-sm-10 col-md-10">
							<div class="content">
								<ul class="list">
									<span class="title">Better Inventory Management</span>
									<li>Transactional data adjusts inventory levels in real time.</li>
									<li>Know what inventory you have in stock at all times, and avoid overselling.</li>
									<li>Process returns with sales adjustments that update inventory.</li>
								</ul>
							</div>
						</div>


						<div class="hide-image col-xs-12 col-sm-2">
							<div class="content list-image">
								<img class="bullet-image" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/list-people.png" alt="">
							</div>
						</div>
						<div class="col-xs-12 col-sm-10 col-md-10">
							<div class="content">
								<ul class="list">
										<span class="title">Easier Reporting and Analytics</span>
										<li>Capture transactions and complete grower licenses automatically at the point of sale.</li>
										<li>Automate seed purity and germination labeling.</li>
										<li>View sales by customer, date and variety.</li>
										<li>No more period end duplication — just validate your sales and account for adjustments and returns.</li>
								</ul>
							</div>
						</div>


					</div>
				</div>
			</section>

		<?php endwhile; ?>
	<?php endif ?>
 <?php get_footer(); ?>
