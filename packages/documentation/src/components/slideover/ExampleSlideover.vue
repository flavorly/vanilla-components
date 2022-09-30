<script setup type="ts">
import { Button, Slideover } from '@indigit/vanilla-components'
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <PreviewWrapper>
    <Button
      label="Open Slideover"
      @click="open = !open"
    />
    <div class="h-[320px]">
      <Slideover
        v-model="open"
        title="Payments"
        subtitle="Want to create new payments? Worry not, this a demo payment slideover"
      >
        <div class="absolute inset-0 px-4 sm:px-6">
          <div
            class="h-full border-2 border-dashed border-gray-200"
            aria-hidden="true"
          />
        </div>
      </Slideover>
    </div>
  </PreviewWrapper>
</template>
