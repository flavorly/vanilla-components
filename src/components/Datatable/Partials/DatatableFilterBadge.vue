<template>
  <div class="flex-shrink-0 inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
    <slot>
      <div class="flex space-x-1">
        <span
          v-if="withLabel && filter?.label"
          v-html="filter.label+': '"
        />
        <span v-html="filter.value" />
      </div>
    </slot>
    <button
      type="button"
      class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      @click="$emit('filterRemove')"
    >
      <span class="sr-only">Remove</span>
      <svg
        class="h-2 w-2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 8 8"
      >
        <path
          stroke-linecap="round"
          stroke-width="1.5"
          d="M1 1l6 6m0-6L1 7"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { VanillaDatatableFilter } from '@/components/Datatable';

export default defineComponent({
    name: 'VanillaDatatableFilterBadge',
    props: {
        filter:{
            type: [Object, Array] as PropType<VanillaDatatableFilter>,
            required: true,
        },
        value: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
        withLabel:{
            type: [Boolean],
            default: true,
            required: false,
        },
    },
    emits: [
        'filterRemove',
    ],
});
</script>
