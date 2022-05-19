<script setup lang="ts">
import { ref } from "vue-demi";
import { formTitleColsMd, formInputColsMd, sensorTypes } from "@/settings";
const sensorsSelected = ref<string[]>([...sensorTypes]);
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Sensor types
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
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
