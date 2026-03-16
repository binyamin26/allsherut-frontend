import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n' // must be before App
import App from './App.jsx'
import './index.css'

// Nettoyage des anciens Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });
  caches.keys().then(names => names.forEach(name => caches.delete(name)));
}

// Création de la racine React 18
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)