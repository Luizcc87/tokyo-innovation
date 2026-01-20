import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  TrendingUp, 
  MessageSquare, 
  Package, 
  DollarSign, 
  Bot, 
  User, 
  ArrowRight,
  BarChart3,
  Clock,
  Target,
  AlertTriangle,
  Zap,
  Database,
  FileSpreadsheet,
  Users,
  Send,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useRevealOnScroll, useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/utils';

// ==================== CONTENT ====================
const dashboardsContent = {
  seo: {
    title: 'Dashboards com IA | Tokyo Innovation',
    description: 'Transforme dados em decisão: dashboards com IA, previsões e alertas. Números do Negócio em linguagem simples, com resultado mensurável.',
  },
  hero: {
    headline: 'Decida com dados, não no achismo.',
    subheadline: 'Dashboards com IA que transformam Números do Negócio em ação: alertas, previsões e recomendações em linguagem de dono.',
    badges: ['Números do Negócio', 'Previsões e alertas', 'Resultado mensurável'],
    ctaPrimary: 'Quero um painel com IA do meu negócio',
    ctaSecondary: 'Ver exemplos',
  },
  examples: {
    title: 'Exemplos de painéis',
    cards: [
      {
        title: 'Vendas & Conversão',
        description: 'Do lead ao caixa: conversão, ticket médio e origem das vendas.',
        icon: TrendingUp,
        bullets: ['Taxa de conversão por canal', 'Ticket médio por vendedor'],
      },
      {
        title: 'Atendimento WhatsApp',
        description: 'Tempo de resposta, gargalos, follow-up e taxa de fechamento.',
        icon: MessageSquare,
        bullets: ['Tempo médio de resposta', 'Leads sem retorno'],
      },
      {
        title: 'Estoque & Demanda',
        description: 'Ruptura, giro, produtos parados e previsão de reposição.',
        icon: Package,
        bullets: ['Alerta de ruptura', 'Previsão de demanda'],
      },
      {
        title: 'Financeiro',
        description: 'Recebimentos, inadimplência, margem e alertas automáticos.',
        icon: DollarSign,
        bullets: ['Fluxo de caixa', 'Clientes inadimplentes'],
      },
    ],
  },
  kpis: {
    title: 'Números do Negócio',
    subtitle: 'Visualize o que importa em tempo real',
    items: [
      {
        label: 'Receita do mês',
        value: 284700,
        prefix: 'R$ ',
        suffix: '',
        change: '+12%',
        positive: true,
        micro: 'Cresceu com melhor conversão no atendimento.',
      },
      {
        label: 'Conversão de leads',
        value: 18.4,
        prefix: '',
        suffix: '%',
        decimals: 1,
        change: '+2,1 pp',
        positive: true,
        micro: 'Mais resposta rápida, menos lead perdido.',
      },
      {
        label: 'Ruptura de estoque',
        value: 3.2,
        prefix: '',
        suffix: '%',
        decimals: 1,
        change: '-1,4 pp',
        positive: true,
        micro: 'Menos falta de produto e venda perdida.',
      },
      {
        label: 'Tempo de resposta WhatsApp',
        value: 168,
        prefix: '',
        suffix: 's',
        format: 'time',
        change: '-38%',
        positive: true,
        micro: 'Meta: manter abaixo de 3 minutos.',
      },
    ],
  },
  marketing: {
    title: 'Seu marketing traz leads… mas está virando venda?',
    subtitle: 'A Tokyo conecta investimento em tráfego com atendimento, conversão e receita — para você saber o que dá retorno.',
    investment: {
      title: 'Investimento em marketing (mês)',
      items: [
        { label: 'Investimento', value: 'R$ 8.500' },
        { label: 'Leads gerados', value: '320' },
        { label: 'Custo por lead', value: 'R$ 26,56' },
      ],
    },
    result: {
      title: 'Resultado real no caixa',
      items: [
        { label: 'Leads respondidos em até 3 min', value: '68%' },
        { label: 'Vendas originadas do WhatsApp', value: '47' },
        { label: 'Receita atribuída', value: 'R$ 62.400' },
        { label: 'ROI estimado', value: '7,3x', badge: 'estimativa' },
      ],
    },
    insights: [
      'Maior perda hoje é atraso na resposta (queda de conversão).',
      'Se manter <3 min, projeção de +15% nas vendas.',
    ],
    disclaimer: 'Demonstração com dados simulados.',
  },
  chat: {
    title: 'Converse com a IA sobre seus números',
    subtitle: 'Pergunte em linguagem natural, receba respostas com dados e recomendações.',
    topics: [
      {
        id: 'marketing',
        label: 'Meu marketing está valendo a pena?',
        messages: [
          { role: 'user' as const, content: 'Estou investindo R$ 8.500/mês em tráfego. Isso está retornando?' },
          { role: 'ai' as const, content: 'Com dados simulados: 320 leads no mês (CPL ~R$ 26,56). O gargalo não é tráfego — é conversão no atendimento. Hoje 32% dos leads demoram mais de 10 min para receber resposta.' },
          { role: 'ai' as const, content: 'Se levar para <3 min, projeção de +15% nas vendas e ROI estimado ~7x.', badge: 'estimativa' },
          { role: 'ai' as const, content: 'Recomendação: automatizar triagem + respostas rápidas + follow-up em 7 dias. Depois, medir conversão por campanha.', isAction: true },
        ],
      },
      {
        id: 'vendas',
        label: 'O que está derrubando minhas vendas?',
        messages: [
          { role: 'user' as const, content: 'Por que minhas vendas caíram esse mês?' },
          { role: 'ai' as const, content: 'Analisando os dados: a queda de 8% nas vendas está ligada a dois fatores principais.' },
          { role: 'ai' as const, content: '1) Tempo de resposta no WhatsApp subiu de 2m para 5m30s — leads frios perdem interesse.' },
          { role: 'ai' as const, content: '2) Ruptura de estoque nos 3 produtos mais vendidos (SKUs: A102, B045, C089).', badge: 'alerta' },
          { role: 'ai' as const, content: 'Ação sugerida: revisar escala de atendimento + antecipar reposição dos SKUs críticos.', isAction: true },
        ],
      },
      {
        id: 'previsao',
        label: 'Previsão para os próximos 30 dias',
        messages: [
          { role: 'user' as const, content: 'Como vão ser os próximos 30 dias?' },
          { role: 'ai' as const, content: 'Baseado no histórico e tendência atual:', badge: 'estimativa' },
          { role: 'ai' as const, content: 'Receita projetada: R$ 312.000 (+9,5% vs. mês anterior). Conversão esperada: 19,2%.' },
          { role: 'ai' as const, content: 'Risco: estoque do produto B045 pode acabar em 12 dias. Recomendo antecipar pedido.', badge: 'alerta' },
          { role: 'ai' as const, content: 'Oportunidade: leads de campanha "Black Week" têm conversão 24% maior — considere reativar.', isAction: true },
        ],
      },
      {
        id: 'estoque',
        label: 'Quais produtos devo repor?',
        messages: [
          { role: 'user' as const, content: 'Quais produtos preciso repor agora?' },
          { role: 'ai' as const, content: 'Análise de estoque concluída. 3 produtos em alerta crítico:' },
          { role: 'ai' as const, content: '• A102 (Camiseta Básica): 12 unidades, giro de 8/dia. Ruptura em 1-2 dias.', badge: 'alerta' },
          { role: 'ai' as const, content: '• B045 (Tênis Runner): 28 unidades, giro de 3/dia. Ruptura em ~9 dias.' },
          { role: 'ai' as const, content: '• C089 (Mochila Urban): estoque zerado há 2 dias — 14 vendas perdidas estimadas.' },
          { role: 'ai' as const, content: 'Recomendação: priorizar reposição A102 e C089 imediatamente. B045 pode esperar até sexta.', isAction: true },
        ],
      },
      {
        id: 'whatsapp',
        label: 'Como melhorar o WhatsApp em 7 dias?',
        messages: [
          { role: 'user' as const, content: 'Como posso melhorar meu atendimento no WhatsApp em uma semana?' },
          { role: 'ai' as const, content: 'Plano de 7 dias para melhorar conversão no WhatsApp:' },
          { role: 'ai' as const, content: 'Dias 1-2: Implementar resposta automática de triagem (reduz tempo de espera em 60%).' },
          { role: 'ai' as const, content: 'Dias 3-4: Criar templates de respostas rápidas para as 5 perguntas mais frequentes.' },
          { role: 'ai' as const, content: 'Dias 5-7: Ativar alerta para leads sem resposta há mais de 5 minutos + follow-up automático.', badge: 'estimativa' },
          { role: 'ai' as const, content: 'Resultado esperado: tempo de resposta <3 min e aumento de 12-18% na conversão.', isAction: true },
        ],
      },
    ],
  },
  integrations: {
    title: 'Integrações',
    subtitle: 'A Tokyo conecta com o que você já usa. Sem bagunça, com governança.',
    items: ['ERP', 'Planilhas', 'CRM', 'WhatsApp'],
    examples: 'Bling · Tiny · Omie · Google Sheets · Pipedrive',
  },
  cta: {
    title: 'Pronto para ver seus números com clareza?',
    subtitle: 'Primeiro resultado em até 21 dias. Sem setup demorado.',
    button: 'Quero meu dashboard',
    whatsappMessage: 'Olá! Quero um dashboard com IA (Números do Negócio) para minha empresa. Pode me mostrar como funciona e como seria o primeiro resultado em até 21 dias?',
  },
};

// ==================== COMPONENTS ====================

function DashboardHero() {
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
            {dashboardsContent.hero.badges.map((badge, i) => (
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
            {dashboardsContent.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
            {dashboardsContent.hero.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={`https://wa.me/5511999999999?text=${encodeURIComponent(dashboardsContent.cta.whatsappMessage)}`}
              variant="primary"
              className="btn-primary text-base"
            >
              {dashboardsContent.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
            
            <button
              onClick={scrollToExamples}
              className="btn-secondary text-base"
            >
              {dashboardsContent.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExamplesSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const { containerRef, getItemStyle } = useStaggerReveal(4, { baseDelay: 100, direction: 'up' });

  return (
    <section id="exemplos" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {dashboardsContent.examples.title}
          </h2>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dashboardsContent.examples.cards.map((card, index) => (
            <div
              key={index}
              className="tech-card group"
              style={getItemStyle(index)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ background: 'hsl(var(--tech-cyan) / 0.1)' }}
                >
                  <card.icon className="w-6 h-6 text-tech-cyan" />
                </div>
                <span className="badge-default text-xs">exemplo</span>
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              
              <p className="text-sm text-foreground-muted mb-4">
                {card.description}
              </p>
              
              <ul className="space-y-2">
                {card.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground-muted">
                    <div className="w-1 h-1 rounded-full bg-tech-cyan" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

function KPIsSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const { containerRef, getItemStyle } = useStaggerReveal(4, { baseDelay: 150, direction: 'scale' });

  return (
    <section className="py-20 relative">
      {/* Subtle background */}
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
            {dashboardsContent.kpis.title}
          </h2>
          <p className="text-foreground-muted">
            {dashboardsContent.kpis.subtitle}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dashboardsContent.kpis.items.map((item, index) => (
            <div
              key={index}
              className="tech-card text-center"
              style={getItemStyle(index)}
            >
              <p className="text-sm text-foreground-muted mb-2">{item.label}</p>
              
              <div className="flex items-baseline justify-center gap-1 mb-2">
                {item.format === 'time' ? (
                  <span className="font-display text-3xl font-bold text-foreground">
                    {formatTime(item.value)}
                  </span>
                ) : (
                  <>
                    <span className="text-foreground-muted">{item.prefix}</span>
                    <AnimatedCounter
                      end={item.value}
                      decimals={item.decimals}
                      className="font-display text-3xl font-bold text-foreground"
                    />
                    <span className="text-foreground-muted">{item.suffix}</span>
                  </>
                )}
              </div>
              
              <span 
                className={cn(
                  'inline-block px-2 py-0.5 rounded text-xs font-medium mb-3',
                  item.positive 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                )}
              >
                {item.change}
              </span>
              
              <p className="text-xs text-foreground-muted">
                {item.micro}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketingSection() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'max-w-4xl mx-auto transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {dashboardsContent.marketing.title}
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              {dashboardsContent.marketing.subtitle}
            </p>
          </div>
          
          {/* Comparison Card */}
          <div className="tech-card p-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Investment Column */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-border/30">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-tech-cyan" />
                  <h3 className="font-display font-semibold text-foreground">
                    {dashboardsContent.marketing.investment.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {dashboardsContent.marketing.investment.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-foreground-muted">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Results Column */}
              <div className="p-6 bg-surface/50">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    {dashboardsContent.marketing.result.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {dashboardsContent.marketing.result.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center gap-4">
                      <span className="text-foreground-muted">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{item.value}</span>
                        {item.badge && (
                          <span className="badge-amber text-xs">{item.badge}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Insights */}
            <div className="p-6 border-t border-border/30 bg-background/50">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-badge-amber" />
                <span className="font-semibold text-foreground">O que a IA aponta:</span>
              </div>
              
              <ul className="space-y-2 mb-4">
                {dashboardsContent.marketing.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-badge-amber mt-1.5 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
              
              <p className="text-xs text-foreground-muted/60 italic">
                {dashboardsContent.marketing.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  badge?: string;
  isAction?: boolean;
}

function ChatSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const [activeTopic, setActiveTopic] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const messages = dashboardsContent.chat.topics[activeTopic].messages;
    
    if (prefersReducedMotion.current) {
      setDisplayedMessages(messages);
      return;
    }

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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--surface) / 0.5), transparent)' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {dashboardsContent.chat.title}
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              {dashboardsContent.chat.subtitle}
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="tech-card p-0 overflow-hidden">
              <div className="grid lg:grid-cols-[280px_1fr]">
                {/* Topics sidebar */}
                <div className="p-4 border-b lg:border-b-0 lg:border-r border-border/30 bg-background/50">
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-3 px-2">
                    Pergunte sobre:
                  </p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    {dashboardsContent.chat.topics.map((topic, index) => (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopic(index)}
                        className={cn(
                          'flex-shrink-0 text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                          activeTopic === index
                            ? 'bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/30'
                            : 'text-foreground-muted hover:text-foreground hover:bg-surface/50'
                        )}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Chat area */}
                <div className="flex flex-col h-[400px]">
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 p-6 overflow-y-auto space-y-4"
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
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ 
                              background: 'hsl(var(--tech-cyan) / 0.1)',
                              boxShadow: '0 0 20px hsl(var(--tech-cyan) / 0.2)'
                            }}
                          >
                            <Bot className="w-4 h-4 text-tech-cyan" />
                          </div>
                        )}
                        
                        <div
                          className={cn(
                            'max-w-[80%] px-4 py-3 rounded-xl text-sm',
                            message.role === 'user'
                              ? 'bg-surface text-foreground'
                              : message.isAction
                                ? 'bg-primary/10 border border-primary/30 text-foreground'
                                : 'bg-background border border-border/30 text-foreground-muted'
                          )}
                        >
                          <p>{message.content}</p>
                          {message.badge && (
                            <span className="badge-amber text-xs mt-2 inline-block">
                              {message.badge}
                            </span>
                          )}
                        </div>
                        
                        {message.role === 'user' && (
                          <div 
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-surface"
                          >
                            <User className="w-4 h-4 text-foreground-muted" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3">
                        <div 
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ 
                            background: 'hsl(var(--tech-cyan) / 0.1)',
                            boxShadow: '0 0 20px hsl(var(--tech-cyan) / 0.2)'
                          }}
                        >
                          <Bot className="w-4 h-4 text-tech-cyan" />
                        </div>
                        <div className="px-4 py-3 rounded-xl bg-background border border-border/30">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-pulse" />
                            <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-pulse" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Input hint */}
                  <div className="p-4 border-t border-border/30 bg-background/30">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface/50 border border-border/30">
                      <Send className="w-4 h-4 text-foreground-muted" />
                      <span className="text-sm text-foreground-muted">
                        Selecione um tópico acima para simular a conversa...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  const { ref, isVisible } = useRevealOnScroll();
  
  const icons = [
    { name: 'ERP', icon: Database },
    { name: 'Planilhas', icon: FileSpreadsheet },
    { name: 'CRM', icon: Users },
    { name: 'WhatsApp', icon: MessageSquare },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'max-w-3xl mx-auto text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {dashboardsContent.integrations.title}
          </h2>
          <p className="text-foreground-muted mb-10">
            {dashboardsContent.integrations.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {icons.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border/30 transition-all hover:border-tech-cyan/30"
              >
                <item.icon className="w-5 h-5 text-tech-cyan" />
                <span className="text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-foreground-muted">
            {dashboardsContent.integrations.examples}
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, isVisible } = useRevealOnScroll();
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(dashboardsContent.cta.whatsappMessage)}`;

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
            {dashboardsContent.cta.title}
          </h2>
          <p className="text-foreground-muted mb-8">
            {dashboardsContent.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={whatsappUrl}
              variant="primary"
              className="btn-primary text-base"
            >
              {dashboardsContent.cta.button}
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
export default function Dashboards() {
  return (
    <>
      <Helmet>
        <title>{dashboardsContent.seo.title}</title>
        <meta name="description" content={dashboardsContent.seo.description} />
        <link rel="canonical" href="/solucoes/dashboards" />
        
        {/* Open Graph */}
        <meta property="og:title" content={dashboardsContent.seo.title} />
        <meta property="og:description" content={dashboardsContent.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/solucoes/dashboards" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dashboardsContent.seo.title} />
        <meta name="twitter:description" content={dashboardsContent.seo.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <DashboardHero />
          <ExamplesSection />
          <KPIsSection />
          <MarketingSection />
          <ChatSection />
          <IntegrationsSection />
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
