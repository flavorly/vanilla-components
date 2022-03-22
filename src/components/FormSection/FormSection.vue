<template>
  <div class="sm:divide-y sm:divide-gray-200 dark:divide-gray-800 bg-gray-50 dark:bg-gray-800/50">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfiguration } from '@/core';
import { VanillaFormSectionProps, VanillaFormSectionConfig } from './index';

export default defineComponent({
    name: 'VanillaFormSection',
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
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
