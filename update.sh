cd /usr/share/nginx/html/Wik_74Site
git pull
mv -f nginx.conf /etc/nginx/nginx.conf
service nginx restart
service php7.0-fpm restart
nginx -g 'daemon off;'