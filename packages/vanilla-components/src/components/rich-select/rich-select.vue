<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, provide, ref, useSlots, watch } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import { refThrottled } from '@vueuse/core'
import isEmpty from 'lodash/isEmpty'
import { expose } from 'vue-docgen-cli/lib/compileTemplates'
import type {
  CSSRawClassesList,
  Data,
  FetchOptionsFn,
  FetchedOptions,
  InputOptions,
  Measure,
  MinimumInputLengthTextProp,
  NormalizedOption,
  PreFetchOptionsFn,
} from '../../core/types'
import { popperOptions, sameWidthModifier } from '../../core/config'
import { hasSlot, isEqual } from '../../core/helpers'
import {
  useActivableOption,
  useConfiguration,
  useFetchData,
  useFetchsOptions,
  useMultipleVModel,
  useSelectableOption,
  useVariantProps,
} from '../../core/use'
import DropdownSimple from '../dropdown/dropdown.vue'
import { validDropdownPlacements } from '../dropdown/config'
import SimpleSelect from '../select/select.vue'
import FormFeedback from '../forms/form-feedback.vue'
import FormErrors from '../forms/form-errors.vue'
import RichSelectDropdown from './partials/dropdown.vue'
import RichSelectTrigger from './partials/trigger.vue'
import ClearButton from './partials/clear-button.vue'
import { richSelectConfig } from './config'
import type { RichSelectClassesValidKeys, RichSelectProps, RichSelectValue } from './config'

const props = defineProps({
  ...useVariantProps<RichSelectProps, RichSelectClassesValidKeys>(),
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
    ] as PropType<RichSelectValue>,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  options: {
    type: [Array, Object] as PropType<InputOptions>,
    default: undefined,
  },
  normalizeOptions: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  fetchEndpoint: {
    type: String,
    default: undefined,
  },
  dropdownPlacement: {
    type: String as PropType<Placement>,
    default: undefined,
    validator: (value: string): boolean => validDropdownPlacements.includes(value),
  },
  dropdownPopperOptions: {
    type: Object as PropType<Options>,
    default: (): Options => ({
      ...popperOptions,
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        sameWidthModifier,
      ],
    } as Options),
  },
  closeOnSelect: {
    type: Boolean,
    default: undefined,
  },
  selectOnClose: {
    type: Boolean,
    default: undefined,
  },
  clearSearchOnClose: {
    type: Boolean,
    default: undefined,
  },
  toggleOnFocus: {
    type: Boolean,
    default: false,
  },
  toggleOnClick: {
    type: Boolean,
    default: true,
  },
  toggleOnHover: {
    type: Boolean,
    default: false,
  },
  closeOnClickAway: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  valueAttribute: {
    type: String,
    default: undefined,
  },
  textAttribute: {
    type: String,
    default: undefined,
  },
  hideSearchBox: {
    type: Boolean,
    default: false,
  },
  searchBoxPlaceholder: {
    type: String,
    default: 'Search...',
  },
  noResultsText: {
    type: String,
    default: 'We couldn\'t find any options.',
  },
  searchingText: {
    type: String,
    default: 'Searching, please wait...',
  },
  loadingClosedPlaceholder: {
    type: String,
    default: 'Loading...',
  },
  loadingMoreResultsText: {
    type: String,
    default: 'Loading more options...',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: [Number, String] as PropType<Measure | null>,
    default: 250,
  },
  fetchOptions: {
    type: Function as PropType<FetchOptionsFn>,
    default: undefined,
  },
  prefetchOptions: {
    type: [Function, Boolean] as PropType<PreFetchOptionsFn | boolean>,
    default: false,
  },
  delay: {
    type: Number,
    default: 250,
  },
  minimumInputLength: {
    type: Number,
    default: 2,
  },
  minimumInputLengthText: {
    type: [Function, String] as PropType<MinimumInputLengthTextProp>,
    default:
      () => (minimumInputLength: number): string => `Please enter ${minimumInputLength} or more characters`,
  },
  minimumResultsForSearch: {
    type: Number,
    default: undefined,
  },
  teleport: {
    type: Boolean,
    default: true,
  },
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  show: {
    type: Boolean,
    default: false,
  },
  trapFocus: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits({
  'change': (e: CustomEvent) => e instanceof CustomEvent,
  'input': (e: CustomEvent) => e instanceof CustomEvent,
  'keydown': (e: KeyboardEvent) => e instanceof KeyboardEvent,
  'focus': (e: FocusEvent) => e instanceof FocusEvent,
  'blur': (e: FocusEvent) => e instanceof FocusEvent,
  'mousedown': (e: MouseEvent) => e instanceof MouseEvent,
  'mouseover': (e: MouseEvent) => e instanceof MouseEvent,
  'mouseleave': (e: MouseEvent) => e instanceof MouseEvent,
  'touchstart': (e: TouchEvent) => e instanceof TouchEvent,
  'shown': () => true,
  'hidden': () => true,
  'beforeShow': () => true,
  'beforeHide': () => true,
  'optionsSelected': () => true,
  'fetchOptionsSuccess': () => true,
  'fetchOptionsError': () => true,
  'update:modelValue': () => true,
})

const { localValue, clearValue } = useMultipleVModel(props, 'modelValue', props.multiple)
const {
  configuration,
  attributes,
  hasErrors,
  errors,
} = useConfiguration<RichSelectProps>(richSelectConfig, 'RichSelect', localValue)

// Base function for fetching options when url is provided
const fetchOptionsBaseFunction = (query?: string, nextPage?: number): FetchedOptions => {
  return useFetchData(configuration.fetchEndpoint, {
    query,
    page: nextPage || 1,
  }).then((data) => {
    return {
      results: data.data as Record<string, any>[],
      hasMorePages: data.data && data.next_page_url,
    }
  })
}

const prefetchOptionsBaseFunction = (currentValue: any) => {
  return useFetchData(configuration.fetchEndpoint, {
    values: currentValue,
  }).then((data) => {
    return data.data
  })
}

let fetchOptions = undefined as FetchOptionsFn | undefined
let preFetchOptions = undefined as PreFetchOptionsFn | boolean

if (typeof configuration.fetchOptions === 'undefined' && configuration.fetchEndpoint !== undefined) {
  fetchOptions = fetchOptionsBaseFunction
  preFetchOptions = prefetchOptionsBaseFunction
}
else {
  fetchOptions = configuration.fetchOptions
  preFetchOptions = configuration.prefetchOptions
}

const searchQuery = ref<string | undefined>(undefined)

const {
  normalizedOptions,
  flattenedOptions,
  fetchsOptions,
  needsMoreCharsToFetch,
  needsMoreCharsMessage,
  fetchingOptions,
  fetchingMoreOptions,
  fetchOptions: doFetchOptions,
  prefetchOptions: doPrefetchOptions,
  fetchMoreOptions,
  optionsWereFetched,
  fetchedOptionsHaveMorePages,
  fetchOptionsCancel,
} = useFetchsOptions(
  localValue,
  computed(() => configuration.options as InputOptions | undefined),
  computed(() => configuration.textAttribute),
  computed(() => configuration.valueAttribute),
  computed(() => configuration.normalizeOptions!),
  searchQuery,
  computed(() => fetchOptions),
  computed(() => preFetchOptions),
  computed(() => configuration.delay),
  computed(() => configuration.minimumInputLength),
  computed(() => configuration.minimumInputLengthText!),
)

const {
  selectedOption,
  hasSelectedOption,
  selectOption,
  toggleOption,
  optionIsSelected,
} = useSelectableOption(
  flattenedOptions,
  localValue,
  computed(() => configuration.multiple!),
  computed(() => configuration.clearable!),
)

const {
  activeOption,
  optionIsActive,
  setActiveOption,
  initActiveOption,
  setNextOptionActive,
  setPrevOptionActive,
} = useActivableOption(flattenedOptions, localValue)

const originalShown = ref(props.show)
const shown = refThrottled<boolean>(originalShown, 1000)
const slots = useSlots()

const showSearchInput = computed<boolean>(() => {
  if (configuration.hideSearchBox) {
    return false
  }

  if (configuration.minimumResultsForSearch !== undefined) {
    return (normalizedOptions.value.length >= configuration.minimumResultsForSearch)
  }

  return true
})

// Template Refs
const dropdownComponent = ref<{
  focus: () => void
  doShow: () => void
  doHide: () => void
  adjustPopper: () => Promise<void>
}>()

const triggerComponent = ref()
const dropdownContentComponent = ref()
const clearButtonComponent = ref()
const main = ref()

// Computed
const canFetchOptions: Ref<boolean> = computed(() => (
  fetchsOptions.value
  && optionsWereFetched.value
  && needsMoreCharsToFetch.value
))

const canPreFetchOptions: Ref<boolean> = computed(() => {
  // if (typeof preFetchOptions === 'function') {
  //   return optionsWereFetched.value
  // }
  // return canFetchOptions.value
  return preFetchOptions && !optionsWereFetched.value && (localValue.value !== null && !isEmpty(localValue.value))
})

const dropdownClasses: Ref<CSSRawClassesList> = computed(() => {
  const {
    enterActiveClass,
    enterFromClass,
    enterToClass,
    leaveActiveClass,
    leaveFromClass,
    leaveToClass,
    trigger,
    dropdown,
  } = configuration.classesList!

  return {
    trigger,
    dropdown,
    enterActiveClass,
    enterFromClass,
    enterToClass,
    leaveActiveClass,
    leaveFromClass,
    leaveToClass,
  }
})

const showClearButton: Ref<boolean> = computed(() => (hasSelectedOption.value && configuration.clearable === true && configuration.disabled !== true))

const focusDropdownTrigger = (): void => {
  if (configuration.toggleOnFocus) {
    return
  }
  dropdownComponent.value!.focus()
}

const usesTags = computed<boolean>(() => configuration.tags === true && configuration.multiple === true)

const hideDropdown = (): void => {
  shown.value = false
  dropdownComponent.value!.doHide()
}

const showDropdown = (): void => {
  shown.value = true
  dropdownComponent.value!.doShow()
}

const adjustDropdown = async (): Promise<void> => await dropdownComponent.value!.adjustPopper()

const toggleDropdown = (): void => {
  shown.value ? hideDropdown() : showDropdown()
}

const toggleOptionFromActiveOption = (): void => {
  if (activeOption.value === null) {
    return
  }
  toggleOption(activeOption.value as NormalizedOption)
}

const selectOptionFromActiveOption = (): void => {
  if (activeOption.value === null) {
    return
  }
  selectOption(activeOption.value as NormalizedOption)
}

// ---------------
// Event Handlers
// ---------------
const keydownDownHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)

  e.preventDefault()

  if (shown.value === false) {
    showDropdown()
    return
  }
  setNextOptionActive()

  const lastOption: NormalizedOption = normalizedOptions.value[normalizedOptions.value.length - 1]

  if (
    optionIsActive(lastOption)
    && fetchedOptionsHaveMorePages.value
    && !fetchingMoreOptions.value
  ) {
    fetchMoreOptions()
  }
}

const keydownUpHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)
  e.preventDefault()

  if (shown.value === false) {
    showDropdown()
    return
  }
  setPrevOptionActive()
}

const keydownEnterHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)

  if (shown.value) {
    toggleOptionFromActiveOption()
  }
}

const keydownSpaceHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)

  e.preventDefault()

  if (configuration.toggleOnClick && !shown.value) {
    showDropdown()
  }
  else if (shown.value) {
    toggleOptionFromActiveOption()
  }
}

const keydownEscHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)

  if (shown.value === false) {
    return
  }

  hideDropdown()

  focusDropdownTrigger()
}

const dropdownBottomReachedHandler = (): void => {
  if (fetchedOptionsHaveMorePages.value && !fetchingMoreOptions.value) {
    fetchMoreOptions()
  }
}

const onOptionSelected = (): void => {
  emit('input', new CustomEvent('input', {
    detail: localValue.value,
  }))

  emit('change', new CustomEvent('change', {
    detail: localValue,
  }))

  if (shown.value === false) {
    return
  }

  adjustDropdown()

  // If `closeOnSelect`  is not set hide the dropdown only when is not
  // multiple
  if (
    configuration.closeOnSelect === true

    // If `closeOnSelect`  is not set hide the dropdown only when is not
    // multiple
    || (configuration.closeOnSelect === undefined && !configuration.multiple)
  ) {
    hideDropdown()
    if (!configuration.toggleOnFocus) {
      focusDropdownTrigger()
    }
  }
}

const beforeHideHandler = (): void => {
  emit('beforeHide')
  if (configuration.selectOnClose && !isEqual(localValue, activeOption?.value)
  ) {
    selectOptionFromActiveOption()
  }
}

const shownHandler = (): void => {
  emit('shown')
  shown.value = true
}

const hiddenHandler = (): void => {
  emit('hidden')

  shown.value = false

  if (props.clearSearchOnClose) {
    searchQuery.value = undefined
  }
}

const beforeShowHandler = (): void => {
  emit('beforeShow')
  initActiveOption()
  if (canFetchOptions.value && !optionsWereFetched.value) {
    doFetchOptions()
  }
}

const mousedownHandler = (e: MouseEvent): void => {
  emit('mousedown', e)

  if (configuration.toggleOnClick) {
    // If it has as search box I need to prevent default to ensure the search
    // box keep focused
    if (showSearchInput.value && shown.value === false) {
       e.preventDefault()
    }

    toggleDropdown()
  }
}

const focusHandler = (e: FocusEvent): void => {
  emit('focus', e)

  if (configuration.toggleOnFocus) {
    showDropdown()
  }
}

const rootElementFocusHandler = (e: FocusEvent): void => {
  dropdownComponent.value?.focus()
}

const blurOnChildHandler = (e: FocusEvent): void => {
  const target = e.target as HTMLButtonElement | HTMLInputElement
  const relatedTarget = e.relatedTarget as HTMLElement | EventTarget
  const relatedTargetDataset: Data | undefined = relatedTarget instanceof HTMLElement ? relatedTarget.dataset : undefined

  if (
    target.dataset.richSelectFocusable !== undefined
    && relatedTargetDataset
    && relatedTargetDataset.richSelectFocusable === undefined
  ) {

    // TODO: need to check if we can remove this part
    // target.focus()
  }
}

const blurHandler = (e: FocusEvent): void => {
  emit('blur', e)
  if (shown.value) {
    hideDropdown()
  }
}

// ---------------
// Watchers
// ---------------

watch(() => localValue.value, () => onOptionSelected())

watch(() => selectedOption.value, () => {
  emit('optionsSelected', {
    options: selectedOption.value,
  })
})

onBeforeUnmount(() => fetchOptionsCancel())

onMounted(() => {
  if (canPreFetchOptions.value) {
    doPrefetchOptions()
  }
})

/**
 * Provided data
 */
provide('configuration_vanilla', configuration)

provide('options', normalizedOptions)

provide('selectedOption', selectedOption)

provide('hasSelectedOption', hasSelectedOption)

provide('toggleOption', toggleOption)

provide('setActiveOption', setActiveOption)

provide('optionIsSelected', optionIsSelected)

provide('optionIsActive', optionIsActive)

provide('keydownDownHandler', keydownDownHandler)

provide('keydownUpHandler', keydownUpHandler)

provide('keydownEscHandler', keydownEscHandler)

provide('keydownEnterHandler', keydownEnterHandler)

provide('shown', shown)

provide('clearable', configuration.clearable)

provide('showSearchInput', showSearchInput)

provide('slots', slots)

provide('searchQuery', searchQuery)

provide('needsMoreCharsToFetch', needsMoreCharsToFetch)

provide('needsMoreCharsMessage', needsMoreCharsMessage)

provide('fetchingOptions', fetchingOptions)

provide('fetchingMoreOptions', fetchingMoreOptions)

provide('dropdownBottomReachedHandler', dropdownBottomReachedHandler)

provide('usesTags', usesTags)

// Expose Public API
defineExpose({
  focusDropdownTrigger,
})

/**
 * @docs
 * @displayName VanillaRichSelect
 * @description A rich select component
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaRichSelect',
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="main"
    class="vanilla-rich-select"
    v-bind="attributes"
  >
    <div
      :class="configuration.classesList?.wrapper"
    >
      <div class="relative">
        <SimpleSelect
          v-model="localValue"
          :name="configuration.name"
          :fixed-classes="undefined"
          :classes="undefined"
          :multiple="configuration.multiple"
          :options="flattenedOptions"
          style="width: 0; opacity: 0; height: 0;"
          aria-hidden="true"
          :disabled="disabled"
          @focusin="rootElementFocusHandler"
        />

        <DropdownSimple
          ref="dropdownComponent"
          :disabled="configuration.disabled"
          :classes="dropdownClasses"
          :rounded="configuration.rounded"
          :fixed-classes="undefined"
          :toggle-on-focus="false"
          :toggle-on-click="false"
          :toggle-on-hover="false"
          :close-on-click-away="props.closeOnClickAway"
          :popper-options="configuration.dropdownPopperOptions"
          :placement="configuration.dropdownPlacement"
          :tag-name="usesTags ? 'div' : 'button'"
          :tabindex="usesTags && !hasSelectedOption ? 0 : undefined"
          :teleport="configuration.teleport"
          :teleport-to="configuration.teleportTo"
          :trap-focus="props.trapFocus"
          data-rich-select-focusable
          @mouseover="$emit('mouseover', $event)"
          @mouseleave="$emit('mouseleave', $event)"
          @touchstart="$emit('touchstart', $event)"
          @shown="shownHandler"
          @hidden="hiddenHandler"
          @before-show="beforeShowHandler"
          @before-hide="beforeHideHandler"
          @blur="blurHandler"
          @focus="focusHandler"
          @keydown.enter="keydownEnterHandler"
          @keydown.space="keydownSpaceHandler"
          @keydown.down="keydownDownHandler"
          @keydown.up="keydownUpHandler"
          @keydown.esc="keydownEscHandler"
          @mousedown="mousedownHandler"
          @blur-on-child="blurOnChildHandler"
        >
          <template #trigger="props">
            <RichSelectTrigger ref="triggerComponent">
              <template #selectorIcon="props">
                <slot
                  name="selectorIcon"
                  v-bind="props"
                />
              </template>
              <template #placeholder="props">
                <slot
                  name="placeholder"
                  v-bind="props"
                />
              </template>
              <template #label="props">
                <slot
                  name="label"
                  v-bind="props"
                />
              </template>
              <template #tagCloseIcon="props">
                <slot
                  name="tagCloseIcon"
                  v-bind="props"
                />
              </template>
              <template #tagLabel="props">
                <slot
                  name="tagLabel"
                  v-bind="props"
                />
              </template>
            </RichSelectTrigger>
          </template>

          <RichSelectDropdown ref="dropdownContentComponent">
            <template #option="props">
              <slot
                name="option"
                v-bind="props"
              />
            </template>
            <template #optionLabel="props">
              <slot
                name="optionLabel"
                v-bind="props"
              />
            </template>
            <template #optionIcon="props">
              <slot
                name="optionIcon"
                v-bind="props"
              />
            </template>
            <template #dropdownTop="props">
              <slot
                name="dropdownTop"
                v-bind="props"
              />
            </template>
            <template #dropdownBottom="props">
              <slot
                name="dropdownBottom"
                v-bind="props"
              />
            </template>
            <template #stateFeedback="props">
              <slot
                name="stateFeedback"
                v-bind="props"
              />
            </template>
          </RichSelectDropdown>
        </DropdownSimple>
        <slot name="right">
          <ClearButton
            v-if="showClearButton"
            ref="clearButtonComponent"
            @click="clearValue"
          >
            <template #clearButton="props">
              <slot
                name="clearButton"
                v-bind="props"
                :classes-list="configuration.classesList"
              />
            </template>
          </ClearButton>
        </slot>
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
      <!-- Feedback -->
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
  </div>
</template>
