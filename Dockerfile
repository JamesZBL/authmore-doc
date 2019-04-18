FROM nginx

WORKDIR /usr/src/app/

COPY ./docs  /usr/share/nginx/html/
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]