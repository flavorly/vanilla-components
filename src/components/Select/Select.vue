<template>
  <div class="vanilla-input">
    <div :class="configuration.classesList.wrapper">
      <select
        :id="name"
        v-model="localValue"
        :name="name"
        :autocomplete="autocomplete"
        v-bind="$attrs"
        :class="[
          configuration.classesList.select,
          configuration.multiple ? configuration.classesList.selectIfMultiple : '',
        ]"
        :multiple="configuration.multiple"
      >
        <VanillaSelectOption
          v-if="empty && showEmpty"
          :option="empty"
        />
        <slot
          name="option"
          v-bind="{normalizedOptions}"
        >
          <VanillaSelectOption
            v-for="(option, index) in normalizedOptions"
            :key="`${option.value}-${index}`"
            :option="option"
          />
        </slot>
      </select>
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, provide } from 'vue';
import { useBootVariant, useMultipleOptions, useMultipleVModel, useVariantProps, useConfigurationWithClassesList, hasSlot } from '@/core';
import { VanillaSelectValue, VanillaSelectProps, VanillaSelectClassesKeys, VanillaSelectConfig } from '@/components/Select/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import { InputOptions, NormalizedOption } from '@/core/types';
import VanillaSelectOption from '@/components/Select/SelectOption/SelectOption.vue';

export default defineComponent({
    name: 'VanillaSelect',
    components: {
        VanillaSelectOption,
        VanillaFormErrors,
        VanillaFormFeedback,

    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaSelectProps>(),
        modelValue: {
            type: [
                String,
                Number,
                Boolean,
                Array,
                Object,
                Date,
                Function,
                Symbol,
            ] as PropType<VanillaSelectValue>,
            default: undefined,
        },
        options: {
            type: [Array, Object] as PropType<InputOptions>,
            default: undefined,
        },
        normalizeOptions: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        valueAttribute: {
            type: String as PropType<string | undefined>,
            default: 'value',
        },
        textAttribute: {
            type: String as PropType<string | undefined>,
            default: 'text',
        },
        multiple: {
            type: [String, Boolean] as PropType<boolean | string>,
            default: false,
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        showEmpty: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        empty: {
            type: Object as PropType<NormalizedOption>,
            default: () => {
                return {
                    value: null,
                    text: '-',
                };
            },
        },
    },
    setup(props) {

        const { localValue } = useMultipleVModel(props, 'modelValue', props);

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaSelectProps>(
            VanillaSelectConfig,
            VanillaSelectClassesKeys,
            localVariant,
        );

        const { normalizedOptions } = useMultipleOptions(
            computed(() => props.options as InputOptions | undefined),
            computed(() => props.textAttribute),
            computed(() => props.valueAttribute),
            computed(() => props.normalizeOptions!),
        );

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

        return {
            configuration,
            normalizedOptions,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            hasSlot,
            props,
        };
    },
});
</script>

