<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import type { InputOptions, NormalizedOption } from '../../core/types'
import { useConfiguration, useMultipleOptions, useMultipleVModel, useVariantProps } from '../../core/use'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import FormLabel from '../forms/form-label.vue'
import Checkbox from '../checkbox/checkbox.vue'
import { uniqueId } from '../../core/helpers'
import type { CheckboxClassesValidKeys, CheckboxProps, CheckboxSimpleValue } from './config'
import { checkboxConfig } from './config'
import Toggle from '@/components/toggle/toggle.vue'

const props = defineProps({
  ...useVariantProps<CheckboxProps, CheckboxClassesValidKeys>(),
  modelValue: {
    type: [Array] as PropType<CheckboxSimpleValue[]>,
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
  navigation: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  disabled: {
    type: [Boolean] as PropType<boolean>,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'click'])

const { localValue } = useMultipleVModel(props, 'modelValue', true)
const { configuration, errors, hasErrors, variant } = useConfiguration<CheckboxProps>(checkboxConfig, 'Checkbox', localValue)
const { normalizedOptions } = useMultipleOptions(
  computed(() => props.options as InputOptions | undefined),
  computed(() => props.textAttribute),
  computed(() => props.valueAttribute),
  computed(() => props.normalizeOptions!),
)

// Ensure we always deal with a arrays
if (!Array.isArray(localValue.value)) {
  localValue.value = []
}

// Refs
const root = ref<HTMLElement | null>(null)

// Defines if an option is selected for highlighting
const isOptionSelected = (normalizedOption: NormalizedOption) => {
  if (Array.isArray(localValue.value)) {
    return localValue.value.includes(normalizedOption.value as string)
  }

  return localValue.value === normalizedOption.value
}

// Navigation to focus next element
const focusElement = (currentIndex, direction) => {
  const group: HTMLCollection | undefined = root.value?.children
  if (group === undefined) {
    return
  }
  const newIndex = (currentIndex + direction + group.length) % group.length
  group[newIndex].focus()
}

// On keydown, left and right
const handleKeydown = (event, currentIndex) => {
  if (!root.value?.contains(event.target)) {
    return
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    focusElement(currentIndex, -1)
    return
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    focusElement(currentIndex, 1)
  }
}

// Ensures the Checkbox group nested field have a unique ID, so it doesnt conflict with other values with same name
const generateUniqueId = (name: string, id: number) => `${props.name}_${name.toLowerCase().replace(/\s+/g, '-')}_${id}`

/**
 * @docs
 * @displayName VanillaCheckboxGroup
 * @description A checkbox group component.
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaCheckboxGroup',
  inheritAttrs: false,
}
</script>

<template>
  <div class="vanilla-checkbox-group-wrapper">
    <div
      ref="root"
      class="vanilla-checkbox-group"
      :class="[
        configuration.classesList.container,
        configuration.classesList.groupContainer,
        disabled ? configuration.classesList.disabled : '',
      ]"
    >
      <FormLabel
        v-for="(option, index) in normalizedOptions"
        :key="index"
        :for="generateUniqueId(option.value.toString(), index)"
        :label="option.text.toString()"
        :classes="{
          label: '',
        }"
        :class="[
          configuration.classesList.groupCheckboxWrapper,
          isOptionSelected(option)
            ? configuration.classesList.groupCheckboxWrapperHighlighted
            : configuration.classesList.groupCheckboxWrapperNotHighlighted,
        ]"
        @keydown="handleKeydown($event, index)"
      >
        <div :class="configuration.classesList.groupCheckbox">
          <Checkbox
            v-model="localValue"
            :name="generateUniqueId(option.value.toString(), index)"
            :value="option.value"
            :variant="variant"
            :disabled="disabled || option?.disabled"
            @focus="$emit('focus', $event)"
            @focusout="$emit('focusout', $event)"
          />
        </div>
        <div :class="configuration.classesList.groupLabelWrapper">
          <FormLabel
            as="span"
            :for="generateUniqueId(option.value.toString(), index)"
            :label="option.text.toString()"
            :disabled="disabled || option?.disabled"
            :classes="{
              label: configuration.classesList.label.label,
            }"
          />
          <span
            v-if="option.raw?.description"
            :class="configuration.classesList.groupLabelFeedback"
            v-text="option.raw?.description"
          />
        </div>
      </FormLabel>
    </div>
    <slot
      name="errors"
      v-bind="{ hasErrors, errors }"
    >
      <FormErrors
        v-if="hasErrors && errors"
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

