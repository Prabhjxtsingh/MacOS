import React, { useState } from 'react';
import TopBar from './TopBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import ControlCenter from './ControlCenter';
import WidgetsLayer from './WidgetsLayer';
import { useStore, APPS } from '../store/useStore';

export default function Desktop({ children }) {
  const [contextMenu, setContextMenu] = useState({ isVisible: false, x: 0, y: 0 });
  const wallpaper = useStore(state => state.wallpaper);
  const closeControlCenter = useStore(state => state.closeControlCenter);

  // Use static image background for better performance
  const backgroundStyle = {
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.3s ease-in-out'
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    
    // Ensure the menu doesn't go off-screen
    const menuWidth = 256; // 64rem = 256px roughly
    const menuHeight = 250; 
    let x = e.pageX;
    let y = e.pageY;

    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight;

    setContextMenu({ isVisible: true, x, y });
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      style={backgroundStyle}
      onContextMenu={handleContextMenu}
      onClick={() => closeControlCenter()}
    >

      <TopBar />
      
      {/* Desktop Icons Grid */}
      <div className="absolute top-10 left-4 flex flex-col gap-4 flex-wrap max-h-[calc(100vh-120px)]">
        {Object.keys(APPS).map(appId => (
          <DesktopIcon key={appId} appId={appId} />
        ))}
      </div>

      {/* Render Active Windows */}
      {children}

      <Dock />

      {/* Right Click Menu */}
      <ContextMenu 
        x={contextMenu.x} 
        y={contextMenu.y} 
        isVisible={contextMenu.isVisible} 
        onClose={() => setContextMenu({ ...contextMenu, isVisible: false })} 
      />

      {/* Desktop Widgets Layer */}
      <WidgetsLayer />

      {/* Control Center Panel */}
      <ControlCenter />
    </div>
  );
}
