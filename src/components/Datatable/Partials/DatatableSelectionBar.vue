<template>
  <div :class="[classesList.selectionBarContainer]">
    <span v-html="useReplacePlaceholders(translations.selectRows, {rows: countSelected})" />
    <a
      :class="[classesList.selectionBarButton]"
      tabindex="0"
      @click="deselectAll"
      v-html="useReplacePlaceholders(translations.selectedUndo)"
    />
    <span
      :class="[classesList.selectionBarOrText]"
      v-html="useReplacePlaceholders(translations.selectAllOr)"
    />
    <a
      v-if="!isAllSelected"
      :class="[classesList.selectionBarButton]"
      tabindex="0"
      @click="selectMatching"
      v-html="useReplacePlaceholders(translations.selectAllMatching, {rows: countTotal})"
    />
    <a
      v-if="isAllSelected"
      :class="[classesList.selectionBarButton]"
      tabindex="0"
      @click="deselectMatching"
      v-html="useReplacePlaceholders(translations.selectAllMatchingUndo, {rows: countTotal})"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useInjectDatatableTranslations } from '../utils';
import { useInjectsClassesList, useReplacePlaceholders } from '@/core';

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

        // Provide Translations & Config
        const translations = useInjectDatatableTranslations()!;
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;

        return {
            deselectAll,
            selectMatching,
            deselectMatching,
            useReplacePlaceholders,
            translations,
            classesList,
        };
    },
});
</script>
