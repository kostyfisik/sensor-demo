<script setup lang="ts">
import { ref } from "vue-demi";
import {
  formTitleColsMd,
  formInputColsMd,
  sensorsCountMin,
  sensorsCountMax,
} from "@/settings";
const sensorsCount = ref(2);
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
