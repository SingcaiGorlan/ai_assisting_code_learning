#!/bin/bash

# AI 学习平台 - 停止所有服务

set -e

echo "🛑 停止 AI 学习平台所有服务..."
echo ""

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 停止前端进程
if [ -f frontend.pid ]; then
    echo -e "${BLUE}⚛️  停止 React 前端服务...${NC}"
    kill $(cat frontend.pid) 2>/dev/null || true
    rm -f frontend.pid
    echo -e "${GREEN}✅ 前端已停止${NC}"
fi

# 停止后端进程
if [ -f backend.pid ]; then
    echo -e "${BLUE}🔧 停止 Go 后端服务...${NC}"
    kill $(cat backend.pid) 2>/dev/null || true
    rm -f backend.pid
    echo -e "${GREEN}✅ 后端已停止${NC}"
fi

# 停止 Docker 容器
echo -e "${BLUE}📦 停止 Docker 服务...${NC}"
docker compose -f docker-compose.dev.yml down

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 所有服务已停止${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo -e "  - 数据卷已保留,下次启动数据不会丢失"
echo -e "  - 如需完全清理,使用: docker compose -f docker-compose.dev.yml down -v"
echo ""
