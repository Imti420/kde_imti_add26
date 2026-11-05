import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/components/motion";

export interface BarRow {
  id: string;
  label: string;
  value: number;
  hint?: string;
}

function useDraw() {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduced) {
      setOn(true);
      return;
    }
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);
  return on;
}

export function Plate({
  kicker,
  title,
  caption,
  children,
}: {
  kicker: string;
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section className="window flex h-full flex-col">
      <div className="window-bar">
        <span>{kicker}</span>
      </div>
      <div className="window-body flex flex-1 flex-col">
        <h3 className="font-display text-3xl font-bold uppercase leading-none">{title}</h3>
        {caption ? <p className="mt-2 text-sm text-pretty">{caption}</p> : null}
        <div className="mt-4 flex-1">{children}</div>
      </div>
    </section>
  );
}

export function RankBars({
  kicker,
  title,
  caption,
  rows,
  empty,
}: {
  kicker: string;
  title: string;
  caption: string;
  rows: BarRow[];
  empty: string;
}) {
  const on = useDraw();
  const visible = rows.filter((row) => row.value > 0);
  const max = Math.max(1, ...visible.map((row) => row.value));
  return (
    <Plate kicker={kicker} title={title} caption={caption}>
      {visible.length === 0 ? (
        <p className="border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute">{empty}</p>
      ) : (
        <ol>
          {visible.map((row) => {
            const pct = Math.max(4, Math.round((row.value / max) * 100));
            const peak = row.value === max;
            return (
              <li key={row.id} className="border-t border-ink py-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-semibold uppercase leading-none">{row.label}</span>
                  <span className="font-mono text-xs tabular-nums">{String(row.value).padStart(2, "0")}</span>
                </div>
                <div className="mt-1.5 h-2 border border-ink" aria-hidden>
                  <div
                    className={cn("h-full transition-[width] duration-700 ease-out", peak ? "bg-accent" : "bg-ink")}
                    style={{ width: on ? `${pct}%` : "0%" }}
                  />
                </div>
                {row.hint ? <p className="mt-1 font-mono text-xs text-mute">{row.hint}</p> : null}
              </li>
            );
          })}
        </ol>
      )}
    </Plate>
  );
}

export function SplitMeter({
  kicker,
  title,
  caption,
  parts,
  empty,
}: {
  kicker: string;
  title: string;
  caption: string;
  parts: { id: string; label: string; value: number; tone: "ink" | "accent" | "mute" | "panel" }[];
  empty: string;
}) {
  const on = useDraw();
  const total = parts.reduce((sum, part) => sum + part.value, 0);
  return (
    <Plate kicker={kicker} title={title} caption={caption}>
      {total === 0 ? (
        <p className="border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute">{empty}</p>
      ) : (
        <>
          <div className="flex h-8 border border-ink" aria-hidden>
            {parts
              .filter((part) => part.value > 0)
              .map((part) => (
                <div
                  key={part.id}
                  className={cn(
                    "h-full border-r border-paper transition-[width] duration-700 ease-out last:border-r-0",
                    part.tone === "accent" && "bg-accent",
                    part.tone === "ink" && "bg-ink",
                    part.tone === "mute" && "bg-mute",
                    part.tone === "panel" && "bg-panel",
                  )}
                  style={{ width: on ? `${(part.value / total) * 100}%` : "0%" }}
                />
              ))}
          </div>
          <ul className="mt-3 space-y-1">
            {parts.map((part) => (
              <li key={part.id} className="flex items-baseline justify-between gap-3 font-mono text-xs">
                <span className="tracking-widest">{part.label}</span>
                <span className="tabular-nums">
                  {String(part.value).padStart(2, "0")}
                  <span className="text-mute"> · {total ? Math.round((part.value / total) * 100) : 0}%</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Plate>
  );
}

export function Proximity({
  kicker,
  title,
  caption,
  rows,
  empty,
}: {
  kicker: string;
  title: string;
  caption: string;
  rows: { id: string; label: string; meta: string; days: number; hot: boolean }[];
  empty: string;
}) {
  const on = useDraw();
  const max = Math.max(1, ...rows.map((row) => row.days), 1);
  return (
    <Plate kicker={kicker} title={title} caption={caption}>
      {rows.length === 0 ? (
        <p className="border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute">{empty}</p>
      ) : (
        <ol>
          {rows.map((row) => {
            const pct = Math.max(8, Math.round((1 - row.days / max) * 100));
            return (
              <li key={row.id} className="border-t border-ink py-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-xl font-bold uppercase leading-none">{row.label}</span>
                  <span className={cn("font-mono text-xs", row.hot ? "text-accent" : "text-mute")}>{row.meta}</span>
                </div>
                <div className="mt-1.5 h-1.5 border border-ink" aria-hidden>
                  <div
                    className={cn("h-full transition-[width] duration-700 ease-out", row.hot ? "bg-accent" : "bg-ink")}
                    style={{ width: on ? `${pct}%` : "0%" }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </Plate>
  );
}

export function SeatPlate({
  known,
  missing,
  rows,
}: {
  known: number;
  missing: number;
  rows: { id: string; label: string; seats: number }[];
}) {
  if (known === 0) {
    return (
      <Plate
        kicker="Seats · not estimated"
        title="No verified seat count"
        caption={`${missing} circular${missing === 1 ? "" : "s"} on file. None record a seat total. A distribution would be fiction, so the plate stays empty.`}
      >
        <p className="font-display text-7xl font-bold leading-none text-mute">—</p>
        <p className="mt-3 font-mono text-xs tracking-widest text-mute">NOT ON FILE · NOT GUESSED</p>
      </Plate>
    );
  }
  return (
    <RankBars
      kicker="Seats · verified only"
      title="Where seats are on file"
      caption={`${known} circular${known === 1 ? "" : "s"} name a seat total. ${missing} still do not, and they are left off this chart.`}
      empty="NO VERIFIED SEAT COUNT."
      rows={rows.map((row) => ({ id: row.id, label: row.label, value: row.seats }))}
    />
  );
}
