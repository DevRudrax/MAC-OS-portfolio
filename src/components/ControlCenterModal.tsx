import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Share2, Sun, Volume2, Moon } from 'lucide-react';

interface ControlCenterModalProps {
  onClose: () => void;
}

export const ControlCenterModal: React.FC<ControlCenterModalProps> = ({ onClose }) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [btEnabled, setBtEnabled] = useState(true);
  const [airDropEnabled, setAirDropEnabled] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="fixed top-8 right-3 z-50 w-80 rounded-3xl macos-glass p-4 text-white shadow-2xl backdrop-blur-2xl border border-white/20 select-none"
      >
        {/* Connectivity Controls Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Main Toggles Card */}
          <div className="col-span-2 rounded-2xl bg-white/10 p-3 border border-white/10 space-y-2">
            {/* Wi-Fi */}
            <div
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-white/10"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${wifiEnabled ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                <Wifi className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Wi-Fi</p>
                <p className="text-[10px] text-gray-400">{wifiEnabled ? 'Home-5G' : 'Off'}</p>
              </div>
            </div>

            {/* Bluetooth */}
            <div
              onClick={() => setBtEnabled(!btEnabled)}
              className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-white/10"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${btEnabled ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                <Bluetooth className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Bluetooth</p>
                <p className="text-[10px] text-gray-400">{btEnabled ? 'AirPods Pro' : 'Off'}</p>
              </div>
            </div>

            {/* AirDrop */}
            <div
              onClick={() => setAirDropEnabled(!airDropEnabled)}
              className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-white/10"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${airDropEnabled ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                <Share2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">AirDrop</p>
                <p className="text-[10px] text-gray-400">{airDropEnabled ? 'Everyone' : 'Off'}</p>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="col-span-2 space-y-3 rounded-2xl bg-white/10 p-3 border border-white/10">
            {/* Display Brightness */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 mb-1">
                <span className="flex items-center gap-1"><Sun className="h-3.5 w-3.5" /> Display</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Sound Volume */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 mb-1">
                <span className="flex items-center gap-1"><Volume2 className="h-3.5 w-3.5" /> Sound</span>
                <span>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
