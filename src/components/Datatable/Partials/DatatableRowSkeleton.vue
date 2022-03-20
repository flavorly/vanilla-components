<template>
  <tbody
    :class="{
      'divide-gray-200': true,
      'divide-gray-700': false
    }"
    class="bg-white dark:bg-gray-800 divide-y"
  >
    <tr
      v-for="(row, rowIndex) in numberOfRows"
      :key="rowIndex"
    >
      <td
        v-for="(column, columnIndex) in numberOfColumns"
        :key="columnIndex"
        class="px-2 py-3 whitespace-nowrap leading-5"
      >
        <VanillaSkeletonBar :count="1" />
      </td>
    </tr>
  </tbody>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VanillaSkeletonBar from './../../Skeletons/SkeletonBar/SkeletonBar.vue';

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
            // Todo: Infer Type here
            type: [Number] as PropType<number>,
            required: true,
        },
    },
    setup(props){
        return {
        };
    },
});

</script>
