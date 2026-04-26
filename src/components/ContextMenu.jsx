import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useStore } from '../store/useStore';

export default function ContextMenu({ x, y, isVisible, onClose }) {
  const { wallpaper, setWallpaper } = useStore();

  useEffect(() => {
    const handleClick = () => {
      if (isVisible) onClose();
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isVisible, onClose]);

  const changeWallpaper = () => {
    const wallpapers = ['/wp1.jpg', '/wp2.jpg', '/wp3.jpg', '/wp4.jpg'];
    let currentIndex = wallpapers.indexOf(wallpaper);
    let nextIndex = (currentIndex + 1) % wallpapers.length;
    setWallpaper(wallpapers[nextIndex]);
  };

  const menuItems = [
    { label: 'New Folder', divider: false },
    { label: 'Get Info', divider: true },
    { label: 'Change Desktop Background...', divider: false, onClick: changeWallpaper },
    { label: 'Use Stacks', divider: true },
    { label: 'Sort By', divider: false, hasSubmenu: true },
    { label: 'Clean Up', divider: false },
    { label: 'Clean Up By', divider: true, hasSubmenu: true },
    { label: 'Show View Options', divider: false },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed z-[100] w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-xl shadow-2xl py-1 text-sm text-gray-800 dark:text-gray-200"
          style={{ top: y, left: x }}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <div 
                className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default flex justify-between items-center"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  onClose();
                }}
              >
                <span>{item.label}</span>
                {item.hasSubmenu && <span className="text-xs">▶</span>}
              </div>
              {item.divider && <div className="h-px bg-gray-300 dark:bg-gray-600/50 my-1 mx-2" />}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
