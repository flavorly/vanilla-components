<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { useBootVariant, useConfiguration, useVariantProps } from '../core'
import type { VanillaFormErrorsProps } from './form-errors'
import { VanillaFormErrorsConfig } from './form-errors'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaFormErrorsProps>(),
        safe: {
            type: [Boolean] as PropType<boolean>,
            default: true,
            required: false,
        },
    },
    setup(props) {
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', ref(null))

        const { configuration } = useConfiguration<VanillaFormErrorsProps>(VanillaFormErrorsConfig)

        return {
            localErrors,
            localVariant,
            hasErrors,
            configuration,
        }
    },
})
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
