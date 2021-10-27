<template>
  <div class="c-Tooltip" tabindex="0">
    <slot></slot>
  </div>
</template>
<script>
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  mounted() {
    tippy(this.$el, {
      content: this.content,
    })
  },
}
</script>
<style scoped>
.c-Tooltip {
  width: -moz-fit-content;
  width: fit-content;
}
</style>
