param(
    [switch]$Silent
)

# Change to script directory
Set-Location -Path $PSScriptRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Learning Platform - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Start time: $(Get-Date)" -ForegroundColor Yellow
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Yellow

# Set environment variables if needed (uncomment and modify as needed)
# $env:ALP_SERVER_PORT = "8080"
# $env:ALP_DB_HOST = "localhost"
# $env:ALP_DB_USER = "postgres"
# $env:ALP_DB_PASSWORD = "postgres"
# $env:ALP_AI_API_KEY = "your-openai-api-key"
# $env:ALP_JWT_SECRET = "your-jwt-secret"

if ($Silent) {
    Start-Process -FilePath ".\server.exe" -WindowStyle Hidden
    Write-Host "??Service started in background!" -ForegroundColor Green
} else {
    .\server.exe
}
