# Local Database Initialization Script (No Docker Required)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/init-local-db.ps1

Write-Host "`n=== AI Learning Platform - Local Database Initialization ===`n" -ForegroundColor Cyan

# Set encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue

if (-not $psqlPath) {
    Write-Host "Error: PostgreSQL not found!" -ForegroundColor Red
    Write-Host "`nPlease choose an installation method:`n" -ForegroundColor Cyan
    Write-Host "1. Download installer: https://www.postgresql.org/download/windows/"
    Write-Host "2. Use Chocolatey: choco install postgresql"
    Write-Host "3. Use Docker: docker compose -f docker-compose.dev.yml up -d"
    Write-Host "`nOr install Podman: winget install RedHat.Podman"
    Write-Host "`nRun this script again after installation.`n"
    exit 1
}

Write-Host "PostgreSQL installed: $($psqlPath.Source)`n" -ForegroundColor Green

# Database configuration
$dbHost = "localhost"
$dbPort = 5432
$dbUser = "postgres"
$dbPass = "postgres"
$dbName = "ai_learning"

Write-Host "Database configuration:" -ForegroundColor Yellow
Write-Host "  Host: $dbHost"
Write-Host "  Port: $dbPort"
Write-Host "  User: $dbUser"
Write-Host "  Database: $dbName"
Write-Host ""

# Set PGPASSWORD environment variable
$env:PGPASSWORD = $dbPass

# Test connection
Write-Host "Testing database connection..." -ForegroundColor Yellow
$connectionTest = & psql -h $dbHost -p $dbPort -U $dbUser -d postgres -c "SELECT 1;" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Connection successful!`n" -ForegroundColor Green
} else {
    Write-Host "Connection failed! Please check configuration and service status.`n" -ForegroundColor Red
    Write-Host "Error: $connectionTest" -ForegroundColor DarkGray
    Remove-Item Env:PGPASSWORD
    exit 1
}

# Create database
Write-Host "Creating database..." -ForegroundColor Yellow
& psql -h $dbHost -p $dbPort -U $dbUser -d postgres -c "CREATE DATABASE $dbName;" 2>$null
Write-Host "Database created: $dbName`n" -ForegroundColor Green

# Initialize schema
Write-Host "Initializing database schema..." -ForegroundColor Yellow
$initScript = "deployments/postgres/init.sql"
if (Test-Path $initScript) {
    & psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -f $initScript
    Write-Host "Schema initialization complete!`n" -ForegroundColor Green
} else {
    Write-Host "Warning: Init script not found: $initScript`n" -ForegroundColor Yellow
}

# Run Go migration
Write-Host "Running Go migration program..." -ForegroundColor Yellow
Write-Host "Command: go run ./cmd/migrate/main.go`n"
$env:GOPROXY = "https://goproxy.cn,direct"
go run ./cmd/migrate/main.go

# Cleanup environment variable
Remove-Item Env:PGPASSWORD

Write-Host "`n=== Initialization Complete ===`n" -ForegroundColor Green
Write-Host "Database is ready to use! You can now start the application." -ForegroundColor Cyan
