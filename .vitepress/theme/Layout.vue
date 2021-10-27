<template>
  <Home v-if="isIndex" />
  <PageLayout v-else />
</template>

<script>
import Home from './Home.vue'
import PageLayout from './PageLayout.vue'

export default {
  components: { Home, PageLayout },
  computed: {
    isIndex() {
      return this.$page.relativePath === 'index.md'
    },
  },
}
</script>
