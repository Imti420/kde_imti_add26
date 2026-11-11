import { Link, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ExternalLink } from "@/components/marks";
import { circularDocState, circularPdfHref, useCatalog } from "@/lib/catalog";
import { formatDay } from "@/lib/dates";

const PdfViewer = lazy(() =>
  import("@/components/pdf-viewer").then((m) => ({ default: m.PdfViewer })),
);

export const Route = createFileRoute("/circulars/$id/pdf")({
  head: () => ({ meta: [{ title: "Circular PDF — ADMISSION//26" }] }),
  component: CircularPdfPage,
});

function CircularPdfPage() {
  const { id } = Route.useParams();
  const { circulars, byId } = useCatalog();
  const circular = circulars.find((item) => item.id === id);
  if (!circular) {
    return (
      <div className="p-4">
        <h1 className="font-display text-4xl font-bold uppercase">Circular not on file</h1>
        <Link to="/circulars" className="mt-4 inline-block font-mono text-sm underline">
          Back to the archive
        </Link>
      </div>
    );
  }

  const uni = byId.get(circular.universityId);
  const state = circularDocState(circular);
  const href = circularPdfHref(circular);
  const original = circular.doc?.originalUrl ?? circular.pdfUrl;
  const mirror = circular.doc?.mirrorPath ?? null;
  const fetchedAt = circular.doc?.fetchedAt ?? null;
  const officialHost = circular.doc?.officialHost;

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 px-1 py-2 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/circulars/$id"
            params={{ id: circular.id }}
            className="press min-h-11 px-3 font-mono text-xs tracking-widest"
          >
            ← BACK
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[10px] tracking-widest text-mute">
              {uni?.shortName ?? circular.universityId} · {circular.session}
            </p>
            <h1 className="truncate font-display text-lg font-bold uppercase leading-none sm:text-xl">{circular.title}</h1>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {original ? (
            <a href={original} target="_blank" rel="noreferrer" className="press min-h-11 px-3 font-mono text-[10px] tracking-widest">
              OPEN ORIGINAL
            </a>
          ) : null}
          {href ? (
            <a href={href} download className="press min-h-11 px-3 font-mono text-[10px] tracking-widest">
              DOWNLOAD
            </a>
          ) : null}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && href ? (
            <button
              type="button"
              className="press min-h-11 px-3 font-mono text-[10px] tracking-widest"
              onClick={() => {
                void navigator.share({ title: circular.title, url: href }).catch(() => undefined);
              }}
            >
              SHARE
            </button>
          ) : null}
        </div>
      </header>

      {state === "none" || !href ? (
        <div className="mt-6 border-[3px] border-ink border-dashed p-6">
          <p className="font-mono text-xs tracking-widest text-accent">NO PDF PUBLISHED</p>
          <p className="mt-3 max-w-xl text-sm text-pretty">
            This desk does not have an official PDF for this circular. Empty is honest — we do not invent documents.
          </p>
          {uni?.admissionUrl ? (
            <p className="mt-4 font-mono text-xs">
              <ExternalLink href={uni.admissionUrl}>Open university portal</ExternalLink>
            </p>
          ) : null}
        </div>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest text-mute">
            {mirror ? (
              <span className="border border-ink bg-panel px-2 py-1 text-ink">
                ARCHIVED COPY{fetchedAt ? ` · fetched ${formatDay(fetchedAt.slice(0, 10))}` : ""}
              </span>
            ) : (
              <span className="border border-ink px-2 py-1">ORIGINAL LINK · NOT MIRRORED YET</span>
            )}
            {officialHost === true ? (
              <span className="border border-ink px-2 py-1">OFFICIAL HOST ✓</span>
            ) : officialHost === false ? (
              <span className="border border-ink px-2 py-1">OFFICIAL HOST ✗</span>
            ) : null}
          </div>

          <div className="mt-3">
            <Suspense
              fallback={
                <div className="border-[3px] border-ink bg-panel p-6">
                  <p className="font-mono text-xs tracking-widest text-mute">LOADING READER</p>
                </div>
              }
            >
              <PdfViewer circularId={circular.id} src={href} title={circular.title} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
