import type { WireItem } from "./types.ts";

export interface AiClassifiedItem {
  index: number;
  relevant: boolean;
  headline: string;
  summary: string | null;
  universityId: string | null;
  importance: "normal" | "official-alert";
  isOfficialAnnouncement: boolean;
  dates: {
    applicationOpens: string | null;
    applicationCloses: string | null;
    examDate: string | null;
  };
}

export async function enrichWithGemini(
  items: WireItem[],
  apiKey: string,
): Promise<{
  enriched: WireItem[];
  aiCount: number;
  heuristicCount: number;
}> {
  if (!apiKey || items.length === 0) {
    return {
      enriched: items.map((item) => ({
        ...item,
        classifier: "heuristic" as const,
        aiModel: null,
      })),
      aiCount: 0,
      heuristicCount: items.length,
    };
  }

  // Batch items to process with Gemini (up to 20 at a time)
  const batch = items.slice(0, 20).map((item, index) => ({
    i: index,
    headline: item.headline,
    source: item.sourceName,
    summary: item.summary ? item.summary.slice(0, 300) : "",
  }));

  const prompt = `You are an accurate, non-hallucinating news intelligence classifier for Bangladesh University Admissions (2026-27 session).
Analyze these news articles:
${JSON.stringify(batch, null, 2)}

STRICT RULES:
1. "relevant": true ONLY if about Bangladesh undergraduate university admission, medical (MBBS/BDS), engineering (BUET/CKRUET), GST cluster, Agri cluster, or HSC retake / exam results affecting admission. False for primary schools, jobs, tenders, PhD.
2. "headline": concise, clean English headline. Do NOT invent information.
3. "summary": informative 1-2 sentence summary of what was reported.
4. "universityId": "du", "buet", "gst", "agri", "dghs" (medical), "ru", "cu", "ju", "ugc", or null if multiple/general.
5. "importance": "official-alert" ONLY if official dates/deadlines/circular were formally announced. Otherwise "normal".
6. "dates": extract ONLY dates explicitly mentioned in text. Format: "YYYY-MM-DD" or null. NEVER invent dates! If not mentioned, return null.

Respond ONLY with valid JSON array:
[{"i": number, "relevant": boolean, "headline": string, "summary": string, "universityId": string|null, "importance": "normal"|"official-alert", "isOfficialAnnouncement": boolean, "dates": {"applicationOpens": string|null, "applicationCloses": string|null, "examDate": string|null}}]`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      },
    );
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Gemini API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("Empty response from Gemini API");

    const parsed: AiClassifiedItem[] = JSON.parse(rawText);
    const byIndex = new Map(parsed.map((p) => [p.i, p]));

    let aiCount = 0;
    const enriched = items.map((item, index) => {
      const ai = byIndex.get(index);
      if (ai) {
        aiCount++;
        return {
          ...item,
          headline: ai.headline?.trim() || item.headline,
          summary: ai.summary?.trim() || item.summary,
          importance: ai.importance === "official-alert" ? ("official-alert" as const) : item.importance,
          classifier: "ai" as const,
          aiModel: "gemini-1.5-flash",
          detectedDates: ai.dates
            ? {
                applicationOpens: ai.dates.applicationOpens || null,
                applicationCloses: ai.dates.applicationCloses || null,
                examDate: ai.dates.examDate || null,
              }
            : null,
        };
      }
      return {
        ...item,
        classifier: "heuristic" as const,
        aiModel: null,
      };
    });

    return {
      enriched,
      aiCount,
      heuristicCount: items.length - aiCount,
    };
  } catch (err) {
    // Graceful fallback to heuristic
    return {
      enriched: items.map((item) => ({
        ...item,
        classifier: "heuristic" as const,
        aiModel: null,
      })),
      aiCount: 0,
      heuristicCount: items.length,
    };
  }
}
