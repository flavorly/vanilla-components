<template>
  <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
    <div class="pb-10 border-b border-gray-200 mb-10">
      <h1
        class="inline-block text-3xl font-extrabold text-gray-900 tracking-tight"
      >
        {{ $page.title }}
      </h1>
      <p class="mt-1 text-lg text-gray-500">{{ $page.description }}</p>
    </div>

    <Content class="prose" />

    <div class="mt-16 flex leading-6 font-medium text-gray-500">
      <a
        v-if="prevPage"
        :href="prevPage.href"
        class="flex mr-8 transition-colors duration-200 hover:text-gray-900"
      >
        <span aria-hidden="true" class="mr-2">←</span>
        {{ prevPage.title }}
      </a>
      <a
        v-if="nextPage"
        :href="nextPage.href"
        class="flex text-right ml-auto transition-colors duration-200 hover:text-gray-900"
      >
        {{ nextPage.title }}
        <span aria-hidden="true" class="ml-2">→</span>
      </a>
    </div>

    <div class="mt-12 border-t border-gray-200 pt-6 text-right">
      <OutLink
        class="mt-10 text-sm text-gray-500 hover:text-gray-900"
        :href="buildEditURL"
      >
        Edit this page on GitHub
      </OutLink>
    </div>
  </div>
</template>

<script>
import OutLink from './components/OutLink.vue'
import { getNameFromPath } from './utils.js'

export default {
  data() {
    return {
      flatPages: null,
      prevPage: null,
      nextPage: null,
    }
  },
  components: { OutLink },
  emits: ['contentUpdated'],
  updated() {
    this.$emit('contentUpdated')
    this.getPrevNextPage()
  },
  mounted() {
    this.flatPages = Object.values(this.$themeConfig.collections)
      .map((item) => Object.values(item))
      .flat()

    this.getPrevNextPage()
  },
  methods: {
    getPrevNextPage() {
      const pageIndex = this.flatPages.indexOf(
        getNameFromPath(this.$page.relativePath)
      )

      const prevPageID = pageIndex > 0 ? this.flatPages[pageIndex - 1] : null
      const nextPageID =
        pageIndex < this.flatPages.length - 1
          ? this.flatPages[pageIndex + 1]
          : null

      this.prevPage = this.$themeConfig.pages[prevPageID]
      this.nextPage = this.$themeConfig.pages[nextPageID]
    },
  },
  computed: {
    buildEditURL() {
      return this.$themeConfig.repo + '/edit/main/' + this.$page.relativePath
    },
  },
}
</script>
