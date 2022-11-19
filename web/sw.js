// @ts-nocheck

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');
const CACHE = {
    JS:'js',
    CSS:'css',
    IMAGE:'image',
    FONT:'font'
};

const CSS_CACHE = "css";
const JS_CACHE = "js";
const IMAGE_CACHE = "image";
const FONT_CACHE = "font";

workbox.setConfig({
    debug: false,
});


// ASSERTS JS
workbox.routing.registerRoute(
    new RegExp('/assets/.*\\.js'),
    new workbox.strategies.NetworkFirst({
        cacheName: JS_CACHE
    }),
);

// FONT CACHE
workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/s/materialicons/.*'),
    new workbox.strategies.NetworkFirst({
        cacheName: FONT_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7,
                purgeOnQuotaError: true,
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],        
    }),
);

workbox.routing.registerRoute(
    new RegExp('/assets/.*\\.(?:eot|svg|ttf|woff|woff2)'),
    new workbox.strategies.NetworkFirst({
        cacheName: FONT_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7,
                purgeOnQuotaError: true,
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],        
    }),
);

// CSS CACHE
workbox.routing.registerRoute(
    new RegExp('/assets/.*\\.css'),
    new workbox.strategies.CacheFirst({
        cacheName: CSS_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 15,
            }),
        ],
    }),
);

// IMAGE_CACHE
workbox.routing.registerRoute(
    new RegExp('/.*\\.(?:png|jpg|jpeg|svg|gif|ico)'),
    new workbox.strategies.CacheFirst({
        cacheName: IMAGE_CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 15,
            }),
        ],
    }),
);


// CACHE_OFFLINE HOME PAGE BGSYNCPLUGIN
const CACHE_OFFLINE = "cache-offline";
const QUEUE_NAME = "bgSyncQueue";

// CACHE OFFLINE PAGE HTML
const CACHE_OFFLINE_PAGE = "offline-page";
const offlineFallbackPage = "offline.html";
const CACHE_ASSETS_OFFLINE = [
	"./css/offline.css",
	"/images/no-connection.png",
	"/offline.html",
];

self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(CACHE_OFFLINE_PAGE)
		.then((cache) => {
			cache.addAll(CACHE_ASSETS_OFFLINE);
			// cache.add(offlineFallbackPage);
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate') {
		event.respondWith((async () => {
			try {
				const preloadResp = await event.preloadResponse;

				if (preloadResp) {
					return preloadResp;
				}

				const networkResp = await fetch(event.request);
				return networkResp;
			} catch (error) {

				const cache = await caches.open(CACHE_OFFLINE_PAGE);
				const cachedResp = await cache.match(offlineFallbackPage);
				return cachedResp;
			}
		})());
	}
});
// CLIENTSCLAIM
workbox.core.skipWaiting();
workbox.core.clientsClaim();

