<script lang="ts">
import type { ComputedRef } from 'vue'
import { defineComponent, inject } from 'vue'
import RichSelectTriggerTagsTag from './RichSelectTriggerTagsTag.vue'
import type { NormalizedOption } from '@/core/types'
import { useInjectsClassesListClass } from '@/core'

export default defineComponent({
    name: 'RichSelectTriggerTags',
    components: {
        RichSelectTriggerTagsTag,
    },
    setup() {
        const selectedOptions = inject<ComputedRef<NormalizedOption[]>>('selectedOption')!
        const className = useInjectsClassesListClass('tagsWrapper')!
        return {
            selectedOptions,
            className,
        }
    },
})
</script>

<template>
  <div
    :class="className"
  >
    <RichSelectTriggerTagsTag
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
    </RichSelectTriggerTagsTag>
  </div>
</template>
