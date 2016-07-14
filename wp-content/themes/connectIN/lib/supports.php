<?php
function connectin_init () {
  // http://codex.wordpress.org/Function_Reference/add_theme_support
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'automatic-feed-links' );
  add_theme_support( 'title-tag');
  add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'widgets' ) );

  // This call removes the pixel bump from the WP toolbar
  add_theme_support( 'admin-bar', array( 'callback' => '__return_false' ) );
}
add_action( 'after_setup_theme', 'connectin_init' );
