<script setup lang="ts">
import type { PropType } from 'vue'
import { nextTick, ref } from 'vue'
import { useInjectDatatableTranslations } from '../utils'
import { useInjectsClassesList } from '../../../core/use'
import Button from '../../button/button.vue'
import RadarIcon from '~icons/arcticons/canadaradar'
import UFOIcon from '~icons/tabler/ufo'
import EmptyIcon from '~icons/heroicons/funnel'

const props = defineProps({
  hasFiltersOrSearch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  isFetching: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const emit = defineEmits([
  'resetFilters',
  'actionWithoutRecords',
])

// Provide Translations
const translations = useInjectDatatableTranslations()!
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
const isLocallyLoading = ref(false)

const resetFilters = () => {
  isLocallyLoading.value = true
  emit('resetFilters')
  nextTick(() => {
    isLocallyLoading.value = false
  })
}

const actionWithoutRecords = () => emit('actionWithoutRecords')

// defineOptions({
//   name: 'VanillaDatatableEmptyState',
// })
</script>

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
            <UFOIcon :class="[classesList.emptyStateIcon]" />
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
            <Button
              :variant="classesList.emptyStateResetFiltersButtonVariant"
              :loading="isFetching || isLocallyLoading"
            >
              <template #icon>
                <EmptyIcon :class="classesList.emptyStateResetFiltersButtonIcon" />
              </template>
              <template #label>
                <span v-text="translations.recordsEmptyWithFiltersOrSearchAction" />
              </template>
            </Button>
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
            <RadarIcon :class="[classesList.emptyStateIcon]" />
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
