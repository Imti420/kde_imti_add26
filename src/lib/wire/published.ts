import { createServerFn } from "@tanstack/react-start";
import { isWireLive } from "@/lib/wire/gate";
import type { WireLive } from "@/lib/wire/types";

const PUBLISHED_WIRE = "https://raw.githubusercontent.com/Imti420/IMTI_ADD26/main/public/wire/live.json";

export const fetchPublishedWire = createServerFn({ method: "POST" }).handler(async (): Promise<WireLive | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(PUBLISHED_WIRE, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
        "user-agent": "ADMISSION26-newswire/1.0",
      },
    });
    if (!response.ok) return null;
    const json: unknown = await response.json();
    return isWireLive(json) ? json : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
});
