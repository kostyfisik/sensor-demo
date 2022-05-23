<script setup lang="ts">
import { ref, onMounted } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
const api = new ApiSensorLocalStorage();
const dataRecords = ref(0);
const downloadDelay = 500;
async function countRecords() {
  dataRecords.value = 0;
  let data = await api.readData();
  if (data.length !== 0)
    setTimeout(() => {
      dataRecords.value = data.length;
    }, downloadDelay);
}
setTimeout(() => {
  // Let async opereations on mount to settle down before requesting data from api.
  countRecords();
}, 100);
</script>
<template>
  <v-container>
    <v-row align="baseline" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Available data
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <v-row class="text-center">
          <v-col v-if="dataRecords == 0"> Loading... </v-col>
          <v-col v-else> Downloaded {{ dataRecords }} data samples. </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col> <v-btn @click="countRecords">Update</v-btn></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
