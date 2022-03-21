<template>
  <Menu
    v-slot="{open}"
    as="div"
    :class="configuration.classesList.wrapper"
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
          iconClasses: configuration.classesList.chevronIcon
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
      :disabled="teleport"
    >
      <div
        ref="menu"
        :class="configuration.classesList.menuWrapper"
      >
        <div
          v-if="showArrow && open"
          :class="configuration.classesList.arrow"
          data-popper-arrow
        />

        <VanillaTransitionable :classes-list="configuration.classesList">
          <MenuItems
            :class="configuration.classesList.dropdown"
          >
            <div
              ref="menuItems"
              :class="configuration.classesList.menuItemsWrapper"
            >
              <slot />
            </div>
          </MenuItems>
        </VanillaTransitionable>
      </div>
    </teleport>
  </Menu>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType,
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    computed, provide,
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useVModel,
    validPlacements,
    throttle,
} from '@/core';

import {
    VanillaDropdownProps,
    VanillaDropdownClassesKeys,
    VanillaDropdownConfig,
    VanillaDropdownPopperDefaultOptions,
} from '@/components/Dropdown/index';

import VanillaButton from '@/components/Button/Button.vue';
import VanillaTransitionable from '@/components/Transitions/Transitionable.vue';
import { createPopper, Options, Placement } from '@popperjs/core';
import { Instance as PopperInstance } from '@popperjs/core/lib/types';

import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaDropdown',
    components: {
        VanillaTransitionable,
        Menu,
        MenuButton,
        MenuItems,
        ChevronDownIcon,
        VanillaButton,
    },
    inheritAttrs: true,
    compatConfig: {
        MODE: 3,
    },
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
            default: false,
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
            validator: (value: Placement | string):boolean => validPlacements.includes(value),
        },
        popperOptions: {
            type: Object as PropType<Options>,
            default: (): Options => VanillaDropdownPopperDefaultOptions as Options,
        },
        overlay: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        showArrow: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');
        const { localVariant } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaDropdownProps>(
            VanillaDropdownConfig,
            VanillaDropdownClassesKeys,
            localVariant,
        );

        const button = ref(undefined);
        const menu = ref(undefined);
        const menuItems = ref(undefined);
        const popperInstance = ref<PopperInstance | null>(null);

        const popperComputedOptions = computed((): Options => {
            const popperOptions = configuration.popperOptions as Options;

            if (configuration.placement !== undefined) {
                popperOptions.placement = configuration.placement as Placement;
            }

            return popperOptions;
        });

        const toggleDropdown = () => {
            button.value.$el.click();
        };

        const hideDropdown = () => {
            if (localValue.value === false){
                return;
            }
            toggleDropdown();
        };

        const showDropdown = () => {
            if (localValue.value === true){
                return;
            }
            toggleDropdown();
        };

        const toggleOnHoverHandler = throttle(() => {
            if (!props.toggleOnHover){
                return;
            }
            toggleDropdown();
        }, 1000);

        const toggleOnFocusHandler = () => {
            if (!props.toggleOnFocus){
                return;
            }
            toggleDropdown();
        };

        const closeOnClickOverlay = () => {
            if (!props.overlay){
                return;
            }
            hideDropdown();
        };

        const createPopperInstance = () => {
            if (!menu.value || !button.value?.$el){
                return;
            }

            if (popperInstance.value !== null){
                return;
            }

            popperInstance.value = createPopper(button.value?.$el, menu?.value, popperComputedOptions.value);
        };

        const destroyPopperInstance = () => {
            setTimeout(() => popperInstance.value?.destroy(), 1000);
        };

        const refreshPopperInstance = () => {
            const headlessUIState = menu.value != undefined;
            if (headlessUIState){
                createPopperInstance();
            } else {
                destroyPopperInstance();
            }
        };

        onMounted(() => {
            if (localValue.value){
                createPopperInstance();
                toggleDropdown();
            }
        });

        onBeforeUnmount(() => {
            destroyPopperInstance();
        });

        // Watch if the menu element is shown or hidden
        watch(menuItems, (newValue) => {
            localValue.value = newValue != undefined;
            createPopperInstance();
        });

        // Whenever the model value or local value changes
        // we will trigger a click to let HeadlessUi do its job
        // @see https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-827403170
        watch(localValue,  () => {
            createPopperInstance();
        }, { immediate: false });

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

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
        };
    },
});
</script>
