import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';
import { FileCheck, TrendingUp, Map, Shield } from 'lucide-react';

const iconMap = {
  FileCheck,
  TrendingUp,
  Map,
  Shield,
};

export function Governance() {
  const { containerRef, visibleItems } = useStaggerReveal(content.governance.items.length, 100);

  return (
    <section
      id="governanca"
      className="relative py-24 md:py-32"
      aria-labelledby="governance-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="governance-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {content.governance.title}
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
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
            
            return (
              <div
                key={item.title}
                className={`tech-card text-center py-8 stagger-child ${visibleItems[index] ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
