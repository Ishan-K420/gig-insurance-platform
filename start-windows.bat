@echo off
echo Checking project location...
echo.

REM Check if running from WSL or native Windows
if exist "gig-insurance-platform" (
    echo Found project in current directory
    cd gig-insurance-platform
) else if exist "%USERPROFILE%\gig-insurance-platform" (
    echo Found project in user home
    cd /d "%USERPROFILE%\gig-insurance-platform"
) else (
    echo ERROR: Project not found!
    echo.
    echo Please navigate to the project directory first:
    echo   cd path\to\gig-insurance-platform
    echo.
    echo Or copy the project from /home/ishan/gig-insurance-platform
    pause
    exit /b 1
)

echo.
echo Starting ML Service...
echo.
start cmd /k "cd ml-service && pip install -r requirements.txt && python app.py"

timeout /t 3

echo Starting Backend...
echo.
start cmd /k "cd backend && npm install && npm start"

timeout /t 3

echo Starting Frontend...
echo.
start cmd /k "cd frontend && npm install && npm start"

echo.
echo All services starting in separate windows...
echo.
pause
