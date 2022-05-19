export interface ApiSensorContract {
  setSensorCount(count: number): Promise<void>;
  getSensorCount(): Promise<number>;
  // setSensorTypes(types: string[]): Promise<void>;
  // setSensorDates(dateFrom: string, dateTo: string): Promise<void>;
}
