import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import {
  Send, PhoneCall, Mail,
  Check, AlertTriangle, Linkedin, Github, Instagram
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { CONTACT } from '../data/content';
import { EMAILJS_CONFIG } from '../data/emailjs';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          name: name,
          email: email,
          service_type: selectedService || 'Not specified',
          message: message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      setStatus('success');
      setName('');
      setEmail('');
      setSelectedService('');
      setMessage('');

      // Auto dismiss success after 5s
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMsg(
        err?.text || 'Something went wrong. Please try again or contact us via WhatsApp.'
      );

      // Auto dismiss error after 8s
      setTimeout(() => {
        setStatus('idle');
        setErrorMsg('');
      }, 8000);
    }
  };

  // WhatsApp connection endpoint
  const whatsappUrl = `https://wa.me/message/CEGX7O2HECVIG1`;

  return (
    <section
      id="contact"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background soft glowing effect */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Dynamic scrolling indicator anchor node */}
      <div id="contact-trail" className="absolute top-[48%] left-[78%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">

        {/* Section Header */}
        <div className="text-center md:text-left max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">ENGAGE THE TEAM</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
            {CONTACT.title}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            {CONTACT.description}
          </p>
        </div>

        {/* Two-Column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Contact Info details & channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-xl bg-neutral-905 border border-neutral-900 space-y-6">

              <h3 className="font-sans font-bold text-lg text-white">Direct Channels</h3>

              {/* WhatsApp Block */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group p-3.5 rounded-lg bg-neutral-900/40 border border-neutral-850 hover:border-green-500/30 hover:bg-neutral-950 transition-all cursor-pointer"
              >
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg group-hover:bg-green-950 group-hover:border-green-500 text-green-400 transition-colors">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-neutral-500 tracking-wider">Fast Response</span>
                  <p className="font-sans font-bold text-sm text-white group-hover:text-green-400">Launch WhatsApp Chat</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{CONTACT.phone}</p>
                </div>
              </a>

              {/* Email Block — clickable mailto: link */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 group p-3.5 rounded-lg bg-neutral-900/40 border border-neutral-850 hover:border-orange-500/30 hover:bg-neutral-950 transition-all cursor-pointer"
              >
                <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg group-hover:bg-orange-950 group-hover:border-orange-500 text-orange-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-neutral-500 tracking-wider">Mail Room</span>
                  <p className="font-sans font-bold text-sm text-white group-hover:text-orange-400">{CONTACT.email}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Location: {CONTACT.location}</p>
                </div>
              </a>

            </div>

            {/* Social handles list */}
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-[0.2em] font-bold block">
                COMMUNITY DIGITAL SPHERES
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/company/zerocoresolution-official"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-900 border border-neutral-850 hover:border-orange-500 hover:text-orange-500 text-neutral-400 rounded-lg transition-all cursor-pointer hover:scale-105"
                  title="LinkedIn Handle"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Shaheerali66"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-900 border border-neutral-850 hover:border-orange-500 hover:text-orange-500 text-neutral-400 rounded-lg transition-all cursor-pointer hover:scale-105"
                  title="GitHub Handle"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/zerocoresolution_official/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-900 border border-neutral-850 hover:border-orange-500 hover:text-orange-500 text-neutral-400 rounded-lg transition-all cursor-pointer hover:scale-105"
                  title="Instagram Page"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Intake Interactive proposal Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl relative">

              <h3 className="font-sans font-black text-xl text-white mb-6">Brief the Squad</h3>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono tracking-wider font-semibold text-[10px]">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono tracking-wider font-semibold text-[10px]">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-sans"
                  />
                </div>

                {/* Dynamic Offerings Dropdown selector */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono tracking-wider font-semibold text-[10px]">ACQUISITION OFFERING FOCUS</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-sans cursor-pointer"
                  >
                    <option value="" disabled className="bg-neutral-955">-- Select Focus Area (Optional) --</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title} className="bg-neutral-950 text-white">{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Narrative Message */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-mono tracking-wider font-semibold text-[10px]">PROJECT CONTEXT MESSAGE</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Please outline the target milestones or integration challenges..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full mt-6 py-4 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-mono text-xs font-black uppercase tracking-widest cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:scale-101 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Proposal
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </form>

              {/* Success overlay */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-neutral-950 rounded-2xl border border-orange-500/80 p-6 flex flex-col items-center justify-center text-center z-30"
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-500 mb-6 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>

                    <h4 className="font-sans font-black text-xl text-white">Proposal Sent Successfully!</h4>
                    <p className="mt-3 text-neutral-400 max-w-sm font-sans leading-relaxed text-xs">
                      Your message has been delivered to our team. A designated consultant will get back to you within 24 hours.
                    </p>

                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 py-2.5 px-6 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded-lg font-mono text-xs font-bold transition-all border border-neutral-800 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error overlay */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-neutral-950 rounded-2xl border border-red-500/60 p-6 flex flex-col items-center justify-center text-center z-30"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500 flex items-center justify-center text-red-500 mb-6">
                      <AlertTriangle className="w-8 h-8" />
                    </div>

                    <h4 className="font-sans font-black text-xl text-white">Failed to Send</h4>
                    <p className="mt-3 text-neutral-400 max-w-sm font-sans leading-relaxed text-xs">
                      {errorMsg}
                    </p>

                    <button
                      onClick={() => { setStatus('idle'); setErrorMsg(''); }}
                      className="mt-8 py-2.5 px-6 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded-lg font-mono text-xs font-bold transition-all border border-neutral-800 cursor-pointer"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(Contact);
