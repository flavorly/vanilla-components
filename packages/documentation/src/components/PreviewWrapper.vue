<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  frame: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
})
</script>

<template>
  <div class="vp-raw">
    <div class="preview-holder p-3 sm:p-6 bg-gray-100 dark:bg-gray-900/50 font-inter antialiased text-gray-800 dark:text-white rounded-md border dark:border-gray-700/70">
      <div class="preview-container relative">
        <slot />
      </div>
    </div>
  </div>
</template>
