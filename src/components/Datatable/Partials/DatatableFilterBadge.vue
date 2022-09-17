<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useInjectDatatableTranslations } from './../Utils'
import type { VanillaDatatableFilter } from '@/components/Datatable'
import { useInjectsClassesList } from '@/core'

export default defineComponent({
    name: 'VanillaDatatableFilterBadge',
    props: {
        filter: {
            type: [Object, Array] as PropType<VanillaDatatableFilter>,
            required: true,
        },
        value: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
        withLabel: {
            type: [Boolean],
            default: true,
            required: false,
        },
    },
    emits: [
        'filterRemove',
    ],
    setup() {
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

        // Provide Translations
        const translations = useInjectDatatableTranslations()!

        return {
            classesList,
            translations,
        }
    },
})
</script>

<template>
  <div :class="[classesList.filtersBadge]">
    <slot>
      <div :class="[classesList.filtersBadgeLabel]">
        <span
          v-if="withLabel && filter?.label"
          v-html="`${filter.label}: `"
        />
        <span v-html="filter.value" />
      </div>
    </slot>
    <button
      type="button"
      :class="[classesList.filtersBadgeRemoveButton]"
      @click="$emit('filterRemove')"
    >
      <span
        class="sr-only"
        v-text="translations.filtersRemove"
      />
      <svg
        :class="[classesList.filtersBadgeRemoveIcon]"
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
