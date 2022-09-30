<script setup lang="ts">
import type { ComponentPublicInstance, PropType, Ref } from 'vue'
import { onMounted, ref } from 'vue'
import type { ButtonClassesValidKeys, ButtonProps } from './config'
import { buttonConfig } from './config'
import LoadingSpinnerIcon from '@/components/icons/spinner.vue'
import { useConfiguration, useVariantProps } from '@/core/use'
import { hasSlot } from '@/core/helpers'

const props = defineProps({
    ...useVariantProps<ButtonProps, ButtonClassesValidKeys>(),
    as: {
        type: [String] as PropType<string>,
        default: 'button',
    },
    asDeep: {
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
    focusOnMount: {
        type: [Boolean] as PropType<boolean>,
        default: false,
    },
})

const emit = defineEmits(['click'])

const localRef = ref(null) as Ref<ComponentPublicInstance<HTMLInputElement> | null>
const localValue = ref(props.label)
const { configuration } = useConfiguration<ButtonProps>(buttonConfig, 'Button', localValue)

// If it's disable, just ignore it
const handleClickEvent = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

// Focus on mount, (useful for modals )
onMounted(() => {
  if (props.focusOnMount) {
    try {
      localRef?.value?.focus()
    }
    catch (e) {
      localRef?.value?.$el?.focus()
    }
  }
})
</script>

<template>
  <component
    :is="as"
    ref="localRef"
    :as="asDeep"
    :class="[
      configuration.classesList.button,
      disabled ? configuration.classesList.disableOpacity : '',
      loading || disabled ? configuration.classesList.busyOrInvalidState : '',
      !disabled && !loading ? configuration.classesList.enableOpacity : '',
    ]"
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    @click="handleClickEvent"
  >
    <div :class="configuration.classesList.container">
      <slot name="default">
        <!-- Loading Icon -->
        <span v-if="loading">
          <LoadingSpinnerIcon :class="configuration.classesList.spinner" />
        </span>
        <!-- If not loading, show the user provided icon -->
        <span v-if="!loading && hasSlot($slots.icon)">
          <slot name="icon" />
        </span>
        <!-- Actual button label -->
        <slot name="label">
          <span>
            {{ label }}
          </span>
        </slot>
      </slot>
    </div>
  </component>
</template>

