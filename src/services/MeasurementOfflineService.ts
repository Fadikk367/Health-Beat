import { Measurement } from 'interfaces';
import { MeasurementService } from 'interfaces/MeasurementService';


class MeasurementOfflineService implements MeasurementService {
  public async addOne(measurement: Measurement): Promise<Measurement> {
    const localMeasurements = JSON.parse(localStorage.getItem('measurements') || "[]");
    const newMeasurement = { ...measurement, _id: String(Date.now()) };
    localMeasurements.push(newMeasurement);
    localStorage.setItem('measurements', JSON.stringify(localMeasurements));

    return Promise.resolve(newMeasurement);
  }

  public async fetchAll(): Promise<Measurement[]> {
    const localMeasurements = JSON.parse(localStorage.getItem('measurements') || "[]");
    return Promise.resolve(localMeasurements);
  }

  public async deleteOne(id: string): Promise<string> {
    const localMeasurements: Measurement[] = JSON.parse(localStorage.getItem('measurements') || "[]");
    const index = localMeasurements.findIndex(item => item._id === id);

    if (index !== -1) {
      const deleted = localMeasurements.splice(index, 1);
      localStorage.setItem('measurements', JSON.stringify(localMeasurements));
      return Promise.resolve(deleted[0]._id as string);
    } else {
      throw new Error('No such measurement');
    }
  }
}

export default new MeasurementOfflineService();