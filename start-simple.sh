#!/bin/bash

# AI 学习平台 - 完整启动脚本 (简化版)
# 适用于 SSH/远程服务器环境

set -e

echo "🚀 启动 AI 学习平台..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker 未安装${NC}"
    exit 1
fi

echo -e "${BLUE}📦 步骤 1: 启动 Docker 依赖服务${NC}"
docker compose -f docker-compose.dev.yml up -d

echo ""
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 5

echo -e "${BLUE}🔍 检查服务状态...${NC}"
docker compose -f docker-compose.dev.yml ps

echo ""
echo -e "${GREEN}✅ Docker 服务启动成功!${NC}"
echo ""

# 数据库迁移
echo -e "${BLUE}📝 步骤 2: 运行数据库迁移${NC}"
read -p "是否运行数据库迁移? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v go &> /dev/null; then
        echo -e "${YELLOW}运行迁移...${NC}"
        go run cmd/migrate/main.go
        echo -e "${GREEN}✅ 数据库迁移完成${NC}"
    else
        echo -e "${RED}⚠️  Go 未安装,跳过迁移${NC}"
    fi
else
    echo -e "${YELLOW}⏭️  跳过数据库迁移${NC}"
fi

echo ""
echo -e "${BLUE}⚛️  步骤 3: 启动 React 前端开发服务器 (后台运行)${NC}"

# 检查前端是否已在运行
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  前端已在运行 (端口 5173)${NC}"
else
    echo -e "${YELLOW}在后台启动前端...${NC}"
    nohup bash -c "cd $PROJECT_ROOT/web/react-app && npm run dev" > frontend.log 2>&1 &
    echo $! > frontend.pid
    echo -e "${GREEN}✅ 前端已启动 (PID: $(cat frontend.pid))${NC}"
    echo -e "${YELLOW}查看日志: tail -f frontend.log${NC}"
    sleep 3
fi

echo ""
echo -e "${BLUE}🔧 步骤 4: 启动 Go 后端服务 (后台运行)${NC}"

# 检查后端是否已在运行
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  后端已在运行 (端口 8080)${NC}"
else
    if command -v go &> /dev/null; then
        echo -e "${YELLOW}在后台启动后端...${NC}"
        nohup go run cmd/server/main.go > backend.log 2>&1 &
        echo $! > backend.pid
        echo -e "${GREEN}✅ 后端已启动 (PID: $(cat backend.pid))${NC}"
        echo -e "${YELLOW}查看日志: tail -f backend.log${NC}"
    else
        echo -e "${RED}⚠️  Go 未安装,无法启动后端${NC}"
    fi
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 所有服务启动完成!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📍 访问地址:${NC}"
echo -e "  ${GREEN}🌐 Nginx (反向代理):${NC} http://localhost"
echo -e "  ${GREEN}⚛️  React 前端:${NC}      http://localhost:5173"
echo -e "  ${GREEN}🔧 Go 后端 API:${NC}     http://localhost:8080"
echo -e "  ${GREEN}📊 健康检查:${NC}       http://localhost/health"
echo ""
echo -e "${BLUE}📝 常用命令:${NC}"
echo -e "  ${YELLOW}停止所有服务:${NC}   ./stop-all.sh"
echo -e "  ${YELLOW}查看前端日志:${NC}   tail -f frontend.log"
echo -e "  ${YELLOW}查看后端日志:${NC}   tail -f backend.log"
echo -e "  ${YELLOW}查看 Nginx 日志:${NC} docker logs -f alp-nginx"
echo -e "  ${YELLOW}查看容器状态:${NC}   docker compose -f docker-compose.dev.yml ps"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo -e "  - 所有服务在后台运行"
echo -e "  - 使用 Ctrl+C 不会停止服务"
echo -e "  - 使用 ./stop-all.sh 停止所有服务"
echo ""
