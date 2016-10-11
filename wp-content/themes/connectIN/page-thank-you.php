<?php
get_header();
get_template_part('components/inner-hero');?>
<script type="text/javascript">
if(window.location.href === "https://connectinsystem.com/thank-you/") {
    document.cookie = 'subscribed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/'
}
</script>
<div class="seed-supplier-cta">
  <p><strong>In the meantime, find a seed supplier or<br>WestBred representative near you.</strong></p>
  <p>
    <a target="_blank" class="button" href="http://connectinsystem.com/find-seed-supplier/">Find a Seed Supplier</a>
  </p>
</div>
<?php get_footer();?>
