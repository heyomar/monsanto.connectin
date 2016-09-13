    </main>
    <footer class="site-footer">

  <div class="make__wide">    <?php
      $footargs = array(
        'theme_location' => 'footer-navigation'
      );
      wp_nav_menu( $footargs ); ?>

      <div class="footer-logos">
        <a target="_blank" href="http://www.westbred.com"><svg class="icon icon-westbred"><use xlink:href="#icon-westbred"></use></svg></a>
        <span class="seperator"></span>
        <a target="_blank" href="http://www.monsanto.com"><svg class="icon icon-monsanto"><use xlink:href="#icon-monsanto"></use></svg></a>
      </div>

      <div class="disclaimers">
        <strong>Monsanto and Vine Design&reg;,WestBred and Design&reg; and ConnectIN&trade; are registered trademarks of Monsanto Technology LLC. &copy;2016 Monsanto Company.</strong>
      </div></div>

    </footer>
  </body>

  <script src="<?php echo get_stylesheet_directory_uri(); ?>/scripts/vendor/jquery.min.js"></script>
  <script src="<?php echo get_stylesheet_directory_uri(); ?>/scripts/vendor/parsley.js"></script>
  <script type="text/javascript">
  $('#seed_calc_form').parsley();
</script>
  <?php if (is_page('wheat-profitability-calculator') ) {
    echo "<script src='" . get_stylesheet_directory_uri() . "/scripts/vendor/Chart.min.js' charset='utf-8'></script>";
  } ?>
  <script src="<?php echo get_stylesheet_directory_uri(); ?>/bundle.es5.js" charset="utf-8" defer></script>
  <?php wp_footer(); ?>

</html>
