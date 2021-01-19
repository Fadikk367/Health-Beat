import { Measurement } from 'interfaces';
import { MeasurementService } from 'interfaces/MeasurementService';


class MeasurementOfflineService implements MeasurementService {
  public async addOne(measurement: Measurement): Promise<Measurement> {
    const localMeasurements = JSON.parse(localStorage.getItem('measurements') || "[]");
    localMeasurements.push(measurement);
    localStorage.setItem('measurements', JSON.stringify(localMeasurements));

    return Promise.resolve(measurement);
  }

  public async fetchAll(): Promise<Measurement[]> {
    const localMeasurements = JSON.parse(localStorage.getItem('measurements') || "[]");
    return Promise.resolve(localMeasurements);
  }
}

export default new MeasurementOfflineService();