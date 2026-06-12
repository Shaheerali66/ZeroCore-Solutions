import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, RotateCcw, Save, Plus, Trash2, Edit 
} from 'lucide-react';
import { Service, PricingPlan, TeamMember, Project, SectionContent } from '../types';
import { 
  resetCMSAll, saveCMSServices, saveCMSPricing, 
  saveCMSTeam, saveCMSSectionContent 
} from '../data/defaultData';

interface AdminPanelProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  pricing: PricingPlan[];
  setPricing: React.Dispatch<React.SetStateAction<PricingPlan[]>>;
  team: TeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  sectionContent: SectionContent;
  setSectionContent: React.Dispatch<React.SetStateAction<SectionContent>>;
  onReset: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminPanel({
  services, setServices,
  projects, setProjects,
  pricing, setPricing,
  team, setTeam,
  sectionContent, setSectionContent,
  onReset,
  isOpen,
  setIsOpen
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'pricing' | 'team' | 'content'>('services');
  const [showStatus, setShowStatus] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Editing structures
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPricingId, setEditingPricingId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const triggerStatus = (msg: string) => {
    setStatusMsg(msg);
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
    }, 3000);
  };

  // Service Handlers
  const handleServiceChange = (id: string, field: keyof Service, value: any) => {
    const updated = services.map(s => {
      if (s.id === id) {
        if (field === 'features') {
          return { ...s, features: value.split(',').map((f: string) => f.trim()) };
        }
        return { ...s, [field]: value };
      }
      return s;
    });
    setServices(updated);
    saveCMSServices(updated);
  };

  const handleAddService = () => {
    const newService: Service = {
      id: 's-' + Date.now(),
      title: 'Decoupled API Automation',
      category: 'Engineering',
      description: 'Highly resilient pipeline structures configured to handle high frequency requests and custom database queries.',
      iconName: 'Cpu',
      features: ['OAuth Flow Integration', 'Realtime webhooks', 'Sub-second optimization']
    };
    const updated = [...services, newService];
    setServices(updated);
    saveCMSServices(updated);
    triggerStatus('New Service Added');
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to remove this service?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveCMSServices(updated);
      triggerStatus('Service Deleted');
    }
  };

  // Pricing Handlers
  const handlePricingChange = (id: string, field: keyof PricingPlan, value: any) => {
    const updated = pricing.map(p => {
      if (p.id === id) {
        if (field === 'features') {
          return { ...p, features: value.split(',').map((f: string) => f.trim()) };
        }
        if (field === 'pricePKR') {
          return { ...p, pricePKR: Number(value) };
        }
        return { ...p, [field]: value };
      }
      return p;
    });
    setPricing(updated);
    saveCMSPricing(updated);
  };

  // Team Handlers
  const handleTeamChange = (id: string, field: keyof TeamMember, value: any) => {
    const updated = team.map(t => {
      if (t.id === id) {
        return { ...t, [field]: value };
      }
      return t;
    });
    setTeam(updated);
    saveCMSTeam(updated);
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: 't-' + Date.now(),
      name: 'Agent Novac',
      designation: 'Staff Security Lead',
      description: 'Specialist in cloud architectures, secure middleware gates, and compliance diagnostics.',
      imageUrl: 'https://picsum.photos/seed/novac/400/400',
      socials: { email: 'novac@zerocore.solutions' }
    };
    const updated = [...team, newMember];
    setTeam(updated);
    saveCMSTeam(updated);
    triggerStatus('New Team Profile Added');
  };

  const handleDeleteTeamMember = (id: string) => {
    if (window.confirm('Remove this team member profile from visual roster?')) {
      const updated = team.filter(t => t.id !== id);
      setTeam(updated);
      saveCMSTeam(updated);
      triggerStatus('Team Profile Removed');
    }
  };

  // Page Content Handlers
  const handleContentChange = (field: keyof SectionContent, value: string) => {
    const updated = { ...sectionContent, [field]: value };
    setSectionContent(updated);
    saveCMSSectionContent(updated);
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all CMS customizations to original elite default configurations?')) {
      resetCMSAll();
      onReset();
      triggerStatus('CMS Data Restored Successfully');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto backdrop-blur-xs"
            />

            {/* Slider Sheet Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-neutral-950 border-l border-neutral-900 text-neutral-100 z-50 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-neutral-900/40">
                <div>
                  <h3 className="font-sans font-black text-white text-base uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    Interactive CMS Control
                  </h3>
                  <p className="text-[9px] font-mono text-neutral-400 mt-1">ZEROCORE SOLUTIONS CONSOLE • REALTIME ENGINE</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-neutral-905 bg-neutral-950 font-mono text-[10px] tracking-wider uppercase overflow-x-auto scrollbar-none shrink-0 select-none">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex-1 min-w-[100px] text-center py-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'services' 
                      ? 'border-orange-500 text-orange-500 bg-neutral-900/30' 
                      : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/20'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`flex-1 min-w-[100px] text-center py-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'pricing' 
                      ? 'border-orange-500 text-orange-500 bg-neutral-900/30' 
                      : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/20'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`flex-1 min-w-[100px] text-center py-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'team' 
                      ? 'border-orange-500 text-orange-500 bg-neutral-900/30' 
                      : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/20'
                  }`}
                >
                  Team
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex-1 min-w-[102px] text-center py-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'content' 
                      ? 'border-orange-500 text-orange-500 bg-neutral-900/30' 
                      : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/20'
                  }`}
                >
                  Page Copy
                </button>
              </div>

              {/* Status Alert Overlay */}
              {showStatus && (
                <div id="cms-notify" className="m-4 mb-0 p-3 bg-neutral-900 border border-orange-500/45 text-orange-400 font-mono text-[11px] rounded-lg flex items-center justify-between shadow-lg select-none">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-500" />
                    {statusMsg}
                  </span>
                </div>
              )}

              {/* Editor Workspace Column */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* GENERAL INSTRUCTION */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-850 text-neutral-300 text-xs leading-relaxed font-sans">
                  <span className="font-bold text-orange-500 block mb-1">LIVE ADAPTIVE WORKSPACE</span>
                  The preview will hot-reload modified records. Ensure formatting remains clean with balanced copy strings.
                </div>

                {/* TAB CONTENTS - SERVICES */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">SERVICES RECORD MATRIX</span>
                      <button
                        onClick={handleAddService}
                        className="py-1.5 px-3 bg-orange-950/40 text-orange-400 hover:text-white border border-orange-500/30 hover:bg-orange-600 hover:border-orange-500 rounded-lg font-mono text-[10px] uppercase font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Service
                      </button>
                    </div>

                    {services.map((service) => (
                      <div key={service.id} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-3 group/item">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-orange-400 font-bold tracking-wider">{service.category}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingServiceId(editingServiceId === service.id ? null : service.id)}
                              className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 border border-neutral-800 px-2 py-1 rounded-md hover:bg-neutral-900 transition-all cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                              {editingServiceId === service.id ? 'Close' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="p-1 text-neutral-500 hover:text-rose-500 hover:bg-rose-950/20 border border-transparent rounded transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        <h4 className="font-sans font-bold text-white text-sm">{service.title || 'Untitled Service'}</h4>
                        
                        {editingServiceId === service.id ? (
                          <div className="space-y-3 mt-2 text-xs border-t border-neutral-850/60 pt-3">
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">SERVICE TITLE</label>
                              <input
                                type="text"
                                value={service.title}
                                onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">CATEGORY PREFIX</label>
                              <input
                                type="text"
                                value={service.category}
                                onChange={(e) => handleServiceChange(service.id, 'category', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">CAPABILITY BLURB</label>
                              <textarea
                                value={service.description}
                                onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                                rows={3}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">KEY OFFERINGS (COMMA SEPARATED)</label>
                              <input
                                type="text"
                                defaultValue={service.features.join(', ')}
                                onBlur={(e) => handleServiceChange(service.id, 'features', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                              />
                            </div>
                            <p className="text-[9px] text-neutral-500 italic">✦ Saved instantly in LocalStorage.</p>
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{service.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB CONTENTS - PRICING */}
                {activeTab === 'pricing' && (
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block pb-1">PKR VALUE MATRICES</span>
                    {pricing.map((plan) => (
                      <div key={plan.id} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono border px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            plan.popular 
                              ? 'border-orange-500 text-orange-400 bg-orange-950/10' 
                              : 'border-neutral-850 text-neutral-450 bg-neutral-950/40'
                          }`}>
                            {plan.popular ? '🔥 Recommended Tier' : 'Standard Tier'}
                          </span>
                          <button
                            onClick={() => setEditingPricingId(editingPricingId === plan.id ? null : plan.id)}
                            className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 border border-neutral-800 px-2 py-1 rounded-md hover:bg-neutral-900 transition-all cursor-pointer"
                          >
                            <Edit className="w-3 h-3" />
                            {editingPricingId === plan.id ? 'Close' : 'Edit'}
                          </button>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <h4 className="font-sans font-black text-white text-sm">{plan.name}</h4>
                          <span className="font-mono text-xs text-green-400 font-bold">PKR {plan.pricePKR.toLocaleString()}</span>
                        </div>

                        {editingPricingId === plan.id && (
                          <div className="space-y-3 mt-2 text-xs border-t border-neutral-850/60 pt-3">
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">PLAN TIERS NAME</label>
                              <input
                                type="text"
                                value={plan.name}
                                onChange={(e) => handlePricingChange(plan.id, 'name', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">PKR VALUATION AMOUNT (NUMERIC)</label>
                              <input
                                type="number"
                                value={plan.pricePKR}
                                onChange={(e) => handlePricingChange(plan.id, 'pricePKR', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">PLAN TAG Copy</label>
                              <input
                                type="text"
                                value={plan.description}
                                onChange={(e) => handlePricingChange(plan.id, 'description', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">TIER MILESTONES (COMMA SEPARATED)</label>
                              <textarea
                                defaultValue={plan.features.join(', ')}
                                onBlur={(e) => handlePricingChange(plan.id, 'features', e.target.value)}
                                rows={3}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={plan.popular}
                                onChange={(e) => handlePricingChange(plan.id, 'popular', e.target.checked)}
                                id={`check-${plan.id}`}
                                className="accent-orange-500 cursor-pointer"
                              />
                              <label htmlFor={`check-${plan.id}`} className="text-neutral-300 font-mono text-[10px] cursor-pointer">RECOMMEND AS POPULAR ACCENT</label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB CONTENTS - TEAM */}
                {activeTab === 'team' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">ACTIVE ENGINEER PROFILES</span>
                      <button
                        onClick={handleAddTeamMember}
                        className="py-1.5 px-3 bg-orange-950/40 text-orange-400 hover:text-white border border-orange-500/30 hover:bg-orange-600 hover:border-orange-500 rounded-lg font-mono text-[10px] uppercase font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Profile
                      </button>
                    </div>

                    {team.map((member) => (
                      <div key={member.id} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-3 group/item">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-400 font-semibold">{member.designation}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingTeamId(editingTeamId === member.id ? null : member.id)}
                              className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 border border-neutral-800 px-2 py-1 rounded-md hover:bg-neutral-900 transition-all cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                              {editingTeamId === member.id ? 'Close' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleDeleteTeamMember(member.id)}
                              className="p-1 text-neutral-500 hover:text-rose-500 hover:bg-rose-950/20 border border-transparent rounded transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-orange-500/30 bg-neutral-950"
                          />
                          <div>
                            <h4 className="font-sans font-bold text-white text-xs">{member.name}</h4>
                            <p className="text-[10px] text-neutral-500">{member.socials.email || 'no-email@zcs'}</p>
                          </div>
                        </div>

                        {editingTeamId === member.id && (
                          <div className="space-y-3 mt-2 text-xs border-t border-neutral-850/60 pt-3">
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">MEMBER NAME</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => handleTeamChange(member.id, 'name', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">DESIGNATION POST</label>
                              <input
                                type="text"
                                value={member.designation}
                                onChange={(e) => handleTeamChange(member.id, 'designation', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">EXPERIENCE PROFILE SUMMARY</label>
                              <textarea
                                value={member.description}
                                onChange={(e) => handleTeamChange(member.id, 'description', e.target.value)}
                                rows={2}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none resize-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">PORTRAIT PORTRAIT LINK</label>
                              <input
                                type="text"
                                value={member.imageUrl}
                                onChange={(e) => handleTeamChange(member.id, 'imageUrl', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB CONTENTS - PAGE COPY */}
                {activeTab === 'content' && (
                  <div className="space-y-5">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block pb-1">SECTION TITLE & BODIES</span>
                    
                    {/* Hero Section copy */}
                    <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 space-y-3.5 text-left">
                      <span className="font-mono text-[9px] text-orange-400 tracking-wider font-extrabold uppercase">HERO INTRO SECTION</span>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">HERO CORE HEADLINE</label>
                        <input
                          type="text"
                          value={sectionContent.heroTitle}
                          onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">ITALICIZED ACCENT PATH</label>
                        <input
                          type="text"
                          value={sectionContent.heroHighlight}
                          onChange={(e) => handleContentChange('heroHighlight', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">SUB-NARRATIVE DESC</label>
                        <textarea
                          value={sectionContent.heroDescription}
                          onChange={(e) => handleContentChange('heroDescription', e.target.value)}
                          rows={3}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* About Section copy */}
                    <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 space-y-3.5 text-left">
                      <span className="font-mono text-[9px] text-orange-400 tracking-wider font-extrabold uppercase">ABOUT DISRUPTOR PILLARS</span>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">MAIN SECTION HEADLINE</label>
                        <input
                          type="text"
                          value={sectionContent.aboutTitle}
                          onChange={(e) => handleContentChange('aboutTitle', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">NARRATIVE BODY COPY</label>
                        <textarea
                          value={sectionContent.aboutDescription}
                          onChange={(e) => handleContentChange('aboutDescription', e.target.value)}
                          rows={3}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Other section copy */}
                    <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 space-y-3.5 text-left">
                      <span className="font-mono text-[9px] text-orange-400 tracking-wider font-extrabold uppercase">SERVICES & TEAM HEADERS</span>
                      <div className="space-y-1.5">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">SERVICES LIST TITLE</label>
                        <input
                          type="text"
                          value={sectionContent.servicesTitle}
                          onChange={(e) => handleContentChange('servicesTitle', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-neutral-450 font-mono text-[9px] tracking-widest">SERVICES DESCRIPTION</label>
                        <input
                          type="text"
                          value={sectionContent.servicesDescription}
                          onChange={(e) => handleContentChange('servicesDescription', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5 mt-2">
                        <label className="text-neutral-400 font-mono text-[9px] tracking-widest">TEAM ROSTER TITLE</label>
                        <input
                          type="text"
                          value={sectionContent.teamTitle}
                          onChange={(e) => handleContentChange('teamTitle', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Reset Controller Footer */}
              <div className="p-6 border-t border-neutral-900 bg-neutral-950 flex gap-3 shrink-0">
                <button
                  onClick={handleResetAll}
                  className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-mono text-[10px] uppercase font-bold rounded-xl border border-neutral-800 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-orange-500" />
                  Restore Defaults
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    triggerStatus('All updates saved successfully');
                  }}
                  className="flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-mono text-[10px] uppercase font-bold rounded-xl shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Close Console
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
