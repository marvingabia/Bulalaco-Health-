@echo off
echo Deleting bulalacao-health-hub folder...
echo.
echo Please close any files/terminals from this folder first!
echo Press any key to continue...
pause > nul

rmdir /s /q bulalacao-health-hub

if exist bulalacao-health-hub (
    echo.
    echo ERROR: Could not delete folder. It's still being used by another process.
    echo Please:
    echo 1. Close all files from bulalacao-health-hub in your IDE
    echo 2. Close any terminals in that directory
    echo 3. Close file explorer if open in that folder
    echo 4. Try running this script again
) else (
    echo.
    echo SUCCESS: Folder deleted successfully!
)

echo.
pause
