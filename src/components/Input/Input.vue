<template>
  <div :class="configuration.classesList.wrapper">
    <div :class="configuration.classesList.addonBefore">
      <slot name="before" />
    </div>
    <input
      :id="name"
      v-model="localValue"
      :name="name"
      :class="[
        hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
        hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
        configuration.classesList.input
      ]"
      :type="type"
      v-bind="$attrs"
    >
    <div :class="configuration.classesList.addonAfter">
      <slot name="after">
        <ExclamationCircleIcon
          v-if="hasErrors"
          :class="configuration.classesList.addonAfterErrors"
        />
      </slot>
    </div>
    <VanillaFormErrors
      v-if="hasErrors"
      :errors="errors"
    />
    <VanillaFormFeedback
      v-if="!hasErrors && feedback !== undefined"
      :text="feedback"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/use';
import { hasSlot } from '@/core/helpers';
import { VanillaInputValue, VanillaInputProps } from '@/components/Input/Type';
import { VanillaInputClassesKeys, VanillaInputConfig } from '@/components/Input/Config';
import { ExclamationCircleIcon } from '@heroicons/vue/solid';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';

export default defineComponent({
    name: 'VanillaInput',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
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

