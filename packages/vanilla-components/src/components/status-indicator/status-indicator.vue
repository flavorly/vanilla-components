<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { StatusIndicatorClassesValidKeys, StatusIndicatorProps } from './config'
import { statusIndicatorClassesKeys, statusIndicatorConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<StatusIndicatorProps, StatusIndicatorClassesValidKeys>(),
  pulse: {
    type: [Boolean] as PropType<boolean>,
    default: true,
  },
})

const value = ref(null)
const { localVariant } = useBootVariant(props, 'errors', value)
const { configuration } = useConfiguration<StatusIndicatorProps>(statusIndicatorConfig, statusIndicatorClassesKeys)
</script>

<template>
  <div :class="configuration.classesList.wrapper">
    <span :class="configuration.classesList.container">
      <span
        v-if="pulse"
        :class="[
          configuration.classesList.pulsing,
          configuration.classesList.background,
        ]"
      />
      <span
        :class="[
          configuration.classesList.regular,
          configuration.classesList.background,
        ]"
      />
    </span>
  </div>
</template>

