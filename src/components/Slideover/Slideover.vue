<template>
  <TransitionRoot
    appear
    :show="localValue"
    as="template"
  >
    <HeadlessDialog
      :as="as"
      :open="localValue"
      :initial-focus="null"
      @close="close"
    >
      <div :class="configuration.classesList.wrapper">
        <TransitionChild
          as="template"
          :enter="configuration.classesList.overlayEnter"
          :enter-from="configuration.classesList.overlayEnterFrom"
          :enter-to="configuration.classesList.overlayEnterTo"
          :leave="configuration.classesList.overlayLeave"
          :leave-from="configuration.classesList.overlayLeaveFrom"
          :leave-to="configuration.classesList.overlayLeaveTo"
        >
          <DialogOverlay
            :class="configuration.classesList.overlay"
            @click="closeOnClickOutside"
          />
        </TransitionChild>
        <div
          :class="[
            position === 'left' ? configuration.classesList.innerLeft : '',
            position === 'right' ? configuration.classesList.innerRight : '',
          ]"
        >
          <TransitionChild
            as="template"
            :enter="position === 'left' ? configuration.classesList.dialogLeftEnter : configuration.classesList.dialogRightEnter"
            :enter-from="position === 'left' ? configuration.classesList.dialogLeftEnterFrom : configuration.classesList.dialogRightEnterFrom"
            :enter-to="position === 'left' ? configuration.classesList.dialogLeftEnterTo : configuration.classesList.dialogRightEnterTo"
            :leave="position === 'left' ? configuration.classesList.dialogLeftLeave : configuration.classesList.dialogRightLeave"
            :leave-from="position === 'left' ? configuration.classesList.dialogLeftLeaveFrom : configuration.classesList.dialogRightLeaveFrom"
            :leave-to="position === 'left' ? configuration.classesList.dialogLeftLeaveTo : configuration.classesList.dialogRightLeaveTo"
          >
            <div
              :class="[
                configuration.classesList.slideover,
                size === 'default' ? configuration.classesList.sizeDefault : '',
                size === 'small' ? configuration.classesList.sizeSmall : '',
                size === 'medium' ? configuration.classesList.sizeMedium : '',
                size === 'large' ? configuration.classesList.sizeLarge : '',
                size === 'extra-large' ? configuration.classesList.sizeExtraLarge : '',
                size === 'full' ? configuration.classesList.sizeFull : '',
              ]"
            >
              <div
                :class="[
                  configuration.classesList.slideoverContainer,
                  paddingOnContainer ? configuration.classesList.slideOverContainerWithPadding : '',
                ]"
              >
                <!-- Title -->
                <slot
                  name="header"
                  v-bind="{
                    showHeader,
                    title,
                    subtitle,
                    close,
                  }"
                >
                  <!-- Header -->
                  <div
                    v-if="showHeader || hasSlot($slots.header)"
                    :class="configuration.classesList.titleWrapper"
                  >
                    <div :class="configuration.classesList.titleContainer">
                      <slot
                        name="top"
                        v-bind="{title, subtitle}"
                      >
                        <div :class="configuration.classesList.titleInner">
                          <!-- Title -->
                          <slot
                            name="title"
                            v-bind="{title}"
                          >
                            <DialogTitle
                              :class="configuration.classesList.titleText"
                              v-text="title"
                            />
                          </slot>
                          <!-- Subtitle -->
                          <slot
                            name="subtitle"
                            v-bind="{subtitle}"
                          >
                            <p
                              :class="configuration.classesList.subtitle"
                              v-text="subtitle"
                            />
                          </slot>
                        </div>
                      </slot>
                      <!-- Close Icon -->
                      <div
                        v-if="closeable"
                        :class="configuration.classesList.closeButtonContainer"
                      >
                        <slot
                          name="closeIcon"
                          v-bind="{closeable, close}"
                        >
                          <button
                            type="button"
                            :class="configuration.classesList.closeButton"
                            @click="close"
                          >
                            <span class="sr-only">Close</span>
                            <XMarkIcon
                              :class="configuration.classesList.closeButtonIcon"
                              aria-hidden="true"
                            />
                          </button>
                        </slot>
                      </div>
                    </div>
                  </div>
                </slot>
                <!-- Body -->
                <div
                  :class="[
                    configuration.classesList.body,
                    paddingOnBody ? configuration.classesList.bodyWithPadding : '',
                    title !== undefined ? configuration.classesList.bodyWithTitle : ''
                  ]"
                >
                  <slot />
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, PropType, provide } from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useVModel,
    hasSlot,
} from '@/core';

import {
    VanillaSlideoverProps,
    VanillaSlideoverClassesKeys,
    VanillaSlideoverConfig,
} from '@/components/Slideover/index';

import {
    TransitionRoot,
    TransitionChild,
    Dialog as HeadlessDialog,
    DialogOverlay,
    DialogTitle,
} from '@headlessui/vue';

import XMarkIcon from '@/components/Icons/Hero/Outline/XMarkIcon.vue';

export default defineComponent({
    name: 'VanillaSlideover',
    components: {
        TransitionRoot,
        TransitionChild,
        HeadlessDialog,
        DialogOverlay,
        DialogTitle,
        XMarkIcon,
    },
    inheritAttrs: true,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaSlideoverProps>(),
        modelValue: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        title: {
            type: [String] as PropType<string | undefined>,
            default: undefined,
        },
        subtitle: {
            type: [String] as PropType<string | undefined>,
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
        overlay: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        closeable: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        closeableOnClickOutside: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        closeableOnPressEscape: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        paddingOnBody: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        paddingOnContainer: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        showHeader: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        as: {
            type: [String] as PropType<string>,
            default: 'div',
        },
        position: {
            type: [String] as PropType<string>,
            required: false,
            default: 'right',
            validator(position: string) {
                return ['left', 'right'].includes(position);
            },
        },
        size: {
            type: [String] as PropType<string>,
            required: false,
            default: 'medium',
            validator(align: string) {
                return ['default', 'small', 'medium', 'large', 'full'].includes(align);
            },
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');
        const { localVariant } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaSlideoverProps>(
            VanillaSlideoverConfig,
            VanillaSlideoverClassesKeys,
            localVariant,
        );

        const close = () => localValue.value = false;
        const open = () => localValue.value = true;
        const closeOnClickOutside = () => props.closeableOnClickOutside && close();

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

        return {
            configuration,
            localValue,
            localVariant,
            props,
            close,
            open,
            hasSlot,
        };
    },
});
</script>
