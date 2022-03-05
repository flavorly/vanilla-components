<template>
  <component :is="tagName">
    <Menu
      v-slot="{open}"
      as="div"
      class="relative"
    >
      <MenuButton
        ref="button"
        as="template"
      >
        <VanillaButton
          :variant="buttonVariant"
        >
          <span v-text="text" />
          <ChevronDownIcon
            class="-mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
        </VanillaButton>
      </MenuButton>

      <div
        v-if="overlay && open"
        :class="{'bg-black bg-opacity-50': true}"
        style="position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99;"
        @click="closeOnClickOverlay"
      />

      <teleport
        :to="teleportTo"
        :disabled="teleport"
      >
        <div
          ref="menu"
          class=""
          style="position: absolute; z-index: 100;"
        >
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems class="top-5 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 w-56 focus:ring-2 focus:ring-primary-500 focus:outline-none">
              <div ref="menuItems">
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <DuplicateIcon
                        :active="active"
                        class="w-5 h-5 mr-2 text-violet-400"
                        aria-hidden="true"
                      />
                      Duplicate
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <ArchiveIcon
                        :active="active"
                        class="w-5 h-5 mr-2 text-violet-400"
                        aria-hidden="true"
                      />
                      Archive
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <TrashIcon
                        :active="active"
                        class="w-5 h-5 mr-2 text-violet-400"
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                  </MenuItem>
                </div>
              </div>
            </MenuItems>
          </transition>
        </div>
      </teleport>
    </Menu>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted, onUpdated, onBeforeUnmount, computed, nextTick } from 'vue';
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
import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon, DuplicateIcon, ArchiveIcon, TrashIcon } from '@heroicons/vue/solid';
import { createPopper, Options, Placement } from '@popperjs/core';
import VanillaButton from '@/components/Button/Button.vue';
import { Instance as PopperInstance } from '@popperjs/core/lib/types';

export default defineComponent({
    name: 'VanillaDropdown',
    components: {
        Menu,
        MenuItem,
        MenuButton,
        MenuItems,
        ChevronDownIcon,
        DuplicateIcon,
        ArchiveIcon,
        TrashIcon,
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

        // onUpdated(() => {
        //     refreshPopperInstance();
        // });

        onBeforeUnmount(() => {
            destroyPopperInstance();
        });

        // Watch if the menu element is shown or hidden
        watch(menuItems, (newValue) => {
            console.log('Menu items changed');
            localValue.value = newValue != undefined;
            refreshPopperInstance();
        });

        // Whenever the model value or local value changes
        // we will trigger a click to let HeadlessUi do its job
        // @see https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-827403170
        watch(localValue,  () => {
            console.log('Local Value changed');
            refreshPopperInstance();
        }, { immediate: false });

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
