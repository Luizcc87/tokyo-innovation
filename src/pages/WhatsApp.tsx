import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  MessageSquare, 
  Bot, 
  User, 
  ArrowRight,
  Clock,
  Zap,
  Database,
  FileSpreadsheet,
  Users,
  Send,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Filter,
  Repeat,
  BarChart3,
  Settings,
  ShoppingCart,
  Briefcase,
  Stethoscope,
  Factory,
  UserCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useRevealOnScroll, useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/utils';

// ==================== CONTENT ====================
const whatsappContent = {
  seo: {
    title: 'IA no WhatsApp | Tokyo Innovation',
    description: 'WhatsApp organizado com IA: triagem, atendimento 24/7, follow-up e conversão. Linguagem de dono, resultado mensurável.',
  },
  hero: {
    headline: 'WhatsApp organizado. Atendimento rápido.',
    subheadline: 'IA que responde, qualifica e faz follow-up — com regras do seu negócio. Menos bagunça, mais vendas.',
    badges: ['Triagem automática', 'Follow-up inteligente', 'Tempo de resposta < 3 min'],
    ctaPrimary: 'Quero IA no WhatsApp',
    ctaSecondary: 'Ver fluxos',
  },
  features: {
    title: 'O que a IA faz no seu WhatsApp',
    cards: [
      {
        title: 'Respostas instantâneas',
        description: 'FAQ automatizado 24/7',
        icon: Zap,
        bullets: ['Preço, prazo, disponibilidade', 'Respostas em segundos'],
      },
      {
        title: 'Qualificação de lead',
        description: 'Triagem automática e inteligente',
        icon: Filter,
        bullets: ['PF/PJ, interesse, urgência', 'Encaminha para vendedor certo'],
      },
      {
        title: 'Roteiro por nicho',
        description: 'Fala como seu negócio',
        icon: Settings,
        bullets: ['Tom de voz personalizado', 'Perguntas certas por segmento'],
      },
      {
        title: 'Follow-up automático',
        description: 'Ninguém fica sem retorno',
        icon: Repeat,
        bullets: ['Recupera leads frios', 'Lembrete de orçamento'],
      },
      {
        title: 'Integrações',
        description: 'Conecta com seus sistemas',
        icon: Database,
        bullets: ['CRM/Agenda/Planilhas/ERP', 'Registro automático'],
      },
      {
        title: 'Relatório',
        description: 'Números do Negócio do WhatsApp',
        icon: BarChart3,
        bullets: ['Tempo de resposta, conversão', 'Leads por origem'],
      },
    ],
  },
  flow: {
    title: 'Fluxo visual',
    subtitle: 'Do primeiro contato à venda, tudo organizado',
    steps: [
      { 
        title: 'Entrada', 
        description: 'Cliente entra em contato',
        metric: 'Responde em segundos',
        icon: MessageSquare 
      },
      { 
        title: 'Triagem', 
        description: 'IA qualifica e encaminha',
        metric: 'Qualifica e encaminha',
        icon: Filter 
      },
      { 
        title: 'Oferta/Orçamento', 
        description: 'Envia proposta personalizada',
        metric: 'Reduz retrabalho',
        icon: Send 
      },
      { 
        title: 'Agendamento', 
        description: 'Confirma horário ou checkout',
        metric: 'Confirma e organiza',
        icon: Calendar 
      },
      { 
        title: 'Follow-up', 
        description: 'Retenção e recuperação',
        metric: 'Recupera leads frios',
        icon: RefreshCw 
      },
    ],
  },
  niches: {
    title: 'Simulação por tipo de negócio',
    subtitle: 'Veja como a IA se adapta ao seu segmento',
    tabs: [
      {
        id: 'varejo',
        label: 'Varejo',
        icon: ShoppingCart,
        questions: [
          'Vocês têm esse produto em estoque?',
          'Qual o prazo de entrega?',
          'Aceitam parcelamento?',
        ],
        responses: [
          'Sim! Temos 12 unidades disponíveis. Quer que eu reserve uma para você?',
          'Entrega em 2-3 dias úteis para sua região. Posso confirmar seu CEP?',
          'Parcelamos em até 10x sem juros. Posso enviar o link de pagamento?',
        ],
        actions: [
          'Reserva produto no sistema',
          'Calcula frete automaticamente',
          'Gera link de checkout',
        ],
      },
      {
        id: 'contabilidade',
        label: 'Contabilidade',
        icon: Briefcase,
        questions: [
          'Quanto custa a contabilidade?',
          'Vocês fazem abertura de empresa?',
          'Preciso entregar meus documentos onde?',
        ],
        responses: [
          'Depende do seu faturamento e regime tributário. Posso fazer algumas perguntas rápidas?',
          'Sim! Abertura de MEI em 24h, LTDA em até 7 dias. Qual seu caso?',
          'Tudo digital! Vou te enviar o link do portal. Lá você sobe tudo pelo celular.',
        ],
        actions: [
          'Cria tarefa para consultor',
          'Agenda reunião inicial',
          'Envia link do portal',
        ],
      },
      {
        id: 'clinica',
        label: 'Clínica',
        icon: Stethoscope,
        questions: [
          'Vocês atendem convênio X?',
          'Quero marcar uma consulta',
          'Quais horários disponíveis?',
        ],
        responses: [
          'Sim, atendemos! Posso verificar os horários disponíveis para você?',
          'Claro! Com qual especialista você gostaria de agendar?',
          'Para Dr. Silva, temos: terça 14h, quarta 10h e sexta 16h. Qual prefere?',
        ],
        actions: [
          'Verifica cobertura do convênio',
          'Agenda no sistema da clínica',
          'Envia confirmação por WhatsApp',
        ],
      },
      {
        id: 'industria',
        label: 'Indústria/Serviços',
        icon: Factory,
        questions: [
          'Preciso de um orçamento',
          'Vocês fazem visita técnica?',
          'Qual o prazo de execução?',
        ],
        responses: [
          'Posso adiantar algumas informações. Qual o tipo de serviço/produto que você precisa?',
          'Sim! Agendamos visita técnica sem custo. Qual a melhor data para você?',
          'Depende do escopo. Após a visita técnica, entregamos orçamento em até 48h.',
        ],
        actions: [
          'Registra lead no CRM',
          'Agenda visita técnica',
          'Cria tarefa para orçamentista',
        ],
      },
    ],
  },
  chat: {
    title: 'Converse com a IA sobre seu atendimento',
    subtitle: 'Perguntas que donos de negócio fazem todos os dias',
    topics: [
      {
        id: 'perda',
        label: 'Quanto eu perdi por demora na resposta?',
        messages: [
          { role: 'user' as const, content: 'Quanto eu perdi por demora na resposta?' },
          { role: 'ai' as const, content: 'Analisando os dados do mês: seu tempo médio de resposta está em 9 minutos.' },
          { role: 'ai' as const, content: 'Leads que esperam mais de 5 min têm 60% menos chance de fechar. No seu caso, isso representa aproximadamente 22% dos leads sem retorno.', badge: 'estimativa' },
          { role: 'ai' as const, content: 'Se reduzir para menos de 3 min, projeção de recuperar 8-12 vendas/mês.', isAction: true },
        ],
      },
      {
        id: 'prioridade',
        label: 'Qual lead devo priorizar hoje?',
        messages: [
          { role: 'user' as const, content: 'Qual lead devo priorizar hoje?' },
          { role: 'ai' as const, content: 'Você tem 47 leads ativos. Priorizei 5 para hoje:' },
          { role: 'ai' as const, content: '1) Maria Silva — orçamento de R$ 12.000, esperando resposta há 2h. Alta probabilidade de fechar.', badge: 'urgente' },
          { role: 'ai' as const, content: '2) João Costa — perguntou sobre prazo, lead quente. 3) Empresa ABC — CNPJ, ticket alto.' },
          { role: 'ai' as const, content: 'Recomendação: responder Maria primeiro. Ela já comparou preços e está pronta para decidir.', isAction: true },
        ],
      },
      {
        id: 'followup',
        label: 'Crie uma mensagem de follow-up curta',
        messages: [
          { role: 'user' as const, content: 'Crie uma mensagem de follow-up curta para leads que não responderam' },
          { role: 'ai' as const, content: 'Aqui está uma sugestão personalizada para seu negócio:' },
          { role: 'ai' as const, content: '"Oi [Nome]! Tudo bem? Vi que você perguntou sobre [produto/serviço]. Ainda está procurando? Posso ajudar com alguma dúvida ou enviar mais informações. 😊"' },
          { role: 'ai' as const, content: 'Essa mensagem tem 73% de taxa de abertura e 28% de resposta em negócios similares.', badge: 'estimativa' },
          { role: 'ai' as const, content: 'Quer que eu agende envio automático para todos os leads sem resposta há mais de 24h?', isAction: true },
        ],
      },
    ],
  },
  kpis: {
    title: 'Números do Negócio do WhatsApp',
    subtitle: 'Métricas que importam para seu atendimento',
    items: [
      {
        label: 'Tempo médio de resposta',
        value: 168,
        format: 'time',
        change: '-38%',
        positive: true,
      },
      {
        label: 'Leads qualificados/mês',
        value: 180,
        prefix: '',
        suffix: '',
        change: '+22%',
        positive: true,
      },
      {
        label: 'Conversão no WhatsApp',
        value: 18.4,
        prefix: '',
        suffix: '%',
        decimals: 1,
        change: '+2,1 pp',
        positive: true,
      },
      {
        label: 'Leads recuperados por follow-up',
        value: 47,
        prefix: '',
        suffix: '',
        change: '+15%',
        positive: true,
      },
    ],
  },
  integrations: {
    title: 'Integrações',
    subtitle: 'A Tokyo conecta com o que você já usa. Sem bagunça, com governança.',
    items: ['ERP', 'CRM', 'Agenda', 'Planilhas', 'WhatsApp API'],
  },
  cta: {
    title: 'Pronto para organizar seu WhatsApp?',
    subtitle: 'Primeiro resultado em até 21 dias. Sem setup demorado.',
    button: 'Quero IA no WhatsApp',
    whatsappMessage: 'Olá! Quero IA no WhatsApp para organizar atendimento, qualificar leads e fazer follow-up. Pode me mostrar como funciona e como medir resultado?',
  },
};

// ==================== COMPONENTS ====================

function WhatsAppHero() {
  const { ref, isVisible } = useRevealOnScroll();
  
  const scrollToFlow = () => {
    document.getElementById('fluxos')?.scrollIntoView({ behavior: 'smooth' });
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
            {whatsappContent.hero.badges.map((badge, i) => (
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
            {whatsappContent.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
            {whatsappContent.hero.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={`https://wa.me/555596030135?text=${encodeURIComponent(whatsappContent.cta.whatsappMessage)}`}
              variant="primary"
              className="btn-primary text-base"
            >
              {whatsappContent.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
            
            <button
              onClick={scrollToFlow}
              className="btn-secondary text-base"
            >
              {whatsappContent.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const { containerRef, getItemStyle } = useStaggerReveal(6, { baseDelay: 100, direction: 'up' });

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {whatsappContent.features.title}
          </h2>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whatsappContent.features.cards.map((card, index) => (
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

function FlowSection() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="fluxos" className="py-20 relative">
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
            {whatsappContent.flow.title}
          </h2>
          <p className="text-foreground-muted">
            {whatsappContent.flow.subtitle}
          </p>
        </div>
        
        {/* Stepper */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tech-cyan/30 to-transparent" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {whatsappContent.flow.steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="tech-card text-center h-full">
                    {/* Step number */}
                    <div 
                      className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10"
                      style={{ 
                        background: 'hsl(var(--tech-cyan) / 0.1)',
                        border: '1px solid hsl(var(--tech-cyan) / 0.3)',
                        boxShadow: '0 0 20px hsl(var(--tech-cyan) / 0.2)'
                      }}
                    >
                      <step.icon className="w-5 h-5 text-tech-cyan" />
                    </div>
                    
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-foreground-muted mb-3">
                      {step.description}
                    </p>
                    
                    <span className="inline-block px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                      {step.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NichesSection() {
  const { ref, isVisible } = useRevealOnScroll();
  const [activeTab, setActiveTab] = useState(0);

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
              {whatsappContent.niches.title}
            </h2>
            <p className="text-foreground-muted">
              {whatsappContent.niches.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {whatsappContent.niches.tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200',
                    activeTab === index
                      ? 'bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/30'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="tech-card">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Questions */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-foreground-muted" />
                    <h3 className="font-display font-semibold text-foreground">Perguntas comuns</h3>
                  </div>
                  <ul className="space-y-3">
                    {whatsappContent.niches.tabs[activeTab].questions.map((q, i) => (
                      <li key={i} className="text-sm text-foreground-muted flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-tech-cyan/50" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Responses */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-5 h-5 text-tech-cyan" />
                    <h3 className="font-display font-semibold text-foreground">Respostas da IA</h3>
                  </div>
                  <ul className="space-y-3">
                    {whatsappContent.niches.tabs[activeTab].responses.map((r, i) => (
                      <li key={i} className="text-sm text-foreground-muted flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Actions */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-badge-amber" />
                    <h3 className="font-display font-semibold text-foreground">Ação automática</h3>
                  </div>
                  <ul className="space-y-3">
                    {whatsappContent.niches.tabs[activeTab].actions.map((a, i) => (
                      <li key={i} className="text-sm text-foreground-muted flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-badge-amber" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
    const messages = whatsappContent.chat.topics[activeTopic].messages;
    
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
              {whatsappContent.chat.title}
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              {whatsappContent.chat.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="tech-card p-0 overflow-hidden">
              <div className="grid lg:grid-cols-[280px_1fr]">
                {/* Topics sidebar */}
                <div className="p-4 border-b lg:border-b-0 lg:border-r border-border/30 bg-background/50">
                  <p className="text-xs uppercase tracking-wider text-foreground-muted mb-3 px-2">
                    Pergunte sobre:
                  </p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    {whatsappContent.chat.topics.map((topic, index) => (
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
            {whatsappContent.kpis.title}
          </h2>
          <p className="text-foreground-muted">
            {whatsappContent.kpis.subtitle}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {whatsappContent.kpis.items.map((item, index) => (
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
                  'inline-block px-2 py-0.5 rounded text-xs font-medium',
                  item.positive 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-destructive/10 text-destructive'
                )}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  const { ref, isVisible } = useRevealOnScroll();
  
  const icons: { name: string; icon: typeof Database }[] = [
    { name: 'ERP', icon: Database },
    { name: 'CRM', icon: Users },
    { name: 'Agenda', icon: Calendar },
    { name: 'Planilhas', icon: FileSpreadsheet },
    { name: 'WhatsApp API', icon: MessageSquare },
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
            {whatsappContent.integrations.title}
          </h2>
          <p className="text-foreground-muted mb-10">
            {whatsappContent.integrations.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, isVisible } = useRevealOnScroll();
  const whatsappUrl = `https://wa.me/555596030135?text=${encodeURIComponent(whatsappContent.cta.whatsappMessage)}`;

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
            {whatsappContent.cta.title}
          </h2>
          <p className="text-foreground-muted mb-8">
            {whatsappContent.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={whatsappUrl}
              variant="primary"
              className="btn-primary text-base"
            >
              {whatsappContent.cta.button}
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
export default function WhatsAppPage() {
  return (
    <>
      <Helmet>
        <title>{whatsappContent.seo.title}</title>
        <meta name="description" content={whatsappContent.seo.description} />
        <link rel="canonical" href="/solucoes/whatsapp" />
        
        {/* Open Graph */}
        <meta property="og:title" content={whatsappContent.seo.title} />
        <meta property="og:description" content={whatsappContent.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/solucoes/whatsapp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={whatsappContent.seo.title} />
        <meta name="twitter:description" content={whatsappContent.seo.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <WhatsAppHero />
          <FeaturesSection />
          <FlowSection />
          <NichesSection />
          <ChatSection />
          <KPIsSection />
          <IntegrationsSection />
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
