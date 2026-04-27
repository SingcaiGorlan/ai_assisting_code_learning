.PHONY: install dev build clean help

# 默认目标
.DEFAULT_GOAL := help

# 颜色定义
BLUE := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
NC := \033[0m

## 安装依赖
install:
	@echo "$(YELLOW)安装 Wails CLI...$(NC)"
	@go install github.com/wailsapp/wails/v2/cmd/wails@latest
	@echo "$(YELLOW)安装前端依赖...$(NC)"
	@cd frontend && npm install
	@echo "$(GREEN)✓ 安装完成!$(NC)"

## 启动开发模式
dev:
	@echo "$(YELLOW)启动开发模式...$(NC)"
	@wails dev

## 构建生产版本
build:
	@echo "$(YELLOW)构建应用...$(NC)"
	@wails build
	@echo "$(GREEN)✓ 构建完成! 输出目录: build/bin/$(NC)"

## 清理构建产物
clean:
	@echo "$(YELLOW)清理构建产物...$(NC)"
	@rm -rf build/
	@rm -rf frontend/dist/
	@echo "$(GREEN)✓ 清理完成!$(NC)"

## 查看帮助
help:
	@echo "$(BLUE)AI 辅助代码学习平台 - Wails 桌面应用$(NC)"
	@echo ""
	@echo "$(YELLOW)可用命令:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
