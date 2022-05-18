<script setup lang="ts">
import { ref } from "vue-demi";
const drawer = ref(true);
const group = ref(null);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-btn to="/" plain>
              <v-icon>mdi-view-dashboard</v-icon>
              <span class="pa-3">Dashboard</span>
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn to="/sensors" plain>
              <v-icon>mdi-view-dashboard</v-icon>
              <span class="pa-3">Sensors</span>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Sensors monitor (demo app)</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
