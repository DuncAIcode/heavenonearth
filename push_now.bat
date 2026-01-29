@echo off
echo Attempting to push changes to GitHub...
git add .
git commit -m "antigravity: project sync and diagnostics"
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo PUSH FAILED! 
    echo Please open GitHub Desktop and click "Push origin" manually.
) else (
    echo.
    echo PUSH SUCCESSFUL! Vercel will now start a new build.
)
pause
