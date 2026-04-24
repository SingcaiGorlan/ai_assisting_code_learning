# AI 辅助代码学习平台 - 多人协同开发指南

本文档旨在帮助团队成员快速上手项目，规范开发流程，实现高效的多人协同开发。

---

## 📚 目录

1. [环境准备](#1-环境准备)
2. [项目配置](#2-项目配置)
3. [Git 工作流程](#3-git-工作流程)
4. [代码规范](#4-代码规范)
5. [开发流程](#5-开发流程)
6. [测试与提交](#6-测试与提交)
7. [问题排查](#7-问题排查)
8. [常见问题 FAQ](#8-常见问题-faq)

---

## 1. 环境准备

### 1.1 必需软件安装

#### Windows 用户

##### 1. 安装 Go

```powershell
# 方法一：使用 winget（推荐）
winget install GoLang.Go

# 方法二：手动下载
# 访问 https://go.dev/dl/ 下载 Windows 安装包
# 运行安装程序，默认路径 C:\Program Files\Go

# 验证安装
go version
```

**环境变量配置**（自动配置，如需手动）：
```powershell
# 添加到系统环境变量
$env:GOPATH = "C:\Users\$(whoami)\go"
$env:PATH += ";$env:GOPATH\bin;C:\Program Files\Go\bin"

# 永久设置（PowerShell）
[System.Environment]::SetEnvironmentVariable('GOPATH', 'C:\Users\$(whoami)\go', 'User')
```

##### 2. 安装 Git

```powershell
# 使用 winget 安装
winget install Git.Git

# 验证安装
git --version
```

**Git 全局配置**（仅首次设置）：
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.autocrlf true  # Windows 换行符
git config --global init.defaultbranch main
```

##### 3. 安装 Docker Desktop

```powershell
# 使用 winget 安装
winget install Docker.DockerDesktop

# 或访问 https://www.docker.com/products/docker-desktop/ 下载安装
```

安装完成后：
1. 启动 Docker Desktop
2. 等待 Docker 引擎启动（状态栏变为绿色）
3. 验证安装：
```powershell
docker --version
docker-compose --version
```

##### 4. 安装 Node.js（如需前端开发）

```powershell
# 使用 winget 安装
winget install OpenJS.NodeJS.LTS

# 或访问 https://nodejs.org/ 下载 LTS 版本

# 验证安装
node --version
npm --version
```

**配置 npm 镜像（可选，加速国内下载）**：
```powershell
npm config set registry https://registry.npmmirror.com
```

#### macOS 用户

##### 1. 安装 Homebrew（包管理器）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

##### 2. 安装必需软件

```bash
# 安装 Go
brew install go

# 安装 Git
brew install git

# 安装 Docker Desktop
brew install --cask docker

# 安装 Node.js（如需前端开发）
brew install node
```

##### 3. 验证安装

```bash
go version    # go version go1.21.x darwin/amd64
git --version # git version 2.x.x
docker --version
node --version
```

##### 4. Git 全局配置

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.autocrlf input
git config --global init.defaultbranch main
```

#### Linux 用户（Ubuntu/Debian）

##### 1. 安装 Go

```bash
# 下载 Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz

# 解压到 /usr/local
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

# 配置环境变量（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
source ~/.bashrc

# 验证安装
go version
```

##### 2. 安装 Git

```bash
sudo apt update
sudo apt install git

# Git 全局配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

##### 3. 安装 Docker

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或运行
newgrp docker

# 验证安装
docker --version
```

##### 4. 安装 Docker Compose

```bash
sudo apt install docker-compose-plugin

# 验证安装
docker compose version
```

##### 5. 安装 Node.js（如需前端开发）

```bash
# 使用 nvm 安装（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# 验证安装
node --version
npm --version
```

### 1.2 安装开发工具

#### VS Code 编辑器（推荐）

1. 下载并安装 [Visual Studio Code](https://code.visualstudio.com/)
2. 安装以下插件：

```bash
# 通过命令面板 (Ctrl+Shift+P) 输入以下命令安装插件
ext install golang.go              # Go 语言支持
ext install ms-vscode.vscode-typescript-next  # TypeScript 支持
ext import ms-python.python        # Python 支持（如需）
ext import esbenp.prettier-vscode # 代码格式化
ext import dbaeumer.vscode-eslint  # ESLint
ext import ms-vscode.gitlens      # Git 增强
ext import eamodio.gitlens        # GitLens
ext import humao.rest-client      # REST API 测试
```

#### Go 开发工具（必装）

```bash
# 安装 Air（热重载）
go install github.com/cosmtrek/air@latest

# 安装 golangci-lint（代码检查）
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# 安装 swag（Swagger 文档生成）
go install github.com/swaggo/swag/cmd/swag@latest

# 安装 goimports（导入排序）
go install golang.org/x/tools/cmd/goimports@latest

# 验证工具安装
air --version
golangci-lint --version
swag --version
goimports --version
```

**注意**：确保 `$GOPATH/bin` 已添加到 PATH 环境变量中。

#### 其他推荐工具

```bash
# 安装 jq（JSON 处理）
# Windows: winget install jqlang.jq
# macOS: brew install jq
# Linux: sudo apt install jq

# 安装 htop（系统监控）
# macOS: brew install htop
# Linux: sudo apt install htop
```

### 1.3 网络配置（可选）

如果遇到网络问题，可以配置代理：

```bash
# 配置 Go 代理（中国大陆推荐）
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GO111MODULE=on

# 配置 Git 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

## 2. 项目配置

### 2.1 克隆项目

```bash
# 克隆仓库（使用 SSH，推荐）
git clone git@github.com:your-org/ai-learning-platform.git
cd ai-learning-platform

# 或使用 HTTPS
git clone https://github.com/your-org/ai-learning-platform.git
cd ai-learning-platform
```

### 2.2 初始化开发环境

```bash
# 运行初始化脚本
make setup
```

该命令会执行以下操作：
- 下载 Go 依赖
- 安装开发工具
- 复制配置文件模板

### 2.3 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local

# 使用编辑器编辑配置
# Windows: notepad .env.local
# macOS/Linux: vim .env.local 或 nano .env.local
```

**重要配置项**：

```bash
# 修改为你的开发环境配置
ALP_SERVER_HOST=0.0.0.0
ALP_SERVER_PORT=8080
ALP_SERVER_MODE=debug  # 开发环境用 debug，生产环境用 release

# 数据库密码（建议修改）
ALP_DB_PASSWORD=your-secure-password

# Redis 密码（如需）
ALP_REDIS_PASSWORD=your-redis-password

# OpenAI API Key（必需）
OPENAI_API_KEY=sk-your-actual-api-key

# JWT Secret（生产环境务必修改为随机字符串）
ALP_JWT_SECRET=your-random-jwt-secret-at-least-32-chars
```

### 2.4 启动依赖服务

```bash
# 启动 Docker 服务（PostgreSQL、Redis、MinIO）
make docker-up

# 等待服务启动完成（约 30 秒）
# 查看服务状态
docker-compose -f docker-compose.dev.yml ps
```

### 2.5 验证环境

```bash
# 检查数据库连接
docker exec -it alp-postgres psql -U postgres -d ai_learning -c "SELECT version();"

# 检查 Redis 连接
docker exec -it alp-redis redis-cli ping

# 应返回 PONG

# 启动开发服务器
make dev

# 在新终端访问健康检查接口
curl http://localhost:8080/health

# 应返回 {"status":"ok","service":"ai-learning-platform"}
```

---

## 3. Git 工作流程

### 3.1 分支策略

采用 **Git Flow** 工作流：

```
main           - 主分支，只接受来自 release 的合并
release/*      - 发布分支，用于发布前的测试和准备
develop        - 开发分支，日常开发的基准
feature/*      - 功能分支，从 develop 分出，完成后合并回 develop
bugfix/*       - 修复分支，用于修复 develop 分支的 bug
hotfix/*       - 紧急修复分支，用于修复 main 分支的严重 bug
```

### 3.2 创建功能分支

```bash
# 1. 确保在最新的 develop 分支
git checkout develop
git pull origin develop

# 2. 创建功能分支（命名规范：feature/功能简述）
git checkout -b feature/user-authentication
# 或
git checkout -b feature/add-ai-chat

# 3. 开始开发
# ... 修改代码 ...
```

### 3.3 提交代码

#### 提交规范（Conventional Commits）

```bash
# 格式：<type>(<scope>): <subject>

# type 类型：
feat     - 新功能
fix      - 修复 bug
docs     - 文档更新
style    - 代码格式调整（不影响逻辑）
refactor - 重构（既不是新增功能也不是修复 bug）
perf     - 性能优化
test     - 测试相关
chore    - 构建/工具链相关
revert   - 回退提交

# 示例：
git commit -m "feat(user): add user registration API"
git commit -m "fix(api): resolve authentication token expiration issue"
git commit -m "docs(readme): update installation guide"
git commit -m "refactor(database): optimize connection pooling"
```

#### 提交工作流

```bash
# 1. 查看修改
git status
git diff

# 2. 暂存文件
git add file1.go file2.go
# 或暂存所有修改
git add .

# 3. 提交代码
git commit -m "feat(handler): add user login endpoint"

# 4. 推送到远程仓库
git push -u origin feature/user-authentication
```

### 3.4 更新代码

```bash
# 拉取最新的 develop 分支
git checkout develop
git pull origin develop

# 合并到当前功能分支
git checkout feature/user-authentication
git merge develop

# 或使用 rebase（保持提交历史清晰）
git checkout feature/user-authentication
git rebase develop
```

### 3.5 Pull Request 流程

#### 1. 创建 Pull Request

访问 GitHub 仓库，点击 "Pull requests" → "New pull request"

#### 2. 填写 PR 模板

```markdown
## 描述
简要描述本次 PR 的目的和实现的功能

## 变更类型
- [ ] 新功能 (feature)
- [ ] Bug 修复 (bugfix)
- [ ] 文档更新 (docs)
- [ ] 代码重构 (refactor)
- [ ] 性能优化 (perf)

## 测试
- [ ] 已通过本地测试
- [ ] 已更新单元测试
- [ ] 已更新文档

## 关联 Issue
Closes #123

## 截图（如适用）
<!-- 添加截图说明 UI 变更 -->

## 检查清单
- [ ] 代码符合项目规范
- [ ] 已通过 linter 检查（make lint）
- [ ] 已通过测试（make test）
- [ ] 已更新相关文档
```

#### 3. 代码审查

其他团队成员会审查代码，可能提出修改建议：
- 响应审查意见
- 修改代码后推送到同一分支
- 所有审查通过后，合并到 develop 分支

#### 4. 合并 PR

审查通过后：
- 使用 "Squash and merge" 保持提交历史清晰
- 删除已合并的功能分支

### 3.6 解决冲突

```bash
# 1. 拉取最新代码
git fetch origin

# 2. 尝试合并
git merge origin/develop

# 3. 如有冲突，Git 会提示
# 编辑冲突文件，解决冲突

# 4. 标记冲突已解决
git add resolved_file.go

# 5. 完成合并
git commit

# 6. 推送
git push origin feature/your-feature
```

**冲突示例**：
```go
<<<<<<< HEAD
func GetUser(id int) *User {
    return &User{ID: id}
}
=======
func GetUser(id int) *User {
    db.First(&User{}, id)
}
>>>>>>> feature/user-api
```

选择正确的代码后，删除冲突标记。

---

## 4. 代码规范

### 4.1 Go 代码规范

遵循 [Effective Go](https://go.dev/doc/effective_go) 和 [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)

#### 基本原则

```go
// ✅ 好的命名
func GetUserByID(id int64) (*User, error) {
    var user User
    err := db.First(&user, id).Error
    if err != nil {
        return nil, err
    }
    return &user, nil
}

// ❌ 避免的命名
func get(u int64) (*U, error) {
    // 过于简短
}

// ✅ 错误处理
func CreateUser(user *User) error {
    if user == nil {
        return errors.New("user cannot be nil")
    }

    if err := db.Create(user).Error; err != nil {
        return fmt.Errorf("failed to create user: %w", err)
    }

    return nil
}

// ❌ 忽略错误
func CreateUser(user *User) {
    db.Create(user)  // 错误被忽略
}
```

#### 注释规范

```go
// Package handler 提供 HTTP 请求处理函数
package handler

// RegisterRoutes 注册所有 API 路由
// 该函数应该在应用初始化时调用一次
func RegisterRoutes(router *gin.Engine, db *gorm.DB, redis interface{}) {
    // ...
}
```

### 4.2 使用 goimports

```bash
# 自动整理导入
goimports -w file.go

# 或使用 VS Code 配置自动保存时执行
# settings.json:
{
  "go.formatTool": "goimports"
}
```

### 4.3 运行代码检查

```bash
# 运行 linter
make lint

# 或手动运行
golangci-lint run ./...

# 修复自动可修复的问题
golangci-lint run --fix ./...
```

### 4.4 单元测试

```go
// handler_test.go
package handler

import (
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func TestHealthCheck(t *testing.T) {
    router := gin.New()
    router.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "ok"})
    })

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/health", nil)
    router.ServeHTTP(w, req)

    assert.Equal(t, 200, w.Code)
    assert.Contains(t, w.Body.String(), "ok")
}
```

运行测试：

```bash
# 运行所有测试
make test

# 运行特定包的测试
go test ./internal/pkg/config -v

# 查看测试覆盖率
go test ./... -cover -coverprofile=coverage.out
go tool cover -html=coverage.out
```

---

## 5. 开发流程

### 5.1 开发新功能

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 编写代码
# ...

# 3. 本地测试
make test

# 4. 代码检查
make lint

# 5. 提交代码
git add .
git commit -m "feat(module): add new feature description"

# 6. 推送到远程
git push -u origin feature/new-feature

# 7. 创建 Pull Request
```

### 5.2 修复 Bug

```bash
# 1. 创建修复分支
git checkout -b bugfix/issue-description

# 2. 修复问题
# ...

# 3. 测试修复
make test

# 4. 提交代码
git commit -m "fix(module): resolve issue description"

# 5. 推送并创建 PR
git push -u origin bugfix/issue-description
```

### 5.3 代码审查要点

作为审查者，关注以下方面：

- ✅ 代码逻辑是否正确
- ✅ 是否有遗漏的错误处理
- ✅ 命名是否清晰、符合规范
- ✅ 是否有必要的注释
- ✅ 是否有单元测试
- ✅ 是否有安全漏洞（如 SQL 注入）
- ✅ 性能是否合理
- ✅ 是否遵循项目架构

---

## 6. 测试与提交

### 6.1 测试检查清单

提交代码前确保：

- [ ] 代码可以正常编译（`make build`）
- [ ] 通过 linter 检查（`make lint`）
- [ ] 通过单元测试（`make test`）
- [ ] 手动测试核心功能
- [ ] 更新相关文档
- [ ] 无敏感信息泄露（API Key、密码等）

### 6.2 提交前检查

```bash
# 1. 查看修改
git status
git diff

# 2. 运行测试
make test

# 3. 运行 linter
make lint

# 4. 构建项目
make build

# 5. 提交代码
git add .
git commit -m "type(scope): description"

# 6. 推送到远程
git push
```

### 6.3 持续集成（CI）

项目配置了 GitHub Actions，PR 创建后会自动运行：

- 代码检查
- 单元测试
- 构建测试

只有 CI 通过后才能合并 PR。

---

## 7. 问题排查

### 7.1 常见开发问题

#### 问题 1: Go 依赖下载失败

```bash
# 解决方案：配置 GOPROXY
go env -w GOPROXY=https://goproxy.cn,direct

# 或直接下载依赖
go mod download
```

#### 问题 2: Docker 服务无法启动

```bash
# 检查 Docker 服务状态
docker ps

# 重启 Docker Desktop
# Windows: 在任务栏右键 Docker 图标 → Restart
# macOS: 在菜单栏点击 Docker 图标 → Restart Docker Desktop

# 清理并重启
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

#### 问题 3: 数据库连接失败

```bash
# 检查数据库是否运行
docker-compose -f docker-compose.dev.yml ps

# 查看数据库日志
docker logs alp-postgres

# 检查环境变量配置
cat .env.local | grep ALP_DB
```

#### 问题 4: 端口被占用

```bash
# Windows
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080

# 杀死占用进程（谨慎操作）
# Windows: taskkill /PID <pid> /F
# macOS/Linux: kill -9 <pid>

# 或修改配置使用其他端口
# 编辑 configs/config.yaml
```

#### 问题 5: Git 推送被拒绝

```bash
# 拉取最新代码
git pull origin develop --rebase

# 或
git fetch origin
git rebase origin/develop

# 解决冲突后
git add .
git rebase --continue
```

### 7.2 环境问题诊断

```bash
# 运行诊断脚本
make diagnose  # 需要在 Makefile 中添加该命令

# 或手动检查
go version
git version
docker --version
docker-compose --version
node --version
npm --version
```

---

## 8. 常见问题 FAQ

### Q1: 如何重置开发环境？

```bash
# 停止并清理 Docker 服务
make docker-down

# 删除构建文件
make clean

# 清理 Go 模块缓存
go clean -modcache

# 重新初始化
make setup
```

### Q2: 如何切换到不同的 Git 分支？

```bash
# 查看所有分支
git branch -a

# 切换到已有分支
git checkout develop
git checkout feature/some-feature

# 创建并切换到新分支
git checkout -b new-feature

# 切换到上一个分支
git checkout -
```

### Q3: 如何撤销本地提交？

```bash
# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（不保留修改）
git reset --hard HEAD~1

# 修改最后一次提交信息
git commit --amend -m "new message"
```

### Q4: 如何查看 Git 提交历史？

```bash
# 查看提交历史
git log

# 查看简洁历史
git log --oneline

# 查看图形化历史
git log --graph --oneline --all

# 查看某个文件的修改历史
git log -p path/to/file.go
```

### Q5: 如何恢复误删的文件？

```bash
# 从暂存区恢复
git restore file.go

# 从上一次提交恢复
git restore HEAD~1 file.go

# 或使用 checkout
git checkout file.go
git checkout HEAD~1 file.go
```

### Q6: 如何处理多个功能同时开发？

```bash
# 保存当前工作
git stash

# 切换到另一个分支
git checkout feature/another-feature

# 完成工作后，切回原分支并恢复
git checkout feature/feature-1
git stash pop
```

### Q7: 如何配置 SSH 密钥？

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your.email@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 复制公钥到 GitHub
# Settings → SSH and GPG keys → New SSH key → 粘贴公钥

# 测试连接
ssh -T git@github.com
```

### Q8: 如何查看 Docker 容器日志？

```bash
# 查看所有容器日志
docker-compose -f docker-compose.dev.yml logs

# 查看特定服务日志
docker-compose -f docker-compose.dev.yml logs postgres
docker-compose -f docker-compose.dev.yml logs redis

# 实时跟踪日志
docker-compose -f docker-compose.dev.yml logs -f

# 查看最近 100 行
docker-compose -f docker-compose.dev.yml logs --tail=100
```

### Q9: 如何进入 Docker 容器？

```bash
# 进入 PostgreSQL 容器
docker exec -it alp-postgres psql -U postgres -d ai_learning

# 进入 Redis 容器
docker exec -it alp-redis redis-cli

# 进入 MinIO 容器（Bash）
docker exec -it alp-minio sh
```

### Q10: 如何同步团队开发环境？

确保所有团队成员：
1. 使用相同版本的 Go（1.21+）
2. 使用相同的依赖版本（go.lock）
3. 使用相同的配置模板（.env.example）
4. 遵循相同的代码规范

---

## 附录

### A. 有用的 Git 命令速查

```bash
# 查看状态
git status

# 查看差异
git diff
git diff --staged

# 添加文件
git add file
git add .
git add -u  # 添加已跟踪文件的修改

# 提交
git commit -m "message"
git commit -am "message"  # 添加并提交已跟踪文件

# 拉取/推送
git pull
git push
git push -u origin branch  # 推送并设置上游

# 分支操作
git branch          # 查看本地分支
git branch -r       # 查看远程分支
git branch -a       # 查看所有分支
git branch -d branch  # 删除本地分支
git branch -D branch  # 强制删除本地分支

# 标签操作
git tag             # 查看标签
git tag v1.0.0      # 创建标签
git push --tags     # 推送标签

# 远程操作
git remote -v       # 查看远程仓库
git remote add origin url  # 添加远程仓库
```

### B. 快捷键

```bash
# VS Code
Ctrl+Shift+P      # 命令面板
Ctrl+`            # 打开终端
Ctrl+P            # 快速打开文件
Ctrl+Shift+F      # 全局搜索

# Git Bash / Terminal
Ctrl+C            # 中断当前命令
Ctrl+L            # 清屏
Ctrl+R            # 搜索历史命令
Tab               # 自动补全
```

### C. 团队联系

- 项目负责人：[姓名] ([email])
- 技术支持：[姓名] ([email])
- Issues: https://github.com/your-org/ai-learning-platform/issues

---

**最后更新**: 2026-04-24  
**维护者**: 开发团队
