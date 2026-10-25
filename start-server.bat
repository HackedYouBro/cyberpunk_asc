@echo off
title CyberShield Local Server
echo ========================================================
echo Starting CyberShield Local Web Server...
echo ========================================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
