import { useState, useEffect } from 'react';
import { content } from '@/content';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/30'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-tech-cyan via-tech-blue to-primary transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: scrollProgress > 0 ? '0 0 10px rgba(79, 195, 247, 0.5), 0 0 20px rgba(79, 195, 247, 0.3)' : 'none',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground hover:text-tech-cyan transition-colors duration-300"
            aria-label="Tokyo Innovation - Página inicial"
          >
            TOKYO INNOVATION
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="link-underline text-foreground-muted hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
              aria-label="Quero começar - Abrir WhatsApp"
            >
              {content.nav.cta}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground-muted hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/30">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-foreground-muted hover:text-foreground transition-colors duration-200 text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm w-fit"
              aria-label="Quero começar - Abrir WhatsApp"
            >
              {content.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}