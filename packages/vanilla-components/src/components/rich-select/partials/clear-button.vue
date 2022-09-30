<script setup lang="ts">
import { useInjectsClassesListClass } from '@/core/use'
import CloseIcon from '@/components/icons/close.vue'
const className = useInjectsClassesListClass('clearButton')
</script>

<template>
  <button
    type="button"
    data-rich-select-focusable
    :class="className"
  >
    <slot name="clearButton">
      <CloseIcon class="w-4 h-4" />
    </slot>
  </button>
</template>
