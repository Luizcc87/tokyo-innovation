import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { useParallax } from '@/hooks/useParallax';
import { FileCheck, TrendingUp, Map, Shield } from 'lucide-react';

const iconMap = {
  FileCheck,
  TrendingUp,
  Map,
  Shield,
};

export function Governance() {
  const { containerRef, visibleItems } = useStaggerReveal(content.governance.items.length, 100);
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.1, direction: 'up' });

  return (
    <section
      id="governanca"
      ref={parallaxRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="governance-heading"
    >
      {/* Parallax decorative elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-badge-amber/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-tech-cyan/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className="text-center mb-16"
          style={{ transform: `translateY(${offset * 0.15}px)` }}
        >
          <h2
            id="governance-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {content.governance.title}
          </h2>
          <p 
            className="text-lg text-foreground-muted max-w-xl mx-auto"
            style={{ transform: `translateY(${offset * 0.1}px)` }}
          >
            {content.governance.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-tech-cyan to-tech-blue mx-auto rounded-full mt-6" />
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {content.governance.items.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const itemOffset = offset * (0.06 + index * 0.015);
            
            return (
              <div
                key={item.title}
                className={`tech-card text-center py-8 stagger-child ${visibleItems[index] ? 'visible' : ''}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: `translateY(${itemOffset}px)`,
                }}
              >
                <div className="inline-flex p-4 rounded-xl bg-tech-cyan/10 text-tech-cyan mb-4">
                  <IconComponent size={28} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-base md:text-lg text-foreground">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}