import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { useScroll, useSpring, useTransform, MotionValue, motion } from 'motion/react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TrailNode { id: string; label: string; x: number; y: number; }

// ─── AnimatedPath ─────────────────────────────────────────────────────────────
// Isolated component — useTransform wires a live MotionValue to strokeDashoffset,
// which Framer Motion updates by directly setting element.style (no React re-render).
function AnimatedPath({
  pathD, pathLength, smoothProgress,
}: { pathD: string; pathLength: number; smoothProgress: MotionValue<number>; }) {
  const dashOffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);
  return (
    <>
      {/* Wide outer glow */}
      <motion.path d={pathD} fill="none" stroke="#ff4500" strokeWidth="16"
        strokeLinecap="round" opacity={0.08} filter="url(#ng)"
        strokeDasharray={pathLength} style={{ strokeDashoffset: dashOffset,
          willChange: 'stroke-dashoffset' }} />
      {/* Mid glow */}
      <motion.path d={pathD} fill="none" stroke="#ff6a00" strokeWidth="7"
        strokeLinecap="round" opacity={0.32} filter="url(#ng)"
        strokeDasharray={pathLength} style={{ strokeDashoffset: dashOffset,
          willChange: 'stroke-dashoffset' }} />
      {/* Core sharp line */}
      <motion.path d={pathD} fill="none" stroke="url(#pg)" strokeWidth="2"
        strokeLinecap="round" opacity={0.95} filter="url(#ng)"
        strokeDasharray={pathLength} style={{ strokeDashoffset: dashOffset,
          willChange: 'stroke-dashoffset' }} />
    </>
  );
}

// ─── Safe margin X positions ──────────────────────────────────────────────────
function marginX(i: number, vw: number) {
  const m = Math.min(72, vw * 0.058);
  return i % 2 === 0 ? m : vw - m;
}

// ─────────────────────────────────────────────────────────────────────────────
function ScrollEnergyTrailInner() {
  const [nodes,      setNodes]      = useState<TrailNode[]>([]);
  const [pathD,      setPathD]      = useState('');
  const [pathLength, setPathLength] = useState(0);
  const [pageH,      setPageH]      = useState(8000);

  // ── DOM refs for ZERO-RE-RENDER animation ─────────────────────────────────
  const measureRef = useRef<SVGPathElement>(null);

  // Pulse dot refs
  const pulse = {
    outer : useRef<SVGCircleElement>(null),
    mid   : useRef<SVGCircleElement>(null),
    glow  : useRef<SVGCircleElement>(null),
    core  : useRef<SVGCircleElement>(null),
    inner : useRef<SVGCircleElement>(null),
    sparks: useRef<(SVGCircleElement | null)[]>([]),
  };

  // Per-node circle refs
  const nodeOuterRefs = useRef<(SVGCircleElement | null)[]>([]);
  const nodeCoreRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const nodeSpark     = useRef<(SVGCircleElement | null)[]>([]);
  const nodeLabelRefs = useRef<(SVGGElement | null)[]>([]);
  const lastActiveIdx = useRef<number>(-1);

  // ── Framer Motion scroll ──────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 18, damping: 28, restDelta: 0.0005 });

  // ── Build node positions + SVG path ──────────────────────────────────────
  const buildPath = useCallback(() => {
    const specs = [
      { id: 'hero-trail',      label: 'Start'     },
      { id: 'about-trail',     label: 'About'     },
      { id: 'services-trail',  label: 'Services'  },
      { id: 'portfolio-trail', label: 'Portfolio' },
      { id: 'pricing-trail',   label: 'Pricing'   },
      { id: 'team-trail',      label: 'Team'      },
      { id: 'contact-trail',   label: 'Contact'   },
    ];
    const totalH = document.documentElement.scrollHeight;
    const vW     = window.innerWidth;
    setPageH(totalH);

    const built: TrailNode[] = specs.map((s, i) => {
      const el = document.getElementById(s.id);
      const y  = el
        ? el.getBoundingClientRect().top + el.offsetHeight / 2 + window.scrollY
        : (i / (specs.length - 1)) * totalH * 0.92 + 200;
      return { ...s, x: marginX(i, vW), y };
    });
    setNodes(built);

    if (built.length > 1) {
      let d = `M ${built[0].x} ${built[0].y}`;
      for (let i = 0; i < built.length - 1; i++) {
        const c = built[i], n = built[i + 1], dy = n.y - c.y;
        const cx1 = c.x + (vW / 2 - c.x) * 0.22;
        const cy1 = c.y + dy * 0.36;
        const cx2 = n.x + (vW / 2 - n.x) * 0.22;
        const cy2 = n.y - dy * 0.36;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${n.x} ${n.y}`;
      }
      setPathD(d);
    }
  }, []);

  // ── Measure path once rendered ────────────────────────────────────────────
  useEffect(() => {
    if (!measureRef.current || !pathD) return;
    const id = requestAnimationFrame(() => {
      const len = measureRef.current?.getTotalLength() ?? 0;
      if (len > 0) setPathLength(len);
    });
    return () => cancelAnimationFrame(id);
  }, [pathD]);

  // ── Drive pulse dot + node highlights directly via DOM (NO setState) ──────
  useEffect(() => {
    if (!measureRef.current || pathLength === 0 || nodes.length === 0) return;

    const update = () => {
      const progress = smooth.get();
      let pt: DOMPoint;
      try {
        pt = measureRef.current!.getPointAtLength(progress * pathLength);
      } catch { return; }

      const { x, y } = pt;

      const setXY = (el: SVGCircleElement | null) => {
        if (!el) return;
        el.setAttribute('cx', String(x));
        el.setAttribute('cy', String(y));
      };
      setXY(pulse.outer.current);
      setXY(pulse.mid.current);
      setXY(pulse.glow.current);
      setXY(pulse.core.current);
      setXY(pulse.inner.current);

      const offsets = [[-5,-13],[7,-7],[-10,8],[4,15]];
      pulse.sparks.current.forEach((el, i) => {
        if (!el || !offsets[i]) return;
        el.setAttribute('cx', String(x + offsets[i][0]));
        el.setAttribute('cy', String(y + offsets[i][1]));
      });

      const nearIdx = nodes.reduce((best, n, i) => {
        const d = Math.abs(y - n.y);
        return d < Math.abs(y - nodes[best].y) ? i : best;
      }, 0);
      const isNear = Math.abs(y - nodes[nearIdx].y) < 200;
      const activeIdx = isNear ? nearIdx : -1;

      if (activeIdx !== lastActiveIdx.current) {
        if (lastActiveIdx.current >= 0) {
          const oc = nodeOuterRefs.current[lastActiveIdx.current];
          const cc = nodeCoreRefs.current[lastActiveIdx.current];
          const sk = nodeSpark.current[lastActiveIdx.current];
          const lb = nodeLabelRefs.current[lastActiveIdx.current];
          if (oc) { oc.setAttribute('r', '10'); oc.setAttribute('opacity', '0.18'); }
          if (cc) { cc.setAttribute('r', '4'); cc.setAttribute('fill', '#1a1a1a'); cc.removeAttribute('filter'); }
          if (sk) sk.setAttribute('opacity', '0');
          if (lb) lb.setAttribute('opacity', '0');
        }
        if (activeIdx >= 0) {
          const oc = nodeOuterRefs.current[activeIdx];
          const cc = nodeCoreRefs.current[activeIdx];
          const sk = nodeSpark.current[activeIdx];
          const lb = nodeLabelRefs.current[activeIdx];
          if (oc) { oc.setAttribute('r', '22'); oc.setAttribute('opacity', '0.55'); }
          if (cc) { cc.setAttribute('r', '7'); cc.setAttribute('fill', '#ff6a00'); cc.setAttribute('filter', 'url(#ng2)'); }
          if (sk) sk.setAttribute('opacity', '0.9');
          if (lb) lb.setAttribute('opacity', '1');
        }
        lastActiveIdx.current = activeIdx;
      }
    };

    const unsub = smooth.on('change', update);
    update();
    return unsub;
  }, [smooth, pathLength, nodes]);

  // ── Init + resize (debounced) ─────────────────────────────────────────────
  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(debounce); debounce = setTimeout(buildPath, 200); };

    const t = setTimeout(buildPath, 500);
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); clearTimeout(debounce); window.removeEventListener('resize', onResize); };
  }, [buildPath]);

  if (nodes.length === 0) return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: `${pageH}px`,
      pointerEvents: 'none',
      zIndex: 9990,
      overflow: 'visible',
    }}>
      <svg style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        overflow: 'visible', pointerEvents: 'none',
      }}>
        <defs>
          <filter id="ng" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ng2" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="pg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ff3d00" stopOpacity="0.65"/>
            <stop offset="40%"  stopColor="#ff6a00" stopOpacity="1"/>
            <stop offset="70%"  stopColor="#ffaa00" stopOpacity="1"/>
            <stop offset="100%" stopColor="#ff3d00" stopOpacity="0.65"/>
          </linearGradient>
        </defs>

        {/* Invisible measuring path */}
        {pathD && <path ref={measureRef} d={pathD} fill="none" stroke="transparent" strokeWidth="1"/>}

        <g style={{ mixBlendMode: 'screen' }}>
          {pathD && (
            <path d={pathD} fill="none" stroke="#ff6a00" strokeWidth="1"
              strokeDasharray="4 22" opacity={0.18} strokeLinecap="round"/>
          )}
          {pathD && pathLength > 0 && (
            <AnimatedPath pathD={pathD} pathLength={pathLength} smoothProgress={smooth}/>
          )}
        </g>

        <g style={{ mixBlendMode: 'normal' }}>
          {nodes.map((node, i) => {
            const isLeft = node.x < vw / 2;
            const lw = node.label.length * 7 + 16;
            const lx = isLeft ? node.x + 16 : node.x - lw - 16;
            return (
              <g key={node.id} style={{ pointerEvents: 'all', cursor: 'pointer' }}
                onClick={() => document.getElementById(node.id)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                <circle ref={el => nodeOuterRefs.current[i] = el}
                  cx={node.x} cy={node.y} r={10}
                  fill="none" stroke="#ff6a00" strokeWidth="0.7"
                  opacity={0.18} filter="url(#ng2)"
                  style={{ transition: 'r 0.6s ease, opacity 0.5s ease' }}/>
                <circle ref={el => nodeCoreRefs.current[i] = el}
                  cx={node.x} cy={node.y} r={4}
                  fill="#1a1a1a" stroke="#ff6a00" strokeWidth="1.5"
                  style={{ transition: 'r 0.5s ease, fill 0.4s ease' }}/>
                <circle ref={el => nodeSpark.current[i] = el}
                  cx={node.x} cy={node.y} r={2}
                  fill="white" opacity={0}
                  style={{ transition: 'opacity 0.4s ease' }}/>
                <g ref={el => nodeLabelRefs.current[i] = el} opacity={0}
                  style={{ transition: 'opacity 0.4s ease' }}>
                  <rect x={lx} y={node.y - 11} width={lw} height={20} rx={5}
                    fill="rgba(0,0,0,0.82)" stroke="#ff6a00" strokeWidth="0.7"/>
                  <text x={lx + 8} y={node.y + 3.5} fill="#ffb347"
                    fontSize="10.5" fontWeight="700" fontFamily="monospace"
                    style={{ userSelect: 'none' }}>{node.label}</text>
                </g>
              </g>
            );
          })}

          {/* Travelling pulse dot */}
          <circle ref={pulse.outer.current ? undefined : el => { pulse.outer.current = el; }}
            cx={0} cy={0} r={26} fill="none" stroke="#ff6a00"
            strokeWidth="0.4" opacity={0.10}/>
          <circle ref={el => { pulse.mid.current = el; }}
            cx={0} cy={0} r={16} fill="none" stroke="#ff8c00"
            strokeWidth="1.2" opacity={0.38} filter="url(#ng2)"/>
          <circle ref={el => { pulse.glow.current = el; }}
            cx={0} cy={0} r={9} fill="#ff5500" opacity={0.55} filter="url(#ng2)"/>
          <circle ref={el => { pulse.core.current = el; }}
            cx={0} cy={0} r={4} fill="white" opacity={1}/>
          <circle ref={el => { pulse.inner.current = el; }}
            cx={0} cy={0} r={2} fill="#ff6a00" opacity={1}/>
          {[1.6, 2.0, 1.3, 1.5].map((r, i) => (
            <circle key={i} ref={el => { pulse.sparks.current[i] = el; }}
              cx={0} cy={0} r={r} fill="#ff8c00"
              opacity={[0.50, 0.38, 0.30, 0.22][i]}/>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ── Export — disable on mobile (< 768px) and on prefers-reduced-motion ────────
// The trail is a purely decorative element in margin columns. On small screens
// those margins collapse and the component wastes GPU budget for no visual gain.
const ScrollEnergyTrailMemo = memo(ScrollEnergyTrailInner);

export default function ScrollEnergyTrail() {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReduced) return null;

  return <ScrollEnergyTrailMemo />;
}
