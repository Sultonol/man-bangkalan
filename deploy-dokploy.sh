#!/bin/bash
# Dokploy Deployment Script for MAN Bangkalannpm

echo "🚀 Deploying MAN Bangkalannpm..."

# Configuration
APP_NAME="man-bangkalan-profile"
IMAGE="man-bangkalan:latest"
PORT=80

echo "📦 Building Docker image..."
docker build -t $IMAGE .

echo "🐳 Running container..."
docker stop $APP_NAME 2>/dev/null || true
docker rm $APP_NAME 2>/dev/null || true
docker run -d \
    --name $APP_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $IMAGE

echo "✅ Deployment complete!"
echo "🌐 App running on port $PORT"