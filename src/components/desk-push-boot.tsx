import { useEffect } from "react";
import {
  isPushEnabled,
  registerDeskWorker,
  runDeskAlertPass,
  shouldSoftPrompt,
} from "@/lib/desk-push";

/**
 * Runs on every shell mount: register SW if alerts are on, re-check news +
 * registration windows, and (once) soft-prompt via the settings path later.
 */
export function DeskPushBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isPushEnabled()) return;

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      void runDeskAlertPass();
    };

    void registerDeskWorker().then(() => {
      if (!cancelled) tick();
    });

    const interval = window.setInterval(tick, 5 * 60 * 1000);
    const onFocus = () => tick();
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);

    // Navigate when a notification is clicked and a client is focused
    const onMsg = (event: MessageEvent) => {
      const data = event.data;
      if (data?.type === "ALERT_CLICK" && typeof data.url === "string") {
        window.location.assign(data.url);
      }
    };
    navigator.serviceWorker?.addEventListener("message", onMsg);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      navigator.serviceWorker?.removeEventListener("message", onMsg);
    };
  }, []);

  // Soft prompt is opt-in from Settings — we only mark the flag if they never visited
  useEffect(() => {
    if (shouldSoftPrompt()) {
      // Do not auto-request permission (browser will block). Settings owns the ask.
    }
  }, []);

  return null;
}
