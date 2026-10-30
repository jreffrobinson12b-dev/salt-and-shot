/* Salt & Shot service worker (batch 66). App shell cached so the game opens offline;
   the page itself is network-first so a new build always wins when online. */
const V = "salt-shell-b67";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); if (e.data === "ver" && e.source) e.source.postMessage({ ver: V }); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  const page = r.mode === "navigate" || /\/(index\.html)?$/.test(new URL(r.url).pathname);
  if (page) { e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put("./index.html", cp)); return res; }).catch(() => caches.match("./index.html"))); return; }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })));
});
