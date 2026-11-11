import { Link, createFileRoute } from "@tanstack/react-router";
import { useCatalog } from "@/lib/catalog";
import { circularDocState, circularPdfHref } from "@/lib/catalog";

/**
 * In-app PDF reader shell — Agent 05 fills the viewer (lazy pdfjs-dist).
 * Route exists so deep-links and CTAs can target /circulars/$id/pdf without 404.
 */
export const Route = createFileRoute("/circulars/$id/pdf")({
  head: () => ({ meta: [{ title: "Circular PDF — ADMISSION//26" }] }),
  component: CircularPdfShell,
});

function CircularPdfShell() {
  const { id } = Route.useParams();
  const { circulars, byId } = useCatalog();
  const circular = circulars.find((item) => item.id === id);
  if (!circular) {
    return (
      <div className="p-4">
        <h1 className="font-display text-3xl font-bold uppercase">Circular not on file</h1>
        <Link to="/circulars" className="mt-4 inline-block font-mono text-sm underline">
          Back to archive
        </Link>
      </div>
    );
  }
  const uni = byId.get(circular.universityId);
  const state = circularDocState(circular);
  const href = circularPdfHref(circular);

  return (
    <article className="flex min-h-[50vh] flex-col">
      <p className="font-mono text-xs tracking-widest text-mute">
        <Link to="/circulars/$id" params={{ id }} className="underline underline-offset-4">
          CIRCULAR
        </Link>
        {" / PDF"}
        {uni ? ` · ${uni.shortName}` : null}
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase leading-tight md:text-4xl">
        {circular.title}
      </h1>
      <p className="mt-2 font-mono text-xs tracking-widest text-mute">
        {state === "mirrored"
          ? "ARCHIVED COPY · SAME ORIGIN"
          : state === "original-only"
            ? "OFFICIAL LINK ONLY · NOT MIRRORED"
            : "NO PDF PUBLISHED"}
      </p>
      {/* Agent 05: mount lazy PdfReader here when state !== "none" */}
      <div className="mt-8 flex flex-1 flex-col items-center justify-center border border-dashed border-ink/40 p-8 text-center">
        <p className="font-mono text-sm text-mute">READER SHELL — Agent 05 fills</p>
        {href ? (
          <a
            href={href}
            target={state === "mirrored" ? undefined : "_blank"}
            rel={state === "mirrored" ? undefined : "noreferrer"}
            className="mt-4 font-mono text-xs tracking-widest underline"
          >
            {state === "mirrored" ? "OPEN LOCAL COPY" : "OPEN OFFICIAL PDF"}
          </a>
        ) : null}
      </div>
    </article>
  );
}
