#!/bin/bash

# AI 学习平台 - 服务状态检查

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 AI 学习平台 - 服务状态检查${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 检查 React 前端
echo -e "${BLUE}⚛️  React 前端 (端口 5173):${NC}"
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PID=$(lsof -ti :5173)
    echo -e "  ${GREEN}✅ 运行中 (PID: $PID)${NC}"
    if [ -f frontend.pid ]; then
        echo -e "  ${YELLOW}PID 文件: $(cat frontend.pid)${NC}"
    fi
else
    echo -e "  ${RED}❌ 未运行${NC}"
fi
echo ""

# 检查 Go 后端
echo -e "${BLUE}🔧 Go 后端 (端口 8080):${NC}"
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PID=$(lsof -ti :8080)
    echo -e "  ${GREEN}✅ 运行中 (PID: $PID)${NC}"
    if [ -f backend.pid ]; then
        echo -e "  ${YELLOW}PID 文件: $(cat backend.pid)${NC}"
    fi
else
    echo -e "  ${RED}❌ 未运行${NC}"
fi
echo ""

# 检查 Nginx
echo -e "${BLUE}🌐 Nginx (Docker):${NC}"
if docker ps | grep -q alp-nginx; then
    echo -e "  ${GREEN}✅ 运行中${NC}"
    docker ps --filter name=alp-nginx --format "  容器 ID: {{.ID}}\n  状态: {{.Status}}\n  端口: {{.Ports}}"
else
    echo -e "  ${RED}❌ 未运行${NC}"
fi
echo ""

# 检查其他 Docker 服务
echo -e "${BLUE}📦 Docker 依赖服务:${NC}"
for service in postgres redis minio; do
    if docker ps | grep -q "alp-$service"; then
        echo -e "  ${GREEN}✅ $service${NC}"
    else
        echo -e "  ${RED}❌ $service${NC}"
    fi
done
echo ""

# 检查端口占用
echo -e "${BLUE}🔌 端口监听状态:${NC}"
echo -e "  ${YELLOW}80 (Nginx):${NC}"
sudo ss -tuln | grep ":80 " || echo -e "    ${RED}未监听${NC}"

echo -e "  ${YELLOW}5173 (前端):${NC}"
ss -tuln | grep ":5173 " || echo -e "    ${RED}未监听${NC}"

echo -e "  ${YELLOW}8080 (后端):${NC}"
ss -tuln | grep ":8080 " || echo -e "    ${RED}未监听${NC}"

echo -e "  ${YELLOW}5432 (PostgreSQL):${NC}"
sudo ss -tuln | grep ":5432 " || echo -e "    ${RED}未监听${NC}"

echo -e "  ${YELLOW}6379 (Redis):${NC}"
sudo ss -tuln | grep ":6379 " || echo -e "    ${RED}未监听${NC}"
echo ""

# 测试连通性
echo -e "${BLUE}🔗 连通性测试:${NC}"

echo -n "  前端 (5173): "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 2>/dev/null | grep -q "200"; then
    echo -e "${GREEN}✅ 正常${NC}"
else
    echo -e "${RED}❌ 无法访问${NC}"
fi

echo -n "  后端 (8080): "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health 2>/dev/null | grep -q "200"; then
    echo -e "${GREEN}✅ 正常${NC}"
else
    echo -e "${RED}❌ 无法访问${NC}"
fi

echo -n "  Nginx (80): "
if curl -s -o /dev/null -w "%{http_code}" http://localhost 2>/dev/null | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ 正常${NC}"
else
    echo -e "${RED}❌ 无法访问${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 提供操作建议
echo -e "${YELLOW}💡 操作建议:${NC}"
echo ""

if ! lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "  ${YELLOW}启动前端:${NC}"
    echo -e "    cd web/react-app && npm run dev"
    echo -e "    或: nohup bash -c 'cd web/react-app && npm run dev' > frontend.log 2>&1 &"
    echo ""
fi

if ! lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "  ${YELLOW}启动后端:${NC}"
    echo -e "    go run cmd/server/main.go"
    echo -e "    或: nohup go run cmd/server/main.go > backend.log 2>&1 &"
    echo ""
fi

if ! docker ps | grep -q alp-nginx; then
    echo -e "  ${YELLOW}启动 Docker 服务:${NC}"
    echo -e "    docker compose -f docker-compose.dev.yml up -d"
    echo ""
fi

echo -e "  ${YELLOW}一键启动所有服务:${NC}"
echo -e "    ./start-simple.sh"
echo ""
echo -e "  ${YELLOW}停止所有服务:${NC}"
echo -e "    ./stop-all.sh"
echo ""
