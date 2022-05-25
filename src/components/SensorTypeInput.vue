<script setup lang="ts">
import { ref, watch } from "vue-demi";
import { formTitleColsMd, formInputColsMd, sensorTypes } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
const api = new ApiSensorLocalStorage();

const sensorsSelected = ref<string[]>();
let initialState = true;
(async () => {
  let types = await api.readSensorTypes();
  if (types.length !== 0) sensorsSelected.value = [...types];
})();

watch(sensorsSelected, () => {
  if (initialState) {
    initialState = false;
    return;
  }
  if (sensorsSelected.value) api.setSensorTypes(sensorsSelected.value);
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd" class="mb-0 pb-0">
        <div class="text-center text-sm-right font-weight-bold">
          Sensor types
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd" class="mt-0 pt-0">
        <div class="text-center">
          <v-select
            v-model="sensorsSelected"
            :items="sensorTypes"
            multiple
            hint="Select sensor types to get data"
            persistent-hint
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
