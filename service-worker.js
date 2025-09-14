const cacheName = 'prezzi-v1';
const assets = [
'./',
'./index.html',
'./manifest.json',
'./logo_48x48.png',
'./logo_72x72.png',
'./logo_96x96.png',
'./logo_120x120.png',
'./logo_144x144.png',
'./logo_152x152.png',
'./logo_180x180.png',
'./logo_192x192.png',
'./logo_512x512.png'
];
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(cacheName).then((cache) => {
console.log('[Service Worker] Caching all assets');
return cache.addAll(assets);
})
);
});
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});
self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keyList) => {
return Promise.all(keyList.map((key) => {
if (key !== cacheName) {
console.log('[Service Worker] Removing old cache', key);
return caches.delete(key);
}
}));
})
);
});
