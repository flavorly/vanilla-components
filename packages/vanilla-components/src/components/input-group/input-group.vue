<script setup lang="ts">
import type { PropType } from 'vue'
import Fuse from 'fuse.js'
import type { InputGroupClassesValidKeys, InputGroupProps } from './config'
import { inputGroupConfig } from './config'
import { useConfiguration, useVariantProps } from '@/core/use'
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
    default: true,
    required: false,
  },
})

const { configuration, errors, hasErrors, variant } = useConfiguration<InputGroupProps>(inputGroupConfig, 'InputGroup')
console.log(configuration.withPadding)
</script>

<template>
  <div
    class="vc-group px-6 py-3 mt-0 grid space-y-2"
    :class="[configuration.withPadding ? configuration.classesList.wrapperWithPadding : '']"
  >
    <!-- Label And Input -->
    <div :class="configuration.classesList.wrapper">
      <div :class="configuration.classesList.labelWrapper">
        <slot name="label">
          <FormLabel
            v-if="label !== undefined"
            :label="label"
            :for="name"
          />
        </slot>
      </div>
      <div :class="configuration.classesList.inputWrapper">
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
            v-bind="{ hasErrors }"
          />
        </div>
      </div>
    </div>
    <!-- Errors & Feedback -->
    <div class="vc-errors-and-feedback">
      <slot
        name="errors"
        v-bind="{ hasErrors, errors }"
      >
        <FormErrors
          v-if="hasErrors && showErrors"
          :errors="errors"
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

