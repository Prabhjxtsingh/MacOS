import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Wifi, 
  WifiOff, 
  BatteryFull, 
  BatteryMedium, 
  BatteryLow, 
  BatteryCharging, 
  Search, 
  Settings2,
  Bluetooth
} from 'lucide-react';
import { useStore, APPS } from '../store/useStore';
import MenuDropdown from './MenuDropdown';
import { useNetwork, useBattery, useBluetooth } from '../hooks/useSystemStatus';

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const { activeWindow, openWindows, openApp, toggleControlCenter } = useStore();
  
  // System Status Hooks
  const { isOnline } = useNetwork();
  const { level, charging, supported: batterySupported } = useBattery();
  const { isSupported: btSupported, isAvailable: btAvailable } = useBluetooth();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAppId = activeWindow 
    ? openWindows.find(w => w.id === activeWindow)?.appId 
    : 'finder';
  
  const activeAppName = activeAppId ? APPS[activeAppId]?.title : 'Finder';

  const menus = {
    apple: [
      { label: 'About This Mac', divider: true },
      { label: 'System Settings...', divider: true, onClick: () => openApp('settings') },
      { label: 'App Store...', divider: false },
      { label: 'Recent Items', divider: true },
      { label: 'Force Quit...', divider: true },
      { label: 'Sleep', divider: false },
      { label: 'Restart...', divider: false },
      { label: 'Shut Down...', divider: false },
    ],
    app: [
      { label: `About ${activeAppName}`, divider: true },
      { label: 'Preferences...', shortcut: '⌘,' },
      { label: 'Empty Trash...', divider: true },
      { label: 'Services', divider: true },
      { label: `Hide ${activeAppName}`, shortcut: '⌘H' },
      { label: 'Hide Others', shortcut: '⌥⌘H' },
      { label: 'Show All', divider: true },
      { label: `Quit ${activeAppName}`, shortcut: '⌘Q' },
    ],
    File: [
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'New Folder', shortcut: '⇧⌘N', divider: true },
      { label: 'Close Window', shortcut: '⌘W', divider: true },
      { label: 'Save', shortcut: '⌘S' },
    ],
    Edit: [
      { label: 'Undo', shortcut: '⌘Z', divider: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
      { label: 'Select All', shortcut: '⌘A' },
    ],
    View: [
      { label: 'As Icons', shortcut: '⌘1' },
      { label: 'As List', shortcut: '⌘2' },
      { label: 'As Columns', shortcut: '⌘3' },
    ],
    Go: [
      { label: 'Back', shortcut: '⌘[' },
      { label: 'Forward', shortcut: '⌘]' },
      { label: 'Enclosing Folder', shortcut: '⌘↑' },
    ],
    Window: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' },
    ],
    Help: [
      { label: `${activeAppName} Help` },
    ],
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  // Render Battery Icon
  const renderBatteryIcon = () => {
    if (!batterySupported) return <BatteryMedium size={14} className="cursor-pointer" />;
    if (charging) return <BatteryCharging size={14} className="cursor-pointer text-green-400" />;
    if (level > 0.8) return <BatteryFull size={14} className="cursor-pointer" />;
    if (level > 0.3) return <BatteryMedium size={14} className="cursor-pointer" />;
    return <BatteryLow size={14} className="cursor-pointer text-red-500" />;
  };

  return (
    <div className="h-7 w-full flex items-center justify-between px-4 text-sm text-white glass z-[200] fixed top-0 select-none">
      <div className="flex items-center space-x-1 h-full relative">
        {/* Apple Menu */}
        <div className="relative h-full flex items-center">
          <div 
            className={`cursor-pointer px-2 py-0.5 rounded transition-colors flex items-center ${activeMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/20'}`}
            onClick={() => handleMenuClick('apple')}
          >
             <svg className="w-3.5 h-3.5" viewBox="0 0 170 170" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.53-11.92-14.4-9.73-13.86-16.8-29.28-21.18-46.24-2.39-9.15-3.58-17.4-3.58-24.77 0-11.16 2.5-20.67 7.5-28.53 4.25-6.66 9.75-11.66 16.5-15 6.75-3.34 13.92-4.97 21.52-4.88 5.76.11 11.28 1.43 16.57 3.94 5.29 2.51 9.07 4.05 11.35 4.64 2.84.74 6.71.74 11.6 0 2.28-.59 6.28-2.18 12.01-4.76 5.73-2.58 11.45-3.8 17.15-3.64 12.24.47 22.05 4.05 29.43 10.76-7.39 5.3-11.34 11.95-11.83 19.94-.48 9.53 3.32 17.1 11.4 22.71 2.37 1.63 5.3 2.94 8.79 3.94-3.57 9.88-8.18 19.45-13.83 28.71zM111.41 12.96c-1.89 2.29-4.32 4.41-7.29 6.35-2.97 1.94-6.32 3.12-10.05 3.53-.33-6.69 2.1-12.65 7.29-17.88 3.5-3.53 8-5.94 13.48-7.24.32 6.24-1.54 11.32-3.43 15.24z"/>
              </svg>
          </div>
          <MenuDropdown isVisible={activeMenu === 'apple'} items={menus.apple} onClose={() => setActiveMenu(null)} />
        </div>

        {/* Active App Menu */}
        <div className="relative h-full flex items-center">
          <span 
            className={`font-bold text-[13px] cursor-pointer px-2 py-0.5 rounded transition-colors ${activeMenu === 'app' ? 'bg-white/20' : 'hover:bg-white/20'}`}
            onClick={() => handleMenuClick('app')}
          >
            {activeAppName}
          </span>
          <MenuDropdown isVisible={activeMenu === 'app'} items={menus.app} onClose={() => setActiveMenu(null)} />
        </div>

        {/* Other Menus */}
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
          <div key={item} className="hidden md:flex relative h-full items-center">
            <span 
              className={`text-[13px] font-medium cursor-pointer px-2 py-0.5 rounded transition-colors ${activeMenu === item ? 'bg-white/20' : 'hover:bg-white/20'}`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </span>
            <MenuDropdown isVisible={activeMenu === item} items={menus[item]} onClose={() => setActiveMenu(null)} />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 text-[13px] font-medium">
        <div className="hidden md:flex items-center space-x-3">
          {btSupported && btAvailable && <Bluetooth size={14} className="cursor-pointer" />}
          {isOnline ? <Wifi size={14} className="cursor-pointer" /> : <WifiOff size={14} className="cursor-pointer text-gray-400" />}
          <Search size={14} className="cursor-pointer hover:opacity-80" />
        </div>
        
        <Settings2 size={14} className="cursor-pointer hover:opacity-80 ml-2" onClick={(e) => { e.stopPropagation(); toggleControlCenter(); }} />
        
        <div className="flex items-center">
          {batterySupported && <span className="mr-1 text-[11px]">{Math.round(level * 100)}%</span>}
          {renderBatteryIcon()}
        </div>
        
        <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition-colors">
          {format(time, 'EEE MMM d h:mm a')}
        </span>
      </div>
    </div>
  );
}
