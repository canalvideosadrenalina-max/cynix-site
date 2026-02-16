# Cynix Site — Resumo Completo do Projeto

Documento único para você: **analisar o que existe**, **identificar lacunas**, **definir o que falta para colocar no ar**, **estruturar plano de execução** e **classificar complexidade**.

---

## 1. Visão geral

| Item | Situação |
|------|----------|
| **Objetivo** | Site institucional da Cynix (tecnologia, sites/sistemas/automações sob medida, foco em vendas) |
| **Stack** | Next.js 13.5 (App Router), React 18, TypeScript, Tailwind CSS |
| **Hospedagem prevista** | Compatível com Vercel (scripts e docs citam deploy Vercel) |
| **Estado** | Front-end da landing pronto; APIs e integrações parcialmente implementadas ou stub |

---

## 2. O que já existe

### 2.1 Documentação de produto e regras
- **`CYNIX_CONTEXT.md`** — Identidade, público-alvo, tom, serviços (Sites, Sistemas, Apps), posicionamento.
- **`CYNIX_RULES.md`** — Regras para IA/desenvolvimento: foco em resultado de negócio, “vender mais”, linguagem simples, evitar complexidade desnecessária, soluções escaláveis.
- **`SOLUCAO-WINDOWS.md`** — Solução para bloqueio do Windows (SWC/Next.js) com scripts PowerShell e alternativas (WSL, Webpack).

### 2.2 Front-end (página principal)
- **Landing única** com:
  - Header fixo: logo Cynix, nav (Conheça, Soluções, Metodologia, Contato), CTA “Fale com a gente” (WhatsApp).
  - Hero: headline “Tecnologia levada a sério transforma”, subtítulo, CTA WhatsApp.
  - Seções: **Conheça a Cynix**, **Metodologia** (4 passos: Diagnóstico, Proposta, Desenvolvimento, Entrega e suporte), **Soluções** (4 cards: Sites, Automação, PDV e sistemas, Sistemas sob medida), **Contato** (CTA final).
  - Footer: Explore, Contato, Soluções, © Cynix.
- **WhatsApp** fixo: `https://wa.me/5551995580969?text=...` em todos os CTAs.
- **Design**: fundo escuro (`#09090b`), zinc/blue, responsivo (grid, breakpoints), scroll suave.
- **Fontes**: Geist (sans + mono) via `next/font/local` em `src/app/fonts/`.

**Duplicação de estrutura**: existe **`app/`** na raiz e **`src/app/`**. O conteúdo da página principal está igual em `app/page.tsx` e `src/app/page.tsx`. As **API routes** estão só em **`src/app/api/`**. Next.js com `src` costuma usar `src/app` como App Router; o `app/` na raiz pode ser redundante ou herança de outra estrutura.

### 2.3 Componentes extras (em `app/components/`, não usados na página atual)
- **`DrosteFrame.tsx`** — Efeito “Droste” (quadro dentro do quadro) com conteúdo Cynix e link WhatsApp.
- **`TerminalText.tsx`** — Texto digitando no estilo terminal (“Sites. Sistemas. Automações.”, “Operação 100% remota.”).

Nenhum dos dois é importado em `src/app/page.tsx` nem em `app/page.tsx`; são opcionais para enriquecer a home ou outra página.

### 2.4 APIs e lógica de negócio

| Recurso | Arquivo | Estado |
|--------|---------|--------|
| **Chat (atendimento/lead)** | `src/app/api/chat/route.ts` | Implementado: rate limit por IP, validação de body, uso de Vercel AI Gateway (OpenAI GPT-4o-mini), resposta JSON com `reply` + `updates` (LeadState), cálculo de `canCalculatePrice`. Depende de **`VERCEL_AI_GATEWAY_API_KEY`**. |
| **Checkout** | `src/app/api/checkout/route.ts` | Stub: `POST` retorna `{ ok: true }`. Sem integração Mercado Pago nem fluxo real. |
| **Precificação** | `src/lib/pricing/plans.ts` | Estrutura de tipos (`Plan`, `PlanId`); array `plans` **vazio**. Nada usado na UI nem no checkout. |
| **Supabase** | `src/lib/supabase/client.ts` | Cliente criado com `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Nenhum uso no código atual (sem persistência de leads, usuários, etc.). |
| **Chat (lógica)** | `src/lib/chat/` | **types.ts**: `LeadState` (perfil, empresa, objetivo, contato, etc.). **validation.ts**: `canCalculatePrice(state)` por tipo de objetivo (landing, site, sistema, automacao). **prompt.ts**: prompt do assistente (não usado na route; a route tem prompt inline). |

Resumo: **chat de lead** está pronto no backend desde que a env da AI esteja configurada; **checkout** e **preços** estão só preparados (stub/estrutura); **Supabase** está configurado mas não utilizado.

### 2.5 Estilos e assets
- **`src/app/globals.css`**: Tailwind, variáveis `--background`/`--foreground`, `body` com `background-image: url("/cynix-bg.jpg")`. O arquivo **`public/cynix-bg.jpg` não existe** (em `public/` só há `.gitkeep`). Pode quebrar o visual ou fallback do browser.
- **`app/layout.tsx`** (raiz): tem overlay `bg-black/60` no body; **`src/app/layout.tsx`** não tem esse overlay.
- **Metadata** em `src/app/layout.tsx`: title “Cynix - Tecnologia que faz empresas venderem mais”, description para sites/sistemas/automações, remoto.

### 2.6 Configuração e ambiente
- **next.config.js**: básico, sem rewrites/redirects/headers específicos.
- **package.json**: scripts `dev`, `dev:safe` (unblock SWC + dev), `fix-windows`, `build`, `start`, `lint`. Dependências: Next 13.5.6, React 18, `@supabase/supabase-js`, `ai`, `mercadopago`, `openai`, `uuid`, etc.
- **tsconfig.json**: `paths` `@/*` → raiz, `@/lib/*` → `./src/lib/*`; `exclude` inclui `cynix-site` (subpasta).
- **.env**: não versionado (`.env*.local` no `.gitignore`). Nenhum `.env.example` no repositório para documentar variáveis.

---

## 3. Lacunas técnicas (o que falta ou está quebrado)

1. **Imagem de fundo**  
   `globals.css` referencia `/cynix-bg.jpg` e o arquivo não existe em `public/`. Resultado: 404 ou fundo vazio/estranho.

2. **Variáveis de ambiente**  
   - Obrigatória para chat: **`VERCEL_AI_GATEWAY_API_KEY`** (ou equivalente se trocar de gateway).  
   - Supabase (se for usar): **`NEXT_PUBLIC_SUPABASE_URL`**, **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**.  
   - Checkout/Mercado Pago (quando implementado): credenciais MP.  
   Falta **`.env.example`** listando todas e opcionalmente valores de exemplo.

3. **UI do chat**  
   A API `/api/chat` existe e funciona, mas **não há nenhum componente ou página no front que chame essa API** (sem formulário de chat, sem exibição de mensagens, sem estado do lead na interface). Ou seja: backend pronto, front do chat inexistente.

4. **Checkout**  
   Rota só stub; não há: integração Mercado Pago, definição de itens/preços, redirecionamento para pagamento, webhook, nem página de “obrigado” ou erro.

5. **Precificação**  
   `plans` vazio; não há tabela de preços na UI nem vínculo entre lead/chat e planos. `canCalculatePrice` no chat não está ligado a exibição de valor nem a fluxo de compra.

6. **Supabase**  
   Cliente configurado mas **não usado**: sem tabelas de leads, sem salvamento do estado do chat, sem auth. Se o objetivo for “só landing + WhatsApp”, pode ficar para depois; se for captar lead no site, falta persistência.

7. **Estrutura de pastas**  
   Dois “apps”: `app/` na raiz e `src/app/`. Pode gerar dúvida sobre qual é a fonte da verdade (páginas vs. API). Recomenda-se **unificar em uma única árvore** (ex.: tudo em `src/app/`) e remover ou redirecionar a outra.

8. **SEO e acessibilidade**  
   - Metadata básica existe; não há Open Graph, Twitter Card, favicon alternativo (só o padrão), nem `robots.txt`/sitemap.  
   - Nav no header é `hidden` em mobile sem menu hamburger: links “Conheça”, “Soluções”, etc. ficam inacessíveis em telas pequenas.

9. **Deploy e produção**  
   - Nenhum script ou doc de deploy (ex.: Vercel) no repositório.  
   - Build: depende de env (AI) para o chat; sem env a rota de chat retorna 500. Para “só landing” o build pode passar; para “site no ar com chat” é necessário configurar env no ambiente de produção.

10. **Testes e qualidade**  
    Nenhum teste (unitário, e2e) ou CI (lint/test no pipeline) referenciado no projeto.

---

## 4. O que falta para “colocar o site no ar”

Definição por **cenário**:

### Cenário A — “Só landing no ar” (mínimo)
- Corrigir ou remover a referência a `cynix-bg.jpg` (adicionar asset ou tirar do CSS).
- Unificar/garantir que a app usada seja uma só (ex.: `src/app`) e que a home e o layout estejam corretos.
- Fazer **build** (`npm run build`) e conferir que não quebra (ex.: em Windows, considerar `npm run dev:safe` ou desbloqueio SWC).
- Deploy em hospedagem (ex.: Vercel) com variáveis de ambiente **vazias ou só as que não forem usadas** (ex.: sem AI, sem Supabase).  
**Resultado**: site estático com navegação e WhatsApp; sem chat, sem checkout.

### Cenário B — “Landing + chat de lead no ar”
- Tudo do Cenário A.
- Criar **UI de chat** (página ou seção) que: chame `POST /api/chat`, mostre mensagens, mantenha estado do lead (e opcionalmente mostre “podemos te enviar um orçamento” quando `canCalculatePrice` for true).
- Configurar **`VERCEL_AI_GATEWAY_API_KEY`** (ou equivalente) no ambiente de produção.
- (Opcional) Persistir leads no Supabase: criar tabela, chamar Supabase a partir da API de chat ou de uma rota dedicada; configurar `NEXT_PUBLIC_SUPABASE_*` em produção.  
**Resultado**: site no ar com atendimento por chat e captura de lead; sem pagamento.

### Cenário C — “Landing + chat + checkout/orçamento”
- Tudo do Cenário B.
- Definir **planos/preços** em `plans.ts` (ou em banco) e onde aparecem na jornada (chat, página de preços, etc.).
- Implementar **checkout real**: integração Mercado Pago (ou outro), rota `/api/checkout`, página de confirmação/obrigado, e tratamento de webhook se necessário.
- Decisão sobre **persistência**: Supabase (ou outro) para leads e pedidos.  
**Resultado**: site no ar com chat e possibilidade de pagamento/orçamento.

---

## 5. Plano de execução sugerido (ordenado)

1. **Limpar e unificar**
   - Decidir app única: ex. `src/app` como fonte; migrar qualquer coisa útil de `app/` (ex.: componentes, ajustes de layout) e remover ou ignorar a pasta `app/` duplicada.
   - Corrigir fundo: adicionar `public/cynix-bg.jpg` ou remover/alterar `background-image` em `globals.css`.

2. **Documentar e configurar env**
   - Criar `.env.example` com: `VERCEL_AI_GATEWAY_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, e placeholders para Mercado Pago (se for usar).
   - Garantir que o build rode localmente (e, se quiser chat, com AI configurada).

3. **Mobile**
   - Adicionar menu hamburger (ou drawer) no header para que Conheça, Soluções, Metodologia e Contato estejam acessíveis em mobile.

4. **Chat (se for Cenário B ou C)**
   - Implementar tela/seção de chat que consuma `POST /api/chat`, exiba histórico e estado do lead e, se desejado, mostre CTA de orçamento quando `canCalculatePrice` for true.
   - (Opcional) Salvar leads no Supabase após coleta mínima.

5. **Checkout e preços (só Cenário C)**
   - Preencher `plans` (ou fonte equivalente) e exibir onde fizer sentido.
   - Implementar `/api/checkout` com Mercado Pago (ou outro), páginas de confirmação e erro, e webhook se necessário.

6. **Produção**
   - Deploy (ex.: Vercel) com env de produção.
   - (Opcional) SEO: OG tags, sitemap, `robots.txt`; acessibilidade do menu mobile.

---

## 6. Classificação de complexidade (real)

| Fase | Descrição | Complexidade | Observação |
|------|-----------|--------------|------------|
| **A. Só landing no ar** | Corrigir asset/layout, build, deploy | **Baixa** | 1–2 dias se não houver surpresas de ambiente (ex.: Windows/SWC). |
| **B. + Chat de lead** | UI de chat + env AI + opcional Supabase | **Média** | 3–5 dias: componente de chat, estado, tratamento de erro e loading; integração opcional com banco. |
| **C. + Checkout** | Planos, Mercado Pago, fluxo de pagamento | **Média–Alta** | +3–7 dias: depende de regras de negócio (carrinho, planos fixos, orçamento sob demanda), webhook e testes de pagamento. |
| **Consolidação + polish** | Unificar app, menu mobile, SEO, .env.example | **Baixa** | ~1 dia. |

**Resumo**: o projeto está **perto do “site no ar” no modo mínimo** (landing + WhatsApp). A maior parte do esforço restante é: **correções pontuais (fundo, estrutura)**, **UI do chat** (backend já existe) e, se quiser vender pelo site, **checkout e precificação**. Complexidade geral para “landing + chat” é **média**; para “landing + chat + checkout” é **média a alta**, dependendo das regras de negócio.

---

## 7. Checklist rápido para você

- [ ] Analisar o que já existe (este resumo cobre isso).
- [ ] Identificar lacunas técnicas (seção 3).
- [ ] Definir cenário alvo: A, B ou C (seção 4).
- [ ] Estruturar plano de execução (usar seção 5 e ajustar prioridades).
- [ ] Classificar complexidade real (seção 6) e estimar prazos.
- [ ] Decidir: unificar em `src/app`, corrigir `cynix-bg.jpg`, criar `.env.example`, menu mobile, depois chat e/ou checkout conforme o cenário.

Se quiser, o próximo passo pode ser: (1) um plano passo a passo só para Cenário A, ou (2) esboço da UI do chat (componentes e fluxo) para o Cenário B.
