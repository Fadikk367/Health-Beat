import React, { useState, useEffect } from 'react';

import { MeasurementProvider } from 'providers/measurementContext';
import { AuthProvider } from 'providers/authContext';

import { measurementOfflineService, measurementOnlineService } from 'services'


const NetworkDetector = (Component: React.FC) => {
  const ComposedComponent = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    }

    useEffect(() => {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      }
    }, [])

    return (
      <AuthProvider>
        <MeasurementProvider measurementService={isOnline ? measurementOnlineService : measurementOfflineService}>
          <Component />
        </MeasurementProvider>
      </AuthProvider>
    )
  }

  return ComposedComponent;
}

export default NetworkDetector;
