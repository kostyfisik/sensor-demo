<script lang="ts">
import { ref, watch, defineComponent, toRef } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";

export default defineComponent({
  props: {
    dateFrom: String,
    dateTo: String,
    title: String,
  },
  emits: ["update:date-from", "update:date-to"],
  setup(props, { emit }) {
    function updateValue(value: string[]) {
      emit("update:date-from", value[0]);
      emit("update:date-to", value[1]);
    }

    const titleProp = toRef(props, "title");
    const dateFromProp = toRef(props, "dateFrom");
    const dateToProp = toRef(props, "dateTo");

    const currentDate = new Date().toJSON().slice(0, 10);
    const dates = ref<string[]>([currentDate, currentDate]);
    const datesFrom = ref(currentDate);
    const datesTo = ref(currentDate);
    // if (datesProp.value?.length === 2) {
    //   datesFrom.value = datesProp.value[0] as string;
    //   datesTo.value = datesProp.value[1] as string;
    // }
    const menu1 = ref(false);
    const menu2 = ref(false);

    watch([datesFrom, datesTo], (newVal) => {
      if (newVal[0] > newVal[1])
        [datesFrom.value, datesTo.value] = [newVal[1], newVal[0]];
      dates.value[0] = datesFrom.value;
      dates.value[1] = datesTo.value;
      updateValue(dates.value);
    });

    watch(dates, () => {
      if (dates.value.length === 2) {
        datesFrom.value = dates.value[0];
        datesTo.value = dates.value[1];
      }
    });

    watch([dateFromProp, dateToProp], () => {
      dates.value = [
        dateFromProp.value || currentDate,
        dateToProp.value || currentDate,
      ];
    });

    return {
      menu1,
      menu2,
      formTitleColsMd,
      formInputColsMd,
      dates,
      datesFrom,
      datesTo,
      titleProp,
    };
  },
});
</script>

<template>
  <v-container>
    <!-- input prop {{ datesProp[0] }} and {{ datesProp[1] }} -->
    <v-row align="baseline" justify="start">
      <v-col cols="12" :sm="formTitleColsMd">
        <div class="text-center text-sm-right font-weight-bold">
          {{ titleProp }}
        </div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd">
        <v-row justify="center" align="baseline">
          <v-col cols="12" :sm="formTitleColsMd" class="ma-0 pa-0">
            <div class="text-center text-sm-right">from</div>
          </v-col>
          <v-col cols="12" :sm="formInputColsMd + 3" class="my-0 py-0">
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

    <v-row align="start" justify="start" no-gutters>
      <v-col cols="12" :offset-sm="formTitleColsMd" :sm="formInputColsMd">
        <v-row justify="center" align="baseline">
          <v-col cols="12" :sm="formTitleColsMd" class="mb-0 pb-0">
            <div class="text-center text-sm-right">to</div>
          </v-col>
          <v-col cols="12" :sm="formInputColsMd + 3" class="my-0 py-0">
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
          <v-date-picker v-model="dates" range elevation="15"></v-date-picker>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
