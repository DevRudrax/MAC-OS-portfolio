import React, { useState, useEffect } from 'react';
import { Wifi, BatteryCharging, Search, SlidersHorizontal, Lock, Moon, RotateCcw, Power, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppId } from '../types/macOS';
import { AppleLogo } from './AppleLogo';
import { DynamicIsland } from './DynamicIsland';
import { BatteryModal } from './BatteryModal';
import { WifiModal } from './WifiModal';

interface TopMenuBarProps {
  activeAppId: AppId | 'finder';
  onLockScreen: () => void;
  onOpenApp: (id: AppId) => void;
  onToggleControlCenter: () => void;
  onToggleSpotlight: () => void;
  onOpenAboutMac: () => void;
}

export const TopMenuBar: React.FC<TopMenuBarProps> = ({
  activeAppId,
  onLockScreen,
  onOpenApp,
  onToggleControlCenter,
  onToggleSpotlight,
  onOpenAboutMac,
}) => {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [batteryModalOpen, setBatteryModalOpen] = useState(false);
  const [wifiModalOpen, setWifiModalOpen] = useState(false);
  const [dateTimeStr, setDateTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      setDateTimeStr(now.toLocaleDateString('en-US', options).replace(',', ''));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const getAppName = (id: AppId | 'finder') => {
    switch (id) {
      case 'terminal': return 'Terminal';
      case 'siri': return 'Siri';
      case 'contacts': return 'Contacts';
      case 'calculator': return 'Calculator';
      case 'portfolio': return 'Portfolio';
      case 'settings': return 'System Settings';
      default: return 'Finder';
    }
  };

  return (
    <header className="relative z-40 flex h-7 w-full items-center justify-between macos-menubar-glass px-3 text-xs font-medium text-white/90 select-none">
      {/* Left Section: Real Apple Logo & App Menus */}
      <div className="flex items-center gap-4">
        {/* Apple Menu Button */}
        <div className="relative">
          <button
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            className="flex items-center rounded px-1.5 py-0.5 hover:bg-white/20 active:bg-white/30 cursor-pointer"
          >
            <AppleLogo className="h-3.5 w-3.5 text-white" />
          </button>

          {/* Apple Dropdown Menu */}
          <AnimatePresence>
            {appleMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setAppleMenuOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-7 z-50 w-52 rounded-xl border border-white/20 bg-gray-900/90 py-1.5 shadow-2xl backdrop-blur-2xl text-white/90"
                >
                  <button
                    onClick={() => { setAppleMenuOpen(false); onOpenAboutMac(); }}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span>About This Mac</span>
                  </button>

                  <div className="my-1 h-[1px] bg-white/10" />

                  <button
                    onClick={() => { setAppleMenuOpen(false); onOpenApp('settings'); }}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>System Settings...</span>
                  </button>

                  <div className="my-1 h-[1px] bg-white/10" />

                  <button
                    onClick={() => { setAppleMenuOpen(false); onLockScreen(); }}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Lock Screen</span>
                  </button>

                  <button
                    onClick={() => { setAppleMenuOpen(false); onLockScreen(); }}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <Moon className="h-3.5 w-3.5" />
                    <span>Sleep</span>
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restart...</span>
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="flex w-full items-center gap-2 px-3 py-1 text-left hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    <Power className="h-3.5 w-3.5" />
                    <span>Shut Down...</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Active App Name */}
        <span className="font-bold text-white tracking-wide">
          {getAppName(activeAppId)}
        </span>

        {/* Standard Menu Items */}
        <div className="hidden items-center gap-3 text-white/80 md:flex">
          <button className="hover:text-white cursor-pointer">File</button>
          <button className="hover:text-white cursor-pointer">Edit</button>
          <button className="hover:text-white cursor-pointer">View</button>
          <button className="hover:text-white cursor-pointer">Window</button>
          <button className="hover:text-white cursor-pointer">Help</button>
        </div>
      </div>

      {/* Center Section: Interactive Dynamic Island (User Image 1) */}
      <div className="hidden sm:flex items-center justify-center">
        <DynamicIsland activeAppId={activeAppId} />
      </div>

      {/* Right Section: Status Menu Icons (User Image 2) */}
      <div className="flex items-center gap-3 text-white/90">
        {/* Battery Indicator (89% charging) */}
        <div 
          onClick={() => setBatteryModalOpen(!batteryModalOpen)}
          className="flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer transition-colors"
          title="Battery Health & Power Options"
        >
          <span className="text-[11px] font-mono">89%</span>
          <BatteryCharging className="h-4 w-4 text-green-400" />
        </div>

        {/* Wi-Fi Icon */}
        <button 
          onClick={() => setWifiModalOpen(!wifiModalOpen)}
          className="hover:bg-white/10 p-0.5 rounded cursor-pointer transition-colors"
          title="Wi-Fi Status & Networks"
        >
          <Wifi className="h-3.5 w-3.5 text-white" />
        </button>

        {/* Spotlight Search Toggle */}
        <button 
          onClick={onToggleSpotlight}
          className="hover:bg-white/10 p-0.5 rounded cursor-pointer transition-colors"
          title="Spotlight Search"
        >
          <Search className="h-3.5 w-3.5 text-white" />
        </button>

        {/* Control Center Toggle */}
        <button 
          onClick={onToggleControlCenter}
          className="hover:bg-white/10 p-0.5 rounded cursor-pointer transition-colors"
          title="Control Center"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-white" />
        </button>

        {/* Date & Time */}
        <button className="hover:bg-white/10 px-1.5 py-0.5 rounded font-medium cursor-pointer">
          {dateTimeStr || "Thu Aug 14  3:08 PM"}
        </button>
      </div>

      {/* Interactive Modals */}
      <AnimatePresence>
        {batteryModalOpen && (
          <BatteryModal onClose={() => setBatteryModalOpen(false)} />
        )}
        {wifiModalOpen && (
          <WifiModal onClose={() => setWifiModalOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};
