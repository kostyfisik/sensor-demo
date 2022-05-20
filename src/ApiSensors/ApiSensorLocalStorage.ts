import type { ApiSensorContract } from "./ApiSensorContract";

const prefix = "sensorsTest-";
const sensorCountName = "sensorCount";
const sensorTypesName = "sensorTypes";
const sensorDatesName = "sensorDates";
// const users = 'users'
async function setData(path: string, data: any): Promise<void> {
  window.localStorage.setItem(prefix + path, JSON.stringify(data));
}

export class ApiSensorLocalStorage implements ApiSensorContract {
  async setSensorCount(count: number): Promise<void> {
    setData(sensorCountName, count);
  }
  async readSensorCount(): Promise<number> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorCountName) || "0"
    );
  }

  async setSensorTypes(types: string[]): Promise<void> {
    setData(sensorTypesName, types);
  }
  async readSensorTypes(): Promise<string[]> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorTypesName) || "[]"
    );
  }

  async setSensorDates(dateFrom: string, dateTo: string): Promise<void> {
    setData(sensorDatesName, [dateFrom, dateTo]);
  }
  async readSensorDates(): Promise<string[]> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorDatesName) || "[]"
    );
  }
}
