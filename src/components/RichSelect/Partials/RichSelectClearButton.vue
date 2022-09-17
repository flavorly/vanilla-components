<template>
  <button
    type="button"
    data-rich-select-focusable
    :class="className"
  >
    <slot name="clearButton">
      <close-icon class="w-4 h-4" />
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectsClassesListClass } from '@/core';
import CloseIcon from '@/components/icons/CloseIcon.vue';

export default defineComponent({
    name: 'RichSelectClearButton',
    components: {
        CloseIcon,
    },
    setup() {
        const className = useInjectsClassesListClass('clearButton');
        return { className };
    },
});
</script>
