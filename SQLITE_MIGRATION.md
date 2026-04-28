# SQLite 数据库迁移指南

## 📋 概述

项目已从 PostgreSQL + Redis 迁移到 **SQLite**，实现单一文件数据存储，简化部署和运维。

## ✅ 主要变更

### 1. 数据库架构变更

**之前:**
- PostgreSQL (外部数据库服务)
- Redis (外部缓存服务)

**现在:**
- SQLite (嵌入式数据库，单一文件)

### 2. 技术栈简化

| 组件 | 之前 | 现在 | 优势 |
|------|------|------|------|
| 数据库 | PostgreSQL 15 | SQLite 3 | 无需安装，零配置 |
| 缓存 | Redis 7 | 内存/应用层 | 无外部依赖 |
| 部署复杂度 | 高 (多服务) | 低 (单文件) | 简化运维 |
| 数据文件 | 多个目录 | 单一文件 | 便于备份 |

### 3. 配置文件变更

#### configs/config.yaml

**之前:**
```yaml
database:
  driver: "postgres"
  host: "localhost"
  port: 5432
  username: "postgres"
  password: "postgres"
  database: "ai_learning"
  ssl_mode: "disable"

redis:
  host: "localhost"
  port: 6379
  password: ""
  db: 0
```

**现在:**
```yaml
database:
  driver: "sqlite"
  path: "./data/ai_learning.db"
```

#### .env.example

**之前:**
```bash
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ai_learning
DB_PORT=5432
REDIS_PORT=6379
REDIS_PASSWORD=
```

**现在:**
```bash
ALP_DB_PATH=./data/ai_learning.db
```

### 4. 代码变更

#### internal/pkg/config/config.go

移除了 `RedisConfig` 结构体，简化了 `DatabaseConfig`:

```go
type DatabaseConfig struct {
    Driver string `mapstructure:"driver"`
    Path   string `mapstructure:"path"` // SQLite数据库文件路径
}
```

#### internal/app/app.go

移除了 Redis 初始化，使用 SQLite:

```go
import "gorm.io/driver/sqlite"

func initDatabase(cfg config.DatabaseConfig) (*gorm.DB, error) {
    // Ensure directory exists
    dir := filepath.Dir(cfg.Path)
    if dir != "." && dir != "" {
        if err := os.MkdirAll(dir, 0755); err != nil {
            return nil, fmt.Errorf("failed to create data directory: %w", err)
        }
    }

    // Open SQLite database
    db, err := gorm.Open(sqlite.Open(cfg.Path), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    
    return db, nil
}
```

## 🚀 迁移步骤

### 1. 更新 Go 依赖

```bash
go mod tidy
```

这将添加 SQLite 驱动并移除 PostgreSQL 和 Redis 依赖。

### 2. 创建数据目录

```bash
mkdir -p data
```

### 3. 更新配置文件

```bash
# 复制示例配置
cp .env.example .env.local

# 编辑 .env.local，设置数据库路径（可选）
# ALP_DB_PATH=./data/ai_learning.db
```

### 4. 运行数据库迁移

```bash
make migrate
# 或
go run cmd/migrate/main.go
```

### 5. 启动应用

```bash
# 开发模式
make dev

# 或直接运行
go run cmd/server/main.go
```

## 📊 SQLite 优势

### 1. 零配置
- ❌ 无需安装数据库服务
- ❌ 无需配置用户权限
- ❌ 无需管理连接池
- ✅ 开箱即用

### 2. 易于部署
- 📦 单一可执行文件 + 数据文件
- 💾 数据文件体积小 (< 1GB 通常足够)
- 🔄 备份只需复制一个文件
- 🚀 部署简单快速

### 3. 跨平台支持
- Windows ✓
- macOS ✓
- Linux ✓
- 任何支持 SQLite 的平台 ✓

### 4. 性能特点
- ⚡ 读取速度快
- 💪 并发写入优化
- 🔧 自动索引
- 📊 适合中小型应用

### 5. 可靠性
- 🔒 ACID 兼容
- 💾 事务安全
- 🛡️ 崩溃恢复
- 📝 完整的事务日志

## ⚠️ 注意事项

### 1. 并发限制
SQLite 默认支持 WAL (Write-Ahead Logging) 模式，可以处理并发读写，但：
- 适合中等并发场景
- 超高并发场景可能需要考虑其他方案

### 2. 文件大小
- 建议单个数据库文件不超过 1GB
- 对于大多数应用场景完全足够
- 定期清理无用数据

### 3. 网络访问
- SQLite 是本地文件系统数据库
- 不支持远程连接
- 如需远程访问，需要通过应用层 API

## 🔧 CLI 命令

所有 CLI 数据库命令已更新为使用 SQLite：

```bash
# 检查数据库状态
./bin/ai-learning-cli db status

# 运行迁移
./bin/ai-learning-cli db migrate

# 填充数据
./bin/ai-learning-cli db seed
```

## 📁 文件结构

```
.
├── data/
│   └── ai_learning.db    # SQLite 数据库文件 (自动生成)
├── configs/
│   └── config.yaml       # 配置文件
└── ...
```

## 🔄 从 PostgreSQL 迁移

如果你有现有的 PostgreSQL 数据，可以使用以下工具迁移：

1. **导出 PostgreSQL 数据**
   ```bash
   pg_dump -U postgres ai_learning > backup.sql
   ```

2. **转换为 SQLite**
   使用工具如 [pg2sqlite](https://github.com/banyan/pg2sqlite)

3. **导入到 SQLite**
   ```bash
   sqlite3 data/ai_learning.db < backup_converted.sql
   ```

## 💡 最佳实践

### 1. 备份策略
```bash
# 简单备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp data/ai_learning.db backups/ai_learning_$DATE.db
```

### 2. 数据库优化
```sql
-- 启用 WAL 模式
PRAGMA journal_mode=WAL;

-- 分析表统计信息
ANALYZE;

-- 检查数据库完整性
PRAGMA integrity_check;
```

### 3. 监控
- 定期检查文件大小
- 监控查询性能
- 清理过期数据

## 🎯 下一步

1. ✅ 完成依赖迁移
2. ✅ 更新配置文件
3. ✅ 修改数据库连接代码
4. ⏳ 实现数据模型迁移逻辑
5. ⏳ 测试所有功能
6. ⏳ 更新文档

## 📞 问题反馈

如有任何问题，请提交 Issue。

---

**更新日期**: 2024年
**数据库版本**: SQLite 3.x
**GORM 驱动**: gorm.io/driver/sqlite v1.5.4
