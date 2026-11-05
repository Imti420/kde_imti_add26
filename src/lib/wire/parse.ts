import { normalizeUrl } from "../crawl/url.ts";
import { decodeEntities, excerpt, parseFeedDate } from "./text.ts";
import type { WireExtract } from "./types.ts";

export interface ParsedItem {
  headline: string;
  url: string;
  publishedAt: string | null;
  summary: string | null;
}

function first(block: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

export function parseFeed(xml: string, base: string): ParsedItem[] {
  const found: ParsedItem[] = [];
  const seen = new Set<string>();
  const itemRe = /<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of xml.matchAll(itemRe)) {
    const block = match[2] ?? "";
    const headline = decodeEntities(first(block, [/<title[^>]*>([\s\S]*?)<\/title>/i]));
    const linkRaw = first(block, [
      /<link>\s*([^<\s]+)\s*<\/link>/i,
      /<link\b[^>]*href\s*=\s*"([^"]+)"/i,
      /<guid[^>]*>\s*(https?:\/\/[^<\s]+)\s*<\/guid>/i,
    ]);
    const url = normalizeUrl(linkRaw.replace(/&/gi, "&"), base);
    if (!headline || !url || seen.has(`${url}|${headline}`)) continue;
    seen.add(`${url}|${headline}`);
    const publishedRaw = first(block, [
      /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i,
      /<published[^>]*>([\s\S]*?)<\/published>/i,
      /<updated[^>]*>([\s\S]*?)<\/updated>/i,
      /<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i,
    ]);
    const summaryRaw = first(block, [
      /<description[^>]*>([\s\S]*?)<\/description>/i,
      /<summary[^>]*>([\s\S]*?)<\/summary>/i,
    ]);
    found.push({
      headline: headline.slice(0, 300),
      url,
      publishedAt: parseFeedDate(publishedRaw),
      summary: excerpt(summaryRaw, headline),
    });
    if (found.length >= 40) break;
  }
  return found;
}

const SKIP_LINK = /^(home|read more|more|login|log in|facebook|youtube|share|menu|contact)$/i;

export function parseHtml(html: string, pageUrl: string, extract: WireExtract): ParsedItem[] {
  const found: ParsedItem[] = [];
  const seen = new Set<string>();
  const push = (headline: string, url: string | null) => {
    const clean = headline.replace(/\s+/g, " ").trim();
    if (clean.length < 8 || clean.length > 240) return;
    if (SKIP_LINK.test(clean)) return;
    const href = url || pageUrl;
    const key = `${href}|${clean.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    found.push({ headline: clean, url: href, publishedAt: null, summary: null });
  };

  if (extract === "html-links" || extract === "html-headings") {
    const re = /<a\b[^>]*href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi;
    for (const match of html.matchAll(re)) {
      const raw = (match[1] || match[2] || match[3] || "").replace(/&/gi, "&");
      const url = normalizeUrl(raw, pageUrl);
      push(decodeEntities(match[4] ?? ""), url);
      if (found.length >= 80) break;
    }
  }
  if (extract === "html-headings") {
    const re = /<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi;
    for (const match of html.matchAll(re)) {
      push(decodeEntities(match[1] ?? ""), pageUrl);
      if (found.length >= 100) break;
    }
  }
  return found;
}
