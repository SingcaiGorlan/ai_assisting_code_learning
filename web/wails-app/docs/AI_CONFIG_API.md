# AI 配置管理器 - API 文档

## 概述

AI 配置管理器提供了完整的前后端 API 对接，支持管理 AI 服务提供商、模型参数和连接测试。

## 后端 API 端点

### 1. 获取 AI 配置

**GET** `/api/v1/ai/config`

获取当前 AI 配置信息（API Key 会被掩码处理）

**响应示例：**
```json
{
  "success": true,
  "data": {
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "base_url": "https://api.openai.com/v1",
    "api_key": "sk-****xyz123",
    "max_tokens": 1000,
    "temperature": 0.7
  }
}
```

---

### 2. 更新 AI 配置

**PUT** `/api/v1/ai/config`

更新 AI 配置参数

**请求体：**
```json
{
  "provider": "openai",
  "model": "gpt-4",
  "base_url": "https://api.openai.com/v1",
  "api_key": "sk-your-api-key",
  "max_tokens": 2000,
  "temperature": 0.8
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "AI configuration updated successfully",
  "data": {
    "provider": "openai",
    "model": "gpt-4",
    "base_url": "https://api.openai.com/v1",
    "api_key": "sk-****xyz123",
    "max_tokens": 2000,
    "temperature": 0.8
  }
}
```

---

### 3. 测试 AI 连接

**POST** `/api/v1/ai/config/test`

测试 AI 提供商的连接状态

**响应示例：**
```json
{
  "success": true,
  "message": "Connection test successful",
  "data": {
    "provider": "openai",
    "status": "connected",
    "latency": "120ms"
  }
}
```

---

### 4. 获取可用 AI 提供商

**GET** `/api/v1/ai/providers`

获取所有支持的 AI 提供商列表及其模型

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": "openai",
      "name": "OpenAI",
      "description": "OpenAI GPT models (GPT-3.5, GPT-4)",
      "models": ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
      "default_model": "gpt-3.5-turbo"
    },
    {
      "id": "azure",
      "name": "Azure OpenAI",
      "description": "Microsoft Azure OpenAI Service",
      "models": ["gpt-35-turbo", "gpt-4"],
      "default_model": "gpt-35-turbo"
    },
    {
      "id": "local",
      "name": "Local Model",
      "description": "Run local LLM models (Ollama, LM Studio)",
      "models": ["llama2", "codellama", "mistral"],
      "default_model": "llama2"
    }
  ]
}
```

---

## 前端组件

### AIConfigPage 组件

**位置：** `web/wails-app/frontend/src/pages/AIConfig.tsx`

**功能特性：**
- ✅ 可视化选择 AI 提供商（OpenAI / Azure / Local）
- ✅ 配置 API Key 和 Base URL
- ✅ 选择模型和调整参数（Temperature、Max Tokens）
- ✅ 实时测试连接
- ✅ 保存配置并显示成功提示
- ✅ VS Code Dark+ 风格界面

**状态管理：**
```typescript
interface AIConfig {
  provider: string
  model: string
  base_url: string
  api_key: string
  max_tokens: number
  temperature: number
}
```

---

## CLI 命令

### 查看配置
```bash
cd cmd/cli
go run main.go ai config show
```

**输出示例：**
```
=== AI Configuration ===
Provider:    openai
Model:       gpt-3.5-turbo
Base URL:    https://api.openai.com/v1
API Key:     sk-****xyz123
Max Tokens:  1000
Temperature: 0.70
========================
```

### 设置配置
```bash
go run main.go ai config set provider openai
go run main.go ai config set model gpt-4
go run main.go ai config set temperature 0.8
```

### 测试连接
```bash
go run main.go ai config test
```

**输出示例：**
```
Testing AI API connection...
✓ AI Provider: openai
✓ Model: gpt-3.5-turbo
✓ Base URL: https://api.openai.com/v1
✓ API Key: ****xyz123
✅ Connection test successful: Connection test successful
```

---

## 路由配置

### App.tsx 路由
```tsx
<Route 
  path="/ai-config" 
  element={<AIConfigPage />} 
/>
```

### Sidebar 导航
- 图标：`<Cpu size={18} />`
- 标签：AI 配置
- 路径：`/ai-config`

### TabBar 标签
- 标签：AI 配置
- 路径：`/ai-config`

---

## 安全考虑

1. **API Key 掩码**：前后端都对 API Key 进行掩码处理，仅显示前4位和后4位
2. **认证中间件**：所有 API 端点都需要通过 JWT 认证
3. **HTTPS**：生产环境建议使用 HTTPS 传输敏感配置

---

## 待实现功能

- [ ] 持久化配置到文件或数据库
- [ ] 配置历史记录和版本回滚
- [ ] 多配置配置文件支持
- [ ] 实际的 AI API 连接测试（目前返回模拟数据）
- [ ] 配置验证和错误提示优化

---

## 使用流程

1. **访问页面**：点击侧边栏 "AI 配置" 或顶部标签
2. **选择提供商**：点击 OpenAI / Azure / Local 卡片
3. **输入 API Key**：在密码框中输入您的 API 密钥
4. **调整参数**：根据需要修改模型、Temperature、Max Tokens
5. **测试连接**：点击 "测试连接" 按钮验证配置
6. **保存配置**：点击 "保存配置" 按钮应用更改

---

## 技术栈

- **后端**：Go + Gin Framework
- **前端**：React 18 + TypeScript + Tailwind CSS
- **图标**：Lucide React
- **CLI**：Cobra
- **样式**：VS Code Dark+ 主题配色
