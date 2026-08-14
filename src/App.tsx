import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Stage, AppId, WindowState, Project } from './types/macOS';
import { LockScreen } from './components/LockScreen';
import { LoginScreen } from './components/LoginScreen';
import { BootScreen } from './components/BootScreen';
import { TopMenuBar } from './components/TopMenuBar';
import { DesktopWidgets } from './components/DesktopWidgets';
import { DesktopFolders } from './components/DesktopFolders';
import { Dock } from './components/Dock';
import { WindowFrame } from './components/WindowFrame';

import { TerminalApp } from './components/apps/TerminalApp';
import { SiriApp } from './components/apps/SiriApp';
import { ContactsApp } from './components/apps/ContactsApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { PortfolioApp } from './components/apps/PortfolioApp';
import { FinderApp } from './components/apps/FinderApp';

import { ControlCenterModal } from './components/ControlCenterModal';
import { SpotlightModal } from './components/SpotlightModal';
import { AboutMacModal } from './components/AboutMacModal';

export function App() {
  const [stage, setStage] = useState<Stage>('lock');
  const [activeAppId, setActiveAppId] = useState<AppId | 'finder'>('finder');
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);

  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [aboutMacOpen, setAboutMacOpen] = useState(false);

  const [highestZIndex, setHighestZIndex] = useState(10);

  // App Windows Initial State
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'terminal',
      title: 'Terminal — rudra@macbook-pro ~',
      icon: '/assets/png-transparent-terminal-macos-bigsur-icon-thumbnail.png',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 120, y: 80 },
      size: { width: 700, height: 440 }
    },
    {
      id: 'siri',
      title: 'Siri AI Assistant',
      icon: '/assets/hd-siri-mac-os-apple-logo-icon-png-701751694972473qu0h3agddi.png',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      position: { x: 220, y: 100 },
      size: { width: 450, height: 550 }
    },
    {
      id: 'contacts',
      title: 'Contacts — Rudra Pratap Singh',
      icon: '/assets/contacts_macos_bigsur_icon_190274.webp',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      position: { x: 260, y: 120 },
      size: { width: 680, height: 480 }
    },
    {
      id: 'calculator',
      title: 'Calculator',
      icon: '/assets/calculator.png',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      position: { x: 340, y: 140 },
      size: { width: 320, height: 460 }
    },
    {
      id: 'portfolio',
      title: 'Portfolio Downloads & Resume',
      icon: '/assets/app-store.png',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: 180, y: 90 },
      size: { width: 650, height: 500 }
    },
    {
      id: 'finder',
      title: 'Finder — Projects & Repositories',
      icon: '/assets/safari.png',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      position: { x: 150, y: 70 },
      size: { width: 850, height: 520 }
    }
  ]);

  const handleOpenApp = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextZ = highestZIndex + 1;
          setHighestZIndex(nextZ);
          return { ...w, isOpen: true, isMinimized: false, zIndex: nextZ };
        }
        return w;
      })
    );
    setActiveAppId(id);
  };

  const handleCloseWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const handleMinimizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const handleMaximizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  const handleFocusWindow = (id: AppId) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
    );
    setActiveAppId(id);
  };

  const handleOpenProjectFolder = (project: Project) => {
    setActiveProject(project);
    handleOpenApp('finder');
  };

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'terminal': return <TerminalApp />;
      case 'siri': return <SiriApp />;
      case 'contacts': return <ContactsApp />;
      case 'calculator': return <CalculatorApp />;
      case 'portfolio': return <PortfolioApp />;
      case 'finder': return <FinderApp selectedProject={activeProject} />;
      default: return null;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-sans text-white select-none">
      <AnimatePresence mode="wait">
        {/* Stage 1: Lock Screen */}
        {stage === 'lock' && (
          <LockScreen key="lock" onUnlock={() => setStage('login')} />
        )}

        {/* Stage 2: User Sign-In Screen */}
        {stage === 'login' && (
          <LoginScreen key="login" onSignIn={() => setStage('boot')} />
        )}

        {/* Stage 2.5: macOS Desktop Boot Up Animation */}
        {stage === 'boot' && (
          <BootScreen key="boot" onBootComplete={() => setStage('desktop')} />
        )}

        {/* Stage 3: macOS Desktop Interface */}
        {stage === 'desktop' && (
          <div
            key="desktop"
            className="relative h-full w-full bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url('/assets/Tahoe-Day.webp')`
            }}
          >
            {/* Top macOS Menu Bar */}
            <TopMenuBar
              activeAppId={activeAppId}
              onLockScreen={() => setStage('lock')}
              onOpenApp={handleOpenApp}
              onToggleControlCenter={() => setControlCenterOpen(!controlCenterOpen)}
              onToggleSpotlight={() => setSpotlightOpen(!spotlightOpen)}
              onOpenAboutMac={() => setAboutMacOpen(true)}
            />

            {/* Desktop Widgets */}
            <DesktopWidgets />

            {/* Desktop GitHub Project Folders */}
            <DesktopFolders onOpenProjectFolder={handleOpenProjectFolder} />

            {/* Open Windows Container */}
            {windows.map(
              (w) =>
                w.isOpen && (
                  <WindowFrame
                    key={w.id}
                    windowState={w}
                    onClose={() => handleCloseWindow(w.id)}
                    onMinimize={() => handleMinimizeWindow(w.id)}
                    onMaximize={() => handleMaximizeWindow(w.id)}
                    onFocus={() => handleFocusWindow(w.id)}
                  >
                    {renderAppContent(w.id)}
                  </WindowFrame>
                )
            )}

            {/* macOS Dock */}
            <Dock
              windows={windows}
              activeAppId={activeAppId}
              onOpenApp={handleOpenApp}
            />

            {/* System Modals */}
            <AnimatePresence>
              {controlCenterOpen && (
                <ControlCenterModal onClose={() => setControlCenterOpen(false)} />
              )}
              {spotlightOpen && (
                <SpotlightModal
                  onClose={() => setSpotlightOpen(false)}
                  onOpenApp={handleOpenApp}
                />
              )}
              {aboutMacOpen && (
                <AboutMacModal onClose={() => setAboutMacOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
