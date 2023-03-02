<script setup lang="ts">
import type { ComputedRef, PropType } from 'vue'
import { computed, inject, nextTick, ref } from 'vue'
import { useInjectsClassesList } from '../../../core/use'
import { normalizedOptionIsDisabled } from '../../../core/helpers'
import type { NormalizedOption } from '../../../core/types'
import CloseIcon from '~icons/heroicons/x-mark-solid'

const props = defineProps({
  option: {
    type: Object as PropType<NormalizedOption>,
    required: true,
  },
})

const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!
const classesList = useInjectsClassesList()!

// Template refs
const root = ref<HTMLButtonElement | null>(null)

// Computed
const dataValueAttribute = computed<string>(() => {
  if (typeof props.option.value === 'object') {
    return JSON.stringify(props.option.value)
  }

  return String(props.option.value)
})

const isDisabled = computed(() => normalizedOptionIsDisabled(props.option)) as ComputedRef<boolean>

// Methods

const focus = (): void => root.value!.focus()

const getElementIndex = (): number => {
  const elements: HTMLElement[] = Array.from(root.value!.parentElement!.children) as HTMLElement[]
  return Array.from(elements).findIndex(el => el.isSameNode(root.value))
}

const focusNextElement = (): void => {
  const { parentElement } = root.value!
  const currentElementIndex = getElementIndex()
  const elements: HTMLElement[] = Array.from(parentElement!.children) as HTMLElement[]

  if (currentElementIndex < elements.length - 1) {
    elements[currentElementIndex + 1].focus()
  }
}

const focusPrevElement = (): void => {
  const { parentElement } = root.value!
  const currentElementIndex = getElementIndex()
  const elements: HTMLElement[] = Array.from(parentElement!.children) as HTMLElement[]
  if (currentElementIndex > 0) {
    elements[currentElementIndex - 1].focus()
  }
}

const unselect = async (): Promise<void> => {
  const { parentElement } = root.value!
  const elementIndex = getElementIndex()

  toggleOption(props.option)

  await nextTick()

  const nextElement: HTMLElement | undefined = parentElement!.children[elementIndex] as HTMLElement

  if (nextElement) {
    nextElement.focus()
  }
  else if (elementIndex > 0) {
    parentElement!.children[elementIndex - 1].focus()
  }
}
</script>

<template>
  <button
    ref="root"
    type="button"
    :class="classesList.tag"
    :disabled="isDisabled"
    data-rich-select-focusable
    data-rich-select-tag
    :data-value="dataValueAttribute"
    @mousedown.prevent.stop="focus"
    @keydown.backspace.prevent.stop="unselect"
    @keydown.right.prevent.stop="focusNextElement"
    @keydown.left.prevent.stop="focusPrevElement"
    @keydown.enter.prevent.stop
  >
    <span :class="classesList.tagLabel">
      <slot
        name="tagLabel"
        :option="option"
        :is-disabled="isDisabled"
      >{{ option.text }}</slot>
    </span>

    <span
      v-if="!isDisabled"
      tabindex="0"
      :class="classesList.tagDeleteButton"
      data-rich-select-focusable
      @mousedown.prevent.stop="unselect"
      @keydown.backspace.prevent.stop="unselect"
      @keydown.enter.prevent.stop="unselect"
    >
      <slot
        name="tagCloseIcon"
        :option="option"
      >
        <CloseIcon
          ref="closeIcon"
          :class="classesList.tagDeleteButtonIcon"
        />
      </slot>
    </span>
  </button>
</template>
