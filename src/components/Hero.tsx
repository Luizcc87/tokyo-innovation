import { content } from '@/content';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useParallax } from '@/hooks/useParallax';

export function Hero() {
  const { ref, isVisible } = useRevealOnScroll(0.1);
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.15, direction: 'up' });

  const handleMethodClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#metodo');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={parallaxRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
          {/* Badges */}
          <div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            style={{ transform: `translateY(${offset * 0.3}px)` }}
          >
            {content.hero.badges.map((badge, index) => (
              <span
                key={badge}
                className={index === 1 ? 'badge-amber' : 'badge-default'}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6"
            style={{ transform: `translateY(${offset * 0.2}px)` }}
          >
            {content.hero.headline}
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ transform: `translateY(${offset * 0.1}px)` }}
          >
            {content.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base md:text-lg px-8 py-4"
              aria-label="Quero começar - Abrir WhatsApp"
            >
              {content.hero.ctaPrimary}
            </a>
            <a
              href="#metodo"
              onClick={handleMethodClick}
              className="btn-secondary text-base md:text-lg px-8 py-4"
            >
              {content.hero.ctaSecondary}
            </a>
          </div>

          {/* Decorative element */}
          <div 
            className="mt-16 md:mt-24 flex justify-center"
            style={{ transform: `translateY(${offset * -0.2}px)` }}
          >
            <div className="w-px h-24 bg-gradient-to-b from-tech-cyan/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}