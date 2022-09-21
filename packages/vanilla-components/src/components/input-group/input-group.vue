<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { hasSlot, useBootVariant, useConfigurationWithClassesList, useVariantProps } from '../../core'
import VanillaFormLabel from '../FormLabel/FormLabel.vue'
import VanillaFormErrors from '../FormErrors/FormErrors.vue'
import VanillaFormFeedback from '../FormFeedback/form-feedback.vue'
import type { VanillaInputGroupProps } from './input-group.vue'
import { VanillaInputGroupClassesKeys, VanillaInputGroupConfig } from './input-group.vue'
import type { Errors } from '@/core/types'

const props = defineProps({
  ...useVariantProps<VanillaInputGroupProps>(),
  errors: {
    type: [String, Array, Object] as PropType<Errors>,
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

const {
  localErrors,
  localVariant,
  hasErrors,
} = useBootVariant(props, 'errors', ref(null))

const { configuration } = useConfigurationWithClassesList<VanillaInputGroupProps>(
  VanillaInputGroupConfig,
  VanillaInputGroupClassesKeys,
  localVariant,
)
</script>

<template>
  <div
    class="vc-group"
    :class="[withPadding ? configuration.classesList.containerPadded : '']"
  >
    <!-- Label And Input -->
    <div class="vc-inputs-group">
      <slot name="label">
        <VanillaFormLabel
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
          v-bind="{ label, name, layout }"
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
  </div>
</template>

