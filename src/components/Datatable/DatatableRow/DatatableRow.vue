<template>
  <tr>
    <!-- Row Checkbox -->
    <td
      v-if="selectable"
      class="px-6 py-4 whitespace-nowrap text-sm leading-5 font-medium text-gray-900 w-[10px]"
    >
      <input
        :checked="selected"
        class="block transition duration-150 ease-in-out checked:bg-indigo-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-indigo-600 h-4 w-4"
        type="checkbox"
        @change="selectRow(result)"
      >
    </td>
    <!-- Rest of the columns -->
    <td
      v-for="(column) in columns"
      v-show="true"
      :key="column.name"
      class="whitespace-nowrap text-sm leading-5 text-gray-500 dark:text-white"
    >
      <div
        v-if="column.raw && !column.component"
        v-html="result[column.name]"
      />
      <div v-else-if="!column.raw">
        {{ result[column.name] }}
      </div>
      <div v-else-if="column.component && column.component !== ''">
        Its a component
      </div>
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'VanillaDatatableRow',
    components: {
    },
    props: {
        columns: {
            // Todo: Infer Type here
            type: [Array] as PropType<string[]>,
            required: true,
        },
        selected: {
            type: Boolean as PropType<boolean>,
            default: true,
            required: true,
        },
        selectable: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        result: {
            type: Object as PropType<any>,
            required: true,
        },
    },
    emits: [
        'rowSelected',
    ],
    setup(props, { emit }){

        const selectRow = (item: any) => {
            emit('rowSelected', item);
        };

        return {
            selectRow,
        };
    },
});
</script>
