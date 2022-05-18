<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>
<template>
  <div id="app">
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">Sensors</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
