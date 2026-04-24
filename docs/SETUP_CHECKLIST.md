# 开发环境配置检查清单

使用此清单确保你的开发环境已正确配置。

## ✅ 第一步：基础软件安装

- [ ] **Go 1.21+**
  ```bash
  go version
  # 预期输出：go version go1.21.x ...
  ```

- [ ] **Git**
  ```bash
  git --version
  # 预期输出：git version 2.x.x
  ```

- [ ] **Docker**
  ```bash
  docker --version
  # 预期输出：Docker version 20.x.x...
  ```

- [ ] **Docker Compose**
  ```bash
  docker-compose --version
  # 预期输出：Docker Compose version v2.x.x...
  ```

- [ ] **Node.js**（如需前端开发）
  ```bash
  node --version
  # 预期输出：v18.x.x 或更高
  ```

## ✅ 第二步：Git 配置

- [ ] 配置用户名
  ```bash
  git config user.name
  # 如果为空，执行：
  git config --global user.name "Your Name"
  ```

- [ ] 配置邮箱
  ```bash
  git config user.email
  # 如果为空，执行：
  git config --global user.email "your.email@example.com"
  ```

- [ ] 配置换行符（Windows）
  ```bash
  git config core.autocrlf
  # Windows 应为 true，macOS/Linux 应为 input
  ```

## ✅ 第三步：Go 配置

- [ ] 配置 GOPROXY（中国大陆用户）
  ```bash
  go env GOPROXY
  # 应包含 https://goproxy.cn,direct
  # 如未配置，执行：
  go env -w GOPROXY=https://goproxy.cn,direct
  ```

- [ ] 验证 Go Modules
  ```bash
  go env GO111MODULE
  # 应为 on
  ```

- [ ] 验证 GOPATH
  ```bash
  go env GOPATH
  # 应已设置
  ```

## ✅ 第四步：安装 Go 开发工具

- [ ] Air（热重载）
  ```bash
  air --version
  # 预期输出：__ Air's Live Reload for Go apps __
  ```

- [ ] golangci-lint（代码检查）
  ```bash
  golangci-lint --version
  # 预期输出：golangci-lint version x.x.x
  ```

- [ ] swag（Swagger 文档）
  ```bash
  swag --version
  # 预期输出：swag version vx.x.x
  ```

- [ ] goimports（导入排序）
  ```bash
  goimports --version
  # 预期输出：goimports version x.x.x
  ```

**安装命令**（如未安装）：
```bash
go install github.com/cosmtrek/air@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install github.com/swaggo/swag/cmd/swag@latest
go install golang.org/x/tools/cmd/goimports@latest
```

## ✅ 第五步：项目设置

- [ ] 克隆项目仓库
  ```bash
  cd /path/to/your/workspace
  git clone git@github.com:your-org/ai-learning-platform.git
  cd ai-learning-platform
  ```

- [ ] 下载 Go 依赖
  ```bash
  go mod download
  ```

- [ ] 复制环境变量模板
  ```bash
  cp .env.example .env.local
  ```

- [ ] 编辑环境变量文件
  ```bash
  # 确保以下配置项已填写：
  # - OPENAI_API_KEY
  # - ALP_JWT_SECRET
  # - ALP_DB_PASSWORD
  ```

## ✅ 第六步：Docker 服务

- [ ] 启动 Docker Desktop
  - [ ] Docker 引擎已启动（状态栏绿色）
  - [ ] 无错误提示

- [ ] 启动项目服务
  ```bash
  make docker-up
  ```

- [ ] 验证服务状态
  ```bash
  docker-compose -f docker-compose.dev.yml ps
  # 应显示：postgres、redis、minio 服务为 Up 状态
  ```

- [ ] 测试 PostgreSQL 连接
  ```bash
  docker exec -it alp-postgres psql -U postgres -d ai_learning -c "SELECT 1;"
  # 应返回：?column?
  # -----------
  #         1
  ```

- [ ] 测试 Redis 连接
  ```bash
  docker exec -it alp-redis redis-cli ping
  # 应返回：PONG
  ```

## ✅ 第七步：VS Code 配置

- [ ] 安装 VS Code
- [ ] 安装 Go 插件
  ```
  ext install golang.go
  ```
- [ ] 安装 GitLens 插件
  ```
  ext install eamodio.gitlens
  ```
- [ ] 安装 Prettier 插件
  ```
  ext install esbenp.prettier-vscode
  ```

- [ ] 配置 VS Code 设置（settings.json）
  ```json
  {
    "go.formatTool": "goimports",
    "go.lintTool": "golangci-lint",
    "go.lintOnSave": "package",
    "go.testOnSave": false,
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
    "files.eol": "\n"
  }
  ```

## ✅ 第八步：功能验证

- [ ] 编译项目
  ```bash
  make build
  # 应无错误输出
  ```

- [ ] 运行测试
  ```bash
  make test
  # 应无错误输出
  ```

- [ ] 运行代码检查
  ```bash
  make lint
  # 应无错误输出
  ```

- [ ] 启动开发服务器
  ```bash
  make dev
  ```

- [ ] 测试健康检查接口（新终端）
  ```bash
  curl http://localhost:8080/health
  # 应返回：{"status":"ok","service":"ai-learning-platform"}
  ```

## ✅ 第九步：SSH 配置（使用 Git SSH）

- [ ] 生成 SSH 密钥
  ```bash
  ssh-keygen -t ed25519 -C "your.email@example.com"
  ```

- [ ] 添加 SSH 密钥到 ssh-agent
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```

- [ ] 测试 GitHub 连接
  ```bash
  ssh -T git@github.com
  # 应返回：Hi username! You've successfully authenticated...
  ```

- [ ] 将 SSH 公钥添加到 GitHub
  1. 复制公钥：`cat ~/.ssh/id_ed25519.pub | clip`（Windows）
  2. 访问：https://github.com/settings/ssh/new
  3. 粘贴公钥并保存

## ✅ 第十步：熟悉项目

- [ ] 阅读项目 README
- [ ] 阅读协同开发指南
- [ ] 了解项目结构
- [ ] 熟悉常用 Makefile 命令

### 常用命令

```bash
# 开发命令
make dev        # 启动开发服务器
make test       # 运行测试
make lint       # 代码检查
make build      # 编译项目

# Docker 命令
make docker-up      # 启动 Docker 服务
make docker-down    # 停止 Docker 服务

# Git 命令
git status      # 查看状态
git log         # 查看历史
git branch      # 查看分支
```

## 🎉 恭喜！

如果你已完成以上所有检查，你的开发环境已配置完毕！

下一步：
1. 创建功能分支：`git checkout -b feature/your-feature`
2. 开始开发
3. 提交代码：`git commit -m "feat: ..."`
4. 推送到远程：`git push -u origin feature/your-feature`
5. 创建 Pull Request

## 🆘 遇到问题？

查看详细的 [协同开发指南](CONTRIBUTION_GUIDE.md) 或联系团队。

---

**配置完成时间**: ___________  
**开发者姓名**: ___________  
**联系方式**: ___________
