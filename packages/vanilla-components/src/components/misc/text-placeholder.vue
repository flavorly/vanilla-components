<script setup lang="ts">
import { useInjectsClassesListClass } from '../../core/use'

const props = defineProps({
  classProperty: {
    type: String,
    default: 'placeholder',
  },
  placeholder: {
    type: String,
    default: undefined,
  },
})

const className = useInjectsClassesListClass(props.classProperty)

// defineOptions({
//   name: 'VanillaTextPlaceholder',
//   inheritAttrs: true,
// })
</script>

<template>
  <span :class="className">
    <slot>
      <template v-if="placeholder !== undefined">{{ placeholder }}</template>
      <template v-else>&nbsp;</template>
    </slot>
  </span>
</template>
