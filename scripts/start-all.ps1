param(
    [string]$ApiDir = "e:/ai_assisting_code_learning",
    [string]$AdminDir = "e:/ai_assisting_code_learning/web/admin"
)

Write-Host "== AI Learning Platform: start backend + admin UI ==" -ForegroundColor Cyan

# Backend
Write-Host "[Backend] go run ./cmd/server/main.go" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command", "cd $ApiDir; go run ./cmd/server/main.go" -WindowStyle Minimized

# Admin UI (Vite dev)
Write-Host "[Admin UI] npm run dev" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command", "cd $AdminDir; if (!(Test-Path node_modules)) { npm install }; npm run dev" -WindowStyle Minimized

Write-Host "Started. Backend: http://localhost:8080  | Admin UI: http://localhost:4174/admin/" -ForegroundColor Green
