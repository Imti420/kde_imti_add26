import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang, useT } from "@/lib/i18n";

const KEY = "a26-theme";
const NAUGHTY_KEY = "a26-naughty";
const PHILOSOPHER_KEY = "a26-philosopher";

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";var n=localStorage.getItem("${NAUGHTY_KEY}");if(n==="1"||n==="on"||n==="true"){document.documentElement.classList.add("naughty");}var p=localStorage.getItem("${PHILOSOPHER_KEY}");if(p==="1"||p==="on"||p==="true"){document.documentElement.classList.add("philosopher");}}catch(e){}})();`;

function systemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveDark(): boolean {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return systemDark();
  } catch {
    return false;
  }
}

export function resolveNaughty(): boolean {
  try {
    const v = localStorage.getItem(NAUGHTY_KEY);
    return v === "1" || v === "on" || v === "true";
  } catch {
    return false;
  }
}

function syncThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const dark = document.documentElement.classList.contains("dark");
  const philosopher = document.documentElement.classList.contains("philosopher");
  const naughty = document.documentElement.classList.contains("naughty");
  // Philosopher visual priority over Naughty when both are on.
  if (philosopher) meta.setAttribute("content", dark ? "#242722" : "#68745A");
  else if (naughty) meta.setAttribute("content", dark ? "#14030c" : "#ff0066");
  else meta.setAttribute("content", dark ? "#171513" : "#141414");
}

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  syncThemeColor();
}

export function applyNaughty(on: boolean) {
  document.documentElement.classList.toggle("naughty", on);
  try {
    if (on) localStorage.setItem(NAUGHTY_KEY, "1");
    else localStorage.removeItem(NAUGHTY_KEY);
  } catch {
    /* private mode */
  }
  syncThemeColor();
}

export function resolvePhilosopher(): boolean {
  try {
    const v = localStorage.getItem(PHILOSOPHER_KEY);
    return v === "1" || v === "on" || v === "true";
  } catch {
    return false;
  }
}

export function applyPhilosopher(on: boolean) {
  document.documentElement.classList.toggle("philosopher", on);
  try {
    if (on) localStorage.setItem(PHILOSOPHER_KEY, "1");
    else localStorage.removeItem(PHILOSOPHER_KEY);
  } catch {
    /* private mode */
  }
  syncThemeColor();
}

export function ThemeBoot() {
  useEffect(() => {
    applyTheme(resolveDark());
    applyNaughty(resolveNaughty());
    applyPhilosopher(resolvePhilosopher());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem(KEY)) applyTheme(media.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return null;
}

export function ThemeToggle() {
  const t = useT();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    localStorage.setItem(KEY, next ? "dark" : "light");
    applyTheme(next);
    setDark(next);
  };

  return (
    <button
      type="button"
      className="press h-11 px-3"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? t("chrome.themeAriaLight") : t("chrome.themeAriaDark")}
    >
      {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      <span className="hidden sm:inline">{dark ? t("chrome.day") : t("chrome.night")}</span>
    </button>
  );
}


export function LangToggle() {
  const { lang, setLang, t } = useLang();
  const next = lang === "bn" ? "en" : "bn";

  return (
    <button
      type="button"
      className="press h-11 min-w-11 px-3"
      onClick={() => setLang(next)}
      aria-pressed={lang === "bn"}
      aria-label={lang === "bn" ? t("chrome.langAriaEn") : t("chrome.langAriaBn")}
      title={lang === "bn" ? "English" : "বাংলা"}
    >
      <span className="font-display text-sm font-bold tracking-wide">
        {lang === "bn" ? "EN" : "বাংলা"}
      </span>
    </button>
  );
}

/** Language + day/night — keep together so production never tree-shakes the lang control. */
export function ChromeToggles() {
  return (
    <div className="flex items-center gap-2">
      <LangToggle />
      <ThemeToggle />
    </div>
  );
}

/** Creator-only. Renders nothing until naughty is on. */
export function NaughtyBadge() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(document.documentElement.classList.contains("naughty"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  if (!on) return null;

  return (
    <span
      className="naughty-badge inline-flex items-center gap-1 rounded-full border-[3px] border-ink bg-accent px-2.5 py-1 font-display text-xs font-bold uppercase tracking-widest text-onaccent"
      title="Creator mode · this browser only"
      aria-label="Horny mode active"
    >
      <span className="naughty-heart" aria-hidden>
        ♥
      </span>
      <span className="naughty-label">Soaked</span>
    </span>
  );
}

/** Creator-only. Renders nothing until philosopher is on. Quiet desk mark. */
export function PhilosopherBadge() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(document.documentElement.classList.contains("philosopher"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  if (!on) return null;

  return (
    <span
      className="philosopher-badge inline-flex items-center gap-1.5 border border-[var(--color-border,currentColor)] bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink"
      title="Philosopher mode · this browser only"
      aria-label="Philosopher mode active"
    >
      <span aria-hidden>Φ</span>
      <span className="hidden sm:inline">Philosopher</span>
    </span>
  );
}
