<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { InputGroupClassesValidKeys, InputGroupProps } from './config'
import { inputGroupClassesKeys, inputGroupConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'
import { hasSlot } from '@/core/helpers'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import FormLabel from '@/components/forms/form-label.vue'

const props = defineProps({
  ...useVariantProps<InputGroupProps, InputGroupClassesValidKeys>(),
  errors: {
    type: [String, Array, Object] as PropType<string | undefined>,
    default: undefined,
  },
  feedback: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  label: {
    type: [String] as PropType<string>,
    default: undefined,
    required: false,
  },
  name: {
    type: [String, undefined] as PropType<string | undefined>,
    default: undefined,
    required: false,
  },
  showErrors: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
  showFeedback: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
  withPadding: {
    type: [Boolean] as PropType<boolean>,
    default: false,
    required: false,
  },
})

defineComponent({ inheritAttrs: true })

// TODO: Fix Classes
const { localErrors, localVariant, hasErrors } = useBootVariant(props, 'errors', ref(null))
const { configuration } = useConfiguration<InputGroupProps>(inputGroupConfig, inputGroupClassesKeys)
</script>

<template>
  <div
    class="vc-group"
    :class="[withPadding ? configuration.classesList.containerPadded : '']"
  >
    <!-- Label And Input -->
    <div class="vc-inputs-group">
      <slot name="label">
        <FormLabel
          v-if="label !== undefined"
          :label="label"
          :for="name"
        />
      </slot>
      <div
        class="vc-inputs-container"
        :class="[
          configuration.classesList.wrapper,
        ]"
      >
        <div
          v-if="hasSlot($slots.before)"
          :class="configuration.classesList.addonBefore"
        >
          <!-- Before Input -->
          <slot
            name="before"
            v-bind="{ className: configuration.classesList.addonClasses }"
          />
        </div>
        <!-- Input -->
        <slot
          v-bind="{ label, name }"
        />
        <!-- After Input -->
        <div
          v-if="hasSlot($slots.after)"
          :class="configuration.classesList.addonAfter"
        >
          <slot
            name="after"
            v-bind="{ hasErrors, type }"
          />
        </div>
      </div>
    </div>
    <!-- Errors & Feedback -->
    <div class="vc-errors-and-feedback">
      <slot
        name="errors"
        v-bind="{ hasErrors, localErrors }"
      >
        <FormErrors
          v-if="hasErrors && showErrors"
          :errors="localErrors"
        />
      </slot>
      <slot
        name="feedback"
        v-bind="{ hasErrors, feedback }"
      >
        <FormFeedback
          v-if="!hasErrors && feedback !== undefined && showFeedback"
          :text="feedback"
        />
      </slot>
    </div>
  </div>
</template>

