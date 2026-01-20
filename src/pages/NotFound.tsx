import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO, pageSEO } from "@/components/SEO";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEO {...pageSEO.notFound} />
      <div className="text-center px-4">
        <div className="mb-8">
          <span className="text-8xl font-bold bg-gradient-to-r from-tech-cyan to-tech-blue bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Página não encontrada
        </h1>
        <p className="mb-8 text-lg text-foreground-muted max-w-md mx-auto">
          A página que você procura não existe ou foi movida para outro endereço.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-tech-cyan to-tech-blue text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
