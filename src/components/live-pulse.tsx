import { useEffect, useState } from "react";
import { isLiveFile } from "@/lib/crawl/gate";
import type { LiveFile } from "@/lib/crawl/types";

export function usePublishedLive() {
  const [live, setLive] = useState<LiveFile | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const response = await fetch(`/ops/live.json?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error("missing");
        const json: unknown = await response.json();
        if (!isLiveFile(json)) throw new Error("shape");
        if (!stop) {
          setLive(json);
          setPhase("ready");
        }
      } catch {
        if (!stop) setPhase((current) => (current === "ready" ? "ready" : "missing"));
      }
    };
    void load();
    const poll = window.setInterval(() => void load(), 60_000);
    return () => {
      stop = true;
      window.clearInterval(poll);
    };
  }, []);

  return { live, phase };
}
