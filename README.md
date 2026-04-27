# AI 辅助代码学习平台

基于 Go + Gin + PostgreSQL + Redis 构建的 AI 驱动代码学习平台。

## ✨ 最新更新

🎉 **前端已全新升级!** 

### Web 版本
使用 React + Tailwind CSS 打造现代化用户界面,提供更美观、更流畅的学习体验!

- 🌈 渐变背景和玻璃态设计
- 📱 完全响应式布局
- 💫 流畅的动画效果
- 🎯 直观的用户交互

### 🖥️ 桌面应用 (新增!)
基于 **Wails v2** 构建跨平台桌面应用:

- ⚡ 原生性能,内存占用低
- 📦 体积小巧 (相比 Electron 减小 80%)
- 🔒 本地运行,数据更安全
- 🎨 与 Web 版相同的精美 UI
- 💻 支持 Windows/macOS/Linux

查看 [启动指南](STARTUP_GUIDE.md) 了解更多详情!

## 📋 功能特性

- ✅ **用户管理**: 用户注册、登录、个人资料管理
- ✅ **学习系统**: 知识点学习、学习进度追踪
- ✅ **AI 辅助**: 智能对话、代码辅助、学习建议
- ✅ **题库系统**: 习题练习、自动评分
- ✅ **对话记录**: 学习对话历史保存与分析

## 🛠️ 技术栈

- **后端**: Go 1.21, Gin, GORM
- **数据库**: PostgreSQL 15
- **缓存**: Redis 7
- **对象存储**: MinIO
- **配置管理**: Viper
- **日志**: Zap
- **CLI工具**: Cobra
- **开发工具**: Air (热重载)

## 🚀 快速开始

### 环境要求

- Go 1.21+
- Docker & Docker Compose (或 Podman)
- Node.js 18+ (前端开发)
- Wails CLI (桌面应用可选)

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd ai_assisting_code_learning
   ```

2. **初始化开发环境**

   - **Windows（PowerShell，无需 make）**
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/setup.ps1
   ```

   - **macOS/Linux（已安装 make）**
   ```bash
   make setup
   ```

3. **启动依赖服务**

   - **使用 Docker:**
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

   - **使用 Podman:**
   ```bash
   podman compose -f docker-compose.dev.yml up -d
   ```

4. **配置环境变量**
   ```bash
   cp .env.example .env.local
   # 编辑 .env.local 文件，填入必要的配置
   ```

5. **运行数据库迁移**
   ```bash
   make migrate
   # 或
   go run cmd/migrate/main.go
   ```

6. **启动服务**

   ### Web 前端 (React + Tailwind)
   ```bash
   cd web/react-app
   npm install
   npm run dev
   ```
   前端将运行在: http://localhost:5173

   ### 后端 (Go)
   ```bash
   # 方式一: 使用 air 热重载
   make dev
   
   # 方式二: 直接运行
   go run cmd/server/main.go
   ```
   后端将运行在: http://localhost:8080

   ### 🖥️ 桌面应用 (Wails - 推荐!)
   
   **Windows:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/start-wails.ps1
   ```
   
   **Linux/macOS:**
   ```bash
   cd web/wails-app
   ./start.sh
   # 选择选项 1 安装依赖,然后选择选项 2 启动
   ```
   
   或直接使用:
   ```bash
   cd web/wails-app
   wails dev
   ```

   > 💡 **提示**: Wails 桌面应用提供原生性能,体积更小,内存占用更低,推荐使用!

## 📖 可用命令

### Windows（PowerShell，无 make）

```powershell
# 初始化开发环境
powershell -ExecutionPolicy Bypass -File scripts/setup.ps1

# 编译项目
powershell -ExecutionPolicy Bypass -File scripts/build.ps1

# 启动开发服务
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1

# 构建CLI工具
go build -o bin/ai-learning-cli.exe ./cmd/cli

# 使用CLI工具
.\bin\ai-learning-cli.exe --help

# 启动 Docker 服务
docker-compose -f docker-compose.dev.yml up -d

# 停止 Docker 服务
docker-compose -f docker-compose.dev.yml down
```

### macOS/Linux（make）

```bash
# 初始化开发环境
make setup

# 启动开发服务器（热重载）
make dev

# 编译项目
make build

# 构建CLI工具
make cli

# 运行测试
make test

# 代码检查
make lint

# 清理构建文件
make clean

# 启动 Podman 服务
make docker-up

# 停止 Podman 服务
make docker-down

# 运行数据库迁移
make migrate

# 生成 API 文档
make swag
```

### 🛠️ CLI 工具（新功能！）

项目新增了强大的命令行界面（CLI）工具：

```bash
# 构建CLI
make cli

# 查看帮助
./bin/ai-learning-cli --help

# 检查配置
./bin/ai-learning-cli config get

# 测试数据库连接
./bin/ai-learning-cli db status

# 运行数据库迁移
./bin/ai-learning-cli db migrate

# 用户管理
./bin/ai-learning-cli user list
./bin/ai-learning-cli user create username email -p password

# AI功能
./bin/ai-learning-cli ai chat
./bin/ai-learning-cli ai test
```

查看更多CLI命令：[CLI 完整指南](docs/CLI_GUIDE.md)

## 📁 项目结构

```
.
├── cmd/                    # 应用入口
│   ├── server/            # HTTP 服务器
│   └── migrate/           # 数据库迁移工具
├── internal/              # 私有应用代码
│   ├── app/              # 应用初始化
│   │   ├── handler/      # HTTP 处理器
│   │   ├── middleware/   # 中间件
│   │   └── validator/     # 验证器
│   ├── biz/              # 业务逻辑
│   ├── data/             # 数据访问层
│   ├── pkg/              # 公共包
│   │   └── config/       # 配置管理
│   └── server/           # 服务器实现
├── configs/               # 配置文件
├── deployments/           # 部署配置
│   ├── docker/           # Docker 配置
│   ├── k8s/              # Kubernetes 配置
│   ├── postgres/         # 数据库脚本
│   └── terraform/        # Terraform 配置
├── web/                  # 前端代码
│   ├── wails-app/        # 🖥️ Wails 桌面应用 (新!)
│   │   ├── main.go       # 应用入口
│   │   ├── app.go        # Go 应用逻辑
│   │   ├── frontend/     # React 前端
│   │   └── scripts/      # PowerShell 脚本
│   ├── react-app/        # ✨ React + Tailwind Web 应用
│   │   ├── src/
│   │   │   ├── App.jsx   # 主应用组件
│   │   │   └── index.css # Tailwind CSS
│   │   └── package.json
│   └── docs/             # VitePress 文档站点
├── docs/                 # 文档
├── tests/                # 测试
├── scripts/              # 脚本
│   └── start-wails.ps1  # 🚀 Wails 快速启动脚本
├── docker-compose.dev.yml # Docker Compose 配置
├── go.mod               # Go 模块定义
├── Makefile             # Make 命令
├── STARTUP_GUIDE.md     # 📖 启动指南 (新!)
└── .air.toml           # Air 热重载配置
```

## 🔧 配置说明

### 环境变量 (.env.local)

```bash
# 服务器配置
ALP_SERVER_HOST=0.0.0.0
ALP_SERVER_PORT=8080
ALP_SERVER_MODE=debug

# 数据库配置
ALP_DB_HOST=localhost
ALP_DB_PORT=5432
ALP_DB_USER=postgres
ALP_DB_PASSWORD=postgres
ALP_DB_NAME=ai_learning

# Redis配置
ALP_REDIS_HOST=localhost
ALP_REDIS_PORT=6379

# AI配置
OPENAI_API_KEY=your-openai-api-key
ALP_AI_MODEL=gpt-3.5-turbo

# JWT配置
ALP_JWT_SECRET=your-jwt-secret-key-change-in-production
```

### 配置文件 (configs/config.yaml)

配置文件支持 YAML 格式，环境变量会覆盖配置文件中的值。

## 📡 API 接口

### 健康检查
- `GET /health` - 服务健康状态

### 用户
- `POST /api/v1/users/register` - 用户注册
- `POST /api/v1/users/login` - 用户登录
- `GET /api/v1/users/profile` - 获取用户信息（需认证）

### 学习
- `GET /api/v1/learning/lessons` - 获取课程列表（需认证）
- `GET /api/v1/learning/lessons/:id` - 获取课程详情（需认证）
- `POST /api/v1/learning/lessons/:id/complete` - 完成课程（需认证）

### AI 辅助
- `POST /api/v1/ai/chat` - AI 对话（需认证）
- `POST /api/v1/ai/code-assist` - 代码辅助（需认证）

## 🧪 测试

```bash
# 运行所有测试
make test

# 运行特定包测试
go test ./internal/pkg/config -v

# 查看测试覆盖率
go test ./... -cover -coverprofile=coverage.out
go tool cover -html=coverage.out
```

## 📖 文档

详细的开发文档请查看 [docs/](docs/) 目录：

- **[文档中心](docs/index.md)** - 所有文档的导航中心
- **[开发环境配置检查清单](docs/SETUP_CHECKLIST.md)** - 新成员必读
- **[协同开发指南](docs/CONTRIBUTION_GUIDE.md)** - 完整的开发流程
- **[代码审查指南](docs/CODE_REVIEW_GUIDE.md)** - 代码审查规范

### 快速文档链接

| 文档 | 适用人群 | 内容 |
|------|----------|------|
| [环境配置清单](docs/SETUP_CHECKLIST.md) | 新成员 | 安装配置所有必需软件 |
| [协同开发指南](docs/CONTRIBUTION_GUIDE.md) | 所有成员 | Git 工作流、开发规范 |
| [代码审查指南](docs/CODE_REVIEW_GUIDE.md) | 审查者 | 审查标准、检查清单 |

### Docker 部署

```bash
# 构建镜像
docker build -f deployments/docker/Dockerfile -t ai-learning-platform .

# 运行容器
docker run -p 8080:8080 ai-learning-platform
```

### Kubernetes 部署

配置文件位于 `deployments/k8s/` 目录。

```bash
kubectl apply -f deployments/k8s/
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发规范

- 遵循 Go 代码规范和 [Effective Go](https://go.dev/doc/effective_go)
- 提交代码前运行 `make lint` 进行代码检查
- 为新功能添加单元测试
- 更新相关文档

## 🔒 安全说明

- 生产环境务必修改 JWT Secret
- 使用强密码和 SSL/TLS 加密
- 定期更新依赖包
- 配置适当的防火墙规则

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👥 联系方式

如有问题或建议，请提交 Issue。

## 🙏 致谢

感谢所有贡献者和开源项目！
