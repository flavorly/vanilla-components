<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import { hasSlot } from '../../core/helpers'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import type { TextareaClassesValidKeys, TextareaProps, TextareaValue } from './config'
import { textareaConfig } from './config'
import ExclamationCircleIcon from '~icons/heroicons/exclamation-circle-solid'
import ClipboardIcon from '~icons/heroicons/clipboard'
import CheckIcon from '~icons/heroicons/check-solid'
import Input from '@/components/input/input.vue'

const props = defineProps({
  ...useVariantProps<TextareaProps, TextareaClassesValidKeys>(),
  modelValue: {
    type: [String, Number] as PropType<TextareaValue>,
    default: undefined,
  },
  placeholder: {
    type: [String] as PropType<string>,
    default: '',
  },
  copiable: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  autosize: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
})

const emit = defineEmits(['click', 'update:modelValue', 'focus', 'focusout'])

const root = ref<HTMLElement | undefined>(undefined)
const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<TextareaProps>(textareaConfig, 'Textarea', localValue)

// Clipboard handler
const { text, copy, copied, isSupported } = useClipboard()

const resize = async () => {
    await nextTick(() => {
      if (root.value) {
        const maxHeight = root.value.scrollHeight > Number(props.maxHeight) ? props.maxHeight : root.value.scrollHeight
        if (maxHeight <= 0) {
          return
        }
        root.value.style.height = 'auto'
        root.value.style.height = `${maxHeight}px`
      }
    })
}

onMounted(async () => {
  if (props.autosize) {
    await resize()
  }
})

watch(localValue, async () => {
  if (props.autosize) {
    await resize()
  }
}, { immediate: false })

/**
 * @docs
 * @displayName VanillaTextarea
 * @description A textarea component
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaTextarea',
  inheritAttrs: false,
}
</script>

<template>
  <div class="vanilla-input">
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot
          name="before"
          v-bind="{ className: configuration.classesList.addonClasses }"
        />
      </div>
      <textarea
        :id="name"
        ref="root"
        v-model="localValue"
        :name="name"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder"
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
          props.disabled ? configuration.classesList.disabled : '',
        ]"
        :disabled="disabled"
        v-bind="$attrs"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @focusout="$emit('focusout', $event)"
      />
      <div
        v-if="hasSlot($slots.after) || hasErrors || props.copiable"
        v-bind="{ hasErrors, className: configuration.classesList.addonClasses }"
        :class="configuration.classesList.addonAfter"
      >
        <slot name="after">
          <ExclamationCircleIcon
            v-if="hasErrors"
            :class="configuration.classesList.addonClasses"
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
        v-if="!hasErrors && props.feedback && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

