import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { content } from '@/content';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Menu, X, ChevronDown } from 'lucide-react';
import { MorphingLogo } from './MorphingLogo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (isHomePage) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          setIsMobileMenuOpen(false);
        }
      } else {
        // Navigate to home page with hash
        navigate('/' + href);
      }
    } else {
      setIsMobileMenuOpen(false);
      setIsSolutionsOpen(false);
    }
  };

  const handleSolutionClick = () => {
    setIsSolutionsOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/30'
          : 'bg-transparent'
      )}
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
          <Link
            to="/"
            className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground"
            aria-label="Tokyo Innovation - Página inicial"
          >
            <MorphingLogo text="TOKYO INNOVATION" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                onMouseEnter={() => setIsSolutionsOpen(true)}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors duration-200',
                  isSolutionsOpen ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'
                )}
                aria-expanded={isSolutionsOpen}
                aria-haspopup="true"
              >
                {content.nav.solutions.label}
                <ChevronDown 
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isSolutionsOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  'absolute top-full left-0 mt-2 w-72 rounded-xl overflow-hidden transition-all duration-200 origin-top-left',
                  'bg-surface border border-border/50 shadow-xl shadow-black/20',
                  isSolutionsOpen 
                    ? 'opacity-100 scale-100 visible' 
                    : 'opacity-0 scale-95 invisible'
                )}
                onMouseLeave={() => setIsSolutionsOpen(false)}
                style={{ zIndex: 100 }}
              >
                <div className="p-2">
                  {content.nav.solutions.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleSolutionClick}
                      className="block px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-tech-cyan/10 group"
                    >
                      <span className="block text-sm font-medium text-foreground group-hover:text-tech-cyan transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-foreground-muted mt-0.5">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* View all link */}
                <div className="border-t border-border/30 p-2">
                  <a
                    href="#solucoes"
                    onClick={(e) => handleNavClick(e, '#solucoes')}
                    className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-foreground-muted hover:text-tech-cyan hover:bg-tech-cyan/5 transition-colors"
                  >
                    Ver todas as soluções
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </a>
                </div>
              </div>
            </div>

            {/* Regular links */}
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
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border/30">
            {/* Mobile Solutions Accordion */}
            <div>
              <button
                onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                className="flex items-center justify-between w-full py-2 text-foreground-muted hover:text-foreground transition-colors duration-200 text-base font-medium"
              >
                {content.nav.solutions.label}
                <ChevronDown 
                  className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    isMobileSolutionsOpen && 'rotate-180'
                  )}
                />
              </button>
              
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isMobileSolutionsOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="pl-4 py-2 space-y-1 border-l-2 border-border/30 ml-2">
                  {content.nav.solutions.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleSolutionClick}
                      className="block py-2 text-sm text-foreground-muted hover:text-tech-cyan transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular mobile links */}
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 text-foreground-muted hover:text-foreground transition-colors duration-200 text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm w-fit mt-2"
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
