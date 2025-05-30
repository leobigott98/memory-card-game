const CACHE_NAME = 'memory-game-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/site.webmanifest',
  'logo_maizoritos.png',
  '/assets/cereal_colores.webp',
  '/assets/cereal.webp',
  '/assets/maizoritos.webp',
  '/assets/mano.webp',
  '/assets/pinkie.webp',
  '/assets/saludo.webp',
  '/data/cards.json',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/apple-touch-icon.png',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
  '/tt-hazelnuts-font-family-1748587365-0/TTHazelnuts-Regular-Trial-BF6401510bf3e3e.otf',
];

// Cache assets on install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Optional: Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});
