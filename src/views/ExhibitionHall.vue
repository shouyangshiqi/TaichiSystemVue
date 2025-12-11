<template>
  <div id="root"></div>
  <ul class="view"></ul>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { initExhibition } from '@/exhibition/test2.js';

const route = useRoute();

onMounted(() => {
  const container = document.getElementById("root");
  if (container) {
    // 传递itemId参数给initExhibition函数
    const itemId = route.query.itemId;
    initExhibition(container, itemId);
  }
});
</script>

<style>
#root {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>