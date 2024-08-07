FROM nginx:latest

RUN apt update
RUN apt install -y git
RUN apt install -y php php-fpm

WORKDIR /usr/share/nginx/html
RUN git clone https://github.com/Insignificant74/Wik_74Site.git

CMD bash /usr/share/nginx/html/Wik_74Site/update.sh