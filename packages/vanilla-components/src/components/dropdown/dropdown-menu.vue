<script setup lang="ts">
  import type { ComponentPublicInstance, PropType, Ref } from 'vue'
  import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
  import type { Options, Placement } from '@popperjs/core'
  import { createPopper, hide } from '@popperjs/core'
  import type { Instance as PopperInstance } from '@popperjs/core/lib/types'
  import { Menu as HeadlessMenu, MenuButton, MenuItems } from '@headlessui/vue'
  import { onClickOutside } from '@vueuse/core'
  import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
  import { throttle } from '../../core/helpers'
  import { validPlacements } from '../../core/config'
  import Button from '../button/button.vue'
  import Transitionable from '../misc/transitionable.vue'
  import { dropdownConfig, dropdownPopperDefaultOptions } from './config'
  import type { DropdownClassesValidKeys, DropdownProps } from './config'
  import ChevronDownIcon from '~icons/heroicons/chevron-down-solid'

  const props = defineProps({
    ...useVariantProps<DropdownProps, DropdownClassesValidKeys>(),
    modelValue: {
      type: [Boolean] as PropType<boolean>,
      default: false,
    },
    text: {
      type: String,
      default: undefined,
    },
    buttonVariant: {
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
      default: 'div',
    },
    dropdownTagName: {
      type: String,
      default: 'div',
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
    closeOnClickAway: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String as PropType<Placement>,
      default: undefined,
      validator: (value: Placement | string): boolean => validPlacements.includes(value),
    },
    popperOptions: {
      type: Object as PropType<Options>,
      default: (): Options => dropdownPopperDefaultOptions as Options,
    },
    usePopper: {
      type: Boolean,
      default: true,
    },
    overlay: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    spacedItems: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    showArrow: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    size: {
      type: [String] as PropType<string>,
      default: 'default',
      validator(value: string) {
        return ['none', 'small', 'default', 'medium', 'large', 'extra-large', 'super-large', 'full-width'].includes(value)
      },
    },
    position: {
      type: [String] as PropType<string>,
      default: 'center',
      validator(value: string) {
        return ['center', 'left', 'right', 'full-width'].includes(value)
      },
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const localValue = useVModel(props, 'modelValue')
  const { configuration } = useConfiguration<DropdownProps>(dropdownConfig, 'Dropdown', localValue)

  // Template Refs
  const menuItems = ref(undefined)
  const popperInstance = ref<PopperInstance | null>(null)
  const dropdown = ref<HTMLDivElement>() as Ref<HTMLDivElement>
  const trigger = ref<ComponentPublicInstance<HTMLInputElement> | undefined>()
  const root = ref<HTMLDivElement>() as Ref<HTMLDivElement>

  const popperComputedOptions = computed((): Options => {
    const popperOptions = configuration.popperOptions as Options

    if (configuration.placement !== undefined) {
      popperOptions.placement = configuration.placement as Placement
      popperOptions.modifiers = [{
        name: 'keepTogether',
        options: {
          enabled: true,
        },
      }]
    }

    return popperOptions
  })

  const toggleDropdown = () => {
    trigger.value?.$el.click()
  }

  const hideDropdown = () => {
    if (localValue.value === false) {
      return
    }
    localValue.value = false
  }

  const showDropdown = () => {
    if (localValue.value === true) {
      return
    }
    localValue.value = true
  }

  const toggleOnHoverHandler = throttle(() => {
    if (!props.toggleOnHover) {
      return
    }
    toggleDropdown()
  }, 1000)

  const toggleOnFocusHandler = () => {
    if (!props.toggleOnFocus) {
      return
    }
    toggleDropdown()
  }

  const closeOnClickOverlay = () => {
    if (!props.overlay) {
      return
    }
    hideDropdown()
  }

  const createPopperInstance = () => {
    if (!props.usePopper || !dropdown.value || !trigger.value?.$el) {
      return
    }

    if (popperInstance.value !== null) {
      return
    }

    popperInstance.value = createPopper(trigger.value?.$el, dropdown?.value, popperComputedOptions.value)
  }

  const destroyPopperInstance = () => {
    setTimeout(() => popperInstance.value?.destroy(), 1000)
  }

  const refreshPopperInstance = () => {
    const headlessUIState = dropdown.value !== undefined
    if (headlessUIState) {
      createPopperInstance()
    }
    else {
      destroyPopperInstance()
    }
  }

  onMounted(() => {
    if (localValue.value) {
      createPopperInstance()
      toggleDropdown()
    }
  })

  onBeforeUnmount(() => {
    destroyPopperInstance()
  })

  // Watch if the menu element is shown or hidden
  watch(menuItems, (newValue) => {
    localValue.value = newValue !== undefined
    createPopperInstance()
  })

  // Whenever the model value or local value changes
  // we will trigger a click to let HeadlessUi do its job
  // @see https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-827403170
  watch(localValue, () => {
    createPopperInstance()
  }, { immediate: false })

  // Click away handler
  onClickOutside(root, () => {
    if (props.closeOnClickAway && localValue.value) {
      hideDropdown()
    }
  }, {
    ignore: [
      root,
      trigger,
      dropdown,
    ],
    detectIframe: true,
  })

  provide('configuration_vanilla', configuration)

  /**
   * @docs
   * @displayName VanillaDropdownMenu
   * @description A dropdown menu component
   **/
</script>

<script lang="ts">
export default {
  name: 'VanillaDropdownMenu',
  inheritAttrs: true,
}
</script>

<template>
  <HeadlessMenu
    v-slot="{ open, close }"
    ref="root"
    as="div"
    :class="[
      teleport ? configuration.classesList.wrapper : '',
    ]"
  >
    <!-- Trigger -->
    <MenuButton
      ref="trigger"
      as="div"
      :class="[
        configuration.classesList.container,
        configuration.disabled ? configuration.classesList.disabled : '',
      ]"
      :disabled="configuration.disabled"
    >
      <slot
        name="trigger"
        v-bind="{
          buttonVariant,
          text,
          iconClasses: configuration.classesList.chevronIcon,
          open,
          disabled,
        }"
      >
        <Button
          :variant="buttonVariant"
          :disabled="configuration.disabled"
        >
          <span v-text="text" />
          <ChevronDownIcon
            :class="configuration.classesList.chevronIcon"
            aria-hidden="true"
          />
        </Button>
      </slot>
    </MenuButton>
    <!-- Overlay if enable -->

    <teleport
      :to="teleportTo"
      :disabled="!teleport"
    >
      <div
        v-if="overlay && open"
        :class="configuration.classesList.overlay"
        @click="closeOnClickOverlay"
      />

      <div
        ref="dropdown"
        :class="[
          configuration.classesList.menuWrapper,
          !usePopper && position === 'left' ? configuration.classesList.menuWrapperLeft : '',
          !usePopper && position === 'right' ? configuration.classesList.menuWrapperRight : '',
          !usePopper && position === 'center' ? configuration.classesList.menuWrapperCenter : '',
          !usePopper && position === 'full-width' ? configuration.classesList.menuWrapperCenterFull : '',
        ]"
      >
        <div
          v-if="showArrow && open"
          :class="configuration.classesList.arrow"
          data-popper-arrow
        />

        <Transitionable :classes-list="configuration.classesList">
          <MenuItems
            :class="[
              configuration.classesList.dropdown,
              size === 'none' ? configuration.classesList.sizeNone : '',
              size === 'small' ? configuration.classesList.sizeSmall : '',
              size === 'default' ? configuration.classesList.sizeDefault : '',
              size === 'medium' ? configuration.classesList.sizeMedium : '',
              size === 'large' ? configuration.classesList.sizeLarge : '',
              size === 'extra-large' ? configuration.classesList.sizeXLarge : '',
              size === 'super-large' ? configuration.classesList.sizeXXLarge : '',
              size === 'full-width' ? configuration.classesList.sizeFull : '',
            ]"
          >
            <div
              ref="menuItems"
              :class="[
                configuration.classesList.menuItemsWrapper,
                spacedItems ? configuration.classesList.menuItemsWrapperSpaced : '',
              ]"
            >
              <slot v-bind="{ close }" />
            </div>
          </MenuItems>
        </Transitionable>
      </div>
    </teleport>
  </HeadlessMenu>
</template>
