import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours}:${minutesStr}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      };
      setDateStr(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={onUnlock}
      className="relative flex h-screen w-screen cursor-pointer flex-col items-center justify-between overflow-hidden bg-cover bg-center select-none"
      style={{
        backgroundImage: `url('/assets/Tahoe-Day.webp')`
      }}
    >
      {/* Top Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Clock & Date Header */}
      <div className="relative z-10 mt-20 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-8xl font-bold tracking-tight text-white drop-shadow-2xl md:text-9xl font-sans"
        >
          {timeStr || "2:33"}
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-3 text-xl font-medium tracking-wide text-white/90 drop-shadow-md md:text-2xl"
        >
          {dateStr || "Thursday, August 14"}
        </motion.p>
      </div>

      {/* Unlock Hint Footer */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 mb-16 flex flex-col items-center"
      >
        <p className="text-sm font-medium tracking-wider text-white/80 drop-shadow animate-pulse">
          Click anywhere to unlock
        </p>
      </motion.div>
    </motion.div>
  );
};
