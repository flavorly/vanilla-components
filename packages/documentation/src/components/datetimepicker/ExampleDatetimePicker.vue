<script setup type="ts">
import { DateTimeInput } from '@indigit/vanilla-components'
import { ref } from 'vue'

const value = ref('2011-01-01 0:00:01')
const value2 = ref('2022-01-01 0:00:01')
</script>

<template>
  <PreviewWrapper>
    <div class="h-[400px]">
      <!-- Regular -->
      <DateTimeInput
        v-model="value"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>

      <!-- Regular -->
      <DateTimeInput
        v-model="value2"
        errors="Sorry for this name is already taken"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value2) }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>
