import React, { useState, useEffect } from 'react';
import { DownloadCloud, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SoftwareUpdate() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('checking'); // checking, downloading, installing, complete

  useEffect(() => {
    // Simulate checking for updates
    const checkingTimer = setTimeout(() => {
      setStatus('downloading');
    }, 2000);

    return () => clearTimeout(checkingTimer);
  }, []);

  useEffect(() => {
    if (status === 'downloading' || status === 'installing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (status === 'downloading') {
              setStatus('installing');
              return 0; // reset for installation phase
            } else {
              setStatus('complete');
              clearInterval(interval);
              return 100;
            }
          }
          // Slow down progress as it gets higher
          const increment = Math.random() * (status === 'downloading' ? 5 : 2);
          return Math.min(prev + increment, 100);
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white dark:bg-[#1e1e1e] p-8 rounded-b-xl">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Apple Logo Icon / Update Icon */}
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <DownloadCloud size={48} className="text-blue-500" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Software Update</h2>
        
        <div className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              15
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">macOS Sequoia 15.1</h3>
              <p className="text-sm text-gray-500">Apple Inc. - 4.2 GB</p>
            </div>
          </div>

          <div className="mt-6">
            {status === 'checking' && (
              <p className="text-sm text-center text-gray-500 animate-pulse">Checking for updates...</p>
            )}

            {(status === 'downloading' || status === 'installing') && (
              <div className="w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{status === 'downloading' ? 'Downloading...' : 'Preparing installation...'}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  {status === 'downloading' ? 'About 3 minutes remaining' : 'About 1 minute remaining'}
                </p>
              </div>
            )}

            {status === 'complete' && (
              <div className="flex flex-col items-center text-green-500">
                <CheckCircle2 size={32} className="mb-2" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Mac is up to date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
