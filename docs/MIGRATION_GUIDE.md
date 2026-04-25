# 数据库迁移运行指南

## 如何运行 migrate 程序

### 前提条件

在运行 `migrate` 之前，你必须有一个可用的 PostgreSQL 数据库。有以下几种方式：

### 方式 1：使用 Docker Desktop（推荐）

1. **安装 Docker Desktop**
   - 访问 https://www.docker.com/products/docker-desktop
   - 下载并安装 Windows 版本

2. **启动数据库服务**
   ```powershell
   cd e:/ai_assisting_code_learning
   docker compose -f docker-compose.dev.yml up -d postgres
   ```

3. **运行迁移**
   ```powershell
   go run ./cmd/migrate/main.go
   ```

### 方式 2：使用 Podman

1. **安装 Podman**
   ```powershell
   winget install RedHat.Podman
   ```

2. **初始化并启动 Podman**
   ```powershell
   podman machine init
   podman machine start
   ```

3. **启动数据库**
   ```powershell
   podman compose -f e:/ai_assisting_code_learning/docker-compose.dev.yml up -d
   ```

4. **运行迁移**
   ```powershell
   cd e:/ai_assisting_code_learning
   go run ./cmd/migrate/main.go
   ```

### 方式 3：本地安装 PostgreSQL

1. **下载安装**
   - 访问 https://www.postgresql.org/download/windows/
   - 下载并安装 PostgreSQL（建议版本 15）

2. **创建数据库**
   打开 pgAdmin 或使用命令行：
   ```sql
   CREATE DATABASE ai_learning;
   ```

3. **修改配置文件**
   编辑 `configs/config.yaml`，确保密码与你安装时设置的一致：
   ```yaml
   database:
     driver: "postgres"
     host: "localhost"
     port: 5432
     username: "postgres"
     password: "你的密码"  # 改成实际的密码
     database: "ai_learning"
     ssl_mode: "disable"
   ```

4. **运行迁移**
   ```powershell
   cd e:/ai_assisting_code_learning
   go run ./cmd/migrate/main.go
   ```

## migrate 程序做什么

`cmd/migrate/main.go` 程序会：

1. **读取配置** - 从 `configs/config.yaml` 加载数据库配置
2. **连接数据库** - 使用 GORM 连接到 PostgreSQL
3. **执行迁移** - 在数据库中创建表结构（当前为简化版，仅测试连接）

## 成功输出示例

```
2026/04/25 08:41:00 数据库连接成功
2026/04/25 08:41:00 迁移完成
```

## 常见错误

### 1. 连接失败

```
failed to connect to `host=localhost user=postgres database=ai_learning`: connection refused
```

**解决方案**：
- 确认 PostgreSQL 服务正在运行
- 检查 `configs/config.yaml` 中的端口是否正确（默认 5432）
- 如果使用 Docker，确认容器已启动

### 2. 认证失败

```
failed SASL auth (Password 认证失败)
```

**解决方案**：
- 检查 `configs/config.yaml` 中的密码是否正确
- 如果使用 Docker，密码默认是 `postgres`

### 3. 数据库不存在

```
database "ai_learning" does not exist
```

**解决方案**：
- 先创建数据库：
  ```sql
  CREATE DATABASE ai_learning;
  ```

## 当前限制

当前的 `migrate` 程序只是连接测试，还未实现完整的迁移逻辑。完整的迁移功能需要：

- 定义 GORM 模型
- 使用 `db.AutoMigrate()` 自动创建表
- 添加数据初始化逻辑

## 下一步

运行迁移成功后，你可以：

1. 启动应用服务器：
   ```powershell
   go run ./cmd/server/main.go
   ```

2. 测试 API 接口

3. 开始开发业务功能
