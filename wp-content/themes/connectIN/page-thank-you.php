<?php
get_header();
get_template_part('components/inner-hero');?>
<script type="text/javascript">
if(window.location.href === "http://<?php echo $WP_SITEURL; ?>/thank-you/") {
    document.cookie = 'subscribed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    alert("Cookie Set!")
}
</script>
<div class="seed-supplier-cta">
  <p><strong>In the meantime, find a seed supplier or<br>WestBred representative near you.</strong></p>
  <p>
    <a target="_blank" class="button" href="http://www.westbred.com/associates/pages/locateassociates.aspx">Find a Seed Supplier</a>
  </p>
</div>
<?php get_footer();?>
