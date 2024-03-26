var cacheName = 'AfterSchoolActivities-v1';
var cacheFiles = [
    '/images/backgroud.PNG',
    '/images/favicon.svg',
    '/images/icon-store-512.png',
    '/images/image1.PNG',
    '/images/image2.PNG',
    '/images/image3.PNG',
    '/images/image4.PNG',
    '/images/image5.PNG',
    '/images/image6.PNG',
    '/images/image7.PNG',
    '/images/image8.PNG',
    '/images/image9.PNG',
    '/images/image10.PNG',
    '/images/image11.PNG',
    '/images/logo.PNG',
    'AfterSchoolActivities.webmanifest',
    'favicon.ico',
    'index.html',
    'server.js',
    'service-worker.js',
    'style.css'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});