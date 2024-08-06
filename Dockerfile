FROM nginx:latest

RUN apt update
RUN apt install -y git

WORKDIR /usr/share/nginx/html
RUN git clone https://github.com/Insignificant74/Wik_74Site.git

CMD bash Wik_74Site/update.sh