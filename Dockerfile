FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="MAN Bangkalan"
LABEL org.opencontainers.image.description="Website profil MAN Bangkalan"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY pages/404.html /usr/share/nginx/html/404.html
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
