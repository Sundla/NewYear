const CACHE_NAME = 'giftmaker-v1';
const ASSETS_TO_CACHE = [
    './GiftMaker.html',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js',
    'https://sundla.github.io/NewYear/icon.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((response) => {
                // Optional: dynamically cache other requested assets
                return response;
            })
            .catch(() => {
                return caches.match(e.request);
            })
    );
});