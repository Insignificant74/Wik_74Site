cd /usr/share/nginx/html
git pull
mv -f Wik_74Site/nginx.conf /etc/nginx/nginx.conf
nginx -s reload
nginx -g 'daemon off;'