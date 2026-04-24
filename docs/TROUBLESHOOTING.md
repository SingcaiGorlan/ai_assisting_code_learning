# 运行失败问题解决方案

## 问题总结

项目编译成功但运行时数据库连接失败，因为 Docker 服务未启动。

## 解决步骤

### 1. 配置 Go 代理（必需）

**问题原因**: GOPROXY 被设置为 `off`，导致依赖下载失败

**解决方法**（Windows PowerShell）:
```powershell
# 方法一：临时设置（推荐）
$env:GOPROXY="https://goproxy.cn,direct"

# 方法二：永久设置（如果环境变量允许）
go env -w GOPROXY=https://goproxy.cn,direct
```

### 2. 启动 Docker 服务

**检查 Docker Desktop 是否运行**:
```powershell
docker ps
```

**如果未运行**:
1. 启动 Docker Desktop 应用程序
2. 等待 Docker 引擎启动（状态栏变为绿色）
3. 再次运行 `docker ps` 验证

**启动项目所需的服务**:
```powershell
# 进入项目目录
cd e:/ai_assisting_code_learning

# 启动 PostgreSQL、Redis、MinIO
docker-compose -f docker-compose.dev.yml up -d

# 查看服务状态
docker-compose -f docker-compose.dev.yml ps
```

**预期输出**:
```
NAME              STATUS         PORTS
alp-minio         Up             0.0.0.0:9000-9001->9000-9001/tcp
alp-postgres       Up             0.0.0.0:5432->5432/tcp
alp-redis         Up             0.0.0.0:6379->6379/tcp
```

### 3. 验证服务连接

**测试 PostgreSQL**:
```powershell
docker exec -it alp-postgres psql -U postgres -d ai_learning -c "SELECT version();"
```

**测试 Redis**:
```powershell
docker exec -it alp-redis redis-cli ping
# 应返回: PONG
```

### 4. 配置环境变量

**编辑 .env.local 文件**:
```bash
# 确保以下配置正确
ALP_DB_HOST=localhost
ALP_DB_PORT=5432
ALP_DB_USER=postgres
ALP_DB_PASSWORD=postgres
ALP_DB_NAME=ai_learning

ALP_REDIS_HOST=localhost
ALP_REDIS_PORT=6379

# 必须配置（即使使用默认值）
OPENAI_API_KEY=your-openai-api-key
ALP_JWT_SECRET=your-jwt-secret-key-change-in-production
```

### 5. 启动应用

**方法一：使用启动脚本（推荐）**:
```powershell
.\start.bat
```

**方法二：直接运行**:
```powershell
# 设置 GOPROXY
$env:GOPROXY="https://goproxy.cn,direct"

# 运行服务器
go run cmd\server\main.go
```

**方法三：运行编译好的可执行文件**:
```powershell
.\tmp\server.exe
```

### 6. 验证应用运行

**测试健康检查接口**:
```powershell
curl http://localhost:8080/health
```

**预期输出**:
```json
{"status":"ok","service":"ai-learning-platform"}
```

**在浏览器访问**:
```
http://localhost:8080/health
```

## 常见错误和解决方案

### 错误 1: GOPROXY=off 导致依赖下载失败

**错误信息**:
```
module lookup disabled by GOPROXY=off
```

**解决方案**:
```powershell
$env:GOPROXY="https://goproxy.cn,direct"
go mod tidy
```

### 错误 2: 数据库连接失败

**错误信息**:
```
failed to connect to database: connection refused
Password authentication failed
```

**解决方案**:
```powershell
# 1. 确认 Docker 服务已启动
docker ps

# 2. 确认 PostgreSQL 容器运行正常
docker logs alp-postgres

# 3. 检查端口是否被占用
netstat -ano | findstr :5432

# 4. 重启 PostgreSQL 容器
docker-compose -f docker-compose.dev.yml restart postgres
```

### 错误 3: 端口被占用

**错误信息**:
```
bind: address already in use
```

**解决方案**:
```powershell
# 查找占用端口的进程
netstat -ano | findstr :8080

# 如果发现占用，可以：
# 1. 停止占用端口的进程
taskkill /PID <进程ID> /F

# 2. 或修改配置文件使用其他端口
# 编辑 configs/config.local.yaml，修改 server.port
```

### 错误 4: 编译错误 - 未使用的导入

**错误信息**:
```
imported and not used
```

**解决方案**:
```powershell
# 运行代码检查
golangci-lint run ./...

# 或使用 goimports 自动整理
goimports -w ./...
```

### 错误 5: Air 热重载未安装

**错误信息**:
```
air: command not found
```

**解决方案**:
```powershell
# 安装 Air
go install github.com/cosmtrek/air@latest

# 确保 $GOPATH\bin 在 PATH 中
echo $env:GOPATH\bin

# 如果不在 PATH，临时添加
$env:PATH += ";$env:GOPATH\bin"
```

## 快速启动命令汇总

```powershell
# 1. 设置 GOPROXY
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 下载依赖
go mod tidy

# 3. 启动 Docker 服务
docker-compose -f docker-compose.dev.yml up -d

# 4. 编译项目
go build -o tmp\server.exe .\cmd\server

# 5. 运行服务器
.\tmp\server.exe

# 或直接运行
go run .\cmd\server\main.go
```

## 开发工作流

### 日常开发

```powershell
# 1. 设置 GOPROXY（每次打开终端都需设置）
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 拉取最新代码
git pull origin develop

# 3. 更新依赖
go mod tidy

# 4. 运行开发服务器
go run .\cmd\server\main.go
```

### 使用 Air 热重载

```powershell
# 1. 安装 Air（仅需一次）
go install github.com/cosmtrek/air@latest

# 2. 确保 $GOPATH\bin 在 PATH
$env:PATH += ";$env:GOPATH\bin"

# 3. 使用 Air 启动（自动重启）
air -c .air.toml
```

## 永久配置 GOPROXY（可选）

**通过系统环境变量**:
1. 右键点击"此电脑" → 属性
2. 高级系统设置 → 环境变量
3. 新建系统变量：
   - 变量名: `GOPROXY`
   - 变量值: `https://goproxy.cn,direct`

**通过 PowerShell 配置文件**:
```powershell
# 编辑 PowerShell 配置文件
notepad $PROFILE

# 添加以下行
$env:GOPROXY="https://goproxy.cn,direct"
```

## 检查清单

运行项目前确认以下项目：

- [ ] Docker Desktop 已启动
- [ ] Docker 服务已运行（PostgreSQL、Redis）
- [ ] GOPROXY 已设置（非 off）
- [ ] .env.local 文件已创建并配置
- [ ] configs/config.local.yaml 文件已创建
- [ ] Go 依赖已下载（go mod tidy）
- [ ] 项目编译成功（go build）

## 获取帮助

如果问题仍未解决：

1. 查看项目文档
   - [开发环境配置检查清单](SETUP_CHECKLIST.md)
   - [协同开发指南](CONTRIBUTION_GUIDE.md)

2. 检查日志
   ```powershell
   # Docker 服务日志
   docker-compose -f docker-compose.dev.yml logs

   # 应用日志
   type logs\app.log
   ```

3. 联系团队
   - 在项目 Issues 中提问
   - 联系项目维护者

---

**最后更新**: 2026-04-24
