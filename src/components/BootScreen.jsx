import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit after reaching 100%
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Apple Logo (using Lucide as a placeholder or SVG) */}
      <svg
        className="w-24 h-24 text-white mb-16"
        viewBox="0 0 170 170"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.53-11.92-14.4-9.73-13.86-16.8-29.28-21.18-46.24-2.39-9.15-3.58-17.4-3.58-24.77 0-11.16 2.5-20.67 7.5-28.53 4.25-6.66 9.75-11.66 16.5-15 6.75-3.34 13.92-4.97 21.52-4.88 5.76.11 11.28 1.43 16.57 3.94 5.29 2.51 9.07 4.05 11.35 4.64 2.84.74 6.71.74 11.6 0 2.28-.59 6.28-2.18 12.01-4.76 5.73-2.58 11.45-3.8 17.15-3.64 12.24.47 22.05 4.05 29.43 10.76-7.39 5.3-11.34 11.95-11.83 19.94-.48 9.53 3.32 17.1 11.4 22.71 2.37 1.63 5.3 2.94 8.79 3.94-3.57 9.88-8.18 19.45-13.83 28.71zM111.41 12.96c-1.89 2.29-4.32 4.41-7.29 6.35-2.97 1.94-6.32 3.12-10.05 3.53-.33-6.69 2.1-12.65 7.29-17.88 3.5-3.53 8-5.94 13.48-7.24.32 6.24-1.54 11.32-3.43 15.24z"/>
      </svg>
      
      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
