import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function CountUp({ value, pad = 2 }: { value: number; pad?: number }) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start == null) start = now;
      const p = Math.min(1, (now - start) / 780);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, value]);

  return <span className="tabular-nums">{String(display).padStart(pad, "0")}</span>;
}

export function Reveal({
  index = 0,
  className,
  children,
  style,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const delay = Math.min(index, 12) * 50;
  return (
    <div className={cn(index < 12 ? "rise" : undefined, className)} style={{ ...style, animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
