import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Agency', href: '/agency' },
    { label: 'Services', href: '/services' },
    { label: 'Clients', href: '/clients' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Our Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-black py-16 px-6 sm:px-8 border-t border-neutral-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left select-none relative z-20">

        {/* Brand details */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-8 h-8 rounded overflow-hidden">
              <img
                src="public/Zero Core Logo ( Orange & white )111-01.png"
                alt="ZeroCore Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center">
              <span className="font-sans font-black text-white text-sm tracking-widest uppercase">ZEROCORE</span>
              <span className="font-serif font-light text-orange-500 text-xs ml-1">solutions</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] font-mono text-neutral-500 tracking-wider">
            HIGH-END DIGITAL SERVICES • ESTABLISHED 2025
          </p>
        </div>

        {/* Floating Quick Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-widest text-neutral-400">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Scroll back up anchor bubble */}
        <div>
          <button
            onClick={handleScrollToTop}
            className="p-3 bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-white hover:border-orange-500 rounded-full cursor-pointer hover:scale-110 transition-all shadow-md group"
            title="Return to Peak"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Underline Copyright details */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-905 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-mono text-neutral-500">
        <p>Copyright © {new Date().getFullYear()} ZeroCore Solutions (ZCS). Engineered for extreme growth.</p>
        <p className="tracking-wide uppercase text-neutral-600">PREMIUM INTERACTIVE LABS • SECURED SSL</p>
      </div>
    </footer>
  );
}
