#!/bin/bash

# Nginx 管理脚本

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

case "$1" in
    start)
        echo -e "${BLUE}🚀 启动 Nginx...${NC}"
        docker compose -f docker-compose.dev.yml up -d nginx
        echo -e "${GREEN}✅ Nginx 已启动${NC}"
        echo -e "${YELLOW}访问: http://localhost${NC}"
        ;;
    
    stop)
        echo -e "${BLUE}🛑 停止 Nginx...${NC}"
        docker compose -f docker-compose.dev.yml stop nginx
        echo -e "${GREEN}✅ Nginx 已停止${NC}"
        ;;
    
    restart)
        echo -e "${BLUE}🔄 重启 Nginx...${NC}"
        docker compose -f docker-compose.dev.yml restart nginx
        echo -e "${GREEN}✅ Nginx 已重启${NC}"
        ;;
    
    reload)
        echo -e "${BLUE}♻️  重载 Nginx 配置...${NC}"
        docker exec alp-nginx nginx -s reload
        echo -e "${GREEN}✅ Nginx 配置已重载${NC}"
        ;;
    
    status)
        echo -e "${BLUE}📊 Nginx 状态:${NC}"
        docker compose -f docker-compose.dev.yml ps nginx
        ;;
    
    logs)
        echo -e "${BLUE}📋 Nginx 日志:${NC}"
        docker compose -f docker-compose.dev.yml logs -f nginx
        ;;
    
    test-config)
        echo -e "${BLUE}🧪 测试 Nginx 配置...${NC}"
        docker run --rm -v $(pwd)/deployments/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx:alpine nginx -t
        ;;
    
    *)
        echo -e "${YELLOW}用法: $0 {start|stop|restart|reload|status|logs|test-config}${NC}"
        echo ""
        echo "命令说明:"
        echo "  start       - 启动 Nginx"
        echo "  stop        - 停止 Nginx"
        echo "  restart     - 重启 Nginx"
        echo "  reload      - 重载配置 (不中断服务)"
        echo "  status      - 查看状态"
        echo "  logs        - 查看日志"
        echo "  test-config - 测试配置文件"
        exit 1
        ;;
esac
