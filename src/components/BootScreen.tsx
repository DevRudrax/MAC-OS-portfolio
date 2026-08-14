import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppleLogo } from './AppleLogo';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onBootComplete, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none"
    >
      {/* Official Metallic Silver Apple Logo (Matching User Screenshot) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-14 flex items-center justify-center"
      >
        <AppleLogo className="h-24 w-24 text-[#E3E3E5] drop-shadow-lg" />
      </motion.div>

      {/* Sleek Progress Bar */}
      <div className="w-64 h-1 bg-[#2C2C2E] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#F5F5F7] rounded-full transition-all duration-75 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};
