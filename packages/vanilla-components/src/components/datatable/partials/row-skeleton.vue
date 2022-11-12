<script setup lang="ts">
import type { PropType } from 'vue'
import { useInjectsClassesList } from '@/core/use'
import Skeleton from '@/components/skeleton/skeleton.vue'
import type * as Types from '@/components/datatable/config'

const props = defineProps({
  numberOfRows: {
    type: [Number] as PropType<number>,
    required: true,
  },
  columns: {
    type: [Array] as PropType<Types.DatatableColumnsComputed>,
    required: true,
  },
  isSelectable: {
    type: [Boolean] as PropType<boolean>,
    required: true,
  },
})

const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
</script>

<template>
  <tbody :class="[classesList.skeletonTableBody]">
    <tr
      v-for="(row, rowIndex) in numberOfRows"
      :key="rowIndex"
    >
      <td
        v-if="isSelectable"
        :key="`checkbox-${rowIndex}`"
        :class="[classesList.tableColumnCheckbox]"
      >
        <input
          :class="[
            classesList.tableCheckbox,
          ]"
          type="checkbox"
        >
      </td>
      <td
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :class="[
          classesList.skeletonTableColumn,
          column.name.toLocaleLowerCase() === 'id' ? classesList.tableIdColumn : '',
        ]"
      >
        <Skeleton
          :count="1"
        />
      </td>
    </tr>
  </tbody>
</template>
