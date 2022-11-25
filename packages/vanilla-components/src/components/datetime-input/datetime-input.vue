<script setup lang="ts">
import { defineComponent } from 'vue'
import { DatePicker } from '@flavorly/v-calendar'
import ClearButton from '../rich-select/partials/clear-button.vue'
import { baseProps } from './baseProps'
import type { DateTimeInputProps } from './config'
import { dateTimeInputConfig } from './config'
import VanillaInput from '@/components/input/input.vue'
import { get } from '@/core/helpers'
import { useConfiguration, useVModel } from '@/core/use'
import ClientOnly from '@/components/misc/client-only.vue'

const props = defineProps(baseProps)
const localValue = useVModel(props, 'modelValue')
const { configuration, errors, variant } = useConfiguration<DateTimeInputProps>(dateTimeInputConfig, 'DateTimeInput', localValue)

const mergedProps = { ...DatePicker.props, ...baseProps }

const DateTimePicker = defineComponent({
  name: 'DateTimePicker',
  extends: DatePicker,
  props: mergedProps,
})

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
</script>

<template>
  <ClientOnly>
    <DateTimePicker
      v-model="localValue"
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
    </DateTimePicker>
  </ClientOnly>
</template>

