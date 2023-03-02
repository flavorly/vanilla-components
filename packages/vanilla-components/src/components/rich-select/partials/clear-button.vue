<script setup lang="ts">
import { useInjectsClassesListClass } from '../../../core/use'
import CloseIcon from '~icons/heroicons/x-mark-solid'
const className = useInjectsClassesListClass('clearButton')
const iconClassName = useInjectsClassesListClass('clearButtonIcon')
</script>

<template>
  <button
    type="button"
    data-rich-select-focusable
    :class="className"
  >
    <slot name="clearButton">
      <CloseIcon :class="iconClassName" />
    </slot>
  </button>
</template>
