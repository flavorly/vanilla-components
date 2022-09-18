<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { useBootVariant, useConfiguration, useVariantProps } from '../core'
import type { VanillaFormSectionProps } from './form-section'
import { VanillaFormSectionConfig } from './form-section'

export default defineComponent({
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
