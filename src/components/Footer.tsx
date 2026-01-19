import { content } from '@/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/30" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold text-foreground-muted">
            {content.brand.name}
          </p>
          <p className="text-sm text-foreground-muted">
            © {currentYear} Tokyo Innovation. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
