const cacheName = 'repday-v1';
const files = ['./', './index.html', './style.css', './app.mjs', './routine.mjs',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('repday-') && key !== cacheName)
    .map(key => caches.delete(key)))));
});

self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html', {cacheName})));
    return;
  }
  if (!files.some(file => new URL(file, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(request, {cacheName}).then(cached => cached || fetch(request)));
});
