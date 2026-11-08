const cachePrefix = 'repday-' + self.registration.scope + '-';
const cacheName = cachePrefix + 'v2';
const files = ['./', './index.html', './style.css', './app.mjs', './routine.mjs',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files.map(file => new Request(file, {cache: 'reload'})))));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith(cachePrefix) && key !== cacheName)
    .map(key => caches.delete(key)))));
});

self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html', {cacheName}).then(cached => cached || fetch(request)));
    return;
  }
  if (!files.some(file => new URL(file, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(request, {cacheName}).then(cached => cached || fetch(request)));
});
