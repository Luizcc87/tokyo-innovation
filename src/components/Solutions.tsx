import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { BarChart3, MessageSquare, Layers } from 'lucide-react';
import { SolutionCard } from './SolutionCard';

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
              <SolutionCard
                key={card.title}
                icon={<IconComponent size={24} aria-hidden="true" />}
                title={card.title}
                description={card.description}
                bullets={card.bullets}
                isVisible={visibleItems[index]}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
