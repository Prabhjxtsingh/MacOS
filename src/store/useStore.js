import { create } from 'zustand';

export const APPS = {
  finder: { id: 'finder', title: 'Finder', icon: '/icons/finder.png' },
  safari: { id: 'safari', title: 'Safari', icon: '/icons/safari.png' },
  notes: { id: 'notes', title: 'Notes', icon: '/icons/notes.png' },
  terminal: { id: 'terminal', title: 'Terminal', icon: '/icons/terminal.png' },
  settings: { id: 'settings', title: 'System Settings', icon: '/icons/settings.png' },
  update: { id: 'update', title: 'Software Update', icon: '/icons/update.png' },
  trash: { id: 'trash', title: 'Trash', icon: '/icons/trash.png' },
};

export const useStore = create((set, get) => ({
  openWindows: [],
  activeWindow: null,
  highestZIndex: 10,
  wallpaper: '/wp4.jpg', // Default to IMG (38)
  isControlCenterOpen: false,

  setWallpaper: (url) => set({ wallpaper: url }),
  toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen })),
  closeControlCenter: () => set({ isControlCenterOpen: false }),

  openApp: (appId) => {
    const { openWindows, highestZIndex } = get();
    const existingWindow = openWindows.find((w) => w.appId === appId);

    if (existingWindow) {
      set({
        openWindows: openWindows.map((w) =>
          w.appId === appId ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
        ),
        activeWindow: existingWindow.id,
        highestZIndex: highestZIndex + 1,
      });
      return;
    }

    const newWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
    };

    set({
      openWindows: [...openWindows, newWindow],
      activeWindow: newWindow.id,
      highestZIndex: highestZIndex + 1,
    });
  },

  closeApp: (windowId) => {
    const { openWindows, activeWindow } = get();
    const filtered = openWindows.filter((w) => w.id !== windowId);
    
    let newActive = activeWindow;
    if (activeWindow === windowId) {
      newActive = filtered.length > 0 ? filtered[filtered.length - 1].id : null;
    }

    set({
      openWindows: filtered,
      activeWindow: newActive,
    });
  },

  focusWindow: (windowId) => {
    const { highestZIndex, openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === windowId ? { ...w, zIndex: highestZIndex + 1, isMinimized: false } : w
      ),
      activeWindow: windowId,
      highestZIndex: highestZIndex + 1,
    });
  },

  minimizeWindow: (windowId) => {
    const { openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
      activeWindow: null,
    });
  },

  maximizeWindow: (windowId) => {
    const { openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    });
  },
}));
