import { useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight,
  Clock,
  ExternalLink,
  MessageSquare,
  BarChart3,
  Settings,
  ShoppingCart,
  Briefcase,
  Stethoscope,
  Factory,
  Home,
  Car,
  Utensils,
  Wifi,
  Users,
  GraduationCap,
  Wheat,
  TrendingUp,
  Zap,
  Target,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { useRevealOnScroll, useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// ==================== CONTENT ====================
const nichosContent = {
  seo: {
    title: 'Nichos | Tokyo Innovation',
    description: 'Seu nicho tem processos repetitivos? Então tem IA. Exemplos por setor com ganhos claros e linguagem de dono.',
  },
  hero: {
    headline: 'Seu nicho tem processo repetitivo? Então tem IA.',
    subheadline: 'Selecionamos os nichos mais comuns no Noroeste Gaúcho e mostramos onde a IA dá resultado rápido.',
    badges: ['Rápido de implantar', 'Baixo risco', 'Resultado mensurável'],
    ctaPrimary: 'Quero começar no meu nicho',
    ctaSecondary: 'Ver exemplos',
  },
  filters: ['Todos', 'Varejo', 'Contabilidade', 'Saúde', 'Indústria', 'Serviços'],
  niches: [
    {
      id: 'varejo',
      category: 'Varejo',
      title: 'Varejo / Comércio',
      icon: ShoppingCart,
      pains: [
        'Atendimento lento no WhatsApp',
        'Estoque sem controle',
        'Perda de leads por demora',
      ],
      automations: [
        'Resposta automática com preço/prazo',
        'Alerta de ruptura de estoque',
        'Follow-up de carrinho abandonado',
      ],
      metric: '+18% conversão',
    },
    {
      id: 'contabilidade',
      category: 'Contabilidade',
      title: 'Contabilidade',
      icon: Briefcase,
      pains: [
        'Clientes perguntando status repetidamente',
        'Documentos recebidos por canais diferentes',
        'Retrabalho em lançamentos',
      ],
      automations: [
        'Portal de envio de documentos',
        'Atualização automática de status',
        'Triagem e classificação de NFe',
      ],
      metric: '15h/mês economizadas',
    },
    {
      id: 'clinica',
      category: 'Saúde',
      title: 'Clínicas / Consultórios',
      icon: Stethoscope,
      pains: [
        'Confirmação manual de consultas',
        'Faltas e remarcações frequentes',
        'Atendimento telefônico congestionado',
      ],
      automations: [
        'Confirmação via WhatsApp 24h antes',
        'Reagendamento automático',
        'Triagem de urgência por IA',
      ],
      metric: '-35% faltas',
    },
    {
      id: 'imobiliaria',
      category: 'Serviços',
      title: 'Imobiliárias',
      icon: Home,
      pains: [
        'Leads perguntando os mesmos imóveis',
        'Atendimento fora do horário comercial',
        'Dificuldade em qualificar interesse',
      ],
      automations: [
        'Catálogo automatizado no WhatsApp',
        'Qualificação de lead 24/7',
        'Agendamento de visitas',
      ],
      metric: '+22% agendamentos',
    },
    {
      id: 'oficina',
      category: 'Serviços',
      title: 'Oficinas / Auto',
      icon: Car,
      pains: [
        'Orçamentos demorados',
        'Cliente não lembra da revisão',
        'Falta de histórico organizado',
      ],
      automations: [
        'Orçamento automático por foto/descrição',
        'Lembrete de revisão programada',
        'Histórico do veículo no WhatsApp',
      ],
      metric: '+12 revisões/mês',
    },
    {
      id: 'restaurante',
      category: 'Serviços',
      title: 'Restaurantes / Delivery',
      icon: Utensils,
      pains: [
        'Pedidos errados por telefone',
        'Cardápio desatualizado',
        'Picos de atendimento',
      ],
      automations: [
        'Cardápio digital com IA',
        'Confirmação automática de pedido',
        'Previsão de demanda',
      ],
      metric: '-40% erros em pedidos',
    },
    {
      id: 'provedor',
      category: 'Serviços',
      title: 'Provedores / ISP',
      icon: Wifi,
      pains: [
        'Suporte técnico sobrecarregado',
        'Chamados repetitivos',
        'Atraso em visitas técnicas',
      ],
      automations: [
        'Diagnóstico automático de conexão',
        'Triagem de chamados por IA',
        'Agendamento de visita técnica',
      ],
      metric: '-50% chamados repetidos',
    },
    {
      id: 'industria',
      category: 'Indústria',
      title: 'Indústria Metal-Mecânica',
      icon: Factory,
      pains: [
        'Orçamentos manuais demorados',
        'Retrabalho em especificações',
        'Falta de rastreio de pedidos',
      ],
      automations: [
        'Orçamento semi-automático por desenho',
        'Checklist de especificação por IA',
        'Status de produção automatizado',
      ],
      metric: '8h/semana economizadas',
    },
    {
      id: 'cooperativa',
      category: 'Indústria',
      title: 'Cooperativas Agrícolas',
      icon: Wheat,
      pains: [
        'Comunicação com associados dispersa',
        'Cotação manual de insumos',
        'Relatórios de safra demorados',
      ],
      automations: [
        'Avisos e cotações via WhatsApp',
        'Painel de acompanhamento de safra',
        'Relatórios automáticos',
      ],
      metric: '+30% engajamento',
    },
    {
      id: 'educacao',
      category: 'Serviços',
      title: 'Educação / Cursos',
      icon: GraduationCap,
      pains: [
        'Dúvidas repetitivas de alunos',
        'Matrícula manual',
        'Falta de acompanhamento de frequência',
      ],
      automations: [
        'FAQ automatizado para alunos',
        'Matrícula online com IA',
        'Alerta de faltas e baixo desempenho',
      ],
      metric: '-60% dúvidas repetitivas',
    },
  ],
  paths: {
    title: '3 caminhos para começar',
    subtitle: 'Escolha por onde quer ver resultado primeiro',
    items: [
      {
        title: 'WhatsApp',
        description: 'Organizar vendas e atendimento',
        icon: MessageSquare,
        bullets: ['Resposta rápida', 'Qualificação de leads', 'Follow-up automático'],
        href: '/solucoes/whatsapp',
        available: true,
      },
      {
        title: 'Operação',
        description: 'Reduzir rotina e retrabalho',
        icon: Settings,
        bullets: ['Automação de processos', 'Checklists inteligentes', 'Integração de sistemas'],
        href: '/solucoes/operacional',
        available: false,
      },
      {
        title: 'Dados',
        description: 'Ver os Números do Negócio',
        icon: BarChart3,
        bullets: ['Dashboards com IA', 'Alertas automáticos', 'Previsões'],
        href: '/solucoes/dashboards',
        available: true,
      },
    ],
  },
  simulator: {
    title: 'Simule seu ganho potencial',
    subtitle: 'Ajuste os valores e veja uma estimativa de resultado',
    disclaimer: 'Simulação com dados estimados. Resultados reais dependem de implementação e contexto.',
  },
  cases: {
    title: 'Resultados reais (simulados)',
    subtitle: 'Exemplos de transformação em negócios similares',
    items: [
      {
        title: 'Comércio de Materiais',
        before: 'Resposta em 12 min, 15% conversão',
        after: 'Resposta em 2 min, 24% conversão',
        metric: '+60% vendas via WhatsApp',
        timeline: 'Primeiro resultado em 14 dias',
      },
      {
        title: 'Escritório Contábil',
        before: 'Documentos por 5 canais diferentes',
        after: 'Portal único + triagem automática',
        metric: '20h/mês economizadas',
        timeline: 'Primeiro resultado em 21 dias',
      },
      {
        title: 'Clínica Odontológica',
        before: '28% de faltas, confirmação manual',
        after: 'Confirmação automática 24h antes',
        metric: '-45% faltas',
        timeline: 'Primeiro resultado em 10 dias',
      },
    ],
  },
  cta: {
    title: 'Pronto para começar no seu nicho?',
    subtitle: 'Primeiro resultado em até 21 dias. Sem compromisso de longo prazo.',
    button: 'Quero começar no meu nicho',
    whatsappMessage: 'Olá! Quero aplicar IA no meu nicho. Pode me mostrar os casos mais comuns e sugerir um início rápido com resultado mensurável em até 21 dias?',
  },
};

// ==================== COMPONENTS ====================

function NichosHero() {
  const { ref, isVisible } = useRevealOnScroll();
  
  const scrollToExamples = () => {
    document.getElementById('exemplos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
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
      
      {/* Ambient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'hsl(var(--tech-cyan))' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'max-w-4xl mx-auto text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {nichosContent.hero.badges.map((badge, i) => (
              <span 
                key={i}
                className="badge-default"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {nichosContent.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
            {nichosContent.hero.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={`https://wa.me/555596030135?text=${encodeURIComponent(nichosContent.cta.whatsappMessage)}`}
              variant="primary"
              className="btn-primary text-base"
            >
              {nichosContent.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
            
            <button
              onClick={scrollToExamples}
              className="btn-secondary text-base"
            >
              {nichosContent.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function NichesGrid() {
  const { ref, isVisible } = useRevealOnScroll();
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  const filteredNiches = useMemo(() => {
    if (activeFilter === 'Todos') return nichosContent.niches;
    return nichosContent.niches.filter(n => n.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="exemplos" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {nichosContent.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm transition-all duration-200',
                  activeFilter === filter
                    ? 'bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/30'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNiches.map((niche, index) => (
              <div
                key={niche.id}
                className="tech-card group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                    >
                      <niche.icon className="w-6 h-6 text-tech-cyan" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {niche.title}
                      </h3>
                      <span className="text-xs text-foreground-muted">{niche.category}</span>
                    </div>
                  </div>
                </div>
                
                {/* Pains */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">Dores comuns</p>
                  <ul className="space-y-1.5">
                    {niche.pains.map((pain, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-badge-amber/70" />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Automations */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">Automações com IA</p>
                  <ul className="space-y-1.5">
                    {niche.automations.map((auto, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                        {auto}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Metric */}
                <div className="pt-4 border-t border-border/30">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {niche.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PathsSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const { containerRef, getItemStyle } = useStaggerReveal(3, { baseDelay: 100, direction: 'up' });

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 opacity-50"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--surface) / 0.3), transparent)' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {nichosContent.paths.title}
          </h2>
          <p className="text-foreground-muted">
            {nichosContent.paths.subtitle}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {nichosContent.paths.items.map((path, index) => (
            <div
              key={index}
              className="tech-card relative overflow-hidden"
              style={getItemStyle(index)}
            >
              {!path.available && (
                <div className="absolute top-3 right-3">
                  <span className="badge-amber text-xs">em breve</span>
                </div>
              )}
              
              <div 
                className="p-3 rounded-lg w-fit mb-4"
                style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
              >
                <path.icon className="w-6 h-6 text-tech-cyan" />
              </div>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {path.title}
              </h3>
              
              <p className="text-sm text-foreground-muted mb-4">
                {path.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {path.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground-muted">
                    <div className="w-1 h-1 rounded-full bg-tech-cyan" />
                    {bullet}
                  </li>
                ))}
              </ul>
              
              {path.available ? (
                <Link
                  to={path.href}
                  className="inline-flex items-center gap-2 text-sm text-tech-cyan hover:text-tech-cyan/80 transition-colors"
                >
                  Ver solução
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-foreground-muted/50">
                  Em desenvolvimento
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SimulatorSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const [leads, setLeads] = useState(320);
  const [responseTime, setResponseTime] = useState(10);
  const [conversionRate, setConversionRate] = useState(12);
  
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  // Calculations (mock estimates)
  const lostLeadsPercent = Math.min(45, Math.max(5, (responseTime - 3) * 5));
  const lostLeads = Math.round(leads * (lostLeadsPercent / 100));
  const potentialConversionGain = Math.min(8, Math.max(2, (responseTime - 3) * 0.8));
  const newConversionRate = Math.min(30, conversionRate + potentialConversionGain);
  const avgTicket = 1500;
  const currentRevenue = Math.round(leads * (conversionRate / 100) * avgTicket);
  const potentialRevenue = Math.round(leads * (newConversionRate / 100) * avgTicket);
  const revenueGain = potentialRevenue - currentRevenue;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {nichosContent.simulator.title}
            </h2>
            <p className="text-foreground-muted">
              {nichosContent.simulator.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="tech-card">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Sliders */}
                <div className="space-y-8">
                  {/* Leads slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-foreground-muted">Leads por mês</label>
                      <span className="text-sm font-semibold text-foreground">{leads}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={leads}
                      onChange={(e) => setLeads(Number(e.target.value))}
                      className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-tech-cyan"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((leads - 50) / 450) * 100}%, hsl(var(--surface)) ${((leads - 50) / 450) * 100}%, hsl(var(--surface)) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-foreground-muted/50 mt-1">
                      <span>50</span>
                      <span>500</span>
                    </div>
                  </div>
                  
                  {/* Response time slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-foreground-muted">Tempo médio de resposta (min)</label>
                      <span className="text-sm font-semibold text-foreground">{responseTime} min</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={responseTime}
                      onChange={(e) => setResponseTime(Number(e.target.value))}
                      className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((responseTime - 1) / 29) * 100}%, hsl(var(--surface)) ${((responseTime - 1) / 29) * 100}%, hsl(var(--surface)) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-foreground-muted/50 mt-1">
                      <span>1 min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                  
                  {/* Conversion rate slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-foreground-muted">Taxa de conversão atual</label>
                      <span className="text-sm font-semibold text-foreground">{conversionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--tech-cyan)) 0%, hsl(var(--tech-cyan)) ${((conversionRate - 1) / 29) * 100}%, hsl(var(--surface)) ${((conversionRate - 1) / 29) * 100}%, hsl(var(--surface)) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-foreground-muted/50 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>
                
                {/* Results */}
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/30">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-badge-amber" />
                      <span className="font-semibold text-foreground">Perda atual estimada</span>
                    </div>
                    <div className="space-y-2 text-sm text-foreground-muted">
                      <p>
                        Com resposta em <span className="text-foreground font-medium">{responseTime} min</span>, 
                        você perde aproximadamente <span className="text-badge-amber font-medium">{lostLeadsPercent}%</span> dos leads.
                      </p>
                      <p>
                        Isso representa <span className="text-badge-amber font-medium">~{lostLeads} leads perdidos</span> por mês.
                      </p>
                    </div>
                    <span className="badge-amber text-xs mt-3 inline-block">estimativa</span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Ganho potencial</span>
                    </div>
                    <div className="space-y-2 text-sm text-foreground-muted">
                      <p>
                        Com resposta <span className="text-foreground font-medium">&lt;3 min</span>, 
                        conversão pode subir para <span className="text-primary font-medium">{newConversionRate.toFixed(1)}%</span>.
                      </p>
                      <p>
                        Aumento estimado de receita: <span className="text-primary font-medium">+R$ {revenueGain.toLocaleString('pt-BR')}/mês</span>
                      </p>
                    </div>
                    <span className="badge-amber text-xs mt-3 inline-block">estimativa</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-foreground-muted/60 text-center mt-6 italic">
                {nichosContent.simulator.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const { containerRef, getItemStyle } = useStaggerReveal(3, { baseDelay: 100, direction: 'up' });

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 opacity-50"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--surface) / 0.3), transparent)' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {nichosContent.cases.title}
          </h2>
          <p className="text-foreground-muted">
            {nichosContent.cases.subtitle}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {nichosContent.cases.items.map((caseItem, index) => (
            <div
              key={index}
              className="tech-card relative"
              style={getItemStyle(index)}
            >
              <div className="absolute top-3 right-3">
                <span className="badge-default text-xs">exemplo</span>
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 pr-16">
                {caseItem.title}
              </h3>
              
              {/* Before/After */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-xs uppercase tracking-wider text-foreground-muted/50 w-12 flex-shrink-0 pt-0.5">Antes</span>
                  <p className="text-sm text-foreground-muted">{caseItem.before}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs uppercase tracking-wider text-primary w-12 flex-shrink-0 pt-0.5">Depois</span>
                  <p className="text-sm text-foreground">{caseItem.after}</p>
                </div>
              </div>
              
              {/* Metric */}
              <div className="pt-4 border-t border-border/30">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-2">
                  <Zap className="w-4 h-4" />
                  {caseItem.metric}
                </span>
                <p className="text-xs text-foreground-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {caseItem.timeline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, isVisible } = useRevealOnScroll();
  const whatsappUrl = `https://wa.me/555596030135?text=${encodeURIComponent(nichosContent.cta.whatsappMessage)}`;

  return (
    <section className="py-20 relative">
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'hsl(var(--primary))' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'max-w-2xl mx-auto text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {nichosContent.cta.title}
          </h2>
          <p className="text-foreground-muted mb-8">
            {nichosContent.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={whatsappUrl}
              variant="primary"
              className="btn-primary text-base"
            >
              {nichosContent.cta.button}
              <ExternalLink className="ml-2 w-4 h-4" />
            </MagneticButton>
            
            <span className="badge-amber">
              <Clock className="w-3 h-3 mr-1" />
              Resultado em até 21 dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== PAGE ====================
export default function NichosPage() {
  return (
    <>
      <Helmet>
        <title>{nichosContent.seo.title}</title>
        <meta name="description" content={nichosContent.seo.description} />
        <link rel="canonical" href="/nichos" />
        
        {/* Open Graph */}
        <meta property="og:title" content={nichosContent.seo.title} />
        <meta property="og:description" content={nichosContent.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/nichos" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={nichosContent.seo.title} />
        <meta name="twitter:description" content={nichosContent.seo.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <NichosHero />
          <NichesGrid />
          <PathsSection />
          <SimulatorSection />
          <CasesSection />
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
