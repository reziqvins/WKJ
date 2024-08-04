const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/apple-icon-57x57.png',
  '/apple-icon-60x60.png',
  '/apple-icon-72x72.png',
  '/apple-icon-76x76.png',
  '/apple-icon-114x114.png',
  '/apple-icon-120x120.png',
  '/apple-icon-144x144.png',
  '/apple-icon-152x152.png',
  '/apple-icon-180x180.png',
  '/android-icon-192x192.png',
  '/favicon-32x32.png',
  '/favicon-96x96.png',
  '/favicon-16x16.png',
  '/logo.png',    // Include the icons used for notifications
  '/badge.png'
];

// Install event: caching static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
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
