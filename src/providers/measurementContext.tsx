import React, { createContext, useEffect } from 'react';
import axios from 'axios';

import { Measurement, MeasurementService } from 'interfaces';


interface MeasurementContextProps {
  measurements: Measurement[];
  fetchMeasurements(): Promise<void>;
  addMeasurement(measurement: Measurement): Promise<void>;
}


const defaultMeasurementContext = {
  measurements: [],
  fetchMeasurements: () => Promise.resolve(),
  addMeasurement: (measurement: Measurement) => Promise.resolve()
}


const MeasurementContext = createContext<MeasurementContextProps>(defaultMeasurementContext);


const MeasurementProvider: React.FC<{ measurementService: MeasurementService }> = ({ children, measurementService }) => {
  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);
  
  useEffect(() => {
    const initializeContext = async () => {
      await handleSyncMeasurements();
      await fetchMeasurements();
    }

    if (navigator.onLine) {
      initializeContext();
    }
  }, [measurementService])


  async function handleSyncMeasurements(): Promise<void> {
    const localMeasurements: Measurement[] = JSON.parse(localStorage.getItem('measurements') || "[]");
    
    if (localMeasurements.length) {
      console.log('sync...');
      try {
        const headers = {
          'Authorization': localStorage.getItem('token')
        }
  
        const response = await axios.post<Measurement[]>('/measurements/sync', { localMeasurements }, { headers });
        localStorage.setItem('measurements', "[]");
        // setMeasurements([...measurements, ...response.data]);
      } catch(err) {
        console.log(err);
      }
    }
  }

  async function fetchMeasurements(): Promise<void> {
    try {
      const fetchedMeasurements = await measurementService.fetchAll();
      setMeasurements(fetchedMeasurements);
    } catch(err) {
      console.log(err);
    }
  } 

  async function addMeasurement(measurement: Measurement): Promise<void> {
    try {
      const addedMeasurement = await measurementService.addOne(measurement);
      setMeasurements([...measurements, addedMeasurement]);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <MeasurementContext.Provider value={{ measurements, fetchMeasurements, addMeasurement }}>
      {children}
    </MeasurementContext.Provider>
  )
}

export { MeasurementContext, MeasurementProvider };