FROM nginx:stable-alpine
COPY default.conf /etc/nginx/sites-enabled/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
