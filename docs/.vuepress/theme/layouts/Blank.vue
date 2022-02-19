<template>
  <div class="p-8 rounded bg-gray-100 border border-gray-200 dark:bg-[#282c34] dark:border-gray-700">
    <Content />
  </div>
</template>
<script>
import {ShadowRoot} from 'vue-shadow-dom/shadow';
import '../styles/main.pcss';
export default {
  components: {
    ShadowRoot
  },
}
</script>
