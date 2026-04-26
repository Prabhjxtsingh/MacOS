import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = tomorrow - now;
    
    const timer = setTimeout(() => {
      setDate(new Date());
      // Then set interval for every 24h
      setInterval(() => setDate(new Date()), 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
    
    return () => clearTimeout(timer);
  }, []);

  const dayName = format(date, 'EEEE');
  const dayNumber = format(date, 'd');

  return (
    <div className="w-40 h-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-3xl rounded-2xl shadow-xl flex flex-col p-4 cursor-default select-none hover:scale-[1.02] transition-transform border border-white/40 dark:border-white/10">
      <div className="text-red-500 font-semibold text-sm uppercase">
        {dayName}
      </div>
      <div className="text-5xl font-light text-gray-800 dark:text-gray-200 mt-1">
        {dayNumber}
      </div>
      
      <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-2">
        <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
          Team Standup
        </div>
        <div className="text-[10px] text-gray-500 truncate">
          10:00 AM - 10:30 AM
        </div>
      </div>
    </div>
  );
}
