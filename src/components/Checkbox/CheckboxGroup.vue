<template>
  <div
    class="vanilla-checkbox-group"
    :class="[
      configuration.classesList.container,
      configuration.classesList.groupContainer,
    ]"
  >
    <div
      v-for="(option, index) in normalizedOptions"
      :key="index"
    >
      <div :class="configuration.classesList.groupCheckboxWrapper">
        <div :class="configuration.classesList.groupCheckbox">
          <VanillaCheckbox
            v-model="localValue"
            :name="option.value"
            :value="option.value"
            :variant="localVariant"
          />
        </div>
        <div :class="configuration.classesList.groupLabel">
          <VanillaFormLabel
            :for="option.value.toString()"
            :label="option.text.toString()"
          />
        </div>
      </div>
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
import { computed, defineComponent, PropType } from 'vue';
import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useMultipleVModel,
    useMultipleOptions,
} from '@/core';
import { VanillaCheckboxProps, VanillaCheckboxClassesKeys, VanillaCheckboxConfig } from '@/components/Checkbox/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import VanillaFormLabel from '@/components/FormLabel/FormLabel.vue';
import VanillaCheckbox from '@/components/Checkbox/Checkbox.vue';
import { VanillaSelectValue } from '@/components/Select';
import { InputOptions } from '@/core/types';

export default defineComponent({
    name: 'VanillaCheckboxGroup',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        VanillaFormLabel,
        VanillaCheckbox,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaCheckboxProps>(),
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
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const { localValue } = useMultipleVModel(props, 'modelValue', props);

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaCheckboxProps>(
            VanillaCheckboxConfig,
            VanillaCheckboxClassesKeys,
            localVariant,
        );

        const { normalizedOptions } = useMultipleOptions(
            computed(() => props.options as InputOptions | undefined),
            computed(() => props.textAttribute),
            computed(() => props.valueAttribute),
            computed(() => props.normalizeOptions!),
        );

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
            normalizedOptions,
        };
    },
});
</script>

