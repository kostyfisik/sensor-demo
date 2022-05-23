<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { ref } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";
import { ApiSensorLocalStorage } from "@/ApiSensors/ApiSensorLocalStorage";
const api = new ApiSensorLocalStorage();
// const data = api.readData();
const plotsCount = ref(1);
(async () => {
  console.log(await api.readData());
})();
</script>
<template>
  <v-container>
    <v-row align="start" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center font-weight-bold">plots count</div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <div class="text-center">
          <v-slider
            v-model="plotsCount"
            class="mt-5"
            thumb-label="always"
            min="1"
            max="4"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="plotVal in plotsCount"
        v-bind:key="plotVal"
        cols="12"
        sm="6"
      >
        test {{ plotVal }}
      </v-col>
    </v-row>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-container>
</template>
