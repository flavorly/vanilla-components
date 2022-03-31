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
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VanillaSkeletonBar from './../../Skeletons/SkeletonBar/SkeletonBar.vue';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaDatatableRowSkeleton',
    components: {
        VanillaSkeletonBar,
    },
    props: {
        numberOfColumns: {
            type: [Number] as PropType<number>,
            required: true,
        },
        numberOfRows: {
            type: [Number] as PropType<number>,
            required: true,
        },
    },
    setup(){
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;
        return {
            classesList,
        };
    },
});

</script>
