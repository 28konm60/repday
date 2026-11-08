const cachePrefix = 'repday-' + self.registration.scope + '-';
const cacheName = cachePrefix + 'v19';
const files = ['./', './index.html', './style.css', './app.mjs', './routine.mjs', './meals.mjs', './meal-catalog.mjs',
  './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './meal-photos/yogurt.jpg', './meal-photos/chicken.jpg', './meal-photos/salmon.jpg',
  './meal-photos/avocado-toast.jpg', './meal-photos/oatmeal.jpg', './meal-photos/chickpea.jpg',
  './meal-photos/tofu.jpg', './meal-photos/shrimp-pasta.jpg', './meal-photos/chicken-broccoli.jpg',
  './meal-photos/pancakes.jpg', './meal-photos/omelet.jpg', './meal-photos/apple-oats.jpg',
  './meal-photos/strawberry-yogurt.jpg', './meal-photos/egg-toast.jpg', './meal-photos/mango-smoothie.jpg',
  './meal-photos/club-sandwich.jpg', './meal-photos/bean-bowl.jpg', './meal-photos/quinoa-salad.jpg',
  './meal-photos/mango-wrap.jpg', './meal-photos/lentil-soup.jpg', './meal-photos/beef-broccoli.jpg',
  './meal-photos/fish-potatoes.jpg', './meal-photos/tofu-noodles.jpg', './meal-photos/chicken-pasta.jpg',
  './meal-photos/bean-curry.jpg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName)
    .then(cache => cache.addAll(files.map(file => new Request(file, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith(cachePrefix) && key !== cacheName)
    .map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
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
