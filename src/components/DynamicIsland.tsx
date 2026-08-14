import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, BatteryCharging, Play, Pause, FastForward } from 'lucide-react';

interface DynamicIslandProps {
  activeAppId?: string;
  isSiriListening?: boolean;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ isSiriListening }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative z-50 flex items-center justify-center">
      <motion.div
        layout
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className={`cursor-pointer overflow-hidden bg-black text-white shadow-2xl border border-white/10 ${
          isExpanded
            ? 'h-16 w-80 rounded-3xl p-3 flex items-center justify-between'
            : 'h-6 w-36 rounded-full px-3 flex items-center justify-between'
        }`}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            /* Expanded Island View */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex w-full items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md">
                  <Music className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide">Tahoe Beats - Rudra</p>
                  <p className="text-[10px] text-gray-400">Playing • High Fidelity Audio</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 text-white/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="rounded-full bg-white/20 p-1.5 hover:bg-white/30 text-white"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full bg-white/10 p-1.5 hover:bg-white/20 text-white"
                >
                  <FastForward className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Compact Pill View (Matching User Image 1) */
            <motion.div
              key="compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full items-center justify-between text-[10px]"
            >
              {/* Left Camera / Indicator */}
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-black border border-gray-800 flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-blue-500/80" />
                </div>
                {isSiriListening ? (
                  <Sparkles className="h-3 w-3 text-purple-400 animate-spin" />
                ) : (
                  <div className="flex items-center gap-0.5">
                    <span className="h-2 w-0.5 bg-green-400 animate-bounce" />
                    <span className="h-3 w-0.5 bg-green-400 animate-bounce [animation-delay:0.1s]" />
                    <span className="h-2 w-0.5 bg-green-400 animate-bounce [animation-delay:0.2s]" />
                  </div>
                )}
              </div>

              {/* Right Status Dot */}
              <div className="flex items-center gap-1">
                <BatteryCharging className="h-3 w-3 text-green-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
