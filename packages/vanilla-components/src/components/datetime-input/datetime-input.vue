<script setup lang="ts">
import { nextTick, watch } from 'vue'
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

watch(localValue, () => {
  if (localValue.value == 'Invalid Date') {
    nextTick(() => {
      localValue.value = null
    })
  }
}, { immediate: false })

/**
 * @docs
 * @displayName VanillaDateTimeInput
 * @description A date and time input component.
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaDateTimeInput',
  inheritAttrs: false,
}
</script>

<template>
  <ClientOnly>
    <DatePicker
      v-model="localValue"
      color="indigo"
      :is-dark="{ selector: ':root', darkClass: 'dark' }"
      :input-debounce="1200"
      :update-on-input="true"
      :popover="{ visibility: 'focus' }"
      v-bind="$attrs"
    >
      <template
        v-if="props.inline === false"
        #default="{ inputValue, inputEvents }"
      >
        <slot v-bind="{ inputValue, inputEvents }">
          <div :class="configuration.classesList.wrapper">
            <VanillaInput
              v-if="get($attrs, 'is-range', false) === false"
              :model-value="inputValue"
              :placeholder="props.placeholder"
              :errors="errors"
              :variant="variant"
              :disabled="disabled"
              :feedback="props.feedback"
              v-on="inputEvents"
            >
              <template #before>
                <slot name="before" />
              </template>
              <template #after>
                <ClearButton
                  v-if="get($attrs, 'is-required', false) === false"
                  :class="configuration.classesList?.clearButton"
                  @click="localValue = null"
                />
              </template>
            </VanillaInput>
            <VanillaInput
              v-if="get($attrs, 'is-range', false) === true"
              :model-value="formatRange(inputValue.start, inputValue.end)"
              :placeholder="props.placeholder"
              :errors="errors"
              :variant="variant"
              :feedback="props.feedback"
              v-on="{ ...inputEvents.start, ...inputEvents.end }"
            >
              <template #before>
                <slot name="before" />
              </template>
              <template #after>
                <ClearButton
                  v-if="get($attrs, 'is-required', false) === false"
                  :class="configuration.classesList?.clearButton"
                  @click="localValue = null"
                />
              </template>
            </VanillaInput>
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

