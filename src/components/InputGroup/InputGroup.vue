<template>
  <t-input-group>
    <VanillaButton label="Something" />
  </t-input-group>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, hasSlot } from '@/core';
import { VanillaInputGroupValue, VanillaInputGroupProps, VanillaInputGroupClassesKeys, VanillaInputGroupConfig } from '@/components/InputGroup/index';
import { TInputGroup } from '@variantjs/vue';
import VanillaButton from '@/components/Button/Button.vue';

export default defineComponent({
    name: 'VanillaInputGroup',
    components: {
        TInputGroup,
        VanillaButton,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaInputGroupProps>(),
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
    },
    setup(props) {
        const localType = ref(props.type);
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaInputGroupProps>(
            VanillaInputGroupConfig,
            VanillaInputGroupClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localValue,
            localVariant,
            localType,
            localErrors,
            hasErrors,
            hasSlot,
        };
    },
});
</script>

