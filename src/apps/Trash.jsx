import React from 'react';
import { Trash2 } from 'lucide-react';

export default function Trash() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-md rounded-b-xl">
      <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
        <Trash2 size={64} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">Trash is empty</p>
        <p className="text-sm mt-2 opacity-70">Items you delete will appear here.</p>
      </div>
    </div>
  );
}
