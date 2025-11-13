FROM nginx:1.14.2
COPY ./site/ /var/www/html/
COPY ./nginx.conf /etc/nginx/nginx.conf