@echo off
setlocal enabledelayedexpansion

REM Change to script directory
cd /d "%~dp0"

REM Set environment variables if needed (uncomment and modify as needed)
REM set ALP_SERVER_PORT=8080
REM set ALP_DB_HOST=localhost
REM set ALP_DB_USER=postgres
REM set ALP_DB_PASSWORD=postgres
REM set ALP_AI_API_KEY=your-openai-api-key
REM set ALP_JWT_SECRET=your-jwt-secret

echo ========================================
echo AI Learning Platform - Quick Start
echo ========================================
echo Start time: %date% %time%
echo Working directory: %cd%

REM Start server
.\server.exe

pause
