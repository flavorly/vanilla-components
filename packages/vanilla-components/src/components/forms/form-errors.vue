<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { FormClassesValidKeys, FormErrorsProps } from './config'
import { formsConfig } from './config'
import { useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormErrorsProps, FormClassesValidKeys>(),
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})

defineComponent({ inheritAttrs: false })
const { configuration, errors, hasErrors } = useConfiguration<FormErrorsProps>(formsConfig, 'FormErrors')
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
