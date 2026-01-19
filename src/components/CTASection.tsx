import { content } from '@/content';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { MessageCircle } from 'lucide-react';

export function CTASection() {
  const { ref, isVisible } = useRevealOnScroll(0.2);

  return (
    <section
      className="relative py-24 md:py-32 bg-background-alt"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}
        >
          <h2
            id="cta-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
          >
            {content.cta.title}
          </h2>
          
          <p className="text-lg md:text-xl text-foreground-muted mb-10">
            {content.cta.description}
          </p>

          <a
            href={content.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5"
            aria-label="Chamar no WhatsApp"
          >
            <MessageCircle size={22} aria-hidden="true" />
            {content.cta.button}
          </a>

          <p className="mt-8 text-sm text-foreground-muted">
            {content.cta.location}
          </p>
        </div>
      </div>
    </section>
  );
}
