<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import type { ToggleClassesValidKeys, ToggleProps, ToggleValue } from './config'
import { toggleConfig } from './config'

// import VanillaCheckedIcon from '~icons/heroicons/check-solid'
import VanillaCheckedIcon from '~icons/ph/check-bold'
import VanillaUncheckedIcon from '~icons/heroicons/x-mark-solid'

const props = defineProps({
  ...useVariantProps<ToggleProps, ToggleClassesValidKeys>(),
  modelValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<ToggleValue>,
    default: undefined,
  },
  checked: {
    type: [Boolean] as PropType<boolean>,
    default: false,
  },
  value: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol, undefined] as PropType<ToggleValue>,
    default: false,
  },
  checkedValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<ToggleValue>,
    default: true,
  },
  uncheckedValue: {
    type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<ToggleValue>,
    default: false,
  },
  align: {
    type: [String] as PropType<string>,
    required: false,
    default: 'left-top',
    validator(align: string) {
      return [
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
        'center-top',
        'center-center',
        'center-bottom',
      ].includes(align)
    },
  },
  icon: {
    type: [Boolean] as PropType<boolean>,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'updated:checked'])

const root = ref(null)
const localValue = useVModel(props, 'modelValue')

// When toggle changes, emit the update in a different way.
const emitUpdate = (event: Event | any) => {
  const isChecked = event.target?.checked

  // It's an array
  if (Array.isArray(localValue.value)) {
    const newValue = [...localValue.value]

    if (isChecked) {
      newValue.push(props.value)
    }
    else {
      newValue.splice(newValue.indexOf(props.value), 1)
    }

    localValue.value = newValue
    return
  }

  // It's an object
  if (typeof localValue.value === 'object' && localValue.value !== null) {
    const temporaryValue = props.value
    const temporaryObject = localValue.value
    if (isChecked) {
      // @ts-expect-error: We assume its a string or will throw an error
      temporaryObject[temporaryValue] = true
    }
    else {
      // @ts-expect-error: We assume its a string or will throw an error
      delete temporaryObject[temporaryValue]
    }
    localValue.value = temporaryObject
    return
  }

  // It's a boolean
  const toggleValue = isChecked ? props.checkedValue : props.uncheckedValue
  localValue.value = toggleValue
}

// Check if the value is checked
const isChecked = computed(() => {
  if (Array.isArray(localValue.value) && typeof props.value === 'string') {
    return localValue.value.includes(props.value)
  }
  return localValue.value === props.checkedValue
})
const { configuration, errors, hasErrors } = useConfiguration<ToggleProps>(toggleConfig, 'Toggle', localValue)

defineOptions({
  name: 'VanillaToggle',
  inheritAttrs: false,
})

/**
 * @docs
 * @displayName VanillaToggle
 * @description A toggle component.
 **/
</script>

<template>
  <div
    :class="[
      configuration.classesList.wrapper,
      align === 'left-top' ? configuration.classesList.wrapperLeftTop : '',
      align === 'left-center' ? configuration.classesList.wrapperLeftCenter : '',
      align === 'left-bottom' ? configuration.classesList.wrapperLeftBottom : '',
      align === 'right-top' ? configuration.classesList.wrapperRightTop : '',
      align === 'right-center' ? configuration.classesList.wrapperRightCenter : '',
      align === 'right-bottom' ? configuration.classesList.wrapperRightBottom : '',
      align === 'center-top' ? configuration.classesList.wrapperCenterTop : '',
      align === 'center-center' ? configuration.classesList.wrapperCenterCenter : '',
      align === 'center-bottom' ? configuration.classesList.wrapperCenterBottom : '',
    ]"
  >
    <input
      :id="name"
      ref="root"
      :checked="isChecked"
      :value="value"
      style="display: none;"
      type="checkbox"
      @change="emitUpdate"
    >
    <button
      ref="input"
      aria-pressed="false"
      :class="[
        configuration.classesList.toggle,
        isChecked ? configuration.classesList.checked : configuration.classesList.unchecked,
      ]"
      type="button"
      v-bind="$attrs"
      @click="$refs.root.click()"
    >
      <span
        :class="[
          configuration.classesList.iconWrapper,
          isChecked ? configuration.classesList.transitionChecked : configuration.classesList.transitionUnchecked,
        ]"
        aria-hidden="true"
      >
        <!-- Checked Slot -->
        <template v-if="isChecked">
          <slot
            :is-checked="isChecked"
            name="unchecked"
          >
            <VanillaCheckedIcon
              v-if="icon"
              :class="configuration.classesList.iconChecked"
            />
          </slot>
        </template>
        <template v-else>
          <slot
            :is-checked="isChecked"
            name="checked"
          >
            <VanillaUncheckedIcon
              v-if="icon"
              :class="configuration.classesList.iconUnchecked"
            />
          </slot>
        </template>
      </span>
    </button>
  </div>
</template>

