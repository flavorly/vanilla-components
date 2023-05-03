<script setup lang="ts">
import { useInjectsClassesList } from '../../core/use'
const classesList = useInjectsClassesList()!

/**
 * @docs
 * @displayName VanillaCardEmptyPlaceholder
 * @description A placeholder when the card is empty
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaCardEmptyPlaceholder',
  inheritAttrs: true,
}
</script>

<template>
  <div :class="classesList.emptyStateContainer">
    <div :class="classesList.emptyState">
      <slot />
    </div>
  </div>
</template>
