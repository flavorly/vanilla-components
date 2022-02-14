<template>
  <div :class="configuration.classesList.wrapper">
    <div :class="configuration.classesList.addonBefore">
      <slot name="before" />
    </div>
    <t-input
      v-model="localValue"
      v-bind="$attrs"
      :class="[
        hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
        hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
      ]"
      :variant="localVariant"
      :type="type"
    />
    <div :class="configuration.classesList.addonAfter">
      <slot name="after">
        <ExclamationCircleIcon
          v-if="hasErrors"
          :class="configuration.classesList.addonAfterErrors"
        />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/use';
import { hasSlot } from '@/core/helpers';
import { VanillaInputValue, VanillaInputProps } from '@/components/Input/Type';
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
        ...useVariantProps<VanillaInputProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaInputValue>,
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

        const { configuration } = useConfigurationWithClassesList<VanillaInputProps>(
            VanillaInputConfig,
            VanillaInputClassesKeys,
            localVariant,
        );

        return {
            localValue,
            errors,
            localVariant,
            hasErrors,
            configuration,
            hasSlot,
        };
    },
});
</script>

