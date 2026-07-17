# Build stage - untuk development/build di Dokploy
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files  
COPY . .

# Build (untuk project lain, tambahkan perintah build di sini)
# Untuk static site, ini hanya memastikan file siap
RUN ls -la

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy all files to nginx html folder
COPY . /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Nginx serve
CMD ["nginx", "-g", "daemon off;"]