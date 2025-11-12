@echo off
echo ========================================
echo  Creating Database: bulalacao health_hub
echo ========================================
echo.

echo Creating database with space in name...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS `bulalacao health_hub`;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Database created!
    echo.
    echo Database name: bulalacao health_hub
    echo.
    echo Next steps:
    echo 1. Run: php artisan migrate
    echo 2. Run: php artisan db:seed --class=AdminUserSeeder
    echo.
) else (
    echo.
    echo ERROR: Could not create database.
    echo Make sure MySQL is running in Laragon.
    echo.
)

pause
