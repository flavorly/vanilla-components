<template>
  <div class="w-56 text-right fixed top-16">
    <Menu
      v-slot="{open}"
      as="div"
      class="relative inline-block text-left"
    >
      <MenuButton
        ref="button"
        as="template"
      >
        <VanillaButton
          variant="primary"
          label="Options"
        />
      </MenuButton>

      <div
        v-show="open"
        :class="{'bg-black bg-opacity-50': true}"
        style="position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99;"
        @click="hideDropdown"
      />

      <teleport
        to="body"
        :disabled="true"
      >
        <div
          ref="menu"
          class="popper"
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
            <MenuItems
              class="top-5 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1"
            >
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted, onUpdated } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, hasSlot, useVModel } from '@/core';
import { VanillaDropdownProps, VanillaDropdownClassesKeys, VanillaDropdownConfig } from '@/components/Dropdown/index';
import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon, DuplicateIcon, ArchiveIcon, TrashIcon } from '@heroicons/vue/solid';
import { createPopper } from '@popperjs/core';
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
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaDropdownProps>(),
        modelValue: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        as: {
            type: [String] as PropType<string>,
            default: 'button',
        },
        label: {
            type: [String] as PropType<string>,
            default: 'Button',
        },
        loading: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        disabled: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        type: {
            type: [String] as PropType<string>,
            default: 'button',
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

        const createPopperInstance = () => {
            popperInstance.value = createPopper(button.value.$el, menu.value, {
                placement: 'bottom',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ],
                strategy: 'absolute',
                onFirstUpdate: undefined,
            });
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

        onUpdated(() => {
            refreshPopperInstance();
        });

        // Watch if the menu element is shown or hidden
        watch(menuItems, (newValue) => {
            localValue.value = newValue != undefined;
        });

        // Whenever the model value or local value changes
        // we will trigger a click to let HeadlessUi do its job
        // @see https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-827403170
        watch(localValue,  () => {
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
            button,
            menu,
            menuItems,
        };
    },
});
</script>
