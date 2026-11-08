import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isLiveFile } from "@/lib/crawl/gate";
import type { LiveFile } from "@/lib/crawl/types";

const PUBLISHED_LOG = "https://raw.githubusercontent.com/Imti420/kde_imti_add26/main/public/ops/live.json";

async function readRemote(): Promise<LiveFile | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${PUBLISHED_LOG}?t=${Date.now()}`, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        accept: "application/json",
        "cache-control": "no-cache",
        "user-agent": "ADMISSION26-discovery/1.0",
      },
    });
    if (!response.ok) return null;
    const json: unknown = await response.json();
    return isLiveFile(json) ? json : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function readLocal(): LiveFile | null {
  try {
    const localPath = resolve(process.cwd(), "public/ops/live.json");
    const json: unknown = JSON.parse(readFileSync(localPath, "utf8"));
    return isLiveFile(json) ? json : null;
  } catch {
    return null;
  }
}

export const fetchPublishedLog = createServerFn({ method: "POST" }).handler(async (): Promise<LiveFile | null> => {
  // Deployed builds freeze public/ops/live.json. Prefer the GitHub copy the crawler commits between deploys.
  const remote = await readRemote();
  if (remote) return remote;
  return readLocal();
});
