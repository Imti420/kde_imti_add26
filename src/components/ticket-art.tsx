import type { ReactNode } from "react";

function Frame({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <svg viewBox="0 0 280 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="280" height="200" fill={bg} />
      {children}
    </svg>
  );
}

/** Flat poster illustrations — one scene per campus, no photo realism. */
export function TicketArt({ kind }: { kind: string }) {
  switch (kind) {
    case "kuet":
      return (
        <Frame bg="#d8ebe0">
          <circle cx="210" cy="48" r="36" fill="#2f6b4f" opacity="0.25" />
          <rect x="150" y="70" width="100" height="90" fill="#1f4d38" />
          <rect x="160" y="82" width="22" height="28" fill="#9fd0b4" />
          <rect x="190" y="82" width="22" height="28" fill="#9fd0b4" />
          <rect x="220" y="82" width="22" height="28" fill="#9fd0b4" />
          <circle cx="200" cy="55" r="28" fill="none" stroke="#1f4d38" strokeWidth="8" />
          <path d="M200 35v20M188 48h24" stroke="#1f4d38" strokeWidth="5" />
          <rect x="40" y="120" width="90" height="40" fill="#3d7a5c" />
          <path d="M30 160h220" stroke="#1f4d38" strokeWidth="6" />
        </Frame>
      );
    case "du":
      return (
        <Frame bg="#f3d5c8">
          <rect x="120" y="70" width="140" height="70" fill="#c45c4a" />
          <path d="M115 70h150l-12-22H127z" fill="#e8b8a0" />
          <rect x="150" y="40" width="18" height="30" fill="#8b2a2a" />
          <rect x="210" y="40" width="18" height="30" fill="#8b2a2a" />
          <circle cx="159" cy="32" r="10" fill="#8b2a2a" />
          <circle cx="219" cy="32" r="10" fill="#8b2a2a" />
          <rect x="170" y="95" width="40" height="45" fill="#f0d8c4" />
          <path d="M20 150h240" stroke="#a86b55" strokeWidth="8" />
          <circle cx="70" cy="120" r="22" fill="#3d6b3d" />
          <circle cx="95" cy="110" r="16" fill="#2f5530" />
        </Frame>
      );
    case "ru":
      return (
        <Frame bg="#f6e2a8">
          <circle cx="210" cy="70" r="40" fill="#f0a84b" />
          <circle cx="210" cy="70" r="24" fill="#e8872e" />
          <rect x="30" y="130" width="220" height="40" fill="#6fa89e" />
          <path d="M40 140q30-20 60 0t60 0t60 0" fill="none" stroke="#9eccc4" strokeWidth="4" />
          <rect x="90" y="95" width="90" height="40" fill="#c9925a" />
          <path d="M100 95a35 22 0 0 1 70 0" fill="#a66b3a" />
          <circle cx="230" cy="100" r="28" fill="#4f8f4a" />
          <circle cx="250" cy="115" r="18" fill="#5fa055" />
        </Frame>
      );
    case "jnu":
      return (
        <Frame bg="#e8d0e8">
          <path d="M40 150 L90 70 L140 150Z" fill="#7a5aa8" />
          <path d="M100 150 L160 50 L220 150Z" fill="#5c3d8a" />
          <rect x="150" y="100" width="100" height="50" fill="#c9a0c4" />
          <path d="M145 100h110l-20-28H165z" fill="#9b6f96" />
          <rect x="185" y="115" width="30" height="35" fill="#f5e8f2" />
          <circle cx="60" cy="60" r="14" fill="#f0c96a" />
          <path d="M200 40l10 14-10 14-10-14z" fill="#ff6b4a" />
          <path d="M230 55l8 12-8 12-8-12z" fill="#ffd23f" />
        </Frame>
      );
    case "duet":
      return (
        <Frame bg="#d6e6f5">
          <path d="M30 150 L120 90 L160 150Z" fill="#4a7ab0" />
          <path d="M140 150 L200 70 L260 150" fill="none" stroke="#1e4d7a" strokeWidth="8" />
          <circle cx="200" cy="55" r="30" fill="none" stroke="#1e4d7a" strokeWidth="8" />
          <path d="M200 30v20M186 48h28" stroke="#1e4d7a" strokeWidth="5" />
          <rect x="40" y="120" width="80" height="30" fill="#6a9fd0" />
        </Frame>
      );
    case "gst":
      return (
        <Frame bg="#d4ebe3">
          <rect x="100" y="50" width="140" height="100" fill="#2f7a62" />
          <rect x="115" y="65" width="28" height="28" fill="#a8d8c8" />
          <rect x="155" y="65" width="28" height="28" fill="#a8d8c8" />
          <rect x="195" y="65" width="28" height="28" fill="#a8d8c8" />
          <rect x="115" y="105" width="28" height="28" fill="#a8d8c8" />
          <rect x="155" y="105" width="28" height="28" fill="#a8d8c8" />
          <circle cx="70" cy="130" r="20" fill="#3d9b6e" />
          <path d="M20 160h240" stroke="#1f5c48" strokeWidth="6" />
        </Frame>
      );
    case "cu":
      return (
        <Frame bg="#d8ecd8">
          <path d="M40 160 Q100 40 160 160" fill="none" stroke="#2f6b3d" strokeWidth="10" />
          <circle cx="100" cy="90" r="18" fill="#6aab6a" />
          <rect x="160" y="80" width="90" height="70" fill="#3d7a52" />
          <rect x="175" y="95" width="20" height="25" fill="#b8e0c0" />
          <rect x="210" y="95" width="20" height="25" fill="#b8e0c0" />
          <path d="M20 160h240" stroke="#2f5538" strokeWidth="6" />
        </Frame>
      );
    case "sust":
      return (
        <Frame bg="#d9e6f5">
          <path d="M80 150 L140 40 L200 150Z" fill="#3d6fa8" />
          <path d="M120 150 L170 60 L220 150Z" fill="#2a5580" />
          <rect x="40" y="120" width="50" height="30" fill="#6a9fd0" />
          <circle cx="230" cy="50" r="16" fill="#f0d060" />
        </Frame>
      );
    case "cou":
      return (
        <Frame bg="#f5d8d0">
          <rect x="120" y="70" width="120" height="70" fill="#d46a5c" />
          <path d="M115 70h130l-15-24H130z" fill="#e8a090" />
          <rect x="165" y="100" width="30" height="40" fill="#f5e0d8" />
          <rect x="220" y="40" width="6" height="30" fill="#8b2a2a" />
          <path d="M210 40 h26 l-13-16z" fill="#c45c4a" />
          <circle cx="70" cy="120" r="24" fill="#6a8f4a" />
        </Frame>
      );
    case "ruet":
      return (
        <Frame bg="#d4e0f0">
          <path d="M30 140 H120 L160 90 H250" fill="none" stroke="#1e3d6b" strokeWidth="10" />
          <path d="M120 140 L160 90 L200 140" fill="none" stroke="#3d6fa8" strokeWidth="6" />
          <circle cx="220" cy="55" r="28" fill="none" stroke="#1e3d6b" strokeWidth="8" />
          <path d="M220 35v18M208 50h24" stroke="#1e3d6b" strokeWidth="5" />
          <rect x="40" y="120" width="70" height="28" fill="#4a7ab0" />
        </Frame>
      );
    case "bup":
      return (
        <Frame bg="#e8e2c8">
          <rect x="140" y="60" width="100" height="80" fill="#6a7a4a" />
          <path d="M135 60h110l-18-28H153z" fill="#8a9a5a" />
          <rect x="175" y="95" width="30" height="45" fill="#d8d0a8" />
          <rect x="210" y="30" width="6" height="30" fill="#3d4a28" />
          <path d="M200 30h26l-13-14z" fill="#c45c4a" />
          <circle cx="70" cy="120" r="22" fill="#5a7a3a" />
        </Frame>
      );
    case "mat":
      return (
        <Frame bg="#e0d8f0">
          <path
            d="M140 50c-20 0-36 16-36 36 0 28 36 54 36 54s36-26 36-54c0-20-16-36-36-36z"
            fill="none"
            stroke="#5a3d8a"
            strokeWidth="8"
          />
          <circle cx="200" cy="90" r="8" fill="#5a3d8a" />
          <path d="M200 98v40" stroke="#5a3d8a" strokeWidth="6" />
          <path d="M40 150h200" stroke="#8a6ab0" strokeWidth="4" />
          <path d="M60 150l20-30 16 40 14-28 10 18h40" fill="none" stroke="#5a3d8a" strokeWidth="5" />
        </Frame>
      );
    case "buet":
      return (
        <Frame bg="#dce8f5">
          <rect x="100" y="55" width="130" height="95" fill="#1e4a7a" />
          <rect x="115" y="70" width="30" height="30" fill="#9ec0e0" />
          <rect x="160" y="70" width="30" height="30" fill="#9ec0e0" />
          <rect x="115" y="110" width="30" height="30" fill="#9ec0e0" />
          <circle cx="210" cy="50" r="26" fill="none" stroke="#0d2f55" strokeWidth="7" />
          <path d="M40 160h220" stroke="#1e4a7a" strokeWidth="6" />
        </Frame>
      );
    case "cuet":
      return (
        <Frame bg="#d5ebe8">
          <path d="M40 150 Q100 60 180 150" fill="none" stroke="#1f6b5c" strokeWidth="10" />
          <circle cx="210" cy="60" r="30" fill="none" stroke="#1f6b5c" strokeWidth="8" />
          <rect x="50" y="120" width="80" height="30" fill="#3d9b88" />
        </Frame>
      );
    case "mist":
      return (
        <Frame bg="#e5e0d0">
          <rect x="90" y="60" width="140" height="90" fill="#4a5540" />
          <rect x="110" y="80" width="25" height="25" fill="#c8c0a0" />
          <rect x="150" y="80" width="25" height="25" fill="#c8c0a0" />
          <rect x="190" y="80" width="25" height="25" fill="#c8c0a0" />
          <path d="M155 40 L200 60 H110Z" fill="#6a7558" />
          <rect x="40" y="140" width="50" height="20" fill="#8a8468" />
        </Frame>
      );
    case "ju":
      return (
        <Frame bg="#dde8d8">
          <ellipse cx="140" cy="130" rx="100" ry="30" fill="#6a9b5a" />
          <rect x="120" y="70" width="80" height="55" fill="#3d6b3d" />
          <path d="M115 70h90l-14-20H129z" fill="#5a8f4a" />
          <circle cx="60" cy="100" r="20" fill="#4a7a40" />
          <circle cx="220" cy="95" r="24" fill="#3d6b38" />
        </Frame>
      );
    default:
      return (
        <Frame bg="#e8e4dc">
          <rect x="80" y="60" width="120" height="80" fill="#8a8478" />
        </Frame>
      );
  }
}
