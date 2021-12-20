FROM nginx:mainline-alpine

COPY --chown=nginx:www-data ./build /usr/share/nginx/html
