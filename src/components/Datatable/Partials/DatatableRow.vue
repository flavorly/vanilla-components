<template>
  <!-- Rest of the columns -->
  <td
    v-for="(column) in columns"
    v-show="true"
    :key="column.name"
    class="whitespace-nowrap px-3 py-2 text-sm text-gray-500 dark:text-white"
  >
    <slot :name="camelize('row'+column.name)">
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
    </slot>
  </td>
</template>
<script lang="ts">
import { defineComponent, PropType, camelize } from 'vue';
export default defineComponent({
    name: 'VanillaDatatableRow',
    components: {
    },
    props: {
        columns: {
            type: [Array] as PropType<string[]>,
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
    setup(props){
        return {
            camelize,
        };
    },
});
</script>
