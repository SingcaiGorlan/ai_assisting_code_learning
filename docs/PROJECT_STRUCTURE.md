# 项目结构说明

本文档详细说明 AI 辅助代码学习平台的目录结构和文件组织规范。

## 📁 根目录结构

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
│   ├── data/                # 数据访问层 (DAO/Repository)
│   ├── pkg/                 # 内部公共包
│   │   ├── config/          # 配置加载逻辑
│   │   └── logger/          # 日志封装
│   └── server/              # 服务器具体实现
├── configs/                 # 配置文件
│   ├── config.yaml          # 默认配置
│   └── config.local.yaml    # 本地配置（需手动创建）
├── deployments/             # 部署相关配置
│   ├── nginx/               # Nginx 配置
│   │   └── nginx.conf
│   ├── postgres/            # PostgreSQL 初始化脚本
│   │   └── init.sql
│   └── docker-compose.prod.yml  # 生产环境 Docker Compose
├── scripts/                 # 自动化脚本
│   ├── clean.sh             # 清理脚本
│   ├── build.ps1            # Windows 构建脚本
│   ├── deploy.sh            # 部署脚本
│   └── ...                  # 其他 PowerShell 脚本
├── docs/                    # 项目开发技术文档
│   ├── API 文档
│   ├── 部署指南
│   └── 故障排查
├── web/                     # 前端多应用目录
│   ├── admin/               # 管理后台（Vue + TypeScript）
│   ├── app/                 # 主应用（Vite + TypeScript）
│   ├── wails-app/           # Wails 桌面应用（Go + React）
│   ├── docs/                # VitePress 用户文档站点
│   └── README.md            # 前端说明文档
├── Dockerfile               # Docker 构建文件
├── docker-compose.yml       # Docker Compose 配置（基础）
├── docker-compose.dev.yml   # 开发环境 Docker Compose
├── Makefile                 # Make 命令集
├── .env.example             # 环境变量模板
├── .env.local               # 本地环境变量（已忽略）
├── .gitignore               # Git 忽略规则
├── .dockerignore            # Docker 忽略规则
├── go.mod                   # Go 模块依赖
├── go.sum                   # Go 依赖校验和
├── README.md                # 项目说明
├── GIT_GUIDE.md             # Git 使用指南
├── QUICK_REFERENCE.md       # 快速参考
├── WAILS_DESIGN.md          # Wails 设计文档
└── WAILS_SUMMARY.md         # Wails 总结
```

## 🌐 Web 前端子应用

### 1. `web/app/` - 主应用
- **技术栈**: Vite + TypeScript + Vue
- **用途**: 主要的 Web 应用界面
- **构建输出**: `web/app/dist/`

### 2. `web/admin/` - 管理后台
- **技术栈**: Vue + TypeScript
- **用途**: 系统管理和用户管理界面
- **构建输出**: `web/admin/dist/`

### 3. `web/wails-app/` - 桌面应用
- **技术栈**: Go (后端) + Wails v2 + React (前端) + Tailwind CSS
- **用途**: 跨平台桌面应用
- **主要文件**:
  - `main.go` - 应用入口
  - `app/` - Go 应用逻辑层
  - `frontend/` - React 前端源码
  - `build/` - 构建配置和资源

### 4. `web/docs/` - 文档站点
- **技术栈**: VitePress
- **用途**: 用户文档和 API 文档
- **构建输出**: `web/docs/.vitepress/dist/`

## 🔧 开发和构建

### 常用命令

```bash
# 清理编译产物
make clean

# 深度清理（包括 node_modules）
make clean-all

# 启动开发服务器
make dev

# 构建项目
make build

# 运行测试
make test

# 代码检查
make lint

# 启动 Docker 服务
make docker-up

# 停止 Docker 服务
make docker-down

# 数据库迁移
make migrate

# 生成 API 文档
make swag
```

### 清理内容

执行 `make clean` 会清理以下内容：
- `tmp/` - 临时编译文件
- `bin/` - 构建产物
- `logs/` - 日志文件
- `*.swp` - Vim 临时文件
- `web/*/dist/` - 前端构建产物
- `web/docs/.vitepress/dist/` - 文档构建产物
- `coverage.out` - 测试覆盖文件
- `*.db`, `*.sqlite` - 临时数据库文件
- `.cache/`, `__pycache__/` - 缓存目录

## 📝 配置文件

### 环境配置
- `.env.example` - 环境变量模板（提交到 Git）
- `.env.local` - 本地开发配置（被 Git 忽略）
- `.env` - 生产环境配置（被 Git 忽略）

### 应用配置
- `configs/config.yaml` - 默认配置（提交到 Git）
- `configs/config.local.yaml` - 本地覆盖配置（被 Git 忽略）

## 🚀 部署

### Docker 构建
```bash
# 构建镜像
docker build -f Dockerfile -t ai-learning-platform .

# 运行容器
docker run -p 8080:8080 ai-learning-platform
```

### Kubernetes 部署
```bash
kubectl apply -f deployments/k8s/
```

## 📋 重要规范

### 1. 目录职责
- `cmd/` - 仅包含应用入口，保持简洁
- `internal/` - 所有业务逻辑，遵循分层架构
- `deployments/` - 所有部署配置集中管理
- `docs/` - 项目开发文档（技术相关）
- `web/docs/` - 用户文档站点（VitePress）

### 2. 前端开发
- 各子应用独立管理依赖（各自的 `package.json`）
- 不要在前端子应用外安装 npm 依赖
- 构建产物会被自动清理，不提交到 Git

### 3. 版本控制
- 只提交源代码和配置文件模板
- 所有编译产物、日志、缓存都应被忽略
- 敏感信息（`.env`, `config.local.yaml`）不应提交

### 4. 日志管理
- 运行时日志写入 `logs/` 目录
- 定期清理或使用日志轮转
- 开发时可通过标准输出查看日志

## 🔍 特殊文件说明

| 文件 | 用途 | 是否提交 |
|------|------|----------|
| `.env.example` | 环境变量模板 | ✅ 是 |
| `.env.local` | 本地配置 | ❌ 否 |
| `configs/config.yaml` | 默认配置 | ✅ 是 |
| `configs/config.local.yaml` | 本地覆盖配置 | ❌ 否 |
| `Makefile` | 构建和管理命令 | ✅ 是 |
| `scripts/clean.sh` | 清理脚本 | ✅ 是 |
| `*.swp` | Vim 临时文件 | ❌ 否 |
| `tmp/` | 编译临时目录 | ❌ 否 |
| `bin/` | 构建产物目录 | ❌ 否 |
| `logs/` | 日志目录 | ❌ 否 |

## 📖 相关文档

- [README.md](../README.md) - 项目介绍和快速开始
- [GIT_GUIDE.md](../GIT_GUIDE.md) - Git 使用指南
- [QUICK_REFERENCE.md](../QUICK_REFERENCE.md) - 快速参考
- [WAILS_DESIGN.md](../WAILS_DESIGN.md) - Wails 桌面应用设计
- [docs/](./) - 更多技术文档
