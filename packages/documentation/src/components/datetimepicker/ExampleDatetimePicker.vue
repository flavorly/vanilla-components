<script setup lang="ts">
import { DateTimeInput, Input as VanillaInput } from '@indigit/vanilla-components'
import { ref } from 'vue'

const value = ref('2011-01-01 0:00:01')
const value2 = ref('2022-01-01 0:00:01')
const value3 = ref({})
const dragValue = ref(null)
const selectDragAttribute = {
  popover: {
    visibility: 'hover',
    isInteractive: false, // Defaults to true when using slot
  },
}
</script>

<template>
  <PreviewWrapper>
    <div class="h-[400px]">
      <!-- Regular -->
      <DateTimeInput
        v-model="value3"
        :is24hr="true"
        :minute-increment="5"
        :is-required="true"
        :is-range="true"
        :inline="true"
        mode="dateTime"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        placeholder="Please select your date range"
        @drag="dragValue = $event"
      >
        <template #day-popover="{ format }">
          <div>
            {{ format(dragValue ? dragValue.start : value3.start, 'MMM D') }}
            -
            {{ format(dragValue ? dragValue.end : value3.end, 'MMM D') }}
          </div>
        </template>
      </DateTimeInput>

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>
