/** Soft campus wash — decorative only; keep shapes cheap. */
export function TicketArt({ kind }: { kind: string }) {
  const common = (
    <>
      <rect width="100%" height="100%" fill="currentColor" opacity="0.06" />
    </>
  );
  switch (kind) {
    case "du":
      return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {common}
          <circle cx="300" cy="160" r="90" fill="currentColor" opacity="0.12" />
          <rect x="220" y="90" width="120" height="70" fill="currentColor" opacity="0.18" />
          <rect x="245" y="50" width="14" height="40" fill="currentColor" opacity="0.25" />
          <rect x="300" y="50" width="14" height="40" fill="currentColor" opacity="0.25" />
        </svg>
      );
    case "kuet":
    case "buet":
    case "cuet":
    case "ruet":
    case "duet":
    case "mist":
      return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {common}
          <circle cx="300" cy="70" r="40" fill="none" stroke="currentColor" strokeWidth="12" opacity="0.2" />
          <circle cx="300" cy="70" r="12" fill="currentColor" opacity="0.22" />
          <rect x="40" y="140" width="200" height="40" fill="currentColor" opacity="0.12" />
        </svg>
      );
    case "mat":
      return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {common}
          <circle cx="280" cy="110" r="50" fill="currentColor" opacity="0.1" />
          <path d="M260 90c0-12 12-22 22-22s22 10 22 22c0 8-4 14-8 18h-28c-4-4-8-10-8-18z" fill="currentColor" opacity="0.2" />
          <rect x="274" y="120" width="12" height="50" rx="4" fill="currentColor" opacity="0.22" />
        </svg>
      );
    case "agri":
      return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {common}
          <ellipse cx="300" cy="150" rx="70" ry="36" fill="currentColor" opacity="0.14" />
          <path d="M270 150c10-40 40-55 55-55s20 20 10 55" fill="currentColor" opacity="0.2" />
          <path d="M40 180h200" stroke="currentColor" strokeWidth="8" opacity="0.12" />
          <path d="M60 160h40M110 150h40M160 165h40" stroke="currentColor" strokeWidth="6" opacity="0.16" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {common}
          <rect x="220" y="80" width="120" height="80" fill="currentColor" opacity="0.12" />
          <path d="M220 80h120l-20-28H240z" fill="currentColor" opacity="0.16" />
        </svg>
      );
  }
}
