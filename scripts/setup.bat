@echo off
REM EduTech Learning Platform - Setup Script for Windows
REM This script automates the setup process

echo.
echo ================================
echo EduTech Learning Platform Setup
echo ================================
echo.

REM Check Python
echo Checking prerequisites...
where node >nul 2>nul && echo [OK] Node.js installed || echo [ERROR] Node.js not found
where npm >nul 2>nul && echo [OK] npm installed || echo [ERROR] npm not found
where docker >nul 2>nul && echo [OK] Docker installed || echo [ERROR] Docker not found
echo.

REM Backend Setup
echo Setting up backend...
cd backend-api
echo Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)
echo [OK] Backend dependencies installed
cd ..
echo.

REM Mobile Setup
echo Setting up mobile app...
cd mobile-app
echo Getting Flutter dependencies...
call flutter pub get
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to get Flutter dependencies
    exit /b 1
)
echo [OK] Mobile dependencies installed
cd ..
echo.

REM Docker Compose
echo Starting Docker services...
call docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to start Docker services
    exit /b 1
)
echo [OK] Docker services started
echo.

REM Summary
echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next Steps:
echo 1. Update Firebase credentials:
echo    Edit: mobile-app\lib\firebase_options.dart
echo.
echo 2. Start backend server:
echo    cd backend-api ^& npm run start:dev
echo.
echo 3. Start mobile app:
echo    cd mobile-app ^& flutter run
echo.
echo 4. Access API documentation:
echo    http://localhost:3000/api/docs
echo.
pause
