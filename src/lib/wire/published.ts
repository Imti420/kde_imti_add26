import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isWireLive } from "@/lib/wire/gate";
import type { WireLive } from "@/lib/wire/types";

const PUBLISHED_WIRE = "https://raw.githubusercontent.com/Imti420/kde_imti_add26/main/public/wire/live.json";

async function readRemote(): Promise<WireLive | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${PUBLISHED_WIRE}?t=${Date.now()}`, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        accept: "application/json",
        "cache-control": "no-cache",
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
}

function readLocal(): WireLive | null {
  try {
    const localPath = resolve(process.cwd(), "public/wire/live.json");
    const json: unknown = JSON.parse(readFileSync(localPath, "utf8"));
    return isWireLive(json) ? json : null;
  } catch {
    return null;
  }
}

export const fetchPublishedWire = createServerFn({ method: "POST" }).handler(async (): Promise<WireLive | null> => {
  const remote = await readRemote();
  if (remote) return remote;
  return readLocal();
});
