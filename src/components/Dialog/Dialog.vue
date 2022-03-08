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

              <!--              <div class="mt-2">-->
              <!--                <p class="text-sm text-gray-500">-->
              <!--                  Your payment has been successfully submitted. We’ve sent you-->
              <!--                  an email with all of the details of your order.-->
              <!--                </p>-->
              <!--              </div>-->

              <!--              <div class="mt-4">-->
              <!--                <button-->
              <!--                  type="button"-->
              <!--                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"-->
              <!--                  @click="close"-->
              <!--                >-->
              <!--                  Got it, thanks!-->
              <!--                </button>-->
              <!--              </div>-->
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
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
        initialFocus: {
            type: [HTMLElement, null] as PropType<HTMLElement | null>,
            default: null,
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
