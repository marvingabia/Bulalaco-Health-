@echo off
echo ========================================
echo  Fixing Backend Connection
echo ========================================
echo.

echo Step 1: Clearing Laravel cache...
php artisan config:clear
php artisan route:clear
php artisan cache:clear

echo.
echo Step 2: Checking routes...
php artisan route:list --path=api

echo.
echo ========================================
echo  Backend Fixed!
echo ========================================
echo.
echo Now restart the Laravel server:
echo 1. Stop the current server (Ctrl+C)
echo 2. Run: php artisan serve
echo.
pause
