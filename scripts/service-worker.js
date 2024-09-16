const CACHE_NAME = 'hola9-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/pages/about.html',
  '/pages/listings.html',
  '/pages/offline.html',
  '/images/img1.png',
  '/images/img2.jpeg',
  '/scripts/app.js'
];

// Install event - caching critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }).catch(() => caches.match('/pages/offline.html'))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
