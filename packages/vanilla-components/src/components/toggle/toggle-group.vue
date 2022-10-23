<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { toggleConfig } from './config'
import type { ToggleClassesValidKeys, ToggleProps, ToggleValue } from './config'
import type { InputOptions } from '@/core/types'
import { useConfiguration, useMultipleOptions, useMultipleVModel, useVariantProps } from '@/core/use'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import FormLabel from '@/components/forms/form-label.vue'
import Toggle from '@/components/Toggle/Toggle.vue'

const props = defineProps({
  ...useVariantProps<ToggleProps, ToggleClassesValidKeys>(),
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
    ] as PropType<ToggleValue>,
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
})

const { localValue } = useMultipleVModel(props, 'modelValue', true)
const { configuration, errors, hasErrors, variant } = useConfiguration<ToggleProps>(toggleConfig, 'ToggleGroup', localValue)

const { normalizedOptions } = useMultipleOptions(
  computed(() => props.options as InputOptions | undefined),
  computed(() => props.textAttribute),
  computed(() => props.valueAttribute),
  computed(() => props.normalizeOptions!),
)
</script>

<template>
  <div
    class="vanilla-toggle-group"
    :class="[
      configuration.classesList.container,
      configuration.classesList.groupContainer,
    ]"
  >
    <div
      v-for="(option, index) in normalizedOptions"
      :key="index"
    >
      <div :class="configuration.classesList.groupToggleWrapper">
        <div :class="configuration.classesList.groupToggle">
          <Toggle
            v-model="localValue"
            :name="option.value"
            :value="option.value"
            :variant="variant"
          />
        </div>
        <div :class="configuration.classesList.groupLabelWrapper">
          <FormLabel
            :for="option.value.toString()"
            :label="option.text.toString()"
            :classes="configuration.classesList.label"
          />
          <span
            v-if="option.raw?.description"
            :class="configuration.classesList.groupLabelFeedback"
            v-text="option.raw?.description"
          />
        </div>
      </div>
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
        v-if="!hasErrors && props.feedback !== undefined && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

