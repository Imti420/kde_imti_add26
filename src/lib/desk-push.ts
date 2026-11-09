import { SPICE_CARDS } from "@/data/desk-spice";
import { seedCirculars } from "@/data/circulars";
import { seedUniversities } from "@/data/universities";
import { todayISO } from "@/lib/dates";

const ENABLED_KEY = "a26-desk-push";
const SEEN_NEWS_KEY = "a26-seen-news";
const SEEN_REG_KEY = "a26-seen-regs";
const PROMPTED_KEY = "a26-push-prompted";

export type PushPermission = NotificationPermission | "unsupported";

export function pushSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
}

export function isPushEnabled(): boolean {
  try {
    return localStorage.getItem(ENABLED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPushEnabled(on: boolean) {
  try {
    localStorage.setItem(ENABLED_KEY, on ? "1" : "0");
  } catch {
    /* private mode */
  }
}

export function getPushPermission(): PushPermission {
  if (!pushSupported()) return "unsupported";
  return Notification.permission;
}

export async function registerDeskWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!pushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    await navigator.serviceWorker.ready;
    // Best-effort periodic background check (Chrome installed PWA)
    const anyReg = reg as ServiceWorkerRegistration & {
      periodicSync?: { register: (tag: string, opts: { minInterval: number }) => Promise<void> };
    };
    if (anyReg.periodicSync) {
      try {
        await anyReg.periodicSync.register("a26-desk-check", { minInterval: 60 * 60 * 1000 });
      } catch {
        /* not granted / unsupported */
      }
    }
    return reg;
  } catch {
    return null;
  }
}

export async function enableDeskPush(): Promise<{ ok: boolean; permission: PushPermission }> {
  if (!pushSupported()) return { ok: false, permission: "unsupported" };
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    setPushEnabled(false);
    return { ok: false, permission };
  }
  setPushEnabled(true);
  await registerDeskWorker();
  // Seed seen sets so enabling does not dump the whole archive as "new"
  seedSeenBaseline();
  await runDeskAlertPass({ forceWelcome: true });
  return { ok: true, permission };
}

export function disableDeskPush() {
  setPushEnabled(false);
}

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids.slice(-60)));
  } catch {
    /* private mode */
  }
}

function seedSeenBaseline() {
  writeList(
    SEEN_NEWS_KEY,
    SPICE_CARDS.map((c) => c.id),
  );
  writeList(
    SEEN_REG_KEY,
    openRegistrationAlerts(todayISO()).map((r) => r.id),
  );
}

function uniName(id: string): string {
  return seedUniversities.find((u) => u.id === id)?.shortName ?? id.toUpperCase();
}

export function openRegistrationAlerts(today: string) {
  return seedCirculars
    .filter((c) => c.applicationOpens && c.applicationOpens <= today && (!c.applicationCloses || c.applicationCloses >= today))
    .map((c) => {
      const name = uniName(c.universityId);
      const justOpened = c.applicationOpens === today;
      return {
        id: `reg-${c.id}-${c.applicationOpens}`,
        universityId: c.universityId,
        justOpened,
        title: justOpened
          ? `HEIII ${name} REGISTRATION STARTED — HURRYY UPP`
          : `${name} application window is LIVE`,
        body: justOpened
          ? `${name} forms are open TODAY (${c.applicationOpens}${c.applicationCloses ? ` → ${c.applicationCloses}` : ""}). Do not sleep on this.`
          : `${name} is accepting applications through ${c.applicationCloses ?? "the published close date"}.`,
        url: `/circulars/${c.id}`,
      };
    });
}

async function showAlert(input: { title: string; body: string; url: string; tag: string }) {
  if (!pushSupported() || Notification.permission !== "granted") return;

  const reg = await navigator.serviceWorker.getRegistration();
  if (reg?.active) {
    reg.active.postMessage({
      type: "SHOW_ALERT",
      title: input.title,
      body: input.body,
      url: input.url,
      tag: input.tag,
    });
    return;
  }

  // Fallback when SW is not controlling yet
  try {
    new Notification(input.title, {
      body: input.body,
      tag: input.tag,
      icon: "/icons/icon-192.png",
    });
  } catch {
    /* ignore */
  }
}

export async function runDeskAlertPass(opts?: { forceWelcome?: boolean }) {
  if (!isPushEnabled() || !pushSupported() || Notification.permission !== "granted") return;

  await registerDeskWorker();

  if (opts?.forceWelcome) {
    await showAlert({
      title: "ADMISSION//26 alerts ON",
      body: "You will get NEW NEWS headlines and registration-open pings on this device.",
      url: "/settings",
      tag: "a26-welcome",
    });
  }

  const today = todayISO();
  const seenNews = new Set(readList(SEEN_NEWS_KEY));
  const seenRegs = new Set(readList(SEEN_REG_KEY));

  const freshNews = SPICE_CARDS.filter((c) => !seenNews.has(c.id));
  for (const card of freshNews.slice(0, 3)) {
    await showAlert({
      title: `NEW NEWS · ${card.heat}`,
      body: card.headline,
      url: "/newswire",
      tag: `news-${card.id}`,
    });
    seenNews.add(card.id);
  }

  const regs = openRegistrationAlerts(today);
  for (const reg of regs) {
    if (seenRegs.has(reg.id)) continue;
    // Only shout the dramatic line when it opens today; still notify once for live windows the first time we see them
    await showAlert({
      title: reg.title,
      body: reg.body,
      url: reg.url,
      tag: reg.id,
    });
    seenRegs.add(reg.id);
  }

  writeList(SEEN_NEWS_KEY, [...seenNews]);
  writeList(SEEN_REG_KEY, [...seenRegs]);
}

export function shouldSoftPrompt(): boolean {
  if (!pushSupported()) return false;
  if (Notification.permission === "granted" || Notification.permission === "denied") return false;
  if (isPushEnabled()) return false;
  try {
    return localStorage.getItem(PROMPTED_KEY) !== "1";
  } catch {
    return false;
  }
}

export function markSoftPrompted() {
  try {
    localStorage.setItem(PROMPTED_KEY, "1");
  } catch {
    /* private mode */
  }
}
