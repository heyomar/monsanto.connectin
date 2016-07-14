<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <!-- TODO: temporary fonts tag, replace with production assets -->
    <link rel="stylesheet" href="https://cloud.typography.com/7547052/7841152/css/fonts.css">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php include_once('components/symbol-defs.php'); ?>
    <header class="site-header">

      <section id="mailbar" class="mailbar">
        <!-- NOTE: mailbar code inserted here if no cookie -->
      </section>

      <section id="menu" class="main-nav">
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
      </section>

    </header>
