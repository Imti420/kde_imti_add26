/**
 * Data invariants for mirrored circular docs and university marks.
 * Runs under: node --experimental-strip-types --test src/lib/doc-invariants.test.ts
 *
 * Soft while assets are sparse: only asserts structure when doc/mark present.
 * Agent 06 may harden once public/circulars and public/marks are populated.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { seedCirculars } from "../data/circulars.ts";
import { seedUniversities, seedSystems } from "../data/universities.ts";
import {
  DOC_PDF_MAX_BYTES,
  DOC_THUMB_MAX_BYTES,
  MARK_MAX_BYTES,
  type Circular,
  type University,
} from "../data/types.ts";

const root = join(import.meta.dirname, "../..");

function publicPath(webPath: string): string {
  // webPath like "/circulars/c-kuet.pdf"
  return join(root, "public", webPath.replace(/^\//, ""));
}

describe("circular.doc invariants", () => {
  for (const c of seedCirculars as Circular[]) {
    it(`${c.id}: doc shape is valid or absent`, () => {
      if (!c.doc) {
        // pdfUrl alone is still allowed as original-only back-compat
        return;
      }
      assert.ok(c.doc.originalUrl, "doc.originalUrl required when doc present");
      assert.equal(typeof c.doc.officialHost, "boolean");
      if (c.doc.mirrorPath) {
        assert.match(c.doc.mirrorPath, /^\/circulars\/.+\.pdf$/i);
        const abs = publicPath(c.doc.mirrorPath);
        if (existsSync(abs)) {
          const buf = readFileSync(abs);
          assert.ok(buf.byteLength <= DOC_PDF_MAX_BYTES, `${c.id} PDF over budget`);
          if (c.doc.bytes != null) {
            assert.equal(c.doc.bytes, buf.byteLength, `${c.id} bytes mismatch`);
          }
          if (c.doc.sha256) {
            const hash = createHash("sha256").update(buf).digest("hex");
            assert.equal(c.doc.sha256, hash, `${c.id} sha256 mismatch`);
          }
        }
      }
      if (c.doc.thumbPath) {
        assert.match(c.doc.thumbPath, /^\/circulars\/.+\.webp$/i);
        const abs = publicPath(c.doc.thumbPath);
        if (existsSync(abs)) {
          const buf = readFileSync(abs);
          assert.ok(buf.byteLength <= DOC_THUMB_MAX_BYTES, `${c.id} thumb over budget`);
        }
      }
    });
  }
});

describe("university.mark invariants", () => {
  const all = [...(seedUniversities as University[]), ...(seedSystems as University[])];
  for (const u of all) {
    it(`${u.id}: mark shape is valid or absent`, () => {
      if (!u.mark) return;
      assert.ok(u.mark.kind === "logo" || u.mark.kind === "monogram");
      if (u.mark.path) {
        assert.match(u.mark.path, /^\/marks\//);
        const abs = publicPath(u.mark.path);
        if (existsSync(abs)) {
          const buf = readFileSync(abs);
          assert.ok(buf.byteLength <= MARK_MAX_BYTES, `${u.id} mark over budget`);
        }
      }
    });
  }
});
