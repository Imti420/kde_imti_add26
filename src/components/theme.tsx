import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "a26-theme";

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

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

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#171513" : "#141414");
}

export function ThemeBoot() {
  useEffect(() => {
    applyTheme(resolveDark());
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
