import type { ReactNode } from "react";

/** Campus illustration backgrounds for ticket faces (viewBox 0 0 880 480). */

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 880 480" preserveAspectRatio="xMaxYMid slice" aria-hidden className="h-full w-full">
      {children}
    </svg>
  );
}

function Halftone() {
  return (
    <>
      <defs>
        <pattern id={`tk-ht-${kind}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.7" fill="#000" opacity="0.12" />
        </pattern>
      </defs>
      <polygon points="880,220 880,480 500,480" fill="url(#tk-ht)" />
    </>
  );
}

function Flag({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="3" height="44" fill="#3a3a3a" />
      <rect x={x + 3} y={y} width="36" height="22" fill="#0A6B3A" />
      <circle cx={x + 20} cy={y + 11} r="6" fill="#E03A3E" />
    </g>
  );
}

function Waves({ y, col }: { y: number; col: string }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${i * 230 - 20} ${y + (i % 2) * 22}q20-10 40 0t40 0t40 0t40 0`}
          fill="none"
          stroke={col}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

export function TicketArt({ kind }: { kind: string }) {
  switch (kind) {
    case "du":
      return (
        <Svg>
          <rect width="880" height="480" fill="#F7DCD0" />
          <rect x="380" y="30" width="500" height="40" fill="#fff" />
          {[...Array(17)].map((_, i) => (
            <rect key={i} x={396 + i * 28} y="38" width="18" height="14" fill="#6FA8DC" />
          ))}
          <rect x="380" y="60" width="500" height="6" fill="#2E6BB0" />
          <rect x="380" y="250" width="400" height="150" fill="#B4443E" />
          <rect x="372" y="236" width="416" height="18" fill="#F7E3C5" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M${396 + i * 54} 400v-52a20 20 0 0 1 40 0v52z`} fill="#F7E3C5" />
          ))}
          <path d="M540 236a50 50 0 0 1 100 0z" fill="#8B1E2B" />
          <rect x="0" y="400" width="880" height="80" fill="#E9C9B8" />
          <path d="M770 356a46 46 0 0 1 92 0z" fill="#F7C948" />
          <Flag x={590} y={128} />
          <Halftone id="du" />
        </Svg>
      );
    case "buet":
      return (
        <Svg>
          <rect width="880" height="480" fill="#D9E2EF" />
          <path d="M800 70l-34 130M800 70l34 130" fill="none" stroke="#10244A" strokeWidth="6" />
          <circle cx="800" cy="66" r="8" fill="#F2B41B" />
          <rect x="392" y="240" width="436" height="160" fill="#B5523B" />
          <rect x="384" y="230" width="452" height="14" fill="#E8D5B7" />
          <rect x="560" y="140" width="100" height="260" fill="#C25E45" />
          <path d="M562 132a48 48 0 0 1 96 0z" fill="#10244A" />
          <circle cx="610" cy="188" r="18" fill="#F3E1C8" />
          <rect x="0" y="400" width="880" height="80" fill="#7AA36B" />
          <Flag x={610} y={56} />
          <Halftone id="buet" />
        </Svg>
      );
    case "kuet":
      return (
        <Svg>
          <rect width="880" height="480" fill="#CFE3DC" />
          <circle cx="500" cy="170" r="62" fill="#7DAA6C" />
          <circle cx="590" cy="120" r="70" fill="#7DAA6C" />
          <circle cx="690" cy="100" r="62" fill="#7DAA6C" />
          <circle cx="800" cy="140" r="72" fill="#7DAA6C" />
          <rect x="650" y="120" width="125" height="300" fill="#F1DEB6" />
          <rect x="650" y="120" width="125" height="14" fill="#D8C190" />
          <circle cx="712" cy="212" r="38" fill="none" stroke="#2B4A36" strokeWidth="12" strokeDasharray="10 10" />
          <circle cx="712" cy="212" r="32" fill="#F1DEB6" />
          <rect x="0" y="400" width="880" height="80" fill="#9CC7BE" />
          <Waves y={430} col="#C6E1DA" />
          <Flag x={668} y={76} />
          <Halftone id="kuet" />
        </Svg>
      );
    case "ru":
      return (
        <Svg>
          <rect width="880" height="480" fill="#FBD38D" />
          <circle cx="700" cy="210" r="100" fill="#F9C269" />
          <circle cx="700" cy="210" r="64" fill="#F6A04D" />
          <rect x="0" y="330" width="880" height="150" fill="#7DB7B0" />
          <Waves y={400} col="#A8D3CC" />
          <rect x="400" y="250" width="240" height="80" fill="#C98B5A" />
          <path d="M470 250a50 50 0 0 1 100 0z" fill="#A8663C" />
          <circle cx="800" cy="230" r="80" fill="#4F8F4A" />
          <circle cx="730" cy="262" r="58" fill="#4F8F4A" />
          <rect x="0" y="430" width="880" height="50" fill="#6BA55B" />
          <Flag x={520} y={146} />
          <Halftone id="ru" />
        </Svg>
      );
    case "mat":
      return (
        <Svg>
          <rect width="880" height="480" fill="#D6EAF5" />
          <rect x="560" y="180" width="260" height="240" fill="#F4F8FB" />
          <rect x="560" y="180" width="260" height="18" fill="#0B4A8B" />
          <path d="M679 112h22v22h22v22h-22v22h-22v-22h-22v-22h22z" fill="#E5293E" />
          <path d="M440 372C370 322 372 252 414 252c20 0 28 12 28 24 0-12 8-24 28-24 42 0 44 70-30 120z" fill="#E5293E" />
          <rect x="0" y="420" width="880" height="60" fill="#BFD9C8" />
          <Halftone id="mat" />
        </Svg>
      );
    case "ju":
      return (
        <Svg>
          <rect width="880" height="480" fill="#DDF0E8" />
          <circle cx="560" cy="100" r="44" fill="#FFE9B8" />
          <circle cx="520" cy="280" r="70" fill="#3FA066" />
          <circle cx="640" cy="290" r="56" fill="#2E8B57" />
          <circle cx="760" cy="270" r="72" fill="#3FA066" />
          <rect x="0" y="340" width="880" height="140" fill="#7CCFC0" />
          <Waves y={430} col="#B5E6DB" />
          <Flag x={530} y={256} />
          <Halftone id="ju" />
        </Svg>
      );
    case "cuet":
      return (
        <Svg>
          <rect width="880" height="480" fill="#BFE3E8" />
          <circle cx="480" cy="110" r="46" fill="#F9D58A" />
          <path d="M360 400Q470 230 600 330Q700 250 880 360V400z" fill="#4C9A8F" />
          <rect x="0" y="380" width="880" height="100" fill="#2E8FA3" />
          <Waves y={420} col="#7CC3D1" />
          <Halftone id="cuet" />
        </Svg>
      );
    case "ruet":
      return (
        <Svg>
          <rect width="880" height="480" fill="#E5EBC5" />
          <rect x="560" y="170" width="150" height="230" fill="#6F7C1E" />
          <circle cx="470" cy="300" r="40" fill="none" stroke="#55600E" strokeWidth="10" strokeDasharray="8 8" />
          <circle cx="470" cy="300" r="30" fill="#F3F0D2" />
          <circle cx="470" cy="300" r="10" fill="#C8E04A" />
          <rect x="0" y="400" width="880" height="80" fill="#9BB04A" />
          <Halftone id="ruet" />
        </Svg>
      );
    case "mist":
      return (
        <Svg>
          <rect width="880" height="480" fill="#D8D4C0" />
          <path d="M800 70l12 30h32l-26 20 10 32-28-20-28 20 10-32-26-20h32z" fill="#D62828" />
          <rect x="640" y="220" width="100" height="180" fill="#6D7A52" />
          <path d="M650 220a40 40 0 0 1 80 0z" fill="#2B2B30" />
          <rect x="0" y="400" width="880" height="80" fill="#5A6540" />
          <Halftone id="mist" />
        </Svg>
      );
    case "gst":
      return (
        <Svg>
          <rect width="880" height="480" fill="#FAD7DE" />
          <circle cx="640" cy="250" r="170" fill="#F9B8C4" />
          <circle cx="640" cy="250" r="118" fill="#F5A0B0" />
          <circle cx="640" cy="250" r="64" fill="#FFD166" />
          <rect x="612" y="226" width="56" height="56" fill="#fff" />
          <path d="M606 226a34 34 0 0 1 68 0z" fill="#A3123E" />
          <Halftone id="gst" />
        </Svg>
      );
    case "sust":
      return (
        <Svg>
          <rect width="880" height="480" fill="#CFE0DC" />
          <path d="M360 380Q520 240 700 330Q800 280 880 340V400z" fill="#7FA88F" />
          <rect x="0" y="370" width="880" height="110" fill="#3F7F1E" />
          <Halftone id="sust" />
        </Svg>
      );
    case "cu":
      return (
        <Svg>
          <rect width="880" height="480" fill="#E6E9F7" />
          <circle cx="560" cy="100" r="46" fill="#FFD9A0" />
          <path d="M380 400Q520 180 660 300Q760 220 880 330V400z" fill="#7C8BC7" />
          <rect x="0" y="404" width="880" height="76" fill="#8CB369" />
          <Halftone id="cu" />
        </Svg>
      );
    case "jnu":
      return (
        <Svg>
          <rect width="880" height="480" fill="#F3C6C0" />
          <circle cx="480" cy="130" r="52" fill="#FFD9A0" />
          <rect x="560" y="250" width="300" height="150" fill="#D9A29A" />
          <path d="M548 250L710 186L872 250z" fill="#B97A74" />
          <rect x="0" y="400" width="880" height="80" fill="#7C86B8" />
          <Waves y={430} col="#A7AFD6" />
          <Halftone id="jnu" />
        </Svg>
      );
    default:
      return (
        <Svg>
          <rect width="880" height="480" fill="#E8E4D8" />
          <rect x="480" y="120" width="320" height="200" fill="#C9C2B0" opacity="0.5" />
          <circle cx="700" cy="180" r="60" fill="#B8B09E" opacity="0.6" />
          <rect x="0" y="400" width="880" height="80" fill="#A8A090" opacity="0.4" />
          <Halftone id="x" />
        </Svg>
      );
  }
}
