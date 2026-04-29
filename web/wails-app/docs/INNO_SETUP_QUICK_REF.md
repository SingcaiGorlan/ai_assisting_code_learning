# Inno Setup 快速参考

## 🚀 一键构建

```powershell
# 1. 安装 Inno Setup
choco install innosetup

# 2. 构建 exe
cd web\wails-app
wails build -platform windows/amd64 -ldflags="-s -w"

# 3. 编译安装包
.\scripts\build-installer.ps1

# 输出: installer-output\AI-Learning-Platform-Setup-1.0.0.exe
```

---

## 📋 常用命令

| 任务 | 命令 |
|------|------|
| 安装 Inno Setup | `choco install innosetup` |
| 构建 exe | `wails build -platform windows/amd64 -ldflags="-s -w"` |
| 编译安装包 | `.\scripts\build-installer.ps1` |
| 清理重建 | `.\scripts\build-installer.ps1 -Clean` |
| 测试安装 | `.\scripts\build-installer.ps1 -Test` |
| 手动编译 | `& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss` |

---

## ⚙️ 关键配置

### 修改应用信息（installer.iss）

```pascal
#define MyAppName "AI 辅助代码学习平台"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Your Company"
#define MyAppExeName "ai-learning-platform.exe"
```

### 启用功能（取消注释）

```pascal
; 文件关联
Root: HKA; Subkey: "Software\Classes\.ailearn"; ...

; URL 协议
Root: HKA; Subkey: "Software\Classes\ailearn"; ...

; 开机自启
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ...
```

---

## 📁 目录结构

```
web/wails-app/
├── build/bin/
│   └── ai-learning-platform.exe      # 主程序（先构建）
├── installer.iss                      # 安装脚本
├── scripts/
│   └── build-installer.ps1            # 构建脚本
├── installer-output/                  # 输出目录（自动生成）
│   └── AI-Learning-Platform-Setup-1.0.0.exe
└── docs/
    └── INNO_SETUP_GUIDE.md            # 详细文档
```

---

## ✅ 安装包特性

- ✓ 中文安装界面
- ✓ 选择安装目录
- ✓ 创建快捷方式
- ✓ 写入注册表
- ✓ 完整卸载
- ✓ 系统检查（Win10+）
- ✓ WebView2 检测
- ✓ 覆盖安装支持

---

## 🐛 故障排查

### 问题 1: 找不到 ISCC.exe
```powershell
# 检查安装
Get-Command iscc

# 重新安装
choco install innosetup
```

### 问题 2: 找不到 exe 文件
```powershell
# 先构建 exe
wails build -platform windows/amd64 -ldflags="-s -w"

# 验证
Get-Item .\build\bin\ai-learning-platform.exe
```

### 问题 3: 编译失败
```powershell
# 查看详细错误
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss /Q

# 检查语法
# 使用 Inno Setup IDE 打开 installer.iss
```

---

## 📊 体积对比

| 类型 | 大小 | 说明 |
|------|------|------|
| 原始 exe | ~50 MB | 无优化 |
| 优化 exe | ~11 MB | `-ldflags="-s -w"` |
| UPX 压缩 | ~8 MB | + `-upx` |
| 安装包 | ~12-15 MB | 包含压缩和元数据 |

---

## 🔗 相关链接

- **Inno Setup**: https://jrsoftware.org/isinfo.php
- **下载**: https://jrsoftware.org/isdl.php
- **文档**: https://jrsoftware.org/ishelp/
- **详细指南**: [INNO_SETUP_GUIDE.md](./INNO_SETUP_GUIDE.md)
