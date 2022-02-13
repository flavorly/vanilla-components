<template>
  <div :class="configuration.classesList.wrapper">
    <div :class="configuration.classesList.addonBefore">
      <slot name="before" />
    </div>
    <t-input
      v-model="localValue"
      v-bind="$attrs"
      :class="[
        $slots.before ? configuration.classesList.addonBeforeInputClasses : '',
        $slots.after || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
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
import { defineComponent, getCurrentInstance, PropType } from 'vue';
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

        if (localVariant.value === 'error'){
            console.log(configuration, attributes);
            console.log(getCurrentInstance());
        }

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

