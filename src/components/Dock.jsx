import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, APPS } from '../store/useStore';
import { 
  Folder, 
  Compass, 
  FileText, 
  TerminalSquare, 
  Settings,
  DownloadCloud,
  Trash2 
} from 'lucide-react';
import clsx from 'clsx';

const ICONS = {
  finder: <Folder size={32} className="text-blue-500" fill="currentColor" />,
  safari: <Compass size={32} className="text-blue-400" />,
  notes: <FileText size={32} className="text-yellow-400" fill="currentColor" />,
  terminal: <TerminalSquare size={32} className="text-gray-700" fill="currentColor" />,
  settings: <Settings size={32} className="text-gray-500" fill="currentColor" />,
  update: <DownloadCloud size={32} className="text-blue-500" fill="currentColor" />,
  trash: <Trash2 size={32} className="text-gray-300" />,
};

const DockItem = ({ appId, title, icon, isOpen, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -top-10 px-3 py-1 bg-gray-800/80 backdrop-blur-md text-white text-xs rounded-md whitespace-nowrap shadow-xl border border-white/10 z-50 pointer-events-none">
          {title}
        </div>
      )}
      
      {/* App Icon with Magnification */}
      <motion.button
        className="relative w-12 h-12 rounded-xl bg-white/90 shadow-sm flex items-center justify-center border border-gray-200/50"
        whileHover={{ scale: 1.4, y: -10 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        layout
      >
        {icon}
      </motion.button>
      
      {/* Open Indicator */}
      <div className={clsx(
        "absolute -bottom-1 w-1 h-1 rounded-full transition-all duration-300",
        isOpen ? "bg-gray-800 dark:bg-gray-300" : "bg-transparent"
      )} />
    </div>
  );
};

export default function Dock() {
  const { openWindows, activeWindow, openApp, focusWindow } = useStore();

  const handleAppClick = (appId) => {
    // If window is open but not active, focus it. Else, open it.
    const windowOpen = openWindows.find(w => w.appId === appId);
    if (windowOpen) {
      focusWindow(windowOpen.id);
    } else {
      openApp(appId);
    }
  };

  return (
    <div className="fixed bottom-2 w-full flex justify-center z-50 pointer-events-none px-2">
      <div className="glass-dock px-3 py-2 rounded-2xl flex items-end space-x-2 pointer-events-auto mac-shadow max-w-[100vw] overflow-x-auto overflow-y-hidden hide-scrollbar">
        {Object.values(APPS).map((app) => {
          const isOpen = openWindows.some(w => w.appId === app.id);
          const isActive = openWindows.some(w => w.appId === app.id && w.id === activeWindow);
          
          return (
            <DockItem
              key={app.id}
              appId={app.id}
              title={app.title}
              icon={ICONS[app.id]}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => handleAppClick(app.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
