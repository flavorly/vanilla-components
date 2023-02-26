<script setup>
import { onMounted, ref } from 'vue'

// Special api to mount the app
import { createApp } from 'whyframe:app'

const el = ref()

onMounted(() => {
  // Mount the app to the ref
  createApp(el.value)
})
</script>

<template>
  <div ref="el" />
</template>
