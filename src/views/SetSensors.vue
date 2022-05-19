<script setup lang="ts">
import DateRangeInput from "../components/DateRangeInput.vue";
import SensorCountInput from "../components/SensorCountInput.vue";
import SensorTypeInput from "@/components/SensorTypeInput.vue";
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
    <SensorTypeInput />
    <SensorCountInput />
    <DateRangeInput />
  </v-container>
</template>
