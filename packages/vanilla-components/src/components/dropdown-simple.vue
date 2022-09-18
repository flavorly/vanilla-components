<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import type { Options, Placement, Instance as PopperInstance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'

import {
    debounce,
    elementIsTargetOrTargetChild,
    getFocusableElements,
    isTouchOnlyDevice as getIsTouch,
    throttle,
} from '../core/helpers'

import type { DebouncedFn } from '../core/types'

import { useBootVariant, useConfigurationWithClassesList, useVModel, useVariantPropsWithClassesList } from '../core'

import Transitionable from './misc/transitionable.vue'
import {
    VanillaDropdownClassesKeys,
    VanillaDropdownConfig,
    VanillaDropdownPopperDefaultOptions as defaultPopperOptions,
} from './dropdown'
import type {
    VanillaDropdownClassesValidKeys,
    VanillaDropdownExtendedProps,
} from './dropdown'

export const validDropdownPlacements = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
]

export default defineComponent({
    components: {
        Transitionable,
    },
    inheritAttrs: false,
    props: {
        ...useVariantPropsWithClassesList<VanillaDropdownExtendedProps, VanillaDropdownClassesValidKeys>(),
        text: {
            type: String,
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
        tagName: {
            type: String,
            default: 'button',
        },
        dropdownTagName: {
            type: String,
            default: 'div',
        },
        dropdownAttributes: {
            type: Object,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: undefined,
        },
        toggleOnFocus: {
            type: Boolean,
            default: true,
        },
        toggleOnClick: {
            type: Boolean,
            default: true,
        },
        toggleOnHover: {
            type: Boolean,
            default: false,
        },
        hideOnLeaveTimeout: {
            type: Number,
            default: 250,
        },
        show: {
            type: Boolean,
            default: false,
        },
        placement: {
            type: String as PropType<Placement>,
            default: undefined,
            validator: (value: Placement | string): boolean => validDropdownPlacements.includes(value),
        },
        popperOptions: {
            type: Object as PropType<Options>,
            default: (): Options => defaultPopperOptions as Options,
        },
    },
    emits: {
        'update:show': (show: boolean) => typeof show === 'boolean',
        'focus': (e: FocusEvent) => e instanceof FocusEvent,
        'blur': (e: FocusEvent) => e instanceof FocusEvent,
        'blur-on-child': (e: FocusEvent) => e instanceof FocusEvent,
        'click': (e: MouseEvent) => e instanceof MouseEvent,
        'mouseover': (e: MouseEvent) => e instanceof MouseEvent,
        'mouseleave': (e: MouseEvent) => e instanceof MouseEvent,
        'touchstart': (e: TouchEvent) => e instanceof TouchEvent,
        'shown': () => true,
        'hidden': () => true,
        'before-show': () => true,
        'before-hide': () => true,
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue')
        const { localVariant } = useBootVariant(props, 'errors', localValue)

        const { configuration, attributes } = useConfigurationWithClassesList<VanillaDropdownExtendedProps>(
            VanillaDropdownConfig,
            VanillaDropdownClassesKeys,
            localVariant,
        )

        const isTouchOnlyDevice = ref<boolean>(false)

        onMounted(() => {
            isTouchOnlyDevice.value = getIsTouch()
        })

        return {
            configuration,
            attributes,
            isTouchOnlyDevice,
        }
    },
    data({ configuration }) {
        return {
            shown: (configuration as unknown as VanillaDropdownExtendedProps).show,

            // Disables the animation while the dropdown is being shown
            initAsShow: (configuration as unknown as VanillaDropdownExtendedProps).show,
            hideTimeout: null as ReturnType<typeof setTimeout> | null,
            focusableElements: [] as Array<HTMLElement>,
            throttledToggle: null as null | (() => void),
            adjustingPopper: false,
            popperIsAdjusted: false,
            popperAdjusterListener: null as null | DebouncedFn,
            popper: null as PopperInstance | null,
        }
    },
    computed: {
        fullPopperOptions(): Options {
            const popperOptions = this.configuration.popperOptions as Options

            if (this.configuration.placement !== undefined) {
                popperOptions.placement = this.configuration.placement
            }

            return popperOptions
        },
        shouldShowWhenClicked(): boolean {
            return this.isTouchOnlyDevice
                && (this.configuration.toggleOnFocus === true || this.configuration.toggleOnHover === true)
        },
    },
    watch: {
        popperIsAdjusted(popperIsAdjusted: boolean): void {
            if (popperIsAdjusted) {
                this.enablePopperNeedsAdjustmentListener()
            }
 else {
                this.disablePopperNeedsAdjustmentListener()
            }
        },
        'configuration.show': function configurationShowWatch(show: boolean): void {
            if (show) {
                this.doShow()
            }
 else {
                this.doHide()
            }
        },
    },
    mounted() {
        if (this.isTouchOnlyDevice && this.shown) {
            window.addEventListener('touchstart', this.touchstartHandler)
        }

        if (this.configuration.show) {
            this.updatePopper().then(() => {
                this.initAsShow = false
            })
        }
    },
    created() {
        this.throttledToggle = throttle(this.doToggle, 200)

        this.popperAdjusterListener = debounce(() => {
            this.popperIsAdjusted = false
        }, 200)
    },
    beforeUnmount() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.disablePopperNeedsAdjustmentListener()

        if (this.isTouchOnlyDevice && this.shown) {
            window.removeEventListener('touchstart', this.touchstartHandler)
        }
    },
    methods: {
        focus(): void {
            this.getTriggerElement().focus()
        },
        onShown(): void {
            this.$emit('shown')

            this.$emit('update:show', true)

            if (this.isTouchOnlyDevice) {
                window.addEventListener('touchstart', this.touchstartHandler)
            }
 else {
                this.addBlurListenersToChildElements()
            }
        },
        onHidden(): void {
            this.$emit('hidden')

            this.$emit('update:show', false)

            if (this.isTouchOnlyDevice) {
                window.removeEventListener('touchstart', this.touchstartHandler)
            }
 else {
                this.removeBlurListenersFromChildElements()
            }
        },
        onBeforeShown(): void {
            this.$emit('before-show')
            if (this.isTouchOnlyDevice) {
                window.addEventListener('touchstart', this.touchstartHandler)
            }
        },
        onBeforeHide(): void {
            this.$emit('before-hide')
            if (this.isTouchOnlyDevice) {
                window.removeEventListener('touchstart', this.touchstartHandler)
            }
        },
        addBlurListenersToChildElements(): void {
            const dropdown = this.getDropdownElement()

            this.focusableElements = getFocusableElements(dropdown)
            this.focusableElements.forEach(element => element.addEventListener('blur', this.blurHandler))
        },
        removeBlurListenersFromChildElements(): void {
            this.focusableElements.forEach(element => element.removeEventListener('blur', this.blurHandler))
            this.focusableElements = []
        },
        dropdownAfterLeave(): void {
            this.getDropdownElement().style.removeProperty('visibility')
        },
        async adjustPopper(): Promise<void> {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                if (this.shown === false && this.adjustingPopper === false) {
                    this.popperIsAdjusted = false
                    resolve()
                    return
                }

                if (!this.popper) {
                    this.popper = await this.createPopper()
                }

                await this.popper.update()

                resolve()
            })
        },
        updatePopper(): Promise<void> {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                if (this.popperIsAdjusted) {
                    resolve()
                    return
                }

                // So it appears in the DOM so it can be adjusted
                this.adjustingPopper = true

                await this.$nextTick()

                await this.adjustPopper()

                // after adjusted it removes the dropdown from the DOM
                this.adjustingPopper = false

                await this.$nextTick()

                // Once removed it can be marked as adjusted so we can enable the
                // CSS transitions
                this.popperIsAdjusted = true

                await this.$nextTick()

                resolve()
            })
        },
        createPopper(): Promise<PopperInstance> {
            let popper: PopperInstance

            return new Promise((resolve) => {
                const popperOptions = this.fullPopperOptions

                const originalOnFirstUpdate = popperOptions.onFirstUpdate

                popperOptions.onFirstUpdate = async (arg) => {
                    if (originalOnFirstUpdate) {
                        originalOnFirstUpdate(arg)
                    }

                    resolve(popper)
                }

                popper = createPopper(this.getTriggerElement(), this.getDropdownElement(), this.fullPopperOptions)
            })
        },
        enablePopperNeedsAdjustmentListener(): void {
            window.addEventListener('resize', this.popperAdjusterListener!)

            window.addEventListener('scroll', this.popperAdjusterListener!)
        },
        disablePopperNeedsAdjustmentListener(): void {
            window.removeEventListener('resize', this.popperAdjusterListener!)

            window.removeEventListener('scroll', this.popperAdjusterListener!)

            this.popperAdjusterListener!.cancel()
        },
        getDropdownElement(): HTMLDivElement {
            const { dropdown } = this.$refs
            return dropdown as HTMLDivElement
        },
        getTriggerElement(): HTMLButtonElement {
            const { trigger } = this.$refs
            return trigger as HTMLButtonElement
        },
        doToggle(): void {
            if (!this.shown) {
                this.doShow()
            }
 else {
                this.doHide()
            }
        },
        async doShow(): Promise<void> {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout)
            }

            this.onBeforeShown()

            await this.updatePopper()

            this.shown = true

            await this.$nextTick()

            this.onShown()
        },
        async doHide(): Promise<void> {
            this.onBeforeHide()

            this.shown = false

            await this.$nextTick()

            this.onHidden()
        },
        clickHandler(e: MouseEvent): void {
            this.$emit('click', e)

            if (this.configuration.toggleOnClick) {
                this.throttledToggle!()
            }
 else if (this.shouldShowWhenClicked) {
                this.doShow()
            }
        },
        focusHandler(e: FocusEvent): void {
            this.$emit('focus', e)

            if (this.isTouchOnlyDevice) {
                return
            }

            if (this.configuration.toggleOnFocus) {
                this.throttledToggle!()
            }
        },
        blurHandler(e: FocusEvent): void {
            const isChild = this.targetIsChild(e.relatedTarget)

            if (!isChild) {
                this.$emit('blur', e)
            }
 else {
                this.$emit('blur-on-child', e)
            }

            if (this.isTouchOnlyDevice) {
                return
            }

            if (this.configuration.toggleOnFocus && !isChild) {
                this.doHide()
            }
        },
        targetIsChild(target: EventTarget | null): boolean {
            return elementIsTargetOrTargetChild(target, this.getDropdownElement())
                || elementIsTargetOrTargetChild(target, this.getTriggerElement())
        },
        mouseoverHandler(e: MouseEvent): void {
            this.$emit('mouseover', e)

            if (this.isTouchOnlyDevice) {
                return
            }

            if (this.configuration.toggleOnHover) {
                this.doShow()
            }
        },
        mouseleaveHandler(e: MouseEvent): void {
            this.$emit('mouseleave', e)

            if (this.isTouchOnlyDevice) {
                return
            }

            if (this.configuration.toggleOnHover && !this.targetIsChild(e.relatedTarget)) {
                this.hideAfterTimeout()
            }
        },
        touchstartHandler(e: TouchEvent) {
            this.$emit('touchstart', e)

            if (Array.from(e.targetTouches).some(touch => this.targetIsChild(touch.target))) {
                return
            }

            if (this.configuration.toggleOnFocus || this.configuration.toggleOnHover) {
                this.doHide()
            }
        },
        hideAfterTimeout(): void {
            if (!this.configuration.hideOnLeaveTimeout) {
                this.doHide()
            }
 else {
                this.hideTimeout = setTimeout(() => {
                    this.doHide()
                    this.hideTimeout = null
                }, this.configuration.hideOnLeaveTimeout)
            }
        },
    },
})
</script>

<template>
  <component
    :is="tagName"
    ref="trigger"
    :type="tagName === 'button' ? 'button' : undefined"
    :aria-expanded="shown"
    :class="configuration.classes?.trigger"
    :disabled="configuration.disabled"
    v-bind="{ ...attributes, ...$attrs }"
    @click="clickHandler"
    @focus="focusHandler"
    @blur="blurHandler"
    @mouseover="mouseoverHandler"
    @mouseleave="mouseleaveHandler"
  >
    <slot
      :configuration="configuration"
      :is-show="shown"
      :popper="popper"
      name="trigger"
    >
      {{ configuration.text }}
    </slot>
  </component>

  <teleport
    :to="configuration.teleportTo"
    :disabled="!configuration.teleport"
  >
    <Transitionable
      :enabled="popperIsAdjusted || !initAsShow"
      :classes-list="configuration.classes"
      @after-leave="dropdownAfterLeave"
    >
      <component
        :is="dropdownTagName"
        v-show="shown || adjustingPopper || initAsShow"
        ref="dropdown"
        :style="adjustingPopper ? 'opacity:0' : undefined"
        :class="configuration.classes?.dropdown"
        :aria-hidden="!shown"
        tabindex="-1"
        v-bind="dropdownAttributes"
        @blur="blurHandler"
        @mouseover="mouseoverHandler"
        @mouseleave="mouseleaveHandler"
      >
        <slot
          :show="doShow"
          :hide="doHide"
          :toggle="doToggle"
          :configuration="configuration"
          :popper="popper"
        />
      </component>
    </Transitionable>
  </teleport>
</template>
