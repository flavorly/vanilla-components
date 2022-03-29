<template>
  <!-- Table Empty / No results -->
  <div class="flex items-center justify-center text-center bg-gray-50 px-6 py-8 dark:bg-gray-800">
    <!-- Empty due to searching or filtering -->
    <slot
      v-if="hasFiltersOrSearch"
      name="emptyWithFilters"
    >
      <div class="text-sm w-full space-y-2">
        <div class="flex items-center justify-center">
          <slot name="emptyWithFiltersIcon">
            <VanillaUFOIcon class="text-gray-200 w-28 h-28" />
          </slot>
        </div>

        <div class="flex items-center justify-center">
          <slot name="emptyWithFiltersTitle">
            <h3
              class="text-small text-gray-500 mb-3 mt-3"
              v-text="translations.recordsEmptyWithFiltersOrSearch"
            />
          </slot>
        </div>

        <div
          class="flex items-center justify-center"
          @click="resetFilters"
        >
          <slot name="emptyWithFiltersButton">
            <VanillaButton
              :variant="'primary'"
              :loading="isFetching || isLocallyLoading"
            >
              <template #icon>
                <ReplyIcon class="h-4 w-4" />
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
      <div class="text-sm w-full space-y-2">
        <div class="flex items-center justify-center">
          <slot name="emptyWithoutRecordsIcon">
            <VanillaRadarIcon class="text-gray-200 w-28 h-28" />
          </slot>
        </div>

        <div class="flex items-center justify-center">
          <slot name="emptyWithoutRecordsTitle">
            <h3
              class="text-small text-gray-500 mb-3 mt-3"
              v-text="translations.recordsEmpty"
            />
          </slot>
        </div>

        <div
          class="flex items-center justify-center"
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
import { ReplyIcon } from '@heroicons/vue/solid';
import VanillaUFOIcon from '@/components/Icons/UFOIcon.vue';
import VanillaRadarIcon from '@/components/Icons/RadarIcon.vue';
import VanillaButton from '@/components/Button/Button.vue';
import { useInjectDatatableTranslations } from '../utils';

export default defineComponent({
    name: 'VanillaDatatableEmptyState',
    components: {
        VanillaUFOIcon,
        VanillaRadarIcon,
        ReplyIcon,
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
            isLocallyLoading,
            resetFilters,
            actionWithoutRecords,
        };
    },
});
</script>
