#!/bin/bash

# AI 学习平台 - 完整启动脚本
# 启动所有服务: Docker 依赖 + Nginx + React 前端 + Go 后端

set -e

echo "🚀 启动 AI 学习平台..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker 未安装,请先安装 Docker${NC}"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose 未安装,请先安装 Docker Compose${NC}"
    exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}📦 步骤 1: 启动 Docker 依赖服务 (PostgreSQL, Redis, MinIO, Nginx)${NC}"
docker compose -f docker-compose.dev.yml up -d

echo ""
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 5

# 检查服务状态
echo -e "${BLUE}🔍 检查服务状态...${NC}"
docker compose -f docker-compose.dev.yml ps

echo ""
echo -e "${GREEN}✅ Docker 服务启动成功!${NC}"
echo ""

# 检查是否需要运行数据库迁移
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
echo -e "${BLUE}⚛️  步骤 3: 启动 React 前端开发服务器${NC}"
echo -e "${YELLOW}提示: 前端将在新终端窗口中启动${NC}"

# 在新标签页/窗口中启动 React 前端
if command -v gnome-terminal &> /dev/null; then
    # GNOME Terminal (Ubuntu)
    gnome-terminal --tab --title="React Frontend" -- bash -c "cd $PROJECT_ROOT/web/react-app && npm run dev; exec bash"
elif command -v x-terminal-emulator &> /dev/null; then
    # 通用终端
    x-terminal-emulator -e "bash -c 'cd $PROJECT_ROOT/web/react-app && npm run dev; exec bash'"
elif command -v open &> /dev/null; then
    # macOS
    osascript -e 'tell application "Terminal" to do script "cd '"$PROJECT_ROOT"'/web/react-app && npm run dev"'
else
    echo -e "${YELLOW}⚠️  无法自动打开新窗口,请手动执行:${NC}"
    echo -e "${YELLOW}   cd $PROJECT_ROOT/web/react-app && npm run dev${NC}"
fi

echo ""
echo -e "${BLUE}🔧 步骤 4: 启动 Go 后端服务${NC}"
read -p "是否在后台启动 Go 后端? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v go &> /dev/null; then
        echo -e "${YELLOW}在后台启动后端...${NC}"
        nohup go run cmd/server/main.go > backend.log 2>&1 &
        echo $! > backend.pid
        echo -e "${GREEN}✅ 后端已启动 (PID: $(cat backend.pid))${NC}"
        echo -e "${YELLOW}查看日志: tail -f backend.log${NC}"
    else
        echo -e "${RED}⚠️  Go 未安装,无法启动后端${NC}"
    fi
else
    echo -e "${YELLOW}💡 稍后可以手动启动后端:${NC}"
    echo -e "${YELLOW}   go run cmd/server/main.go${NC}"
    echo -e "${YELLOW}   或: make dev${NC}"
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
echo -e "  ${GREEN}🗄️  PostgreSQL:${NC}     localhost:5432"
echo -e "  ${GREEN}🔴 Redis:${NC}           localhost:6379"
echo -e "  ${GREEN}📦 MinIO:${NC}           http://localhost:9000"
echo -e "  ${GREEN}📦 MinIO Console:${NC}   http://localhost:9001"
echo ""
echo -e "${BLUE}📝 常用命令:${NC}"
echo -e "  ${YELLOW}停止所有服务:${NC}   docker compose -f docker-compose.dev.yml down"
echo -e "  ${YELLOW}查看日志:${NC}       docker compose -f docker-compose.dev.yml logs -f"
echo -e "  ${YELLOW}重启 Nginx:${NC}     docker restart alp-nginx"
echo -e "  ${YELLOW}查看容器状态:${NC}   docker compose -f docker-compose.dev.yml ps"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo -e "  - Nginx 会自动将请求转发到前端和后端"
echo -e "  - 通过 http://localhost 即可访问完整应用"
echo -e "  - API 请求通过 /api/ 路径自动转发到后端"
echo -e "  - 前端修改后会自动热更新"
echo ""
