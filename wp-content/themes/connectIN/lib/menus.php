<?php
function offset_menu_init () {
  register_nav_menus( array(
    'main-navigation' => 'Main Navigation',
    'footer-navigation' => 'Footer Navigation',
    'desktop-navigation' => 'Desktop Navigation'
  ) );
}
add_action( 'init', 'offset_menu_init' );
