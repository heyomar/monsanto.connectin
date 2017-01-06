<?php
function offset_menu_init () {
  register_nav_menus( array(
    'main-navigation' => 'Main Navigation',
    'footer-navigation' => 'Footer Navigation',
    'desktop-navigation' => 'Desktop Navigation',
		'hardware-navigation' => 'Hardware Navigation',
		'hardware-footer-navigation' => 'Hardware Footer Navigation',
		'hardware-mobile-navigation' => 'Hardware Mobile Navigation'
  ) );
}
add_action( 'init', 'offset_menu_init' );
