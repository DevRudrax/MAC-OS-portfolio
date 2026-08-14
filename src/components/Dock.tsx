import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { AppId, WindowState } from '../types/macOS';

interface DockProps {
  windows: WindowState[];
  activeAppId: AppId | 'finder';
  onOpenApp: (id: AppId) => void;
}

interface DockItemConfig {
  id: AppId;
  title: string;
  icon: string;
  fallbackIconText?: string;
}

const DOCK_APPS: DockItemConfig[] = [
  {
    id: 'finder',
    title: 'Finder',
    icon: '/assets/safari.png'
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '/assets/png-transparent-terminal-macos-bigsur-icon-thumbnail.png'
  },
  {
    id: 'siri',
    title: 'Siri',
    icon: '/assets/hd-siri-mac-os-apple-logo-icon-png-701751694972473qu0h3agddi.png'
  },
  {
    id: 'contacts',
    title: 'Contacts',
    icon: '/assets/contacts_macos_bigsur_icon_190274.webp'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: '/assets/calculator.png'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Downloads',
    icon: '/assets/app-store.png'
  }
];

function DockIcon({
  mouseX,
  app,
  isOpen,
  isActive,
  onClick
}: {
  mouseX: MotionValue<number>;
  app: DockItemConfig;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from cursor to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate fisheye width spring based on proximity curve [-150, 0, 150] -> [44, 82, 44]
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 84, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center"
    >
      {/* App Tooltip */}
      <div className="absolute -top-10 hidden rounded-md bg-gray-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md group-hover:block border border-white/10 whitespace-nowrap z-50">
        {app.title}
      </div>

      {/* Icon Graphic */}
      <motion.div 
        whileTap={{ scale: 0.85 }}
        className="relative flex h-full w-full items-center justify-center rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          src={app.icon}
          alt={app.title}
          className="h-full w-full object-cover rounded-2xl transition-transform"
          onError={(e) => {
            // Fallback icon style
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>

      {/* Active Dot Indicator */}
      {isOpen && (
        <span className="absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-white shadow-glow" />
      )}
    </motion.div>
  );
}

export const Dock: React.FC<DockProps> = ({ windows, activeAppId, onOpenApp }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 select-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-3 rounded-3xl macos-dock-glass px-4 py-2"
      >
        {DOCK_APPS.map((app) => {
          const windowState = windows.find((w) => w.id === app.id);
          const isOpen = windowState?.isOpen ?? false;
          const isActive = activeAppId === app.id;

          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              app={app}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => onOpenApp(app.id)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
