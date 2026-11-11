/* ADMISSION//26 service worker v2 — shell + circular offline + desk alerts */
const SHELL = "a26-shell-v2";
const CIRC = "a26-circulars-v2";
const LEGACY = ["a26-desk-v1"];

const SHELL_URLS = ["/", "/alerts-feed.json", "/manifest.webmanifest", "/favicon.svg", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(SHELL_URLS).catch(() => undefined)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL && k !== CIRC)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isCircularAsset(url) {
  try {
    const u = new URL(url);
    if (u.origin !== self.location.origin) return false;
    return /^\/circulars\/.+\.(pdf|webp)$/i.test(u.pathname);
  } catch {
    return false;
  }
}

function isNavigation(request) {
  return request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (isCircularAsset(request.url)) {
    event.respondWith(staleWhileRevalidate(request, CIRC));
    return;
  }

  if (isNavigation(request)) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(request, copy)).catch(() => undefined);
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const root = await caches.match("/");
          if (root) return root;
          return new Response("Offline — open a page once while online.", {
            status: 503,
            headers: { "content-type": "text/plain; charset=utf-8" },
          });
        }),
    );
    return;
  }

  // same-origin shell assets: cache-first with network fallback
  try {
    const u = new URL(request.url);
    if (u.origin === self.location.origin && (u.pathname.startsWith("/icons/") || u.pathname === "/favicon.svg" || u.pathname === "/manifest.webmanifest")) {
      event.respondWith(
        caches.match(request).then((hit) => hit || fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(request, copy)).catch(() => undefined);
          return res;
        })),
      );
    }
  } catch {
    /* ignore */
  }
});

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone()).catch(() => undefined);
      return res;
    })
    .catch(() => null);
  if (cached) {
    network.catch(() => undefined);
    return cached;
  }
  const res = await network;
  if (res) return res;
  return new Response("Circular asset unavailable offline. Open it once while online.", {
    status: 503,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

/* —— desk alerts (unchanged contract) —— */
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "SHOW_ALERT") return;
  const title = String(data.title || "ADMISSION//26");
  const body = String(data.body || "");
  const url = String(data.url || "/");
  const tag = String(data.tag || `a26-${Date.now()}`);
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      renotify: true,
      data: { url },
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      vibrate: [120, 60, 120],
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.postMessage({ type: "ALERT_CLICK", url: target });
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    }),
  );
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "a26-desk-check") return;
  event.waitUntil(checkFeedAndNotify());
});

self.addEventListener("push", (event) => {
  let payload = { title: "ADMISSION//26", body: "Desk update", url: "/", tag: "a26-push" };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch {
    /* keep defaults */
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      tag: payload.tag,
      renotify: true,
      data: { url: payload.url || "/" },
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    }),
  );
});

async function checkFeedAndNotify() {
  try {
    const res = await fetch(`/alerts-feed.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return;
    const feed = await res.json();
    const key = "a26-sw-seen";
    const raw = await idbGet(key);
    const seen = raw ? JSON.parse(raw) : { news: [], regs: [] };
    const newsIds = (feed.news || []).map((n) => n.id);
    const newNews = (feed.news || []).filter((n) => !seen.news.includes(n.id));
    const regIds = (feed.registrations || []).map((r) => r.id);
    const newRegs = (feed.registrations || []).filter((r) => !seen.regs.includes(r.id));

    for (const n of newNews.slice(0, 9)) {
      await self.registration.showNotification(`NEW NEWS · ${n.heat || "DESK"}`, {
        body: n.headline,
        tag: `news-${n.id}`,
        renotify: true,
        data: { url: n.url || "/newswire" },
        icon: "/icons/icon-192.png",
      });
    }
    for (const r of newRegs.slice(0, 3)) {
      await self.registration.showNotification(r.title, {
        body: r.body,
        tag: `reg-${r.id}`,
        renotify: true,
        data: { url: r.url || "/circulars" },
        icon: "/icons/icon-192.png",
      });
    }

    await idbSet(
      key,
      JSON.stringify({
        news: Array.from(new Set([...seen.news, ...newsIds])).slice(-40),
        regs: Array.from(new Set([...seen.regs, ...regIds])).slice(-40),
      }),
    );
  } catch {
    /* offline / private mode */
  }
}

function idbGet(key) {
  return new Promise((resolve) => {
    const open = indexedDB.open("a26-desk-alerts", 1);
    open.onupgradeneeded = () => open.result.createObjectStore("kv");
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction("kv", "readonly");
      const req = tx.objectStore("kv").get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    };
    open.onerror = () => resolve(null);
  });
}

function idbSet(key, value) {
  return new Promise((resolve) => {
    const open = indexedDB.open("a26-desk-alerts", 1);
    open.onupgradeneeded = () => open.result.createObjectStore("kv");
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    };
    open.onerror = () => resolve();
  });
}
