import React, { useState, lazy, Suspense } from 'react';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Window from './components/Window';
import { useStore } from './store/useStore';

// Lazy load apps to simulate OS-like behavior and optimize
const Finder = lazy(() => import('./apps/Finder'));
const Safari = lazy(() => import('./apps/Safari'));
const Notes = lazy(() => import('./apps/Notes'));
const Terminal = lazy(() => import('./apps/Terminal'));
const Settings = lazy(() => import('./apps/Settings'));
const SoftwareUpdate = lazy(() => import('./apps/SoftwareUpdate'));
const Trash = lazy(() => import('./apps/Trash'));

const appComponents = {
  finder: Finder,
  safari: Safari,
  notes: Notes,
  terminal: Terminal,
  settings: Settings,
  update: SoftwareUpdate,
  trash: Trash,
};

function App() {
  const [booting, setBooting] = useState(true);
  const openWindows = useStore((state) => state.openWindows);

  return (
    <>
      {booting && <BootScreen onComplete={() => setBooting(false)} />}
      
      {!booting && (
        <Desktop>
          {openWindows.map((win) => {
            const AppComponent = appComponents[win.appId];
            if (!AppComponent) return null;

            return (
              <Window key={win.id} window={win}>
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Loading...
                  </div>
                }>
                  <AppComponent windowId={win.id} />
                </Suspense>
              </Window>
            );
          })}
        </Desktop>
      )}
    </>
  );
}

export default App;
