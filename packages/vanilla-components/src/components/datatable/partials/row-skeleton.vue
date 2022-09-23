<script setup lang="ts">
import type { PropType } from 'vue'
import { useInjectsClassesList } from '@/core/use'
import VanillaSkeletonBar from '@/components/skeleton-bar/skeleton-bar.vue'

const props = defineProps({
  numberOfColumns: {
    type: [Number] as PropType<number>,
    required: true,
  },
  numberOfRows: {
    type: [Number] as PropType<number>,
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
        v-for="(column, columnIndex) in numberOfColumns"
        :key="columnIndex"
        :class="[classesList.skeletonTableColumn]"
      >
        <VanillaSkeletonBar :count="1" />
      </td>
    </tr>
  </tbody>
</template>
