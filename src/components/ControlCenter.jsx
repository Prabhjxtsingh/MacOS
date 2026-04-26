import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  Bluetooth, 
  Moon, 
  Sun, 
  Volume2, 
  Monitor,
  Play,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNetwork, useBluetooth } from '../hooks/useSystemStatus';

export default function ControlCenter() {
  const isControlCenterOpen = useStore(state => state.isControlCenterOpen);
  const { isOnline } = useNetwork();
  const { isSupported: btSupported, isAvailable: btAvailable } = useBluetooth();

  return (
    <AnimatePresence>
      {isControlCenterOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-8 left-2 right-2 md:left-auto md:right-2 z-[300] md:w-80 max-w-sm mx-auto bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-3 flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Row: Connectivity & Focus */}
          <div className="flex gap-3 h-32">
            {/* Connectivity Box */}
            <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-xl p-3 flex flex-col justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isOnline ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}>
                  <Wifi size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Wi-Fi</div>
                  <div className="text-xs text-gray-500">{isOnline ? 'Home Network' : 'Off'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${btSupported && btAvailable ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}>
                  <Bluetooth size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Bluetooth</div>
                  <div className="text-xs text-gray-500">{btSupported && btAvailable ? 'On' : 'Off'}</div>
                </div>
              </div>
            </div>

            {/* Focus & AirDrop Box */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm">
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  <Moon size={16} fill="currentColor" />
                </div>
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Focus</div>
              </div>
              <div className="flex-1 flex gap-3">
                 <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-xl flex items-center justify-center shadow-sm text-gray-700 dark:text-gray-300">
                    <span className="text-xs font-semibold">AirDrop</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Display Brightness Slider */}
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3 shadow-sm flex flex-col justify-center">
            <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mb-2 ml-1">Display</div>
            <div className="flex items-center gap-2">
              <Sun size={14} className="text-gray-500" />
              <div className="flex-1 h-5 bg-white dark:bg-black/40 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full w-[80%] bg-white dark:bg-gray-300 shadow-sm" />
              </div>
            </div>
          </div>

          {/* Sound Slider */}
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3 shadow-sm flex flex-col justify-center">
            <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mb-2 ml-1">Sound</div>
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-gray-500" />
              <div className="flex-1 h-5 bg-white dark:bg-black/40 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full w-[50%] bg-white dark:bg-gray-300 shadow-sm" />
              </div>
            </div>
          </div>

          {/* Now Playing Widget */}
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                <Monitor size={24} className="text-gray-400" />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Not Playing</div>
                <div className="text-xs text-gray-500">Music</div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-1 text-gray-800 dark:text-gray-200">
              <SkipBack size={20} className="opacity-50" />
              <Play size={24} className="opacity-50" fill="currentColor" />
              <SkipForward size={20} className="opacity-50" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
