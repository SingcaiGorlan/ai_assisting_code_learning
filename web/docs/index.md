---
layout: home
hero:
  name: "AI Learning Platform"
  text: "智能代码学习与辅助平台"
  tagline: "通过 AI 驱动的代码分析和交互式学习，加速你的编程成长之路"
  image:
    src: data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%234a90e2' opacity='0.3'/%3E%3Cpath d='M 100 50 L 150 100 L 100 150 L 50 100 Z' fill='%234a90e2'/%3E%3C/svg%3E
    alt: AI Learning Platform
  actions:
    - theme: brand
      text: 🚀 立即开始
      link: /guide/getting-started
    - theme: alt
      text: 📖 查看文档
      link: /guide/api
    - theme: alt
      text: 🌐 访问应用
      link: http://localhost:8080

features:
  - icon: 💻
    title: 代码辅助
    details: 提交你的代码，获得 AI 驱动的深度分析和改进建议。支持多种编程语言。
    link: /guide/frontend#代码辅助
    
  - icon: 🤖
    title: AI 对话
    details: 与 AI 进行实时对话，获取编程帮助、学习指导和最佳实践建议。
    link: /guide/frontend#ai-对话
    
  - icon: 📚
    title: 学习路径
    details: 追踪学习进度，完成课程练习，获得成就徽章和学习报告。
    link: /guide/getting-started
    
  - icon: 🎯
    title: 智能练习
    details: 结合实际代码练习和 AI 反馈，加深对编程概念的理解。
    link: /guide/frontend
    
  - icon: 📊
    title: 进度跟踪
    details: 详细的学习统计数据，帮助你了解学习进度和知识掌握情况。
    link: /guide/frontend
    
  - icon: 🔗
    title: 无缝集成
    details: 与 OpenAI, Redis 等服务深度集成，为你提供最佳体验。
    link: /guide/api
---

## ✨ 核心特性

### 🧠 AI 驱动分析
- **智能代码审查**：实时代码质量检测
- **性能优化建议**：识别代码瓶颈
- **最佳实践指导**：遵循行业标准

### 🎓 个性化学习
- **动态课程调整**：根据学习进度优化内容
- **交互式练习**：实时反馈和指导
- **进度可视化**：清晰的学习成就展示

### 🚀 生产级应用
- **高可用架构**：基于 Go + PostgreSQL
- **实时缓存**：Redis 加速数据访问
- **安全认证**：JWT 令牌验证

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **Go 1.21+** | 后端框架 |
| **Gin** | Web 路由 |
| **PostgreSQL 15** | 主数据库 |
| **Redis 7** | 缓存层 |
| **VitePress** | 文档和前端 |

## 🚀 快速开始

### 1️⃣ 安装依赖
```bash
make setup
```

### 2️⃣ 启动服务
```bash
make docker-up
```

### 3️⃣ 运行应用
```bash
go run ./cmd/server
```

### 4️⃣ 访问应用
打开浏览器访问 [http://localhost:8080](http://localhost:8080)

## 📚 文档导航

- [🎯 开始使用](/guide/getting-started) - 新手指南
- [🔌 API 参考](/guide/api) - API 文档
- [🎨 前端界面](/guide/frontend) - UI 介绍

## 📞 获取帮助

遇到问题？查看我们的 [常见问题解答](https://github.com/SingcaiGorlan/ai_assisting_code_learning/issues)

---

<style>
.VPButton {
  display: inline-block;
}
</style>
