import type { ApiSensorContract } from "./ApiSensorContract";

const prefix = "sensorsTest-";
const sensorCountName = "sensorCount";
// const users = 'users'
async function setData(path: string, data: any): Promise<void> {
  window.localStorage.setItem(prefix + path, JSON.stringify(data));
}

export class ApiSensorLocalStorage implements ApiSensorContract {
  async setSensorCount(count: number): Promise<void> {
    setData(sensorCountName, count);
  }
  async getSensorCount(): Promise<number> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorCountName) || "0"
    );
  }
  //   async setSensorTypes(types: string[]): Promise<void>;
  //   setSensorDates(dateFrom: string, dateTo: string): Promise<void>;
}
