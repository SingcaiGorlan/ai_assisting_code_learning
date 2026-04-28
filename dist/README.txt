# AI Learning Platform - Production Deployment Package

## Directory Structure
- server.exe - Main executable
- config.yaml - Configuration file
- start.bat - Windows batch startup script
- start.ps1 - PowerShell startup script
- logs/ - Log directory

## Quick Start
1. Make sure PostgreSQL and Redis services are running
2. Modify config.yaml with your database and AI settings
3. Double-click start.bat or run .\start.ps1 in PowerShell

## Environment Variables Override
You can override config values using these environment variables:
- ALP_SERVER_PORT - Server port
- ALP_DB_HOST - Database host
- ALP_DB_USER - Database username
- ALP_DB_PASSWORD - Database password
- ALP_AI_API_KEY - OpenAI API key
- ALP_JWT_SECRET - JWT secret

## Fast Startup Optimizations
- Used -trimpath and -ldflags "-s -w" to reduce executable size
- Removed debug symbols for faster startup
- Silent startup mode reduces console output overhead
- Pre-compilation optimizations reduce runtime overhead

## System Requirements
- Windows 10/11 or Windows Server 2016+
- PostgreSQL 15+
- Redis 7+
- .NET Framework 4.8+ (for PowerShell scripts)
