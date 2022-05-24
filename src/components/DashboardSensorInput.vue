<script lang="ts">
import { ref, watch, defineComponent } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
import { SensorRecord } from "@/ApiSensors/ApiSensorContract";

export default defineComponent({
  emits: ["update:sensors"],
  setup(props, { emit }) {
    const api = new ApiSensorLocalStorage();
    const activeSensors = ref<SensorRecord[]>([]);
    const sensorSelected = ref<string[]>([]);
    const sensorChoice = ref<string[]>([]);
    (async () => {
      activeSensors.value = await api.readActiveSensors();
      sensorChoice.value = [
        ...activeSensors.value.map(
          (x) => x.sensorType.toString() + " " + (x.sensorId + 1).toString()
        ),
      ];
      sensorSelected.value = [sensorChoice.value[0]];
    })();

    watch(sensorSelected, () => {
      emit("update:sensors", sensorSelected.value);
    });
    return { formInputColsMd, formTitleColsMd, sensorChoice, sensorSelected };
  },
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">Sensors</div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <div class="text-center">
          <v-select
            v-model="sensorSelected"
            :items="sensorChoice"
            multiple
            hint="Select sensors to plot"
            persistent-hint
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
