# 🎨 前端界面指南

本平台提供两种前端选项：

## 1️⃣ 静态应用界面 (web/public)

**特点：**
- 🌙 现代深色主题 UI
- ⚡ 由 Go 后端直接提供服务
- 🎯 完整的交互功能

### 代码辅助
- 多语言支持（JavaScript, Python, Go, Java, TypeScript）
- 实时代码编辑器
- AI 驱动的分析和建议

### AI 对话
- 实时聊天界面
- 对话历史记录
- 支持代码段分享

### 课程学习
- 课程列表浏览
- 进度追踪
- 练习完成记录

### 用户配置
- 个人资料管理
- 学习偏好设置
- 成就展示

### 使用方法
```bash
# 1. 启动后端
go run ./cmd/server/main.go

# 2. 打开浏览器
# 访问 http://localhost:8080
```

## 2️⃣ VitePress 文档 (此站点)

**特点：**
- 📖 专业的文档网站
- 🔍 完整的搜索功能
- 📱 响应式设计
- 🎨 自适应深色/浅色主题

### 文档结构
```
web/docs/
├── index.md              # 首页
└── guide/
    ├── getting-started.md  # 快速开始
    ├── api.md             # API 文档
    └── frontend.md        # 本文件
```

### 部署文档

**开发模式：**
```bash
cd web
npm install
npm run docs:dev
```

**构建静态文件：**
```bash
cd web
npm run docs:build
```
生成的文件在：`web/docs/.vitepress/dist`

**生产部署：**
```bash
# 方案 1：使用 VitePress 内置服务器
npm run docs:serve

# 方案 2：后端集成
# 将构建的文件复制到后端的静态文件夹
cp -r web/docs/.vitepress/dist web/public/docs
```

## 🎨 自定义修改

### 修改应用主题
编辑 `web/public/styles.css`：
```css
/* 修改主色调 */
:root {
  --primary-color: #4a90e2;
  --secondary-color: #2c3e50;
  /* 更多颜色变量... */
}
```

### 修改 API 端点
编辑 `web/public/app.js`：
```javascript
// 修改 API 基础 URL
const API_BASE = 'http://localhost:8080/api/v1';

// 添加新的 API 调用
async function customAPI() {
  // 你的代码...
}
```

### 修改文档内容
编辑 `web/docs/**/*.md` 文件，所有 Markdown 文件都支持：
- ✅ 标准 Markdown 语法
- ✅ Vue 组件嵌入
- ✅ 代码高亮
- ✅ 自定义容器

**示例 - 自定义容器：**
```markdown
::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险框
:::
```

## 📱 响应式设计

两个前端都完全支持响应式设计：
- 📱 手机（320px+）
- 💻 平板（768px+）
- 🖥️ 桌面（1024px+）

## 🔧 技术栈

| 工具 | 用途 |
|------|------|
| **Vite** | 前端构建工具 |
| **VitePress** | 静态文档生成 |
| **Vue 3** | 前端框架 |
| **CSS 3** | 样式 |
| **JavaScript** | 交互逻辑 |

## 💡 开发建议

1. **使用开发模式** - 享受热重载体验
2. **遵循目录结构** - 方便维护和扩展
3. **编写文档注释** - 提高代码可读性
4. **测试响应式** - 确保移动设备兼容
5. **优化性能** - 定期检查加载时间

## 📚 更多资源

- [VitePress 官网](https://vitepress.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [项目 GitHub](https://github.com/SingcaiGorlan/ai_assisting_code_learning)
