import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type PdfJsModule = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { url: string; withCredentials?: boolean }) => {
    promise: Promise<{
      numPages: number;
      getPage: (n: number) => Promise<{
        getViewport: (opts: { scale: number }) => { width: number; height: number };
        render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
      }>;
    }>;
  };
};

async function loadPdfJs(): Promise<PdfJsModule> {
  // Lazy, out of the main bundle — CDN ESM. Agent 04 may later vendor worker under public/.
  const mod = (await import(
    /* @vite-ignore */
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs"
  )) as PdfJsModule;
  mod.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
  return mod;
}

function pageKey(circularId: string) {
  return `a26-pdf-page:${circularId}`;
}

export function PdfViewer({
  circularId,
  src,
  title,
}: {
  circularId: string;
  /** Same-origin mirror preferred; external original works with CORS luck. */
  src: string;
  title: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(() => {
    try {
      const raw = localStorage.getItem(pageKey(circularId));
      const n = raw ? Number(raw) : 1;
      return Number.isFinite(n) && n >= 1 ? n : 1;
    } catch {
      return 1;
    }
  });
  const [pageCount, setPageCount] = useState(0);
  const [scale, setScale] = useState(1.15);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mode, setMode] = useState<"canvas" | "object" | "gone">("canvas");
  const pdfRef = useRef<Awaited<ReturnType<PdfJsModule["getDocument"]>["promise"]> | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setProgress(0.05);
    setErrorMsg(null);
    setMode("canvas");

    (async () => {
      try {
        setProgress(0.15);
        const pdfjs = await loadPdfJs();
        if (cancelled) return;
        setProgress(0.35);
        const task = pdfjs.getDocument({ url: src });
        const pdf = await task.promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        setPage((p) => Math.min(Math.max(1, p), pdf.numPages));
        setProgress(0.7);
        setStatus("ready");
        setProgress(1);
      } catch (err) {
        if (cancelled) return;
        console.warn("[pdf-viewer] canvas path failed", err);
        setMode("object");
        setStatus("ready");
        setErrorMsg(err instanceof Error ? err.message : "Could not render with pdf.js");
      }
    })();

    return () => {
      cancelled = true;
      pdfRef.current = null;
    };
  }, [src]);

  const draw = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas || mode !== "canvas") return;
    try {
      const pg = await pdf.getPage(page);
      const viewport = pg.getViewport({ scale });
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await pg.render({ canvasContext: ctx, viewport }).promise;
    } catch (err) {
      console.warn("[pdf-viewer] page render failed", err);
      setMode("object");
    }
  }, [page, scale, mode]);

  useEffect(() => {
    if (status === "ready" && mode === "canvas") void draw();
  }, [status, mode, draw]);

  useEffect(() => {
    try {
      localStorage.setItem(pageKey(circularId), String(page));
    } catch {
      /* ignore */
    }
  }, [circularId, page]);

  // Pinch-zoom
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = { dist: Math.hypot(dx, dy), scale };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const next = Math.min(2.8, Math.max(0.7, pinchRef.current.scale * (dist / pinchRef.current.dist)));
        setScale(next);
      }
    };
    const onTouchEnd = () => {
      pinchRef.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scale]);

  const onDoubleTap = () => {
    setScale((s) => (s > 1.4 ? 1.15 : 2));
  };

  if (status === "loading") {
    return (
      <div className="pdf-stage border-[3px] border-ink bg-panel p-6" role="status">
        <p className="font-mono text-xs tracking-widest text-mute">LOADING CIRCULAR</p>
        <div className="mt-3 h-3 w-full border-[3px] border-ink bg-paper">
          <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <p className="mt-2 font-mono text-xs text-mute">{Math.round(progress * 100)}%</p>
      </div>
    );
  }

  if (mode === "object") {
    return (
      <div className="pdf-stage border-[3px] border-ink bg-paper">
        {errorMsg ? (
          <p className="border-b border-ink px-3 py-2 font-mono text-xs text-mute">CANVAS FALLBACK · {errorMsg}</p>
        ) : null}
        <object data={src} type="application/pdf" className="h-[min(80vh,720px)] w-full" title={title}>
          <iframe src={src} className="h-[min(80vh,720px)] w-full border-0" title={title} />
          <p className="p-4 font-mono text-sm">
            Cannot embed this PDF.{" "}
            <a href={src} className="underline" target="_blank" rel="noreferrer">
              Open original
            </a>
          </p>
        </object>
      </div>
    );
  }

  return (
    <div className="pdf-reader">
      <div className="pdf-toolbar sticky top-0 z-20 flex flex-wrap items-center gap-2 border-[3px] border-ink bg-paper px-2 py-2">
        <button type="button" className="press min-h-11 min-w-11 px-3" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          ←
        </button>
        <p className="font-mono text-xs tracking-widest">
          {page} / {pageCount || "—"}
        </p>
        <button
          type="button"
          className="press min-h-11 min-w-11 px-3"
          disabled={pageCount > 0 && page >= pageCount}
          onClick={() => setPage((p) => (pageCount ? Math.min(pageCount, p + 1) : p + 1))}
        >
          →
        </button>
        <span className="mx-1 h-6 w-px bg-ink/30" aria-hidden />
        <button type="button" className="press min-h-11 px-3 text-xs" onClick={() => setScale((s) => Math.max(0.7, s - 0.15))}>
          −
        </button>
        <button type="button" className="press min-h-11 px-3 text-xs" onClick={() => setScale(1.15)}>
          {Math.round(scale * 100)}%
        </button>
        <button type="button" className="press min-h-11 px-3 text-xs" onClick={() => setScale((s) => Math.min(2.8, s + 0.15))}>
          +
        </button>
      </div>

      <div
        ref={stageRef}
        className="pdf-stage mt-2 overflow-auto border-[3px] border-ink bg-panel touch-pan-y"
        onDoubleClick={onDoubleTap}
      >
        <canvas ref={canvasRef} className="mx-auto block max-w-none bg-paper" />
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-widest text-mute">PINCH OR DOUBLE-TAP TO ZOOM · PAGE REMEMBERED ON THIS DEVICE</p>
    </div>
  );
}
