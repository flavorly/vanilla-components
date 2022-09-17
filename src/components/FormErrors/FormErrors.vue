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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfiguration } from '@/core';
import { VanillaFormErrorsProps, VanillaFormErrorsConfig } from './index';

export default defineComponent({
    name: 'VanillaFormErrors',
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
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfiguration<VanillaFormErrorsProps>(VanillaFormErrorsConfig);

        return {
            localErrors,
            localVariant,
            hasErrors,
            configuration,
        };
    },
});
</script>
