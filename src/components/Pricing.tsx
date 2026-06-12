import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info, Sparkles, Building2, Rocket, Globe } from 'lucide-react';
import { PRICING_SECTION } from '../data/content';
import { PRICING } from '../data/pricing';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Multiplier or discount if toggling billing cycles
  const getCalculatedPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      // 10% discount for upfront annual pledges
      return Math.round((basePrice * 12 * 0.90) / 12);
    }
    return basePrice;
  };

  const getTierIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter': return <Info className="w-5 h-5 text-orange-500" />;
      case 'growth': return <Rocket className="w-5 h-5 text-orange-500 animate-bounce" style={{ animationDuration: '3s' }} />;
      case 'business': return <Building2 className="w-5 h-5 text-orange-500" />;
      default: return <Globe className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: '8s' }} />;
    }
  };

  return (
    <section
      id="pricing"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background neon elements */}
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Embedded scrolling line node */}
      <div id="pricing-trail" className="absolute top-[50%] left-[75%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">

        {/* Section Heading & Interactive Billing Switcher Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 text-left">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">DYNAMIC PRICING PRICING</span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
              {PRICING_SECTION.title}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              {PRICING_SECTION.description}
            </p>
          </div>

          {/* Billing Switcher Button */}
          <div className="bg-neutral-900 p-1.5 rounded-full border border-neutral-800 flex items-center shrink-0 w-fit">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${billingCycle === 'monthly'
                ? 'bg-orange-600 text-white font-semibold shadow-[0_0_12px_rgba(255,106,0,0.3)]'
                : 'text-neutral-400 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5 ${billingCycle === 'yearly'
                ? 'bg-orange-600 text-white font-semibold shadow-[0_0_12px_rgba(255,106,0,0.3)]'
                : 'text-neutral-400 hover:text-white'
                }`}
            >
              Yearly
              <span className="bg-orange-950 text-orange-400 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-orange-900/50">
                -10% Save
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Pricing cards column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING.map((plan, idx) => {
            const finalPrice = getCalculatedPrice(plan.pricePKR);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                key={plan.id}
                className={`group relative rounded-2xl bg-neutral-900 border flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 ${plan.popular
                  ? 'border-orange-500 shadow-[0_0_35px_rgba(255,106,0,0.15)] bg-neutral-905 -translate-y-2'
                  : 'border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900/50'
                  }`}
              >
                {/* Popular Glow Indicator Sparkle banner */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-amber-500 text-white text-[9px] font-mono tracking-widest uppercase font-extrabold px-4 py-1.5 rounded-bl-sm shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-white animate-pulse" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Tier Title icon */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-850">
                      {getTierIcon(plan.name)}
                    </div>
                    <span className="font-sans font-black text-sm text-white tracking-tight">{plan.name}</span>
                  </div>

                  {/* Pricing PKR description */}
                  <div className="mb-6">
                    <span className="font-sans text-[11px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                      ESTIMATED PKR AMOUNT
                    </span>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-mono text-2xl sm:text-3xl text-white font-black tracking-tighter">
                        PKR {finalPrice.toLocaleString()}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        /{billingCycle === 'yearly' ? 'mo billed annually' : 'mo'}
                      </span>
                    </div>
                  </div>

                  {/* Plan narrative details */}
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed min-h-12 border-b border-neutral-850 pb-5">
                    {plan.description}
                  </p>

                  {/* Custom features matrix check-marks */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans leading-snug">
                        <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5 bg-orange-950/20 border border-orange-500/35 rounded-full p-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Action Action Call */}
                <div className="mt-8 pt-6 border-t border-neutral-850">
                  <a
                    href="#contact"
                    className={`w-full py-3 px-4 font-mono text-xs font-bold uppercase tracking-widest text-center rounded-xl transition-all cursor-pointer flex items-center justify-center ${plan.popular
                      ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:shadow-[0_0_25px_rgba(255,106,0,0.6)]'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                      }`}
                  >
                    {plan.buttonText || 'Deploy Suite'}
                  </a>
                  <p className="text-[9px] text-neutral-500 text-center font-mono mt-3 uppercase tracking-wider">
                    ✦ Secure milestone contractual terms
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
