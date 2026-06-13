import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquareQuote, Star } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIALS_SECTION } from '../data/content';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto transition every 6 seconds
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = () => {
    stopAutoplay();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    startAutoplay();
  };

  if (TESTIMONIALS.length === 0) return null;
  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Dynamic scrolling indicator anchor node */}
      <div id="testimonials-trail" className="absolute top-[48%] left-[78%] w-1.5 h-1.5 pointer-events-none"></div>

      {/* Decorative large quotes watermark */}
      <div className="absolute right-12 top-10 text-neutral-900 pointer-events-none select-none opacity-20 hidden md:block">
        <MessageSquareQuote className="w-64 h-64" strokeWidth={0.5} />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-25">
        
        {/* Section Heading Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">GLOBAL REVIEWS TESTIMONIALS</span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
            {TESTIMONIALS_SECTION.title}
          </h2>
        </div>

        {/* Dynamic Slider Module */}
        <div className="relative rounded-2xl bg-neutral-900 border border-neutral-850 p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Rating stars line */}
              <div className="flex items-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Core review paragraph quotation text */}
              <blockquote className="font-sans font-medium text-lg sm:text-2xl text-neutral-100 leading-relaxed italic">
                “{current.text}”
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-neutral-850">
                {/* Author portrait name */}
                <div className="flex items-center gap-4">
                  <img
                    src={current.imageUrl}
                    alt={current.author}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-orange-500/30"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-white text-base leading-none">
                      {current.author}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1.5 uppercase tracking-wider">
                      {current.designation}, {current.company}
                    </p>
                  </div>
                </div>

                {/* Manual Chevron controllers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer hover:scale-105"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer hover:scale-105"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Bottom active dot lines */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {TESTIMONIALS.map((t, index) => (
              <button
                key={t.id}
                onClick={() => {
                  stopAutoplay();
                  setCurrentIndex(index);
                  startAutoplay();
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === index ? 'w-6 bg-orange-500' : 'bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(Testimonials);
