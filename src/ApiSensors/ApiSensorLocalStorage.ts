import type { ApiSensorContract, DataRecord } from "./ApiSensorContract";
import { sensorsValueMin, sensorsValueMax, sensorTypes } from "@/settings";

const prefix = "sensorsTest-";
const sensorCountName = "sensorCount";
const sensorTypesName = "sensorTypes";
const sensorDatesName = "sensorDates";
// const users = 'users'
async function setData(path: string, data: any): Promise<void> {
  window.localStorage.setItem(prefix + path, JSON.stringify(data));
}

export class ApiSensorLocalStorage implements ApiSensorContract {
  // number of sensors
  async setSensorCount(count: number): Promise<void> {
    setData(sensorCountName, count);
  }

  async readSensorCount(): Promise<number> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorCountName) || "2"
    );
  }

  // Types
  async setSensorTypes(types: string[]): Promise<void> {
    setData(sensorTypesName, [...types]);
  }

  async readSensorTypes(): Promise<string[]> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorTypesName) ||
        JSON.stringify(sensorTypes)
    );
  }

  // dates
  async setSensorDates(dateFrom: string, dateTo: string): Promise<void> {
    setData(sensorDatesName, [dateFrom, dateTo]);
  }

  async readSensorDates(): Promise<string[]> {
    return JSON.parse(
      window.localStorage.getItem(prefix + sensorDatesName) ||
        '["2022-05-12", "2022-06-06"]'
    );
  }

  // data from sensors
  async readData(): Promise<DataRecord[]> {
    const sensorCount = await this.readSensorCount();
    const sensorDates = await this.readSensorDates();
    const sensorTypes = await this.readSensorTypes();
    const data: DataRecord[] = [];
    const allDates = datesRange(sensorDates);
    for (const date of allDates) {
      for (const sensor of sensorTypes) {
        for (const id of Array(sensorCount).keys())
          data.push({
            recordValue:
              sensorsValueMin +
              Math.random() * (sensorsValueMax - sensorsValueMin),
            recordDate: date,
            sensorId: id,
            sensorType: sensor,
          });
      }
    }
    return data;
  }
}

function datesRange(dates: string[]): string[] {
  const dateFrom = new Date(dates[0]);
  const dateTo = new Date(dates[1]);
  const currentDate = dateFrom;
  const range: string[] = [dates[0]];
  const daysStep = 1;
  while (currentDate < dateTo) {
    currentDate.setDate(currentDate.getDate() + daysStep);
    range.push(currentDate.toJSON().slice(0, 10));
  }
  return range;
}
