@echo off
echo ===================================================
echo           ACCELERON BUILD SCRIPT
echo ===================================================
echo.
echo This script will build Acceleron and create installer files.
echo.
echo DISCLAIMER: By using this software, you acknowledge that 
echo any changes made to your system are at your own risk.
echo.
echo ===================================================
echo.

REM Get the script's directory
set "SCRIPT_DIR=%~dp0"

REM Change to the script's directory
cd /d "%SCRIPT_DIR%"
echo [INFO] Working directory: %CD%

REM Check if we're in the right directory structure
if not exist "frontend\package.json" (
    REM Try to find the correct directory
    if exist "..\Acceleron\frontend\package.json" (
        echo [INFO] Found Acceleron directory in parent folder, navigating there...
        cd /d "..\Acceleron"
    ) else if exist "Documents\Acceleron\frontend\package.json" (
        echo [INFO] Found Acceleron in Documents folder, navigating there...
        cd /d "Documents\Acceleron"
    ) else (
        echo ERROR: Could not find the Acceleron project directory.
        echo Current directory: %CD%
        echo.
        echo Please place this script in the Acceleron root directory and try again.
        pause
        exit /b 1
    )
)

echo [INFO] Building from directory: %CD%

echo [1/4] Installing dependencies...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to install dependencies.
    exit /b 1
)

echo.
echo [2/4] Building the application...
echo This may take several minutes...
echo.

REM Check if tauri.conf.json exists
if not exist "src-tauri\tauri.conf.json" (
    echo ERROR: Tauri configuration file not found.
    echo Expected at: %CD%\src-tauri\tauri.conf.json
    exit /b 1
)

REM Run the build command
call npm run tauri:build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed.
    exit /b 1
)

echo.
echo [3/4] Copying installers to output directory...

REM Create output directory if it doesn't exist
if not exist "..\output" mkdir "..\output"

REM Create output directory if it doesn't exist
if not exist "..\output" mkdir "..\output"

REM Find and copy MSI installer
for /f "delims=" %%a in ('dir /b /s "src-tauri\target\release\bundle\msi\*.msi"') do (
    copy "%%a" "..\output\Acceleron_Installer.msi"
    echo Found and copied MSI installer: %%a
)
if %ERRORLEVEL% neq 0 (
    echo WARNING: Failed to copy MSI installer.
)

REM Find and copy EXE installer
for /f "delims=" %%a in ('dir /b /s "src-tauri\target\release\bundle\nsis\*setup.exe"') do (
    copy "%%a" "..\output\Acceleron_Setup.exe"
    echo Found and copied EXE installer: %%a
)
if %ERRORLEVEL% neq 0 (
    echo WARNING: Failed to copy EXE installer.
)

echo.
echo [4/4] Build complete!
echo.
echo Installers are available in the 'output' directory:
echo - Acceleron_Installer.msi (Windows Installer)
echo - Acceleron_Setup.exe (Executable Installer)
echo.
echo ===================================================
echo DISCLAIMER: By using this software, you acknowledge that 
echo any changes made to your system are at your own risk.
echo ===================================================
echo.

cd ..
pause
