<script setup lang="ts">
import { DateTimeInput } from '@indigit/vanilla-components'
import { ref } from 'vue'

const value = ref('2011-01-01 0:00:01')
const rangeValue = ref({})
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
    <div>
      <!-- Range -->
      <DateTimeInput
        v-model="rangeValue"
        :is24hr="true"
        :minute-increment="5"
        :is-required="false"
        :is-range="true"
        :inline="false"
        mode="dateTime"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        placeholder="Please select your date range"
        @drag="dragValue = $event"
      >
        <template #day-popover="{ format }">
          <div>
            {{ format(dragValue ? dragValue.start : rangeValue.start, 'MMM D') }}
            -
            {{ format(dragValue ? dragValue.end : rangeValue.end, 'MMM D') }}
          </div>
        </template>
      </DateTimeInput>

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>From: {{ JSON.stringify(rangeValue?.start) || '-' }} | To: {{ JSON.stringify(rangeValue?.end) || '-' }}</pre>
      </div>
    </div>

    <div class="mt-5">
      <!-- Simple -->
      <DateTimeInput
        v-model="value"
        :is-required="false"
        :inline="false"
        mode="date"
        errors="This field can also get an errors"
        placeholder="Please select your date"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) || '-' }}</pre>
      </div>
    </div>

    <div class="">
      <!-- Inline -->
      <div class="mt-5 flex items-center justify-center mx-auto">
        <DateTimeInput
          v-model="rangeValue"
          :inline="true"
          :is-range="true"
          mode="dateTime"
          placeholder="Please select your date"
          @drag="dragValue = $event"
        >
          <template #day-popover="{ format }">
            <div>
              {{ format(dragValue ? dragValue.start : rangeValue.start, 'MMM D') }}
              -
              {{ format(dragValue ? dragValue.end : rangeValue.end, 'MMM D') }}
            </div>
          </template>
        </DateTimeInput>
      </div>

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>From: {{ JSON.stringify(rangeValue?.start) || '-' }} | To: {{ JSON.stringify(rangeValue?.end) || '-' }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>
