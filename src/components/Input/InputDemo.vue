<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>
<script lang="ts">
import { defineComponent, PropType, getCurrentInstance } from 'vue';
import useVModel from '@/use/useVModel';
import useConfiguration from '@/use/useConfiguration';
import useVariantProps from '@/use/useVariantProps';
import VCInputConfig from '@/components/Input/Config';
import { VanillaInputProps, VanillaInputValue } from '@/components/Input/Type';

export default defineComponent({
    name: 'VanillaInputTextDemo',
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaInputProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaInputValue>,
            default: undefined,
        },
    },
    setup(props) {
        const vm = getCurrentInstance();

        const definedProps = vm!.vnode.props;

        const usesVModel = definedProps && definedProps.modelValue !== undefined;

        const localValue = useVModel(props, 'modelValue');

        const { configuration, attributes } = useConfiguration<VanillaInputProps>(VCInputConfig);

        console.log(configuration, attributes);

        return {
            localValue,
            configuration,
            attributes,
            usesVModel,
        };
    },
});
</script>

