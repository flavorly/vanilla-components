<template>
  <TransitionRoot
    appear
    :show="localValue"
    as="template"
  >
    <Dialog
      as="div"
      :open="localValue"
      :initial-focus="null"
      @close="close"
    >
      <div :class="configuration.classesList.wrapper">
        <div :class="configuration.classesList.inner">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay :class="configuration.classesList.overlay" />
          </TransitionChild>

          <span
            :class="configuration.classesList.closeButton"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              :class="[
                configuration.classesList.modal,
                paddingOnModal ? configuration.classesList.modalWithPadding : ''
              ]"
            >
              <!-- Trap the focus here, some weird bug with headlessui -->
              <div
                style="width: 0; height: 0; visibility: hidden"
                tabindex="99"
              />

              <!-- Header -->
              <DialogTitle
                v-if="hasSlot($slots.header) || title !== undefined"
                as="div"
                :class="{'border-b dark:border-gray-700': divided}"
                class="px-4 py-5 sm:px-6 text-gray-700 card-title"
              >
                <slot
                  :close="close"
                  name="header"
                >
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    v-html="title"
                  />
                </slot>
              </DialogTitle>

              <!-- Body -->
              <DialogDescription
                as="div"
                :class="[
                  paddingOnBody ? configuration.classesList.bodyWithPadding : '',
                ]"
              >
                <slot
                  v-bind="{
                    close,
                    classes: configuration.classesList.body
                  }"
                />
              </DialogDescription>

              <!-- Footer -->
              <VanillaDialogFooter
                v-if="hasSlot($slots.footer)"
                ref="footer"
                :divided="divided"
              >
                <slot
                  :close="close"
                  name="footer"
                />
              </VanillaDialogFooter>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, provide } from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useVModel,
    hasSlot,
} from '@/core';

import {
    VanillaDialogProps,
    VanillaDialogClassesKeys,
    VanillaDialogConfig,
} from '@/components/Dialog/index';

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle, DialogDescription,
} from '@headlessui/vue';

import VanillaDialogFooter from '@/components/Dialog/DialogFooter/DialogFooter.vue';

export default defineComponent({
    name: 'VanillaDialog',
    components: {
        VanillaDialogFooter,
        DialogDescription,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle,
    },
    inheritAttrs: true,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaDialogProps>(),
        modelValue: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        title: {
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
        paddingOnModal: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        paddingOnBody: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        divided: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');
        const { localVariant } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaDialogProps>(
            VanillaDialogConfig,
            VanillaDialogClassesKeys,
            localVariant,
        );

        const close = (event) => {
            localValue.value = false;
        };

        const open = () => localValue.value = true;

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
