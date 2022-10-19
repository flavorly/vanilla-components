<script setup lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import { baseProps } from './baseProps'
import VanillaInput from '@/components/input/input.vue'
import { get } from '@/core/helpers'

const props = defineProps(baseProps)

const mergedProps = {
  ...DatePicker.props,
  ...baseProps,
}

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
</script>

<template>
  <DateTimePicker
    :input-debounce="1200"
    :update-on-input="false"
  >
    <template #default="scope">
      <slot v-bind="scope">
        <VanillaInput
          v-if="(props.inline === false) && get($attrs, 'is-range', false) === false"
          :model-value="scope.inputValue"
          :placeholder="props.placeholder"
          v-on="scope.inputEvents"
        />
        <VanillaInput
          v-if="(props.inline === false) && get($attrs, 'is-range', false) === true"
          :model-value="formatRange(scope.inputValue.start, scope.inputValue.end)"
          :placeholder="props.placeholder"
          v-on="{ ...scope.inputEvents.start, ...scope.inputEvents.end }"
        />
      </slot>
    </template>
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope"
    >
      <slot
        v-if="slot !== 'default'"
        :key="slot"
        :name="slot"
        v-bind="scope"
      />
    </template>
  </DateTimePicker>
</template>

