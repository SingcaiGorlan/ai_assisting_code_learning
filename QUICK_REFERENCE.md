# 项目维护快速参考

## 🧹 清理命令

```bash
# 日常清理（推荐每周执行）
make clean

# 深度清理（包括 node_modules，推荐每月执行）
make clean-all

# 使用清理脚本
./scripts/clean.sh
```

## 📁 重要目录

| 目录 | 用途 | 是否提交 |
|------|------|----------|
| `cmd/` | 应用入口 | ✅ 是 |
| `internal/` | 后端核心代码 | ✅ 是 |
| `web/` | 前端项目 | ✅ 是（除 node_modules） |
| `deployments/` | 部署配置 | ✅ 是 |
| `configs/` | 应用配置 | ✅ 是（模板） |
| `docs/` | 技术文档 | ✅ 是 |
| `scripts/` | 自动化脚本 | ✅ 是 |
| `logs/` | 日志文件 | ❌ 否 |
| `tmp/` | 临时文件 | ❌ 否 |
| `bin/` | 编译产物 | ❌ 否 |
| `node_modules/` | 前端依赖 | ❌ 否 |

## 🔧 常用命令

### 开发

```bash
# 启动后端（热重载）
make dev

# 启动前端
cd web/app && npm run dev
cd web/admin && npm run dev
cd web/react-app && npm run dev

# 启动所有服务（Docker）
make docker-up
```

### 构建

```bash
# 构建项目
make build

# 构建 Docker 镜像
docker build -t ai-learning-platform .
```

### 测试

```bash
# 运行测试
make test

# 代码检查
make lint
```

### 数据库

```bash
# 运行迁移
make migrate

# 启动数据库服务
make docker-up
```

## 📝 配置文件

| 文件 | 说明 | 是否提交 |
|------|------|----------|
| `.env.example` | 环境变量模板 | ✅ 是 |
| `.env.local` | 本地配置 | ❌ 否 |
| `.env` | 生产配置 | ❌ 否 |
| `configs/config.yaml` | 默认配置 | ✅ 是 |
| `configs/config.local.yaml` | 本地配置 | ⚠️ 可选 |

## 📚 文档导航

- **项目结构**: [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)
- **文档索引**: [docs/README.md](./docs/README.md)
- **整理报告**: [docs/FILE_ORGANIZATION_REPORT.md](./docs/FILE_ORGANIZATION_REPORT.md)
- **设置指南**: [docs/SETUP_CHECKLIST.md](./docs/SETUP_CHECKLIST.md)
- **贡献指南**: [docs/CONTRIBUTION_GUIDE.md](./docs/CONTRIBUTION_GUIDE.md)

## ⚠️ 注意事项

1. **不要提交的文件**:
   - `.env`, `.env.local` 等环境配置
   - `logs/` 目录下的日志
   - `tmp/` 和 `bin/` 目录
   - `node_modules/` 目录
   - IDE 配置文件（`.vscode/`, `.idea/`）

2. **必须提交的文件**:
   - `.env.example` - 环境变量模板
   - 所有源代码文件
   - 配置文件模板
   - 文档文件

3. **定期维护**:
   - 每周运行 `make clean`
   - 每月更新依赖
   - 每季度审查文档

## 🆘 常见问题

### Q: 如何清理所有 node_modules？
```bash
make clean-all
# 或手动执行
find web -name 'node_modules' -type d -prune -exec rm -rf {} +
```

### Q: 日志文件太大怎么办？
```bash
# 清理日志
make clean
# 或手动清理
rm -rf logs/*
```

### Q: 如何查看被忽略的文件？
```bash
git status --ignored
```

### Q: 编译产物在哪里？
- Go 编译产物: `tmp/` 或 `bin/`
- 前端构建产物: `web/*/dist/` 或 `web/*/build/`

---

**提示**: 将此文件加入书签，方便日常查阅！
