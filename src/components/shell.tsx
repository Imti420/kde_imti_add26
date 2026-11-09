import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { NoticeBell } from "@/components/notifications";
import { DeskPushBoot } from "@/components/desk-push-boot";
import { IntroSequence } from "@/components/intro";
import { Signature } from "@/components/signature";
import { ChromeToggles, NaughtyBadge } from "@/components/theme";
import { useLang, useT } from "@/lib/i18n";
import { useCatalog } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { isMonitorStale } from "@/lib/verify-engine";
import { usePublishedReport } from "@/lib/published-report";
import { usePersonal } from "@/lib/store";

const NAV = [
  { href: "/", key: "nav.overview" },
  { href: "/newswire", key: "nav.newswire" },
  { href: "/desk", key: "nav.desk" },
  { href: "/calendar", key: "nav.calendar" },
  { href: "/universities", key: "nav.universities" },
  { href: "/circulars", key: "nav.circulars" },
  { href: "/radar", key: "nav.radar" },
  { href: "/monitor", key: "nav.monitor" },
  { href: "/discovery", key: "nav.discovery" },
  { href: "/shortlist", key: "nav.shortlist" },
  { href: "/tracker", key: "nav.tracker" },
  { href: "/settings", key: "nav.settings" },
] as const;

const DOCK = [
  { href: "/", en: "Home", bn: "হোম" },
  { href: "/newswire", en: "Wire", bn: "খবর" },
  { href: "/calendar", en: "Dates", bn: "তারিখ" },
  { href: "/universities", en: "Unis", bn: "বিশ্ব" },
] as const;

function active(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const t = useT();
  const { lang } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const shortlist = usePersonal((s) => s.shortlist.length);
  const review = usePublishedReport((s) => s.report?.summary.reviewRequired ?? 0);
  const phase = usePublishedReport((s) => s.phase);
  const generatedAt = usePublishedReport((s) => s.report?.generatedAt ?? null);
  const loadReport = usePublishedReport((s) => s.load);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { universities, circulars } = useCatalog();

  useEffect(() => {
    void Promise.resolve(usePersonal.persist.rehydrate()).finally(() => {
      usePersonal.getState().setHydrated(true);
    });
    void loadReport();
  }, [loadReport]);

  useEffect(() => {
    setMenu(false);
    setSearchOpen(false);
    setQuery("");
  }, [path]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((event.key === "/" && !typing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        inputRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return { universities: [], circulars: [] };
    return {
      universities: universities
        .filter((uni) =>
          [uni.name, uni.shortName, uni.nameBn, uni.city, uni.id].join(" ").toLowerCase().includes(q),
        )
        .slice(0, 6),
      circulars: circulars
        .filter((item) => item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q))
        .slice(0, 6),
    };
  }, [query, universities, circulars]);

  const go = (to: string) => {
    setSearchOpen(false);
    setQuery("");
    void navigate({ to: to as never });
  };

  const openSearch = () => {
    setSearchOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };

  const docked = DOCK.some((item) => active(path, item.href));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DeskPushBoot />
      <IntroSequence />
      <div className="md:grid md:grid-cols-[272px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r-[3px] border-ink bg-rail text-railfg md:flex">
          <Brand />
          <Nav path={path} shortlist={shortlist} review={review} />
          <div className="mt-auto border-t border-railfg/25">
            <p className="px-4 pt-4 font-mono text-xs leading-relaxed text-railfg/70">
              {t("chrome.session")}
              <br />
              {t("chrome.localDesk")}
              <br />
              {t("chrome.notPortal")}
            </p>
            <Signature variant="rail" />
          </div>
        </aside>

        <div className="min-w-0 pb-[calc(4.6rem+env(safe-area-inset-bottom))] md:pb-0">
          <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3 py-2 md:hidden">
              {searchOpen ? (
                <div className="relative min-w-0 flex-1">
                  <SearchBox
                    inputRef={inputRef}
                    query={query}
                    setQuery={setQuery}
                    setSearchOpen={setSearchOpen}
                    results={results}
                    go={go}
                    t={t}
                    phone
                  />
                </div>
              ) : (
                <Link to="/" className="font-display text-[2rem] font-bold uppercase leading-none tracking-tight">
                  A<span className="text-accent">//</span>26
                </Link>
              )}
              {searchOpen ? (
                <button type="button" className="press h-11 w-11 shrink-0 px-0" onClick={() => setSearchOpen(false)} aria-label={t("chrome.close")}>
                  <X className="size-4" aria-hidden />
                </button>
              ) : (
                <div className="ml-auto flex items-center gap-1.5">
                  <button type="button" className="press h-11 w-11 px-0" onClick={openSearch} aria-label={t("chrome.searchLabel")}>
                    <Search className="size-4" aria-hidden />
                  </button>
                  <ChromeToggles />
                  <NoticeBell compact />
                </div>
              )}
            </div>

            <div className="hidden items-center gap-3 px-6 py-3 md:flex">
              <div className="relative min-w-0 flex-1">
                <SearchBox
                  inputRef={inputRef}
                  query={query}
                  setQuery={setQuery}
                  setSearchOpen={setSearchOpen}
                  results={results}
                  go={go}
                  t={t}
                />
              </div>
              <ChromeToggles />
              <NaughtyBadge />
              <NoticeBell />
              <p className="hidden font-mono text-xs tracking-widest text-mute xl:block">{t("chrome.session")}</p>
            </div>
          </header>
          {phase !== "loading" && (phase !== "ready" || isMonitorStale(generatedAt)) ? (
            <div className="border-b-[3px] border-accent bg-panel px-4 py-2 md:px-6">
              <p className="font-mono text-xs tracking-widest text-accent">
                {phase === "ready" ? t("chrome.stale") : t("chrome.noReport")}
                {" · "}
                <Link to="/monitor" className="underline underline-offset-4">
                  {t("chrome.openMonitor")}
                </Link>
              </p>
            </div>
          ) : null}
          <main className="px-3 py-5 md:px-6 md:py-8">
            <div key={path} className="page-enter">
              {children}
            </div>
          </main>
          <footer className="border-t-[3px] border-ink px-4 py-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <p className="max-w-3xl font-mono text-xs leading-relaxed text-mute">{t("chrome.footer")}</p>
              <Signature variant="colophon" />
            </div>
          </footer>
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t-[3px] border-ink bg-paper md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Primary"
      >
        {DOCK.map((item) => {
          const on = active(path, item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 font-display text-[0.95rem] font-bold uppercase leading-none tracking-wide",
                on ? "bg-yellow text-onyellow" : "text-ink",
              )}
            >
              <span className={cn("h-1 w-5 rounded-full", on ? "bg-accent" : "bg-transparent")} aria-hidden />
              {lang === "bn" ? item.bn : item.en}
            </Link>
          );
        })}
        <button
          type="button"
          className={cn(
            "flex min-h-14 flex-col items-center justify-center gap-0.5 font-display text-[0.95rem] font-bold uppercase leading-none tracking-wide",
            !docked || menu ? "bg-ink text-paper" : "text-ink",
          )}
          onClick={() => setMenu(true)}
        >
          <span className={cn("h-1 w-5 rounded-full", menu ? "bg-accent" : "bg-transparent")} aria-hidden />
          {lang === "bn" ? "আরও" : "More"}
        </button>
      </nav>

      {menu ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-rail text-railfg md:hidden">
          <div className="flex items-center justify-between border-b border-railfg/25 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <Brand compact />
            <button type="button" className="press press-ink" onClick={() => setMenu(false)}>
              {t("chrome.close")}
            </button>
          </div>
          <Nav path={path} shortlist={shortlist} review={review} onNavigate={() => setMenu(false)} />
          <div className="border-t border-railfg/25 px-4 py-3">
            <NaughtyBadge />
          </div>
          <Signature variant="rail" />
        </div>
      ) : null}
    </div>
  );
}

function SearchBox({
  inputRef,
  query,
  setQuery,
  setSearchOpen,
  results,
  go,
  t,
  phone = false,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (value: string) => void;
  setSearchOpen: (value: boolean) => void;
  results: {
    universities: { id: string; shortName: string; name: string }[];
    circulars: { id: string; title: string }[];
  };
  go: (to: string) => void;
  t: (key: string) => string;
  phone?: boolean;
}) {
  return (
    <>
      <label className="sr-only" htmlFor={phone ? "archive-search-phone" : "archive-search"}>
        {t("chrome.searchLabel")}
      </label>
      <input
        id={phone ? "archive-search-phone" : "archive-search"}
        ref={inputRef}
        value={query}
        placeholder={t("chrome.search")}
        suppressHydrationWarning
        enterKeyHint="search"
        className={cn(
          "w-full rounded-xl border-[3px] border-ink bg-paper px-3 font-mono uppercase tracking-widest text-ink outline-none placeholder:text-mute focus:bg-panel",
          phone ? "h-11 text-base" : "h-11 text-xs",
        )}
        onChange={(event) => {
          setQuery(event.target.value);
          setSearchOpen(true);
        }}
        onFocus={() => setSearchOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const uni = results.universities[0];
            const circular = results.circulars[0];
            if (uni) go(`/universities/${uni.id}`);
            else if (circular) go(`/circulars/${circular.id}`);
          }
        }}
      />
      {query.trim() ? (
        <div className="absolute top-full right-0 left-0 z-40 mt-2 max-h-[60vh] overflow-auto rounded-2xl border-[3px] border-ink bg-paper shadow-[6px_6px_0_0_var(--color-accent)]">
          {results.universities.length + results.circulars.length === 0 ? (
            <p className="px-3 py-4 font-mono text-xs text-mute">{t("chrome.noMatch")}</p>
          ) : null}
          {results.universities.length ? (
            <p className="border-b border-ink px-3 py-2 font-mono text-xs tracking-widest text-mute">{t("chrome.universities")}</p>
          ) : null}
          {results.universities.map((uni) => (
            <button
              key={uni.id}
              type="button"
              className="flex min-h-12 w-full items-baseline gap-3 border-b border-ink px-3 py-3 text-left active:bg-yellow"
              onClick={() => go(`/universities/${uni.id}`)}
            >
              <span className="font-display text-2xl font-bold uppercase">{uni.shortName}</span>
              <span className="truncate text-sm">{uni.name}</span>
            </button>
          ))}
          {results.circulars.length ? (
            <p className="border-b border-ink px-3 py-2 font-mono text-xs tracking-widest text-mute">{t("chrome.circulars")}</p>
          ) : null}
          {results.circulars.map((item) => (
            <button
              key={item.id}
              type="button"
              className="block min-h-12 w-full border-b border-ink px-3 py-3 text-left text-sm active:bg-yellow"
              onClick={() => go(`/circulars/${item.id}`)}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  const t = useT();
  return (
    <Link to="/" className={cn("block px-4 py-5", compact && "px-0 py-0")}>
      <span className="font-display text-5xl font-bold uppercase leading-none tracking-tight">
        A<span className="text-accent">//</span>26
      </span>
      <span className="mt-1 block font-mono text-xs tracking-widest text-railfg/70">{t("chrome.archive")}</span>
    </Link>
  );
}

function Nav({
  path,
  shortlist,
  review,
  onNavigate,
}: {
  path: string;
  shortlist: number;
  review: number;
  onNavigate?: () => void;
}) {
  const t = useT();
  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 py-2">
      {NAV.map((item) => {
        const on = active(path, item.href);
        const count = item.href === "/shortlist" ? shortlist : item.href === "/monitor" ? review : 0;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            aria-current={on ? "page" : undefined}
            className={cn(
              "flex min-h-12 items-center justify-between gap-3 rounded-xl border-[3px] px-3 py-2 font-display text-lg font-semibold uppercase leading-none tracking-wide",
              on
                ? "border-ink bg-yellow text-onyellow shadow-[3px_3px_0_0_var(--color-accent)]"
                : "border-transparent text-railfg active:bg-railfg/10",
            )}
          >
            {t(item.key)}
            {count > 0 ? <span className="font-mono text-xs">{String(count).padStart(2, "0")}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
