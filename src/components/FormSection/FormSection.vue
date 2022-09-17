<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { VanillaFormSectionProps } from './index'
import { VanillaFormSectionConfig } from './index'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core'

export default defineComponent({
    name: 'VanillaFormSection',
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaFormSectionProps>(),
        safe: {
            type: [Boolean] as PropType<boolean>,
            default: true,
            required: false,
        },
    },
    setup(props) {
        const { localVariant } = useBootVariant(props, 'errors', ref(null))
        const { configuration } = useConfiguration<VanillaFormSectionProps>(VanillaFormSectionConfig)

        return {
            localVariant,
            configuration,
        }
    },
})
</script>

<template>
  <form :class="configuration.class">
    <slot />
  </form>
</template>
