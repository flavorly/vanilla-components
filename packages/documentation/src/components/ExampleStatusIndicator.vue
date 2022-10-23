<script setup lang="ts">
import { StatusIndicator } from '@indigit/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <div class="h-5 w-4">
      <StatusIndicator variant="red"/>
    </div>
    <div class="h-5 w-4">
      <StatusIndicator variant="blue"/>
    </div>
    <div class="h-5 w-4">
     <StatusIndicator variant="orange"/>
    </div>
    <div class="h-5 w-4">
      <StatusIndicator variant="indigo"/>
    </div>
  </PreviewWrapper>
</template>
