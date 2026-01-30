// Service Worker HomeSherut - Version avec auto-update
const CACHE_VERSION = 'v' + Date.now();
const CACHE_NAME = `homesherut-${CACHE_VERSION}`;
const RUNTIME_CACHE = `homesherut-runtime-${CACHE_VERSION}`;

// Fichiers à mettre en cache immédiatement (App Shell)
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// URLs des API à ne PAS mettre en cache
const API_URLS = [
  'https://homesherut-backend.onrender.com/api'
];

// ============================================
// INSTALLATION - Force le nouveau SW
// ============================================
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation version', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache ouvert, ajout fichiers statiques...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker installé!');
        return self.skipWaiting(); // Active immédiatement la nouvelle version
      })
  );
});

// ============================================
// ACTIVATION - Nettoyage TOUS les vieux caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation version', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Supprime TOUS les caches qui ne correspondent pas à la version actuelle
            return !cacheName.includes(CACHE_VERSION);
          })
          .map((cacheName) => {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => {
      console.log('✅ Service Worker activé et vieux caches supprimés!');
      return self.clients.claim(); // Prend le contrôle immédiatement
    })
    .then(() => {
      // Force le rechargement de TOUS les clients ouverts
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_UPDATED',
            version: CACHE_VERSION
          });
        });
      });
    })
  );
});

// ============================================
// FETCH - Stratégie Network First pour JS/CSS
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignore les requêtes vers l'API (toujours en ligne)
  if (API_URLS.some(apiUrl => request.url.startsWith(apiUrl))) {
    return;
  }

  // Ignore chrome-extension et autres protocoles
  if (!request.url.startsWith('http')) {
    return;
  }

  // Stratégie NETWORK FIRST pour JS/CSS (toujours la dernière version)
  if (request.url.includes('/assets/') || request.url.endsWith('.js') || request.url.endsWith('.css')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Clone et met en cache la nouvelle version
          const responseToCache = networkResponse.clone();
          if (networkResponse.ok) {
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          console.log('🌐 Depuis réseau:', request.url);
          return networkResponse;
        })
        .catch(() => {
          // Si offline, utilise le cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              console.log('📦 Depuis cache (offline):', request.url);
              return cachedResponse;
            }
            throw new Error('No cache available');
          });
        })
    );
    return;
  }

  // Stratégie CACHE FIRST pour images et autres fichiers statiques
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📦 Depuis cache:', request.url);
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            const responseToCache = networkResponse.clone();
            if (networkResponse.ok) {
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            console.log('🌐 Depuis réseau:', request.url);
            return networkResponse;
          })
          .catch((error) => {
            console.log('❌ Erreur réseau, page offline');
            return new Response(
              `
              <!DOCTYPE html>
              <html dir="rtl" lang="he">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>אין חיבור לאינטרנט</title>
                <style>
                  body {
                    font-family: 'Heebo', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                  }
                  .container { max-width: 400px; padding: 2rem; }
                  h1 { font-size: 2rem; margin-bottom: 1rem; }
                  p { font-size: 1.1rem; margin-bottom: 2rem; }
                  button {
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>📴 אין חיבור לאינטרנט</h1>
                  <p>אנא בדוק את החיבור שלך ונסה שוב</p>
                  <button onclick="window.location.reload()">נסה שוב</button>
                </div>
              </body>
              </html>
              `,
              { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
          });
      })
  );
});

// ============================================
// MESSAGES - Communication avec l'app
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map(cache => caches.delete(cache)));
    }).then(() => {
      console.log('🗑️ Tous les caches effacés!');
    });
  }
});