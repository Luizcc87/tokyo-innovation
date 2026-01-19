import { content } from '@/content';
import { useStaggerReveal } from '@/hooks/useRevealOnScroll';

export function Method() {
  const { containerRef, visibleItems } = useStaggerReveal(content.method.steps.length, 200);

  return (
    <section
      id="metodo"
      className="relative py-24 md:py-32 bg-background-alt"
      aria-labelledby="method-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="method-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {content.method.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-tech-cyan to-tech-blue mx-auto rounded-full" />
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {content.method.steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={step.title}
                  className={`relative flex items-start gap-8 stagger-child ${visibleItems[index] ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex gap-6">
                    {/* Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-surface border-2 border-tech-cyan flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-tech-cyan" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <span className="badge-amber text-xs mb-2 inline-block">{step.duration}</span>
                      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-foreground-muted text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 w-full">
                    {/* Left content */}
                    <div className={`${isLeft ? 'text-right pr-12' : 'order-2 pl-12'}`}>
                      {isLeft && (
                        <>
                          <span className="badge-amber text-xs mb-2 inline-block">{step.duration}</span>
                          <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-foreground-muted text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-10 h-10 rounded-full bg-surface border-2 border-tech-cyan flex items-center justify-center shadow-lg shadow-tech-cyan/20">
                        <div className="w-4 h-4 rounded-full bg-tech-cyan animate-pulse-glow" />
                      </div>
                    </div>

                    {/* Right content */}
                    <div className={`${!isLeft ? 'text-left pl-12' : 'order-2 pr-12'}`}>
                      {!isLeft && (
                        <>
                          <span className="badge-amber text-xs mb-2 inline-block">{step.duration}</span>
                          <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-foreground-muted text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
