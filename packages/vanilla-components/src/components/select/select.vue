<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, provide, ref } from 'vue'
import { useConfiguration, useMultipleOptions, useMultipleVModel, useVariantProps } from '../../core/use'
import type { InputOptions, NormalizedOption } from '../../core/types'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import type { SelectClassesValidKeys, SelectProps, SelectValue } from './config'
import SelectOption from './option.vue'
import { selectConfig } from './config'

const props = defineProps({
  ...useVariantProps<SelectProps, SelectClassesValidKeys>(),
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
    ] as PropType<SelectValue>,
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
    type: [Boolean] as PropType<boolean | undefined>,
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
    default: (props: SelectProps) => {
      return {
        value: null,
        text: props.placeholder,
      }
    },
  },
})

const localRef = ref(null)
const { localValue } = useMultipleVModel(props, 'modelValue', props.multiple)
const { configuration, errors, hasErrors } = useConfiguration<SelectProps>(selectConfig, 'Select', localValue)

const { normalizedOptions } = useMultipleOptions(
  computed(() => props.options as InputOptions | undefined),
  computed(() => props.textAttribute),
  computed(() => props.valueAttribute),
  computed(() => props.normalizeOptions!),
)
provide('configuration_vanilla', configuration)

defineOptions({
  name: 'VanillaSelect',
})

/**
 * @docs
 * @displayName VanillaSelect
 * @description A select component
 **/
</script>

<template>
  <div class="vanilla-simple-select">
    <div :class="configuration.classesList?.wrapper">
      <select
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="props.autocomplete"
        :class="[
          configuration.classesList?.select,
          configuration.multiple ? configuration.classesList?.selectIfMultiple : '',
        ]"
        :multiple="configuration?.multiple"
      >
        <SelectOption
          v-if="empty && showEmpty"
          :option="empty"
          :selected="true"
        />
        <slot
          name="option"
          v-bind="{ normalizedOptions }"
        >
          <SelectOption
            v-for="(option, index) in normalizedOptions"
            :key="`${option.value}-${index}`"
            :option="option"
          />
        </slot>
      </select>
    </div>
    <slot
      name="errors"
      v-bind="{ hasErrors, errors }"
    >
      <FormErrors
        v-if="hasErrors && props.showErrors"
        :errors="errors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{ hasErrors, feedback: props.feedback }"
    >
      <FormFeedback
        v-if="!hasErrors && props.feedback && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

