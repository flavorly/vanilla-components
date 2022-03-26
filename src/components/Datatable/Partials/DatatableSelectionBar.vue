<template>
  <div class="px-6 sm:px-8 py-3 bg-indigo-100/50 dark:bg-indigo-500 items-center text-left text-xs text-indigo-900 dark:text-white space-x-1 space-y-1 sm:space-y-0 flex flex-col sm:flex-row">
    <span v-html="useReplacePlaceholders(translations.selectRows, {rows: countSelected})" />
    <a
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="deselectAll"
      v-html="useReplacePlaceholders(translations.selectedUndo)"
    />
    <span
      class="hidden sm:inline mx-1"
      v-html="useReplacePlaceholders(translations.selectAllOr)"
    />
    <a
      v-if="!isAllSelected"
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="selectMatching"
      v-html="useReplacePlaceholders(translations.selectAllMatching, {rows: countTotal})"
    />
    <a
      v-if="isAllSelected"
      class="cursor-pointer inline-flex items-center rounded-md bg-transparent border border-indigo-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100 dark:focus:ring-offset-indigo-500"
      tabindex="0"
      @click="deselectMatching"
      v-html="useReplacePlaceholders(translations.selectAllMatchingUndo, {rows: countTotal})"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useInjectDatatableTranslations } from '../utils';
import { useReplacePlaceholders } from '@/core';
export default defineComponent({
    name: 'VanillaDatatableSelectionBar',
    components: {
    },
    props: {
        isAllSelected: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        countSelected: {
            type: [String, Number] as PropType<string | number>,
            required: true,
        },
        countTotal: {
            type: [String, Number] as PropType<string | number>,
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

        // Provide Translations
        const translations = useInjectDatatableTranslations()!;

        return {
            deselectAll,
            selectMatching,
            deselectMatching,
            useReplacePlaceholders,
            translations,
        };
    },
});
</script>
