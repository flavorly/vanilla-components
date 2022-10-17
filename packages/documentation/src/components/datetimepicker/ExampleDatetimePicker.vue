<script setup lang="ts">
import { DateTimeInput, DateTimeInputCalendar, Input as VanillaInput } from '@indigit/vanilla-components'
import { ref } from 'vue'

const value = ref('2011-01-01 0:00:01')
const value2 = ref('2022-01-01 0:00:01')
const value3 = ref([])
</script>

<template>
  <PreviewWrapper>
    <div class="h-[400px]">
      <!-- Regular -->
      <DateTimeInputCalendar
        v-model="value"
        :is-dark="false"
        :is24hr="false"
        :minute-increment="5"
        :is-required="true"
        :popover="{ visibility: 'click' }"
        mode="dateTime"
      >
        <template #default="{ inputValue, inputEvents, updateValue }">
          <!--          <VanillaInput -->
          <!--            :value="inputValue" -->
          <!--            placeholder="Click to select your date" -->
          <!--            v-on="inputEvents" -->
          <!--          /> -->
          <VanillaInput
            :model-value="inputValue"
            placeholder="Click to select your date"
            v-on="inputEvents"
          />
        </template>
      </DateTimeInputCalendar>

      <DateTimeInput
        v-model="value3"
        :disabled="false"
        selection-mode="range"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>

      <!--      &lt;!&ndash; Regular &ndash;&gt; -->
      <!--      <DateTimeInput -->
      <!--        v-model="value2" -->
      <!--        errors="Sorry for this name is already taken" -->
      <!--      /> -->

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value2) }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>
