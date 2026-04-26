# 项目结构说明

本文档详细说明 AI 辅助代码学习平台的项目文件组织结构。

## 📁 目录概览

```
ai_assisting_code_learning/
├── cmd/                      # 应用程序入口点
│   ├── server/              # HTTP 服务器启动入口
│   └── migrate/             # 数据库迁移工具入口
├── internal/                # 私有业务代码（不可被外部导入）
│   ├── app/                 # 应用组装层
│   │   ├── handler/         # HTTP 处理器和路由
│   │   ├── middleware/      # Gin 中间件
│   │   ├── validator/       # 请求参数验证
│   │   └── app.go           # 应用初始化逻辑
│   ├── biz/                 # 业务逻辑层
│   ├── data/                # 数据访问层
│   └── pkg/                 # 内部公共包
│       ├── config/          # 配置加载
│       └── logger/          # 日志封装
├── web/                     # 前端项目集合
│   ├── admin/               # 管理后台 (Vue + TypeScript)
│   ├── app/                 # 主应用 (Vite + TypeScript)
│   ├── react-app/           # React 示例应用
│   ├── docs/                # VitePress 文档站点
│   └── public/              # 公共静态资源
├── deployments/             # 部署相关配置
│   ├── nginx/               # Nginx 配置
│   ├── postgres/            # PostgreSQL 初始化脚本
│   └── docker-compose.prod.yml  # 生产环境 Docker Compose
├── configs/                 # 应用配置文件
│   ├── config.yaml          # 默认配置
│   └── config.local.yaml    # 本地开发配置
├── scripts/                 # 自动化脚本
│   ├── *.ps1                # PowerShell 脚本 (Windows)
│   └── deploy.sh            # Shell 脚本 (Linux/macOS)
├── docs/                    # 项目开发技术文档
├── logs/                    # 应用日志目录（已忽略）
├── tmp/                     # 临时文件和编译产物（已忽略）
├── .github/                 # GitHub 配置
├── Dockerfile               # Docker 构建文件
├── docker-compose.yml       # 开发环境 Docker Compose
├── docker-compose.dev.yml   # 开发环境 Docker Compose（备选）
├── Makefile                 # Make 命令定义
├── .env.example             # 环境变量模板
└── README.md                # 项目说明文档
```

## 📂 核心目录详解

### 1. `cmd/` - 应用入口

包含所有可执行程序的入口文件：

- **`cmd/server/main.go`**: HTTP 服务器主程序，负责启动 Web 服务
- **`cmd/migrate/main.go`**: 数据库迁移工具，用于初始化和更新数据库结构

### 2. `internal/` - 后端核心代码

遵循 Go 标准项目布局，采用分层架构：

#### `internal/app/` - 应用层
- **`handler/`**: 处理 HTTP 请求，定义 API 路由
- **`middleware/`**: 认证、日志、CORS 等中间件
- **`validator/`**: 请求参数验证逻辑
- **`app.go`**: 依赖注入和应用初始化

#### `internal/biz/` - 业务逻辑层
包含核心业务逻辑，不依赖具体的传输协议（HTTP/gRPC）

#### `internal/data/` - 数据访问层
负责与数据库、缓存、对象存储等数据源交互

#### `internal/pkg/` - 公共工具包
- **`config/`**: 基于 Viper 的配置管理
- **`logger/`**: 基于 Zap 的日志封装

### 3. `web/` - 前端项目集合

采用多应用架构，每个子应用独立管理：

#### `web/admin/` - 管理后台
- **技术栈**: Vue 3 + Vite + TypeScript
- **功能**: 用户管理、课程管理、数据统计
- **启动**: `cd web/admin && npm run dev`

#### `web/app/` - 主应用
- **技术栈**: Vite + TypeScript
- **功能**: 学生学习界面、课程浏览、AI 对话
- **启动**: `cd web/app && npm run dev`

#### `web/react-app/` - React 示例
- **技术栈**: React + Tailwind CSS + Vite
- **功能**: 展示 React 技术栈的实现示例
- **启动**: `cd web/react-app && npm run dev`

#### `web/docs/` - 用户文档
- **技术栈**: VitePress
- **功能**: 用户使用指南、API 文档
- **启动**: `cd web/docs && npm run dev`

### 4. `deployments/` - 部署配置

集中管理所有部署相关的配置文件：

- **`nginx/`**: Nginx 反向代理配置
- **`postgres/`**: 数据库初始化 SQL 脚本
- **`docker-compose.prod.yml`**: 生产环境容器编排

### 5. `configs/` - 应用配置

YAML 格式的配置文件：

- **`config.yaml`**: 默认配置模板
- **`config.local.yaml`**: 本地开发覆盖配置

### 6. `scripts/` - 自动化脚本

提供便捷的初始化和运维脚本：

#### PowerShell 脚本（Windows）
- `setup.ps1`: 项目初始化
- `build.ps1`: 构建项目
- `start-all.ps1`: 启动所有服务
- `manage-docker.ps1`: Docker 管理
- `init-local-db.ps1`: 本地数据库初始化

#### Shell 脚本（Linux/macOS）
- `deploy.sh`: 部署脚本

### 7. `docs/` - 技术文档

项目开发相关的技术文档：

- `CODE_REVIEW_GUIDE.md`: 代码审查指南
- `CONTRIBUTION_GUIDE.md`: 贡献指南
- `SETUP_CHECKLIST.md`: 设置检查清单
- `TROUBLESHOOTING.md`: 故障排查
- `LOCAL_DB_SETUP.md`: 本地数据库设置
- `WSL_DOCKER_SETUP.md`: WSL Docker 设置
- `PODMAN.md`: Podman 使用指南
- `MIGRATION_GUIDE.md`: 迁移指南

### 8. 根目录重要文件

- **`Dockerfile`**: 多阶段 Docker 构建配置
- **`docker-compose.yml`**: 开发环境服务编排
- **`Makefile`**: 常用命令快捷方式
- **`.env.example`**: 环境变量模板（需复制为 `.env.local`）
- **`README.md`**: 项目概述和快速开始指南
- **`GIT_GUIDE.md`**: Git 使用指南

## 🔧 被忽略的文件和目录

以下文件和目录已在 `.gitignore` 中配置，不会提交到版本控制：

- `node_modules/` - Node.js 依赖
- `logs/` - 应用日志
- `tmp/` - 临时文件和编译产物
- `.env`, `.env.local` - 环境配置文件
- `*.log` - 日志文件
- IDE 配置（`.vscode/`, `.idea/`）
- 操作系统文件（`.DS_Store`, `Thumbs.db`）

## 📝 最佳实践

### 添加新文件时

1. **后端代码**: 放在 `internal/` 对应层级
2. **前端应用**: 在 `web/` 下创建新目录
3. **部署配置**: 放在 `deployments/` 对应子目录
4. **技术文档**: 放在 `docs/` 目录
5. **用户文档**: 放在 `web/docs/` 目录
6. **脚本文件**: 放在 `scripts/` 目录

### 清理临时文件

定期清理以下目录：
```bash
# 清理编译产物
rm -rf tmp/*

# 清理日志
rm -rf logs/*

# 清理前端构建产物
rm -rf web/*/dist
rm -rf web/*/build
```

## 🚀 快速导航

- **启动后端**: `make dev` 或 `air -c .air.toml`
- **启动前端**: `cd web/<app-name> && npm run dev`
- **启动所有服务**: `docker-compose up -d`
- **运行测试**: `make test`
- **构建项目**: `make build`

---

**最后更新**: 2026-04-26
