<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, provide, ref } from 'vue'
import { hasSlot, useBootVariant, useConfigurationWithClassesList, useMultipleOptions, useMultipleVModel, useVariantProps } from '../core'
import VanillaFormErrors from '../FormErrors/FormErrors.vue'
import VanillaFormFeedback from '../FormFeedback/form-feedback.vue'
import type { InputOptions, NormalizedOption } from '../core/types'
import type { VanillaSelectProps, VanillaSelectValue } from './select/types'
import VanillaSelectOption from './select/option.vue'
import { VanillaSelectClassesKeys, VanillaSelectConfig } from './select'

export default defineComponent({
    components: {
        VanillaSelectOption,
        VanillaFormErrors,
        VanillaFormFeedback,

    },
    inheritAttrs: false,
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
        placeholder: {
            type: String as PropType<string | undefined>,
            default: 'Select an option',
        },
        empty: {
            type: Object as PropType<NormalizedOption>,
            default: (props) => {
                return {
                    value: undefined,
                    text: props.placeholder,
                }
            },
        },
    },
    setup(props) {
        const localRef = ref(null)
        const { localValue } = useMultipleVModel(props, 'modelValue', props)

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaSelectProps>(
            VanillaSelectConfig,
            VanillaSelectClassesKeys,
            localVariant,
        )

        const { normalizedOptions } = useMultipleOptions(
            computed(() => props.options as InputOptions | undefined),
            computed(() => props.textAttribute),
            computed(() => props.valueAttribute),
            computed(() => props.normalizeOptions!),
        )

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration)

        return {
            configuration,
            normalizedOptions,
            localRef,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            hasSlot,
            props,
        }
    },
})
</script>

<template>
  <div class="vanilla-simple-select">
    <div :class="configuration.classesList?.wrapper">
      <select
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="autocomplete"
        v-bind="$attrs"
        :class="[
          configuration.classesList?.select,
          configuration.multiple ? configuration.classesList?.selectIfMultiple : '',
        ]"
        :multiple="configuration?.multiple"
      >
        <VanillaSelectOption
          v-if="empty && showEmpty"
          :option="empty"
        />
        <slot
          name="option"
          v-bind="{ normalizedOptions }"
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
      v-bind="{ hasErrors, localErrors }"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{ hasErrors, feedback }"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>

