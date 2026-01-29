# Simple Git Push Script
# This will push your commit and save credentials for future use

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Git Push Helper" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "C:\Users\db4sa\Desktop\ANTIGRAVITY\test1"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Show git status
Write-Host "Git Status:" -ForegroundColor Green
git status --short
Write-Host ""

# Show commits to push
Write-Host "Commits to push:" -ForegroundColor Green
git log origin/main..HEAD --oneline
Write-Host ""

# Push
Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "A browser window will open for authentication." -ForegroundColor Yellow
Write-Host "After you authenticate ONCE, credentials will be saved." -ForegroundColor Yellow
Write-Host ""

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCCESS! Push completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vercel will now automatically deploy your changes." -ForegroundColor Cyan
    Write-Host "Wait 1-2 minutes, then visit:" -ForegroundColor Cyan
    Write-Host "https://heavenonearth1.vercel.app" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Push failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please use GitHub Desktop instead:" -ForegroundColor Yellow
    Write-Host "1. Open GitHub Desktop" -ForegroundColor White
    Write-Host "2. Select 'heavenonearth' repository" -ForegroundColor White
    Write-Host "3. Click 'Push origin' button" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
