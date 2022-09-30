<script setup lang="ts">
import { useInjectsClassesList } from '@/core/use'
const classesList = useInjectsClassesList()!
</script>

<template>
  <div :class="classesList.emptyStateContainer">
    <div :class="classesList.emptyState">
      <slot />
    </div>
  </div>
</template>
