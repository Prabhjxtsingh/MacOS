import React, { useState } from 'react';
import { useStore, APPS } from '../store/useStore';
import { 
  HardDrive, 
  Folder as FolderIcon, 
  FileText, 
  Image as ImageIcon, 
  Video,
  Compass,
  TerminalSquare,
  Settings,
  Trash2
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'recents', label: 'Recents', icon: <FileText size={16} /> },
  { id: 'applications', label: 'Applications', icon: <FolderIcon size={16} /> },
  { id: 'desktop', label: 'Desktop', icon: <FolderIcon size={16} /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon size={16} /> },
  { id: 'downloads', label: 'Downloads', icon: <FolderIcon size={16} /> },
];

const LOCATIONS = [
  { id: 'macintosh', label: 'Macintosh HD', icon: <HardDrive size={16} /> },
  { id: 'icloud', label: 'iCloud Drive', icon: <FolderIcon size={16} /> },
];

const DEFAULT_FILES = [
  { id: 'f1', name: 'Projects', type: 'folder', icon: <FolderIcon size={48} className="text-blue-400 fill-blue-200" /> },
  { id: 'f2', name: 'Images', type: 'folder', icon: <FolderIcon size={48} className="text-blue-400 fill-blue-200" /> },
  { id: 'f3', name: 'notes.txt', type: 'file', icon: <FileText size={48} className="text-gray-400" /> },
  { id: 'f4', name: 'vacation.jpg', type: 'image', icon: <ImageIcon size={48} className="text-purple-400" /> },
  { id: 'f5', name: 'presentation.mp4', type: 'video', icon: <Video size={48} className="text-red-400" /> },
];

const APP_ICONS = {
  finder: <FolderIcon size={48} className="text-blue-500 fill-blue-300" />,
  safari: <Compass size={48} className="text-blue-400" />,
  notes: <FileText size={48} className="text-yellow-400 fill-yellow-200" />,
  terminal: <TerminalSquare size={48} className="text-gray-700 fill-gray-500" />,
  settings: <Settings size={48} className="text-gray-500 fill-gray-300" />,
  trash: <Trash2 size={48} className="text-gray-300" />,
};

export default function Finder() {
  const [activeTab, setActiveTab] = useState('desktop');
  const openApp = useStore(state => state.openApp);

  const renderContent = () => {
    if (activeTab === 'applications') {
      return (
        <div className="flex flex-wrap gap-6">
          {Object.values(APPS).map((app) => (
            <div 
              key={app.id} 
              onDoubleClick={() => openApp(app.id)}
              className="flex flex-col items-center justify-start w-24 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
            >
              <div className="mb-2">
                {APP_ICONS[app.id]}
              </div>
              <span className="text-xs text-center text-gray-800 dark:text-gray-200 font-medium w-full">
                {app.title}
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-6">
        {DEFAULT_FILES.map((file) => (
          <div 
            key={file.id} 
            className="flex flex-col items-center justify-start w-24 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
          >
            <div className="mb-2">
              {file.icon}
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200 font-medium truncate w-full">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-white/90 dark:bg-black/90 rounded-b-xl">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md pt-4 px-2 h-full flex flex-col select-none shrink-0">
        <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase">Favorites</div>
        <div className="space-y-0.5">
          {SIDEBAR_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-2 py-1 rounded-md cursor-pointer text-sm transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase mt-6">Locations</div>
        <div className="space-y-0.5">
          {LOCATIONS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-2 py-1 rounded-md cursor-pointer text-sm transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label || LOCATIONS.find(i => i.id === activeTab)?.label}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
}
