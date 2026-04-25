# Quick Start Script for Database Migration
# This script helps you set up and run the migration

Write-Host "`n=== Database Migration Quick Start ===`n" -ForegroundColor Cyan

# Check prerequisites
Write-Host "Step 1: Checking prerequisites..." -ForegroundColor Yellow

# Check Go
$goVersion = go version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Go is installed" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Go is not installed" -ForegroundColor Red
    exit 1
}

# Check for database access
Write-Host "`nStep 2: Checking database access..." -ForegroundColor Yellow
$dbAvailable = $false

# Try Docker
$dockerVersion = docker --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Docker is available" -ForegroundColor Green
    $dbAvailable = $true
} else {
    # Try Podman
    $podmanVersion = podman --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Podman is available" -ForegroundColor Green
        $dbAvailable = $true
    } else {
        # Try PostgreSQL
        $psqlVersion = psql --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] PostgreSQL is installed" -ForegroundColor Green
            $dbAvailable = $true
        }
    }
}

if (-not $dbAvailable) {
    Write-Host "`n  [ERROR] No database access found!" -ForegroundColor Red
    Write-Host "`n  Please install one of the following:" -ForegroundColor Yellow
    Write-Host "    - Docker Desktop: https://www.docker.com/products/docker-desktop"
    Write-Host "    - Podman: winget install RedHat.Podman"
    Write-Host "    - PostgreSQL: https://www.postgresql.org/download/windows/"
    exit 1
}

# Ask user what to do
Write-Host "`nStep 3: Choose an option:`n" -ForegroundColor Yellow
Write-Host "  1. Start database with Docker"
Write-Host "  2. Start database with Podman"
Write-Host "  3. Use existing PostgreSQL (local)"
Write-Host "  4. Run migration only (database already running)"
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`nStarting PostgreSQL with Docker..." -ForegroundColor Yellow
        docker compose -f docker-compose.dev.yml up -d postgres
        Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host "Database started!" -ForegroundColor Green
    }
    "2" {
        Write-Host "`nStarting PostgreSQL with Podman..." -ForegroundColor Yellow
        podman compose -f docker-compose.dev.yml up -d postgres
        Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host "Database started!" -ForegroundColor Green
    }
    "3" {
        Write-Host "`nMake sure PostgreSQL is running and database 'ai_learning' exists." -ForegroundColor Yellow
        Write-Host "You can create it with: CREATE DATABASE ai_learning;" -ForegroundColor Cyan
        $continue = Read-Host "Press Enter to continue (or Ctrl+C to cancel)"
    }
    "4" {
        Write-Host "`nSkipping database setup..." -ForegroundColor Yellow
    }
    default {
        Write-Host "Invalid choice!" -ForegroundColor Red
        exit 1
    }
}

# Run migration
Write-Host "`nStep 4: Running migration..." -ForegroundColor Yellow
Write-Host "Command: go run ./cmd/migrate/main.go`n"

$env:GOPROXY = "https://goproxy.cn,direct"
go run ./cmd/migrate/main.go

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Success! ===" -ForegroundColor Green
    Write-Host "Database migration completed successfully." -ForegroundColor Cyan
    Write-Host "You can now start the server: go run ./cmd/server/main.go`n"
} else {
    Write-Host "`n=== Failed ===" -ForegroundColor Red
    Write-Host "Migration failed. Please check the error messages above." -ForegroundColor Red
    Write-Host "See docs/MIGRATION_GUIDE.md for troubleshooting.`n"
    exit 1
}
