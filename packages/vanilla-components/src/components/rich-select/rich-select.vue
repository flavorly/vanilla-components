<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, provide, ref } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import Dropdown from './partials/dropdown.vue'
import Trigger from './partials/trigger.vue'
import ClearButton from './partials/clear-button.vue'
import { richSelectClassesKeys, richSelectConfig } from './config'
import type { MinimumInputLengthTextProp, RichSelectClassesValidKeys, RichSelectProps, RichSelectValue } from './config'
import DropdownSimple, { validDropdownPlacements } from '@/components/dropdown/dropdown-simple.vue'
import SimpleSelect from '@/components/select/select.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import FormErrors from '@/components/forms/form-errors.vue'
import type {
    CSSRawClassesList,
    Data,
    FetchOptionsFn,
    InputOptions,
    Measure,
    NormalizedOption,
    PreFetchOptionsFn,
} from '@/core/types'
import { popperOptions, sameWidthModifier } from '@/core/config'
import { isEqual, throttle } from '@/core/helpers'
import {
    useActivableOption,
    useBootVariant,
    useConfiguration,
    useFetchsOptions,
    useMultipleVModel,
    useSelectableOption,
    useVariantProps,
} from '@/core/use'

export default defineComponent({
    components: {
        Trigger,
        Dropdown,
        DropdownSimple,
        SimpleSelect,
        ClearButton,
        FormErrors,
        FormFeedback,
    },
    props: {
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
            default: false,
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
            default: 'No options found',
        },
        searchingText: {
            type: String,
            default: 'Searching...',
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
            default: true,
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
            default: undefined,
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
            default: false,
        },
        teleportTo: {
            type: [String, Object] as PropType<string | HTMLElement>,
            default: 'body',
        },
    },
    emits: {
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
        'before-show': () => true,
        'before-hide': () => true,
        'fetch-options-success': () => true,
        'fetch-options-error': () => true,
        'update:modelValue': () => true,
    },
    setup(props, { emit }) {
        const { localValue, clearValue } = useMultipleVModel(
            props,
            'modelValue',
            props.multiple,
        )

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration, attributes } = useConfiguration<RichSelectProps>(richSelectConfig, richSelectClassesKeys)

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
            computed(() => configuration.fetchOptions),
            computed(() => configuration.prefetchOptions!),
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
        )

        const {
            activeOption,
            optionIsActive,
            setActiveOption,
            initActiveOption,
            setNextOptionActive,
            setPrevOptionActive,
        } = useActivableOption(flattenedOptions, localValue)

        const shown = ref<boolean>(false)

        const showSearchInput = computed<boolean>(() => {
            if (configuration.hideSearchBox) {
                return false
            }

            if (configuration.minimumResultsForSearch !== undefined) {
                return (
                    normalizedOptions.value.length
                    >= configuration.minimumResultsForSearch
                )
            }

            return true
        })

        /**
         * Dropdown component reference
         */
        const dropdownComponent = ref<{
            focus: () => void
            doShow: () => void
            doHide: () => void
            adjustPopper: () => Promise<void>
        }>()

        const focusDropdownTrigger = (): void => {
            dropdownComponent.value!.focus()
        }

        const usesTags = computed<boolean>(
            () => configuration.tags === true && configuration.multiple === true,
        )

        /**
         * Manage dropdown related methods
         */
        const hideDropdown = (): void => {
            dropdownComponent.value!.doHide()
        }

        const showDropdown = (): void => {
            dropdownComponent.value!.doShow()
        }

        const adjustDropdown = async (): Promise<void> => {
            await dropdownComponent.value!.adjustPopper()
        }

        const throttledShowDropdown = throttle(showDropdown, 200)

        const toggleDropdown = (): void => {
            if (shown.value) {
                hideDropdown()
            }
            else {
                throttledShowDropdown()
            }
        }

        /**
         * Active option handling
         */
        const toggleOptionFromActiveOption = (): void => {
            if (activeOption.value === null) {
                return
            }

            toggleOption(activeOption.value as NormalizedOption)
        }

        // Select the current active option
        const selectOptionFromActiveOption = (): void => {
            if (activeOption.value === null) {
                return
            }

            selectOption(activeOption.value as NormalizedOption)
        }

        /**
         * Event handlers
         */
        const keydownDownHandler = (e: KeyboardEvent): void => {
            emit('keydown', e)

            e.preventDefault()

            if (shown.value === false) {
                throttledShowDropdown()
            }
            else {
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
        }

        const keydownUpHandler = (e: KeyboardEvent): void => {
            emit('keydown', e)

            e.preventDefault()

            if (shown.value === false) {
                throttledShowDropdown()
            }
            else {
                setPrevOptionActive()
            }
        }

        const keydownEnterHandler = (e: KeyboardEvent): void => {
            emit('keydown', e)

            if (shown.value === true) {
                toggleOptionFromActiveOption()
            }
        }

        const keydownSpaceHandler = (e: KeyboardEvent): void => {
            emit('keydown', e)

            e.preventDefault()

            if (configuration.toggleOnClick && shown.value === false) {
                throttledShowDropdown()
            }
            else if (shown.value === true) {
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

        provide('showSearchInput', showSearchInput)

        provide('searchQuery', searchQuery)

        provide('needsMoreCharsToFetch', needsMoreCharsToFetch)

        provide('needsMoreCharsMessage', needsMoreCharsMessage)

        provide('fetchingOptions', fetchingOptions)

        provide('fetchingMoreOptions', fetchingMoreOptions)

        provide('dropdownBottomReachedHandler', dropdownBottomReachedHandler)

        provide('usesTags', usesTags)

        return {
            configuration,
            attributes,
            localValue,
            activeOption,
            hasSelectedOption,
            shown,
            dropdownComponent,
            hideDropdown,
            toggleDropdown,
            throttledShowDropdown,
            keydownDownHandler,
            keydownUpHandler,
            keydownSpaceHandler,
            keydownEnterHandler,
            keydownEscHandler,
            focusDropdownTrigger,
            optionIsSelected,
            initActiveOption,
            selectOption,
            selectOptionFromActiveOption,
            clearValue,
            doFetchOptions,
            doPrefetchOptions,
            adjustDropdown,
            fetchOptionsCancel,
            fetchsOptions,
            optionsWereFetched,
            needsMoreCharsToFetch,
            showSearchInput,
            flattenedOptions,
            usesTags,
            searchQuery,
            localErrors,
            hasErrors,
            localVariant,
        }
    },
    computed: {
        canFetchOptions(): boolean {
            return (
                this.fetchsOptions
                && !this.optionsWereFetched
                && !this.needsMoreCharsToFetch
            )
        },
        canPreFetchOptions(): boolean {
            if (typeof this.configuration.prefetchOptions === 'function') {
                return !this.optionsWereFetched
            }

            return this.canFetchOptions
        },
        dropdownClasses(): CSSRawClassesList {
            const {
                enterActiveClass,
                enterFromClass,
                enterToClass,
                leaveActiveClass,
                leaveFromClass,
                leaveToClass,
                trigger,
                dropdown,
            } = this.configuration.classesList!

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
        },
        showClearButton(): boolean {
            return (
                this.hasSelectedOption
                && this.configuration.clearable === true
                && this.configuration.disabled !== true
            )
        },
    },
    watch: {
        localValue(): void {
            this.onOptionSelected()
        },
    },
    created() {
        if (this.configuration.prefetchOptions && this.canPreFetchOptions) {
            this.doPrefetchOptions()
        }
    },
    beforeUnmount() {
        this.fetchOptionsCancel()
    },
    methods: {
        onOptionSelected(): void {
            this.$emit('input', new CustomEvent('input', {
                detail: this.localValue,
            }))

            this.$emit('change', new CustomEvent('change', {
                detail: this.localValue,
            }))

            if (this.shown === false) {
                return
            }

            this.adjustDropdown()

            if (
                this.configuration.closeOnSelect === true

                // If `closeOnSelect`  is not set hide the dropdown only when is not
                // multiple
                || (this.configuration.closeOnSelect === undefined
                    && !this.configuration.multiple)
            ) {
                this.hideDropdown()

                this.focusDropdownTrigger()
            }
        },
        beforeHideHandler(): void {
            this.$emit('before-hide')

            if (
                this.configuration.selectOnClose
                && !isEqual(this.localValue, this.activeOption?.value)
            ) {
                this.selectOptionFromActiveOption()
            }
        },
        shownHandler(): void {
            this.$emit('shown')

            this.shown = true
        },
        hiddenHandler(): void {
            this.$emit('hidden')

            this.shown = false

            if (this.clearSearchOnClose) {
                this.searchQuery = undefined
            }
        },
        beforeShowHandler(): void {
            this.$emit('before-show')

            this.initActiveOption()

            if (this.canFetchOptions) {
                this.doFetchOptions()
            }
        },
        mousedownHandler(e: MouseEvent): void {
            this.$emit('mousedown', e)

            if (this.configuration.toggleOnClick) {
                // If it has as search box I need to prevent default to ensure the search
                // box keep focused
                if (this.showSearchInput && this.shown === false) {
                    e.preventDefault()
                }

                this.toggleDropdown()
            }
        },
        focusHandler(e: FocusEvent): void {
            this.$emit('focus', e)

            if (this.configuration.toggleOnFocus) {
                this.throttledShowDropdown()
            }
        },
        blurOnChildHandler(e: FocusEvent): void {
            const target = e.target as HTMLButtonElement | HTMLInputElement
            const relatedTarget = e.relatedTarget as HTMLElement | EventTarget
            const relatedTargetDataset: Data | undefined = relatedTarget instanceof HTMLElement
                ? relatedTarget.dataset
                : undefined

            if (
                target.dataset.richSelectFocusable !== undefined
                && relatedTargetDataset
                && relatedTargetDataset.richSelectFocusable === undefined
            ) {
                target.focus()
            }
        },
        blurHandler(e: FocusEvent): void {
            this.$emit('blur', e)

            this.hideDropdown()
        },
    },
})
</script>

<template>
  <div
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
          style="display:none"
        />

        <DropdownSimple
          ref="dropdownComponent"
          :disabled="configuration.disabled"
          :classes="dropdownClasses"
          :fixed-classes="undefined"
          :toggle-on-focus="false"
          :toggle-on-click="false"
          :toggle-on-hover="false"
          :popper-options="configuration.dropdownPopperOptions"
          :placement="configuration.dropdownPlacement"
          :tag-name="usesTags ? 'div' : 'button'"
          :tabindex="usesTags && !hasSelectedOption ? 0 : undefined"
          :teleport="configuration.teleport"
          :teleport-to="configuration.teleportTo"
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
          <template #trigger>
            <Trigger ref="trigger">
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
            </Trigger>
          </template>

          <Dropdown ref="dropdown">
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
            <template #dropdownButton="props">
              <slot
                name="dropdownButton"
                v-bind="props"
              />
            </template>
            <template #stateFeedback="props">
              <slot
                name="stateFeedback"
                v-bind="props"
              />
            </template>
          </Dropdown>
        </DropdownSimple>

        <ClearButton
          v-if="showClearButton"
          ref="clearButton"
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
      </div>
      <slot
        name="errors"
        v-bind="{ hasErrors, localErrors }"
      >
        <FormErrors
          v-if="hasErrors && showErrors"
          :errors="localErrors"
        />
      </slot>
      <!-- Feedback -->
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
