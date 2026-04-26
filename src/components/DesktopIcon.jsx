import React, { useState } from 'react';
import { useStore, APPS } from '../store/useStore';
import { 
  Folder, 
  Compass, 
  FileText, 
  TerminalSquare, 
  Settings,
  DownloadCloud,
  Trash2 
} from 'lucide-react';

const ICONS = {
  finder: <Folder size={40} className="text-blue-500" fill="currentColor" />,
  safari: <Compass size={40} className="text-blue-400" />,
  notes: <FileText size={40} className="text-yellow-400" fill="currentColor" />,
  terminal: <TerminalSquare size={40} className="text-gray-700" fill="currentColor" />,
  settings: <Settings size={40} className="text-gray-500" fill="currentColor" />,
  update: <DownloadCloud size={40} className="text-blue-500" fill="currentColor" />,
  trash: <Trash2 size={40} className="text-gray-300" />,
};

export default function DesktopIcon({ appId }) {
  const [isSelected, setIsSelected] = useState(false);
  const openApp = useStore((state) => state.openApp);
  const app = APPS[appId];

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    openApp(appId);
    setIsSelected(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  // Close selection when clicking outside
  React.useEffect(() => {
    const handleGlobalClick = () => setIsSelected(false);
    if (isSelected) {
      window.addEventListener('click', handleGlobalClick);
    }
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isSelected]);

  return (
    <div 
      className={`flex flex-col items-center justify-center w-20 h-24 rounded-md cursor-pointer transition-colors ${
        isSelected ? 'bg-white/20 border border-white/30' : 'hover:bg-white/10 border border-transparent'
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-14 h-14 bg-white/90 rounded-2xl shadow-sm flex items-center justify-center mb-1 pointer-events-none">
        {ICONS[appId]}
      </div>
      <span className={`text-xs text-white font-medium px-1 rounded ${isSelected ? 'bg-blue-600' : 'bg-transparent text-shadow-sm'}`} style={{ textShadow: isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.5)' }}>
        {app.title}
      </span>
    </div>
  );
}
