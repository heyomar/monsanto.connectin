<?php
function offset_load_assets () {
  // TODO: refers to dev stylesheet, rename reference to .min.css for production
  wp_enqueue_style( 'master', get_stylesheet_directory_uri() . '/bundle.css', array(), 'v5' );
}
add_action( 'wp_enqueue_scripts', 'offset_load_assets' );
