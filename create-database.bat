@echo off
echo ========================================
echo  Creating Bulalacao Health Hub Database
echo ========================================
echo.

REM Check if MySQL is in PATH (Laragon adds it)
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo MySQL not found in PATH. Using Laragon MySQL...
    set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.0.30-winx64\bin\mysql.exe
) else (
    set MYSQL_PATH=mysql
)

echo Step 1: Creating database and tables...
echo.

REM Run the SQL file
"%MYSQL_PATH%" -u root -e "source setup_database.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Database created successfully!
    echo.
    echo Database: bulalacao_health_hub
    echo Tables: users, patients, staff, rooms, medicines, ambulances
    echo.
    echo Admin Account Created:
    echo Email: admin@gmail.com
    echo Password: Admin2025
    echo.
) else (
    echo.
    echo ========================================
    echo  ERROR
    echo ========================================
    echo.
    echo Could not create database.
    echo.
    echo Please try Method 2:
    echo 1. Open phpMyAdmin (http://localhost/phpmyadmin)
    echo 2. Click SQL tab
    echo 3. Click Import
    echo 4. Select setup_database.sql
    echo 5. Click Go
    echo.
)

pause
