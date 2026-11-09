/**
 * Desk-written spicy briefings — not crawler headlines.
 * 9 Nov 2026: UGC BOMB is the lead. Everything else is fallout.
 */
export interface SpiceCard {
  id: string;
  heat: "HOT" | "SYSTEM" | "MARKET" | "WAR" | "STREET" | "SCAM" | "NUKE";
  kicker: string;
  headline: string;
  body: string;
  punch: string;
  sourceLabel: string;
  sourceUrl: string;
  published: string;
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "spice-ugc-nuke",
    heat: "NUKE",
    kicker: "WHO GAVE A SHIT BOUT UGC?? · 9 NOV · STREET EDITION",
    headline: "WHO GAVE A SHIT BOUT UGC?? চেয়ারম্যান বললেন সব পাবলিক ইউনি ভর্তি জানুয়ারি থেকে — গ্রুপে এখনো 'DU কি ইনক্লুডেড?' নিয়ে ঝগড়া।",
    body:
      "সোজা কথা। ইউজিসি চেয়ারম্যান বললেন — সব পাবলিক বিশ্ববিদ্যালয়ের ভর্তি কার্যক্রম জানুয়ারি থেকে, পরীক্ষা ১ ফেব্রুয়ারি থেকে। অফিসিয়াল কারণ: সাড়ে চার লাখ HSC রিটেক। আনঅফিসিয়াল বাস্তবতা: DU আগামীকালই ফর্ম খুলছিল, BUET ২১ নভেম্বর, মেডিকেল ১৮ ডিসেম্বর লক। কোচিং হাউজগুলো পুরোনো ক্যালেন্ডার বেচে বসে আছে। গ্রুপে ছেড়ো ঝগড়া — 'DU কি ইনক্লুডেড?' 'VC ঘুমাচ্ছিল নাকি?' কেউ সার্কুলার দেখে না, সবাই স্ক্রিনশট দেখে। ইউজিসি যাই বলুক, যতক্ষণ না DU-BUET-মেডিকেল নিজের নোটিশ না ছাড়ে, ততক্ষণ এটা শুধু একটা বিবৃতি। তারপরও ক্যালেন্ডারটা এক দিনে দুই মাস পিছিয়ে গেল। হ্যাঁ ভাই — who gave a shit bout UGC? এখন সবাই দিচ্ছে।",
    punch: "সার্কুলার ছাড়া কোনো তারিখ বিশ্বাস কোরো না। ইউজিসি বিবৃতি ≠ ইউনিভারসিটি নোটিশ।",
    sourceLabel: "Udvash Unmesh group · UGC chairman statement · desk, 9 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-09",
  },
