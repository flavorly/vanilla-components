<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Options, Placement, Instance as PopperInstance } from '@popperjs/core'
import { createPopper as createPopperBase } from '@popperjs/core'
import { onClickOutside, refThrottled, useFocus } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import type { DebouncedFn } from '../../core/types'
import {
  debounce,
  elementIsTargetOrTargetChild,
  getFocusableElements,
  isTouchOnlyDevice as getIsTouch,
  isServer,
} from '../../core/helpers'
import Transitionable from '../misc/transitionable.vue'
import { dropdownConfig, dropdownPopperDefaultOptions, validDropdownPlacements } from './config'
import type { DropdownClassesValidKeys, DropdownExtendedProps } from './config'

/* eslint @typescript-eslint/no-use-before-define: ["off"] */

const props = defineProps({
  ...useVariantProps<DropdownExtendedProps, DropdownClassesValidKeys>(),
  modelValue: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  text: {
    type: String,
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
  hideOnLeaveTimeout: {
    type: Number,
    default: 250,
  },
  show: {
    type: Boolean,
    default: false,
  },
  trapFocus: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String as PropType<Placement>,
    default: undefined,
    validator: (value: Placement | string): boolean => validDropdownPlacements.includes(value),
  },
  popperOptions: {
    type: Object as PropType<Options>,
    default: (): Options => dropdownPopperDefaultOptions as Options,
  },
})

const emit = defineEmits({
  'update:show': (show: boolean) => true,
  'focus': (e: FocusEvent) => e instanceof FocusEvent,
  'blur': (e: FocusEvent) => e instanceof FocusEvent,
  'blurOnChild': (e: FocusEvent) => e instanceof FocusEvent,
  'click': (e: MouseEvent) => e instanceof MouseEvent,
  'mouseover': (e: MouseEvent) => e instanceof MouseEvent,
  'mouseleave': (e: MouseEvent) => e instanceof MouseEvent,
  'touchstart': (e: TouchEvent) => e instanceof TouchEvent,
  'shown': () => true,
  'hidden': () => true,
  'beforeShow': () => true,
  'beforeHide': () => true,
})

const localValue = useVModel(props, 'modelValue')
const { configuration, attributes } = useConfiguration<DropdownExtendedProps>(dropdownConfig, 'Dropdown', localValue)

// Refs
const isTouchOnlyDevice = ref<boolean>(false)
const originalShown = ref<boolean | undefined>(configuration.show)
const shown = refThrottled<boolean | undefined>(originalShown, 1000)
const initAsShow = ref<boolean | undefined>(configuration.show)
const hideTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const focusableElements = ref<Array<HTMLElement>>([])
const adjustingPopper = ref<boolean>(false)
const popperIsAdjusted = ref<boolean>(false)
const popperAdjusterListener = ref<null | DebouncedFn>(null)
const popper = ref<PopperInstance | null>(null)

// Template Refs
const dropdown = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const trigger = ref<HTMLButtonElement>() as Ref<HTMLButtonElement>
const root = ref<HTMLDivElement>() as Ref<HTMLDivElement>

// Watcher for Focus Trap
const { activate, deactivate } = useFocusTrap(dropdown, {
  setReturnFocus: trigger.value,
  returnFocusOnDeactivate: false,
  delayInitialFocus: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: true,
})
const { focused } = useFocus(trigger)

// Computed
const fullPopperOptions = computed((): Options => {
  const popperOptions = configuration.popperOptions as Options

  if (configuration.placement !== undefined) {
    popperOptions.placement = configuration.placement
  }
  return popperOptions
})

const shouldShowWhenClicked = computed((): boolean => isTouchOnlyDevice.value && (configuration.toggleOnFocus === true || configuration.toggleOnHover === true))

// Methods
/** Checks if the target is child */
const targetIsChild = (target: EventTarget | null): boolean => {
  return elementIsTargetOrTargetChild(target, dropdown.value) || elementIsTargetOrTargetChild(target, trigger.value)
}

/** When dropdown being shown */
const onShown = (): void => {
  if (isServer()) {
    return
  }

  emit('shown')
  emit('update:show', true)

  if (isTouchOnlyDevice.value) {
    window.addEventListener('touchstart', touchstartHandler)
  }
  else {
    addBlurListenersToChildElements()
  }
}

/** When dropdown being hidden */
const onHidden = (): void => {
  if (isServer()) {
    return
  }

  emit('hidden')
  emit('update:show', false)

  if (isTouchOnlyDevice.value) {
    window.removeEventListener('touchstart', touchstartHandler)
    return
  }
  removeBlurListenersFromChildElements()
}

/** Before being shown */
const onBeforeShown = (): void => {
  if (isServer()) {
    return
  }

  emit('beforeShow')
  if (isTouchOnlyDevice.value) {
    window.addEventListener('touchstart', touchstartHandler)
  }
}

/** Before being hidden */
const onBeforeHide = (): void => {
  if (isServer()) {
    return
  }
  emit('beforeHide')
  if (isTouchOnlyDevice.value) {
    window.removeEventListener('touchstart', touchstartHandler)
  }
}

/** Show Dropdown */
const doShow = async (): Promise<void> => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }

  onBeforeShown()

  await updatePopper()

  if (!shown.value) {
    shown.value = true
  }

  await nextTick().then(() => {
    if (props.trapFocus) {
      try {
        activate()
      }
      catch (e) {}
    }

    onShown()
  })
}

/** Hide Dropdown */
const doHide = async (): Promise<void> => {
  onBeforeHide()

  shown.value = false

  await nextTick().then(() => {
    if (props.trapFocus) {
      try {
        deactivate()
      }
      catch (e) {}
    }
    onHidden()
    focused.value = true
  })
}

/** Toggle Hide/Show Dropdown */
const doToggle = (): void => {
  if (!shown.value) {
    doShow()
  }
  else {
    doHide()
  }
}

/** On Blur Handler */
const blurHandler = (e: FocusEvent): void => {
  const isChild = targetIsChild(e.relatedTarget)

  if (!isChild) {
    if (props.closeOnClickAway) {
      emit('blur', e)
    }
  }
  else {
    emit('blurOnChild', e)
  }

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnFocus && !isChild) {
    if (props.closeOnClickAway) {
      doHide()
    }
  }
}

/** Add the Blur Event Listeners to the Child Elements */
const addBlurListenersToChildElements = (): void => {
  focusableElements.value = getFocusableElements(dropdown.value)
  focusableElements.value.forEach(element => element.addEventListener('blur', blurHandler))
}

/** Remove the Blur Event Listeners to the Child Elements */
const removeBlurListenersFromChildElements = (): void => {
  focusableElements.value.forEach(element => element.removeEventListener('blur', blurHandler))
  focusableElements.value = []
}

/** Focus the trigger button */
const focus = (): void => trigger.value?.focus()

/** When the transition is leaving, we will remove the visibility */
const dropdownAfterLeaveAnimation = (): void | string => trigger.value?.style.removeProperty('visibility')

/** Popper : Create Instance */
const createPopper = (): Promise<PopperInstance> => {
  let popper: PopperInstance

  return new Promise((resolve) => {
    const popperOptions = fullPopperOptions.value

    const originalOnFirstUpdate = popperOptions.onFirstUpdate

    popperOptions.onFirstUpdate = async (arg) => {
      if (originalOnFirstUpdate) {
        originalOnFirstUpdate(arg)
      }

      resolve(popper)
    }

    popper = createPopperBase(
      trigger.value,
      dropdown.value,
      fullPopperOptions.value,
    )
  })
}

/** Popper : Adjust the position */
const adjustPopper = async (): Promise<void> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (shown.value === false && !adjustingPopper.value) {
      popperIsAdjusted.value = false
      resolve()
      return
    }

    if (!popper.value) {
      popper.value = await createPopper()
    }

    await popper.value?.update()

    resolve()
  })
}

/** Popper : Update the instance */
const updatePopper = (): Promise<void> => {
// eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (popperIsAdjusted.value) {
      resolve()
      return
    }

    // So it appears in the DOM so it can be adjusted
    adjustingPopper.value = true

    await nextTick()

    await adjustPopper()

    // after adjusted it removes the dropdown from the DOM
    adjustingPopper.value = false

    await nextTick()

    // Once removed it can be marked as adjusted so we can enable the
    // CSS transitions
    popperIsAdjusted.value = true

    await nextTick()

    resolve()
  })
}

/** Popper : On resize or scroll, we need to re-adjust */
const enablePopperNeedsAdjustmentListener = (): void => {
  if (isServer()) {
    return
  }
  window.addEventListener('resize', popperAdjusterListener.value!)
  window.addEventListener('scroll', popperAdjusterListener.value!)
}

/** Popper : On resize or scroll, remove the listeners */
const disablePopperNeedsAdjustmentListener = (): void => {
  if (isServer()) {
    return
  }
  window.removeEventListener('resize', popperAdjusterListener.value!)
  window.removeEventListener('scroll', popperAdjusterListener.value!)
  popperAdjusterListener.value?.cancel()
}

/** On clicking the trigger button, show the dropdown but with throttling */
const clickHandler = (e: MouseEvent): void => {
  emit('click', e)
  if (configuration.toggleOnClick) {
    doToggle()
  }
  else if (shouldShowWhenClicked.value) {
    doShow()
  }
}

/** Handler : On Focus toggle the dropdown */
const focusHandler = (e: FocusEvent): void => {
  emit('focus', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnFocus) {
      doToggle()
  }
}

/** Handler : On Mouse over, we should show the dropdown if its enabled */
const mouseoverHandler = (e: MouseEvent): void => {
  emit('mouseover', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnHover) {
    doShow()
  }
}

/** Handler : On Mouse Leave, we should hide the dropdown if its enabled */
const mouseleaveHandler = (e: MouseEvent): void => {
  emit('mouseleave', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnHover && !targetIsChild(e.relatedTarget)) {
    hideAfterTimeout()
  }
}

/** Handler : On touching hide the dropdown */
const touchstartHandler = (e: TouchEvent): void => {
  emit('touchstart', e)

  if (Array.from(e.targetTouches).some(touch => targetIsChild(touch.target))) {
    return
  }

  if (configuration.toggleOnFocus || configuration.toggleOnHover) {
    doHide()
  }
}

const keydownEscHandler = (e: KeyboardEvent): void => {
  emit('keydown', e)

  if (shown.value === false) {
    return
  }
  doHide()
}

/** Hide the dropdown after a certain timeout */
const hideAfterTimeout = (): void => {
  if (!configuration.hideOnLeaveTimeout) {
    doHide()
    return
  }

  hideTimeout.value = setTimeout(() => {
      doHide()
      hideTimeout.value = null
    },
    configuration.hideOnLeaveTimeout,
  )
}

// Watchers
watch(() => popperIsAdjusted.value, (adjustedInto: boolean) => {
  adjustedInto ? enablePopperNeedsAdjustmentListener() : disablePopperNeedsAdjustmentListener()
})

watch(() => configuration.show, (isShowing: boolean | undefined) => {
  isShowing ? doShow() : doHide()
})

// Hooks
onMounted(() => {
  if (isServer()) {
    return
  }

  isTouchOnlyDevice.value = getIsTouch()
  if (isTouchOnlyDevice.value && shown.value) {
    window.addEventListener('touchstart', touchstartHandler)
  }

  if (configuration.show) {
    updatePopper().then(() => {
      initAsShow.value = false
    })
  }
})

onBeforeUnmount(() => {
  if (isServer()) {
    return
  }

  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }

  disablePopperNeedsAdjustmentListener()

  if (isTouchOnlyDevice.value && shown.value) {
    window.removeEventListener('touchstart', touchstartHandler)
  }
})

// This is required, because on mobile, the blur doesnt always trigger
// Headless ui does something similar, by trapping & also listening events
// This also prevents the teleport from being considered a click outside.
onClickOutside(root, () => {
  if (props.closeOnClickAway && shown.value) {
      doHide()
  }
}, {
  ignore: [
    root,
    trigger,
    dropdown,
  ],
  detectIframe: true,
})

// Rest of the setup
popperAdjusterListener.value = debounce(() => popperIsAdjusted.value = false, 200)

/** Expose component Internal Methods to other components */
defineExpose({
  doShow,
  doHide,
  adjustPopper,
  focus,
  shown,
})

defineOptions({
  name: 'VanillaDropdown',
  inheritAttrs: false,
})

/**
 * @docs
 * @displayName VanillaDropdown
 * @description A dropdown component
 **/
</script>

<template>
  <div
    ref="root"
    class="dropdown"
  >
    <component
      :is="tagName"
      ref="trigger"
      :type="tagName === 'button' ? 'button' : undefined"
      :aria-expanded="shown"
      :class="[
        configuration.classesList?.trigger,
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
        :classes-list="configuration.classesList"
        @after-leave="dropdownAfterLeaveAnimation"
      >
        <component
          :is="dropdownTagName"
          v-show="shown || adjustingPopper || initAsShow"
          ref="dropdown"
          :style="adjustingPopper ? 'opacity:0' : undefined"
          :class="configuration.classesList?.dropdown"
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
  </div>
</template>
