<template>
  <t-input
    v-model="localValue"
    :variant="hasErrors ? 'error' : variant"
    v-bind="$attrs"
    type="text"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TInput } from '@variantjs/vue';
import useErrors from '@/use/useErrors';
import useVModel from '@/use/useVmodel';
import { VCInputValue, VCInputOptions } from '@/components/Input/Type';
import useVariantProps from '@/use/useVariantProps';

export default defineComponent({
    name: 'VanillaInput',
    components: {
        TInput,
    },
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VCInputOptions>(),
        modelValue: {
            type: [String, Number] as PropType<VCInputValue>,
            default: undefined,
        },
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue');
        const { errors, hasErrors } = useErrors(props, 'errors', localValue);

        return {
            localValue,
            errors,
            hasErrors,
        };
    },
});
</script>

