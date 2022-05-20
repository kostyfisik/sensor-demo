<script setup lang="ts">
import { reactive, watch } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
// import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
// const api = new ApiSensorLocalStorage();

// (async () => {
//   let types = await api.readSensorTypes();
//   if (types.length !== 0) sensorsSelected.value = [...types];
// })();

// watch(sensorsSelected, () => {
//   api.setSensorTypes(sensorsSelected.value);
// });
const data = reactive([{ sensor: "temp", date: "now", value: 10 }]);
watch(data, () => {
  console.log(data[0].value);
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Available data
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <div class="text-center">
          <v-btn @click="data[0].value += +1">Update</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
