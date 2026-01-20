# 🗾 Tokyo Innovation - Plano do Projeto

> **Última atualização:** 20 de Janeiro de 2026  
> **Responsável:** Equipe de Desenvolvimento  
> **Status:** Em desenvolvimento ativo

---

## 📋 Visão Geral

Site institucional da Tokyo Innovation, empresa de automação e IA localizada em Santa Rosa/RS. O projeto utiliza React + Vite + TailwindCSS + TypeScript com foco em design premium dark theme e animações sofisticadas.

---

## ✅ Etapas Concluídas

### Infraestrutura Base
- [x] **Configuração inicial do projeto**
  - **Data:** Janeiro 2026
  - **Descrição:** Setup completo com React, Vite, TailwindCSS, TypeScript
  - **Artefatos:** `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`

- [x] **Sistema de design tokens**
  - **Data:** Janeiro 2026
  - **Descrição:** Paleta de cores HSL, variáveis CSS semânticas, tema dark premium
  - **Artefatos:** `src/index.css`, `tailwind.config.ts`

### Componentes Principais
- [x] **Hero Section**
  - **Data:** Janeiro 2026
  - **Descrição:** Header com animação canvas TechBackground, texto animado TypewriterText
  - **Artefatos:** `src/components/Hero.tsx`, `src/components/TechBackground.tsx`

- [x] **Navbar com navegação**
  - **Data:** Janeiro 2026
  - **Descrição:** Navbar fixa com blur, dropdown de soluções, indicador de progresso de scroll
  - **Artefatos:** `src/components/Navbar.tsx`, `src/components/NavLink.tsx`

- [x] **Seção de Soluções**
  - **Data:** Janeiro 2026
  - **Descrição:** Cards com efeito 3D hover, animações de reveal on scroll
  - **Artefatos:** `src/components/Solutions.tsx`, `src/components/SolutionCard.tsx`

- [x] **Seção de Metodologia**
  - **Data:** Janeiro 2026
  - **Descrição:** Apresentação do método de trabalho da empresa
  - **Artefatos:** `src/components/Method.tsx`

- [x] **Seção de Governança**
  - **Data:** Janeiro 2026
  - **Descrição:** Informações sobre governança e compliance
  - **Artefatos:** `src/components/Governance.tsx`

- [x] **CTA Section**
  - **Data:** Janeiro 2026
  - **Descrição:** Call-to-action com botões magnéticos
  - **Artefatos:** `src/components/CTASection.tsx`, `src/components/MagneticButton.tsx`

- [x] **Footer**
  - **Data:** Janeiro 2026
  - **Descrição:** Rodapé com links e informações de contato
  - **Artefatos:** `src/components/Footer.tsx`

### Páginas Adicionais
- [x] **Página de Nichos**
  - **Data:** Janeiro 2026
  - **Descrição:** Segmentos de mercado atendidos
  - **Artefatos:** `src/pages/Nichos.tsx`

- [x] **Página WhatsApp**
  - **Data:** Janeiro 2026
  - **Descrição:** Soluções de automação WhatsApp
  - **Artefatos:** `src/pages/WhatsApp.tsx`

- [x] **Página Operations**
  - **Data:** Janeiro 2026
  - **Descrição:** Automação de operações empresariais
  - **Artefatos:** `src/pages/Operations.tsx`

- [x] **Página Dashboards**
  - **Data:** Janeiro 2026
  - **Descrição:** Dashboards e analytics
  - **Artefatos:** `src/pages/Dashboards.tsx`

### Hooks Customizados
- [x] **useRevealOnScroll**
  - **Descrição:** Animação de elementos ao entrar na viewport
  - **Artefato:** `src/hooks/useRevealOnScroll.ts`

- [x] **useMagnetic**
  - **Descrição:** Efeito magnético para botões
  - **Artefato:** `src/hooks/useMagnetic.ts`

- [x] **useParallax**
  - **Descrição:** Efeito parallax em scroll
  - **Artefato:** `src/hooks/useParallax.ts`

- [x] **useScrollProgress**
  - **Descrição:** Indicador de progresso de leitura
  - **Artefato:** `src/hooks/useScrollProgress.ts`

### Widget de Chat (n8n)
- [x] **Integração @n8n/chat**
  - **Data:** Janeiro 2026
  - **Descrição:** Widget de chat integrado com agente de vendas IA
  - **Artefatos:** `src/components/N8NChatWidget.tsx`

- [x] **Tema dark premium para chat**
  - **Data:** Janeiro 2026
  - **Descrição:** Customização completa do visual do chat
  - **Artefatos:** `src/styles/n8n-chat-theme.css`

- [x] **Correção do input/composer**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Corrigido bug onde input sumia ao esconder "Powered by n8n"
  - **Resultado:** Input visível, branding oculto

- [x] **Estilização do botão de enviar**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Botão com gradiente ciano/azul, ícone SVG branco, hover verde
  - **Resultado:** Botão coerente com tema Tokyo

- [x] **Indicador de digitação animado**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Animação bounce com 3 pontos enquanto IA processa
  - **Resultado:** Feedback visual durante loading

- [x] **Animação pulse no botão de chat**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Pulse sutil quando usuário ainda não interagiu
  - **Resultado:** Incentiva primeira interação

### SEO & Meta Tags
- [x] **SEO Completo**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Implementação de meta tags, Open Graph, JSON-LD e sitemap.xml
  - **Artefatos:** 
    - `src/components/SEO.tsx` (componente reutilizável)
    - `public/sitemap.xml`
    - `public/robots.txt` (atualizado)
    - `index.html` (melhorado)
  - **Resultado:** 
    - Canonical URLs em todas as páginas
    - Open Graph e Twitter Cards completos
    - JSON-LD com Organization, WebSite e Service schemas
    - Geo tags para Santa Rosa/RS
    - Sitemap com todas as rotas

- [x] **Imagem OG Personalizada**
  - **Data:** 20 Janeiro 2026
  - **Descrição:** Imagem 1200x630 para compartilhamento em redes sociais
  - **Artefatos:** `public/og-image.png`
  - **Resultado:** Imagem com identidade visual Tokyo Innovation, fundo navy, tipografia e elementos tech

---

## 📌 Próximas Etapas

### Alta Prioridade

- [ ] **Página de Contato**
  - **Descrição:** Página dedicada com formulário, mapa interativo e informações de localização (Santa Rosa/RS)
  - **Prioridade:** 🔴 Alta
  - **Prazo estimado:** 2-3 dias
  - **Dependências:** Nenhuma
  - **Critérios de aceitação:**
    - Formulário funcional com validação
    - Mapa integrado (Google Maps ou similar)
    - Informações de contato (telefone, email, endereço)
    - Responsivo em todos os dispositivos


### Média Prioridade

- [ ] **Som de notificação no chat**
  - **Descrição:** Som sutil quando IA responde uma mensagem
  - **Prioridade:** 🟡 Média
  - **Prazo estimado:** 0.5 dia
  - **Dependências:** Widget de chat funcionando
  - **Critérios de aceitação:**
    - Som discreto e profissional
    - Opção de mute
    - Não intrusivo

- [ ] **Página de Cases/Portfólio**
  - **Descrição:** Showcase de projetos realizados com resultados
  - **Prioridade:** 🟡 Média
  - **Prazo estimado:** 3-4 dias
  - **Dependências:** Conteúdo dos cases
  - **Critérios de aceitação:**
    - Grid de cases com filtros
    - Página individual por case
    - Métricas e resultados
    - Imagens/screenshots

- [ ] **Blog/Insights**
  - **Descrição:** Seção de artigos sobre automação e IA
  - **Prioridade:** 🟡 Média
  - **Prazo estimado:** 4-5 dias
  - **Dependências:** Lovable Cloud para persistência
  - **Critérios de aceitação:**
    - Listagem de artigos
    - Página individual por artigo
    - Categorias e tags
    - Busca

- [ ] **Integração com Analytics**
  - **Descrição:** Google Analytics 4 ou alternativa privacy-friendly
  - **Prioridade:** 🟡 Média
  - **Prazo estimado:** 0.5 dia
  - **Dependências:** Publicação do site
  - **Critérios de aceitação:**
    - Tracking de pageviews
    - Eventos customizados (cliques CTA, chat)
    - Conversões

### Baixa Prioridade

- [ ] **Modo claro (light theme)**
  - **Descrição:** Toggle para tema claro opcional
  - **Prioridade:** 🟢 Baixa
  - **Prazo estimado:** 2 dias
  - **Dependências:** Design tokens preparados
  - **Critérios de aceitação:**
    - Toggle suave
    - Persistência da preferência
    - Todas as páginas adaptadas

- [ ] **Internacionalização (i18n)**
  - **Descrição:** Suporte a inglês e espanhol
  - **Prioridade:** 🟢 Baixa
  - **Prazo estimado:** 3-4 dias
  - **Dependências:** Conteúdo traduzido
  - **Critérios de aceitação:**
    - Toggle de idioma
    - Todas as strings traduzidas
    - URLs localizadas

- [ ] **PWA (Progressive Web App)**
  - **Descrição:** Transformar em PWA instalável
  - **Prioridade:** 🟢 Baixa
  - **Prazo estimado:** 1-2 dias
  - **Dependências:** Manifest e service worker
  - **Critérios de aceitação:**
    - Instalável no mobile
    - Funciona offline (páginas básicas)
    - Ícones e splash screens

- [ ] **Testes automatizados**
  - **Descrição:** Cobertura de testes para componentes críticos
  - **Prioridade:** 🟢 Baixa
  - **Prazo estimado:** 2-3 dias
  - **Dependências:** Nenhuma
  - **Critérios de aceitação:**
    - Testes unitários para hooks
    - Testes de integração para fluxos principais
    - CI/CD configurado

---

## 🔧 Notas Técnicas

### Stack
- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** TailwindCSS + CSS Variables (HSL)
- **Animações:** CSS Keyframes + Custom Hooks (sem bibliotecas pesadas)
- **Chat:** @n8n/chat integrado com n8n workflow
- **Roteamento:** React Router DOM v6

### Arquitetura
```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas/rotas
├── hooks/          # Hooks customizados
├── styles/         # CSS adicional (tema chat)
├── lib/            # Utilitários
└── content.ts      # Conteúdo centralizado
```

### Convenções
- Cores sempre via design tokens HSL
- Componentes focados e pequenos
- Hooks para lógica reutilizável
- Animações via CSS quando possível

---

## 📝 Changelog

| Data | Autor | Alteração |
|------|-------|-----------|
| 20/01/2026 | Lovable AI | Criação do documento plan.md |
| 20/01/2026 | Lovable AI | Adicionadas correções do widget de chat às etapas concluídas |
| 20/01/2026 | Lovable AI | Implementado SEO completo (meta tags, OG, JSON-LD, sitemap) |

---

> 💡 **Nota:** Este documento deve ser atualizado a cada sprint ou milestone significativo.
