<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick, ref, watch } from 'vue'
import { useConfiguration, useMultipleVModel, useVariantProps } from '../../core/use'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import { tagsInputConfig } from './config'
import type { TagsInputClassesValidKeys, TagsInputProps, TagsInputValue } from './config'
import CloseIcon from '~icons/heroicons/x-mark-solid'
import Input from '@/components/input/input.vue'

const props = defineProps({
  ...useVariantProps<TagsInputProps, TagsInputClassesValidKeys>(),
  modelValue: {
    type: [
      Array,
    ] as PropType<string[]>,
    default: () => [],
  },
  allowDuplicates: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  allowedOptions: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  allowSymbols: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  clearOnInvalid: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  transformValue: {
    type: Function as PropType<(value: string) => string>,
    default: (value: string) => value,
  },
  placeholder: {
    type: String as PropType<string>,
    default: 'Add new tag here',
  },
  errorTagNotAllowed: {
    type: String as PropType<string>,
    default: 'Sorry but this tag is not allowed. Allowed Tags are : ',
  },
  errorTagDuplicated: {
    type: String as PropType<string>,
    default: 'This tag is already in the list, please choose another one',
  },
  errorTagInvalid: {
    type: String as PropType<string>,
    default: 'Sorry but this tag is not allowed, invalid or duplicated',
  },
})

const emits = defineEmits({
  'update:modelValue': (value?: TagsInputValue) => true,
  'click': (event: MouseEvent) => true,
  'focus': (event: FocusEvent) => true,
  'focusout': (event: FocusEvent) => true,
})

const root = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const { localValue } = useMultipleVModel(props, 'modelValue', true)
const tag = ref('')
const { configuration, errors, hasErrors } = useConfiguration<TagsInputProps>(tagsInputConfig, 'TagsInput', localValue)

const handleDataListInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  if (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText') {
    tag.value = target.value
    addOnPressEnter()
  }
}

// Focus the input field
const focusInput = () => {
  input.value?.focus()
}

const add = (value: string) => {
  if (props.disabled) {
    return
  }
  const formattedValue = props.allowSymbols ? value : value.trim().replace(/[^a-zA-Z0-9\s]/g, '')
  let localErrors = ''

  if (
    formattedValue.length === 0
    || (!props.allowDuplicates && localValue.value?.includes(value))
    || (props.allowedOptions.length > 0 && !props.allowedOptions.includes(value))
  ) {
    // Duplicate Tag
    if (!props.allowDuplicates && localValue.value?.includes(value)) {
      localErrors = props.errorTagDuplicated
    }

    // Not in the allowed List
    else if (props.allowedOptions.length > 0 && !props.allowedOptions.includes(value)) {
      localErrors = props.errorTagNotAllowed + props.allowedOptions.join(', ')
    }

    // If none Matched
    else {
      localErrors = props.errorTagInvalid
    }

    // IF clear and valid
    if (props.clearOnInvalid) {
      tag.value = ''
      nextTick(() => errors.value = localErrors)
    }
    return
  }

  localValue.value = [
    ...localValue.value || [],
    props.transformValue(props.allowSymbols ? value : formattedValue),
  ]

  tag.value = ''
}

// Add a new tag
const addOnPressEnter = () => {
  if (props.disabled) {
    return
  }
  add(tag.value)
}

// Remove a tag
const remove = (tag: string) => {
  if (props.disabled) {
    return
  }
  localValue.value = localValue.value?.filter(t => t !== tag)
  focusInput()
}

// Navigation to focus next element
const focusElement = (currentIndex: number, direction: number): void => {
  const group: HTMLCollection | undefined = root.value?.children
  let newIndex: number

  if (group) {
    const buttonGroup: Element[] = Array.from(group).filter(el => el.tagName === 'BUTTON')
    newIndex = (currentIndex + direction + buttonGroup.length) % buttonGroup.length;
    (buttonGroup[newIndex] as HTMLElement).focus()
  }
}

// On keydown, left and right
const handleKeydown = (event: KeyboardEvent, currentIndex: number, option: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!event.target || !root.value?.contains(event.target)) {
    return
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    // If the event target is the input field, focus the last button.
    if (event.target === input.value) {
      const group: HTMLCollection | undefined = root.value?.children
      if (group) {
        const buttonGroup: Element[] = Array.from(group).filter(el => el.tagName === 'BUTTON')
        focusElement(buttonGroup.length - 1, 0)
      }
    }
    else {
      focusElement(currentIndex, -1)
    }
    return
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    focusElement(currentIndex, 1)
    return
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (event.key === 'Backspace' && event.target.value === '') {
    event.preventDefault()
    remove(option)
    focusElement(currentIndex, -1)
  }
}

// Watch if any of the tag or the localValue changes we need to reset the errors
watch(() => [localValue.value, tag.value], () => {
  errors.value = ''
})

// Expose functions for different layouts
defineExpose({
  add,
  remove,
})

/**
 * @docs
 * @displayName VanillaTagsInput
 * @description A Input that supports tags
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaTagsInput',
  inheritAttrs: false,
}
</script>

<template>
  <div class="vc-input">
    <slot name="before" />
    <div :class="configuration.classesList.trigger">
      <div
        ref="root"
        :class="[
          configuration.classesList.tagsWrapper,
        ]"
      >
        <template
          v-for="(option, index) in localValue"
          :key="option"
        >
          <slot
            name="tag"
            v-bind="{
              option,
              classes: configuration.classesList,
              disabled: props.disabled,
              keyDown: handleKeydown,
              remove,
            }"
          >
            <button
              :class="configuration.classesList.tag"
              type="button"
              :disabled="props.disabled"
              @keydown="handleKeydown($event, index, option)"
            >
              <span :class="configuration.classesList.tagLabel">
                <slot
                  name="tagLabel"
                  :option="option"
                >
                  {{ option }}
                </slot>
              </span>

              <span
                v-if="!props.disabled"
                tabindex="0"
                :class="configuration.classesList.tagDeleteButton"
                @click="remove(option)"
              >
                <slot
                  name="tagCloseIcon"
                  :option="option"
                >
                  <CloseIcon
                    ref="closeIcon"
                    :class="configuration.classesList.tagDeleteButtonIcon"
                  />
                </slot>
              </span>
            </button>
          </slot>
        </template>
        <div :class="configuration.classesList.inputWrapper">
          <input
            :id="name"
            ref="input"
            v-model="tag"
            :name="name"
            :autocomplete="props.autocomplete"
            :placeholder="props.placeholder"
            :class="configuration.classesList.input"
            :disabled="props.disabled"
            v-bind="$attrs"
            :list="`${name}-datalist`"
            @keydown="handleKeydown"
            @keydown.enter.prevent="addOnPressEnter"
            @input="handleDataListInput"
            @click="$emit('click', $event)"
            @focus="$emit('focus', $event)"
            @focusout="$emit('focusout', $event)"
          >
          <datalist
            v-if="allowedOptions.length > 0"
            :id="`${name}-datalist`"
          >
            <option
              v-for="option in allowedOptions"
              :key="option"
              :value="option"
              :option="option"
            />
          </datalist>
        </div>
      </div>
    </div>
    <slot name="after" />
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

