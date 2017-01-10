<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title(); ?></title>
    <link rel="stylesheet" href="https://cloud.typography.com/7547052/7841152/css/fonts.css">

    <!-- FACEBOOK OPEN GRAPH META -->
    <meta property="og:url" content="https://connectinsystem.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="ConnectIN™ Wheat Insight System" />
    <meta property="og:description" content="WestBred® wheat is dedicated to helping growers get the most out of every acre. That’s why we’re proud to offer the ConnectIN™ System to our seed suppliers. This system allows seed suppliers to provide Optimal Seeding Rate recommendations, based on a grower’s specific seed and fields, that help growers maximize their yield and profit potential." />
    <meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/site__logo.png" />

    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_stylesheet_directory_uri(); ?>/apple-touch-icon.png?v=2">
    <link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon-32x32.png?v=2" sizes="32x32">
    <link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon-16x16.png?v=2" sizes="16x16">
    <link rel="manifest" href="<?php echo get_stylesheet_directory_uri(); ?>/manifest.json?v=2">
    <link rel="mask-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/safari-pinned-tab.svg?v=2" color="#008198">
    <meta name="theme-color" content="#ffffff">

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="https://www.tfaforms.com/form-builder/4.3.0/css/wforms-layout.css" rel="stylesheet" type="text/css" />

    <!--[if IE 8]>
        <link href="https://www.tfaforms.com/form-builder/4.3.0/css/wforms-layout-ie8.css" rel="stylesheet" type="text/css" />
        <![endif]-->
    <!--[if IE 7]>
        <link href="https://www.tfaforms.com/form-builder/4.3.0/css/wforms-layout-ie7.css" rel="stylesheet" type="text/css" />
        <![endif]-->
    <!--[if IE 6]>
        <link href="https://www.tfaforms.com/form-builder/4.3.0/css/wforms-layout-ie6.css" rel="stylesheet" type="text/css" />
        <![endif]-->

    <link href="https://www.tfaforms.com/themes/get/17258" rel="stylesheet" type="text/css" />
    <link href="https://www.tfaforms.com/form-builder/4.3.0/css/wforms-jsonly.css" rel="alternate stylesheet" title="This stylesheet activated by javascript" type="text/css" />
    <script type="text/javascript" src="https://www.tfaforms.com/wForms/3.10/js/wforms.js"></script>
    <script type="text/javascript">wFORMS.behaviors.prefill.skip = false;</script>
    <script type="text/javascript" src="https://www.tfaforms.com/wForms/3.10/js/localization-en_US.js"></script>

    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>

    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-5826L9"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5826L9');</script>
    <!-- End Google Tag Manager -->

    <?php include_once('components/symbol-defs.php'); ?>
    <header class="site-header">

		<?php if (is_page_template('Hardware 2017' || 'How to Order 2017' || 'Training 2017')) { ?>
      <!-- <section id="mailbar" class="mailbar"></section> -->
			<nav id="menu" class="main-nav" role="navigation">
        <div id="menu-header" class="main-nav-header hardware-menu-header">
          <a href="/hardware">
						<!-- <svg class="icon icon-connectin"><use xlink:href="#icon-connectin"></use></svg> -->
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/hardware-logo-white.png" alt="">
					</a>
          <span id="menu-activate" class="main-nav-header-menu-button hardware-menu-activate">
            <svg class="icon"><use xlink:href="#icon-menu"></use></svg>
          </span>
        </div>
        <?php
        $headargs = array(
          'theme_location' => 'hardware-mobile-navigation',
          'container_id' => 'menu-header-menu-container'
        );
        wp_nav_menu( $headargs ); ?>
      </nav>
			<?php }else { ?>
				<section id="mailbar" class="mailbar">
					<!-- NOTE: mailbar code inserted here if no cookie -->
				</section>
				<nav id="menu" class="main-nav" role="navigation">
	        <div id="menu-header" class="main-nav-header">
	          <a href="/"><svg class="icon icon-connectin"><use xlink:href="#icon-connectin"></use></svg></a>
	          <span id="menu-activate" class="main-nav-header-menu-button">
	            <svg class="icon"><use xlink:href="#icon-menu"></use></svg>
	          </span>
	        </div>
	        <?php
	        $headargs = array(
	          'theme_location' => 'main-navigation',
	          'container_id' => 'menu-header-menu-container'
	        );
	        wp_nav_menu( $headargs ); ?>
	      </nav>
				<?php } ?>


			<?php if (is_page_template('Hardware 2017' || 'How to Order 2017' || 'Training 2017')) { ?>
				<div id="hardware-menu" class="menu__ctn">
	 				 <div class="menu__items-ctn row">
	 						 <div class="menu__item-logo col-sm-5">
	 								 <div class="menu__logo box">
	 										 <a href="/hardware">
													 <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/hardware-logo.png" alt="">
	 										 </a>
	 								 </div>
	 						 </div>
	 						 <div class="col-sm-7">
	 							 <div class="box">
	 								 <?php $headargs = array(
	 											 'theme_location' => 'hardware-navigation',
	 											 'container_id' => 'hardware-desktop-navigation'
	 											 );
	 											 wp_nav_menu( $headargs ); ?>
	 							 </div>
	 						 </div>


	 						 <div class="menu__contact-bar">
	 								 <span class="menu__find-seed">
	 									 <a href="/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/hardware__icon-home.png" alt="" />Connectin System Home</a>
	 								 </span>
	 								 <span class="menu__contact-us">
	 									 <a href="/contact-us"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/hardware/hardware__icon-email.png" alt="" />Contact Us</a>
	 								 </span>
	 						 </div>
	 				 </div>

	 		 </div>
			<?php }else { ?>

			<div class="menu__ctn">
 				 <div class="menu__items-ctn row">
 						 <div class="menu__item-logo col-sm-3">
 								 <div class="menu__logo box">
 										 <a href="/">
 												 <svg class="icon icon-connectin">
 														 <use xlink:href="#icon-connectin-color"></use>
 												 </svg>
 										 </a>
 								 </div>
 						 </div>
 						 <div class="col-sm-9">
 							 <div class="box">
 								 <?php $headargs = array(
 											 'theme_location' => 'desktop-navigation',
 											 'container_id' => 'desktopmenu__ctn'
 											 );
 											 wp_nav_menu( $headargs ); ?>
 							 </div>
 						 </div>


 						 <div class="menu__contact-bar">
 								 <span class="menu__find-seed">
 									 <a href="/find-seed-supplier"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/menu__mappin-icon.png" alt="" />Find a Seed Supplier</a>
 								 </span>
 								 <span class="menu__contact-us">
 									 <a href="/contact-us"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/menu__mail-icon.png" alt="" />Contact Us</a>
 								 </span>
 						 </div>
 				 </div>
 				 <div class="row">
 						 <div class="col-sm-12">
 								 <div class="box">
 								 </div>
 						 </div>
 				 </div>
 		 </div>
		<?php } ?>


    </header>
    <main>
