import React, { useState } from 'react';
import { useNetwork, useBattery, useBluetooth } from '../hooks/useSystemStatus';
import { 
  Wifi, 
  Bluetooth, 
  Bell, 
  Monitor, 
  Battery, 
  User, 
  Lock, 
  Search,
  Paintbrush
} from 'lucide-react';

const SETTINGS_CATEGORIES = [
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={16} className="text-white" />, color: 'bg-blue-500' },
  { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={16} className="text-white" />, color: 'bg-blue-500' },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} className="text-white" />, color: 'bg-red-500' },
  { id: 'appearance', label: 'Appearance', icon: <Paintbrush size={16} className="text-white" />, color: 'bg-gray-500' },
  { id: 'displays', label: 'Displays', icon: <Monitor size={16} className="text-white" />, color: 'bg-blue-400' },
  { id: 'battery', label: 'Battery', icon: <Battery size={16} className="text-white" />, color: 'bg-green-500' },
  { id: 'privacy', label: 'Privacy & Security', icon: <Lock size={16} className="text-white" />, color: 'bg-blue-600' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('wifi');
  const [searchQuery, setSearchQuery] = useState('');

  // System Status
  const { isOnline, connectionType } = useNetwork();
  const { level, charging, supported: batterySupported } = useBattery();
  const { isSupported: btSupported, isAvailable: btAvailable } = useBluetooth();

  const renderContent = () => {
    switch(activeTab) {
      case 'wifi':
        return (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-gray-800 dark:text-gray-200">Wi-Fi</div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${isOnline ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                {isOnline ? 'On' : 'Off'}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Status: {isOnline ? 'Connected' : 'Disconnected'}<br/>
              {connectionType && `Connection Type: ${connectionType}`}
            </div>
          </div>
        );
      case 'battery':
        return (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-gray-800 dark:text-gray-200">Battery Level</div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">{batterySupported ? `${Math.round(level * 100)}%` : 'Unknown'}</div>
            </div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full ${charging ? 'bg-green-500' : 'bg-blue-500'}`} 
                style={{ width: `${Math.round(level * 100)}%` }} 
              />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Power Source: {charging ? 'Power Adapter' : 'Battery'}
            </div>
          </div>
        );
      case 'bluetooth':
        return (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-gray-800 dark:text-gray-200">Bluetooth</div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${btSupported && btAvailable ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                {btSupported && btAvailable ? 'On' : 'Off'}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {!btSupported ? 'Bluetooth is not supported on this device.' : (btAvailable ? 'Discoverable as "MacBook Pro"' : 'Bluetooth is turned off.')}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-center justify-center text-gray-500 text-sm">
            Settings options for {SETTINGS_CATEGORIES.find(c => c.id === activeTab)?.label} would appear here.
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-100 dark:bg-[#1e1e1e] rounded-b-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 flex flex-col h-full shrink-0">
        <div className="p-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 rounded-md pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>
        
        <div className="px-3 pb-4">
          <div className="flex items-center p-2 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-3">
              <User size={24} className="text-gray-500" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Apple User</div>
              <div className="text-xs text-gray-500">Apple ID</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {SETTINGS_CATEGORIES.map(category => (
            <div 
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                activeTab === category.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center mr-3 ${category.color} shadow-sm`}>
                {category.icon}
              </div>
              <span className="text-sm">{category.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-[#1e1e1e] p-8 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          {SETTINGS_CATEGORIES.find(c => c.id === activeTab)?.label}
        </h2>
        
        {renderContent()}
      </div>
    </div>
  );
}
