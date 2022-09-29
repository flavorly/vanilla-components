<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Options, Placement, Instance as PopperInstance } from '@popperjs/core'
import { createPopper as createPopperBase } from '@popperjs/core'
import { dropdownConfig, dropdownPopperDefaultOptions, validDropdownPlacements } from './config'
import type { DropdownClassesValidKeys, DropdownExtendedProps } from './config'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import Transitionable from '@/components/misc/transitionable.vue'
import type { DebouncedFn } from '@/core/types'
import { debounce, elementIsTargetOrTargetChild, getFocusableElements, isTouchOnlyDevice as getIsTouch, throttle } from '@/core/helpers'
import { NormalizedOption } from '@/core/types'

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
    default: (): Options => dropdownPopperDefaultOptions as Options,
  },
})

const emit = defineEmits({
  'update:show': (show: boolean) => typeof show === 'boolean',
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
const isTouchOnlyDevice = ref<boolean>(false)
const shown = ref((configuration as unknown as DropdownExtendedProps).show)
const initAsShow = ref((configuration as unknown as DropdownExtendedProps).show)
const hideTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const focusableElements = ref<Array<HTMLElement>>([])
const throttledToggle = ref<null | (() => void)>(null)
const adjustingPopper = ref<boolean>(false)
const popperIsAdjusted = ref<boolean>(false)
const popperAdjusterListener = ref<null | DebouncedFn>(null)
const popper = ref<PopperInstance | null>(null)
const dropdown = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const trigger = ref<HTMLButtonElement>() as Ref<HTMLButtonElement>

const fullPopperOptions = computed<Options>(() => {
  const popperOptions = configuration.popperOptions as Options
  if (configuration.placement !== undefined) {
    popperOptions.placement = configuration.placement
  }
  return popperOptions
})

const shouldShowWhenClicked = computed<boolean>(() => isTouchOnlyDevice.value && (configuration.toggleOnFocus === true || configuration.toggleOnHover === true))

// Methods

const focus = (): void => trigger.value?.focus()

const onShown = (): void => {
  emit('shown')
  emit('update:show', true)

  if (isTouchOnlyDevice.value) {
    window.addEventListener('touchstart', touchstartHandler)
  }
  else {
    addBlurListenersToChildElements()
  }
}

const onHidden = (): void => {
  emit('hidden')
  emit('update:show', false)

  if (isTouchOnlyDevice.value) {
    window.removeEventListener('touchstart', touchstartHandler)
    return
  }
  removeBlurListenersFromChildElements()
}

const onBeforeShown = (): void => {
  emit('beforeShow')
  if (isTouchOnlyDevice.value) {
    window.addEventListener('touchstart', touchstartHandler)
  }
}

const onBeforeHide = (): void => {
  emit('beforeHide')
  if (isTouchOnlyDevice.value) {
    window.removeEventListener('touchstart', touchstartHandler)
  }
}

const addBlurListenersToChildElements = (): void => {
  const dropdown = trigger.value!
  focusableElements.value = getFocusableElements(dropdown)
  focusableElements.value.forEach(element => element.addEventListener('blur', blurHandler))
}

const removeBlurListenersFromChildElements = (): void => {
  focusableElements.value.forEach(element => element.removeEventListener('blur', blurHandler))
  focusableElements.value = []
}

const dropdownAfterLeave = (): void => {
  trigger.value?.style.removeProperty('visibility')
}

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

const enablePopperNeedsAdjustmentListener = (): void => {
  window.addEventListener('resize', popperAdjusterListener.value!)
  window.addEventListener('scroll', popperAdjusterListener.value!)
}

const disablePopperNeedsAdjustmentListener = (): void => {
  window.removeEventListener('resize', popperAdjusterListener.value!)
  window.removeEventListener('scroll', popperAdjusterListener.value!)
  popperAdjusterListener.value?.cancel()
}

const doToggle = (): void => {
  if (!shown.value) {
    doShow()
  }
  else {
    doHide()
  }
}

const doShow = async (): Promise<void> => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }

  onBeforeShown()

  await updatePopper()

  shown.value = true

  await nextTick()

  onShown()
}

const doHide = async (): Promise<void> => {
  onBeforeHide()

  shown.value = false

  await nextTick()

  onHidden()
}

const targetIsChild = (target: EventTarget | null): boolean => {
  return elementIsTargetOrTargetChild(target, dropdown.value) || elementIsTargetOrTargetChild(target, trigger.value)
}

const clickHandler = (e: MouseEvent): void => {
  emit('click', e)
  if (configuration.toggleOnClick) {
    throttledToggle.value!()
  }
  else if (shouldShowWhenClicked.value) {
   doShow()
  }
}

const focusHandler = (e: FocusEvent): void => {
  emit('focus', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnFocus) {
    throttledToggle.value!()
  }
}

const blurHandler = (e: FocusEvent): void => {
  const isChild = targetIsChild(e.relatedTarget)

  if (!isChild) {
    emit('blur', e)
  }
  else {
    emit('blurOnChild', e)
  }

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnFocus && !isChild) {
    doHide()
  }
}

const mouseoverHandler = (e: MouseEvent): void => {
  emit('mouseover', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnHover) {
    doShow()
  }
}

const mouseleaveHandler = (e: MouseEvent): void => {
  emit('mouseleave', e)

  if (isTouchOnlyDevice.value) {
    return
  }

  if (configuration.toggleOnHover && !targetIsChild(e.relatedTarget)) {
    hideAfterTimeout()
  }
}

const touchstartHandler = (e: TouchEvent): void => {
  emit('touchstart', e)

  if (Array.from(e.targetTouches).some(touch => targetIsChild(touch.target))) {
    return
  }

  if (configuration.toggleOnFocus || configuration.toggleOnHover) {
    doHide()
  }
}

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

// Hooks
onMounted(() => {
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

watch(() => popperIsAdjusted.value, (value: boolean) => {
  if (value) {
    enablePopperNeedsAdjustmentListener()
    return
  }
  disablePopperNeedsAdjustmentListener()
})

watch(() => configuration.show, (isShown) => {
  if (isShown) {
    doShow()
  }
  doHide()
})

onBeforeUnmount(() => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }

  disablePopperNeedsAdjustmentListener()

  if (isTouchOnlyDevice.value && shown.value) {
    window.removeEventListener('touchstart', touchstartHandler)
  }
})

throttledToggle.value = throttle(doToggle, 200)

popperAdjusterListener.value = debounce(() => {
  popperIsAdjusted.value = false
}, 200)

defineExpose({
  doShow,
  doHide,
  adjustPopper,
  focus,
  shown,
})
</script>

<template>
  <component
    :is="tagName"
    ref="trigger"
    :type="tagName === 'button' ? 'button' : undefined"
    :aria-expanded="shown"
    :class="[
      configuration.classes?.trigger,
      rounded === 'full' ? configuration.classesList.roundedFull : '',
      rounded === 'top' ? configuration.classesList.roundedTop : '',
      rounded === 'bottom' ? configuration.classesList.roundedBottom : '',
      rounded === 'left' ? configuration.classesList.roundedLeft : '',
      rounded === 'right' ? configuration.classesList.roundedRight : '',
      rounded === 'top-left' ? configuration.classesList.roundedTopLeft : '',
      rounded === 'top-right' ? configuration.classesList.roundedTopRight : '',
      rounded === 'bottom-left' ? configuration.classesList.roundedBottomLeft : '',
      rounded === 'bottom-right' ? configuration.classesList.roundedBottomRight : '',
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
      :classes-list="configuration.classes"
      @after-leave="dropdownAfterLeave"
    >
      <component
        :is="dropdownTagName"
        v-show="shown || adjustingPopper || initAsShow"
        ref="dropdown"
        :style="adjustingPopper ? 'opacity:0' : undefined"
        :class="[
          configuration.classesList?.dropdown,
        ]"
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
