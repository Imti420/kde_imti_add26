import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { NoticeBell } from "@/components/notifications";
import { DeskPushBoot } from "@/components/desk-push-boot";
import { IntroSequence } from "@/components/intro";
import { Signature } from "@/components/signature";
import { ChromeToggles, NaughtyBadge, PhilosopherBadge } from "@/components/theme";
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
  const [railCollapsed, setRailCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("a26-rail-collapsed") === "1";
    } catch {
      return false;
    }
  });
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
    try {
      window.localStorage.setItem("a26-rail-collapsed", railCollapsed ? "1" : "0");
    } catch {
      /* ignore quota / private mode */
    }
  }, [railCollapsed]);

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
      <div
        className={cn(
          "md:grid",
          railCollapsed
            ? "md:grid-cols-[52px_minmax(0,1fr)]"
            : "md:grid-cols-[280px_minmax(0,1fr)]",
        )}
      >
        <aside
          className={cn(
            "sticky top-0 hidden h-screen flex-col border-r-[3px] border-ink bg-rail text-railfg md:flex",
            railCollapsed && "items-center",
          )}
        >
          {railCollapsed ? (
            <>
              <Link
                to="/"
                className="flex w-full flex-col items-center gap-1 border-b border-railfg/25 px-1 py-3"
                title="A//26"
              >
                <span className="font-display text-lg font-bold uppercase leading-none tracking-tight">
                  A<span className="text-accent">//</span>
                </span>
                <span className="font-display text-lg font-bold leading-none">26</span>
              </Link>
              <button
                type="button"
                className="mt-2 flex h-10 w-10 items-center justify-center border-[2px] border-railfg/30 text-railfg transition hover:border-railfg/60 hover:bg-railfg/10"
                onClick={() => setRailCollapsed(false)}
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
              <div className="mt-auto mb-3">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border-[2px] border-railfg/30 text-railfg transition hover:border-railfg/60 hover:bg-railfg/10"
                  onClick={() => setRailCollapsed(false)}
                  aria-label="Expand sidebar"
                >
                  <span className="font-mono text-[0.55rem] tracking-widest text-railfg/70">OPEN</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <Brand />
                <button
                  type="button"
                  className="absolute right-2 top-3 flex h-8 w-8 items-center justify-center border-[2px] border-railfg/30 text-railfg transition hover:border-railfg/60 hover:bg-railfg/10"
                  onClick={() => setRailCollapsed(true)}
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
              </div>
              <Nav path={path} shortlist={shortlist} review={review} />
              <div className="mt-auto border-t-[3px] border-railfg/30">
                <p className="px-4 pt-3 font-mono text-[0.65rem] uppercase leading-relaxed tracking-widest text-railfg/65">
                  {t("chrome.session")}
                  <br />
                  {t("chrome.localDesk")}
                  <br />
                  {t("chrome.notPortal")}
                </p>
                <Signature variant="rail" />
              </div>
            </>
          )}
        </aside>

        <div className="min-w-0 pb-[calc(4.6rem+env(safe-area-inset-bottom))] md:pb-0">
          <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur-md">
            <div className="flex items-center gap-1.5 px-2.5 py-2 md:hidden">
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
                <Link
                  to="/"
                  className="shrink-0 font-display text-[1.85rem] font-bold uppercase leading-none tracking-tight"
                >
                  A<span className="text-accent">//</span>26
                </Link>
              )}
              {searchOpen ? (
                <button
                  type="button"
                  className="press h-11 w-11 shrink-0 px-0"
                  onClick={() => setSearchOpen(false)}
                  aria-label={t("chrome.close")}
                >
                  <X className="size-4" aria-hidden />
                </button>
              ) : (
                <div className="ml-auto flex max-w-[62%] items-center justify-end gap-1">
                  <button
                    type="button"
                    className="press h-11 w-11 shrink-0 px-0"
                    onClick={openSearch}
                    aria-label={t("chrome.searchLabel")}
                  >
                    <Search className="size-4" aria-hidden />
                  </button>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <ChromeToggles />
                  </div>
                  <NoticeBell compact />
                </div>
              )}
            </div>

            <div className="hidden items-center gap-3 px-5 py-3 md:flex lg:px-6">
              {railCollapsed ? (
                <button
                  type="button"
                  className="press flex h-10 w-10 shrink-0 items-center justify-center px-0"
                  onClick={() => setRailCollapsed(false)}
                  aria-label="Expand sidebar"
                  title="Expand sidebar"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              ) : null}
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
              <div className="flex shrink-0 items-center gap-2 border-l-[3px] border-ink pl-3">
                <ChromeToggles />
                <NaughtyBadge />
                <PhilosopherBadge />
                <NoticeBell />
              </div>
              <p className="hidden max-w-[9rem] font-mono text-[0.65rem] uppercase leading-snug tracking-widest text-mute xl:block">
                {t("chrome.session")}
              </p>
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
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t-[3px] border-ink bg-paper/98 backdrop-blur-md md:hidden"
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
                "flex min-h-[3.5rem] flex-col items-center justify-center gap-1 border-r border-ink/15 font-display text-[0.8rem] font-bold uppercase leading-none tracking-wide last:border-r-0 sm:text-[0.9rem]",
                on ? "bg-yellow text-onyellow" : "text-ink active:bg-panel",
              )}
            >
              <span className={cn("h-1 w-6 rounded-full", on ? "bg-accent" : "bg-ink/15")} aria-hidden />
              {lang === "bn" ? item.bn : item.en}
            </Link>
          );
        })}
        <button
          type="button"
          className={cn(
            "flex min-h-[3.5rem] flex-col items-center justify-center gap-1 font-display text-[0.8rem] font-bold uppercase leading-none tracking-wide sm:text-[0.9rem]",
            !docked || menu ? "bg-ink text-paper" : "text-ink active:bg-panel",
          )}
          onClick={() => setMenu(true)}
          aria-expanded={menu}
          aria-label={lang === "bn" ? "আরও" : "More"}
        >
          <span className={cn("h-1 w-6 rounded-full", menu || !docked ? "bg-accent" : "bg-ink/15")} aria-hidden />
          {lang === "bn" ? "আরও" : "More"}
        </button>
      </nav>

      {menu ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-rail text-railfg md:hidden">
          <div className="flex items-center justify-between border-b-[3px] border-railfg/30 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <Brand compact />
            <button type="button" className="press press-ink min-h-11 px-4" onClick={() => setMenu(false)}>
              {t("chrome.close")}
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Nav path={path} shortlist={shortlist} review={review} onNavigate={() => setMenu(false)} />
          </div>
          <div className="flex items-center justify-between gap-3 border-t-[3px] border-railfg/30 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <NaughtyBadge />
            <PhilosopherBadge />
            <ChromeToggles />
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
    <Link to="/" className={cn("block border-b border-railfg/25 px-4 py-4", compact && "border-0 px-0 py-0")}>
      <span className="font-display text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl">
        A<span className="text-accent">//</span>26
      </span>
      <span className="mt-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-railfg/65">
        {t("chrome.archive")}
      </span>
    </Link>
  );
}

const NAV_PRIMARY = NAV.slice(0, 6);
const NAV_TOOLS = NAV.slice(6);

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
  const renderItem = (item: (typeof NAV)[number]) => {
    const on = active(path, item.href);
    const count = item.href === "/shortlist" ? shortlist : item.href === "/monitor" ? review : 0;
    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={onNavigate}
        aria-current={on ? "page" : undefined}
        className={cn(
          "flex min-h-11 items-center justify-between gap-3 border-[3px] px-3 py-2 font-display text-base font-semibold uppercase leading-none tracking-wide transition-[transform,box-shadow] duration-150",
          on
            ? "translate-x-0.5 border-ink bg-yellow text-onyellow shadow-[3px_3px_0_0_var(--color-accent)]"
            : "border-transparent text-railfg hover:border-railfg/25 hover:bg-railfg/8 active:bg-railfg/12",
        )}
      >
        <span className="truncate">{t(item.key)}</span>
        {count > 0 ? (
          <span className="shrink-0 border border-current/40 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-widest">
            {String(count).padStart(2, "0")}
          </span>
        ) : null}
      </Link>
    );
  };
  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2 py-3">
      <div className="flex flex-col gap-1">
        <p className="px-3 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-railfg/50">Desk</p>
        {NAV_PRIMARY.map(renderItem)}
      </div>
      <div className="flex flex-col gap-1 border-t border-railfg/20 pt-3">
        <p className="px-3 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-railfg/50">Tools</p>
        {NAV_TOOLS.map(renderItem)}
      </div>
    </nav>
  );
}
