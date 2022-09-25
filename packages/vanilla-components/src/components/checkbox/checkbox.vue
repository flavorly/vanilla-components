<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { CheckboxClassesValidKeys, CheckboxProps, CheckboxValue } from './config'
import { checkboxConfig } from './config'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'

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
    default: 'left',
    validator(align: string) {
      return ['left', 'right', 'center'].includes(align)
    },
  },
})

defineComponent({ inheritAttrs: false })

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
</script>

<template>
  <div
    class="vanilla-input"
    :class="configuration.classesList.container"
  >
    <div
      :class="[
        configuration.classesList.wrapper,
        align === 'center' ? configuration.classesList.wrapperCenter : '',
        align === 'left' ? configuration.classesList.wrapperLeft : '',
        align === 'right' ? configuration.classesList.wrapperRight : '',
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
      >
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
        v-if="!hasErrors && props.feedback !== undefined && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

