<template>
  <t-input
    v-model="localValue"
    v-bind="$attrs"
    :variant="hasErrors && !variant ? 'error' : variant"
  />
  <p>{{ JSON.stringify(errors) }}</p>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TInput } from '@variantjs/vue';
import useVariantProps from '@/use/useVariantProps';
import useErrors from '@/use/useErrors';
import useVModel from '@/use/useVmodel';
import { VCInputOptions, VCInputValue } from '@/components/Input/Type';
export default defineComponent({
    name: 'VanillaInputText',
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

