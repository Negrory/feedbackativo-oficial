import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Adicione handler de erro global
window.addEventListener('error', (e) => {
  console.error('Global error handler:', e.error);
});

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // Remova o StrictMode em produção
    <HashRouter>
      <App />
    </HashRouter>
  )
} catch (error) {
  console.error('Error rendering application:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Ops! Algo deu errado.</h2>
      <p>Tente recarregar a página ou voltar para a <a href="/">página inicial</a>.</p>
    </div>
  `;
}
