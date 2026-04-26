import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuDropdown({ isVisible, items, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-7 left-0 z-[100]">
      {/* Invisible overlay to handle clicking outside */}
      <div className="fixed inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.1 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-b-xl shadow-2xl py-1 min-w-[200px] text-sm text-gray-800 dark:text-gray-200"
      >
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <div 
              className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer flex justify-between items-center"
              onClick={() => {
                if (item.onClick) item.onClick();
                onClose();
              }}
            >
              <span>{item.label}</span>
              {item.shortcut && <span className="opacity-50 text-xs ml-4">{item.shortcut}</span>}
            </div>
            {item.divider && <div className="h-px bg-gray-300 dark:bg-gray-600/50 my-1 mx-2" />}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
