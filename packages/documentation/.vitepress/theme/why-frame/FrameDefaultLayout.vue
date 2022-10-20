<script setup>
import { onMounted, ref } from 'vue'
import { createApp } from 'whyframe:app'
const el = ref()
onMounted(() => {
  createApp(el.value)
})
</script>

<template>
  <div class="vp-raw">
    <div class="preview-holder p-6 bg-gray-100 dark:bg-gray-900/50 font-inter antialiased text-gray-800 dark:text-white rounded-md border dark:border-gray-700/70">
      <div class="preview-container relative">
        <div ref="el" />
      </div>
    </div>
  </div>
</template>

<style>
iframe[data-why] {
  display: inline-block;
  width: 100%;
  min-height: 500px;
  max-height: 400px;
}
</style>
