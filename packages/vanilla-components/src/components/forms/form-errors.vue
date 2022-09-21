<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { useBootVariant, useConfiguration, useVariantProps } from '../../core'
import type { VanillaFormErrorsProps } from './form-errors.vue'
import { VanillaFormErrorsConfig } from './form-errors.vue'

const props = defineProps({
  ...useVariantProps<VanillaFormErrorsProps>(),
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

const { configuration } = useConfiguration<VanillaFormErrorsProps>(VanillaFormErrorsConfig)
</script>

<template>
  <div
    v-if="hasErrors"
    :class="configuration.class"
  >
    <span
      v-if="safe"
      v-html="localErrors"
    />
    <span v-else>{{ localErrors }}</span>
  </div>
</template>
