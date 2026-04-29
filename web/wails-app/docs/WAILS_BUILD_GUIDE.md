# Wails Windows 打包快速指南

## 🚀 快速开始

### 基础命令（PowerShell）

```powershell
# 进入项目目录
cd e:\ai_assisting_code_learning\web\wails-app

# 最简单的方式 - 使用构建脚本
.\scripts\build.ps1

# 或者直接使用 wails 命令
wails build
```

---

## 📋 常用构建命令

### 1. 标准构建

```powershell
# 当前平台（默认 windows/amd64）
wails build

# 指定平台
wails build -platform windows/amd64

# 优化编译（移除调试信息）
wails build -ldflags="-s -w"

# 完整优化（推荐用于发布）
wails build -platform windows/amd64 -ldflags="-s -w"
```

### 2. 使用 UPX 压缩

```powershell
# 前提：安装 UPX
choco install upx

# Wails 内置 UPX 支持
wails build -upx

# 组合优化
wails build -platform windows/amd64 -ldflags="-s -w" -upx
```

### 3. 使用构建脚本（推荐）

```powershell
# 基础构建
.\scripts\build.ps1

# 带 UPX 压缩
.\scripts\build.ps1 -WithUPX

# 清理后重新构建
.\scripts\build.ps1 -Clean

# 指定其他平台
.\scripts\build.ps1 -Platform "darwin/amd64"
```

---

## 📁 输出目录结构

执行 `wails build` 后的目录结构：

```
web/wails-app/
└── build/                          # 构建输出目录
    ├── appicon.png                 # PNG 图标
    ├── appicon.ico                 # Windows ICO 图标
    ├── appicon.icns                # macOS ICNS 图标
    ├── bin/                        # 可执行文件
    │   └── ai-learning-platform.exe  # ← 主程序
    ├── darwin/                     # macOS 应用（如果在 macOS 构建）
    ├── linux/                      # Linux 应用
    ├── windows/                    # Windows 资源
    │   ├── ai-learning-platform.exe
    │   └── *.syso                  # Windows 资源文件
    └── README.md                   # 构建说明
```

**主要文件：**
- `build/bin/ai-learning-platform.exe` - **这是你要分发的文件**
- 大小：约 20-50 MB（未压缩）或 8-15 MB（UPX 压缩后）

---

## ⚙️ 构建选项详解

### `-platform` 参数

| 值 | 说明 | 适用场景 |
|----|------|---------|
| `windows/amd64` | Windows 64位 | ✅ 主流选择 |
| `windows/386` | Windows 32位 | 老旧系统 |
| `windows/arm64` | Windows ARM | Surface Pro X 等 |
| `darwin/amd64` | macOS Intel | Mac 旧款 |
| `darwin/arm64` | macOS Apple Silicon | Mac M1/M2/M3 |
| `linux/amd64` | Linux 64位 | Ubuntu/CentOS 等 |

**多平台同时构建：**
```powershell
wails build -platform "windows/amd64,darwin/amd64,linux/amd64"
```

### `-ldflags` 参数

```powershell
# 移除符号表（减小体积）
-ldflags="-s"

# 移除 DWARF 调试信息（减小体积）
-ldflags="-w"

# 组合使用（推荐）
-ldflags="-s -w"

# 添加版本信息
-ldflags="-s -w -X main.version=1.0.0"
```

**效果对比：**
| 方式 | 文件大小 | 启动速度 | 调试能力 |
|------|---------|---------|---------|
| 无优化 | ~50 MB | 正常 | ✅ 可调试 |
| `-s -w` | ~30 MB | 稍快 | ❌ 不可调试 |
| `-s -w` + UPX | ~10 MB | 稍慢 | ❌ 不可调试 |

### `-upx` 参数

**前提条件：**
```powershell
# 安装 UPX
choco install upx        # Chocolatey
scoop install upx        # Scoop
# 或从 https://github.com/upx/upx/releases 下载
```

**压缩效果：**
- 原始大小：~30 MB
- UPX 压缩后：~8-12 MB
- 压缩率：60-70%

**注意事项：**
- ⚠️ 某些杀毒软件可能误报 UPX 压缩的程序
- ⚠️ 启动速度略慢（需要解压）
- ✅ 适合网络分发

---

## 🔧 高级配置

### 修改应用信息

编辑 `wails.json`：

```json
{
  "name": "AI辅助代码学习平台",
  "description": "基于 AI 驱动的代码学习平台桌面应用",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "version": "1.0.0",
  "outputFilename": "ai-learning-platform",
  "info": {
    "companyName": "Your Company",
    "productName": "AI Learning Platform",
    "productVersion": "1.0.0",
    "copyright": "Copyright © 2024 Your Company",
    "comments": "AI 辅助代码学习平台"
  }
}
```

**重新构建后，exe 文件属性会显示这些信息。**

### 自定义图标

```powershell
# 替换图标文件
# 将你的图标放在 build/appicon.ico（Windows）
# 将你的图标放在 build/appicon.icns（macOS）

# 然后重新构建
wails build
```

**图标要求：**
- Windows: `.ico` 格式，建议 256x256
- macOS: `.icns` 格式，包含多种尺寸
- Linux: `.png` 格式，512x512

---

## 📊 构建流程说明

执行 `wails build` 时的步骤：

```
Step 1: Generating bindings
  ↓ 生成 Go 与前端 JavaScript 的绑定代码
  ↓ 位置: frontend/src/wailsjs/

Step 2: Installing frontend dependencies
  ↓ 执行: npm install
  ↓ 安装 React、Tailwind CSS 等依赖

Step 3: Compiling frontend
  ↓ 执行: npm run build
  ↓ 编译 React 应用为静态 HTML/CSS/JS
  ↓ 输出到: frontend/dist/

Step 4: Building application
  ↓ 将前端资源嵌入 Go 二进制文件
  ↓ 使用 Go embed 机制

Step 5: Compiling application
  ↓ 编译 Go 代码
  ↓ 链接所有依赖
  ↓ 生成最终 exe 文件
```

**总耗时：** 通常 2-5 分钟（取决于机器性能）

---

## 🐛 常见问题

### Q1: 构建失败，提示 "frontend build failed"

**解决方案：**
```powershell
# 检查 Node.js 版本
node --version  # 需要 v18+

# 手动构建前端
cd frontend
npm install
npm run build

# 返回项目根目录重新构建
cd ..
wails build
```

### Q2: 生成的 exe 文件太大

**解决方案：**
```powershell
# 使用优化标志
wails build -ldflags="-s -w"

# 或使用 UPX
wails build -ldflags="-s -w" -upx
```

### Q3: 如何查看 exe 文件的详细信息？

**PowerShell：**
```powershell
Get-Item .\build\bin\ai-learning-platform.exe | 
  Select-Object Name, Length, VersionInfo
```

**右键属性：**
- 右键点击 exe → 属性 → 详细信息
- 可以看到版本、公司名等信息（需要在 wails.json 中配置）

### Q4: 如何在其他电脑上运行？

**答案：** 
- ✅ **无需安装任何依赖！**
- ✅ 直接将 `ai-learning-platform.exe` 复制到目标电脑
- ✅ 双击即可运行
- ⚠️ 需要 Windows 10/11（Wails 要求 WebView2）

**WebView2 运行时：**
- Windows 11：已预装
- Windows 10：可能需要安装
  - 下载地址：https://developer.microsoft.com/microsoft-edge/webview2/

---

## 🎯 最佳实践

### 开发阶段
```powershell
# 快速测试（不优化）
wails dev

# 或快速构建
wails build
```

### 测试阶段
```powershell
# 优化编译
wails build -ldflags="-s -w"
```

### 发布阶段
```powershell
# 完整优化 + UPX 压缩
wails build -platform windows/amd64 -ldflags="-s -w" -upx

# 验证
.\scripts\build.ps1 -WithUPX -Clean
```

### CI/CD 自动化
```yaml
# GitHub Actions 示例
name: Build
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v3
        with:
          go-version: '1.21'
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Wails
        run: go install github.com/wailsapp/wails/v2/cmd/wails@latest
      - name: Build
        run: |
          cd web/wails-app
          wails build -platform windows/amd64 -ldflags="-s -w"
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: ai-learning-platform
          path: web/wails-app/build/bin/*.exe
```

---

## 📝 快速参考表

| 任务 | 命令 |
|------|------|
| 基础构建 | `wails build` |
| 指定平台 | `wails build -platform windows/amd64` |
| 优化编译 | `wails build -ldflags="-s -w"` |
| UPX 压缩 | `wails build -upx` |
| 完整优化 | `wails build -platform windows/amd64 -ldflags="-s -w" -upx` |
| 使用脚本 | `.\scripts\build.ps1` |
| 清理重建 | `.\scripts\build.ps1 -Clean` |
| 查看帮助 | `wails build --help` |

---

## 🔗 相关资源

- **Wails 官方文档**: https://wails.io/docs/reference/cli
- **UPX 下载**: https://github.com/upx/upx/releases
- **WebView2 运行时**: https://developer.microsoft.com/microsoft-edge/webview2/
- **Go 下载**: https://go.dev/dl/
- **Node.js 下载**: https://nodejs.org/

---

**最后更新**: 2024-04-28  
**适用版本**: Wails v2.x
