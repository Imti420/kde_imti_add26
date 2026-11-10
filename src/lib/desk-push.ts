import { SPICE_CARDS } from "@/data/desk-spice";
import { seedCirculars } from "@/data/circulars";
import { seedUniversities } from "@/data/universities";
import { todayISO } from "@/lib/dates";

const ENABLED_KEY = "a26-desk-push";
const SEEN_NEWS_KEY = "a26-seen-news";
const SEEN_REG_KEY = "a26-seen-regs";
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
  // Seed news/circular baselines so enable is not a spam dump of the whole archive —
  // BUT do NOT seed today's frantic day-of stacks (those must still fire).
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
    localStorage.setItem(key, JSON.stringify(ids.slice(-80)));
  } catch {
    /* private mode */
  }
}

function seedSeenBaseline() {
  writeList(
    SEEN_NEWS_KEY,
    SPICE_CARDS.map((c) => c.id),
  );
  // Do NOT mark live registration windows as seen — user should still get day-of noise
  writeList(
    SEEN_CIRC_KEY,
    seedCirculars.filter((c) => c.pdfUrl).map((c) => c.id),
  );
}

function uniName(id: string): string {
  return seedUniversities.find((u) => u.id === id)?.shortName ?? id.toUpperCase();
}

function screamName(short: string): string {
  // KUET → KUEEEET, DU → DUUU, BUET → BUEEET
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
  const base = `frantic-${input.circId}-${input.kind}`;
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
  // live window (opened earlier, still open) — lighter stack
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

/** Important calendar moments for today across all circulars on file. */
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
      // still live — one soft stack per day
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

    const examDays = [
      c.examDate,
      ...c.units.map((u) => u.examDate),
    ].filter((d): d is string => Boolean(d));
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

  // Prefer open/close/exam over soft "live" noise — cap live reminders
  const hard = moments.filter((m) => m.kind !== "live");
  const live = moments.filter((m) => m.kind === "live").slice(0, 2);
  return [...hard, ...live];
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
    // small stagger so the OS shows a stack instead of eating siblings
    await new Promise((r) => setTimeout(r, 350));
    return;
  }

  try {
    new Notification(input.title, {
      body: input.body,
      tag: input.tag,
      icon: "/icons/icon-192.png",
    });
    await new Promise((r) => setTimeout(r, 350));
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
      body: "News, circulars, and FRANTIC day-of reminders (open / close / exam) are armed on this device.",
      url: "/settings",
      tag: "a26-welcome",
    });
  }

  const today = todayISO();
  const seenNews = new Set(readList(SEEN_NEWS_KEY));
  const seenCirc = new Set(readList(SEEN_CIRC_KEY));
  const seenFrantic = new Set(readList(SEEN_FRANTIC_KEY));

  // 1) New desk news
  const freshNews = SPICE_CARDS.filter((c) => !seenNews.has(c.id));
  for (const card of freshNews.slice(0, 9)) {
    await showAlert({
      title: `NEW NEWS · ${card.heat}`,
      body: card.headline,
      url: "/newswire",
      tag: `news-${card.id}`,
    });
    seenNews.add(card.id);
  }
  writeList(SEEN_NEWS_KEY, [...seenNews]);

  // 2) New circular PDFs
  const freshCirc = seedCirculars.filter((c) => c.pdfUrl && !seenCirc.has(c.id));
  for (const circ of freshCirc.slice(0, 9)) {
    const name = uniName(circ.universityId);
    await showAlert({
      title: `NEW CIRCULAR · ${name}`,
      body: `${circ.title} — PDF/portal on file.`,
      url: `/circulars/${circ.id}`,
      tag: `circ-${circ.id}`,
    });
    seenCirc.add(circ.id);
  }
  writeList(SEEN_CIRC_KEY, [...seenCirc]);

  // 3) FRANTIC day-of stacks (open / close / exam / admit / result)
  //    Fire once per moment key per device per day — 4–5 pings each.
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

/** Dev/helper: clear frantic keys so today's stack can re-fire after testing. */
export function resetFranticSeen() {
  writeList(SEEN_FRANTIC_KEY, []);
  writeList(SEEN_REG_KEY, []);
}
