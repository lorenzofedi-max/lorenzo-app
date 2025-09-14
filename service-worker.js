const CACHE_NAME = 'prezzi-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo_192x192.png',
  './logo_512x512.png',
  'https://cdn.tailwindcss.com',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
];

// Installa il service worker e aggiunge i file alla cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste e serve i file dalla cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // La risorsa è nella cache
        if (response) {
          return response;
        }

        // La risorsa non è nella cache, la recupera dalla rete
        return fetch(event.request).catch(() => {
          // Se la rete fallisce, restituisce una pagina di fallback se necessario
          console.error("Fetch failed for:", event.request.url);
        });
      })
  );
});

// Aggiorna il service worker e pulisce le vecchie cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
