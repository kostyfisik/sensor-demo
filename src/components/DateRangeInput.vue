<script setup lang="ts">
import { ref, watch } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";

const currentDate = new Date().toJSON().slice(0, 10);
const dates = ref<string[]>([currentDate, currentDate]);
const datesFrom = ref(currentDate);
const datesTo = ref(currentDate);
const menu1 = ref(false);
const menu2 = ref(false);
watch([datesFrom, datesTo], (newVal) => {
  if (newVal[0] > newVal[1])
    [datesFrom.value, datesTo.value] = [newVal[1], newVal[0]];
  dates.value[0] = datesFrom.value;
  dates.value[1] = datesTo.value;
});

watch(dates, () => {
  if (dates.value.length === 2) {
    datesFrom.value = dates.value[0];
    datesTo.value = dates.value[1];
  }
});
</script>

<template>
  <v-container>
    <v-row align="baseline" justify="start" no-gutters>
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          Request date
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <v-row justify="center" align="baseline">
          <v-col cols="12" :sm="formTitleColsMd">
            <div class="text-center text-sm-right">from:</div>
          </v-col>
          <v-col cols="12" :sm="formInputColsMd + 3">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datesFrom"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="datesFrom"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <!-- <div class="text-center">{{ datesComputed[0] }}</div> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" justify="start" no-gutters>
      <v-col cols="12" :offset-sm="formTitleColsMd" :sm="formInputColsMd">
        <v-row justify="center" align="baseline">
          <v-col cols="12" :sm="formTitleColsMd">
            <div class="text-center text-sm-right">to:</div>
          </v-col>
          <v-col cols="12" :sm="formInputColsMd + 3">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datesTo"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="datesTo"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="end" justify="start" no-gutters>
      <v-col cols="12" :offset-sm="formTitleColsMd" :sm="formInputColsMd">
        <div class="text-center">
          <v-date-picker v-model="dates" range></v-date-picker>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
