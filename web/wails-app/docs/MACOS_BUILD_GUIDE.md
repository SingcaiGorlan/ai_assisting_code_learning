# macOS 编译指南

## ⚠️ 重要说明

**Wails v2 目前不支持从 Windows 交叉编译到 macOS。**

你有以下三种方案可以选择：

---

## 🎯 方案对比

| 方案 | 难度 | 成本 | 适用场景 |
|------|------|------|---------|
| **使用 Mac 电脑** | ⭐ 简单 | 需要 Mac | 有 Mac 设备 |
| **GitHub Actions** | ⭐⭐ 中等 | 免费（每月 2000 分钟） | 无 Mac，有 GitHub |
| **云 Mac 服务** | ⭐⭐⭐ 复杂 | $20-50/月 | 专业需求 |

---

## ✅ 方案 1：使用 Mac 电脑（推荐）

### 前提条件
- 一台 Mac 电脑（Intel 或 Apple Silicon）
- macOS 10.15 (Catalina) 或更高版本

### 步骤

#### 1. 安装依赖

```bash
# 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Go
brew install go

# 安装 Node.js
brew install node

# 验证安装
go version    # 应该显示 go1.21+
node --version # 应该显示 v18+
```

#### 2. 安装 Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 验证
wails version
```

#### 3. 获取项目代码

```bash
# 方式 A：从 Git 克隆
git clone https://github.com/your-repo/ai-learning-platform.git
cd ai-learning-platform/web/wails-app

# 方式 B：从 Windows 复制
# 使用 U盘、网盘或 AirDrop 将整个项目文件夹复制到 Mac
```

#### 4. 编译应用

```bash
# 进入项目目录
cd web/wails-app

# 编译 Intel Mac 版本（适用于 2020 年之前的 Mac）
wails build -platform darwin/amd64 -ldflags="-s -w"

# 编译 Apple Silicon 版本（适用于 M1/M2/M3 Mac）
wails build -platform darwin/arm64 -ldflags="-s -w"

# 或编译 Universal Binary（同时支持两种架构，文件较大）
wails build -platform darwin/universal -ldflags="-s -w"
```

#### 5. 查看输出

```bash
# 查看生成的应用
ls -lh build/darwin/

# 输出示例：
# build/darwin/
# ├── amd64/
# │   └── AI辅助代码学习平台.app/     (~25 MB)
# └── arm64/
#     └── AI辅助代码学习平台.app/     (~25 MB)
```

#### 6. 压缩分发

```bash
# 压缩 Intel 版本
cd build/darwin/amd64
zip -r ../../../AI-Learning-Platform-macOS-Intel.zip "AI辅助代码学习平台.app"

# 压缩 Apple Silicon 版本
cd ../arm64
zip -r ../../../AI-Learning-Platform-macOS-AppleSilicon.zip "AI辅助代码学习平台.app"

# 返回项目根目录
cd ../../..
```

---

## ☁️ 方案 2：GitHub Actions（无需 Mac）

### 优势
- ✅ 无需 Mac 电脑
- ✅ 完全自动化
- ✅ 免费额度充足（每月 2000 分钟）
- ✅ 自动生成 GitHub Release

### 步骤

#### 1. 推送代码到 GitHub

```powershell
# 在 Windows 上执行
cd e:\ai_assisting_code_learning

# 添加 GitHub Actions 配置
git add .github/workflows/build-macos.yml
git commit -m "ci: 添加 macOS 自动构建"

# 推送到 GitHub
git push origin main
```

#### 2. 触发构建

**方式 A：手动触发**
1. 访问你的 GitHub 仓库
2. 点击 "Actions" 标签
3. 选择 "Build macOS" workflow
4. 点击 "Run workflow" → "Run workflow"

**方式 B：创建标签自动触发**
```powershell
# 创建版本标签
git tag -a v1.1.0 -m "Release v1.1.0 with macOS support"
git push origin v1.1.0
```

#### 3. 等待构建完成

- 通常需要 5-10 分钟
- 可以在 Actions 页面查看进度

#### 4. 下载构建产物

**方式 A：从 Artifacts 下载**
1. 进入 Actions → 最近的构建
2. 找到 "macos-builds" artifact
3. 点击下载

**方式 B：从 Releases 下载（如果使用标签）**
1. 访问 Releases 页面
2. 找到对应的版本
3. 下载 macOS 安装包

---

## 🖥️ 方案 3：云 Mac 服务

### 推荐服务

| 服务 | 价格 | 特点 |
|------|------|------|
| **MacStadium** | $99/月起 | 专业级，适合企业 |
| **MacinCloud** | $20/月起 | 按需付费，灵活 |
| **AWS EC2 Mac** | ~$1/小时 | 按小时计费 |

### 使用流程

1. 注册并租用云 Mac
2. SSH 连接到云 Mac
3. 按照"方案 1"的步骤编译
4. 下载生成的应用

---

## 📦 分发格式

### 1. ZIP 压缩包（最简单）

```bash
# 已在上文展示
zip -r AI-Learning-Platform-macOS.zip "AI辅助代码学习平台.app"
```

**优点：**
- ✅ 简单易用
- ✅ 跨平台兼容
- ✅ 无需额外工具

**缺点：**
- ❌ 用户体验一般
- ❌ 无安装向导

### 2. DMG 磁盘映像（推荐）

**在 Mac 上创建 DMG：**

```bash
# 安装 create-dmg
brew install create-dmg

# 创建 DMG
create-dmg \
  --volname "AI Learning Platform" \
  --window-pos 200 120 \
  --window-size 800 400 \
  --icon-size 100 \
  --icon "AI辅助代码学习平台.app" 200 190 \
  --hide-extension "AI辅助代码学习平台.app" \
  --app-drop-link 600 185 \
  "AI-Learning-Platform.dmg" \
  "build/darwin/universal/AI辅助代码学习平台.app"
```

**优点：**
- ✅ macOS 标准格式
- ✅ 美观的安装界面
- ✅ 可自定义背景

### 3. PKG 安装包（最专业）

需要使用 `pkgbuild` 和 `productbuild` 工具，适合企业级分发。

---

## 🔒 macOS 安全与签名

### Gatekeeper 限制

未签名的应用在首次运行时会提示：

```
⚠️ "AI辅助代码学习平台" cannot be opened because the developer cannot be verified.
```

### 解决方案

#### 临时方案（用户操作）

1. **右键打开**
   - 右键点击 .app → 打开
   - 点击"打开"确认

2. **系统偏好设置**
   - 系统偏好设置 → 安全性与隐私
   - 点击"仍要打开"

#### 永久方案（开发者）

**1. 购买 Apple Developer 证书**
- 价格：$99/年
- 网址：https://developer.apple.com/

**2. 代码签名**

```bash
# 列出可用的证书
security find-identity -v -p codesigning

# 签名应用
codesign --sign "Developer ID Application: Your Name (TEAM_ID)" \
         --deep \
         --force \
         --options runtime \
         "AI辅助代码学习平台.app"

# 验证签名
codesign --verify --verbose "AI辅助代码学习平台.app"
```

**3. Notarization（公证）**

```bash
# 创建 App Store Connect API Key
# 上传到 Apple 公证服务
xcrun notarytool submit "AI-Learning-Platform.dmg" \
  --apple-id "your@apple.id" \
  --password "app-specific-password" \
  --team-id "YOUR_TEAM_ID" \
  --wait

# 附加票据
xcrun stapler staple "AI-Learning-Platform.dmg"
```

---

## 📊 体积参考

| 架构 | .app 大小 | .zip 大小 | .dmg 大小 |
|------|----------|----------|----------|
| Intel (amd64) | ~25 MB | ~12 MB | ~15 MB |
| Apple Silicon (arm64) | ~25 MB | ~12 MB | ~15 MB |
| Universal | ~45 MB | ~22 MB | ~25 MB |

---

## 🧪 测试应用

### 在 Mac 上测试

```bash
# 直接运行
open "AI辅助代码学习平台.app"

# 或双击 .app 文件
```

### 检查兼容性

```bash
# 查看应用信息
mdls "AI辅助代码学习平台.app"

# 检查架构
lipo -info "AI辅助代码学习平台.app/Contents/MacOS/AI辅助代码学习平台"
```

---

## 🚀 快速开始（推荐方案）

### 如果你有 Mac：

```bash
# 1. 安装依赖
brew install go node
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 2. 编译
cd /path/to/ai-learning-platform/web/wails-app
wails build -platform darwin/universal -ldflags="-s -w"

# 3. 压缩
cd build/darwin/universal
zip -r ../../../AI-Learning-Platform-macOS.zip "AI辅助代码学习平台.app"
```

### 如果你没有 Mac：

```powershell
# 1. 提交代码到 GitHub
cd e:\ai_assisting_code_learning
git add .
git commit -m "准备 macOS 构建"
git push origin main

# 2. 创建标签触发自动构建
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

# 3. 在 GitHub Actions 页面查看进度并下载
```

---

## 📝 常见问题

### Q1: 为什么不能在 Windows 上编译 Mac 应用？

**A:** Wails v2 使用了 macOS 特有的框架（如 WebView），这些框架在 Windows 上不可用。未来版本可能会支持交叉编译。

### Q2: GitHub Actions 免费额度够用吗？

**A:** 完全够用！
- 免费额度：每月 2000 分钟
- macOS 构建：约 5-10 分钟/次
- 可以构建 200-400 次/月

### Q3: 如何同时支持 Intel 和 Apple Silicon？

**A:** 
- 方法 1：分别编译两个版本，提供两个下载链接
- 方法 2：编译 Universal Binary（文件较大，但用户只需下载一个）

### Q4: 应用打不开怎么办？

**A:** 
- 检查 macOS 版本（需要 10.15+）
- 右键点击 → 打开
- 或在系统偏好设置中允许

---

## 🔗 相关资源

- **Wails 官方文档**: https://wails.io/docs/reference/cli
- **GitHub Actions**: https://docs.github.com/en/actions
- **Apple Developer**: https://developer.apple.com/
- **create-dmg**: https://github.com/create-dmg/create-dmg

---

**最后更新**: 2026-04-29  
**适用版本**: Wails v2.x
