import React from 'react';
import { motion } from 'motion/react';
import {
  Code2, ShoppingBag, TrendingUp,
  Layers, Palette, Camera, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Service, SectionContent } from '../types';

// Safe Lucide mapping list
const iconMap: Record<string, React.ComponentType<any>> = {
  Code2,
  ShoppingBag,
  TrendingUp,
  Layers,
  Palette,
  Camera
};

import { SERVICES_SECTION } from '../data/content';
import { SERVICES } from '../data/services';

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Dynamic scrolling indicator anchor node */}
      <div id="services-trail" className="absolute top-[50%] left-[78%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">

        {/* Section Header */}
        <div className="text-center md:text-left max-w-2xl mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">CORE PORTFOLIO OFFERINGS</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {SERVICES_SECTION.title}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            {SERVICES_SECTION.description}
          </p>
        </div>

        {/* Dynamic Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Code2;

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={service.id}
                className="group relative rounded-xl bg-neutral-900 border border-neutral-800/80 p-6 flex flex-col justify-between h-auto hover:border-orange-500/30 hover:bg-neutral-900/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,106,0,0.1)] transition-all duration-300"
              >
                {/* Glowing subtle top rim divider */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/55 transition-all duration-500"></div>

                <div>
                  {/* Category + Icon Line */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold bg-neutral-950 py-1 px-3.5 rounded-full border border-neutral-850">
                      {service.category}
                    </span>
                    <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl group-hover:bg-neutral-900 group-hover:border-orange-500/50 group-hover:text-orange-500 text-neutral-400 transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-sans font-black text-lg text-white group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Explanation Blurb */}
                  <p className="mt-4 text-xs font-sans text-neutral-400 leading-relaxed min-h-16">
                    {service.description}
                  </p>

                  {/* Bullet Bullet Features */}
                  <ul className="mt-6 pt-6 border-t border-neutral-850 space-y-2.5">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-neutral-300 text-xs font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500/85 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Action link */}
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 pt-4 flex items-center justify-between text-neutral-400 group-hover:text-orange-500 transition-colors border-t border-transparent cursor-pointer"
                >
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Inquire Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Static Info blurb */}
        <div className="mt-12 text-center text-neutral-500 font-mono text-[10px] tracking-wider uppercase">
          ✦ ZeroCore Solutions ✦ High-Velocity Digital Architecture ✦
        </div>

      </div>
    </section>
  );
}
