<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { VanillaFormLabelProps } from './index'
import { VanillaFormLabelConfig } from './index'
import { useBootVariant, useConfiguration, useVariantProps } from '../../core'

export default defineComponent({
    name: 'VanillaFormLabel',
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaFormLabelProps>(),
        label: {
            type: [String] as PropType<string>,
            required: true,
        },
        for: {
            type: [String, undefined] as PropType<string | undefined>,
            default: undefined,
            required: false,
        },
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

        const { configuration } = useConfiguration<VanillaFormLabelProps>(VanillaFormLabelConfig)

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
  <label
    :for="for"
    :class="configuration.class"
  >
    <slot>
      <span
        v-if="safe"
        v-html="label"
      />
      <span
        v-else
        v-text="label"
      />
    </slot>
  </label>
</template>
