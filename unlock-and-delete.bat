@echo off
echo ========================================
echo  Unlock and Delete bulalacao-health-hub
echo ========================================
echo.

set FOLDER=bulalacao-health-hub

echo Step 1: Checking if folder exists...
if not exist "%FOLDER%" (
    echo SUCCESS: Folder does not exist!
    goto :end
)

echo Folder found: %FOLDER%
echo.

echo Step 2: Attempting to delete...
rmdir /s /q "%FOLDER%" 2>nul

if not exist "%FOLDER%" (
    echo SUCCESS: Folder deleted!
    goto :end
)

echo.
echo Step 3: Folder is locked. Trying to unlock...
echo.

REM Kill any node processes that might be locking it
echo Stopping Node.js processes...
taskkill /F /IM node.exe 2>nul

REM Wait a moment
timeout /t 2 /nobreak >nul

echo Trying to delete again...
rmdir /s /q "%FOLDER%" 2>nul

if not exist "%FOLDER%" (
    echo SUCCESS: Folder deleted!
    goto :end
)

echo.
echo ========================================
echo  MANUAL STEPS REQUIRED
echo ========================================
echo The folder is still locked. Please:
echo.
echo 1. Close Kiro IDE completely
echo 2. Open Task Manager (Ctrl+Shift+Esc)
echo 3. End any "Node.js" or "Code" processes
echo 4. Run this script again
echo.
echo OR
echo.
echo 1. Restart your computer
echo 2. Delete the folder manually
echo.

:end
echo.
pause
