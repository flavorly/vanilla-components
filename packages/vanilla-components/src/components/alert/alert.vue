<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { hasSlot } from '../../core/helpers'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import Transitionable from '../misc/transitionable.vue'
import { alertConfig } from './config'
import type { AlertClassesValidKeys, AlertProps } from './config'
import XCircleIcon from '~icons/heroicons/x-circle-solid'
import CheckCircleIcon from '~icons/heroicons/check-circle-solid'
import ExclamationTriangleIcon from '~icons/heroicons/exclamation-triangle-solid'
import InformationCircleIcon from '~icons/heroicons/information-circle-solid'
import XMarkIcon from '~icons/heroicons/x-mark-solid'

const props = defineProps({
  ...useVariantProps<AlertProps, AlertClassesValidKeys>(),
  modelValue: {
    type: [Boolean] as PropType<boolean>,
    default: true,
  },
  title: {
    type: [String] as PropType<string>,
    default: undefined,
  },
  text: {
    type: [String] as PropType<string>,
    default: undefined,
  },
  closable: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  timeout: {
    type: [Number] as PropType<number>,
    default: undefined,
  },
  dismissLabel: {
    type: [String] as PropType<string>,
    default: 'Dismiss',
  },
  iconRaw: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  icon: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
    validator: (value: string | undefined) => {
      if (value === undefined) {
        return true
      }
      return [
        'error',
        'success',
        'warning',
        'info',
      ].includes(value)
    },
  },
})

const emit = defineEmits([
  'update:modelValue',
  'close',
])

const localValue: Ref<boolean> = useVModel(props, 'modelValue')
const { configuration, errors, hasErrors } = useConfiguration<AlertProps>(alertConfig, 'Alert', localValue)

const timeout = ref(undefined) as Ref<ReturnType<typeof setTimeout> | undefined>
const internalTimeout = ref(undefined) as Ref<ReturnType<typeof setTimeout> | undefined>
const main = ref<HTMLDivElement>() as Ref<HTMLDivElement>

// Close function little delay to allow transitions to take place
const close = () => {
  internalTimeout.value = setTimeout(() => {
    localValue.value = false
    clearTimeout(timeout.value)
    emit('close')
  }, 200)
}

// Timeout function to register the dismiss function
const registerTimeoutDismiss = () => {
  if (props.timeout) {
    timeout.value = setTimeout(() => {
      localValue.value = false
      emit('close')
    }, props.timeout)
  }
}

// We need to watch this value to be able to clear the timeout
// Also to rebind in case model-value changes again
// We cannot leverage the onMounted hook because it will not be called again if model-value changes
watch(() => localValue.value, (value) => {
  if (value) {
    registerTimeoutDismiss()
  }
  else {
    clearTimeout(timeout.value)
  }
})

// On mounted if local.value is true we should register the dismiss
onMounted(() => {
  if (localValue.value) {
    registerTimeoutDismiss()
  }
})

// Clear all the timeouts on leave
onUnmounted(() => {
  clearTimeout(timeout.value)
  clearTimeout(internalTimeout.value)
})

/**
 * @docs
 * @displayName VanillaAlert
 * @description An alert component
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaAlert',
  inheritAttrs: false,
}
</script>

<template>
  <Transitionable
    name="transition"
    duration="200"
    :classes-list="configuration.classesList"
  >
    <div
      v-if="localValue"
      ref="main"
      class="vanilla-alert"
      :class="configuration.classesList.wrapper"
    >
      <slot name="default">
        <div class="flex">
          <slot
            name="icon"
            v-bind="{ classes: configuration.classesList.iconWrapper }"
          >
            <div
              v-if="props.icon || props.iconRaw"
              :class="configuration.classesList.iconWrapper"
            >
              <template v-if="props.icon">
                <XCircleIcon
                  v-if="props.icon === 'error'"
                  :class="configuration.classesList.icon"
                  aria-hidden="true"
                />

                <CheckCircleIcon
                  v-if="props.icon === 'success'"
                  :class="configuration.classesList.icon"
                  aria-hidden="true"
                />

                <ExclamationTriangleIcon
                  v-if="props.icon === 'warning'"
                  :class="configuration.classesList.icon"
                  aria-hidden="true"
                />

                <InformationCircleIcon
                  v-if="props.icon === 'info'"
                  :class="configuration.classesList.icon"
                  aria-hidden="true"
                />
              </template>
              <span
                v-if="props.iconRaw"
                :class="[
                  configuration.classesList.icon,
                  configuration.classesList.iconRaw,
                ]"
                v-html="props.iconRaw"
              />
            </div>
          </slot>

          <div
            :class="[
              configuration.classesList.contentWrapper,
              props.icon ? configuration.classesList.contentWrapperWithIcon : '',
            ]"
          >
            <h3
              v-if="title || hasSlot($slots.title)"
              :class="configuration.classesList.title"
            >
              <slot name="title">
                <span>{{ title }}</span>
              </slot>
            </h3>

            <div
              v-if="text || hasSlot($slots.text)"
              :class="configuration.classesList.text"
              v-bind="$attrs"
            >
              <slot name="text">
                <p>{{ text }}</p>
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
              <slot
                name="close"
                v-bind="{ close, className: configuration.classesList.closeButton }"
              >
                <button
                  type="button"
                  :class="configuration.classesList.closeButton"
                  @click="close"
                >
                  <span class="sr-only">{{ props.dismissLabel }}</span>

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
    </div>
  </Transitionable>
</template>
