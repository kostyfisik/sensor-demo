<script setup lang="ts">
import { ref, reactive, watch } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
import type { DataRecord, SensorRecord } from "@/ApiSensors/ApiSensorContract";
import ReactiveChart from "@/components/ReactiveChart.vue";
import type { plotlyChart } from "./ReactiveChart.vue";
import DashboardSensorInput from "./DashboardSensorInput.vue";
import { useElementSize } from "@vueuse/core";
const api = new ApiSensorLocalStorage();
const el = ref(null);
const { width } = useElementSize(el);

const data = ref<DataRecord[]>([]);
const dataFiltered = ref<DataRecord[]>([]);
(async () => {
  data.value = await api.readData();
})();

const chartLocal = reactive<plotlyChart>({
  data: [],
  layout: {
    margin: {
      l: 0,
      r: 0,
      // b: 0,
      t: 0,
    },
    xaxis: {
      // will be set on mount
      title: "Date",
    },
    yaxis: {
      title: "value",
    },
    showlegend: true,
    legend: {
      orientation: "h",
      x: -0.15,
      y: 1.12,
    },
    autosize: false,
    width: width.value,
    height: width.value * 0.5,
  },
  config: {
    responsive: true,
    // showEditInChartStudio: true,
    displaylogo: false,
  },
});

const sensorSelected = ref<SensorRecord[]>([]);
const sensorSelectedString = ref<string[]>([]);
watch(sensorSelectedString, () => {
  sensorSelected.value = sensorSelectedString.value.map((x) => {
    let parts = x.split(" ");
    return { sensorType: parts[0], sensorId: +parts[1] - 1 };
  });
});

function filterData() {
  let sensorFiltered = data.value.filter((x) => {
    for (let sensor of sensorSelected.value)
      if (x.sensorId == sensor.sensorId && x.sensorType == sensor.sensorType)
        return true;
    return false;
  });
  dataFiltered.value = sensorFiltered;

  chartLocal.data = [];
  for (let sensor of sensorSelected.value) {
    let oneSensorData = dataFiltered.value.filter((x) => {
      if (x.sensorId == sensor.sensorId && x.sensorType == sensor.sensorType)
        return true;
      return false;
    });
    let x = oneSensorData.map(
      (x) => x.recordDate
      //  + " 00:00:00"
    );
    let y = oneSensorData.map((y) => y.recordValue);
    chartLocal.data.push({
      x: x,
      y: y,
      type: "scatter",
      name:
        sensor.sensorType.toString() + " " + (sensor.sensorId + 1).toString(),
    });
  }
}
watch(sensorSelected, () => {
  filterData();
});

watch(width, () => {
  chartLocal.layout.width = width.value;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" ref="el">
        <ReactiveChart :chart="chartLocal" />
      </v-col>
    </v-row>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Data points
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <div class="text-center">
          {{ data.length }} of each type, {{ dataFiltered.length }} to plot
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <DashboardSensorInput @update:sensors="sensorSelectedString = $event" />
      </v-col>
    </v-row>
  </v-container>
</template>
