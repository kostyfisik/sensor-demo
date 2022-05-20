export interface ApiSensorContract {
  setSensorCount(count: number): Promise<void>;
  readSensorCount(): Promise<number>;
  setSensorTypes(types: string[]): Promise<void>;
  readSensorTypes(): Promise<string[]>;
  setSensorDates(dateFrom: string, dateTo: string): Promise<void>;
  readSensorDates(): Promise<string[]>;
}
