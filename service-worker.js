/* Al cambiar el contenido de la app, sube este número: la app se actualiza sola al abrirla. */
const CACHE_VERSION = 'cimientos-v23';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './app.css',
  './app.js',
  './contenido.js',
  './contenido2.js',
  './contenido3.js',
  './contenido4.js',
  './contenido5.js',
  './contenido6.js',
  './contenido7.js',
  './contenido8.js',
  './contenido9.js',
  './contenido10.js',
  './contenido11.js',
  './contenido12.js',
  './contenido13.js',
  './contenido14.js',
  './csync.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key.startsWith('cimientos-') && key !== CACHE_VERSION).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Primero la red (para tener siempre lo último); si no hay conexión, lo guardado.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.ok) {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request).then(c => c || caches.match('./index.html')))
  );
});
