<script setup lang="ts">
import type { PropType } from 'vue'
import { uniqueId } from '../../core/helpers'
import { useConfiguration, useVariantProps } from '../../core/use'
import type { SkeletonBarClassesValidKeys, SkeletonBarProps } from './config'
import { skeletonConfig } from './config'

const props = defineProps({
  ...useVariantProps<SkeletonBarProps, SkeletonBarClassesValidKeys>(),
  count: {
    type: [Number] as PropType<number>,
    required: false,
    default: 1,
  },
  as: {
    type: [String, undefined] as PropType<string | undefined>,
    default: 'div',
    required: false,
  },
  width: {
    type: [String, undefined] as PropType<string | undefined>,
    default: '100%',
    required: false,
  },
})
const { configuration } = useConfiguration<SkeletonBarProps>(skeletonConfig, 'SkeletonBar')

// defineOptions({
//   name: 'VanillaSkeleton',
//   inheritAttrs: false,
// })

/**
 * @docs
 * @displayName VanillaSkeleton
 * @description A skeleton bar
 **/
</script>

<template>
  <component
    :is="as"
    :class="configuration.classesList.wrapper"
  >
    <div
      v-for="(index) in count"
      :key="uniqueId(`skeleton_${index}`)"
      :class="configuration.classesList.class"
      v-bind="$attrs"
      :style="{ width: props.width }"
    >
      <slot />
    </div>
  </component>
</template>
