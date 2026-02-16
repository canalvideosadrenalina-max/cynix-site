# Git push (corrigir credencial) + Deploy Vercel

## Status

| Ação | Status |
|------|--------|
| 1. git remote -v | OK — origin = canalvideosadrenalina-max/cynix-site |
| 2. branch main | OK — branch renomeada para main |
| 3. git add . | OK |
| 4. git commit -m "deploy inicial cynix" | OK |
| 5. git push origin main | FALHOU — 403: Git está usando conta **mercado-atual**; o repositório é **canalvideosadrenalina-max** |
| 6. Confirmar GitHub | Após push ok, conferir em github.com/canalvideosadrenalina-max/cynix-site |
| 7. Vercel | Instruções abaixo |

---

## Corrigir credencial (fazer no seu PC)

O Windows está guardando o login do GitHub da conta **mercado-atual**. É preciso usar a conta **canalvideosadrenalina-max**.

### Opção A — Gerenciador de Credenciais (rápido)

1. Aperte **Win + R**, digite `control /name Microsoft.CredentialManager` e Enter.
2. Abra **Credenciais do Windows** → **Credenciais genéricas**.
3. Procure entradas com **github.com** ou **git**.
4. Remova as que forem da conta antiga (mercado-atual).
5. No terminal, de novo: `cd c:\cynix-site` e `git push -u origin main`.
6. Quando o Windows pedir login, use a conta **canalvideosadrenalina-max** e a senha (ou token).

### Opção B — Token (recomendado)

1. Entre no GitHub com **canalvideosadrenalina-max**.
2. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
3. Marque o escopo **repo**. Gere e copie o token.
4. No terminal: `cd c:\cynix-site` e `git push -u origin main`.
5. Quando pedir senha, cole o **token** (não a senha da conta).

Depois do push, confira: https://github.com/canalvideosadrenalina-max/cynix-site — os arquivos devem aparecer na branch **main**.

---

## 7) Vercel — puxar repo e fazer deploy

1. Acesse **https://vercel.com** e entre na sua conta.
2. **Add New…** → **Project**.
3. Em **Import Git Repository**, escolha **canalvideosadrenalina-max/cynix-site** (se não aparecer, **Configure GitHub** e autorize a Vercel).
4. **Import**.
5. Configuração do projeto:
   - **Framework Preset:** Next.js (deve vir detectado).
   - **Root Directory:** em branco.
   - **Build Command:** `npm run build` (padrão).
6. **Environment Variables** — adicione (em Production, e em Preview se quiser):
   - `NEXT_PUBLIC_SUPABASE_URL` = (URL do projeto Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (chave anon do Supabase)
   - `VERCEL_AI_GATEWAY_API_KEY` = (sua chave do AI Gateway para o chat)
   - (opcional) `NEXT_PUBLIC_BASE_URL` = `https://cynix.com.br`
7. **Deploy**.
8. Depois do deploy: **Settings** → **Domains** → adicione **cynix.com.br** e **www.cynix.com.br** e configure o DNS conforme a Vercel indicar.

A partir daí, cada `git push origin main` dispara um novo deploy automático na Vercel.
