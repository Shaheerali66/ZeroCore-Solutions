/**
 * AnimatedBackground — Premium cinematic shader simulation
 *
 * Layer stack (bottom → top):
 *  1. Warm-tinted base fill  (not pure black)
 *  2. Large deep-space orbs  (slow ambient glow blobs)
 *  3. Fluid light wave bands  (horizontal sinusoidal sweeps)
 *  4. Far particle layer      (small, very slow, creates depth)
 *  5. Near particle layer     (medium, slightly faster)
 *  6. Edge vignette           (keeps focus on content)
 *
 * Runs at 60 fps; background is intentionally drawn at 30 fps
 * by skipping every other frame to preserve compositor budget
 * for page scroll and UI interactions.
 *
 * Performance:
 *  - prefers-reduced-motion: renders a static CSS gradient instead (zero rAF budget)
 *  - Mobile (≤768 px): renders a static CSS gradient — zero canvas, zero rAF
 *  - React.memo: prevents re-renders from parent state changes
 */

import React, { useEffect, useRef, memo, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  a: number;  da: number;
  layer: 0 | 1; // 0 = far (small/slow), 1 = near (medium/faster)
}

interface Orb {
  bx: number; by: number; r: number;
  col: string; sp: number; ph: number;
  ax: number; ay: number; // amplitude multipliers
}

interface Wave {
  by: number;     // base Y as fraction of H
  amp: number;    // vertical oscillation amplitude (fraction of H)
  spd: number;    // oscillation speed
  ph: number;     // phase offset
  col: string;    // RGB string
  op: number;     // base opacity
  w: number;      // half-height of gradient band (fraction of H)
}

// ── Seeded random helper ───────────────────────────────────────────────────────
const R = (min: number, max: number) => Math.random() * (max - min) + min;

// ── Static fallback for prefers-reduced-motion ────────────────────────────────
// Zero JS animation cost — a simple CSS gradient that matches the brand palette.
function StaticBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 15% 22%, rgba(255,75,0,0.13) 0%, transparent 70%),
          radial-gradient(ellipse 70% 55% at 85% 55%, rgba(255,115,0,0.10) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 50% 88%, rgba(210,50,0,0.07) 0%, transparent 70%)
        `,
      }}
    />
  );
}

// ── Mobile static background — pure CSS, zero JS, zero animation ──────────────
// A "frozen" snapshot of what the animated canvas looks like mid-playback.
// Mimics: 2 large orange orbs, a subtle warm wave band, edge vignette.
function MobileStaticBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        // Layer 1 — near-black warm base
        backgroundColor: '#0a0704',
        background: [
          // Orb 1 — top-left warm amber (mirrors animated orb at bx:0.15, by:0.22)
          'radial-gradient(ellipse 75% 55% at 14% 22%, rgba(255,75,0,0.14) 0%, rgba(255,60,0,0.05) 45%, transparent 70%)',
          // Orb 2 — right-center deep orange (mirrors bx:0.85, by:0.55)
          'radial-gradient(ellipse 65% 52% at 87% 54%, rgba(255,115,0,0.11) 0%, rgba(255,90,0,0.04) 45%, transparent 70%)',
          // Orb 3 — bottom-center ember (mirrors bx:0.50, by:0.88)
          'radial-gradient(ellipse 55% 45% at 50% 90%, rgba(210,50,0,0.09) 0%, transparent 65%)',
          // Orb 4 — far-left mid (mirrors bx:0.05, by:0.65)
          'radial-gradient(ellipse 40% 38% at 4% 65%, rgba(255,45,0,0.07) 0%, transparent 60%)',
          // Wave band — horizontal warm sweep at ~28% height
          'linear-gradient(to bottom, transparent 20%, rgba(255,80,0,0.035) 28%, rgba(255,80,0,0.045) 32%, transparent 42%)',
          // Vignette — dark edges like the canvas radial vignette
          'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.72) 100%)',
          // Near-black warm base
          'linear-gradient(135deg, #0d0603 0%, #090503 50%, #0b0604 100%)',
        ].join(', '),
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AnimatedBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width  = W;
      cv.height = H;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── 1. Ambient deep-space orbs ────────────────────────────────────────
    const orbs: Orb[] = [
      { bx:0.15, by:0.22, r:0.62, col:'255,75,0',   sp:0.00014, ph:0.00, ax:0.09, ay:0.07 },
      { bx:0.85, by:0.55, r:0.68, col:'255,115,0',  sp:0.00020, ph:2.09, ax:0.07, ay:0.08 },
      { bx:0.50, by:0.88, r:0.50, col:'210,50,0',   sp:0.00017, ph:4.19, ax:0.06, ay:0.06 },
      { bx:0.05, by:0.65, r:0.40, col:'255,45,0',   sp:0.00012, ph:1.05, ax:0.08, ay:0.05 },
      { bx:0.90, by:0.15, r:0.36, col:'255,95,0',   sp:0.00018, ph:3.30, ax:0.05, ay:0.09 },
    ];

    // ── 2. Fluid light wave bands ─────────────────────────────────────────
    const waves: Wave[] = [
      { by:0.28, amp:0.06, spd:0.00022, ph:0.00, col:'255,80,0',  op:0.045, w:0.18 },
      { by:0.55, amp:0.04, spd:0.00030, ph:1.57, col:'255,110,0', op:0.035, w:0.14 },
      { by:0.78, amp:0.08, spd:0.00018, ph:3.14, col:'200,55,0',  op:0.030, w:0.22 },
    ];

    // ── 3. Dual-layer particles ───────────────────────────────────────────
    const FAR  = 22;
    const NEAR = 18;
    const particles: Particle[] = [
      ...Array.from({ length: FAR  }, () => ({
        x: R(0, 1440), y: R(0, 900),
        r: R(0.4, 1.1),
        vx: R(-0.07, 0.07), vy: R(-0.14, -0.04),
        a: R(0.04, 0.18), da: Math.random() > 0.5 ? 1 : -1,
        layer: 0 as const,
      })),
      ...Array.from({ length: NEAR }, () => ({
        x: R(0, 1440), y: R(0, 900),
        r: R(1.2, 2.8),
        vx: R(-0.11, 0.11), vy: R(-0.22, -0.06),
        a: R(0.08, 0.35), da: Math.random() > 0.5 ? 1 : -1,
        layer: 1 as const,
      })),
    ];

    let t = 0;
    let frame = 0;

    const drawOrb = (cx: number, cy: number, r: number, col: string, op0: number) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,    `rgba(${col},${op0})`);
      g.addColorStop(0.30, `rgba(${col},${(op0 * 0.42).toFixed(3)})`);
      g.addColorStop(0.65, `rgba(${col},${(op0 * 0.10).toFixed(3)})`);
      g.addColorStop(1,    `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };

    const drawWave = (cyFrac: number, col: string, op: number, hFrac: number) => {
      const cy = cyFrac * H;
      const bH = hFrac * H;
      const g = ctx.createLinearGradient(0, cy - bH, 0, cy + bH);
      g.addColorStop(0,   `rgba(${col},0)`);
      g.addColorStop(0.4, `rgba(${col},${op})`);
      g.addColorStop(0.6, `rgba(${col},${op})`);
      g.addColorStop(1,   `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, cy - bH, W, bH * 2);
    };

    const drawParticle = (p: Particle) => {
      const glowR = p.layer === 0 ? p.r * 3.0 : p.r * 4.5;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
      g.addColorStop(0,   `rgba(255,115,35,${p.a * 0.70})`);
      g.addColorStop(0.45,`rgba(255,70,0,${p.a * 0.20})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowR, 0, 6.2832);
      ctx.fillStyle = g;
      ctx.fill();

      // Solid core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = `rgba(255,160,60,${p.a * 0.82})`;
      ctx.fill();
    };

    const tick = () => {
      animId = requestAnimationFrame(tick);
      frame++;

      // Background canvas renders at ~30 fps by skipping odd frames.
      if (frame % 2 !== 0) return;

      t++;
      ctx.clearRect(0, 0, W, H);

      const S = Math.max(W, H);

      // ── Draw orbs ─────────────────────────────────────────────────────
      for (const o of orbs) {
        const cx = o.bx * W + Math.sin(t * o.sp * 1000 + o.ph) * W * o.ax;
        const cy = o.by * H + Math.cos(t * o.sp * 1000 + o.ph) * H * o.ay;
        drawOrb(cx, cy, o.r * S, o.col, 0.13);
      }

      // ── Draw wave bands ────────────────────────────────────────────────
      for (const wv of waves) {
        const oscY = wv.by + Math.sin(t * wv.spd * 1000 + wv.ph) * wv.amp;
        drawWave(oscY, wv.col, wv.op, wv.w);
      }

      // ── Draw far particles first (depth ordering) ─────────────────────
      for (const p of particles) {
        if (p.layer !== 0) continue;
        p.x += p.vx; p.y += p.vy;
        p.a += p.da * 0.0012;
        if (p.a > 0.20 || p.a < 0.03) p.da *= -1;
        if (p.y < -8)  { p.y = H + 8;  p.x = R(0, W); }
        if (p.y > H+8)   p.y = -8;
        if (p.x < -8)  p.x = W + 8;
        if (p.x > W+8)   p.x = -8;
        drawParticle(p);
      }

      // ── Draw near particles on top ─────────────────────────────────────
      for (const p of particles) {
        if (p.layer !== 1) continue;
        p.x += p.vx; p.y += p.vy;
        p.a += p.da * 0.0018;
        if (p.a > 0.38 || p.a < 0.06) p.da *= -1;
        if (p.y < -10) { p.y = H + 10; p.x = R(0, W); }
        if (p.y > H+10)  p.y = -10;
        if (p.x < -10)  p.x = W + 10;
        if (p.x > W+10)  p.x = -10;
        drawParticle(p);
      }

      // ── Vignette ──────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W/2, H/2, H * 0.28, W/2, H/2, H * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}

// ── Export — three-way gate ───────────────────────────────────────────────────
//  1. prefers-reduced-motion  →  StaticBackground   (minimal CSS gradient)
//  2. Mobile ≤ 768 px         →  MobileStaticBackground (rich frozen CSS)
//  3. Desktop                 →  AnimatedBackgroundCanvas (full canvas animation)
const AnimatedBackgroundCanvasMemo = memo(AnimatedBackgroundCanvas);

export default function AnimatedBackground() {
  // Detect mobile once on mount — avoids SSR mismatch and keeps hook stable.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);

    // Keep in sync if the user rotates/resizes across the breakpoint.
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // prefers-reduced-motion gate (checked synchronously — no flicker risk)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return <StaticBackground />;

  // While the media-query result resolves (one paint), render nothing to avoid
  // a flash of the canvas on mobile before we know the viewport size.
  if (isMobile === null) return null;

  if (isMobile) return <MobileStaticBackground />;

  return <AnimatedBackgroundCanvasMemo />;
}
