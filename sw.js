/* makezines.pages.dev now redirects to zineit.app.
   This worker replaces the old offline worker: it clears the stored copy of the
   old version, removes itself and reloads open pages, which then follow the
   redirect to zineit.app. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
