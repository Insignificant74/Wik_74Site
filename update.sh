cd /usr/share/nginx/html/Wik_74Site
git pull
mv -f nginx.conf /etc/nginx/nginx.conf
nginx -s reload
nginx -g 'daemon off;'