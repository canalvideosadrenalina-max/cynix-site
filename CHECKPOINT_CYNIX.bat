@echo off
title CHECKPOINT CYNIX
cd /d %~dp0
git add .
set /p msg="Digite a descricao do commit: "
git commit -m "%msg%"
pause
