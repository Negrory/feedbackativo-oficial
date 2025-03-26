import React from 'react';
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Consulta from './pages/Consulta';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';

const App = () => {
  console.log('App component is rendering');
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="consulta" element={<Consulta />} />
      <Route path="admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
