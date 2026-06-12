import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code2, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO } from '../data/content';

export default function Hero() {
  const handleScrollToPart = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative z-10 min-h-screen flex items-center justify-center bg-transparent overflow-hidden pt-24"
    >
      {/* Cinematic grid overlay and glowing orange atmospheric orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-60"></div>
      
      {/* Fluid brand glowing accent light */}
      <div className="absolute top-[25%] left-[5%] w-[320px] h-[320px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* Dynamic scrolling indicator anchor node */}
      <div id="hero-trail" className="absolute top-[48%] left-[72%] w-1.5 h-1.5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16 text-center select-none z-25">
        
        {/* Futuristic Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-1.5 mb-8 hover:border-orange-500/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] font-semibold text-neutral-300 uppercase">
            Architecting Future Digital Standards
          </span>
        </motion.div>

        {/* Master Narrative Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="font-sans font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-tight leading-[0.95] max-w-5xl mx-auto"
        >
          {HERO.title} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 font-serif font-semibold italic">
            {HERO.highlight}
          </span>
        </motion.h1>

        {/* Brand Core Capabilities Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 font-sans text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          {HERO.description}
        </motion.p>

        {/* Dual Call to Action Trigger Trays */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto py-4 px-8 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,106,0,0.4)] hover:shadow-[0_0_40px_rgba(255,106,0,0.6)] cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            {HERO.ctaPrimary}
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/services"
            className="w-full sm:w-auto py-4 px-8 bg-transparent border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900/30 text-neutral-300 hover:text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            {HERO.ctaSecondary}
          </Link>
        </motion.div>

        {/* Floating Developer Interactive Visualizer Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80 group-hover:via-orange-400 transition-all duration-1000"></div>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 rounded-t-lg border-b border-neutral-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">ZCS_CORE_NODE_ENGINE.SH - v3.5</span>
            <div className="w-10"></div>
          </div>

          {/* Code Stream block */}
          <div className="p-6 text-left font-mono text-[11px] sm:text-xs text-neutral-400 overflow-x-auto scrollbar-none leading-relaxed space-y-1 bg-neutral-950">
            <span className="text-orange-500">const</span> <span className="text-blue-400">agency</span> = <span className="text-purple-400">new</span> <span className="text-emerald-400">ZeroCoreSolutions</span>({`{`}
            <div className="pl-6 text-neutral-300">
              name: <span className="text-green-300">"ZeroCore Solutions"</span>,<br />
              creed: <span className="text-green-300">"We Build Digital Experiences That Scale Brands"</span>,<br />
              offerings: [<span className="text-green-300">"Web Development"</span>, <span className="text-green-300">"E-Commerce"</span>, <span className="text-green-300">"Analytics Marketing"</span>, <span className="text-green-300">"AI Systems"</span>],<br />
              engine: <span className="text-amber-300">"Vite + React + Framer Motion"</span>,<br />
              status: <span className="text-green-400">"ACTIVE_STEADY_STATE_RUNNING"</span>
            </div>
            {`});`}<br /><br />
            <span className="text-neutral-500">// Initialize flow and register active scrolling visual energy trails</span><br />
            <span className="text-blue-400">agency</span>.<span className="text-yellow-400">initializeNeonTrail</span>(<span className="text-orange-400">{`{ stroke: "#ff6a00", flow: "linear-scroll" }`}</span>);
          </div>
        </motion.div>

      </div>

      {/* Bounce-Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-25 text-neutral-500 hover:text-orange-500 transition-colors pointer-events-auto">
        <a 
          href="#agency" 
          onClick={(e) => handleScrollToPart(e, '#agency')}
          className="flex flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] cursor-pointer"
        >
          Scroll Journey
          <ArrowDown className="w-4 h-4 animate-bounce mt-1 text-orange-500" />
        </a>
      </div>
    </section>
  );
}
