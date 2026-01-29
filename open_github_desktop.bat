@echo off
echo Opening GitHub Desktop...
start "" "%LOCALAPPDATA%\GitHubDesktop\GitHubDesktop.exe" --open-repo "%~dp0"
echo.
echo GitHub Desktop should now be open with your repository.
echo Click the "Push origin" button to push your commit.
echo.
pause
