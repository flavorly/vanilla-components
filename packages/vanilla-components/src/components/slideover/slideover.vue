<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, provide } from 'vue'
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
      return ['left', 'right', 'top', 'bottom'].includes(position)
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

const emit = defineEmits([
  'update:modelValue',
  'open',
  'close',
  'opening',
  'opened',
  'closing',
  'closed',
])

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

const emitTransitionEvent = (event: 'opening' | 'opened' | 'closing' | 'closed') => emit(event)

const closeOnClickOutside = () => props.closeableOnClickOutside && close()

const innerClasses = computed(() => {
  return {
    right: configuration.classesList.innerRight,
    left: configuration.classesList.innerLeft,
    top: configuration.classesList.innerTop,
    bottom: configuration.classesList.innerBottom,
  }[props.position]
})

const enterClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightEnter,
    left: configuration.classesList.dialogLeftEnter,
    top: configuration.classesList.dialogTopEnter,
    bottom: configuration.classesList.dialogBottomEnter,
  }[props.position]
})

const enterFromClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightEnterFrom,
    left: configuration.classesList.dialogLeftEnterFrom,
    top: configuration.classesList.dialogTopEnterFrom,
    bottom: configuration.classesList.dialogBottomEnterFrom,
  }[props.position]
})

const enterToClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightEnterTo,
    left: configuration.classesList.dialogLeftEnterTo,
    top: configuration.classesList.dialogTopEnterTo,
    bottom: configuration.classesList.dialogBottomEnterTo,
  }[props.position]
})

const leaveClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightLeave,
    left: configuration.classesList.dialogLeftLeave,
    top: configuration.classesList.dialogTopLeave,
    bottom: configuration.classesList.dialogBottomLeave,
  }[props.position]
})

const leaveFromClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightLeaveFrom,
    left: configuration.classesList.dialogLeftLeaveFrom,
    top: configuration.classesList.dialogTopLeaveFrom,
    bottom: configuration.classesList.dialogBottomLeaveFrom,
  }[props.position]
})

const leaveToClass = computed(() => {
  return {
    right: configuration.classesList.dialogRightLeaveTo,
    left: configuration.classesList.dialogLeftLeaveTo,
    top: configuration.classesList.dialogTopLeaveTo,
    bottom: configuration.classesList.dialogBottomLeaveTo,
  }[props.position]
})

const sizeClass = computed(() => {
  if (props.position === 'right' || props.position === 'left') {
    return {
      default: configuration.classesList.sizeWidthDefault,
      small: configuration.classesList.sizeWidthSmall,
      medium: configuration.classesList.sizeWidthMedium,
      large: configuration.classesList.sizeWidthLarge,
      full: configuration.classesList.sizeWidthFull,
    }[props.size]
  }

  return {
    default: configuration.classesList.sizeHeightDefault,
    small: configuration.classesList.sizeHeightSmall,
    medium: configuration.classesList.sizeHeightMedium,
    large: configuration.classesList.sizeHeightLarge,
    full: configuration.classesList.sizeHeightFull,
  }[props.size]
})

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
    @before-enter="emitTransitionEvent('opening')"
    @after-enter="emitTransitionEvent('opened')"
    @before-leave="emitTransitionEvent('closing')"
    @after-leave="emitTransitionEvent('closed')"
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
          :class="innerClasses"
        >
          <TransitionChild
            as="template"
            :enter="enterClass"
            :enter-from="enterFromClass"
            :enter-to="enterToClass"
            :leave="leaveClass"
            :leave-from="leaveFromClass"
            :leave-to="leaveToClass"
          >
            <div
              :class="[
                configuration.classesList.slideover,
                sizeClass,
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
