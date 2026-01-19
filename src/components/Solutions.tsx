import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { useParallax } from '@/hooks/useParallax';
import { BarChart3, MessageSquare, Layers } from 'lucide-react';
import { SolutionCard } from './SolutionCard';

const iconMap = {
  BarChart3,
  MessageSquare,
  Layers,
};

export function Solutions() {
  const { containerRef, visibleItems } = useStaggerReveal(content.solutions.cards.length, 150);
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.08, direction: 'up' });

  return (
    <section
      id="solucoes"
      ref={parallaxRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="solutions-heading"
    >
      {/* Parallax background orbs */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.35}px)` }}
      >
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-tech-blue/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-tech-cyan/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className="text-center mb-16"
          style={{ transform: `translateY(${offset * 0.12}px)` }}
        >
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
            const cardOffset = offset * (0.05 + index * 0.02);
            
            return (
              <div 
                key={card.title}
                style={{ transform: `translateY(${cardOffset}px)` }}
              >
                <SolutionCard
                  icon={<IconComponent size={24} aria-hidden="true" />}
                  title={card.title}
                  description={card.description}
                  bullets={card.bullets}
                  isVisible={visibleItems[index]}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}