@echo off
echo ===================================================
echo        CLEAN GIT REPOSITORY SCRIPT
echo ===================================================
echo.
echo This script will remove files from Git tracking that
echo should be ignored according to your .gitignore files.
echo.
echo WARNING: This will NOT delete the files from your system,
echo but will remove them from Git tracking.
echo.
echo ===================================================
echo.

REM Get the script's directory
set "SCRIPT_DIR=%~dp0"

REM Change to the script's directory
cd /d "%SCRIPT_DIR%"
echo [INFO] Working directory: %CD%

REM Check if .git directory exists
if not exist ".git" (
    echo ERROR: This is not a Git repository.
    echo Please run this script from the root of your Git repository.
    pause
    exit /b 1
)

echo [INFO] Removing files from Git tracking that match .gitignore rules...
echo.

REM First, show what files would be removed
echo The following files will be removed from Git tracking:
echo.
git ls-files -ci --exclude-standard

echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

REM Remove the files from Git tracking
git rm -r --cached .
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to remove files from Git tracking.
    pause
    exit /b 1
)

REM Add all files back (except those in .gitignore)
git add .
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to re-add files to Git tracking.
    pause
    exit /b 1
)

echo.
echo [INFO] Files successfully removed from Git tracking.
echo.
echo To complete the process, commit these changes:
echo   git commit -m "Remove files that should be ignored"
echo   git push
echo.
echo ===================================================

pause
