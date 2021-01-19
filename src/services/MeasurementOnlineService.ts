import axios from 'axios';

import { Measurement } from 'interfaces';
import { MeasurementService } from 'interfaces/MeasurementService';


class MeasurementOnlineService implements MeasurementService {
  public async addOne(measurement: Measurement): Promise<Measurement> {
    const headers = this.getAuthHeaders();

    try {
      const response = await axios.post<Measurement>('/measurements', measurement, { headers });
      return response.data;
    } catch(err) {
      console.log(err);
      throw new Error('not working');
    }
  }

  public async fetchAll(): Promise<Measurement[]> {
    const headers = this.getAuthHeaders();

    try {
      const response = await axios.get<Measurement[]>('/measurements', { headers });
      return response.data;
    } catch(err) {
      console.log(err);
      throw new Error('not working');
    }
  }

  public async deleteOne(id: string): Promise<string> {
    const headers = this.getAuthHeaders();

    try {
      await axios.delete<Measurement>(`/measurements/${id}`, { headers });
      return id;
    } catch(err) {
      console.log(err);
      throw new Error('not working');
    }
  }

  private getAuthHeaders(): { Authorization: string } {
    return {
      'Authorization': localStorage.getItem('token') || '',
    }
  }
}

export default new MeasurementOnlineService();