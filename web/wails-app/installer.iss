; ============================================================================
; AI Learning Platform - Inno Setup 安装脚本
; ============================================================================
; 版本: 1.0.0
; 作者: AI Learning Platform Team
; 描述: 基于 Wails 的 AI 辅助代码学习平台桌面应用
; ============================================================================

; 定义常量
#define MyAppName "AI 辅助代码学习平台"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "AI Learning Platform Team"
#define MyAppURL "https://github.com/your-repo/ai-learning-platform"
#define MyAppExeName "ai-learning-platform.exe"
#define MyAppAssocName "AI Learning File"
#define MyAppAssocExt ".ailearn"
#define MyAppAssocKey StringChange(MyAppAssocName, " ", "") + MyAppAssocExt

[Setup]
; 应用程序标识符（唯一 GUID，每次发布保持不变）
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}

; 基本信息
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}

; 安装目录
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}

; 输出设置
OutputDir=installer-output
OutputBaseFilename=AI-Learning-Platform-Setup-{#MyAppVersion}
SetupIconFile=build\appicon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}

; 压缩设置
Compression=lzma2/ultra64
SolidCompression=yes
LZMAUseSeparateProcess=yes

; 权限要求
PrivilegesRequired=admin
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

; 用户界面
WizardStyle=modern
DisableWelcomePage=no
DisableProgramGroupPage=yes
DisableFinishedPage=no
ShowLanguageDialog=no

; 语言
Languages: chinesesimplified

[Languages]
Name: "chinesesimplified"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[Tasks]
; 桌面快捷方式
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
; 快速启动图标
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode
; 开机自启
Name: "autostart"; Description: "开机自动启动"; GroupDescription: "附加任务:"; Flags: unchecked

[Files]
; 主程序
Source: "build\bin\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
; 配置文件（如果存在）
; Source: "config\*"; DestDir: "{app}\config"; Flags: ignoreversion recursesubdirs createallsubdirs
; 数据文件（如果存在）
; Source: "data\*"; DestDir: "{app}\data"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
; 开始菜单程序组
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{group}\查看文档"; Filename: "{app}\docs\README.md"; Flags: nowait skipifsilent skipifdoesntexist
; 桌面快捷方式
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
; 快速启动
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Registry]
; 写入安装信息到注册表
Root: HKLM; Subkey: "Software\{#MyAppName}"; ValueType: string; ValueName: "InstallPath"; ValueData: "{app}"; Flags: uninsdeletevalue
Root: HKLM; Subkey: "Software\{#MyAppName}"; ValueType: string; ValueName: "Version"; ValueData: "{#MyAppVersion}"; Flags: uninsdeletevalue
Root: HKLM; Subkey: "Software\{#MyAppName}"; ValueType: string; ValueName: "Publisher"; ValueData: "{#MyAppPublisher}"; Flags: uninsdeletevalue

; 文件关联（可选）
; Root: HKA; Subkey: "Software\Classes\{#MyAppAssocExt}\OpenWithProgids"; ValueType: string; ValueName: "{#MyAppAssocKey}"; ValueData: ""; Flags: uninsdeletevalue
; Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}"; ValueType: string; ValueName: ""; ValueData: "{#MyAppAssocName}"; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\Applications\{#MyAppExeName}\SupportedTypes"; ValueType: string; ValueName: ".ailearn"; ValueData: ""; Flags: uninsdeletevalue

; 自定义 URL 协议（可选）
; Root: HKA; Subkey: "Software\Classes\ailearn"; ValueType: string; ValueName: ""; ValueData: "URL:AI Learning Protocol"; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\ailearn"; ValueType: string; ValueName: "URL Protocol"; ValueData: ""; Flags: uninsdeletevalue
; Root: HKA; Subkey: "Software\Classes\ailearn\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\ailearn\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Flags: uninsdeletekey

; 添加到右键菜单（可选）
; Root: HKA; Subkey: "Software\Classes\*\shell\使用 AI 学习平台打开"; ValueType: string; ValueName: ""; ValueData: "使用 AI 学习平台打开"; Flags: uninsdeletekey
; Root: HKA; Subkey: "Software\Classes\*\shell\使用 AI 学习平台打开\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Flags: uninsdeletekey

[Run]
; 安装完成后运行程序
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

; 注册环境变量（如果需要）
; Filename: "{cmd}"; Parameters: "/C setx AI_LEARNING_PATH ""{app}"" /M"; Flags: runhidden; StatusMsg: "正在配置环境变量..."

[UninstallDelete]
; 卸载时删除额外文件
Type: filesandordirs; Name: "{app}\logs"
Type: filesandordirs; Name: "{app}\cache"
Type: filesandordirs; Name: "{localappdata}\{#MyAppName}"

[Code]
// ============================================================================
// Pascal Script 代码
// ============================================================================

var
  DownloadPage: TDownloadWizardPage;

// 初始化下载页面（如果需要在线下载依赖）
procedure InitializeWizard;
begin
  // 如果需要在线下载 WebView2 或其他依赖，可以在这里添加
  // DownloadPage := CreateDownloadPage(SetupMessage(msgWizardPreparing), SetupMessage(msgPreparingDesc), nil);
end;

// 检查是否已安装
function IsAppAlreadyInstalled(): Boolean;
var
  InstallPath: String;
begin
  Result := RegQueryStringValue(HKLM, 'Software\{#MyAppName}', 'InstallPath', InstallPath);
  if Result then
  begin
    Log('检测到已安装的应用: ' + InstallPath);
  end;
end;

// 检查系统要求
function CheckSystemRequirements(): Boolean;
var
  OSVersion: TWindowsVersion;
begin
  GetWindowsVersionEx(OSVersion);
  
  // 检查 Windows 版本（需要 Windows 10 或更高）
  if (OSVersion.Major < 10) then
  begin
    MsgBox('此应用程序需要 Windows 10 或更高版本。', mbError, MB_OK);
    Result := False;
    Exit;
  end;
  
  Result := True;
end;

// 检查 WebView2 运行时
function CheckWebView2Runtime(): Boolean;
var
  WebView2Path: String;
begin
  // 检查 WebView2 是否已安装
  Result := RegQueryStringValue(HKLM, 'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}', 'pv', WebView2Path);
  
  if not Result then
  begin
    // 也检查用户级别安装
    Result := RegQueryStringValue(HKCU, 'Software\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}', 'pv', WebView2Path);
  end;
  
  if not Result then
  begin
    Log('未检测到 WebView2 运行时');
  end
  else
  begin
    Log('检测到 WebView2 运行时: ' + WebView2Path);
  end;
end;

// 初始化安装
function InitializeSetup(): Boolean;
begin
  Result := True;
  
  // 检查系统要求
  if not CheckSystemRequirements() then
  begin
    Result := False;
    Exit;
  end;
  
  // 检查 WebView2
  CheckWebView2Runtime();
  
  // 提示已安装
  if IsAppAlreadyInstalled() then
  begin
    if MsgBox('检测到系统中已安装 {#MyAppName}。' + #13#10 + 
              '是否要覆盖安装？', mbConfirmation, MB_YESNO) = IDNO then
    begin
      Result := False;
    end;
  end;
end;

// 获取已安装版本
function GetInstalledVersion(): String;
var
  Version: String;
begin
  if RegQueryStringValue(HKLM, 'Software\{#MyAppName}', 'Version', Version) then
  begin
    Result := Version;
  end
  else
  begin
    Result := '未知';
  end;
end;

// 准备安装
procedure CurStepChanged(CurStep: TSetupStep);
var
  TaskResult: Integer;
begin
  if CurStep = ssPostInstall then
  begin
    // 安装完成后的操作
    Log('安装完成');
    
    // 如果需要配置防火墙规则
    // ShellExec('', 'netsh', 'advfirewall firewall add rule name="AI Learning Platform" dir=in action=allow program="{app}\{#MyAppExeName}" enable=yes', '', SW_HIDE, ewWaitUntilTerminated, TaskResult);
  end;
end;

// 准备卸载
function InitializeUninstall(): Boolean;
begin
  if MsgBox('确定要卸载 {#MyAppName} 吗？', mbConfirmation, MB_YESNO) = IDYES then
  begin
    Log('开始卸载');
    Result := True;
  end
  else
  begin
    Result := False;
  end;
end;

// 卸载进度
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usUninstall then
  begin
    Log('正在卸载...');
  end;
  
  if CurUninstallStep = usPostUninstall then
  begin
    // 询问是否删除用户数据
    if MsgBox('是否同时删除用户数据和配置？', mbConfirmation, MB_YESNO) = IDYES then
    begin
      DelTree(ExpandConstant('{localappdata}\{#MyAppName}'), True, True, True);
      DelTree(ExpandConstant('{app}\logs'), True, True, True);
      DelTree(ExpandConstant('{app}\cache'), True, True, True);
      Log('已删除用户数据');
    end;
  end;
end;

// 获取显示大小
function GetDisplayName(): String;
begin
  Result := '{#MyAppName}';
end;

// 获取显示版本
function GetDisplayVersion(): String;
begin
  Result := '{#MyAppVersion}';
end;
