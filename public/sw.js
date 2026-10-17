// Monetag Verification & Service Worker
try {
  importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw');
} catch (e) {
  console.log('Monetag service worker fallback', e);
}

// Basic caching service worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
