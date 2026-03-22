import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { i18nInitPromise } from './i18n'

// Nettoyage des anciens Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });
  caches.keys().then(names => names.forEach(name => caches.delete(name)));
}

// Wait for translations to load before React renders — eliminates all race conditions.
// ~100ms on first visit (JSON fetch), instant after (browser cache).
const root = ReactDOM.createRoot(document.getElementById('root'))

i18nInitPromise.then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
