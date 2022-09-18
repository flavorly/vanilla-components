<script lang="ts">
import type { PropType } from 'vue'
import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    provide,
    ref, watch,
} from 'vue'

import type { Options, Placement } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type { Instance as PopperInstance } from '@popperjs/core/lib/types'
import { Menu as HeadlessMenu, MenuButton, MenuItems } from '@headlessui/vue'
import {
    throttle,
    useBootVariant,
    useConfigurationWithClassesList,
    useVModel,
    useVariantProps,
    validPlacements,
} from '../../core'

import type { VanillaDropdownProps } from './index'
import {
    VanillaDropdownClassesKeys,
    VanillaDropdownConfig,
    VanillaDropdownPopperDefaultOptions,
} from './index'

import VanillaButton from '../Button/Button.vue'
import VanillaTransitionable from '../Transitions/Transitionable.vue'
import ChevronDownIcon from '../Icons/Hero/Solid/ChevronDownIcon.vue'

export default defineComponent({
    name: 'VanillaDropdown',
    components: {
        VanillaTransitionable,
        HeadlessMenu,
        MenuButton,
        MenuItems,
        ChevronDownIcon,
        VanillaButton,
    },
    inheritAttrs: true,
    props: {
        ...useVariantProps<VanillaDropdownProps>(),
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
        placement: {
            type: String as PropType<Placement>,
            default: undefined,
            validator: (value: Placement | string): boolean => validPlacements.includes(value),
        },
        popperOptions: {
            type: Object as PropType<Options>,
            default: (): Options => VanillaDropdownPopperDefaultOptions as Options,
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
                return ['default', 'medium', 'large', 'extra-large', 'super-large', 'full-width'].includes(value)
            },
        },
        position: {
            type: [String] as PropType<string>,
            default: 'center',
            validator(value: string) {
                return ['center', 'left', 'right', 'full-width'].includes(value)
            },
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {
        const localValue = useVModel(props, 'modelValue')
        const { localVariant } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaDropdownProps>(
            VanillaDropdownConfig,
            VanillaDropdownClassesKeys,
            localVariant,
        )

        const button = ref(undefined)
        const menu = ref(undefined)
        const menuItems = ref(undefined)
        const popperInstance = ref<PopperInstance | null>(null)

        const popperComputedOptions = computed((): Options => {
            const popperOptions = configuration.popperOptions as Options

            if (configuration.placement !== undefined) {
                popperOptions.placement = configuration.placement as Placement
            }

            return popperOptions
        })

        const toggleDropdown = () => {
            button.value.$el.click()
        }

        const hideDropdown = () => {
            if (localValue.value === false) {
                return
            }
            toggleDropdown()
        }

        const showDropdown = () => {
            if (localValue.value === true) {
                return
            }
            toggleDropdown()
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
            if (!props.usePopper || !menu.value || !button.value?.$el) {
                return
            }

            if (popperInstance.value !== null) {
                return
            }

            popperInstance.value = createPopper(button.value?.$el, menu?.value, popperComputedOptions.value)
        }

        const destroyPopperInstance = () => {
            setTimeout(() => popperInstance.value?.destroy(), 1000)
        }

        const refreshPopperInstance = () => {
            const headlessUIState = menu.value != undefined
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
            localValue.value = newValue != undefined
            createPopperInstance()
        })

        // Whenever the model value or local value changes
        // we will trigger a click to let HeadlessUi do its job
        // @see https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-827403170
        watch(localValue, () => {
            createPopperInstance()
        }, { immediate: false })

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration)

        return {
            configuration,
            localValue,
            localVariant,
            props,
            toggleDropdown,
            hideDropdown,
            showDropdown,
            createPopperInstance,
            destroyPopperInstance,
            toggleOnHoverHandler,
            toggleOnFocusHandler,
            closeOnClickOverlay,
            button,
            menu,
            menuItems,
        }
    },
})
</script>

<template>
  <HeadlessMenu
    v-slot="{ open }"
    as="div"
    :class="[
      teleport ? configuration.classesList.wrapper : '',
    ]"
  >
    <!-- Trigger -->
    <MenuButton
      ref="button"
      as="div"
      :class="configuration.classesList.container"
    >
      <slot
        name="trigger"
        v-bind="{
          buttonVariant,
          text,
          iconClasses: configuration.classesList.chevronIcon,
        }"
      >
        <VanillaButton
          :variant="buttonVariant"
        >
          <span v-text="text" />
          <ChevronDownIcon
            :class="configuration.classesList.chevronIcon"
            aria-hidden="true"
          />
        </VanillaButton>
      </slot>
    </MenuButton>
    <!-- Overlay if enable -->
    <div
      v-if="overlay && open"
      :class="configuration.classesList.overlay"
      @click="closeOnClickOverlay"
    />

    <teleport
      :to="teleportTo"
      :disabled="!teleport"
    >
      <div
        ref="menu"
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

        <VanillaTransitionable :classes-list="configuration.classesList">
          <MenuItems
            :class="[
              configuration.classesList.dropdown,
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
              <slot />
            </div>
          </MenuItems>
        </VanillaTransitionable>
      </div>
    </teleport>
  </HeadlessMenu>
</template>
