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
  "cal.bdLocal": "BANGLADESH LOCAL",
  "cal.wd.sun": "S",
  "cal.wd.mon": "M",
  "cal.wd.tue": "T",
  "cal.wd.wed": "W",
  "cal.wd.thu": "T",
  "cal.wd.fri": "F",
  "cal.wd.sat": "S",
  "cal.wdFull.sun": "SUN",
  "cal.wdFull.mon": "MON",
  "cal.wdFull.tue": "TUE",
  "cal.wdFull.wed": "WED",
  "cal.wdFull.thu": "THU",
  "cal.wdFull.fri": "FRI",
  "cal.wdFull.sat": "SAT",
  // common
  "common.notAnnounced": "NOT ANNOUNCED",
  "common.today": "TODAY",
  "common.tomorrow": "TOMORROW",
  "common.yesterday": "YESTERDAY",
  "common.open": "OPEN",
  "common.closed": "CLOSED",
  "common.upcoming": "UPCOMING",
  "common.search": "SEARCH",
  "common.all": "ALL",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.loading": "Loading…",
  "common.retry": "Try again",
  "common.error": "Something went wrong",
  "common.notFound": "Not in the archive",
  "common.returnHome": "Return to overview",
  // overview
  "home.kicker": "Session 2026–27",
  "home.title": "Overview",
  "home.lede": "Public university admission archive for Bangladesh. Deadlines, circulars, seats and discovery — verify every date against the cited source.",
  "home.panel.universe": "Universities",
  "home.panel.wire": "Newswire",
  "home.panel.urgent": "Deadlines",
  "home.panel.exams": "Exams",
  "home.panel.fresh": "Circulars",
  "home.panel.picture": "Picture",
  "home.panel.seats": "Seats",
  "home.panel.ops": "Discovery",
  "home.filterUnis": "Filter universities",
  "home.noUniMatch": "NO UNIVERSITY MATCHES THAT FILTER.",
  "home.noFutureDate": "NO FUTURE DATE IS ON FILE.",
  "home.examinations": "Examinations",
  "home.noExam": "NO UPCOMING EXAM DATE IS ON FILE.",
  "home.recentlyCited": "Recently cited",
  "home.revised": "REVISED",
  // desk
  "desk.kicker": "Personal",
  "desk.title": "My admission desk",
  "desk.lede": "Your shortlist, deadlines, notes and progress on this browser. Nothing here is sent to a university.",
  "desk.hidden": "HIDDEN SECTIONS",
  "desk.noDeadlines": "No upcoming deadlines are stored.",
  "desk.noCircular": "NO CIRCULAR",
  "desk.personal": "PERSONAL",
  "desk.noPersonal": "No personal dates yet.",
  "desk.pinned": "PINNED CIRCULARS",
  "desk.pinHint": "Pin a deadline from a circular to park it here.",
  "desk.noUni": "No university",
  "desk.stage.notStarted": "Not started",
  "desk.stage.researching": "Researching",
  "desk.stage.ready": "Ready to apply",
  "desk.stage.applied": "Applied",
  "desk.stage.admit": "Admit card collected",
  "desk.stage.exam": "Examination completed",
  // discovery
  "disc.kicker": "Operations",
  "disc.title": "Discovery log",
  "disc.lede": "Honest record of what the crawler opened, reached, failed, or found. Nothing here is simulated.",
  "disc.reading": "READING THE PUBLISHED LOG",
  "disc.docLinks": "Document links",
  "disc.noDocs": "NO DOCUMENT LINKS IN THIS FILE.",
  "disc.activity": "Activity",
  "disc.waiting": "WAITING FOR THE PUBLISHED LOG.",
  "disc.noEvents": "NO EVENTS HAVE BEEN RECORDED.",
  "disc.noMatch": "NO EVENTS MATCH THIS FILTER.",
  "disc.noUrl": "NO URL ON THIS LINE",
  "disc.reached": "Reached",
  "disc.failed": "Failed",
  "disc.new": "New",
  "disc.all": "All",
  "disc.staleNote": "THE LAST CYCLE IS OVER 90 MINUTES OLD. IT IS NOT RUNNING NOW.",
  // newswire
  "wire.kicker": "Press",
  "wire.title": "Newswire",
  "wire.lede": "Education-desk headlines the crawler and desk can see. News is not a circular.",
  "wire.newArrived": "NEW WIRE ARRIVED",
  "wire.reading": "READING THE PUBLISHED WIRE.",
  "wire.emptyFilter": "NOTHING IN THIS FILTER. THE WIRE WAS NOT FILLED IN.",
  "wire.noTime": "NO PUBLICATION TIME ON THE SOURCE",
  "wire.sources": "Source registry",
  "wire.noSources": "THE WIRE FILE HAS NO SOURCE ROWS.",
  "wire.recordLink": "Record a public link",
  // settings
  "set.kicker": "Desk",
  "set.title": "Settings",
  "set.lede": "Add a university, log a circular, and keep a JSON backup. Edits live in this browser.",
  "set.howRead": "How to read a record",
  "set.backup": "Backup",
  "set.exportDesk": "Export desk backup",
  "set.exportMerged": "Export merged catalog",
  "set.resetDesk": "Reset this desk",
  "set.import": "IMPORT DESK BACKUP",
  "set.addUni": "Add a university",
  "set.addUniBtn": "Add university",
  "set.addCirc": "Add a circular",
  "set.addCircBtn": "Add circular",
  "set.naughtyTitle": "Naughty mode",
  "set.naughtyBody": "Flip this and the whole archive goes pink. Accents blush. Selection gets sticky. The live bar starts throbbing. Nothing about the data changes — only the mood.",
  "set.naughtyOn": "Currently horny",
  "set.naughtyOff": "Keep it professional",
  // radar / monitor / shortlist / tracker
  "radar.kicker": "Timing",
  "radar.title": "Deadline radar",
  "radar.lede": "Clash register for application windows and exam days across the archive.",
  "radar.empty": "NOTHING IN THIS COLUMN.",
  "radar.clash": "Clash register",
  "mon.kicker": "Verification",
  "mon.title": "Information monitor",
  "mon.lede": "Published checks against official sources. Failed or missing checks are not treated as all clear.",
  "mon.review": "Review required",
  "mon.changelog": "Change log",
  "mon.university": "UNIVERSITY",
  "mon.field": "FIELD",
  "mon.previous": "PREVIOUS",
  "mon.detected": "DETECTED",
  "mon.status": "STATUS",
  "mon.when": "WHEN",
  "short.kicker": "Saved",
  "short.title": "My shortlist",
  "short.lede": "Universities you marked on this browser. Not sent anywhere.",
  "short.saved": "Saved, not shortlisted",
  "track.kicker": "Progress",
  "track.title": "Application tracker",
  "track.lede": "Mark where you are on each circular. Local only.",
  "track.noCirc": "Shortlisted, no circular yet",
  "track.logFirst": "LOG A CIRCULAR BEFORE YOU CAN MARK IT APPLIED.",
  // universities / circulars lists
  "uni.kicker": "Directory",
  "uni.title": "All universities",
  "uni.lede": "Public, engineering, science, agricultural, medical and specialised institutions tracked in this archive.",
  "uni.search": "SEARCH",
  "uni.category": "CATEGORY",
  "uni.status": "STATUS",
  "uni.allStatuses": "ALL STATUSES",
  "circ.kicker": "Notices",
  "circ.title": "Circular archive",
  "circ.lede": "Structured admission notices with confidence stamps. Open a row for timeline, seats and sources.",
  "circ.university": "UNIVERSITY",
  "circ.system": "CLUSTER / SYSTEM",
  "circ.allSystems": "ALL SYSTEMS",
  "circ.appStatus": "APPLICATION STATUS",
  "circ.missing": "Circular not on file",
  "circ.deskCopy": "DESK COPY",
  "circ.timeline": "Timeline",
  "circ.admitCard": "Admit card",
  "circ.eligibility": "Eligibility",
  "circ.seatsSubjects": "Seats and subjects",
  "circ.totalSeats": "TOTAL SEATS",
  "circ.pdf": "Official PDF",
  "circ.pdfMissing": "PDF NOT ON FILE",
  "uni.missing": "Missing record",
  "uni.notInDir": "Not in the directory",
  "uni.window": "The window",
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
  "cal.bdLocal": "বাংলাদেশ স্থানীয় সময়",
  "cal.wd.sun": "র",
  "cal.wd.mon": "সো",
  "cal.wd.tue": "ম",
  "cal.wd.wed": "বু",
  "cal.wd.thu": "বৃ",
  "cal.wd.fri": "শু",
  "cal.wd.sat": "শ",
  "cal.wdFull.sun": "রবি",
  "cal.wdFull.mon": "সোম",
  "cal.wdFull.tue": "মঙ্গল",
  "cal.wdFull.wed": "বুধ",
  "cal.wdFull.thu": "বৃহস্পতি",
  "cal.wdFull.fri": "শুক্র",
  "cal.wdFull.sat": "শনি",
  "common.notAnnounced": "ঘোষিত নয়",
  "common.today": "আজ",
  "common.tomorrow": "আগামীকাল",
  "common.yesterday": "গতকাল",
  "common.open": "খোলা",
  "common.closed": "বন্ধ",
  "common.upcoming": "আসন্ন",
  "common.search": "খুঁজুন",
  "common.all": "সব",
  "common.save": "সংরক্ষণ",
  "common.cancel": "বাতিল",
  "common.loading": "লোড হচ্ছে…",
  "common.retry": "আবার চেষ্টা",
  "common.error": "কিছু একটা ভুল হয়েছে",
  "common.notFound": "আর্কাইভে নেই",
  "common.returnHome": "সারসংক্ষেপে ফিরুন",
  "home.kicker": "সেশন ২০২৬–২৭",
  "home.title": "সারসংক্ষেপ",
  "home.lede": "বাংলাদেশের পাবলিক বিশ্ববিদ্যালয় ভর্তি আর্কাইভ। ডেডলাইন, সার্কুলার, আসন ও ডিসকভারি — প্রতিটি তারিখ উদ্ধৃত সূত্রের বিপরীতে যাচাই করুন।",
  "home.panel.universe": "বিশ্ববিদ্যালয়",
  "home.panel.wire": "নিউজওয়্যার",
  "home.panel.urgent": "ডেডলাইন",
  "home.panel.exams": "পরীক্ষা",
  "home.panel.fresh": "সার্কুলার",
  "home.panel.picture": "চিত্র",
  "home.panel.seats": "আসন",
  "home.panel.ops": "ডিসকভারি",
  "home.filterUnis": "বিশ্ববিদ্যালয় ফিল্টার",
  "home.noUniMatch": "এই ফিল্টারে কোনো বিশ্ববিদ্যালয় মেলেনি।",
  "home.noFutureDate": "কোনো ভবিষ্যৎ তারিখ নেই।",
  "home.examinations": "পরীক্ষা",
  "home.noExam": "কোনো আসন্ন পরীক্ষার তারিখ নেই।",
  "home.recentlyCited": "সম্প্রতি উদ্ধৃত",
  "home.revised": "সংশোধিত",
  "desk.kicker": "ব্যক্তিগত",
  "desk.title": "আমার ভর্তি ডেস্ক",
  "desk.lede": "এই ব্রাউজারে আপনার শর্টলিস্ট, ডেডলাইন, নোট ও অগ্রগতি। এখান থেকে কোনো বিশ্ববিদ্যালয়ে কিছু পাঠানো হয় না।",
  "desk.hidden": "লুকানো বিভাগ",
  "desk.noDeadlines": "কোনো আসন্ন ডেডলাইন সংরক্ষিত নেই।",
  "desk.noCircular": "সার্কুলার নেই",
  "desk.personal": "ব্যক্তিগত",
  "desk.noPersonal": "এখনো কোনো ব্যক্তিগত তারিখ নেই।",
  "desk.pinned": "পিন করা সার্কুলার",
  "desk.pinHint": "সার্কুলার থেকে ডেডলাইন পিন করে এখানে রাখুন।",
  "desk.noUni": "বিশ্ববিদ্যালয় নেই",
  "desk.stage.notStarted": "শুরু হয়নি",
  "desk.stage.researching": "খোঁজখবর",
  "desk.stage.ready": "আবেদনের জন্য প্রস্তুত",
  "desk.stage.applied": "আবেদন করা হয়েছে",
  "desk.stage.admit": "অ্যাডমিট কার্ড নেওয়া হয়েছে",
  "desk.stage.exam": "পরীক্ষা সম্পন্ন",
  "disc.kicker": "অপারেশন",
  "disc.title": "ডিসকভারি লগ",
  "disc.lede": "ক্রলার কী খুলেছে, পৌঁছেছে, ব্যর্থ হয়েছে বা পেয়েছে তার সৎ রেকর্ড। এখানে কিছুই সিমুলেটেড নয়।",
  "disc.reading": "প্রকাশিত লগ পড়া হচ্ছে",
  "disc.docLinks": "নথির লিংক",
  "disc.noDocs": "এই ফাইলে কোনো নথির লিংক নেই।",
  "disc.activity": "কার্যক্রম",
  "disc.waiting": "প্রকাশিত লগের অপেক্ষা।",
  "disc.noEvents": "কোনো ইভেন্ট রেকর্ড হয়নি।",
  "disc.noMatch": "এই ফিল্টারে কোনো ইভেন্ট মেলেনি।",
  "disc.noUrl": "এই লাইনে কোনো ইউআরএল নেই",
  "disc.reached": "পৌঁছেছে",
  "disc.failed": "ব্যর্থ",
  "disc.new": "নতুন",
  "disc.all": "সব",
  "disc.staleNote": "শেষ চক্র ৯০ মিনিটের বেশি পুরনো। এখন চলছে না।",
  "wire.kicker": "প্রেস",
  "wire.title": "নিউজওয়্যার",
  "wire.lede": "শিক্ষা ডেস্কের শিরোনাম যা ক্রলার ও ডেস্ক দেখতে পায়। খবর সার্কুলার নয়।",
  "wire.newArrived": "নতুন ওয়্যার এসেছে",
  "wire.reading": "প্রকাশিত ওয়্যার পড়া হচ্ছে।",
  "wire.emptyFilter": "এই ফিল্টারে কিছু নেই। ওয়্যার খালি।",
  "wire.noTime": "সূত্রে প্রকাশের সময় নেই",
  "wire.sources": "সূত্র রেজিস্ট্রি",
  "wire.noSources": "ওয়্যার ফাইলে কোনো সূত্র নেই।",
  "wire.recordLink": "পাবলিক লিংক যোগ করুন",
  "set.kicker": "ডেস্ক",
  "set.title": "সেটিংস",
  "set.lede": "বিশ্ববিদ্যালয় যোগ করুন, সার্কুলার লগ করুন, JSON ব্যাকআপ রাখুন। সম্পাদনা এই ব্রাউজারেই থাকে।",
  "set.howRead": "রেকর্ড কীভাবে পড়বেন",
  "set.backup": "ব্যাকআপ",
  "set.exportDesk": "ডেস্ক ব্যাকআপ এক্সপোর্ট",
  "set.exportMerged": "মার্জড ক্যাটালগ এক্সপোর্ট",
  "set.resetDesk": "এই ডেস্ক রিসেট",
  "set.import": "ডেস্ক ব্যাকআপ ইমপোর্ট",
  "set.addUni": "বিশ্ববিদ্যালয় যোগ",
  "set.addUniBtn": "যোগ করুন",
  "set.addCirc": "সার্কুলার যোগ",
  "set.addCircBtn": "যোগ করুন",
  "set.naughtyTitle": "নটি মোড",
  "set.naughtyBody": "চালু করলে পুরো আর্কাইভ গোলাপি হয়ে যায়। ডেটা একই থাকে — শুধু মেজাজ বদলায়।",
  "set.naughtyOn": "এখন হর্নি",
  "set.naughtyOff": "পেশাদার রাখুন",
  "radar.kicker": "সময়",
  "radar.title": "ডেডলাইন রেডার",
  "radar.lede": "আর্কাইভ জুড়ে আবেদন উইন্ডো ও পরীক্ষার দিনের সংঘর্ষ রেজিস্টার।",
  "radar.empty": "এই কলামে কিছু নেই।",
  "radar.clash": "সংঘর্ষ রেজিস্টার",
  "mon.kicker": "যাচাই",
  "mon.title": "তথ্য মনিটর",
  "mon.lede": "সরকারি সূত্রের বিপরীতে প্রকাশিত চেক। ব্যর্থ বা অনুপস্থিত চেককে সব ঠিক ধরা হয় না।",
  "mon.review": "পর্যালোচনা দরকার",
  "mon.changelog": "পরিবর্তন লগ",
  "mon.university": "বিশ্ববিদ্যালয়",
  "mon.field": "ক্ষেত্র",
  "mon.previous": "আগে",
  "mon.detected": "সনাক্ত",
  "mon.status": "অবস্থা",
  "mon.when": "কখন",
  "short.kicker": "সংরক্ষিত",
  "short.title": "আমার শর্টলিস্ট",
  "short.lede": "এই ব্রাউজারে চিহ্নিত বিশ্ববিদ্যালয়। কোথাও পাঠানো হয় না।",
  "short.saved": "সংরক্ষিত, শর্টলিস্টে নয়",
  "track.kicker": "অগ্রগতি",
  "track.title": "আবেদন ট্র্যাকার",
  "track.lede": "প্রতিটি সার্কুলারে আপনি কোথায় আছেন চিহ্নিত করুন। শুধু লোকাল।",
  "track.noCirc": "শর্টলিস্টে আছে, সার্কুলার নেই",
  "track.logFirst": "আবেদন চিহ্নিত করতে আগে সার্কুলার লগ করুন।",
  "uni.kicker": "ডিরেক্টরি",
  "uni.title": "সব বিশ্ববিদ্যালয়",
  "uni.lede": "এই আর্কাইভে ট্র্যাক করা পাবলিক, প্রকৌশল, বিজ্ঞান, কৃষি, মেডিকেল ও বিশেষায়িত প্রতিষ্ঠান।",
  "uni.search": "খুঁজুন",
  "uni.category": "বিভাগ",
  "uni.status": "অবস্থা",
  "uni.allStatuses": "সব অবস্থা",
  "circ.kicker": "নোটিশ",
  "circ.title": "সার্কুলার আর্কাইভ",
  "circ.lede": "কনফিডেন্স স্ট্যাম্পসহ গঠিত ভর্তি নোটিশ। টাইমলাইন, আসন ও সূত্রের জন্য একটি সারি খুলুন।",
  "circ.university": "বিশ্ববিদ্যালয়",
  "circ.system": "ক্লাস্টার / সিস্টেম",
  "circ.allSystems": "সব সিস্টেম",
  "circ.appStatus": "আবেদনের অবস্থা",
  "circ.missing": "সার্কুলার নেই",
  "circ.deskCopy": "ডেস্ক কপি",
  "circ.timeline": "টাইমলাইন",
  "circ.admitCard": "অ্যাডমিট কার্ড",
  "circ.eligibility": "যোগ্যতা",
  "circ.seatsSubjects": "আসন ও বিষয়",
  "circ.totalSeats": "মোট আসন",
  "circ.pdf": "অফিসিয়াল পিডিএফ",
  "circ.pdfMissing": "পিডিএফ নেই",
  "uni.missing": "রেকর্ড নেই",
  "uni.notInDir": "ডিরেক্টরিতে নেই",
  "uni.window": "উইন্ডো",
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
  if (!ctx) {
    return {
      lang: "en" as Lang,
      setLang: (next: Lang) => {
        applyLang(next);
      },
      t: (key: string) => en[key] ?? key,
    };
  }
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
