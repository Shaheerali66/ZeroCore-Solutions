import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate elite secure response loop
    setTimeout(() => {
      // Allow 'admin' or 'admin@zerocore.solutions' with password 'admin'
      const isAuthValid = 
        (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@zerocore.solutions') && 
        password === 'admin';

      setIsLoading(false);
      if (isAuthValid) {
        onLoginSuccess();
        onClose();
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid admin credentials. Hint: use admin / admin');
      }
    }, 850);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 pointer-events-auto"
          />

          {/* Centered Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-[0_25px_60px_rgba(255,106,0,0.15)] overflow-hidden pointer-events-auto relative group"
            >
              {/* Premium top trim line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"></div>

              {/* Header Box */}
              <div className="p-6 pb-2 flex items-center justify-between border-b border-neutral-900/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-950/40 border border-orange-500/30 rounded-lg text-orange-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-white text-base tracking-tight uppercase">ZCS Security Port</h3>
                    <p className="text-[9px] font-mono tracking-widest text-neutral-500">CMS ADMINISTRATION LOOP</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body form contents */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                
                {/* Credentials hints box */}
                <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/10 text-[11px] leading-relaxed text-neutral-300 font-sans flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-orange-400 block mb-0.5">ADMIN ACCESS GATEWAY</span>
                    Enter elite developer credentials to access section editors.
                    <div className="mt-1.5 font-mono text-orange-500/90 tracking-wide font-black bg-neutral-950/60 p-1 px-1.5 rounded w-fit">
                      User: admin / Pass: admin
                    </div>
                  </div>
                </div>

                {/* Input 1: Username */}
                <div className="space-y-1.5 text-left">
                  <label className="text-neutral-400 font-mono text-[10px] tracking-widest uppercase block">
                    ADMIN USER ID / EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-[15px] w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="admin@zerocore.solutions"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-white font-sans text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Input 2: Password */}
                <div className="space-y-1.5 text-left">
                  <label className="text-neutral-400 font-mono text-[10px] tracking-widest uppercase block">
                    ACCESS CODEWORD (PASSWORD)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-[15px] w-4 h-4 text-neutral-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-white font-sans text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Error status */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-rose-950/20 border border-rose-500/30 text-rose-400 font-mono text-[10px] rounded-lg tracking-wide select-none"
                  >
                    ✦ {error}
                  </motion.div>
                )}

                {/* Submit action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(255,106,0,0.3)] hover:shadow-[0_0_20px_rgba(255,106,0,0.55)] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4.5 h-4.5 rounded-full border-2 border-white/35 border-t-white animate-spin"></div>
                  ) : (
                    <>
                      Verify Protocols
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Security signature */}
              <div className="pb-6 pt-2 text-center text-[10px] font-mono text-neutral-600 tracking-wider">
                SECURED SSL CONSOLE • PRIVILEGED SESSIONS ONLY
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
