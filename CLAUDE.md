# CLAUDE.md

Este arquivo fornece orientações para o Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

---

## Visão Geral do Projeto

Site institucional da **Tokyo Innovation** (sempre com "y"), construído com React, Vite, TypeScript e Tailwind CSS. Possui estética tech premium dark e integra widget de chat n8n para captação e qualificação de leads.

**Importante**: Este projeto é desenvolvido usando Lovable (lovable.dev) além de IDEs tradicionais. Mudanças devem ser mínimas e não quebrar o design system estabelecido.

---

## Comandos de Desenvolvimento

### Desenvolvimento Local
```bash
npm i                 # Instalar dependências
npm run dev          # Servidor dev (http://[::]:8080)
npm run build        # Build de produção
npm run build:dev    # Build de desenvolvimento
npm run preview      # Preview do build de produção
```

### Testes
```bash
npm test             # Rodar testes uma vez
npm test:watch       # Rodar testes em modo watch
```

### Qualidade de Código
```bash
npm run lint         # Rodar ESLint
```

---

## Arquitetura

### Estrutura de Rotas
SPA (Single Page Application) usando React Router:

- `/` - Home com Hero, Soluções, Método, Governança
- `/solucoes/dashboards` - Página de Dashboards com IA
- `/solucoes/whatsapp` - Página de IA no WhatsApp
- `/solucoes/operacao` - Página de Operações
- `/nichos` - Nichos e casos de uso
- `*` - Página 404

**Crítico**: Para deploy no Cloudflare Pages, criar `public/_redirects` com:
```
/*    /index.html   200
```
Habilita roteamento client-side. O arquivo está faltando e precisa ser criado antes do deploy.

### Arquitetura de Componentes

**Componentes Globais de Layout** (usados em todas as páginas):

- `N8NChatWidget` - Inicializado uma vez em [App.tsx:24](src/App.tsx#L24), nunca deve ser duplicado
- `Navbar` - Navegação principal com dropdown para Soluções
- `Footer` - Rodapé do site
- `TechBackground` - Background animado com canvas global

**Padrão de Estrutura de Páginas**:

Páginas são compostas por componentes de seção. Por exemplo, a Home importa:

- `Hero` - Seção hero principal com background animado
- `Solutions` - Grid/cards de soluções
- `Method` - Metodologia de implementação
- `Governance` - Seção de governança e segurança
- `CTASection` - Seção de call-to-action

**Integração shadcn/ui**:

Usa componentes shadcn/ui em `src/components/ui/`. Componentes usam Tailwind CSS e são customizados via CSS variables em [src/index.css](src/index.css).

### Gerenciamento de Estado

- React Query (`@tanstack/react-query`) - Configurado com QueryClient em [App.tsx:15](src/App.tsx#L15)
- Sem biblioteca global de estado - usa state de componentes e React Query

### Sistema de Estilos

**CSS Variables** (definidas em `src/index.css`):

O tema usa CSS variables baseadas em HSL para gerenciamento consistente de cores:

- Cores de fundo: `--background` (#000000), `--background-alt` (#050508), `--surface` (#0A1628)
- Cor de borda: `--border` (#1B3A4A)
- Cores de texto: `--foreground` (#FFFFFF), `--foreground-muted` (#8BA3B9)
- Acentos tech: `--tech-blue` (#2B7AB8), `--tech-cyan` (#4FC3F7)
- Verde CTA: `--accent` (#38E08F)
- Badge: `--badge-amber` (#FFB020)

**Tipografia**:

- Títulos: fonte `Sora` (via classe `font-display`)
- Texto corpo: fonte `Inter` (sans-serif padrão)

**Path Alias**:

- `@/*` resolve para `./src/*` (configurado em [vite.config.ts:18](vite.config.ts#L18) e [tsconfig.json:6-8](tsconfig.json#L6-L8))

### Integração do Widget de Chat n8n

**Detalhes Críticos de Implementação**:

O widget de chat n8n é inicializado **uma única vez** em [N8NChatWidget.tsx](src/components/N8NChatWidget.tsx) usando sistema de dupla proteção:

1. **Flag global**: `window.__TOKYO_N8N_CHAT_INITIALIZED__` previne re-inicialização
2. **Verificação DOM**: Verifica se não há elementos de chat existentes antes de montar

**Regras ao modificar**:

- Nunca chamar `createChat()` mais de uma vez
- Nunca mover inicialização para fora do componente `N8NChatWidget`
- Componente montado no nível App (não por página) para manter instância única entre mudanças de rota
- URL do Webhook: `https://webh1.tokyoinnovation.com.br/webhook/840023e5-95f6-41d9-b078-3f7f8808cc58/chat`

**Estilização Customizada**:

Tema do chat definido em [src/styles/n8n-chat-theme.css](src/styles/n8n-chat-theme.css) e importado globalmente em [main.tsx:4](src/main.tsx#L4). Customizações principais:

- Botão toggle verde estilo WhatsApp (#25D366)
- Tema dark premium combinando com estética do site
- Footer "Powered by n8n" oculto via CSS (linhas 356-369)
- Textos customizados em PT-BR

---

## Design System (Regras Inegociáveis)

### Identidade de Marca: "Futurista Controlado"

Estética tech premium B2B com alto contraste e efeitos de brilho contidos. **Detalhes completos no [CONTRIBUTING.md](CONTRIBUTING.md)**.

**Distribuição de Cores**:

- 70% backgrounds (preto/navy)
- 20% texto (branco/muted)
- 8% elementos UI (bordas/links/brilho)
- 2% acentos (verde CTA)

**Regras de Brilho (Glow)**:

- Brilho deve ser **sutil** - se chamar mais atenção que o texto, está forte demais
- Usar `#4FC3F7` com opacidade baixa para acentos tech
- Evitar estética neon/gamer

**Cores de Fundo - NUNCA ALTERAR**:

- Fundo principal: Preto puro `#000000` - **sem tom verde**
- Evitar qualquer cor que tenda para verde/oliva
- Acento navy: `#0A1628` para superfícies/cards
- Bordas: `#1B3A4A`

**Hierarquia Tipográfica**:

- Títulos: Sora (via classe `font-display`)
- Texto corpo: Inter (padrão)
- Nunca usar outras fontes sem aprovação

**Elementos Interativos**:

- Botões CTA: Verde `#38E08F` com brilho sutil
- Links tech: Azul `#2B7AB8`
- Estados hover devem ser sutis (leve scale, aumento de brilho)
- Respeitar `prefers-reduced-motion` em todas animações

**Anti-Padrões** (coisas que fazem "parecer feito por IA"):

- Layouts genéricos com seções repetidas idênticas
- Gradientes excessivos em toda parte
- Parágrafos longos (preferir bullets com verbos + números)
- Espaçamento inconsistente entre componentes

---

## Notas Críticas de Implementação

### Configuração TypeScript

Projeto tem regras TypeScript relaxadas ([tsconfig.json](tsconfig.json)):

- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

Ao adicionar novo código, manter essa convenção - não introduzir tipagem estrita a menos que explicitamente solicitado.

### Configuração Vite

- Servidor dev roda na porta 8080 com IPv6 (`::`), não localhost
- HMR overlay desabilitado ([vite.config.ts:12](vite.config.ts#L12))
- Plugin `lovable-tagger` roda apenas em modo desenvolvimento

### SEO

- Usa `react-helmet-async` para meta tags
- `HelmetProvider` envolve toda a app em [App.tsx:18](src/App.tsx#L18)
- Cada página deve definir seus próprios title/description/meta tags

### Animações e Movimento

**Sempre respeitar `prefers-reduced-motion`**:

- Desabilitar animações quando usuário tem sensibilidade a movimento
- O tema do chat n8n já implementa isso ([n8n-chat-theme.css:430-448](src/styles/n8n-chat-theme.css#L430-L448))
- Animações customizadas devem seguir o mesmo padrão

### Efeitos de Background

- Componente `TechBackground` gerencia o background animado global
- Usa Canvas para efeitos de partículas
- Apenas uma instância deve existir (montada na Home atualmente)
- Cuidado para não criar elementos canvas duplicados ao modificar páginas

---

## Diretrizes de Contribuição

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes completos, templates de prompt e workflow Lovable/IDE.

### Via Lovable

1. Usar prompts pequenos e específicos (uma mudança por prompt)
2. Sempre incluir:
   - **Objetivo**: O que precisa mudar (1 frase)
   - **Restrições**: O que NÃO pode mudar (design lock, sem duplicações)
   - **Definição de Pronto**: Checklist de requisitos
3. Referenciar template de prompt no [CONTRIBUTING.md](CONTRIBUTING.md)

### Via IDE

1. Criar branch: `feat/<descrição>` ou `fix/<descrição>`
2. Fazer commits pequenos e focados
3. Rodar `npm run build` antes de enviar PR
4. Seguir convenções de commit:
   - `feat:` - nova funcionalidade
   - `fix:` - correção de bug
   - `ui:` - ajustes visuais
   - `perf:` - melhorias de performance
   - `seo:` - melhorias de SEO
   - `chore:` - manutenção

### Checklist Pré-Submissão

Antes de finalizar qualquer mudança:

- [ ] Background é preto puro (`#000000`), sem tom verde
- [ ] Cards usam `#0A1628` com bordas `#1B3A4A`
- [ ] Verde CTA (`#38E08F`) está distinto e proeminente
- [ ] Widget chat n8n: instância única, input visível, sem "Powered by n8n"
- [ ] Dropdown de navegação funciona
- [ ] Sem erros no console
- [ ] `npm run build` executa com sucesso
- [ ] Responsivo em desktop e mobile

---

## Problemas Comuns e Soluções

### Duplicação do Widget de Chat

**Problema**: Múltiplas instâncias do chat aparecem, ou chat quebra ao mudar de rota.

**Solução**: Nunca inicializar `createChat()` fora de `N8NChatWidget`. Componente já tem proteções contra duplicação.

### Falta de Redirects SPA no Cloudflare

**Problema**: Refresh de página retorna 404 no Cloudflare Pages.

**Solução**: Criar `public/_redirects` com `/*    /index.html   200`

### Background com Tom Verde

**Problema**: Cor de fundo tende para verde/oliva em vez de preto puro.

**Solução**: Sempre usar `#000000` para background principal. Verificar em diferentes monitores/iluminação.

### Input do Chat Oculto

**Problema**: Área de input do chat n8n desaparece após mudanças CSS.

**Solução**: Nunca usar seletor `[class*="footer"]` para ocultar elementos - ele oculta o input. Usar seletores específicos em [n8n-chat-theme.css:356-369](src/styles/n8n-chat-theme.css#L356-L369).

### Performance de Animações

**Problema**: Animações causam problemas de performance ou não respeitam preferências de movimento.

**Solução**: Sempre envolver animações em queries `@media (prefers-reduced-motion: reduce)`.

---

## Deploy

Ver [README.md](README.md) para detalhes completos de deploy no Cloudflare Pages.

### Configuração Cloudflare Pages

- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18+

### Antes do Primeiro Deploy

1. Criar arquivo `public/_redirects` para roteamento SPA
2. Verificar se URL do webhook n8n está correta e acessível
3. Testar se todas as rotas funcionam corretamente
4. Confirmar que widget de chat aparece e funciona

### Variáveis de Ambiente (Opcional)

Projeto atualmente tem valores hardcoded, mas pode suportar env vars via Vite:

- `VITE_GA_MEASUREMENT_ID` - Google Analytics
- `VITE_GTM_ID` - Google Tag Manager
- `VITE_CHAT_WEBHOOK_URL` - webhook n8n (atualmente hardcoded)

Acessar via `import.meta.env.VITE_*` no código.

---

## Recursos Adicionais

- **[README.md](README.md)**: Documentação completa do projeto incluindo arquitetura do workflow n8n, integrações (Analytics, Ads, SEO) e troubleshooting
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Diretrizes detalhadas de contribuição com templates de prompt e regras de design lock

---

## Notas

- Sempre escrever "Tokyo Innovation" com "y"
- Site B2B - usar linguagem de dono de negócio, não marketing para consumidor
- Site usa dados mock/simulados para demonstrações
- Integrações reais (CRM, analytics) substituirão mocks no futuro
