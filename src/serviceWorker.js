// src/serviceWorker.js
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = ['/', '/index.html', '/logo192.png'];

window.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

window.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
