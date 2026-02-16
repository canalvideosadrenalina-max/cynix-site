# Relatório do Projeto — Cynix Site

**Onde estamos e o que falta para terminar.**

---

## 1. Onde estamos

### 1.1 O que está pronto e funcionando

| Área | Situação |
|------|----------|
| **Landing** | Página comercial focada em conversão: Hero com headline de crescimento empresarial, dois blocos de soluções (Sites profissionais + Aplicativos e sistemas sob medida), segmentos destacados, seção Diferenciais, metodologia e CTA. Design escuro, responsivo. |
| **Soluções** | **Sites profissionais:** institucionais, landing pages, design responsivo, foco em conversão. **Aplicativos e sistemas sob medida:** PDV, gestão, controle financeiro; segmentos: mini mercados, restaurantes, padarias, postos de gasolina, controle financeiro empresarial. |
| **Diferenciais** | Tecnologia sob medida; Foco em lucro; Automação; Escalabilidade. |
| **Navegação** | Soluções, Diferenciais, Como trabalhamos, Contato. CTA header: "Solicitar orçamento". |
| **API Chat** | Rota `/api/chat`: rate limit, IA (Vercel AI Gateway), `message`, `updates` (LeadState), `conversationState`, `showCheckoutButton`, `checkoutUrl`. Estágios: discovery → qualification → diagnosis → proposal → closing. |
| **Fluxo do chat** | IA dinâmica, sem respostas prontas. Primeira pergunta: Site ou Aplicativo. Fluxo direcionado conforme escolha. Sugestão de estimativa de investimento (faixa em reais). Botão estratégico de fechamento (checkout) quando há interesse ou pedido de orçamento. |
| **UI do chat** | ChatWidget (botão flutuante + painel): mensagens, input, envio para `/api/chat`, loading e erro. Integrado na página. CTA "Abrir chat" na seção contato. |
| **Persistência do chat** | `conversationState`, `leadState` e mensagens no `localStorage` (cynix-chat-*). Estado restaurado ao reabrir. |
| **Botão de checkout** | Exibido no chat quando `readyToClose`; link para `/checkout`. Gatilho visual (checkout real não implementado). |
| **Fundo global** | `globals.css` configurado com `url('/cynix-bg.png')` centralizado e fixed; `html, body` com height 100% e margin 0. |
| **Documentação** | CYNIX_CONTEXT.md, CYNIX_RULES.md, SOLUCAO-WINDOWS.md, RESUMO_COMPLETO.md. |

### 1.2 Stack e estrutura

- **Next.js 13.5** (App Router), **React 18**, **TypeScript**, **Tailwind CSS**
- **APIs**: `src/app/api/chat` (completa), `src/app/api/checkout` (stub)
- **Chat**: `src/lib/chat/` (types, validation, conversation-state); prompt na route com fluxo Site/Aplicativo e orçamento estimado
- **UI**: `src/app/page.tsx`, `src/app/components/ChatWidget.tsx`, `src/app/components/OpenChatLink.tsx`
- **Pricing**: `src/lib/pricing/plans.ts` (tipos prontos, `plans` vazio)
- **Supabase**: cliente em `src/lib/supabase/client.ts` (não usado ainda)

---

## 2. O que falta para terminar

Organizado por prioridade e impacto.

### 2.1 Para o site “no ar” funcionar bem (recomendado)

| Item | Descrição | Esforço |
|------|-----------|--------|
| **Imagem de fundo** | O arquivo `public/cynix-bg.png` **não existe** no projeto (verificado). Adicione a imagem em `public/` para o fundo aparecer; caso contrário o fundo ficará vazio/fallback. | Baixo |
| **Variáveis de ambiente** | Criar **`.env.example`** com: `VERCEL_AI_GATEWAY_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (e Mercado Pago quando houver). Configurar em produção para o chat. | Baixo |
| **Menu mobile** | Nav do header fica `hidden` em telas pequenas. Implementar menu hamburger ou drawer. | Baixo |

### 2.2 Checkout e vendas (se for oferecer pagamento pelo site)

| Item | Descrição | Esforço |
|------|-----------|--------|
| **Página /checkout** | Criar `src/app/checkout/page.tsx` (formulário ou resumo + redirecionamento). | Médio |
| **API checkout** | Implementar em `/api/checkout` (ex.: Mercado Pago), receber lead/plano e retornar link de pagamento. | Médio |
| **Planos e preços** | Preencher `plans` em `src/lib/pricing/plans.ts`, conectar ao checkout e, se quiser, ao chat. | Baixo–Médio |
| **Webhook pagamento** | Configurar webhook para confirmar pagamento e atualizar status (e opcionalmente Supabase). | Médio |

### 2.3 Persistência e dados (opcional)

| Item | Descrição | Esforço |
|------|-----------|--------|
| **Salvar leads no Supabase** | Criar tabela de leads e salvar/atualizar a partir do chat ou rota dedicada. | Médio |
| **Página de obrigado** | Após checkout, redirecionar para `/obrigado` ou `/checkout/obrigado`. | Baixo |

### 2.4 Organização e polish

| Item | Descrição | Esforço |
|------|-----------|--------|
| **Estrutura de pastas** | Existe `app/` na raiz e `src/app/`. Consolidar em `src/app/` para evitar confusão. | Baixo |
| **SEO** | Open Graph, Twitter Card, `robots.txt`, sitemap. | Baixo |
| **Deploy** | Documentar deploy (ex.: Vercel), envs e domínio. | Baixo |

### 2.5 Qualidade e testes (opcional)

| Item | Descrição | Esforço |
|------|-----------|--------|
| **Testes** | Testes para regras de negócio e fluxo do chat. | Médio |
| **CI** | Pipeline para lint e build (e testes). | Baixo |

---

## 3. Resumo executivo

- **Pronto:** Landing comercial (Sites + Aplicativos/sistemas, segmentos, diferenciais), nova navegação, API de chat com fluxo Site/Aplicativo e estimativa de investimento, UI do chat com persistência e botão de checkout condicional, fundo global configurado para `cynix-bg.png`.
- **Falta para o mínimo:** garantir `public/cynix-bg.png`, `.env.example` e env em produção, menu mobile.
- **Falta para vendas pelo site:** página `/checkout`, API de checkout real, planos em `plans.ts`, webhook e página de obrigado.
- **Opcional:** Supabase para leads, unificar pastas, SEO, deploy documentado, testes e CI.

---

## 4. Checklist rápido

- [ ] Garantir que `public/cynix-bg.png` existe
- [ ] Criar `.env.example` e configurar envs em produção
- [ ] Implementar menu hamburger (ou drawer) no header para mobile
- [ ] (Vendas) Criar página `/checkout`
- [ ] (Vendas) Implementar lógica em `/api/checkout` (ex.: Mercado Pago)
- [ ] (Vendas) Preencher `plans` e conectar ao fluxo
- [ ] (Opcional) Persistir leads no Supabase
- [ ] (Opcional) Unificar estrutura (`app/` vs `src/app/`)
- [ ] (Opcional) SEO (OG, sitemap, robots)
- [ ] (Opcional) Documentar deploy e testar chat em produção

---

## ESTADO OFICIAL DO PROJETO

- **Data:** 16 de fevereiro de 2026  
- **Status do servidor:** Build OK. Desenvolvimento em `npm run dev` (porta 3000). Produção: `npm run build` e `npm start`.  
- **O que já está pronto:**  
  - Landing reestruturada (Sites profissionais + Aplicativos e sistemas sob medida; segmentos: mini mercados, restaurantes, padarias, postos, controle financeiro; diferenciais: tecnologia sob medida, foco em lucro, automação, escalabilidade).  
  - Navegação atualizada (Soluções, Diferenciais, Como trabalhamos, Contato).  
  - Chat com IA dinâmica: escolha Site ou Aplicativo, fluxo direcionado, estimativa de investimento e botão de fechamento estratégico.  
  - Fundo global configurado em `globals.css` para `/cynix-bg.png`; fundos brancos removidos do container principal onde havia.  
- **Próximo passo estratégico:** Garantir presença de `public/cynix-bg.png`, criar `.env.example` e configurar variáveis em produção; em seguida implementar menu mobile. Para monetização: criar página e API de checkout e preencher planos.
