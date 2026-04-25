# Docker 服务管理脚本 - 适用于 WSL Docker 环境
# 用法: .\scripts\manage-docker.ps1 [start|stop|restart|status|logs]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("start", "stop", "restart", "status", "logs")]
    [string]$Action = "status"
)

$ComposeFile = "/mnt/e/ai_assisting_code_learning/docker-compose.dev.yml"

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Start-DockerServices {
    Write-Info "检查 WSL Docker 服务状态..."
    
    # 检查 Docker 服务是否运行
    $dockerCheck = wsl sudo docker ps 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Info "启动 WSL Docker 服务..."
        wsl sudo service docker start
        Start-Sleep -Seconds 3
        Write-Success "Docker 服务已启动"
    } else {
        Write-Success "Docker 服务运行正常"
    }
    
    Write-Info "启动依赖服务（PostgreSQL, Redis, MinIO）..."
    wsl sudo docker-compose -f $ComposeFile up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "依赖服务启动成功"
        Write-Info "等待服务健康检查..."
        Start-Sleep -Seconds 10
        
        # 检查 PostgreSQL 健康状态
        $pgReady = wsl sudo docker exec alp-postgres pg_isready -U postgres 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "PostgreSQL 已就绪"
        } else {
            Write-Error-Custom "PostgreSQL 可能还未完全就绪，请稍后重试"
        }
        
        Show-ServiceStatus
    } else {
        Write-Error-Custom "服务启动失败，请检查错误信息"
    }
}

function Stop-DockerServices {
    Write-Info "停止依赖服务..."
    wsl sudo docker-compose -f $ComposeFile down
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "依赖服务已停止"
    } else {
        Write-Error-Custom "服务停止失败"
    }
}

function Restart-DockerServices {
    Write-Info "重启依赖服务..."
    Stop-DockerServices
    Start-Sleep -Seconds 2
    Start-DockerServices
}

function Show-ServiceStatus {
    Write-Info "服务状态："
    Write-Host ""
    
    try {
        $containers = wsl sudo docker-compose -f $ComposeFile ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}" 2>&1
        Write-Host $containers -ForegroundColor White
    } catch {
        Write-Error-Custom "无法获取服务状态"
    }
    
    Write-Host ""
    Write-Host "端口映射：" -ForegroundColor Cyan
    Write-Host "  PostgreSQL: localhost:5432" -ForegroundColor White
    Write-Host "  Redis:      localhost:6379" -ForegroundColor White
    Write-Host "  MinIO API:  localhost:9000" -ForegroundColor White
    Write-Host "  MinIO UI:   localhost:9001" -ForegroundColor White
}

function Show-ServiceLogs {
    Write-Info "显示服务日志（按 Ctrl+C 退出）..."
    wsl sudo docker-compose -f $ComposeFile logs -f
}

# 主逻辑
switch ($Action) {
    "start" {
        Start-DockerServices
    }
    "stop" {
        Stop-DockerServices
    }
    "restart" {
        Restart-DockerServices
    }
    "status" {
        Show-ServiceStatus
    }
    "logs" {
        Show-ServiceLogs
    }
}
