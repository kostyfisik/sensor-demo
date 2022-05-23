<script setup lang="ts">
import { ref, watch } from "vue-demi";
import DateRangeInput from "@/components/DateRangeInput.vue";
import SensorCountInput from "@/components/SensorCountInput.vue";
import SensorTypeInput from "@/components/SensorTypeInput.vue";
import SensorDataUpdate from "@/components/SensorDataUpdate.vue";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";

const api = new ApiSensorLocalStorage();
const dateFrom = ref("");
const dateTo = ref("");
(async () => {
  const dates = await api.readSensorDates();
  dateFrom.value = dates[0];
  dateTo.value = dates[1];
})();

watch([dateFrom, dateTo], () => {
  api.setSensorDates(dateFrom.value, dateTo.value);
});
</script>
<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <div class="text-center">
          <h1 class="text-center">Get sensors data</h1>
        </div>
      </v-col>
    </v-row>
    <SensorDataUpdate />
    <SensorTypeInput />
    <SensorCountInput />
    <DateRangeInput
      title="Request dates"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      @update:date-from="dateFrom = $event"
      @update:date-to="dateTo = $event"
    />
  </v-container>
</template>
