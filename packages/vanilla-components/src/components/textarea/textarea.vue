<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { textareaConfig } from './config'
import type { TextareaClassesValidKeys, TextareaProps, TextareaValue } from './config'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import { hasSlot } from '@/core/helpers'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import ExclamationCircleIcon from '@/components/icons/hero/solid/ExclamationCircleIcon.vue'

const props = defineProps({
  ...useVariantProps<TextareaProps, TextareaClassesValidKeys>(),
  modelValue: {
    type: [String, Number] as PropType<TextareaValue>,
    default: undefined,
  },
  rows: {
    type: [String, Number] as PropType<string | number>,
    default: 4,
  },
})

const localRef = ref(null)
const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<TextareaProps>(textareaConfig, 'Textarea', localValue)
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
      <textarea
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="props.autocomplete"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input,
        ]"
        v-bind="$attrs"
      />
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
        v-if="!hasErrors && props.feedback !== undefined && pros.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

