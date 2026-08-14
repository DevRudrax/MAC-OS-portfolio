import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Zap, ShieldAlert, Check } from 'lucide-react';

interface BatteryModalProps {
  onClose: () => void;
}

export const BatteryModal: React.FC<BatteryModalProps> = ({ onClose }) => {
  const [lowPowerMode, setLowPowerMode] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="fixed top-8 right-24 z-50 w-72 rounded-2xl macos-glass p-4 text-white shadow-2xl backdrop-blur-2xl border border-white/20 select-none text-xs"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <BatteryCharging className="h-5 w-5 text-green-400" />
            <div>
              <p className="font-bold text-white text-sm">Battery: 89%</p>
              <p className="text-[10px] text-gray-400">Power Source: Power Adapter</p>
            </div>
          </div>
          <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-400">
            Charging
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <div
            onClick={() => setLowPowerMode(!lowPowerMode)}
            className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <Zap className={`h-4 w-4 ${lowPowerMode ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>Low Power Mode</span>
            </div>
            {lowPowerMode && <Check className="h-4 w-4 text-amber-400" />}
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Condition</span>
              <span className="text-emerald-400 font-semibold">Normal (100% Capacity)</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Time to Full Charge</span>
              <span className="text-gray-200">18 minutes</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
