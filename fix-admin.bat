@echo off
echo ========================================
echo  Fixing Admin Password
echo ========================================
echo.

echo Updating admin password to: Admin2025
echo.

mysql -u root "bulalacao health_hub" < fix_admin_password.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Admin password has been reset!
    echo.
    echo Login with:
    echo Email: admin@gmail.com
    echo Password: Admin2025
    echo.
) else (
    echo.
    echo ERROR: Could not update password.
    echo.
    echo Try Method 2:
    echo 1. Open phpMyAdmin
    echo 2. Select database: bulalacao health_hub
    echo 3. Click on 'users' table
    echo 4. Edit the admin@gmail.com row
    echo 5. Set password to: $2y$10$hvHLdXFaRWd.78ZTDSLX8u1cHuuuZ2/tP0qVEYxD4QSQuamCuRaD2
    echo.
)

pause
