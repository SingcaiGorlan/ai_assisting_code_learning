# 🤖 AI 功能模块使用指南

本文档介绍项目中集成的 AI 功能模块及其使用方法。

## 📋 功能概览

项目已集成以下 AI 功能：

1. **💬 AI 智能对话** - 实时问答、编程指导
2. **💻 代码分析优化** - 代码质量评估、改进建议
3. **✨ AI 代码生成** - 根据描述自动生成代码

## 🎯 前端界面

### 访问方式

启动应用后，点击导航栏的 **"AI 助手"** 即可访问。

```bash
# 启动前端开发服务器
cd web/app
npm run dev

# 访问 http://localhost:5173
```

### 功能模块

#### 1. AI 对话 (Chat)

**功能特点：**
- 🔄 实时对话交互
- 💡 快捷问题推荐
- 📜 对话历史保留
- ⌨️ Markdown 格式支持

**使用方法：**
1. 在输入框中输入问题
2. 点击"发送"或按 Enter 键
3. 查看 AI 回复
4. 使用快捷问题快速提问

**示例问题：**
- "如何优化这段代码？"
- "解释一下闭包的概念"
- "React hooks 最佳实践"
- "如何处理异步错误？"

---

#### 2. 代码分析 (Code Analysis)

**功能特点：**
- 📊 代码质量评分（0-10分）
- 💡 具体改进建议
- 📝 详细分析报告
- ✨ 优化后的代码示例

**支持的编程语言：**
- JavaScript / TypeScript
- Python
- Go
- Java
- C++

**使用方法：**
1. 选择编程语言
2. 粘贴代码到编辑器
3. 点击"分析代码"
4. 查看评分和建议

**分析维度：**
- 代码规范性
- 性能优化
- 错误处理
- 可读性
- 最佳实践

---

#### 3. 代码生成 (Code Generation)

**功能特点：**
- 🎯 自然语言描述需求
- 🔧 选择语言和框架
- ⚡ 快速生成可用代码
- 📋 一键复制代码

**支持的框架：**
- React
- Vue
- Express
- Flask
- 原生实现

**使用方法：**
1. 描述想要的功能
2. 选择编程语言和框架
3. 点击"生成代码"
4. 查看并复制生成的代码

**示例描述：**
```
创建一个 React 组件，显示用户列表，支持搜索和分页功能
```

---

## 🔌 后端 API

### API 端点

所有 AI 相关的 API 都需要认证（Bearer Token）。

#### 1. AI 对话

```http
POST /api/v1/ai/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "如何优化这段代码？"
}
```

**响应：**
```json
{
  "response": "你可以考虑以下几个方面来优化...",
  "conversation_id": "xxx"
}
```

---

#### 2. 代码辅助

```http
POST /api/v1/ai/code-assist
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "function sum(a, b) { return a + b; }",
  "language": "javascript",
  "question": "这个函数有什么可以改进的地方？"
}
```

**响应：**
```json
{
  "score": 8.5,
  "suggestions": [
    "添加参数类型验证",
    "添加 JSDoc 注释",
    "考虑使用箭头函数"
  ],
  "analysis": "代码简洁清晰，但可以增加健壮性...",
  "optimized_code": "// 优化后的代码..."
}
```

---

### API 集成示例

#### JavaScript/TypeScript

```typescript
// AI 对话
async function chatWithAI(message: string) {
  const response = await fetch('/api/v1/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  
  return await response.json();
}

// 代码分析
async function analyzeCode(code: string, language: string) {
  const response = await fetch('/api/v1/ai/code-assist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ code, language })
  });
  
  return await response.json();
}
```

#### Vue 组件中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sendMessage = async () => {
  try {
    const result = await chatWithAI(inputMessage.value)
    messages.value.push({
      role: 'assistant',
      content: result.response
    })
  } catch (error) {
    console.error('AI 请求失败:', error)
  }
}
</script>
```

---

## ⚙️ 配置说明

### 环境变量

在 `.env.local` 文件中配置 AI 服务：

```bash
# OpenAI API 配置
OPENAI_API_KEY=your-openai-api-key-here
ALP_AI_MODEL=gpt-3.5-turbo
ALP_AI_MAX_TOKENS=2000
ALP_AI_TEMPERATURE=0.7

# 或使用其他 AI 提供商
AI_PROVIDER=openai  # openai, anthropic, azure, etc.
```

### 配置文件

在 `configs/config.yaml` 中：

```yaml
ai:
  provider: openai
  api_key: ${OPENAI_API_KEY}
  model: gpt-3.5-turbo
  max_tokens: 2000
  temperature: 0.7
  timeout: 30s
```

---

## 🔧 后端实现

### 当前状态

目前后端 API 返回的是模拟数据。要连接真实的 AI 服务，需要：

1. **安装 AI SDK**
```bash
go get github.com/sashabaranov/go-openai
```

2. **实现 AI 客户端**

创建 `internal/biz/ai/service.go`:

```go
package ai

import (
    "context"
    openai "github.com/sashabaranov/go-openai"
)

type Service struct {
    client *openai.Client
}

func NewService(apiKey string) *Service {
    return &Service{
        client: openai.NewClient(apiKey),
    }
}

func (s *Service) Chat(ctx context.Context, message string) (string, error) {
    resp, err := s.client.CreateChatCompletion(
        ctx,
        openai.ChatCompletionRequest{
            Model: openai.GPT3Dot5Turbo,
            Messages: []openai.ChatCompletionMessage{
                {
                    Role:    openai.ChatMessageRoleUser,
                    Content: message,
                },
            },
        },
    )
    
    if err != nil {
        return "", err
    }
    
    return resp.Choices[0].Message.Content, nil
}

func (s *Service) CodeAssist(ctx context.Context, code, language string) (*CodeAnalysis, error) {
    prompt := fmt.Sprintf("分析以下 %s 代码并提供改进建议:\n\n%s", language, code)
    
    response, err := s.Chat(ctx, prompt)
    if err != nil {
        return nil, err
    }
    
    // 解析响应...
    return &CodeAnalysis{
        Score: 8.5,
        Suggestions: []string{"..."},
        Analysis: response,
    }, nil
}
```

3. **更新 Handler**

修改 `internal/app/handler/api/code_assist.go`:

```go
func CodeAssist(c *gin.Context) {
    var req struct {
        Code     string `json:"code" binding:"required"`
        Language string `json:"language"`
    }

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // 调用 AI 服务
    aiService := ai.NewService(cfg.AI.APIKey)
    result, err := aiService.CodeAssist(c.Request.Context(), req.Code, req.Language)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, result)
}
```

---

## 🚀 快速开始

### 1. 启动后端服务

```bash
# 确保配置了 OPENAI_API_KEY
make dev
```

### 2. 启动前端应用

```bash
cd web/app
npm install
npm run dev
```

### 3. 访问 AI 助手

打开浏览器访问 `http://localhost:5173`，点击导航栏的 **"AI 助手"**。

---

## 💡 最佳实践

### 1. 提示词优化

**好的提示词：**
```
请分析这段 JavaScript 代码的性能问题，并提供优化建议：
[代码]
```

**不好的提示词：**
```
看看这个代码
```

### 2. 代码分析技巧

- 提供完整的上下文
- 说明具体的关注点（性能、安全、可读性等）
- 指定目标环境（浏览器、Node.js 等）

### 3. 成本控制

- 设置合理的 `max_tokens` 限制
- 使用缓存减少重复请求
- 选择合适的模型（GPT-3.5 vs GPT-4）

---

## 🔐 安全注意事项

1. **API Key 保护**
   - 永远不要在前端代码中暴露 API Key
   - 使用环境变量存储敏感信息
   - 在后端进行所有 AI API 调用

2. **输入验证**
   - 验证用户输入长度
   - 过滤恶意内容
   - 实施速率限制

3. **错误处理**
   - 优雅地处理 API 错误
   - 不向用户暴露敏感错误信息
   - 记录错误日志用于调试

---

## 📊 监控与统计

建议添加以下监控：

- API 调用次数
- 平均响应时间
- 错误率
- Token 使用量
- 成本追踪

---

## 🆘 常见问题

### Q: AI 响应很慢怎么办？

A: 
- 检查网络连接
- 降低 `max_tokens` 值
- 使用更快的模型（GPT-3.5 比 GPT-4 快）
- 实施流式响应

### Q: 如何降低成本？

A:
- 使用 GPT-3.5 而非 GPT-4
- 缓存常见问题的答案
- 优化提示词减少 token 使用
- 实施请求去重

### Q: 如何处理长对话历史？

A:
- 限制上下文窗口大小
- 定期总结对话内容
- 只保留最近的 N 条消息
- 使用向量数据库存储历史

---

## 📚 相关资源

- [OpenAI API 文档](https://platform.openai.com/docs)
- [Anthropic Claude](https://docs.anthropic.com/)
- [Azure OpenAI Service](https://learn.microsoft.com/azure/cognitive-services/openai/)

---

**最后更新**: 2026-04-26
