/**
 * National coaching exam routines (Udvas–Unmesh style).
 * These are NOT university circulars. Confidence is always "reported".
 * Hover tip is intentionally minimal: track + marks distribution.
 */

export type CoachingTrack = "varsity" | "engineering";

export interface CoachingExam {
  id: string;
  day: string; // YYYY-MM-DD
  track: CoachingTrack;
  /** Short action on the chip */
  action: string;
  /** PAPER | SUBJECT | MODEL | SPECIAL */
  phase: "paper" | "subject" | "model" | "special" | "combined";
  /** Number distribution shown on hover */
  marks: string;
  time?: string | null;
}

/** Varsity KA FMT 2026 — purple track */
const VARSITY: CoachingExam[] = [
  { id: "v-pf-phy1", day: "2026-11-18", track: "varsity", phase: "paper", action: "Physics 1st paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-pf-phy2", day: "2026-11-20", track: "varsity", phase: "paper", action: "Physics 2nd paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-pf-chem1", day: "2026-11-22", track: "varsity", phase: "paper", action: "Chemistry 1st paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-pf-chem2", day: "2026-11-24", track: "varsity", phase: "paper", action: "Chemistry 2nd paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-pf-hm1", day: "2026-11-26", track: "varsity", phase: "paper", action: "Higher Math 1st paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-pf-hm2", day: "2026-11-28", track: "varsity", phase: "paper", action: "Higher Math 2nd paper", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-sf-bio", day: "2026-11-30", track: "varsity", phase: "subject", action: "Subject final · Bio / Bangla / Eng", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-sf-chem", day: "2026-12-01", track: "varsity", phase: "subject", action: "Subject final · Chemistry 1+2", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-sf-phy", day: "2026-12-02", track: "varsity", phase: "subject", action: "Subject final · Physics 1+2", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-sf-hm", day: "2026-12-03", track: "varsity", phase: "subject", action: "Subject final · HM / Bangla / Eng", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-mt-1", day: "2026-12-05", track: "varsity", phase: "model", action: "Final model test 1", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-mt-2", day: "2026-12-06", track: "varsity", phase: "model", action: "Final model test 2", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-mt-3", day: "2026-12-07", track: "varsity", phase: "model", action: "Final model test 3", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-mt-4", day: "2026-12-08", track: "varsity", phase: "model", action: "Final model test 4", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
  { id: "v-mt-5", day: "2026-12-09", track: "varsity", phase: "model", action: "Final model test 5", marks: "MCQ 60×1=60 · Written 16×2.5=40", time: "1h 30m" },
];

/** Engineering MT 2026 — blue track. Real uni admission days are omitted (already on circular calendar). */
const ENGINEERING: CoachingExam[] = [
  { id: "e-pf-phy1", day: "2026-11-18", track: "engineering", phase: "paper", action: "Paper final · Physics 1st", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-pf-phy2", day: "2026-11-20", track: "engineering", phase: "paper", action: "Paper final · Physics 2nd", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-pf-chem1", day: "2026-11-22", track: "engineering", phase: "paper", action: "Paper final · Chemistry 1st", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-pf-chem2", day: "2026-11-24", track: "engineering", phase: "paper", action: "Paper final · Chemistry 2nd", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-pf-hm1", day: "2026-11-26", track: "engineering", phase: "paper", action: "Paper final · Higher Math 1st", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-pf-hm2", day: "2026-11-28", track: "engineering", phase: "paper", action: "Paper final · Higher Math 2nd", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-sf-hm", day: "2026-11-29", track: "engineering", phase: "subject", action: "Subject final · Higher Math 1+2", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-sf-phy", day: "2026-12-01", track: "engineering", phase: "subject", action: "Subject final · Physics 1+2", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-sf-chem", day: "2026-12-03", track: "engineering", phase: "subject", action: "Subject final · Chemistry 1+2", marks: "MCQ 40×1=40 · Written 30×10=300", time: "2h" },
  { id: "e-cf-1", day: "2026-12-05", track: "engineering", phase: "combined", action: "Combined paper final 1", marks: "MCQ 25×6=150 · Written 30×10=300", time: "2h 15m" },
  { id: "e-cf-2", day: "2026-12-06", track: "engineering", phase: "combined", action: "Combined paper final 2", marks: "MCQ 25×6=150 · Written 30×10=300", time: "2h 15m" },
  { id: "e-sp-du1", day: "2026-12-08", track: "engineering", phase: "special", action: "DU Ka special exam 1", marks: "MCQ + Written · DU pattern", time: "2h" },
  { id: "e-sp-du2", day: "2026-12-09", track: "engineering", phase: "special", action: "DU Ka special exam 2", marks: "MCQ + Written · DU pattern", time: "2h" },
  { id: "e-mt-1", day: "2026-12-14", track: "engineering", phase: "model", action: "Final model test 1 · MCQ special", marks: "MCQ special · Eng standard 100", time: "2h 30m" },
  { id: "e-mt-2", day: "2026-12-20", track: "engineering", phase: "model", action: "Final model test 2 · Written (BUET-style)", marks: "Written special · BUET 60×10=600", time: "3h" },
  { id: "e-mt-3", day: "2026-12-22", track: "engineering", phase: "model", action: "Final model test 3 · MCQ + Arch 1", marks: "MCQ special · Eng 100", time: "2h 30m" },
  { id: "e-mt-4", day: "2026-12-24", track: "engineering", phase: "model", action: "Final model test 4 · Written + Arch 2", marks: "Written special · BUET 60×10=600", time: "3h" },
  { id: "e-mt-5", day: "2026-12-26", track: "engineering", phase: "model", action: "Final model test 5 · MCQ + Arch 3", marks: "MCQ special · Eng 100", time: "2h 30m" },
  { id: "e-mt-6", day: "2026-12-28", track: "engineering", phase: "model", action: "Final model test 6 · Written + Arch 4", marks: "Written special · BUET 60×10=600", time: "3h" },
  { id: "e-mt-7", day: "2026-12-30", track: "engineering", phase: "model", action: "Final model test 7 · MCQ", marks: "MCQ special · Eng 100", time: "2h 30m" },
  { id: "e-mt-8", day: "2027-01-03", track: "engineering", phase: "model", action: "Final model test 8 · MCQ", marks: "MCQ special · Eng 100", time: "2h 30m" },
  { id: "e-sp-kuet", day: "2027-01-05", track: "engineering", phase: "special", action: "KUET special exam", marks: "KUET pattern", time: "2h" },
  { id: "e-sp-ruet-sust", day: "2027-01-10", track: "engineering", phase: "special", action: "RUET + SUST special exam", marks: "RUET / SUST pattern", time: "2h" },
  { id: "e-mt-9", day: "2027-01-11", track: "engineering", phase: "model", action: "Final model test 9 · BUET special", marks: "Written · BUET 60×10=600", time: "3h" },
  { id: "e-mt-10", day: "2027-01-12", track: "engineering", phase: "model", action: "Final model test 10 · BUET special", marks: "Written · BUET 60×10=600", time: "3h" },
];

export const coachingExams: CoachingExam[] = [...VARSITY, ...ENGINEERING];
