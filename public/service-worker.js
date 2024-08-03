self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/site.webmanifest',
          '/icons/android-chrome-192x192.png',
          '/icons/android-chrome-512x512.png',
          '/icons/apple-touch-icon.png',
          '/icons/favicon-16x16.png',
          '/icons/favicon-32x32.png',
          '/icons/favicon.ico',
          // Add other assets that you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  