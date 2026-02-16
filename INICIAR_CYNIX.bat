@echo off
title INICIAR PROJETO CYNIX
cd /d %~dp0
taskkill /F /IM node.exe >nul 2>&1
start cmd /k "npm run dev"
timeout /t 5 >nul
start http://localhost:3000
