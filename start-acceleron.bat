@echo off
echo Starting Acceleron App...
echo.

REM Set window title
title Acceleron Launcher

REM Define colors for console output
set "GREEN=92"
set "YELLOW=93"
set "CYAN=96"
set "WHITE=97"

REM Display banner
echo.
call :colorEcho %CYAN% "    _                  _                      "
echo.
call :colorEcho %CYAN% "   / \   ___ ___ ___  | | ___ _ __ ___  _ __  "
echo.
call :colorEcho %CYAN% "  / _ \ / __/ __/ _ \ | |/ _ \ '__/ _ \| '_ \ "
echo.
call :colorEcho %CYAN% " / ___ \ (_| (_|  __/ | |  __/ | | (_) | | | |"
echo.
call :colorEcho %CYAN% "/_/   \_\___\___\___| |_|\___|_|  \___/|_| |_|"
echo.
echo.
call :colorEcho %WHITE% "App Optimization Tool"
echo.
echo.

REM Check if Deno is installed
where deno >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    call :colorEcho %YELLOW% "WARNING: Deno is not installed or not in PATH."
    echo.
    call :colorEcho %YELLOW% "Please install Deno from https://deno.land/"
    echo.
    pause
    exit /b 1
)

REM Start the backend server in a new window
echo Starting Deno backend server...
start "Acceleron Backend" cmd /c "cd backend && deno run --allow-net server.ts"
call :colorEcho %GREEN% "Backend server starting on http://localhost:8000"
echo.

REM Wait a moment for backend to initialize
timeout /t 2 >nul

REM Start the frontend in a new window
echo Starting Tauri frontend...
start "Acceleron Frontend" cmd /c "cd frontend && npm run tauri:dev"
call :colorEcho %GREEN% "Frontend starting..."
echo.

echo.
call :colorEcho %CYAN% "Acceleron is now running!"
echo.
echo Press any key to shut down all Acceleron processes...
pause >nul

REM Kill all related processes when the user presses a key
echo Shutting down Acceleron...
taskkill /f /fi "WINDOWTITLE eq Acceleron Backend" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq Acceleron Frontend" >nul 2>&1
echo Done!

exit /b 0

:colorEcho
echo|set /p="[%~1m%~2[0m"
exit /b 0