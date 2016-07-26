<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title(); ?></title>
    <!-- TODO: temporary fonts tag, replace with production assets -->
    <link rel="stylesheet" href="https://cloud.typography.com/7547052/7841152/css/fonts.css">

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
    <script type="text/javascript">
        wFORMS.behaviors.prefill.skip = false;
    </script>
    <script type="text/javascript" src="https://www.tfaforms.com/wForms/3.10/js/localization-en_US.js"></script>

    <?php wp_head(); ?>

  </head>
  <body <?php body_class(); ?>>
    <?php include_once('components/symbol-defs.php'); ?>
    <header class="site-header">

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



      <?php
      $headargs = array(
        'theme_location' => 'desktop-navigation',
        'container_id' => 'desktopmenu__ctnr'
      );
      wp_nav_menu( $headargs ); ?>

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
              <div class="col-sm-2">
              </div>
              <div class="menu__item col-sm-2">
                  <div class="box"><a href="/about-the-system">About <span class="make__break">The System</span></a></div>
              </div>
              <div class="menu__item col-sm-2">
                  <div class="box"><a href="/about-the-system">Optimal <span class="make__break">Seeding Rate</span></a></div>
              </div>
              <div class="menu__item col-sm-3">
                  <div class="box"><a href="/wheat-profitability-calculator">Wheat <span class="make__break">Profitability Calculator</span></a></div>
              </div>
              <div class="menu__contact-bar">
                  <span class="menu__find-seed">
                    <a href="/find-seed-supplier"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/menu__mappin-icon.png" alt="" />Find a Seed Supplier</a>
                  </span>
                  <span class="menu__contact-us">
                    <a href="mailto:email@example.com?Subject=Hello%20again"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/menu__mail-icon.png" alt="" />Contact Us</a>
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
    </header>
    <main>
