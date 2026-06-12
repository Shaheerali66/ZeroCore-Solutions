import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Lightbulb, TrendingUp, Cpu } from 'lucide-react';
import { ABOUT } from '../data/content';

interface StatCounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

function StatCounter({ end, suffix = '', decimals = 0 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-100px 0px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function outQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * end;
      
      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <div ref={elementRef} className="font-sans font-black text-4xl sm:text-5xl text-orange-500 tracking-tight select-none">
      {count.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default function About() {
  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-orange-500" />,
      title: 'Bleeding-Edge Tech Stack',
      desc: 'We engineer with Vite, React, Node, and customized AI models, guaranteeing instantaneous speeds and military-grade platform runtime stability.'
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-orange-500" />,
      title: 'Human-Centric Creative UI',
      desc: 'We don\'t do templates. Our design team maps out bespoke interactive workflows following cognitive psychology research and branding philosophies.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
      title: 'Performance Marketing',
      desc: 'Our funnels don\'t just gather impressions — they build persistent client acquisitions with strict tracking matrix configurations and high conversion rates.'
    }
  ];

  return (
    <section 
      id="agency" 
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background ambient mesh details */}
      <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none"></div>

      {/* Embedded node for the global neon glowing line */}
      <div id="about-trail" className="absolute top-[50%] left-[24%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">
        
        {/* Section Title & Sub-header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">WHO WE ARE</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {ABOUT.title}
          </h2>
          <p className="mt-4 text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
            {ABOUT.description}
          </p>
        </div>

        {/* Two-Column Grid Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Pillars list */}
          <div className="lg:col-span-7 space-y-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={pillar.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-neutral-900/30 border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/50 transition-all group"
              >
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg group-hover:bg-neutral-950 group-hover:border-orange-500 transition-colors">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white group-hover:text-orange-400 transition-colors">{pillar.title}</h3>
                  <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed font-sans">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Premium Glowing Statistics Tiles Group */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {ABOUT.stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={stat.label}
                className="p-6 rounded-xl bg-neutral-905 border border-neutral-900 hover:border-orange-500/20 hover:bg-neutral-900/20 transition-all flex flex-col justify-between h-44 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="font-mono text-[10px] text-neutral-400 tracking-wider">{stat.label}</span>
                <StatCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                <p className="text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">{stat.subtext}</p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
