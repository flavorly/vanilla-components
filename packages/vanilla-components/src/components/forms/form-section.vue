<script setup lang="ts">
import type { PropType } from 'vue'
import type { FormClassesValidKeys, FormSectionProps } from './config'
import { formsConfig } from './config'
import { useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormSectionProps, FormClassesValidKeys>(),
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})

const { configuration } = useConfiguration<FormSectionProps>(formsConfig, 'FormLabel')
</script>

<template>
  <form :class="configuration.classesList.section">
    <slot />
  </form>
</template>
