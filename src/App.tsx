import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Dashboards from "./pages/Dashboards";
import WhatsAppPage from "./pages/WhatsApp";
import NichosPage from "./pages/Nichos";
import OperationsPage from "./pages/Operations";
import NotFound from "./pages/NotFound";
import { N8NChatWidget } from "./components/N8NChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <N8NChatWidget />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solucoes/dashboards" element={<Dashboards />} />
            <Route path="/solucoes/whatsapp" element={<WhatsAppPage />} />
            <Route path="/solucoes/operacao" element={<OperationsPage />} />
            <Route path="/nichos" element={<NichosPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
