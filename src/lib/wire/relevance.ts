import type { WireRelevance, WireVerification } from "./types.ts";

const EXCLUDE = [
  "tender",
  "quotation",
  "procurement",
  "expression of interest",
  "job circular",
  "situations vacant",
  "recruitment notice",
  "নিয়োগ বিজ্ঞপ্তি",
  "নিয়োগ বিজ্ঞপ্তি",
  "postdoctoral",
  "post-doctoral",
  "post doctoral",
  "phd",
  "ph.d",
  "mphil",
  "postgraduate",
  "masters admission",
  "master's admission",
  "pg admission",
  "re-admission",
  "readmission",
  "পিএইচডি",
  "এমফিল",
  "পোস্টডক্টর",
  "পোস্ট ডক্টর",
  "স্নাতকোত্তর",
  "ফেলোশিপ",
  "kindergarten",
  "play group",
  "playgroup",
  "primary school",
  "pedp",
];

const NEWS_NEED = [
  "admission",
  "ভর্তি",
  "admit card",
  "প্রবেশপত্র",
  "ভর্তি পরীক্ষা",
  "admission test",
  "hsc retake",
  "hsc supplementary",
  "supplementary exam",
  "re-scrutiny",
  "rescrutiny",
  "form fill",
  "mbbs",
  "bds",
  "গুচ্ছ",
  "undergraduate admission",
  "medical college",
  "medical admission",
  "dental admission",
  "university admission",
  "varsity admission",
  "application deadline",
  "deadline extension",
];

const COACHING_NEED = [
  "admission",
  "ভর্তি",
  "ভার্সিটি",
  "varsity",
  "মেডিকেল",
  "medical",
  "engineering",
  "ইঞ্জিনি",
  "গুচ্ছ",
  "model test",
  "মডেল টেস্ট",
  "crash",
  "ক্র্যাশ",
  "ক্র‌্যাশ",
  "iba",
];

const PAGE_NEED = ["admission", "ভর্তি", "circular", "সার্কুলার", "admit", "প্রবেশপত্র", "undergraduate", "আবেদন"];

const SCHOOL_ONLY = /গ্রামার|অলিম্পি|৬ষ্ঠ|৭ম|৮ম|৯ম শ্রেণ|class 6|class 7|class 8|class 9/;

export function admissionRelevance(text: string, mode: WireRelevance): { keep: boolean; strong: boolean } {
  const hay = text.toLowerCase();
  if (EXCLUDE.some((term) => hay.includes(term))) return { keep: false, strong: false };
  if (mode === "coaching" && SCHOOL_ONLY.test(hay) && !/ভার্সিটি|মেডিকেল|admission|ভর্তি/.test(hay)) {
    return { keep: false, strong: false };
  }
  const need = mode === "news" ? NEWS_NEED : mode === "coaching" ? COACHING_NEED : PAGE_NEED;
  const keep = need.some((term) => hay.includes(term));
  const strong = /admission circular|admission test|admit card|deadline|postpon|extension|ভর্তি পরীক্ষা|প্রবেশপত্র|সময়সীমা|সময়সীমা|স্থগিত|সার্কুলার/.test(
    hay,
  );
  if (!keep) return { keep: false, strong: false };
  if (mode === "official-page" && headlineLength(text) < 28 && !strong) return { keep: false, strong: false };
  if (mode === "coaching") {
    const headline = text.trim();
    if (headline.length > 90) return { keep: false, strong: false };
    const programme = /(এডমিশন|admission|ভর্তি|মডেল টেস্ট|model test|ক্র্যাশ|ক্র‌্যাশ|crash|গুচ্ছ|প্রোগ্রাম|programme|program|কোর্স|course|প্যাকেজ|package)/.test(
      headline,
    );
    const thin = headline.split(/\s+/).length <= 4 && !/(মডেল|প্রোগ্রাম|কোর্স|course|model|package|প্যাকেজ|crash|ক্র)/.test(headline);
    if (!programme || thin) return { keep: false, strong: false };
  }
  return { keep: true, strong };
}

function headlineLength(text: string): number {
  return text.trim().length;
}

export function isCorrectionNotice(headline: string): boolean {
  return /corrigend|\bcorrection\b|\bcorrected\b|সংশোধন|সংশোধিত/.test(headline.toLowerCase());
}

export function classifyVerification(
  trust: "official" | "reported" | "community",
  category: "official" | "community" | "news",
  headline: string,
): WireVerification {
  if (category === "community" || trust === "community") return "community";
  if (category === "news" || trust === "reported") return "reported";
  if (trust === "official") return isCorrectionNotice(headline) ? "corrected" : "official";
  return "unverified";
}
