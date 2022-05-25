<script lang="ts">
import { ref, watch, defineComponent } from "vue-demi";
import { formTitleColsMd, formInputColsMd } from "@/settings";

export default defineComponent({
  emits: ["update:color"],
  setup(props, { emit }) {
    const colorSelected = ref("default");
    const colorChoice = ref<string[]>(["default", "blue", "red", "green"]);

    watch(colorSelected, () => {
      emit("update:colors", colorSelected.value);
    });
    return { formInputColsMd, formTitleColsMd, colorChoice, colorSelected };
  },
});
</script>
<template>
  <v-container>
    <v-row align="center" justify="start">
      <v-col cols="12" :sm="formTitleColsMd" class="my-0 py-0">
        <div class="text-center text-sm-right font-weight-bold">Color</div>
      </v-col>
      <v-col cols="12" :sm="formInputColsMd" class="mt-0 pt-0">
        <div class="text-center">
          <v-select
            v-model="colorSelected"
            :items="colorChoice"
            hint="Select colors to plot"
            persistent-hint
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
