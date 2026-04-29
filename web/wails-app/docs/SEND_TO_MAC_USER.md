# macOS 编译 - 发送给对方的指南

## 📋 快速发送模板

复制以下内容发送给有 Mac 的朋友/同事：

---

**主题：** 请帮忙在 Mac 上编译一个项目

**正文：**

你好！

我开发了一个 AI 辅助代码学习平台，需要在 macOS 上编译。如果你有时间，请帮忙编译一下。

### 🚀 最快方式（推荐）

在你的 Mac 终端中运行这一行命令：

```bash
curl -sL https://raw.githubusercontent.com/SingcaiGorlan/ai_assisting_code_learning/main/web/wails-app/scripts/install-and-build.sh | bash
```

这个脚本会自动：
- ✅ 安装所有依赖（Go、Node.js、Wails）
- ✅ 下载项目代码
- ✅ 编译应用
- ✅ 创建压缩包

预计时间：10-15 分钟

### 📦 需要给我的文件

编译成功后，请发给我：

```
AI-Learning-Platform-macOS.zip
```

这个文件应该在项目根目录。

### 📚 详细说明

如果需要更详细的说明，请查看：
https://github.com/SingcaiGorlan/ai_assisting_code_learning/blob/main/web/wails-app/docs/MACOS_BUILD_INSTRUCTIONS.md

### ❓ 遇到问题？

如果编译失败，请：
1. 截图终端中的错误信息
2. 告诉我你的 macOS 版本（点击  → 关于本机）
3. 告诉我你的 Mac 芯片类型（Intel 还是 M1/M2/M3）

### 🎯 其他编译方式

如果一键脚本不行，可以用这种方式：

```bash
# 1. 克隆项目
git clone https://github.com/SingcaiGorlan/ai_assisting_code_learning.git
cd ai_assisting_code_learning/web/wails-app/scripts

# 2. 运行构建脚本
chmod +x build-macos.sh
./build-macos.sh
```

###  感谢

非常感谢你的帮助！编译成功后告诉我一声就好。

---

## 📁 项目文件结构

```
ai_assisting_code_learning/
├── web/wails-app/
│   ├── scripts/
│   │   ├── build-macos.sh              ← macOS 构建脚本
│   │   ├── install-and-build.sh        ← 一键安装脚本
│   │   └── build-macos-for-windows.bat ← Windows 说明
│   ── docs/
│       ├── MACOS_BUILD_INSTRUCTIONS.md ← 详细编译指南
│       ── MANUAL_MACOS_UPLOAD.md      ← 手动上传指南
└── ...
```

---

## ✅ 验证清单

对方编译完成后，检查：

- [ ] 收到 `AI-Learning-Platform-macOS.zip` 文件
- [ ] 解压后能正常打开 `.app` 文件
- [ ] 应用功能正常
- [ ] 文件大小合理（约 20-30 MB）

---

## 🔗 相关链接

- **项目地址**: https://github.com/SingcaiGorlan/ai_assisting_code_learning
- **编译指南**: https://github.com/SingcaiGorlan/ai_assisting_code_learning/blob/main/web/wails-app/docs/MACOS_BUILD_INSTRUCTIONS.md
- **一键脚本**: https://raw.githubusercontent.com/SingcaiGorlan/ai_assisting_code_learning/main/web/wails-app/scripts/install-and-build.sh

---

## 💡 提示

1. **发送前**：确保代码已推送到 GitHub
2. **发送时**：使用上面的模板，简洁明了
3. **发送后**：等待对方反馈，通常 15-30 分钟会有结果
4. **收到后**：测试应用，确认功能正常
5. **成功后**：上传到 GitHub Releases

---

## 🎯 下一步

收到编译产物后：

1. 解压测试应用
2. 确认功能正常
3. 上传到 GitHub Releases：
   ```bash
   cd web/wails-app
   gh release upload v1.1.0 AI-Learning-Platform-macOS.zip
   ```
4. 更新 Release 说明
5. 通知用户

---

**准备好了吗？复制上面的模板发送给对方吧！** 🚀
