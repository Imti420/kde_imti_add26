import type { Circular, CircularDocState, University, UniversityMark } from "@/data/types";

/**
 * Pure document helpers — no React, no store, no catalog cycle.
 * Keep UI imports on this file so university cards never depend on catalog init order.
 */

export function circularDocState(c: Circular | null | undefined): CircularDocState {
  if (!c) return "none";
  if (c.doc?.mirrorPath) return "mirrored";
  if (c.doc?.originalUrl || c.pdfUrl) return "original-only";
  return "none";
}

export function circularPdfHref(c: Circular | null | undefined): string | null {
  if (!c) return null;
  if (c.doc?.mirrorPath) return c.doc.mirrorPath;
  if (c.doc?.originalUrl) return c.doc.originalUrl;
  return c.pdfUrl ?? null;
}

export function circularThumbPath(c: Circular | null | undefined): string | null {
  return c?.doc?.thumbPath ?? null;
}

export function universityMark(u: University | null | undefined): UniversityMark | null {
  return u?.mark ?? null;
}
