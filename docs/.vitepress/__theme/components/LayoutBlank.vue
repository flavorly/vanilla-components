<template>
  <p>Im a blank layout</p>
  <slot>
    <VPApp/>
  </slot>
</template>

<script>
import VPApp from '../../../node_modules/@vue/theme/src/vitepress/components/VPApp.vue';
export default {
  name: "LayoutBlank",
  components: {
    VPApp,
  }
}
</script>
