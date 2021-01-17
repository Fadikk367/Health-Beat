import { TimeOfDay } from 'enums';

export interface Measurement {
  _id?: string;
  systolic: number;
  diastolic: number;
  date: string;
  timeOfDay: TimeOfDay;
}