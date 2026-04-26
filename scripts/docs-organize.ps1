# 文档整理定时任务 (PowerShell)
# 使用任务计划程序运行此脚本

$projectPath = "E:\ai_assisting_code_learning"
$logFile = "$projectPath\tmp\docs-organize.log"

Set-Location $projectPath

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"[$timestamp] 开始整理文档" | Out-File -FilePath $logFile -Append

# 检查文档结构
$docsCount = (Get-ChildItem -Path "$projectPath\docs" -Filter "*.md" -Recurse).Count
"文档数量: $docsCount" | Out-File -FilePath $logFile -Append

# 检查 TODO/FIXME
$todos = Get-ChildItem -Path $projectPath -Include "*.go","*.ts" -Recurse | Select-String -Pattern "TODO|FIXME" -SimpleMatch
"TODO/FIXME 数量: $($todos.Count)" | Out-File -FilePath $logFile -Append

"[$timestamp] 整理完成" | Out-File -FilePath $logFile -Append
