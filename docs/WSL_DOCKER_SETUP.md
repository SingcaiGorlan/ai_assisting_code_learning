# Windows + WSL Docker 混合环境配置指南

## 环境说明

本项目采用混合开发环境：
- **Go 开发环境**：运行在 Windows 系统
- **数据库服务**（PostgreSQL、Redis、MinIO）：运行在 WSL 的 Docker 中

## 前置要求

1. **Windows 端**：
   - Go 1.21+ 已安装
   - PowerShell 5.0+ 或 CMD

2. **WSL 端**：
   - WSL2 已安装并配置
   - Docker Engine 已安装在 WSL 中
   - 能够使用 `sudo docker` 命令

## 快速开始

### 方式 1：使用启动脚本（推荐）

**PowerShell 方式**：
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```

**CMD 方式**：
```cmd
start.bat
```

脚本会自动：
1. 检查并启动 WSL 中的 Docker 服务
2. 启动 PostgreSQL、Redis、MinIO 容器
3. 等待数据库就绪
4. 创建必要的配置文件
5. 启动 Go 应用服务器

### 方式 2：手动管理 Docker 服务

使用专门的管理脚本：

```powershell
# 查看服务状态
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 status

# 启动服务
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 start

# 停止服务
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 stop

# 重启服务
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 restart

# 查看日志
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 logs
```

### 方式 3：直接在 WSL 中操作

```bash
# 进入项目目录（通过 /mnt/e/...）
cd /mnt/e/ai_assisting_code_learning

# 启动服务
sudo docker-compose -f docker-compose.dev.yml up -d

# 查看状态
sudo docker-compose -f docker-compose.dev.yml ps

# 查看日志
sudo docker-compose -f docker-compose.dev.yml logs -f

# 停止服务
sudo docker-compose -f docker-compose.dev.yml down
```

## 服务端口映射

| 服务 | Windows 访问地址 | 说明 |
|------|-----------------|------|
| PostgreSQL | localhost:5432 | 数据库服务 |
| Redis | localhost:6379 | 缓存服务 |
| MinIO API | localhost:9000 | 对象存储 API |
| MinIO UI | localhost:9001 | 对象存储管理界面 |
| 应用服务器 | localhost:8080 | Go 应用 |

## 常见问题

### 1. Docker 服务无法启动

**问题**：执行 `wsl sudo docker ps` 提示权限错误

**解决**：
```bash
# 在 WSL 中执行
sudo service docker start
```

### 2. 容器拉取镜像超时

**问题**：首次启动时下载镜像超时

**解决**：在 WSL 中配置 Docker 镜像加速器

```bash
# 创建或编辑 Docker 配置
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
EOF

# 重启 Docker 服务
sudo service docker restart
```

### 3. Windows 无法连接 WSL 中的数据库

**问题**：Go 应用连接数据库失败

**检查步骤**：
1. 确认 WSL 中的容器正在运行：
   ```bash
   wsl sudo docker ps
   ```

2. 测试端口连通性：
   ```powershell
   Test-NetConnection localhost -Port 5432
   ```

3. 检查防火墙设置，确保允许本地回环连接

### 4. 配置文件问题

确保 `configs/config.yaml` 中的数据库配置正确：

```yaml
database:
  host: "localhost"  # WSL2 网络与 Windows 互通，使用 localhost 即可
  port: 5432
  username: "postgres"
  password: "postgres"
  database: "ai_learning"
```

## 开发工作流

1. **启动依赖服务**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 start
   ```

2. **启动开发服务器**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
   ```

3. **停止所有服务**：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 stop
   ```

## 注意事项

1. **WSL 路径访问**：在 WSL 中访问 Windows 文件需要通过 `/mnt/[盘符]/` 路径
2. **权限问题**：WSL 中的 Docker 命令需要 `sudo` 权限
3. **网络互通**：WSL2 与 Windows 通过网络互通，可以使用 `localhost` 访问
4. **性能考虑**：跨文件系统操作可能较慢，建议将代码放在 Windows 侧，数据存储在 WSL 侧

## 故障排查

### 检查清单

- [ ] WSL 是否正常运行：`wsl echo "test"`
- [ ] Docker 服务是否启动：`wsl sudo service docker status`
- [ ] 容器是否运行：`wsl sudo docker ps`
- [ ] 端口是否监听：`netstat -ano | findstr "5432"`
- [ ] 配置文件是否正确：检查 `configs/config.yaml`

### 重置环境

如果遇到问题，可以完全重置：

```powershell
# 停止并删除所有容器和数据
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 stop

# 在 WSL 中清理
wsl sudo docker-compose -f /mnt/e/ai_assisting_code_learning/docker-compose.dev.yml down -v

# 重新启动
powershell -ExecutionPolicy Bypass -File scripts/manage-docker.ps1 start
```

## 更多信息

- [WSL2 网络文档](https://docs.microsoft.com/en-us/windows/wsl/networking)
- [Docker Desktop WSL2 后端](https://docs.docker.com/desktop/wsl/)
- [项目主 README](../README.md)
