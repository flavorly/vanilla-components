<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { inject } from 'vue'
import type { NormalizedOption } from '../../../core/types'
import { useInjectsClassesListClass } from '../../../core/use'
import SelectTriggerTagsTag from './trigger-tags-tag.vue'

const selectedOptions = inject<ComputedRef<NormalizedOption[]>>('selectedOption')!
const className = useInjectsClassesListClass('tagsWrapper')!
</script>

<template>
  <div
    :class="className"
  >
    <SelectTriggerTagsTag
      v-for="(option, index) in selectedOptions"
      :key="`${option.value}-${index}`"
      :option="option"
    >
      <template #tagCloseIcon="props">
        <slot
          name="tagCloseIcon"
          v-bind="props"
        />
      </template>
      <template #tagLabel="props">
        <slot
          name="tagLabel"
          v-bind="props"
        />
      </template>
    </SelectTriggerTagsTag>
  </div>
</template>
