// Fichier: src/utils/registerServiceWorker.js

export function registerServiceWorker() {
  // Vérifier si les Service Workers sont supportés
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker enregistré:', registration.scope);

          // Vérifier les mises à jour toutes les heures
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Détecter nouvelle version disponible
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                console.log('🆕 Nouvelle version disponible!');
                
                // Optionnel: Afficher notification à l'utilisateur
                if (confirm('גרסה חדשה זמינה! רוצה לרענן?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('❌ Erreur enregistrement Service Worker:', error);
        });

      // Recharger quand le nouveau SW prend le contrôle
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      // NOUVEAU: Écoute les messages du Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          console.log('🔄 Nouvelle version détectée:', event.data.version);
          
          // Affiche un message et recharge (optionnel - tu peux afficher un toast à la place)
          if (confirm('גרסה חדשה זמינה (v' + event.data.version + '). לרענן עכשיו?')) {
            window.location.reload();
          }
        }
      });
    });
  } else {
    console.log('⚠️ Service Workers non supportés par ce navigateur');
  }
}

// Fonction pour effacer le cache (debug/développement)
export function clearServiceWorkerCache() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    console.log('🗑️ Demande de suppression des caches envoyée');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

// Fonction pour désinstaller le Service Worker
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then(() => {
        console.log('🗑️ Service Worker désinstallé');
        
        // Supprime aussi tous les caches
        if ('caches' in window) {
          caches.keys().then((cacheNames) => {
            return Promise.all(
              cacheNames.map((cacheName) => {
                console.log('🗑️ Suppression cache:', cacheName);
                return caches.delete(cacheName);
              })
            );
          }).then(() => {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      });
    });
  }
}