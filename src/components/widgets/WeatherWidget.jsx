import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="w-40 h-40 bg-gradient-to-b from-blue-400 to-blue-500 rounded-2xl shadow-xl flex flex-col justify-between p-4 text-white cursor-default select-none relative overflow-hidden group hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-sm">Cupertino</div>
          <div className="text-4xl font-light">72°</div>
        </div>
        <Sun size={24} className="text-yellow-300 drop-shadow-sm" fill="currentColor" />
      </div>
      
      <div>
        <div className="text-xs font-medium">Mostly Sunny</div>
        <div className="flex text-xs opacity-80 gap-2">
          <span>H:78°</span>
          <span>L:55°</span>
        </div>
      </div>
    </div>
  );
}
