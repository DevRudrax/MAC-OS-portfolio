import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Check, Lock, Signal, Activity, Globe } from 'lucide-react';

interface WifiModalProps {
  onClose: () => void;
}

export const WifiModal: React.FC<WifiModalProps> = ({ onClose }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkInfo, setNetworkInfo] = useState<{
    type?: string;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  }>({});

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        setNetworkInfo({
          type: conn.type || 'Wi-Fi / Ethernet',
          effectiveType: conn.effectiveType || '4G',
          downlink: conn.downlink || 100,
          rtt: conn.rtt || 15
        });
      } else {
        setNetworkInfo({
          type: 'Wi-Fi Connected',
          effectiveType: 'Broadband',
          downlink: 100,
          rtt: 15
        });
      }
    };

    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      conn.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (conn) {
        conn.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="fixed top-8 right-20 z-50 w-72 rounded-2xl macos-glass p-4 text-white shadow-2xl backdrop-blur-2xl border border-white/20 select-none text-xs"
      >
        {/* Header Toggle */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Wifi className={`h-4 w-4 ${isOnline ? 'text-blue-400' : 'text-red-400'}`} />
            <span className="font-bold text-white text-sm">Wi-Fi</span>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isOnline ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'}`}>
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>

        {/* Real Network Info */}
        <div className="mt-3 space-y-2">
          <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-white space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-400" /> Active Network
              </span>
              <Check className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-[11px] text-blue-200 font-mono">
              {networkInfo.type === 'wifi' ? 'Wi-Fi Network' : networkInfo.type || 'Connected Wi-Fi'}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-gray-300 border-t border-blue-500/20 pt-1.5">
              <span className="flex items-center gap-1"><Signal className="h-3 w-3 text-green-400" /> {networkInfo.downlink ? `${networkInfo.downlink} Mbps Speed` : 'High Speed'}</span>
              <span className="flex items-center gap-1"><Activity className="h-3 w-3 text-purple-400" /> {networkInfo.rtt ? `${networkInfo.rtt}ms RTT Ping` : '15ms Ping'}</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Connection Quality</span>
              <span className="text-emerald-400 font-semibold uppercase">{networkInfo.effectiveType || '4G Excellent'}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Internet Status</span>
              <span className={isOnline ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                {isOnline ? 'Online (Connected)' : 'No Connection'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
