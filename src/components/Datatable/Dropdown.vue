<template>
  <Menu
    v-slot="{open}"
    as="div"
    class="relative"
  >
    <!-- Trigger -->
    <MenuButton
      ref="button"
      as="template"
    >
      <VanillaButton
        :variant="buttonVariant"
      >
        <span v-text="text" />
        <ChevronDownIcon
          :class="configuration.classesList.wrapper"
          aria-hidden="true"
        />
      </VanillaButton>
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
    provide,
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useVModel,
} from '@/core';

import {
    VanillaDatatableProps,
    VanillaDatatableClassesKeys,
    VanillaDatatableConfig,
} from '@/components/Datatable/index';

import VanillaButton from '@/components/Button/Button.vue';
import VanillaTransitionable from '@/components/Transitions/Transitionable.vue';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaDatatable',
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
        ...useVariantProps<VanillaDatatableProps>(),
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

        const { configuration } = useConfigurationWithClassesList<VanillaDatatableProps>(
            VanillaDatatableConfig,
            VanillaDatatableClassesKeys,
            localVariant,
        );

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

        return {
            configuration,
            localValue,
            localVariant,
            props,
        };
    },
});
</script>
