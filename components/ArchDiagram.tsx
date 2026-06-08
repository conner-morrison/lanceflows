import { CASE_ARCH_MAP, type Arch } from "@/lib/architectures";

// Ported from case-detail.html's archDiagram(): renders a case's hand-authored
// architecture (from architectures.ts) as an SVG of icon tiles connected by
// labelled arrows — the system we finally shipped for that engagement.

function wrapLabel(s: string, max: number): string[] {
  const words = String(s).split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  words.forEach((w) => {
    if ((cur + " " + w).trim().length <= max) cur = (cur + " " + w).trim();
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

type Node = {
  id: string;
  label: string;
  icon: string;
  color: string;
  col: number;
  row: number;
  cx: number;
  cy: number;
};

export default function ArchDiagram({ id, title }: { id: string; title: string }) {
  const A: Arch | undefined = CASE_ARCH_MAP[id];
  if (!A || !A.nodes || !A.nodes.length) return null;

  const PADX = 64,
    PADY = 24,
    COLG = 168,
    ROWG = 116,
    CHIP = 56,
    HALF = CHIP / 2;

  const N: Record<string, Node> = {};
  let maxc = 0,
    maxr = 0;
  A.nodes.forEach((n) => {
    const o: Node = {
      id: n[0],
      label: n[1],
      icon: n[2],
      color: n[3],
      col: n[4],
      row: n[5],
      cx: PADX + n[4] * COLG + HALF,
      cy: PADY + n[5] * ROWG + HALF,
    };
    N[o.id] = o;
    maxc = Math.max(maxc, o.col);
    maxr = Math.max(maxr, o.row);
  });
  const W = PADX * 2 + maxc * COLG + CHIP;
  const H = PADY + maxr * ROWG + CHIP + 54;

  const edges = (A.edges || []).map((e, k) => {
    const a = N[e[0]],
      b = N[e[1]];
    if (!a || !b) return null;
    const dx = b.cx - a.cx,
      dy = b.cy - a.cy;
    let x1: number, y1: number, x2: number, y2: number;
    if (Math.abs(dx) >= Math.abs(dy)) {
      const s = dx >= 0 ? 1 : -1;
      x1 = a.cx + s * HALF;
      y1 = a.cy;
      x2 = b.cx - s * HALF;
      y2 = b.cy;
    } else {
      const s = dy >= 0 ? 1 : -1;
      x1 = a.cx;
      y1 = a.cy + s * HALF;
      x2 = b.cx;
      y2 = b.cy - s * HALF;
    }
    const dash = e[3] === "dash" ? "5 4" : undefined;
    const lbl = e[2];
    const mx = (x1 + x2) / 2,
      my = (y1 + y2) / 2,
      w = lbl ? lbl.length * 6.0 + 8 : 0;
    return (
      <g key={k}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className="ad-edge"
          markerEnd="url(#ad-arrow)"
          strokeDasharray={dash}
        />
        {lbl && (
          <>
            <rect x={mx - w / 2} y={my - 8} width={w} height={15} rx={4} className="ad-elbg" />
            <text x={mx} y={my + 2.6} className="ad-elabel">
              {lbl}
            </text>
          </>
        )}
      </g>
    );
  });

  const tiles = A.nodes.map((n) => {
    const o = N[n[0]];
    return (
      <g key={o.id}>
        <rect
          x={o.cx - HALF}
          y={o.cy - HALF}
          width={CHIP}
          height={CHIP}
          rx={13}
          fill={o.color}
        />
        <text x={o.cx} y={o.cy + 1} className="ad-ic">
          {o.icon}
        </text>
        {wrapLabel(o.label, 16).map((ln, i) => (
          <text key={i} x={o.cx} y={o.cy + HALF + 15 + i * 12.5} className="ad-label">
            {ln}
          </text>
        ))}
      </g>
    );
  });

  return (
    <>
      <div className="section-label">Implemented architecture</div>
      <p className="arch-caption">
        A customized view of the system we shipped for this engagement — the components and how
        requests and data flow between them.
      </p>
      <div className="arch-figure">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="arch-svg"
          role="img"
          aria-label={`Architecture diagram for ${title}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="ad-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
            </marker>
          </defs>
          {edges}
          {tiles}
        </svg>
      </div>
    </>
  );
}
