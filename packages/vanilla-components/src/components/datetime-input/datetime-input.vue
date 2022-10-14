<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const DateTimePicker = defineComponent({
  name: 'DateTimePicker',
  extends: DatePicker,
  props: {
    ...Calendar.props,
    color: {
      type: String,
      default: 'orange',
    },
  },
})
</script>

<template>
  <DateTimePicker>
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope"
    >
      <slot
        :key="slot"
        :name="slot"
        v-bind="scope"
      />
    </template>
  </DateTimePicker>
</template>

