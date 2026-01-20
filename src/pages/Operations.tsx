import { useState, useEffect, useRef, useMemo } from 'react';
import { SEO, pageSEO } from '@/components/SEO';
import {
  ArrowRight,
  FileText,
  Database,
  CreditCard,
  ClipboardList,
  Package,
  BarChart3,
  User,
  Bot,
  CheckCircle2,
  Clock,
  Calculator,
  AlertTriangle,
  Settings,
  ChevronDown,
  ExternalLink,
  Zap,
  Briefcase,
  Stethoscope,
  Factory,
  ShoppingCart,
  Mail,
  Calendar,
  Layers
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { useRevealOnScroll, useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { useParallax, useLayeredParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

// Smooth section transition wrapper component
interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

function SectionTransition({ children, className, delay = 0, direction = 'up' }: SectionTransitionProps) {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-50px');
  
  const transforms = {
    up: 'translateY(60px)',
    down: 'translateY(-60px)',
    left: 'translateX(60px)',
    right: 'translateX(-60px)',
  };
  
  return (
    <div
      ref={ref}
      className={cn('transition-all', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transforms[direction],
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================== CONTENT ====================
const operationsContent = {
  seo: {
    title: 'Automação de Processos | Tokyo Innovation',
    description: 'Reduza retrabalho e rotina manual. Automação com IA, integrações e método para resultado mensurável em poucos dias.',
    ogImage: '/og-operations.png',
  },
  hero: {
    headline: 'Rotina organizada. Operação mais leve.',
    subheadline: 'A Tokyo automatiza tarefas repetitivas, reduz retrabalho e cria fluxo claro — com governança.',
    badges: ['Rápido de implantar', 'Baixo risco', 'Resultado mensurável'],
    ctaPrimary: 'Quero automatizar minha operação',
    ctaSecondary: 'Ver exemplos de automação',
  },
  bottlenecks: {
    title: 'Onde a operação trava',
    subtitle: 'Os gargalos mais comuns que a IA resolve',
    cards: [
      {
        icon: FileText,
        title: 'Orçamentos e propostas',
        pains: ['Demora para responder', 'Erro de cálculo manual'],
        automations: ['Geração automática de proposta', 'Cálculo dinâmico de preço'],
      },
      {
        icon: Database,
        title: 'Cadastros e lançamentos',
        pains: ['Redigitar informações', 'Dados inconsistentes'],
        automations: ['Preenchimento automático', 'Validação em tempo real'],
      },
      {
        icon: CreditCard,
        title: 'Cobrança e inadimplência',
        pains: ['Esquece de cobrar', 'Constrangimento no contato'],
        automations: ['Régua de cobrança automática', 'Mensagens personalizadas'],
      },
      {
        icon: ClipboardList,
        title: 'Atendimento interno',
        pains: ['Tarefas perdidas no WhatsApp', 'Sem rastreabilidade'],
        automations: ['Criação automática de tarefas', 'Status em tempo real'],
      },
      {
        icon: Package,
        title: 'Compras e estoque',
        pains: ['Ruptura de estoque', 'Compra emergencial cara'],
        automations: ['Alerta de reposição', 'Pedido automático ao fornecedor'],
      },
      {
        icon: BarChart3,
        title: 'Relatórios semanais',
        pains: ['Horas montando planilha', 'Dados desatualizados'],
        automations: ['Relatório automático', 'Envio agendado por e-mail'],
      },
    ],
  },
  simulator: {
    title: 'Simulador de ganho operacional',
    subtitle: 'Veja quanto você pode economizar automatizando',
    inputs: {
      requests: { label: 'Solicitações por dia', min: 10, max: 200, default: 50 },
      timePerRequest: { label: 'Tempo por solicitação (min)', min: 2, max: 30, default: 12 },
      rework: { label: 'Retrabalho (%)', min: 0, max: 30, default: 15 },
      hourlyCost: { label: 'Custo hora (R$)', min: 20, max: 200, default: 45 },
    },
    disclaimer: 'Simulação com dados estimados. Resultados reais podem variar.',
  },
  assistant: {
    title: 'Assistente de Rotina',
    subtitle: 'Gere um checklist de implantação para seu processo',
    businessTypes: ['Varejo', 'Contabilidade', 'Clínica', 'Indústria/Serviços'],
    processes: ['Orçamento', 'Cadastro', 'Cobrança', 'Compras', 'Atendimento interno'],
    checklists: {
      'Varejo-Orçamento': {
        steps: [
          'Mapear produtos/serviços mais cotados',
          'Definir regras de precificação (margem, desconto)',
          'Criar template de proposta comercial',
          'Configurar envio automático por WhatsApp/Email',
          'Integrar com estoque para verificar disponibilidade',
          'Definir prazo de validade do orçamento',
          'Configurar follow-up automático após 24h',
          'Criar alerta para orçamentos parados há 3 dias',
          'Definir aprovação automática até X valor',
          'Configurar relatório semanal de conversão',
          'Treinar equipe no novo fluxo',
          'Validar em ambiente de teste',
        ],
        automations: [
          'Cálculo automático de preço e frete',
          'Envio de proposta em PDF pelo WhatsApp',
          'Lembrete de follow-up após 2 dias',
        ],
        integrations: ['ERP', 'WhatsApp API', 'Planilhas'],
      },
      'Contabilidade-Cadastro': {
        steps: [
          'Definir campos obrigatórios por tipo de cliente',
          'Criar formulário digital de onboarding',
          'Configurar validação de CNPJ/CPF em tempo real',
          'Integrar com portal do cliente',
          'Automatizar criação de pastas no drive',
          'Configurar e-mail de boas-vindas',
          'Definir fluxo de documentos pendentes',
          'Criar alerta para cadastros incompletos',
          'Automatizar classificação de regime tributário',
          'Configurar checklist de documentos por tipo',
          'Treinar equipe no novo processo',
          'Validar integridade dos dados importados',
        ],
        automations: [
          'Preenchimento automático via CNPJ',
          'Criação de estrutura de pastas',
          'Notificação de documentos faltantes',
        ],
        integrations: ['Sistema contábil', 'Google Drive', 'Email'],
      },
      'Clínica-Cobrança': {
        steps: [
          'Mapear procedimentos e valores',
          'Configurar lembretes pré-consulta',
          'Definir régua de cobrança por perfil',
          'Automatizar emissão de NF após pagamento',
          'Configurar cobrança recorrente para planos',
          'Integrar com convênios para repasse',
          'Criar alerta de inadimplência > 7 dias',
          'Configurar negociação automática (parcelamento)',
          'Definir mensagens de cobrança amigáveis',
          'Automatizar relatório financeiro semanal',
          'Treinar recepção no novo fluxo',
          'Validar conciliação bancária',
        ],
        automations: [
          'Lembrete de pagamento automático',
          'Régua de cobrança progressiva',
          'Relatório de inadimplência diário',
        ],
        integrations: ['Sistema da clínica', 'WhatsApp', 'Gateway de pagamento'],
      },
      'Indústria/Serviços-Compras': {
        steps: [
          'Mapear itens de reposição frequente',
          'Definir ponto de pedido por item',
          'Cadastrar fornecedores homologados',
          'Configurar cotação automática',
          'Definir aprovação por alçada de valor',
          'Automatizar pedido de compra',
          'Configurar alerta de entrega atrasada',
          'Integrar com recebimento/almoxarifado',
          'Definir avaliação de fornecedor',
          'Automatizar pagamento programado',
          'Configurar relatório de compras mensal',
          'Treinar equipe no novo fluxo',
        ],
        automations: [
          'Alerta de estoque mínimo',
          'Pedido automático ao fornecedor preferencial',
          'Comparativo de preços entre fornecedores',
        ],
        integrations: ['ERP', 'Email', 'Planilhas'],
      },
    },
  },
  chat: {
    title: 'Converse com a IA sobre sua operação',
    subtitle: 'Perguntas que gestores fazem no dia a dia',
    topics: [
      {
        id: 'tempo',
        label: 'Onde estou perdendo tempo hoje?',
        messages: [
          { role: 'user' as const, content: 'Onde estou perdendo tempo hoje?' },
          { role: 'ai' as const, content: 'Analisei os dados da última semana. Suas maiores fontes de perda de tempo são:' },
          { role: 'ai' as const, content: '1) Retrabalho em orçamentos: média de 3 revisões por proposta (esperado: 1)\n2) Cadastros manuais: 45 min/dia redigitando dados\n3) Cobrança: 1h/dia em ligações que poderiam ser automáticas', badge: 'análise' },
          { role: 'ai' as const, content: 'Recomendo começar pelos orçamentos — maior impacto com menor esforço.', isAction: true, actionText: 'Criar template de orçamento automático' },
        ],
      },
      {
        id: 'automatizar',
        label: 'Qual tarefa devo automatizar primeiro?',
        messages: [
          { role: 'user' as const, content: 'Qual tarefa devo automatizar primeiro?' },
          { role: 'ai' as const, content: 'Baseado no seu perfil de negócio, a prioridade é:' },
          { role: 'ai' as const, content: 'Follow-up de orçamentos pendentes. Hoje você tem 23 orçamentos sem retorno há mais de 48h. Valor total: R$ 47.800.', badge: 'oportunidade' },
          { role: 'ai' as const, content: 'Uma régua de follow-up automática pode recuperar 15-20% desse valor em 7 dias.', isAction: true, actionText: 'Configurar régua de follow-up' },
        ],
      },
      {
        id: 'padronizar',
        label: 'O que dá para padronizar em 7 dias?',
        messages: [
          { role: 'user' as const, content: 'O que dá para padronizar em 7 dias?' },
          { role: 'ai' as const, content: 'Processos que você pode padronizar em 7 dias ou menos:' },
          { role: 'ai' as const, content: '✓ Mensagens de cobrança (2 dias)\n✓ Template de orçamento (3 dias)\n✓ Checklist de onboarding de cliente (2 dias)\n✓ Alerta de estoque mínimo (1 dia)', badge: 'viável' },
          { role: 'ai' as const, content: 'Começando hoje, você teria tudo rodando até semana que vem.', isAction: true, actionText: 'Montar cronograma de 7 dias' },
        ],
      },
      {
        id: 'retrabalho',
        label: 'Como reduzir retrabalho?',
        messages: [
          { role: 'user' as const, content: 'Como reduzir retrabalho?' },
          { role: 'ai' as const, content: 'Seu retrabalho está concentrado em 3 pontos:' },
          { role: 'ai' as const, content: '1) Dados incorretos na entrada (cliente digita errado)\n2) Aprovações que voltam por falta de informação\n3) Reemissão de documentos por erro de preenchimento', badge: 'diagnóstico' },
          { role: 'ai' as const, content: 'Solução: validação em tempo real + checklist obrigatório. Redução estimada: 60% do retrabalho.', isAction: true, actionText: 'Implementar validação automática' },
        ],
      },
      {
        id: 'integracao',
        label: 'Que integração vale mais a pena?',
        messages: [
          { role: 'user' as const, content: 'Que integração vale mais a pena?' },
          { role: 'ai' as const, content: 'Analisando seu cenário atual:' },
          { role: 'ai' as const, content: 'A integração mais valiosa seria: ERP ↔ WhatsApp\n\nMotivo: 70% das suas solicitações vêm pelo WhatsApp e são redigitadas no ERP. Isso consome 2h/dia da equipe.', badge: 'recomendação' },
          { role: 'ai' as const, content: 'Com essa integração, a solicitação já entra no sistema automaticamente.', isAction: true, actionText: 'Planejar integração ERP-WhatsApp' },
        ],
      },
    ],
  },
  integrations: {
    title: 'Integrações',
    subtitle: 'A Tokyo conecta com o que você já usa. Sem bagunça, com governança.',
    items: ['ERP', 'CRM', 'Planilhas', 'Email', 'WhatsApp API', 'Agenda'],
    examples: 'Bling · Tiny · Omie · Google Sheets · Pipedrive',
  },
  cta: {
    title: 'Quer tirar a operação do improviso?',
    subtitle: 'Primeiro resultado em até 21 dias. Sem setup demorado.',
    location: 'Santa Rosa/RS • Atendimento no Noroeste Gaúcho',
    button: 'Falar no WhatsApp',
    whatsappMessage: 'Olá! Quero automatizar a operação do meu negócio com a Tokyo Innovation. Pode me ajudar com um diagnóstico rápido?',
  },
  whatsappNumber: '555596030135',
};

// ==================== COMPONENTS ====================

function OperationsHero() {
  const { ref, isVisible } = useRevealOnScroll(0.05);
  const { containerRef, offsets } = useLayeredParallax(3, 0.08);
  const heroContentParallax = useParallax({ speed: 0.15, direction: 'up' });
  
  const scrollToExamples = () => {
    document.getElementById('gargalos')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  return (
    <section 
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background grid pattern with parallax */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${offsets[0]}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--tech-cyan) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--tech-cyan) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Ambient glow with parallax - layer 1 */}
      <div 
        className="absolute top-1/4 right-0 w-[600px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{ 
          background: 'hsl(var(--tech-cyan))',
          transform: prefersReducedMotion ? 'none' : `translateY(${offsets[1]}px) translateX(${offsets[0] * 0.5}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />
      
      {/* Ambient glow with parallax - layer 2 */}
      <div 
        className="absolute bottom-1/4 left-0 w-[400px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ 
          background: 'hsl(var(--tech-blue))',
          transform: prefersReducedMotion ? 'none' : `translateY(${offsets[2]}px) translateX(${-offsets[0] * 0.3}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />
      
      {/* Floating accent elements with parallax */}
      <div 
        className="absolute top-1/3 left-[15%] w-2 h-2 rounded-full opacity-40"
        style={{ 
          background: 'hsl(var(--tech-cyan))',
          transform: prefersReducedMotion ? 'none' : `translateY(${offsets[2] * 1.2}px)`,
          transition: 'transform 0.1s ease-out',
          boxShadow: '0 0 20px 5px hsl(var(--tech-cyan) / 0.3)',
        }}
      />
      <div 
        className="absolute bottom-1/3 right-[20%] w-1.5 h-1.5 rounded-full opacity-30"
        style={{ 
          background: 'hsl(var(--tech-blue))',
          transform: prefersReducedMotion ? 'none' : `translateY(${offsets[1] * 0.8}px)`,
          transition: 'transform 0.1s ease-out',
          boxShadow: '0 0 15px 3px hsl(var(--tech-blue) / 0.3)',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible 
              ? prefersReducedMotion ? 'none' : `translateY(${heroContentParallax.offset * 0.3}px)` 
              : 'translateY(40px)',
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Badges with staggered animation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {operationsContent.hero.badges.map((badge, i) => (
              <span 
                key={i}
                className="badge-default"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Headline with reveal animation */}
          <h1 
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            {operationsContent.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          >
            {operationsContent.hero.subheadline}
          </p>
          
          {/* CTAs with staggered reveal */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
            }}
          >
            <MagneticButton
              href={`https://wa.me/${operationsContent.whatsappNumber}?text=${encodeURIComponent(operationsContent.cta.whatsappMessage)}`}
              variant="primary"
              className="btn-primary text-base"
            >
              {operationsContent.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
            
            <button
              onClick={scrollToExamples}
              className="btn-secondary text-base"
            >
              {operationsContent.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: isVisible ? 0.5 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 1s ease-out 800ms, transform 1s ease-out 800ms',
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground-muted/30 flex justify-center pt-2">
          <div 
            className="w-1 h-2 rounded-full bg-tech-cyan animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>
    </section>
  );
}

function BottlenecksSection() {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-30px');
  const { containerRef, getItemStyle } = useStaggerReveal(6, { baseDelay: 80, direction: 'up' });
  const sectionParallax = useParallax({ speed: 0.05, direction: 'up' });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  return (
    <section id="gargalos" className="py-24 relative overflow-hidden">
      {/* Subtle decorative line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, hsl(var(--tech-cyan) / 0.2), transparent)',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible 
              ? prefersReducedMotion ? 'none' : `translateY(${sectionParallax.offset * 0.2}px)` 
              : 'translateY(50px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {operationsContent.bottlenecks.title}
          </h2>
          <p className="text-foreground-muted max-w-xl">
            {operationsContent.bottlenecks.subtitle}
          </p>
        </div>
        
        {/* Asymmetric grid: 2 large + 4 small */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {operationsContent.bottlenecks.cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                'tech-card group transition-all duration-500 hover:scale-[1.02] hover:border-tech-cyan/40',
                index < 2 && 'lg:row-span-1'
              )}
              style={{
                ...getItemStyle(index),
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="p-3 rounded-lg shrink-0"
                  style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                >
                  <card.icon className="w-6 h-6 text-tech-cyan" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground pt-2">
                  {card.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-badge-amber" />
                    Dores comuns
                  </p>
                  <ul className="space-y-1">
                    {card.pains.map((pain, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="w-1 h-1 rounded-full bg-badge-amber mt-2 shrink-0" />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-tech-cyan" />
                    Automação com IA
                  </p>
                  <ul className="space-y-1">
                    {card.automations.map((auto, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="w-1 h-1 rounded-full bg-tech-cyan mt-2 shrink-0" />
                        {auto}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SimulatorSection() {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-30px');
  const [requests, setRequests] = useState(operationsContent.simulator.inputs.requests.default);
  const [timePerRequest, setTimePerRequest] = useState(operationsContent.simulator.inputs.timePerRequest.default);
  const [rework, setRework] = useState(operationsContent.simulator.inputs.rework.default);
  const [hourlyCost, setHourlyCost] = useState(operationsContent.simulator.inputs.hourlyCost.default);
  const sectionParallax = useParallax({ speed: 0.04, direction: 'up' });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  // Calculations
  const hoursPerMonth = (requests * 22 * timePerRequest) / 60;
  const reworkHours = hoursPerMonth * (rework / 100);
  const savableHours = Math.round(hoursPerMonth * 0.4 + reworkHours * 0.6);
  const monthlySavings = Math.round(savableHours * hourlyCost);
  const reworkReduction = Math.round(rework * 0.6);
  const resultDays = savableHours > 30 ? '7-14 dias' : savableHours > 15 ? '14-21 dias' : '21-30 dias';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--surface) / 0.3) 50%, transparent 100%)',
          transform: prefersReducedMotion ? 'none' : `translateY(${sectionParallax.offset * 0.5}px)`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {operationsContent.simulator.title}
          </h2>
          <p className="text-foreground-muted">
            {operationsContent.simulator.subtitle}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="tech-card space-y-6">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5 text-tech-cyan" />
                Parâmetros da operação
              </h3>
              
              {/* Requests per day */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-foreground-muted">{operationsContent.simulator.inputs.requests.label}</label>
                  <span className="text-foreground font-medium">{requests}</span>
                </div>
                <input
                  type="range"
                  min={operationsContent.simulator.inputs.requests.min}
                  max={operationsContent.simulator.inputs.requests.max}
                  value={requests}
                  onChange={(e) => setRequests(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((requests - 10) / 190) * 100}%, hsl(var(--border)) ${((requests - 10) / 190) * 100}%, hsl(var(--border)) 100%)` 
                  }}
                />
              </div>
              
              {/* Time per request */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-foreground-muted">{operationsContent.simulator.inputs.timePerRequest.label}</label>
                  <span className="text-foreground font-medium">{timePerRequest} min</span>
                </div>
                <input
                  type="range"
                  min={operationsContent.simulator.inputs.timePerRequest.min}
                  max={operationsContent.simulator.inputs.timePerRequest.max}
                  value={timePerRequest}
                  onChange={(e) => setTimePerRequest(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((timePerRequest - 2) / 28) * 100}%, hsl(var(--border)) ${((timePerRequest - 2) / 28) * 100}%, hsl(var(--border)) 100%)` 
                  }}
                />
              </div>
              
              {/* Rework */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-foreground-muted">{operationsContent.simulator.inputs.rework.label}</label>
                  <span className="text-foreground font-medium">{rework}%</span>
                </div>
                <input
                  type="range"
                  min={operationsContent.simulator.inputs.rework.min}
                  max={operationsContent.simulator.inputs.rework.max}
                  value={rework}
                  onChange={(e) => setRework(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, hsl(var(--badge-amber)) 0%, hsl(var(--badge-amber)) ${(rework / 30) * 100}%, hsl(var(--border)) ${(rework / 30) * 100}%, hsl(var(--border)) 100%)` 
                  }}
                />
              </div>
              
              {/* Hourly cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-foreground-muted">{operationsContent.simulator.inputs.hourlyCost.label}</label>
                  <span className="text-foreground font-medium">R$ {hourlyCost}</span>
                </div>
                <input
                  type="range"
                  min={operationsContent.simulator.inputs.hourlyCost.min}
                  max={operationsContent.simulator.inputs.hourlyCost.max}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((hourlyCost - 20) / 180) * 100}%, hsl(var(--border)) ${((hourlyCost - 20) / 180) * 100}%, hsl(var(--border)) 100%)` 
                  }}
                />
              </div>
            </div>
            
            {/* Outputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="tech-card text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-tech-cyan" />
                <p className="text-sm text-foreground-muted mb-1">Horas/mês recuperadas</p>
                <p className="font-display text-3xl font-bold text-foreground">{savableHours}h</p>
                <span className="badge-default text-xs mt-2">estimativa</span>
              </div>
              
              <div className="tech-card text-center">
                <Calculator className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-sm text-foreground-muted mb-1">Economia mensal</p>
                <p className="font-display text-3xl font-bold text-foreground">{formatCurrency(monthlySavings)}</p>
                <span className="badge-default text-xs mt-2">estimativa</span>
              </div>
              
              <div className="tech-card text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-badge-amber" />
                <p className="text-sm text-foreground-muted mb-1">Redução de retrabalho</p>
                <p className="font-display text-3xl font-bold text-foreground">−{reworkReduction}%</p>
                <span className="badge-amber text-xs mt-2">estimativa</span>
              </div>
              
              <div className="tech-card text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-tech-blue" />
                <p className="text-sm text-foreground-muted mb-1">Prazo para resultado</p>
                <p className="font-display text-2xl font-bold text-foreground">{resultDays}</p>
                <span className="badge-default text-xs mt-2">estimativa</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-foreground-muted text-center mt-6">
            {operationsContent.simulator.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

function AssistantSection() {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-30px');
  const [businessType, setBusinessType] = useState('');
  const [process, setProcess] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const sectionParallax = useParallax({ speed: 0.03, direction: 'up' });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  const getChecklist = () => {
    const key = `${businessType}-${process}`;
    return operationsContent.assistant.checklists[key as keyof typeof operationsContent.assistant.checklists] || operationsContent.assistant.checklists['Varejo-Orçamento'];
  };

  const handleGenerate = () => {
    if (businessType && process) {
      setShowChecklist(true);
      setCheckedItems(new Set());
    }
  };

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const checklist = getChecklist();
  const businessIcons: Record<string, typeof ShoppingCart> = {
    'Varejo': ShoppingCart,
    'Contabilidade': Briefcase,
    'Clínica': Stethoscope,
    'Indústria/Serviços': Factory,
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div 
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full opacity-5 blur-[60px]"
        style={{ 
          background: 'hsl(var(--tech-cyan))',
          transform: prefersReducedMotion ? 'none' : `translateY(${sectionParallax.offset}px)`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {operationsContent.assistant.title}
          </h2>
          <p className="text-foreground-muted">
            {operationsContent.assistant.subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="tech-card">
            {/* Dropdowns */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm text-foreground-muted mb-2">Tipo de negócio</label>
                <div className="relative">
                  <select
                    value={businessType}
                    onChange={(e) => { setBusinessType(e.target.value); setShowChecklist(false); }}
                    className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer text-foreground"
                    style={{ 
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                    }}
                  >
                    <option value="">Selecione...</option>
                    {operationsContent.assistant.businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted pointer-events-none" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm text-foreground-muted mb-2">Processo</label>
                <div className="relative">
                  <select
                    value={process}
                    onChange={(e) => { setProcess(e.target.value); setShowChecklist(false); }}
                    className="w-full px-4 py-3 rounded-lg appearance-none cursor-pointer text-foreground"
                    style={{ 
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                    }}
                  >
                    <option value="">Selecione...</option>
                    {operationsContent.assistant.processes.map((proc) => (
                      <option key={proc} value={proc}>{proc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted pointer-events-none" />
                </div>
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!businessType || !process}
              className={cn(
                'w-full py-3 rounded-lg font-semibold transition-all duration-300',
                businessType && process
                  ? 'btn-primary'
                  : 'bg-muted text-foreground-muted cursor-not-allowed'
              )}
            >
              Gerar checklist
            </button>
            
            {/* Checklist result */}
            {showChecklist && (
              <div className="mt-8 pt-8 border-t border-border/30 space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  {businessIcons[businessType] && (
                    <div 
                      className="p-2 rounded-lg"
                      style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                    >
                      {(() => {
                        const Icon = businessIcons[businessType];
                        return <Icon className="w-5 h-5 text-tech-cyan" />;
                      })()}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-foreground">{businessType}</p>
                    <p className="text-sm text-foreground-muted">Processo: {process}</p>
                  </div>
                </div>
                
                {/* Steps */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground-muted mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Passos de implantação ({checklist.steps.length} itens)
                  </h4>
                  <div className="space-y-2">
                    {checklist.steps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => toggleCheck(index)}
                        className={cn(
                          'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200',
                          checkedItems.has(index)
                            ? 'bg-primary/10 border border-primary/30'
                            : 'bg-background border border-border/30 hover:border-tech-cyan/30'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                          checkedItems.has(index)
                            ? 'bg-primary border-primary'
                            : 'border-border'
                        )}>
                          {checkedItems.has(index) && (
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className={cn(
                          'text-sm',
                          checkedItems.has(index) ? 'text-foreground line-through opacity-60' : 'text-foreground-muted'
                        )}>
                          {step}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Automations */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground-muted mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-tech-cyan" />
                    Automação sugerida
                  </h4>
                  <div className="space-y-2">
                    {checklist.automations.map((auto, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: 'hsl(var(--tech-cyan) / 0.05)', border: '1px solid hsl(var(--tech-cyan) / 0.2)' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-tech-cyan" />
                        <span className="text-sm text-foreground-muted">{auto}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Integrations */}
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground-muted mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Integrações comuns
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {checklist.integrations.map((integration, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 text-sm rounded-full"
                        style={{ 
                          background: 'hsl(var(--surface))',
                          border: '1px solid hsl(var(--border) / 0.5)',
                          color: 'hsl(var(--foreground-muted))'
                        }}
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-30px');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [displayedMessages, setDisplayedMessages] = useState<typeof operationsContent.chat.topics[0]['messages']>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sectionParallax = useParallax({ speed: 0.04, direction: 'up' });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  useEffect(() => {
    if (!activeTopic) {
      setDisplayedMessages([]);
      return;
    }

    const topic = operationsContent.chat.topics.find(t => t.id === activeTopic);
    if (!topic) return;

    const messages = topic.messages;
    setDisplayedMessages([]);
    setIsTyping(true);
    
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const addMessage = () => {
      if (currentIndex < messages.length) {
        const messageToAdd = messages[currentIndex];
        setDisplayedMessages(prev => [...prev, messageToAdd]);
        currentIndex++;
        timeoutId = setTimeout(addMessage, 600 + Math.random() * 400);
      } else {
        setIsTyping(false);
      }
    };
    
    timeoutId = setTimeout(addMessage, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeTopic]);

  useEffect(() => {
    if (chatRef.current && displayedMessages.length > 0) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--surface) / 0.3) 50%, transparent 100%)',
          transform: prefersReducedMotion ? 'none' : `translateY(${sectionParallax.offset * 0.3}px)`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {operationsContent.chat.title}
          </h2>
          <p className="text-foreground-muted">
            {operationsContent.chat.subtitle}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Topics sidebar */}
            <div className="lg:col-span-2 space-y-3">
              {operationsContent.chat.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl transition-all duration-300',
                    activeTopic === topic.id
                      ? 'bg-tech-cyan/10 border border-tech-cyan/30'
                      : 'tech-card hover:border-tech-cyan/20'
                  )}
                >
                  <span className={cn(
                    'text-sm font-medium',
                    activeTopic === topic.id ? 'text-tech-cyan' : 'text-foreground'
                  )}>
                    {topic.label}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Chat area */}
            <div className="lg:col-span-3">
              <div 
                className="tech-card h-[400px] flex flex-col"
                style={{ background: 'hsl(var(--background))' }}
              >
                {!activeTopic ? (
                  <div className="flex-1 flex items-center justify-center text-foreground-muted">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Selecione uma pergunta ao lado</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    ref={chatRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                  >
                    {displayedMessages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex gap-3 animate-fade-in',
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'ai' && (
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                          >
                            <Bot className="w-4 h-4 text-tech-cyan" />
                          </div>
                        )}
                        
                        <div className={cn(
                          'max-w-[80%] p-3 rounded-xl',
                          message.role === 'user'
                            ? 'bg-tech-blue/20 text-foreground'
                            : message.isAction
                              ? 'bg-primary/10 border border-primary/30'
                              : 'bg-surface'
                        )}>
                          {message.badge && (
                            <span className="badge-amber text-xs mb-2 inline-block">{message.badge}</span>
                          )}
                          <p className="text-sm text-foreground-muted whitespace-pre-line">
                            {message.content}
                          </p>
                          {message.isAction && 'actionText' in message && (
                            <div className="mt-2 pt-2 border-t border-primary/20">
                              <span className="text-xs text-primary flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {message.actionText}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {message.role === 'user' && (
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'hsl(var(--tech-blue) / 0.1)' }}
                          >
                            <User className="w-4 h-4 text-tech-blue" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && displayedMessages.length < (operationsContent.chat.topics.find(t => t.id === activeTopic)?.messages.length || 0) && (
                      <div className="flex gap-3 items-center">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                        >
                          <Bot className="w-4 h-4 text-tech-cyan" />
                        </div>
                        <div className="flex gap-1 p-3 rounded-xl bg-surface">
                          <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  const { ref, isVisible } = useRevealOnScroll(0.08, '-30px');
  const { containerRef: chipsRef, getItemStyle } = useStaggerReveal(6, { baseDelay: 60, direction: 'scale' });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {operationsContent.integrations.title}
          </h2>
          <p className="text-foreground-muted mb-8">
            {operationsContent.integrations.subtitle}
          </p>
          
          {/* Integration chips with stagger animation */}
          <div ref={chipsRef} className="flex flex-wrap justify-center gap-3 mb-6">
            {operationsContent.integrations.items.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:border-tech-cyan/60"
                style={{
                  ...getItemStyle(index),
                  background: 'hsl(var(--surface))',
                  border: '1px solid hsl(var(--tech-cyan) / 0.3)',
                  color: 'hsl(var(--tech-cyan))',
                }}
              >
                {item}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-foreground-muted">
            {operationsContent.integrations.examples}
          </p>
        </div>
      </div>
      
      {/* Decorative line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-20"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--tech-cyan) / 0.3), transparent)' }}
      />
    </section>
  );
}

function FinalCTASection() {
  const { ref, isVisible } = useRevealOnScroll(0.1, '-30px');
  const ctaParallax = useParallax({ speed: 0.06, direction: 'up' });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

  return (
    <section className="py-28 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, transparent, hsl(var(--surface) / 0.5), transparent)',
          transform: prefersReducedMotion ? 'none' : `translateY(${ctaParallax.offset * 0.3}px)`,
        }}
      />
      
      {/* Decorative glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ 
          background: 'hsl(var(--primary))',
          transform: prefersReducedMotion ? 'none' : `translateY(${ctaParallax.offset * 0.5}px)`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className="max-w-2xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.98)',
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {operationsContent.cta.title}
          </h2>
          <p className="text-foreground-muted mb-8">
            {operationsContent.cta.subtitle}
          </p>
          
          <MagneticButton
            href={`https://wa.me/${operationsContent.whatsappNumber}?text=${encodeURIComponent(operationsContent.cta.whatsappMessage)}`}
            variant="primary"
            className="btn-primary text-lg px-8 py-4"
          >
            {operationsContent.cta.button}
            <ExternalLink className="ml-2 w-5 h-5" />
          </MagneticButton>
          
          <p className="text-sm text-foreground-muted mt-6">
            {operationsContent.cta.location}
          </p>
        </div>
      </div>
    </section>
  );
}

// ==================== MAIN PAGE ====================
export default function OperationsPage() {
  return (
    <>
      <SEO {...pageSEO.operations} />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <OperationsHero />
          <BottlenecksSection />
          <SimulatorSection />
          <AssistantSection />
          <ChatSection />
          <IntegrationsSection />
          <FinalCTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
