<script setup lang="ts">
import { useInjectsClassesList } from '../../core/use'
const classesList = useInjectsClassesList()!

defineOptions({
  name: 'VanillaCardEmptyPlaceholder',
  inheritAttrs: true,
})

/**
 * @docs
 * @displayName VanillaCardEmptyPlaceholder
 * @description A placeholder when the card is empty
 **/
</script>

<template>
  <div :class="classesList.emptyStateContainer">
    <div :class="classesList.emptyState">
      <slot />
    </div>
  </div>
</template>
