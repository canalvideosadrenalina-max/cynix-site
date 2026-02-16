# Site não abre — o que conferir

## 1. URL correta

- **Vercel:** use a URL que a Vercel mostra no projeto (ex.: `https://cynix-site-xxx.vercel.app`).
- **Raiz:** `https://seu-projeto.vercel.app/` ou `https://seu-projeto.vercel.app/pt-BR` — ambas devem mostrar a landing.
- **Domínio próprio:** se configurou cynix.com.br, teste `https://cynix.com.br` e `https://www.cynix.com.br`.

## 2. Deploy na Vercel

- Acesse [vercel.com](https://vercel.com) → seu projeto **cynix-site**.
- Veja o **último deploy**: está "Ready" (verde) ou "Error" / "Building"?
- Se estiver em erro: abra o deploy → **Building** ou **Logs** e veja a mensagem (ex.: falha no `npm run build`, variável de ambiente faltando).

## 3. Build local (teste aí no PC)

No terminal, na pasta do projeto:

```bash
cd c:\cynix-site
npm run build
```

Se der erro, o mesmo pode acontecer na Vercel. Corrija o erro antes de dar push de novo.

## 4. Ajuste feito no código

Foi criada a página **`src/app/page.tsx`**, que redireciona **`/`** para **`/pt-BR`**. Assim, ao abrir só o domínio (ex.: `https://cynix-site.vercel.app`), o site cai direto na home em português.

Depois do próximo deploy na Vercel, teste de novo:

- `https://seu-projeto.vercel.app/`
- `https://seu-projeto.vercel.app/pt-BR`

## 5. Se ainda não abrir

- **Tela em branco:** abra o DevTools (F12) → aba Console e veja se aparece algum erro em vermelho.
- **404:** confira se a URL está exatamente como acima (com ou sem barra no final).
- **Timeout / não carrega:** pode ser rede, firewall ou problema temporário da Vercel; tente de outro navegador ou rede.
