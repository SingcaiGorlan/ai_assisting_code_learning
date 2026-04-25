# 本地数据库设置指南

## 选项 1：使用 Docker/Podman（推荐）

### 安装 Docker（Windows）
1. 下载 Docker Desktop: https://www.docker.com/products/docker-desktop
2. 安装后启动 Docker Desktop
3. 运行：
```powershell
cd e:/ai_assisting_code_learning
docker compose -f docker-compose.dev.yml up -d
```

### 安装 Podman（替代方案）
```powershell
winget install RedHat.Podman
podman machine init
podman machine start
cd e:/ai_assisting_code_learning
podman compose -f docker-compose.dev.yml up -d
```

## 选项 2：使用本地 PostgreSQL

### 安装 PostgreSQL

**Windows (安装包)**
1. 下载: https://www.postgresql.org/download/windows/
2. 安装时记住设置的用户名和密码

**Windows (Chocolatey)**
```powershell
choco install postgresql
```

### 配置数据库

1. 创建数据库：
```sql
CREATE DATABASE ai_learning;
```

2. 创建用户（如果需要）：
```sql
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE ai_learning TO postgres;
```

3. 初始化表结构：
```sql
-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 学习记录表
CREATE TABLE IF NOT EXISTS learning_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    topic VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    ai_feedback TEXT,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI 对话记录表
CREATE TABLE IF NOT EXISTS ai_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI 消息表
CREATE TABLE IF NOT EXISTS ai_messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tokens INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 代码片段表
CREATE TABLE IF NOT EXISTS code_snippets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 更新配置文件

如果使用本地 PostgreSQL 且配置不同，修改 `configs/config.yaml`：

```yaml
database:
  driver: "postgres"
  host: "localhost"
  port: 5432
  username: "your_username"
  password: "your_password"
  database: "ai_learning"
  ssl_mode: "disable"
```

## 验证数据库连接

运行迁移程序：
```powershell
cd e:/ai_assisting_code_learning
go run ./cmd/migrate/main.go
```

成功输出：
```
数据库连接成功！
数据库迁移完成！
```

## 常见问题

### 连接失败
- 检查 PostgreSQL 服务是否运行
- 验证用户名和密码
- 确认数据库名称正确
- 检查端口是否被占用（默认 5432）

### 权限问题
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Windows 上连接 localhost
如果连接失败，尝试使用 127.0.0.1：
```yaml
database:
  host: "127.0.0.1"
```
