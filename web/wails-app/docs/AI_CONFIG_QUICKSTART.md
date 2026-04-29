# AI 配置管理器 - 快速开始指南

## 🚀 5 分钟快速上手

### 步骤 1：启动应用

```bash
cd web/wails-app
wails dev
```

等待应用启动，桌面窗口会自动打开。

---

### 步骤 2：登录系统

使用您的账户登录（如果没有账户，先注册）。

---

### 步骤 3：访问 AI 配置页面

有两种方式：

**方式 A：** 点击左侧边栏的 **"AI 配置"** 菜单项（CPU 图标）

**方式 B：** 点击顶部标签栏的 **"AI 配置"** 标签

---

### 步骤 4：选择 AI 提供商

在 "AI 服务提供商" 区域，点击您想使用的提供商卡片：

- **OpenAI** - 适合大多数用户，需要 API Key
- **Azure OpenAI** - 企业用户，需要 Azure 订阅
- **Local Model** - 本地运行，需要 Ollama 或 LM Studio

---

### 步骤 5：配置 API Key

1. 在 "API 密钥" 区域的 **API Key** 输入框中输入您的密钥
   - OpenAI: `sk-xxxxxxxxxxxxxxxxxxxxxxxx`
   - Azure: 您的 Azure OpenAI 密钥
   - Local: 留空或填写任意值

2. **Base URL** 会根据选择的提供商自动填充，您也可以手动修改

---

### 步骤 6：调整模型参数

在 "模型配置" 区域：

1. **模型名称** - 从下拉列表中选择想要的模型
   - OpenAI: gpt-3.5-turbo, gpt-4, gpt-4-turbo
   - Azure: gpt-35-turbo, gpt-4
   - Local: llama2, codellama, mistral

2. **Temperature** (0-2)
   - 0 = 确定性输出（适合代码生成）
   - 0.7 = 平衡（默认推荐）
   - 2 = 高度随机（适合创意写作）

3. **Max Tokens** (1-8192)
   - 控制单次响应的最大长度
   - 建议：1000-2000 用于日常对话
   - 建议：4000+ 用于长文档分析

---

### 步骤 7：测试连接

点击左下角的 **"🧪 测试连接"** 按钮

- ✅ **成功** - 显示绿色提示框 "Connection test successful"
- ❌ **失败** - 显示红色提示框，检查配置后重试

---

### 步骤 8：保存配置

点击右下角的 **"💾 保存配置"** 按钮

看到绿色提示框 **"配置已成功保存"** 即表示成功！

---

## 💡 常用场景配置

### 场景 1：日常代码辅助（推荐）

```
Provider: OpenAI
Model: gpt-3.5-turbo
Temperature: 0.3
Max Tokens: 1500
```

**优点：** 快速、准确、成本低

---

### 场景 2：复杂代码分析

```
Provider: OpenAI
Model: gpt-4
Temperature: 0.2
Max Tokens: 4000
```

**优点：** 深度理解、逻辑推理强

---

### 场景 3：本地隐私保护

```
Provider: Local Model
Model: codellama
Base URL: http://localhost:11434/v1
Temperature: 0.5
Max Tokens: 2000
```

**优点：** 数据不出本地、完全免费

**前提：** 需要先安装并运行 Ollama
```bash
# 安装 Ollama
# 访问 https://ollama.ai 下载安装

# 拉取 CodeLlama 模型
ollama pull codellama

# 启动服务
ollama serve
```

---

### 场景 4：企业级应用

```
Provider: Azure OpenAI
Model: gpt-4
Base URL: https://YOUR_RESOURCE.openai.azure.com
Temperature: 0.1
Max Tokens: 8000
```

**优点：** SLA 保障、数据合规、高可用性

---

## 🔧 CLI 快速命令

### 查看当前配置

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

---

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

### 修改配置

```bash
# 修改提供商
go run main.go ai config set provider openai

# 修改模型
go run main.go ai config set model gpt-4

# 修改温度
go run main.go ai config set temperature 0.5
```

---

## ❓ 常见问题

### Q1: 如何获取 OpenAI API Key？

1. 访问 [https://platform.openai.com](https://platform.openai.com)
2. 注册/登录账户
3. 进入 "API Keys" 页面
4. 点击 "Create new secret key"
5. 复制密钥并保存到安全位置

**注意：** API Key 只显示一次，请妥善保管！

---

### Q2: 测试连接失败怎么办？

检查以下几点：

1. ✅ API Key 是否正确（无多余空格）
2. ✅ Base URL 是否正确
3. ✅ 网络连接是否正常
4. ✅ API Key 是否有余额/配额
5. ✅ 防火墙是否阻止了请求

---

### Q3: 配置会丢失吗？

**目前状态：** 配置保存在内存中，重启应用后会恢复为默认值。

**解决方案：** 
- 短期：每次启动后重新配置
- 长期：等待配置持久化功能实现（TODO）

---

### Q4: 可以切换多个配置吗？

**目前状态：** 不支持多配置切换。

** workaround：** 
- 使用 CLI 快速修改配置
- 或在配置文件中手动编辑

---

### Q5: Temperature 和 Max Tokens 如何选择？

**Temperature 建议：**
- 代码生成：0.1-0.3（更准确）
- 日常对话：0.5-0.7（平衡）
- 创意写作：1.0-1.5（更有创意）

**Max Tokens 建议：**
- 简短回答：500-1000
- 标准对话：1500-2000
- 长文档分析：4000+

---

## 🎯 下一步

配置完成后，您可以：

1. **使用 AI 助手** - 点击侧边栏 "AI 助手" 开始对话
2. **代码辅助** - 在聊天中粘贴代码寻求帮助
3. **学习课程** - 结合 AI 辅助学习编程课程

---

## 📚 相关文档

- [AI 配置 API 文档](./AI_CONFIG_API.md)
- [AI 配置实现总结](./AI_CONFIG_SUMMARY.md)
- [VS Code 风格指南](./VS_CODE_STYLE_GUIDE.md)

---

## 🆘 需要帮助？

如果遇到问题：

1. 检查控制台错误信息（F12 打开 DevTools）
2. 查看日志文件 `logs/app.log`
3. 参考 API 文档确认请求格式
4. 提交 Issue 到项目仓库

---

**祝您使用愉快！** 🎉
