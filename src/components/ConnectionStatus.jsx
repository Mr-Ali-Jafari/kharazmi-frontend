import React, { useState, useEffect } from 'react';
import { FaPlug, FaPowerOff } from 'react-icons/fa';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine); 

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`flex items-center space-x-2 p-3  transition-all duration-300`}>
      <div className="status-indicator">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
      </div>
      <span className="text-white font-semibold">
        {isOnline ? 'Connected' : 'Disconnected'}
      </span>
      {isOnline ? (
        <FaPlug className="text-green-500 w-5 h-5 animate-pulse" />
      ) : (
        <FaPowerOff className="text-red-500 w-5 h-5 animate-pulse" />
      )}
    </div>
  );
};

export default ConnectionStatus;
