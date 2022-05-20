import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
import { sensorTypes } from "@/settings";

const api = new ApiSensorLocalStorage();

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
    await api.setSensorDates("2022-01-02", "2022-02-03");
    const dates = await api.readSensorDates();
    expect(dates).toStrictEqual(["2022-01-02", "2022-02-03"]);
  });
});
