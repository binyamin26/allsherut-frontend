// Signale au backend une erreur d'affichage vue par un visiteur (le backend prévient l'admin
// par email, voir backend/routes/clientErrors.js). Ne doit JAMAIS lui-même provoquer d'erreur :
// tout est dans un try/catch et l'échec est silencieux.
const API_BASE = import.meta.env.VITE_API_URL || '/api';
const SENT_KEY = 'reported-errors';
// Robots (Googlebot, etc.) : un échec de rendu côté robot n'est pas vu par un visiteur, pas d'alerte.
const BOT_UA = /bot|crawler|spider|crawling|lighthouse|headless/i;

export const reportClientError = (error, componentStack) => {
  try {
    if (BOT_UA.test(navigator.userAgent || '')) return;

    const message = String(error?.message || error || 'Unknown error').slice(0, 500);

    // Un même visiteur ne signale pas la même erreur en boucle
    let already = [];
    try { already = JSON.parse(sessionStorage.getItem(SENT_KEY) || '[]'); } catch { /* storage indisponible */ }
    if (already.includes(message)) return;
    try { sessionStorage.setItem(SENT_KEY, JSON.stringify([...already, message].slice(-20))); } catch { /* storage indisponible */ }

    fetch(`${API_BASE}/client-errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        message,
        stack: String(error?.stack || '').slice(0, 1500),
        componentStack: String(componentStack || '').slice(0, 1500),
        url: window.location.pathname + window.location.search,
        language: (() => { try { return localStorage.getItem('homesherut_language') || ''; } catch { return ''; } })(),
      }),
    }).catch(() => {});
  } catch { /* le signalement ne doit jamais casser la page d'erreur */ }
};
