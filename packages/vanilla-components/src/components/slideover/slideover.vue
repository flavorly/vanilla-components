<script setup lang="ts">
import type { PropType } from 'vue'
import { provide } from 'vue'
import {
    DialogOverlay,
    DialogTitle,
    Dialog as HeadlessDialog,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import type { SlideoverClassesValidKeys, SlideoverProps } from './config'
import { slideoverConfig } from './config'
import XMarkIcon from '@/components/icons/hero/outline/XMarkIcon.vue'
import { hasSlot } from '@/core/helpers'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<SlideoverProps, SlideoverClassesValidKeys>(),
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
    default: true,
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
      return ['left', 'right'].includes(position)
    },
  },
  size: {
    type: [String] as PropType<string>,
    required: false,
    default: 'medium',
    validator(align: string) {
      return ['default', 'small', 'medium', 'large', 'full'].includes(align)
    },
  },
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const localValue = useVModel(props, 'modelValue')
const { configuration } = useConfiguration<SlideoverProps>(slideoverConfig, 'Slideover', localValue)

const close = () => {
  setTimeout(() => {
    localValue.value = false
    emit('close')
  }, 50)
}

const open = () => {
    localValue.value = true
    emit('open')
}

const closeOnClickOutside = () => props.closeableOnClickOutside && close()

defineExpose({ open, close })

provide('configuration_vanilla', configuration)

defineOptions({
  name: 'VanillaSlideover',
  inheritAttrs: false,
})
</script>

<template>
  <TransitionRoot
    :show="localValue"
    as="div"
  >
    <HeadlessDialog
      :as="as"
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
                        v-bind="{ title, subtitle }"
                      >
                        <div :class="configuration.classesList.titleInner">
                          <!-- Title -->
                          <slot
                            name="title"
                            v-bind="{ title }"
                          >
                            <DialogTitle
                              :class="configuration.classesList.titleText"
                              v-text="title"
                            />
                          </slot>
                          <!-- Subtitle -->
                          <slot
                            name="subtitle"
                            v-bind="{ subtitle }"
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
                          v-bind="{ closeable, close }"
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
                    title !== undefined ? configuration.classesList.bodyWithTitle : '',
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
