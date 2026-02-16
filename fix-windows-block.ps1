# Script para configurar Windows Defender e Application Control para permitir Next.js
# Execute como Administrador

Write-Host "=== Configurando Windows para permitir Next.js ===" -ForegroundColor Cyan

$projectPath = $PSScriptRoot
$nodeModulesPath = Join-Path $projectPath "node_modules"

# Verificar se está executando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠ Este script precisa ser executado como Administrador!" -ForegroundColor Yellow
    Write-Host "Clique com botão direito e selecione 'Executar como Administrador'" -ForegroundColor Yellow
    exit 1
}

# Adicionar exclusão no Windows Defender
Write-Host "`n1. Adicionando exclusão no Windows Defender..." -ForegroundColor Cyan
try {
    Add-MpPreference -ExclusionPath $nodeModulesPath -ErrorAction SilentlyContinue
    Add-MpPreference -ExclusionPath $projectPath -ErrorAction SilentlyContinue
    Write-Host "✓ Exclusões adicionadas no Windows Defender" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro ao configurar Windows Defender: $_" -ForegroundColor Red
}

# Desbloquear todos os arquivos .node
Write-Host "`n2. Desbloqueando arquivos .node..." -ForegroundColor Cyan
$nodeFiles = Get-ChildItem -Path $nodeModulesPath -Recurse -Filter "*.node" -ErrorAction SilentlyContinue
$count = 0
foreach ($file in $nodeFiles) {
    try {
        Unblock-File -Path $file.FullName -ErrorAction SilentlyContinue
        attrib -r -s -h "$($file.FullName)" 2>$null
        $count++
    } catch {
        # Ignorar erros silenciosamente
    }
}
Write-Host "✓ $count arquivos processados" -ForegroundColor Green

# Configurar política de execução (se possível)
Write-Host "`n3. Verificando política de execução..." -ForegroundColor Cyan
$executionPolicy = Get-ExecutionPolicy
Write-Host "Política atual: $executionPolicy" -ForegroundColor $(if ($executionPolicy -eq "RemoteSigned" -or $executionPolicy -eq "Unrestricted") { "Green" } else { "Yellow" })

if ($executionPolicy -eq "Restricted") {
    Write-Host "⚠ Política muito restritiva. Considere alterar para RemoteSigned" -ForegroundColor Yellow
    Write-Host "Execute: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
}

Write-Host "`n=== Concluído ===" -ForegroundColor Green
Write-Host "Tente executar 'npm run dev' novamente." -ForegroundColor Cyan
