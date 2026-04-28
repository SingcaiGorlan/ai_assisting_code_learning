# AI 辅助代码学习平台 - 文档中心

欢迎来到项目文档中心！这里包含了项目开发所需的所有文档。

---

## 📚 文档导航

### 入门指南

- **[开发环境配置检查清单](SETUP_CHECKLIST.md)**
  - 新成员必读
  - 完整的环境配置步骤
  - 验证清单确保环境正确

- **[协同开发指南](CONTRIBUTION_GUIDE.md)**
  - 完整的开发流程说明
  - Git 工作流和最佳实践
  - 问题排查和常见问题解答

### 开发规范

- **[代码审查指南](CODE_REVIEW_GUIDE.md)**
  - 代码审查流程和标准
  - 检查清单和最佳实践
  - 审查者与作者的责任

### 项目文档

- **[README.md](../README.md)**
  - 项目概述和功能介绍
  - 快速开始指南
  - API 文档
- **[项目接口图](PROJECT_INTERFACE_DIAGRAM.md)**
  - 项目模块关系和运行接口图

---

## 🚀 快速开始

### 1. 新成员入职流程

```
1. 阅读开发环境配置检查清单
   ↓
2. 按清单配置开发环境
   ↓
3. 阅读协同开发指南
   ↓
4. 熟悉项目代码结构
   ↓
5. 完成第一个小任务
```

### 2. 日常开发流程

```
1. 从 develop 拉取最新代码
   ↓
2. 创建功能分支
   ↓
3. 开发并测试
   ↓
4. 运行代码检查
   ↓
5. 提交代码
   ↓
6. 创建 Pull Request
   ↓
7. 代码审查
   ↓
8. 合并到 develop
```

---

## 📖 文档阅读顺序

### 完全新手

1. [开发环境配置检查清单](SETUP_CHECKLIST.md)
2. [README.md](../README.md) - 项目概述部分
3. [协同开发指南](CONTRIBUTION_GUIDE.md) - 第 1-4 节

### 开发中遇到问题

1. [协同开发指南](CONTRIBUTION_GUIDE.md) - 第 7 节（问题排查）
2. [协同开发指南](CONTRIBUTION_GUIDE.md) - 第 8 节（常见问题 FAQ）
3. [代码审查指南](CODE_REVIEW_GUIDE.md) - 附录 C（代码示例）

### 代码审查者

1. [代码审查指南](CODE_REVIEW_GUIDE.md) - 第 1-3 节
2. [代码审查指南](CODE_REVIEW_GUIDE.md) - 第 5 节（最佳实践）

---

## 🔧 常用命令速查

### Git 命令

```bash
# 拉取最新代码
git checkout develop
git pull origin develop

# 创建功能分支
git checkout -b feature/your-feature

# 提交代码
git add .
git commit -m "feat(module): description"

# 推送到远程
git push -u origin feature/your-feature

# 合并最新代码
git fetch origin
git merge origin/develop
```

### 项目命令

```bash
# 初始化环境
make setup

# 启动开发服务器
make dev

# 运行测试
make test

# 代码检查
make lint

# 启动 Docker 服务
make docker-up

# 停止 Docker 服务
make docker-down
```

### Docker 命令

```bash
# 查看服务状态
docker-compose -f docker-compose.dev.yml ps

# 查看日志
docker-compose -f docker-compose.dev.yml logs -f

# 进入 PostgreSQL 容器
docker exec -it alp-postgres psql -U postgres -d ai_learning

# 进入 Redis 容器
docker exec -it alp-redis redis-cli
```

---

## 📞 获取帮助

### 在项目中求助

1. **查看文档** - 首先查阅本文档中心的文档
2. **搜索 Issue** - 在 GitHub Issues 中搜索类似问题
3. **创建 Issue** - 如果没有现成答案，创建新的 Issue
4. **团队沟通** - 联系项目团队成员

### 文档反馈

如果发现文档有错误或需要改进，请：

1. 修改文档
2. 提交 Pull Request
3. 在 PR 描述中说明改进内容

---

## 📝 文档贡献

我们欢迎所有团队成员帮助改进文档！

### 如何贡献文档

1. **发现文档问题**
   - 信息不准确
   - 内容缺失
   - 表达不清晰

2. **改进文档**
   - 修正错误
   - 添加缺失内容
   - 优化表达

3. **提交更改**
   - 创建文档更新分支
   - 提交 PR
   - 等待审查和合并

### 文档规范

- **Markdown 格式** - 使用标准 Markdown 语法
- **清晰的标题** - 使用多级标题组织内容
- **代码示例** - 提供可运行的代码示例
- **一致性** - 保持术语和格式的一致性

---

## 🔄 文档更新日志

### 2026-04-24
- ✅ 创建开发环境配置检查清单
- ✅ 创建协同开发指南
- ✅ 创建代码审查指南
- ✅ 创建文档中心首页

---

## 📖 外部资源

### Go 语言
- [Go 官方文档](https://go.dev/doc/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)

### 工具
- [Gin 框架文档](https://gin-gonic.com/docs/)
- [GORM 文档](https://gorm.io/docs/)
- [Docker 文档](https://docs.docker.com/)

### 协作
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Pro Git Book](https://git-scm.com/book/zh/v2)

---

## 📌 重要提醒

### 安全注意事项

- ⚠️ 永远不要在代码或 Git 中提交敏感信息
- ⚠️ 使用 `.env.local` 而非 `.env` 存储本地配置
- ⚠️ 定期更新依赖包
- ⚠️ 遵循安全编码规范

### 开发注意事项

- ✅ 提交代码前运行 `make test` 和 `make lint`
- ✅ 保持功能分支小而专注
- ✅ 及时响应代码审查意见
- ✅ 为新功能添加测试

---

**文档维护**: 开发团队  
**最后更新**: 2026-04-24  
**文档版本**: v1.0.0
