import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useStore, APPS } from '../store/useStore';
import { X, Minus, Maximize2 } from 'lucide-react';
import clsx from 'clsx';

export default function Window({ window: winData, children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const { 
    activeWindow, 
    focusWindow, 
    closeApp, 
    minimizeWindow, 
    maximizeWindow 
  } = useStore();
  
  const rndRef = useRef(null);
  const app = APPS[winData.appId];
  const isActive = activeWindow === winData.id;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (winData.isMinimized) {
    return null; // Don't render if minimized
  }

  const handleFocus = () => {
    if (!isActive) focusWindow(winData.id);
  };

  const handleDragStart = () => {
    handleFocus();
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closeApp(winData.id);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    minimizeWindow(winData.id);
  };

  const isActuallyMaximized = winData.isMaximized || isMobile;

  const handleMaximize = (e) => {
    if (e) e.stopPropagation();
    if (isMobile) return; // Prevent manual toggle on mobile
    
    maximizeWindow(winData.id);
    // When maximized, we need to manually update Rnd position and size
    if (!winData.isMaximized && rndRef.current) {
      rndRef.current.updatePosition({ x: 0, y: 28 }); // 28px top bar height
      rndRef.current.updateSize({ width: '100%', height: 'calc(100vh - 28px)' });
    } else if (winData.isMaximized && rndRef.current) {
      // Restore to default size
      rndRef.current.updatePosition({ x: 100, y: 100 });
      rndRef.current.updateSize({ width: 800, height: 500 });
    }
  };

  // On mobile, force window to snap to full screen immediately
  useEffect(() => {
    if (isMobile && rndRef.current) {
      rndRef.current.updatePosition({ x: 0, y: 28 });
      rndRef.current.updateSize({ width: '100%', height: 'calc(100vh - 28px)' });
    } else if (!isMobile && !winData.isMaximized && rndRef.current) {
      // Restore default windowed state when leaving mobile breakpoint if not maximized
      rndRef.current.updateSize({ width: 800, height: 500 });
    }
  }, [isMobile, winData.isMaximized]);

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: isMobile ? 0 : 100 + Math.random() * 50,
        y: isMobile ? 28 : 100 + Math.random() * 50,
        width: isMobile ? '100%' : 800,
        height: isMobile ? 'calc(100vh - 28px)' : 500,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStart={handleDragStart}
      onResizeStop={handleDragStop}
      disableDragging={isActuallyMaximized}
      enableResizing={!isActuallyMaximized}
      style={{
        zIndex: winData.zIndex,
        position: 'absolute',
        willChange: isDragging ? 'transform' : 'auto',
      }}
      className={clsx(
        "flex flex-col overflow-hidden transition-shadow duration-200",
        isActuallyMaximized ? "rounded-none transition-all duration-300" : "rounded-xl",
        isDragging ? "bg-white/95 dark:bg-gray-900/95" : "glass-window",
        isActive ? "shadow-2xl ring-1 ring-white/20" : "shadow-lg opacity-95"
      )}
      onClick={handleFocus}
    >
      {/* Title Bar */}
      <div 
        className={clsx(
          "window-drag-handle h-12 flex items-center justify-between px-4 select-none shrink-0",
          isActive ? "bg-white/10" : "bg-transparent",
          isActuallyMaximized ? "" : "cursor-default"
        )}
        onDoubleClick={() => !isMobile && handleMaximize()}
      >
        {/* Traffic Lights */}
        <div className="flex space-x-2 group w-20">
          <button 
            onClick={handleClose}
            className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center border border-red-600/50"
          >
            <X size={10} className="text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={handleMinimize}
            className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center border border-yellow-600/50"
          >
            <Minus size={10} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={handleMaximize}
            className={clsx(
              "w-3.5 h-3.5 rounded-full flex items-center justify-center border",
              isMobile ? "bg-gray-400 border-gray-500/50 cursor-not-allowed" : "bg-green-500 border-green-600/50"
            )}
            disabled={isMobile}
          >
            <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Window Title */}
        <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm flex-1 text-center truncate px-2">
          {app.title}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-20 shrink-0"></div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-hidden bg-white/50 dark:bg-black/50 relative flex flex-col">
        {/* Semi-transparent overlay when not active */}
        {!isActive && <div className="absolute inset-0 bg-white/10 dark:bg-black/10 z-50 pointer-events-none" />}
        <div className="flex-1 overflow-hidden flex flex-col w-full h-full">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
