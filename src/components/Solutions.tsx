import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { BarChart3, MessageSquare, Layers, Check } from 'lucide-react';

const iconMap = {
  BarChart3,
  MessageSquare,
  Layers,
};

export function Solutions() {
  const { containerRef, visibleItems } = useStaggerReveal(content.solutions.cards.length, 150);

  return (
    <section
      id="solucoes"
      className="relative py-24 md:py-32"
      aria-labelledby="solutions-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="solutions-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {content.solutions.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-tech-cyan to-tech-blue mx-auto rounded-full" />
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {content.solutions.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            
            return (
              <article
                key={card.title}
                className={`tech-card stagger-child ${visibleItems[index] ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-tech-cyan/10 text-tech-cyan">
                    <IconComponent size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground">
                    {card.title}
                  </h3>
                </div>

                <p className="text-foreground-muted mb-6 leading-relaxed">
                  {card.description}
                </p>

                <ul className="space-y-3" aria-label={`Benefícios de ${card.title}`}>
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check size={12} className="text-primary" aria-hidden="true" />
                      </span>
                      <span className="text-foreground-muted">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
