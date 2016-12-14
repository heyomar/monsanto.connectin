# -*- mode: ruby -*-
# vi: set ft=ruby :

# configure me
localip = "192.168.33.85"
dbname = "scotchbox"
dbpass = "root"
dbuser = "root"
dbhost = "localhost"
siteurl = "connectin.dev"
sitetitle = "ConnectIN Wheat Insight System"
siteuser = "siteadmin"
sitepass = "FJledNLKAk10Mb7PKA"
siteemail = "pgraham@hlkagency.com"

# build script
$script = <<SCRIPT
sudo wp cli update --yes --allow-root
cd /var/www/public
wp core download
wp core config --dbname=$DBNAME --dbpass=$DBPASS --dbuser=$DBUSER --dbhost=$DBHOST
wp core install --url=$SITEURL --title="$SITETITLE" --admin_user=$SITEUSER --admin_password=$SITEPASS --admin_email=$SITEEMAIL
wp plugin install custom-post-type-ui debug-objects disable-comments disable-emojis enable-media-replace force-regenerate-thumbnails log-deprecated-notices ninja-forms query-monitor redirection simple-page-ordering theme-check white-label-cms wordpress-seo yoast-seo-acf-analysis
wp plugin activate custom-post-type-ui debug-objects disable-comments disable-emojis enable-media-replace force-regenerate-thumbnails log-deprecated-notices ninja-forms query-monitor redirection simple-page-ordering theme-check white-label-cms wordpress-seo yoast-seo-acf-analysis advanced-custom-fields-pro enhanced-media-library-pro wp-migrate-db-pro wp-migrate-db-pro-cli wp-migrate-db-pro-media-files
wp plugin delete hello.php akismet
wp theme delete twentyfourteen twentyfifteen twentysixteen
SCRIPT

# vagrant setup
Vagrant.configure("2") do |config|
  config.vm.box = "scotch/box"
  config.vm.network :private_network, id: "wp_primary", ip: localip
  config.vm.hostname = siteurl
  config.vm.synced_folder ".", "/var/www/public", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
  config.vm.provider :virtualbox do |v|
    v.customize ["modifyvm", :id, "--memory", 1024]
    v.customize ["modifyvm", :id, "--cpus", 1]
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]

    # Set the box name in VirtualBox to match the working directory.
    vvv_pwd = Dir.pwd
    v.name = File.basename(vvv_pwd)
  end

  config.ssh.forward_agent = true

  config.vm.provision "shell", inline: $script, privileged: false, env: {
    "DBNAME" => dbname,
    "DBPASS" => dbpass,
    "DBUSER" => dbuser,
    "DBHOST" => dbhost,
    "SITEURL" => siteurl,
    "SITETITLE" => sitetitle,
    "SITEUSER" => siteuser,
    "SITEPASS" => sitepass,
    "SITEEMAIL" => siteemail
  }

  # if defined? VagrantPlugins::Triggers
  #   config.trigger.before :halt, :stdout => true do
  #     run "vagrant ssh -c '/var/www/public/db_backup.sh'"
  #   end
  #   config.trigger.before :suspend, :stdout => true do
  #     run "vagrant ssh -c '/var/www/public/db_backup.sh'"
  #   end
  #   config.trigger.before :destroy, :stdout => true do
  #     run "vagrant ssh -c '/var/www/public/db_backup.sh'"
  #   end
  # end

end
