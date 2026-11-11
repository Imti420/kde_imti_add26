#!/usr/bin/env node
/**
 * ADMISSION//26 — optimize a university mark (logo) for public/marks/
 *
 * Usage:
 *   node scripts/optimize-mark.mjs <universityId> <inputImagePath>
 *
 * Writes public/marks/<universityId>.webp ≤ 30 KB when possible.
 * Prints a mark JSON fragment for Agent 03. Does not invent logos.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const MAX = 30 * 1024;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "marks");

const id = process.argv[2];
const input = process.argv[3];
if (!id || !input) {
  console.error(JSON.stringify({ ok: false, errorClass: "missing-args", message: "Usage: optimize-mark <universityId> <input>" }));
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const src = resolve(input);
if (!existsSync(src)) {
  console.error(JSON.stringify({ ok: false, errorClass: "http-error", message: `Missing file ${src}` }));
  process.exit(1);
}

const out = join(outDir, `${id}.webp`);
const ext = extname(src).toLowerCase();

if (ext === ".svg") {
  // Pass through SVG as-is if small; otherwise leave for Agent 03 to decide
  const raw = readFileSync(src);
  if (raw.byteLength <= MAX) {
    const svgOut = join(outDir, `${id}.svg`);
    writeFileSync(svgOut, raw);
    console.log(JSON.stringify({ ok: true, mark: { kind: "logo", path: `/marks/${id}.svg`, sourceUrl: null }, bytes: raw.byteLength }, null, 2));
    process.exit(0);
  }
}

try {
  const sharp = (await import("sharp")).default;
  let quality = 80;
  let buf = await sharp(src).resize({ width: 256, height: 256, fit: "inside", withoutEnlargement: true }).webp({ quality }).toBuffer();
  while (buf.byteLength > MAX && quality > 35) {
    quality -= 10;
    buf = await sharp(src).resize({ width: 192, height: 192, fit: "inside", withoutEnlargement: true }).webp({ quality }).toBuffer();
  }
  writeFileSync(out, buf);
  console.log(
    JSON.stringify(
      {
        ok: true,
        mark: { kind: "logo", path: `/marks/${id}.webp`, sourceUrl: null },
        bytes: buf.byteLength,
        note: "Agent 03 must set sourceUrl to the official logo origin when known.",
      },
      null,
      2,
    ),
  );
} catch (err) {
  const conv = spawnSync("convert", [src, "-resize", "256x256>", "-quality", "75", out], { encoding: "utf8" });
  if (conv.status !== 0) {
    console.error(JSON.stringify({ ok: false, errorClass: "tool-error", message: err instanceof Error ? err.message : String(err) }));
    process.exit(1);
  }
  const bytes = readFileSync(out).byteLength;
  console.log(JSON.stringify({ ok: true, mark: { kind: "logo", path: `/marks/${id}.webp`, sourceUrl: null }, bytes }, null, 2));
}
