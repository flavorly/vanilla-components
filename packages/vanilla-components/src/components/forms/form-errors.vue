<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { FormClassesValidKeys, FormErrorsProps } from './config'
import { formClassesKeys, formsConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<FormErrorsProps, FormClassesValidKeys>(),
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})

defineComponent({ inheritAttrs: false })

const {
  localErrors,
  localVariant,
  hasErrors,
} = useBootVariant(props, 'errors', ref(null))
const { configuration } = useConfiguration<FormErrorsProps>(formsConfig, formClassesKeys)
</script>

<template>
  <div
    v-if="hasErrors"
    :class="configuration.classesList.errors"
  >
    <span
      v-if="safe"
      v-html="localErrors"
    />
    <span v-else>{{ localErrors }}</span>
  </div>
</template>
