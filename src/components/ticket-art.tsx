import type { ReactNode } from "react";
/** Flat inline-SVG campus scenes — one per ticket kind. */

function R(props: { x: number; y: number; w: number; h: number; f: string; rx?: number }) {
  return <rect x={props.x} y={props.y} width={props.w} height={props.h} fill={props.f} rx={props.rx} />;
}
function C(props: { x: number; y: number; r: number; f: string }) {
  return <circle cx={props.x} cy={props.y} r={props.r} fill={props.f} />;
}
function E(props: { x: number; y: number; a: number; b: number; f: string }) {
  return <ellipse cx={props.x} cy={props.y} rx={props.a} ry={props.b} fill={props.f} />;
}
function P(props: { d: string; f?: string; s?: string; w?: number }) {
  return (
    <path
      d={props.d}
      fill={props.f ?? "none"}
      stroke={props.s}
      strokeWidth={props.s ? props.w ?? 6 : undefined}
      strokeLinejoin={props.s ? "round" : undefined}
      strokeLinecap={props.s ? "round" : undefined}
    />
  );
}

function grid(x: number, y: number, n: number, m: number, dx: number, dy: number, w: number, h: number, f: string) {
  const cells = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      cells.push(<R key={`${i}-${j}`} x={x + i * dx} y={y + j * dy} w={w} h={h} f={f} />);
    }
  }
  return cells;
}

function waves(y: number, col: string) {
  return Array.from({ length: 4 }, (_, i) => (
    <P
      key={i}
      d={`M${i * 230 - 20} ${y + (i % 2) * 22}q20-10 40 0t40 0t40 0t40 0`}
      s={col}
      w={4}
    />
  ));
}

function truss() {
  let d = "M0 392";
  for (let i = 0; i < 10; i++) {
    d += `L${i * 44 + 22} ${i % 3 ? 358 : 352}L${i * 44 + 44} 392`;
  }
  return <P d={d} s="#6E9A83" w={4} />;
}

function arches(x: number, y: number, n: number, dx: number, w: number, h: number, f: string) {
  return Array.from({ length: n }, (_, i) => (
    <P
      key={i}
      d={`M${x + i * dx} ${y}v-${h}a${w / 2} ${w / 2} 0 0 1 ${w} 0v${h}z`}
      f={f}
    />
  ));
}

function kite(x: number, y: number, col: string) {
  return (
    <>
      <P d={`M${x} ${y}l24 30l-24 30l-24-30z`} f={col} />
      <P d={`M${x} ${y + 60}q12 20-6 40t6 40`} s="#6A2C70" w={3} />
    </>
  );
}

function mangoes(pts: [number, number][]) {
  return pts.map(([x, y], i) => (
    <g key={i}>
      <E x={x} y={y} a={13} b={17} f="#F6A61C" />
      <C x={x + 4} y={y - 6} r={3} f="#FFD27A" />
    </g>
  ));
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 880 480" preserveAspectRatio="xMaxYMid slice" aria-hidden>
      {children}
    </svg>
  );
}

export function TicketArt({ kind }: { kind: string }) {
  switch (kind) {
    case "kuet":
      return (
        <Frame>
          <R x={0} y={0} w={880} h={480} f="#CFE3DC" />
          <E x={520} y={70} a={90} b={20} f="#EEF4F0" />
          <E x={610} y={92} a={60} b={14} f="#EEF4F0" />
          <C x={500} y={170} r={62} f="#7DAA6C" />
          <C x={590} y={120} r={70} f="#7DAA6C" />
          <C x={690} y={100} r={62} f="#7DAA6C" />
          <C x={800} y={140} r={72} f="#7DAA6C" />
          <C x={560} y={205} r={40} f="#5D8F52" />
          <C x={850} y={200} r={50} f="#5D8F52" />
          <R x={770} y={170} w={110} h={250} f="#E8D4A9" />
          {grid(790, 190, 2, 5, 44, 44, 22, 26, "#9DB7A4")}
          <R x={650} y={120} w={125} h={300} f="#F1DEB6" />
          <R x={650} y={120} w={125} h={14} f="#D8C190" />
          <circle cx={712} cy={212} r={38} fill="none" stroke="#2B4A36" strokeWidth={12} strokeDasharray="9.95 9.95" />
          <C x={712} y={212} r={32} f="#F1DEB6" />
          <P d="M712 190v30M700 200h24M696 228q16 14 32 0" s="#2B4A36" w={5} />
          <R x={440} y={284} w={200} h={116} f="#9FC1B4" />
          {grid(440, 284, 5, 1, 44, 0, 14, 116, "#E0CDA2")}
          <R x={420} y={262} w={250} h={22} f="#C9B589" />
          <R x={380} y={330} w={70} h={70} f="#D8C59C" />
          <R x={0} y={400} w={880} h={80} f="#9CC7BE" />
          {waves(430, "#C6E1DA")}
          <P d="M0 380Q210 316 440 392" s="#5F8F78" w={8} />
          <P d="M0 392H440" s="#5F8F78" w={8} />
          {truss()}
        </Frame>
      );
    case "du":
      return (
        <Frame>
          <R x={0} y={0} w={880} h={480} f="#F7DCD0" />
          <R x={380} y={30} w={500} h={40} f="#fff" />
          {grid(396, 38, 17, 1, 28, 0, 18, 14, "#6FA8DC")}
          <R x={380} y={60} w={500} h={6} f="#2E6BB0" />
          <R x={330} y={70} w={550} h={24} f="#B9B2B5" />
          <R x={560} y={94} w={28} h={306} f="#A79FA3" />
          <R x={810} y={94} w={28} h={306} f="#A79FA3" />
          <R x={380} y={250} w={400} h={150} f="#B4443E" />
          <R x={372} y={236} w={416} h={18} f="#F7E3C5" />
          {arches(396, 400, 7, 54, 40, 52, "#F7E3C5")}
          <P d="M540 236a50 50 0 0 1 100 0z" f="#8B1E2B" />
          <R x={588} y={172} w={4} h={18} f="#8B1E2B" />
          <P d="M395 236a24 24 0 0 1 48 0z" f="#8B1E2B" />
          <P d="M717 236a24 24 0 0 1 48 0z" f="#8B1E2B" />
          <R x={0} y={400} w={880} h={80} f="#E9C9B8" />
          <R x={420} y={440} w={60} h={6} f="#F7E3C5" />
          <R x={780} y={440} w={60} h={6} f="#F7E3C5" />
          <P d="M770 356a46 46 0 0 1 92 0z" f="#F7C948" />
          <R x={814} y={356} w={4} h={52} f="#6B4A2B" />
          <R x={590} y={392} w={120} h={18} f="#E4A11B" />
          <P d="M594 392q34-72 82 0z" f="#D33F49" />
          <P d="M710 392l40-24" s="#2B2224" w={6} />
          <circle cx={610} cy={442} r={32} fill="none" stroke="#2B2224" strokeWidth={6} />
          <circle cx={738} cy={448} r={24} fill="none" stroke="#2B2224" strokeWidth={6} />
        </Frame>
      );
    case "ru":
      return (
        <Frame>
          <R x={0} y={0} w={880} h={480} f="#FBD38D" />
          <C x={700} y={210} r={100} f="#F9C269" />
          <C x={700} y={210} r={64} f="#F6A04D" />
          <R x={0} y={330} w={880} h={150} f="#7DB7B0" />
          <R x={620} y={346} w={160} h={8} f="#F6C27A" />
          <R x={650} y={366} w={100} h={8} f="#F6C27A" />
          {waves(400, "#A8D3CC")}
          <R x={400} y={250} w={240} h={80} f="#C98B5A" />
          <P d="M470 250a50 50 0 0 1 100 0z" f="#A8663C" />
          <R x={518} y={186} w={4} h={16} f="#A8663C" />
          {arches(412, 330, 5, 46, 32, 34, "#FFEFC9")}
          <P d="M520 372q50 34 140 0z" f="#6B3A1E" />
          <P d="M580 372V296l48 66z" f="#FFF1D0" />
          <P d="M570 372V320l-34 52z" f="#FFE2A8" />
          <R x={0} y={430} w={880} h={50} f="#6BA55B" />
          <R x={790} y={280} w={26} h={170} f="#6B3A1E" />
          <C x={800} y={230} r={80} f="#4F8F4A" />
          <C x={730} y={262} r={58} f="#4F8F4A" />
          <C x={868} y={262} r={58} f="#4F8F4A" />
          <C x={802} y={170} r={58} f="#5FA055" />
          {mangoes([
            [760, 250],
            [830, 240],
            [790, 196],
            [860, 284],
            [738, 292],
          ])}
        </Frame>
      );
    case "jnu":
      return (
        <Frame>
          <R x={0} y={0} w={880} h={480} f="#F3C6C0" />
          <C x={480} y={130} r={52} f="#FFD9A0" />
          {kite(560, 60, "#FF6B4A")}
          {kite(700, 36, "#FFD23F")}
          {kite(810, 120, "#4A8FD6")}
          <R x={560} y={250} w={300} h={150} f="#D9A29A" />
          <P d="M672 200a38 38 0 0 1 76 0z" f="#8D5A66" />
          <P d="M548 250L710 186L872 250z" f="#B97A74" />
          <C x={710} y={224} r={14} f="#FFF3EA" />
          {grid(580, 262, 7, 1, 40, 0, 14, 138, "#F2D9D2")}
          <R x={0} y={400} w={880} h={80} f="#7C86B8" />
          {waves(430, "#A7AFD6")}
          <P d="M360 400l24-44h190l16 44z" f="#2D3A6B" />
          <R x={396} y={328} w={150} h={28} f="#fff" />
          <R x={420} y={302} w={104} h={26} f="#F4F4F8" />
          <R x={458} y={272} w={24} h={30} f="#FF6B4A" />
          {grid(404, 336, 7, 1, 20, 0, 10, 12, "#6C7AC0")}
          {grid(428, 309, 5, 1, 20, 0, 10, 12, "#6C7AC0")}
        </Frame>
      );
    case "mat":
      return (
        <Frame>
          <R x={0} y={0} w={880} h={480} f="#D6EAF5" />
          <E x={480} y={70} a={80} b={18} f="#F2F8FC" />
          <E x={780} y={60} a={70} b={16} f="#F2F8FC" />
          <R x={560} y={180} w={260} h={240} f="#F4F8FB" />
          <R x={560} y={180} w={260} h={18} f="#0B4A8B" />
          {grid(582, 214, 5, 3, 48, 50, 28, 32, "#8EC1E3")}
          <R x={670} y={350} w={40} h={70} f="#4E8DBF" />
          <P d="M679 112h22v22h22v22h-22v22h-22v-22h-22v-22h22z" f="#E5293E" />
          <R x={0} y={420} w={880} h={60} f="#BFD9C8" />
          <g transform="rotate(-30 480 200)">
            <rect x={440} y={186} width={80} height={28} rx={14} fill="#fff" />
            <path d="M480 186h26a14 14 0 0 1 0 28h-26z" fill="#E5293E" />
          </g>
          <P d="M440 372C370 322 372 252 414 252c20 0 28 12 28 24 0-12 8-24 28-24 42 0 44 70-30 120z" f="#E5293E" />
          <P d="M398 286q4-14 16-16" s="#FFB3BC" w={5} />
          <P d="M300 400h70l14-40 20 72 18-50 10 18h160" s="#0B4A8B" w={6} />
        </Frame>
      );
    default:
      return null;
  }
}
