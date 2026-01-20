# Tokyo Innovation — Site Institucional (Lovable / React + Vite)

Site institucional da **Tokyo Innovation** com visual **tech premium** (dark, azul/ciano, glow sutil), páginas de soluções com dados simulados (mock) e **chat embutido do n8n** (widget flutuante) para captação e qualificação de leads.

---

## 📚 Sumário

- [Links](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-links)
- [Stack](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-stack)
- [Brand / UI](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-brand--ui-refer%C3%AAncia-r%C3%A1pida)
- [Páginas e rotas](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-p%C3%A1ginas-e-rotas)
- [Chat (n8n)](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-chat-n8n--widget-global-flutuante)
- [Rodando localmente](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-rodando-localmente)
- [Deploy no Cloudflare Pages](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#%EF%B8%8F-deploy-no-cloudflare-pages-free)
- [Variáveis de ambiente](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-vari%C3%A1veis-de-ambiente-opcional)
- [Integrações (Analytics, Ads, SEO)](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-integra%C3%A7%C3%B5es-analytics-ads-seo)
- [Arquitetura do n8n Sales Agent](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-arquitetura-do-n8n-sales-agent-vis%C3%A3o-do-fluxo--n%C3%B3s)
- [Padrões de conteúdo](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-padr%C3%B5es-de-conte%C3%BAdo-para-parecer-feito-por-humano)
- [Dados simulados](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-dados-simulados-mock)
- [Como contribuir](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-como-contribuir)
- [Troubleshooting](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-troubleshooting)
- [Licença](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-licen%C3%A7a)
- [Observações](https://chatgpt.com/g/g-p-69616c145dc4819197c11daedfe0d6d1-tokyo-innovation/c/696a93ea-aa3c-832e-959d-68d5b037a716#-observa%C3%A7%C3%B5es)

---

## 🔗 Links

- **Lovable Project:** [https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
- **Preview / Produção:** REPLACE_WITH_PROD_URL
- **Chat n8n (Webhook):** `https://webh1.tokyoinnovation.com.br/webhook/840023e5-95f6-41d9-b078-3f7f8808cc58/chat`

---

## ✨ Stack

- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **shadcn/ui**
- **react-helmet-async** (SEO)
- **@n8n/chat** (widget do chat)

---

## 🎨 Brand / UI (referência rápida)

**Direção:** “Futurista controlado” (dark premium sem neon gamer)
**Fundo:** preto / navy, sem esverdear
**Acentos:** azul/ciano para tech + CTA verde

Sugestões (usadas como base):

- Fundo: `#000000`, `#050508`
- Superfícies: `#0A1628`
- Bordas: `#1B3A4A`
- Texto: `#FFFFFF`, secundário `#8BA3B9`
- Links/Tech: `#2B7AB8`
- Glow: `#4FC3F7`
- CTA: `#38E08F`
- Badge: `#FFB020`

---

## 📄 Páginas e rotas

> Pode variar conforme a estrutura do projeto, mas a ideia é manter rotas claras e escaláveis.

- `/` — Home
- `/solucoes/dashboards` — Painéis com IA (Números do Negócio, previsões e chat simulado Diretor ↔ IA)
- `/solucoes/whatsapp` — IA no WhatsApp (triagem, follow-up, fluxos e simulações por nicho)
- `/nichos` — Nichos e casos de uso (cards por segmento)
- `/metodo` — Método (implantação, governança, etapas)
- `/governanca` — Governança (segurança, dados, auditoria, compliance)

---

## 🤖 Chat (n8n) — Widget global flutuante

Este site integra o widget do **@n8n/chat** em modo `window` (botão flutuante + janela).

**Requisitos atendidos:**

- Botão verde estilo WhatsApp
- Textos em PT-BR
- Sem “Powered by n8n” (via CSS)
- Proteção contra instâncias duplicadas (guard global + verificação DOM)
- Tema alinhado ao dark premium do site

### Como funciona

- O widget envia mensagens para o Webhook do n8n
- O `sessionId` mantém contexto e histórico no fluxo (se configurado)

> Importante: ao alterar layout/rotas, mantenha o widget em um ponto “global” da app (ex.: `App.tsx` ou `Layout`), para aparecer em todas as páginas.

---

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 18+ (recomendado)
- npm (ou pnpm/yarn se o projeto estiver configurado)

### Instalação

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

---

## ☁️ Deploy no Cloudflare Pages (Free)

### Configuração (Cloudflare Pages)

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18+ (via settings)

### SPA / Rotas (muito importante)

Se você usa rotas do React Router, garanta fallback para `index.html`.

Crie o arquivo:

- `public/_redirects` (recomendado)

Conteúdo:

```
/*    /index.html   200
```

> Alternativa: configurar “Single Page Application” no Pages (quando disponível).

---

## 🔐 Variáveis de ambiente (opcional)

Se futuramente você for integrar métricas/analytics/SEO/CRM, crie variáveis no Cloudflare Pages:

Exemplos (placeholders):

- `VITE_GA_MEASUREMENT_ID=G-XXXX`
- `VITE_GTM_ID=GTM-XXXX`
- `VITE_META_PIXEL_ID=XXXX`
- `VITE_GSC_SITE=...`
- `VITE_CHAT_WEBHOOK_URL=https://.../chat`

> Observação: o `@n8n/chat` pode estar com webhook hardcoded no componente. Se quiser deixar configurável, use `import.meta.env.VITE_CHAT_WEBHOOK_URL`.

---

## 📈 Integrações (Analytics, Ads, SEO)

> Recomendação principal: **Google Tag Manager (GTM)** como camada central. Ele evita “colagens” diferentes em cada página, facilita auditoria e reduz risco de quebrar deploy.

### Google Tag Manager (GTM)

**Onde colocar:**

- Injetar o script do GTM no `<head>` (e `<noscript>` logo após a abertura do `<body>`).

**O que centralizar no GTM:**

- GA4 (Google Analytics)
- Google Ads (conversões)
- Meta Pixel
- Eventos customizados (CTA, WhatsApp, chat)

**Eventos recomendados (nomes consistentes):**

- `page_view` (automático)
- `cta_click` (botões principais)
- `whatsapp_click` (links/CTAs para WhatsApp)
- `chat_open` (quando abre o widget)
- `chat_message_sent` (quando envia msg no chat)
- `lead_handoff` (quando o n8n identificou lead pronto e passou p/ humano)

> Dica: padronize `event_params` no front (quando possível): `pagePath`, `solution`, `utm_source`, `utm_campaign`.

### GA4 (Google Analytics)

- Use GA4 via GTM.
- Configure conversões no GA4 a partir dos eventos acima.

### Google Ads (conversões)

- Suba conversões via GTM usando os mesmos eventos.
- Conversões típicas:
  - Clique no WhatsApp (`whatsapp_click`)
  - Lead/handoff (`lead_handoff`)

> Importante: em B2B high ticket, o clique não é “venda”. É **sinal de intenção** — ainda assim vale como conversão de funil.

### Meta Ads (Pixel)

- Pixel via GTM.
- Eventos típicos:
  - `ViewContent` em páginas de solução (`/solucoes/...`)
  - `Contact` quando abre chat (`chat_open`) ou clica WhatsApp (`whatsapp_click`)
  - `Lead` quando o n8n capturar contato e gerar handoff

### Search Console (SEO)

- Validar domínio via DNS (Cloudflare) ou HTML tag.
- Criar/submit sitemap (se/quando você adicionar).
- Garantir:
  - Title/description por página (react-helmet-async)
  - OpenGraph/Twitter Cards
  - Performance e Core Web Vitals (imagens otimizadas + lazy loading)

---

## 🧩 Padrões de conteúdo (para parecer “feito por humano”)

- Headline curta, objetiva, sem buzzwords
- Bullets com verbos + resultados
- Provas (mesmo simuladas) sempre com “estimativa / simulação”
- Evitar parágrafos longos
- Componentes consistentes (mesmas distâncias, bordas, sombras e hover)

---

## 🧪 Dados simulados (mock)

As páginas de soluções usam **dados simulados** para demonstrar:

- “Números do Negócio”
- comparativos (ex.: Marketing x Resultado)
- previsões/alertas
- chat simulado (Diretor ↔ IA)

Quando for integrar com dados reais:

- trocar mocks por API/DB
- manter a UI e a narrativa (isso já converte bem)

---

## 🤝 Como contribuir

### Trabalhando via Lovable

1. Abra o projeto no Lovable
2. Faça prompts com mudanças pequenas por vez
3. O Lovable comita automaticamente

### Trabalhando via IDE

1. Crie uma branch: `feat/minha-mudanca`
2. Faça commits pequenos e descritivos
3. Abra PR para `main`

**Convensão de commits (sugestão):**

- `feat:` nova funcionalidade
- `fix:` correção
- `chore:` manutenção
- `ui:` ajustes visuais
- `seo:` melhorias de SEO

---

## 📝 Licença

Defina conforme seu uso:

- `UNLICENSED` (privado)
- ou `MIT` (se quiser aberto)

---

## 📌 Observações

- Sempre escrever **Tokyo Innovation** (com “y”).
- Evitar tons esverdeados no fundo: manter preto/navy.
- Glow sutil (se o brilho chamar mais atenção que o texto, está forte demais).

---

## 🛠️ Troubleshooting

### Rotas quebrando no Cloudflare Pages (404 ao recarregar)

- Garanta o arquivo `public/_redirects` com:

```
/*    /index.html   200
```

### Chat do n8n não aparece

- Verifique se o componente global do chat está montado (ex.: `App.tsx`/`Layout`).
- Confirme se o webhook está acessível publicamente e retorna HTTP 200.

### Chat duplicando (instâncias múltiplas)

- Inicialize `createChat()` **apenas uma vez** .
- Use **flag global** + verificação de DOM antes de montar.
- Evite reinicializar em cada troca de rota.

### “Powered by n8n” volta a aparecer

- Confirme se o CSS de tema do widget está sendo importado globalmente.
- Evite seletores genéricos (ex.: `[class*="footer"]`) que podem quebrar a área de input.

---

## Arquitetura do n8n Sales Agent (visão do fluxo + nós)

Este site embute o widget **@n8n/chat** , que conversa com um **workflow n8n** atuando como **pré-vendas (SDR)** : qualifica, responde dúvidas, propõe próximos passos e **entrega para um humano** marcar a reunião de negociação/fechamento.

### Objetivo do agente

- Responder em linguagem de dono (B2B), curto e direto
- Qualificar rápido (nicho, dor, meta, urgência e faixa de investimento)
- Direcionar para soluções (Dashboards, WhatsApp, Nichos)
- Capturar contato + consentimento e fazer **handoff** para humano
- Registrar tudo em CRM/planilha/Supabase para follow-up

### Entrada e saída do chat

**Entrada (widget → n8n Webhook):** `chatInput`, `sessionId`, `metadata` (página atual, UTM/origem, referrer).

**Saída (n8n → widget):** resposta textual + próximos passos.

**Saída (n8n → comercial):** lead qualificado + resumo + recomendação do que fazer.

### Visão macro do workflow

1. **Webhook (Chat In)** → 2) **Normalização** → 3) **Memória (por sessionId)** → 4) **Roteador de intenção** → 5) **Agente IA (SDR)** → 6) **Extração de dados do lead** → 7) **Persistência (CRM/Sheet/Supabase)** → 8) **Notificação p/ humano** → 9) **Resposta ao chat**

### Diagrama (ASCII)

```
[Widget @n8n/chat]
      |
      v
[Webhook: /chat] ---> [Normalize Input] ---> [Load Session Context]
      |                         |                    |
      |                         v                    v
      |                   [Intent Router] ---> [AI Agent (SDR)]
      |                                              |
      |                                              v
      |                                   [Extract Lead Fields]
      |                                              |
      |                         +--------------------+------------------+
      |                         |                                       |
      v                         v                                       v
[Respond to Chat]        [Upsert Lead/Session]                    [Notify Human]
 (curto + próximo passo)  (CRM/Sheet/Supabase)              (WhatsApp/Slack/Email)
```

### Nós recomendados (lista prática)

- **Webhook** (POST) — recebe mensagens do widget
- **Code / Function** — sanitiza input e normaliza metadata/UTM
- **Data Store / Redis / Supabase** — carrega/salva contexto por `sessionId`
- **LLM (Classificador)** — detecta intenção: dashboards / whatsapp / preço / prazo / agendar / etc.
- **AI Agent (SDR)** — responde + faz 1 pergunta por vez (sem enrolação)
- **LLM (Extractor)** ou **Code** — extrai campos (nome, empresa, nicho, dor, meta, urgência, budgetRange, whatsapp/email)
- **IF** — decide se já pode “passar para humano”
- **CRM/Sheets/Supabase (Create/Upsert)** — cria lead + loga conversa
- **WhatsApp/Slack/Email (Notify)** — avisa time com resumo e próximos passos
- **Respond to Webhook** — devolve resposta ao widget

### Lead scoring (simples)

- +25 nicho definido
- +25 dor clara
- +20 urgência (≤ 30 dias)
- +20 faixa de investimento informada
- +10 contato válido

### Observabilidade e segurança

- Logar: `sessionId`, `intent`, `confidence`, `leadScore`, `handoff`, timestamps
- (Opcional) rate-limit por sessão/IP

### Boas práticas para evitar instâncias duplicadas do chat

- Inicializar `createChat()` **uma única vez** (flag global + verificação de DOM)
- Em SPA, não reinicializar a cada troca de rota

---

## Implementação sugerida no n8n (detalhe por nós)

Abaixo um blueprint “copiável” para você montar o fluxo no n8n com alto controle e conversão.

### 1) Webhook (Chat In)

- **Path:** `/chat`
- **Method:** POST
- **Response:** _Respond to Webhook_ (no final)

**Payload esperado (exemplo):**

```json
{
  "chatInput": "Quero entender como funciona IA no WhatsApp",
  "sessionId": "abc123",
  "metadata": {
    "pagePath": "/solucoes/whatsapp",
    "utm_source": "google",
    "utm_campaign": "primeira-entrega",
    "referrer": "https://google.com"
  }
}
```

### 2) Normalize Input (Code)

- Sanitizar string
- Truncar mensagens muito longas
- Garantir `sessionId`
- Normalizar `metadata`

### 3) Load/Save Session Context (Data Store / Supabase)

- Chave por `sessionId`
- Persistir:
  - resumo curto do contexto (rolling summary)
  - último intent
  - campos capturados do lead
  - histórico compactado (opcional)

### 4) Intent Router (LLM Classifier)

Classificar intenção para reduzir custo e aumentar precisão.

**Intents recomendadas:**

- `dashboards`
- `whatsapp`
- `nichos`
- `preco`
- `prazo`
- `seguranca`
- `agendar`
- `outro`

Saída ideal:

```json
{ "intent": "whatsapp", "confidence": 0.86 }
```

### 5) AI Agent (SDR) — prompt base

**Regras de conversa (essencial):**

- Tom B2B, linguagem simples, sem buzzwords
- Respostas curtas (2–6 linhas)
- Fazer **1 pergunta por vez**
- Sempre propor próximo passo claro
- Se já tiver dados suficientes, pedir contato e oferecer agendar

**Campos para qualificar (na ordem):**

1. Nicho/segmento
2. Dor principal (o que está travando hoje?)
3. Meta (o que quer melhorar?)
4. Urgência (prazo)
5. Faixa de investimento (range, sem constranger)
6. Contato (WhatsApp/email) + cidade

### 6) Extract Lead Fields (LLM Extractor ou Code)

Extrair e atualizar um objeto “lead” incremental.

**Formato sugerido:**

```json
{
  "name": null,
  "company": null,
  "segment": "varejo",
  "city": "Santa Rosa/RS",
  "pain": "WhatsApp bagunçado e leads perdidos",
  "goal": "aumentar conversão e responder rápido",
  "urgency": "15 dias",
  "budgetRange": "R$ 2k–5k/mês",
  "contact": { "whatsapp": null, "email": null }
}
```

### 7) Lead Score (Code)

Aplicar pontuação para decidir o momento do handoff.

**Handoff recomendado:**

- `leadScore >= 70` **ou**
- usuário pediu “agenda/reunião/orçamento”

### 8) Persistência (Upsert)

- **Supabase** (recomendado) ou **Google Sheets/CRM**

Tabelas sugeridas (Supabase):

- `leads` (um por empresa)
- `lead_events` (timeline de eventos)
- `chat_sessions` (por sessionId)

### 9) Notify Human (WhatsApp/Slack/Email)

Quando “handoff = true”, enviar:

- Resumo (2–5 linhas)
- Campos do lead
- Link da página de origem
- Próxima ação sugerida

**Exemplo de resumo para humano:**

- Segmento: varejo
- Dor: leads perdidos no WhatsApp
- Meta: +20% conversão
- Urgência: 15 dias
- Faixa: R$ 2k–5k/mês
- Próximo passo: agendar call 30min

### 10) Respond to Webhook (Chat Out)

Resposta deve:

- Confirmar entendimento
- Mostrar 1–2 opções (dashboards/whatsapp)
- Pedir a próxima info (apenas 1 pergunta)
- Quando pronto: pedir contato + sugerir reunião

---

## Handoff para humano (como “fechar” sem travar)

O agente **não fecha contrato sozinho** : ele conduz até:

1. clareza do problema
2. solução sugerida
3. faixa de investimento alinhada
4. contato e consentimento

A partir daí, o n8n dispara para o humano:

- “Posso te colocar numa conversa com nosso time para ajustar detalhes e te passar uma proposta?”

---

## Eventos recomendados (Chat → Analytics)

Se quiser medir conversão do chat:

- Ao abrir: `chat_open`
- Ao enviar msg: `chat_message_sent`
- Ao capturar contato/handoff: `lead_handoff`

> Esses eventos podem ser disparados no front (quando possível) ou no próprio n8n (server-side) via GA4/Conversions API.

---

## Checklist rápido (produção)

- [ ] Webhook com URL de produção
- [ ] Rate limit básico por IP/sessão (opcional)
- [ ] Persistência de sessão por `sessionId`
- [ ] Handoff notifica humano com contexto completo
- [ ] Logs mínimos (intent, score, timestamps)
- [ ] Mensagens do agente: curtas, 1 pergunta por vez
- [ ] Consentimento antes de registrar contato (LGPD)

---

## 🗂️ Estrutura do projeto (sugerida)

> Os nomes podem variar conforme o Lovable gerou, mas mantenha uma organização previsível.

**Pontos-chave:**

- Componentes reutilizáveis em `src/components/`
- Páginas/rotas em `src/pages/` (ou similar)
- Conteúdo centralizado (textos) em `src/content/content.ts` (recomendado)
- Estilos globais (incluindo tema do chat) em `src/styles/`

Estrutura exemplo:

```
src/
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Solutions.tsx
      Method.tsx
      Governance.tsx
    chat/
      N8NChatWidget.tsx
  pages/
    Home.tsx
    solucoes/
      Dashboards.tsx
      Whatsapp.tsx
    Nichos.tsx
  content/
    content.ts
  styles/
    globals.css
    n8n-chat-theme.css
  App.tsx
  main.tsx
public/
  _redirects
```

---

## 🧰 Scripts úteis

```bash
npm run dev      # ambiente local
npm run build    # build de produção
npm run preview  # preview local do build
```

---

## 🧠 Conteúdo centralizado (recomendado)

Para manter consistência e reduzir custo de manutenção (e de prompts no Lovable), concentre textos em um único arquivo.

**Recomendação:** criar/usar `src/content/content.ts` com:

- headlines por página
- bullets e CTAs
- blocos de “prova” (estatísticas simuladas)
- lista de nichos e exemplos

Isso permite ajustar copy sem ficar caçando strings no projeto.

---

## 🧩 Padrões de prompt no Lovable (evitar regressões e gastar menos créditos)

Use este formato quando pedir mudanças:

1. **Objetivo** (1 frase)
2. **Arquivos-alvo** (se souber)
3. **Restrições** (não quebrar X, manter Y)
4. **Definição de pronto** (o que precisa aparecer visualmente e funcionar)

**Exemplo:**

- Objetivo: “Adicionar skeleton de loading no bloco de estatísticas do Hero.”
- Arquivos-alvo: `Hero.tsx`, `useRevealOnScroll.ts`
- Restrições: manter animações existentes e respeitar `prefers-reduced-motion`
- Pronto: skeleton aparece por 600ms, some com fade e não muda layout

---

## ♿ Acessibilidade e qualidade (checklist)

- [ ] Contraste suficiente (WCAG) em texto secundário
- [ ] Focus states visíveis em links/botões
- [ ] `aria-label` em botões de ícone
- [ ] `prefers-reduced-motion` respeitado em todas animações
- [ ] Imagens com `alt` e carregamento otimizado

---

## ⚡ Performance (checklist)

- [ ] Lazy-load de imagens (quando aplicável)
- [ ] Evitar libs pesadas para efeitos (preferir CSS/Canvas leve)
- [ ] Evitar re-render do canvas/partículas em scroll excessivo
- [ ] Lighthouse: mirar 90+ no mobile (quando possível)

---

## 🔒 Segurança & LGPD (mínimo necessário)

- Captura de contato: peça **consentimento explícito** no chat antes de salvar
- Armazenar apenas o necessário para follow-up
- Oferecer “parar contato”/opt-out quando o usuário pedir

---

## 🗺️ Roadmap (próximos incrementos)

Sugestão de evolução sem perder conversão:

1. **Cases** (PDF + números) e depoimentos
2. **Página Sobre** (credibilidade + presença regional)
3. **Página Contato** (agenda + WhatsApp + e-mail)
4. Integrações reais: CRM, GA4/Ads/Pixel, Search Console
5. Blog/Conteúdo (SEO) — opcional, somente se houver rotina

---

## 📝 Licença

Defina conforme seu uso:

- `UNLICENSED` (privado)
- ou `MIT` (se quiser aberto)

---

## 📌 Observações finais

- Sempre escrever **Tokyo Innovation** (com “y”).
- Evitar tons esverdeados no fundo: manter preto/navy.
- Glow sutil: se o brilho chamar mais atenção que o texto, está forte demais.
- Em dúvidas: priorize clareza + prova + próximo passo.
