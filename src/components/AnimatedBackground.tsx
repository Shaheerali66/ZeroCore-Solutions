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
 */

import React, { useEffect, useRef } from 'react';

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

// ─────────────────────────────────────────────────────────────────────────────
export default function AnimatedBackground() {
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
    // Large, very soft blobs that drift slowly — the core of the "shader mesh" feel
    const orbs: Orb[] = [
      { bx:0.15, by:0.22, r:0.62, col:'255,75,0',   sp:0.00014, ph:0.00, ax:0.09, ay:0.07 },
      { bx:0.85, by:0.55, r:0.68, col:'255,115,0',  sp:0.00020, ph:2.09, ax:0.07, ay:0.08 },
      { bx:0.50, by:0.88, r:0.50, col:'210,50,0',   sp:0.00017, ph:4.19, ax:0.06, ay:0.06 },
      { bx:0.05, by:0.65, r:0.40, col:'255,45,0',   sp:0.00012, ph:1.05, ax:0.08, ay:0.05 },
      { bx:0.90, by:0.15, r:0.36, col:'255,95,0',   sp:0.00018, ph:3.30, ax:0.05, ay:0.09 },
    ];

    // ── 2. Fluid light wave bands ─────────────────────────────────────────
    // Horizontal soft-edged bands that oscillate up/down
    const waves: Wave[] = [
      { by:0.28, amp:0.06, spd:0.00022, ph:0.00, col:'255,80,0',  op:0.045, w:0.18 },
      { by:0.55, amp:0.04, spd:0.00030, ph:1.57, col:'255,110,0', op:0.035, w:0.14 },
      { by:0.78, amp:0.08, spd:0.00018, ph:3.14, col:'200,55,0',  op:0.030, w:0.22 },
    ];

    // ── 3. Dual-layer particles ───────────────────────────────────────────
    // Far layer: 22 tiny particles — slow, very low alpha — adds depth
    // Near layer: 18 medium particles — slightly faster, more visible
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
    let frame = 0; // frame counter for throttling

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
      // The compositor (scroll, hover, etc.) stays at 60 fps.
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

      // ── Vignette — keeps viewer eye toward centre content ──────────────
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
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,           // Sits behind content, above root black wrapper
        display: 'block',
        // GPU compositing layer — prevents jank during scroll
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}
