<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted } from 'vue'
import type { AlertClassesValidKeys, AlertProps } from './config'
import { alertConfig } from './config'
import { hasSlot } from '@/core/helpers'
import { useConfiguration, useVariantProps } from '@/core/use'
import XCircleIcon from '@/components/icons/hero/solid/XCircleIcon.vue'
import CheckCircleIcon from '@/components/icons/hero/solid/CheckCircleIcon.vue'
import ExclamationTriangleIcon from '@/components/icons/hero/solid/ExclamationTriangleIcon.vue'
import InformationCircleIcon from '@/components/icons/hero/solid/InformationCircleIcon.vue'
import XMarkIcon from '@/components/icons/hero/outline/XMarkIcon.vue'

const props = defineProps({
  ...useVariantProps<AlertProps, AlertClassesValidKeys>(),
  title: {
    type: [String] as PropType<string>,
    default: undefined,
  },
  subtitle: {
    type: [String] as PropType<string>,
    default: undefined,
  },
  closable: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  closeAfter: {
    type: [Number] as PropType<number>,
    default: undefined,
  },
})

const emit = defineEmits(['close'])

const { configuration, errors, hasErrors } = useConfiguration<AlertProps>(alertConfig, 'Alert')

const close = () => emit('close')

onMounted(() => {
  if (props.closeAfter) {
    setTimeout(() => emit('close'), props.closeAfter)
  }
})
</script>

<template>
  <div
    class="vanilla-alert"
    :class="configuration.classesList.wrapper"
  >
    <slot name="default">
      <div class="flex">
        <div
          v-if="props.variant"
          :class="configuration.classesList.iconWrapper"
        >
          <XCircleIcon
            v-if="props.variant === 'error'"
            :class="configuration.classesList.icon"
            aria-hidden="true"
          />

          <CheckCircleIcon
            v-if="props.variant === 'success'"
            :class="configuration.classesList.icon"
            aria-hidden="true"
          />

          <ExclamationTriangleIcon
            v-if="props.variant === 'warning'"
            :class="configuration.classesList.icon"
            aria-hidden="true"
          />

          <InformationCircleIcon
            v-if="props.variant === 'info'"
            :class="configuration.classesList.icon"
            aria-hidden="true"
          />
        </div>

        <div :class="configuration.classesList.contentWrapper">
          <h3 :class="configuration.classesList.title">
            <slot name="title">
              <span>{{ title }}</span>
            </slot>
          </h3>

          <div
            v-if="subtitle || hasSlot($slots.subtitle)"
            :class="configuration.classesList.subtitle"
          >
            <slot name="subtitle">
              <p>{{ subtitle }}</p>
            </slot>
          </div>

          <div
            v-if="hasSlot($slots.actions)"
            :class="configuration.classesList.actionsWrapper"
          >
            <div :class="configuration.classesList.actionsContainer">
              <slot name="actions" />
            </div>
          </div>
        </div>

        <div
          v-if="closable"
          :class="configuration.classesList.closeButtonWrapper"
        >
          <div :class="configuration.classesList.closeButtonContainer">
            <button
              type="button"
              :class="configuration.classesList.closeButton"
              @click="close"
            >
              <span class="sr-only">Dismiss</span>

              <XMarkIcon
                :class="configuration.classesList.closeButtonIcon"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
