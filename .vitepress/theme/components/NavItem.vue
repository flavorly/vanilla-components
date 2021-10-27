<template>
  <a
    :href="$themeConfig.pages[fileName].href"
    class="px-3 py-2 transition-colors duration-200 relative block rounded-md"
    :class="[
      isActive
        ? 'text-cyan-700 bg-cyan-50'
        : 'hover:text-gray-900 text-gray-500',
    ]"
  >
    <span>{{ $themeConfig.pages[fileName].title }}</span>
  </a>
</template>

<script>
import { getNameFromPath } from '../utils.js'

export default {
  props: {
    fileName: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return getNameFromPath(this.$page.relativePath) == this.fileName
    },
  },
}
</script>
