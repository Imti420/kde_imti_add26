import { useCallback, useEffect, useRef, useState } from "react";
import { isWireLive } from "@/lib/wire/gate";
import { fetchPublishedWire } from "@/lib/wire/published";
import type { WireLive } from "@/lib/wire/types";

async function pullLocal(): Promise<WireLive | null> {
  try {
    const response = await fetch(`/wire/live.json?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    const json: unknown = await response.json();
    return isWireLive(json) ? json : null;
  } catch {
    return null;
  }
}

function newer(left: WireLive | null, right: WireLive | null): WireLive | null {
  if (!left) return right;
  if (!right) return left;
  const a = Date.parse(left.generatedAt ?? "") || 0;
  const b = Date.parse(right.generatedAt ?? "") || 0;
  return b > a ? right : left;
}

export function useWire() {
  const [live, setLive] = useState<WireLive | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "missing">("loading");
  const [seenAt, setSeenAt] = useState<Date | null>(null);
  const [arrivedAt, setArrivedAt] = useState<number | null>(null);
  const [freshIds, setFreshIds] = useState<string[]>([]);
  const [reloadNote, setReloadNote] = useState<string | null>(null);
  const [reloading, setReloading] = useState(false);
  const liveRef = useRef<WireLive | null>(null);
  const seenIds = useRef<Set<string>>(new Set());
  const booted = useRef(false);
  const lastReload = useRef(0);

  const load = useCallback(async (manual: boolean) => {
    if (manual) {
      const nowMs = Date.now();
      if (nowMs - lastReload.current < 20_000) {
        setReloadNote("Reload is limited to once every 20 seconds. The file was not read again.");
        return;
      }
      lastReload.current = nowMs;
      setReloading(true);
    }
    const before = liveRef.current?.generatedAt ?? null;
    const local = await pullLocal();
    let remote: WireLive | null = null;
    try {
      remote = await fetchPublishedWire();
    } catch {
      remote = null;
    }
    const next = newer(local, remote);
    setSeenAt(new Date());
    if (!next) {
      setPhase((current) => (current === "ready" ? "ready" : "missing"));
      if (manual) {
        setReloadNote("No wire file came back. This was not a refresh.");
        setReloading(false);
      }
      return;
    }
    const ids = next.items.map((item) => item.id);
    if (booted.current) setFreshIds(ids.filter((id) => !seenIds.current.has(id)));
    else {
      booted.current = true;
      setFreshIds([]);
    }
    for (const id of ids) seenIds.current.add(id);
    if (before != null && next.generatedAt !== before) setArrivedAt(Date.now());
    liveRef.current = next;
    setLive(next);
    setPhase("ready");
    if (manual) {
      setReloadNote(next.generatedAt === before ? "No newer wire. The published file is unchanged." : "A newer published wire arrived.");
      setReloading(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
    const poll = window.setInterval(() => void load(false), 60_000);
    return () => window.clearInterval(poll);
  }, [load]);

  useEffect(() => {
    if (!arrivedAt) return;
    const timer = window.setTimeout(() => setArrivedAt(null), 8000);
    return () => window.clearTimeout(timer);
  }, [arrivedAt]);

  return {
    live,
    phase,
    seenAt,
    arrivedAt,
    freshIds,
    reloadNote,
    reloading,
    reload: () => void load(true),
  };
}
