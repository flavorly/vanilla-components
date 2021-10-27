<template>
  <button
    type="button"
    class="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 w-full py-2"
  >
    <IconSearch
      class="text-gray-400 group-hover:text-gray-500 transition-colors duration-200"
    >
    </IconSearch>

    <span
      class="text-gray-500 hover:text-gray-600 transition-colors duration-200"
    >
      Quick search<span class="hidden sm:inline"> for anything</span>
    </span>

    <span
      class="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md"
    >
      <span class="sr-only">Press </span>
      <kbd class="font-sans">
        <!-- TODO: Make for Windows -->
        <abbr class="no-underline">⌘</abbr>
      </kbd>
      <span class="sr-only"> and </span>
      <kbd class="font-sans">K</kbd>
      <span class="sr-only"> to search</span>
    </span>
  </button>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue'

export default {
  components: { IconSearch },
}
</script>
