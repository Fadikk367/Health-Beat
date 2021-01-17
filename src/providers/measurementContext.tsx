import React, { createContext } from 'react';
import axios from 'axios';

import { Measurement } from 'interfaces';


interface MeasurementContextProps {
  measurements: Measurement[],
  fetchMeasurements(token: string): Promise<void>
  addMeasurement(measurement: Measurement, token: string): Promise<void>
}


const defaultMeasurementContext = {
  measurements: [],
  fetchMeasurements: (token: string) => Promise.resolve(),
  addMeasurement: (measurement: Measurement, token: string)=> Promise.resolve()
}


const MeasurementContext = createContext<MeasurementContextProps>(defaultMeasurementContext);


const MeasurementProvider: React.FC = ({ children }) => {
  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);

  const fetchMeasurements = async (token: string): Promise<void> => {
    try {
      const headers = {
        'Authorization': token
      }

      const response = await axios.get<{ measurements: Measurement[] }>('/measurements', { headers });
      setMeasurements(response.data.measurements);
    } catch(err) {
      console.log(err);
    }
  } 

  const addMeasurement = async (measurement: Measurement, token: string): Promise<void> => {
    try {
      const headers = {
        'Authorization': token
      }

      const response = await axios.post<Measurement>('/measurements', measurement, { headers });
      setMeasurements([...measurements, response.data]);
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