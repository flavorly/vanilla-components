<template>
  <div class="px-6 sm:px-8 py-3 bg-indigo-100/50 dark:bg-indigo-500 items-center text-left text-xs text-indigo-900 dark:text-white space-x-1 space-y-1 sm:space-y-0 flex flex-col sm:flex-row">
    <span v-html="textSelectedRows" />
    <a
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="deselectAll"
      v-html="textDeselect"
    />
    <span
      class="hidden sm:inline mx-1"
      v-html="textOrSelectMatching"
    />
    <a
      v-if="!isAllSelected"
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="selectMatching"
      v-html="textSelectMatching"
    />
    <a
      v-if="isAllSelected"
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="deselectMatching"
      v-html="textDeselectMatching"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'VanillaDatatableSelectionBar',
    components: {
    },
    props: {
        isAllSelected: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        textSelectedRows: {
            type: [String] as PropType<string>,
            required: true,
        },
        textDeselect: {
            type: [String] as PropType<string>,
            required: true,
        },
        textOrSelectMatching: {
            type: [String] as PropType<string>,
            required: true,
        },
        textSelectMatching: {
            type: [String] as PropType<string>,
            required: true,
        },
        textDeselectMatching: {
            type: [String] as PropType<string>,
            required: true,
        },
    },
    emits: [
        'deselectAll',
        'selectMatching',
        'deselectMatching',
    ],
    setup(props, { emit }){

        const deselectAll = () => {
            emit('deselectAll', true);
        };

        const selectMatching = () => {
            emit('selectMatching', true);
        };

        const deselectMatching = () => {
            emit('deselectMatching', true);
        };

        return {
            deselectAll,
            selectMatching,
            deselectMatching,
        };
    },
});
</script>
