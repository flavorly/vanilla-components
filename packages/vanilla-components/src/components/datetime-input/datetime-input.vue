<script setup lang="ts">
import { defineComponent } from 'vue'
import { DatePicker } from 'v-calendar'
import ClearButton from '../rich-select/partials/clear-button.vue'
import { get } from '../../core/helpers'
import { useConfiguration, useVModel } from '../../core/use'
import VanillaInput from '../input/input.vue'
import ClientOnly from '../misc/client-only.vue'
import { baseProps } from './baseProps'
import type { DateTimeInputProps } from './config'
import { dateTimeInputConfig } from './config'

const props = defineProps(baseProps)
const localValue = useVModel(props, 'modelValue')
const { configuration, errors, variant } = useConfiguration<DateTimeInputProps>(dateTimeInputConfig, 'DateTimeInput', localValue)

const mergedProps = { ...DatePicker.props, ...baseProps }

const formatRange = (start: Date, end: Date) => {
  if (!start || !end) {
    return ''
  }
  return `${start || ''} - ${start || ''}`
}

defineOptions({
  name: 'VanillaDateTimeInput',
  inheritAttrs: false,
})

/**
 * @docs
 * @displayName VanillaDateTimeInput
 * @description A date and time input component.
 **/
</script>

<template>
  <ClientOnly>
    <DatePicker
      v-model="localValue"
      color="indigo"
      :is-dark="{ selector: ':root', darkClass: 'dark' }"
      :input-debounce="1200"
      :update-on-input="false"
      :popover="{ visibility: 'focus' }"
      v-bind="$attrs"
    >
      <template
        v-if="props.inline === false"
        #default="scope"
      >
        <slot v-bind="scope">
          <div :class="configuration.classesList.wrapper">
            <VanillaInput
              v-if="get($attrs, 'is-range', false) === false"
              :model-value="scope.inputValue"
              :placeholder="props.placeholder"
              :errors="errors"
              :variant="variant"
              v-on="scope.inputEvents"
            />
            <VanillaInput
              v-if="get($attrs, 'is-range', false) === true"
              :model-value="formatRange(scope.inputValue.start, scope.inputValue.end)"
              :placeholder="props.placeholder"
              :errors="errors"
              :variant="variant"
              v-on="{ ...scope.inputEvents.start, ...scope.inputEvents.end }"
            />
            <ClearButton
              v-if="get($attrs, 'is-required', false) === false"
              :class="configuration.classesList?.clearButton"
              @click="localValue = null"
            />
          </div>
        </slot>
      </template>
    <!--    <template -->
    <!--      v-for="(_, slot) of $slots" -->
    <!--      #[slot]="scope" -->
    <!--    > -->
    <!--      <slot -->
    <!--        v-if="slot !== 'default'" -->
    <!--        :key="slot" -->
    <!--        :name="slot" -->
    <!--        v-bind="scope" -->
    <!--      /> -->
    <!--    </template> -->
    </DatePicker>
  </ClientOnly>
</template>

