# 🌐 Nginx 反向代理使用指南

## 📋 概述

本项目使用 Docker + Nginx 实现反向代理,提供以下功能:

- ✅ **统一入口**: 通过 `http://localhost` 访问整个应用
- ✅ **自动转发**: 
  - 前端请求 → React 开发服务器 (5173)
  - API 请求 → Go 后端服务 (8080)
  - WebSocket → 后端实时通信
- ✅ **新标签页打开**: 点击链接自动在新标签页中打开
- ✅ **CORS 支持**: 自动处理跨域请求
- ✅ **Gzip 压缩**: 优化传输性能
- ✅ **缓存控制**: 静态资源长期缓存

---

## 🚀 快速启动

### 方式一: 一键启动所有服务 (推荐)

```bash
./start-all.sh
```

这个脚本会:
1. 启动 Docker 依赖服务 (PostgreSQL, Redis, MinIO, Nginx)
2. 询问是否运行数据库迁移
3. 在新窗口中启动 React 前端
4. 询问是否在后台启动 Go 后端
5. 显示所有服务的访问地址

### 方式二: 分步启动

#### 1. 启动 Docker 服务

```bash
docker compose -f docker-compose.dev.yml up -d
```

这将启动:
- PostgreSQL (端口 5432)
- Redis (端口 6379)
- MinIO (端口 9000, 9001)
- **Nginx** (端口 80, 443) ⭐

#### 2. 启动 React 前端

```bash
cd web/react-app
npm run dev
```

前端运行在: http://localhost:5173

#### 3. 启动 Go 后端 (可选)

```bash
make dev
# 或
go run cmd/server/main.go
```

后端运行在: http://localhost:8080

---

## 🎯 访问地址

启动后,你可以通过以下地址访问:

| 服务 | 地址 | 说明 |
|------|------|------|
| **主入口 (Nginx)** | http://localhost | ⭐ 推荐使用 |
| React 前端 | http://localhost:5173 | 直接访问前端 |
| Go 后端 API | http://localhost:8080 | 直接访问后端 |
| 健康检查 | http://localhost/health | 检查服务状态 |
| PostgreSQL | localhost:5432 | 数据库 |
| Redis | localhost:6379 | 缓存 |
| MinIO | http://localhost:9000 | 对象存储 |
| MinIO Console | http://localhost:9001 | 存储管理界面 |

---

## 🔗 新标签页打开功能

### 已实现的功能

所有页面中的可点击元素都会在新标签页中打开:

1. **导航栏**
   - Logo 点击 → 首页
   - 登录按钮 → 登录页面

2. **英雄区域**
   - "开始学习" 按钮 → `/start-learning`
   - "了解更多" 按钮 → `/docs`

3. **功能特性卡片** (点击任意卡片)
   - AI 智能对话 → `/ai-chat`
   - 代码辅助 → `/code-assist`
   - 进度追踪 → `/progress`
   - 智能题库 → `/exercises`

4. **热门课程卡片** (点击任意课程)
   - Python 基础 → `/course/python-basic`
   - JavaScript 进阶 → `/course/js-advanced`
   - React 开发 → `/course/react-dev`
   - Go 语言入门 → `/course/go-intro`

5. **页脚链接**
   - 产品、支持、关于等所有链接

### 技术实现

使用 `window.open()` API:

```javascript
const openInNewTab = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
```

参数说明:
- `_blank`: 在新标签页/窗口中打开
- `noopener`: 防止新页面对原页面的安全威胁
- `noreferrer`: 不发送 Referer 头,保护隐私

---

## 🛠️ Nginx 管理

### 使用管理脚本

```bash
# 启动 Nginx
./nginx-manager.sh start

# 停止 Nginx
./nginx-manager.sh stop

# 重启 Nginx
./nginx-manager.sh restart

# 重载配置 (不中断服务)
./nginx-manager.sh reload

# 查看状态
./nginx-manager.sh status

# 查看日志
./nginx-manager.sh logs

# 测试配置文件
./nginx-manager.sh test-config
```

### 手动 Docker 命令

```bash
# 查看 Nginx 容器状态
docker ps | grep alp-nginx

# 查看日志
docker logs -f alp-nginx

# 重启容器
docker restart alp-nginx

# 进入容器
docker exec -it alp-nginx sh

# 测试配置
docker exec alp-nginx nginx -t

# 重载配置
docker exec alp-nginx nginx -s reload
```

---

## 📝 Nginx 配置说明

### 主要配置项

配置文件: `deployments/nginx/nginx.conf`

#### 1. 上游服务器

```nginx
upstream frontend {
    server host.docker.internal:5173;  # React 前端
}

upstream backend {
    server host.docker.internal:8080;  # Go 后端
}
```

> **注意**: `host.docker.internal` 是 Docker 访问宿主机的特殊域名

#### 2. 路由规则

```nginx
# 前端应用 (默认)
location / {
    proxy_pass http://frontend;
}

# API 请求
location /api/ {
    proxy_pass http://backend;
}

# WebSocket 连接
location /ws/ {
    proxy_pass http://backend;
    # WebSocket 升级支持
}
```

#### 3. CORS 配置

自动为 API 请求添加 CORS 头:

```nginx
add_header Access-Control-Allow-Origin "*" always;
add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
```

#### 4. Gzip 压缩

启用多种文件类型的压缩:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript ...;
```

#### 5. 缓存策略

```nginx
# 静态资源缓存 1 年
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 不缓存
location / {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

---

## 🔧 常见问题

### Q1: Nginx 无法连接到前端/后端?

**原因**: Docker 容器无法访问宿主机的服务

**解决方案**:

1. 确保前端/后端正在运行:
   ```bash
   # 检查前端
   curl http://localhost:5173
   
   # 检查后端
   curl http://localhost:8080/health
   ```

2. 如果使用 Linux,可能需要使用宿主机 IP:
   ```bash
   # 获取宿主机 IP
   hostname -I
   
   # 修改 nginx.conf,替换 host.docker.internal
   server 192.168.x.x:5173;
   ```

3. macOS/Windows 用户可以直接使用 `host.docker.internal`

### Q2: 点击链接没有在新标签页打开?

**检查**:
1. 浏览器是否阻止了弹窗
2. 查看浏览器控制台是否有错误
3. 确认使用的是最新版本的代码

**解决**:
- 允许浏览器的弹窗
- 清除浏览器缓存并刷新页面

### Q3: 如何修改 Nginx 配置?

1. 编辑配置文件:
   ```bash
   vim deployments/nginx/nginx.conf
   ```

2. 测试配置:
   ```bash
   ./nginx-manager.sh test-config
   ```

3. 重载配置:
   ```bash
   ./nginx-manager.sh reload
   ```

### Q4: 如何查看 Nginx 日志?

```bash
# 实时查看日志
./nginx-manager.sh logs

# 或
docker logs -f alp-nginx

# 查看错误日志
docker exec alp-nginx cat /var/log/nginx/error.log

# 查看访问日志
docker exec alp-nginx cat /var/log/nginx/access.log
```

### Q5: 生产环境如何部署?

1. 构建前端:
   ```bash
   cd web/react-app
   npm run build
   ```

2. 修改 Nginx 配置,指向构建产物:
   ```nginx
   location / {
       root /usr/share/nginx/html;
       try_files $uri $uri/ /index.html;
   }
   ```

3. 使用生产 Docker Compose:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

---

## 📊 监控和调试

### 查看服务状态

```bash
# 所有容器状态
docker compose -f docker-compose.dev.yml ps

# 特定容器
docker ps | grep nginx
```

### 性能测试

```bash
# 测试前端响应时间
curl -o /dev/null -s -w "Time: %{time_total}s\n" http://localhost

# 测试 API 响应时间
curl -o /dev/null -s -w "Time: %{time_total}s\n" http://localhost/api/v1/users/profile
```

### 网络调试

```bash
# 查看 Nginx 网络连接
docker exec alp-nginx netstat -tuln

# 测试 upstream 连接
docker exec alp-nginx wget -qO- http://host.docker.internal:5173
```

---

## 🎓 进阶配置

### 添加 HTTPS

1. 使用 Let's Encrypt 获取证书
2. 更新 Nginx 配置:
   ```nginx
   server {
       listen 443 ssl http2;
       ssl_certificate /etc/ssl/certs/cert.pem;
       ssl_certificate_key /etc/ssl/private/key.pem;
       
       # ... 其他配置
   }
   
   server {
       listen 80;
       return 301 https://$server_name$request_uri;
   }
   ```

### 负载均衡

```nginx
upstream backend {
    server backend1:8080;
    server backend2:8080;
    server backend3:8080;
}
```

### 限流保护

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://backend;
}
```

---

## 📚 相关文档

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Docker 网络](https://docs.docker.com/network/)
- [React 路由](https://reactrouter.com/)
- [项目启动指南](../STARTUP_GUIDE.md)
- [升级总结](../UPGRADE_SUMMARY.md)

---

## 💡 最佳实践

1. **始终使用 Nginx 作为入口**: 便于统一管理和配置
2. **定期清理日志**: 避免磁盘空间占用过多
3. **监控性能指标**: 响应时间、错误率等
4. **备份配置文件**: 修改前做好备份
5. **使用环境变量**: 敏感信息不要硬编码
6. **启用 Gzip**: 显著减少传输大小
7. **合理设置缓存**: 平衡性能和数据新鲜度

---

**享受你的 Nginx 反向代理!** 🎉

如有问题,请查看日志或提交 Issue。
