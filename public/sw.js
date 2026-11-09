/* ADMISSION//26 desk service worker — local alerts for installed shortcuts / PWA */
const CACHE = "a26-desk-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["/", "/alerts-feed.json"]).catch(() => undefined)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

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

/** Background peek at the desk feed when the OS allows it */
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

    for (const n of newNews.slice(0, 3)) {
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
