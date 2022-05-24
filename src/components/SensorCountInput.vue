<script setup lang="ts">
import { ref, watch } from "vue-demi";
import {
  formTitleColsMd,
  formInputColsMd,
  sensorsCountMin,
  sensorsCountMax,
} from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
const api = new ApiSensorLocalStorage();

const sensorsCount = ref(sensorsCountMin);
(async () => {
  let count = await api.readSensorCount();
  if (count !== 0) sensorsCount.value = count;
})();

watch(sensorsCount, async (newVal) => {
  const currentVal = await api.readSensorCount();
  if (newVal === currentVal) return;
  if (sensorsCount.value) api.setSensorCount(sensorsCount.value);
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Sensors count
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <div class="text-center">
          {{ sensorsCount }} of each type
          <v-slider
            v-model="sensorsCount"
            :min="sensorsCountMin"
            :max="sensorsCountMax"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
