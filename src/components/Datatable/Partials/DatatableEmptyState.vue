<template>
  <!-- Table Empty / No results -->
  <div :class="[classesList.emptyStateContainer]">
    <!-- Empty due to searching or filtering -->
    <slot
      v-if="hasFiltersOrSearch"
      name="emptyWithFilters"
    >
      <div :class="[classesList.emptyStateInner]">
        <div :class="[classesList.emptyStateRow]">
          <slot name="emptyWithFiltersIcon">
            <VanillaUFOIcon :class="[classesList.emptyStateIcon]" />
          </slot>
        </div>

        <div :class="[classesList.emptyStateRow]">
          <slot name="emptyWithFiltersTitle">
            <h3
              :class="[classesList.emptyStateTitle]"
              v-text="translations.recordsEmptyWithFiltersOrSearch"
            />
          </slot>
        </div>

        <div
          :class="[classesList.emptyStateRow]"
          @click="resetFilters"
        >
          <slot name="emptyWithFiltersButton">
            <VanillaButton
              :variant="classesList.emptyStateResetFiltersButtonVariant"
              :loading="isFetching || isLocallyLoading"
            >
              <template #icon>
                <DocumentDuplicateIcon :class="classesList.emptyStateResetFiltersButtonIcon" />
              </template>
              <template #label>
                <span v-text="translations.recordsEmptyWithFiltersOrSearchAction" />
              </template>
            </VanillaButton>
          </slot>
        </div>
      </div>
    </slot>

    <!-- Empty due to no items at all -->
    <slot
      v-else
      name="emptyWithoutRecords"
    >
      <div :class="[classesList.emptyStateInner]">
        <div :class="[classesList.emptyStateRow]">
          <slot name="emptyWithoutRecordsIcon">
            <VanillaRadarIcon :class="[classesList.emptyStateIcon]" />
          </slot>
        </div>

        <div :class="[classesList.emptyStateRow]">
          <slot name="emptyWithoutRecordsTitle">
            <h3
              :class="[classesList.emptyStateTitle]"
              v-text="translations.recordsEmpty"
            />
          </slot>
        </div>

        <div
          :class="[classesList.emptyStateRow]"
          @click="actionWithoutRecords"
        >
          <slot name="emptyWithoutRecordsButton" />
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref } from 'vue';
import VanillaUFOIcon from '@/components/Icons/UFOIcon.vue';
import VanillaRadarIcon from '@/components/Icons/RadarIcon.vue';
import VanillaButton from '@/components/Button/Button.vue';
import { useInjectDatatableTranslations } from '../utils';
import { useInjectsClassesList } from '@/core';
import { DocumentDuplicateIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
    name: 'VanillaDatatableEmptyState',
    components: {
        VanillaUFOIcon,
        VanillaRadarIcon,
        DocumentDuplicateIcon,
        VanillaButton,
    },
    props: {
        hasFiltersOrSearch: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        isFetching: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: [
        'resetFilters',
        'actionWithoutRecords',
    ],
    setup(props, { emit }) {

        // Provide Translations
        const translations = useInjectDatatableTranslations()!;
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;

        const isLocallyLoading = ref(false);

        const resetFilters = () => {
            isLocallyLoading.value = true;
            emit('resetFilters');
            nextTick(() => {
                isLocallyLoading.value = false;
            });
        };

        const actionWithoutRecords = () => {
            emit('actionWithoutRecords');
        };

        return {
            translations,
            classesList,
            isLocallyLoading,
            resetFilters,
            actionWithoutRecords,
        };
    },
});
</script>
