<template>
  <component
    :is="tagName"
    ref="trigger"
    :type="tagName === 'button' ? 'button' : undefined"
    :aria-expanded="shown"
    :class="configuration.classesList?.trigger"
    :disabled="configuration.disabled"
    v-bind="{...attributes, ...$attrs}"
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
    :disabled="! configuration.teleport"
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
  </teleport>
</template>
<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
    PropType,
    ref,
    watch,
    nextTick,
    Ref,
} from 'vue';

import {
    useBootVariant,
    useVModel,
    useConfigurationWithClassesList,
    useVariantPropsWithClassesList,
    validPlacements,
} from '@/core';

import {
    VanillaDropdownProps,
    VanillaDropdownClassesKeys,
    VanillaDropdownConfig,
    VanillaDropdownClassesValidKeys,
    VanillaDropdownPopperDefaultOptions,
} from '@/components/Dropdown/index';

import { createPopper, Options, Placement } from '@popperjs/core';
import { TDropdown } from '@variantjs/vue';
import VanillaButton from '@/components/Button/Button.vue';
import { TDropdownOptions } from '@variantjs/vue/src/types';
import { debounce, DebouncedFn, getFocusableElements, throttle } from '@variantjs/core';
import { Instance as PopperInstance, VirtualElement } from '@popperjs/core/lib/types';

export default defineComponent({
    name: 'VanillaDropdown',
    components: {
        VanillaButton,
        TDropdown,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantPropsWithClassesList<VanillaDropdownProps, VanillaDropdownClassesValidKeys>(),
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
        closeOnClickOverlay: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
    },
    emits: ['shown', 'update:show', 'hidden', 'before-show', 'before-hide'],
    setup(props, { emit }) {

        const localValue = useVModel(props, 'show');

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaDropdownProps>(
            VanillaDropdownConfig,
            VanillaDropdownClassesKeys,
            localVariant,
        );

        // Reactive / Data
        const isTouchOnlyDevice = ref<boolean>(false);
        const shown = ref((configuration as unknown as TDropdownOptions).show);
        const nitAsShow = ref((configuration as unknown as TDropdownOptions).show);
        const hideTimeout = ref(null as ReturnType<typeof setTimeout> | null);
        const focusableElements = ref([] as Array<HTMLElement>);
        const throttledToggle = ref(null as null | (() => void));
        const adjustingPopper = ref(false);
        const popperIsAdjusted = ref(false);
        const popperAdjusterListener = ref(null as null | DebouncedFn);
        const popper = ref(null as PopperInstance | null);

        // Old $refs
        const trigger: Ref<Element | VirtualElement> = ref();
        const dropdown: Ref<HTMLDivElement | Element | VirtualElement | undefined> = ref(undefined);

        // Computed
        const fullPopperOptions: Options = computed(() => {
            let popperOptions = configuration.popperOptions as Options;

            if (configuration.placement !== undefined) {
                popperOptions.placement = configuration.placement;
            }

            return popperOptions;
        });

        const shouldShowWhenClicked: boolean = computed(() => {
            return isTouchOnlyDevice.value && (configuration.toggleOnFocus === true || configuration.toggleOnHover === true);
        });



        // Methods

        const getDropdownElement = (): HTMLDivElement => {

        };

        const onFocus = () => {
            //this.getTriggerElement().focus();
        };

        const onShown = () => {
            emit('shown');

            emit('update:show', true);

            if (isTouchOnlyDevice.value) {
                //window.addEventListener('touchstart', this.touchstartHandler);
            } else {
                //this.addBlurListenersToChildElements();
            }
        };

        const onHidden = () => {
            emit('hidden');

            emit('update:show', false);

            if (isTouchOnlyDevice.value) {
                //window.removeEventListener('touchstart', this.touchstartHandler);
            } else {
                //this.removeBlurListenersFromChildElements();
            }
        };

        const onBeforeShown = () => {
            emit('before-show');
            if (isTouchOnlyDevice.value) {
                //window.addEventListener('touchstart', this.touchstartHandler);
            }
        };

        const onBeforeHide = () => {
            emit('before-hide');
            if (isTouchOnlyDevice.value) {
                //window.removeEventListener('touchstart', this.touchstartHandler);
            }
        };

        const addBlurListenersToChildElements = () => {
            //const dropdown = this.getDropdownElement();
            //focusableElements.value = getFocusableElements(dropdown);
            //focusableElements.value.forEach((element) => element.addEventListener('blur', this.blurHandler));
        };

        const removeBlurListenersFromChildElements = () => {
            //focusableElements.value.forEach((element) => element.removeEventListener('blur', this.blurHandler));
            //focusableElements.value = [];
        };

        const dropdownAfterLeave = () => {
            //this.getDropdownElement().style.removeProperty('visibility');
        };

        const createPopperInstance = (): Promise<PopperInstance> => {
            let popperInstance: PopperInstance;

            return new Promise((resolve) => {
                const popperOptions = fullPopperOptions;

                const originalOnFirstUpdate = popperOptions.onFirstUpdate;

                popperOptions.onFirstUpdate = async (arg: Partial<any>) => {
                    if (originalOnFirstUpdate) {
                        originalOnFirstUpdate(arg);
                    }

                    resolve(popperInstance);
                };

                popperInstance = createPopper(trigger, dropdown, fullPopperOptions);
            });
        };

        const adjustPopper = async (): Promise<void> => {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                if (shown.value === false && adjustingPopper.value === false) {
                    popperIsAdjusted.value = false;
                    resolve();
                    return;
                }

                if (!popper.value) {
                    //popper.value = await this.createPopper();
                }

                await popper.value?.update();

                resolve();
            });
        };

        const updatePopper = (): Promise<void> => {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                if (popperIsAdjusted.value) {
                    resolve();
                    return;
                }

                // So it appears in the DOM so it can be adjusted
                adjustingPopper.value = true;

                await nextTick();

                await adjustPopper();

                // after adjusted it removes the dropdown from the DOM
                adjustingPopper.value = false;

                await nextTick();

                // Once removed it can be marked as adjusted so we can enable the
                // CSS transitions
                popperIsAdjusted.value = true;

                await nextTick();

                resolve();
            });
        };

        // Watchers
        watch(popperIsAdjusted, (isAdjusted: boolean) => {
            if (isAdjusted) {
                //this.enablePopperNeedsAdjustmentListener();
            } else {
                //this.disablePopperNeedsAdjustmentListener();
            }
        });

        watch(() => configuration.show, (isShown) => {
            if (isShown) {
                //this.doShow();
            } else {
                //this.doHide();
            }
        });

        // Mounted
        onMounted(() => {
            // if (this.isTouchOnlyDevice && this.shown) {
            //   window.addEventListener('touchstart', this.touchstartHandler);
            // }
            //
            // if (this.configuration.show) {
            //   this.updatePopper().then(() => {
            //     this.initAsShow = false;
            //   });
            // }
        });

        // Before Mount
        onBeforeMount(() => {
            // this.throttledToggle = throttle(this.doToggle, 200);
            //
            // this.popperAdjusterListener = debounce(() => {
            //     this.popperIsAdjusted = false;
            // }, 200);
        });

        // Before Unmount
        onBeforeUnmount(() => {
            // if (this.hideTimeout) {
            //   clearTimeout(this.hideTimeout);
            // }
            //
            // this.disablePopperNeedsAdjustmentListener();
            //
            // if (this.isTouchOnlyDevice && this.shown) {
            //   window.removeEventListener('touchstart', this.touchstartHandler);
            // }
        });


        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            trigger,
            dropdown,
        };
    },
});
</script>

