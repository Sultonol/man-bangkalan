FROM nginx:alpine

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy application files
COPY index.html /usr/share/nginx/html/
COPY pages/404.html /usr/share/nginx/html/404.html
COPY assets/ /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]