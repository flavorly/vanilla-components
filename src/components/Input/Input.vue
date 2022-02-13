<template>
  <div :class="configuration.classesList.wrapper">
    <slot name="before" />
    <t-input
      v-model="localValue"
      :variant="hasErrors ? 'error' : variant"
      v-bind="$attrs"
      type="text"
    />
    <slot name="after" />
    <slot
      v-if="hasErrors"
      name="errorIcon"
    >
      <div :class="configuration.classesList.errorsWrapper">
        <ExclamationCircleIcon :class="configuration.classesList.errorsIcon" />
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TInput } from '@variantjs/vue';
import useErrors from '@/use/useErrors';
import useVModel from '@/use/useVmodel';
import { VCInputValue, VCInputOptions } from '@/components/Input/Type';
import { VanillaInputClassesKeys, VanillaInputConfig } from '@/components/Input/Config';
import useVariantProps from '@/use/useVariantProps';
import useConfigurationWithClassesList from '@/use/useConfigurationWithClassesList';
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaInput',
    components: {
        TInput,
        ExclamationCircleIcon,
    },
    inheritAttrs: false,
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

        const { configuration, attributes } = useConfigurationWithClassesList<VCInputOptions>(
            VanillaInputConfig,
            VanillaInputClassesKeys,
        );

        // TODO : forward variant to local component from the actual variant

        return {
            localValue,
            errors,
            hasErrors,
            configuration,
        };
    },
});
</script>

