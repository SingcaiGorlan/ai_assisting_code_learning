.PHONY: help setup dev build test clean lint docker-up docker-down

# 默认目标
help:
	@echo "可用命令:"
	@echo "  make setup    初始化开发环境"
	@echo "  make dev      启动开发服务器"
	@echo "  make build    编译项目"
	@echo "  make test     运行测试"
	@echo "  make lint     代码检查"
	@echo "  make clean    清理构建文件"
	@echo "  make docker-up   启动Docker服务"
	@echo "  make docker-down 停止Docker服务"

# 初始化开发环境
setup:
	@echo "安装Go依赖..."
	go mod download
	@echo "安装开发工具..."
	go install github.com/cosmtrek/air@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/swaggo/swag/cmd/swag@latest
	@echo "创建配置文件..."
	cp .env.example .env.local
	cp configs/config.yaml configs/config.local.yaml || echo "配置文件已存在"
	@echo "✅ 初始化完成！请编辑 .env.local 和 config.local.yaml"

# 开发服务器
dev:
	@echo "启动开发服务器..."
	air -c .air.toml

# 编译
build:
	@echo "编译后端..."
	go build -o bin/server ./cmd/server
	@echo "编译前端..."
	cd web && npm run build

# 运行测试
test:
	@echo "运行测试..."
	go test ./... -v -cover

# 代码检查
lint:
	@echo "运行代码检查..."
	golangci-lint run ./...

# 清理
clean:
	@echo "清理构建文件..."
	if exist bin rmdir /s /q bin
	if exist tmp rmdir /s /q tmp
	if exist coverage.out del /q coverage.out

# 启动Docker服务
docker-up:
	@echo "启动Docker服务..."
	docker-compose -f docker-compose.dev.yml up -d

# 停止Docker服务
docker-down:
	@echo "停止Docker服务..."
	docker-compose -f docker-compose.dev.yml down

# 数据库迁移
migrate:
	@echo "运行数据库迁移..."
	go run cmd/migrate/main.go

# 生成API文档
swag:
	@echo "生成Swagger文档..."
	swag init -g internal/app/handler/router.go -o docs/api