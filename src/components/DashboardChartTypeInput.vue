<script lang="ts">
import { ref, watch, defineComponent } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";

export default defineComponent({
  emits: ["update:chartType"],
  setup(props, { emit }) {
    const chartTypeSelected = ref("line");
    const chartTypeChoice = ref<string[]>(["line", "bar"]);

    watch(chartTypeSelected, () => {
      if (chartTypeSelected.value == "line")
        emit("update:chartType", "scatter");
      else emit("update:chartType", chartTypeSelected.value);
    });
    return {
      formInputColsMd,
      formTitleColsMd,
      chartTypeChoice,
      chartTypeSelected,
    };
  },
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd" class="my-0 py-0">
        <div class="text-center text-sm-right font-weight-bold">Chart type</div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd" class="mt-0 pt-0">
        <div class="text-center">
          <v-select
            v-model="chartTypeSelected"
            :items="chartTypeChoice"
            hint="Select chart types"
            persistent-hint
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
