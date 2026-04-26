#!/bin/bash
# 部署脚本

set -e

echo "🚀 开始部署..."

# 1. 构建前端
echo "📦 构建前端..."
cd web && npm run build && cd ..

# 2. 构建后端
echo "📦 构建后端..."
env GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o bin/server ./cmd/server

# 3. 启动服务
echo "🚀 启动服务..."
docker compose -f deployments/docker-compose.prod.yml up -d --build

echo "✅ 部署完成！"
echo "访问: http://localhost"
