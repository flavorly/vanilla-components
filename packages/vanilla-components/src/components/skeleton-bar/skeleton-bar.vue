<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import uniqueId from 'lodash/uniqueId'
import type { SkeletonBarClassesValidKeys, SkeletonBarProps } from './config'
import { skeletonBarClassesKeys, skeletonBarConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'

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
})
const { localVariant } = useBootVariant(props, 'errors', ref(null))
const { configuration } = useConfiguration<SkeletonBarProps>(skeletonBarConfig, skeletonBarClassesKeys)
</script>

<template>
  <component
    :is="as"
    :class="configuration.classesList.wrapper"
  >
    <div
      v-for="(current, index) in count"
      :key="uniqueId(`${current}_${index}`)"
      :class="configuration.classesList.class"
      v-bind="$attrs"
    />
  </component>
</template>
