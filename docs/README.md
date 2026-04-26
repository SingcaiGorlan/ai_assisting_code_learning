# 文档索引

本文档提供项目所有技术文档的快速导航。

## 📚 文档分类

### 🚀 快速开始

- [项目结构说明](./PROJECT_STRUCTURE.md) - 了解项目文件组织
- [设置检查清单](./SETUP_CHECKLIST.md) - 环境搭建步骤
- [本地数据库设置](./LOCAL_DB_SETUP.md) - 数据库配置指南

### 🛠️ 开发指南

- [贡献指南](./CONTRIBUTION_GUIDE.md) - 如何参与项目开发
- [代码审查指南](./CODE_REVIEW_GUIDE.md) - 代码质量标准
- [Git 使用指南](../GIT_GUIDE.md) - 版本控制规范

### 🐳 部署与运维

- [WSL Docker 设置](./WSL_DOCKER_SETUP.md) - Windows 用户指南
- [Podman 使用指南](./PODMAN.md) - Podman 替代方案
- [迁移指南](./MIGRATION_GUIDE.md) - 版本升级说明

### 🔧 故障排查

- [常见问题排查](./TROUBLESHOOTING.md) - 解决常见问题

### 📖 用户文档

用户文档位于 `web/docs/` 目录，使用 VitePress 构建：

- 访问方式: `cd web/docs && npm run dev`
- 在线文档: （部署后地址）

## 📋 文档维护规范

### 添加新文档

1. **技术开发文档**: 放在 `docs/` 目录
2. **用户使用文档**: 放在 `web/docs/` 目录（VitePress）
3. **快速入门文档**: 可放在根目录（如 README.md, GIT_GUIDE.md）

### 文档命名规范

- 使用大写字母和下划线: `DOCUMENT_NAME.md`
- 名称应清晰表达文档内容
- 避免使用空格和特殊字符

### 文档更新流程

1. 更新相关文档内容
2. 如有新增文档，在此索引中添加链接
3. 提交时包含清晰的 commit message

## 🔗 外部资源

- [Go 官方文档](https://golang.org/doc/)
- [Gin Web Framework](https://gin-gonic.com/)
- [GORM 文档](https://gorm.io/)
- [Vue.js 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Docker 文档](https://docs.docker.com/)

## 📝 文档优先级

### 必读文档（新开发者）

1. README.md（根目录）
2. docs/SETUP_CHECKLIST.md
3. docs/PROJECT_STRUCTURE.md
4. docs/CONTRIBUTION_GUIDE.md

### 选读文档（按需查阅）

- 遇到问题时: docs/TROUBLESHOOTING.md
- 准备提交代码时: docs/CODE_REVIEW_GUIDE.md
- 需要部署时: docs/ 下的部署相关文档

---

**提示**: 如发现文档缺失或错误，欢迎提交 Issue 或 PR 改进文档。

**最后更新**: 2026-04-26
