<footer class="site-footer">

  <?php
  $footargs = array(
    'theme_location' => 'footer-navigation'
  );
  wp_nav_menu( $footargs ); ?>

  <div class="footer-logos">
    <svg class="icon icon-westbred"><use xlink:href="#icon-westbred"></use></svg>
    <span class="seperator"></span>
    <svg class="icon icon-monsanto"><use xlink:href="#icon-monsanto"></use></svg>
  </div>

  <div class="disclaimers">
    <strong>©2004-16 Monsanto Invest B.V. – All rights reserved.</strong>
    <p>This information is for educational purposes only and is not an offer to sell Roundup Xtend™ with VaporGrip™ Technology, XtendiMax™ with VaporGrip™ Technology, SmartStax® PRO, Trecepta™. These products are not yet registered or approved for sale or use anywhere in the United States.</p>
    <p>Commercialization is dependent on multiple factors, including successful conclusion of the regulatory process. The information presented herein is provided for educational purposes only, and is not and shall not be construed as an offer to sell, or a recommendation to use, any unregistered pesticide for any purpose whatsoever. It is a violation of federal law to promote or offer to sell an unregistered pesticide.</p>
    <p>At this time, Vistive® Gold soybeans have received full approval for planting in the United States but have not yet received import approval in certain export markets. While certain export approvals are pending, Vistive® Gold soybeans will be available in limited geographies only to growers who have signed a 2016 Vistive Gold Soybean Grain Production Grower Agreement and agree to follow the stewardship requirements. Upon receipt of appropriate approvals, Monsanto will inform growers and determine whether the stewardship requirements will need to remain in place.</p>
  </div>

</footer>
</body>

<script src="<?php echo get_stylesheet_directory_uri(); ?>/scripts/vendor/jquery.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/bundle.es5.js" charset="utf-8" defer></script>
<?php wp_footer(); ?>

</html>
