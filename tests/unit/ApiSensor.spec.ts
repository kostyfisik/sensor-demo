import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
import { sensorTypes, sensorsValueMin, sensorsValueMax } from "@/settings";

const api = new ApiSensorLocalStorage();
const sensorCount = 2;
const sensorDates = ["2022-01-02", "2022-02-03"];

describe("ApiSensor", () => {
  it("set and get sensor count", async () => {
    await api.setSensorCount(3);
    let count = await api.readSensorCount();
    expect(count).toBe(3);

    await api.setSensorCount(55);
    count = await api.readSensorCount();
    expect(count).toBe(55);
  });

  it("set and get sensor types", async () => {
    await api.setSensorTypes(sensorTypes);
    let types = await api.readSensorTypes();
    expect(types).toStrictEqual(sensorTypes);

    await api.setSensorTypes([]);
    types = await api.readSensorTypes();
    expect(types).toStrictEqual([]);

    await api.setSensorTypes([sensorTypes[0]]);
    types = await api.readSensorTypes();
    expect(types).toStrictEqual([sensorTypes[0]]);
  });

  it("set and get sensor dates", async () => {
    await api.setSensorDates(sensorDates[0], sensorDates[1]);
    const dates = await api.readSensorDates();
    expect(dates).toStrictEqual(sensorDates);
  });

  it("provides valid data from sensors", async () => {
    await api.setSensorDates(sensorDates[0], sensorDates[1]);
    await api.setSensorTypes(sensorTypes);
    await api.setSensorCount(sensorCount);
    const data = await api.readData();
    const datesData = [...new Set(data.map((x) => x.recordDate).sort())];
    expect(datesData[0]).toStrictEqual(sensorDates[0]);
    expect(datesData[datesData.length - 1]).toStrictEqual(sensorDates[1]);

    const totalRecords = datesData.length * sensorTypes.length * sensorCount;
    expect(data.length).toBe(totalRecords);

    const valuesData = data.map((x) => x.recordValue).sort();
    expect(valuesData[0] >= sensorsValueMin).toBe(true);
    expect(valuesData[valuesData.length - 1] <= sensorsValueMax).toBe(true);

    // subsequent calls to be return the same data
    await api.setSensorDates(sensorDates[0], sensorDates[0]);
    let oldData = JSON.stringify(await api.readData());
    let newData = JSON.stringify(await api.readData());
    expect(oldData == newData).toBe(true);
    // if we change anything data should be randomly regenerated
    oldData = JSON.stringify(await api.readData());
    await api.setSensorCount(sensorCount);
    newData = JSON.stringify(await api.readData());
    expect(oldData != newData).toBe(true);
  });

  it("provides valid sensors", async () => {
    await api.setSensorTypes(sensorTypes);
    await api.setSensorCount(sensorCount);
    const data = await api.readActiveSensors();

    const totalRecords = sensorTypes.length * sensorCount;
    expect(data.length).toBe(totalRecords);
  });
});
