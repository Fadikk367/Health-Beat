import { Measurement } from './Measurement';

export interface MeasurementService {
  addOne(measurement: Measurement): Promise<Measurement>;
  fetchAll(): Promise<Measurement[]>;
  deleteOne(id: string): Promise<string>;
  // updateOne(measurementId: string, update: Measurement): Promise<Measurement>
}