/* Al cambiar el contenido de la app, sube este número: la app se actualiza sola al abrirla. */
const CACHE_VERSION = 'cimientos-v42';

const APP_SHELL = [
  './',
  './index.html',
  './clasica.html',
  './sencilla.css',
  './sencilla.js',
  './tema.js',
  './fonts/bricolage-grotesque.woff2',
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
  './contenido15.js',
  './contenido16.js',
  './contenido17.js',
  './contenido18.js',
  './contenido19.js',
  './contenido20.js',
  './contenido21.js',
  './contenido22.js',
  './contenido23.js',
  './contenido24.js',
  './contenido25.js',
  './contenido26.js',
  './contenido27.js',
  './contenido28.js',
  './contenido29.js',
  './contenido30.js',
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

// Primero la red (para tener siempre lo último). Si no hay conexión, o la cobertura es tan mala
// que la red tarda más de 2,5 segundos, lo guardado: la ayuda tiene que abrirse siempre.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  const guardado = () => caches.match(event.request, { ignoreSearch: true }).then(c => c || caches.match('./index.html'));
  const red = fetch(event.request).then(response => {
    if (response && response.ok) {
      const clone = response.clone();
      caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
    }
    return response;
  });
  const lento = new Promise(res => setTimeout(res, 2500)).then(() => caches.match(event.request, { ignoreSearch: true })).then(c => c || red);
  event.respondWith(Promise.race([red, lento]).catch(guardado));
  event.waitUntil(red.catch(() => {}));
});
