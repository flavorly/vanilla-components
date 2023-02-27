<script setup lang="ts">
import type { PropType } from 'vue'
import { useInjectsClassesList } from '../../core/use'

const props = defineProps({
  columns: {
    type: [Number, String] as PropType<string | number>,
    default: 1,
    required: false,
  },
  type: {
    type: String as PropType<string>,
    default: 'simple',
    required: false,
    validator(value: string) {
      // The value must match one of these strings
      return ['simple', 'grid', 'split'].includes(value)
    },
  },
  align: {
    type: String,
    default: 'right',
    required: false,
    validator(value: string) {
      // The value must match one of these strings
      return ['right', 'left', 'center', 'none'].includes(value)
    },
  },
  border: {
    type: [Boolean, String],
    default: false,
    required: false,
  },
})

const classesList = useInjectsClassesList()!

defineOptions({
  name: 'VanillaCardFooter',
  inheritAttrs: true,
})

/**
 * @docs
 * @displayName VanillaCardFooter
 * @description A footer for the card component
 **/
</script>

<template>
  <!-- Simple aligned left/right or just none -->
  <div
    v-if="type === 'simple'"
    :class="[
      align === 'right' ? classesList.footerSimpleRight : '',
      align === 'left' ? classesList.footerSimpleLeft : '',
      align === 'center' ? classesList.footerSimpleCenter : '',
      align === 'none' || align === undefined ? classesList.footerSimple : '',
      border ? classesList.footerBorder : '',
    ]"
  >
    <slot />
  </div>

  <!-- Grided with columns -->
  <div
    v-else-if="type === 'grid'"
    :class="[
      columns === 1 ? classesList.footerWithOneGrid : '',
      columns === 2 ? classesList.footerWithTwoGrids : '',
      columns === 3 ? classesList.footerWithThreeGrids : '',
      border ? classesList.footerBorder : '',
      classesList.footerWithGrid,
    ]"
  >
    <slot />
  </div>

  <!-- Gride'd card footer with section on left and right that on mobile will turn responsive -->
  <div
    v-else-if="type === 'split'"
    :class="[
      border ? classesList.footerBorder : '',
      classesList.footerSplitContainer,
    ]"
  >
    <div :class="classesList.footerSplitLeft">
      <slot name="left" />
    </div>

    <div :class="classesList.footerSplitRight">
      <slot name="right" />
    </div>
  </div>
</template>
