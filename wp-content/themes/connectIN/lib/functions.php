<?php
/**
 * Conditional function to tell if a page is or is a child of a particular ID
 *
 * @since 0.7.0
 */
function is_tree ($pid) {
  global $post;
  if ( is_page() && ($post->post_parent==$pid || is_page($pid)) )
    return true;
  else
    return false;
}
?>
