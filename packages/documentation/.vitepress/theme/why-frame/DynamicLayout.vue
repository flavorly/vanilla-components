<script setup>
import { useRoute } from 'vitepress'
import Layout from '../components/Layout.vue'
import FrameDefaultLayout from './FrameDefaultLayout.vue'

const route = useRoute()
</script>

<template>
  <FrameDefaultLayout v-if="route.path.startsWith('/frames/default')" />
  <Layout v-else />
</template>
