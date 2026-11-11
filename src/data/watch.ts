import type { WatchItem } from "@/data/types";

export const watchItems: WatchItem[] = [
  {
    id: "a02-circular-deeplink",
    title: "Wire rule · circular stories open in-app records",
    body: "Spice cards that map to a circular carry circularId (c-du, c-buet, c-kuet, c-dghs). Alerts-feed urls point at /circulars/<id>, not only news sites. KUET still the only row with an official PDF URL on file — mirror/offline is A03/A04. UGC floor is SYSTEM/reported, not a campus circular.",
    sourceLabel: "Agent 02 intelligence · 11 Nov 2026",
    sourceUrl: "https://kdeimtiadd26.vercel.app/circulars/c-kuet",
    published: "2026-11-11",
  },
  {
    id: "cal-officer-11nov",
    title: "Calendar truth · 11 Nov — UGC floor is not universal",
    body: "UGC 9 Nov: public uni apps from January, tests after 1 Feb (for HSC re-eval/supplementary cohort). Operational calendar on this desk: DU OPEN 11–25 Nov / tests Dec 5–26 (held). BUET apps 21 Nov / test 16 Jan (notice 10 Nov held). KUET apps LIVE → 10 Dec / test 8 Jan. Medical DGME 18 Dec (not UGC). JnU/RU/CU still show local Nov–Jan lines as preliminary or notice — subject to formal slip. GST tests still reported March 2027; apps NOT ANNOUNCED. Never invent a postponed date.",
    sourceLabel: "Agent 03 calendar pass · UGC/DU/BUET notices · 11 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-11",
  },
  {
    id: "du-apps-open-11nov",
    title: "DU applications OPEN now — 11 Nov 12:00 → 25 Nov 23:59",
    body: "Portal is live. UGC told public universities to wait until January; Dhaka University refused. Tests 5–26 Dec (IBA first). Re-evaluation results due 23 Nov still fit the close. Fee raised on four units (Science/Arts/Business ৳1,200). This is the first open split in the national calendar.",
    sourceLabel: "Channel I · TBS · Observer · Jago News · DU portal, 11 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-11",
  },
  {
    id: "buet-defies-ugc-notice",
    title: "BUET official notice: test stays 16 Jan — UGC floor rejected",
    body: "After DU, BUET published a 10 Nov notice: first-year test remains 16 January 2027. Applications open 21 Nov; close date still not announced in that notice. GPA wall unchanged. Two heavyweights are now off the UGC January/February script.",
    sourceLabel: "Prothom Alo · Jago News · BUET notice, 10–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-11",
  },
  {
    id: "medical-18-dec-orphan",
    title: "Medical still on 18 Dec — formal circular still missing",
    body: "DGME line remains 18 December for MBBS/BDS. Formal circular not on the desk as of 11 Nov; apps still expected mid-November, not locked. UGC’s public-uni postponement does not bind DGME. Retakers starting 1 Dec are likely locked out of this medical cycle unless the ministry intervenes.",
    sourceLabel: "Daily Campus · Observer · Daily Sun · bdnews24 · DGME, 7–10 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-11",
  },
];
