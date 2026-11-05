import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isLiveFile } from "@/lib/crawl/gate";
import type { LiveFile } from "@/lib/crawl/types";

const PUBLISHED_LOG =
  "https://raw.githubusercontent.com/Imti420/kde_imti_add26/main/public/ops/live.json";

export const fetchPublishedLog = createServerFn({ method: "POST" }).handler(async (): Promise<LiveFile | null> => {
  // First attempt: direct local read in SSR/server environment
  try {
    const localPath = resolve(process.cwd(), "public/ops/live.json");
    const localContent = readFileSync(localPath, "utf8");
    const json = JSON.parse(localContent);
    if (isLiveFile(json)) return json;
  } catch {
    // Proceed to network fetch if local file not accessible
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(PUBLISHED_LOG, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
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
});
