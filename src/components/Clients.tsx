import React from 'react';
import { CLIENTS, CLIENTS_SECTION } from '../data/clients';

/**
 * Clients.tsx — Premium infinite-scroll single-row marquee.
 *
 * - Single horizontal row, full-width
 * - White cards with real brand-color logos
 * - Pause-on-hover (entire marquee)
 * - GPU-accelerated CSS animation via translate3d
 * - Logos tripled for seamless infinite loop
 */
export default function Clients() {
  // Triple the list for seamless infinite loop
  const tripled = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section
      id="clients"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Ambient depth glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[300px] bg-orange-600/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25 mb-20">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">
            TRUSTED PARTNERS
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
            {CLIENTS_SECTION.title}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {CLIENTS_SECTION.description}
          </p>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="relative marquee-container">
        {/* Left / Right fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Single scrolling row */}
        <div className="flex items-center" style={{ width: 'max-content' }}>
          <div className="flex items-center gap-8 sm:gap-10 animate-marquee-clients">
            {tripled.map((client, i) => (
              <a
                key={`cl-${client.id}-${i}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="client-card flex-shrink-0 flex items-center justify-center rounded-2xl bg-white px-10 py-7 sm:px-12 sm:py-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer"
                style={{
                  width: 'clamp(200px, 22vw, 280px)',
                  height: 'clamp(100px, 12vw, 140px)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-30 sm:h-40 w-auto object-contain select-none"
                  draggable={false}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-neutral-800" />
          <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
            {CLIENTS.length}+ brands trust ZCS
          </span>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-neutral-800" />
        </div>
      </div>
    </section>
  );
}
