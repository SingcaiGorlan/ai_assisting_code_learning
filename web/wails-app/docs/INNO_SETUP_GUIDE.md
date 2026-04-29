# Inno Setup 安装包构建指南

## 📦 概述

本指南介绍如何使用 Inno Setup 为你的 Wails 应用创建专业的 Windows 安装包。

**Inno Setup 优势：**
- ✅ 免费开源
- ✅ 功能强大且灵活
- ✅ 支持中文界面
- ✅ 可写入注册表
- ✅ 支持文件关联
- ✅ 自动创建快捷方式
- ✅ 完整的卸载程序

---

## 🚀 快速开始

### 1️⃣ **安装 Inno Setup**

#### 方法 A：下载安装包（推荐）
```
下载地址: https://jrsoftware.org/isdl.php
选择: Inno Setup 6.x.x (Unicode)
```

#### 方法 B：使用 Chocolatey
```powershell
choco install innosetup
```

#### 方法 C：使用 Scoop
```powershell
scoop install innosetup
```

---

### 2️⃣ **构建 exe 文件**

在创建安装包之前，需要先构建主程序：

```powershell
# 进入项目目录
cd e:\ai_assisting_code_learning\web\wails-app

# 构建优化的 exe
wails build -platform windows/amd64 -ldflags="-s -w"

# 或使用构建脚本
.\scripts\build.ps1
```

**验证输出：**
```powershell
# 检查文件是否存在
Get-Item .\build\bin\ai-learning-platform.exe
```

---

### 3️⃣ **编译安装包**

#### 方法 A：使用自动化脚本（推荐）

```powershell
# 基础编译
.\scripts\build-installer.ps1

# 清理后重新编译
.\scripts\build-installer.ps1 -Clean

# 编译并测试
.\scripts\build-installer.ps1 -Test
```

#### 方法 B：手动编译

```powershell
# 找到 ISCC.exe 路径（通常在以下位置之一）
# C:\Program Files (x86)\Inno Setup 6\ISCC.exe
# C:\Program Files\Inno Setup 6\ISCC.exe

# 执行编译
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss
```

---

## 📁 输出结果

编译成功后，会在 `installer-output/` 目录生成：

```
web/wails-app/
└── installer-output/
    └── AI-Learning-Platform-Setup-1.0.0.exe  ← 安装包
```

**安装包特性：**
- 📏 大小：约 12-15 MB（包含压缩的主程序）
- 🎨 界面：现代化向导式安装界面（中文）
- ⚙️ 功能：
  - 选择安装目录
  - 创建桌面快捷方式（可选）
  - 创建开始菜单
  - 写入注册表
  - 完整卸载支持

---

## ⚙️ 配置说明

### 修改应用信息

编辑 `installer.iss` 文件顶部：

```pascal
#define MyAppName "AI 辅助代码学习平台"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "AI Learning Platform Team"
#define MyAppURL "https://github.com/your-repo"
#define MyAppExeName "ai-learning-platform.exe"
```

### 自定义安装选项

#### 1. 添加桌面快捷方式（默认不勾选）

```pascal
[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; 
     GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
```

**改为默认勾选：**
```pascal
Flags: checkedonce  ; 首次安装时勾选
```

#### 2. 添加开机自启（可选）

```pascal
[Tasks]
Name: "autostart"; Description: "开机自动启动"; 
     GroupDescription: "附加任务:"; Flags: unchecked
```

**启用开机自启：**
```pascal
[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; 
      ValueType: string; ValueName: "{#MyAppName}"; 
      ValueData: """{app}\{#MyAppExeName}"""; 
      Tasks: autostart; Flags: uninsdeletevalue
```

#### 3. 文件关联（可选）

取消注释 `installer.iss` 中的相关行：

```pascal
[Registry]
; 文件扩展名关联
Root: HKA; Subkey: "Software\Classes\.ailearn\OpenWithProgids"; 
      ValueType: string; ValueName: "AILearningFile.ailearn"; 
      ValueData: ""; Flags: uninsdeletevalue

; 文件类型描述
Root: HKA; Subkey: "Software\Classes\AILearningFile.ailearn"; 
      ValueType: string; ValueName: ""; 
      ValueData: "AI Learning File"; Flags: uninsdeletekey

; 默认图标
Root: HKA; Subkey: "Software\Classes\AILearningFile.ailearn\DefaultIcon"; 
      ValueType: string; ValueName: ""; 
      ValueData: "{app}\{#MyAppExeName},0"; Flags: uninsdeletekey

; 打开命令
Root: HKA; Subkey: "Software\Classes\AILearningFile.ailearn\shell\open\command"; 
      ValueType: string; ValueName: ""; 
      ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Flags: uninsdeletekey
```

#### 4. 自定义 URL 协议（可选）

```pascal
[Registry]
; 注册 ailearn:// 协议
Root: HKA; Subkey: "Software\Classes\ailearn"; 
      ValueType: string; ValueName: ""; 
      ValueData: "URL:AI Learning Protocol"; Flags: uninsdeletekey

Root: HKA; Subkey: "Software\Classes\ailearn"; 
      ValueType: string; ValueName: "URL Protocol"; 
      ValueData: ""; Flags: uninsdeletevalue

Root: HKA; Subkey: "Software\Classes\ailearn\DefaultIcon"; 
      ValueType: string; ValueName: ""; 
      ValueData: "{app}\{#MyAppExeName},0"; Flags: uninsdeletekey

Root: HKA; Subkey: "Software\Classes\ailearn\shell\open\command"; 
      ValueType: string; ValueName: ""; 
      ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Flags: uninsdeletekey
```

**使用示例：**
```html
<a href="ailearn://lesson/123">打开课程 123</a>
```

---

## 🔧 高级功能

### 1. 检查系统要求

脚本已包含系统检查功能：

```pascal
[Code]
function CheckSystemRequirements(): Boolean;
var
  OSVersion: TWindowsVersion;
begin
  GetWindowsVersionEx(OSVersion);
  
  // 需要 Windows 10 或更高
  if (OSVersion.Major < 10) then
  begin
    MsgBox('此应用程序需要 Windows 10 或更高版本。', mbError, MB_OK);
    Result := False;
    Exit;
  end;
  
  Result := True;
end;
```

### 2. 检查 WebView2 运行时

```pascal
function CheckWebView2Runtime(): Boolean;
var
  WebView2Path: String;
begin
  // 检查是否已安装 WebView2
  Result := RegQueryStringValue(HKLM, 
    'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}', 
    'pv', WebView2Path);
    
  if not Result then
  begin
    Log('警告: 未检测到 WebView2 运行时');
  end;
end;
```

### 3. 检测已安装版本

```pascal
function IsAppAlreadyInstalled(): Boolean;
var
  InstallPath: String;
begin
  Result := RegQueryStringValue(HKLM, 'Software\{#MyAppName}', 
                                'InstallPath', InstallPath);
  if Result then
  begin
    Log('检测到已安装的应用: ' + InstallPath);
  end;
end;
```

### 4. 卸载时删除用户数据

```pascal
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usPostUninstall then
  begin
    // 询问是否删除用户数据
    if MsgBox('是否同时删除用户数据和配置？', 
              mbConfirmation, MB_YESNO) = IDYES then
    begin
      DelTree(ExpandConstant('{localappdata}\{#MyAppName}'), 
              True, True, True);
      DelTree(ExpandConstant('{app}\logs'), True, True, True);
      DelTree(ExpandConstant('{app}\cache'), True, True, True);
    end;
  end;
end;
```

---

## 📊 安装包功能清单

### ✅ 基本功能
- [x] 选择安装目录
- [x] 创建开始菜单快捷方式
- [x] 创建桌面快捷方式（可选）
- [x] 写入注册表信息
- [x] 完整的卸载程序
- [x] 中文安装界面

### ✅ 高级功能
- [x] 检查 Windows 版本（需要 Win10+）
- [x] 检测 WebView2 运行时
- [x] 检测已安装版本
- [x] 覆盖安装支持
- [x] 卸载时清理用户数据（可选）

### 🔧 可选功能（需取消注释）
- [ ] 文件关联（.ailearn）
- [ ] 自定义 URL 协议（ailearn://）
- [ ] 右键菜单集成
- [ ] 开机自启
- [ ] 防火墙规则配置
- [ ] 环境变量设置

---

## 🐛 常见问题

### Q1: 编译失败，提示 "Source file not found"

**解决方案：**
```powershell
# 确保已构建 exe 文件
wails build -platform windows/amd64 -ldflags="-s -w"

# 验证文件存在
Get-Item .\build\bin\ai-learning-platform.exe
```

### Q2: 找不到 ISCC.exe

**解决方案：**
```powershell
# 检查 Inno Setup 是否安装
Get-Command iscc

# 如果未找到，重新安装
choco install innosetup

# 或手动指定路径
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss
```

### Q3: 如何修改安装包图标？

**解决方案：**
```powershell
# 替换图标文件
# 将你的 .ico 文件复制到 build/appicon.ico

# 或在 installer.iss 中修改
SetupIconFile=build\appicon.ico
```

### Q4: 如何更改安装语言为英文？

**解决方案：**

修改 `installer.iss`：
```pascal
[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
```

### Q5: 安装包太大怎么办？

**解决方案：**
```powershell
# 1. 优化 exe 体积
wails build -platform windows/amd64 -ldflags="-s -w" -upx

# 2. Inno Setup 已使用最大压缩
# Compression=lzma2/ultra64 （已在脚本中配置）
```

---

## 📝 完整工作流程

### 开发阶段
```powershell
# 1. 开发测试
wails dev

# 2. 快速构建
wails build
```

### 测试阶段
```powershell
# 1. 优化构建
wails build -platform windows/amd64 -ldflags="-s -w"

# 2. 编译安装包
.\scripts\build-installer.ps1

# 3. 测试安装
.\scripts\build-installer.ps1 -Test
```

### 发布阶段
```powershell
# 1. 清理并重新构建
.\scripts\build.ps1 -Clean

# 2. 编译安装包
.\scripts\build-installer.ps1 -Clean

# 3. 验证安装包
Get-Item .\installer-output\*.exe

# 4. 上传到 GitHub Releases
# 或分发给用户
```

---

## 🎯 最佳实践

### 1. 版本号管理

在 `installer.iss` 和 `wails.json` 中保持版本一致：

```pascal
; installer.iss
#define MyAppVersion "1.0.0"
```

```json
// wails.json
{
  "version": "1.0.0"
}
```

### 2. GUID 管理

每次发布新版本时，**保持 AppId 不变**：

```pascal
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}
```

**生成新 GUID：**
```powershell
[guid]::NewGuid()
```

### 3. 签名（可选）

如果需要代码签名：

```pascal
[Setup]
SignedUninstaller=yes
SignTool=signtool $f
```

---

## 📚 相关资源

- **Inno Setup 官网**: https://jrsoftware.org/isinfo.php
- **Inno Setup 文档**: https://jrsoftware.org/ishelp/
- **Inno Setup 下载**: https://jrsoftware.org/isdl.php
- **示例脚本**: https://jrsoftware.org/ispack.php

---

## 🔗 相关文件

- **[installer.iss](file://e:\ai_assisting_code_learning\web\wails-app\installer.iss)** - Inno Setup 安装脚本
- **[build-installer.ps1](file://e:\ai_assisting_code_learning\web\wails-app\scripts\build-installer.ps1)** - 自动化构建脚本
- **[WAILS_BUILD_GUIDE.md](file://e:\ai_assisting_code_learning\web\wails-app\docs\WAILS_BUILD_GUIDE.md)** - Wails 打包指南

---

**最后更新**: 2026-04-29  
**适用版本**: Inno Setup 6.x
