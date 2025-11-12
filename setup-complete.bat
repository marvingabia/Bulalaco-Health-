@echo off
echo ========================================
echo  Complete Setup - Bulalacao Health Hub
echo ========================================
echo.

echo Step 1: Creating database...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS `bulalacao health_hub`;"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Could not create database. Make sure MySQL is running in Laragon.
    pause
    exit /b 1
)

echo Database created successfully!
echo.

echo Step 2: Running migrations...
php artisan migrate --force

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Migrations failed.
    pause
    exit /b 1
)

echo Migrations completed!
echo.

echo Step 3: Creating admin user...
php artisan db:seed --class=AdminUserSeeder --force

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Could not create admin user.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  SUCCESS! Setup Complete!
echo ========================================
echo.
echo Database: bulalacao health_hub
echo.
echo Admin Login:
echo Email: admin@gmail.com
echo Password: Admin2025
echo.
echo Next steps:
echo 1. Run: php artisan serve
echo 2. Run: cd react-frontend && npm run dev
echo 3. Open: http://localhost:5173
echo 4. Login with admin credentials
echo.

pause
