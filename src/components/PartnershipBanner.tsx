import React, { memo } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * PartnershipBanner — Official partnership announcement section.
 *
 * Layout: 2-column on desktop (text left, logo card right), stacked on mobile.
 * Background: pulsing radial orange glow (CSS keyframe, no JS animation).
 * Right card: floating orange-bordered logo panel with VERIFIED PARTNER badge.
 */
function PartnershipBanner() {
  return (
    <section
      id="partnership"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* ── CSS-only animated background glow ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="partnership-glow-orb pointer-events-none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(255,90,0,0.10) 0%, rgba(255,50,0,0.04) 45%, transparent 70%)',
          borderRadius: '50%',
          animation: 'partnerGlowPulse 6s ease-in-out infinite',
        }}
      />
      {/* Secondary accent orb — top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-8%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(ellipse at center, rgba(255,115,0,0.07) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      {/* Tertiary accent orb — bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(ellipse at center, rgba(210,55,0,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── CSS keyframe injected via <style> ─────────────────────────────── */}
      <style>{`
        @keyframes partnerGlowPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1);    }
          50%       { opacity: 1.0; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes partnerCardFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes partnerBorderGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,100,0,0.25), 0 0 60px rgba(255,60,0,0.10), inset 0 0 20px rgba(255,80,0,0.04); }
          50%       { box-shadow: 0 0 35px rgba(255,100,0,0.40), 0 0 90px rgba(255,60,0,0.18), inset 0 0 30px rgba(255,80,0,0.07); }
        }
        @keyframes partnerBadgePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255,106,0,0.5);  }
          50%       { box-shadow: 0 0 18px rgba(255,106,0,0.9); }
        }
        @keyframes partnerScanLine {
          0%   { top: -2px;   opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.6; }
          100% { top: 100%;   opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ──────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 bg-orange-950/60 border border-orange-500/50 text-orange-400 font-mono text-[10px] uppercase tracking-[0.22em] font-black px-3.5 py-1.5 rounded-full"
                style={{ animation: 'partnerBadgePulse 3s ease-in-out infinite' }}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                Official Creative Partnership
              </span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h2 className="font-sans font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight leading-none">
                ZeroCore Solutions
                <span className="text-orange-500"> × </span>
                <span className="text-white whitespace-nowrap">Youth Innovation Challange</span>
              </h2>

              {/* Subheading accent line */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px w-8 bg-orange-500" />
                <span className="font-mono text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                  Official Creative Partner
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-lg">
              We are proud to announce our official partnership with{' '}
              <span className="text-white font-semibold whitespace-nowrap">Youth Innovation Challenge</span>{' '}
              empowering the next generation of innovators with world-class creative and digital solutions.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-2 flex-wrap">
              {[
                { value: '2026', label: 'Partnership Year' },
                { value: '100%', label: 'Committed' },
                { value: 'YIC', label: 'Verified Partner' },
              ].map(stat => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="font-mono font-black text-xl text-white">{stat.value}</div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/zerocoresolution_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-3.5 px-7 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,106,0,0.4)] hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Learn More
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Logo card ─────────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          >
            <div className="relative w-full max-w-sm">

              {/* Outer glow halo */}
              <div
                aria-hidden="true"
                className="absolute inset-[-2px] rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,100,0,0.5) 0%, rgba(255,60,0,0.15) 50%, rgba(255,130,0,0.35) 100%)',
                  borderRadius: '18px',
                  filter: 'blur(1px)',
                }}
              />

              {/* Main card */}
              <div
                className="relative rounded-2xl bg-neutral-900 border border-orange-500/60 overflow-hidden"
                style={{
                  animation: 'partnerCardFloat 5s ease-in-out infinite, partnerBorderGlow 4s ease-in-out infinite',
                }}
              >

                {/* Animated scan-line effect */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,100,0,0.6), transparent)',
                    animation: 'partnerScanLine 4s linear infinite',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                />

                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600" />

                {/* Inner background pattern */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,80,0,0.06) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,100,0,0.04) 0%, transparent 65%)
                    `,
                  }}
                />

                {/* Card inner content */}
                <div className="relative z-5 p-8 sm:p-10 flex flex-col items-center gap-6">

                  {/* VERIFIED PARTNER badge */}
                  <div className="flex items-center gap-2 bg-neutral-950/80 border border-orange-500/40 rounded-full px-4 py-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400 font-black">
                      Verified Partner
                    </span>
                  </div>

                  {/* Logo image */}
                  <div className="w-full flex items-center justify-center py-4">
                    <img
                      src="/YIC logo.png"
                      alt="Youth Innovation Challenge Logo"
                      className="w-full max-w-[220px] h-auto object-contain select-none"
                      draggable={false}
                      loading="lazy"
                      onError={(e) => {
                        // Graceful fallback if logo doesn't exist yet
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Text fallback shown only if image fails */}
                    <div
                      style={{ display: 'none' }}
                      className="flex-col items-center justify-center gap-2"
                    >
                      <span className="font-mono font-black text-4xl text-orange-500">YIC</span>
                      <span className="font-sans text-xs text-neutral-400 text-center">Youth Innovation Challenge</span>
                    </div>
                  </div>

                  {/* Partnership label */}
                  <div className="w-full border-t border-neutral-800 pt-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 block">Creative Partner</span>
                      <span className="font-sans font-bold text-sm text-white">ZeroCore Solutions</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 block">Status</span>
                      <span className="flex items-center gap-1.5 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="font-mono text-xs text-green-400 font-bold">Official</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Corner accent dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-orange-500/50 shadow-[0_0_6px_rgba(255,106,0,0.5)]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-orange-500/50 shadow-[0_0_6px_rgba(255,106,0,0.5)]" />

            </div>
          </motion.div>

        </div>
      </div >
    </section >
  );
}

export default memo(PartnershipBanner);
