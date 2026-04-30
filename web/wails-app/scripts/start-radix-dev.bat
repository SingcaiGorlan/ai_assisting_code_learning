@echo off
echo Starting Radix UI Development Server...
echo.
cd /d "%~dp0..\.."
cd frontend
call npm run dev
pause
