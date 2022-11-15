<script setup lang="ts">
import { Button, Slideover } from '@favlorly/vanilla-components'
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <PreviewWrapper>
    <Button
      label="Open Slideover"
      @click="open = !open"
    />
    <Slideover
      v-model="open"
      :teleport="false"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="absolute inset-0 px-4 sm:px-6">
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
          aria-hidden="true"
        />
      </div>
    </Slideover>
  </PreviewWrapper>
</template>
