<template>
  <div>
    <exportexcel></exportexcel>
    <importexcel></importexcel>
    <wordcompoent></wordcompoent>
  </div>


  <!-- <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" /> -->
</template>

<script setup>
import wordcompoent from './components/word.vue';
import exportexcel from './components/exportexce.vue';
import importexcel from './components/importexcel.vue';
import { onMounted, ref } from 'vue'



</script>

<style  scoped>
img {
  width: "24px";
  height: "24px"
}
</style>