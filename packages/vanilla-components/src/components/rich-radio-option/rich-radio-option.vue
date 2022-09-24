<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { RadioGroupDescription, RadioGroupLabel } from '@headlessui/vue'
import type { RichRadioOptionClassesValidKeys, RichRadioOptionProps } from './config'
import { richRadioOptionClassesKeys, richRadioOptionConfig } from './config'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core/use'
import type { NormalizedOption } from '@/core/types'

const props = defineProps({
  ...useVariantProps<RichRadioOptionProps, RichRadioOptionClassesValidKeys>(),
  radio: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  checked: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  active: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  option: {
    type: [Array, Object, undefined] as PropType<NormalizedOption>,
    required: true,
  },
  compact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  separated: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  optionIndex: {
    type: [Number, undefined] as PropType<number | undefined>,
    default: undefined,
  },
  totalOptions: {
    type: [Number] as PropType<number | undefined>,
    default: undefined,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const { localVariant } = useBootVariant(props, 'errors', ref(null))

const { configuration } = useConfiguration<RichRadioOptionProps>(
  richRadioOptionConfig,
  richRadioOptionClassesKeys,
)
</script>

<template>
  <div
    :class="[
      configuration.classesList?.option,
      compact ? configuration.classesList?.compact : configuration.classesList?.nonCompact,
      separated ? configuration.classesList?.separated : '',
      !separated && optionIndex === 0 ? configuration.classesList?.firstItem : '',
      !separated && optionIndex === totalOptions - 1 ? configuration.classesList?.lastItem : '',
      checked ? configuration.classesList?.checked : configuration.classesList?.unchecked,
      active ? configuration.classesList?.highlighted : configuration.classesList?.nonHighlighted,
      disabled ? configuration.classesList?.disabled : '',
    ]"
  >
    <!-- If its a checkbox layout -->
    <slot
      name="radioIcon"
      v-bind="{ checked }"
    >
      <span
        v-if="radio"
        :class="[
          configuration.classesList?.radio,
          active ? configuration.classesList?.radioHighlighted : '',
          checked ? configuration.classesList?.radioChecked : configuration.classesList?.radioUnchecked,
        ]"
        aria-hidden="true"
      >
        <span :class="configuration.classesList?.radioInner" />
      </span>
    </slot>
    <!-- Main Content -->
    <div
      :class="[
        configuration.classesList?.contentWrapper,
        !radio ? configuration.classesList?.contentWrapperIfNotRadio : '',
      ]"
    >
      <!-- Actual option -->
      <slot v-bind="{ checked, option }">
        <div :class="configuration.classesList?.content">
          <div :class="configuration.classesList?.contentInner">
            <!-- Label Slot -->
            <slot
              name="label"
              v-bind="{ checked, option }"
            >
              <RadioGroupLabel
                as="p"
                :class="[
                  checked ? configuration.classesList?.labelChecked : configuration.classesList?.labelUnchecked,
                  configuration.classesList?.label,
                ]"
                v-html="option.text"
              />
            </slot>
            <!-- Label Description -->
            <slot
              name="description"
              v-bind="{ checked, option }"
            >
              <RadioGroupDescription
                v-if="option?.raw?.description && !compact"
                as="span"
                :class="[
                  configuration.classesList?.description,
                  checked ? configuration.classesList?.descriptionChecked : configuration.classesList?.descriptionUnchecked,
                ]"
              >
                <span
                  v-html="option?.raw?.description"
                />
              </RadioGroupDescription>
            </slot>
          </div>
        </div>
      </slot>
      <!-- Checked but not radio style -->
      <div
        v-show="checked && !radio"
        :class="configuration.classesList?.checkedIconWrapper"
      >
        <slot
          name="svgIcon"
          v-bind="{ checked }"
        >
          <svg
            :class="configuration.classesList?.checkedIcon"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="12"
              :class="configuration.classesList?.checkedIconOpacity"
            />
            <path
              d="M7 13l3 3 7-7"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

