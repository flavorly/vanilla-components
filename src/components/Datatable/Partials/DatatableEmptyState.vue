<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import { useInjectDatatableTranslations } from '../utils'
import VanillaUFOIcon from '@/components/Icons/UFOIcon.vue'
import VanillaRadarIcon from '@/components/Icons/RadarIcon.vue'
import EmptyIcon from '@/components/Icons/Hero/Outline/FunnelIcon.vue'
import VanillaButton from '@/components/Button/Button.vue'
import { useInjectsClassesList } from '@/core'

export default defineComponent({
    name: 'VanillaDatatableEmptyState',
    components: {
        VanillaUFOIcon,
        VanillaRadarIcon,
        EmptyIcon,
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

        const actionWithoutRecords = () => {
            emit('actionWithoutRecords')
        }

        return {
            translations,
            classesList,
            isLocallyLoading,
            resetFilters,
            actionWithoutRecords,
        }
    },
})
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
                <EmptyIcon :class="classesList.emptyStateResetFiltersButtonIcon" />
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
