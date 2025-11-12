@echo off
echo ========================================
echo  Starting Bulalacao Health Hub
echo ========================================
echo.

echo Starting Backend Server (Laravel)...
start "Laravel Backend" cmd /k "php artisan serve"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server (React)...
start "React Frontend" cmd /k "cd react-frontend && npm run dev"

echo.
echo ========================================
echo  Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows will open.
echo Keep both windows open!
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:5173

echo.
echo Servers are running!
echo Close this window when you're done.
echo.
