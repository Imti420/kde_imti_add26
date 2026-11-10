import { SPICE_CARDS } from "@/data/desk-spice";
import { seedCirculars } from "@/data/circulars";
import { seedUniversities } from "@/data/universities";
import { todayISO } from "@/lib/dates";

const ENABLED_KEY = "a26-desk-push";
const SEEN_NEWS_KEY = "a26-seen-news";
const SEEN_CIRC_KEY = "a26-seen-circs";
const SEEN_FRANTIC_KEY = "a26-seen-frantic";
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
    try {
      await reg.update();
    } catch {
      /* ignore */
    }
    const anyReg = reg as ServiceWorkerRegistration & {
      periodicSync?: { register: (tag: string, opts: { minInterval: number }) => Promise<void> };
    };
    if (anyReg.periodicSync) {
      try {
        await anyReg.periodicSync.register("a26-desk-check", { minInterval: 30 * 60 * 1000 });
      } catch {
        /* not granted */
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
  seedSeenBaseline();
  // Clear frantic so today's open days fire immediately after enable
  resetFranticSeen();
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
    localStorage.setItem(key, JSON.stringify(ids.slice(-120)));
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
    SEEN_CIRC_KEY,
    seedCirculars.filter((c) => c.pdfUrl).map((c) => c.id),
  );
}

function uniName(id: string): string {
  return seedUniversities.find((u) => u.id === id)?.shortName ?? id.toUpperCase();
}

function screamName(short: string): string {
  if (short.length <= 2) return short + short[short.length - 1].repeat(3);
  const core = short.slice(0, -1);
  const last = short.slice(-1);
  return core + last.repeat(3);
}

type FranticKind = "open" | "close" | "exam" | "admit" | "result" | "live";

function buildFranticStack(input: {
  name: string;
  kind: FranticKind;
  circId: string;
  detail: string;
  url: string;
}): { title: string; body: string; tag: string; url: string }[] {
  const yell = screamName(input.name);
  const base = `frantic-${input.circId}-${input.kind}-${Date.now()}`;
  if (input.kind === "open") {
    return [
      {
        tag: `${base}-1`,
        title: `${yell} ADMISSION REGISTRATION AHHHHHHHH>>>>!!!!!!`,
        body: `${input.name} forms are OPEN TODAY. ${input.detail} Stop scrolling. Open the portal.`,
        url: input.url,
      },
      {
        tag: `${base}-2`,
        title: `WAKE UP · ${input.name} REG IS LIVE`,
        body: `Not a drill. Application window started. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-3`,
        title: `HURRYY UPP 🏃 ${input.name}`,
        body: `Your friends already opened the form. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-4`,
        title: `STILL NOT APPLIED TO ${input.name}???`,
        body: `Desk is screaming on purpose. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-5`,
        title: `LAST CALL (FOR TODAY'S OPEN) · ${input.name}`,
        body: `Registration day energy. Bookmark the portal. ${input.detail}`,
        url: input.url,
      },
    ];
  }
  if (input.kind === "close") {
    return [
      {
        tag: `${base}-1`,
        title: `${yell} CLOSES TODAY AHHHHHHHH>>>>!!!!!!`,
        body: `Application window dies TODAY. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-2`,
        title: `FINAL HOURS · ${input.name}`,
        body: `If the form is empty, that is a skill issue. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-3`,
        title: `SUBMIT · ${input.name} · NOW`,
        body: `Close day. No heroics after midnight. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-4`,
        title: `${input.name} GATE IS SHUTTING`,
        body: `This is the annoying reminder you asked for. ${input.detail}`,
        url: input.url,
      },
    ];
  }
  if (input.kind === "exam") {
    return [
      {
        tag: `${base}-1`,
        title: `${yell} EXAM DAY AHHHHHHHH>>>>!!!!!!`,
        body: `Test is TODAY. ${input.detail} Admit card. Pencil. Go.`,
        url: input.url,
      },
      {
        tag: `${base}-2`,
        title: `EXAM MORNING · ${input.name}`,
        body: `Leave early. Traffic does not care about your rank. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-3`,
        title: `CENTER · TIME · ID · ${input.name}`,
        body: `Check admit card twice. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-4`,
        title: `YOU GOT THIS · ${input.name}`,
        body: `Desk noise, then silence in the hall. ${input.detail}`,
        url: input.url,
      },
    ];
  }
  if (input.kind === "admit") {
    return [
      {
        tag: `${base}-1`,
        title: `${input.name} ADMIT CARD DAY`,
        body: `Download before the site melts. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-2`,
        title: `PRINT / SAVE · ${input.name}`,
        body: `Screenshot + PDF. Phone battery is not a plan. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-3`,
        title: `ADMIT CARD · DON'T FORGET`,
        body: `${input.detail}`,
        url: input.url,
      },
    ];
  }
  if (input.kind === "result") {
    return [
      {
        tag: `${base}-1`,
        title: `${yell} RESULT DAY????`,
        body: `Refresh responsibly. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-2`,
        title: `RESULTS · ${input.name}`,
        body: `Portal may lag. Keep trying. ${input.detail}`,
        url: input.url,
      },
      {
        tag: `${base}-3`,
        title: `CHECK THE LIST · ${input.name}`,
        body: `${input.detail}`,
        url: input.url,
      },
    ];
  }
  return [
    {
      tag: `${base}-1`,
      title: `${input.name} APPLICATION STILL OPEN`,
      body: `Window is live. ${input.detail}`,
      url: input.url,
    },
    {
      tag: `${base}-2`,
      title: `DON'T GHOST ${input.name}`,
      body: `Forms don't fill themselves. ${input.detail}`,
      url: input.url,
    },
  ];
}

export function franticMomentsForToday(today: string) {
  const moments: {
    key: string;
    kind: FranticKind;
    name: string;
    circId: string;
    detail: string;
    url: string;
  }[] = [];

  for (const c of seedCirculars) {
    const name = uniName(c.universityId);
    const url = `/circulars/${c.id}`;
    const closeBit = c.applicationCloses ? `Closes ${c.applicationCloses}` : "Check portal for close date";

    if (c.applicationOpens === today) {
      moments.push({
        key: `open-${c.id}-${today}`,
        kind: "open",
        name,
        circId: c.id,
        detail: `${closeBit}. Portal on the circular page.`,
        url,
      });
    } else if (
      c.applicationOpens &&
      c.applicationOpens < today &&
      (!c.applicationCloses || c.applicationCloses >= today)
    ) {
      moments.push({
        key: `live-${c.id}-${today}`,
        kind: "live",
        name,
        circId: c.id,
        detail: `${closeBit}.`,
        url,
      });
    }

    if (c.applicationCloses === today) {
      moments.push({
        key: `close-${c.id}-${today}`,
        kind: "close",
        name,
        circId: c.id,
        detail: c.closesAt ? `Deadline around ${c.closesAt}.` : "Deadline is today.",
        url,
      });
    }

    const examDays = [c.examDate, ...c.units.map((u) => u.examDate)].filter((d): d is string => Boolean(d));
    if (examDays.includes(today)) {
      moments.push({
        key: `exam-${c.id}-${today}`,
        kind: "exam",
        name,
        circId: c.id,
        detail: c.examTime ? `Time window ${c.examTime}.` : "See admit card for exact time.",
        url,
      });
    }

    if (c.admitCardOn === today) {
      moments.push({
        key: `admit-${c.id}-${today}`,
        kind: "admit",
        name,
        circId: c.id,
        detail: "Admit card window on file for today.",
        url,
      });
    }

    if (c.resultOn === today) {
      moments.push({
        key: `result-${c.id}-${today}`,
        kind: "result",
        name,
        circId: c.id,
        detail: "Result date on circular.",
        url,
      });
    }
  }

  const hard = moments.filter((m) => m.kind !== "live");
  const live = moments.filter((m) => m.kind === "live").slice(0, 2);
  return [...hard, ...live];
}

/**
 * Reliable notification path:
 * 1) ServiceWorkerRegistration.showNotification (works from page when granted)
 * 2) Fallback new Notification()
 * Never depend only on postMessage to a non-controlling worker.
 */
async function showAlert(input: { title: string; body: string; url: string; tag: string }) {
  if (!pushSupported() || Notification.permission !== "granted") {
    return { ok: false, reason: "permission" as const };
  }

  const opts: NotificationOptions = {
    body: input.body,
    tag: input.tag,
    renotify: true,
    data: { url: input.url },
    // icon optional — missing icon must not block Windows toasts
  };

  try {
    const reg = (await navigator.serviceWorker.getRegistration()) ?? (await registerDeskWorker());
    if (reg) {
      await reg.showNotification(input.title, opts);
      await new Promise((r) => setTimeout(r, 400));
      return { ok: true, reason: "sw" as const };
    }
  } catch {
    /* fall through */
  }

  try {
    const n = new Notification(input.title, opts);
    // keep reference briefly
    void n;
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, reason: "page" as const };
  } catch {
    return { ok: false, reason: "throw" as const };
  }
}

export async function runDeskAlertPass(opts?: { forceWelcome?: boolean }) {
  if (!isPushEnabled() || !pushSupported() || Notification.permission !== "granted") return;

  await registerDeskWorker();

  if (opts?.forceWelcome) {
    await showAlert({
      title: "ADMISSION//26 alerts ON",
      body: "News, circulars, and FRANTIC day-of reminders are armed. Use SCREAM NOW in Settings if the tray is quiet.",
      url: "/settings",
      tag: `a26-welcome-${Date.now()}`,
    });
  }

  const today = todayISO();
  const seenNews = new Set(readList(SEEN_NEWS_KEY));
  const seenCirc = new Set(readList(SEEN_CIRC_KEY));
  const seenFrantic = new Set(readList(SEEN_FRANTIC_KEY));

  const freshNews = SPICE_CARDS.filter((c) => !seenNews.has(c.id));
  for (const card of freshNews.slice(0, 9)) {
    await showAlert({
      title: `NEW NEWS · ${card.heat}`,
      body: card.headline,
      url: "/newswire",
      tag: `news-${card.id}-${Date.now()}`,
    });
    seenNews.add(card.id);
  }
  writeList(SEEN_NEWS_KEY, [...seenNews]);

  const freshCirc = seedCirculars.filter((c) => c.pdfUrl && !seenCirc.has(c.id));
  for (const circ of freshCirc.slice(0, 9)) {
    const name = uniName(circ.universityId);
    await showAlert({
      title: `NEW CIRCULAR · ${name}`,
      body: `${circ.title} — PDF/portal on file.`,
      url: `/circulars/${circ.id}`,
      tag: `circ-${circ.id}-${Date.now()}`,
    });
    seenCirc.add(circ.id);
  }
  writeList(SEEN_CIRC_KEY, [...seenCirc]);

  const moments = franticMomentsForToday(today);
  for (const moment of moments) {
    if (seenFrantic.has(moment.key)) continue;
    const stack = buildFranticStack({
      name: moment.name,
      kind: moment.kind,
      circId: moment.circId,
      detail: moment.detail,
      url: moment.url,
    });
    for (const ping of stack) {
      await showAlert(ping);
    }
    seenFrantic.add(moment.key);
  }
  writeList(SEEN_FRANTIC_KEY, [...seenFrantic]);
}

/** Manual panic button — clears day keys and fires today's frantic stacks + a KUET guarantee if open. */
export async function screamNow(): Promise<{ fired: number; today: string; moments: string[]; errors: string[] }> {
  if (!pushSupported()) return { fired: 0, today: todayISO(), moments: [], errors: ["unsupported"] };
  if (Notification.permission !== "granted") {
    return { fired: 0, today: todayISO(), moments: [], errors: ["permission not granted"] };
  }

  setPushEnabled(true);
  await registerDeskWorker();
  resetFranticSeen();

  const today = todayISO();
  let moments = franticMomentsForToday(today);

  // Guarantee KUET open stack on 2026-11-10 even if data drifted
  if (today === "2026-11-10" && !moments.some((m) => m.circId === "c-kuet" && m.kind === "open")) {
    moments = [
      {
        key: `open-c-kuet-${today}`,
        kind: "open",
        name: "KUET",
        circId: "c-kuet",
        detail: "Closes 2026-12-10. Portal admission.kuet.ac.bd",
        url: "/circulars/c-kuet",
      },
      ...moments,
    ];
  }

  // Always fire at least one test if nothing on calendar
  if (!moments.length) {
    const r = await showAlert({
      title: "KUEEEET ADMISSION REGISTRATION AHHHHHHHH>>>>!!!!!!",
      body: `Desk test ping · device date ${today}. If you see this, OS notifications work.`,
      url: "/circulars/c-kuet",
      tag: `test-kuet-${Date.now()}`,
    });
    return {
      fired: r.ok ? 1 : 0,
      today,
      moments: ["test"],
      errors: r.ok ? [] : [r.reason],
    };
  }

  let fired = 0;
  const errors: string[] = [];
  const seenFrantic = new Set<string>();

  for (const moment of moments.filter((m) => m.kind === "open" || m.kind === "close" || m.kind === "exam").slice(0, 3)) {
    const stack = buildFranticStack({
      name: moment.name,
      kind: moment.kind,
      circId: moment.circId,
      detail: moment.detail,
      url: moment.url,
    });
    for (const ping of stack) {
      const r = await showAlert(ping);
      if (r.ok) fired += 1;
      else errors.push(r.reason);
    }
    seenFrantic.add(moment.key);
  }
  writeList(SEEN_FRANTIC_KEY, [...seenFrantic]);

  return {
    fired,
    today,
    moments: moments.map((m) => `${m.kind}:${m.name}`),
    errors,
  };
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

export function resetFranticSeen() {
  writeList(SEEN_FRANTIC_KEY, []);
}
