import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, RotateCcw, Power, AlertCircle } from 'lucide-react';
import { SYSTEM_USER } from '../data/portfolioData';

interface LoginScreenProps {
  onSignIn: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSignIn }) => {
  const [modalAction, setModalAction] = useState<'sleep' | 'restart' | 'shutdown' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSignIn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSignIn]);

  const handleActionConfirm = () => {
    if (modalAction === 'restart') {
      window.location.reload();
    } else if (modalAction === 'shutdown') {
      document.body.innerHTML = `
        <div style="background-color: black; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif;">
          <h1 style="font-size: 2rem; font-weight: 300;">System Shut Down</h1>
          <p style="color: #666; margin-top: 1rem;">Click anywhere to turn on</p>
        </div>
      `;
      document.body.onclick = () => window.location.reload();
    } else {
      setModalAction(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.5 }}
      className="relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-cover bg-center select-none"
      style={{
        backgroundImage: `url('/assets/Tahoe-Day.webp')`
      }}
    >
      {/* Heavy Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl" />

      {/* Main Avatar & Sign In Card */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* User Avatar Circle */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="group relative h-28 w-28 rounded-full border-2 border-white/40 p-1 shadow-2xl backdrop-blur-md bg-white/10 transition-transform hover:scale-105"
        >
          <img
            src={SYSTEM_USER.avatar}
            alt={SYSTEM_USER.name}
            className="h-full w-full rounded-full object-cover shadow-inner"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
            }}
          />
        </motion.div>

        {/* User Name - Solely Rudra Pratap Singh */}
        <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-2xl font-semibold text-white drop-shadow-md"
        >
          {SYSTEM_USER.name}
        </motion.h2>

        {/* Pill Sign In Button */}
        <motion.button
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onSignIn}
          className="mt-6 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/30 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Sign In</span>
        </motion.button>

        {/* Subtitle Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-xs text-white/70 font-medium drop-shadow"
        >
          Press Enter to sign in
        </motion.p>
      </div>

      {/* Bottom Options: Sleep, Restart, Shut Down */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mb-10 flex items-center justify-center gap-12"
      >
        <button
          onClick={() => setModalAction('sleep')}
          className="flex flex-col items-center gap-2 text-white/80 transition-all hover:text-white hover:scale-110 group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-md backdrop-blur-md group-hover:bg-white/25">
            <Moon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium tracking-wide">Sleep</span>
        </button>

        <button
          onClick={() => setModalAction('restart')}
          className="flex flex-col items-center gap-2 text-white/80 transition-all hover:text-white hover:scale-110 group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-md backdrop-blur-md group-hover:bg-white/25">
            <RotateCcw className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium tracking-wide">Restart</span>
        </button>

        <button
          onClick={() => setModalAction('shutdown')}
          className="flex flex-col items-center gap-2 text-white/80 transition-all hover:text-white hover:scale-110 group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-md backdrop-blur-md group-hover:bg-white/25">
            <Power className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium tracking-wide">Shut Down</span>
        </button>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-80 rounded-2xl border border-white/20 bg-gray-900/90 p-6 text-center shadow-2xl backdrop-blur-xl"
            >
              <AlertCircle className="mx-auto h-10 w-10 text-amber-400" />
              <h3 className="mt-3 text-lg font-semibold text-white capitalize">
                {modalAction === 'sleep' ? 'Sleep System?' : modalAction === 'restart' ? 'Restart Mac?' : 'Shut Down Mac?'}
              </h3>
              <p className="mt-2 text-xs text-gray-300">
                Are you sure you want to {modalAction} the system?
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setModalAction(null)}
                  className="rounded-full bg-white/10 px-5 py-1.5 text-xs font-medium text-white hover:bg-white/20 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleActionConfirm}
                  className="rounded-full bg-blue-600 px-5 py-1.5 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
