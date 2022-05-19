import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
const api = new ApiSensorLocalStorage();

describe("ApiSensor", () => {
  it("set and get sensor count", async () => {
    await api.setSensorCount(3);
    let count = await api.getSensorCount();
    expect(count).toBe(3);

    await api.setSensorCount(55);
    count = await api.getSensorCount();
    expect(count).toBe(55);
  });
});
