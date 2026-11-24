@echo off
cd /d "%~dp0"
echo ============================================================
echo  Starting Solico Flashcards - Admin Data Editor Mode
echo  URL: http://localhost:8080/admin/
echo ============================================================
start "" "http://localhost:8080/admin/"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start-Server.ps1"
pause
