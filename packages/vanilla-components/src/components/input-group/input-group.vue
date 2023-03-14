<script setup lang="ts">
import type { PropType } from 'vue'
import { useConfiguration, useVariantProps } from '../../core/use'
import { hasSlot } from '../../core/helpers'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import FormLabel from '../forms/form-label.vue'
import { inputGroupConfig } from './config'
import type { InputGroupClassesValidKeys, InputGroupProps } from './config'
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
  for: {
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
  padding: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
  alignLabel: {
    type: [String] as PropType<string>,
    required: false,
    default: 'left-center',
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

const { configuration, errors, hasErrors, variant } = useConfiguration<InputGroupProps>(inputGroupConfig, 'InputGroup')

defineOptions({
  name: 'VanillaInputGroup',
  inheritAttrs: true,
})

/**
 * @docs
 * @displayName VanillaInputGroup
 * @description Group of inputs
 **/
</script>

<template>
  <div
    :class="[
      configuration.classesList.container,
      configuration.padding ? configuration.classesList.containerWithPadding : '',
    ]"
  >
    <!-- Label And Input -->
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="label || hasSlot($slots.label)"
        :class="[
          configuration.classesList.labelWrapper,
          alignLabel === 'left-top' ? configuration.classesList.labelWrapperLeftTop : '',
          alignLabel === 'left-center' ? configuration.classesList.labelWrapperLeftCenter : '',
          alignLabel === 'left-bottom' ? configuration.classesList.labelWrapperLeftBottom : '',
          alignLabel === 'right-top' ? configuration.classesList.labelWrapperRightTop : '',
          alignLabel === 'right-center' ? configuration.classesList.labelWrapperRightCenter : '',
          alignLabel === 'right-bottom' ? configuration.classesList.labelWrapperRightBottom : '',
          alignLabel === 'center-top' ? configuration.classesList.labelWrapperCenterTop : '',
          alignLabel === 'center-center' ? configuration.classesList.labelWrapperCenterCenter : '',
          alignLabel === 'center-bottom' ? configuration.classesList.labelWrapperCenterBottom : '',
        ]"
      >
        <slot name="label">
          <FormLabel
            v-if="label !== undefined"
            :label="label"
            :for="name"
          />
        </slot>
      </div>
      <div
        :class="[
          configuration.classesList.inputWrapper,
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
            v-bind="{ hasErrors }"
          />
        </div>
      </div>
    </div>
    <!-- Errors & Feedback -->
    <div
      v-if="(hasErrors && showErrors) || (feedback !== undefined && showFeedback)"
      class="vc-errors-and-feedback"
    >
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

