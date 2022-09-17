<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { useBootVariant, useConfigurationWithClassesList, useVariantProps } from '@/core/use'
import type { VanillaStatusIndicatorProps } from '@/components/StatusIndicator/Type'
import { VanillaStatusIndicatorClassesKeys, VanillaStatusIndicatorConfig } from '@/components/StatusIndicator/Config'
export default defineComponent({
    name: 'VanillaStatusIndicator',
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaStatusIndicatorProps>(),
        pulse: {
            type: [Boolean] as PropType<boolean>,
            default: true,
        },
    },
    setup(props) {
        const localRef = ref(null)
        const value = ref(null)
        const { localVariant } = useBootVariant(props, 'errors', value)

        const { configuration } = useConfigurationWithClassesList<VanillaStatusIndicatorProps>(
            VanillaStatusIndicatorConfig,
            VanillaStatusIndicatorClassesKeys,
            localVariant,
        )

        return {
            configuration,
            localRef,
            localVariant,
        }
    },
})
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

