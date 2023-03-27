<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, provide, useSlots } from 'vue'
import {
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog, TransitionChild, TransitionRoot,
} from '@headlessui/vue'
import { has } from 'cheerio/lib/api/traversing'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import { hasSlot } from '../../core/helpers'
import DialogFooter from './partials/footer.vue'
import type { DialogClassesValidKeys, DialogProps } from './config'
import { dialogConfig } from './config'

const props = defineProps({
  ...useVariantProps<DialogProps, DialogClassesValidKeys>(),
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
  padding: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  paddingBody: {
    type: [Boolean] as PropType<boolean>,
    default: true,
  },
  divided: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  as: {
    type: [String] as PropType<string>,
    default: 'div',
  },
  size: {
    type: [String] as PropType<string>,
    required: false,
    default: 'default',
    validator(align: string) {
      return ['default', 'small', 'medium', 'large', 'full'].includes(align)
    },
  },
  position: {
    type: [String] as PropType<string>,
    required: false,
    default: 'center',
    validator(align: string) {
      return ['center-bottom', 'center-top', 'center', 'top', 'bottom'].includes(align)
    },
  },
})

const emit = defineEmits([
  'update:modelValue',
  'close',
  'open',
  'opening',
  'opened',
  'closing',
  'closed',
])

const slots = useSlots()

const localValue = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<DialogProps>(dialogConfig, 'Dialog', localValue)

const close = () => {
  if (!props.closeable) {
    return
  }

  if (!props.closeableOnClickOutside) {
    localValue.value = true
    return
  }

  setTimeout(() => {
    localValue.value = false
    emit('close')
  }, 50)
}

const open = () => {
  localValue.value = true
  emit('open')
}

// Design control variables
const hasHeaderSlot = computed(() => hasSlot(slots.header) || props.title !== undefined)
const hasFooterSlot = computed(() => hasSlot(slots.footer))
const shouldApplyModalPaddingX = computed(() => props.padding && !hasHeaderSlot.value)
const shouldApplyModalPaddingTop = computed(() => props.padding && !hasHeaderSlot.value)
const shouldApplyModalPaddingBottom = computed(() => props.padding && !hasFooterSlot.value)
const shouldApplyBodyPaddingTop = computed(() => (props.paddingBody && !hasHeaderSlot.value) || (hasHeaderSlot.value && props.divided))
const shouldApplyBodyPaddingBottom = computed(() => (props.paddingBody && !hasFooterSlot.value) || (hasFooterSlot.value && props.divided))
const shouldApplyBodyXPadding = computed(() => props.paddingBody)

const emitTransitionEvent = (event: 'opening' | 'opened' | 'closing' | 'closed') => emit(event)

provide('configuration_vanilla', configuration)

// defineOptions({
//   name: 'VanillaDialog',
// })

/**
 * @docs
 * @displayName VanillaDialog
 * @description A dialog is a window overlaid on either the primary window or another dialog window. It is used to display critical information that requires user input or attention.
 **/
</script>

<template>
  <TransitionRoot
    appear
    :show="localValue as boolean"
    as="template"
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
      <TransitionChild
        as="template"
        :enter="configuration.classesList.overlayEnter as string"
        :enter-from="configuration.classesList.overlayEnterFrom as string"
        :enter-to="configuration.classesList.overlayEnterTo as string"
        :leave="configuration.classesList.overlayLeave as string"
        :leave-from="configuration.classesList.overlayLeaveFrom as string"
        :leave-to="configuration.classesList.overlayLeaveTo as string"
      >
        <DialogOverlay
          :class="[
            configuration.classesList.overlay,
            configuration.classesList.overlayColor,
            configuration.classesList.zIndexOverlay,
          ]"
        />
      </TransitionChild>

      <div
        :class="[
          configuration.classesList.wrapper,
          configuration.classesList.zIndexWrapper,
        ]"
      >
        <div
          :class="[
            configuration.classesList.inner,
            position === 'center' ? configuration.classesList.positionCentered : '',
            position === 'center-bottom' ? configuration.classesList.positionCenterBottom : '',
            position === 'center-top' ? configuration.classesList.positionCenterTop : '',
            position === 'bottom' ? configuration.classesList.positionBottom : '',
            position === 'top' ? configuration.classesList.positionTop : '',
          ]"
        >
          <TransitionChild
            as="template"
            :enter="configuration.classesList.dialogEnter as string"
            :enter-from="configuration.classesList.dialogEnterFrom as string"
            :enter-to="configuration.classesList.dialogEnterTo as string"
            :leave="configuration.classesList.dialogLeave as string"
            :leave-from="configuration.classesList.dialogLeaveFrom as string"
            :leave-to="configuration.classesList.dialogLeaveTo as string"
          >
            <DialogPanel
              :class="[
                configuration.classesList.modal,
                configuration.classesList.modalBackground,
                configuration.classesList.modalRing,
                shouldApplyModalPaddingX ? configuration.classesList.modalPaddingX : '',
                shouldApplyModalPaddingTop ? configuration.classesList.modalPaddingTop : '',
                shouldApplyModalPaddingBottom ? configuration.classesList.modalPaddingBottom : '',
                size === 'default' ? configuration.classesList.sizeDefault : '',
                size === 'small' ? configuration.classesList.sizeSmall : '',
                size === 'medium' ? configuration.classesList.sizeMedium : '',
                size === 'large' ? configuration.classesList.sizeLarge : '',
                size === 'full' ? configuration.classesList.sizeFull : '',
              ]"
            >
              <!-- Trap the focus here, some weird bug with headlessui -->
              <div
                style="width: 0; height: 0; visibility: hidden"
                tabindex="99"
              />

              <!-- Header -->
              <DialogTitle
                v-if="hasHeaderSlot"
                as="div"
                :class="[
                  configuration.classesList.title,
                  divided ? configuration.classesList.titleDivided : '',
                ]"
              >
                <slot
                  :close="close"
                  name="header"
                >
                  <h3
                    :class="configuration.classesList.titleText"
                    v-html="title"
                  />
                </slot>
              </DialogTitle>

              <!-- Body -->
              <DialogDescription
                as="div"
                v-bind="$attrs"
                :class="[
                  shouldApplyBodyXPadding ? configuration.classesList.bodyPaddingX : '',
                  shouldApplyBodyPaddingTop ? configuration.classesList.bodyPaddingTop : '',
                  shouldApplyBodyPaddingBottom ? configuration.classesList.bodyPaddingBottom : '',
                  configuration.classesList.body,
                ]"
              >
                <slot
                  v-bind="{ close }"
                />
              </DialogDescription>

              <!-- Footer -->
              <DialogFooter
                v-if="hasFooterSlot"
                ref="footer"
                :divided="divided"
              >
                <slot
                  :close="close"
                  name="footer"
                />
              </DialogFooter>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
</template>
