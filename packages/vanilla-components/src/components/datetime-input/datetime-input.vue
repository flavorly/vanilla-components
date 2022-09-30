<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'
import Flatpickr from 'flatpickr'
import { dateTimeInputConfig } from './config'
import type { DateTimeInputClassesValidKeys, DateTimeInputProps, DateTimeInputValue } from './config'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import ExclamationCircleIcon from '@/components/icons/hero/solid/ExclamationCircleIcon.vue'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import { hasSlot } from '@/core/helpers'

const props = defineProps({
  ...useVariantProps<DateTimeInputProps, DateTimeInputClassesValidKeys>(),
  modelValue: {
    type: [String, undefined] as PropType<DateTimeInputValue>,
    default: undefined,
  },
  options: {
    type: [Object] as PropType<object>,
    default: () => {
      return {
        enableTime: true,
        time_24hr: true,
      }
    },
  },
  type: {
    type: [String] as PropType<string>,
    default: 'text',
  },
})

const localValue = useVModel(props, 'modelValue')
const flatpickrInput = ref(null)
const { configuration, errors, hasErrors } = useConfiguration<DateTimeInputProps>(dateTimeInputConfig, 'DateTimeInput', localValue)
onMounted(() => Flatpickr(flatpickrInput.value, props.options))
</script>

<template>
  <div class="vanilla-input">
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot name="before" />
      </div>
      <input
        :id="name"
        v-bind="$attrs"
        ref="flatpickrInput"
        v-model="localValue"
        :name="name"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input,
        ]"
        :type="type"
      >
      <div
        v-if="hasSlot($slots.after) || hasErrors"
        :class="configuration.classesList.addonAfter"
      >
        <slot name="after">
          <ExclamationCircleIcon
            v-if="hasErrors"
            :class="configuration.classesList.addonClasses"
          />
        </slot>
      </div>
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

