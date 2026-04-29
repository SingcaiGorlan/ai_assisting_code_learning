# GitHub Actions macOS 构建指南

## ✅ 已触发自动构建

### 📊 当前状态

- ✅ 代码已推送到 GitHub
- ✅ 版本标签 v1.1.0 已创建
- 🔄 GitHub Actions 正在构建 macOS 版本

---

## 🔍 查看构建进度

### 方法 1：网页查看

1. **访问 Actions 页面**
   ```
   https://github.com/SingcaiGorlan/ai_assisting_code_learning/actions
   ```

2. **查看构建状态**
   - 找到 "Build macOS" workflow
   - 点击最近的运行记录
   - 查看实时日志

### 方法 2：命令行查看（需要 GitHub CLI）

```bash
# 安装 GitHub CLI
winget install GitHub.cli

# 查看 workflow 运行状态
gh run list --workflow=build-macos.yml

# 查看详细日志
gh run view --log
```

---

## ⏱️ 预计时间

| 步骤 | 耗时 |
|------|------|
| 检出代码 | ~30 秒 |
| 安装 Go | ~1 分钟 |
| 安装 Node.js | ~30 秒 |
| 安装 Wails CLI | ~1 分钟 |
| 编译 Intel 版本 | ~3-5 分钟 |
| 编译 Apple Silicon 版本 | ~3-5 分钟 |
| 压缩文件 | ~30 秒 |
| 上传到 Release | ~1 分钟 |
| **总计** | **约 10-15 分钟** |

---

## 📦 构建完成后

### 下载方式

#### 方式 1：从 Releases 页面下载

1. 访问 Releases 页面：
   ```
   https://github.com/SingcaiGorlan/ai_assisting_code_learning/releases
   ```

2. 找到 v1.1.0 版本

3. 下载文件：
   - `AI-Learning-Platform-macOS-Intel.zip` (Intel Mac)
   - `AI-Learning-Platform-macOS-AppleSilicon.zip` (M1/M2/M3 Mac)

#### 方式 2：从 Artifacts 下载（未创建 Release 时）

1. 进入 Actions → 最近的构建
2. 滚动到底部 "Artifacts" 部分
3. 点击 "macos-builds" 下载

---

## 🎯 分发给用户

### 1. 确定用户 Mac 类型

**让用户检查 Mac 类型：**

```bash
# 在 Mac 终端运行
uname -m

# 输出：
# x86_64 = Intel Mac
# arm64 = Apple Silicon (M1/M2/M3)
```

**或通过系统信息：**
- 点击左上角  菜单
- 选择"关于本机"
- 查看"芯片"或"处理器"

### 2. 提供下载链接

**Intel Mac 用户：**
```
下载 AI-Learning-Platform-macOS-Intel.zip
适用于 2020 年之前的 Mac（Intel 处理器）
```

**Apple Silicon Mac 用户：**
```
下载 AI-Learning-Platform-macOS-AppleSilicon.zip
适用于 M1/M2/M3 Mac（2020 年之后）
```

**如果不确定：**
- 建议下载两个版本都试试
- 或等待后续编译 Universal Binary 版本

---

## 📝 安装说明（提供给用户）

创建 `README-macOS.txt`：

```
=== AI 辅助代码学习平台 for macOS ===

系统要求：
- macOS 10.15 (Catalina) 或更高版本
- Intel Mac 或 Apple Silicon (M1/M2/M3)

安装步骤：
1. 下载对应的 ZIP 文件
2. 解压文件
3. 双击 "AI辅助代码学习平台.app"
4. 如果提示"无法验证开发者"：
   - 右键点击 .app → 打开
   - 或在 系统偏好设置 → 安全性与隐私 → 仍要打开

首次启动：
- 可能需要几秒钟初始化
- 确保已连接到互联网

卸载：
- 将 .app 拖入废纸篓即可

常见问题：
Q: 应用打不开怎么办？
A: 右键点击 → 打开，或在系统偏好设置中允许

Q: 如何检查我的 Mac 类型？
A: 点击  → 关于本机 → 查看"芯片"或"处理器"

技术支持：
- GitHub: https://github.com/SingcaiGorlan/ai_assisting_code_learning
- Issues: https://github.com/SingcaiGorlan/ai_assisting_code_learning/issues
```

---

## 🔧 故障排查

### 问题 1：构建失败

**可能原因：**
- 依赖安装失败
- 编译错误
- 超时

**解决方案：**
1. 查看 Actions 日志
2. 检查错误信息
3. 修复后重新推送标签

```bash
# 删除旧标签
git tag -d v1.1.0
git push --delete origin v1.1.0

# 修复问题后重新创建
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

### 问题 2：构建成功但找不到文件

**检查位置：**
1. Releases 页面
2. Actions → Artifacts

**如果都没有：**
- 检查 workflow 配置
- 查看是否有权限问题

### 问题 3：用户反馈应用无法打开

**常见原因：**
- Gatekeeper 阻止
- macOS 版本过低
- 架构不匹配

**解决方案：**
- 指导用户右键打开
- 确认 macOS 版本 ≥ 10.15
- 确认下载了正确的架构版本

---

## 🚀 后续优化

### 1. 添加 Universal Binary 支持

修改 `.github/workflows/build-macos.yml`：

```yaml
- name: Build Universal Binary
  run: |
    cd web/wails-app
    wails build -platform darwin/universal -ldflags="-s -w"

- name: Compress Universal version
  run: |
    cd web/wails-app/build/darwin/universal
    zip -r ../../../../AI-Learning-Platform-macOS-Universal.zip "AI辅助代码学习平台.app"
```

**优势：**
- 用户只需下载一个文件
- 自动适配 Intel 和 Apple Silicon

**缺点：**
- 文件体积较大（~45 MB vs ~25 MB）

### 2. 创建 DMG 文件

在 workflow 中添加：

```yaml
- name: Create DMG
  run: |
    brew install create-dmg
    cd web/wails-app/build/darwin/universal
    create-dmg \
      --volname "AI Learning Platform" \
      --window-pos 200 120 \
      --window-size 800 400 \
      --icon-size 100 \
      --icon "AI辅助代码学习平台.app" 200 190 \
      --hide-extension "AI辅助代码学习平台.app" \
      --app-drop-link 600 185 \
      "AI-Learning-Platform.dmg" \
      "AI辅助代码学习平台.app"
```

### 3. 代码签名和公证

需要 Apple Developer 证书（$99/年），可以消除 Gatekeeper 警告。

---

## 📊 构建历史

查看过往构建：

```bash
# 使用 GitHub CLI
gh run list --workflow=build-macos.yml --limit 10

# 或访问网页
https://github.com/SingcaiGorlan/ai_assisting_code_learning/actions/workflows/build-macos.yml
```

---

## 💡 提示

### 手动触发构建

如果想重新构建而不创建新标签：

1. 访问 Actions 页面
2. 选择 "Build macOS" workflow
3. 点击 "Run workflow" → "Run workflow"

### 成本说明

- GitHub Actions 免费额度：每月 2000 分钟
- macOS runners：约 10 分钟/次
- 可以构建约 200 次/月
- 完全免费！

### 最佳实践

1. **只在发布时构建**
   - 使用标签触发（已配置）
   - 避免每次提交都构建

2. **保留构建产物**
   - Releases 永久保存
   - Artifacts 保存 90 天

3. **提供清晰的文档**
   - 安装说明
   - 常见问题
   - 技术支持联系方式

---

## 🔗 相关链接

- **GitHub Actions**: https://github.com/SingcaiGorlan/ai_assisting_code_learning/actions
- **Releases**: https://github.com/SingcaiGorlan/ai_assisting_code_learning/releases
- **Workflow 配置**: [.github/workflows/build-macos.yml](../.github/workflows/build-macos.yml)
- **macOS 编译指南**: [MACOS_BUILD_GUIDE.md](../web/wails-app/docs/MACOS_BUILD_GUIDE.md)

---

**最后更新**: 2026-04-29  
**当前版本**: v1.1.0
