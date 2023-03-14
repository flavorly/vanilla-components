<script setup lang="ts">
import type { ComponentPublicInstance, Prop, PropType, Ref } from 'vue'
import { computed, inject, nextTick, ref, watch } from 'vue'
import type { CssClass, NormalizedOption } from '../../../core/types'
import { normalizedOptionIsDisabled } from '../../../core/helpers'
import { useInjectsClassesList } from '../../../core/use'
import SelectOptionsList from './option-list.vue'
import CheckmarkIcon from '~icons/heroicons/check-solid'

const props = defineProps({
  option: {
    type: Object as PropType<NormalizedOption>,
    required: true,
  },
  deep: {
    type: Number as Prop<number>,
    default: 0,
  },
  index: {
    type: [Number, String, undefined] as Prop<number | string | undefined>,
    required: false,
    default: 0,
  },
})

const elementList = ref(null) as Ref<ComponentPublicInstance<HTMLInputElement> | null>

const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!
const setActiveOption = inject<(option: NormalizedOption) => void>('setActiveOption')!
const optionIsSelected = inject<(option: NormalizedOption) => boolean>('optionIsSelected')!
const optionIsActive = inject<(option: NormalizedOption) => boolean>('optionIsActive')!
const shown = inject<Ref<boolean>>('shown')
const clearable = inject<boolean>('clearable')
const classesList = useInjectsClassesList()!

// Computed stuff
const isActive = computed(() => optionIsActive(props.option)) as Ref<boolean>
const isSelected = computed(() => optionIsSelected(props.option)) as Ref<boolean>
const isDisabled = computed(() => normalizedOptionIsDisabled(props.option)) as Ref<boolean>
const hasChildren = computed(() => props.option.children !== undefined && props.option.children.length > 0) as Ref<boolean>
const valueAttribute = computed(() => typeof props.option.value === 'object'
  ? JSON.stringify(props.option.value)
  : String(props.option.value))

const optionClasses = computed(() => {
  const classes: CssClass[] = [classesList.value!.option]

  // Selected
  if (isSelected.value) {
    if (isActive.value) {
      classes.push(classesList.value!.selectedHighlightedOption)
    }
    else {
      classes.push(classesList.value!.selectedOption)
    }

    // Not selected
  }
  else if (isActive.value) {
    classes.push(classesList.value!.highlightedOption)
  }
  return classes
}) as Ref<CssClass[]>

// Methods
const scrollIntoViewIfNecessary = () => {
  if (shown?.value && isActive.value) {
    const li = elementList.value?.$el as HTMLLIElement

    // TODO: check this
    if (li) {
      li.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }
}

const mouseMoveHandler = () => {
  if (isDisabled.value) {
    return
  }
  setActiveOption(props.option)
}

const mouseWheelHandler = () => {
  if (isDisabled.value) {
    return
  }
  setActiveOption(props.option)
}

const clickHandler = () => {
  if (isDisabled.value) {
    return
  }

  if (!clearable && isSelected.value) {
    return
  }
  toggleOption(props.option)
}

// Watchers
watch(() => shown, async (value): Promise<void> => {
  await nextTick()
  scrollIntoViewIfNecessary()
}, { immediate: true })

watch(() => isActive, (value): void => {
  scrollIntoViewIfNecessary()
})
</script>

<template>
  <li
    v-if="hasChildren"
    role="optgroup"
    :class="classesList.optgroup"
  >
    <div :class="classesList.optgroupContent">
      <span :class="classesList.optgroupLabel">{{ option.text }}</span>

      <SelectOptionsList
        ref="childrenOptions"
        :class="classesList.optgroupOptionsList"
        :options="option.children"
        :deep="deep + 1"
      />
    </div>
  </li>
  <li
    v-else
    :class="classesList.optionWrapper"
    @mousemove="mouseMoveHandler"
    @mousewheel="mouseWheelHandler"
    @click="clickHandler"
  >
    <slot
      name="option"
      :class-name="optionClasses"
      :option="option"
      :is-disabled="isDisabled"
      :is-active="isActive"
      :is-selected="isSelected"
      :deep="deep"
    >
      <button
        role="option"
        :class="optionClasses"
        :aria-selected="isSelected"
        tabindex="-1"
        type="button"
        :disabled="isDisabled"
        :value="valueAttribute"
      >
        <span :class="classesList.optionContent">
          <slot
            name="optionLabel"
            :option="option"
            :is-disabled="isDisabled"
            :is-active="isActive"
            :is-selected="isSelected"
            :deep="deep"
          >
            <span :class="classesList.optionLabel">
              {{ option.text }}
            </span>
          </slot>

          <slot
            name="optionIcon"
            :class-name="optionClasses"
            :option="option"
            :is-disabled="isDisabled"
            :is-active="isActive"
            :is-selected="isSelected"
            :deep="deep"
          >
            <CheckmarkIcon
              v-if="isSelected"
              ref="checkIcon"
              :class="classesList.optionSelectedIcon"
            />
          </slot>
        </span>
      </button>
    </slot>
  </li>
</template>
