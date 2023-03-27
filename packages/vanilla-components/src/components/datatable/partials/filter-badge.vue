<script setup lang="ts">
import type { PropType } from 'vue'
import find from 'lodash/find'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import { useInjectsClassesList } from '../../../core/use'
import type { NormalizedOption } from '../../../core/types'

const props = defineProps({
  filter: {
    type: [Object, Array] as PropType<Types.DatatableFilter>,
    required: true,
  },
  value: {
    type: [Number, String, Array, Object] as PropType<number | string | any | string[] | object>,
    required: true,
  },
  withLabel: {
    type: [Boolean],
    default: true,
    required: false,
  },
})

const emit = defineEmits(['filterRemove'])

const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
const translations = useInjectDatatableTranslations()!

const translateFilterValue = (filter: Types.DatatableFilter): any => {
  if (filter?.options !== undefined && !(typeof filter.value == 'object' && Object.keys(filter.value).length > 0)) {
    let value = filter.value
    if (value === 'true' || value === 'false') {
       value = value === 'true'
    }
    const selectedOption = find(filter.options, { value }) as NormalizedOption
    return selectedOption?.text || filter.value
  }

  if (Array.isArray(filter?.value) && filter?.value.length > 0) {
    return filter.value.join(',')
  }

  return filter.value
}

// defineOptions({
//   name: 'VanillaDatatableFilterBadge',
// })
</script>

<template>
  <div :class="[classesList.filtersBadge]">
    <slot>
      <div :class="[classesList.filtersBadgeLabel]">
        <span
          v-if="withLabel && filter?.label"
          v-html="`${filter.label}: `"
        />
        <span v-text="translateFilterValue(filter)" />
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
