import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { WindowState } from '../types/macOS';

interface WindowFrameProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children
}) => {
  const { title, isMinimized, isMaximized, zIndex, size } = windowState;

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{ left: -300, right: 600, top: -20, bottom: 400 }}
      onMouseDown={onFocus}
      style={{
        zIndex,
        width: isMaximized ? '100vw' : `${size.width}px`,
        height: isMaximized ? 'calc(100vh - 28px)' : `${size.height}px`,
        top: isMaximized ? '28px' : undefined,
        left: isMaximized ? '0' : undefined
      }}
      className={`fixed ${
        isMaximized ? 'rounded-none' : 'rounded-2xl'
      } flex flex-col overflow-hidden macos-glass macos-window-shadow border border-white/20 select-none shadow-2xl backdrop-blur-2xl`}
    >
      {/* Native macOS Window Header Bar */}
      <div 
        onDoubleClick={onMaximize}
        className="flex h-10 w-full items-center justify-between bg-gray-900/60 px-4 border-b border-white/10 cursor-grab active:cursor-grabbing"
      >
        {/* Traffic Light Action Buttons (Red, Yellow, Green) */}
        <div className="flex items-center gap-2 group">
          {/* Close (Red) */}
          <button
            onClick={onClose}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F56] border border-[#E0443E] hover:bg-[#FF5F56]/80 text-[8px] font-bold text-black opacity-90 transition-opacity"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-100">✕</span>
          </button>

          {/* Minimize (Yellow) */}
          <button
            onClick={onMinimize}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:bg-[#FFBD2E]/80 text-[8px] font-bold text-black opacity-90 transition-opacity"
            title="Minimize"
          >
            <span className="opacity-0 group-hover:opacity-100">−</span>
          </button>

          {/* Maximize (Green) */}
          <button
            onClick={onMaximize}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#27C93F] border border-[#1AAB29] hover:bg-[#27C93F]/80 text-[8px] font-bold text-black opacity-90 transition-opacity"
            title="Maximize"
          >
            <span className="opacity-0 group-hover:opacity-100">⤢</span>
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
          <span>{title}</span>
        </div>

        {/* Empty Spacer */}
        <div className="w-12" />
      </div>

      {/* Main Window Content Container */}
      <div className="flex-1 overflow-auto bg-gray-950/80 text-white">
        {children}
      </div>
    </motion.div>
  );
};
