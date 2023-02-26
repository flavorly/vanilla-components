<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import { hasSlot } from '../../core/helpers'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import ExclamationCircleIcon from '../icons/hero/solid/ExclamationCircleIcon.vue'
import EyeIcon from '../icons/hero/solid/EyeIcon.vue'
import EyeSlashIcon from '../icons/hero/solid/EyeSlashIcon.vue'
import ClipboardIcon from '../icons/hero/outline/ClipboardIcon.vue'
import CheckIcon from '../icons/hero/solid/CheckIcon.vue'
import { inputConfig } from './config'
import type { InputClassesValidKeys, InputProps, InputValue } from './config'

const props = defineProps({
  ...useVariantProps<InputProps, InputClassesValidKeys>(),
  modelValue: {
    type: [String, Number] as PropType<InputValue>,
    default: undefined,
  },
  type: {
    type: [String] as PropType<string>,
    default: 'text',
  },
  placeholder: {
    type: [String] as PropType<string>,
    default: 'text',
  },
  copiable: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
})

const localRef = ref(null)
const localValue = useVModel(props, 'modelValue')
const localType = ref(props.type)
const { configuration, errors, hasErrors } = useConfiguration<InputProps>(inputConfig, 'Input', localValue)

// Show hide password if type password
const showingPassword = ref(false)
const togglePassword = () => {
  showingPassword.value = !showingPassword.value
  localType.value = showingPassword.value ? 'text' : 'password'
}

// Clipboard handler
const { text, copy, copied, isSupported } = useClipboard()

defineOptions({
  name: 'VanillaInput',
  inheritAttrs: false,
})
</script>

<template>
  <div class="vc-input">
    <div :class="configuration.classesList.wrapper">
      <!-- Before Input -->
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot
          name="before"
          v-bind="{ className: configuration.classesList.addonClasses }"
        />
      </div>
      <!-- Input -->
      <input
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="props.autocomplete"
        :placeholder="placeholder"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input,
          configuration.classesList.inputBorder,
          props.rounded === 'full' ? configuration.classesList.roundedFull : '',
          props.rounded === 'top' ? configuration.classesList.roundedTop : '',
          props.rounded === 'bottom' ? configuration.classesList.roundedBottom : '',
          props.rounded === 'left' ? configuration.classesList.roundedLeft : '',
          props.rounded === 'right' ? configuration.classesList.roundedRight : '',
          props.rounded === 'top-left' ? configuration.classesList.roundedTopLeft : '',
          props.rounded === 'top-right' ? configuration.classesList.roundedTopRight : '',
          props.rounded === 'bottom-left' ? configuration.classesList.roundedBottomLeft : '',
          props.rounded === 'bottom-right' ? configuration.classesList.roundedBottomRight : '',
        ]"
        :type="localType"
        v-bind="$attrs"
      >
      <!-- After Input -->
      <div
        v-if="hasSlot($slots.after) || hasErrors || (type === 'password' || props.copiable)"
        :class="configuration.classesList.addonAfter"
      >
        <slot
          name="after"
          v-bind="{ hasErrors, type, showingPassword, className: configuration.classesList.addonClasses }"
        >
          <ExclamationCircleIcon
            v-if="hasErrors && (type !== 'password' && !props.copiable)"
            :class="configuration.classesList.addonClasses"
          />
          <EyeIcon
            v-if="type === 'password' && !showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
          />
          <EyeSlashIcon
            v-if="showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
          />
          <ClipboardIcon
            v-show="props.copiable && !copied"
            :class="configuration.classesList.addonClasses"
            @click="copy(localValue)"
          />
          <CheckIcon
            v-show="props.copiable && copied"
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
        v-if="!hasErrors && props?.feedback && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

