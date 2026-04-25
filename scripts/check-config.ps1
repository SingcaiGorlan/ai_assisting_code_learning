# check-config.ps1
# This script helps check and configure the database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Database Configuration Check Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Display config information
Write-Host "Database settings from config file:" -ForegroundColor Yellow
Write-Host "  Host: localhost"
Write-Host "  Port: 5432"
Write-Host "  Username: postgres"
Write-Host "  Password: postgres"
Write-Host "  Database: ai_learning"
Write-Host ""

# Check PostgreSQL service
$service = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
if ($service) {
    Write-Host "PostgreSQL Service Status: $($service.Status)" -ForegroundColor Green
    
    if ($service.Status -eq "Running") {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "Next Steps Guide" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Problem: Database password authentication failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Solution:" -ForegroundColor Yellow
        Write-Host "1. Open 'SQL Shell (psql)' from Windows Start Menu" -ForegroundColor White
        Write-Host "2. Press Enter to accept defaults, input your PostgreSQL password" -ForegroundColor White
        Write-Host "3. Run the following command to reset password to 'postgres':" -ForegroundColor White
        Write-Host "   ALTER USER postgres PASSWORD 'postgres';" -ForegroundColor Green
        Write-Host "4. Create database 'ai_learning':" -ForegroundColor White
        Write-Host "   CREATE DATABASE ai_learning;" -ForegroundColor Green
        Write-Host "5. Re-run migration program:" -ForegroundColor White
        Write-Host "   go run .\cmd\migrate\main.go" -ForegroundColor Green
    } else {
        Write-Host "PostgreSQL service is not running, please start the service first" -ForegroundColor Red
        Write-Host "   Start-Service $($service.Name)" -ForegroundColor Yellow
    }
} else {
    Write-Host "PostgreSQL service not found" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or check the service name" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
