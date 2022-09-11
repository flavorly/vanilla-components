<template>
  <div class="p-6 bg-gray-100 dark:bg-[#282c34] font-inter antialiased text-gray-800 dark:text-white">
      <Content/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { importTailwindOnDev, removeVitePressStylesOnDemo } from "./../support/stylesHelper";

const watchThemeMode = (mode: string) => {
  if (mode === 'dark' || mode === 'auto') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

const flag = useStorage('vitepress-_old_theme-appearance', 'light') // returns Ref<boolean>

onMounted(() => {
  window.parent.postMessage('mounted', '*');
  importTailwindOnDev()
  removeVitePressStylesOnDemo();
});

watch(flag, watchThemeMode, {immediate: false});

</script>
