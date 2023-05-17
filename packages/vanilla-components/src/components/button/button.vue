<script setup lang="ts">
import type { Component, ComponentPublicInstance, PropType, Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { useConfiguration, useVariantProps } from '../../core/use'
import { hasSlot } from '../../core/helpers'
import type { ButtonClassesValidKeys, ButtonProps } from './config'
import { buttonConfig } from './config'
import LoadingSpinnerIcon from '~icons/svg-spinners/180-ring-with-bg'

const props = defineProps({
    ...useVariantProps<ButtonProps, ButtonClassesValidKeys>(),
    as: {
        type: [String, Object] as PropType<string | Component>,
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

const root = ref(null) as Ref<ComponentPublicInstance<HTMLInputElement> | null>
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
      root?.value?.focus()
    }
    catch (e) {
      root?.value?.$el?.focus()
    }
  }
})

/**
 * @docs
 * @displayName VanillaButton
 * @description A simple button component
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaButton',
  inheritAttrs: true,
}
</script>

<template>
  <component
    :is="as"
    ref="root"
    :as="asDeep"
    :class="[
      configuration.classesList.button,
      disabled ? configuration.classesList.disableOpacity : '',
      loading || disabled ? configuration.classesList.busyOrInvalidState : '',
      !disabled && !loading ? configuration.classesList.enableOpacity : '',
      props.rounded === 'circle' ? configuration.classesList.paddingCircle : configuration.classesList.padding,
      props.rounded === 'full' ? configuration.classesList.roundedFull : '',
      props.rounded === 'circle' ? configuration.classesList.roundedCircle : '',
      props.rounded === 'top' ? configuration.classesList.roundedTop : '',
      props.rounded === 'bottom' ? configuration.classesList.roundedBottom : '',
      props.rounded === 'left' ? configuration.classesList.roundedLeft : '',
      props.rounded === 'right' ? configuration.classesList.roundedRight : '',
      props.rounded === 'top-left' ? configuration.classesList.roundedTopLeft : '',
      props.rounded === 'top-right' ? configuration.classesList.roundedTopRight : '',
      props.rounded === 'bottom-left' ? configuration.classesList.roundedBottomLeft : '',
      props.rounded === 'bottom-right' ? configuration.classesList.roundedBottomRight : '',
    ]"
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    @click="handleClickEvent"
  >
    <div
      :class="configuration.classesList.container"
    >
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

