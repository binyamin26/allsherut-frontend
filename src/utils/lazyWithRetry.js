import { lazy } from 'react';

// Après un déploiement, les fichiers JS des pages changent de nom (hash). Un onglet resté
// ouvert (ou une page en cache) réclame alors l'ancien fichier, qui n'existe plus : le serveur
// renvoie index.html, l'import dynamique échoue ("Failed to fetch dynamically imported module")
// et la page reste blanche. On recharge donc la page une seule fois pour récupérer la
// nouvelle version ; si l'erreur persiste (vraie panne), on la laisse remonter.
const RELOAD_KEY = 'chunk-reload-at';
const RELOAD_COOLDOWN_MS = 10000;

const lazyWithRetry = (importPage) =>
  lazy(async () => {
    try {
      return await importPage();
    } catch (error) {
      let lastReload = 0;
      try { lastReload = Number(sessionStorage.getItem(RELOAD_KEY)) || 0; } catch { /* storage indisponible */ }

      if (Date.now() - lastReload > RELOAD_COOLDOWN_MS) {
        try { sessionStorage.setItem(RELOAD_KEY, String(Date.now())); } catch { /* storage indisponible */ }
        window.location.reload();
        return new Promise(() => {}); // on attend le rechargement
      }
      throw error;
    }
  });

export default lazyWithRetry;
