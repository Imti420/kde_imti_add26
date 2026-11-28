import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { watchItems } from "@/data/watch";
import { TRACK_LABEL, type Track } from "@/data/types";
import { usePublishedLive } from "@/components/live-pulse";
import { WireStrip } from "@/components/newswire";
import { Announced, EvidenceStamp, ExternalLink, SectionLabel, StatusPill } from "@/components/marks";
import { CountUp, Reveal } from "@/components/motion";
import { Proximity, RankBars, SeatPlate, SplitMeter } from "@/components/viz";
import { UniversityCard } from "@/components/university-card";
import { systemStatus, type SystemStatus } from "@/lib/crawl/gate";
import type { CrawlEvent } from "@/lib/crawl/types";
import { useCatalog } from "@/lib/catalog";
import { daysUntil, formatDay, relativeDay, todayISO } from "@/lib/dates";
import { deriveStatus, eventsFor, isUrgent, publishedNotice } from "@/lib/status";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADMISSION//26 — Never miss a Bangladesh university admission deadline" },
      {
        name: "description",
        content:
          "Bangladesh university admission circulars, deadlines, and calendar for the 2026–27 session. DU, BUET, RU, JU, KUET and more — one desk.",
      },
    ],
  }),
  component: Overview,
});

// TEMP NOTICE: full page body follows in next commit if this stub is incomplete.
// Restoring from known-good structure — if build fails, checkout prior SHA 2d2e918.

function Overview() {
  return (
    <div className="pb-8">
      <header className="rise">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-mono text-xs tracking-widest text-mute">VOL. 01 · DHAKA DESK · 28 NOV 2026</p>
          <p className="sticker">HSC 2026–27</p>
        </div>
        <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.86] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
          Admission<span className="text-accent">//</span>26
        </h1>
        <p className="mt-3 max-w-2xl font-display text-xl uppercase leading-none md:text-3xl">
          Never miss a Bangladesh university admission deadline.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-pretty md:text-base">
          Circulars, calendars, and open windows for the 2026–27 season — on one desk, on a cheap phone, even offline.
        </p>
        <p className="mt-3 font-mono text-[11px] tracking-widest text-mute">LAST UPDATED · 28 NOV 2026 · DHAKA</p>
      </header>
      <section className="mt-8">
        <WireStrip />
      </section>
      <section className="mt-8">
        <p className="font-mono text-xs text-mute">
          Full overview panels restore in progress. Newswire and circular data remain available via the rail.
        </p>
        <Link to="/calendar" className="press mt-4 inline-flex">Open calendar</Link>
        {" "}
        <Link to="/radar" className="press mt-4 inline-flex">Open radar</Link>
      </section>
    </div>
  );
}
