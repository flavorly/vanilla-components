<script setup lang="ts">
import type { PropType } from 'vue'
import type { FormClassesValidKeys, FormLabelProps } from './config'
import { formsConfig } from './config'
import { useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormLabelProps, FormClassesValidKeys>(),
  label: {
    type: [String] as PropType<string>,
    required: true,
  },
  for: {
    type: [String, undefined] as PropType<string | undefined>,
    default: undefined,
    required: false,
  },
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})
const { configuration } = useConfiguration<FormLabelProps>(formsConfig, 'FormLabel')

defineOptions({
  name: 'VanillaFormLabel',
  inheritAttrs: true,
})
</script>

<template>
  <label
    :for="props.for"
    :class="configuration.classesList.label"
  >
    <slot>
      <span
        v-if="safe"
        v-html="label"
      />
      <span
        v-else
        v-text="label"
      />
    </slot>
  </label>
</template>
