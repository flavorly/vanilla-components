<script setup lang="ts">
import { Skeleton, Card } from '@indigit/vanilla-components'
</script>

<template>
  <PreviewWrapper>
      <Card
        title="Skeletons"
        subtitle="Here you can check skeleton loaders examples"
      >
        <div class="p-5 text-sm space-y-2">
          <Skeleton :count="1" />
          <Skeleton variant="circle" :count="1" />
          <Skeleton variant="vanilla" :count="1" class="h-10 w-10 rounded-full"/>
          <Skeleton variant="vanilla" :count="1" class="h-20 w-full rounded-lg"/>
        </div>
      </Card>
  </PreviewWrapper>
</template>
