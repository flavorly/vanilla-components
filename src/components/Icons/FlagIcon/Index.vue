<template>
  <component :is="'vanilla-flag-pt'" />
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineAsyncComponent } from 'vue'
import pt from './pt.vue'
import en from './en.vue'

export default {
  components : {
    'vanilla-flag-pt': defineAsyncComponent(() => import('./pt.vue')),
    'vanilla-flag-en': defineAsyncComponent(() => import('./en.vue')),
  }
}
</script>
