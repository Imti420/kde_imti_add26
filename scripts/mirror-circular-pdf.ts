#!/usr/bin/env node
/**
 * ADMISSION//26 — mirror an official circular PDF into public/circulars/
 *
 * Usage:
 *   npm run mirror:pdf -- <circularId> <officialUrl>
 *   npm run mirror:pdf -- c-kuet https://admission.kuet.ac.bd/.../circular.pdf
 *   npm run mirror:pdf -- --file c-test /path/to/local.pdf   (pipeline test)
 *
 * Prints a `doc` JSON block for Agent 03 to paste into circulars.ts.
 * Does NOT edit circulars.ts.
 *
 * Error classes (exit 1): not-pdf | too-large | http-error | timeout | missing-args | tool-error
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 5 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 45_000;
const THUMB_MAX_WIDTH = 480;
const THUMB_MAX_BYTES = 60 * 1024;

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "circulars");

type FailClass = "not-pdf" | "too-large" | "http-error" | "timeout" | "missing-args" | "tool-error";

function fail(cls: FailClass, message: string): never {
  console.error(JSON.stringify({ ok: false, errorClass: cls, message }));
  process.exit(1);
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  if (args[0] === "--file") {
    const id = args[1];
    const file = args[2];
    if (!id || !file) fail("missing-args", "Usage: --file <circularId> <local.pdf>");
    return { mode: "file" as const, id, source: resolve(file), originalUrl: `file://${resolve(file)}` };
  }
  const id = args[0];
  const url = args[1];
  if (!id || !url) fail("missing-args", "Usage: npm run mirror:pdf -- <circularId> <officialUrl>");
  if (!/^https?:\/\//i.test(url)) fail("missing-args", "officialUrl must be http(s)");
  return { mode: "url" as const, id, source: url, originalUrl: url };
}

function isPdfMagic(buf: Buffer): boolean {
  if (buf.length < 5) return false;
  return buf.subarray(0, 5).toString("utf8") === "%PDF-";
}

async function download(url: string): Promise<Buffer> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ADMISSION26-mirror/1.0; +https://github.com/Imti420/kde_imti_add26)",
        accept: "application/pdf,*/*",
      },
    });
    if (!res.ok) fail("http-error", `HTTP ${res.status} fetching ${url}`);
    const len = Number(res.headers.get("content-length") ?? "0");
    if (len > MAX_BYTES) fail("too-large", `Content-Length ${len} exceeds ${MAX_BYTES} byte budget`);
    const ab = await res.arrayBuffer();
    const buf = Buffer.from(ab);
    if (buf.byteLength > MAX_BYTES) fail("too-large", `Downloaded ${buf.byteLength} bytes exceeds ${MAX_BYTES} budget`);
    return buf;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") fail("timeout", `Fetch timed out after ${FETCH_TIMEOUT_MS}ms`);
    const msg = err instanceof Error ? err.message : String(err);
    fail("http-error", msg);
  } finally {
    clearTimeout(timer);
  }
}

function pageCount(pdfPath: string): number | null {
  const info = spawnSync("pdfinfo", [pdfPath], { encoding: "utf8" });
  if (info.status !== 0) return null;
  const m = /Pages:\s+(\d+)/.exec(info.stdout || "");
  return m ? Number(m[1]) : null;
}

async function makeThumb(pdfPath: string, webpPath: string): Promise<void> {
  const tmpPng = pdfPath.replace(/\.pdf$/i, ".page1.png");
  try {
    const ppm = spawnSync(
      "pdftoppm",
      ["-png", "-f", "1", "-l", "1", "-singlefile", "-r", "96", pdfPath, pdfPath.replace(/\.pdf$/i, ".page1")],
      { encoding: "utf8" },
    );
    if (ppm.status !== 0 || !existsSync(tmpPng)) {
      fail("tool-error", `pdftoppm failed: ${ppm.stderr || ppm.stdout || "no page-1 png"}`);
    }
    // sharp preferred; ImageMagick fallback
    try {
      const sharp = (await import("sharp")).default;
      let quality = 72;
      let buf = await sharp(tmpPng).resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true }).webp({ quality }).toBuffer();
      while (buf.byteLength > THUMB_MAX_BYTES && quality > 40) {
        quality -= 8;
        buf = await sharp(tmpPng).resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true }).webp({ quality }).toBuffer();
      }
      if (buf.byteLength > THUMB_MAX_BYTES) {
        buf = await sharp(tmpPng)
          .resize({ width: Math.floor(THUMB_MAX_WIDTH * 0.75), withoutEnlargement: true })
          .webp({ quality: 55 })
          .toBuffer();
      }
      writeFileSync(webpPath, buf);
    } catch {
      const conv = spawnSync(
        "convert",
        [tmpPng, "-resize", `${THUMB_MAX_WIDTH}x>`, "-quality", "70", webpPath],
        { encoding: "utf8" },
      );
      if (conv.status !== 0 || !existsSync(webpPath)) {
        fail("tool-error", `thumbnail encode failed: ${conv.stderr || "convert/sharp missing"}`);
      }
    }
  } finally {
    if (existsSync(tmpPng)) unlinkSync(tmpPng);
  }
}

function officialHost(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.endsWith(".ac.bd") || host.endsWith(".gov.bd") || host.endsWith(".edu.bd")) return true;
    if (host.includes("ugc.gov") || host.includes("dghs.gov") || host.includes("dgme")) return true;
    return false;
  } catch {
    return false;
  }
}

async function main() {
  const { id, source, originalUrl, mode } = parseArgs(process.argv);
  if (!/^[a-z0-9][a-z0-9._-]{0,63}$/i.test(id)) {
    fail("missing-args", "circularId must be a simple slug (e.g. c-kuet)");
  }

  mkdirSync(outDir, { recursive: true });
  const pdfPath = join(outDir, `${id}.pdf`);
  const webpPath = join(outDir, `${id}.webp`);

  let bytes: Buffer;
  if (mode === "file") {
    try {
      bytes = readFileSync(source);
    } catch (err) {
      fail("http-error", `Cannot read file: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (bytes.byteLength > MAX_BYTES) fail("too-large", `File ${bytes.byteLength} exceeds ${MAX_BYTES} budget`);
  } else {
    bytes = await download(source);
  }

  if (!isPdfMagic(bytes)) fail("not-pdf", "Body does not start with %PDF- magic bytes");

  writeFileSync(pdfPath, bytes);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  const pages = pageCount(pdfPath);
  await makeThumb(pdfPath, webpPath);

  const thumbStat = existsSync(webpPath) ? readFileSync(webpPath).byteLength : null;
  const fetchedAt = new Date().toISOString();
  const mirrorPath = `/circulars/${id}.pdf`;
  const thumbPath = `/circulars/${id}.webp`;

  const doc = {
    originalUrl,
    mirrorPath,
    thumbPath,
    pages,
    bytes: bytes.byteLength,
    sha256,
    fetchedAt,
    officialHost: mode === "url" ? officialHost(originalUrl) : false,
  };

  console.log(
    JSON.stringify(
      {
        ok: true,
        circularId: id,
        doc,
        thumbBytes: thumbStat,
        note: "Paste doc into Circular.doc (Agent 03). Keep pdfUrl as originalUrl for back-compat if needed.",
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  fail("tool-error", err instanceof Error ? err.message : String(err));
});
