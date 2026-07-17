#!/usr/bin/env sh
set -eu

# Local Docker deployment helper. Dokploy builds the Dockerfile directly.

echo "🚀 Deploying MAN Bangkalan..."

# Configuration
APP_NAME="man-bangkalan-profile"
IMAGE="man-bangkalan:latest"
PORT="${APP_PORT:-8080}"

echo "📦 Building Docker image..."
docker build -t "$IMAGE" .

echo "🐳 Running container..."
docker stop "$APP_NAME" 2>/dev/null || true
docker rm "$APP_NAME" 2>/dev/null || true
docker run -d \
    --name "$APP_NAME" \
    -p "$PORT:80" \
    --restart unless-stopped \
    "$IMAGE"

echo "✅ Deployment complete!"
echo "🌐 App running on port $PORT"
