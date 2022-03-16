<template>
  <label
    :for="for"
    :class="configuration.class"
  >
    <span
      v-if="safe"
      v-html="label"
    />
    <span v-else>{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfiguration } from '@/core';
import { VanillaFormLabelProps, VanillaFormLabelConfig } from './index';

export default defineComponent({
    name: 'VanillaFormLabel',
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
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
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfiguration<VanillaFormLabelProps>(VanillaFormLabelConfig);

        return {
            localErrors,
            localVariant,
            hasErrors,
            configuration,
        };
    },
});
</script>
