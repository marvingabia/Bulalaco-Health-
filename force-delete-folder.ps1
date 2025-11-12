# Force Delete bulalacao-health-hub folder
Write-Host "Waiting 3 seconds for processes to release the folder..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

$folderPath = "bulalacao-health-hub"

if (Test-Path $folderPath) {
    Write-Host "Attempting to delete $folderPath..." -ForegroundColor Cyan
    
    try {
        # Try normal delete first
        Remove-Item -Path $folderPath -Recurse -Force -ErrorAction Stop
        Write-Host "SUCCESS: Folder deleted!" -ForegroundColor Green
    }
    catch {
        Write-Host "Normal delete failed. Trying alternative method..." -ForegroundColor Yellow
        
        # Try using cmd
        cmd /c "rmdir /s /q $folderPath" 2>$null
        
        if (Test-Path $folderPath) {
            Write-Host "ERROR: Could not delete folder. Please:" -ForegroundColor Red
            Write-Host "1. Close all files from this folder in your IDE" -ForegroundColor Yellow
            Write-Host "2. Close any terminals in that directory" -ForegroundColor Yellow
            Write-Host "3. Restart your IDE" -ForegroundColor Yellow
            Write-Host "4. Delete manually from Windows Explorer" -ForegroundColor Yellow
        }
        else {
            Write-Host "SUCCESS: Folder deleted!" -ForegroundColor Green
        }
    }
}
else {
    Write-Host "Folder does not exist or already deleted!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
