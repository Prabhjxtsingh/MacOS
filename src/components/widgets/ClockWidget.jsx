import React, { useState, useEffect } from 'react';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  return (
    <div className="w-40 h-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-3xl rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 cursor-default select-none hover:scale-[1.02] transition-transform border border-white/40 dark:border-white/10">
      <div className="relative w-28 h-28 rounded-full border-[3px] border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 shadow-inner flex items-center justify-center">
        {/* Clock Center */}
        <div className="w-2 h-2 rounded-full bg-orange-500 z-10 absolute" />
        
        {/* Hour Hand */}
        <div 
          className="absolute w-1 h-8 bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom"
          style={{ transform: `translateY(-4px) rotate(${hourDeg}deg)`, transformOrigin: 'bottom center', top: '50%', marginTop: '-32px' }}
        />
        
        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-11 bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom"
          style={{ transform: `translateY(-4px) rotate(${minuteDeg}deg)`, transformOrigin: 'bottom center', top: '50%', marginTop: '-44px' }}
        />
        
        {/* Second Hand */}
        <div 
          className="absolute w-0.5 h-12 bg-orange-500 rounded-full origin-bottom"
          style={{ transform: `translateY(-4px) rotate(${secondDeg}deg)`, transformOrigin: 'bottom center', top: '50%', marginTop: '-48px' }}
        />
        
        {/* Clock Ticks */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1.5 bg-gray-800 dark:bg-gray-200 rounded-sm"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-12px)`, 
              top: '12px'
            }}
          />
        ))}
      </div>
      <div className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
        Cupertino
      </div>
    </div>
  );
}
