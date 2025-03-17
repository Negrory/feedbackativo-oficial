import React from 'react';
import { Routes, Route } from "react-router-dom";

// Componente simples sem dependências complexas
const HomePage = () => (
  <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
    <h1>Feedback Ativo</h1>
    <p>Bem-vindo à nossa aplicação!</p>
    <div style={{ marginTop: '20px' }}>
      <a href="#/consulta" style={{ padding: '10px', background: '#4f46e5', color: 'white', borderRadius: '4px', textDecoration: 'none', marginRight: '10px' }}>
        Consulta
      </a>
      <a href="#/admin/dashboard" style={{ padding: '10px', background: '#4f46e5', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
        Área Administrativa
      </a>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
    <h1>Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <a href="#/" style={{ display: 'inline-block', marginTop: '20px', color: '#4f46e5' }}>
      Voltar para a página inicial
    </a>
  </div>
);

const App = () => {
  console.log('App component is rendering');
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
