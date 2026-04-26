# 🚀 SSH/远程服务器启动指南

## ❓ 问题说明

如果你看到错误 `Error: DISPLAY not set!`,说明你在 **SSH** 或**无图形界面**的环境中运行。

这是因为原脚本尝试打开新的终端窗口,但远程服务器没有图形界面。

---

## ✅ 解决方案

### 方式一: 使用简化版启动脚本 (推荐)

我们创建了专门用于 SSH/远程环境的启动脚本:

```bash
./start-simple.sh
```

这个脚本会:
- ✅ 在后台启动 React 前端
- ✅ 在后台启动 Go 后端
- ✅ 启动 Docker 依赖服务
- ✅ 所有服务都在后台运行
- ✅ 不需要图形界面

### 方式二: 手动分步启动

如果不想使用脚本,可以手动执行:

#### 1. 配置 Docker 权限

```bash
sudo usermod -aG docker $USER
su - $USER  # 刷新权限
```

#### 2. 启动 Docker 服务

```bash
docker compose -f docker-compose.dev.yml up -d
```

#### 3. 启动 React 前端 (新终端或后台)

**选项 A: 使用 screen/tmux (推荐)**
```bash
# 安装 tmux
sudo apt install tmux

# 创建新会话
tmux new -s frontend

# 在前端会话中运行
cd web/react-app && npm run dev

# 按 Ctrl+B, 然后按 D 退出会话 (服务继续运行)
```

**选项 B: 后台运行**
```bash
nohup bash -c "cd web/react-app && npm run dev" > frontend.log 2>&1 &
echo $! > frontend.pid
```

#### 4. 启动 Go 后端 (后台)

```bash
nohup go run cmd/server/main.go > backend.log 2>&1 &
echo $! > backend.pid
```

---

## 📋 使用 start-simple.sh

### 启动所有服务

```bash
./start-simple.sh
```

脚本会询问:
1. 是否运行数据库迁移 (y/n)
2. 自动在后台启动前端和后端

### 查看日志

```bash
# 前端日志
tail -f frontend.log

# 后端日志
tail -f backend.log

# Nginx 日志
docker logs -f alp-nginx

# 所有 Docker 服务日志
docker compose -f docker-compose.dev.yml logs -f
```

### 停止所有服务

```bash
./stop-all.sh
```

这会:
- 停止前端进程
- 停止后端进程
- 停止 Docker 容器

---

## 🎯 访问地址

启动后访问:

| 服务 | URL |
|------|-----|
| **主入口 (Nginx)** | http://localhost |
| React 前端 | http://localhost:5173 |
| Go 后端 API | http://localhost:8080 |
| 健康检查 | http://localhost/health |

> ⚠️ **注意**: 如果是远程服务器,需要将 `localhost` 替换为服务器 IP 地址

---

## 🔍 故障排查

### 问题 1: 端口被占用

**检查端口占用:**
```bash
# 检查 5173 端口 (前端)
lsof -i :5173

# 检查 8080 端口 (后端)
lsof -i :8080

# 检查 80 端口 (Nginx)
sudo lsof -i :80
```

**解决:**
```bash
# 杀死占用端口的进程
kill <PID>

# 或删除 PID 文件重新启动
rm -f frontend.pid backend.pid
./start-simple.sh
```

### 问题 2: 前端无法访问

**检查前端是否运行:**
```bash
curl http://localhost:5173
```

**查看前端日志:**
```bash
tail -f frontend.log
```

**重启前端:**
```bash
# 停止旧进程
if [ -f frontend.pid ]; then kill $(cat frontend.pid); fi

# 重新启动
nohup bash -c "cd web/react-app && npm run dev" > frontend.log 2>&1 &
echo $! > frontend.pid
```

### 问题 3: Docker 容器未启动

**检查容器状态:**
```bash
docker compose -f docker-compose.dev.yml ps
```

**重启容器:**
```bash
docker compose -f docker-compose.dev.yml restart
```

**查看容器日志:**
```bash
docker compose -f docker-compose.dev.yml logs nginx
```

### 问题 4: Nginx 无法连接后端

**原因**: `host.docker.internal` 在 Linux 上可能不可用

**解决**: 修改 Nginx 配置使用宿主机 IP

```bash
# 获取宿主机 IP
hostname -I

# 编辑 Nginx 配置
vim deployments/nginx/nginx.conf

# 替换 host.docker.internal 为实际 IP
# 例如: server 192.168.1.100:5173;

# 重载 Nginx
docker exec alp-nginx nginx -s reload
```

或者在 `/etc/hosts` 中添加:
```bash
echo "172.17.0.1 host.docker.internal" | sudo tee -a /etc/hosts
```

---

## 🛠️ 常用命令速查

### 服务管理

```bash
# 启动所有
./start-simple.sh

# 停止所有
./stop-all.sh

# 查看进程状态
ps aux | grep -E "node|go run"

# 查看 PID 文件
cat frontend.pid
cat backend.pid
```

### 日志查看

```bash
# 实时查看前端日志
tail -f frontend.log

# 实时查看后端日志
tail -f backend.log

# 查看最后 100 行
tail -n 100 frontend.log

# 搜索错误
grep -i error frontend.log
```

### Docker 管理

```bash
# 查看所有容器
docker ps

# 查看容器日志
docker logs -f alp-nginx

# 重启特定服务
docker restart alp-nginx

# 进入容器
docker exec -it alp-nginx sh

# 停止所有容器
docker compose -f docker-compose.dev.yml down
```

### 网络调试

```bash
# 测试前端连通性
curl http://localhost:5173

# 测试后端连通性
curl http://localhost:8080/health

# 测试 Nginx
curl http://localhost

# 查看端口监听
sudo netstat -tuln | grep -E "80|5173|8080"
```

---

## 💡 最佳实践

### 1. 使用 systemd 管理服务 (生产环境)

创建 systemd 服务文件:

```bash
# /etc/systemd/system/ai-learning-frontend.service
[Unit]
Description=AI Learning Platform Frontend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/ai_assisting_code_learning/web/react-app
ExecStart=/usr/bin/npm run dev
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# /etc/systemd/system/ai-learning-backend.service
[Unit]
Description=AI Learning Platform Backend
After=network.target docker.service
Requires=docker.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/ai_assisting_code_learning
ExecStart=/usr/bin/go run cmd/server/main.go
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启用服务:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ai-learning-frontend
sudo systemctl enable ai-learning-backend
sudo systemctl start ai-learning-frontend
sudo systemctl start ai-learning-backend
```

### 2. 使用 PM2 管理 Node.js 进程

```bash
# 安装 PM2
npm install -g pm2

# 启动前端
cd web/react-app
pm2 start npm --name "frontend" -- run dev

# 查看状态
pm2 status

# 查看日志
pm2 logs frontend

# 停止
pm2 stop frontend
```

### 3. 定期清理日志

```bash
# 清理日志文件 (保留最近 1000 行)
tail -n 1000 frontend.log > frontend.log.tmp && mv frontend.log.tmp frontend.log
tail -n 1000 backend.log > backend.log.tmp && mv backend.log.tmp backend.log
```

### 4. 监控资源使用

```bash
# 查看进程资源使用
top -p $(cat frontend.pid),$(cat backend.pid)

# 查看内存使用
ps -p $(cat frontend.pid) -o pid,vsz,rss,comm
ps -p $(cat backend.pid) -o pid,vsz,rss,comm
```

---

## 📊 架构图 (远程部署)

```
客户端浏览器
    ↓
http://服务器IP
    ↓
┌─────────────────────┐
│   Nginx (Docker)     │ 端口 80
└──┬──────────┬───────┘
   │          │
   │ /api/*   │ /*
   ↓          ↓
┌────────┐ ┌──────────┐
│ Go后端  │ │React前端  │
│ :8080  │ │ :5173    │
└────────┘ └──────────┘
   ↓
┌─────────────────────┐
│  Docker 网络         │
│ • PostgreSQL        │
│ • Redis             │
│ • MinIO             │
└─────────────────────┘
```

---

## 🎓 进阶配置

### 配置防火墙

```bash
# 允许 HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 如果需要直接访问前端/后端
sudo ufw allow 5173/tcp
sudo ufw allow 8080/tcp

# 启用防火墙
sudo ufw enable
```

### 配置域名

1. 在 DNS 提供商处添加 A 记录指向服务器 IP
2. 修改 Nginx 配置:
   ```nginx
   server_name your-domain.com;
   ```
3. 使用 Let's Encrypt 获取 SSL 证书:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### 性能优化

1. **增加文件描述符限制**:
   ```bash
   ulimit -n 65536
   ```

2. **调整 Nginx worker 进程**:
   ```nginx
   worker_processes auto;
   worker_connections 4096;
   ```

3. **启用 HTTP/2**:
   ```nginx
   listen 443 ssl http2;
   ```

---

## 📚 相关文档

- [完整启动指南](STARTUP_GUIDE.md)
- [Nginx 配置指南](NGINX_GUIDE.md)
- [Docker 权限配置](DOCKER_PERMISSIONS.md)
- [快速参考卡片](QUICK_REFERENCE.md)

---

**现在可以使用 `./start-simple.sh` 启动所有服务了!** 🎉
