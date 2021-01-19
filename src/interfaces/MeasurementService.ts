import { Measurement } from './Measurement';

export interface MeasurementService {
  addOne(measurement: Measurement): Promise<Measurement>;
  fetchAll(): Promise<Measurement[]>;
  // deleteOne(measurementId: string): Promise<Measurement>;
  // updateOne(measurementId: string, update: Measurement): Promise<Measurement>
}