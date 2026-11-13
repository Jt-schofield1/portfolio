import type { Visual as Kind } from "@/content/site";

// Abstract stand-ins for the work. Government projects never get screenshots, so every case study uses one of these.

const ring = (n: number, r: number, phase = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + phase;
    // Rounded so server and client render identical markup.
    return { x: Math.round(200 + Math.cos(a) * r), y: Math.round(150 + Math.sin(a) * r) };
  });

function Platform() {
  const inner = ring(5, 62, 0.3);
  const outer = ring(8, 118, 0.1);
  return (
    <g className="v-orbit">
      {[...inner, ...outer].map((p, i) => (
        <line key={`l${i}`} x1={200} y1={150} x2={p.x} y2={p.y} stroke="currentColor" strokeOpacity={0.25} />
      ))}
      <circle cx={200} cy={150} r={62} fill="none" stroke="currentColor" strokeOpacity={0.2} />
      <circle cx={200} cy={150} r={118} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeDasharray="2 8" />
      {[...inner, ...outer].map((p, i) => (
        <rect key={`n${i}`} x={p.x - 7} y={p.y - 7} width={14} height={14} fill="currentColor" className="v-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      <rect x={182} y={132} width={36} height={36} fill="currentColor" />
    </g>
  );
}

function Fleet() {
  const dots = Array.from({ length: 44 }, (_, i) => ({
    x: 30 + ((i * 53) % 340),
    y: 28 + ((i * 97) % 244),
    dx: ((i * 37) % 50) - 25,
    dy: ((i * 61) % 40) - 20,
    lead: i % 9 === 0,
  }));
  return (
    <g>
      {[60, 120, 180, 240].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={400} y2={y} stroke="currentColor" strokeOpacity={0.12} />
      ))}
      {[80, 160, 240, 320].map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={300} stroke="currentColor" strokeOpacity={0.12} />
      ))}
      {dots.map((d, i) => (
        <g key={i} className="v-drift" style={{ ["--dx" as string]: `${d.dx}px`, ["--dy" as string]: `${d.dy}px`, animationDelay: `${-i * 0.4}s` }}>
          {d.lead && <circle cx={d.x} cy={d.y} r={13} fill="none" stroke="currentColor" strokeOpacity={0.5} />}
          <circle cx={d.x} cy={d.y} r={d.lead ? 5 : 3} fill="currentColor" fillOpacity={d.lead ? 1 : 0.6} />
        </g>
      ))}
    </g>
  );
}

function Coach() {
  const bars = [0.45, 0.6, 0.5, 0.72, 0.66, 0.85, 0.78, 1];
  return (
    <g>
      <line x1={30} y1={262} x2={370} y2={262} stroke="currentColor" strokeOpacity={0.3} />
      {bars.map((h, i) => (
        <rect key={i} x={40 + i * 42} y={262 - h * 210} width={26} height={h * 210} fill="currentColor" fillOpacity={0.25 + i * 0.1} className="v-grow" style={{ animationDelay: `${i * 0.22}s` }} />
      ))}
      <polyline points={bars.map((h, i) => `${53 + i * 42},${244 - h * 200}`).join(" ")} fill="none" stroke="currentColor" strokeWidth={2} />
    </g>
  );
}

function Studio() {
  return (
    <g>
      <rect x={40} y={40} width={150} height={100} fill="currentColor" fillOpacity={0.9} />
      <circle cx={285} cy={90} r={52} fill="none" stroke="currentColor" strokeWidth={2} className="v-pulse" />
      <rect x={40} y={160} width={70} height={100} fill="none" stroke="currentColor" strokeWidth={2} />
      <rect x={120} y={160} width={70} height={100} fill="currentColor" fillOpacity={0.35} />
      <g className="v-drift" style={{ ["--dx" as string]: "18px", ["--dy" as string]: "-12px" }}>
        <path d="M230 260 L285 165 L340 260 Z" fill="currentColor" fillOpacity={0.7} />
      </g>
    </g>
  );
}

const map = { platform: Platform, fleet: Fleet, coach: Coach, studio: Studio };

export function Visual({ kind, className }: { kind: Kind; className?: string }) {
  const Art = map[kind];
  return (
    <svg viewBox="0 0 400 300" aria-hidden className={className} preserveAspectRatio="xMidYMid meet">
      <Art />
    </svg>
  );
}
