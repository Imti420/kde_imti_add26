const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function safeChar(code: number): string {
  if (!Number.isFinite(code) || code < 32 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return " ";
  return String.fromCodePoint(code);
}

/** Strip markup and decode entities. Does not rewrite wording. */
export function decodeEntities(raw: string): string {
  const withoutCdata = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  const withoutTags = withoutCdata.replace(/<[^>]+>/g, " ");
  return withoutTags
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => safeChar(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => safeChar(Number.parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name: string) => NAMED[name.toLowerCase()] ?? match)
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanHeadline(raw: string): string {
  return decodeEntities(raw)
    .replace(/^[^0-9A-Za-z\u0980-\u09FF]+/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

/**
 * Parse a feed timestamp. Returns ISO or null.
 * A missing or unreadable date stays null — it is never replaced with "now".
 */
export function parseFeedDate(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const text = decodeEntities(raw).replace(/\s+/g, " ").trim();
  if (!text) return null;
  const direct = Date.parse(text);
  if (Number.isFinite(direct)) {
    const parsed = new Date(direct);
    if (parsed.getUTCFullYear() >= 2000 && parsed.getUTCFullYear() <= 2100) return parsed.toISOString();
  }

  const match = text.match(
    /^(?:[A-Za-z]{3},?\s+)?(\d{1,2})\s+([A-Za-z]{3})\s+(\d{2,4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?(?:\s*(GMT|UTC|Z|[+-]\d{4}))?$/,
  );
  if (!match) return null;
  const month = MONTHS[match[2].toLowerCase()];
  if (month == null) return null;
  let year = Number(match[3]);
  if (match[3].length === 2) year += year >= 70 ? 1900 : 2000;
  const day = Number(match[1]);
  const hour = Number(match[4] ?? "0");
  const minute = Number(match[5] ?? "0");
  const second = Number(match[6] ?? "0");
  const zone = match[7] ?? "Z";
  let offsetMin = 0;
  if (zone !== "GMT" && zone !== "UTC" && zone !== "Z") {
    const sign = zone.startsWith("-") ? -1 : 1;
    const digits = zone.slice(1);
    offsetMin = sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2)));
  }
  const utc = Date.UTC(year, month, day, hour, minute, second) - offsetMin * 60_000;
  const parsed = new Date(utc);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getUTCFullYear() < 1990 || parsed.getUTCFullYear() > 2100) return null;
  return parsed.toISOString();
}

export function excerpt(raw: string | null | undefined, headline: string): string | null {
  if (!raw) return null;
  const text = decodeEntities(raw);
  if (!text || text.toLowerCase() === headline.toLowerCase()) return null;
  if (text.length <= 320) return text;
  const cut = text.slice(0, 300);
  const space = cut.lastIndexOf(" ");
  return `${(space > 180 ? cut.slice(0, space) : cut).trim()}…`;
}

export function hashKey(url: string, headline: string): string {
  let normalized = url.trim();
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    for (const key of [...parsed.searchParams.keys()]) {
      if (key.toLowerCase().startsWith("utm_") || key === "fbclid") parsed.searchParams.delete(key);
    }
    normalized = parsed.toString().replace(/\/$/, "");
  } catch {
    normalized = url.trim();
  }
  return `${normalized}\n${headline.toLowerCase().replace(/\s+/g, " ").trim()}`;
}

export async function digest(text: string): Promise<string> {
  const digestBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digestBytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
