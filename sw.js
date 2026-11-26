/* ZineIt service worker — offline-first for the hosted build.
   ZineIt is a single file, so there is very little to cache and nothing to phone home
   about. Your photographs live in IndexedDB and are never touched by this worker. */
const CACHE = 'zineit-v4.2';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
  './favicon.ico', './favicon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './install.js'];
// Fonts and the HEIC decoder come from these hosts; they are stored the first time they load.
const RUNTIME_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) {
    if (!RUNTIME_HOSTS.includes(url.hostname)) return;
    e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(hit => {
      const net = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // Network first, so a deployed update is picked up; cache is the offline fallback.
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});
