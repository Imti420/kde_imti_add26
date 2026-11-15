/** Geometric poster marks — few shapes, high contrast. */

export function TicketArt({ kind }: { kind: string }) {
  switch (kind) {
    case "kuet":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <circle cx="118" cy="40" r="22" fill="none" stroke="currentColor" strokeWidth="7" />
          <circle cx="118" cy="40" r="8" fill="currentColor" />
          {[0, 45, 90, 135].map((a) => (
            <rect
              key={a}
              x="114"
              y="14"
              width="8"
              height="12"
              fill="currentColor"
              transform={`rotate(${a} 118 40)`}
            />
          ))}
          <rect x="28" y="58" width="36" height="28" fill="currentColor" opacity="0.35" />
          <rect x="48" y="48" width="40" height="38" fill="currentColor" opacity="0.55" />
          <rect x="70" y="62" width="28" height="24" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case "du":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <circle cx="118" cy="78" r="48" fill="currentColor" opacity="0.35" />
          <rect x="72" y="48" width="70" height="40" fill="currentColor" opacity="0.85" />
          <rect x="80" y="28" width="12" height="24" fill="currentColor" />
          <rect x="122" y="28" width="12" height="24" fill="currentColor" />
          <path d="M78 28h16l-2-10h-12zM120 28h16l-2-10h-12z" fill="currentColor" />
          <rect x="100" y="58" width="16" height="30" fill="currentColor" opacity="0.5" />
          <path d="M40 30q12-8 20 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <path d="M55 22q10-6 16 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "ru":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <rect x="30" y="55" width="70" height="32" fill="currentColor" opacity="0.7" />
          <rect x="38" y="62" width="12" height="18" fill="currentColor" opacity="0.35" />
          <rect x="56" y="62" width="12" height="18" fill="currentColor" opacity="0.35" />
          <rect x="74" y="62" width="12" height="18" fill="currentColor" opacity="0.35" />
          <rect x="95" y="68" width="40" height="20" fill="currentColor" opacity="0.45" />
          <circle cx="128" cy="36" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M118 36h20M128 26v20" stroke="currentColor" strokeWidth="3" />
          <path d="M120 30q8-6 16 0q-8 6-16 0" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "jnu":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <path d="M40 100 L100 20 L160 100Z" fill="currentColor" opacity="0.2" />
          <path d="M70 100 L110 40 L150 100Z" fill="currentColor" opacity="0.25" />
          <rect x="78" y="55" width="50" height="40" fill="currentColor" opacity="0.85" />
          <path d="M78 55h50v-8l-25-14-25 14z" fill="currentColor" />
          <path d="M95 70v25h16V70a8 8 0 0 0-16 0z" fill="currentColor" opacity="0.45" />
          <circle cx="130" cy="28" r="12" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "mat":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <circle cx="100" cy="58" r="36" fill="currentColor" opacity="0.15" />
          <path
            d="M100 28c-10 0-18 8-18 18 0 4 2 8 4 10h28c2-2 4-6 4-10 0-10-8-18-18-18z"
            fill="currentColor"
            opacity="0.85"
          />
          <rect x="96" y="52" width="8" height="40" rx="3" fill="currentColor" />
          <path d="M88 48h24M100 40v16" stroke="currentColor" strokeWidth="4" opacity="0.5" />
          <path d="M78 48c-8 4-12 12-8 20M122 48c8 4 12 12 8 20" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="48" y="70" width="14" height="14" fill="currentColor" opacity="0.45" />
        </svg>
      );
    case "sust":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <circle cx="110" cy="70" r="40" fill="currentColor" opacity="0.15" />
          <path d="M50 100 L110 20 L170 100Z" fill="currentColor" opacity="0.75" />
          <path d="M70 100 L110 40 L150 100Z" fill="currentColor" opacity="0.4" />
          <path d="M110 20v80" stroke="currentColor" strokeWidth="3" opacity="0.5" />
        </svg>
      );
    case "cu":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <path d="M20 90 Q60 40 100 90 T180 90" fill="currentColor" opacity="0.2" />
          <path d="M30 100 Q70 55 110 100" fill="currentColor" opacity="0.35" />
          <rect x="118" y="30" width="8" height="60" fill="currentColor" />
          <circle cx="122" cy="28" r="6" fill="currentColor" />
          <path d="M40 28l16 8M60 22l12 6" stroke="currentColor" strokeWidth="3" opacity="0.5" />
        </svg>
      );
    case "cou":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <rect x="50" y="48" width="90" height="42" fill="currentColor" opacity="0.75" />
          <rect x="50" y="40" width="90" height="10" fill="currentColor" />
          <rect x="62" y="58" width="12" height="20" fill="currentColor" opacity="0.35" />
          <rect x="84" y="58" width="12" height="20" fill="currentColor" opacity="0.35" />
          <rect x="106" y="58" width="12" height="20" fill="currentColor" opacity="0.35" />
          <path d="M55 90h80" stroke="currentColor" strokeWidth="4" />
          <path d="M40 30q10-6 18 0" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" />
        </svg>
      );
    case "duet":
    case "buet":
    case "cuet":
    case "ruet":
    case "mist":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <circle cx="120" cy="42" r="20" fill="none" stroke="currentColor" strokeWidth="7" />
          <circle cx="120" cy="42" r="7" fill="currentColor" />
          {[0, 60, 120].map((a) => (
            <rect key={a} x="116" y="18" width="8" height="10" fill="currentColor" transform={`rotate(${a} 120 42)`} />
          ))}
          <rect x="30" y="70" width="100" height="12" fill="currentColor" opacity="0.35" />
          <path d="M30 82 L80 50 L130 82" fill="none" stroke="currentColor" strokeWidth="6" />
        </svg>
      );
    case "gst":
    case "bup":
    case "ju":
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <rect x="40" y="40" width="90" height="50" fill="currentColor" opacity="0.7" />
          <rect x="52" y="52" width="18" height="18" fill="currentColor" opacity="0.3" />
          <rect x="78" y="52" width="18" height="18" fill="currentColor" opacity="0.3" />
          <rect x="104" y="52" width="18" height="18" fill="currentColor" opacity="0.3" />
          <path d="M40 40h90l-12-16H52z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 120" aria-hidden>
          <rect x="40" y="40" width="80" height="50" fill="currentColor" opacity="0.5" />
        </svg>
      );
  }
}
