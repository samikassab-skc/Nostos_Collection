const CACHE_NAME = "nostos-v2";

const ASSETS = [
  "./",
  "./index.html",

  "./concierge_IA.html",
  "./chef-a-domicile.html",
  "./degustation-vin.html",
  "./bien-etre-soins.html",
  "./la_region.html",

  "./manifest.json",

  "./photo.jpg",

  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
