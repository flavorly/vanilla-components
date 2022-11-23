<script setup lang="ts">
import type { PropType } from 'vue'
import type { FormClassesValidKeys, FormErrorsProps } from './config'
import { formsConfig } from './config'
import { useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormErrorsProps, FormClassesValidKeys>(),
  errors: {
    type: [Array, String] as PropType<string[] | string>,
    default: undefined,
    required: true,
  },
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})
const { configuration, errors, hasErrors } = useConfiguration<FormErrorsProps>(formsConfig, 'FormErrors')

defineOptions({
  name: 'VanillaFormErrors',
  inheritAttrs: true,
})
</script>

<template>
  <div
    v-if="hasErrors"
    :class="configuration.classesList.errors"
  >
    <span
      v-if="safe"
      v-html="errors"
    />
    <span v-else>{{ errors }}</span>
  </div>
</template>
