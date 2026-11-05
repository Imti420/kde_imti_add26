import { useEffect, useRef, useState } from "react";

const KEY = "a26-imti-intro";
const LINE_A = "THIS WAS MADE BY IMTI,";
const LINE_B_HEAD = "HE SPELEED EVERY THING HERE JUST CURRECTLY CUZ HE IS A ";
const LINE_B_TAIL = "GENIOUS";

export function IntroSequence() {
  const [phase, setPhase] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const reducedRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);

  const clearTimers = () => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  };

  const finish = (immediate = false) => {
    clearTimers();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked — still leave the desk */
    }
    if (immediate || reducedRef.current) {
      setPhase(6);
      return;
    }
    setPhase(5);
    timers.current.push(window.setTimeout(() => setPhase(6), 520));
  };

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reducedRef.current ? 4 : 0);

    const plan: [number, number][] = reducedRef.current
      ? [
          [1700, 5],
          [2100, 6],
        ]
      : [
          [280, 1],
          [720, 2],
          [1400, 3],
          [2200, 4],
          [4000, 5],
          [4600, 6],
        ];

    for (const [at, next] of plan) {
      timers.current.push(
        window.setTimeout(() => {
          setPhase((current) => (current == null || current >= 6 ? current : next));
        }, at),
      );
    }

    const frame = window.requestAnimationFrame(() => skipRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (phase == null || phase >= 6) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase == null || phase >= 6) return null;

  const showRule = phase >= 1;
  const showMark = phase >= 2;
  const showLineA = phase >= 3;
  const showLineB = phase >= 4;
  const exiting = phase >= 5;

  return (
    <div
      className={`fixed inset-0 z-[70] bg-rail text-railfg transition-opacity duration-500 ${exiting ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="dialog"
      aria-label="Opening title"
    >
      <button
        ref={skipRef}
        type="button"
        onClick={() => finish(false)}
        className="absolute top-4 right-4 z-[71] h-11 rounded-xl border-[3px] border-railfg px-3 font-mono text-xs tracking-widest text-railfg hover:bg-railfg hover:text-onyellow"
      >
        SKIP
      </button>
      <div className="flex h-full items-center justify-center px-5">
        <div className="relative w-full max-w-3xl">
          <div className="pointer-events-none absolute -top-4 right-0 left-0 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 origin-left bg-accent transition-transform duration-700" style={{ transform: showRule ? "scaleX(1)" : "scaleX(0)" }} />
            <span className="h-2 w-2 bg-accent" />
          </div>
          <p className={`font-mono text-xs tracking-widest text-railfg/70 transition-opacity duration-300 ${showMark ? "opacity-100" : "opacity-0"}`}>
            VOL. 01 · DHAKA DESK · SESSION 2026–27
          </p>
          <p
            className={`mt-3 font-display text-6xl font-bold uppercase leading-none tracking-tight transition-all duration-500 sm:text-8xl ${showMark ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            Admission<span className="text-accent">//</span>26
          </p>
          <div className={`mt-8 border-[3px] border-railfg/50 p-4 transition-opacity duration-500 sm:p-6 ${showLineA ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs tracking-widest text-accent">FILE NOTE · NOT A CIRCULAR</p>
              <span className="hidden h-px w-16 bg-railfg/40 sm:block" aria-hidden />
            </div>
            <p className="mt-4 font-display text-3xl font-bold uppercase leading-none text-balance sm:text-5xl">{LINE_A}</p>
            <p
              className={`mt-4 max-w-full font-mono text-sm leading-relaxed tracking-wide text-pretty transition-opacity duration-500 sm:text-lg ${showLineB ? "opacity-100" : "opacity-0"}`}
            >
              {LINE_B_HEAD}
              <span className="text-accent underline decoration-2 underline-offset-4">{LINE_B_TAIL}</span>
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-railfg/50" />
            <span className="font-mono text-xs tracking-widest text-railfg/60">ESC SKIPS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
