const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/pwa/apple-icon-57x57.png',
  '/pwa/apple-icon-60x60.png',
  '/pwa/apple-icon-72x72.png',
  '/pwa/apple-icon-76x76.png',
  '/pwa/apple-icon-114x114.png',
  '/pwa/apple-icon-120x120.png',
  '/pwa/apple-icon-144x144.png',
  '/pwa/apple-icon-152x152.png',
  '/pwa/apple-icon-180x180.png',
  '/pwa/android-icon-192x192.png',
  '/pwa/favicon-32x32.png',
  '/pwa/favicon-96x96.png',
  '/pwa/favicon-16x16.png',
  '/logo.png', 
];

// Install event: caching static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new TypeError('Failed to fetch ' + url);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.error('Failed to cache', url, error);
              });
          })
        );
      })
  );
});

// Fetch event: serving cached assets or fetching from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event: cleaning up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push event: handling push notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received: ', data);

  const options = {
    body: data.body,
    icon: '/logo.png',  // Absolute path
    badge: '/badge.png', // Absolute path
    data: {
      url: 'https://wisatakesehatanjamu.netlify.app/konsultasi'  // URL to open when notification is clicked
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event: opening URL from notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)  // Use the URL from notification data
  );
});
