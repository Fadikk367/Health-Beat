import React, { createContext, useEffect } from 'react';
import axios from 'api/axiosInstance';

import { Measurement, MeasurementService } from 'interfaces';


interface MeasurementContextProps {
  measurements: Measurement[];
  fetchMeasurements(): Promise<void>;
  addMeasurement(measurement: Measurement): Promise<void>;
  deleteMeasurement(id: string): Promise<void>;
}


const defaultMeasurementContext = {
  measurements: [],
  fetchMeasurements: () => Promise.resolve(),
  addMeasurement: (measurement: Measurement) => Promise.resolve(),
  deleteMeasurement: (id: string) => Promise.resolve(),
}


const MeasurementContext = createContext<MeasurementContextProps>(defaultMeasurementContext);


const MeasurementProvider: React.FC<{ measurementService: MeasurementService }> = ({ children, measurementService }) => {
  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);
  
  useEffect(() => {
    const initializeContext = async () => {
      await handleSyncMeasurements();
    }

    if (navigator.onLine) {
      initializeContext();
    }
  }, [measurementService])


  async function handleSyncMeasurements(): Promise<void> {
    const localMeasurements: Measurement[] = JSON.parse(localStorage.getItem('measurements') || "[]");
    
    try {
      const headers = {
        'Authorization': localStorage.getItem('token')
      }
  
      const response = await axios.post<Measurement[]>(
        '/measurements/sync', 
        { measurements: localMeasurements }, 
        { headers }
      );
      
      setMeasurements(response.data);
      localStorage.setItem('measurements', "[]");
    } catch(err) {
      console.log(err);
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

  async function deleteMeasurement(id: string): Promise<void> {
    try {
      const deleted = await measurementService.deleteOne(id);
      const filteredMeasurements = measurements.filter(item => item._id !== deleted);
      setMeasurements(filteredMeasurements);
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <MeasurementContext.Provider value={{ measurements, fetchMeasurements, addMeasurement, deleteMeasurement }}>
      {children}
    </MeasurementContext.Provider>
  )
}

export { MeasurementContext, MeasurementProvider };