# Script completo para desbloquear arquivos SWC bloqueados pelo Windows Application Control
# Execute como Administrador para melhor resultado

Write-Host "=== Desbloqueando arquivos SWC do Next.js ===" -ForegroundColor Cyan

$swcPath = "$PSScriptRoot\node_modules\@next\swc-win32-x64-msvc\next-swc.win32-x64-msvc.node"
$unblocked = 0
$failed = 0

if (Test-Path $swcPath) {
    try {
        Unblock-File -Path $swcPath -ErrorAction Stop
        Write-Host "✓ Desbloqueado: $swcPath" -ForegroundColor Green
        $unblocked++
    } catch {
        Write-Host "✗ Falha ao desbloquear: $swcPath" -ForegroundColor Yellow
        $failed++
    }
}

# Desbloquear todos os arquivos .node recursivamente
Write-Host "`nProcurando outros arquivos .node..." -ForegroundColor Cyan
$nodeFiles = Get-ChildItem -Path "$PSScriptRoot\node_modules\@next" -Recurse -Filter "*.node" -ErrorAction SilentlyContinue

foreach ($file in $nodeFiles) {
    try {
        Unblock-File -Path $file.FullName -ErrorAction SilentlyContinue
        attrib -r -s -h "$($file.FullName)" 2>$null
        Write-Host "✓ Processado: $($file.Name)" -ForegroundColor Green
        $unblocked++
    } catch {
        Write-Host "✗ Falha: $($file.Name)" -ForegroundColor Yellow
        $failed++
    }
}

Write-Host "`n=== Resumo ===" -ForegroundColor Cyan
Write-Host "Desbloqueados: $unblocked" -ForegroundColor Green
Write-Host "Falhas: $failed" -ForegroundColor $(if ($failed -gt 0) { "Yellow" } else { "Green" })

if ($failed -gt 0) {
    Write-Host "`n⚠ Alguns arquivos não puderam ser desbloqueados." -ForegroundColor Yellow
    Write-Host "Tente executar este script como Administrador." -ForegroundColor Yellow
    Write-Host "Ou execute: npm run fix-windows" -ForegroundColor Yellow
}
