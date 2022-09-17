<template>
  <form :class="configuration.class">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfiguration } from '@/core';
import { VanillaFormSectionProps, VanillaFormSectionConfig } from './index';

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
        const { localVariant } = useBootVariant(props, 'errors', ref(null));
        const { configuration } = useConfiguration<VanillaFormSectionProps>(VanillaFormSectionConfig);

        return {
            localVariant,
            configuration,
        };
    },
});
</script>
