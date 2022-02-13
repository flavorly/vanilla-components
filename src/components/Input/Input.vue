<template>
  <div :class="configuration.classesList.wrapper">
    <slot name="before" />
    <t-input
      v-model="localValue"
      v-bind="$attrs"
      :variant="localVariant"
      :type="type"
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
import useBootVariant from '@/use/useBootVariant';
import useVModel from '@/use/useVmodel';
import useVariantProps from '@/use/useVariantProps';
import useConfigurationWithClassesList from '@/use/useConfigurationWithClassesList';
import { VCInputValue, VCInputOptions } from '@/components/Input/Type';
import { VanillaInputClassesKeys, VanillaInputConfig } from '@/components/Input/Config';
import { TInput } from '@variantjs/vue';
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
        const {
            errors,
            hasErrors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration, attributes } = useConfigurationWithClassesList<VCInputOptions>(
            VanillaInputConfig,
            VanillaInputClassesKeys,
            localVariant,
        );

        console.log(configuration, attributes);

        return {
            localValue,
            errors,
            localVariant,
            hasErrors,
            configuration,
        };
    },
});
</script>

