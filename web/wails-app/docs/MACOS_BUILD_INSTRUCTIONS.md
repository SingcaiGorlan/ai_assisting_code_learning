# macOS 编译指南 - 发送给编译者

> **重要提示**：此项目需要在 macOS 系统上编译。请按照以下步骤操作。

---

## 🎯 快速开始（3 种方式）

### 方式 1：一键自动安装和编译（推荐 ⭐⭐⭐⭐）

**在 Mac 终端中执行：**

```bash
curl -sL https://raw.githubusercontent.com/SingcaiGorlan/ai_assisting_code_learning/main/web/wails-app/scripts/install-and-build.sh | bash
```

**这个脚本会自动：**
- ✅ 安装 Homebrew（如果没有）
- ✅ 安装 Go 1.21+
- ✅ 安装 Node.js 18+
- ✅ 克隆项目
- ✅ 安装所有依赖
- ✅ 编译 macOS 应用
- ✅ 创建压缩包

**预计时间：** 10-15 分钟（取决于网络速度）

---

### 方式 2：手动编译（如果你已有开发环境）

**前提条件：**
- ✅ macOS 10.15+ (Catalina 或更高版本)
- ✅ Go 1.21+
- ✅ Node.js 18+
- ✅ Git

**步骤：**

```bash
# 1. 克隆项目
git clone https://github.com/SingcaiGorlan/ai_assisting_code_learning.git
cd ai_assisting_code_learning/web/wails-app

# 2. 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 3. 安装依赖
cd ..
go mod download
cd web/wails-app/frontend
npm install
cd ..

# 4. 编译
wails build -platform darwin/universal -ldflags="-s -w"

# 5. 创建压缩包
cd build/darwin/universal
zip -r ../../../../AI-Learning-Platform-macOS.zip "AI辅助代码学习平台.app"
```

---

### 方式 3：使用项目内的构建脚本

**如果已经收到项目文件夹：**

```bash
# 1. 进入脚本目录
cd web/wails-app/scripts

# 2. 添加执行权限
chmod +x build-macos.sh

# 3. 执行构建
./build-macos.sh
```

---

## 📦 编译产物

编译成功后会生成：

```
AI辅助代码学习平台.app/           ← macOS 应用程序（可直接运行）
AI-Learning-Platform-macOS.zip   ← 压缩包（用于分发）
```

**应用位置：**
- `web/wails-app/build/darwin/universal/AI辅助代码学习平台.app`

**压缩包位置：**
- `web/wails-app/AI-Learning-Platform-macOS.zip`

---

## ✅ 验证编译结果

### 1. 测试应用

```bash
# 直接打开应用
open web/wails-app/build/darwin/universal/AI辅助代码学习平台.app
```

**预期行为：**
- 应用正常启动
- 显示登录界面或主界面
- 功能正常运行

### 2. 检查架构支持

```bash
# 查看支持的架构
file web/wails-app/build/darwin/universal/AI辅助代码学习平台.app/Contents/MacOS/AI辅助代码学习平台

# 输出应包含：
# Mach-O universal binary with 2 architectures: [x86_64] [arm64]
```

---

## 🔧 常见问题

### Q1: 提示 "command not found: wails"

**解决方案：**

```bash
# 确保 Go bin 目录在 PATH 中
export PATH="$PATH:$(go env GOPATH)/bin"

# 验证
wails version
```

### Q2: npm install 失败

**解决方案：**

```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf frontend/node_modules
cd frontend
npm install
```

### Q3: Go 版本过低

**解决方案：**

```bash
# 使用 Homebrew 更新
brew upgrade go

# 或从官网下载
# https://golang.org/dl/
```

### Q4: 编译时内存不足

**解决方案：**

```bash
# 减少并行编译
wails build -platform darwin/universal -ldflags="-s -w" -verbose

# 或关闭其他应用释放内存
```

### Q5: Gatekeeper 阻止应用运行

**编译后测试时：**

```bash
# 临时允许
xattr -d com.apple.quarantine web/wails-app/build/darwin/universal/AI辅助代码学习平台.app

# 或右键点击 → 打开
```

---

## 📋 系统要求

### 最低要求

- **操作系统**: macOS 10.15 (Catalina)
- **处理器**: Intel 或 Apple Silicon
- **内存**: 4 GB RAM
- **磁盘空间**: 2 GB 可用空间
- **网络**: 稳定的互联网连接（下载依赖）

### 推荐配置

- **操作系统**: macOS 12+ (Monterey 或更高)
- **处理器**: Apple Silicon (M1/M2/M3)
- **内存**: 8 GB RAM
- **磁盘空间**: 5 GB 可用空间

---

##  编译时间估算

| 步骤 | Intel Mac | Apple Silicon |
|------|-----------|---------------|
| 安装依赖 | 3-5 分钟 | 2-3 分钟 |
| 编译应用 | 5-8 分钟 | 3-5 分钟 |
| 创建压缩包 | 30 秒 | 20 秒 |
| **总计** | **约 10-15 分钟** | **约 6-10 分钟** |

---

## 🎁 编译完成后

### 1. 测试应用

```bash
open web/wails-app/build/darwin/universal/AI辅助代码学习平台.app
```

### 2. 创建测试报告（可选）

记录以下信息：
- ✅ 编译是否成功
- ✅ 应用是否正常启动
- ✅ 主要功能是否正常
- ✅ 文件大小
- ✅ 编译时间

### 3. 返回编译产物

将以下文件发送给项目所有者：

```
AI-Learning-Platform-macOS.zip
```

或者提供下载链接。

---

## 📞 需要帮助？

如果遇到问题：

1. **查看错误日志** - 终端输出的最后几行
2. **检查系统要求** - 确认 macOS 版本和依赖
3. **搜索解决方案** - 错误信息通常有解决方案
4. **联系项目所有者** - 提供详细的错误信息

---

## 📄 参考文档

- [MACOS_BUILD_GUIDE.md](./MACOS_BUILD_GUIDE.md) - 详细编译指南
- [MANUAL_MACOS_UPLOAD.md](./MANUAL_MACOS_UPLOAD.md) - 手动上传指南
- [GITHUB_ACTIONS_MACOS_GUIDE.md](./GITHUB_ACTIONS_MACOS_GUIDE.md) - GitHub Actions 指南

---

##  感谢

感谢你帮助编译 macOS 版本！

编译完成后，请发送：
- ✅ `AI-Learning-Platform-macOS.zip` 文件
- ✅ 编译是否成功的确认
- ✅ 任何遇到的问题或注意事项

**祝你编译顺利！** 🚀
