<template>
  <div class="p-6 bg-gray-100 dark:bg-[#282c34] font-inter antialiased text-gray-800 dark:text-white">
      <Content/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, watch, ref, nextTick} from 'vue';
import { useStorage } from '@vueuse/core';
import { importTailwindOnDev, removeVitePressStylesOnDemo } from "/@theme/support/stylesHelper";

const watchThemeMode = (mode: string) => {
  if (mode === 'dark' || mode === 'auto') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

onMounted(() => {
  const flag = useStorage('vue-theme-appearance', 'light') // returns Ref<boolean>
  watch(flag, watchThemeMode, {immediate: true});

  window.parent.postMessage('mounted', '*');

  importTailwindOnDev()
  removeVitePressStylesOnDemo();

});
</script>
