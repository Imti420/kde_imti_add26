import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "bn";

const KEY = "a26-lang";

export const LANG_BOOT = `(function(){try{var l=localStorage.getItem("${KEY}");if(l==="bn"||l==="en"){document.documentElement.lang=l;document.documentElement.classList.toggle("lang-bn",l==="bn");}else{document.documentElement.lang="en";}}catch(e){}})();`;

type Dict = Record<string, string>;

const en: Dict = {
  // nav
  "nav.overview": "Overview",
  "nav.newswire": "Newswire",
  "nav.desk": "My admission desk",
  "nav.calendar": "Calendar",
  "nav.universities": "All universities",
  "nav.circulars": "Circular archive",
  "nav.radar": "Deadline radar",
  "nav.monitor": "Information monitor",
  "nav.discovery": "Discovery log",
  "nav.shortlist": "My shortlist",
  "nav.tracker": "Application tracker",
  "nav.settings": "Settings",
  // chrome
  "chrome.menu": "Menu",
  "chrome.close": "Close",
  "chrome.search": "SEARCH THE ARCHIVE",
  "chrome.searchLabel": "Search the archive",
  "chrome.noMatch": "NO MATCH IN THE DIRECTORY",
  "chrome.universities": "UNIVERSITIES",
  "chrome.circulars": "CIRCULARS",
  "chrome.session": "SESSION 2026–27",
  "chrome.localDesk": "LOCAL DESK",
  "chrome.notPortal": "NOT A UNIVERSITY PORTAL",
  "chrome.archive": "ADMISSION ARCHIVE",
  "chrome.footer":
    "ADMISSION//26 · THE BANGLADESH UNIVERSITY ADMISSION ARCHIVE · LOCAL DESK · VERIFY EVERY DATE AGAINST THE CITED SOURCE · NOT ANNOUNCED MEANS THIS ARCHIVE DOES NOT HAVE IT",
  "chrome.stale":
    "AUTOMATIC VERIFICATION LOOKS STALE — THE LAST PUBLISHED CHECK IS OLDER THAN THE 12-HOUR SCHEDULE",
  "chrome.noReport":
    "NO VERIFICATION REPORT IS PUBLISHED — FAILED OR MISSING CHECKS ARE NOT TREATED AS ALL CLEAR",
  "chrome.openMonitor": "OPEN MONITOR",
  "chrome.day": "Day",
  "chrome.night": "Night",
  "chrome.bangla": "বাংলা",
  "chrome.english": "EN",
  "chrome.langAriaBn": "Switch to Bangla",
  "chrome.langAriaEn": "Switch to English",
  "chrome.themeAriaDark": "Switch to dark mode",
  "chrome.themeAriaLight": "Switch to light mode",
  // calendar
  "cal.kicker": "Planning instrument",
  "cal.title": "Calendar",
  "cal.lede":
    "Deadlines, examinations, openings and admit-card dates from the archive, plus events you add on this desk. A date with a thin confidence stamp has not been treated as final.",
  "cal.export": "Export .ics",
  "cal.today": "Today",
  "cal.month": "month",
  "cal.week": "week",
  "cal.agenda": "agenda",
  "cal.allDates": "All dates",
  "cal.shortlist": "Shortlist",
  "cal.hideDone": "Hide done",
  "cal.deadline": "DEADLINE",
  "cal.exam": "EXAM",
  "cal.opens": "OPENS",
  "cal.admit": "ADMIT",
  "cal.noEvents": "No events",
  "cal.nothing": "Nothing dated in this range.",
  "cal.noEventsDay": "No events on this day. Add one below.",
  "cal.close": "CLOSE",
  "cal.addEvent": "Add personal event",
  "cal.editEvent": "Edit personal event",
  "cal.localOnly": "Local desk only — never overwrites archive events.",
  "cal.restoring": "RESTORING THIS DESK…",
  "cal.titlePh": "Title",
  "cal.notesPh": "Notes",
  "cal.noUni": "No university link",
  "cal.noRemind": "No reminder",
  "cal.remind0": "On the day",
  "cal.remind1": "1 day before",
  "cal.remind3": "3 days before",
  "cal.remind7": "7 days before",
  "cal.save": "Save event",
  "cal.add": "Add event",
  "cal.markOpen": "Mark open",
  "cal.markDone": "Mark completed",
  "cal.delete": "Delete",
  "cal.openCircular": "OPEN CIRCULAR",
  "cal.openUniversity": "OPEN UNIVERSITY",
  "cal.kind.closes": "Deadline",
  "cal.kind.exam": "Examination",
  "cal.kind.opens": "Application opens",
  "cal.kind.admit": "Admit card",
  "cal.kind.other": "Other",
  "cal.events": "EVENTS",
  "cal.needTitle": "A title and a valid date are required.",
  "cal.deleteConfirm": "Delete this personal event?",
  // common page bits
  "common.notAnnounced": "NOT ANNOUNCED",
  "common.today": "TODAY",
  "common.tomorrow": "TOMORROW",
  "common.yesterday": "YESTERDAY",
};

const bn: Dict = {
  "nav.overview": "সারসংক্ষেপ",
  "nav.newswire": "নিউজওয়্যার",
  "nav.desk": "আমার ভর্তি ডেস্ক",
  "nav.calendar": "ক্যালেন্ডার",
  "nav.universities": "সব বিশ্ববিদ্যালয়",
  "nav.circulars": "সার্কুলার আর্কাইভ",
  "nav.radar": "ডেডলাইন রেডার",
  "nav.monitor": "তথ্য মনিটর",
  "nav.discovery": "ডিসকভারি লগ",
  "nav.shortlist": "আমার শর্টলিস্ট",
  "nav.tracker": "আবেদন ট্র্যাকার",
  "nav.settings": "সেটিংস",
  "chrome.menu": "মেনু",
  "chrome.close": "বন্ধ",
  "chrome.search": "আর্কাইভে খুঁজুন",
  "chrome.searchLabel": "আর্কাইভ অনুসন্ধান",
  "chrome.noMatch": "ডিরেক্টরিতে কিছু মেলেনি",
  "chrome.universities": "বিশ্ববিদ্যালয়",
  "chrome.circulars": "সার্কুলার",
  "chrome.session": "সেশন ২০২৬–২৭",
  "chrome.localDesk": "লোকাল ডেস্ক",
  "chrome.notPortal": "বিশ্ববিদ্যালয় পোর্টাল নয়",
  "chrome.archive": "ভর্তি আর্কাইভ",
  "chrome.footer":
    "ADMISSION//26 · বাংলাদেশ বিশ্ববিদ্যালয় ভর্তি আর্কাইভ · লোকাল ডেস্ক · প্রতিটি তারিখ উদ্ধৃত সূত্রের বিপরীতে যাচাই করুন · ঘোষিত নয় মানে এই আর্কাইভে নেই",
  "chrome.stale":
    "স্বয়ংক্রিয় যাচাই পুরনো মনে হচ্ছে — শেষ প্রকাশিত চেক ১২ ঘণ্টার সময়সূচির চেয়ে পুরনো",
  "chrome.noReport":
    "কোনো যাচাই রিপোর্ট প্রকাশিত হয়নি — ব্যর্থ বা অনুপস্থিত চেককে সব ঠিক ধরা হয় না",
  "chrome.openMonitor": "মনিটর খুলুন",
  "chrome.day": "দিন",
  "chrome.night": "রাত",
  "chrome.bangla": "বাংলা",
  "chrome.english": "EN",
  "chrome.langAriaBn": "বাংলায় যান",
  "chrome.langAriaEn": "ইংরেজিতে যান",
  "chrome.themeAriaDark": "ডার্ক মোডে যান",
  "chrome.themeAriaLight": "লাইট মোডে যান",
  "cal.kicker": "পরিকল্পনা যন্ত্র",
  "cal.title": "ক্যালেন্ডার",
  "cal.lede":
    "আর্কাইভ থেকে ডেডলাইন, পরীক্ষা, আবেদন খোলা ও অ্যাডমিট কার্ডের তারিখ, প্লাস আপনার যোগ করা ইভেন্ট। পাতলা কনফিডেন্স স্ট্যাম্প মানে এখনো চূড়ান্ত ধরা হয়নি।",
  "cal.export": "এক্সপোর্ট .ics",
  "cal.today": "আজ",
  "cal.month": "মাস",
  "cal.week": "সপ্তাহ",
  "cal.agenda": "এজেন্ডা",
  "cal.allDates": "সব তারিখ",
  "cal.shortlist": "শর্টলিস্ট",
  "cal.hideDone": "সম্পন্ন লুকাও",
  "cal.deadline": "ডেডলাইন",
  "cal.exam": "পরীক্ষা",
  "cal.opens": "খোলা",
  "cal.admit": "অ্যাডমিট",
  "cal.noEvents": "কোনো ইভেন্ট নেই",
  "cal.nothing": "এই পরিসরে কোনো তারিখ নেই।",
  "cal.noEventsDay": "এই দিনে কোনো ইভেন্ট নেই। নিচে যোগ করুন।",
  "cal.close": "বন্ধ",
  "cal.addEvent": "নিজস্ব ইভেন্ট যোগ",
  "cal.editEvent": "ইভেন্ট সম্পাদনা",
  "cal.localOnly": "শুধু লোকাল ডেস্ক — আর্কাইভ ইভেন্ট কখনো ওভাররাইট করে না।",
  "cal.restoring": "ডেস্ক পুনরুদ্ধার হচ্ছে…",
  "cal.titlePh": "শিরোনাম",
  "cal.notesPh": "নোট",
  "cal.noUni": "বিশ্ববিদ্যালয় লিংক নেই",
  "cal.noRemind": "রিমাইন্ডার নেই",
  "cal.remind0": "সেই দিনে",
  "cal.remind1": "১ দিন আগে",
  "cal.remind3": "৩ দিন আগে",
  "cal.remind7": "৭ দিন আগে",
  "cal.save": "সংরক্ষণ",
  "cal.add": "যোগ করুন",
  "cal.markOpen": "খোলা চিহ্নিত",
  "cal.markDone": "সম্পন্ন চিহ্নিত",
  "cal.delete": "মুছুন",
  "cal.openCircular": "সার্কুলার খুলুন",
  "cal.openUniversity": "বিশ্ববিদ্যালয় খুলুন",
  "cal.kind.closes": "ডেডলাইন",
  "cal.kind.exam": "পরীক্ষা",
  "cal.kind.opens": "আবেদন খোলা",
  "cal.kind.admit": "অ্যাডমিট কার্ড",
  "cal.kind.other": "অন্যান্য",
  "cal.events": "ইভেন্ট",
  "cal.needTitle": "শিরোনাম ও সঠিক তারিখ লাগবে।",
  "cal.deleteConfirm": "এই ব্যক্তিগত ইভেন্ট মুছবেন?",
  "common.notAnnounced": "ঘোষিত নয়",
  "common.today": "আজ",
  "common.tomorrow": "আগামীকাল",
  "common.yesterday": "গতকাল",
};

const tables: Record<Lang, Dict> = { en, bn };

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function resolveLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "bn" || stored === "en") return stored;
  } catch {
    /* private mode */
  }
  return "en";
}

export function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.classList.toggle("lang-bn", lang === "bn");
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* private mode */
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const initial = resolveLang();
    setLangState(initial);
    applyLang(initial);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyLang(next);
  }, []);

  const t = useCallback(
    (key: string) => tables[lang][key] ?? tables.en[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

/** Safe translator — falls back to key if provider missing (SSR/tests). */
export function useT() {
  const ctx = useContext(LangContext);
  return (key: string) => {
    if (!ctx) return en[key] ?? key;
    return ctx.t(key);
  };
}

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  const next = lang === "bn" ? "en" : "bn";

  return (
    <button
      type="button"
      className="press h-11 px-3"
      onClick={() => setLang(next)}
      aria-pressed={lang === "bn"}
      aria-label={lang === "bn" ? t("chrome.langAriaEn") : t("chrome.langAriaBn")}
      title={lang === "bn" ? "English" : "বাংলা"}
    >
      <span className="font-display text-sm font-bold tracking-wide">
        {lang === "bn" ? t("chrome.english") : t("chrome.bangla")}
      </span>
    </button>
  );
}
