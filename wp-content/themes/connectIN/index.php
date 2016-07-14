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

      <section class="mailbar">
        <div class="mailbar-header">
          Sign up for email updates
          <svg class="icon down"><use xlink:href="#icon-down"></use></svg>
          <span class="dismiss">
            <svg class="icon"><use xlink:href="#icon-circle-cross"></use></svg>
          </span>
        </div>
        <div class="mailbar-body">
          <!-- form  -->
        </div>
      </section>

      <section class="main-nav">
        <div class="main-nav-header">
          <svg class="icon icon-connectin"><use xlink:href="#icon-connectin"></use></svg>
          <span class="main-nav-header-menu-button">
            <svg class="icon"><use xlink:href="#icon-menu"></use></svg>
          </span>
        </div>
        <?php
        $headargs = array(
          'theme_location' => 'main-navigation'
        );
        wp_nav_menu( $headargs ); ?>
      </section>

    </header>

    <!-- THE MEAT -->

    <footer class="site-footer">

      <?php
      $footargs = array(
        'theme_location' => 'footer-navigation'
      );
      wp_nav_menu( $footargs ); ?>

    </footer>
  </body>

  <?php wp_footer(); ?>

</html>
