# Solução para Bloqueio do Windows Application Control no Next.js

## Problema
O Windows Application Control está bloqueando o arquivo `next-swc.win32-x64-msvc.node`, impedindo o Next.js de funcionar.

## Soluções (em ordem de recomendação)

### Solução 1: Executar Script de Desbloqueio (Mais Rápida)

Execute o script PowerShell como **Administrador**:

```powershell
# Opção A: Desbloquear apenas arquivos SWC
powershell -ExecutionPolicy Bypass -File .\unblock-swc.ps1

# Opção B: Configuração completa do Windows (Recomendado)
powershell -ExecutionPolicy Bypass -File .\fix-windows-block.ps1
```

Depois execute:
```bash
npm run dev
```

### Solução 2: Adicionar Exclusão no Windows Defender

1. Abra o **Windows Security** (Segurança do Windows)
2. Vá em **Vírus e proteção contra ameaças**
3. Clique em **Gerenciar configurações** em "Configurações de proteção contra vírus e ameaças"
4. Role até **Exclusões** e clique em **Adicionar ou remover exclusões**
5. Adicione a pasta do projeto: `C:\cynix-site`
6. Adicione também: `C:\cynix-site\node_modules`

### Solução 3: Desbloquear Manualmente via PowerShell

Execute como **Administrador**:

```powershell
# Navegar até a pasta do projeto
cd C:\cynix-site

# Desbloquear todos os arquivos .node
Get-ChildItem -Path .\node_modules -Recurse -Filter "*.node" | ForEach-Object {
    Unblock-File -Path $_.FullName
    attrib -r -s -h $_.FullName
}
```

### Solução 4: Usar WSL 2 (Solução Definitiva)

A Microsoft recomenda usar WSL 2 para desenvolvimento Node.js:

1. Instale o WSL 2:
   ```powershell
   wsl --install
   ```

2. Instale o Node.js no WSL:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Execute o projeto no WSL:
   ```bash
   cd /mnt/c/cynix-site
   npm install
   npm run dev
   ```

### Solução 5: Usar Next.js com Webpack (Fallback)

O projeto já está configurado para usar Webpack quando SWC falha. Se ainda não funcionar, tente:

```bash
npm run dev:safe
```

Este comando desbloqueia os arquivos antes de iniciar o servidor.

## Verificação

Após aplicar qualquer solução, verifique se funcionou:

```bash
npm run dev
```

Se ainda houver erro, verifique:
- Se executou os scripts como Administrador
- Se o Windows Defender não está bloqueando
- Se há outras políticas de segurança corporativa ativas

## Nota Importante

Se você está em um ambiente corporativo, pode ser necessário contatar o administrador de TI para:
- Adicionar exceções nas políticas de Application Control
- Configurar Windows Defender para excluir a pasta do projeto
- Permitir execução de scripts PowerShell
