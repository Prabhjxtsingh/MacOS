import { useState, useEffect } from 'react';

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setConnectionType(connection.effectiveType);
      const handleConnectionChange = () => setConnectionType(connection.effectiveType);
      connection.addEventListener('change', handleConnectionChange);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
}

export function useBattery() {
  const [batteryState, setBatteryState] = useState({
    level: 1,
    charging: false,
    supported: true
  });

  useEffect(() => {
    let batteryManager = null;

    const updateBattery = (battery) => {
      setBatteryState({
        level: battery.level,
        charging: battery.charging,
        supported: true
      });
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        batteryManager = battery;
        updateBattery(battery);

        battery.addEventListener('levelchange', () => updateBattery(battery));
        battery.addEventListener('chargingchange', () => updateBattery(battery));
      });
    } else {
      setBatteryState(prev => ({ ...prev, supported: false }));
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', () => updateBattery(batteryManager));
        batteryManager.removeEventListener('chargingchange', () => updateBattery(batteryManager));
      }
    };
  }, []);

  return batteryState;
}

export function useBluetooth() {
  const [isSupported, setIsSupported] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (navigator.bluetooth && navigator.bluetooth.getAvailability) {
      setIsSupported(true);
      navigator.bluetooth.getAvailability().then(available => {
        setIsAvailable(available);
      }).catch(err => {
        console.warn("Bluetooth availability error:", err);
      });
      
      const handleAvailabilityChange = (e) => setIsAvailable(e.value);
      navigator.bluetooth.addEventListener('availabilitychanged', handleAvailabilityChange);
      
      return () => navigator.bluetooth.removeEventListener('availabilitychanged', handleAvailabilityChange);
    }
  }, []);

  return { isSupported, isAvailable };
}
