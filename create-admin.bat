@echo off
echo ========================================
echo  Creating Admin User
echo ========================================
echo.
echo Email: admin@gmail.com
echo Password: Admin2025
echo.
echo Starting...
echo.

REM Make sure Laragon MySQL is running
echo Step 1: Checking MySQL connection...
php artisan db:seed --class=AdminUserSeeder

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Admin user created successfully!
    echo.
    echo Login credentials:
    echo Email: admin@gmail.com
    echo Password: Admin2025
    echo.
) else (
    echo.
    echo ========================================
    echo  ERROR: MySQL is not running
    echo ========================================
    echo.
    echo Please:
    echo 1. Start Laragon
    echo 2. Make sure MySQL is running
    echo 3. Run this script again
    echo.
)

pause
