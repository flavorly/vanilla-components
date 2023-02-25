<script setup lang="ts">
import { useInjectsClassesList } from '../../core/use'
const classesList = useInjectsClassesList()!

defineOptions({
  name: 'VanillaCardEmptyPlaceholder',
  inheritAttrs: true,
})
</script>

<template>
  <div :class="classesList.emptyStateContainer">
    <div :class="classesList.emptyState">
      <slot />
    </div>
  </div>
</template>
