<template>
<!--  <shadow-root>-->
    <slot></slot>
<!--  </shadow-root>-->
</template>

<script>
import {ShadowRoot} from 'vue-shadow-dom/dist/shadow';
export default {
  name: "XWrapper",
  components: {
    ShadowRoot
  },
}
</script>
