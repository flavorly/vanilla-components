<template>
  <div class="p-6 rounded  border border-gray-200 bg-gray-100 dark:bg-[#282c34] dark:border-gray-700 font-inter antialiased">
    <slot>
      <Content/>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeMount, watch} from 'vue';
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

  importTailwindOnDev()
  removeVitePressStylesOnDemo();

});
</script>
