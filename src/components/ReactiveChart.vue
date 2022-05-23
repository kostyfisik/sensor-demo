<template>
  <div :id="chartUUID"></div>
</template>

<script lang="ts">
import { newPlot, react, Data, Layout, Config } from "plotly.js-dist-min";
import {
  defineComponent,
  PropType,
  onActivated,
  watch,
  onMounted,
} from "vue-demi";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface plotlyChart {
  data: Data[];
  layout: Partial<Layout>;
  config: Partial<Config> | undefined;
}

export default defineComponent({
  name: "ReactiveChart",
  props: {
    chart: {
      type: Object as PropType<plotlyChart>,
      required: true,
    },
  },
  emits: ["plotCreated"],

  setup(props, { emit }) {
    const chartUUID = uuidv4();
    let chartLocal = cloneDeep(props.chart) as plotlyChart;

    function plotlyReact() {
      if (!document.getElementById(chartUUID)) return;

      if (chartLocal.config == undefined) {
        void react(chartUUID, chartLocal.data, chartLocal.layout);
      } else {
        void react(
          chartUUID,
          chartLocal.data,
          chartLocal.layout,
          chartLocal.config
        );
      }
    }

    function plotlyNew() {
      if (chartLocal.config == undefined) {
        void newPlot(chartUUID, chartLocal.data, chartLocal.layout);
      } else {
        void newPlot(
          chartUUID,
          chartLocal.data,
          chartLocal.layout,
          chartLocal.config
        );
      }
    }
    onMounted(() => {
      plotlyNew();
      emit("plotCreated", chartUUID);
    });

    watch(props, () => {
      chartLocal = cloneDeep(props.chart);
      plotlyReact();
    });

    onActivated(() => {
      chartLocal = cloneDeep(props.chart);
      plotlyReact();
    });

    return {
      chartUUID,
    };
  },
});
</script>
