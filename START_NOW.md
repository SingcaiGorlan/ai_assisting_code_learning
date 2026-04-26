# ⚡ 立即启动指南

## 🎯 当前状态

根据检查,你的系统状态:
- ✅ Go 后端已运行 (端口 8080)
- ✅ PostgreSQL 已运行 (端口 5432)
- ✅ Redis 已运行 (端口 6379)
- ❌ React 前端未运行
- ❌ Nginx 未启动

---

## 🚀 快速启动步骤

### 步骤 1: 刷新 Docker 权限

由于刚添加了 docker 组,需要重新登录才能生效。

**选择以下任一方式:**

#### 方式 A: 使用 su 命令 (最快)
```bash
su - $USER
```
输入你的用户密码后,权限就会生效。

#### 方式 B: 完全注销重登录
- 退出所有终端窗口
- 重新登录系统

#### 方式 C: 重启系统
```bash
sudo reboot
```

> ⚠️ **重要**: 不要使用 `newgrp docker`,这会导致其他问题!

---

### 步骤 2: 验证 Docker 权限

重新登录后,运行:

```bash
docker ps
```

如果能看到容器列表(可能为空),说明权限配置成功!

---

### 步骤 3: 启动剩余服务

#### 选项 A: 一键启动 (推荐)

```bash
./start-simple.sh
```

这个脚本会:
1. 启动 Nginx 和其他 Docker 服务
2. 在后台启动 React 前端
3. 询问是否运行数据库迁移

#### 选项 B: 分步启动

**1. 启动 Nginx:**
```bash
docker compose -f docker-compose.dev.yml up -d nginx
```

**2. 启动 React 前端:**

开发模式 (前台):
```bash
cd web/react-app && npm run dev
```

或后台运行:
```bash
nohup bash -c "cd web/react-app && npm run dev" > frontend.log 2>&1 &
echo $! > frontend.pid
```

---

### 步骤 4: 访问应用

启动完成后,访问:

- 🌐 **主入口**: http://localhost
- ⚛️ **前端直连**: http://localhost:5173
- 🔧 **后端 API**: http://localhost:8080

---

## 📋 完整操作流程

```bash
# 1. 刷新权限 (输入密码)
su - $USER

# 2. 验证 Docker
docker ps

# 3. 一键启动所有服务
cd /home/ubuntu/ai_assisting_code_learning
./start-simple.sh

# 4. 查看状态
./check-status.sh

# 5. 访问 http://localhost
```

---

## 🔍 故障排查

### 问题: 仍然提示 Docker 权限错误

**原因**: 未正确刷新权限

**解决**:
1. 确保使用了 `su - $USER` (注意有横杠)
2. 或完全注销后重新登录
3. 或重启系统

验证:
```bash
groups | grep docker
# 应该看到 docker 在列表中
```

### 问题: 前端启动失败

**检查 Node.js 版本:**
```bash
node --version
# 应该是 v18.x 或更高
```

**安装依赖:**
```bash
cd web/react-app
npm install
```

**手动启动测试:**
```bash
npm run dev
```

### 问题: Nginx 启动失败

**查看日志:**
```bash
docker logs alp-nginx
```

**检查配置文件:**
```bash
docker run --rm -v $(pwd)/deployments/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx:alpine nginx -t
```

---

## 💡 常用命令

```bash
# 检查所有服务状态
./check-status.sh

# 查看前端日志
tail -f frontend.log

# 查看后端日志
tail -f backend.log

# 查看 Nginx 日志
docker logs -f alp-nginx

# 停止所有服务
./stop-all.sh

# 重新启动
./start-simple.sh
```

---

## 📊 预期输出

运行 `./start-simple.sh` 后,你应该看到:

```
🚀 启动 AI 学习平台...

📦 步骤 1: 启动 Docker 依赖服务
[+] Running 4/4
 ✔ Container alp-postgres  Started
 ✔ Container alp-redis     Started
 ✔ Container alp-minio     Started
 ✔ Container alp-nginx     Started

⏳ 等待服务启动...

🔍 检查服务状态...
NAME            STATUS         PORTS
alp-postgres    Up             5432/tcp
alp-redis       Up             6379/tcp
alp-minio       Up             9000/tcp, 9001/tcp
alp-nginx       Up             0.0.0.0:80->80/tcp

✅ Docker 服务启动成功!

⚛️  步骤 3: 启动 React 前端开发服务器 (后台运行)
在后台启动前端...
✅ 前端已启动 (PID: 12345)
查看日志: tail -f frontend.log

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 所有服务启动完成!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 访问地址:
  🌐 Nginx (反向代理): http://localhost
  ⚛️  React 前端:      http://localhost:5173
  🔧 Go 后端 API:     http://localhost:8080
  📊 健康检查:       http://localhost/health
```

---

## 🎓 下一步

启动成功后:

1. **打开浏览器访问**: http://localhost
2. **体验新功能**:
   - 点击任意功能卡片 → 新标签页打开
   - 点击任意课程 → 新标签页打开
   - 所有链接都在新标签页中打开

3. **查看文档**:
   - [Nginx 配置指南](NGINX_GUIDE.md)
   - [SSH 启动指南](SSH_STARTUP_GUIDE.md)
   - [快速参考](QUICK_REFERENCE.md)

---

**准备好了吗?执行 `su - $USER` 然后运行 `./start-simple.sh`!** 🚀
