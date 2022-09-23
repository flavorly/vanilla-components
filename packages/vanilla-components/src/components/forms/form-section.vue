<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { FormClassesValidKeys, FormSectionProps } from './config'
import { formClassesKeys, formsConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormSectionProps, FormClassesValidKeys>(),
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})

const { localVariant } = useBootVariant(props, 'errors', ref(null))
const { configuration } = useConfiguration<FormSectionProps>(formsConfig, formClassesKeys)
</script>

<template>
  <form :class="configuration.class">
    <slot />
  </form>
</template>
