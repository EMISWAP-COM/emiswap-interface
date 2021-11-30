FROM nginx:mainline-alpine

COPY --chown=nginx:www-data ./build /usr/share/nginx/html
#COPY --chown=nginx:www-data ./build/static /usr/share/nginx/html/add/static
#COPY --chown=nginx:www-data ./build/static /usr/share/nginx/html/add/0x0000000000000000000000000000000000000000/static
COPY --chown=root:root default.conf /etc/nginx/conf.d/default.conf
