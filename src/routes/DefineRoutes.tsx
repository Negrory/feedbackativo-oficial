import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Carregue componentes simples primeiro
import Home from '../pages/Home';
import LoadingFallback from '../components/ui/LoadingFallback';

// Lazy load componentes mais complexos
const Consulta = lazy(() => import('../pages/Consulta'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const Veiculos = lazy(() => import('../pages/admin/Veiculos'));
const Oficinas = lazy(() => import('../pages/admin/Oficinas'));
// Outros imports lazy...

const DefineRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/consulta" element={
        <Suspense fallback={<LoadingFallback />}>
          <Consulta />
        </Suspense>
      } />
      
      <Route path="/admin/dashboard" element={
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      } />
      
      <Route path="/admin/veiculos" element={
        <Suspense fallback={<LoadingFallback />}>
          <Veiculos />
        </Suspense>
      } />
      
      <Route path="/admin/oficinas" element={
        <Suspense fallback={<LoadingFallback />}>
          <Oficinas />
        </Suspense>
      } />
      
      {/* Adicione outras rotas aqui... */}
    </Routes>
  );
};

export default DefineRoutes; 