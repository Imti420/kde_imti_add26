import { Heart, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "a26-theme";
const NAUGHTY_KEY = "a26-naughty";

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";var n=localStorage.getItem("${NAUGHTY_KEY}")==="1";document.documentElement.classList.toggle("naughty",n);}catch(e){}})();`;

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
    return localStorage.getItem(NAUGHTY_KEY) === "1";
  } catch {
    return false;
  }
}

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const naughty = document.documentElement.classList.contains("naughty");
    if (naughty) meta.setAttribute("content", dark ? "#2a0f1a" : "#ff4d8d");
    else meta.setAttribute("content", dark ? "#171513" : "#141414");
  }
}

export function applyNaughty(on: boolean) {
  document.documentElement.classList.toggle("naughty", on);
  try {
    localStorage.setItem(NAUGHTY_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
  // Refresh theme-color to match the new accent mood
  applyTheme(document.documentElement.classList.contains("dark"));
}

export function ThemeBoot() {
  useEffect(() => {
    applyTheme(resolveDark());
    applyNaughty(resolveNaughty());
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
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      <span className="hidden sm:inline">{dark ? "Day" : "Night"}</span>
    </button>
  );
}

/** Tiny pulse badge that only shows when Naughty mode is on. */
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
      className="naughty-badge inline-flex items-center gap-1 rounded-full border-[2px] border-ink bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-onaccent"
      title="Naughty mode is on. Settings → bottom to turn off."
      aria-label="Naughty mode active"
    >
      <Heart className="size-3 fill-current" aria-hidden />
      Horny
    </span>
  );
}
