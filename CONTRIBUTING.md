# Contributing — Tokyo Innovation (Lovable / AI IDEs)

Este repositório mantém o site institucional da **Tokyo Innovation** com estética **Tech Premium (Futurista Controlado)** . Este guia existe para:

- Evitar **regressões visuais** ("ficou com cara de IA", verde no fundo, neon/gamer, fontes erradas).
- Evitar **duplicações** (ex.: múltiplas instâncias do `@n8n/chat`, hooks duplicados, canvas duplicado).
- Padronizar prompts e fluxo de trabalho em **Lovable** , **TRAE** , **Cursor** , **Antigravity** e afins.

> Regra de ouro: **mudanças pequenas e verificáveis** . Uma alteração por PR/prompt.

---

## ✅ Princípios inegociáveis (Design Lock)

### 1) Direção

**Futurista Controlado** : premium, técnico, alto contraste, muito respiro.

### 2) Paleta (não alterar sem aprovação)

- Fundo principal: **preto** `#000000` (evitar qualquer viés verde)
- Fundo alternativo: `#050508`
- Superfícies/cards: `#0A1628`
- Bordas: `#1B3A4A`
- Texto: `#FFFFFF` (secundário `#8BA3B9`)
- Tech/links: `#2B7AB8`
- Glow: `#4FC3F7` (sutil)
- CTA: `#38E08F`
- Badge: `#FFB020`

**Distribuição recomendada:** 70% fundos (preto/navy), 20% texto, 8% UI (bordas/links/glow), 2% acento (CTA).

### 3) Tipografia

- Títulos: **Sora**
- Corpo: **Inter**

### 4) Regras de brilho (anti-neon)

- Se o **glow** chama mais atenção que o texto, está forte.
- Glow deve ser **detalhe** , não protagonista.

### 5) “Não parecer feito por IA”

- Evitar layouts genéricos, repetição de seções idênticas e excesso de gradientes.
- Menos parágrafos, mais bullets com verbos + números.
- Espaçamento consistente, cards com micro-interações discretas.

---

## 🧭 Como propor mudanças (workflow)

### Via Lovable (recomendado para UI)

1. Prompts **curtos** e **objetivos** (uma tarefa por prompt).
2. Sempre incluir **Restrições** e **Definição de pronto** .
3. Pedir para o Lovable **não fazer perguntas** e assumir defaults sensatos.

### Via IDE (Cursor / TRAE / Antigravity)

1. Crie branch: `feat/<tema>` ou `fix/<tema>`
2. Faça commits pequenos.
3. Rode build antes do PR.

**Comandos**

```bash
npm i
npm run dev
npm run build
npm run preview
```

---

## 🧱 Guardrails (anti-duplicação)

### 1) Chat n8n — instância única

- `createChat()` deve rodar **uma única vez** (guard global + verificação DOM).
- Em SPA: **não reinicializar** a cada mudança de rota.
- Tema do chat (CSS) deve ser importado **globalmente** .

Checklist rápido:

- [ ] O botão do chat aparece uma vez
- [ ] O input do chat está visível
- [ ] “Powered by n8n” não aparece
- [ ] Não cria nova instância ao navegar entre páginas

### 2) Hooks e componentes

- Não criar hooks duplicados (ex.: `useRevealOnScroll`)
- Preferir ampliar o existente em vez de “inventar outro”

### 3) Efeitos (Canvas / partículas)

- Um canvas global já basta — evite 2 canvases concorrendo.
- Respeitar `prefers-reduced-motion`.

---

## 🧪 Definition of Done (DoD) — toda mudança precisa passar

### Visual

- [ ] Fundo permanece **preto** (sem verde/oliva)
- [ ] Cards e superfícies continuam em `#0A1628`
- [ ] CTA verde continua destaque (não virar azul/ciano)
- [ ] Glow sutil e consistente
- [ ] Responsivo (desktop + mobile)

### Funcional

- [ ] Sem erros no console
- [ ] Rotas funcionando
- [ ] Build passa (`npm run build`)

### Cloudflare Pages

- [ ] `public/_redirects` preservado (SPA)

---

## 🧩 Padrão de prompt (template universal)

Use este template em **Lovable** , **Cursor** , **TRAE** , **Antigravity** .

**TEMPLATE**

- **Objetivo:** (1 frase)
- **Contexto:** (onde isso aparece)
- **Restrições:** (o que NÃO pode mudar)
- **Arquivos-alvo:** (se souber)
- **Definição de pronto:** (checklist)

**Exemplo**

- Objetivo: “Adicionar skeleton de loading no bloco de estatísticas do Hero.”
- Contexto: “Home / Hero / stats”
- Restrições: “Não mudar cores, não mexer no canvas do background, respeitar prefers-reduced-motion.”
- Arquivos-alvo: `Hero.tsx` e `useRevealOnScroll.ts`
- Pronto: “Skeleton aparece por 600ms, some com fade, layout não salta (no CLS).”

---

## 🧠 Prompt padrão (Lovable) — mudanças sem perguntas

Copie/cole e edite as partes entre colchetes:

> **IMPORTANTE:** não faça perguntas. Use defaults sensatos. Se algo estiver ausente, use placeholder. Faça a mudança com mínimo impacto e sem refatoração ampla.
>
> **Objetivo:** [descreva a mudança]
>
> **Restrições (não quebrar):**
>
> - Manter estética Futurista Controlado (preto/navy/azul/ciano; sem verde no fundo)
> - Não alterar paleta base e tipografia
> - Não duplicar `@n8n/chat` nem criar novos canvases globais
> - Respeitar `prefers-reduced-motion`
>
> **Definição de pronto:**
>
> - [item 1]
> - [item 2]
> - [item 3]
>
> **Qualquer ajuste de CSS:** use seletores seguros e prefira CSS variables.

---

## 🧰 Prompt padrão (Cursor/TRAE/Antigravity) — execução local

Use quando quiser que a IA altere código no repositório:

> Você é um engenheiro frontend sênior. Faça apenas as mudanças necessárias.
>
> **Objetivo:** [mudança]
>
> **Restrições:**
>
> - Não alterar paleta e tipografia (Design Lock)
> - Não criar instâncias duplicadas do chat
> - Manter rotas SPA e Cloudflare Pages
> - Respeitar acessibilidade e prefers-reduced-motion
>
> **Entregue:**
>
> - Diff dos arquivos alterados
> - Explicação curta do que foi feito
> - Checklist de validação (dev/build)

---

## 🧼 Convenções de código

- Preferir componentes pequenos e reutilizáveis.
- Evitar inline styles extensos; priorizar Tailwind + CSS variables.
- Nomes claros: `N8NChatWidget`, `HeroSection`, `SolutionsGrid`.

### Commits

- `feat:` nova funcionalidade
- `fix:` correção
- `ui:` ajustes visuais
- `perf:` performance
- `seo:` SEO
- `chore:` manutenção

---

## 🧯 Checklist anti-regressão (rápido)

Antes de finalizar qualquer PR/prompt:

1. Home: fundo realmente preto? (sem verde)
2. Cards: `#0A1628` e borda `#1B3A4A`?
3. CTA: verde com glow sutil?
4. Chat: 1 instância, input visível, sem “Powered by n8n”?
5. Navegação: dropdown Soluções ok?
6. Rotas: refresh no Pages não dá 404? (`_redirects`)
7. Console: sem erros?

---

## 📎 Quando abrir Issue vs pedir no Lovable

- **Lovable** : ajustes visuais, micro-interações, copy, seções.
- **Issue/PR** : integrações (GTM/GA4/Ads), mudanças estruturais, refactors, performance pesada.

---

## 🧠 Notas finais

- Sempre escrever **Tokyo Innovation** (com “y”).
- Se um ajuste “melhora” mas muda a estética, **não serve** .
- Melhor uma mudança pequena perfeita do que 10 mudanças médias.
