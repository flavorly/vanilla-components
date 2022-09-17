<template>
  <div
    :class="className"
  >
    <rich-select-trigger-tags-tag
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
    </rich-select-trigger-tags-tag>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject } from 'vue';
import { NormalizedOption } from '@/core/types';
import { useInjectsClassesListClass } from '@/core';
import RichSelectTriggerTagsTag from './RichSelectTriggerTagsTag.vue';

export default defineComponent({
    name: 'RichSelectTriggerTags',
    components: {
        RichSelectTriggerTagsTag,
    },
    setup() {
        const selectedOptions = inject<ComputedRef<NormalizedOption[]>>('selectedOption')!;
        const className = useInjectsClassesListClass('tagsWrapper')!;
        return {
            selectedOptions,
            className,
        };
    },
});
</script>
