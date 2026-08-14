import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Monitor, ShieldCheck } from 'lucide-react';
import { AppleLogo } from './AppleLogo';
import { SYSTEM_USER } from '../data/portfolioData';

interface AboutMacModalProps {
  onClose: () => void;
}

export const AboutMacModal: React.FC<AboutMacModalProps> = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-1/2 left-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-3xl macos-glass p-6 text-white shadow-2xl backdrop-blur-3xl border border-white/20 select-none text-center"
      >
        <div className="flex flex-col items-center">
          {/* Official Apple Logo Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-gray-700 to-gray-900 shadow-xl border border-white/20 mb-4">
            <AppleLogo className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-wide">macOS Tahoe</h2>
          <span className="text-xs text-gray-400 font-mono mt-0.5">Version 15.2 (Build 24C101)</span>

          <div className="mt-6 w-full space-y-2.5 rounded-2xl bg-white/5 p-4 border border-white/10 text-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5 text-blue-400" /> Model</span>
              <span className="font-semibold text-white">MacBook Pro 16-inch</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-purple-400" /> Chip</span>
              <span className="font-semibold text-white">Apple M3 Max</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5"><HardDrive className="h-3.5 w-3.5 text-emerald-400" /> Memory</span>
              <span className="font-semibold text-white">36 GB Unified RAM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Owner</span>
              <span className="font-semibold text-white">{SYSTEM_USER.name}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-blue-600 px-6 py-2 text-xs font-semibold text-white shadow-lg hover:bg-blue-500 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
};
