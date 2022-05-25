<script setup lang="ts">
import { ref, reactive, watch } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
import type { DataRecord, SensorRecord } from "@/ApiSensors/ApiSensorContract";
import ReactiveChart from "@/components/ReactiveChart.vue";
import type { plotlyChart } from "./ReactiveChart.vue";
import { Data, PlotType } from "plotly.js-dist-min";
import { useElementSize } from "@vueuse/core";
import DateRangeInput from "@/components/DateRangeInput.vue";
import DashboardSensorInput from "./DashboardSensorInput.vue";
import DashboardColorInput from "./DashboardColorInput.vue";
import DashboardChartTypeInput from "./DashboardChartTypeInput.vue";

const colorSelected = ref("default");
const chartTypeSelected = ref("scatter");
const isShowDateInput = ref(true);
const currentDate = new Date().toJSON().slice(0, 10);

const dateFrom = ref(currentDate);
const dateTo = ref(currentDate);
const api = new ApiSensorLocalStorage();
const el = ref(null);
const { width } = useElementSize(el);

const data = ref<DataRecord[]>([]);
const dataFiltered = ref<DataRecord[]>([]);
(async () => {
  data.value = await api.readData();
  const dates = data.value.map((x) => x.recordDate).sort();
  dateFrom.value = dates[0];
  dateTo.value = dates[dates.length - 1];
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
  let dateFiltered = sensorFiltered.filter((x) => {
    if (
      !isShowDateInput.value ||
      !(x.recordDate < dateFrom.value || x.recordDate > dateTo.value)
    )
      return true;
    return false;
  });
  dataFiltered.value = dateFiltered;

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
    const trace: Data = {
      x: x,
      y: y,
      type: chartTypeSelected.value as PlotType,
      name:
        sensor.sensorType.toString() + " " + (sensor.sensorId + 1).toString(),
    };
    if (colorSelected.value != "default") {
      trace["marker"] = { color: colorSelected.value };
    }

    chartLocal.data.push(trace);
  }
}

watch(width, () => {
  chartLocal.layout.width = width.value;
});

watch(
  [
    sensorSelected,
    colorSelected,
    chartTypeSelected,
    isShowDateInput,
    dateFrom,
    dateTo,
  ],
  () => {
    filterData();
  }
);
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
      <v-col cols="12">
        <DashboardColorInput @update:colors="colorSelected = $event" />
      </v-col>
      <v-col cols="12">
        <DashboardChartTypeInput
          @update:chartType="chartTypeSelected = $event"
        />
      </v-col>
    </v-row>
    <v-row align="baseline" justify="start">
      <v-col cols="12" :sm="formTitleColsMd" class="my-0 py-0">
        <div class="text-center text-sm-right font-weight-bold">
          Filter by date
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd" class="my-0 py-0">
        <div class="text-center">
          <v-switch v-model="isShowDateInput"></v-switch>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-show="isShowDateInput">
        <DateRangeInput
          title="select dates"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          @update:date-from="dateFrom = $event"
          @update:date-to="dateTo = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
