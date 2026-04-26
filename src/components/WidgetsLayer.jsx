import React from 'react';
import WeatherWidget from './widgets/WeatherWidget';
import ClockWidget from './widgets/ClockWidget';
import CalendarWidget from './widgets/CalendarWidget';
import { motion } from 'framer-motion';

export default function WidgetsLayer() {
  return (
    <div className="hidden lg:block absolute top-10 right-4 bottom-24 w-80 pointer-events-none z-0">
      {/* 
        pointer-events-none on the container so it doesn't block clicks to the desktop background.
        We'll enable pointer-events on the individual widgets so they can be hovered/interacted with.
      */}
      <div className="flex flex-col gap-4 items-end h-full">
        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <WeatherWidget />
        </motion.div>
        
        <div className="flex gap-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ClockWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CalendarWidget />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
