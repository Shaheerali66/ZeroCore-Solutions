import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Agency', href: '/agency' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Our Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on route change to make sure pages load at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'py-4 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900/50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'py-6 bg-transparent'
          }`}
      >
        <div id="nav-container" className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">

          {/* Brand logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group cursor-pointer select-none shrink-0"
          >
            <div className="w-15 h-15 rounded-lg overflow-hidden transition-all duration-500 group-hover:rotate-12 group-hover:scale-105">
              <img
                src="Zero Core Logo ( Orange & white )111-01.png"
                alt="ZeroCore Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-sans font-black text-white text-base tracking-widest leading-none group-hover:text-orange-500 transition-colors">ZEROCORE</span>
                <span className="font-serif font-light text-orange-500 text-sm ml-1">solutions</span>
              </div>
              <p className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase leading-none mt-0.5">ELITE AGENCY</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 relative py-1.5 group cursor-pointer ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-orange-500'
                    }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,106,0,0.25)] hover:shadow-[0_0_30px_rgba(255,106,0,0.45)] transition-all duration-300 flex items-center gap-1.5 group cursor-pointer"
            >
              Consult Squad
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 top-[72px] bg-neutral-950/98 backdrop-blur-lg z-30 lg:hidden flex flex-col pointer-events-auto overflow-hidden p-8 border-t border-neutral-900"
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-6">
              {NAV_ITEMS.map((item, i) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-sans font-bold text-xl transition-colors uppercase tracking-wide cursor-pointer ${isActive ? 'text-orange-500' : 'text-neutral-200 hover:text-orange-500'
                        }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
              >
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-8 py-3.5 px-10 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-mono text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all cursor-pointer flex items-center gap-2"
                >
                  Initialize Project
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <div className="text-center font-mono text-[10px] text-neutral-500 py-4 border-t border-neutral-900">
              ZEROCORE SOLUTIONS • ELITE MULTI-PLATFORM LABS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
