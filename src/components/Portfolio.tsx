import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Tag, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO, PORTFOLIO_SECTION, Project } from '../data/content';

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive unique categories dynamically
  const categories = ['All', ...Array.from(new Set(PORTFOLIO.map(p => p.category)))];

  const filteredProjects = activeCategory === 'All' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(p => p.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background visual depth */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Connection node for the scroll energy trail */}
      <div id="portfolio-trail" className="absolute top-[48%] left-[22%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">
        
        {/* Section Heading & Category Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="text-left max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">CURATED PORTFOLIO</span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
              {PORTFOLIO_SECTION.title}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              {PORTFOLIO_SECTION.description}
            </p>
          </div>

          {/* Filtering Pillars */}
          <div className="flex flex-wrap gap-2 font-mono text-xs overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-orange-600 border-orange-500 text-white font-semibold shadow-[0_0_15px_rgba(255,106,0,0.35)]' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Grid column */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-850 h-[400px] flex flex-col justify-end"
              >
                {/* Background image panel */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-40 opacity-50 grayscale hover:grayscale-0"
                  />
                  {/* Premium overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/80 to-transparent/10 z-10"></div>
                </div>

                {/* Card Content Column */}
                <div className="p-8 relative z-20 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-orange-500 bg-orange-950/40 border border-orange-900/40 py-1 px-3.5 rounded-full">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">{project.year}</span>
                  </div>

                  <h3 className="font-sans font-black text-xl sm:text-2xl text-white group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-xs text-neutral-400 font-sans line-clamp-2 max-w-lg">
                    {project.description}
                  </p>

                  {/* Tags list */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-900">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Reveal case study link indicator */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs text-orange-500 font-mono font-bold uppercase tracking-widest opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-12 transition-all duration-300">
                    Inspect Case Metrics
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed case study slide-drawer overlay */}
        <AnimatePresence>
          {selectedProject && selectedProject.caseStudy && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/90 z-50 pointer-events-auto backdrop-blur-md"
              />

              {/* Case study sheet card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="fixed inset-x-4 bottom-4 top-20 md:inset-x-12 md:bottom-12 md:top-24 max-w-5xl mx-auto bg-neutral-950 border border-neutral-850 rounded-2xl z-50 overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
              >
                {/* Header details block */}
                <div className="relative h-48 sm:h-64 shrink-0 bg-neutral-900 overflow-hidden border-b border-neutral-900">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                  
                  {/* Close button placement */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2.5 bg-neutral-950/80 backdrop-blur rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 sm:left-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-orange-500 font-bold bg-neutral-950 py-1 px-3 rounded border border-neutral-800">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight mt-3">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Body Case Study Content Scroller */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                  
                  {/* Meta Matrix Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-900 font-sans text-xs">
                    <div>
                      <span className="text-neutral-500 block font-mono text-[9px] uppercase tracking-wider mb-0.5">COMPILATION CLIENT</span>
                      <span className="text-white font-bold flex items-center gap-1.5 estimation">
                        <User className="w-3.5 h-3.5 text-orange-500" />
                        {selectedProject.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block font-mono text-[9px] uppercase tracking-wider mb-0.5">CHRONOLOGY YEAR</span>
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        {selectedProject.year}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block font-mono text-[9px] uppercase tracking-wider mb-0.5">FOCUS DOMAIN</span>
                      <span className="text-white font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5 text-orange-500" />
                        {selectedProject.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block font-mono text-[9px] uppercase tracking-wider mb-0.5">METRIC RATING</span>
                      <span className="text-white font-bold font-mono text-orange-500">CURATED EXTREME</span>
                    </div>
                  </div>

                  {/* Structured Editorial sections split */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                    
                    {/* Focus Breakdown on actual problems & solutions */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-lg text-white">The Structural Challenge</h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                          {selectedProject.caseStudy?.challenge}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-lg text-white">Our Custom Solution</h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                          {selectedProject.caseStudy?.solution}
                        </p>
                      </div>
                    </div>

                    {/* Left: Highlight Quantifiable Deliverables / Results */}
                    <div className="md:col-span-5 p-6 rounded-xl bg-neutral-900 border border-neutral-850 h-fit space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-orange-500 font-extrabold block">
                        QUANTIFIED IMPACTS
                      </h4>

                      <ul className="space-y-4">
                        {selectedProject.caseStudy?.results.map((res, i) => (
                          <li key={i} className="flex items-start gap-2 text-neutral-200 text-xs sm:text-sm font-sans leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Footer close */}
                <div className="p-4 sm:p-6 border-t border-neutral-900 bg-neutral-900/30 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-2.5 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                  >
                    Dismiss Case Study
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default memo(Portfolio);
