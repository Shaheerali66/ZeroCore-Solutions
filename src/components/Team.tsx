import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Github, Mail, ShieldCheck } from 'lucide-react';
import { TEAM_SECTION } from '../data/content';
import { TEAM } from '../data/team';

export default function Team() {
  return (
    <section
      id="team"
      className="relative z-10 py-28 bg-transparent overflow-hidden border-b border-neutral-900"
    >
      {/* Background custom gradients */}
      <div className="absolute top-[30%] right-[-10%] w-[380px] h-[380px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Dynamic scrolling indicator anchor node */}
      <div id="team-trail" className="absolute top-[48%] left-[25%] w-2 h-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-25">

        {/* Section Heading Editorial Block */}
        <div className="text-center md:text-left max-w-2xl mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold block mb-3">ELITE ENGINEER COLLECTIVE</span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none animate-pulse" style={{ animationDuration: '6s' }}>
            {TEAM_SECTION.title}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            {TEAM_SECTION.description}
          </p>
        </div>

        {/* Dynamic Responsive Team Grid Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={member.id}
              className="group relative rounded-2xl bg-neutral-900 border border-neutral-850 overflow-hidden p-5 flex flex-col justify-between hover:border-orange-500/30 hover:bg-neutral-900/40 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,106,0,0.1)] transition-all duration-300"
            >
              <div>
                {/* High quality portrait container */}
                <div className="relative rounded-xl overflow-hidden aspect-square mb-6 border border-neutral-800/80 group-hover:border-orange-500/40 transition-colors duration-300">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="lazy"
                  />

                  {/* Subtle brand orange border outline inside image */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-orange-500/40 rounded-xl transition-colors duration-500 pointer-events-none z-10"></div>

                  {/* Verified Partner overlay Badge */}
                  <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur border border-neutral-800/60 py-1 px-2.5 rounded-full font-mono text-[8px] uppercase tracking-wider text-green-400 font-black flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-green-400" />
                  </div>
                </div>

                {/* Profile Name & Designation */}
                <span className="font-mono text-[9px] uppercase tracking-widest text-orange-500 font-extrabold block mb-1">
                  {member.designation}
                </span>

                <h3 className="font-sans font-black text-lg text-white group-hover:text-orange-400 transition-colors">
                  {member.name}
                </h3>

                {/* Description blurb */}
                <p className="mt-3 text-xs font-sans text-neutral-400 leading-relaxed min-h-12 pb-5 border-b border-neutral-850">
                  {member.description}
                </p>
              </div>

              {/* Dynamic Interactive Socials Tray */}
              <div className="mt-5 flex items-center gap-3.5 text-neutral-400">
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-neutral-950 hover:text-orange-500 border border-transparent hover:border-neutral-800 rounded transition-all cursor-pointer"
                    title="X Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-neutral-950 hover:text-orange-500 border border-transparent hover:border-neutral-800 rounded transition-all cursor-pointer"
                    title="LinkedIn Resume"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-neutral-950 hover:text-orange-500 border border-transparent hover:border-neutral-800 rounded transition-all cursor-pointer"
                    title="GitHub Space"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-1.5 hover:bg-neutral-950 hover:text-orange-500 border border-transparent hover:border-neutral-800 rounded transition-all cursor-pointer ml-auto"
                    title="Direct Mail"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
