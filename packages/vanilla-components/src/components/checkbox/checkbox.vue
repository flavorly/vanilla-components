<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import type { CheckboxClassesValidKeys, CheckboxProps, CheckboxValue } from './config'
import { checkboxConfig } from './config'

const props = defineProps({
  ...useVariantProps<CheckboxProps, CheckboxClassesValidKeys>(),
  modelValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<CheckboxValue>,
    default: undefined,
  },
  checked: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  value: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol, undefined] as PropType<CheckboxValue>,
    default: false,
  },
  checkedValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<CheckboxValue>,
    default: true,
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<CheckboxValue>,
    default: false,
  },
  align: {
    type: [String] as PropType<string>,
    required: false,
    default: 'left-top',
    validator(align: string) {
      return [
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
        'center-top',
        'center-center',
        'center-bottom',
      ].includes(align)
    },
  },
})

const emit = defineEmits(['click', 'update:modelValue'])

const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<CheckboxProps>(checkboxConfig, 'Checkbox', localValue)

// When toggle changes, emit the update in a different way.
const emitUpdate = (event: Event | any) => {
  const isChecked = event.target?.checked

  // It's an array
  if (Array.isArray(localValue.value)) {
    const newValue = [...localValue.value]

    if (isChecked) {
      newValue.push(props.value)
    }
    else {
      newValue.splice(newValue.indexOf(props.value), 1)
    }

    localValue.value = newValue
    return
  }

  // It's an object
  if (typeof localValue.value === 'object' && localValue.value !== null) {
    const temporaryValue = props.value as string
    const temporaryObject = localValue.value as object
    if (isChecked) {
      temporaryObject[temporaryValue] = true
    }
    else {
      delete temporaryObject[temporaryValue]
    }
    localValue.value = temporaryObject
    return
  }

  // It's a boolean
  const toggleValue = isChecked ? props.checkedValue : props.uncheckedValue
  localValue.value = toggleValue
}

// Check if the value is checked
const isChecked = computed(() => {
  if (Array.isArray(localValue.value) && typeof props.value === 'string') {
    return localValue.value.includes(props.value)
  }
  return localValue.value === props.checkedValue
})

/**
 * @docs
 * @displayName VanillaCheckbox
 * @description A checkbox component
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaCheckbox',
  inheritAttrs: false,
}
</script>

<template>
  <div
    class="vanilla-input"
    :class="configuration.classesList.container"
  >
    <div
      :class="[
        configuration.classesList.wrapper,
        align === 'left-top' ? configuration.classesList.wrapperLeftTop : '',
        align === 'left-center' ? configuration.classesList.wrapperLeftCenter : '',
        align === 'left-bottom' ? configuration.classesList.wrapperLeftBottom : '',
        align === 'right-top' ? configuration.classesList.wrapperRightTop : '',
        align === 'right-center' ? configuration.classesList.wrapperRightCenter : '',
        align === 'right-bottom' ? configuration.classesList.wrapperRightBottom : '',
        align === 'center-top' ? configuration.classesList.wrapperCenterTop : '',
        align === 'center-center' ? configuration.classesList.wrapperCenterCenter : '',
        align === 'center-bottom' ? configuration.classesList.wrapperCenterBottom : '',
      ]"
    >
      <input
        :id="name"
        ref="input"
        :checked="isChecked"
        :class="configuration.classesList.checkbox"
        :name="name"
        :value="value"
        type="checkbox"
        v-bind="$attrs"
        @change="emitUpdate"
        @click="$emit('click', $event)"
      >
      <slot v-bind="{ hasErrors, errors }" />
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

