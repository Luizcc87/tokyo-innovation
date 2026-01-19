import { content } from '@/content';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useParallax } from '@/hooks/useParallax';
import { MessageCircle } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function CTASection() {
  const { ref, isVisible } = useRevealOnScroll(0.2);
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.12, direction: 'up' });

  return (
    <section
      ref={parallaxRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-32 bg-background-alt overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Parallax decorative elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      >
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-tech-cyan/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}
        >
          <h2
            id="cta-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
            style={{ transform: `translateY(${offset * 0.15}px)` }}
          >
            {content.cta.title}
          </h2>
          
          <p 
            className="text-lg md:text-xl text-foreground-muted mb-10"
            style={{ transform: `translateY(${offset * 0.1}px)` }}
          >
            {content.cta.description}
          </p>

          <MagneticButton
            href={content.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="inline-flex items-center gap-3 text-lg px-10 py-5"
            aria-label="Chamar no WhatsApp"
            strength={0.45}
            radius={180}
          >
            <MessageCircle size={22} aria-hidden="true" />
            {content.cta.button}
          </MagneticButton>

          <p 
            className="mt-8 text-sm text-foreground-muted"
            style={{ transform: `translateY(${offset * 0.02}px)` }}
          >
            {content.cta.location}
          </p>
        </div>
      </div>
    </section>
  );
}