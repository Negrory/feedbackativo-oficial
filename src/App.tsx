import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Consulta from './pages/Consulta';
import Dashboard from './pages/admin/Dashboard';
import Relatorios from './pages/admin/Relatorios';
import Atualizacoes from './pages/admin/Atualizacoes';
import VistoriaEntrada from './pages/admin/VistoriaEntrada';
import Finalizacao from './pages/admin/Finalizacao';
import AguardandoAprovacao from './pages/admin/AguardandoAprovacao';
import AdicionarVeiculo from './pages/admin/AdicionarVeiculo';
import Veiculos from './pages/admin/Veiculos';
import AdicionarOficina from './pages/admin/AdicionarOficina';
import Oficinas from './pages/admin/Oficinas';

const queryClient = new QueryClient();

const App = () => {
  console.log('App component is rendering');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/feedbackativo-oficial">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/relatorios" element={<Relatorios />} />
            <Route path="/admin/atualizacoes" element={<Atualizacoes />} />
            <Route path="/admin/vistoria-entrada" element={<VistoriaEntrada />} />
            <Route path="/admin/finalizacao" element={<Finalizacao />} />
            <Route path="/admin/aguardando-aprovacao" element={<AguardandoAprovacao />} />
            <Route path="/admin/adicionar-veiculo" element={<AdicionarVeiculo />} />
            <Route path="/admin/veiculos" element={<Veiculos />} />
            <Route path="/admin/adicionar-oficina" element={<AdicionarOficina />} />
            <Route path="/admin/oficinas" element={<Oficinas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
